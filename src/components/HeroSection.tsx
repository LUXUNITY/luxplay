import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#070710]">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar z-20" />

      <div className="relative w-full">
        <img
          src={arcadeHero}
          alt="LuxPlay — We're Opening! 40+ Arcade Machines, 3-Level Soft Play, Café & Prizes in Boscombe, Bournemouth"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute left-1/2 top-[58.5%] -translate-x-1/2 -translate-y-1/2 w-[46%] h-[31%] rounded-[28px] bg-background/0" />

          <div className="absolute left-1/2 top-[58.5%] -translate-x-1/2 -translate-y-1/2 w-[48%] text-center">
            <div className="hero-opening-overlay font-display text-[clamp(3.5rem,8.7vw,10rem)] leading-[0.84]">
              WE’RE
              <br />
              OPENING!
            </div>
          </div>
        </div>

        <div
          className="absolute pointer-events-none flash-green"
          style={{ left: "3.2%", top: "78%", width: "13.5%", height: "16%" }}
          aria-hidden="true"
        />
        <div
          className="absolute pointer-events-none flash-pink"
          style={{ left: "17.5%", top: "78%", width: "14.5%", height: "16%" }}
          aria-hidden="true"
        />
      </div>

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

        <p className="font-body text-xs md:text-sm tracking-widest text-white/60 uppercase mb-4">
          Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
        </p>

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

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-neon-bar z-20" />
    </section>
  );
};

export default HeroSection;
