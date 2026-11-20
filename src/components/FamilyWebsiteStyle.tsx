import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const familyPages = new Set([
  "/", "/memberships", "/softplay", "/arcade-credits", "/christmas",
  "/about", "/parties", "/soft-play-bournemouth", "/arcade-bournemouth",
  "/things-to-do-in-bournemouth-with-kids", "/things-to-do-in-bournemouth",
]);

export default function FamilyWebsiteStyle({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (document.getElementById("family-website-fonts")) return;
    const link = document.createElement("link");
    link.id = "family-website-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Lilita+One&family=Chewy&family=Baloo+2:wght@600;700;800&family=Nunito:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);
  const family = familyPages.has(pathname);
  return (
    <div className={family ? "family-website" : undefined}>
      {family && (
        <div className="xmas-scene" aria-hidden="true">
          <div className="xmas-snow">{Array.from({ length: 40 }, (_, i) => <span key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${-(i % 7)}s` }}>{i % 3 ? "❄" : "•"}</span>)}</div>
          {[12, 48].map(t => <div key={t} className="xmas-santa-lane" style={{ top: `${t}%` }}><svg className="xmas-santa" viewBox="0 0 120 50" width="120" height="50"><g fill="none" strokeLinecap="round" strokeWidth="3"><path d="M8 34 Q40 44 70 34" stroke="hsl(var(--neon-cyan))"/><rect x="40" y="18" width="34" height="16" rx="7" fill="hsl(var(--neon-pink))"/><circle cx="60" cy="13" r="7" fill="hsl(var(--foreground))"/><path d="M53 10 L60 0 L67 10Z" fill="hsl(var(--neon-pink))"/><circle cx="96" cy="22" r="8" fill="hsl(var(--neon-purple))"/><path d="M92 14 l-3-7 M100 14 l3-7" stroke="hsl(var(--neon-green))"/><circle cx="101" cy="22" r="2" fill="hsl(var(--neon-pink))"/><path d="M74 26 L88 24" stroke="hsl(var(--foreground))" strokeWidth="1.5"/></g></svg></div>)}
          {[[30, "l"], [62, "r"], [86, "l"]].map(([t, side]) => <span key={t} className={`xmas-elf xmas-elf-${side}`} style={{ top: `${t}%` }}><svg viewBox="0 0 40 60" width="34" height="52"><path d="M20 0 v12" stroke="hsl(var(--foreground) / .5)" strokeWidth="1.5"/><path d="M10 24 L20 8 L30 24Z" fill="hsl(var(--neon-green))"/><circle cx="20" cy="29" r="8" fill="hsl(var(--foreground))"/><circle cx="17" cy="28" r="1.3" fill="hsl(var(--ink))"/><circle cx="23" cy="28" r="1.3" fill="hsl(var(--ink))"/><rect x="12" y="37" width="16" height="15" rx="6" fill="hsl(var(--neon-pink))"/></svg></span>)}
        </div>
      )}
      {children}
    </div>
  );
}