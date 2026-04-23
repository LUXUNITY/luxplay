import poster from "@/assets/luxplay-hero-poster.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Top neon bar */}
      <div className="absolute top-0 left-0 right-0 z-30 h-1.5 bg-gradient-neon-bar" />

      {/* Poster as the hero — fills the screen, mobile-first */}
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[640px] flex-col items-center justify-start sm:max-w-[760px] md:max-w-[900px]">
        <div className="hero-poster-wrap relative w-full">
          <img
            src={poster}
            alt="LuxPlay is opening — 50% off soft play and discounted arcade credits"
            className="block h-auto w-full select-none"
            loading="eager"
            draggable={false}
          />

          {/* Animated rainbow sweep overlay for extra life */}
          <div className="hero-poster-sheen pointer-events-none absolute inset-0" />
          {/* Soft pulse glow */}
          <div className="hero-poster-pulse pointer-events-none absolute inset-0" />

          {/* Interactive hotspots — invisible but clickable */}
          {/* Left third → Arcade / credits */}
          <a
            href="#presale"
            aria-label="Buy discounted arcade credits"
            className="hero-hotspot absolute left-0 top-[55%] h-[30%] w-[33%]"
          />
          {/* Right third → Soft play */}
          <a
            href="#softplay"
            aria-label="Book soft play"
            className="hero-hotspot absolute right-0 top-[55%] h-[30%] w-[33%]"
          />
          {/* Center promo card → presale */}
          <a
            href="#presale"
            aria-label="See offers"
            className="hero-hotspot absolute left-[33%] top-[42%] h-[42%] w-[34%]"
          />

          {/* BOOK NOW band — actual interactive button overlaid on the poster's button */}
          <a
            href="#presale"
            aria-label="Book now"
            className="hero-booknow absolute left-[14%] right-[14%] top-[83.5%] block h-[7%] rounded-md"
          >
            <span className="sr-only">Book Now</span>
          </a>

          {/* Footer links — site + instagram */}
          <a
            href="https://www.luxplay.uk"
            aria-label="Visit luxplay.uk"
            className="hero-hotspot absolute left-[10%] top-[95%] h-[4%] w-[35%]"
          />
          <a
            href="https://instagram.com/luxplay.uk"
            target="_blank"
            rel="noreferrer"
            aria-label="LuxPlay on Instagram"
            className="hero-hotspot absolute right-[6%] top-[95%] h-[4%] w-[40%]"
          />
        </div>
      </div>

      {/* Bottom neon bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
