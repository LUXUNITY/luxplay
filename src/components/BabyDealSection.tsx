const BabyDealSection = () => {
  return (
    <section id="baby-deal" className="relative w-full py-10 md:py-16 px-4 overflow-hidden">
      <div className="max-w-3xl mx-auto relative border-2 md:border-4 border-neon-purple bg-[#12061f]/85 px-4 py-6 md:px-8 md:py-8 overflow-hidden">
        <div className="absolute inset-0 frost-shimmer opacity-20 pointer-events-none" />
        <div className="relative text-center">
          <p className="font-display text-[11px] md:text-sm tracking-[0.3em] text-[#e9c8ff]">
            ❄ BABY SOFT PLAY DEAL (0–3 YRS) ❄
          </p>
          <p
            className="font-display text-5xl sm:text-6xl md:text-8xl text-neon-purple leading-none mt-1 animate-big-throb"
            style={{ textShadow: "0 0 22px rgba(178,102,255,0.9)" }}
          >
            £5.99
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-display text-base sm:text-xl md:text-3xl text-[#f0dcff] tracking-wide">
            <span className="animate-icon-bob text-2xl md:text-4xl">🧸</span>
            <span>2 HOURS BABY SOFT PLAY</span>
            <span className="text-neon-pink">+</span>
            <span>ICE-COLD DRINK</span>
            <span className="text-neon-pink">+</span>
            <span>ICE POP</span>
            <span className="animate-icon-bob text-2xl md:text-4xl" style={{ animationDelay: "0.5s" }}>🥤</span>
          </div>
          <div className="mt-4 flex justify-center">
            <span className="inline-flex items-center gap-2 border-2 border-neon-green bg-neon-green/15 text-neon-green font-display text-[11px] sm:text-sm md:text-base tracking-[0.25em] uppercase px-3 py-1.5 md:px-4 md:py-2 animate-big-throb">
              👨‍👩‍👧 ADULTS GO FREE 👩‍👦
            </span>
          </div>
          <a
            href="#baby-softplay"
            className="mt-5 inline-block font-display text-sm md:text-lg tracking-widest px-6 md:px-10 py-3 md:py-4 bg-neon-purple text-[#070710] hover:scale-105 transition-transform"
          >
            BOOK BABY SOFT PLAY
          </a>
        </div>
      </div>
    </section>
  );
};

export default BabyDealSection;
