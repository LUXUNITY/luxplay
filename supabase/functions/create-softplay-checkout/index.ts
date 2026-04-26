import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SOFTPLAY_PRICE_ID = "price_1TOvjMKDxuB13duTCKh7B9pZ";
const SOFTPLAY_BABY_PRICE_ID = "price_1TQbPQKDxuB13duTtnsVuyVE";

const VALID_SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const MAX_CAPACITY = 40;
const MAX_CHILDREN_PER_BOOKING = 6;
const MAX_BABIES_PER_BOOKING = 4;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { sessionTime, sessionDate, parentName, parentPhone } = body;

    // childCount = paying children (£4, count toward 40-kid capacity)
    let childCount = 0;
    if (typeof body.childCount === "number" && Number.isFinite(body.childCount)) {
      childCount = Math.floor(body.childCount);
    } else if (Array.isArray(body.children)) {
      childCount = body.children.filter((c: unknown) =>
        typeof c === "string" ? c.trim().length > 0 : false
      ).length;
    } else if (typeof body.childName === "string" && body.childName.trim()) {
      childCount = 1;
    }

    // babyCount = babies under 2 (£3, do NOT count toward capacity)
    let babyCount = 0;
    if (typeof body.babyCount === "number" && Number.isFinite(body.babyCount)) {
      babyCount = Math.max(0, Math.floor(body.babyCount));
    }

    if (!sessionTime || !sessionDate || !parentName || (childCount + babyCount) < 1) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (childCount > MAX_CHILDREN_PER_BOOKING) {
      return new Response(
        JSON.stringify({ error: `Maximum ${MAX_CHILDREN_PER_BOOKING} children per booking` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (babyCount > MAX_BABIES_PER_BOOKING) {
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

    // Capacity check applies ONLY to children (babies don't count)
    if (childCount > 0) {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      // Only count rows that aren't babies (baby rows store child_name like "Baby 1")
      const { data: existingRows, error: countError } = await supabase
        .from("soft_play_bookings")
        .select("child_name")
        .eq("session_date", sessionDate)
        .eq("session_time", sessionTime);

      if (countError) {
        console.error("Capacity check failed:", countError);
        return new Response(
          JSON.stringify({ error: "Could not verify session availability" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const childRowCount = (existingRows || []).filter(
        (r: { child_name: string | null }) => !((r.child_name || "").startsWith("Baby"))
      ).length;

      const spotsLeft = MAX_CAPACITY - childRowCount;
      if (spotsLeft < childCount) {
        return new Response(
          JSON.stringify({
            error: "SESSION_FULL",
            message:
              spotsLeft <= 0
                ? "Sorry, this session is fully booked. Please pick another time."
                : `Only ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left in this session.`,
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const lineItems: { price: string; quantity: number }[] = [];
    if (childCount > 0) lineItems.push({ price: SOFTPLAY_PRICE_ID, quantity: childCount });
    if (babyCount > 0) lineItems.push({ price: SOFTPLAY_BABY_PRICE_ID, quantity: babyCount });

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/softplay-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#softplay`,
      metadata: {
        type: "softplay",
        sessionTime,
        sessionDate,
        quantity: String(childCount),
        childCount: String(childCount),
        babyCount: String(babyCount),
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
