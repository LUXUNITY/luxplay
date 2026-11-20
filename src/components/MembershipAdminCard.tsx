import { useState } from "react";

export interface MemberPass {
  id: string; pass_code: string; child_name: string; child_dob: string | null; parent_name: string; tier: string;
  status: string; can_enter: boolean; paid_until: string | null; cafe_discount: number; credits_left: number; credits_total: number;
  today_bookings: { booking_code: string; session_time: string; checked_in: boolean }[];
  current_session: string | null; checked_in_this_session: boolean;
}

type Call = (action: string, payload?: Record<string, unknown>) => Promise<any>;

export default function MembershipAdminCard({ pass, callAdmin }: { pass: MemberPass; callAdmin: Call }) {
  const [m, setM] = useState(pass);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [credits, setCredits] = useState(String(Math.min(pass.credits_left, pass.credits_total)));

  const run = async (action: string, payload: Record<string, unknown>, ok: string) => {
    setBusy(true); setMsg(null);
    try { const r = await callAdmin(action, { id: m.id, ...payload }); if (r?.data) setM(r.data); setMsg(r?.error ?? ok); }
    catch (e: any) { setMsg(e?.message ?? "Failed"); }
    setBusy(false);
  };

  const statusCls = m.status === "active" ? "bg-neon-green text-ink" : m.status === "grace" ? "bg-neon-cyan text-ink" : "bg-destructive text-destructive-foreground";
  return (
    <div className="border border-border bg-card p-6 text-card-foreground">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-xs tracking-[0.3em] text-muted-foreground">MEMBERSHIP PASS · {m.pass_code}</p>
        <span className={`px-3 py-1 font-display text-xs tracking-widest ${statusCls}`}>{m.status === "grace" ? "PAYMENT DUE (24H GRACE)" : m.status.toUpperCase()}</span>
      </div>
      <p className="font-display text-3xl text-neon-green">{m.child_name}</p>
      <div className="mt-4 space-y-2 text-sm">
        <p><b>Tier:</b> {m.tier}</p>
        {m.child_dob && <p><b>Date of birth:</b> {new Date(m.child_dob).toLocaleDateString("en-GB")}</p>}
        <p><b>Parent:</b> {m.parent_name}</p>
        {m.paid_until && <p><b>Paid until:</b> {new Date(m.paid_until).toLocaleDateString("en-GB")}</p>}
        <p><b>Café discount:</b> {m.cafe_discount ? `${m.cafe_discount}% off food & drink` : "None"}</p>
        <p><b>Arcade credits left this month:</b> {m.credits_left} / {m.credits_total}</p>
        <p><b>Today's booking:</b> {m.today_bookings.length ? m.today_bookings.map(b => `${b.session_time}${b.checked_in ? " ✓" : ""}`).join(", ") : "None — walk-in if space"}</p>
        <p><b>Session now:</b> {m.current_session ?? "No session running"}</p>
      </div>
      {!m.can_enter && <p className="mt-4 font-bold text-destructive">⛔ Do not admit — payment needed. Pass switches back on as soon as they pay.</p>}
      <div className="mt-5 flex flex-col gap-3">
        <button disabled={busy || !m.can_enter || m.checked_in_this_session || !m.current_session} onClick={() => run("membership_checkin", {}, `✓ ${m.child_name} checked in`)}
          className="bg-neon-green py-3 font-display tracking-widest text-ink disabled:opacity-40">
          {m.checked_in_this_session ? "ALREADY CHECKED IN THIS SESSION" : `CHECK IN ${m.child_name.toUpperCase()}`}
        </button>
        {m.credits_total > 0 && (
          <div className="flex gap-2">
            <input value={credits} onChange={e => setCredits(e.target.value)} inputMode="numeric" className="w-24 border border-border bg-background px-3 text-foreground" aria-label="Credits to give" />
            <button disabled={busy || !m.can_enter || m.credits_left < 1} onClick={() => run("membership_give_credits", { amount: Number(credits) }, "✓ Credits recorded")}
              className="flex-1 bg-neon-cyan py-3 font-display tracking-widest text-ink disabled:opacity-40">MARK CREDITS GIVEN</button>
          </div>
        )}
        {msg && <p className="text-sm font-bold">{msg}</p>}
      </div>
    </div>
  );
}
