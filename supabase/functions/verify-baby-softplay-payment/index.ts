import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_VERSION = "2024-12-18";

function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

const SESSION_LABELS: Record<string, string> = {
  "10:00": "10:00 AM",
  "12:00": "12:00 PM",
  "14:00": "2:00 PM",
  "16:00": "4:00 PM",
  "18:00": "6:00 PM",
};

function formatSessionDate(dateValue: string): string {
  return new Date(`${dateValue}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

async function queueBookingEmails(supabase: any, rows: any[], sessionId: string) {
  if (!rows?.length) return;
  const primary = rows[0];
  if (!primary?.parent_email) return;
  const bookingCodes = rows.map((entry) => entry.booking_code);
  const babyCount = rows.length;
  const totalAmount = rows.reduce((sum, entry) => sum + (entry.amount_paid || 0), 0);
  const sessionTime = SESSION_LABELS[primary.session_time] || primary.session_time;
  const sessionDate = formatSessionDate(primary.session_date);

  const customerEmail = await supabase.functions.invoke("send-transactional-email", {
    body: {
      templateName: "softplay-booking",
      recipientEmail: primary.parent_email,
      idempotencyKey: `baby-softplay-${primary.stripe_session_id || sessionId}`,
      templateData: {
        childCount: babyCount,
        parentName: primary.parent_name,
        sessionTime,
        sessionDate,
        bookingCode: primary.booking_code,
        bookingCodes,
        totalAmount: `£${(totalAmount / 100).toFixed(2)}`,
      },
    },
  });
  if (customerEmail.error) console.error("Baby customer booking email failed:", customerEmail.error);

  const adminEmail = await supabase.functions.invoke("send-transactional-email", {
    body: {
      templateName: "admin-purchase-notification",
      recipientEmail: "luxplayuk@gmail.com",
      idempotencyKey: `admin-baby-softplay-${primary.stripe_session_id || sessionId}`,
      templateData: {
        type: "softplay",
        customerEmail: primary.parent_email,
        childCount: babyCount,
        parentName: `[BABY SOFT PLAY] ${primary.parent_name}`,
        sessionTime,
        sessionDate,
        bookingCode: primary.booking_code,
        bookingCodes,
        amountPaid: `£${(totalAmount / 100).toFixed(2)}`,
      },
    },
  });
  if (adminEmail.error) console.error("Baby admin booking email failed:", adminEmail.error);
}

async function squareRefund(accessToken: string, paymentId: string, amount: number) {
  try {
    await fetch(`${SQUARE_BASE}/v2/refunds`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        payment_id: paymentId,
        amount_money: { amount, currency: "GBP" },
        reason: "Session full",
      }),
    });
  } catch (e) {
    console.error("Refund failed:", e);
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing order ID" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Square not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { data: existing } = await supabase
      .from("baby_soft_play_bookings")
      .select("*")
      .eq("stripe_session_id", sessionId);

    if (existing && existing.length > 0) {
      await queueBookingEmails(supabase, existing, sessionId);
      return new Response(JSON.stringify({ booking: existing[0], bookings: existing }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
      });
    }

    const orderResp = await fetch(`${SQUARE_BASE}/v2/orders/${sessionId}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Square-Version": SQUARE_VERSION,
      },
    });
    const orderJson = await orderResp.json();
    if (!orderResp.ok) {
      console.error("Square order fetch failed:", orderJson);
      return new Response(JSON.stringify({ error: "Could not verify payment" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const order = orderJson.order;

    let parentEmail = "";
    let paymentId: string | undefined;
    let paymentCompleted = false;

    const tenderPaymentId = order?.tenders?.[0]?.payment_id || order?.tenders?.[0]?.id;
    if (tenderPaymentId) {
      paymentId = tenderPaymentId;
      const payResp = await fetch(`${SQUARE_BASE}/v2/payments/${tenderPaymentId}`, {
        headers: { "Authorization": `Bearer ${accessToken}`, "Square-Version": SQUARE_VERSION },
      });
      if (payResp.ok) {
        const payJson = await payResp.json();
        parentEmail = payJson.payment?.buyer_email_address || "";
        if (payJson.payment?.status === "COMPLETED" || payJson.payment?.status === "APPROVED") {
          paymentCompleted = true;
        }
      }
    }

    if (!paymentCompleted) {
      const searchResp = await fetch(`${SQUARE_BASE}/v2/payments?limit=100&sort_order=DESC`, {
        headers: { "Authorization": `Bearer ${accessToken}`, "Square-Version": SQUARE_VERSION },
      });
      if (searchResp.ok) {
        const searchJson = await searchResp.json();
        const match = (searchJson.payments || []).find((p: any) => p.order_id === sessionId);
        if (match) {
          paymentId = match.id;
          parentEmail = parentEmail || match.buyer_email_address || "";
          if (match.status === "COMPLETED" || match.status === "APPROVED") {
            paymentCompleted = true;
          }
        }
      }
    }

    // Final safety net: nothing left due on the order means it was paid.
    if (!paymentCompleted) {
      const due = order?.net_amount_due_money?.amount;
      const total = Number(order?.total_money?.amount || 0);
      if ((due !== undefined && Number(due) === 0 && total > 0) || (order?.tenders?.length && total > 0)) {
        paymentCompleted = true;
      }
    }

    if (!parentEmail) {
      parentEmail =
        order?.fulfillments?.[0]?.pickup_details?.recipient?.email_address ||
        order?.fulfillments?.[0]?.shipment_details?.recipient?.email_address ||
        order?.metadata?.parentEmail ||
        "";
    }

    if (!paymentCompleted && order?.state !== "COMPLETED") {
      console.error("Payment not completed. Order state:", order?.state);
      return new Response(JSON.stringify({ error: "Payment not completed" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }


    const meta = order.metadata || {};
    const quantity = Math.max(1, parseInt(meta.babyCount || "1", 10) || 1);
    const totalAmount = Number(order.total_money?.amount || 0);
    const perBabyAmount = Math.round(totalAmount / quantity);

    const rows = Array.from({ length: quantity }, () => ({
      stripe_session_id: sessionId,
      session_time: meta.sessionTime || "10:00",
      session_date: meta.sessionDate || new Date().toISOString().split("T")[0],
      parent_name: meta.parentName || "Unknown",
      parent_email: parentEmail,
      parent_phone: meta.parentPhone || null,
      amount_paid: perBabyAmount || 200,
      currency: (order.total_money?.currency || "GBP").toLowerCase(),
      booking_code: generateBookingCode(),
    }));

    const { data: bookings, error } = await supabase
      .from("baby_soft_play_bookings")
      .insert(rows)
      .select();

    if (error) {
      console.error("Failed to insert baby bookings:", error);
      const isSessionFull =
        (error.message || "").includes("SESSION_FULL") ||
        (error as any).code === "23514";

      if (isSessionFull && paymentId && totalAmount > 0) {
        await squareRefund(accessToken, paymentId, totalAmount);
        return new Response(JSON.stringify({
          error: "SESSION_FULL",
          message: "Sorry — this baby session filled up before your payment completed. You've been automatically refunded. Please pick another time.",
        }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      return new Response(JSON.stringify({ error: "Failed to save booking" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await queueBookingEmails(supabase, bookings || [], sessionId);

    return new Response(JSON.stringify({ booking: bookings?.[0], bookings }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
