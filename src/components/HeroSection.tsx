import wordmark from "@/assets/luxplay-wordmark.png";
import arcadeImg from "@/assets/luxplay-arcade.jpg";
import softplayImg from "@/assets/luxplay-softplay.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Animated neon circuit grid background */}
      <div className="hero-circuit-grid absolute inset-0" />
      <div className="hero-circuit-overlay absolute inset-0 opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,hsl(var(--neon-purple)/0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,hsl(var(--neon-cyan)/0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,hsl(var(--neon-pink)/0.4),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,hsl(var(--neon-green)/0.18),transparent_45%)]" />

      {/* Top neon bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-between px-3 pb-4 pt-5 text-center sm:max-w-[820px] md:max-w-[1180px] md:pt-7">
        {/* LUXPLAY wordmark + subtitle */}
        <div className="animate-fade-in flex w-full flex-col items-center">
          <img
            src={wordmark}
            alt="LuxPlay — arcade, soft play, café and prizes"
            className="h-auto w-[70%] max-w-[520px] drop-shadow-[0_0_24px_hsl(var(--neon-cyan)/0.55)]"
            loading="eager"
          />
          <div className="mt-1.5 flex items-center justify-center gap-2 font-display text-[0.78rem] tracking-[0.22em] text-foreground sm:text-[0.95rem]">
            <span>ARCADE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon-pink shadow-[0_0_8px_hsl(var(--neon-pink))]" />
            <span>SOFT PLAY</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_hsl(var(--neon-cyan))]" />
            <span>CAFÉ</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-[0_0_8px_hsl(var(--neon-green))]" />
            <span>PRIZES</span>
          </div>
        </div>

        {/* WE'RE / OPENING — stacked, massive, flashing rainbow */}
        <div className="mt-2 flex w-full flex-col items-center">
          <h1 className="font-display leading-[0.82] tracking-[0.005em] flex flex-col items-center">
            <span className="hero-flash text-[5.5rem] sm:text-[9rem] md:text-[13rem]">
              WE'RE
            </span>
            <span className="hero-flash text-[6.2rem] sm:text-[10.5rem] md:text-[15rem]" style={{ animationDelay: "0.2s" }}>
              OPENING!
            </span>
          </h1>
          <div className="mt-2 hero-mini-label inline-flex items-center gap-2 rounded-sm border border-white/20 px-3 py-1 font-display text-[0.72rem] tracking-[0.2em] text-foreground sm:text-[0.9rem]">
            <span>NEW CENTRE</span>
            <span className="text-neon-pink">•</span>
            <span className="text-neon-pink">NEW FUN</span>
            <span className="text-neon-pink">•</span>
            <span>NEW MEMORIES</span>
          </div>
        </div>

        {/* 3-column band: arcade image | promo panel | soft play image */}
        <div className="mt-3 grid w-full grid-cols-[1fr_1.15fr_1fr] gap-2 sm:gap-3">
          <a
            href="#presale"
            className="hero-tile group relative block overflow-hidden rounded-sm border-2 border-neon-pink/70 transition-transform duration-200 hover:scale-[1.03]"
            aria-label="Arcade — buy discounted credits"
          >
            <img
              src={arcadeImg}
              alt="Arcade machines and prize claw at LuxPlay"
              className="h-48 w-full object-cover sm:h-72 md:h-[22rem]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            <div className="absolute left-1.5 top-1.5 rounded-sm border border-neon-pink/80 bg-background/80 px-1.5 py-0.5 font-display text-[0.65rem] tracking-[0.18em] text-neon-pink glow-pink sm:text-[0.8rem]">
              ARCADE
            </div>
          </a>

          {/* Promo panel — neon hexagon-ish offer card */}
          <div className="hero-promo-panel relative flex flex-col items-center justify-center rounded-sm border-2 border-neon-cyan/70 bg-background/70 px-2 py-3 backdrop-blur-md sm:py-5">
            <div className="font-display leading-[0.85]">
              <span className="hero-flash text-[2.2rem] sm:text-[3.4rem] md:text-[4.5rem]">50%</span>
              <span className="ml-1 align-top font-display text-[0.85rem] text-neon-cyan glow-cyan sm:text-[1.1rem]">OFF</span>
            </div>
            <div className="mt-0.5 font-display text-[0.95rem] tracking-[0.1em] text-foreground sm:text-[1.25rem]">
              SOFT PLAY
            </div>
            <div className="my-1.5 font-display text-[1rem] text-neon-green glow-green sm:text-[1.3rem]">+</div>
            <div className="font-display text-[0.7rem] tracking-[0.18em] text-neon-green glow-green sm:text-[0.9rem]">
              DISCOUNTED
            </div>
            <div className="hero-flash font-display text-[1.1rem] leading-none sm:text-[1.6rem] md:text-[1.9rem]">
              ARCADE
            </div>
            <div className="hero-flash font-display text-[1.1rem] leading-none sm:text-[1.6rem] md:text-[1.9rem]">
              CREDITS
            </div>
          </div>

          <a
            href="#softplay"
            className="hero-tile group relative block overflow-hidden rounded-sm border-2 border-neon-green/70 transition-transform duration-200 hover:scale-[1.03]"
            aria-label="Soft play — book a session"
          >
            <img
              src={softplayImg}
              alt="Neon soft play frame and ball pit at LuxPlay"
              className="h-48 w-full object-cover sm:h-72 md:h-[22rem]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            <div className="absolute right-1.5 top-1.5 rounded-sm border border-neon-green/80 bg-background/80 px-1.5 py-0.5 font-display text-[0.65rem] tracking-[0.18em] text-neon-green glow-green sm:text-[0.8rem]">
              SOFT PLAY
            </div>
          </a>
        </div>

        {/* BOOK NOW rainbow bar with animated chevrons */}
        <div className="mt-3 flex w-full items-center gap-2 sm:mt-4 sm:gap-3">
          <div className="hero-chevrons flex shrink-0 items-center gap-0.5 font-display text-neon-pink glow-pink text-[1.4rem] sm:text-[2rem]" aria-hidden>
            <span>»</span>
          </div>
          <a
            href="#presale"
            className="hero-rainbow-btn group relative flex flex-1 items-center justify-center overflow-hidden rounded-sm border-2 border-white/60 px-4 py-3.5 font-display text-[1.4rem] tracking-[0.12em] text-foreground transition-transform duration-200 hover:scale-[1.02] sm:py-4 sm:text-[1.9rem]"
          >
            <span className="relative z-10 drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]">BOOK NOW</span>
          </a>
          <div className="hero-chevrons flex shrink-0 items-center gap-0.5 font-display text-neon-cyan glow-cyan text-[1.4rem] sm:text-[2rem]" aria-hidden style={{ animationDelay: "0.4s" }}>
            <span>«</span>
          </div>
        </div>

        {/* Footer micro-line */}
        <div className="mt-2 flex w-full items-center justify-center gap-3 font-display text-[0.7rem] tracking-[0.18em] text-foreground/85 sm:text-[0.85rem]">
          <span className="text-neon-cyan glow-cyan">◉</span>
          <span>WWW.LUXPLAY.UK</span>
          <span className="text-foreground/30">|</span>
          <span className="text-neon-pink glow-pink">◉</span>
          <span>@LUXPLAY.UK</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
