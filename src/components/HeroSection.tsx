import type { MouseEvent } from "react";

const HeroSection = () => {
  const scrollTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden hero-space">
      {/* Backdrop layers */}
      <div className="absolute inset-0 hero-space-bg" />
      <div className="absolute inset-0 hero-stars opacity-80" />
      <div className="absolute inset-0 hero-stars-2 opacity-70" />
      <div className="absolute inset-0 hero-burst" />

      {/* Circuit corners (CSS only) */}
      <div className="absolute top-0 left-0 hero-circuit-corner hero-circuit-tl" />
      <div className="absolute top-0 right-0 hero-circuit-corner hero-circuit-tr" />
      <div className="absolute bottom-0 left-0 hero-circuit-corner hero-circuit-bl" />
      <div className="absolute bottom-0 right-0 hero-circuit-corner hero-circuit-br" />

      {/* Neon top/bottom bars */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />

      {/* Content — single screen, mobile first */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-between px-4 pt-5 pb-6">
        {/* LUXPLAY wordmark */}
        <h2 className="hero-logo-title text-center font-display tracking-[0.08em] text-[2.4rem] leading-none sm:text-[3.4rem]">
          LUXPLAY
        </h2>

        {/* Headline — flashing rainbow */}
        <div className="mt-1 flex w-full flex-col items-center">
          <h1 className="flex w-full flex-col items-center font-display leading-[0.82] tracking-[0.01em]">
            <span className="hero-flash hero-title-top text-[5rem] sm:text-[7.4rem]">
              WE&rsquo;RE
            </span>
            <span className="hero-flash hero-title-bottom -mt-1 text-[5rem] sm:text-[7.8rem]">
              OPENING!
            </span>
          </h1>

          {/* Pill ribbon */}
          <div className="hero-ribbon mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-extrabold tracking-wider text-background sm:text-xs">
            <span>NEW CENTRE</span>
            <span className="text-neon-pink">•</span>
            <span className="text-neon-pink">NEW FUN</span>
            <span className="text-neon-cyan">•</span>
            <span className="text-neon-cyan">NEW MEMORIES</span>
          </div>
        </div>

        {/* Offer card */}
        <div className="hero-offer-card relative mt-3 w-[88%] max-w-[360px] rounded-2xl border border-neon-cyan/60 bg-[hsl(var(--background)/0.78)] p-4 text-center backdrop-blur-md">
          <div className="flex items-baseline justify-center gap-1 font-display leading-none">
            <span className="hero-offer-percent text-[3.4rem] sm:text-[4.4rem]">50</span>
            <span className="hero-offer-percent text-[1.5rem] sm:text-[1.9rem]">%</span>
            <span className="ml-1 text-[1.3rem] font-extrabold tracking-wider text-foreground sm:text-2xl">
              OFF
            </span>
          </div>
          <p className="mt-1 font-display text-[1.5rem] leading-none tracking-wider text-foreground sm:text-3xl">
            SOFT PLAY
          </p>

          <div className="my-3 flex items-center justify-center gap-2 text-neon-cyan/80">
            <span className="h-px w-10 bg-neon-pink/60" />
            <span className="grid h-6 w-6 place-items-center rounded-full border border-neon-cyan text-sm font-bold">
              +
            </span>
            <span className="h-px w-10 bg-neon-cyan/60" />
          </div>

          <p className="font-display text-[1rem] leading-tight tracking-wider text-neon-pink sm:text-xl">
            DISCOUNTED
          </p>
          <p className="font-display text-[1.5rem] leading-none tracking-wider text-foreground sm:text-3xl">
            ARCADE
          </p>
          <p className="hero-logo-title font-display text-[1.5rem] leading-none tracking-wider sm:text-3xl">
            CREDITS
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-5 grid w-full grid-cols-2 gap-3">
          <a
            href="#softplay"
            onClick={scrollTo("softplay")}
            className="hero-action-card hero-action-card-pink group flex items-center gap-2 rounded-2xl border-2 border-neon-pink bg-[hsl(var(--background)/0.7)] px-3 py-3 backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] sm:px-4 sm:py-4"
            aria-label="Book now soft play"
          >
            {/* Soft play slide icon */}
            <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0 text-neon-pink" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 4v22" />
              <path d="M8 4h6" />
              <path d="M8 10h5" />
              <path d="M8 16h4" />
              <path d="M8 22c4 0 8-3 12-6l4-3" />
              <path d="M22 17l4-3" />
            </svg>
            <span className="flex flex-col text-left">
              <span className="font-display text-[1.1rem] leading-none tracking-wider text-foreground sm:text-2xl">
                BOOK NOW
              </span>
              <span className="mt-1 font-display text-[0.8rem] font-bold tracking-wider text-neon-pink sm:text-base">
                SOFT PLAY
              </span>
            </span>
          </a>

          <a
            href="#presale"
            onClick={scrollTo("presale")}
            className="hero-action-card hero-action-card-cyan group flex items-center gap-2 rounded-2xl border-2 border-neon-cyan bg-[hsl(var(--background)/0.7)] px-3 py-3 backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] sm:px-4 sm:py-4"
            aria-label="Buy credits arcade machines"
          >
            {/* Arcade cabinet icon */}
            <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0 text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="8" y="3" width="16" height="22" rx="2" />
              <rect x="11" y="6" width="10" height="7" rx="1" />
              <circle cx="13" cy="17" r="1" />
              <circle cx="19" cy="17" r="1" />
              <path d="M14 21h4" />
              <path d="M10 25l-2 4" />
              <path d="M22 25l2 4" />
            </svg>
            <span className="flex flex-col text-left">
              <span className="font-display text-[1.1rem] leading-none tracking-wider text-foreground sm:text-2xl">
                BUY CREDITS
              </span>
              <span className="mt-1 font-display text-[0.74rem] font-bold tracking-wider text-neon-cyan sm:text-base">
                ARCADE MACHINES
              </span>
            </span>
          </a>
        </div>

        {/* Footer links */}
        <div className="mt-4 flex w-full items-center justify-center gap-3 text-[0.72rem] font-bold tracking-wider text-foreground/85 sm:text-sm">
          <a
            href="https://www.luxplay.uk"
            className="flex items-center gap-1.5 hover:text-neon-cyan"
            aria-label="Visit LuxPlay website"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-neon-cyan" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
            </svg>
            WWW.LUXPLAY.UK
          </a>
          <span className="h-4 w-px bg-foreground/30" />
          <a
            href="https://instagram.com/luxplay.uk"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-neon-pink"
            aria-label="Visit LuxPlay Instagram"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-neon-pink" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
            @LUXPLAY.UK
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
