import { describe, expect, it } from "vitest";
import { MEMBERSHIP_ADULT_ENTRY_PRICE_PENCE, MEMBERSHIP_MONTHLY_PRICE_PENCE, MEMBERSHIP_SESSION_HOURS, MEMBERSHIP_TIERS } from "./membership";

describe("soft play membership pricing", () => {
  it("costs £24.99 per child each month", () => {
    expect(MEMBERSHIP_MONTHLY_PRICE_PENCE).toBe(2499);
  });
  it("includes two-hour sessions", () => {
    expect(MEMBERSHIP_SESSION_HOURS).toBe(2);
  });
  it("includes free adult entry", () => {
    expect(MEMBERSHIP_ADULT_ENTRY_PRICE_PENCE).toBe(0);
  });
});

describe("approved membership tiers", () => {
  for (const [id, price, discount, credits] of [
    ["little-lux", 2499, 0, 0],
    ["lux-plus", 3499, 10, 200],
    ["lux-vip", 4999, 20, 600],
  ] as const) {
    it(`${id} has the approved monthly price`, () => {
      expect(MEMBERSHIP_TIERS.find(tier => tier.id === id)?.pricePence).toBe(price);
    });
    it(`${id} has the approved food and drink discount`, () => {
      expect(MEMBERSHIP_TIERS.find(tier => tier.id === id)?.foodDrinkDiscountPercent).toBe(discount);
    });
    it(`${id} includes the approved monthly arcade credits`, () => {
      expect(MEMBERSHIP_TIERS.find(tier => tier.id === id)?.monthlyArcadeCredits).toBe(credits);
    });
  }
});
import { decideStatus, canEnter, canBookMore, canBookOnDay, creditsLeft, MEMBERSHIP_PLANS, membershipPricePence, membershipPlanKey, membershipBilling, isMembershipBillingPeriod, MEMBERSHIP_YEARLY_DISCOUNT_PERCENT } from "../../supabase/functions/_shared/membership-rules";

describe("live membership rules", () => {
  const now = new Date("2026-12-10T12:00:00Z");
  it("bills the same prices as the tiers shown", () => {
    for (const t of MEMBERSHIP_TIERS) expect(MEMBERSHIP_PLANS[t.id].pricePence).toBe(t.pricePence);
  });
  it("gives 24 hours to fix a failed payment", () => {
    expect(decideStatus({ subscriptionStatus: "ACTIVE", unpaidSince: "2026-12-09T13:00:00Z", now })).toBe("grace");
    expect(canEnter("grace")).toBe(true);
  });
  it("suspends after 24 hours unpaid", () => {
    expect(decideStatus({ subscriptionStatus: "ACTIVE", unpaidSince: "2026-12-09T11:00:00Z", now })).toBe("suspended");
    expect(canEnter("suspended")).toBe(false);
  });
  it("reactivates once paid", () => {
    expect(decideStatus({ subscriptionStatus: "ACTIVE", unpaidSince: null, now })).toBe("active");
  });
  it("keeps a cancelled pass until the end of the paid month", () => {
    expect(decideStatus({ subscriptionStatus: "CANCELED", paidUntil: "2026-12-20", now })).toBe("active");
    expect(decideStatus({ subscriptionStatus: "CANCELED", paidUntil: "2026-12-01", now })).toBe("cancelled");
  });
  it("allows only one upcoming booking per child", () => {
    expect(canBookMore(0)).toBe(true);
    expect(canBookMore(1)).toBe(false);
  });
  it("resets monthly arcade credits", () => {
    expect(creditsLeft("lux-plus", "2026-12", 150, now)).toBe(50);
    expect(creditsLeft("lux-vip", "2026-11", 600, now)).toBe(600);
  });
});

describe("member one session per day", () => {
  it("allows the first session of the day", () => expect(canBookOnDay(0)).toBe(true));
  it("blocks a second session on the same day", () => expect(canBookOnDay(1)).toBe(false));
});

describe("yearly memberships paid upfront", () => {
  it("automatically charges the annual price once per year", () => expect(membershipBilling("little-lux", "yearly")).toEqual({ key: "little-lux:yearly", pricePence: 25490, cadence: "ANNUAL" }));
  it("leaves monthly subscriptions unchanged", () => expect(membershipBilling("lux-plus", "monthly")).toEqual({ key: "lux-plus", pricePence: 3499, cadence: "MONTHLY" }));
  it("gives 15% off twelve monthly payments", () => expect(MEMBERSHIP_YEARLY_DISCOUNT_PERCENT).toBe(15));
  for (const [monthly, annual, saving] of [[2499, 25490, 4498], [3499, 35690, 6298], [4999, 50990, 8998]]) {
    it(`charges ${annual} pence upfront with ${saving} pence saving`, () => {
      expect(membershipPricePence(monthly, "yearly")).toBe(annual);
      expect(monthly * 12 - membershipPricePence(monthly, "yearly")).toBe(saving);
    });
    it(`preserves the ${monthly} pence monthly option`, () => expect(membershipPricePence(monthly, "monthly")).toBe(monthly));
  }
  it("keeps annual and monthly Square plans separate", () => {
    expect(membershipPlanKey("lux-plus", "monthly")).toBe("lux-plus");
    expect(membershipPlanKey("lux-plus", "yearly")).toBe("lux-plus:yearly");
  });
  it("rejects unsupported billing choices", () => {
    expect(isMembershipBillingPeriod("yearly")).toBe(true);
    expect(isMembershipBillingPeriod("weekly")).toBe(false);
  });
  it("releases Plus credits monthly rather than all 2400 for the year", () => {
    expect(creditsLeft("lux-plus", "2026-12", 0, new Date("2026-12-10"))).toBe(200);
    expect(creditsLeft("lux-plus", "2026-12", 200, new Date("2027-01-10"))).toBe(200);
  });
  it("releases VIP credits monthly rather than all 7200 for the year", () => expect(creditsLeft("lux-vip", null, 0)).toBe(600));
  it("keeps a cancelled annual pass active for its paid year", () => expect(decideStatus({ subscriptionStatus: "CANCELED", paidUntil: "2027-11-22", now: new Date("2027-06-01") })).toBe("active"));
});
