import { motion } from "framer-motion";
import venueArcade from "@/assets/venue-arcade.jpg";
import venueMinigolf from "@/assets/venue-minigolf.jpg";
import venuePrizes from "@/assets/venue-prizes.jpg";
import venueCafe from "@/assets/venue-cafe.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Rainbow top bar — exactly matching design */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-rainbow-bar z-20" />

      {/* Top spacing + headline — matches PDF: large top padding, left-aligned */}
      <div className="bg-background pt-16 md:pt-24 pb-8 md:pb-10 px-6 md:px-12 lg:px-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-xl md:text-3xl lg:text-4xl font-bold uppercase tracking-wider text-foreground"
        >
          While Everyone Is Closing —
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.95] mt-1"
        >
          <span className="text-gradient-rainbow">We're Opening!</span>
        </motion.h1>
      </div>

      {/* 2x2 venue photo grid — exactly matching PDF layout */}
      <div className="grid grid-cols-2 gap-0.5 px-6 md:px-12 lg:px-20">
        {/* Top left: Arcade Zone */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          <img src={venueArcade} alt="Arcade Zone" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 md:p-4">
            <p className="font-display text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-neon-green">
              Arcade Zone
            </p>
          </div>
        </motion.div>

        {/* Top right: Mini Golf */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          <img src={venueMinigolf} alt="Mini Golf" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 md:p-4">
            <p className="font-display text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-neon-cyan">
              Mini Golf
            </p>
          </div>
        </motion.div>

        {/* Bottom left: Prize Redemption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          <img src={venuePrizes} alt="Prize Redemption" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 md:p-4">
            <p className="font-display text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-neon-yellow">
              Prize Redemption
            </p>
          </div>
        </motion.div>

        {/* Bottom right: Café & Refreshments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden"
        >
          <img src={venueCafe} alt="Café & Refreshments" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3 md:p-4">
            <p className="font-display text-[10px] md:text-xs uppercase font-bold tracking-[0.2em] text-neon-pink">
              Café & Refreshments
            </p>
          </div>
        </motion.div>
      </div>

      {/* Description text — exactly matching PDF */}
      <div className="px-6 md:px-12 lg:px-20 pt-10 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-base md:text-lg max-w-3xl"
        >
          Bournemouth's biggest new family entertainment destination. Arcade games, mini golf, prizes and a café — <strong className="text-foreground">all under one roof. Something for everyone.</strong>
        </motion.p>
      </div>

      {/* 3-column feature strip in bordered card — exactly matching PDF */}
      <div className="px-6 md:px-12 lg:px-20 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-neon-border rounded-lg bg-card grid grid-cols-3 divide-x divide-border max-w-2xl"
        >
          {[
            { icon: "🎮", label: "Arcade Games", sub: "40+ Machines", color: "text-neon-green" },
            { icon: "⛳", label: "Mini Golf", sub: "9 Holes", color: "text-neon-cyan" },
            { icon: "☕", label: "Café", sub: "Food & Drinks", color: "text-neon-pink" },
          ].map((f) => (
            <div key={f.label} className="p-5 md:p-6 text-center">
              <span className="text-xl md:text-2xl">{f.icon}</span>
              <p className={`font-display text-[9px] md:text-xs uppercase font-bold tracking-wider mt-2 ${f.color}`}>
                {f.label}
              </p>
              <p className="text-muted-foreground text-[10px] md:text-xs mt-1 uppercase tracking-wider">
                {f.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pre-launch callout with pink left border — exactly matching PDF */}
      <div className="px-6 md:px-12 lg:px-20 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-muted/50 border-l-4 border-neon-pink rounded-r-lg p-5 md:p-6 max-w-3xl"
        >
          <p className="text-foreground font-semibold text-sm md:text-base">
            Pre-launch passes available now. Buy your credits before we open and save big.{" "}
            <span className="text-neon-pink font-bold">Limited Founder Passes — first come, first served.</span>
          </p>
        </motion.div>
      </div>

      {/* Bottom text — exactly matching PDF */}
      <div className="px-6 md:px-12 lg:px-20 py-6 pb-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-foreground font-semibold text-sm md:text-base"
        >
          40+ arcade machines. 9-hole mini golf. Prize redemption. Café.
          <br />
          <span className="text-muted-foreground font-normal">One incredible venue. Opening May 2026.</span>
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
