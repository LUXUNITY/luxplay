import { Check, Gamepad2, Sparkles, Utensils } from "lucide-react";
import { MEMBERSHIP_SESSION_HOURS, MEMBERSHIP_TIERS, formatMembershipPrice } from "@/lib/membership";

export default function MembershipTiers() {
  return (
    <div className="grid grid-cols-1 gap-5 text-left md:grid-cols-3" aria-label="Monthly membership options">
      {MEMBERSHIP_TIERS.map(tier => (
        <article key={tier.id} className={`play-pass-perk flex min-w-0 flex-col overflow-hidden rounded-lg border-2 ${tier.border} bg-card`} aria-labelledby={`${tier.id}-title`}>
          <div className={`${tier.fill} px-5 py-2 font-body text-xs font-extrabold text-ink`}>
            {tier.id === "lux-vip" ? <span className="membership-best-value inline-flex items-center gap-2"><Sparkles className="h-4 w-4" aria-hidden="true" /> BEST VALUE <Sparkles className="h-4 w-4" aria-hidden="true" /></span> : "ONE CHILD · UNLIMITED PLAY"}
          </div>
          <div className="flex flex-1 flex-col px-5 py-6">
            <span className="play-pass-heart mb-3 inline-block self-start text-4xl" aria-hidden="true">{tier.emoji}</span>
            <h3 id={`${tier.id}-title`} className={`font-display text-4xl leading-none ${tier.colour}`}>{tier.name}</h3>
            <p className="mt-2 min-h-10 font-body text-xs leading-relaxed text-muted-foreground">{tier.tagline}</p>
            <p className={`play-pass-price mt-4 font-display !text-5xl leading-none ${tier.colour}`}>{formatMembershipPrice(tier.pricePence)}</p>
            <p className="mt-2 font-body text-xs text-muted-foreground">per child / month</p>
            <ul className="mt-5 space-y-4 border-t border-border pt-5 font-body text-sm leading-relaxed">
              <li className="flex items-start gap-2"><Check className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><span><strong>Unlimited soft play</strong><br />{MEMBERSHIP_SESSION_HOURS}-hour sessions for one child</span></li>
              {tier.foodDrinkDiscountPercent > 0 && <li className="flex items-start gap-2"><Utensils className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><span><strong>{tier.foodDrinkDiscountPercent}% off</strong> food &amp; drinks</span></li>}
              {tier.monthlyArcadeCredits > 0 && <li className="flex items-start gap-2"><Gamepad2 className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><span><strong>{tier.monthlyArcadeCredits} arcade credits</strong> every month</span></li>}
              <li className="flex items-start gap-2"><Check className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><strong>Adults enter free</strong></li>
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}