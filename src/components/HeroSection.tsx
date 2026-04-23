import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#070710]">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Full-bleed flyer image — text is baked in */}
      <div className="relative w-full">
        <img
          src={arcadeHero}
          alt="LuxPlay — We're Opening! Arcade, Soft Play, Café & Prizes in Boscombe, Bournemouth"
          className="w-full h-auto block"
        />

        {/* CTAs overlaid in the open center-lower area */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] md:bottom-[8%] w-full px-4 flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 pointer-events-auto"
          >
            <a
              href="#presale"
              className="inline-block font-display text-base sm:text-xl md:text-2xl tracking-widest px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 bg-neon-green text-[#070710] hover:shadow-[0_0_50px_rgba(170,255,0,0.6)] transition-all duration-300 text-center"
            >
              BUY CREDITS NOW
            </a>
            <a
              href="#softplay"
              className="inline-block font-display text-base sm:text-xl md:text-2xl tracking-widest px-6 sm:px-10 md:px-14 py-3 sm:py-4 md:py-5 bg-neon-cyan text-[#070710] hover:shadow-[0_0_50px_rgba(0,238,255,0.6)] transition-all duration-300 text-center"
            >
              BOOK SOFT PLAY
            </a>
          </motion.div>
        </div>
      </div>

      {/* Address bar below */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-6 md:py-8 text-center bg-[#070710]">
        <p className="font-body text-xs md:text-sm tracking-widest text-white/60 uppercase">
          Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
        </p>
      </div>

      {/* Neon bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-neon-bar z-20" />
    </section>
  );
};

export default HeroSection;
