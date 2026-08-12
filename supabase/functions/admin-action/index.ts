// Admin-only actions: lookup + redeem orders, lookup + check-in bookings.
// Gated by ADMIN_PASSWORD secret sent in the `x-admin-password` header.
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const timingSafeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

// Strip everything except A-Z0-9 and uppercase — staff can type "vv8b9c".
const compact = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, "");

// Build every plausible booking code from a compacted string, without assuming
// whether the staff member typed the prefix or not. Codes whose core itself
// begins with "SP"/"B" (e.g. SP-SPH-6R4) broke the old prefix-stripping logic.
const bookingCandidates = (c: string, prefix: string) => {
  const out = new Set<string>();
  const cores = new Set<string>();
  if (c.length >= 6) cores.add(c.slice(-6)); // last 6 chars = the core
  if (c.length === 6) cores.add(c);
  if (c.startsWith(prefix)) {
    const stripped = c.slice(prefix.length);
    if (stripped.length >= 6) cores.add(stripped.slice(0, 6));
  }
  for (const core of cores) {
    if (core.length === 6) out.add(`${prefix}-${core.slice(0, 3)}-${core.slice(3)}`);
  }
  return Array.from(out);
};

const orderCandidates = (c: string) => {
  const out = new Set<string>();
  const cores = new Set<string>();
  if (c.length >= 8) cores.add(c.slice(-8));
  if (c.length === 8) cores.add(c);
  if (c.startsWith("LUX") && c.length >= 11) cores.add(c.slice(3, 11));
  for (const core of cores) {
    if (core.length === 8) out.add(`LUX-${core.slice(0, 4)}-${core.slice(4)}`);
  }
  return Array.from(out);
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const adminPassword = Deno.env.get("ADMIN_PASSWORD") ?? "";
  const provided = req.headers.get("x-admin-password") ?? "";
  if (!adminPassword || !provided || !timingSafeEqual(provided, adminPassword)) {
    return json(401, { error: "Unauthorized" });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  const action = String(body?.action ?? "");
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  // Single smart lookup: accepts full codes, codes without dashes, or just the
  // 6/8 character core without any prefix. Searches orders + both booking tables.
  if (action === "lookup" || action === "lookup_order" || action === "lookup_booking") {
    const raw = String(body.code ?? "");
    const c = compact(raw);
    if (!c) return json(400, { error: "code required" });

    const typedBaby = c.startsWith("BSP");
    const typedBig = !typedBaby && c.startsWith("SP");

    // 0. New-style plain codes (no dashes, no prefix) — exact match on the
    // compacted characters across all three tables.
    {
      const { data } = await supabase
        .from("orders").select("*").eq("redemption_code", c).maybeSingle();
      if (data) return json(200, { kind: "order", data });
      const { data: b0 } = await supabase
        .from("soft_play_bookings").select("*").eq("booking_code", c).maybeSingle();
      if (b0) return json(200, { kind: "booking", table: "soft_play_bookings", data: b0 });
      const { data: bb0 } = await supabase
        .from("baby_soft_play_bookings").select("*").eq("booking_code", c).maybeSingle();
      if (bb0) return json(200, { kind: "baby_booking", table: "baby_soft_play_bookings", data: bb0 });
    }


    // 1. Orders (LUX-XXXX-XXXX)
    for (const code of orderCandidates(c)) {
      const { data } = await supabase
        .from("orders").select("*").eq("redemption_code", code).maybeSingle();
      if (data) return json(200, { kind: "order", data });
    }

    // 2. Big soft play (SP-XXX-XXX) — skip only if the user explicitly typed BSP
    if (!typedBaby) {
      for (const code of bookingCandidates(c, "SP")) {
        const { data } = await supabase
          .from("soft_play_bookings").select("*").eq("booking_code", code).maybeSingle();
        if (data) return json(200, { kind: "booking", table: "soft_play_bookings", data });
      }
    }

    // 3. Baby soft play (BSP-XXX-XXX) — skip only if they explicitly typed SP
    if (!typedBig) {
      for (const code of bookingCandidates(c, "BSP")) {
        const { data } = await supabase
          .from("baby_soft_play_bookings").select("*").eq("booking_code", code).maybeSingle();
        if (data) return json(200, { kind: "baby_booking", table: "baby_soft_play_bookings", data });
      }
    }

    // 4. Fallback: suffix match on the raw characters typed (handles partials
    // and any prefix confusion, e.g. "sph6r4" for SP-SPH-6R4).
    const tail = c.length >= 4 ? c.slice(-6) : "";
    if (tail) {
      const like = `%${tail.slice(0, 3)}-${tail.slice(3)}`;
      const { data: b2 } = await supabase
        .from("soft_play_bookings").select("*").ilike("booking_code", like).limit(1);
      if (b2?.[0]) return json(200, { kind: "booking", table: "soft_play_bookings", data: b2[0] });
      const { data: bb2 } = await supabase
        .from("baby_soft_play_bookings").select("*").ilike("booking_code", like).limit(1);
      if (bb2?.[0]) return json(200, { kind: "baby_booking", table: "baby_soft_play_bookings", data: bb2[0] });
    }

    // 5. Last resort: exact match on whatever was typed
    const typed = raw.toUpperCase().trim();
    const { data: o } = await supabase
      .from("orders").select("*").eq("redemption_code", typed).maybeSingle();
    if (o) return json(200, { kind: "order", data: o });
    const { data: b } = await supabase
      .from("soft_play_bookings").select("*").eq("booking_code", typed).maybeSingle();
    if (b) return json(200, { kind: "booking", table: "soft_play_bookings", data: b });
    const { data: bb } = await supabase
      .from("baby_soft_play_bookings").select("*").eq("booking_code", typed).maybeSingle();
    if (bb) return json(200, { kind: "baby_booking", table: "baby_soft_play_bookings", data: bb });

    // 6. Broad fallback: receipt / transaction ID, email address, or name.
    // Customers who never received their code email can still be found this way.
    {
      const term = raw.trim();
      const matches: any[] = [];
      const push = (kind: string, table: string | null, rows: any[] | null) => {
        for (const r of rows ?? []) matches.push({ kind, table, data: r });
      };

      // Receipt / Square transaction or order id (often long, mixed case)
      if (term.length >= 6) {
        const like = `%${term}%`;
        const [o1, s1, b1] = await Promise.all([
          supabase.from("orders").select("*").ilike("stripe_session_id", like).limit(5),
          supabase.from("soft_play_bookings").select("*").ilike("stripe_session_id", like).limit(5),
          supabase.from("baby_soft_play_bookings").select("*").ilike("stripe_session_id", like).limit(5),
        ]);
        push("order", null, o1.data);
        push("booking", "soft_play_bookings", s1.data);
        push("baby_booking", "baby_soft_play_bookings", b1.data);
      }

      // Email address
      if (!matches.length && term.includes("@")) {
        const like = `%${term}%`;
        const [o2, s2, b2] = await Promise.all([
          supabase.from("orders").select("*").ilike("customer_email", like)
            .order("created_at", { ascending: false }).limit(10),
          supabase.from("soft_play_bookings").select("*").ilike("parent_email", like)
            .order("created_at", { ascending: false }).limit(10),
          supabase.from("baby_soft_play_bookings").select("*").ilike("parent_email", like)
            .order("created_at", { ascending: false }).limit(10),
        ]);
        push("order", null, o2.data);
        push("booking", "soft_play_bookings", s2.data);
        push("baby_booking", "baby_soft_play_bookings", b2.data);
      }

      // Customer name (bookings only)
      if (!matches.length && /[a-z]/i.test(term) && term.length >= 3) {
        const like = `%${term}%`;
        const [s3, b3] = await Promise.all([
          supabase.from("soft_play_bookings").select("*").ilike("parent_name", like)
            .order("session_date", { ascending: false }).limit(10),
          supabase.from("baby_soft_play_bookings").select("*").ilike("parent_name", like)
            .order("session_date", { ascending: false }).limit(10),
        ]);
        push("booking", "soft_play_bookings", s3.data);
        push("baby_booking", "baby_soft_play_bookings", b3.data);
      }

      if (matches.length === 1) {
        const m = matches[0];
        return json(200, { kind: m.kind, table: m.table, data: m.data });
      }
      if (matches.length > 1) return json(200, { kind: "matches", matches });
    }

    return json(200, { kind: null, data: null });
  }


  if (action === "redeem_order") {
    const id = String(body.id ?? "");
    if (!id) return json(400, { error: "id required" });
    const { error } = await supabase
      .from("orders")
      .update({ redeemed: true, redeemed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return json(500, { error: error.message });
    return json(200, { ok: true });
  }

  if (action === "checkin_booking") {
    const id = String(body.id ?? "");
    const table = String(body.table ?? "soft_play_bookings");
    if (!id) return json(400, { error: "id required" });
    if (table !== "soft_play_bookings" && table !== "baby_soft_play_bookings") {
      return json(400, { error: "invalid table" });
    }
    const { error } = await supabase
      .from(table)
      .update({ checked_in: true, checked_in_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return json(500, { error: error.message });
    return json(200, { ok: true });
  }

  return json(400, { error: "Unknown action" });
});
