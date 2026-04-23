import heroDesktop from "@/assets/luxplay-hero-collage.jpg";
import heroMobile from "@/assets/luxplay-hero-mobile.jpg";
import logoCard from "@/assets/luxplay-logo-card.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background">
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroMobile} />
          <img
            src={heroDesktop}
            alt="LuxPlay opening artwork showing arcade machines, prize games, soft play and café"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-background/12 via-background/18 to-background/52 md:from-background/10 md:via-background/12 md:to-background/42" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--background)/0.02),hsl(var(--background)/0.22)_52%,hsl(var(--background)/0.56)_100%)]" />
        <div className="hero-circuit-overlay absolute inset-0 opacity-65" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between px-4 pb-4 pt-5 text-center sm:px-6 md:pb-8 md:pt-8">
        <div className="animate-fade-in flex justify-center">
          <img
            src={logoCard}
            alt="LuxPlay tap to play card"
            className="h-auto w-[100px] rounded-[18px] border border-white/15 shadow-[0_0_24px_hsl(var(--primary)/0.25)] sm:w-[118px] md:w-[138px]"
            loading="eager"
          />
        </div>

        <div className="pointer-events-none mx-auto flex w-full max-w-[680px] flex-1 flex-col justify-end md:justify-end">
          <div className="hero-panel pointer-events-auto animate-enter rounded-md border border-white/15 px-2.5 py-2.5 shadow-[0_0_28px_hsl(var(--background)/0.45)] sm:px-3 sm:py-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="#softplay"
                className="rounded-sm border border-neon-green/60 bg-background/72 px-2 py-2 text-center backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
              >
                <span className="block font-display text-[1.3rem] leading-none text-neon-green glow-green sm:text-[1.6rem]">
                  50% OFF
                </span>
                <span className="mt-1 block font-display text-[0.95rem] leading-none tracking-[0.08em] text-foreground sm:text-[1.1rem]">
                  SOFT PLAY
                </span>
              </a>

              <a
                href="#presale"
                className="rounded-sm border border-neon-pink/60 bg-background/72 px-2 py-2 text-center backdrop-blur-md transition-transform duration-200 hover:scale-[1.02]"
              >
                <span className="block font-display text-[1rem] leading-none text-neon-pink glow-pink sm:text-[1.2rem]">
                  DISCOUNTED
                </span>
                <span className="mt-1 block font-display text-[0.95rem] leading-none tracking-[0.08em] text-foreground sm:text-[1.1rem]">
                  ARCADE CREDITS
                </span>
              </a>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href="#softplay"
                className="rounded-sm border border-neon-green/60 bg-background/82 px-2 py-2 font-display text-[0.95rem] tracking-[0.1em] text-neon-green transition-transform duration-200 hover:scale-[1.02] sm:text-[1.05rem]"
              >
                BOOK SOFT PLAY
              </a>
              <a
                href="#presale"
                className="rounded-sm border border-neon-pink/60 bg-background/82 px-2 py-2 font-display text-[0.95rem] tracking-[0.1em] text-neon-pink transition-transform duration-200 hover:scale-[1.02] sm:text-[1.05rem]"
              >
                BUY CREDITS
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;