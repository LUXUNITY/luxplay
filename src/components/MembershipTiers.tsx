import { Check, Gamepad2, Sparkles, Utensils } from "lucide-react";
import { MEMBERSHIP_SESSION_HOURS, MEMBERSHIP_TIERS, formatMembershipPrice, membershipPricePence, MEMBERSHIP_YEARLY_DISCOUNT_PERCENT, type MembershipBillingPeriod } from "@/lib/membership";

type Props = { selected?: string | null; onSelect?: (id: string) => void; billingPeriod?: MembershipBillingPeriod };

export default function MembershipTiers({ selected, onSelect, billingPeriod = "monthly" }: Props = {}) {
  return (
    <div className="grid grid-cols-1 gap-5 text-left md:grid-cols-3" aria-label={`${billingPeriod === "yearly" ? "Yearly" : "Monthly"} membership options`} role={onSelect ? "radiogroup" : undefined}>
      {MEMBERSHIP_TIERS.map(tier => (
        <article key={tier.id} aria-labelledby={`${tier.id}-title`}
          {...(onSelect ? { role: "radio", "aria-checked": selected === tier.id, tabIndex: 0, onClick: () => onSelect(tier.id), onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(tier.id); } } } : {})}
          className={`play-pass-perk flex min-w-0 flex-col overflow-hidden rounded-lg bg-card transition-transform ${onSelect ? "cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring" : ""} ${selected === tier.id ? `border-[6px] ${tier.border} scale-[1.03] ring-4 ring-foreground` : `border-2 ${tier.border}`} ${selected && selected !== tier.id ? "opacity-60" : ""}`}>
          <div className={`${tier.fill} px-5 py-2 font-body text-xs font-extrabold text-ink`}>
            {selected === tier.id ? "✓ YOUR PASS" : tier.id === "lux-vip" ? <span className="membership-best-value inline-flex items-center gap-2"><Sparkles className="h-4 w-4" aria-hidden="true" /> BEST VALUE <Sparkles className="h-4 w-4" aria-hidden="true" /></span> : "ONE CHILD · UNLIMITED PLAY"}
          </div>
          <div className="flex flex-1 flex-col px-5 py-6">
            <span className="play-pass-heart mb-3 inline-block self-start text-4xl" aria-hidden="true">{tier.emoji}</span>
            <h3 id={`${tier.id}-title`} className={`font-display text-4xl leading-none ${tier.colour}`}>{tier.name}</h3>
            <p className={`mt-2 min-h-10 font-body text-lg leading-snug ${tier.colour}`}>{tier.tagline}</p>
            <p className={`play-pass-price mt-4 font-display !text-5xl leading-none ${tier.colour}`}>{formatMembershipPrice(membershipPricePence(tier.pricePence, billingPeriod))}</p>
            <p className="mt-2 font-body text-base text-foreground">per child / {billingPeriod === "yearly" ? "year · paid upfront" : "month"}</p>
            {billingPeriod === "yearly" && <div className={`mt-4 border-y-2 ${tier.border} py-3 font-body ${tier.colour}`}>
              <p className="text-xl font-extrabold">Save {formatMembershipPrice(tier.pricePence * 12 - membershipPricePence(tier.pricePence, "yearly"))} a year! 🎉</p>
              <p className="mt-1 text-sm">{MEMBERSHIP_YEARLY_DISCOUNT_PERCENT}% less than 12 monthly payments</p>
            </div>}
            <ul className="mt-5 space-y-4 border-t border-border pt-5 font-body text-sm leading-relaxed">
              <li className="flex items-start gap-2"><Check className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><span><strong>Unlimited soft play</strong><br />{MEMBERSHIP_SESSION_HOURS}-hour sessions for one child</span></li>
              {tier.foodDrinkDiscountPercent > 0 && <li className="flex items-start gap-2"><Utensils className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><span><strong>{tier.foodDrinkDiscountPercent}% off</strong> food &amp; drinks</span></li>}
              {tier.monthlyArcadeCredits > 0 && <li className="flex items-start gap-2"><Gamepad2 className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><span><strong>£{tier.monthlyArcadeCreditValuePounds} worth of arcade credits</strong> every month</span></li>}
              <li className="flex items-start gap-2"><Check className={`mt-1 h-4 w-4 shrink-0 ${tier.colour}`} /><strong>Adults enter free</strong></li>
            </ul>
            <p className="mt-4 font-body text-xs text-muted-foreground">One named child · only 1 session per day · one upcoming booking at a time</p>
          </div>
        </article>
      ))}
    </div>
  );
}