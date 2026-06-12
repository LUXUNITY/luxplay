import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRICE_PENCE = 360; // £3.60 (10% off £4 door price)

const VALID_SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const MAX_CAPACITY = 15;
const MAX_BABIES_PER_BOOKING = 4;

const SQUARE_BASE = "https://connect.squareupsandbox.com";
const SQUARE_VERSION = "2024-12-18";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { sessionTime, sessionDate, parentName, parentPhone } = body;

    let quantity = 0;
    if (typeof body.babyCount === "number" && Number.isFinite(body.babyCount)) {
      quantity = Math.floor(body.babyCount);
    }

    if (!sessionTime || !sessionDate || !parentName || quantity < 1) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (quantity > MAX_BABIES_PER_BOOKING) {
      return new Response(JSON.stringify({ error: `Maximum ${MAX_BABIES_PER_BOOKING} babies per booking` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!VALID_SESSIONS.includes(sessionTime)) {
      return new Response(JSON.stringify({ error: "Invalid session time" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { count, error: countError } = await supabase
      .from("baby_soft_play_bookings")
      .select("id", { count: "exact", head: true })
      .eq("session_date", sessionDate)
      .eq("session_time", sessionTime);

    if (countError) {
      console.error("Baby capacity check failed:", countError);
      return new Response(JSON.stringify({ error: "Could not verify session availability" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const spotsLeft = MAX_CAPACITY - (count ?? 0);
    if (spotsLeft < quantity) {
      return new Response(JSON.stringify({
        error: "SESSION_FULL",
        message: spotsLeft <= 0
          ? "Sorry, this baby session is fully booked. Please pick another time."
          : `Only ${spotsLeft} baby spot${spotsLeft === 1 ? "" : "s"} left in this session.`,
      }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    if (!accessToken || !locationId) {
      return new Response(JSON.stringify({ error: "Square not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const perBabyPence = PRICE_PENCE;
    const origin = req.headers.get("origin") || "https://luxplay.uk";

    const payload = {
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: locationId,
        line_items: [{
          name: `Baby Soft Play — ${sessionTime} — ${quantity} ${quantity === 1 ? "baby" : "babies"}`,
          quantity: String(quantity),
          base_price_money: { amount: perBabyPence, currency: "GBP" },
        }],
        metadata: {
          type: "baby-softplay",
          sessionTime,
          sessionDate,
          babyCount: String(quantity),
          parentName: parentName.slice(0, 250),
          parentPhone: (parentPhone || "").slice(0, 250),
        },
      },
      checkout_options: {
        redirect_url: `${origin}/baby-softplay-success`,
        ask_for_shipping_address: false,
      },
    };

    const resp = await fetch(`${SQUARE_BASE}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await resp.json();
    if (!resp.ok) {
      console.error("Square error:", json);
      return new Response(JSON.stringify({ error: json.errors?.[0]?.detail || "Square checkout failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: json.payment_link?.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
