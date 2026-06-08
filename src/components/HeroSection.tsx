import heroAsset from "@/assets/luxplay-hero.png.asset.json";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Stage — edge-to-edge hero composition for mobile and desktop */}
      <div className="hero-video-stage relative w-full h-[100svh] min-h-[640px] md:min-h-[760px] overflow-hidden flex items-center justify-center">
        {/* Blurred wash for ambient bleed */}
        <img
          src={heroAsset.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-[1] scale-[1.3] blur-2xl opacity-60"
        />

        {/* Main hero badge */}
        <img
          src={heroAsset.url}
          alt="LuxPlay — Arcade, Soft Play & Café at Unit 7 Sovereign Centre, Boscombe, Bournemouth BH1 4SX"
          className="relative z-[3] max-w-[92%] md:max-w-[640px] w-auto h-auto object-contain drop-shadow-[0_0_60px_rgba(255,0,200,0.35)]"
        />
      </div>

      {/* SEO-friendly hidden copy so search engines still index the key info */}
      <h1 className="sr-only">
        LuxPlay — While Everyone Is Closing, We're Opening! 40+ Arcade Games, 3 Level
        Soft Play, Baby Soft Play, Amazing Prizes & Cosy Café. Coming soon
        at Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX.
      </h1>

      {/* Live, clickable CTA sits just below the hero */}
      <div className="relative z-10 w-full flex justify-center items-center px-6 py-8 md:py-12">
        <a
          href="#presale"
          className="neon-cta inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-green text-[#070710] animate-btn-flash-green transition-transform duration-200 hover:scale-110 text-center"
        >
          <span>BUY CREDITS NOW</span>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
