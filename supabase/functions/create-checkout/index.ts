import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_VERSION = "2024-12-18";

// Arcade credit packages — priced in pence, charged through Square.
const PACKAGES: Record<string, { name: string; credits: number; amount: number }> = {
  c50:   { name: "50 Credits",   credits: 50,   amount: 500 },
  c130:  { name: "130 Credits",  credits: 130,  amount: 1000 },
  c300:  { name: "350 Credits",  credits: 350,  amount: 2000 },
  c800:  { name: "900 Credits",  credits: 900,  amount: 5000 },
  c2000: { name: "2500 Credits", credits: 2500, amount: 10000 },
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { packageId } = await req.json();
    const pkg = typeof packageId === "string" ? PACKAGES[packageId] : undefined;

    if (!pkg) {
      return new Response(JSON.stringify({ error: "Invalid package selected" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    if (!accessToken || !locationId) throw new Error("Square not configured");

    // Hardcoded production base — never trust a caller-supplied Origin header
    // for post-payment redirects (open-redirect risk).
    const siteUrl = Deno.env.get("SITE_URL") || "https://luxplay.uk";

    const payload = {
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: locationId,
        line_items: [{
          name: `LuxPlay Arcade — ${pkg.name}`,
          quantity: "1",
          base_price_money: { amount: pkg.amount, currency: "GBP" },
        }],
        metadata: {
          type: "credits",
          packageId,
          packageName: pkg.name,
          credits: String(pkg.credits),
        },
      },
      checkout_options: {
        redirect_url: `${siteUrl}/payment-success`,
        ask_for_shipping_address: false,
      },
    };

    const response = await fetch(`${SQUARE_BASE}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
      console.error("Square credits checkout error:", JSON.stringify(result));
      throw new Error(result.errors?.[0]?.detail || "Square checkout failed");
    }

    return new Response(JSON.stringify({ url: result.payment_link?.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
