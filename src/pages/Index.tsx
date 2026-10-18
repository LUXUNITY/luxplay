import { Suspense, lazy } from "react";
import HeroSection from "@/components/HeroSection";
import HalloweenBookingSection from "@/components/halloween/HalloweenBookingSection";

import ScrollReveal from "@/components/ScrollReveal";

const PreSaleSection = lazy(() => import("@/components/PreSaleSection"));
const VenueSection = lazy(() => import("@/components/VenueSection"));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));
const SoftPlaySection = lazy(() => import("@/components/SoftPlaySection"));
const BabySoftPlaySection = lazy(() => import("@/components/BabySoftPlaySection"));
const PartiesSection = lazy(() => import("@/components/PartiesSection"));
const DealsSection = lazy(() => import("@/components/DealsSection"));
const BabyDealSection = lazy(() => import("@/components/BabyDealSection"));


const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <aside className="w-full border-b-4 border-neon-pink bg-neon-pink/10 text-center" aria-label="Fully heated venue">
        <div className="mx-auto flex max-w-xl items-center justify-center gap-3 px-3 py-3 sm:gap-5">
          <span aria-hidden="true" className="shrink-0 text-4xl motion-safe:animate-pulse">🥶</span>
          <div>
            <p className="font-display text-2xl leading-none text-neon-cyan sm:text-3xl">COLD OUTSIDE?</p>
            <p className="mt-1 font-display text-3xl leading-none text-neon-cyan sm:text-4xl">OUR HEATERS ARE ON!</p>
          </div>
          <span aria-hidden="true" className="shrink-0 text-4xl motion-safe:animate-pulse">🔥</span>
        </div>
        <div className="bg-neon-cyan px-5 py-4 text-ink">
          <p className="font-display text-3xl leading-none sm:text-4xl">COME IN FROM THE COLD ☕</p>
          <p className="mx-auto mt-3 max-w-lg font-body text-sm font-medium leading-relaxed sm:text-base">
            Let the kids burn off some energy in soft play, get stuck into the arcade, and make time for a catch-up with friends and family.
          </p>
          <p className="mx-auto mt-2 max-w-lg font-body text-sm leading-relaxed sm:text-base">
            We’ve got <strong className="font-extrabold">hot food, tea and coffee</strong> to keep everyone warm and happy.
          </p>
          <p className="mt-4 border-t border-ink/20 pt-3 font-display text-xl leading-tight sm:text-2xl">HOT FOOD · WARM DRINKS · BIG SMILES</p>
        </div>
      </aside>
      {/* 1. Hero — logo, then REFRESH & PLAY deal, then CTAs */}
      <HeroSection />

      {/* Halloween Spooktacular ticket booking — 100 per night */}
      <HalloweenBookingSection />


      {/* Mid-page sections — LuxPlay card starfield background */}
      <div className="relative luxplay-pattern-bg">
        {/* 2. Venue visuals — zones so visitors see what they're buying */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <VenueSection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 3. Deals — Play Deal & All-In Deal, right under the venue zones */}
        <Suspense fallback={null}>
          <DealsSection />
        </Suspense>
        {/* Under-3s deal — after the main upsell deals */}
        <Suspense fallback={null}>
          <BabyDealSection />
        </Suspense>
        {/* 4. Credits — money section after zones explain the value */}
        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <PreSaleSection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 5. Soft play booking */}

        <div className="defer-section">
          <Suspense fallback={null}>
            <ScrollReveal>
              <SoftPlaySection />
            </ScrollReveal>
          </Suspense>
        </div>
        {/* 5. Standard baby soft play booking */}
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

