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

interface Booking {
  id: string;
  booking_code: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string | null;
  session_date: string;
  session_time: string;
  checked_in: boolean;
  checked_in_at: string | null;
  created_at: string;
  amount_paid: number;
  currency: string;
}

type Result =
  | { kind: "order"; data: Order }
  | { kind: "booking"; data: Booking };

const Admin = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acting, setActing] = useState(false);
  const [justActed, setJustActed] = useState(false);

  const lookupCode = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setJustActed(false);

    // Try soft play booking first (SP-XXX-XXX), then credit order (LUX-XXXX-XXXX)
    if (trimmed.startsWith("SP-")) {
      const { data, error: queryError } = await supabase
        .from("soft_play_bookings")
        .select("*")
        .eq("booking_code", trimmed)
        .maybeSingle();

      if (queryError) {
        setError("Failed to look up code.");
      } else if (!data) {
        setError("Booking code not found. Check spelling and try again.");
      } else {
        setResult({ kind: "booking", data });
      }
    } else {
      // Try orders table (credit codes)
      const { data, error: queryError } = await supabase
        .from("orders")
        .select("*")
        .eq("redemption_code", trimmed)
        .maybeSingle();

      if (queryError) {
        setError("Failed to look up code.");
      } else if (!data) {
        // Fallback: maybe they typed a booking code without the SP- prefix being obvious
        const { data: bookingData } = await supabase
          .from("soft_play_bookings")
          .select("*")
          .eq("booking_code", trimmed)
          .maybeSingle();

        if (bookingData) {
          setResult({ kind: "booking", data: bookingData });
        } else {
          setError("Code not found. Check spelling and try again.");
        }
      } else {
        setResult({ kind: "order", data });
      }
    }
    setLoading(false);
  };

  const redeemOrder = async () => {
    if (!result || result.kind !== "order") return;
    setActing(true);
    const { error: updateError } = await supabase
      .from("orders")
      .update({ redeemed: true, redeemed_at: new Date().toISOString() })
      .eq("id", result.data.id);

    if (updateError) {
      setError("Failed to redeem code.");
    } else {
      setJustActed(true);
      setResult({
        kind: "order",
        data: { ...result.data, redeemed: true, redeemed_at: new Date().toISOString() },
      });
    }
    setActing(false);
  };

  const checkInBooking = async () => {
    if (!result || result.kind !== "booking") return;
    setActing(true);
    const { error: updateError } = await supabase
      .from("soft_play_bookings")
      .update({ checked_in: true, checked_in_at: new Date().toISOString() })
      .eq("id", result.data.id);

    if (updateError) {
      setError("Failed to check in booking.");
    } else {
      setJustActed(true);
      setResult({
        kind: "booking",
        data: { ...result.data, checked_in: true, checked_in_at: new Date().toISOString() },
      });
    }
    setActing(false);
  };

  const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);

  const formatSessionDate = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-[#070710] flex items-center justify-center px-4 py-10">
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
            placeholder="SP-XXX-XXX or LUX-XXXX-XXXX"
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

        {/* CREDIT ORDER */}
        {result?.kind === "order" && (
          <div className="border border-white/10 bg-[#0a0a16] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-xs tracking-[0.3em] text-white/40">CREDIT ORDER</p>
              {result.data.redeemed ? (
                <span className="font-display text-xs tracking-widest text-red-400 bg-red-500/10 px-3 py-1">
                  ALREADY REDEEMED
                </span>
              ) : justActed ? (
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
              <Row label="Package" value={result.data.package_name} />
              <Row
                label="Credits"
                value={<span className="font-display text-neon-green text-lg">{result.data.credits}</span>}
              />
              <Row label="Paid" value={formatAmount(result.data.amount_paid, result.data.currency)} />
              <Row label="Email" value={result.data.customer_email} />
              <Row label="Purchased" value={new Date(result.data.created_at).toLocaleDateString("en-GB")} />
              {result.data.redeemed && result.data.redeemed_at && (
                <Row label="Redeemed" value={new Date(result.data.redeemed_at).toLocaleDateString("en-GB")} />
              )}
            </div>

            {!result.data.redeemed && (
              <button
                onClick={redeemOrder}
                disabled={acting}
                className="w-full font-display text-sm tracking-widest text-[#070710] bg-neon-green py-4 hover:shadow-[0_0_30px_rgba(170,255,0,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {acting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                LOAD {result.data.credits} CREDITS TO CARD
              </button>
            )}
          </div>
        )}

        {/* SOFT PLAY BOOKING */}
        {result?.kind === "booking" && (
          <div className="border border-white/10 bg-[#0a0a16] p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="font-display text-xs tracking-[0.3em] text-white/40">SOFT PLAY BOOKING</p>
              {result.data.checked_in ? (
                <span className="font-display text-xs tracking-widest text-red-400 bg-red-500/10 px-3 py-1">
                  ALREADY CHECKED IN
                </span>
              ) : justActed ? (
                <span className="font-display text-xs tracking-widest text-neon-green bg-neon-green/10 px-3 py-1">
                  ✓ CHECKED IN
                </span>
              ) : (
                <span className="font-display text-xs tracking-widest text-neon-cyan bg-neon-cyan/10 px-3 py-1">
                  VALID
                </span>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <Row label="Session" value={formatSessionDate(result.data.session_date)} />
              <Row
                label="Time"
                value={<span className="font-display text-neon-green text-lg">{result.data.session_time}</span>}
              />
              <Row label="Parent" value={result.data.parent_name} />
              <Row label="Email" value={result.data.parent_email} />
              {result.data.parent_phone && <Row label="Phone" value={result.data.parent_phone} />}
              <Row label="Paid" value={formatAmount(result.data.amount_paid, result.data.currency)} />
              <Row label="Booked" value={new Date(result.data.created_at).toLocaleDateString("en-GB")} />
              {result.data.checked_in && result.data.checked_in_at && (
                <Row
                  label="Checked in"
                  value={new Date(result.data.checked_in_at).toLocaleString("en-GB")}
                />
              )}
            </div>

            {!result.data.checked_in && (
              <button
                onClick={checkInBooking}
                disabled={acting}
                className="w-full font-display text-sm tracking-widest text-[#070710] bg-neon-green py-4 hover:shadow-[0_0_30px_rgba(170,255,0,0.4)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {acting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                CHECK IN BOOKING
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex justify-between items-center">
    <span className="font-body text-white/40 text-sm">{label}</span>
    <span className="font-body text-white/80 text-sm text-right">{value}</span>
  </div>
);

export default Admin;
