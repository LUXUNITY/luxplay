const isWednesdayUK = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", weekday: "long" }).format(new Date()) === "Wednesday";

const WackyWednesdaySection = () => {
  const today = isWednesdayUK();
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
        @media (prefers-reduced-motion: reduce){.ww-wobble,.ww-hue,.ww-border,.ww-float,.ww-blink{animation:none}}
      `}</style>

      <div className="ww-border relative max-w-md md:max-w-3xl mx-auto rounded-3xl bg-ink px-5 py-8 md:p-12 text-center">
        <span className="ww-float absolute top-3 left-4 text-3xl" aria-hidden>🕹️</span>
        <span className="ww-float absolute top-4 right-5 text-3xl [animation-delay:.8s]" aria-hidden>🤪</span>
        <span className="ww-float absolute bottom-4 left-6 text-3xl [animation-delay:1.2s]" aria-hidden>🎟️</span>
        <span className="ww-float absolute bottom-3 right-4 text-3xl [animation-delay:.4s]" aria-hidden>⚡</span>

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
        <div className="inline-block mt-2 bg-neon-pink text-ink rounded-2xl px-6 py-3 -rotate-2 animate-price-throb">
          <p className="font-display text-6xl md:text-7xl leading-none">HALF PRICE</p>
        </div>
        <p className="font-display text-4xl md:text-5xl text-neon-green mt-4">
          Just 5 credits a game
        </p>

        <div className="mt-5 inline-flex items-center gap-2 border-2 border-neon-cyan rounded-full px-5 py-2">
          <span aria-hidden>⏰</span>
          <span className="font-display text-2xl text-foreground tracking-wide">2PM – 8PM · Wednesdays</span>
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
