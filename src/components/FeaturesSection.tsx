import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";

const FeaturesSection = () => {
  return (
    <section id="about" className="py-16 md:py-20 relative">
      {/* Rainbow top divider */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar" />

      <div className="px-6 md:px-12 lg:px-20">
        {/* Headline — same as PDF: WHILE EVERYONE IS CLOSING — WE'RE OPENING! */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 md:pt-12 pb-10 md:pb-14"
        >
          <p className="font-display text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-wider text-foreground">
            While Everyone Is Closing —
          </p>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] mt-1">
            <span className="text-gradient-rainbow">We're Opening!</span>
          </h2>
        </motion.div>

        {/* Founder block — FULL WIDTH, portrait left + text right — exactly matching PDF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-14 md:mb-20"
        >
          {/* Large founder photo — must remain dominant, not reduced */}
          <div className="flex-shrink-0">
            <div className="relative w-44 md:w-64 lg:w-72">
              <img
                src={founderBaz}
                alt="Baz — Founder of LuxPlay"
                className="w-full h-auto rounded-sm"
              />
              <div className="absolute bottom-0 left-0 bg-neon-green text-background font-display text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold px-3 md:px-4 py-1.5">
                Baz — Founder
              </div>
            </div>
          </div>

          {/* Text to the right of founder — exactly matching PDF copy */}
          <div className="flex-1 pt-0 md:pt-4">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Yes, the economy is tough.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-3">
              Yes, the high street is struggling.
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed mt-3 font-bold">
              But we refuse to give up on Bournemouth.
            </p>
          </div>
        </motion.div>

        {/* Cyan diamond divider — exactly matching PDF */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-neon-cyan" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        </div>

        {/* About text — exactly matching PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <p className="text-muted-foreground text-base md:text-lg">
            LuxPlay is a new family entertainment centre opening right here in Sovereign Centre. Built from the ground up for this community.
          </p>
        </motion.div>

        {/* What We Stand For — exactly matching PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="font-display text-[10px] md:text-xs tracking-[0.3em] text-muted-foreground uppercase mb-5 font-bold">
            What We Stand For
          </p>
          <div className="space-y-2">
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
                transition={{ delay: i * 0.12 }}
                className="font-display text-xl md:text-2xl lg:text-3xl font-bold uppercase"
              >
                <span className="text-neon-cyan mr-3">◆</span>
                <span className={item.color}>{item.text}</span>
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* "This is just the beginning." — exactly matching PDF */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-foreground font-bold text-base md:text-lg mb-8"
        >
          This is just the beginning.
        </motion.p>

        {/* Quote block with purple/pink left border — exactly matching PDF */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 border-l-4 border-neon-purple rounded-r-lg p-5 md:p-6 max-w-3xl"
        >
          <p className="text-foreground font-semibold text-base md:text-lg">
            We're not afraid to work hard and build a better Bournemouth. Because while others walk away —{" "}
            <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
