import { Zap } from "lucide-react";

/**
 * MIDWEEK MADNESS — top-of-page hype banner.
 * 20% off soft play + arcade credits on Wednesdays & Thursdays
 * (online & in store). Designed to be impossible to miss but still
 * on-brand: neon, animated, full-width, no rounded SaaS card.
 */
const MidweekPromoBanner = () => {
  return (
    <a
      href="#softplay"
      aria-label="Midweek Madness — 20% off soft play and arcade credits every Wednesday and Thursday"
      className="relative block w-full overflow-hidden border-y-2 border-neon-pink bg-[#0a0014] focus:outline-none"
      style={{ boxShadow: "0 0 30px rgba(255,0,204,0.45)" }}
    >
      {/* Animated gradient sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,204,0.0) 0%, rgba(255,0,204,0.35) 25%, rgba(0,238,255,0.35) 50%, rgba(170,255,0,0.35) 75%, rgba(255,0,204,0.0) 100%)",
          backgroundSize: "200% 100%",
          animation: "midweekSweep 4s linear infinite",
        }}
      />

      <div className="relative z-10 px-3 py-3 md:py-4 flex items-center justify-center gap-3 md:gap-5 text-center">
        <Zap
          className="w-5 h-5 md:w-7 md:h-7 text-neon-yellow shrink-0"
          style={{ animation: "midweekFlash 0.8s ease-in-out infinite" }}
        />

        <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
          <span
            className="font-display tracking-[0.18em] text-2xl md:text-4xl lg:text-5xl leading-none text-neon-pink"
            style={{
              textShadow:
                "0 0 12px rgba(255,0,204,0.95), 0 0 28px rgba(255,0,204,0.6)",
              animation: "midweekFlash 1.2s ease-in-out infinite",
            }}
          >
            MIDWEEK MADNESS
          </span>
          <span
            className="font-display tracking-[0.25em] text-xl md:text-3xl lg:text-4xl leading-none text-neon-yellow"
            style={{
              textShadow:
                "0 0 12px rgba(255,235,0,0.9), 0 0 24px rgba(255,235,0,0.5)",
            }}
          >
            20% OFF
          </span>
        </div>

        <Zap
          className="w-5 h-5 md:w-7 md:h-7 text-neon-yellow shrink-0"
          style={{ animation: "midweekFlash 0.8s ease-in-out infinite" }}
        />
      </div>

      <div className="relative z-10 px-3 pb-3 md:pb-4 text-center">
        <p className="font-body text-white/90 text-[11px] md:text-sm tracking-wide uppercase">
          <span className="text-neon-cyan font-semibold">Every Wed &amp; Thu</span>
          <span className="text-white/40 mx-2">•</span>
          Soft Play + Arcade Credits
          <span className="text-white/40 mx-2">•</span>
          <span className="text-neon-green font-semibold">Online &amp; In Store</span>
        </p>
      </div>

      <style>{`
        @keyframes midweekSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes midweekFlash {
          0%, 100% { opacity: 1; filter: brightness(1.1); }
          50% { opacity: 0.65; filter: brightness(1.5); }
        }
      `}</style>
    </a>
  );
};

export default MidweekPromoBanner;
