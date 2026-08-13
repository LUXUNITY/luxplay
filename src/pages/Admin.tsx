import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Check, X, Loader2, Lock, ScanLine } from "lucide-react";
import QrScanner from "@/components/QrScanner";

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
  | { kind: "booking"; table: string; baby?: boolean; data: Booking };

interface Match {
  kind: "order" | "booking" | "baby_booking";
  table: string | null;
  data: any;
}



const PW_STORAGE_KEY = "luxplay_admin_pw";

const Admin = () => {
  const [adminPw, setAdminPw] = useState<string | null>(null);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwBusy, setPwBusy] = useState(false);

  const [code, setCode] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [matches, setMatches] = useState<Match[] | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acting, setActing] = useState(false);
  const [justActed, setJustActed] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(PW_STORAGE_KEY);
    if (stored) setAdminPw(stored);
  }, []);

  // Helper: call admin-action edge function with the password header.
  const callAdmin = async (action: string, payload: Record<string, unknown> = {}) => {
    if (!adminPw) throw new Error("Not authenticated");
    const { data, error } = await supabase.functions.invoke("admin-action", {
      body: { action, ...payload },
      headers: { "x-admin-password": adminPw },
    });
    if (error) {
      // 401 = wrong password — force re-login.
      const ctx: any = (error as any).context;
      if (ctx?.status === 401) {
        sessionStorage.removeItem(PW_STORAGE_KEY);
        setAdminPw(null);
        throw new Error("Session expired — sign in again.");
      }
      throw new Error(error.message || "Request failed");
    }
    return data as any;
  };

  const submitPassword = async () => {
    setPwBusy(true);
    setPwError(null);
    try {
      const { data, error } = await supabase.functions.invoke("admin-action", {
        body: { action: "lookup_order", code: "__ping__" },
        headers: { "x-admin-password": pwInput },
      });
      const status = (error as any)?.context?.status;
      if (status === 401) {
        setPwError("Incorrect password.");
      } else if (error && status !== 400) {
        setPwError(error.message || "Login failed");
      } else {
        // 200 (found nothing) or 400 (bad code) both prove the password is good.
        sessionStorage.setItem(PW_STORAGE_KEY, pwInput);
        setAdminPw(pwInput);
        setPwInput("");
        void data;
      }
    } catch (e: any) {
      setPwError(e?.message ?? "Login failed");
    }
    setPwBusy(false);
  };

  const signOut = () => {
    sessionStorage.removeItem(PW_STORAGE_KEY);
    setAdminPw(null);
    setResult(null);
    setCode("");
  };




  const lookupCode = async () => {
    const trimmed = code.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setMatches(null);
    setJustActed(false);

    try {
      const res = await callAdmin("lookup", { code: trimmed });
      if (res?.kind === "order") {
        setResult({ kind: "order", data: res.data as Order });
      } else if (res?.kind === "booking" || res?.kind === "baby_booking") {
        setResult({
          kind: "booking",
          table: res.table,
          baby: res.kind === "baby_booking",
          data: res.data as Booking,
        });
      } else if (res?.kind === "matches") {
        setMatches(res.matches as Match[]);
      } else {
        setError("Nothing found. Try their booking code, receipt number, email or name.");
      }
    } catch (e: any) {
      setError(e?.message ?? "Failed to look up code.");
    }


    setLoading(false);
  };

  const redeemOrder = async () => {
    if (!result || result.kind !== "order") return;
    setActing(true);
    try {
      await callAdmin("redeem_order", { id: result.data.id });
      setJustActed(true);
      setResult({
        kind: "order",
        data: { ...result.data, redeemed: true, redeemed_at: new Date().toISOString() },
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to redeem code.");
    }
    setActing(false);
  };

  const checkInBooking = async () => {
    if (!result || result.kind !== "booking") return;
    setActing(true);
    try {
      await callAdmin("checkin_booking", { id: result.data.id, table: result.table });
      setJustActed(true);
      setResult({
        ...result,
        data: { ...result.data, checked_in: true, checked_in_at: new Date().toISOString() },
      });
    } catch (e: any) {
      setError(e?.message ?? "Failed to check in booking.");
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

  // --- Password gate ---
  if (!adminPw) {
    return (
      <main className="min-h-screen bg-[#070710] flex items-center justify-center px-4 py-10">
        <div className="max-w-sm w-full">
          <div className="flex items-center justify-center mb-3">
            <Lock className="w-6 h-6 text-neon-green" />
          </div>
          <h1
            className="font-display text-3xl tracking-wider text-neon-green text-center mb-2"
            style={{ textShadow: "0 0 20px rgba(170,255,0,0.3)" }}
          >
            STAFF LOGIN
          </h1>
          <p className="font-body text-white/40 text-xs text-center tracking-widest mb-8">
            ENTER ADMIN PASSWORD
          </p>
          <input
            type="password"
            autoFocus
            value={pwInput}
            onChange={(e) => setPwInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && pwInput && submitPassword()}
            placeholder="••••••••"
            className="w-full bg-[#0a0a16] border border-white/10 text-white font-display text-lg tracking-widest px-4 py-3 placeholder:text-white/20 focus:outline-none focus:border-neon-green/50 mb-3"
          />
          {pwError && (
            <p className="font-body text-red-300 text-sm mb-3">{pwError}</p>
          )}
          <button
            onClick={submitPassword}
            disabled={pwBusy || !pwInput}
            className="w-full font-display text-sm tracking-widest text-[#070710] bg-neon-green py-4 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {pwBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            SIGN IN
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070710] flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display text-xs tracking-[0.3em] text-white/30">SIGNED IN</span>
          <button
            onClick={signOut}
            className="font-display text-xs tracking-widest text-white/40 hover:text-white/70"
          >
            SIGN OUT
          </button>
        </div>
        <h1
          className="font-display text-3xl tracking-wider text-neon-green text-center mb-2"
          style={{ textShadow: "0 0 20px rgba(170,255,0,0.3)" }}
        >
          LUXPLAY STAFF
        </h1>
        <p className="font-body text-white/40 text-xs text-center tracking-widest mb-3">
          CODE · RECEIPT NUMBER · EMAIL · NAME
        </p>
        <p className="font-body text-white/30 text-[11px] text-center mb-8">
          No code? Search their receipt number, email address or name instead.
        </p>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && lookupCode()}
            placeholder="Code, receipt no., email or name"
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

        {/* MULTIPLE MATCHES — pick the right customer */}
        {matches && !result && (
          <div className="border border-white/10 bg-[#0a0a16] p-4 mb-4">
            <p className="font-display text-xs tracking-[0.3em] text-white/40 mb-3">
              {matches.length} MATCHES — SELECT ONE
            </p>
            <div className="space-y-2">
              {matches.map((m, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setMatches(null);
                    setJustActed(false);
                    if (m.kind === "order") setResult({ kind: "order", data: m.data as Order });
                    else
                      setResult({
                        kind: "booking",
                        table: m.table ?? "soft_play_bookings",
                        baby: m.kind === "baby_booking",
                        data: m.data as Booking,
                      });
                  }}
                  className="w-full text-left border border-white/10 hover:border-neon-green/50 px-3 py-3"
                >
                  <span className="font-display text-sm tracking-widest text-neon-green">
                    {m.kind === "order" ? m.data.redemption_code : m.data.booking_code}
                  </span>
                  <span className="block font-body text-white/60 text-xs mt-1">
                    {m.kind === "order"
                      ? `${m.data.package_name} · ${m.data.customer_email}`
                      : `${m.kind === "baby_booking" ? "Baby soft play" : "Soft play"} · ${formatSessionDate(
                          m.data.session_date,
                        )} · ${m.data.session_time} · ${m.data.parent_name}`}
                  </span>
                  <span className="block font-body text-white/30 text-[11px] mt-0.5">
                    {m.kind === "order"
                      ? m.data.redeemed
                        ? "Already redeemed"
                        : "Not redeemed"
                      : m.data.checked_in
                        ? "Already checked in"
                        : "Not checked in"}
                  </span>
                </button>
              ))}
            </div>
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
              <p className="font-display text-xs tracking-[0.3em] text-white/40">
                {result.baby ? "BABY SOFT PLAY BOOKING" : "SOFT PLAY BOOKING"}
              </p>

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
