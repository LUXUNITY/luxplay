// Pure membership rules shared by the membership + admin functions and unit tests.
export const MEMBERSHIP_PLANS: Record<string, { name: string; pricePence: number; credits: number; discount: number }> = {
  "little-lux": { name: "Little Lux", pricePence: 2499, credits: 0, discount: 0 },
  "lux-plus": { name: "Lux Plus", pricePence: 3499, credits: 200, discount: 10 },
  "lux-vip": { name: "Lux VIP", pricePence: 4999, credits: 600, discount: 20 },
};
export const PAYMENT_GRACE_HOURS = 24;
export const MAX_UPCOMING_MEMBER_BOOKINGS = 1;
export type MembershipBillingPeriod = "monthly" | "yearly";
export const MEMBERSHIP_YEARLY_DISCOUNT_PERCENT = 15;
export const membershipPricePence = (monthlyPence: number, period: MembershipBillingPeriod) =>
  period === "yearly" ? Math.round(monthlyPence * 12 * (100 - MEMBERSHIP_YEARLY_DISCOUNT_PERCENT) / 100) : monthlyPence;
export const membershipPlanKey = (tier: string, period: MembershipBillingPeriod) => period === "yearly" ? `${tier}:yearly` : tier;
export const isMembershipBillingPeriod = (value: unknown): value is MembershipBillingPeriod => value === "monthly" || value === "yearly";
export const membershipBilling = (tier: string, period: MembershipBillingPeriod) => {
  const plan = MEMBERSHIP_PLANS[tier];
  if (!plan) throw new Error("Unknown membership tier");
  return { key: membershipPlanKey(tier, period), pricePence: membershipPricePence(plan.pricePence, period), cadence: period === "yearly" ? "ANNUAL" : "MONTHLY" };
};

export type MemberStatus = "pending" | "active" | "grace" | "suspended" | "cancelled";

/** Decide pass status from Square subscription + the oldest unpaid invoice due date. */
export function decideStatus(opts: {
  subscriptionStatus?: string | null; // ACTIVE, PENDING, CANCELED, DEACTIVATED, PAUSED
  paidUntil?: string | null; // YYYY-MM-DD, end of paid month/year (canceled subs stay active until then)
  unpaidSince?: string | null; // ISO time the unpaid invoice fell due
  now?: Date;
}): MemberStatus {
  const now = opts.now ?? new Date();
  const s = (opts.subscriptionStatus ?? "").toUpperCase();
  if (!s) return "pending";
  const today = now.toISOString().slice(0, 10);
  if (s === "CANCELED" || s === "DEACTIVATED") {
    return opts.paidUntil && opts.paidUntil >= today && !opts.unpaidSince ? "active" : "cancelled";
  }
  if (s === "PAUSED") return "suspended";
  if (opts.unpaidSince) {
    const hours = (now.getTime() - new Date(opts.unpaidSince).getTime()) / 36e5;
    return hours > PAYMENT_GRACE_HOURS ? "suspended" : "grace";
  }
  return s === "PENDING" ? "pending" : "active";
}

export const canEnter = (s: MemberStatus) => s === "active" || s === "grace";
export const canBookMore = (upcomingCount: number) => upcomingCount < MAX_UPCOMING_MEMBER_BOOKINGS;
/** Members get one soft play session per calendar day (bookings + walk-in scans). */
export const canBookOnDay = (sessionsThatDay: number) => sessionsThatDay < 1;
export const creditsLeft = (tier: string, monthGiven: string | null, given: number, now = new Date()) => {
  const month = now.toISOString().slice(0, 7);
  const total = MEMBERSHIP_PLANS[tier]?.credits ?? 0;
  return monthGiven === month ? Math.max(total - given, 0) : total;
};
