import HeroSection from "@/components/HeroSection";
import PreSaleSection from "@/components/PreSaleSection";
import SoftPlaySection from "@/components/SoftPlaySection";
import VenueSection from "@/components/VenueSection";
import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/FooterSection";
import patternBg from "@/assets/luxplay-bg-pattern.jpeg";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero — full-screen immersive, CTA front and center */}
      <HeroSection />

      {/* Mid-page sections — LuxPlay card starfield background */}
      <div
        className="relative luxplay-pattern-bg"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--background) / 0.56), hsl(var(--background) / 0.56)), url(${patternBg})`,
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
        className="relative luxplay-pattern-bg"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--background) / 0.56), hsl(var(--background) / 0.56)), url(${patternBg})`,
        }}
      >
        <FooterSection />
      </div>
    </main>
  );
};

export default Index;
