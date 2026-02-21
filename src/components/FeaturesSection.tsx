import { motion } from "framer-motion";

const FeaturesSection = () => {
  return (
    <section id="about" className="py-16 md:py-24 relative bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* About intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-10 md:mb-14"
        >
          <p className="font-display text-xs tracking-[0.3em] text-neon-cyan uppercase mb-4">
            Why We're Here
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Yes, the economy is tough. Yes, the high street is struggling.
          </p>
          <p className="text-foreground text-lg md:text-xl leading-relaxed mt-3 font-semibold">
            But we refuse to give up on Bournemouth.
          </p>
          <p className="text-muted-foreground text-base md:text-lg mt-3 leading-relaxed">
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
                className="font-display text-xl md:text-3xl font-bold uppercase"
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

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 border-l-4 border-neon-pink rounded-r-lg p-5 md:p-6 max-w-3xl"
        >
          <p className="text-foreground font-medium text-base md:text-lg">
            We're not afraid to work hard and build a better Bournemouth. Because while others walk away —{" "}
            <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
