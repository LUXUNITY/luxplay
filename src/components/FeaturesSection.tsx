import { motion } from "framer-motion";
import { Gamepad2, Flag, Coffee } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Arcade Games",
    subtitle: "35+ Machines",
    color: "text-neon-green",
  },
  {
    icon: Flag,
    title: "Mini Golf",
    subtitle: "9 Holes",
    color: "text-neon-cyan",
  },
  {
    icon: Coffee,
    title: "Café",
    subtitle: "Food & Drinks",
    color: "text-neon-pink",
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-display text-xs tracking-[0.3em] text-neon-cyan uppercase mb-4">What We Stand For</p>
          <div className="space-y-1 mb-8">
            {["Local Jobs.", "Local Families.", "Local Community."].map((item, i) => (
              <motion.p
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="font-display text-xl md:text-2xl font-bold uppercase"
              >
                <span className="text-neon-cyan mr-2">◆</span>
                <span className={i === 0 ? "text-neon-green" : i === 1 ? "text-neon-cyan" : "text-neon-pink"}>
                  {item}
                </span>
              </motion.p>
            ))}
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            LuxPlay is a new family entertainment centre opening right here in Sovereign Centre. Built from the ground up for this community. <strong className="text-foreground">This is just the beginning.</strong>
          </p>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
          <div className="w-2 h-2 rotate-45 bg-neon-cyan" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-neon-border rounded-lg bg-card p-8 text-center"
            >
              <f.icon className={`w-10 h-10 mx-auto mb-3 ${f.color}`} />
              <h3 className={`font-display text-sm uppercase font-bold tracking-wider ${f.color}`}>{f.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{f.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-2xl mx-auto bg-muted/50 border-l-4 border-neon-pink rounded-r-lg p-6"
        >
          <p className="text-foreground font-medium">
            We're not afraid to work hard and build a better Bournemouth. Because while others walk away — <span className="text-neon-cyan font-bold">we're doubling down on this town.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
