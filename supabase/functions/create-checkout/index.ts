import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRICE_MAP: Record<string, string> = {
  c50: "price_1TckGFKDxuB13duTEktgvP9o",
  c110: "price_1TckGcKDxuB13duTaP1xmia4",
  c160: "price_1TckGzKDxuB13duTOhnEwiuM",
  c230: "price_1TckHOKDxuB13duTO8xL6hmt",
  c360: "price_1TckIXKDxuB13duTerIc9rna",
  c500: "price_1TckIvKDxuB13duTbMRJimKq",
  c800: "price_1TckJKKDxuB13duTlIpZPU4z",
  c1500: "price_1TckJbKDxuB13duTNRtZ3YtY",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { packageId } = await req.json();

    if (!packageId || !PRICE_MAP[packageId]) {
      return new Response(
        JSON.stringify({ error: "Invalid package selected" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: PRICE_MAP[packageId], quantity: 1 }],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/#presale`,
      customer_creation: "always",
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
