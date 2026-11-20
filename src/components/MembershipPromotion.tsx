import { Link } from "react-router-dom";
import { ArrowRight, Infinity, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_SESSION_HOURS, MEMBERSHIP_TIERS } from "@/lib/membership";

export default function MembershipPromotion() {
  return (
    <section id="play-pass" className="play-pass-promo home-membership membership-spotlight relative isolate overflow-hidden rounded-lg border-2 border-neon-pink bg-card text-center text-foreground" aria-labelledby="play-pass-title">
      <div className="membership-spotlight-ribbon relative flex items-center justify-center gap-2 bg-neon-pink px-3 py-2 font-body text-xs font-extrabold text-ink"><Sparkles size={16} aria-hidden="true" /> LITTLE ADVENTURERS. HUGE PERKS! <Sparkles size={16} aria-hidden="true" /></div>
      <div className="relative px-5 pb-6 pt-5">
      <div className="play-pass-sparkles pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => <Sparkles key={i} className="play-pass-sparkle absolute h-5 w-5 text-neon-cyan" />)}
      </div>
      <p className="relative font-body text-xs font-extrabold text-neon-cyan">LUXPLAY MONTHLY MEMBERSHIPS</p>
      <h2 id="play-pass-title" className="membership-spotlight-title relative mt-3 font-display leading-none"><span className="block text-foreground">BIG FUN.</span><span className="membership-spotlight-unlimited block text-neon-green">UNLIMITED</span><span className="block text-neon-pink">SOFT PLAY!</span></h2>
      <p className="relative mt-3 font-body text-sm font-bold">Their favourite place.<br />Again. And again. And again! 🤩</p>
      <div className="relative mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-body text-xs font-extrabold">
        <span className="inline-flex items-center gap-1 text-neon-cyan"><Infinity size={18} /> {MEMBERSHIP_SESSION_HOURS}-hour sessions</span>
        <span className="inline-flex items-center gap-1 text-neon-green"><Users size={18} /> Adults go FREE</span>
      </div>
      <div className="relative mt-4 border-y border-neon-purple/50 py-3">
        <p className="font-body text-xs font-semibold">Three passes. Find your family’s favourite.</p>
        <p className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 font-display text-xl">{MEMBERSHIP_TIERS.map(tier => <span key={tier.id} className={tier.colour}>{tier.emoji} {tier.name}</span>)}</p>
        <p className="mt-2 font-body text-[11px] text-muted-foreground">Plus & VIP add arcade credits and food & drink perks.</p>
      </div>
      <Button asChild variant="secondary" size="lg" className="play-pass-cta relative mt-4 min-h-14 w-full max-w-sm whitespace-normal bg-neon-green px-4 font-body font-extrabold text-ink hover:bg-neon-green/90">
        <Link to="/memberships">SHOW ME THE MEMBERSHIPS <ArrowRight aria-hidden="true" /></Link>
      </Button>
      <p className="relative mt-3 font-body text-xs text-muted-foreground">Coming soon · One pass per named child</p>
      </div>
    </section>
  );
}
