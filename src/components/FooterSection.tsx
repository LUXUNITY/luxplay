import { MapPin } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <p className="font-display text-xs tracking-[0.3em] text-muted-foreground uppercase mb-2">
              Come in. Have fun. Be part of the journey.
            </p>
            <p className="flex items-center gap-2 text-sm text-neon-cyan">
              <MapPin className="w-4 h-4" />
              <span className="font-display text-xs tracking-wider uppercase font-bold">
                Sovereign Centre, Boscombe, Bournemouth BH1 4QF
              </span>
            </p>
          </div>
          <div className="text-right">
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-[0.15em] uppercase">
              {"LUXPLAY".split("").map((char, i) => {
                const colors = ["text-neon-green", "text-neon-cyan", "text-neon-blue", "text-neon-purple", "text-neon-pink", "text-neon-yellow", "text-neon-green"];
                return (
                  <span key={i} className={colors[i % colors.length]}>
                    {char}
                  </span>
                );
              })}
            </h2>
            <p className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase mt-1">
              Opening May 2026
            </p>
          </div>
        </div>
      </div>
      {/* Rainbow bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar" />
    </footer>
  );
};

export default FooterSection;
