export const MEMBERSHIP_MONTHLY_PRICE_PENCE = 2499;
export const MEMBERSHIP_SESSION_HOURS = 2;
export const MEMBERSHIP_ADULT_ENTRY_PRICE_PENCE = 0;
export const MEMBERSHIP_MONTHLY_PRICE = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
}).format(MEMBERSHIP_MONTHLY_PRICE_PENCE / 100);

export const MEMBERSHIP_TIERS = [
  { id: "little-lux", name: "Little Lux", pricePence: 2499, foodDrinkDiscountPercent: 0, monthlyArcadeCredits: 0, tagline: "Little adventurers. Endless play.", emoji: "💚", colour: "text-neon-green", border: "border-neon-green", fill: "bg-neon-green" },
  { id: "lux-plus", name: "Lux Plus", pricePence: 3499, foodDrinkDiscountPercent: 10, monthlyArcadeCredits: 300, tagline: "More play. More rewards.", emoji: "🎮", colour: "text-neon-cyan", border: "border-neon-cyan", fill: "bg-neon-cyan" },
  { id: "lux-vip", name: "Lux VIP", pricePence: 4999, foodDrinkDiscountPercent: 20, monthlyArcadeCredits: 750, tagline: "The ultimate LuxPlay experience.", emoji: "👑", colour: "text-neon-pink", border: "border-neon-pink", fill: "bg-neon-pink" },
] as const;

export const formatMembershipPrice = (pence: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(pence / 100);