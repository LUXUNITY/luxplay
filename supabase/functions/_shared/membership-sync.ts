// Shared Square sync for memberships: links the Square subscription created by the
// payment link, then derives pass status from Square. Used by member and staff functions.
import { MEMBERSHIP_PLANS, decideStatus, canEnter } from "./membership-rules.ts";

const SQUARE_BASE = "https://connect.squareup.com";
export async function square(path: string, init: { method?: string; body?: unknown } = {}) {
  const r = await fetch(`${SQUARE_BASE}/v2/${path}`, {
    method: init.method ?? "GET",
    headers: { Authorization: `Bearer ${Deno.env.get("SQUARE_ACCESS_TOKEN")}`, "Square-Version": "2024-12-18", "Content-Type": "application/json" },
    ...(init.body ? { body: JSON.stringify(init.body) } : {}),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Square ${path} [${r.status}]: ${JSON.stringify(j.errors ?? j)}`);
  return j;
}

// deno-lint-ignore no-explicit-any
export async function syncMembership(db: any, m: any) {
  try {
    let subId = m.square_subscription_id as string | null;
    if (!subId && m.square_order_id) {
      const { order } = await square(`orders/${m.square_order_id}`);
      let customerId = order?.customer_id;
      const paymentId = order?.tenders?.[0]?.payment_id;
      if (!customerId && paymentId) customerId = (await square(`payments/${paymentId}`)).payment?.customer_id;
      if (customerId) {
        const { data: planRow } = await db.from("membership_square_plans").select("variation_id").eq("tier", m.tier).maybeSingle();
        const s = await square("subscriptions/search", { method: "POST", body: { query: { filter: { customer_ids: [customerId], location_ids: [Deno.env.get("SQUARE_LOCATION_ID") ?? ""] } } } });
        // deno-lint-ignore no-explicit-any
        const taken = new Set(((await db.from("memberships").select("square_subscription_id").not("square_subscription_id", "is", null)).data ?? []).map((r: any) => r.square_subscription_id));
        const match = (s.subscriptions ?? [])
          // deno-lint-ignore no-explicit-any
          .filter((x: any) => x.plan_variation_id === planRow?.variation_id && !taken.has(x.id) && x.created_at >= new Date(new Date(m.created_at).getTime() - 6e4).toISOString())
          // deno-lint-ignore no-explicit-any
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
    const wasActive = ["active", "grace", "suspended"].includes(m.status);
    const patch = { square_subscription_id: subId, square_customer_id: m.square_customer_id ?? sub.customer_id, status, paid_until: paidUntil, payment_issue_since: unpaidSince, card_on_file: !!sub.card_id, updated_at: new Date().toISOString() };
    await db.from("memberships").update(patch).eq("id", m.id);
    Object.assign(m, patch);
    if (!wasActive && canEnter(status)) {
      const plan = MEMBERSHIP_PLANS[m.tier];
      const price = `£${(plan.pricePence / 100).toFixed(2)}`;
      await db.functions.invoke("send-transactional-email", { body: {
        templateName: "membership-pass", recipientEmail: m.parent_email, idempotencyKey: `membership-pass-${m.id}`,
        templateData: { parentName: m.parent_name, childName: m.child_name, tierName: plan.name, passCode: m.pass_code, price },
      } });
      await db.functions.invoke("send-transactional-email", { body: {
        templateName: "admin-purchase-notification", idempotencyKey: `admin-membership-${m.id}`,
        templateData: { type: "Membership", customerEmail: m.parent_email, packageName: `${plan.name} membership — ${m.child_name}`, amount: `${price} / month`, code: m.pass_code },
      } });
    }
  } catch (e) { console.error("membership sync failed", m.id, (e as Error).message); }
  return m;
}
