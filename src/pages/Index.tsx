import { Suspense, lazy } from "react";
import HeroSection from "@/components/HeroSection";

import ScrollReveal from "@/components/ScrollReveal";

const PreSaleSection = lazy(() => import("@/components/PreSaleSection"));
const VenueSection = lazy(() => import("@/components/VenueSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));
const SoftPlaySection = lazy(() => import("@/components/SoftPlaySection"));
const BabySoftPlaySection = lazy(() => import("@/components/BabySoftPlaySection"));
const PartiesSection = lazy(() => import("@/components/PartiesSection"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background">


      {/* 1. Hero — full-screen immersive, CTA front and center */}
      <HeroSection />

      {/* Mid-page sections — LuxPlay card starfield background */}
      <div className="relative luxplay-pattern-bg">
        {/* 2. Venue visuals — zones first so visitors see what they're buying */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <VenueSection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 3. Credits — money section after zones explain the value */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <PreSaleSection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 4. Soft play booking */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <SoftPlaySection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 5. Baby soft play booking */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <BabySoftPlaySection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 6. Birthday parties */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <PartiesSection />
            </ScrollReveal>
          </Suspense>
        </div>
      </div>

      {/* 5. Founder story — last, earns trust after excitement */}
      <div className="defer-section">
        <Suspense fallback={null}>
          <ScrollReveal>
            <FeaturesSection />
          </ScrollReveal>
        </Suspense>
      </div>

      {/* 6. Footer — also keeps the starfield */}
      <div className="relative luxplay-pattern-bg">
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <FooterSection />
            </ScrollReveal>
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Index;

