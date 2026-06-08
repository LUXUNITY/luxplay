import heroAsset from "@/assets/luxplay-hero-v2.jpg.asset.json";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Hero image — full width, no blur */}
      <img
        src={heroAsset.url}
        alt="LuxPlay — Play More. Earn More. Level Up. Arcade, Soft Play & Café at Unit 7 Sovereign Centre, Boscombe, Bournemouth BH1 4SX"
        className="block w-full h-auto object-contain"
      />

      {/* SEO-friendly hidden copy so search engines still index the key info */}
      <h1 className="sr-only">
        LuxPlay — Play More. Earn More. Level Up. 40+ Arcade Games, 3 Level
        Soft Play, Baby Soft Play, Amazing Prizes & Cosy Café at Unit 7,
        Sovereign Centre, Boscombe, Bournemouth, BH1 4SX.
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
