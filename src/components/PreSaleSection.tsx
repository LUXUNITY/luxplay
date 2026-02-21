import { motion } from "framer-motion";
import designPresale from "@/assets/design-presale.jpg";

const PreSaleSection = () => {
  return (
    <section id="presale" className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <img
          src={designPresale}
          alt="LuxPlay Pre-Launch Exclusive - Buy Your Credits Now. £10 for 100 credits, £25 for 300 credits, £75 Founder Pass for 1000 credits."
          className="w-full h-auto"
        />
      </motion.div>
    </section>
  );
};

export default PreSaleSection;
