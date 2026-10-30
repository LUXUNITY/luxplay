import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { isSoftPlaySlotBlocked, isBabySlotBlocked } from "./dateSlots";

describe("Halloween 31 October session closure", () => {
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
      const blocked = Function(`return (${map[1]})`)() as Record<string, string[]>;
      expect(blocked["2026-10-31"].includes("14:00")).toBe(true);
      expect(blocked["2026-11-01"]?.includes("14:00") ?? false).toBe(false);
    });
  }
});