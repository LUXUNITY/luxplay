import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";

const FeaturesSection = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Founder block — matching IMG_5735 layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-16"
        >
          {/* Founder photo */}
          <div className="flex-shrink-0">
            <div className="relative w-48 md:w-56">
              <img
                src={founderBaz}
                alt="Baz — Founder of LuxPlay"
                className="w-full h-auto rounded-sm"
              />
              <div className="absolute bottom-0 left-0 bg-neon-green text-background font-display text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-1.5">
                Baz — Founder
              </div>
            </div>
          </div>

          {/* Text beside founder */}
          <div className="flex-1 pt-2">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Yes, the economy is tough.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mt-2">
              Yes, the high street is struggling.
            </p>
            <p className="text-foreground text-lg leading-relaxed mt-2 font-semibold">
              But we refuse to give up on Bournemouth.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-neon-cyan" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        </div>

        {/* About text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10"
        >
          <p className="text-muted-foreground text-lg">
            LuxPlay is a new family entertainment centre opening right here in Sovereign Centre. Built from the ground up for this community.
          </p>
        </motion.div>

        {/* What We Stand For */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="font-display text-xs tracking-[0.3em] text-neon-cyan uppercase mb-5">
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
                className="font-display text-xl md:text-2xl font-bold uppercase"
              >
                <span className="text-neon-cyan mr-3">◆</span>
                <span className={item.color}>{item.text}</span>
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-foreground font-semibold text-lg mb-10"
        >
          This is just the beginning.
        </motion.p>

        {/* Quote block with pink left border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 border-l-4 border-neon-pink rounded-r-lg p-6 max-w-3xl"
        >
          <p className="text-foreground font-medium text-lg">
            We're not afraid to work hard and build a better Bournemouth. Because while others walk away —{" "}
            <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
