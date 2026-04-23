import { MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative bg-[#070710] py-16 md:py-24">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-neon-bar" />

      <div className="px-6 md:px-12 lg:px-20 text-center">
        {/* LUXPLAY in neon gradient */}
        <h2 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-wider text-gradient-neon mb-4">
          LUXPLAY
        </h2>

        <p className="font-display text-xl md:text-2xl tracking-widest text-white/50 mb-6">
          OPENING MAY 2026
        </p>

        <p className="flex items-center justify-center gap-2 text-white/40 font-body text-sm">
          <MapPin className="w-4 h-4 text-neon-cyan" />
          Sovereign Centre, Boscombe, Bournemouth
        </p>
      </div>

      {/* Neon bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-neon-bar" />
    </footer>
  );
};

export default FooterSection;
