import { describe, expect, it } from "vitest";
import { MEMBERSHIP_ADULT_ENTRY_PRICE_PENCE, MEMBERSHIP_MONTHLY_PRICE_PENCE, MEMBERSHIP_SESSION_HOURS } from "./membership";

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