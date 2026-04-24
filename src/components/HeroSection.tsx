import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg-arcade.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Full-bleed arcade image */}
      <img
        src={heroBg}
        alt="LuxPlay Arcade — 40+ machines, opening 23 May 2026"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
      />

      {/* Gradient overlay — dark at top for headline, slightly lighter middle, darker bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070710]/95 via-[#070710]/55 to-[#070710]/90" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-24 md:py-32 w-full text-center flex flex-col items-center text-stroke-dark">
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
          className="font-display text-[7rem] sm:text-[10rem] md:text-[16rem] lg:text-[20rem] xl:text-[22rem] leading-[0.82] tracking-wide animate-neon-flash font-black"
        >
          <span className="text-gradient-neon hero-bold-stroke" data-text="WE'RE">WE'RE</span>
          <br />
          <span className="text-gradient-neon hero-bold-stroke" data-text="OPENING!">OPENING!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-display text-xl sm:text-2xl md:text-3xl tracking-widest uppercase mt-6 max-w-4xl"
        >
          <span className="text-neon-green glow-green">
            40+ Arcade Games · 3 Level Soft Play · Amazing Prizes · Cozy Café
          </span>
          <br />
          <span className="text-white glow-pink">Opening 23rd May 2026</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-display text-base sm:text-lg md:text-xl tracking-widest uppercase mt-4 max-w-4xl text-neon-cyan glow-cyan"
        >
          Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-display text-sm sm:text-base md:text-lg tracking-widest uppercase mt-3 max-w-4xl text-neon-cyan glow-cyan"
        >
          Multi-Storey Parking On-Site · Bus Station Right Outside · Fully Indoor — Weather-Proof Fun
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <a
            href="#presale"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-green text-[#070710] animate-btn-flash-green transition-transform duration-200 hover:scale-105 text-center"
          >
            BUY CREDITS NOW
          </a>
          <a
            href="#softplay"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-cyan text-[#070710] animate-btn-flash-cyan transition-transform duration-200 hover:scale-105 text-center"
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
        <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-neon-cyan animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
