import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";
import arcadeHero from "@/assets/arcade-hero.jpg";

const FeaturesSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Blurred neon arcade background at low opacity for depth */}
      <img
        src={arcadeHero}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] blur-sm scale-105 pointer-events-none"
      />
      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-background/80" />

      {/* Rainbow top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-rainbow-bar" />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-14 md:py-20 lg:py-24">
        {/* Main layout: portrait left ~40%, content right ~60% */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
          {/* LEFT: Large founder portrait — dominant, ~40% width */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-full md:w-[38%] lg:w-[35%]"
          >
            <div className="relative">
              <img
                src={founderBaz}
                alt="Baz — Founder of LuxPlay"
                className="w-full h-auto rounded-sm shadow-[0_0_60px_hsl(var(--neon-cyan)/0.15)]"
              />
              <div className="absolute bottom-0 left-0 bg-neon-green text-background font-display text-[9px] md:text-[11px] tracking-[0.2em] uppercase font-bold px-4 md:px-5 py-2">
                Baz — Founder
              </div>
              {/* Subtle glow behind portrait */}
              <div className="absolute -inset-4 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-pink/10 rounded-lg -z-10 blur-xl" />
            </div>
          </motion.div>

          {/* RIGHT: Headline + message + values */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-display text-base md:text-xl lg:text-2xl font-bold uppercase tracking-[0.15em] text-foreground/90">
                While Everyone Is Closing —
              </p>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-[0.9] mt-1">
                <span className="text-gradient-rainbow">We're Opening!</span>
              </h2>
            </motion.div>

            {/* Punchy statements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 md:mt-8 lg:mt-10 space-y-2 md:space-y-3"
            >
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
                Yes, the economy is tough.
              </p>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed">
                Yes, the high street is struggling.
              </p>
              <p className="text-foreground text-lg md:text-xl lg:text-2xl leading-relaxed font-bold">
                But we refuse to give up on Bournemouth.
              </p>
            </motion.div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8 md:my-10">
              <div className="flex-1 h-px bg-gradient-to-r from-neon-cyan/40 to-transparent" />
              <div className="w-2 h-2 rotate-45 bg-neon-cyan" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-neon-pink/40" />
            </div>

            {/* About copy */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10"
            >
              LuxPlay is a new family entertainment centre opening right here in Sovereign Centre. Built from the ground up for this community.
            </motion.p>

            {/* What We Stand For — large neon bullets */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase mb-4 md:mb-5 font-bold">
                What We Stand For
              </p>
              <div className="space-y-2 md:space-y-3">
                {[
                  { text: "Local Jobs.", color: "text-neon-green" },
                  { text: "Local Families.", color: "text-neon-cyan" },
                  { text: "Local Community.", color: "text-neon-pink" },
                ].map((item, i) => (
                  <motion.p
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="font-display text-2xl md:text-3xl lg:text-4xl font-bold uppercase"
                  >
                    <span className="text-neon-cyan mr-3">◆</span>
                    <span className={item.color}>{item.text}</span>
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom area: quote block + this is just the beginning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16"
        >
          <p className="text-foreground font-bold text-lg md:text-xl lg:text-2xl mb-6 md:mb-8">
            This is just the beginning.
          </p>

          {/* Quote block — fills space, maintains energy */}
          <div className="bg-muted/40 border-l-4 border-neon-purple rounded-r-lg p-6 md:p-8 lg:p-10 max-w-4xl">
            <p className="text-foreground font-semibold text-base md:text-xl lg:text-2xl leading-relaxed">
              We're not afraid to work hard and build a better Bournemouth. Because while others walk away —{" "}
              <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
            </p>
          </div>
        </motion.div>

        {/* Bottom anchor: LUXPLAY + Opening */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Come in. Have fun. Be part of the journey.
          </p>
          <div className="text-center md:text-right">
            <p className="font-display text-2xl md:text-3xl font-black tracking-[0.15em] uppercase">
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
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
