import { describe, expect, it } from "vitest";
import { MEMBERSHIP_MONTHLY_PRICE_PENCE } from "./membership";

describe("soft play membership pricing", () => {
  it("costs £24.99 per child each month", () => {
    expect(MEMBERSHIP_MONTHLY_PRICE_PENCE).toBe(2499);
  });
});