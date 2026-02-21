import HeroSection from "@/components/HeroSection";
import PreSaleSection from "@/components/PreSaleSection";
import VenueSection from "@/components/VenueSection";
import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero — full-screen immersive, CTA front and center */}
      <HeroSection />
      {/* 2. Credits — money section FIRST, before any explanation */}
      <PreSaleSection />
      {/* 3. Venue visuals — large cinematic splits, not a grid */}
      <VenueSection />
      {/* 4. Founder story — last, earns trust after excitement */}
      <FeaturesSection />
      {/* 5. Footer */}
      <FooterSection />
    </main>
  );
};

export default Index;
