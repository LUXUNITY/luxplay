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
      <div className="absolute inset-0 hero-space-bg" aria-hidden />
      <div className="absolute inset-0 hero-stars" aria-hidden />
      <div className="absolute inset-0 hero-stars hero-stars-2" aria-hidden />
      <div className="absolute inset-0 hero-burst" aria-hidden />

      <div className="hero-circuit-corner hero-circuit-tl absolute left-0 top-0" aria-hidden />
      <div className="hero-circuit-corner hero-circuit-tr absolute right-0 top-0" aria-hidden />
      <div className="hero-circuit-corner hero-circuit-bl absolute left-0 bottom-0" aria-hidden />
      <div className="hero-circuit-corner hero-circuit-br absolute right-0 bottom-0" aria-hidden />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_92%,hsl(240_60%_2%/0.9),transparent_48%)]" aria-hidden />
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />

      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[680px] flex-col px-4 pb-4 pt-5 text-center sm:max-w-[820px] md:max-w-[1080px] md:pt-8">
        <div className="flex flex-col items-center gap-3">
          <img
            src={wordmark}
            alt="LuxPlay"
            className="h-auto w-[82%] max-w-[620px] drop-shadow-[0_0_28px_hsl(var(--neon-cyan)/0.55)]"
            loading="eager"
          />

          <div className="flex w-full flex-col items-center">
            <h1 className="font-display leading-[0.8] tracking-0 flex flex-col items-center">
              <span className="hero-flash hero-title-top text-[6.4rem] sm:text-[10rem] md:text-[13rem]">WE'RE</span>
              <span
                className="hero-flash hero-title-bottom -mt-2 text-[7.15rem] sm:text-[11.2rem] md:text-[14.4rem]"
                style={{ animationDelay: "0.2s" }}
              >
                OPENING!
              </span>
            </h1>

            <div className="mt-2 hero-ribbon inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-1 font-display text-[0.76rem] tracking-[0.18em] text-foreground sm:text-[0.92rem]">
              <span>NEW CENTRE</span>
              <span className="text-neon-pink">•</span>
              <span className="text-neon-pink">NEW FUN</span>
              <span className="text-neon-cyan">•</span>
              <span>NEW MEMORIES</span>
            </div>
          </div>

          <div className="grid w-full grid-cols-[0.95fr_1.2fr_0.95fr] items-stretch gap-2 sm:gap-3">
            <a
              href="#presale"
              onClick={scrollTo("presale")}
              aria-label="Discounted arcade credits"
              className="hero-reference-tile hero-reference-left group relative block overflow-hidden rounded-[1.25rem] border-2 border-neon-pink/80"
            >
              <img
                src={arcadeImg}
                alt="Arcade machines at LuxPlay"
                className="h-full min-h-[15rem] w-full object-cover sm:min-h-[20rem]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-background/12 to-transparent" />
            </a>

            <div className="hero-offer-card relative flex flex-col items-center justify-center rounded-[1.65rem] border-2 border-neon-cyan/80 bg-background/78 px-2 py-3 backdrop-blur-md sm:py-5">
              <div className="hero-offer-figure font-display leading-[0.82] text-[3.2rem] sm:text-[4.2rem] md:text-[5rem]">
                <span className="hero-offer-percent">50%</span>
                <span className="ml-1 align-top text-[0.95rem] text-foreground sm:text-[1.2rem]">OFF</span>
              </div>
              <div className="mt-0.5 font-display text-[1.05rem] tracking-[0.08em] text-foreground sm:text-[1.35rem]">
                SOFT PLAY
              </div>

              <div className="my-2 flex w-full items-center justify-center gap-2 px-2">
                <span className="h-px flex-1 bg-neon-pink/75" />
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-neon-cyan/80 font-display text-[1.15rem] text-neon-cyan glow-cyan">
                  +
                </span>
                <span className="h-px flex-1 bg-neon-cyan/75" />
              </div>

              <div className="font-display text-[0.8rem] tracking-[0.12em] text-neon-pink glow-pink sm:text-[1rem]">
                DISCOUNTED
              </div>
              <div className="font-display text-[1.45rem] leading-none text-foreground sm:text-[2rem] md:text-[2.25rem]">
                ARCADE
              </div>
              <div className="font-display text-[1.45rem] leading-none text-neon-cyan glow-cyan sm:text-[2rem] md:text-[2.25rem]">
                CREDITS
              </div>
            </div>

            <a
              href="#softplay"
              onClick={scrollTo("softplay")}
              aria-label="Book soft play"
              className="hero-reference-tile hero-reference-right group relative block overflow-hidden rounded-[1.25rem] border-2 border-neon-cyan/80"
            >
              <img
                src={softplayImg}
                alt="Soft play at LuxPlay"
                className="h-full min-h-[15rem] w-full object-cover sm:min-h-[20rem]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-background/12 to-transparent" />
            </a>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:gap-3">
            <a
              href="#softplay"
              onClick={scrollTo("softplay")}
              aria-label="Book now soft play"
              className="hero-action-card hero-action-card-pink group flex min-h-[7.6rem] items-center gap-3 rounded-[1.5rem] border-2 border-neon-pink/85 bg-background/82 px-4 py-3 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            >
              <svg
                viewBox="0 0 32 32"
                className="h-12 w-12 shrink-0 text-neon-pink drop-shadow-[0_0_8px_hsl(var(--neon-pink))] sm:h-14 sm:w-14"
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
              <span className="flex flex-col items-start leading-tight text-left">
                <span className="text-[1.2rem] text-foreground sm:text-[1.55rem]">BOOK NOW</span>
                <span className="mt-1 text-[0.8rem] tracking-[0.14em] text-neon-pink glow-pink sm:text-[0.96rem]">SOFT PLAY</span>
              </span>
            </a>

            <a
              href="#presale"
              onClick={scrollTo("presale")}
              aria-label="Buy credits arcade machines"
              className="hero-action-card hero-action-card-cyan group flex min-h-[7.6rem] items-center gap-3 rounded-[1.5rem] border-2 border-neon-cyan/85 bg-background/82 px-4 py-3 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
            >
              <svg
                viewBox="0 0 32 32"
                className="h-12 w-12 shrink-0 text-neon-cyan drop-shadow-[0_0_8px_hsl(var(--neon-cyan))] sm:h-14 sm:w-14"
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
              <span className="flex flex-col items-start leading-tight text-left">
                <span className="text-[1.1rem] text-foreground sm:text-[1.45rem]">BUY CREDITS</span>
                <span className="mt-1 text-[0.74rem] tracking-[0.12em] text-neon-cyan glow-cyan sm:text-[0.92rem]">ARCADE MACHINES</span>
              </span>
            </a>
          </div>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-display text-[0.74rem] tracking-[0.15em] text-foreground sm:text-[0.88rem]">
            <a href="https://www.luxplay.uk" className="inline-flex items-center gap-1.5 transition-colors hover:text-neon-cyan">
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
      </div>
    </section>
  );
};

export default HeroSection;
