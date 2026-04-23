import wordmark from "@/assets/luxplay-wordmark.png";
import arcadeImg from "@/assets/luxplay-arcade.jpg";
import softplayImg from "@/assets/luxplay-softplay.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Animated neon circuit grid background */}
      <div className="hero-circuit-grid absolute inset-0" />
      <div className="hero-circuit-overlay absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--neon-purple)/0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_90%,hsl(var(--neon-pink)/0.16),transparent_55%)]" />

      {/* Top neon bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-between px-4 pb-5 pt-6 text-center sm:max-w-[760px] md:max-w-[1100px] md:pt-8">
        {/* LUXPLAY wordmark */}
        <div className="animate-fade-in flex w-full flex-col items-center">
          <img
            src={wordmark}
            alt="LuxPlay — arcade, soft play, café and prizes"
            className="h-auto w-[88%] max-w-[640px] drop-shadow-[0_0_24px_hsl(var(--neon-cyan)/0.45)]"
            loading="eager"
          />
          <div className="mt-2 flex items-center justify-center gap-2 font-display text-[0.75rem] tracking-[0.22em] text-foreground/85 sm:text-[0.9rem]">
            <span>ARCADE</span>
            <span className="h-1 w-1 rounded-full bg-neon-green" />
            <span>SOFT PLAY</span>
            <span className="h-1 w-1 rounded-full bg-neon-cyan" />
            <span>CAFÉ</span>
            <span className="h-1 w-1 rounded-full bg-neon-pink" />
            <span>PRIZES</span>
          </div>
        </div>

        {/* WE'RE OPENING — huge, flashing, centered */}
        <div className="my-3 flex w-full flex-col items-center sm:my-4">
          <h1 className="hero-flash font-display text-[3.4rem] leading-[0.9] tracking-[0.01em] sm:text-[5rem] md:text-[7rem]">
            WE'RE OPENING!
          </h1>
          <div className="mt-2 hero-mini-label inline-flex items-center gap-2 rounded-sm border border-white/15 px-3 py-1 font-display text-[0.7rem] tracking-[0.2em] text-foreground/90 sm:text-[0.85rem]">
            <span>NEW CENTRE</span>
            <span className="text-neon-green">•</span>
            <span>NEW FUN</span>
            <span className="text-neon-pink">•</span>
            <span>NEW MEMORIES</span>
          </div>
        </div>

        {/* Arcade + Soft Play image grid */}
        <div className="grid w-full grid-cols-2 gap-2.5 sm:gap-3">
          <a
            href="#presale"
            className="hero-tile group relative block overflow-hidden rounded-sm border border-neon-pink/55 transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src={arcadeImg}
              alt="Arcade machines and prize claw at LuxPlay"
              className="h-32 w-full object-cover sm:h-44 md:h-56"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2 text-left">
              <span className="block font-display text-[1rem] leading-none text-neon-pink glow-pink sm:text-[1.4rem]">
                ARCADE
              </span>
              <span className="mt-1 block font-display text-[0.7rem] tracking-[0.16em] text-foreground/90 sm:text-[0.85rem]">
                WIN BIG PRIZES
              </span>
            </div>
          </a>

          <a
            href="#softplay"
            className="hero-tile group relative block overflow-hidden rounded-sm border border-neon-green/55 transition-transform duration-200 hover:scale-[1.02]"
          >
            <img
              src={softplayImg}
              alt="Neon soft play frame and ball pit at LuxPlay"
              className="h-32 w-full object-cover sm:h-44 md:h-56"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2 text-left">
              <span className="block font-display text-[1rem] leading-none text-neon-green glow-green sm:text-[1.4rem]">
                SOFT PLAY
              </span>
              <span className="mt-1 block font-display text-[0.7rem] tracking-[0.16em] text-foreground/90 sm:text-[0.85rem]">
                BALL PIT • SLIDES
              </span>
            </div>
          </a>
        </div>

        {/* Compact promo + CTAs */}
        <div className="mt-3 w-full sm:mt-4">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="#softplay"
              className="rounded-sm border border-neon-green/60 bg-background/75 px-2 py-2 text-center backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="block font-display text-[1.1rem] leading-none text-neon-green glow-green sm:text-[1.35rem]">
                50% OFF
              </span>
              <span className="mt-1 block font-display text-[0.75rem] leading-none tracking-[0.12em] text-foreground sm:text-[0.9rem]">
                SOFT PLAY
              </span>
            </a>
            <a
              href="#presale"
              className="rounded-sm border border-neon-pink/60 bg-background/75 px-2 py-2 text-center backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            >
              <span className="block font-display text-[0.95rem] leading-none text-neon-pink glow-pink sm:text-[1.1rem]">
                DISCOUNTED
              </span>
              <span className="mt-1 block font-display text-[0.75rem] leading-none tracking-[0.12em] text-foreground sm:text-[0.9rem]">
                ARCADE CREDITS
              </span>
            </a>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <a
              href="#softplay"
              className="rounded-sm border border-neon-green/70 bg-background/85 px-2 py-2.5 font-display text-[0.95rem] tracking-[0.12em] text-neon-green shadow-[0_0_20px_hsl(var(--neon-green)/0.35)] transition-transform duration-200 hover:scale-[1.02] sm:text-[1.05rem]"
            >
              BOOK SOFT PLAY
            </a>
            <a
              href="#presale"
              className="rounded-sm border border-neon-pink/70 bg-background/85 px-2 py-2.5 font-display text-[0.95rem] tracking-[0.12em] text-neon-pink shadow-[0_0_20px_hsl(var(--neon-pink)/0.35)] transition-transform duration-200 hover:scale-[1.02] sm:text-[1.05rem]"
            >
              BUY CREDITS
            </a>
          </div>

          <p className="mt-2 font-display text-[0.75rem] tracking-[0.18em] text-foreground/75 sm:text-[0.85rem]">
            <span className="text-neon-green">●</span> LIMITED SPACES — <span className="text-neon-green">SELLING FAST!</span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
