import { Suspense, lazy } from "react";
import HeroSection from "@/components/HeroSection";

const PreSaleSection = lazy(() => import("@/components/PreSaleSection"));
const SoftPlaySection = lazy(() => import("@/components/SoftPlaySection"));
const VenueSection = lazy(() => import("@/components/VenueSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* 1. Hero — full-screen immersive, CTA front and center */}
      <HeroSection />

      {/* Mid-page sections — LuxPlay card starfield background */}
      <div className="relative luxplay-pattern-bg">
        {/* 2. Credits — money section FIRST, before any explanation */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <PreSaleSection />
          </Suspense>
        </div>
        {/* 3. Soft Play — opening day session bookings */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <SoftPlaySection />
          </Suspense>
        </div>
        {/* 4. Venue visuals — large cinematic splits, not a grid */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <VenueSection />
          </Suspense>
        </div>
      </div>

      {/* 5. Founder story — last, earns trust after excitement */}
      <div className="defer-section">
        <Suspense fallback={null}>
          <FeaturesSection />
        </Suspense>
      </div>

      {/* 6. Footer — also keeps the starfield */}
      <div className="relative luxplay-pattern-bg">
        <div className="defer-section">
          <Suspense fallback={null}>
            <FooterSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Index;
