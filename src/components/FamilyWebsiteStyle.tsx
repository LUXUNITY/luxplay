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
    link.href = "https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;500;600;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);
  return <div className={familyPages.has(pathname) ? "family-website" : undefined}>{children}</div>;
}