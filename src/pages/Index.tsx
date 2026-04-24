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

      {/* Mid-page sections share the LuxPlay card starfield background */}
      <div className="relative">
        {/* Starfield from the LuxPlay card art — fixed so it stays put while scrolling */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cardBg})`, backgroundAttachment: "fixed" }}
        />
        {/* Light scrim — keeps text readable but lets the starfield show */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#070710]/45" />

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
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${cardBg})`, backgroundAttachment: "fixed" }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#070710]/45" />
        <FooterSection />
      </div>
    </main>
  );
};

export default Index;
