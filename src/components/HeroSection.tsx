import heroAsset from "@/assets/luxplay-hero-v2.jpg.asset.json";
import arcadeAsset from "@/assets/real-arcade.jpeg.asset.json";
import softplayAsset from "@/assets/real-softplay-v2.png.asset.json";
import babySoftplayAsset from "@/assets/real-baby-softplay.png.asset.json";
import prizeAsset from "@/assets/real-prize-redemption.jpg.asset.json";
import RefreshPlaySection from "@/components/RefreshPlaySection";

const bgVenues = [
  { src: arcadeAsset.url, alt: "Arcade Zone" },
  { src: softplayAsset.url, alt: "Soft Play" },
  { src: babySoftplayAsset.url, alt: "Baby Soft Play" },
  { src: prizeAsset.url, alt: "Prize Redemption" },
];

const HeroSection = () => {

  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-50" />

      {/* Venue photo backdrop — 2x2 grid, faint, behind the hero content */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2">
        {bgVenues.map((v) => (
          <div key={v.alt} className="relative overflow-hidden">
            <img
              src={v.src}
              alt={v.alt}
              className="absolute inset-0 w-full h-full object-cover opacity-30 md:opacity-40"
              loading="eager"
            />
          </div>
        ))}
      </div>
      {/* Dark overlay so the logo and CTAs stay readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#070710]/80 via-[#070710]/70 to-[#070710]/80" />

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Hero image — full width, fades into the section below */}
        <div className="relative">
          <img
            src={heroAsset.url}
            alt="LuxPlay — Play More. Earn More. Level Up. Arcade, Soft Play & Café at Unit 7 Sovereign Centre, Boscombe, Bournemouth BH1 4SX"
            className="block w-full h-auto object-contain"
          />
          {/* Bottom fade blending into the next section */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:h-40 bg-gradient-to-b from-transparent to-[#ff6a00]" />
        </div>


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

    </div>
    </section>
  );
};

export default HeroSection;
