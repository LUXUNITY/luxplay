import { motion } from "framer-motion";
import designPresaleAlt from "@/assets/design-presale-alt.jpg";

const FooterSection = () => {
  return (
    <footer className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <img
          src={designPresaleAlt}
          alt="LuxPlay - Scan to buy your credits. Opening May 2026. Sovereign Centre, Boscombe."
          className="w-full h-auto"
        />
      </motion.div>
    </footer>
  );
};

export default FooterSection;
