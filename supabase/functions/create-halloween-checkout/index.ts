import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Halloween Spooktacular — 4PM–9PM, £19.99 per ticket, 100 tickets per night.
// Mirrors src/components/halloween/halloweenEvent.ts
const EVENT_DATES = ["2026-10-30", "2026-10-31"];
const EVENT_SESSION = "HALLOWEEN";
const PRICE_PENCE = 1999;
const MAX_CAPACITY = 100;
const MAX_PER_BOOKING = 8;

const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_VERSION = "2024-12-18";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const ukTodayISO = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { sessionDate, parentName, parentPhone } = body;
    const quantity = typeof body.ticketCount === "number" && Number.isFinite(body.ticketCount)
      ? Math.floor(body.ticketCount) : 0;

    if (typeof sessionDate !== "string" || !EVENT_DATES.includes(sessionDate)) {
      return json({ error: "Please pick 30th or 31st October." }, 400);
    }
    if (sessionDate < ukTodayISO()) {
      return json({ error: "That night has already happened — please pick another." }, 400);
    }
    if (typeof parentName !== "string" || !parentName.trim() || parentName.length > 250) {
      return json({ error: "Please enter a parent or guardian name." }, 400);
    }
    if (quantity < 1 || quantity > MAX_PER_BOOKING) {
      return json({ error: `Choose between 1 and ${MAX_PER_BOOKING} tickets.` }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );
    const { count, error: countError } = await supabase
      .from("soft_play_bookings")
      .select("id", { count: "exact", head: true })
      .eq("session_date", sessionDate)
      .eq("session_time", EVENT_SESSION);
    if (countError) {
      console.error("Halloween capacity check failed:", countError);
      return json({ error: "Could not check tickets left — please try again." }, 500);
    }
    const left = MAX_CAPACITY - (count ?? 0);
    if (left < quantity) {
      return json({
        error: "SESSION_FULL",
        message: left <= 0
          ? "Sorry — this night is SOLD OUT! 👻 Try the other night."
          : `Only ${left} ticket${left === 1 ? "" : "s"} left for this night!`,
      }, 409);
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    if (!accessToken || !locationId) return json({ error: "Payments not configured" }, 500);

    const origin = Deno.env.get("SITE_URL") || "https://luxplay.uk";
    const nightLabel = sessionDate === "2026-10-30" ? "Fri 30 Oct" : "Sat 31 Oct";

    const resp = await fetch(`${SQUARE_BASE}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        order: {
          location_id: locationId,
          line_items: [{
            name: `🎃 Halloween Spooktacular — ${nightLabel} 4PM–9PM — Free Play Arcade + Spooky Soft Play`,
            quantity: String(quantity),
            base_price_money: { amount: PRICE_PENCE, currency: "GBP" },
          }],
          metadata: {
            type: "softplay",
            bundle: "halloween",
            sessionTime: EVENT_SESSION,
            sessionDate,
            childCount: String(quantity),
            parentName: parentName.trim().slice(0, 250),
            ...(typeof parentPhone === "string" && parentPhone.trim()
              ? { parentPhone: parentPhone.trim().slice(0, 250) } : {}),
          },
        },
        checkout_options: {
          redirect_url: `${origin}/softplay-success`,
          ask_for_shipping_address: false,
        },
      }),
    });
    const result = await resp.json();
    if (!resp.ok) {
      console.error("Square halloween checkout error:", JSON.stringify(result));
      return json({ error: result.errors?.[0]?.detail || "Checkout failed" }, 500);
    }
    return json({ url: result.payment_link?.url });
  } catch (error) {
    return json({ error: (error as Error).message }, 500);
  }
});
