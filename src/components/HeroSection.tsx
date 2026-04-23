import poster from "@/assets/luxplay-hero-poster.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Poster fills the entire hero */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden
      />
      {/* Subtle dark vignette so overlays read */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_55%,hsl(240_40%_3%/0.7)_100%)]" />

      {/* Animated laser / circuit grid layers */}
      <div className="hero-laser-grid absolute inset-0" aria-hidden />
      <div className="hero-laser-lines absolute inset-0" aria-hidden />
      <div className="hero-laser-scan absolute inset-0" aria-hidden />

      {/* Rainbow sheen sweep */}
      <div className="hero-poster-sheen pointer-events-none absolute inset-0" aria-hidden />

      {/* Top + bottom neon bars */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1.5 bg-gradient-neon-bar" />
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />

      {/* Foreground content */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-between px-4 pb-5 pt-6 text-center sm:max-w-[820px] md:max-w-[1100px] md:pt-10">
        {/* Top: flashing rainbow WE'RE OPENING — overlays the poster headline area */}
        <div className="flex w-full flex-col items-center">
          <h1 className="font-display leading-[0.82] tracking-[0.005em] flex flex-col items-center">
            <span className="hero-flash text-[4.6rem] sm:text-[8rem] md:text-[11rem]">WE'RE</span>
            <span
              className="hero-flash text-[5.2rem] sm:text-[9.5rem] md:text-[13rem]"
              style={{ animationDelay: "0.2s" }}
            >
              OPENING!
            </span>
          </h1>
          <div className="mt-2 hero-mini-label inline-flex items-center gap-2 rounded-sm border border-white/25 px-3 py-1 font-display text-[0.72rem] tracking-[0.2em] text-foreground sm:text-[0.9rem]">
            <span>NEW CENTRE</span>
            <span className="text-neon-pink">•</span>
            <span className="text-neon-pink">NEW FUN</span>
            <span className="text-neon-pink">•</span>
            <span>NEW MEMORIES</span>
          </div>
        </div>

        {/* Spacer pushing CTAs to the bottom of the poster */}
        <div className="flex-1" />

        {/* Two distinct CTAs */}
        <div className="w-full">
          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
            <a
              href="#softplay"
              aria-label="Book soft play"
              className="hero-cta hero-cta-green flex items-center justify-center rounded-md px-4 py-3.5 font-display text-[1.15rem] tracking-[0.12em] sm:text-[1.4rem]"
            >
              BOOK SOFT PLAY
            </a>
            <a
              href="#presale"
              aria-label="Buy arcade credits"
              className="hero-cta hero-cta-pink flex items-center justify-center rounded-md px-4 py-3.5 font-display text-[1.15rem] tracking-[0.12em] sm:text-[1.4rem]"
            >
              BUY CREDITS
            </a>
          </div>
          <p className="mt-2 font-display text-[0.72rem] tracking-[0.18em] text-foreground sm:text-[0.85rem]">
            <span className="text-neon-green">●</span> LIMITED SPACES —{" "}
            <span className="text-neon-green">SELLING FAST!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
