import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Clock, Users, PartyPopper } from "lucide-react";

const PartiesSection = lazy(() => import("@/components/PartiesSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const FAQS = [
  {
    q: "How much is a kids birthday party at LuxPlay Bournemouth?",
    a: "Party packages start at £19.99 per child for 2 hours of soft play, £10 of arcade credits and a hot meal. The Classic package is £24.99 per child and the Ultimate package is £29.99 per child. Adults go free on every package.",
  },
  {
    q: "How many children do I need to book a party?",
    a: "There is a minimum of 8 children per party booking. There is no maximum — get in touch with your numbers and we will confirm availability for your date.",
  },
  {
    q: "Is food included in the party packages?",
    a: "Yes. Every child gets a hot meal of nuggets, chips and a drink, with a small toy inside. The Classic and Ultimate packages also include an extra snack and drink.",
  },
  {
    q: "Where is LuxPlay?",
    a: "LuxPlay is at Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX — with 40+ arcade games, a 3-level soft play, baby soft play, prize redemption and Cafè Lux on site.",
  },
  {
    q: "Do parents have to pay?",
    a: "No. Adults go free with every party package, and Cafè Lux is on site for hot drinks and food while the children play.",
  },
];

const Parties = () => {
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
      { "@type": "ListItem", position: 2, name: "Birthday Parties", item: "https://luxplay.uk/parties" },
    ],
  };

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AmusementPark"],
    "@id": "https://luxplay.uk/#business",
    name: "LUXPLAY",
    url: "https://luxplay.uk/parties",
    email: "luxplayuk@gmail.com",
    description:
      "Children's birthday party venue in Boscombe, Bournemouth with a 3-level soft play, 40+ arcade games, baby soft play and Cafè Lux on site.",
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
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-site café", value: true },
      { "@type": "LocationFeatureSpecification", name: "Private party hosting", value: true },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "LUXPLAY children's birthday party packages",
      itemListElement: [
        {
          "@type": "Offer",
          url: "https://luxplay.uk/parties",
          priceCurrency: "GBP",
          price: "19.99",
          eligibleQuantity: { "@type": "QuantitativeValue", minValue: 8, unitText: "children" },
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "Essential party package",
            description:
              "2 hours soft play, £10 of arcade credits and a hot meal with a toy, per child. Adults go free.",
            serviceType: "Children's birthday party",
          },
        },
        {
          "@type": "Offer",
          url: "https://luxplay.uk/parties",
          priceCurrency: "GBP",
          price: "24.99",
          eligibleQuantity: { "@type": "QuantitativeValue", minValue: 8, unitText: "children" },
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "Classic party package",
            description:
              "2 hours soft play, £15 of arcade credits, a hot meal with a toy plus an extra snack and drink, per child. Adults go free.",
            serviceType: "Children's birthday party",
          },
        },
        {
          "@type": "Offer",
          url: "https://luxplay.uk/parties",
          priceCurrency: "GBP",
          price: "29.99",
          eligibleQuantity: { "@type": "QuantitativeValue", minValue: 8, unitText: "children" },
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "Ultimate party package",
            description:
              "Our biggest package: 2 hours soft play, the most arcade credits, a hot meal with a toy plus an extra snack and drink, per child. Adults go free.",
            serviceType: "Children's birthday party",
          },
        },
      ],
    },
  };


  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Kids Birthday Parties in Bournemouth — LUXPLAY</title>
        <meta
          name="description"
          content="Children's birthday party packages in Boscombe, Bournemouth from £19.99 per child: 2 hours soft play, arcade credits, hot food and a toy. Adults go free."
        />
        <link rel="canonical" href="https://luxplay.uk/parties" />
        <meta property="og:title" content="Kids Birthday Parties in Bournemouth — LUXPLAY" />
        <meta
          property="og:description"
          content="Children's birthday party packages in Boscombe, Bournemouth from £19.99 per child: soft play, arcade credits, hot food and a toy. Adults go free."
        />
        <meta property="og:url" content="https://luxplay.uk/parties" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Kids Birthday Parties in Bournemouth — LUXPLAY" />
        <meta
          name="twitter:description"
          content="Party packages from £19.99 per child in Boscombe, Bournemouth. Soft play, arcade credits, hot food, adults go free."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      {/* Intro / hero */}
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

          <span className="inline-flex items-center gap-2 border-2 border-neon-pink bg-neon-pink/10 text-neon-pink font-display text-[10px] md:text-sm tracking-[0.3em] uppercase px-5 py-2.5">
            <PartyPopper className="w-4 h-4" />
            BOSCOMBE · BOURNEMOUTH
            <PartyPopper className="w-4 h-4" />
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider mt-7 mb-5">
            <span className="text-gradient-neon">KIDS BIRTHDAY PARTIES</span>
          </h1>

          <p className="font-body text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
            Looking for a kids party venue in Bournemouth? LuxPlay wraps a 3-level
            soft play, 40+ arcade games and hot food into one price per child —
            from <span className="text-neon-green font-semibold">£19.99</span>. You
            bring the birthday child, we handle the rest.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { Icon: Clock, label: "2 HOURS OF PLAY", sub: "Soft play + arcade" },
              { Icon: Users, label: "ADULTS GO FREE", sub: "Min. 8 children" },
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

      {/* Packages (shared with the homepage) */}
      <div className="relative luxplay-pattern-bg">
        <Suspense fallback={null}>
          <PartiesSection />
        </Suspense>
      </div>

      {/* FAQ */}
      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider text-center text-gradient-neon mb-12">
            PARTY QUESTIONS
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

          <div className="text-center mt-12">
            <a
              href={`mailto:luxplayuk@gmail.com?subject=${encodeURIComponent(
                "Birthday Party Enquiry — LuxPlay Bournemouth",
              )}&body=${encodeURIComponent(
                "Hi LuxPlay,\n\nI'd like to book a birthday party.\n\nPackage:\nPreferred date:\nNumber of children:\nChild's name & age:\nContact number:\n\nThanks!",
              )}`}
              className="neon-cta inline-flex items-center justify-center font-display text-sm md:text-base tracking-widest px-8 py-4 bg-neon-pink text-[#070710] animate-btn-flash-pink transition-transform duration-200 hover:scale-105"
            >
              ENQUIRE ABOUT A PARTY
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

export default Parties;
