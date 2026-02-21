import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";
import arcadeHero from "@/assets/arcade-hero.jpg";

const FeaturesSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Blurred arcade background */}
      <img
        src={arcadeHero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.1] blur-sm scale-105 pointer-events-none"
      />
      <div className="absolute inset-0 bg-background/85" />

      {/* Rainbow top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-rainbow-bar" />

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-20 lg:py-24">
        {/* ===== Headline above everything ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <p className="font-display text-base md:text-xl lg:text-2xl font-bold uppercase tracking-[0.15em] text-foreground/80">
            While Everyone Is Closing —
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-8xl font-black uppercase leading-[0.85] mt-1">
            <span className="text-gradient-rainbow">We're Opening!</span>
          </h2>
        </motion.div>

        {/* ===== Portrait + statements side by side ===== */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-14 lg:gap-20 items-start">
          {/* Portrait — natural aspect ratio, no cropping, no object-cover */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-sm md:max-w-none md:w-[35%] lg:w-[32%] flex-shrink-0 mx-auto md:mx-0"
          >
            <div className="relative">
              <img
                src={founderBaz}
                alt="Baz — Founder of LuxPlay"
                className="w-full h-auto rounded-sm"
              />
              <div className="absolute bottom-0 left-0 bg-neon-green text-background font-display text-[9px] md:text-[11px] tracking-[0.2em] uppercase font-bold px-4 md:px-5 py-2">
                Baz — Founder
              </div>
            </div>
          </motion.div>

          {/* Statements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 flex flex-col justify-center"
          >
            <div className="space-y-4 md:space-y-5">
              <p className="text-muted-foreground text-lg md:text-2xl lg:text-3xl">
                Yes, the economy is tough.
              </p>
              <p className="text-muted-foreground text-lg md:text-2xl lg:text-3xl">
                Yes, the high street is struggling.
              </p>
              <p className="text-foreground text-xl md:text-3xl lg:text-4xl font-bold">
                But we refuse to give up on Bournemouth.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ===== Divider ===== */}
        <div className="flex items-center gap-4 my-12 md:my-16">
          <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/40 to-transparent" />
          <div className="w-2.5 h-2.5 rotate-45 bg-neon-cyan" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-pink/40" />
        </div>

        {/* ===== About + Values side by side ===== */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl leading-relaxed mb-8">
              LuxPlay is a new family entertainment centre opening right here in Sovereign Centre. Built from the ground up for this community.
            </p>
            <p className="text-foreground font-bold text-2xl md:text-3xl lg:text-4xl">
              This is just the beginning.
            </p>
          </motion.div>

          {/* Neon value bullets — large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase mb-5 font-bold">
              What We Stand For
            </p>
            <div className="space-y-3 md:space-y-4">
              {[
                { text: "Local Jobs.", color: "text-neon-green" },
                { text: "Local Families.", color: "text-neon-cyan" },
                { text: "Local Community.", color: "text-neon-pink" },
              ].map((item, i) => (
                <motion.p
                  key={item.text}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="font-display text-2xl md:text-4xl lg:text-5xl font-bold uppercase"
                >
                  <span className="text-neon-cyan mr-3">◆</span>
                  <span className={item.color}>{item.text}</span>
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== Quote block ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 md:mt-20"
        >
          <div className="bg-muted/40 border-l-4 border-neon-purple rounded-r-lg p-6 md:p-8 lg:p-10">
            <p className="text-foreground font-semibold text-lg md:text-2xl lg:text-3xl leading-relaxed">
              We're not afraid to work hard and build a better Bournemouth. Because while others walk away —{" "}
              <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
            </p>
          </div>
        </motion.div>

        {/* ===== LUXPLAY anchor ===== */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Come in. Have fun. Be part of the journey.
          </p>
          <div className="text-center md:text-right">
            <p className="font-display text-2xl md:text-4xl font-black tracking-[0.15em] uppercase">
              {"LUXPLAY".split("").map((char, i) => {
                const colors = [
                  "text-neon-green",
                  "text-neon-cyan",
                  "text-neon-blue",
                  "text-neon-purple",
                  "text-neon-pink",
                  "text-neon-yellow",
                ];
                return (
                  <span key={i} className={colors[i]}>
                    {char}
                  </span>
                );
              })}
            </p>
            <p className="font-display text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase mt-1">
              Opening May 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
