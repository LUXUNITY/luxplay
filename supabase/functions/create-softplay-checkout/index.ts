import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Pricing (in pence) — mirrors src/components/softplay/dateSlots.ts
const FULL_PRICE_PENCE = 800;

const STANDARD_SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const REMOVED_TODAY_SESSIONS: string[] = [];
const MAX_CAPACITY = 40;
const MAX_CHILDREN_PER_BOOKING = 6;

const getUKTDateISO = () => {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
};

const BLOCKED_SLOTS: Record<string, string[]> = {
  "2026-08-15": ["14:00"], // private party
  "2026-09-05": ["10:00"], // private party
};

const getValidSessions = (sessionDate: string) => {
  const base = sessionDate === getUKTDateISO()
    ? STANDARD_SESSIONS.filter((s) => !REMOVED_TODAY_SESSIONS.includes(s))
    : STANDARD_SESSIONS;
  const blocked = BLOCKED_SLOTS[sessionDate] ?? [];
  return base.filter((s) => !blocked.includes(s));
};

const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_VERSION = "2024-12-18";

const BOOKING_WINDOW_DAYS = 14;
const OPENING_DATE = "2026-06-13";
const ukTodayISO = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
};
// Reject past dates, pre-opening dates and dates beyond the booking window so a
// stale tab or tampered request can never take money for an unbookable session.
const isBookableDate = (d: unknown): boolean => {
  if (typeof d !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const today = ukTodayISO();
  if (d < today || d < OPENING_DATE) return false;
  const max = new Date(`${today}T00:00:00Z`);
  max.setUTCDate(max.getUTCDate() + BOOKING_WINDOW_DAYS - 1);
  return d <= max.toISOString().slice(0, 10);
};


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { sessionTime, sessionDate, parentName, parentPhone } = body;

    let quantity = 0;
    if (typeof body.childCount === "number" && Number.isFinite(body.childCount)) {
      quantity = Math.floor(body.childCount);
    } else if (Array.isArray(body.children)) {
      quantity = body.children.filter((c: unknown) =>
        typeof c === "string" ? c.trim().length > 0 : false
      ).length;
    } else if (typeof body.childName === "string" && body.childName.trim()) {
      quantity = 1;
    }

    if (!sessionTime || !sessionDate || !parentName || quantity < 1) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isBookableDate(sessionDate)) {
      return new Response(JSON.stringify({ error: "That session is no longer available — please pick another date." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (quantity > MAX_CHILDREN_PER_BOOKING) {
      return new Response(JSON.stringify({ error: `Maximum ${MAX_CHILDREN_PER_BOOKING} children per booking` }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!getValidSessions(sessionDate).includes(sessionTime)) {
      return new Response(JSON.stringify({ error: "Invalid session time" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Loyalty: if the buyer is signed in, tag the order with their account id
    // so stamps get credited once the payment is verified.
    let loyaltyUserId = "";
    const authHeader = req.headers.get("Authorization") || "";
    const jwt = authHeader.replace("Bearer ", "");
    if (jwt && jwt.split(".").length === 3) {
      const { data: userData } = await supabase.auth.getUser(jwt);
      if (userData?.user?.id) loyaltyUserId = userData.user.id;
    }

    const { count, error: countError } = await supabase
      .from("soft_play_bookings")
      .select("id", { count: "exact", head: true })
      .eq("session_date", sessionDate)
      .eq("session_time", sessionTime);

    if (countError) {
      console.error("Capacity check failed:", countError);
      return new Response(JSON.stringify({ error: "Could not verify session availability" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const spotsLeft = MAX_CAPACITY - (count ?? 0);
    if (spotsLeft < quantity) {
      return new Response(JSON.stringify({
        error: "SESSION_FULL",
        message: spotsLeft <= 0
          ? "Sorry, this session is fully booked. Please pick another time."
          : `Only ${spotsLeft} spot${spotsLeft === 1 ? "" : "s"} left in this session.`,
      }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    const locationId = Deno.env.get("SQUARE_LOCATION_ID");
    if (!accessToken || !locationId) {
      return new Response(JSON.stringify({ error: "Square not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const perChildPence = FULL_PRICE_PENCE;
    const origin = Deno.env.get("SITE_URL") || "https://luxplay.uk";

    const payload = {
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: locationId,
        line_items: [{
          name: `Soft Play — ${sessionTime} — ${quantity} ${quantity === 1 ? "child" : "children"}`,
          quantity: String(quantity),
          base_price_money: { amount: perChildPence, currency: "GBP" },
        }],
        metadata: {
          type: "softplay",
          sessionTime,
          sessionDate,
          childCount: String(quantity),
          parentName: parentName.slice(0, 250),
          ...(loyaltyUserId ? { loyaltyUserId } : {}),
          ...(parentPhone && parentPhone.trim() ? { parentPhone: parentPhone.trim().slice(0, 250) } : {}),
        },
      },
      checkout_options: {
        redirect_url: `${origin}/softplay-success`,
        ask_for_shipping_address: false,
      },
    };

    const resp = await fetch(`${SQUARE_BASE}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await resp.json();
    if (!resp.ok) {
      console.error("Square error:", JSON.stringify(json));
      const err = json.errors?.[0];
      const detail = err ? `${err.code || ""}: ${err.detail || ""} (field: ${err.field || "?"})` : "Square checkout failed";
      return new Response(JSON.stringify({ error: detail }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ url: json.payment_link?.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
