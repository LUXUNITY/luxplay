import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#070710]">
      {/* Neon top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      {/* Full-bleed flyer image — text & graphics baked in */}
      <div className="relative w-full">
        <img
          src={arcadeHero}
          alt="LuxPlay — We're Opening! 40+ Arcade Machines, 3-Level Soft Play, Café & Prizes in Boscombe, Bournemouth"
          className="w-full h-auto block"
        />

        {/* Flashing neon overlay on the 50% OFF SOFT PLAY badge (lower-left of image) */}
        <div
          className="absolute pointer-events-none flash-green"
          style={{ left: "3.2%", top: "78%", width: "13.5%", height: "16%" }}
          aria-hidden="true"
        />
        {/* Flashing neon overlay on the DISCOUNTED ARCADE CREDITS badge */}
        <div
          className="absolute pointer-events-none flash-pink"
          style={{ left: "17.5%", top: "78%", width: "14.5%", height: "16%" }}
          aria-hidden="true"
        />
      </div>

      {/* CTAs sit cleanly below the image — no overlap */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-10 md:py-14 text-center bg-[#070710]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8"
        >
          <a
            href="#presale"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-green text-[#070710] hover:shadow-[0_0_60px_rgba(170,255,0,0.7)] shadow-[0_0_30px_rgba(170,255,0,0.4)] transition-all duration-300"
          >
            BUY CREDITS NOW
          </a>
          <a
            href="#softplay"
            className="inline-block font-display text-xl md:text-2xl tracking-widest px-10 md:px-14 py-4 md:py-5 bg-neon-cyan text-[#070710] hover:shadow-[0_0_60px_rgba(0,238,255,0.7)] shadow-[0_0_30px_rgba(0,238,255,0.4)] transition-all duration-300"
          >
            BOOK SOFT PLAY
          </a>
        </motion.div>

        {/* Address */}
        <p className="font-body text-xs md:text-sm tracking-widest text-white/60 uppercase mb-4">
          Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
        </p>

        {/* Feature highlights */}
        <p className="font-display text-lg md:text-2xl tracking-widest">
          <span className="text-neon-pink glow-pink">40+ ARCADE MACHINES</span>
          <span className="text-white/40 mx-3">·</span>
          <span className="text-neon-cyan glow-cyan">3-LEVEL SOFT PLAY</span>
          <span className="text-white/40 mx-3">·</span>
          <span className="text-neon-green glow-green">AMAZING PRIZES</span>
          <span className="text-white/40 mx-3">·</span>
          <span className="text-neon-purple glow-purple">ARTISAN CAFÉ</span>
        </p>
      </div>

      {/* Neon bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-neon-bar z-20" />
    </section>
  );
};

export default HeroSection;
