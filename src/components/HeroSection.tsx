import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#070710]">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Full-bleed flyer image — text is baked in */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <img
          src={arcadeHero}
          alt="LuxPlay — We're Opening! Arcade, Soft Play, Café & Prizes in Boscombe, Bournemouth"
          className="w-full h-auto max-h-[85vh] object-contain"
        />
      </div>

      {/* CTAs + address below image */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-10 md:py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
        >
          <a
            href="#presale"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-green text-[#070710] hover:shadow-[0_0_50px_rgba(170,255,0,0.5)] transition-all duration-300"
          >
            BUY CREDITS NOW
          </a>
          <a
            href="#softplay"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-cyan text-[#070710] hover:shadow-[0_0_50px_rgba(0,238,255,0.5)] transition-all duration-300"
          >
            BOOK SOFT PLAY
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-xs md:text-sm tracking-widest text-white/50 uppercase mt-8"
        >
          Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;

