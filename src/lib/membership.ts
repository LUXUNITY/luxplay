export const MEMBERSHIP_MONTHLY_PRICE_PENCE = 2499;
export const MEMBERSHIP_MONTHLY_PRICE = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
}).format(MEMBERSHIP_MONTHLY_PRICE_PENCE / 100);