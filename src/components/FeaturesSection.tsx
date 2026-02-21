import { motion } from "framer-motion";
import designFounder from "@/assets/design-founder.jpg";

const FeaturesSection = () => {
  return (
    <section id="about" className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <img
          src={designFounder}
          alt="LuxPlay - While Everyone Is Closing, We're Opening. Baz, Founder. Local Jobs, Local Families, Local Community."
          className="w-full h-auto"
        />
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
