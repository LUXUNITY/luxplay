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

const bookingCandidates = (core: string, prefix: string) => {
  const out = new Set<string>();
  if (core.length === 6) out.add(`${prefix}-${core.slice(0, 3)}-${core.slice(3)}`);
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

    const isOrderish = c.startsWith("LUX") || c.replace(/^LUX/, "").length === 8;
    const orderCore = c.startsWith("LUX") ? c.slice(3) : c;
    const bspCore = c.startsWith("BSP") ? c.slice(3) : c.startsWith("SP") ? c.slice(2) : c;

    // 1. Orders (LUX-XXXX-XXXX)
    if (isOrderish && orderCore.length === 8) {
      const code = `LUX-${orderCore.slice(0, 4)}-${orderCore.slice(4)}`;
      const { data } = await supabase
        .from("orders").select("*").eq("redemption_code", code).maybeSingle();
      if (data) return json(200, { kind: "order", data });
    }

    // 2. Big soft play (SP-XXX-XXX) — skip if the user explicitly typed BSP
    if (!c.startsWith("BSP")) {
      for (const code of bookingCandidates(bspCore, "SP")) {
        const { data } = await supabase
          .from("soft_play_bookings").select("*").eq("booking_code", code).maybeSingle();
        if (data) return json(200, { kind: "booking", table: "soft_play_bookings", data });
      }
    }

    // 3. Baby soft play (BSP-XXX-XXX)
    for (const code of bookingCandidates(bspCore, "BSP")) {
      const { data } = await supabase
        .from("baby_soft_play_bookings").select("*").eq("booking_code", code).maybeSingle();
      if (data) return json(200, { kind: "baby_booking", table: "baby_soft_play_bookings", data });
    }

    // 4. Last resort: exact match on whatever was typed
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
