import { MapPin, Clock } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative py-16 md:py-24">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar" />

      <div className="px-6 md:px-12 lg:px-20 text-center">
        {/* LUXPLAY in neon gradient */}
        <h2 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-gradient-neon mb-6">
          LUXPLAY
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="border-2 border-white/10 bg-[#0a0a16] px-4 py-5">
            <p className="flex items-center justify-center gap-2 font-display text-xs tracking-[0.25em] text-neon-cyan mb-2">
              <MapPin className="w-4 h-4" />
              WHERE WE ARE
            </p>
            <address className="not-italic font-body text-white/70 text-sm leading-relaxed">
              Unit 7, Sovereign Centre
              <br />
              Boscombe, Bournemouth
              <br />
              BH1 4SX
            </address>
          </div>

          <div className="border-2 border-white/10 bg-[#0a0a16] px-4 py-5">
            <p className="flex items-center justify-center gap-2 font-display text-xs tracking-[0.25em] text-neon-pink mb-2">
              <Clock className="w-4 h-4" />
              OPENING HOURS
            </p>
            <p className="font-body text-white/70 text-sm leading-relaxed">
              Sun – Thu
              <br />
              <span className="text-neon-green font-semibold">10:00 – 20:00</span>
              <br />
              Fri &amp; Sat
              <br />
              <span className="text-neon-green font-semibold">10:00 – 21:00</span>
            </p>

          </div>
        </div>

        {/* Map */}
        <div className="mt-6 max-w-2xl mx-auto border-2 border-neon-cyan/40 bg-[#0a0a16] p-1">
          <iframe
            title="LuxPlay location map - Unit 7 Sovereign Centre, Boscombe, Bournemouth BH1 4SX"
            src="https://www.google.com/maps?q=Sovereign%20Centre%2C%20Boscombe%2C%20Bournemouth%2C%20BH1%204SX&output=embed"
            className="w-full h-64 md:h-80 grayscale-[0.2] contrast-125"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Sovereign+Centre,+Boscombe,+Bournemouth,+BH1+4SX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 font-display text-sm tracking-[0.25em] text-neon-green border-2 border-neon-green px-6 py-3 hover:bg-neon-green hover:text-[#070710] transition-colors"
        >
          GET DIRECTIONS
        </a>
      </div>

      {/* Site links — helps visitors and search engines find every page */}
      <nav
        aria-label="LuxPlay pages"
        className="relative z-10 mt-10 max-w-3xl mx-auto flex flex-wrap justify-center gap-x-5 gap-y-3 px-6"
      >
        {[
          { href: "/", label: "HOME" },
          { href: "/soft-play-bournemouth", label: "SOFT PLAY BOURNEMOUTH" },
          { href: "/arcade-bournemouth", label: "ARCADE BOURNEMOUTH" },
          { href: "/things-to-do-in-bournemouth", label: "THINGS TO DO IN BOURNEMOUTH" },
          { href: "/things-to-do-in-bournemouth-with-kids", label: "THINGS TO DO WITH KIDS" },
          { href: "/parties", label: "BIRTHDAY PARTIES" },
        ].map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-display text-[10px] md:text-xs tracking-[0.25em] text-white/60 hover:text-neon-cyan transition-colors"
          >
            {l.label}
          </a>
        ))}
      </nav>





      {/* Neon bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-neon-bar" />
    </footer>
  );
};

export default FooterSection;
