import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_MONTHLY_PRICE, MEMBERSHIP_TIERS } from "@/lib/membership";

export default function MembershipPromotion() {
  return (
    <section id="play-pass" className="play-pass-promo home-membership membership-spotlight promo-rainbow relative isolate overflow-hidden rounded-lg border-2 border-neon-pink bg-card text-center text-foreground" aria-labelledby="play-pass-title">
      <div className="relative px-6 pb-7 pt-7">
        <div className="play-pass-sparkles pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 4 }, (_, i) => <Sparkles key={i} className="play-pass-sparkle absolute h-5 w-5 text-neon-cyan" />)}
        </div>
        <p className="relative inline-block rounded-full bg-neon-pink px-4 py-1 font-body text-xs text-ink">💚 NEW · MEMBERSHIPS</p>
        <h2 id="play-pass-title" className="promo-hello-title relative mt-5 font-display leading-none">
          <span className="block text-neon-cyan">Unlimited</span>
          <span className="block text-neon-pink">soft play!</span>
        </h2>
        <div className="promo-price-burst relative mx-auto mt-6"><span className="block font-body text-sm text-ink">ONLY</span><span className="block font-display text-ink">{MEMBERSHIP_MONTHLY_PRICE}</span><span className="block font-body text-xs text-ink">a month</span></div>
        <p className="promo-free relative mt-5 font-body text-lg text-neon-green">Grown-ups go FREE! 🤩</p>
        <div className="relative mt-5 flex flex-wrap justify-center gap-2">
          {MEMBERSHIP_TIERS.map(tier => <span key={tier.id} className={`promo-pill rounded-full border-2 ${tier.border} px-3 py-1 font-body text-sm ${tier.colour}`}>{tier.emoji} {tier.name}</span>)}
        </div>
        <Button asChild variant="secondary" size="lg" className="play-pass-cta promo-shout-cta relative mt-6 min-h-14 w-full max-w-sm rounded-full bg-neon-green px-4 font-body text-ink hover:bg-neon-green/90">
          <Link to="/memberships">GRAB YOUR PASS! <ArrowRight aria-hidden="true" /></Link>
        </Button>
        <p className="relative mt-3 font-body text-xs text-muted-foreground">Coming soon · one pass per child</p>
      </div>
    </section>
  );
}
