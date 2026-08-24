const AppHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <header className="px-5 pt-6 pb-4">
    <h1 className="font-display text-4xl tracking-wider text-gradient-neon">{title}</h1>
    {subtitle && (
      <p className="font-body text-sm text-white/60 mt-1">{subtitle}</p>
    )}
  </header>
);

export default AppHeader;
