import { Suspense, lazy } from "react";
import HeroSection from "@/components/HeroSection";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import ScrollReveal from "@/components/ScrollReveal";

const PreSaleSection = lazy(() => import("@/components/PreSaleSection"));
const SoftPlayUpdateSection = lazy(() => import("@/components/SoftPlayUpdateSection"));
const VenueSection = lazy(() => import("@/components/VenueSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <AnnouncementBanner />
      {/* 1. Hero — full-screen immersive, CTA front and center */}
      <HeroSection />

      {/* Mid-page sections — LuxPlay card starfield background */}
      <div className="relative luxplay-pattern-bg">
        {/* 2. Credits — money section FIRST, before any explanation */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <PreSaleSection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 3. Soft Play — opening day session bookings */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <SoftPlaySection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 3b. Baby Soft Play — separate under-2 sessions */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <BabySoftPlaySection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 4. Venue visuals — large cinematic splits, not a grid */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <VenueSection />
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

