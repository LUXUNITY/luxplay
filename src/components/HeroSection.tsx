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

      {/* Foreground content */}
      <div className="relative z-10">
        {/* Logo + venue photo grid combined — logo small, centered and faded so the attractions are the focus */}
        <div className="relative w-full h-72 sm:h-96 md:h-[28rem] overflow-hidden bg-[#070710]">
          {/* 2x2 venue photo grid — attractions are the main focus */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
            {bgVenues.map((v) => (
              <div key={v.alt} className="relative overflow-hidden">
                <img
                  src={v.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 md:opacity-90"
                  loading="eager"
                />
              </div>
            ))}
          </div>
          {/* Subtle dark wash to keep the page cohesive */}
          <div className="absolute inset-0 bg-[#070710]/20" />

          {/* Small, centered LuxPlay logo with softly feathered edges so it sits in the middle of the attractions */}
          <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
            <img
              src={heroAsset.url}
              alt="LuxPlay — Play More. Earn More. Level Up. Arcade, Soft Play & Café at Unit 7 Sovereign Centre, Boscombe, Bournemouth BH1 4SX"
              className="w-full max-w-[140px] sm:max-w-[180px] md:max-w-[220px] h-auto object-contain opacity-90 md:opacity-95"
              style={{
                maskImage: "radial-gradient(circle, black 50%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle, black 50%, transparent 100%)",
                filter: "drop-shadow(0 0 12px rgba(0,0,0,0.6))",
              }}
            />
          </div>

          {/* Soft top edge fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 md:h-16 z-20 bg-gradient-to-b from-[#070710] to-transparent" />
          {/* Soft bottom edge fade into the Refresh & Play section */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-28 z-20 bg-gradient-to-b from-transparent to-[#ff6a00]" />
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
