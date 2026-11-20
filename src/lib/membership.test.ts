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