import { Suspense, lazy } from "react";
import AppHeader from "@/components/app/AppHeader";

const DealsSection = lazy(() => import("@/components/DealsSection"));
const BabyDealSection = lazy(() => import("@/components/BabyDealSection"));
const SoftPlaySection = lazy(() => import("@/components/SoftPlaySection"));
const BabySoftPlaySection = lazy(() => import("@/components/BabySoftPlaySection"));
const PreSaleSection = lazy(() => import("@/components/PreSaleSection"));
const PartiesSection = lazy(() => import("@/components/PartiesSection"));

const AppBook = () => (
  <div>
    <AppHeader title="BOOK" subtitle="Soft play, credits, deals and parties" />
    <Suspense fallback={null}>
      <div id="softplay">
        <SoftPlaySection />
      </div>
      <div id="under3s">
        <BabySoftPlaySection />
      </div>
      <div id="deals">
        <DealsSection />
        <BabyDealSection />
      </div>
      <div id="credits">
        <PreSaleSection />
      </div>
      <div id="parties">
        <PartiesSection />
      </div>
    </Suspense>
  </div>
);

export default AppBook;
