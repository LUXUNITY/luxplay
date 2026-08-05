import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DEAL_PRICE_PENCE = 599;
const STANDARD_SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const MAX_CAPACITY = 15;
const MAX_BABIES_PER_BOOKING = 4;
const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_VERSION = "2024-12-18";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { sessionTime, sessionDate, parentName, parentPhone } = body;
    const quantity = typeof body.babyCount === "number" && Number.isFinite(body.babyCount)
      ? Math.floor(body.babyCount)
      : 0;

    if (!sessionDate || !parentName?.trim() || !STANDARD_SESSIONS.includes(sessionTime) || quantity < 1) {
      return new Response(JSON.stringify({ error: "Missing or invalid booking details" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (quantity > MAX_BABIES_PER_BOOKING) {
      return new Response(JSON.stringify({ error: `Maximum ${MAX_BABIES_PER_BOOKING} babies per booking` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const { count, error: countError } = await supabase
      .from("baby_soft_play_bookings")
      .select("id", { count: "exact", head: true })
      .eq("session_date", sessionDate)
      .eq("session_time", sessionTime);

    if (countError) throw new Error("Could not verify baby session availability");
    const spotsLeft = MAX_CAPACITY - (count ?? 0);
    if (spotsLeft < quantity) {
      return new Response(JSON.stringify({
        error: "SESSION_FULL",
        message: spotsLeft <= 0 ? "This baby session is full." : `Only ${spotsLeft} baby spots remain.`,
      }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    if (!accessToken || !locationId) throw new Error("Square not configured");

    const origin = Deno.env.get("SITE_URL") || "https://luxplay.uk";
    const payload = {
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: locationId,
        line_items: [{
          name: `Baby Chill & Play Deal — 2hr Baby Soft Play + Cold Drink + Ice Pop — ${sessionTime}`,
          quantity: String(quantity),
          base_price_money: { amount: DEAL_PRICE_PENCE, currency: "GBP" },
        }],
        metadata: {
          type: "baby-softplay",
          bundle: "baby-chill-play",
          sessionTime,
          sessionDate,
          babyCount: String(quantity),
          parentName: parentName.trim().slice(0, 250),
          ...(parentPhone?.trim() ? { parentPhone: parentPhone.trim().slice(0, 250) } : {}),
        },
      },
      checkout_options: {
        redirect_url: `${origin}/baby-softplay-success`,
        ask_for_shipping_address: false,
      },
    };

    const response = await fetch(`${SQUARE_BASE}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
      console.error("Square baby deal checkout error:", result);
      throw new Error(result.errors?.[0]?.detail || "Square checkout failed");
    }

    return new Response(JSON.stringify({ url: result.payment_link?.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});