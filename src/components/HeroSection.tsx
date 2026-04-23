import type { MouseEvent } from "react";
import referenceHero from "@/assets/luxplay-homepage-reference.png";

const HeroSection = () => {
  const scrollTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />

      {/* Poster scaled to fit the screen with correct aspect ratio (1024x1536 ≈ 2:3) */}
      <div
        className="relative z-10 mx-auto"
        style={{
          width: "min(100vw, calc(100svh * 2 / 3))",
          aspectRatio: "1024 / 1536",
        }}
      >
        <img
          src={referenceHero}
          alt="LuxPlay we're opening poster with soft play and arcade offers"
          className="block h-full w-full select-none"
          loading="eager"
          draggable={false}
        />

        {/* BOOK NOW · SOFT PLAY hotspot */}
        <a
          href="#softplay"
          onClick={scrollTo("softplay")}
          aria-label="Book now soft play"
          className="absolute left-[4%] top-[80.5%] h-[11.8%] w-[43.8%] rounded-[1.5rem]"
        />

        {/* BUY CREDITS · ARCADE MACHINES hotspot */}
        <a
          href="#presale"
          onClick={scrollTo("presale")}
          aria-label="Buy credits arcade machines"
          className="absolute right-[4%] top-[80.5%] h-[11.8%] w-[46%] rounded-[1.5rem]"
        />

        {/* Footer links */}
        <a
          href="https://www.luxplay.uk"
          aria-label="Visit LuxPlay website"
          className="absolute left-[18%] top-[93.7%] h-[3.6%] w-[28%]"
        />
        <a
          href="https://instagram.com/luxplay.uk"
          target="_blank"
          rel="noreferrer"
          aria-label="Visit LuxPlay Instagram"
          className="absolute left-[55%] top-[93.5%] h-[3.8%] w-[24%]"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
