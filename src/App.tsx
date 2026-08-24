import { Suspense, lazy } from "react";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RouteHead from "@/components/RouteHead";
import { AuthProvider } from "@/hooks/useAuth";

const NotFound = lazy(() => import("./pages/NotFound"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Admin = lazy(() => import("./pages/Admin"));
const SoftPlaySuccess = lazy(() => import("./pages/SoftPlaySuccess"));
const BabySoftPlaySuccess = lazy(() => import("./pages/BabySoftPlaySuccess"));
const Parties = lazy(() => import("./pages/Parties"));
const SoftPlayBournemouth = lazy(() => import("./pages/SoftPlayBournemouth"));
const ArcadeBournemouth = lazy(() => import("./pages/ArcadeBournemouth"));
const ThingsToDoBournemouth = lazy(() => import("./pages/ThingsToDoBournemouth"));
const ThingsToDoInBournemouth = lazy(() => import("./pages/ThingsToDoInBournemouth"));
const AuthPage = lazy(() => import("./pages/Auth"));
const Loyalty = lazy(() => import("./pages/Loyalty"));
const AppLayout = lazy(() => import("@/components/app/AppLayout"));
const AppHome = lazy(() => import("./pages/app/AppHome"));
const AppBook = lazy(() => import("./pages/app/AppBook"));
const AppAccount = lazy(() => import("./pages/app/AppAccount"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MotionConfig reducedMotion="always">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<><RouteHead title="LUXPLAY — Family Entertainment Centre in Bournemouth" description="LUXPLAY in Boscombe, Bournemouth: 40+ arcade games, 3-level soft play, baby soft play, prize redemption and Cafè Lux. Book soft play or buy credits online." path="/" /><Index /></>} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/soft-play-bournemouth" element={<SoftPlayBournemouth />} />
              <Route path="/arcade-bournemouth" element={<ArcadeBournemouth />} />
              <Route path="/things-to-do-in-bournemouth-with-kids" element={<ThingsToDoBournemouth />} />
              <Route path="/things-to-do-in-bournemouth" element={<ThingsToDoInBournemouth />} />

              <Route path="/payment-success" element={<><RouteHead title="Credits Purchase Confirmed — LUXPLAY" description="Your LUXPLAY arcade credits purchase is confirmed. Show your redemption code in store to load credits onto your card." path="/payment-success" noindex /><PaymentSuccess /></>} />
              <Route path="/unsubscribe" element={<><RouteHead title="Email Preferences — LUXPLAY" description="Manage or unsubscribe from LUXPLAY email updates." path="/unsubscribe" noindex /><Unsubscribe /></>} />
              <Route path="/admin" element={<><RouteHead title="Staff Code Lookup — LUXPLAY" description="Internal LUXPLAY staff tool for looking up and checking in redemption and booking codes." path="/admin" noindex /><Admin /></>} />
              <Route path="/softplay-success" element={<><RouteHead title="Soft Play Booking Confirmed — LUXPLAY" description="Your LUXPLAY soft play session is booked. Show your booking code on the day." path="/softplay-success" noindex /><SoftPlaySuccess /></>} />
              <Route path="/baby-softplay-success" element={<><RouteHead title="Baby Soft Play Booking Confirmed — LUXPLAY" description="Your LUXPLAY baby soft play session is booked. Show your booking code on the day." path="/baby-softplay-success" noindex /><BabySoftPlaySuccess /></>} />
              <Route path="/auth" element={<><RouteHead title="LUXPLAY Rewards — Sign In or Join Free" description="Sign in to your LUXPLAY Rewards account to collect soft play stamps — every 7th session is free per child." path="/auth" noindex /><AuthPage /></>} />
              <Route path="/loyalty" element={<><RouteHead title="My LUXPLAY Rewards" description="Your LUXPLAY loyalty stamp card — 6 paid soft play sessions and the 7th is free." path="/loyalty" noindex /><Loyalty /></>} />
              <Route path="*" element={<><RouteHead title="Page Not Found — LUXPLAY" description="This LUXPLAY page could not be found." path="/404" noindex /><NotFound /></>} />
            </Routes>
          </Suspense>
        </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
