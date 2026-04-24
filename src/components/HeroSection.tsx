import { motion } from "framer-motion";
import arcadeHero from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Full-bleed arcade image */}
      <img
        src={arcadeHero}
        alt="LuxPlay Arcade — 40+ machines, opening May 2026"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Heavy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070710] via-[#070710]/70 to-[#070710]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070710]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl md:text-4xl lg:text-5xl tracking-wider text-white/90 mb-1"
        >
          WHILE EVERYONE IS CLOSING —
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-display text-7xl md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-wide"
        >
          <span className="text-gradient-neon">WE'RE</span>
          <br />
          <span className="text-gradient-neon">OPENING!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-body text-sm md:text-base tracking-widest text-white/60 uppercase mt-6"
        >
          40+ Arcade Machines · Soft Play · Prizes · Café — Opening May 2026
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-body text-xs md:text-sm tracking-widest text-white/40 uppercase mt-2"
        >
          Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <a
            href="#presale"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-green text-[#070710] hover:shadow-[0_0_50px_rgba(170,255,0,0.5)] transition-all duration-300 text-center"
          >
            BUY CREDITS NOW
          </a>
          <a
            href="#softplay"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-cyan text-[#070710] hover:shadow-[0_0_50px_rgba(0,238,255,0.5)] transition-all duration-300 text-center"
          >
            BOOK SOFT PLAY
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-neon-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
