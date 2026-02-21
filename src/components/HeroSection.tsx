import { motion } from "framer-motion";
import designHero from "@/assets/design-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Rainbow top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar z-20" />

      {/* Full design image displayed as the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <img
          src={designHero}
          alt="LuxPlay Arcade - Bournemouth's biggest new family entertainment destination featuring arcade zone, mini golf, prize redemption, and café"
          className="w-full h-auto"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
