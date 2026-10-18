import { Coffee, Flame, Gamepad2, Snowflake, Soup, Sparkles } from "lucide-react";

const treats = [
  { Icon: Soup, title: "HOT FOOD", colour: "text-neon-cyan" },
  { Icon: Coffee, title: "WARM CUPPAS", colour: "text-neon-pink" },
  { Icon: Gamepad2, title: "BIG FUN", colour: "text-neon-green" },
];

const HeatedVenueBanner = () => (
  <aside className="heat-banner relative isolate w-full overflow-hidden border-b-4 border-neon-pink text-center" aria-label="Fully heated venue">
    <div className="relative mx-auto max-w-xl px-4 pb-4 pt-3">
      <p className="flex items-center justify-center gap-2 font-body text-xs font-extrabold uppercase text-foreground">
        <Snowflake className="heat-shiver h-4 w-4 text-neon-cyan" aria-hidden="true" /> Leave the cold at the door!
      </p>
      <div className="mt-2 flex items-center justify-center gap-2">
        <Flame className="heat-flame h-12 w-9 shrink-0 fill-neon-pink text-neon-cyan sm:h-16 sm:w-12" aria-hidden="true" />
        <p className="font-display text-4xl leading-none text-foreground sm:text-5xl">
          OUR HEATERS<br /><span className="heat-headline inline-block text-neon-cyan">ARE ON!</span>
        </p>
        <Flame className="heat-flame heat-delay h-12 w-9 shrink-0 fill-neon-pink text-neon-cyan sm:h-16 sm:w-12" aria-hidden="true" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-y border-neon-pink/40 py-3">
        {treats.map(({ Icon, title, colour }, i) => (
          <div key={title} className={`heat-treat heat-treat-${i} flex flex-col items-center gap-2 ${colour}`}>
            <div className="heat-steam relative"><Icon className="h-9 w-9" strokeWidth={2.5} aria-hidden="true" /></div>
            <p className="font-display text-xl leading-none sm:text-2xl">{title}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-foreground">
        Kids playing. Arcade buzzing.<br />
        <strong className="font-extrabold text-neon-cyan">Hot food, tea &amp; coffee waiting.</strong><br />
        Come warm up and catch up with friends &amp; family.
      </p>
    </div>
    <div className="overflow-hidden bg-neon-cyan py-2 text-ink" aria-hidden="true">
      <div className="heat-ticker flex w-max">
        {[0, 1].map((copy) => <div key={copy} className="flex shrink-0 items-center gap-4 px-4 font-display text-xl"><Sparkles className="h-4 w-4" /> WARM INSIDE · WILD ABOUT PLAY <Coffee className="h-4 w-4" /> GOOD FOOD · GREAT COMPANY</div>)}
      </div>
    </div>
  </aside>
);

export default HeatedVenueBanner;