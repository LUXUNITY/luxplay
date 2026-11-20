import { Suspense, lazy } from "react";
import MyMembership from "./pages/MyMembership";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import RouteHead from "@/components/RouteHead";
import AppShellRedirect from "@/components/app/AppShellRedirect";
import { AuthProvider } from "@/hooks/useAuth";
import SteveSupportBanner from "@/components/SteveSupportBanner";
import MemberCornerButton from "@/components/MemberCornerButton";
import FamilyWebsiteStyle from "@/components/FamilyWebsiteStyle";

const NotFound = lazy(() => import("./pages/NotFound"));
const RememberingSteve = lazy(() => import("./pages/RememberingSteve"));
const OfferPage = lazy(() => import("./pages/OfferPage"));
const Memberships = lazy(() => import("./pages/Memberships"));
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
const ResetPasswordPage = lazy(() => import("./pages/ResetPassword"));
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
          <AppShellRedirect />
          <SteveSupportBanner />
          <MemberCornerButton />
          <FamilyWebsiteStyle>
          <Suspense fallback={null}>
            <Routes>
              {/* Native app shell — separate look from the website */}
              <Route path="/app" element={<><RouteHead title="LUXPLAY App" description="Book soft play, buy arcade credits and collect LUXPLAY Rewards stamps." path="/app" noindex /><AppLayout /></>}>
                <Route index element={<AppHome />} />
                <Route path="book" element={<AppBook />} />
                <Route path="rewards" element={<Loyalty />} />
                <Route path="account" element={<AppAccount />} />
              </Route>
              <Route path="/" element={<><RouteHead title="LUXPLAY — Family Entertainment Centre in Bournemouth" description="LUXPLAY in Boscombe, Bournemouth: 60+ arcade games, 3-level soft play, baby soft play, prize redemption and Cafè Lux. Book soft play or buy credits online." path="/" /><Index /></>} />
              <Route path="/halloween" element={<Navigate to="/christmas" replace />} />
              <Route path="/christmas" element={<><RouteHead title="LuxPlay Winter Wonderland — Coming Soon" description="Christmas magic is coming to LuxPlay. Stay tuned for Winter Wonderland announcements." path="/christmas" /><OfferPage offer="christmas" /></>} />
              <Route path="/softplay" element={<><RouteHead title="Book Soft Play — LUXPLAY" description="Book two-hour soft play sessions for big kids and under-3s at LuxPlay Bournemouth. Adults go free." path="/softplay" /><OfferPage offer="softplay" /></>} />
              <Route path="/arcade-credits" element={<><RouteHead title="Buy Arcade Credits — LUXPLAY" description="Choose your LuxPlay arcade credits and buy online for your next visit to Bournemouth." path="/arcade-credits" /><OfferPage offer="credits" /></>} />
              <Route path="/about" element={<><RouteHead title="Explore LuxPlay — Our Venue & Team" description="Explore the LuxPlay arcade, soft play, prizes and café, and meet the team in Bournemouth." path="/about" /><OfferPage offer="about" /></>} />
              <Route path="/parties" element={<Parties />} />
              <Route path="/memberships" element={<><RouteHead title="Soft Play Memberships Bournemouth — LuxPlay" description="Unlimited two-hour soft play from £24.99 per child per month. Little Lux, Lux Plus and Lux VIP passes with free adult entry at LuxPlay Boscombe." path="/memberships" /><Memberships /></>} />
              <Route path="/remembering-steve" element={<><RouteHead title="In Loving Memory of Steve — LUXPLAY" description="Remembering Steve, our beloved manager, friend and part of the LuxPlay family. Read our tribute and help support his family." path="/remembering-steve" /><RememberingSteve /></>} />
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
              <Route path="/reset-password" element={<><RouteHead title="Reset your password — LUXPLAY" description="Choose a new password for your LUXPLAY account." path="/reset-password" noindex /><ResetPasswordPage /></>} />
              <Route path="/my-membership" element={<><RouteHead title="My LuxPlay Membership" description="Your LuxPlay membership pass, QR code and session bookings." path="/my-membership" noindex /><MyMembership /></>} />
              <Route path="/loyalty" element={<><RouteHead title="My LUXPLAY Rewards" description="Your LUXPLAY loyalty stamp card — 6 paid soft play sessions and the 7th is free." path="/loyalty" noindex /><Loyalty /></>} />
              <Route path="*" element={<><RouteHead title="Page Not Found — LUXPLAY" description="This LUXPLAY page could not be found." path="/404" noindex /><NotFound /></>} />
            </Routes>
          </Suspense>
          </FamilyWebsiteStyle>
        </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </QueryClientProvider>
);

export default App;
