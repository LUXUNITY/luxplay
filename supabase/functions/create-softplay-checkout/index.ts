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
const MAX_CHILDREN_PER_BOOKING = 6;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { sessionTime, sessionDate, parentName, parentPhone } = body;

    // Backward-compatible: accept either `children: string[]` or single `childName`
    let children: string[] = Array.isArray(body.children)
      ? body.children.map((c: unknown) => String(c || "").trim()).filter(Boolean)
      : [];
    if (children.length === 0 && typeof body.childName === "string" && body.childName.trim()) {
      children = [body.childName.trim()];
    }

    if (!sessionTime || !sessionDate || !parentName || children.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (children.length > MAX_CHILDREN_PER_BOOKING) {
      return new Response(
        JSON.stringify({ error: `Maximum ${MAX_CHILDREN_PER_BOOKING} children per booking` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // De-duplicate child names within a single booking (DB has unique (stripe_session_id, child_name))
    const seen = new Set<string>();
    const uniqueChildren: string[] = [];
    for (const c of children) {
      const key = c.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueChildren.push(c);
      }
    }
    if (uniqueChildren.length !== children.length) {
      return new Response(
        JSON.stringify({ error: "Each child must have a unique name in the same booking" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!VALID_SESSIONS.includes(sessionTime)) {
      return new Response(
        JSON.stringify({ error: "Invalid session time" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const quantity = uniqueChildren.length;

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

    const spotsLeft = MAX_CAPACITY - (count ?? 0);
    if (spotsLeft < quantity) {
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

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: SOFTPLAY_PRICE_ID, quantity }],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/softplay-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#softplay`,
      metadata: {
        type: "softplay",
        sessionTime,
        sessionDate,
        // Stripe metadata values must be strings (max 500 chars per value)
        children: JSON.stringify(uniqueChildren).slice(0, 500),
        quantity: String(quantity),
        // Keep legacy field for backwards compatibility / convenience
        childName: uniqueChildren[0],
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
