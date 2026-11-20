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
        <p className="relative inline-block rounded-full bg-neon-pink px-4 py-1 font-body text-xs text-ink">💚 NEW AT LUXPLAY 💚</p>
        <h2 id="play-pass-title" className="promo-hello-title relative mt-5 font-display leading-none">
          <span className="block text-neon-cyan"><span className="promo-cute-emoji" aria-hidden="true">🧸</span> Soft Play <span className="promo-cute-emoji" aria-hidden="true">🎈</span></span>
          <span className="block text-neon-green">Memberships! <span className="promo-cute-emoji" aria-hidden="true">💖</span></span>
        </h2>
        <div className="promo-price-burst relative mx-auto mt-6"><span className="block font-body text-ink">FROM</span><span className="block font-display text-ink">{MEMBERSHIP_MONTHLY_PRICE}</span><span className="block font-body text-ink">per child / month</span></div>
        <p className="promo-unlimited relative mx-auto mt-6 max-w-sm rounded-2xl border-4 border-neon-pink bg-ink/60 px-1 pb-4 pt-3 font-display leading-none">
          <span className="promo-unlimited-word block" aria-label="UNLIMITED">
            <span className="promo-unlimited-star" aria-hidden="true">⭐</span>
            {"UNLIMITED".split("").map((ch, i) => <span key={i} aria-hidden="true" className={`promo-unlimited-letter ${["text-neon-pink","text-neon-cyan","text-neon-green","text-neon-purple"][i % 4]}`} style={{ animationDelay: `${i * 0.09}s` }}>{ch}</span>)}
            <span className="promo-unlimited-star" aria-hidden="true">⭐</span>
          </span>
          <span className="mt-2 block text-3xl text-neon-cyan">soft play sessions</span>
          <span className="promo-unlimited-tag mt-3 inline-block rounded-full bg-neon-cyan px-4 py-1.5 font-body text-base text-ink">ALL MONTH LONG! <span className="promo-cute-emoji" aria-hidden="true">🎉</span></span>
        </p>
        <p className="promo-free relative mt-2 font-body text-lg text-neon-green">Grown-ups go FREE! 🤩</p>
        <div className="relative mt-5 flex flex-wrap justify-center gap-2">
          {MEMBERSHIP_TIERS.map(tier => <span key={tier.id} className={`promo-pill rounded-full border-2 ${tier.border} px-3 py-1 font-body text-sm ${tier.colour}`}>{tier.emoji} {tier.name}</span>)}
        </div>
        <Button asChild variant="secondary" size="lg" className="play-pass-cta promo-shout-cta relative mt-6 min-h-14 w-full max-w-sm rounded-full bg-neon-green px-4 font-body text-ink hover:bg-neon-green/90">
          <Link to="/memberships">GRAB YOUR PASS! <ArrowRight aria-hidden="true" /></Link>
        </Button>
        <p className="relative mt-3 font-body text-xs text-muted-foreground">Join today · one pass per child</p>
      </div>
    </section>
  );
}
