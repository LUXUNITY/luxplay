import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Baby, PoundSterling } from "lucide-react";

const SoftPlaySection = lazy(() => import("@/components/SoftPlaySection"));
const BabySoftPlaySection = lazy(() => import("@/components/BabySoftPlaySection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const FAQS = [
  {
    q: "How much is soft play in Bournemouth at LuxPlay?",
    a: "A 2-hour soft play session is £8 per child on our 3-level frame, and £4 per child for the baby soft play area (0–3 years). Adults go free with every session.",
  },
  {
    q: "What ages is the soft play for?",
    a: "The main 3-level soft play frame is built for walking children up to around 11 years. Under-3s have their own separate padded baby soft play area, so the little ones are never in with the big kids.",
  },
  {
    q: "Do I need to book a soft play session in advance?",
    a: "Booking online is the safest way to guarantee a space, because each 2-hour slot has limited capacity. You can book any slot on this page — 10am–12pm, 12pm–2pm, 2pm–4pm, 4pm–6pm or 6pm–8pm.",
  },
  {
    q: "Do parents have to pay to go in?",
    a: "No. Adults go free on every soft play and baby soft play session, and Cafè Lux is right next to the frame for hot drinks, hot food and snacks while the children play.",
  },
  {
    q: "Where is the soft play in Bournemouth?",
    a: "LuxPlay is at Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX — indoors, fully air conditioned, and a few minutes from Bournemouth town centre, Poole and Christchurch.",
  },
  {
    q: "Is it indoors and open when it rains?",
    a: "Yes. Everything at LuxPlay is indoors and air conditioned, so it works just as well on a wet or cold Bournemouth day as it does in the summer.",
  },
];

const SoftPlayBournemouth = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://luxplay.uk/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Soft Play Bournemouth",
        item: "https://luxplay.uk/soft-play-bournemouth",
      },
    ],
  };

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AmusementPark"],
    "@id": "https://luxplay.uk/#business",
    name: "LUXPLAY",
    url: "https://luxplay.uk/soft-play-bournemouth",
    email: "luxplayuk@gmail.com",
    description:
      "Indoor soft play in Boscombe, Bournemouth: a 3-level soft play frame from £8 per child, a separate baby soft play area for under-3s from £4, plus 40+ arcade games and Cafè Lux on site. Adults go free.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit 7, Sovereign Centre",
      addressLocality: "Boscombe, Bournemouth",
      addressRegion: "Dorset",
      postalCode: "BH1 4SX",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: "Bournemouth" },
      { "@type": "City", name: "Poole" },
      { "@type": "City", name: "Christchurch" },
    ],
    priceRange: "££",
    currenciesAccepted: "GBP",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday"],
        opens: "10:00",
        closes: "21:00",
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-site café", value: true },
      { "@type": "LocationFeatureSpecification", name: "Baby soft play area", value: true },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "LUXPLAY soft play sessions",
      itemListElement: [
        {
          "@type": "Offer",
          url: "https://luxplay.uk/soft-play-bournemouth#softplay",
          priceCurrency: "GBP",
          price: "8.00",
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "Soft play session (2 hours)",
            description: "Two-hour session on the 3-level soft play frame. Adults go free.",
            serviceType: "Soft play",
          },
        },
        {
          "@type": "Offer",
          url: "https://luxplay.uk/soft-play-bournemouth#baby-softplay",
          priceCurrency: "GBP",
          price: "4.00",
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "Baby soft play session (0–3 years, 2 hours)",
            description:
              "Two-hour session in the dedicated baby soft play area for under-3s. Adults go free.",
            serviceType: "Baby soft play",
          },
        },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Soft Play Bournemouth — 3-Level Indoor Soft Play | LUXPLAY</title>
        <meta
          name="description"
          content="Indoor soft play in Bournemouth from £8 per child. 3-level frame, separate baby soft play for under-3s, arcade and café on site. Adults go free — book online."
        />
        <link rel="canonical" href="https://luxplay.uk/soft-play-bournemouth" />
        <meta property="og:title" content="Soft Play Bournemouth — 3-Level Indoor Soft Play | LUXPLAY" />
        <meta
          property="og:description"
          content="Indoor soft play in Boscombe, Bournemouth from £8 per child. 3-level frame, baby soft play, arcade and Cafè Lux. Adults go free."
        />
        <meta property="og:url" content="https://luxplay.uk/soft-play-bournemouth" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Soft Play Bournemouth — LUXPLAY" />
        <meta
          name="twitter:description"
          content="3-level indoor soft play in Boscombe, Bournemouth from £8 per child. Adults go free."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(businessJsonLd)}</script>
      </Helmet>

      <section className="relative overflow-hidden luxplay-pattern-bg">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-neon-bar" />
        <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-20 pb-14 md:pt-28 md:pb-20 text-center">
          <nav aria-label="Breadcrumb" className="mb-8">
            <a
              href="/"
              className="font-display text-[10px] md:text-xs tracking-[0.3em] text-neon-cyan/80 hover:text-neon-cyan transition-colors"
            >
              ← BACK TO LUXPLAY
            </a>
          </nav>

          <span className="inline-flex items-center gap-2 border-2 border-neon-cyan bg-neon-cyan/10 text-neon-cyan font-display text-[10px] md:text-sm tracking-[0.3em] uppercase px-5 py-2.5">
            <MapPin className="w-4 h-4" />
            BOSCOMBE · BOURNEMOUTH
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider mt-7 mb-5">
            <span className="text-gradient-neon">SOFT PLAY BOURNEMOUTH</span>
          </h1>

          <p className="font-body text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
            LuxPlay is an indoor soft play centre in Boscombe, Bournemouth. Three
            levels of slides, ball pits and climbing for the big kids, a separate
            padded baby area for the under-3s, and 40+ arcade games right next door.
            Sessions are 2 hours from{" "}
            <span className="text-neon-green font-semibold">£8 per child</span> —
            and adults go free.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { Icon: Clock, label: "2 HOUR SESSIONS", sub: "10am–8pm daily" },
              { Icon: PoundSterling, label: "FROM £8", sub: "Adults go free" },
              { Icon: Baby, label: "BABY AREA", sub: "0–3 years, £4" },
              { Icon: MapPin, label: "SOVEREIGN CENTRE", sub: "Boscombe, BH1 4SX" },
            ].map(({ Icon, label, sub }) => (
              <div
                key={label}
                className="border-2 border-white/10 bg-[#0a0a16] px-4 py-5 flex flex-col items-center gap-2"
              >
                <Icon className="w-5 h-5 text-neon-cyan" />
                <p className="font-display text-xs tracking-[0.2em] text-white/90">{label}</p>
                <p className="font-body text-white/45 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-14 md:py-20 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl tracking-wider text-center text-gradient-neon mb-10">
            WHAT'S INSIDE
          </h2>
          <div className="space-y-4">
            {[
              {
                t: "3-LEVEL SOFT PLAY FRAME",
                d: "Slides, tunnels, ball pits and climbing levels for walking children up to around 11 years. Fully padded and indoors, so it runs whatever the Bournemouth weather is doing.",
              },
              {
                t: "SEPARATE BABY SOFT PLAY",
                d: "A dedicated soft, padded area for 0–3 year olds away from the bigger frame — £4 per child for a 2-hour session, adults free.",
              },
              {
                t: "40+ ARCADE GAMES NEXT DOOR",
                d: "Add arcade credits to your visit and the kids can move between soft play and the arcade in the same trip. Most games cost 5–10 credits.",
              },
              {
                t: "CAFÈ LUX FOR THE GROWN-UPS",
                d: "Hot drinks, hot food and snacks on site, with seating that looks onto the play area. Air conditioned throughout.",
              },
            ].map((i) => (
              <div key={i.t} className="border-2 border-white/10 bg-[#0a0a16] p-5 md:p-6">
                <h3 className="font-display text-base md:text-lg tracking-wide text-neon-pink mb-2">
                  {i.t}
                </h3>
                <p className="font-body text-white/70 text-sm md:text-base">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking widgets (shared with the homepage) */}
      <div className="relative luxplay-pattern-bg">
        <Suspense fallback={null}>
          <SoftPlaySection />
        </Suspense>
        <Suspense fallback={null}>
          <BabySoftPlaySection />
        </Suspense>
      </div>

      {/* FAQ */}
      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider text-center text-gradient-neon mb-12">
            SOFT PLAY QUESTIONS
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((f) => (
              <div key={f.q} className="border-2 border-white/10 bg-[#0a0a16] p-5 md:p-6">
                <h3 className="font-display text-base md:text-lg tracking-wide text-neon-cyan mb-2">
                  {f.q}
                </h3>
                <p className="font-body text-white/70 text-sm md:text-base">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-wrap justify-center gap-3">
            <a
              href="/arcade-bournemouth"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-pink text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              ARCADE IN BOURNEMOUTH
            </a>
            <a
              href="/parties"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-green text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              BIRTHDAY PARTIES
            </a>
          </div>
        </div>
      </section>

      <div className="relative luxplay-pattern-bg">
        <Suspense fallback={null}>
          <FooterSection />
        </Suspense>
      </div>
    </main>
  );
};

export default SoftPlayBournemouth;
