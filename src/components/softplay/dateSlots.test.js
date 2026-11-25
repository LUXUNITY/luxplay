import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { isSoftPlaySlotBlocked, isBabySlotBlocked } from "./dateSlots";

describe("Steve’s funeral full-day closure", () => {
  test("both areas block every session on Tuesday 24 November 2026 only", () => {
    for (const blocked of [isSoftPlaySlotBlocked, isBabySlotBlocked]) {
      for (const time of ["10:00", "12:00", "14:00", "16:00", "18:00"]) {
        expect(blocked("2026-11-24", time)).toBe(true);
        expect(blocked("2026-11-23", time)).toBe(false);
        expect(blocked("2026-11-26", time)).toBe(false);
      }
    }
  });
  for (const name of ["create-softplay-checkout", "create-baby-softplay-checkout", "create-refresh-play-checkout", "create-baby-deal-checkout", "redeem-loyalty-session"]) {
    test(`${name} blocks all five funeral-day sessions without closing adjacent dates`, () => {
      const source = readFileSync(`supabase/functions/${name}/index.ts`, "utf8");
      const map = source.match(/const BLOCKED_SLOTS: Record<string, string\[\]> = (\{[\s\S]*?\n\});/);
      if (!map) throw new Error("Missing closure map");
      const blocked = Function(`return (${map[1]})`)();
      expect(blocked["2026-11-24"]).toEqual(["10:00", "12:00", "14:00", "16:00", "18:00"]);
      expect(blocked["2026-11-23"] ?? []).toEqual([]);
      expect(blocked["2026-11-26"] ?? []).toEqual([]);
    });
  }
});

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

describe("25 November evening closure", () => {
  for (const [name, blocked] of [["soft play", isSoftPlaySlotBlocked], ["baby soft play", isBabySlotBlocked]]) {
    test(`${name} closes 4–6 and 6–8 only on 25 November 2026`, () => {
      for (const t of ["16:00", "18:00"]) {
        expect(blocked("2026-11-25", t)).toBe(true);
        expect(blocked("2026-11-26", t)).toBe(false);
      }
      for (const t of ["10:00", "12:00", "14:00"]) expect(blocked("2026-11-25", t)).toBe(false);
    });
  }
  for (const name of ["create-softplay-checkout", "create-baby-softplay-checkout", "create-refresh-play-checkout", "create-baby-deal-checkout", "redeem-loyalty-session", "membership"]) {
    test(`${name} rejects both evening sessions without closing earlier sessions or tomorrow`, () => {
      const source = readFileSync(`supabase/functions/${name}/index.ts`, "utf8");
      const map = source.match(/const BLOCKED_SLOTS: Record<string, string\[\]> = (\{[\s\S]*?\n\});/);
      if (!map) throw new Error("Missing closure map");
      const blocked = Function(`return (${map[1]})`)();
      expect(blocked["2026-11-25"]).toEqual(["16:00", "18:00"]);
      expect(blocked["2026-11-26"] ?? []).toEqual([]);
    });
  }
});
