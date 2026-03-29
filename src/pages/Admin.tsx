import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Check, X, Loader2 } from "lucide-react";

interface Order {
  id: string;
  redemption_code: string;
  package_name: string;
  credits: number;
  customer_email: string;
  redeemed: boolean;
  redeemed_at: string | null;
  created_at: string;
  amount_paid: number;
  currency: string;
}

const Admin = () => {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const [redeemed, setRedeemed] = useState(false);

  const lookupCode = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    setRedeemed(false);

    const { data, error: queryError } = await supabase
      .from("orders")
      .select("*")
      .eq("redemption_code", code.trim().toUpperCase())
      .maybeSingle();

    if (queryError) {
      setError("Failed to look up code.");
    } else if (!data) {
      setError("Code not found. Check spelling and try again.");
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  const redeemCode = async () => {
    if (!order) return;
    setRedeeming(true);

    const { error: updateError } = await supabase
      .from("orders")
      .update({ redeemed: true, redeemed_at: new Date().toISOString() })
      .eq("id", order.id);

    if (updateError) {
      setError("Failed to redeem code.");
    } else {
      setRedeemed(true);
      setOrder({ ...order, redeemed: true, redeemed_at: new Date().toISOString() });
    }
    setRedeeming(false);
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <main className="min-h-screen bg-[#070710] flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <h1
          className="font-display text-3xl tracking-wider text-neon-green text-center mb-2"
          style={{ textShadow: "0 0 20px rgba(170,255,0,0.3)" }}
        >
          LUXPLAY STAFF
        </h1>
        <p className="font-body text-white/40 text-xs text-center tracking-widest mb-8">
          CODE VERIFICATION
        </p>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && lookupCode()}
            placeholder="Enter code e.g. LUX-AB3K-7MNP"
            className="flex-1 bg-[#0a0a16] border border-white/10 text-white font-display text-lg tracking-widest px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-green/50"
          />
          <button
            onClick={lookupCode}
            disabled={loading}
            className="bg-neon-green text-[#070710] px-4 py-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="border border-red-500/30 bg-red-500/5 p-4 mb-4 flex items-center gap-3">
            <X className="w-5 h-5 text-red-400 shrink-0" />
            <p className="font-body text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Order found */}
        {order && (
          <div className="border border-white/10 bg-[#0a0a16] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-xs tracking-[0.3em] text-white/40">ORDER DETAILS</p>
              {order.redeemed ? (
                <span className="font-display text-xs tracking-widest text-red-400 bg-red-500/10 px-3 py-1">
                  ALREADY REDEEMED
                </span>
              ) : redeemed ? (
                <span className="font-display text-xs tracking-widest text-neon-green bg-neon-green/10 px-3 py-1">
                  ✓ JUST REDEEMED
                </span>
              ) : (
                <span className="font-display text-xs tracking-widest text-neon-cyan bg-neon-cyan/10 px-3 py-1">
                  VALID
                </span>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="font-body text-white/40 text-sm">Package</span>
                <span className="font-body text-white text-sm font-semibold">{order.package_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-white/40 text-sm">Credits</span>
                <span className="font-display text-neon-green text-lg">{order.credits}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-white/40 text-sm">Paid</span>
                <span className="font-body text-white/70 text-sm">{formatAmount(order.amount_paid, order.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-white/40 text-sm">Email</span>
                <span className="font-body text-white/70 text-sm">{order.customer_email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-body text-white/40 text-sm">Purchased</span>
                <span className="font-body text-white/70 text-sm">
                  {new Date(order.created_at).toLocaleDateString("en-GB")}
                </span>
              </div>
              {order.redeemed && order.redeemed_at && (
                <div className="flex justify-between">
                  <span className="font-body text-white/40 text-sm">Redeemed</span>
                  <span className="font-body text-white/70 text-sm">
                    {new Date(order.redeemed_at).toLocaleDateString("en-GB")}
                  </span>
                </div>
              )}
            </div>

            {!order.redeemed && !redeemed && (
              <button
                onClick={redeemCode}
                disabled={redeeming}
                className="w-full font-display text-sm tracking-widest text-[#070710] bg-neon-green py-4 hover:shadow-[0_0_30px_rgba(170,255,0,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {redeeming ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                LOAD {order.credits} CREDITS TO CARD
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
