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
  1000: 100,
  2000: 350,
  5000: 900,
  10000: 2500,
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


// Square order IDs are short alphanumeric tokens; reject anything else before calling Square.
const VALID_ORDER_ID = /^[A-Za-z0-9_-]{10,64}$/;
const maskEmail = (e: string) => { const [u, d] = String(e || "").split("@"); return d ? `${u.slice(0, 1)}***@${d}` : ""; };
// Only return what the thank-you page needs — never full contact details.
// deno-lint-ignore no-explicit-any
const publicRow = (r: any) => { if (!r) return r; const { parent_phone: _p, user_id: _u, ...rest } = r; return { ...rest, ...(r.parent_email !== undefined ? { parent_email: maskEmail(r.parent_email) } : {}), ...(r.customer_email !== undefined ? { customer_email: maskEmail(r.customer_email) } : {}) }; };

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string" || !VALID_ORDER_ID.test(sessionId)) {
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
      return new Response(JSON.stringify({ order: publicRow(existing) }), {
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

    // Only credits checkouts may create credit orders. Legacy orders without a type
    // are accepted only when the amount matches a known credits package exactly.
    {
      const t = order?.metadata?.type;
      const amt = Number(order?.total_money?.amount || 0);
      if (t ? t !== "credits" : !AMOUNT_CREDITS[amt]) {
        return new Response(JSON.stringify({ error: "This payment isn't for this type of purchase." }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
    const meta = order?.metadata || {};
    const paid = Number(order?.total_money?.amount || 0);
    let credits = parseInt(meta.credits || "", 10);
    if (!Number.isFinite(credits) || credits <= 0) {
      credits = AMOUNT_CREDITS[paid] || 0;
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

    return new Response(JSON.stringify({ order: publicRow(newOrder) }), {
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
