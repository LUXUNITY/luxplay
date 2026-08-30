import { MapPin, Clock } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative bg-card py-12">
      <div className="px-6 max-w-md mx-auto text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tighter text-foreground mb-6">
          LUXPLAY
        </h2>

        <div className="grid grid-cols-1 gap-3">
          <div className="bg-neon-cyan/20 rounded-3xl px-4 py-4">
            <p className="flex items-center justify-center gap-2 font-display text-xs font-extrabold tracking-wide text-foreground mb-1">
              <MapPin className="w-4 h-4" />
              WHERE WE ARE
            </p>
            <address className="not-italic font-body text-foreground/70 text-sm">
              Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX
            </address>
          </div>

          <div className="bg-neon-pink/20 rounded-3xl px-4 py-4">
            <p className="flex items-center justify-center gap-2 font-display text-xs font-extrabold tracking-wide text-foreground mb-1">
              <Clock className="w-4 h-4" />
              OPENING HOURS
            </p>
            <p className="font-body text-foreground/70 text-sm">
              Sun–Thu 10:00–20:00 · Fri–Sat 10:00–21:00
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="mt-4 rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 0 0 #241C3D" }}>
          <iframe
            title="LuxPlay location map - Unit 7 Sovereign Centre, Boscombe, Bournemouth BH1 4SX"
            src="https://www.google.com/maps?q=Sovereign%20Centre%2C%20Boscombe%2C%20Bournemouth%2C%20BH1%204SX&output=embed"
            className="w-full h-48"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href="https://www.google.com/maps/dir/?api=1&destination=Sovereign+Centre,+Boscombe,+Bournemouth,+BH1+4SX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 font-display text-sm font-extrabold tracking-wide text-ink bg-neon-green rounded-full px-6 py-3"
          style={{ boxShadow: "0 6px 0 0 #24B00C" }}
        >
          GET DIRECTIONS
        </a>

        {/* Site links */}
        <nav
          aria-label="LuxPlay pages"
          className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2"
        >
          {[
            { href: "/", label: "Home" },
            { href: "/soft-play-bournemouth", label: "Soft Play" },
            { href: "/arcade-bournemouth", label: "Arcade" },
            { href: "/things-to-do-in-bournemouth", label: "Things To Do" },
            { href: "/things-to-do-in-bournemouth-with-kids", label: "With Kids" },
            { href: "/parties", label: "Parties" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-xs text-foreground/60 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="mt-6 font-body text-xs text-foreground/40">
          <a href="mailto:luxplayuk@gmail.com" className="underline">luxplayuk@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
