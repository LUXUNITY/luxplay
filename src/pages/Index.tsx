import HeroSection from "@/components/HeroSection";
import PreSaleSection from "@/components/PreSaleSection";
import SoftPlaySection from "@/components/SoftPlaySection";
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
      {/* 3. Soft Play — opening day session bookings */}
      <SoftPlaySection />
      {/* 4. Venue visuals — large cinematic splits, not a grid */}
      <VenueSection />
      {/* 5. Founder story — last, earns trust after excitement */}
      <FeaturesSection />
      {/* 6. Footer */}
      <FooterSection />
    </main>
  );
};

export default Index;
