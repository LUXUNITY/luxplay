import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const CHILD_UNIT_AMOUNT = 400; // £4.00 in pence
const BABY_UNIT_AMOUNT = 300;  // £3.00 in pence

function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "SP-";
  for (let i = 0; i < 6; i++) {
    if (i === 3) code += "-";
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: "Missing session ID" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Payment not completed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Idempotent check — return all bookings already saved for this session
    const { data: existing } = await supabase
      .from("soft_play_bookings")
      .select("*")
      .eq("stripe_session_id", sessionId);

    if (existing && existing.length > 0) {
      return new Response(
        JSON.stringify({ booking: existing[0], bookings: existing }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    const meta = session.metadata || {};

    let childCount = 0;
    if (meta.childCount) childCount = parseInt(meta.childCount, 10) || 0;
    if (!childCount && meta.quantity) childCount = parseInt(meta.quantity, 10) || 0;
    if (!childCount && meta.children) {
      try {
        const parsed = JSON.parse(meta.children);
        if (Array.isArray(parsed)) childCount = parsed.length;
      } catch (_e) { /* ignore */ }
    }
    if (!childCount && meta.childName) childCount = 1;

    let babyCount = 0;
    if (meta.babyCount) babyCount = parseInt(meta.babyCount, 10) || 0;

    if (childCount + babyCount === 0) childCount = 1;

    // child_name is NOT NULL in the schema, so we store an indexed placeholder.
    // "Child N" for paying children, "Baby N" for under-2s. The "Baby" prefix
    // is what the capacity-counter uses to exclude babies from the 40-spot limit.
    const childRows = Array.from({ length: childCount }, (_, i) => ({
      stripe_session_id: sessionId,
      session_time: meta.sessionTime || "10:00",
      session_date: meta.sessionDate || new Date().toISOString().split("T")[0],
      child_name: `Child ${i + 1}`,
      parent_name: meta.parentName || "Unknown",
      parent_email: session.customer_details?.email || "",
      parent_phone: meta.parentPhone || null,
      amount_paid: CHILD_UNIT_AMOUNT,
      currency: session.currency || "gbp",
      booking_code: generateBookingCode(),
    }));

    const babyRows = Array.from({ length: babyCount }, (_, i) => ({
      stripe_session_id: sessionId,
      session_time: meta.sessionTime || "10:00",
      session_date: meta.sessionDate || new Date().toISOString().split("T")[0],
      child_name: `Baby ${i + 1}`,
      parent_name: meta.parentName || "Unknown",
      parent_email: session.customer_details?.email || "",
      parent_phone: meta.parentPhone || null,
      amount_paid: BABY_UNIT_AMOUNT,
      currency: session.currency || "gbp",
      booking_code: generateBookingCode(),
    }));

    const rows = [...childRows, ...babyRows];

    const { data: bookings, error } = await supabase
      .from("soft_play_bookings")
      .insert(rows)
      .select();

    if (error) {
      console.error("Failed to insert bookings:", error);

      const isSessionFull =
        (error.message || "").includes("SESSION_FULL") ||
        (error as any).code === "23514";

      if (isSessionFull && session.payment_intent) {
        try {
          await stripe.refunds.create({
            payment_intent: session.payment_intent as string,
            reason: "requested_by_customer",
          });
          console.log("Auto-refunded overbooked session:", sessionId);
        } catch (refundErr) {
          console.error("Refund failed:", refundErr);
        }

        return new Response(
          JSON.stringify({
            error: "SESSION_FULL",
            message:
              "Sorry — this session filled up before your payment completed. You've been automatically refunded. Please pick another time.",
          }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to save booking" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ booking: bookings?.[0], bookings }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
