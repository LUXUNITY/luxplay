import { motion } from "framer-motion";
import arcadeHero from "@/assets/arcade-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src={arcadeHero}
          alt="LuxPlay opening with arcade machines, soft play, prizes and café"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/15 to-background/78" />
        <div className="hero-circuit-overlay absolute inset-0" />
      </div>

      <div className="absolute top-0 left-0 right-0 z-20 h-1.5 bg-gradient-neon-bar" />

      <div className="relative z-10 min-h-[100svh] px-4 pb-8 pt-16 sm:px-6 md:px-10 lg:px-16 lg:pt-20">
        <div className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1500px] flex-col justify-between gap-6 lg:gap-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-10">
            <div className="max-w-[760px] pt-4 sm:pt-8 lg:pt-12">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-3 font-body text-[11px] font-semibold uppercase tracking-[0.42em] text-white/70 sm:text-xs"
              >
                40+ Arcade Machines • 3-Level Soft Play • Amazing Prizes • Café Treats
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.05 }}
                className="hero-heading font-display text-[clamp(5rem,23vw,12rem)] leading-[0.82] [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]"
              >
                WE&apos;RE
                <br />
                OPENING!
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="mt-3 flex flex-wrap gap-2.5"
              >
                <span className="border border-neon-pink/65 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-pink glow-pink sm:text-lg">
                  ARCADE
                </span>
                <span className="border border-neon-cyan/65 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-cyan glow-cyan sm:text-lg">
                  SOFT PLAY
                </span>
                <span className="border border-neon-green/65 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-green glow-green sm:text-lg">
                  PRIZES
                </span>
                <span className="border border-neon-purple/65 bg-background/55 px-3 py-2 font-display text-base tracking-widest text-neon-purple glow-purple sm:text-lg">
                  CAFÉ
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              <div className="hero-panel hero-panel-green border p-4 sm:p-5" style={{ borderColor: "rgba(170,255,0,0.55)" }}>
                <p className="font-display text-3xl leading-none text-neon-green glow-green sm:text-4xl">50% OFF</p>
                <p className="mt-1 font-display text-lg tracking-widest text-white sm:text-xl">SOFT PLAY</p>
                <p className="mb-4 mt-2 font-body text-xs uppercase tracking-[0.26em] text-white/68 sm:text-sm">
                  Opening day sessions at half price
                </p>
                <a
                  href="#softplay"
                  className="block border border-neon-green bg-neon-green px-4 py-3 text-center font-display text-xl tracking-widest text-background transition-transform duration-200 hover:scale-[1.02]"
                >
                  BOOK SOFT PLAY
                </a>
              </div>

              <div className="hero-panel hero-panel-pink border p-4 sm:p-5" style={{ borderColor: "rgba(255,0,204,0.55)" }}>
                <p className="font-display text-3xl leading-none text-neon-pink glow-pink sm:text-4xl">DISCOUNTED</p>
                <p className="mt-1 font-display text-2xl tracking-widest text-white sm:text-3xl">ARCADE CREDITS</p>
                <p className="mb-4 mt-2 font-body text-xs uppercase tracking-[0.26em] text-white/68 sm:text-sm">
                  Grab opening offers before launch day
                </p>
                <a
                  href="#presale"
                  className="block border border-neon-pink bg-neon-pink px-4 py-3 text-center font-display text-xl tracking-widest text-background transition-transform duration-200 hover:scale-[1.02]"
                >
                  BUY CREDITS NOW
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="hero-panel border border-white/10 p-4 sm:p-5"
          >
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <p className="font-body text-xs uppercase tracking-[0.25em] text-white/68 sm:text-sm">
                Unit 7, Sovereign Centre · Boscombe · Bournemouth · BH1 4SX
              </p>
              <p className="font-body text-xs uppercase tracking-[0.25em] text-white/58 sm:text-sm">
                Electro-galaxy launch • Big energy • Family fun all day
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-gradient-neon-bar" />
    </section>
  );
};

export default HeroSection;
