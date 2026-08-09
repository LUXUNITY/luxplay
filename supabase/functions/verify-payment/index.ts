import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PACKAGE_INFO: Record<string, { name: string; credits: number }> = {
  price_1TckGFKDxuB13duTEktgvP9o: { name: "50 Credits", credits: 50 },
  price_1TckGcKDxuB13duTaP1xmia4: { name: "110 Credits", credits: 110 },
  price_1TckGzKDxuB13duTOhnEwiuM: { name: "160 Credits", credits: 160 },
  price_1TckHOKDxuB13duTO8xL6hmt: { name: "230 Credits", credits: 230 },
  price_1TckIXKDxuB13duTerIc9rna: { name: "360 Credits", credits: 360 },
  price_1TckIvKDxuB13duTbMRJimKq: { name: "500 Credits", credits: 500 },
  price_1TckJKKDxuB13duTlIpZPU4z: { name: "800 Credits", credits: 800 },
  price_1TckJbKDxuB13duTNRtZ3YtY: { name: "1500 Credits", credits: 1500 },
  // Legacy pre-sale packages
  price_1TG6CdKDxuB13duTRXf0Nj58: { name: "Explorer", credits: 130 },
  price_1TG6CtKDxuB13duTpJGgkAeF: { name: "Champion", credits: 350 },
  price_1TG6DCKDxuB13duTI7D0jZsH: { name: "Legend", credits: 800 },
  price_1TG6DZKDxuB13duTjFD95zAE: { name: "Ultimate Pass", credits: 2000 },
};

function generateRedemptionCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
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

    // Verify payment directly with Stripe
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

    // Check if order already exists (idempotent)
    const { data: existing } = await supabase
      .from("orders")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ order: existing }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Get line items to find the price
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId);
    const priceId = lineItems.data[0]?.price?.id;
    const packageInfo = priceId ? PACKAGE_INFO[priceId] : null;

    if (!packageInfo) {
      return new Response(
        JSON.stringify({ error: "Unknown package" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const redemptionCode = generateRedemptionCode();

    const { data: order, error } = await supabase.from("orders").insert({
      stripe_session_id: sessionId,
      customer_email: session.customer_details?.email || "",
      package_name: packageInfo.name,
      credits: packageInfo.credits,
      amount_paid: session.amount_total || 0,
      currency: session.currency || "gbp",
      redemption_code: redemptionCode,
    }).select().single();

    if (error) {
      console.error("Failed to insert order:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Queue confirmation + admin notification emails server-side.
    // (Client cannot call send-transactional-email — it requires service_role.)
    try {
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "redemption-code",
          recipientEmail: order.customer_email,
          idempotencyKey: `redemption-${sessionId}`,
          templateData: {
            packageName: order.package_name,
            credits: order.credits,
            redemptionCode: order.redemption_code,
          },
        },
      });
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "admin-purchase-notification",
          recipientEmail: "luxplayuk@gmail.com",
          idempotencyKey: `admin-credit-${sessionId}`,
          templateData: {
            type: "credits",
            customerEmail: order.customer_email,
            packageName: order.package_name,
            credits: order.credits,
            redemptionCode: order.redemption_code,
            amountPaid: `£${((order.amount_paid || 0) / 100).toFixed(2)}`,
          },
        },
      });
    } catch (emailErr) {
      console.error("Email enqueue failed (non-fatal):", emailErr);
    }

    return new Response(JSON.stringify({ order }), {
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
