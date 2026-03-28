import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const PACKAGE_INFO: Record<string, { name: string; credits: number }> = {
  price_1TG6CdKDxuB13duTRXf0Nj58: { name: "Explorer", credits: 130 },
  price_1TG6CtKDxuB13duTpJGgkAeF: { name: "Champion", credits: 350 },
  price_1TG6DCKDxuB13duTI7D0jZsH: { name: "Legend", credits: 800 },
  price_1TG6DZKDxuB13duTjFD95zAE: { name: "Ultimate Pass", credits: 2000 },
};

function generateRedemptionCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "LUX-";
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += "-";
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

serve(async (req) => {
  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const signature = req.headers.get("stripe-signature");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!signature || !webhookSecret) {
    return new Response("Missing signature or webhook secret", { status: 400 });
  }

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get line items to find the price
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const priceId = lineItems.data[0]?.price?.id;
    const packageInfo = priceId ? PACKAGE_INFO[priceId] : null;

    if (!packageInfo) {
      console.error("Unknown price ID:", priceId);
      return new Response("Unknown product", { status: 200 });
    }

    const redemptionCode = generateRedemptionCode();

    const { error } = await supabase.from("orders").insert({
      stripe_session_id: session.id,
      customer_email: session.customer_details?.email || "",
      package_name: packageInfo.name,
      credits: packageInfo.credits,
      amount_paid: session.amount_total || 0,
      currency: session.currency || "gbp",
      redemption_code: redemptionCode,
    });

    if (error) {
      console.error("Failed to insert order:", error);
      return new Response("Database error", { status: 500 });
    }

    console.log(`Order created: ${redemptionCode} for ${packageInfo.name}`);
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
