import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SQUARE_BASE = "https://connect.squareup.com";
const SQUARE_VERSION = "2024-12-18";

// Safety net: if metadata is missing, derive credits from what was actually
// paid so a paying customer NEVER ends up without a code.
const AMOUNT_CREDITS: Record<number, number> = {
  500: 50,
  1000: 130,
  2000: 300,
  5000: 800,
  10000: 2000,
};

function generateRedemptionCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function queueOrderEmails(supabase: any, order: any, sessionId: string) {
  if (!order?.customer_email) return;
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
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing order ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const accessToken = Deno.env.get("SQUARE_ACCESS_TOKEN");
    if (!accessToken) {
      return new Response(JSON.stringify({ error: "Square not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    // Idempotent — stripe_session_id column stores the Square order ID.
    const { data: existing } = await supabase
      .from("orders")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (existing) {
      await queueOrderEmails(supabase, existing, sessionId);
      return new Response(JSON.stringify({ order: existing }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Fetch the order from Square.
    const orderResp = await fetch(`${SQUARE_BASE}/v2/orders/${sessionId}`, {
      headers: { Authorization: `Bearer ${accessToken}`, "Square-Version": SQUARE_VERSION },
    });
    const orderJson = await orderResp.json();
    if (!orderResp.ok) {
      console.error("Square order fetch failed:", JSON.stringify(orderJson));
      const err = orderJson.errors?.[0];
      return new Response(JSON.stringify({
        error: `Could not verify payment: ${err?.code || ""} ${err?.detail || ""}`.trim(),
      }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const order = orderJson.order;
    let customerEmail = "";
    let paymentCompleted = false;

    const tenderPaymentId = order?.tenders?.[0]?.payment_id || order?.tenders?.[0]?.id;
    if (tenderPaymentId) {
      const payResp = await fetch(`${SQUARE_BASE}/v2/payments/${tenderPaymentId}`, {
        headers: { Authorization: `Bearer ${accessToken}`, "Square-Version": SQUARE_VERSION },
      });
      if (payResp.ok) {
        const payJson = await payResp.json();
        customerEmail = payJson.payment?.buyer_email_address || "";
        const status = payJson.payment?.status;
        if (status === "COMPLETED" || status === "APPROVED") paymentCompleted = true;
      }
    }

    // Fallback: search recent payments for this order id.
    if (!paymentCompleted) {
      const searchResp = await fetch(`${SQUARE_BASE}/v2/payments?limit=100&sort_order=DESC`, {
        headers: { Authorization: `Bearer ${accessToken}`, "Square-Version": SQUARE_VERSION },
      });
      if (searchResp.ok) {
        const searchJson = await searchResp.json();
        const match = (searchJson.payments || []).find((p: any) => p.order_id === sessionId);
        if (match) {
          customerEmail = customerEmail || match.buyer_email_address || "";
          if (match.status === "COMPLETED" || match.status === "APPROVED") paymentCompleted = true;
        }
      }
    }

    // Final safety net: Square leaves a paid Payment Link order OPEN even when
    // nothing is left due.
    if (!paymentCompleted) {
      const due = order?.net_amount_due_money?.amount;
      const total = Number(order?.total_money?.amount || 0);
      if ((due !== undefined && Number(due) === 0 && total > 0) || (order?.tenders?.length && total > 0)) {
        paymentCompleted = true;
      }
    }

    if (!customerEmail) {
      customerEmail =
        order?.fulfillments?.[0]?.pickup_details?.recipient?.email_address ||
        order?.fulfillments?.[0]?.shipment_details?.recipient?.email_address ||
        order?.metadata?.customerEmail ||
        "";
    }

    if (!paymentCompleted && order?.state !== "COMPLETED") {
      console.error("Payment not completed. Order state:", order?.state);
      return new Response(JSON.stringify({ error: "Payment not completed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const meta = order?.metadata || {};
    const paid = Number(order?.total_money?.amount || 0);
    let credits = parseInt(meta.credits || "", 10);
    if (!Number.isFinite(credits) || credits <= 0) {
      credits = AMOUNT_CREDITS[paid] || (paid > 0 ? Math.max(1, Math.floor((paid / 100) * 10)) : 0);
      console.error("Credits missing from metadata, used fallback:", paid, credits);
    }
    if (!credits) {
      return new Response(JSON.stringify({ error: "Unknown package" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const packageName = meta.packageName || `${credits} Credits`;
    const redemptionCode = generateRedemptionCode();

    const { data: newOrder, error } = await supabase.from("orders").insert({
      stripe_session_id: sessionId,
      customer_email: customerEmail,
      package_name: packageName,
      credits,
      amount_paid: paid,
      currency: (order?.total_money?.currency || "GBP").toLowerCase(),
      redemption_code: redemptionCode,
    }).select().single();

    if (error) {
      console.error("Failed to insert order:", error);
      return new Response(JSON.stringify({ error: "Failed to save order" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await queueOrderEmails(supabase, newOrder, sessionId);

    return new Response(JSON.stringify({ order: newOrder }), {
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
