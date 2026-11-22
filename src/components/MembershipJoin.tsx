import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FunctionsHttpError } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MEMBERSHIP_TIERS, formatMembershipPrice, membershipPricePence, MEMBERSHIP_YEARLY_DISCOUNT_PERCENT, type MembershipBillingPeriod } from "@/lib/membership";
import MembershipTiers from "@/components/MembershipTiers";

export const readFnError = async (error: unknown) =>
  error instanceof FunctionsHttpError ? (await error.context.json().catch(() => ({})))?.error ?? "Something went wrong" : (error as Error)?.message ?? "Something went wrong";

export default function MembershipJoin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialTier = params.get("tier");
  const [billingPeriod, setBillingPeriod] = useState<MembershipBillingPeriod>(params.get("billing") === "monthly" || (initialTier && !params.get("billing")) ? "monthly" : "yearly");
  const joinPath = (id: string) => `/memberships?tier=${id}&billing=${billingPeriod}#join`;
  const [tier, setTier] = useState<string | null>(MEMBERSHIP_TIERS.some(t => t.id === initialTier) ? initialTier : null);
  const choose = (id: string) => {
    setTier(id);
    if (!user) { navigate(`/auth?next=${encodeURIComponent(joinPath(id))}`); return; }
    setTimeout(() => { document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" }); document.getElementById("child-name")?.focus({ preventScroll: true }); }, 50);
  };
  const [childName, setChildName] = useState("");
  const [childDob, setChildDob] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { if (user && initialTier) setTimeout(() => document.getElementById("join")?.scrollIntoView({ block: "start" }), 300); }, [user, initialTier]);

  const join = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tier) return;
    if (!user) { navigate(`/auth?next=${encodeURIComponent(joinPath(tier))}`); return; }
    setBusy(true); setError(null);
    const { data, error } = await supabase.functions.invoke("membership", { body: { action: "join", tier, billingPeriod, childName, childDob, parentName, parentPhone } });
    if (error || !data?.url) { setError(error ? await readFnError(error) : "Could not start checkout"); setBusy(false); return; }
    window.location.href = data.url;
  };

  const chosen = MEMBERSHIP_TIERS.find(t => t.id === tier);
  return (
    <>
    <div className="mb-6 text-center">
      <p className="font-display text-3xl text-neon-pink md:text-4xl">YOUR PASS. YOUR WAY! 💖</p>
      <p className="mt-2 font-body text-lg font-extrabold text-neon-green">Pay monthly, or save {MEMBERSHIP_YEARLY_DISCOUNT_PERCENT}% with yearly.</p>
      <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-2" aria-label="Payment frequency">
        <Button type="button" variant="outline" aria-pressed={billingPeriod === "monthly"} onClick={() => setBillingPeriod("monthly")} className={`h-auto min-h-16 whitespace-normal border-2 px-3 py-3 font-body ${billingPeriod === "monthly" ? "border-neon-cyan bg-neon-cyan text-ink hover:bg-neon-cyan/90" : "border-border"}`}>Monthly</Button>
        <Button type="button" variant="outline" aria-pressed={billingPeriod === "yearly"} onClick={() => setBillingPeriod("yearly")} className={`h-auto min-h-16 flex-col whitespace-normal border-2 px-3 py-3 font-body ${billingPeriod === "yearly" ? "border-neon-green bg-neon-green text-ink hover:bg-neon-green/90" : "border-neon-green text-neon-green"}`}><span>Yearly ✨</span><span className="text-xs">SAVE {MEMBERSHIP_YEARLY_DISCOUNT_PERCENT}%</span></Button>
      </div>
      <p className="mt-3 font-body text-sm text-foreground">{billingPeriod === "yearly" ? "One upfront payment. Renews automatically each year." : "Pay monthly. Renews automatically each month. Cancel any time."}</p>
    </div>
    <MembershipTiers selected={tier} onSelect={choose} billingPeriod={billingPeriod} />
    <p className="mt-3 text-center font-body text-xs text-muted-foreground">Daily prices are approximate, per child: monthly ÷ 30 days; yearly ÷ 365 days. Payments are monthly or yearly, not daily.</p>
    <form id="join" onSubmit={join} className="mx-auto mt-8 max-w-xl scroll-mt-24 rounded-lg border-2 border-neon-green bg-card p-5 text-left">
      <h2 className="font-display text-3xl text-neon-green">Join now 💚</h2>
      <p className="mt-1 font-body text-sm text-muted-foreground">One pass per named child · only 1 session per day. {billingPeriod === "yearly" ? "Paid upfront by card through Square. Renews automatically every 12 months; switch off renewal any time and keep the rest of your paid year. Plus and VIP arcade credits are released monthly." : "Paid monthly by card through Square — cancel any time."}</p>
      {chosen && <p className={`mt-3 font-body font-extrabold ${chosen.colour}`}>{chosen.emoji} {chosen.name} · {formatMembershipPrice(membershipPricePence(chosen.pricePence, billingPeriod))} / {billingPeriod === "yearly" ? "year, paid upfront" : "month"}</p>}
      {user ? (
        <div className="mt-4 grid gap-3">
          <div><Label htmlFor="child-name">Child's full name</Label><Input id="child-name" required maxLength={80} value={childName} onChange={e => setChildName(e.target.value)} /></div>
          <div><Label htmlFor="child-dob">Child's date of birth</Label><Input id="child-dob" type="date" required value={childDob} onChange={e => setChildDob(e.target.value)} /></div>
          <div><Label htmlFor="parent-name">Your name</Label><Input id="parent-name" required maxLength={80} value={parentName} onChange={e => setParentName(e.target.value)} /></div>
          <div><Label htmlFor="parent-phone">Mobile number</Label><Input id="parent-phone" type="tel" maxLength={30} value={parentPhone} onChange={e => setParentPhone(e.target.value)} /></div>
          <p className="font-body text-xs text-muted-foreground">Your pass is sent to {user.email}. If a payment fails you have 24 hours to fix it before the pass pauses.</p>
        </div>
      ) : <p className="mt-4 font-body text-sm">Create a free LuxPlay account (or sign in) so your child's pass is saved safely.</p>}
      {error && <p className="mt-3 font-body text-sm font-bold text-destructive">{error}</p>}
      <Button type="submit" disabled={busy || !tier} size="lg" className="mt-5 h-auto min-h-11 w-full whitespace-normal bg-neon-green text-ink hover:bg-neon-green/90">
        {busy ? <Loader2 className="animate-spin" /> : !tier ? "Tap a pass above to continue" : user ? "Continue to secure payment" : "Sign in or create account to join"}
      </Button>
    </form>
    </>
  );
}
