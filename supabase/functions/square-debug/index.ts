import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const token = Deno.env.get("SQUARE_ACCESS_TOKEN")!;
  const loc = Deno.env.get("SQUARE_LOCATION_ID")!;

  // List recent payments
  const payResp = await fetch("https://connect.squareup.com/v2/payments?limit=5&sort_order=DESC", {
    headers: { Authorization: `Bearer ${token}`, "Square-Version": "2024-12-18" },
  });
  const payJson = await payResp.json();

  // Search recent orders
  const orderResp = await fetch("https://connect.squareup.com/v2/orders/search", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Square-Version": "2024-12-18",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      location_ids: [loc],
      query: { sort: { sort_field: "CREATED_AT", sort_order: "DESC" } },
      limit: 5,
    }),
  });
  const orderJson = await orderResp.json();

  return new Response(JSON.stringify({
    payStatus: payResp.status,
    payments: payJson.payments?.map((p: any) => ({
      id: p.id, order_id: p.order_id, status: p.status, email: p.buyer_email_address, created: p.created_at, amount: p.amount_money,
    })),
    orderStatus: orderResp.status,
    orders: orderJson.orders?.map((o: any) => ({
      id: o.id, state: o.state, metadata: o.metadata, created: o.created_at,
    })),
    locationId: loc,
  }, null, 2), { headers: { ...cors, "Content-Type": "application/json" } });
});
