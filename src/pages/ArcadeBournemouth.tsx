import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { MapPin, Gamepad2, Trophy, Clock } from "lucide-react";

const PreSaleSection = lazy(() => import("@/components/PreSaleSection"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

const FAQS = [
  {
    q: "How much does the arcade cost in Bournemouth?",
    a: "You load credits onto a LuxPlay card and spend them across the machines. Credits start at 50 for £5, with 130 for £10, 300 for £20, 800 for £50 and 2,000 for £100. Most games cost 5–10 credits per play.",
  },
  {
    q: "How many arcade games are there?",
    a: "There are 40+ arcade and redemption machines at LuxPlay in Boscombe — driving and racing cabinets, basketball, air hockey, ticket pushers, claw machines and classic redemption games.",
  },
  {
    q: "Can you win prizes?",
    a: "Yes. Redemption games pay out tickets that you swap at the prize counter, from small pick-and-mix prizes up to the big-ticket items on the top shelf.",
  },
  {
    q: "Is the arcade suitable for adults?",
    a: "Absolutely. Plenty of grown-ups come in for the racing cabinets, air hockey and basketball. Arcade credits never expire on your card, so you can come back and finish them another day.",
  },
  {
    q: "Where is the arcade in Bournemouth?",
    a: "LuxPlay is at Unit 7, Sovereign Centre, Boscombe, Bournemouth, BH1 4SX — indoors and air conditioned, open 10am–8pm Sunday to Thursday and 10am–9pm on Friday and Saturday.",
  },
];

const ArcadeBournemouth = () => {
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
        name: "Arcade Bournemouth",
        item: "https://luxplay.uk/arcade-bournemouth",
      },
    ],
  };

  const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AmusementPark"],
    "@id": "https://luxplay.uk/#business",
    name: "LUXPLAY",
    url: "https://luxplay.uk/arcade-bournemouth",
    email: "luxplayuk@gmail.com",
    description:
      "Indoor arcade in Boscombe, Bournemouth with 40+ arcade and prize redemption machines, a 3-level soft play and Cafè Lux on site. Credits from £5.",
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
      { "@type": "LocationFeatureSpecification", name: "Prize redemption", value: true },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "LUXPLAY arcade credits",
      itemListElement: [
        {
          "@type": "Offer",
          url: "https://luxplay.uk/arcade-bournemouth#presale",
          priceCurrency: "GBP",
          price: "5.00",
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "50 arcade credits",
            description: "50 credits loaded onto your LuxPlay card. Most games cost 5–10 credits.",
            serviceType: "Arcade games",
          },
        },
        {
          "@type": "Offer",
          url: "https://luxplay.uk/arcade-bournemouth#presale",
          priceCurrency: "GBP",
          price: "20.00",
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "300 arcade credits",
            description:
              "Our most popular top-up: 300 credits on your LuxPlay card for the 40+ arcade and redemption games.",
            serviceType: "Arcade games",
          },
        },
      ],
    },
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Arcade Bournemouth — 40+ Games &amp; Prize Machines | LUXPLAY</title>
        <meta
          name="description"
          content="Indoor arcade in Boscombe, Bournemouth with 40+ arcade and prize redemption machines. Credits from £5, most games 5–10 credits. Open 7 days — buy credits online."
        />
        <link rel="canonical" href="https://luxplay.uk/arcade-bournemouth" />
        <meta property="og:title" content="Arcade Bournemouth — 40+ Games & Prize Machines | LUXPLAY" />
        <meta
          property="og:description"
          content="40+ arcade and prize redemption machines in Boscombe, Bournemouth. Credits from £5. Soft play and Cafè Lux on site."
        />
        <meta property="og:url" content="https://luxplay.uk/arcade-bournemouth" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Arcade Bournemouth — LUXPLAY" />
        <meta
          name="twitter:description"
          content="40+ arcade and prize machines in Boscombe, Bournemouth. Credits from £5."
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

          <span className="inline-flex items-center gap-2 border-2 border-neon-pink bg-neon-pink/10 text-neon-pink font-display text-[10px] md:text-sm tracking-[0.3em] uppercase px-5 py-2.5">
            <Gamepad2 className="w-4 h-4" />
            BOSCOMBE · BOURNEMOUTH
          </span>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-wider mt-7 mb-5">
            <span className="text-gradient-neon">ARCADE BOURNEMOUTH</span>
          </h1>

          <p className="font-body text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
            40+ arcade and prize redemption machines under one roof in Boscombe —
            racing cabinets, basketball, air hockey, ticket pushers, claw machines
            and a wall of prizes. Load credits onto your LuxPlay card from{" "}
            <span className="text-neon-green font-semibold">£5</span> and play. Most
            games cost 5–10 credits.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              { Icon: Gamepad2, label: "40+ MACHINES", sub: "Arcade + redemption" },
              { Icon: Trophy, label: "WIN PRIZES", sub: "Ticket prize counter" },
              { Icon: Clock, label: "OPEN 7 DAYS", sub: "From 10am" },
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

      {/* Games on site */}
      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-14 md:py-20 max-w-4xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl tracking-wider text-center text-gradient-neon mb-10">
            WHAT YOU CAN PLAY
          </h2>
          <div className="space-y-4">
            {[
              {
                t: "RACING & DRIVING CABINETS",
                d: "Sit-in racing machines with wheels and pedals — the ones the older kids and the dads end up queuing for.",
              },
              {
                t: "SPORTS & SKILL GAMES",
                d: "Basketball hoops, air hockey and reaction games. Fast rounds, easy to jump on and off between soft play sessions.",
              },
              {
                t: "PRIZE REDEMPTION",
                d: "Ticket pushers, claw machines and redemption cabinets that pay out tickets to swap at the prize counter.",
              },
              {
                t: "CREDITS THAT DON'T EXPIRE",
                d: "Everything runs off a LuxPlay card, so there's no fiddling with coins and leftover credits are still there next visit.",
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

      {/* Credits (shared with the homepage) */}
      <div className="relative luxplay-pattern-bg">
        <Suspense fallback={null}>
          <PreSaleSection />
        </Suspense>
      </div>

      {/* FAQ */}
      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider text-center text-gradient-neon mb-12">
            ARCADE QUESTIONS
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
              href="/soft-play-bournemouth"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-cyan text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              SOFT PLAY IN BOURNEMOUTH
            </a>
            <a
              href="/things-to-do-in-bournemouth-with-kids"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-green text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              THINGS TO DO WITH KIDS
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

export default ArcadeBournemouth;
