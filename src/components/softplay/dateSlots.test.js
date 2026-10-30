import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { isSoftPlaySlotBlocked, isBabySlotBlocked } from "./dateSlots";

describe("Halloween 31 October session closure", () => {
  test("both areas close from 2PM on Friday 30 October, leaving morning sessions open", () => {
    for (const blocked of [isSoftPlaySlotBlocked, isBabySlotBlocked]) {
      for (const time of ["14:00", "16:00", "18:00"]) expect(blocked("2026-10-30", time)).toBe(true);
      expect(blocked("2026-10-30", "10:00")).toBe(false);
      expect(blocked("2026-10-30", "12:00")).toBe(false);
    }
  });
  test("both play areas close 2–4PM on 31 October only", () => {
    for (const blocked of [isSoftPlaySlotBlocked, isBabySlotBlocked]) {
      expect(blocked("2026-10-31", "14:00")).toBe(true);
      expect(blocked("2026-11-01", "14:00")).toBe(false);
      expect(blocked("2026-10-31", "12:00")).toBe(false);
    }
  });
  for (const name of ["create-softplay-checkout", "create-baby-softplay-checkout", "create-refresh-play-checkout", "create-baby-deal-checkout", "redeem-loyalty-session"]) {
    test(`${name} rejects the same dated session`, () => {
      const source = readFileSync(`supabase/functions/${name}/index.ts`, "utf8");
      const map = source.match(/const BLOCKED_SLOTS: Record<string, string\[\]> = (\{[\s\S]*?\n\});/);
      if (!map) throw new Error("Missing closure map");
      const blocked = Function(`return (${map[1]})`)();
      expect(blocked["2026-10-31"].includes("14:00")).toBe(true);
      expect(blocked["2026-10-30"].includes("14:00")).toBe(true);
      expect(blocked["2026-11-01"]?.includes("14:00") ?? false).toBe(false);
    });
  }
});