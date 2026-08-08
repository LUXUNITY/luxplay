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
      </div>


      {/* Neon bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-neon-bar" />
    </footer>
  );
};

export default FooterSection;
