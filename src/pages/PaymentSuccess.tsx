import { Check, ArrowLeft, Copy, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Order {
  redemption_code: string;
  package_name: string;
  credits: number;
  customer_email: string;
}

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("orderId") || searchParams.get("session_id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError("No session found.");
      return;
    }

    const FALLBACK =
      "Your payment went through, but we couldn't load your code just yet. Please email luxplayuk@gmail.com with your payment receipt and we'll send it straight over — or show your receipt at the desk.";

    const fetchOrder = async () => {
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          const { data, error: fnError } = await supabase.functions.invoke("verify-payment", {
            body: { sessionId },
          });
          if (fnError) throw fnError;
          if (data?.order) {
            // Confirmation + admin notification emails are queued server-side
            // by verify-payment (the client no longer has permission to call
            // send-transactional-email directly).
            setOrder(data.order);
            setError(null);
            setLoading(false);
            return;
          }
          setError(data?.error || FALLBACK);
        } catch {
          setError(FALLBACK);
        }
        if (attempt < 3) await new Promise((r) => setTimeout(r, 2000));
      }
      setLoading(false);
    };

    fetchOrder();

  }, [sessionId]);

  const copyCode = () => {
    if (order?.redemption_code) {
      navigator.clipboard.writeText(order.redemption_code);
      toast({ title: "Code copied!", description: "Your redemption code has been copied to clipboard." });
    }
  };

  return (
    <main className="min-h-screen bg-[#070710] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center border border-neon-green/30 bg-[#0a0a16] p-10 md:p-14">
        {loading ? (
          <div className="py-12">
            <Loader2 className="w-12 h-12 text-neon-green animate-spin mx-auto mb-4" />
            <p className="font-display text-sm tracking-widest text-white/50">
              CONFIRMING YOUR PAYMENT...
            </p>
          </div>
        ) : error ? (
          <div className="py-12">
            <p className="font-body text-white/70 text-base mb-6">{error}</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[#070710] bg-neon-green px-8 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO LUXPLAY
            </Link>
          </div>
        ) : order ? (
          <>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-neon-green/10 flex items-center justify-center">
              <Check className="w-10 h-10 text-neon-green" />
            </div>

            <h1
              className="font-display text-3xl md:text-4xl tracking-wider text-neon-green mb-4"
              style={{ textShadow: "0 0 20px rgba(170,255,0,0.3)" }}
            >
              PAYMENT CONFIRMED
            </h1>

            <p className="font-body text-white/70 text-base mb-2">
              Your <strong className="text-white">{order.package_name}</strong> package is secured! 🎮
            </p>
            <p className="font-body text-white/40 text-sm mb-6">
              {order.credits} credits ready for opening weekend
            </p>

            {/* Redemption Code */}
            <div className="border-2 border-neon-green/40 bg-neon-green/5 p-6 mb-6">
              <div className="mb-4">
                <BookingQr
                  value={order.redemption_code}
                  label="SCAN AT THE COUNTER"
                  accent="#aaff00"
                />
              </div>
              <button
                onClick={copyCode}
                className="inline-flex items-center gap-2 font-display text-xs tracking-widest text-white/60 hover:text-neon-green transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                COPY CODE
              </button>
            </div>

            <div className="border border-white/10 bg-[#0d0d1a] p-4 mb-8 text-left space-y-2">
              <p className="font-body text-white/60 text-sm">
                📧 A receipt has been sent to <strong className="text-white/80">{order.customer_email}</strong>
              </p>
              <p className="font-body text-white/60 text-sm">
                🏪 Present this code at LuxPlay on opening weekend
              </p>
              <p className="font-body text-white/60 text-sm">
                💳 We'll load your credits onto your play card
              </p>
              <p className="font-body text-neon-pink/70 text-xs mt-2">
                ⚠️ Save this code — screenshot this page or copy the code above
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-display text-sm tracking-widest text-[#070710] bg-neon-green px-8 py-3 hover:shadow-[0_0_30px_rgba(170,255,0,0.4)] transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO LUXPLAY
            </Link>
          </>
        ) : null}
      </div>
    </main>
  );
};

export default PaymentSuccess;
