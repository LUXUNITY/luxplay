import { Suspense, lazy } from "react";
import AppHeader from "@/components/app/AppHeader";

const SoftPlaySection = lazy(() => import("@/components/SoftPlaySection"));
const BabySoftPlaySection = lazy(() => import("@/components/BabySoftPlaySection"));
const PreSaleSection = lazy(() => import("@/components/PreSaleSection"));
const PartiesSection = lazy(() => import("@/components/PartiesSection"));

const AppBook = () => (
  <div>
    <AppHeader title="BOOK" subtitle="Soft play, credits and parties" />
    <Suspense fallback={null}>
      <div id="softplay">
        <SoftPlaySection />
      </div>
      <div id="under3s">
        <BabySoftPlaySection />
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
