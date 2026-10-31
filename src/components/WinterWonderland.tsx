const WinterWonderland = () => (
  <section id="winter-wonderland" aria-labelledby="winter-title" className="winter-wonderland relative isolate mb-8 overflow-hidden px-4 pb-0 pt-14 text-center">
    <div className="winter-lights" aria-hidden="true">
      {Array.from({ length: 11 }, (_, i) => <span key={i} />)}
    </div>
    <div className="winter-snow" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => <span key={i}>❄</span>)}
    </div>
    <div className="winter-baubles" aria-hidden="true"><span>❄</span><span>✦</span></div>
    <div className="relative z-10">
      <p className="winter-eyebrow mb-5 text-xs font-extrabold uppercase text-neon-green">A little sparkle. A LOT of magic.</p>
      <p className="mb-3 font-logo text-3xl text-neon-pink">LUXPLAY</p>
      <h2 id="winter-title" className="winter-title font-display">
        <span className="winter-word block">WINTER</span>
        <span className="wonder-word block">WONDER</span>
        <span className="land-word block">LAND<span className="winter-title-star" aria-hidden="true">✦</span></span>
      </h2>
      <p className="winter-coming mx-auto mb-5 mt-5 w-fit px-6 py-2 font-display text-4xl text-ink">COMING SOON</p>
      <p className="mx-auto max-w-xs text-base font-extrabold leading-relaxed text-foreground">Something magical is on its way…</p>
      <p className="mx-auto mt-2 max-w-xs text-sm font-semibold leading-relaxed text-neon-cyan">Stay tuned for more information!</p>
      <div className="winter-scene" aria-hidden="true">
        <div className="winter-tree"><span>★</span><i /><i /><i /><b>● ✦ ●</b></div>
        <div className="winter-icons flex items-end justify-center gap-2"><span className="text-4xl">🎁</span><span className="text-7xl">🎅</span><span className="text-4xl">🎁</span></div>
        <div className="winter-tree"><span>★</span><i /><i /><i /><b>● ✦ ●</b></div>
      </div>
    </div>
    <div className="winter-ticker -mx-4 overflow-hidden py-2" aria-hidden="true"><div className="flex w-max font-display text-xl">{Array.from({ length: 4 }, (_, i) => <span className="px-4" key={i}>✦ BIG MAGIC · LITTLE MOMENTS · LUXPLAY CHRISTMAS ✦</span>)}</div></div>
  </section>
);

export default WinterWonderland;