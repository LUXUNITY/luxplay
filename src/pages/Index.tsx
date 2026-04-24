import HeroSection from "@/components/HeroSection";
import PreSaleSection from "@/components/PreSaleSection";
import SoftPlaySection from "@/components/SoftPlaySection";
import VenueSection from "@/components/VenueSection";
import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";
import cardBg from "@/assets/luxplay-card-bg.jpeg";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero — full-screen immersive, CTA front and center */}
      <HeroSection />

      {/* Mid-page sections — LuxPlay card starfield background */}
      <div
        className="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(7,7,16,0.55), rgba(7,7,16,0.55)), url(${cardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        {/* 2. Credits — money section FIRST, before any explanation */}
        <PreSaleSection />
        {/* 3. Soft Play — opening day session bookings */}
        <SoftPlaySection />
        {/* 4. Venue visuals — large cinematic splits, not a grid */}
        <VenueSection />
      </div>

      {/* 5. Founder story — last, earns trust after excitement */}
      <FeaturesSection />

      {/* 6. Footer — also keeps the starfield */}
      <div
        className="relative"
        style={{
          backgroundImage: `linear-gradient(rgba(7,7,16,0.55), rgba(7,7,16,0.55)), url(${cardBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <FooterSection />
      </div>
    </main>
  );
};

export default Index;
