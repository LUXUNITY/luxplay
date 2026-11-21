import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MEMBERSHIP_TIERS, formatMembershipPrice } from "@/lib/membership";

export const readFnError = async (error: unknown) =>
  error instanceof FunctionsHttpError ? (await error.context.json().catch(() => ({})))?.error ?? "Something went wrong" : (error as Error)?.message ?? "Something went wrong";

export default function MembershipJoin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tier, setTier] = useState<string | null>(null);
  const [childName, setChildName] = useState("");
  const [childDob, setChildDob] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tier) return;
    if (!user) { navigate(`/auth?next=${encodeURIComponent("/memberships#join")}`); return; }
    setBusy(true); setError(null);
    const { data, error } = await supabase.functions.invoke("membership", { body: { action: "join", tier, childName, childDob, parentName, parentPhone } });
    if (error || !data?.url) { setError(error ? await readFnError(error) : "Could not start checkout"); setBusy(false); return; }
    window.location.href = data.url;
  };

  return (
    <form id="join" onSubmit={join} className="mx-auto mt-8 max-w-xl scroll-mt-24 rounded-lg border-2 border-neon-green bg-card p-5 text-left">
      <h2 className="font-display text-3xl text-neon-green">Join now 💚</h2>
      <p className="mt-1 font-body text-sm text-muted-foreground">One pass per named child. Paid monthly by card through Square — cancel any time.</p>
      <p id="choose-pass" className="mt-4 font-body font-extrabold text-neon-green">Click to choose your pass 💚</p>
      <div className="mt-2 grid gap-2" role="radiogroup" aria-labelledby="choose-pass">
        {MEMBERSHIP_TIERS.map(t => (
          <Button type="button" variant="outline" role="radio" aria-checked={tier === t.id} key={t.id} onClick={() => setTier(t.id)}
            className={`flex h-auto min-h-12 items-center justify-between rounded-lg border-2 px-4 py-3 font-body font-extrabold ${tier === t.id ? `${t.fill} text-ink border-foreground hover:text-ink` : `${t.border} ${t.colour} bg-background hover:bg-background`}`}>
            <span>{t.emoji} {t.name}</span><span>{formatMembershipPrice(t.pricePence)}/mo</span>
          </Button>
        ))}
      </div>
      {user ? (
        <div className="mt-4 grid gap-3">
          <div><Label htmlFor="child-name">Child's full name</Label><Input id="child-name" required maxLength={80} value={childName} onChange={e => setChildName(e.target.value)} /></div>
          <div><Label htmlFor="child-dob">Child's date of birth</Label><Input id="child-dob" type="date" required value={childDob} onChange={e => setChildDob(e.target.value)} /></div>
          <div><Label htmlFor="parent-name">Your name</Label><Input id="parent-name" required maxLength={80} value={parentName} onChange={e => setParentName(e.target.value)} /></div>
          <div><Label htmlFor="parent-phone">Mobile number</Label><Input id="parent-phone" type="tel" maxLength={30} value={parentPhone} onChange={e => setParentPhone(e.target.value)} /></div>
          <p className="font-body text-xs text-muted-foreground">Your pass is sent to {user.email}. If a monthly payment fails you have 24 hours to fix it before the pass pauses.</p>
        </div>
      ) : <p className="mt-4 font-body text-sm">Create a free LuxPlay account (or sign in) so your child's pass is saved safely.</p>}
      {error && <p className="mt-3 font-body text-sm font-bold text-destructive">{error}</p>}
      <Button type="submit" disabled={busy || !tier} size="lg" className="mt-5 h-auto min-h-11 w-full whitespace-normal bg-neon-green text-ink hover:bg-neon-green/90">
        {busy ? <Loader2 className="animate-spin" /> : !tier ? "Choose your pass above to continue" : user ? "Continue to secure payment" : "Sign in or create account to join"}
      </Button>
    </form>
  );
}
