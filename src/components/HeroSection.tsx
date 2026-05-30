const HeroSection = () => {
  return (
    <section className="relative w-full bg-background overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Stage — edge-to-edge video composition for mobile and desktop */}
      <div className="hero-video-stage relative w-full h-[100svh] min-h-[640px] md:min-h-[760px] overflow-hidden">
        {/* Subtle ambient colour only — the hero video blur does the real blending */}
        <video
          src="/hero-ambient.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-10 mix-blend-screen"
        />

        {/* Blown-up video wash replaces the old boxed/letterboxed border */}
        <video
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hero-video-wash absolute inset-0 w-full h-full object-cover z-[1] scale-[1.2]"
        />

        {/* Colour and contrast grade so every layer feels like one image */}
        <div className="hero-video-grade absolute inset-0 z-[2] pointer-events-none" />

        {/* Main hero stays fully visible; the blurred copy underneath carries the surrounding space */}
        <video
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="LuxPlay — Opening soon in Boscombe, Bournemouth"
          className="hero-video-main absolute z-[3]"
        />

        <div className="hero-video-soften absolute inset-0 z-[4] pointer-events-none" />
      </div>

      {/* SEO-friendly hidden copy so search engines still index the key info */}
      <h1 className="sr-only">
        LuxPlay — While Everyone Is Closing, We're Opening! 40+ Arcade Games, 3 Level
        Soft Play, Baby Soft Play, Amazing Prizes & Cosy Café. Coming soon
        at Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX.
      </h1>

      {/* Live, clickable CTA sits just below the video */}
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
