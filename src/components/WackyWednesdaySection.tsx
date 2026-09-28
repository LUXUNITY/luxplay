const isWednesdayUK = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long" }).format(new Date()) === "Wednesday";

import { useEffect, useState } from "react";

// Countdown to next Wednesday 2PM (or to 8PM if the deal is live)
const getCountdown = () => {
  const now = new Date();
  const uk = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
  const target = new Date(uk);
  const day = uk.getDay();
  const h = uk.getHours();
  let live = false;
  if (day === 3 && h >= 14 && h < 20) { live = true; target.setHours(20, 0, 0, 0); }
  else {
    let add = (3 - day + 7) % 7;
    if (add === 0 && h >= 20) add = 7;
    target.setDate(uk.getDate() + add); target.setHours(14, 0, 0, 0);
  }
  const ms = Math.max(0, target.getTime() - uk.getTime());
  return { live, d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
};

const TICKER = "🤪 WACKY WEDNESDAY ★ HALF PRICE ARCADE ★ 5 CREDITS A GAME ★ 2PM–8PM ★ ";

const WackyWednesdaySection = () => {
  const today = isWednesdayUK();
  const [cd, setCd] = useState(getCountdown);
  useEffect(() => { const t = setInterval(() => setCd(getCountdown()), 1000); return () => clearInterval(t); }, []);
  return (
    <section id="wacky-wednesday" className="relative bg-background py-10 md:py-16 px-4 overflow-hidden">
      <style>{`
        @keyframes ww-wobble { 0%,100%{transform:rotate(-3deg) scale(1)} 50%{transform:rotate(3deg) scale(1.06)} }
        @keyframes ww-hue { 0%{color:#FF10F0} 33%{color:#00E5FF} 66%{color:#39FF14} 100%{color:#FF10F0} }
        @keyframes ww-border { 0%,100%{box-shadow:0 0 0 4px #FF10F0,0 0 36px #FF10F0} 33%{box-shadow:0 0 0 4px #00E5FF,0 0 36px #00E5FF} 66%{box-shadow:0 0 0 4px #39FF14,0 0 36px #39FF14} }
        @keyframes ww-float { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-12px) rotate(12deg)} }
        @keyframes ww-blink { 0%,49%{opacity:1} 50%,100%{opacity:.35} }
        .ww-wobble{animation:ww-wobble 1.6s ease-in-out infinite}
        .ww-hue{animation:ww-hue 3s linear infinite}
        .ww-border{animation:ww-border 3s linear infinite}
        .ww-float{animation:ww-float 2.4s ease-in-out infinite}
        .ww-blink{animation:ww-blink 1s steps(1) infinite}
        @keyframes ww-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ww-spin { to{transform:rotate(360deg)} }
        @keyframes ww-shake { 0%,90%,100%{transform:rotate(-2deg)} 92%{transform:rotate(-6deg) scale(1.08)} 94%{transform:rotate(3deg) scale(1.08)} 96%{transform:rotate(-5deg)} 98%{transform:rotate(2deg)} }
        @keyframes ww-pop { 0%,100%{transform:scale(0);opacity:0} 50%{transform:scale(1);opacity:1} }
        .ww-marquee{animation:ww-marquee 14s linear infinite}
        .ww-spin{animation:ww-spin 12s linear infinite}
        .ww-shake{animation:ww-shake 2.5s ease-in-out infinite}
        .ww-pop{animation:ww-pop 1.8s ease-in-out infinite}
        .ww-burst{background:repeating-conic-gradient(#FF10F0 0 10deg,transparent 10deg 20deg,#00E5FF 20deg 30deg,transparent 30deg 40deg,#39FF14 40deg 50deg,transparent 50deg 60deg);mask:radial-gradient(circle,#000 30%,transparent 70%);-webkit-mask:radial-gradient(circle,#000 30%,transparent 70%)}
        @media (prefers-reduced-motion: reduce){.ww-wobble,.ww-hue,.ww-border,.ww-float,.ww-blink,.ww-marquee,.ww-spin,.ww-shake,.ww-pop{animation:none}}
      `}</style>

      <div className="-mx-4 mb-8 bg-neon-pink -rotate-1 overflow-hidden py-2">
        <div className="ww-marquee flex whitespace-nowrap w-max font-display text-2xl text-ink tracking-wide">
          <span>{TICKER.repeat(4)}</span><span>{TICKER.repeat(4)}</span>
        </div>
      </div>

      <div className="ww-border relative max-w-md md:max-w-3xl mx-auto rounded-3xl bg-ink px-5 py-8 md:p-12 text-center">
        <span className="ww-float absolute top-3 left-4 text-3xl" aria-hidden>🕹️</span>
        <span className="ww-float absolute top-4 right-5 text-3xl [animation-delay:.8s]" aria-hidden>🤪</span>
        <span className="ww-float absolute bottom-4 left-6 text-3xl [animation-delay:1.2s]" aria-hidden>🎟️</span>
        <span className="ww-float absolute bottom-3 right-4 text-3xl [animation-delay:.4s]" aria-hidden>⚡</span>

        {[["12%","30%","0s"],["85%","25%",".6s"],["8%","65%","1.1s"],["90%","60%",".3s"],["50%","4%",".9s"],["30%","90%","1.4s"],["70%","92%",".2s"]].map(([l,t,d],i)=>(
          <span key={i} className="ww-pop absolute text-xl pointer-events-none" style={{left:l,top:t,animationDelay:d}} aria-hidden>✨</span>
        ))}

        <span className={`inline-block bg-neon-green text-ink font-display text-sm tracking-wide uppercase px-5 py-1.5 rounded-full ${today ? "ww-blink" : ""}`}>
          {today ? "🔴 On now · today only" : "Every Wednesday"}
        </span>

        <h2 className="ww-wobble font-display leading-[0.85] mt-5 text-6xl md:text-8xl">
          <span className="ww-hue block">WACKY</span>
          <span className="block text-neon-cyan">WEDNESDAY</span>
        </h2>

        <p className="font-display text-2xl md:text-3xl text-foreground mt-5 tracking-wide">
          Every arcade machine is
        </p>
        <div className="relative inline-block mt-4">
          <div className="ww-burst ww-spin absolute -inset-16 md:-inset-24 opacity-60 pointer-events-none" aria-hidden />
          <div className="ww-shake relative bg-neon-pink text-ink rounded-2xl px-6 py-3">
            <p className="font-display text-6xl md:text-8xl leading-none">HALF PRICE</p>
            <p className="font-display text-xl tracking-widest">ALL MACHINES · 50% OFF</p>
          </div>
        </div>
        <p className="font-display text-4xl md:text-5xl text-neon-green mt-4">
          Just 5 credits a game
        </p>

        <div className="mt-5 inline-flex items-center gap-2 border-2 border-neon-cyan rounded-full px-5 py-2">
          <span aria-hidden>⏰</span>
          <span className="font-display text-2xl text-foreground tracking-wide">2PM – 8PM · Wednesdays</span>
        </div>

        <div className="mt-6">
          <p className={`font-display text-xl tracking-widest ${cd.live ? "text-neon-green ww-blink" : "text-neon-cyan"}`}>
            {cd.live ? "🔥 LIVE NOW — ENDS IN" : "NEXT WACKY WEDNESDAY IN"}
          </p>
          <div className="flex justify-center gap-2 mt-2">
            {([["d","DAYS"],["h","HRS"],["m","MIN"],["s","SEC"]] as const).map(([k,l])=>(
              <div key={k} className="bg-neon-purple text-ink rounded-xl w-16 md:w-20 py-2">
                <p className="font-display text-4xl leading-none tabular-nums">{String(cd[k]).padStart(2,"0")}</p>
                <p className="font-display text-xs tracking-widest">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="font-body text-foreground/75 text-sm md:text-base mt-5 max-w-sm mx-auto">
          Twice the games, twice the tickets, twice the fun. Round up the gang and come play more for less at LuxPlay!
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#presale" className="bg-neon-cyan text-ink font-display text-2xl tracking-wide px-8 py-3 rounded-full hover:scale-105 transition-transform">
            🕹️ Grab credits
          </a>
          <a href="#softplay" className="bg-neon-green text-ink font-display text-2xl tracking-wide px-8 py-3 rounded-full hover:scale-105 transition-transform">
            🛝 Make a day of it
          </a>
        </div>
      </div>
    </section>
  );
};

export default WackyWednesdaySection;
