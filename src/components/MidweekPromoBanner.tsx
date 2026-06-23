import { useEffect, useState } from "react";
import { Zap, Clock } from "lucide-react";

/**
 * MIDWEEK MADNESS — HUGE top-of-page hype banner.
 * 20% off soft play + arcade credits on Wednesdays & Thursdays
 * (online & in store). Urgency-driven, neon, animated, full-width.
 *
 * Countdown targets next Thursday 23:59 local time so the
 * "Ends Thursday Midnight" line is always live.
 */

const getNextThursdayMidnight = (): Date => {
  const now = new Date();
  const day = now.getDay(); // 0=Sun..6=Sat
  // Days until Thursday midnight (end of Thursday = Fri 00:00)
  // If we're already past Thu midnight, roll to next week's Thu.
  let daysUntilFri = (5 - day + 7) % 7; // Fri index = 5
  if (daysUntilFri === 0 && now.getHours() >= 0) {
    // We're on Friday already — push to next Thursday
    daysUntilFri = 7;
  }
  const target = new Date(now);
  target.setDate(now.getDate() + daysUntilFri);
  target.setHours(0, 0, 0, 0); // start of Friday = end of Thursday
  return target;
};

const MidweekPromoBanner = () => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      const target = getNextThursdayMidnight();
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <a
      href="#presale"
      aria-label="Midweek Madness — 20% off soft play and arcade credits every Wednesday and Thursday, ends Thursday midnight"
      className="relative block w-full overflow-hidden border-y-4 border-neon-pink bg-[#0a0014] focus:outline-none group"
      style={{ boxShadow: "0 0 60px rgba(255,0,204,0.6), inset 0 0 40px rgba(0,238,255,0.15)" }}
    >
      {/* Animated rainbow gradient sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,204,0.0) 0%, rgba(255,0,204,0.45) 20%, rgba(0,238,255,0.45) 50%, rgba(170,255,0,0.45) 80%, rgba(255,0,204,0.0) 100%)",
          backgroundSize: "200% 100%",
          animation: "midweekSweep 3s linear infinite",
        }}
      />

      {/* Diagonal scanline pattern for arcade vibe */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 8px, rgba(255,255,255,0.06) 8px 9px)",
        }}
      />

      {/* HEADLINE */}
      <div className="relative z-10 px-3 pt-4 pb-1 md:pt-6 md:pb-2 flex items-center justify-center gap-2 md:gap-4 text-center">
        <Zap
          className="w-7 h-7 md:w-12 md:h-12 text-neon-yellow shrink-0 drop-shadow-[0_0_10px_rgba(255,235,0,0.9)]"
          style={{ animation: "midweekFlash 0.6s ease-in-out infinite" }}
        />
        <span
          className="font-display tracking-[0.08em] md:tracking-[0.12em] text-[2.6rem] sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-neon-pink"
          style={{
            textShadow:
              "0 0 18px rgba(255,0,204,1), 0 0 40px rgba(255,0,204,0.7), 0 0 70px rgba(255,0,204,0.4)",
            animation: "midweekFlash 1.1s ease-in-out infinite",
          }}
        >
          MIDWEEK MADNESS
        </span>
        <Zap
          className="w-7 h-7 md:w-12 md:h-12 text-neon-yellow shrink-0 drop-shadow-[0_0_10px_rgba(255,235,0,0.9)]"
          style={{ animation: "midweekFlash 0.6s ease-in-out infinite" }}
        />
      </div>

      {/* GIANT 20% OFF — the hero number */}
      <div className="relative z-10 px-3 pb-2 md:pb-3 text-center">
        <div className="inline-flex items-end justify-center gap-2 md:gap-4">
          <span
            className="font-display leading-none text-neon-yellow text-[4.5rem] sm:text-[6rem] md:text-[9rem] lg:text-[11rem] tracking-tighter"
            style={{
              textShadow:
                "0 0 25px rgba(255,235,0,1), 0 0 55px rgba(255,235,0,0.8), 0 0 90px rgba(255,235,0,0.5)",
              animation: "midweekPulse 1.6s ease-in-out infinite",
            }}
          >
            20%
          </span>
          <span
            className="font-display leading-none text-neon-green text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-2 md:mb-4 tracking-wider"
            style={{
              textShadow:
                "0 0 18px rgba(170,255,0,1), 0 0 40px rgba(170,255,0,0.6)",
              animation: "midweekPulse 1.6s ease-in-out infinite 0.1s",
            }}
          >
            OFF
          </span>
        </div>
        <p className="font-display text-neon-cyan text-base sm:text-xl md:text-3xl tracking-[0.2em] mt-1 md:mt-2 uppercase"
           style={{ textShadow: "0 0 12px rgba(0,238,255,0.9)" }}>
          Arcade Credits + Soft Play
        </p>
      </div>

      {/* COUNTDOWN + CTA strip */}
      <div className="relative z-10 px-3 pb-4 md:pb-5 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-center">
        <div className="inline-flex items-center gap-2 border-2 border-neon-yellow bg-[#070710]/70 px-3 py-1.5 md:px-4 md:py-2">
          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-neon-yellow shrink-0" />
          <span className="font-display text-neon-yellow text-[10px] sm:text-xs md:text-sm tracking-[0.18em] uppercase">
            Ends Thursday Midnight
            {timeLeft && (
              <span className="ml-2 text-white/95 tabular-nums">
                {timeLeft.d > 0 && `${timeLeft.d}d `}
                {String(timeLeft.h).padStart(2, "0")}:
                {String(timeLeft.m).padStart(2, "0")}:
                {String(timeLeft.s).padStart(2, "0")}
              </span>
            )}
          </span>
        </div>

        <span className="font-display text-white/90 text-[10px] sm:text-xs md:text-sm tracking-[0.18em] uppercase">
          <span className="text-neon-green font-bold">Online &amp; In Store</span>
          <span className="text-white/30 mx-2">•</span>
          Wed &amp; Thu Only
        </span>

        <span className="inline-flex items-center gap-1.5 bg-neon-pink text-[#070710] font-display text-[11px] sm:text-xs md:text-sm tracking-[0.2em] uppercase px-3 py-1.5 md:px-4 md:py-2 group-hover:scale-105 transition-transform"
              style={{ boxShadow: "0 0 25px rgba(255,0,204,0.7)" }}>
          GRAB IT NOW →
        </span>
      </div>

      <style>{`
        @keyframes midweekSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes midweekFlash {
          0%, 100% { opacity: 1; filter: brightness(1.15); }
          50% { opacity: 0.7; filter: brightness(1.6); }
        }
        @keyframes midweekPulse {
          0%, 100% { transform: scale(1); filter: brightness(1.1); }
          50% { transform: scale(1.06); filter: brightness(1.4); }
        }
      `}</style>
    </a>
  );
};

export default MidweekPromoBanner;
