import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, Gamepad2, Mail, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import arcadePhoto from "@/assets/venue-arcade.webp";
import FooterSection from "@/components/FooterSection";

function enquiry(kind: string) {
  const body = kind === "Party Arcade"
    ? "Hi LuxPlay,\n\nI'd like to hire arcade machines for an event.\n\nEvent type:\nDate and hire duration (day / weekend / week):\nLocation / postcode:\nMachines or games I'm interested in:\nAvailable space and access:\nContact number:\n\nThanks!"
    : "Hi LuxPlay,\n\nI'm interested in hosting a machine on a revenue-share arrangement.\n\nVenue name and type:\nLocation / postcode:\nMachine I'm interested in:\nAvailable space and access:\nContact number:\n\nThanks!";
  return `mailto:luxplayuk@gmail.com?subject=${encodeURIComponent(`${kind} Enquiry — LuxPlay`)}&body=${encodeURIComponent(body)}`;
}

export default function ArcadeHire() {
  return (
    <main className="arcade-hire min-h-screen bg-background text-foreground">
      <nav aria-label="Back to homepage" className="mx-auto max-w-6xl px-5 py-5">
        <Button asChild variant="ghost" className="font-body text-neon-cyan"><Link to="/"><ArrowLeft size={18} /> Back to LuxPlay</Link></Button>
      </nav>

      <section className="arcade-hire-hero relative flex min-h-[400px] items-end overflow-hidden md:min-h-[480px]">
        <img src={arcadePhoto} alt="Colourful arcade machines at LuxPlay" className="absolute inset-0 h-full w-full object-cover" />
        <div className="arcade-hire-photo-shade absolute inset-0" />
        <div className="relative mx-auto w-full max-w-4xl px-5 pb-9 pt-36 text-center md:pb-12">
          <p className="mb-3 text-sm font-extrabold text-neon-green">LUXPLAY · FUN BEYOND OUR DOORS</p>
          <h1 className="text-neon-cyan">Arcade Hire 🎮</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed">Your party. Your venue. A whole lot of play.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="h-auto min-h-12 whitespace-normal bg-neon-pink px-5 py-3 text-ink hover:bg-neon-pink/90"><a href="#party-arcade"><Gamepad2 /> Build Your Party Arcade</a></Button>
            <Button asChild className="h-auto min-h-12 whitespace-normal bg-neon-green px-5 py-3 text-ink hover:bg-neon-green/90"><a href="#host-machine"><Store /> Host a Machine</a></Button>
          </div>
        </div>
      </section>

      <section id="party-arcade" className="scroll-mt-5 border-b border-neon-pink/30 px-5 py-10 md:py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-12">
          <div className="text-center md:text-left">
            <Gamepad2 size={42} className="mx-auto mb-4 text-neon-pink md:mx-0" aria-hidden="true" />
            <p className="mb-3 text-sm text-neon-cyan">BIRTHDAYS · WEDDINGS · EVENTS</p>
            <h2 className="text-neon-pink">Build Your<br />Party Arcade</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">Big birthday plans? A wedding with a playful twist? Bring the arcade to your celebration with a selection of machines for your own mini arcade.</p>
            <p className="mt-5 flex items-center gap-3 text-neon-green"><CalendarDays aria-hidden="true" /> One day · A weekend · A week</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Tell us your date, location and favourite games. We’ll discuss suitable machines, availability, access and delivery, then quote for your event.</p>
            <Button asChild className="mt-6 h-auto min-h-12 w-full whitespace-normal bg-neon-pink px-6 py-3 text-ink hover:bg-neon-pink/90 sm:w-auto"><a href={enquiry("Party Arcade")}><Mail size={18} /> Get a party quote <ArrowUpRight size={18} /></a></Button>
          </div>
        </div>
      </section>

      <section id="host-machine" className="scroll-mt-5 px-5 py-10 md:py-14">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-12">
          <div className="text-center md:text-left">
            <Store size={42} className="mx-auto mb-4 text-neon-green md:mx-0" aria-hidden="true" />
            <p className="mb-3 text-sm text-neon-purple">YOUR SPACE · MORE PLAY</p>
            <h2 className="text-neon-green">Host a Machine</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed">Give your customers something to play for. Interested in a boxing machine at your venue? Talk to LuxPlay about a revenue-share placement.</p>
            <p className="mt-5 text-neon-cyan">Pubs · Clubs · Sports venues<br />Shops · Restaurants</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">We’ll discuss the right machine for your space and agree a share of its takings. Suitability, installation and the arrangement are confirmed individually.</p>
            <Button asChild className="mt-6 h-auto min-h-12 w-full whitespace-normal bg-neon-green px-6 py-3 text-ink hover:bg-neon-green/90 sm:w-auto"><a href={enquiry("Host a Machine")}><Mail size={18} /> Let's talk machines <ArrowUpRight size={18} /></a></Button>
          </div>
        </div>
      </section>

      <aside className="border-y border-neon-cyan/30 bg-neon-cyan/5 px-5 py-6 text-center">
        <p className="text-sm leading-relaxed">Have a different location or idea in mind? <a className="text-neon-cyan underline underline-offset-4" href="mailto:luxplayuk@gmail.com">luxplayuk@gmail.com</a></p>
        <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-muted-foreground">All hire and placements are subject to machine availability, venue suitability and an agreed quote. Sending an enquiry does not make a booking.</p>
      </aside>
      <FooterSection />
    </main>
  );
}