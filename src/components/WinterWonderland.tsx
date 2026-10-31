const WinterWonderland = () => (
  <section id="winter-wonderland" aria-labelledby="winter-title" className="winter-wonderland relative isolate mb-8 overflow-hidden px-5 pb-7 pt-12 text-center">
    <div className="winter-lights" aria-hidden="true">
      {Array.from({ length: 11 }, (_, i) => <span key={i} />)}
    </div>
    <div className="winter-snow" aria-hidden="true">
      {Array.from({ length: 16 }, (_, i) => <span key={i}>❄</span>)}
    </div>
    <div className="relative z-10">
      <p className="mb-3 text-xs font-extrabold uppercase text-neon-green">Something magical is on its way…</p>
      <div aria-hidden="true" className="winter-icons mb-2 flex items-center justify-center gap-5 text-4xl">
        <span>🎄</span><span className="text-5xl">🎅</span><span>🎁</span>
      </div>
      <p className="mb-1 font-logo text-2xl text-neon-pink">LUXPLAY</p>
      <h2 id="winter-title" className="winter-title font-display leading-[0.9]">
        <span className="block text-6xl text-foreground">WINTER</span>
        <span className="block text-5xl text-neon-cyan">WONDERLAND</span>
      </h2>
      <p className="winter-coming mx-auto mb-4 mt-6 w-fit border-y-2 border-neon-green px-5 py-2 font-display text-3xl text-neon-green">✨ COMING SOON ✨</p>
      <p className="mx-auto max-w-xs text-sm font-bold leading-relaxed text-foreground">Stay tuned for more information!</p>
      <p className="mt-3 text-2xl" aria-hidden="true">❄️ 🦌 🎄 🦌 ❄️</p>
    </div>
  </section>
);

export default WinterWonderland;