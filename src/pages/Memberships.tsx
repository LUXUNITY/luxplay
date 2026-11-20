import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Heart, Infinity, ScanLine, ShieldCheck, Sparkles, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_MONTHLY_PRICE, MEMBERSHIP_SESSION_HOURS } from "@/lib/membership";

export default function Memberships() {
  return (
    <main className="membership-page bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-5 py-7 md:px-10">
        <Button asChild variant="link" className="px-0 text-neon-cyan">
          <Link to="/"><ArrowLeft /> Back to LuxPlay</Link>
        </Button>
        <header className="membership-heading text-center">
          <p className="inline-flex items-center gap-2 font-semibold text-neon-green"><Sparkles size={18} /> COMING SOON</p>
          <h1 className="font-display">LUXPLAY<br /><span className="text-neon-cyan">PLAY PASS</span></h1>
          <p className="text-lg font-semibold">Little adventurers. Endless play. 💚</p>
          <div className="membership-price font-display text-neon-pink">{MEMBERSHIP_MONTHLY_PRICE}<span className="font-body text-sm text-foreground">per child / month</span></div>
          <p className="text-muted-foreground">Unlimited {MEMBERSHIP_SESSION_HOURS}-hour soft play sessions. One child. Their very own pass.</p>
          <p className="mt-4 font-display text-3xl text-neon-green">AROUND THE PRICE OF 3 VISITS. ENDLESS PLAY! 🤩</p>
        </header>

        <section className="membership-pass-section" aria-label="Membership pass preview">
          <div className="membership-pass">
            <div className="flex items-center justify-between border-b border-ink/20 pb-4">
              <span className="font-display text-3xl">LUXPLAY</span><Infinity aria-hidden="true" size={34} />
            </div>
            <div className="membership-pass-body">
              <div>
                <p className="font-semibold text-xs">UNLIMITED SOFT PLAY</p>
                <p className="font-display text-4xl leading-none mt-3">MY PLAY<br />PASS 💚</p>
                <p className="mt-4 text-sm font-semibold">One named child</p>
                <p className="mt-1 text-xs">One happy little adventurer</p>
              </div>
              <div className="membership-sample-qr" aria-label="Sample QR linking to the membership information, not an entry pass">
                <QRCodeSVG value="https://luxplay.uk/memberships" size={116} bgColor="transparent" fgColor="currentColor" marginSize={1} />
                <p className="mt-2 text-[10px] font-bold text-center">SAMPLE PASS</p>
              </div>
            </div>
            <p className="border-t border-ink/20 pt-3 mt-4 text-xs">Preview only · Not valid for entry</p>
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
          <p className="mx-auto max-w-lg mt-2 text-sm text-muted-foreground">Memberships aren’t transferable. Other children need their own membership or a separate paid booking.</p>
          <p className="inline-flex items-center gap-2 mt-7 text-neon-green font-semibold"><Heart size={18} /> Memberships are not on sale yet</p>
          <div className="mt-5">
            <Button asChild variant="secondary" size="lg" className="bg-neon-cyan text-ink hover:bg-neon-cyan/90">
              <Link to="/#softplay">Book a regular soft play session <ArrowRight /></Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}