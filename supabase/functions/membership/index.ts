// Monthly soft play memberships billed by Square subscriptions.
// Actions (signed-in parents only): join, mine, book, cancel.
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { syncMembership } from "../_shared/membership-sync.ts";
import { MEMBERSHIP_PLANS, decideStatus, canEnter, canBookMore, canBookOnDay, creditsLeft } from "../_shared/membership-rules.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_VERSION = "2024-12-18";
async function square(path: string, init: { method?: string; body?: unknown } = {}) {
  const r = await fetch(`${SQUARE_BASE}/v2/${path}`, {
    method: init.method ?? "GET",
    headers: { Authorization: `Bearer ${Deno.env.get("SQUARE_ACCESS_TOKEN")}`, "Square-Version": SQUARE_VERSION, "Content-Type": "application/json" },
    ...(init.body ? { body: JSON.stringify(init.body) } : {}),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Square ${path} [${r.status}]: ${JSON.stringify(j.errors ?? j)}`);
  return j;
}

// ---- Session rules (keep in step with create-softplay-checkout) ----
const STANDARD_SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const MAX_CAPACITY = 40;
const BOOKING_WINDOW_DAYS = 14;
const BLOCKED_SLOTS: Record<string, string[]> = {
  "2026-11-24": ["10:00", "12:00", "14:00", "16:00", "18:00"], // Closed all day for Steve’s funeral
};
const HELD_SPOTS: Record<string, Record<string, number>> = {};
const ukToday = () => {
  const p = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const g = (t: string) => p.find((x) => x.type === t)?.value;
  return `${g("year")}-${g("month")}-${g("day")}`;
};
const isBookable = (d: string, t: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const today = ukToday();
  const max = new Date(`${today}T00:00:00Z`); max.setUTCDate(max.getUTCDate() + BOOKING_WINDOW_DAYS - 1);
  if (d < today || d > max.toISOString().slice(0, 10)) return false;
  return STANDARD_SESSIONS.includes(t) && !(BLOCKED_SLOTS[d] ?? []).includes(t);
};

const code = (n: number, prefix = "") => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const b = crypto.getRandomValues(new Uint8Array(n));
  return prefix + Array.from(b, (x) => chars[x % chars.length]).join("");
};

const db = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");

let cachedLocation = "";
const locationId = async () => cachedLocation || (cachedLocation = Deno.env.get("SQUARE_LOCATION_ID") ?? "");

async function ensurePlan(tier: string) {
  const { data } = await db.from("membership_square_plans").select("*").eq("tier", tier).maybeSingle();
  const plan = MEMBERSHIP_PLANS[tier];
  if (data && data.price_pence === plan.pricePence) return data.variation_id as string;
  const planRes = await square("catalog/object", { method: "POST", body: {
    idempotency_key: `lux-plan-${tier}-${plan.pricePence}`,
    object: { type: "SUBSCRIPTION_PLAN", id: "#plan", subscription_plan_data: { name: `LuxPlay ${plan.name} Membership` } },
  } });
  const planId = planRes.catalog_object.id;
  const varRes = await square("catalog/object", { method: "POST", body: {
    idempotency_key: `lux-planvar-${tier}-${plan.pricePence}`,
    object: { type: "SUBSCRIPTION_PLAN_VARIATION", id: "#var", subscription_plan_variation_data: {
      name: `${plan.name} monthly`, subscription_plan_id: planId,
      phases: [{ cadence: "MONTHLY", ordinal: 0, pricing: { type: "STATIC", price: { amount: plan.pricePence, currency: "GBP" } } }],
    } },
  } });
  const variationId = varRes.catalog_object.id;
  await db.from("membership_square_plans").upsert({ tier, plan_id: planId, variation_id: variationId, price_pence: plan.pricePence });
  return variationId as string;
}

const refresh = (m: any) => syncMembership(db, m);

const upcomingFor = async (id: string) => (await db.from("soft_play_bookings").select("booking_code, session_date, session_time, checked_in")
  .eq("stripe_session_id", `membership:${id}`).gte("session_date", ukToday()).eq("checked_in", false).order("session_date")).data ?? [];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const jwt = (req.headers.get("Authorization") ?? "").replace("Bearer ", "");
    const { data: u } = await db.auth.getUser(jwt);
    const user = u?.user;
    if (!user) return json(401, { error: "Please sign in first." });
    const body = await req.json().catch(() => ({}));
    const action = String(body.action ?? "");

    if (action === "join") {
      const tier = String(body.tier ?? "");
      // Names may only start with a letter or number (blocks spreadsheet formulas in staff exports).
      const clean = (v: unknown) => String(v ?? "").trim().replace(/^[=+\-@\t\r\s]+/, "").slice(0, 80);
      const childName = clean(body.childName);
      const parentName = clean(body.parentName);
      const parentPhone = String(body.parentPhone ?? "").trim().slice(0, 30);
      const childDob = /^\d{4}-\d{2}-\d{2}$/.test(String(body.childDob ?? "")) ? body.childDob : null;
      if (!MEMBERSHIP_PLANS[tier] || !childName || !parentName) return json(400, { error: "Please fill in the child's name, your name and pick a pass." });
      const variationId = await ensurePlan(tier);
      const plan = MEMBERSHIP_PLANS[tier];
      const { data: m, error } = await db.from("memberships").insert({
        user_id: user.id, parent_name: parentName, parent_email: user.email, parent_phone: parentPhone || null,
        child_name: childName, child_dob: childDob, tier, pass_code: code(6, "LM"),
      }).select().single();
      if (error) throw error;
      const origin = Deno.env.get("SITE_URL") || "https://luxplay.uk";
      const loc = await locationId();
      const linkBody = (withEmail: boolean) => ({
        idempotency_key: `membership-${m.id}${withEmail ? "" : "-ne"}`,
        quick_pay: { name: `LuxPlay ${plan.name} membership — ${childName}`, price_money: { amount: plan.pricePence, currency: "GBP" }, location_id: loc },
        checkout_options: { subscription_plan_id: variationId, redirect_url: `${origin}/my-membership?joined=${m.id}`, ask_for_shipping_address: false },
        ...(withEmail ? { pre_populated_data: { buyer_email: user.email } } : {}),
        payment_note: `membership:${m.id}`,
      });
      let link;
      try { link = await square("online-checkout/payment-links", { method: "POST", body: linkBody(true) }); }
      catch (e) { if (!String((e as Error).message).includes("INVALID_EMAIL")) throw e; link = await square("online-checkout/payment-links", { method: "POST", body: linkBody(false) }); }
      await db.from("memberships").update({ square_order_id: link.payment_link?.order_id }).eq("id", m.id);
      return json(200, { url: link.payment_link?.url });
    }

    if (action === "spaces") {
      const d = String(body.sessionDate ?? "");
      if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return json(400, { error: "Bad date" });
      const { data: bk } = await db.from("soft_play_bookings").select("session_time").eq("session_date", d);
      const ukHour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "2-digit", hour12: false }).format(new Date()));
      const spaces: Record<string, number> = {};
      for (const t of STANDARD_SESSIONS) {
        const ended = d === ukToday() && ukHour >= Number(t.slice(0, 2)) + 2;
        const left = MAX_CAPACITY - (bk ?? []).filter((b: any) => b.session_time === t).length - (HELD_SPOTS[d]?.[t] ?? 0);
        spaces[t] = ended ? -1 : !isBookable(d, t) ? 0 : Math.max(0, left);
      }
      return json(200, { spaces });
    }

    const { data: rows } = await db.from("memberships").select("*").eq("user_id", user.id).order("created_at");
    const mine = rows ?? [];

    if (action === "mine") {
      const out = [];
      for (const m of mine) {
        if (m.status === "pending" && !m.square_order_id) continue;
        if (m.status === "pending" && Date.now() - new Date(m.created_at).getTime() > 3 * 864e5) continue; // abandoned checkout
        await refresh(m);
        if (m.status === "pending" && Date.now() - new Date(m.created_at).getTime() > 2 * 36e5) continue;
        out.push({ id: m.id, child_name: m.child_name, tier: m.tier, pass_code: m.pass_code, status: m.status, paid_until: m.paid_until,
          cancel_requested: m.cancel_requested, credits_left: creditsLeft(m.tier, m.credits_month, m.credits_given), upcoming: await upcomingFor(m.id) });
      }
      return json(200, { memberships: out });
    }

    const m = mine.find((r) => r.id === body.membershipId);
    if (!m) return json(404, { error: "Membership not found" });

    if (action === "book") {
      const d = String(body.sessionDate ?? ""), t = String(body.sessionTime ?? "");
      if (!isBookable(d, t)) return json(400, { error: "That session isn't available — please pick another." });
      await refresh(m);
      if (!canEnter(m.status)) return json(403, { error: "This pass isn't active right now. Please update your payment to book." });
      if (!canBookMore((await upcomingFor(m.id)).length)) return json(409, { error: "This child already has an upcoming session booked. You can book the next one after that visit." });
      const { count: sameDay } = await db.from("soft_play_bookings").select("id", { count: "exact", head: true }).eq("stripe_session_id", `membership:${m.id}`).eq("session_date", d);
      const { count: scansDay } = await db.from("membership_checkins").select("id", { count: "exact", head: true }).eq("membership_id", m.id).eq("session_date", d);
      if (!canBookOnDay((sameDay ?? 0) + (scansDay ?? 0))) return json(409, { error: "Members can enjoy 1 session per day — please pick another day." });
      const { count } = await db.from("soft_play_bookings").select("id", { count: "exact", head: true }).eq("session_date", d).eq("session_time", t);
      if (MAX_CAPACITY - (count ?? 0) - (HELD_SPOTS[d]?.[t] ?? 0) < 1) return json(409, { error: "Sorry, that session is full. Please pick another time." });
      const bookingCode = code(6);
      const { error } = await db.from("soft_play_bookings").insert({
        session_date: d, session_time: t, child_name: m.child_name, parent_name: m.parent_name, parent_email: m.parent_email,
        parent_phone: m.parent_phone, amount_paid: 0, stripe_session_id: `membership:${m.id}`, booking_code: bookingCode, user_id: user.id,
      });
      if (error) return json(409, { error: String(error.message).includes("SESSION_FULL") ? "Sorry, that session is full." : "Booking failed, please try again." });
      return json(200, { ok: true, bookingCode });
    }

    if (action === "cancel_booking") {
      const { error } = await db.from("soft_play_bookings").delete().eq("stripe_session_id", `membership:${m.id}`).eq("booking_code", String(body.bookingCode ?? "")).eq("checked_in", false);
      if (error) return json(500, { error: "Could not cancel that booking." });
      return json(200, { ok: true });
    }

    if (action === "cancel") {
      if (!m.square_subscription_id) await refresh(m);
      if (m.square_subscription_id) await square(`subscriptions/${m.square_subscription_id}/cancel`, { method: "POST" });
      await db.from("memberships").update({ cancel_requested: true }).eq("id", m.id);
      await refresh(m);
      return json(200, { ok: true });
    }
    return json(400, { error: "Unknown action" });
  } catch (e) {
    console.error(e);
    return json(500, { error: (e as Error).message });
  }
});
