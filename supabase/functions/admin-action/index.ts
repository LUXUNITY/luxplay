// Admin-only actions: lookup + redeem orders, lookup + check-in bookings.
// Gated by ADMIN_PASSWORD secret sent in the `x-admin-password` header.
// This is the only way the Admin UI can write to orders / soft_play_bookings
// (their RLS UPDATE/INSERT policies now require service_role).
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

  if (action === "lookup_order") {
    const code = String(body.code ?? "").trim();
    if (!code) return json(400, { error: "code required" });
    const { data, error } = await supabase
      .from("orders").select("*").eq("redemption_code", code).maybeSingle();
    if (error) return json(500, { error: error.message });
    return json(200, { data });
  }

  if (action === "lookup_booking") {
    const code = String(body.code ?? "").trim();
    if (!code) return json(400, { error: "code required" });
    const { data, error } = await supabase
      .from("soft_play_bookings").select("*").eq("booking_code", code).maybeSingle();
    if (error) return json(500, { error: error.message });
    return json(200, { data });
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
    if (!id) return json(400, { error: "id required" });
    const { error } = await supabase
      .from("soft_play_bookings")
      .update({ checked_in: true, checked_in_at: new Date().toISOString() })
      .eq("id", id);
    if (error) return json(500, { error: error.message });
    return json(200, { ok: true });
  }

  return json(400, { error: "Unknown action" });
});
