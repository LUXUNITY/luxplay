import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRICE_MAP: Record<string, string> = {
  c50:   "price_1TckGFKDxuB13duTEktgvP9o", // 50 credits @ £5
  c130:  "price_1TlSNKKDxuB13duT5u6Mp5k8", // 130 credits @ £10
  c300:  "price_1TlSNgKDxuB13duTOyzobVeB", // 300 credits @ £20 (Most Popular)
  c800:  "price_1TlSOyKDxuB13duTww8HTFly", // 800 credits @ £50
  c2000: "price_1TlSPEKDxuB13duT0CDjJX5o", // 2000 credits @ £100
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

    // Hardcoded production base — never trust the caller-supplied Origin header
    // for post-payment redirects (open-redirect / session-id exfiltration risk).
    const siteUrl = Deno.env.get("SITE_URL") || "https://luxplay.uk";
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: PRICE_MAP[packageId], quantity: 1 }],
      mode: "payment",
      success_url: `${siteUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/#presale`,
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
