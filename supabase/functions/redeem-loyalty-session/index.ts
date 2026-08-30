import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STAMPS_PER_REWARD = 6;
const MAX_CAPACITY = 40;
const STANDARD_SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const BLOCKED_SLOTS: Record<string, string[]> = {
  "2026-08-15": ["14:00"],
  "2026-09-01": ["14:00"], // private party
  "2026-09-05": ["10:00"],
};
const BOOKING_WINDOW_DAYS = 14;
const OPENING_DATE = "2026-06-13";

const SESSION_LABELS: Record<string, string> = {
  "10:00": "10:00 AM",
  "12:00": "12:00 PM",
  "14:00": "2:00 PM",
  "16:00": "4:00 PM",
  "18:00": "6:00 PM",
};

const ukTodayISO = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
};

const isBookableDate = (d: unknown): boolean => {
  if (typeof d !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return false;
  const today = ukTodayISO();
  if (d < today || d < OPENING_DATE) return false;
  const max = new Date(`${today}T00:00:00Z`);
  max.setUTCDate(max.getUTCDate() + BOOKING_WINDOW_DAYS - 1);
  return d <= max.toISOString().slice(0, 10);
};

function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!token) return json({ error: "Please sign in to claim your free session." }, 401);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: userData, error: userError } = await supabase.auth.getUser(token);
    const user = userData?.user;
    if (userError || !user) return json({ error: "Please sign in to claim your free session." }, 401);

    const body = await req.json();
    const sessionDate = body?.sessionDate;
    const sessionTime = body?.sessionTime;
    const parentName = String(body?.parentName || "").trim();
    const parentPhone = String(body?.parentPhone || "").trim();

    if (!sessionDate || !sessionTime || !parentName) {
      return json({ error: "Missing required fields" }, 400);
    }
    if (!isBookableDate(sessionDate)) {
      return json({ error: "That date isn't available — please pick another." }, 400);
    }
    if (
      !STANDARD_SESSIONS.includes(sessionTime) ||
      (BLOCKED_SLOTS[sessionDate] ?? []).includes(sessionTime)
    ) {
      return json({ error: "That session isn't available — please pick another." }, 400);
    }

    // Stamps available?
    const { data: stamps, error: stampsError } = await supabase
      .from("loyalty_stamps")
      .select("id")
      .eq("user_id", user.id)
      .eq("consumed", false)
      .order("created_at", { ascending: true })
      .limit(STAMPS_PER_REWARD);

    if (stampsError) {
      console.error("Stamp lookup failed:", stampsError);
      return json({ error: "Could not check your loyalty card. Please try again." }, 500);
    }
    if (!stamps || stamps.length < STAMPS_PER_REWARD) {
      return json({
        error: `You need ${STAMPS_PER_REWARD} stamps to claim a free session — you have ${stamps?.length ?? 0}.`,
      }, 400);
    }

    // Capacity
    const { count, error: countError } = await supabase
      .from("soft_play_bookings")
      .select("id", { count: "exact", head: true })
      .eq("session_date", sessionDate)
      .eq("session_time", sessionTime);

    if (countError) {
      console.error("Capacity check failed:", countError);
      return json({ error: "Could not verify session availability" }, 500);
    }
    if (MAX_CAPACITY - (count ?? 0) < 1) {
      return json({ error: "Sorry, that session is fully booked. Please pick another time." }, 409);
    }

    const bookingCode = generateBookingCode();

    const { data: booking, error: insertError } = await supabase
      .from("soft_play_bookings")
      .insert({
        stripe_session_id: `loyalty-${bookingCode}`,
        session_time: sessionTime,
        session_date: sessionDate,
        child_name: "Loyalty Free Child",
        parent_name: `[LOYALTY FREE] ${parentName.slice(0, 200)}`,
        parent_email: user.email ?? "",
        parent_phone: parentPhone || null,
        amount_paid: 0,
        currency: "gbp",
        booking_code: bookingCode,
        user_id: user.id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Loyalty booking insert failed:", insertError);
      const full = (insertError.message || "").includes("SESSION_FULL");
      return json({
        error: full
          ? "That session just filled up — please pick another time."
          : "Could not create your free booking. Please try again.",
      }, full ? 409 : 500);
    }

    // Consume stamps (only ours, only unconsumed)
    const stampIds = stamps.map((s: any) => s.id);
    const { error: consumeError } = await supabase
      .from("loyalty_stamps")
      .update({ consumed: true })
      .in("id", stampIds)
      .eq("user_id", user.id)
      .eq("consumed", false);

    if (consumeError) console.error("Stamp consume failed:", consumeError);

    await supabase.from("loyalty_redemptions").insert({
      user_id: user.id,
      booking_code: bookingCode,
      session_date: sessionDate,
      session_time: sessionTime,
      reward_type: "free-softplay",
    });

    // Emails
    const sessionDateLabel = new Date(`${sessionDate}T12:00:00Z`).toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
    });

    if (user.email) {
      const customerEmail = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "softplay-booking",
          recipientEmail: user.email,
          idempotencyKey: `loyalty-${bookingCode}`,
          templateData: {
            childCount: 1,
            parentName,
            sessionTime: SESSION_LABELS[sessionTime] || sessionTime,
            sessionDate: sessionDateLabel,
            bookingCode,
            bookingCodes: [bookingCode],
            totalAmount: "£0.00 (Loyalty reward)",
          },
        },
      });
      if (customerEmail.error) console.error("Loyalty customer email failed:", customerEmail.error);
    }

    const adminEmail = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "admin-purchase-notification",
        recipientEmail: "luxplayuk@gmail.com",
        idempotencyKey: `admin-loyalty-${bookingCode}`,
        templateData: {
          type: "softplay",
          customerEmail: user.email ?? "",
          childCount: 1,
          parentName: `[LOYALTY FREE] ${parentName}`,
          sessionTime: SESSION_LABELS[sessionTime] || sessionTime,
          sessionDate: sessionDateLabel,
          bookingCode,
          bookingCodes: [bookingCode],
          amountPaid: "£0.00 (Loyalty reward)",
        },
      },
    });
    if (adminEmail.error) console.error("Loyalty admin email failed:", adminEmail.error);

    return json({ booking, bookingCode });
  } catch (error) {
    return json({ error: (error as Error).message }, 500);
  }
});
