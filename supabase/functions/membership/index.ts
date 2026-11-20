// Monthly soft play memberships billed by Square subscriptions.
// Actions (signed-in parents only): join, mine, book, cancel.
import { createClient } from "npm:@supabase/supabase-js@2.57.2";
import { MEMBERSHIP_PLANS, decideStatus, canEnter, canBookMore, creditsLeft } from "../_shared/membership-rules.ts";

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

// Bring a pass up to date from Square (payment status, paid-until, suspension).
async function refresh(m: any) {
  try {
    let subId = m.square_subscription_id as string | null;
    if (!subId && m.square_order_id) {
      const { order } = await square(`orders/${m.square_order_id}`);
      let customerId = order?.customer_id;
      const paymentId = order?.tenders?.[0]?.payment_id;
      if (!customerId && paymentId) customerId = (await square(`payments/${paymentId}`)).payment?.customer_id;
      if (customerId) {
        const { data: planRow } = await db.from("membership_square_plans").select("variation_id").eq("tier", m.tier).maybeSingle();
        const s = await square("subscriptions/search", { method: "POST", body: { query: { filter: { customer_ids: [customerId], location_ids: [await locationId()] } } } });
        const taken = new Set(((await db.from("memberships").select("square_subscription_id").not("square_subscription_id", "is", null)).data ?? []).map((r: any) => r.square_subscription_id));
        const match = (s.subscriptions ?? [])
          .filter((x: any) => x.plan_variation_id === planRow?.variation_id && !taken.has(x.id) && x.created_at >= new Date(new Date(m.created_at).getTime() - 6e4).toISOString())
          .sort((a: any, b: any) => a.created_at.localeCompare(b.created_at))[0];
        if (match) { subId = match.id; m.square_customer_id = customerId; }
      }
    }
    if (!subId) return m;
    const { subscription: sub } = await square(`subscriptions/${subId}`);
    let unpaidSince: string | null = null;
    for (const invId of (sub.invoice_ids ?? []).slice(0, 3)) {
      const { invoice } = await square(`invoices/${invId}`);
      const due = invoice?.payment_requests?.[0]?.due_date;
      if ((invoice?.status === "UNPAID" || invoice?.status === "PARTIALLY_PAID") && due && `${due}T00:00:00Z` <= new Date().toISOString()) {
        const t = `${due}T00:00:00Z`;
        if (!unpaidSince || t < unpaidSince) unpaidSince = t;
      }
    }
    const paidUntil = sub.charged_through_date ?? sub.canceled_date ?? null;
    const status = decideStatus({ subscriptionStatus: sub.status, paidUntil, unpaidSince });
    const wasActive = m.status === "active" || m.status === "grace" || m.status === "suspended";
    const patch = { square_subscription_id: subId, square_customer_id: m.square_customer_id ?? sub.customer_id, status, paid_until: paidUntil, payment_issue_since: unpaidSince, updated_at: new Date().toISOString() };
    await db.from("memberships").update(patch).eq("id", m.id);
    Object.assign(m, patch);
    if (!wasActive && canEnter(status)) {
      const plan = MEMBERSHIP_PLANS[m.tier];
      await db.functions.invoke("send-transactional-email", { body: {
        templateName: "membership-pass", recipientEmail: m.parent_email, idempotencyKey: `membership-pass-${m.id}`,
        templateData: { parentName: m.parent_name, childName: m.child_name, tierName: plan.name, passCode: m.pass_code, price: `£${(plan.pricePence / 100).toFixed(2)}` },
      } });
      await db.functions.invoke("send-transactional-email", { body: {
        templateName: "admin-purchase-notification", idempotencyKey: `admin-membership-${m.id}`,
        templateData: { type: "Membership", customerEmail: m.parent_email, packageName: `${plan.name} membership — ${m.child_name}`, amount: `£${(plan.pricePence / 100).toFixed(2)} / month`, code: m.pass_code },
      } });
    }
  } catch (e) { console.error("refresh failed", m.id, (e as Error).message); }
  return m;
}

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
      const childName = String(body.childName ?? "").trim().slice(0, 80);
      const parentName = String(body.parentName ?? "").trim().slice(0, 80);
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
      const link = await square("online-checkout/payment-links", { method: "POST", body: {
        idempotency_key: `membership-${m.id}`,
        quick_pay: { name: `LuxPlay ${plan.name} membership — ${childName}`, price_money: { amount: plan.pricePence, currency: "GBP" }, location_id: await locationId() },
        checkout_options: { subscription_plan_id: variationId, redirect_url: `${origin}/my-membership?joined=${m.id}`, ask_for_shipping_address: false },
        pre_populated_data: { buyer_email: user.email },
        payment_note: `membership:${m.id}`,
      } });
      await db.from("memberships").update({ square_order_id: link.payment_link?.order_id }).eq("id", m.id);
      return json(200, { url: link.payment_link?.url });
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
