import logoAsset from "@/assets/logo-luxplay.png";
import arcadeAsset from "@/assets/real-arcade.jpeg.asset.json";
import softplayAsset from "@/assets/real-softplay-v2.png.asset.json";
import babySoftplayAsset from "@/assets/real-baby-softplay.png.asset.json";
import prizeAsset from "@/assets/real-prize-redemption.jpg.asset.json";

const collage = [
  { img: arcadeAsset.url, label: "ARCADE", bg: "bg-neon-green", text: "text-ink", shadow: "#24B00C" },
  { img: softplayAsset.url, label: "SOFT PLAY", bg: "bg-neon-cyan", text: "text-ink", shadow: "#00A3B8" },
  { img: babySoftplayAsset.url, label: "UNDER 3s", bg: "bg-neon-pink", text: "text-ink", shadow: "#B80AAA" },
  { img: prizeAsset.url, label: "PRIZES", bg: "bg-neon-purple", text: "text-white", shadow: "#7A16BF" },
];

const tiles = [
  {
    href: "#softplay",
    emoji: "🏃",
    line1: "Book",
    line2: "Soft Play",
    bg: "bg-neon-green",
    text: "text-ink",
    shadow: "0 6px 0 0 #24B00C",
  },
  {
    href: "#presale",
    emoji: "🕹️",
    line1: "Arcade",
    line2: "Credits",
    bg: "bg-neon-cyan",
    text: "text-ink",
    shadow: "0 6px 0 0 #00A3B8",
  },
  {
    href: "/parties",
    emoji: "🎂",
    line1: "Party",
    line2: "Packages",
    bg: "bg-neon-pink",
    text: "text-ink",
    shadow: "0 6px 0 0 #B80AAA",
  },
  {
    href: "#deals",
    emoji: "🔥",
    line1: "View",
    line2: "All Deals",
    bg: "bg-neon-purple",
    text: "text-white",
    shadow: "0 6px 0 0 #7A16BF",
  },
];

const LOGO_LETTERS = [
  { char: "L", cls: "text-neon-pink" },
  { char: "U", cls: "text-neon-cyan" },
  { char: "X", cls: "text-neon-green" },
  { char: "P", cls: "text-neon-purple" },
  { char: "L", cls: "text-neon-pink" },
  { char: "A", cls: "text-neon-cyan" },
  { char: "Y", cls: "text-neon-green" },
];

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background overflow-hidden">
      <div className="w-full max-w-md mx-auto">
        {/* Full-bleed four-way venue picture with logo badge */}
        <div className="relative w-full">
          <div className="grid grid-cols-2 gap-0">
            {collage.map((c) => (
              <div key={c.label} className="relative aspect-square overflow-hidden">
                <img
                  src={c.img}
                  alt={`LuxPlay ${c.label}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            ))}
          </div>

          {/* Centre logo badge */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={logoAsset}
              alt="LuxPlay — arcade, soft play and café at Unit 7 Sovereign Centre, Boscombe, Bournemouth"
              className="h-28 w-28 sm:h-32 sm:w-32 rounded-full object-contain bg-background/80 p-1"
              style={{ boxShadow: "0 0 0 3px hsl(var(--background)), 0 0 30px 6px rgba(255,16,240,0.45)" }}
              loading="eager"
            />
          </div>
        </div>

        {/* Wordmark */}
        <div className="relative px-6 pt-6 pb-6 text-center">
          <h1 className="relative font-logo text-5xl sm:text-6xl tracking-tighter mb-2">
            {LOGO_LETTERS.map((l, i) => (
              <span key={i} className={l.cls}>
                {l.char}
              </span>
            ))}
          </h1>
          <p className="relative text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-neon-cyan">
            Bournemouth&apos;s Ultimate Play
          </p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 px-6 mb-8">
          {tiles.map((t) => (
            <a
              key={t.line2}
              href={t.href}
              style={{ boxShadow: t.shadow }}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl py-6 px-4 transition-transform duration-150 active:translate-y-1.5 ${t.bg} ${t.text}`}
            >
              <span className="text-3xl leading-none">{t.emoji}</span>
              <span className="text-center text-sm font-extrabold uppercase leading-tight">
                {t.line1}
                <br />
                {t.line2}
              </span>
            </a>
          ))}
        </div>


        {/* Price snapshot */}
        <div className="px-6 space-y-3 pb-8">
          <div className="grid grid-cols-3 items-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/60 p-4">
            <div className="text-left">
              <p className="text-[11px] font-bold uppercase tracking-tight text-muted-foreground">
                Soft play from
              </p>
              <p className="font-display text-xl text-neon-pink">£4.00</p>
            </div>
            <div className="flex justify-center">
              <div className="animate-[pulse_1.2s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-neon-green px-4 py-3 text-center text-ink shadow-[0_0_24px_6px_rgba(57,255,20,0.5)]">
                <p className="font-display text-2xl leading-none">ADULTS</p>
                <p className="font-display text-2xl leading-none">FREE</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-tight text-muted-foreground">
                Parties from
              </p>
              <p className="font-display text-xl text-neon-cyan">£19.99<span className="text-[11px] align-top">pp</span></p>
            </div>
          </div>


          {/* Deals strip */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            <a
              href="#deals"
              className="flex-shrink-0 w-48 rounded-2xl bg-neon-pink p-4 text-ink"
            >
              <p className="text-[10px] font-extrabold uppercase opacity-70">Play Deal</p>
              <p className="font-display text-2xl">£14.99</p>
              <p className="mt-1 text-[11px] font-semibold leading-tight">Soft play + drink + treat</p>
            </a>
            <a
              href="#deals"
              className="flex-shrink-0 w-48 rounded-2xl bg-neon-cyan p-4 text-ink"
            >
              <p className="text-[10px] font-extrabold uppercase opacity-70">All-In Deal</p>
              <p className="font-display text-2xl">£19.99</p>
              <p className="mt-1 text-[11px] font-semibold leading-tight">Plus 60 credits + food</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
