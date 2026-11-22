import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Heart, Infinity, ScanLine, ShieldCheck, Sparkles, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_MONTHLY_PRICE, MEMBERSHIP_MONTHLY_PRICE_PENCE, MEMBERSHIP_SESSION_HOURS, MEMBERSHIP_YEARLY_DISCOUNT_PERCENT, membershipPricePence, formatMembershipPrice, formatMembershipDailyPrice } from "@/lib/membership";
import MembershipJoin from "@/components/MembershipJoin";

export default function Memberships() {
  return (
    <main className="membership-page bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-7 md:px-10">
        <Button asChild variant="link" className="px-0 text-neon-cyan">
          <Link to="/"><ArrowLeft /> Back to LuxPlay</Link>
        </Button>
        <header className="membership-heading text-center">
          <p className="membership-launch inline-flex items-center gap-2 font-body text-xs font-extrabold text-neon-green"><Sparkles size={16} aria-hidden="true" /> BIG LITTLE ADVENTURES · JOIN TODAY</p>
          <h1 className="font-body"><span className="membership-brand">LUX<span>PLAY</span></span><span className="membership-title-label">MEMBERSHIPS</span></h1>
          <div className="membership-repeat">
            <Sparkles className="membership-heading-spark membership-heading-spark-left text-neon-green" aria-hidden="true" />
            <p className="font-display"><span className="membership-soft-play"><span>Soft</span> <span>play!</span></span><span className="membership-repeat-ribbon">ON REPEAT! <span className="membership-happy-face" aria-hidden="true">🤩</span></span></p>
            <Sparkles className="membership-heading-spark membership-heading-spark-right text-neon-cyan" aria-hidden="true" />
          </div>
          <div className="membership-price">
            <p className="font-body text-lg font-extrabold text-neon-cyan">Monthly from</p>
            <div className="membership-price-amount font-display text-neon-green">{MEMBERSHIP_MONTHLY_PRICE}</div>
            <p className="font-body text-sm font-semibold text-foreground">per child / month · about {formatMembershipDailyPrice(MEMBERSHIP_MONTHLY_PRICE_PENCE, "monthly")} a day!</p>
            <p className="mt-4 font-body text-lg font-extrabold text-neon-pink">Go yearly &amp; save {MEMBERSHIP_YEARLY_DISCOUNT_PERCENT}% 💖</p>
            <p className="mt-1 font-body text-base font-extrabold text-neon-green">From {formatMembershipPrice(membershipPricePence(MEMBERSHIP_MONTHLY_PRICE_PENCE, "yearly"))} per child / year</p>
            <p className="mt-1 font-body text-sm font-semibold text-foreground">Paid upfront · about {formatMembershipDailyPrice(MEMBERSHIP_MONTHLY_PRICE_PENCE, "yearly")} a day!</p>
            <p className="mt-2 font-body text-xs text-muted-foreground">Both renew automatically. Daily equivalents: monthly ÷ 30; yearly ÷ 365.</p>
          </div>
          <div className="membership-heading-perks">
            <div><Infinity className="text-neon-cyan" aria-hidden="true" /><p><strong>UNLIMITED</strong><span>{MEMBERSHIP_SESSION_HOURS}-hour sessions</span></p></div>
            <div><ScanLine className="text-neon-pink" aria-hidden="true" /><p><strong>THEIR OWN</strong><span>Personal play pass</span></p></div>
            <div><Users className="text-neon-green" aria-hidden="true" /><p><strong>ADULTS FREE</strong><span>Grown-ups included</span></p></div>
          </div>
          <p className="membership-heading-signoff font-body text-sm font-bold text-foreground">Little feet. Big adventures. Endless smiles. 💚</p>
          <a href="#membership-options" className="membership-explore inline-flex items-center gap-2 font-body text-xs font-extrabold text-neon-cyan">CHOOSE YOUR CHILD’S PLAY PASS <ArrowRight size={16} aria-hidden="true" /></a>
        </header>

        <section id="membership-options" className="play-pass-promo scroll-mt-20 py-6" aria-label="Choose your membership"><MembershipJoin /></section>

        <section className="membership-pass-section" aria-label="Membership pass preview">
          <div className="membership-pass">
            <div className="flex items-center justify-between border-b border-ink/20 pb-4">
              <span className="font-display text-3xl">LUXPLAY</span><Infinity aria-hidden="true" size={34} />
            </div>
            <div className="membership-pass-body">
              <div>
                <p className="font-semibold text-xs">UNLIMITED SOFT PLAY</p>
                <p className="font-display text-3xl leading-none mt-3">MY LUX<br />PLAY PASS 💚</p>
                <p className="mt-4 text-sm font-semibold">One named child</p>
                <p className="mt-1 text-xs">One happy little adventurer</p>
              </div>
              <div className="membership-sample-qr" aria-label="Sample QR linking to the membership information, not an entry pass">
                <QRCodeSVG value="https://luxplay.uk/memberships" size={116} bgColor="transparent" fgColor="currentColor" marginSize={1} />
                <p className="mt-2 text-[10px] font-bold text-center">EXAMPLE</p>
              </div>
            </div>
            <p className="border-t border-ink/20 pt-3 mt-4 text-xs">Example pass · your real pass appears in My Membership</p>
          </div>
        </section>

        <section className="membership-benefits" aria-label="Membership benefits">
          <div><Infinity className="text-neon-cyan" /><h2>PLAY ON REPEAT</h2><p>Unlimited {MEMBERSHIP_SESSION_HOURS}-hour soft play sessions for your named child.</p></div>
          <div><CalendarDays className="text-neon-pink" /><h2>YOUR SESSION, RESERVED</h2><p>Book online before visiting. Sessions stay subject to availability.</p></div>
          <div><ScanLine className="text-neon-green" /><h2>THEIR OWN QR PASS</h2><p>A personal membership pass for staff to check at every visit.</p></div>
          <div><Users className="text-neon-pink" /><h2>GROWN-UPS GO FREE!</h2><p>More family time, with no adult entry fee.</p></div>
        </section>

        <section className="membership-notice text-center">
          <ShieldCheck className="mx-auto text-neon-cyan mb-3" />
          <h2 className="font-display text-3xl">ONE PASS. ONE CHILD.</h2>
          <p className="mx-auto max-w-lg mt-2 text-sm text-muted-foreground">Memberships aren’t transferable. Only 1 session per day, with one upcoming booking at a time. Other children need their own membership or a separate paid booking.</p>
          <p className="inline-flex items-center gap-2 mt-7 text-neon-green font-semibold"><Heart size={18} /> Monthly flexibility or yearly savings 💚</p>
          <p className="mx-auto mt-3 max-w-lg text-xs text-muted-foreground">Yearly passes are paid upfront and renew automatically every 12 months. Switch off renewal any time in My Membership; your pass stays active until the end of your paid year. Savings compared with 12 monthly payments.</p>
          <div className="mt-5">
            <Button asChild variant="secondary" size="lg" className="bg-neon-cyan text-ink hover:bg-neon-cyan/90">
              <Link to="/my-membership">Go to My Membership <ArrowRight /></Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}