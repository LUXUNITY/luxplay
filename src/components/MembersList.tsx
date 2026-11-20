import { useState } from "react";
import { Loader2, Users } from "lucide-react";

type Member = {
  pass_code: string; child_name: string; parent_name: string; parent_email: string; parent_phone: string | null;
  tier: string; status: string; paid_until: string | null; card_on_file: boolean | null; cancel_requested: boolean;
  joined: string; sessions_booked: number; sessions_used: number;
};

const statusStyle: Record<string, string> = {
  active: "text-neon-green bg-neon-green/10", grace: "text-neon-cyan bg-neon-cyan/10",
  suspended: "text-neon-pink bg-neon-pink/10", cancelled: "text-muted-foreground bg-muted",
};

export default function MembersList({ callAdmin }: { callAdmin: (a: string, p?: Record<string, unknown>) => Promise<any> }) {
  const [members, setMembers] = useState<Member[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setBusy(true); setErr(null);
    try { setMembers((await callAdmin("list_memberships")).members ?? []); }
    catch (e) { setErr((e as Error).message); }
    finally { setBusy(false); }
  };

  const csv = () => {
    if (!members) return;
    const head = ["Pass", "Child", "Parent", "Email", "Phone", "Pass type", "Status", "Paid until", "Card saved", "Joined", "Sessions booked", "Sessions used"];
    const rows = members.map((m) => [m.pass_code, m.child_name, m.parent_name, m.parent_email, m.parent_phone ?? "", m.tier, m.status, m.paid_until ?? "", m.card_on_file ? "yes" : "no", m.joined.slice(0, 10), m.sessions_booked, m.sessions_used]);
    const text = [head, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/csv" }));
    a.download = "luxplay-members.csv"; a.click();
  };

  return (
    <div className="border border-border bg-card p-6 mt-8">
      <div className="flex items-center justify-between gap-2 mb-4">
        <p className="font-display text-xs tracking-[0.3em] text-muted-foreground flex items-center gap-2"><Users className="w-4 h-4" /> ALL MEMBERS</p>
        <div className="flex gap-2">
          {members && members.length > 0 && <button onClick={csv} className="font-display text-xs tracking-widest px-3 py-2 border border-border">DOWNLOAD</button>}
          <button onClick={load} disabled={busy} className="font-display text-xs tracking-widest px-3 py-2 bg-neon-cyan text-ink disabled:opacity-50 flex items-center gap-1">
            {busy && <Loader2 className="w-3 h-3 animate-spin" />}{members ? "REFRESH" : "SHOW MEMBERS"}
          </button>
        </div>
      </div>
      {busy && <p className="text-sm text-muted-foreground">Checking every pass with Square…</p>}
      {err && <p className="text-sm text-destructive">{err}</p>}
      {members && !busy && (
        <>
          <p className="text-sm text-muted-foreground mb-3">
            {members.length} members · {members.filter((m) => m.status === "active").length} paid up · {members.filter((m) => m.status === "grace" || m.status === "suspended").length} payment problems
          </p>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.pass_code} className="border border-border p-3 text-sm space-y-1">
                <div className="flex justify-between gap-2">
                  <b>{m.child_name} <span className="text-muted-foreground font-normal">· {m.tier}</span></b>
                  <span className={`font-display text-[10px] tracking-widest px-2 py-0.5 ${statusStyle[m.status] ?? ""}`}>{m.status.toUpperCase()}{m.cancel_requested ? " · CANCELLING" : ""}</span>
                </div>
                <p>{m.parent_name} · {m.parent_email}{m.parent_phone ? ` · ${m.parent_phone}` : ""}</p>
                <p className="text-muted-foreground">
                  {m.pass_code} · Booked {m.sessions_booked} · Used {m.sessions_used} · Paid until {m.paid_until ?? "—"}
                  {m.card_on_file === false && <span className="text-neon-pink"> · NO SAVED CARD</span>}
                </p>
              </div>
            ))}
            {members.length === 0 && <p className="text-sm text-muted-foreground">No members yet.</p>}
          </div>
        </>
      )}
    </div>
  );
}
