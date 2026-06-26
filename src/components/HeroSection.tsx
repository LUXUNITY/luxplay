import heroAsset from "@/assets/luxplay-hero-v2.jpg.asset.json";
import RefreshPlaySection from "@/components/RefreshPlaySection";

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
      {/* REFRESH & PLAY deal — forefront, directly under the logo */}
      <RefreshPlaySection />

      {/* Live, clickable CTAs sit just below the hero — uniform 2x2 grid, compact */}
      <div className="relative z-10 w-full max-w-2xl mx-auto grid grid-cols-2 gap-2 sm:gap-3 px-4 py-4 md:py-6">
        <a
          href="#refresh-play"
          className="neon-cta flex items-center justify-center font-display text-xs sm:text-sm md:text-base tracking-widest px-2 py-3 md:py-4 bg-neon-green text-[#070710] animate-btn-flash-green transition-transform duration-200 hover:scale-105 text-center h-full"
        >
          <span>REFRESH &amp; PLAY £9.99</span>
        </a>
        <a
          href="#presale"
          className="neon-cta flex items-center justify-center font-display text-xs sm:text-sm md:text-base tracking-widest px-2 py-3 md:py-4 bg-neon-pink text-[#070710] animate-btn-flash-pink transition-transform duration-200 hover:scale-105 text-center h-full"
        >
          <span>BUY CREDITS</span>
        </a>
        <a
          href="#softplay"
          className="neon-cta flex items-center justify-center font-display text-xs sm:text-sm md:text-base tracking-widest px-2 py-3 md:py-4 bg-neon-cyan text-[#070710] animate-btn-flash-cyan transition-transform duration-200 hover:scale-105 text-center h-full"
        >
          <span>BOOK SOFT PLAY</span>
        </a>
        <a
          href="#parties"
          className="neon-cta flex items-center justify-center font-display text-xs sm:text-sm md:text-base tracking-widest px-2 py-3 md:py-4 bg-neon-pink text-[#070710] animate-btn-flash-pink transition-transform duration-200 hover:scale-105 text-center h-full"
        >
          <span>PARTY PACKAGES</span>
        </a>
      </div>

    </section>
  );
};

export default HeroSection;
