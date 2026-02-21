import HeroSection from "@/components/HeroSection";
import VenueSection from "@/components/VenueSection";
import FeaturesSection from "@/components/FeaturesSection";
import PreSaleSection from "@/components/PreSaleSection";
import FounderSection from "@/components/FounderSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <VenueSection />
      <PreSaleSection />
      <FeaturesSection />
      <FounderSection />
      <FooterSection />
    </main>
  );
};

export default Index;
