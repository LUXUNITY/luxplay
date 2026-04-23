import wordmark from "@/assets/luxplay-wordmark.png";
import arcadeImg from "@/assets/luxplay-arcade.jpg";
import softplayImg from "@/assets/luxplay-softplay.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero-space relative min-h-[100svh] w-full overflow-hidden">
      {/* Deep space backdrop */}
      <div className="absolute inset-0 hero-space-bg" aria-hidden />
      <div className="absolute inset-0 hero-stars" aria-hidden />
      <div className="absolute inset-0 hero-stars hero-stars-2" aria-hidden />

      {/* Corner circuit traces */}
      <div className="hero-circuit-corner hero-circuit-tl absolute left-0 top-0" aria-hidden />
      <div className="hero-circuit-corner hero-circuit-tr absolute right-0 top-0" aria-hidden />
      <div className="hero-circuit-corner hero-circuit-bl absolute left-0 bottom-0" aria-hidden />
      <div className="hero-circuit-corner hero-circuit-br absolute right-0 bottom-0" aria-hidden />

      {/* Soft glow vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--neon-purple)/0.35),transparent_60%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,hsl(240_60%_2%/0.85),transparent_60%)]" aria-hidden />

      {/* Top neon bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />

      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-between px-4 pb-4 pt-5 text-center sm:max-w-[820px] md:max-w-[1080px] md:pt-8">
        {/* LUXPLAY wordmark */}
        <div className="animate-fade-in flex w-full flex-col items-center">
          <img
            src={wordmark}
            alt="LuxPlay"
            className="h-auto w-[78%] max-w-[560px] drop-shadow-[0_0_28px_hsl(var(--neon-cyan)/0.55)]"
            loading="eager"
          />
        </div>

        {/* WE'RE / OPENING — big to small, flashing rainbow */}
        <div className="mt-1 flex w-full flex-col items-center">
          <h1 className="font-display leading-[0.82] tracking-[0.005em] flex flex-col items-center">
            <span className="hero-flash text-[6.5rem] sm:text-[10rem] md:text-[13rem]">WE'RE</span>
            <span
              className="hero-flash text-[4.6rem] sm:text-[7.5rem] md:text-[10rem]"
              style={{ animationDelay: "0.25s" }}
            >
              OPENING!
            </span>
          </h1>
          <div className="mt-2 hero-ribbon inline-flex items-center gap-2 rounded-full border border-white/30 bg-background/40 px-4 py-1 font-display text-[0.72rem] tracking-[0.22em] text-foreground sm:text-[0.9rem]">
            <span>NEW CENTRE</span>
            <span className="text-neon-pink">•</span>
            <span className="text-neon-pink">NEW FUN</span>
            <span className="text-neon-cyan">•</span>
            <span>NEW MEMORIES</span>
          </div>
        </div>

        {/* 3-column band: arcade | offer card | soft play */}
        <div className="mt-3 grid w-full grid-cols-[1fr_1.25fr_1fr] items-stretch gap-2 sm:gap-3">
          <a
            href="#presale"
            onClick={scrollTo("presale")}
            aria-label="Discounted arcade credits"
            className="hero-tile group relative block overflow-hidden rounded-md border-2 border-neon-pink/70 transition-transform duration-200 hover:scale-[1.03]"
          >
            <img
              src={arcadeImg}
              alt="Arcade machines at LuxPlay"
              className="h-full min-h-[12rem] w-full object-cover sm:min-h-[18rem]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
            <div className="absolute left-1.5 top-1.5 rounded-sm border border-neon-pink/80 bg-background/80 px-1.5 py-0.5 font-display text-[0.65rem] tracking-[0.18em] text-neon-pink glow-pink sm:text-[0.78rem]">
              ARCADE
            </div>
          </a>

          {/* Offer card */}
          <div className="hero-offer-card relative flex flex-col items-center justify-center rounded-lg border-2 border-neon-cyan/70 bg-background/75 px-2 py-3 backdrop-blur-md sm:py-5">
            <div className="font-display leading-[0.85]">
              <span className="hero-flash text-[2.6rem] sm:text-[3.6rem] md:text-[4.4rem]">50%</span>
              <span className="ml-1 align-top font-display text-[0.85rem] text-neon-cyan glow-cyan sm:text-[1.1rem]">OFF</span>
            </div>
            <div className="mt-0.5 font-display text-[1.05rem] tracking-[0.1em] text-foreground sm:text-[1.3rem]">
              SOFT PLAY
            </div>
            <div className="my-1.5 flex items-center gap-2">
              <span className="h-px w-6 bg-neon-pink/70" />
              <span className="grid h-5 w-5 place-items-center rounded-full border border-neon-cyan/70 font-display text-[0.7rem] text-neon-cyan glow-cyan">
                +
              </span>
              <span className="h-px w-6 bg-neon-cyan/70" />
            </div>
            <div className="font-display text-[0.7rem] tracking-[0.18em] text-neon-pink glow-pink sm:text-[0.9rem]">
              DISCOUNTED
            </div>
            <div className="hero-flash font-display text-[1.15rem] leading-none sm:text-[1.7rem] md:text-[2rem]">
              ARCADE
            </div>
            <div className="hero-flash font-display text-[1.15rem] leading-none sm:text-[1.7rem] md:text-[2rem]">
              CREDITS
            </div>
          </div>

          <a
            href="#softplay"
            onClick={scrollTo("softplay")}
            aria-label="Book soft play"
            className="hero-tile group relative block overflow-hidden rounded-md border-2 border-neon-green/70 transition-transform duration-200 hover:scale-[1.03]"
          >
            <img
              src={softplayImg}
              alt="Soft play at LuxPlay"
              className="h-full min-h-[12rem] w-full object-cover sm:min-h-[18rem]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
            <div className="absolute right-1.5 top-1.5 rounded-sm border border-neon-green/80 bg-background/80 px-1.5 py-0.5 font-display text-[0.65rem] tracking-[0.18em] text-neon-green glow-green sm:text-[0.78rem]">
              SOFT PLAY
            </div>
          </a>
        </div>

        {/* Two interactive CTAs */}
        <div className="mt-3 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          <a
            href="#softplay"
            onClick={scrollTo("softplay")}
            aria-label="Book soft play"
            className="hero-neon-btn hero-neon-btn-pink group flex items-center justify-center gap-3 rounded-lg border-2 border-neon-pink/80 bg-background/80 px-4 py-3.5 font-display tracking-[0.1em] backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] sm:py-4"
          >
            <svg
              viewBox="0 0 32 32"
              className="h-7 w-7 shrink-0 text-neon-pink drop-shadow-[0_0_6px_hsl(var(--neon-pink))] sm:h-8 sm:w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M8 4v24" />
              <path d="M8 4h10l-2 4h-8" />
              <path d="M8 12h12" />
              <path d="M8 18h14l-6 10H8z" />
            </svg>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[1.25rem] text-foreground sm:text-[1.5rem]">BOOK NOW</span>
              <span className="text-[0.78rem] tracking-[0.18em] text-neon-pink glow-pink sm:text-[0.9rem]">SOFT PLAY</span>
            </span>
          </a>

          <a
            href="#presale"
            onClick={scrollTo("presale")}
            aria-label="Buy arcade credits"
            className="hero-neon-btn hero-neon-btn-cyan group flex items-center justify-center gap-3 rounded-lg border-2 border-neon-cyan/80 bg-background/80 px-4 py-3.5 font-display tracking-[0.1em] backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] sm:py-4"
          >
            <svg
              viewBox="0 0 32 32"
              className="h-7 w-7 shrink-0 text-neon-cyan drop-shadow-[0_0_6px_hsl(var(--neon-cyan))] sm:h-8 sm:w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <rect x="6" y="4" width="20" height="22" rx="2" />
              <rect x="10" y="8" width="12" height="7" rx="1" />
              <circle cx="12" cy="20" r="1.2" />
              <circle cx="16" cy="20" r="1.2" />
              <circle cx="20" cy="20" r="1.2" />
              <path d="M10 28h12" />
              <path d="M12 28v2M20 28v2" />
            </svg>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[1.25rem] text-foreground sm:text-[1.5rem]">BUY CREDITS</span>
              <span className="text-[0.78rem] tracking-[0.18em] text-neon-cyan glow-cyan sm:text-[0.9rem]">ARCADE MACHINES</span>
            </span>
          </a>
        </div>

        {/* Social footer */}
        <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-display text-[0.72rem] tracking-[0.18em] text-foreground sm:text-[0.85rem]">
          <a
            href="https://www.luxplay.uk"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neon-cyan"
          >
            <span className="text-neon-cyan glow-cyan">◉</span>
            WWW.LUXPLAY.UK
          </a>
          <span className="text-foreground/30">|</span>
          <a
            href="https://instagram.com/luxplay.uk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neon-pink"
          >
            <span className="text-neon-pink glow-pink">◉</span>
            @LUXPLAY.UK
          </a>
          <span className="text-foreground/30">|</span>
          <a
            href="https://facebook.com/LUXPLAY"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-neon-purple"
          >
            <span className="text-neon-purple" style={{ textShadow: "0 0 10px hsl(var(--neon-purple))" }}>◉</span>
            LUXPLAY
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
