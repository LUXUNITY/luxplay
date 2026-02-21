import { motion } from "framer-motion";
import founderBaz from "@/assets/founder-baz.jpg";

const FounderSection = () => {
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-12 max-w-3xl mx-auto"
        >
          {/* Founder photo */}
          <div className="flex-shrink-0">
            <div className="relative w-40 md:w-52">
              <img
                src={founderBaz}
                alt="Baz — Founder of LuxPlay"
                className="w-full h-auto rounded-sm"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 bg-neon-green text-background font-display text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold px-3 md:px-4 py-1.5">
                Baz — Founder
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left pt-2">
            <p className="font-display text-xs tracking-[0.3em] text-neon-cyan uppercase mb-4">
              Meet The Founder
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We're not afraid to work hard and build a better Bournemouth. Because while others walk away —
            </p>
            <p className="text-foreground text-base md:text-lg leading-relaxed mt-2 font-semibold">
              we're doubling down on this town.
            </p>
            <p className="text-muted-foreground text-sm md:text-base mt-4">
              LuxPlay is built from the ground up for this community. Local jobs. Local families. Local pride.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSection;
