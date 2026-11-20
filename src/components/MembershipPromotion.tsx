import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_SESSION_HOURS } from "@/lib/membership";

export default function MembershipPromotion() {
  return (
    <section id="play-pass" className="play-pass-promo home-membership relative isolate overflow-hidden rounded-lg border-2 border-neon-purple bg-card px-5 py-6 text-center text-foreground" aria-labelledby="play-pass-title">
      <div className="play-pass-sparkles pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => <Sparkles key={i} className="play-pass-sparkle absolute h-5 w-5 text-neon-cyan" />)}
      </div>
      <p className="relative flex items-center justify-center gap-2 font-body text-xs font-extrabold text-neon-green"><Sparkles size={16} /> LUXPLAY MEMBERSHIPS <Sparkles size={16} /></p>
      <h2 id="play-pass-title" className="home-membership-title relative mt-3 font-display leading-none">SOFT PLAY.<br /><span className="play-pass-unlimited text-neon-pink">ON REPEAT! 🤩</span></h2>
      <p className="relative mt-3 font-body text-sm font-semibold">Unlimited {MEMBERSHIP_SESSION_HOURS}-hour sessions.<br />Big adventures. Little happy faces.</p>
      <Button asChild variant="secondary" size="lg" className="play-pass-cta relative mt-4 min-h-12 w-full max-w-sm whitespace-normal bg-neon-green px-4 font-body font-extrabold text-ink hover:bg-neon-green/90">
        <Link to="/memberships">FIND YOUR PLAY PASS <ArrowRight aria-hidden="true" /></Link>
      </Button>
      <p className="relative mt-3 font-body text-xs text-muted-foreground">Coming soon · One pass per named child</p>
    </section>
  );
}
