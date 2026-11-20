import { Navigate, useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import SteveMemorial from "@/components/SteveMemorial";
import FooterSection from "@/components/FooterSection";

const legacyDestinations: Record<string, string> = {
  softplay: "/softplay", "baby-softplay": "/softplay#baby-softplay", presale: "/arcade-credits",
  "play-pass": "/memberships", halloween: "/christmas", "winter-wonderland": "/christmas",
  parties: "/parties", about: "/about", venue: "/about",
};

export default function Index() {
  const { hash } = useLocation();
  const destination = legacyDestinations[hash.slice(1)];
  if (destination) return <Navigate to={destination} replace />;
  return (
    <main className="min-h-screen bg-background">
      <SteveMemorial />
      <HeroSection />
      <FooterSection />
    </main>
  );
}
