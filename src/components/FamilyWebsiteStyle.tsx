import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const familyPages = new Set([
  "/", "/memberships", "/softplay", "/arcade-credits", "/christmas",
  "/about", "/parties", "/soft-play-bournemouth", "/arcade-bournemouth",
  "/things-to-do-in-bournemouth-with-kids", "/things-to-do-in-bournemouth",
]);

export default function FamilyWebsiteStyle({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return <div className={familyPages.has(pathname) ? "family-website" : undefined}>{children}</div>;
}