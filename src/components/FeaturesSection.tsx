import { motion } from "framer-motion";
import founderBazAsset from "@/assets/baz-new.jpg.asset.json";
import founderMartinAsset from "@/assets/founder-martin-clean.png.asset.json";
import logoLuxPlay from "@/assets/logo-luxplay.png";
import logoCafeLux from "@/assets/logo-cafe-lux.png";
import logoLuxKey from "@/assets/logo-luxkey.png";
import logoMasterclass from "@/assets/logo-masterclass-exteriors.png.asset.json";

const sharedBusinesses = [
  { name: "LuxPlay", logo: logoLuxPlay, scale: 1 },
  { name: "Cafè Lux", logo: logoCafeLux, scale: 1 },
  { name: "LuxKey", logo: logoLuxKey, scale: 1 },
  { name: "Masterclass Exteriors", logo: logoMasterclass.url, scale: 1.1 },
];

const founders = [
  {
    img: founderBazAsset.url,
    objectPos: "object-top",
    name: "Baz Roushbaiani",
    role: "Owner & Director",
  },


  {
    img: founderMartinAsset.url,
    objectPos: "object-center",
    zoom: 1.5,
    offsetY: 30,
    name: "Martin MacGillivray",
    role: "Owner & Director",
  },
];


const FeaturesSection = () => {
  return (
    <section id="about" className="relative bg-muted py-16 md:py-24">
      <div className="px-6 max-w-md mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-extrabold tracking-tighter text-foreground text-center mb-2"
        >
          LUXPLAY IS OPEN
        </motion.h2>
        <p className="font-body text-sm text-foreground/70 text-center mb-10">
          Built for Bournemouth. Local jobs, local families, local community.
        </p>

        {/* Founders */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {founders.map((f) => (
            <div key={f.name} className="flex flex-col items-center text-center">
              <div
                className="w-full aspect-[3/4] overflow-hidden rounded-3xl mb-3"
                style={{ boxShadow: "0 8px 0 0 #241C3D" }}
              >


                <img
                  src={f.img}
                  alt={`${f.name} — LuxPlay`}
                  className={`w-full h-full object-cover ${f.objectPos}`}
                  style={f.zoom ? { transform: `translateY(${f.offsetY ?? 0}px) scale(${f.zoom})` } : undefined}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="font-display text-sm font-extrabold tracking-tight text-foreground">{f.name}</p>
              <p className="font-body text-xs text-foreground/50">{f.role}</p>
            </div>
          ))}
        </div>

        {/* Shared founder quote */}
        <p className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-center text-neon-cyan leading-snug mb-10 px-2">
          “We&apos;re here to build a better Bournemouth — real jobs, safe fun and somewhere
          families are proud to call their own.”
        </p>


        {/* Shared co-owners */}
        <div className="bg-card rounded-3xl p-5" style={{ boxShadow: "0 8px 0 0 #241C3D" }}>
          <p className="font-display text-xs font-extrabold tracking-wide text-foreground/50 text-center mb-4">
            CO-OWNERS OF
          </p>
          <div className="grid grid-cols-2 gap-4 items-center">
            {sharedBusinesses.map((b) => (
              <div key={b.name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img
                    src={b.logo}
                    alt={`${b.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    style={{ transform: `scale(${b.scale})` }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="font-display text-xs font-extrabold text-foreground text-center leading-tight">
                  {b.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
