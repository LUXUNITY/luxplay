import logoAsset from "@/assets/logo-luxplay.png";

const tiles = [
  {
    href: "#softplay",
    emoji: "🏃",
    line1: "Book",
    line2: "Soft Play",
    bg: "bg-neon-green",
    text: "text-foreground",
    shadow: "0 8px 0 0 #24B00C",
  },
  {
    href: "#presale",
    emoji: "🕹️",
    line1: "Arcade",
    line2: "Credits",
    bg: "bg-neon-cyan",
    text: "text-foreground",
    shadow: "0 8px 0 0 #00A3B8",
  },
  {
    href: "/parties",
    emoji: "🎂",
    line1: "Party",
    line2: "Packages",
    bg: "bg-neon-pink",
    text: "text-white",
    shadow: "0 8px 0 0 #B80AAA",
  },
  {
    href: "#deals",
    emoji: "🔥",
    line1: "View",
    line2: "All Deals",
    bg: "bg-muted",
    text: "text-foreground",
    shadow: "0 8px 0 0 #E2E8F0",
  },
];

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background overflow-hidden">
      <div className="w-full max-w-md mx-auto">
        {/* Hero */}
        <div className="relative px-6 pt-10 pb-8 text-center overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-neon-green opacity-30" />
          <div className="pointer-events-none absolute top-24 -left-6 h-20 w-20 rotate-12 rounded-2xl bg-neon-cyan opacity-20" />

          <img
            src={logoAsset}
            alt="LuxPlay — arcade, soft play and café at Unit 7 Sovereign Centre, Boscombe, Bournemouth"
            className="relative mx-auto mb-4 h-20 w-20 rounded-full object-contain"
            loading="eager"
          />
          <h1 className="relative font-display text-5xl sm:text-6xl tracking-tighter text-neon-pink mb-2">
            LUXPLAY
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
              className={`aspect-square flex flex-col items-center justify-center rounded-3xl p-4 transition-transform duration-150 active:translate-y-1.5 ${t.bg} ${t.text}`}
            >
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background text-2xl">
                {t.emoji}
              </span>
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
          <div className="flex items-center justify-between rounded-3xl border-2 border-dashed border-border bg-muted/60 p-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-tight text-muted-foreground">
                Under 3s
              </p>
              <p className="font-display text-xl text-neon-pink">£4.00</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase tracking-tight text-muted-foreground">
                Parties from
              </p>
              <p className="font-display text-xl text-neon-cyan">£19.99pp</p>
            </div>
          </div>

          {/* Deals strip */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            <a
              href="#deals"
              className="flex-shrink-0 w-48 rounded-3xl bg-gradient-to-br from-neon-pink to-neon-purple p-4 text-white"
            >
              <p className="text-[10px] font-bold uppercase opacity-80">Play Deal</p>
              <p className="font-display text-2xl">£14.99</p>
              <p className="mt-1 text-[11px] leading-tight">Soft play + drink + treat</p>
            </a>
            <a
              href="#deals"
              className="flex-shrink-0 w-48 rounded-3xl bg-gradient-to-br from-neon-cyan to-[#7DF9FF] p-4 text-white"
            >
              <p className="text-[10px] font-bold uppercase opacity-80">All-In Deal</p>
              <p className="font-display text-2xl">£19.99</p>
              <p className="mt-1 text-[11px] leading-tight">Plus 60 credits + food</p>
            </a>
          </div>

          <a
            href="/loyalty"
            className="block w-full rounded-3xl border-2 border-neon-green py-4 text-center"
          >
            <span className="text-sm font-bold">
              Every 7th soft play <span className="text-neon-pink">FREE</span> with LUXPLAY Rewards
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
