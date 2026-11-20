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
import { decideStatus, canEnter, canBookMore, canBookOnDay, creditsLeft, MEMBERSHIP_PLANS } from "../../supabase/functions/_shared/membership-rules";

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
