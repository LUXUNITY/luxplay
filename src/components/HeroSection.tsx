import wordmark from "@/assets/luxplay-wordmark.png";
import arcadeImg from "@/assets/luxplay-arcade.jpg";
import softplayImg from "@/assets/luxplay-softplay.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Layered animated laser circuit background */}
      <div className="hero-laser-grid absolute inset-0" aria-hidden />
      <div className="hero-laser-lines absolute inset-0" aria-hidden />
      <div className="hero-laser-scan absolute inset-0" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,hsl(var(--neon-purple)/0.55),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_85%,hsl(var(--neon-cyan)/0.35),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,hsl(var(--neon-pink)/0.4),transparent_55%)]" />

      {/* Top + bottom neon bars */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1.5 bg-gradient-neon-bar" />
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />

      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-between px-4 pb-5 pt-5 text-center sm:max-w-[820px] md:max-w-[1100px] md:pt-8">
        {/* LUXPLAY wordmark + subtitle */}
        <div className="animate-fade-in flex w-full flex-col items-center">
          <img
            src={wordmark}
            alt="LuxPlay — arcade, soft play, café and prizes"
            className="h-auto w-[68%] max-w-[480px] drop-shadow-[0_0_24px_hsl(var(--neon-cyan)/0.55)]"
            loading="eager"
          />
          <div className="mt-1.5 flex items-center justify-center gap-2 font-display text-[0.72rem] tracking-[0.22em] text-foreground sm:text-[0.9rem]">
            <span>ARCADE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon-pink shadow-[0_0_8px_hsl(var(--neon-pink))]" />
            <span>SOFT PLAY</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_hsl(var(--neon-cyan))]" />
            <span>CAFÉ</span>
            <span className="h-1.5 w-1.5 rounded-full bg-neon-green shadow-[0_0_8px_hsl(var(--neon-green))]" />
            <span>PRIZES</span>
          </div>
        </div>

        {/* WE'RE / OPENING — single flashing rainbow headline */}
        <div className="mt-3 flex w-full flex-col items-center">
          <h1 className="font-display leading-[0.82] tracking-[0.005em] flex flex-col items-center">
            <span className="hero-flash text-[5rem] sm:text-[8.5rem] md:text-[12rem]">WE'RE</span>
            <span
              className="hero-flash text-[5.6rem] sm:text-[10rem] md:text-[14rem]"
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

        {/* Arcade + Soft Play image grid */}
        <div className="mt-3 grid w-full grid-cols-2 gap-2.5 sm:gap-3">
          <a
            href="#presale"
            className="hero-tile group relative block overflow-hidden rounded-sm border-2 border-neon-pink/70 transition-transform duration-200 hover:scale-[1.03]"
            aria-label="Arcade — buy discounted credits"
          >
            <img
              src={arcadeImg}
              alt="Arcade machines and prize claw at LuxPlay"
              className="h-44 w-full object-cover sm:h-64 md:h-80"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2 text-left">
              <span className="block font-display text-[1.2rem] leading-none text-neon-pink glow-pink sm:text-[1.7rem]">
                ARCADE
              </span>
              <span className="mt-1 block font-display text-[0.7rem] tracking-[0.16em] text-foreground sm:text-[0.9rem]">
                WIN BIG PRIZES
              </span>
            </div>
          </a>

          <a
            href="#softplay"
            className="hero-tile group relative block overflow-hidden rounded-sm border-2 border-neon-green/70 transition-transform duration-200 hover:scale-[1.03]"
            aria-label="Soft play — book a session"
          >
            <img
              src={softplayImg}
              alt="Neon soft play frame and ball pit at LuxPlay"
              className="h-44 w-full object-cover sm:h-64 md:h-80"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-2 text-left">
              <span className="block font-display text-[1.2rem] leading-none text-neon-green glow-green sm:text-[1.7rem]">
                SOFT PLAY
              </span>
              <span className="mt-1 block font-display text-[0.7rem] tracking-[0.16em] text-foreground sm:text-[0.9rem]">
                BALL PIT • SLIDES
              </span>
            </div>
          </a>
        </div>

        {/* Two distinct CTAs — stacked on mobile so they never overlap */}
        <div className="mt-3 w-full">
          <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:gap-3">
            <a
              href="#softplay"
              className="hero-cta hero-cta-green flex flex-1 items-center justify-center rounded-md px-4 py-3.5 font-display text-[1.1rem] tracking-[0.12em] sm:text-[1.35rem]"
            >
              BOOK SOFT PLAY
            </a>
            <a
              href="#presale"
              className="hero-cta hero-cta-pink flex flex-1 items-center justify-center rounded-md px-4 py-3.5 font-display text-[1.1rem] tracking-[0.12em] sm:text-[1.35rem]"
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
