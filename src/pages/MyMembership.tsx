import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { readFnError } from "@/components/MembershipJoin";
import { MEMBERSHIP_TIERS, membershipPricePence, formatMembershipPrice, type MembershipBillingPeriod } from "@/lib/membership";

interface Pass { id: string; child_name: string; tier: string; billing_period?: MembershipBillingPeriod; pass_code: string; status: string; paid_until: string | null; cancel_requested: boolean; credits_left: number;
  upcoming: { booking_code: string; session_date: string; session_time: string }[] }

const SESSIONS = ["10:00", "12:00", "14:00", "16:00", "18:00"];
const label = (t: string) => ({ "10:00": "10AM–12PM", "12:00": "12–2PM", "14:00": "2–4PM", "16:00": "4–6PM", "18:00": "6–8PM" }[t] ?? t);
const days = () => Array.from({ length: 14 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i); return d.toLocaleDateString("en-CA", { timeZone: "Europe/London" }); });
const STATUS: Record<string, string> = { active: "✅ ACTIVE", grace: "⚠️ PAYMENT DUE — fix within 24 hours", suspended: "⛔ PAUSED — payment needed", cancelled: "Cancelled", pending: "⏳ Confirming payment…" };

export default function MyMembership() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [passes, setPasses] = useState<Pass[] | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pick, setPick] = useState<Record<string, { d: string; t: string }>>({});
  const [spaces, setSpaces] = useState<Record<string, Record<string, number>>>({});
  const asked = useRef(new Set<string>());
  const loadSpaces = useCallback(async (d: string) => {
    if (asked.current.has(d)) return; asked.current.add(d);
    const { data } = await supabase.functions.invoke("membership", { body: { action: "spaces", sessionDate: d } });
    if (data?.spaces) setSpaces(s => ({ ...s, [d]: data.spaces }));
  }, []);

  const load = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke("membership", { body: { action: "mine" } });
    if (error) { setMsg(await readFnError(error)); setPasses([]); return; }
    setPasses(data.memberships);
    return data.memberships as Pass[];
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) { navigate(`/auth?next=${encodeURIComponent("/my-membership" + window.location.search)}`, { replace: true }); return; }
    let tries = 0;
    const poll = async () => { const p = await load(); if (p?.some(x => x.status === "pending") && tries++ < 8) setTimeout(poll, 4000); };
    poll();
  }, [user, loading, navigate, load]);

  const act = async (body: Record<string, unknown>, ok: string) => {
    setBusy(true); setMsg(null);
    const { error } = await supabase.functions.invoke("membership", { body });
    setMsg(error ? await readFnError(error) : ok);
    asked.current.clear(); setSpaces({});
    await load(); setBusy(false);
  };

  return (
    <main className="min-h-screen bg-background px-5 py-7 text-foreground">
      <div className="mx-auto max-w-xl">
        <Button asChild variant="link" className="px-0 text-neon-cyan"><Link to="/memberships"><ArrowLeft /> Memberships</Link></Button>
        <h1 className="font-display text-4xl text-neon-green">My Membership</h1>
        {msg && <p className="mt-3 rounded-lg border border-border bg-card p-3 font-body text-sm font-bold">{msg}</p>}
        {!passes ? <Loader2 className="mx-auto mt-10 animate-spin" /> : passes.length === 0 ? (
          <div className="mt-6 rounded-lg border border-border bg-card p-5 text-center font-body">
            <p>No memberships yet.</p>
            <Button asChild className="mt-4 bg-neon-green text-ink hover:bg-neon-green/90"><Link to="/memberships#join">Join now</Link></Button>
          </div>
        ) : passes.map(p => {
          const tier = MEMBERSHIP_TIERS.find(t => t.id === p.tier);
          const live = p.status === "active" || p.status === "grace";
          const sel = pick[p.id] ?? { d: days()[0], t: "" };
          const daySpaces = spaces[sel.d];
          if (live && !daySpaces) void loadSpaces(sel.d);
          return (
            <section key={p.id} className={`mt-6 rounded-lg border-2 ${tier?.border ?? "border-border"} bg-card p-5 font-body`}>
              <p className={`font-display text-3xl ${tier?.colour}`}>{tier?.emoji} {p.child_name}</p>
              <p className="text-sm text-muted-foreground">{tier?.name} · {STATUS[p.status] ?? p.status}</p>
              {tier && <p className="mt-1 text-sm">{formatMembershipPrice(membershipPricePence(tier.pricePence, p.billing_period ?? "monthly"))} / {p.billing_period === "yearly" ? "year · paid upfront" : "month"}</p>}
              {live && (
                <div className="mx-auto mt-4 w-fit rounded-lg bg-foreground p-3 text-center text-ink">
                  <QRCodeSVG value={p.pass_code} size={180} bgColor="transparent" fgColor="currentColor" />
                  <p className="mt-2 font-display text-2xl tracking-widest">{p.pass_code}</p>
                </div>
              )}
              {p.paid_until && <p className="mt-3 text-sm">{p.cancel_requested ? "Ends" : "Paid until"}: {new Date(p.paid_until).toLocaleDateString("en-GB")}</p>}
              {p.billing_period === "yearly" && <p className="mt-2 text-xs text-muted-foreground">{p.cancel_requested ? "Yearly renewal is off. Your pass stays active until the end of your paid year." : "Renews automatically every 12 months. You can switch off renewal below and keep your paid year."}</p>}
              {(tier?.monthlyArcadeCredits ?? 0) > 0 && <p className="text-sm">Arcade credits left this month: <b>{p.credits_left}</b> (collect at the counter)</p>}
              {p.upcoming.length > 0 ? p.upcoming.map(b => (
                <div key={b.booking_code} className="mt-4 rounded-lg border border-neon-cyan p-3">
                  <p className="font-extrabold">Booked: {new Date(b.session_date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })} · {label(b.session_time)}</p>
                  <button disabled={busy} className="mt-1 text-sm text-neon-pink underline" onClick={() => act({ action: "cancel_booking", membershipId: p.id, bookingCode: b.booking_code }, "Booking cancelled.")}>Cancel this booking</button>
                </div>
              )) : live && (
                <div className="mt-4 rounded-lg border border-border p-3">
                  <p className="font-extrabold">Book a free session</p>
                  <select aria-label="Date" className="mt-2 w-full rounded-md border border-border bg-background p-2" value={sel.d} onChange={e => setPick({ ...pick, [p.id]: { d: e.target.value, t: "" } })}>
                    {days().map(d => <option key={d} value={d}>{new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</option>)}
                  </select>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {SESSIONS.map(t => {
                      const left = daySpaces?.[t];
                      const full = left !== undefined && left <= 0;
                      return <button key={t} type="button" disabled={full || left === undefined} onClick={() => setPick({ ...pick, [p.id]: { ...sel, t } })}
                        className={`rounded-md border px-2 py-2 text-xs font-extrabold disabled:opacity-40 ${sel.t === t ? "border-foreground bg-neon-green text-ink" : "border-border"}`}>
                        {label(t)}
                        <span className={`mt-0.5 block text-[11px] font-bold ${sel.t === t ? "" : left !== undefined && left <= 10 ? "text-neon-pink" : "text-neon-green"}`}>
                          {left === undefined ? "…" : left === -1 ? "Finished" : full ? "Full" : `${left} spaces left`}
                        </span>
                      </button>;
                    })}
                  </div>
                  <Button disabled={busy || !sel.t} className="mt-3 w-full bg-neon-cyan text-ink hover:bg-neon-cyan/90"
                    onClick={() => act({ action: "book", membershipId: p.id, sessionDate: sel.d, sessionTime: sel.t }, "🎉 Session booked! Just scan the pass when you arrive.")}>Book session</Button>
                  <p className="mt-2 text-center text-[11px] text-muted-foreground">Only 1 session per day · one upcoming booking at a time</p>
                </div>
              )}
              {p.status !== "cancelled" && !p.cancel_requested && p.status !== "pending" && (
                <Button variant="link" disabled={busy} className="mt-4 h-auto whitespace-normal p-0 text-xs text-muted-foreground underline"
                  onClick={() => window.confirm(`${p.billing_period === "yearly" ? "Switch off renewal for" : "Cancel"} ${p.child_name}'s membership? It stays active until the end of the paid ${p.billing_period === "yearly" ? "year" : "month"}.`) && act({ action: "cancel", membershipId: p.id }, `Renewal stopped — your pass stays active until the end of your paid ${p.billing_period === "yearly" ? "year" : "month"}.`)}>{p.billing_period === "yearly" ? "Switch off yearly renewal" : "Cancel membership"}</Button>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
