import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SOFTPLAY_PRICE_ID = "price_1TOvjMKDxuB13duTCKh7B9pZ";

const VALID_SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const MAX_CAPACITY = 40;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionTime, sessionDate, childName, parentName, parentPhone } = await req.json();

    if (!sessionTime || !sessionDate || !childName || !parentName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!VALID_SESSIONS.includes(sessionTime)) {
      return new Response(
        JSON.stringify({ error: "Invalid session time" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Pre-checkout capacity check (DB trigger remains the final guarantee)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { count, error: countError } = await supabase
      .from("soft_play_bookings")
      .select("id", { count: "exact", head: true })
      .eq("session_date", sessionDate)
      .eq("session_time", sessionTime);

    if (countError) {
      console.error("Capacity check failed:", countError);
      return new Response(
        JSON.stringify({ error: "Could not verify session availability" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if ((count ?? 0) >= MAX_CAPACITY) {
      return new Response(
        JSON.stringify({
          error: "SESSION_FULL",
          message: "Sorry, this session is fully booked. Please pick another time.",
        }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: SOFTPLAY_PRICE_ID, quantity: 1 }],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/softplay-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#softplay`,
      metadata: {
        type: "softplay",
        sessionTime,
        sessionDate,
        childName,
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
