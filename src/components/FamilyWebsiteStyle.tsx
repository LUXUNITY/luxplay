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
          <div className="xmas-snow">{Array.from({ length: 18 }, (_, i) => <span key={i}>{i % 3 ? "❄" : "•"}</span>)}</div>
          <span className="xmas-santa">🎅🦌🦌</span>
          <span className="xmas-elf xmas-elf-l">🧝</span>
          <span className="xmas-elf xmas-elf-r">🧝‍♀️</span>
          <div className="xmas-ground" />
        </div>
      )}
      {children}
    </div>
  );
}