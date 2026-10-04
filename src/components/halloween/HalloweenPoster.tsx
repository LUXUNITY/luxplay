import { useEffect, useState } from "react";
import { HALLOWEEN_START, HALLOWEEN_CAPACITY } from "./halloweenEvent";

const TICKER = "🎃 HALLOWEEN SPOOKTACULAR ★ 30TH & 31ST OCT ★ 4PM–9PM ★ FREE PLAY ARCADE ★ SPOOKY SOFT PLAY ★ £19.99 ★ ONLY 100 TICKETS A NIGHT ★ ";

const getCountdown = () => {
  const ms = Math.max(0, HALLOWEEN_START.getTime() - Date.now());
  return { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
};

const PERKS = [
  { e: "🕹️", t: "UNLIMITED FREE PLAY", sub: "on the arcade machines" },
  { e: "👻", t: "SPOOKY SOFT PLAY", sub: "open right through till close" },
  { e: "🎃", t: "PUMPKIN PAINTING", sub: "+ more creepy fun" },
  { e: "🏆", t: "BEST DRESSED PRIZE", sub: "win big for the scariest costume" },
];

const HalloweenPoster = () => {
  const [cd, setCd] = useState(getCountdown);
  useEffect(() => {
    const t = setInterval(() => setCd(getCountdown()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="px-4 mb-8">
      <div className="relative overflow-hidden rounded-3xl border-2 border-neon-pink bg-card animate-spooky-glow">
        {/* Ticker */}
        <div className="overflow-hidden bg-neon-pink py-1.5">
          <div className="flex w-max animate-spooky-ticker whitespace-nowrap font-display text-sm tracking-widest text-ink">
            <span>{TICKER.repeat(3)}</span>
            <span>{TICKER.repeat(3)}</span>
          </div>
        </div>

        <div className="relative px-5 pt-6 pb-6 text-center">
          <span className="absolute left-3 top-3 text-3xl animate-spooky-float">🦇</span>
          <span className="absolute right-3 top-4 text-3xl animate-spooky-float" style={{ animationDelay: "1.2s" }}>👻</span>

          <p className="font-display text-sm tracking-[0.3em] text-neon-green animate-spooky-flicker">ONE-OFF EVENT · 2 NIGHTS ONLY</p>
          <h2 className="mt-1 font-display text-6xl leading-[0.85] text-neon-pink" style={{ textShadow: "0 0 24px rgba(255,122,26,0.7)" }}>
            HALLOWEEN<br />SPOOKTACULAR
          </h2>
          <p className="mt-3 font-display text-2xl text-foreground">FRI 30TH &amp; SAT 31ST OCTOBER</p>
          <p className="font-display text-xl text-neon-cyan">4PM – 9PM</p>

          <div className="mt-5 space-y-3 text-left">
            {PERKS.map((p, i) => (
              <div
                key={p.t}
                className="flex items-center gap-4 rounded-2xl bg-muted p-4 animate-spooky-glow"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <span className="text-5xl leading-none animate-spooky-float" style={{ animationDelay: `${i * 0.6}s` }}>{p.e}</span>
                <div>
                  <p className="font-display text-3xl leading-[0.9] text-neon-green">{p.t}</p>
                  <p className="font-body text-sm text-foreground/80">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border-2 border-dashed border-neon-green px-3 py-4 animate-spooky-flicker">
            <p className="font-display text-3xl leading-none text-neon-green">🧟 FANCY DRESS IS A MUST! 🧛</p>
            <p className="mt-1 font-body text-sm text-foreground/80">No costume, no entry. Dress up, scare us silly, win the prize!</p>
          </div>

          <p className="mt-4 font-body text-sm text-foreground/70">
            All this for just <span className="font-display text-xl text-neon-pink">£19.99</span> per ticket
          </p>

          {/* Countdown */}
          <p className="mt-5 font-display text-xs tracking-[0.3em] text-muted-foreground">DOORS OPEN IN</p>
          <div className="mt-1 flex justify-center gap-2">
            {[["DAYS", cd.d], ["HRS", cd.h], ["MIN", cd.m], ["SEC", cd.s]].map(([l, v]) => (
              <div key={l as string} className="w-16 rounded-xl bg-background py-2">
                <p className="font-display text-3xl leading-none text-neon-pink">{String(v).padStart(2, "0")}</p>
                <p className="font-body text-[9px] font-bold text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>

          <a
            href="#halloween"
            className="mt-6 block rounded-2xl bg-neon-pink py-4 font-display text-2xl text-ink animate-spooky-pulse-btn"
            style={{ boxShadow: "0 6px 0 0 #B34A00" }}
          >
            🎃 GRAB YOUR TICKETS 🎃
          </a>
          <p className="mt-2 font-body text-xs font-bold text-neon-cyan animate-spooky-flicker">
            ⚠️ ONLY {HALLOWEEN_CAPACITY} TICKETS PER NIGHT — WHEN THEY'RE GONE, THEY'RE GONE!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HalloweenPoster;
