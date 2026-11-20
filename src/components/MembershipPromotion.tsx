import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Infinity, ScanLine, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_MONTHLY_PRICE, MEMBERSHIP_SESSION_HOURS } from "@/lib/membership";
import MembershipTiers from "@/components/MembershipTiers";

const perks = [
  { Icon: Infinity, title: "PLAY. REPEAT. REPEAT!", detail: `Unlimited ${MEMBERSHIP_SESSION_HOURS}-hour soft play sessions`, colour: "text-neon-cyan" },
  { Icon: ScanLine, title: "SCAN & LET THE FUN BEGIN", detail: "Your child's own QR pass at every visit", colour: "text-neon-pink" },
  { Icon: CalendarCheck, title: "SECURE YOUR SPOT", detail: "Book online before you come to play", colour: "text-neon-green" },
  { Icon: Users, title: "GROWN-UPS GO FREE!", detail: "More family time. No adult entry fee.", colour: "text-neon-cyan" },
];

export default function MembershipPromotion() {
  return (
    <section id="play-pass" className="play-pass-promo relative isolate overflow-hidden border-y-4 border-neon-purple bg-background text-center text-foreground" aria-labelledby="play-pass-title">
      <div className="play-pass-sparkles pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 8 }, (_, i) => <Sparkles key={i} className="play-pass-sparkle absolute h-5 w-5 text-neon-cyan" />)}
      </div>
      <div className="play-pass-ribbon bg-neon-green py-2 text-ink">
        <p className="flex items-center justify-center gap-2 px-4 font-body text-xs font-extrabold uppercase sm:text-sm"><Sparkles size={16} aria-hidden="true" /> Little adventurers. Endless play. <Sparkles size={16} aria-hidden="true" /></p>
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <p className="play-pass-eyebrow font-display text-2xl text-neon-pink">LUXPLAY MONTHLY MEMBERSHIPS <span className="play-pass-heart inline-block">💚</span></p>
        <h2 id="play-pass-title" className="play-pass-title mt-2 font-display leading-none">ONE PASS.<br /><span className="play-pass-unlimited text-neon-cyan">UNLIMITED FUN.</span></h2>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <p className="play-pass-price font-display leading-none text-neon-green">{MEMBERSHIP_MONTHLY_PRICE}</p>
          <p className="text-left font-body text-sm font-bold leading-relaxed">FROM · PER CHILD<br />PER MONTH</p>
        </div>
        <p className="mt-4 font-body text-sm font-semibold sm:text-base">Around the price of 3 visits.<br /><span className="play-pass-wow inline-block font-display text-3xl text-neon-pink sm:text-4xl">BUT THE PLAY? UNLIMITED! 🤩</span></p>
        <div className="mt-7"><MembershipTiers /></div>
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {perks.map(({ Icon, title, detail, colour }) => (
            <div key={title} className="play-pass-perk flex items-center gap-4 rounded-lg border border-neon-purple/50 bg-card px-4 py-4 text-left">
              <Icon className={`play-pass-perk-icon h-9 w-9 shrink-0 ${colour}`} strokeWidth={2.3} aria-hidden="true" />
              <div className="min-w-0"><h3 className={`font-display text-2xl leading-tight ${colour}`}>{title}</h3><p className="mt-1 font-body text-xs leading-relaxed text-foreground sm:text-sm">{detail}</p></div>
            </div>
          ))}
        </div>
        <p className="mt-5 font-body text-xs leading-relaxed text-muted-foreground">One pass per named child · Not transferable · Sessions subject to availability</p>
        <Button asChild variant="secondary" size="lg" className="play-pass-cta mt-5 min-h-14 w-full max-w-sm whitespace-normal bg-neon-pink px-4 py-3 font-body font-extrabold text-ink hover:bg-neon-pink/90">
          <Link to="/memberships">EXPLORE OUR MEMBERSHIPS <ArrowRight aria-hidden="true" /></Link>
        </Button>
        <p className="mt-3 font-body text-xs text-muted-foreground">Coming soon · Membership sales open once monthly billing is ready.</p>
      </div>
      <div className="overflow-hidden border-t border-neon-cyan/40 py-2 text-neon-cyan" aria-hidden="true">
        <div className="play-pass-ticker flex w-max">
          {[0, 1].map(copy => <p key={copy} className="flex shrink-0 items-center gap-5 px-5 font-display text-2xl"><Infinity className="h-6 w-6" /> BIG SMILES · TWO HOURS OF FUN · UNLIMITED VISITS · FREE ADULTS</p>)}
        </div>
      </div>
    </section>
  );
}