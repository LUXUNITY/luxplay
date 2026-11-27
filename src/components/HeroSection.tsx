import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PhotoSlideshow from "@/components/PhotoSlideshow";
import MembershipPromotion from "@/components/MembershipPromotion";
import logoAsset from "@/assets/logo-luxplay.png";

const tiles = [
  { href: "/softplay", emoji: "🛝", title: "BOOK SOFT PLAY", detail: "Big kids & little ones", cls: "bg-neon-cyan hover:bg-neon-cyan/90" },
  { href: "/arcade-credits", emoji: "🕹️", title: "ARCADE CREDITS", detail: "Let the games begin!", cls: "bg-neon-green hover:bg-neon-green/90" },
  { href: "/christmas", emoji: "🎄", title: "WINTER WONDERLAND", detail: "Christmas magic · Coming soon", cls: "bg-card hover:bg-muted border-2 border-neon-purple text-foreground home-christmas" },
  { href: "/parties", emoji: "🎂", title: "PARTY PACKAGES", detail: "Their biggest day. Our biggest fun.", cls: "bg-neon-pink hover:bg-neon-pink/90" },
];
const letters = ["text-neon-pink", "text-neon-cyan", "text-neon-green", "text-neon-purple", "text-neon-pink", "text-neon-cyan", "text-neon-green"];

export default function HeroSection() {
  return (
    <section className="home-hub w-full overflow-hidden bg-background pb-8 text-center">
      <header className="relative mx-auto max-w-3xl">
        <PhotoSlideshow />
        <div className="relative mx-auto -mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-background">
          <img src={logoAsset} alt="LuxPlay logo" className="h-full w-full object-contain" />
        </div>
        <div className="home-logo-wrap relative mx-auto mt-3 inline-block"><span className="home-sparkle home-sparkle-a" aria-hidden="true">✨</span><span className="home-sparkle home-sparkle-b" aria-hidden="true">⭐</span><span className="home-sparkle home-sparkle-c" aria-hidden="true">💖</span>
        <h1 className="home-cute-logo font-logo" aria-label="LUXPLAY">{"LUXPLAY".split("").map((letter, i) => <span key={i} aria-hidden="true" className={letters[i]} style={{ animationDelay: `${i * 0.12}s` }}>{letter}</span>)}</h1></div>
        <ul className="home-fun-list mx-auto mt-5 flex max-w-md flex-wrap justify-center gap-2.5 px-4 font-body text-sm" aria-label="What's inside LuxPlay">
          <li className="bg-neon-cyan text-ink" style={{ animationDelay: "0.0s" }}><span className="home-fun-emoji" aria-hidden="true">🕹️</span> 60+ arcade games</li>
          <li className="bg-neon-pink text-ink" style={{ animationDelay: "0.3s" }}><span className="home-fun-emoji" aria-hidden="true">🏰</span> 3-level soft play</li>
          <li className="bg-neon-green text-ink" style={{ animationDelay: "0.6s" }}><span className="home-fun-emoji" aria-hidden="true">🍼</span> Baby soft play</li>
          <li className="bg-neon-purple text-ink" style={{ animationDelay: "0.8999999999999999s" }}><span className="home-fun-emoji" aria-hidden="true">🎁</span> Prizes to win</li>
          <li className="bg-neon-cyan text-ink" style={{ animationDelay: "1.2s" }}><span className="home-fun-emoji" aria-hidden="true">🍔</span> Delicious hot food</li>
        </ul>
        <p className="mt-3 inline-flex items-center gap-1 font-body text-xs text-muted-foreground"><MapPin size={14} /> Sovereign Centre · Boscombe, Bournemouth</p>
      </header>
      <nav aria-label="Plan your LuxPlay visit" className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-4 px-5">
        <div className="col-span-2"><MembershipPromotion /></div>
        {tiles.map(t => <Button key={t.href} asChild variant="secondary" className={`home-offer-button relative flex h-auto min-h-40 flex-col justify-center gap-2 whitespace-normal rounded-lg p-4 text-ink ${t.cls}`}>
          <Link to={t.href}>
            <ArrowUpRight className="absolute right-3 top-3" aria-hidden="true" />
            <span className="home-tile-emoji text-4xl" aria-hidden="true">{t.emoji}</span>
            <span className="font-display text-2xl leading-none">{t.title}</span>
            <span className="font-body text-[11px] font-bold leading-relaxed">{t.detail}</span>
          </Link>
        </Button>)}
        <Button asChild variant="outline" className="home-offer-button col-span-2 flex h-auto min-h-24 flex-col gap-2 whitespace-normal border-2 border-neon-cyan bg-neon-cyan/5 px-5 py-4 text-neon-cyan hover:bg-neon-cyan/10"><Link to="/arcade-hire"><span className="font-display">🎮 ARCADE HIRE <ArrowUpRight className="inline-block" size={20} /></span><span className="font-body text-xs">Build Your Party Arcade · Host a Machine</span></Link></Button>
        <Button asChild variant="outline" className="col-span-2 min-h-12 whitespace-normal border-neon-purple font-body font-bold text-foreground"><Link to="/about">Explore LuxPlay & meet the team <ArrowUpRight /></Link></Button>
      </nav>
    </section>
  );
}
