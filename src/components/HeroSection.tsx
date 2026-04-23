import type { MouseEvent } from "react";

const HeroSection = () => {
  const scrollTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden hero-space">
      {/* Space backdrop */}
      <div className="absolute inset-0 hero-space-bg" />
      <div className="absolute inset-0 hero-stars opacity-80" />
      <div className="absolute inset-0 hero-stars-2 opacity-70" />

      {/* Central radial neon burst */}
      <div className="absolute inset-0 hero-burst" />

      {/* Corner circuit traces */}
      <div className="absolute top-0 left-0 hero-circuit-corner hero-circuit-tl" />
      <div className="absolute top-0 right-0 hero-circuit-corner hero-circuit-tr" />
      <div className="absolute bottom-0 left-0 hero-circuit-corner hero-circuit-bl" />
      <div className="absolute bottom-0 right-0 hero-circuit-corner hero-circuit-br" />

      {/* Top + bottom neon bars */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />

      {/* Content — fits viewport, mobile-first */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-between px-4 pt-4 pb-5 sm:pt-6 sm:pb-7">
        {/* LUXPLAY wordmark */}
        <h2 className="hero-logo-title text-center font-display tracking-[0.08em] text-[2.6rem] leading-none sm:text-[3.6rem]">
          LUXPLAY
        </h2>

        {/* WE'RE OPENING! — flashing rainbow */}
        <div className="mt-1 flex w-full flex-col items-center">
          <h1 className="flex w-full flex-col items-center font-display leading-[0.82] tracking-[0.01em]">
            <span className="hero-flash hero-title-top text-[5.2rem] sm:text-[7.5rem]">
              WE'RE
            </span>
            <span className="hero-flash hero-title-bottom -mt-1 text-[5.4rem] sm:text-[8rem]">
              OPENING!
            </span>
          </h1>

          {/* NEW CENTRE • NEW FUN • NEW MEMORIES ribbon */}
          <div className="hero-ribbon mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-1.5 text-[0.7rem] font-extrabold tracking-wider text-background sm:text-xs">
            <span>NEW CENTRE</span>
            <span className="text-neon-pink">•</span>
            <span className="text-neon-pink">NEW FUN</span>
            <span className="text-neon-cyan">•</span>
            <span className="text-neon-cyan">NEW MEMORIES</span>
          </div>
        </div>

        {/* Offer card — center */}
        <div className="hero-offer-card relative mt-3 w-[88%] max-w-[360px] rounded-2xl border border-neon-cyan/60 bg-[hsl(var(--background)/0.78)] p-4 text-center backdrop-blur-md">
          <div className="flex items-baseline justify-center gap-1 font-display leading-none">
            <span className="hero-offer-percent text-[3.6rem] sm:text-[4.6rem]">50</span>
            <span className="hero-offer-percent text-[1.6rem] sm:text-[2rem]">%</span>
            <span className="ml-1 text-[1.4rem] font-extrabold tracking-wider text-foreground sm:text-2xl">
              OFF
            </span>
          </div>
          <p className="mt-1 font-display text-[1.6rem] leading-none tracking-wider text-foreground sm:text-3xl">
            SOFT PLAY
          </p>

          <div className="my-3 flex items-center justify-center gap-2 text-neon-cyan/80">
            <span className="h-px w-10 bg-neon-pink/60" />
            <span className="grid h-6 w-6 place-items-center rounded-full border border-neon-cyan text-sm font-bold">
              +
            </span>
            <span className="h-px w-10 bg-neon-cyan/60" />
          </div>

          <p className="font-display text-[1.05rem] leading-tight tracking-wider text-neon-pink sm:text-xl">
            DISCOUNTED
          </p>
          <p className="font-display text-[1.6rem] leading-none tracking-wider text-foreground sm:text-3xl">
            ARCADE
          </p>
          <p className="hero-logo-title font-display text-[1.6rem] leading-none tracking-wider sm:text-3xl">
            CREDITS
          </p>
        </div>

        {/* Action buttons — slightly lower per request */}
        <div className="mt-4 grid w-full grid-cols-2 gap-2 sm:gap-3">
          <a
            href="#softplay"
            onClick={scrollTo("softplay")}
            className="hero-action-card hero-action-card-pink flex flex-col items-start justify-center rounded-2xl border-2 border-neon-pink bg-[hsl(var(--background)/0.7)] px-3 py-3 text-left backdrop-blur-md sm:px-4 sm:py-4"
            aria-label="Book now soft play"
          >
            <span className="font-display text-[1.15rem] leading-none tracking-wider text-foreground sm:text-2xl">
              BOOK NOW
            </span>
            <span className="mt-1 font-display text-[0.85rem] font-bold tracking-wider text-neon-pink sm:text-base">
              SOFT PLAY
            </span>
          </a>
          <a
            href="#presale"
            onClick={scrollTo("presale")}
            className="hero-action-card hero-action-card-cyan flex flex-col items-start justify-center rounded-2xl border-2 border-neon-cyan bg-[hsl(var(--background)/0.7)] px-3 py-3 text-left backdrop-blur-md sm:px-4 sm:py-4"
            aria-label="Buy credits arcade machines"
          >
            <span className="font-display text-[1.15rem] leading-none tracking-wider text-foreground sm:text-2xl">
              BUY CREDITS
            </span>
            <span className="mt-1 font-display text-[0.78rem] font-bold tracking-wider text-neon-cyan sm:text-base">
              ARCADE MACHINES
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
            <span className="grid h-5 w-5 place-items-center rounded-full bg-neon-cyan/20 text-neon-cyan">
              ◐
            </span>
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
            <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-tr from-neon-pink via-neon-purple to-neon-cyan text-[10px]">
              ◉
            </span>
            @LUXPLAY.UK
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
