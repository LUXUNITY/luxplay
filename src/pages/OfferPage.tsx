import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SoftPlaySection from "@/components/SoftPlaySection";
import BabySoftPlaySection from "@/components/BabySoftPlaySection";
import PreSaleSection from "@/components/PreSaleSection";
import WinterWonderland from "@/components/WinterWonderland";
import VenueSection from "@/components/VenueSection";
import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";

export default function OfferPage({ offer }: { offer: "softplay" | "credits" | "christmas" | "about" }) {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }, [offer, hash]);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="mx-auto max-w-6xl px-5 py-4" aria-label="Back to homepage">
        <Button asChild variant="link" className="px-0 text-neon-cyan"><Link to="/"><ArrowLeft /> Back to LuxPlay</Link></Button>
      </nav>
      {offer === "softplay" && <><SoftPlaySection /><BabySoftPlaySection /></>}
      {offer === "credits" && <PreSaleSection />}
      {offer === "christmas" && <div className="mx-auto max-w-xl"><WinterWonderland /></div>}
      {offer === "about" && <><VenueSection /><FeaturesSection /></>}
      <FooterSection />
    </main>
  );
}