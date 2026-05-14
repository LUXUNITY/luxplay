import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const OPENING_PRICE_ID = "price_1TQc5bKDxuB13duTelrOaVZJ"; // £2 — opening weekend (23–24 May 2026)
const STANDARD_PRICE_ID = "price_1TX7njKDxuB13duTFjRbQstR"; // £3.60 — standard online (25 May+)
const NEW_SCHEDULE_FROM = "2026-05-25";

const VALID_SESSIONS = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];
const MAX_CAPACITY = 15;
const MAX_BABIES_PER_BOOKING = 4;

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
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (quantity > MAX_BABIES_PER_BOOKING) {
      return new Response(
        JSON.stringify({ error: `Maximum ${MAX_BABIES_PER_BOOKING} babies per booking` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!VALID_SESSIONS.includes(sessionTime)) {
      return new Response(
        JSON.stringify({ error: "Invalid session time" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
      return new Response(
        JSON.stringify({ error: "Could not verify session availability" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const spotsLeft = MAX_CAPACITY - (count ?? 0);
    if (spotsLeft < quantity) {
      return new Response(
        JSON.stringify({
          error: "SESSION_FULL",
          message:
            spotsLeft <= 0
              ? "Sorry, this baby session is fully booked. Please pick another time."
              : `Only ${spotsLeft} baby spot${spotsLeft === 1 ? "" : "s"} left in this session.`,
        }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: sessionDate < NEW_SCHEDULE_FROM ? OPENING_PRICE_ID : STANDARD_PRICE_ID, quantity }],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/baby-softplay-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#baby-softplay`,
      metadata: {
        type: "baby-softplay",
        sessionTime,
        sessionDate,
        babyCount: String(quantity),
        parentName,
        parentPhone: parentPhone || "",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
