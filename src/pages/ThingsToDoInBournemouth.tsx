import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { CloudRain, MapPin, Sun, PoundSterling } from "lucide-react";

const FooterSection = lazy(() => import("@/components/FooterSection"));

const THINGS = [
  {
    n: 1,
    t: "BOURNEMOUTH BEACH & PIER",
    d: "Seven miles of golden sand with the pier at the centre, plus the zip line off the end of it. Free to walk on, deck chairs and water sports in season, and the promenade runs the whole way to Boscombe.",
    price: "Free (beach)",
    weather: "Dry days",
    who: "Everyone",
  },
  {
    n: 2,
    t: "LOWER & CENTRAL GARDENS",
    d: "Award-winning gardens running from the town centre down to the seafront — mini golf, the aviary, the bandstand and plenty of grass for a picnic.",
    price: "Free to walk",
    weather: "Dry days",
    who: "Everyone",
  },
  {
    n: 3,
    t: "LUXPLAY — ARCADE, SOFT PLAY & CAFÉ (BOSCOMBE)",
    d: "Our place, so we'll be upfront: 40+ arcade and prize machines, a 3-level soft play frame, a separate baby soft play area for under-3s and Cafè Lux, all indoors and air conditioned at the Sovereign Centre. The reliable answer when it rains, and five minutes from Boscombe beach when it doesn't.",
    price: "Credits from £5 · soft play from £8",
    weather: "Indoors — rain or shine",
    who: "Families, groups, all ages in the arcade",
  },
  {
    n: 4,
    t: "OCEANARIUM, BOURNEMOUTH SEAFRONT",
    d: "Indoor aquarium beside the pier with sharks, turtles, otters and penguins. One of the town's few genuinely wet-weather-proof attractions.",
    price: "Paid entry",
    weather: "Indoors",
    who: "All ages",
  },
  {
    n: 5,
    t: "HENGISTBURY HEAD",
    d: "The best walk in the area: heathland and clifftop with wide views over Christchurch Harbour and out to the Isle of Wight, plus the land train down to Mudeford Spit in season.",
    price: "Free (parking charged)",
    weather: "Dry days",
    who: "Walkers, dog owners, families",
  },
  {
    n: 6,
    t: "BOSCOMBE SEAFRONT & CHINE",
    d: "Quieter than the main beach, with the chine gardens walk from Boscombe down to the sand and the pier at the bottom. Good for a slower afternoon.",
    price: "Free",
    weather: "Dry days",
    who: "Everyone",
  },
  {
    n: 7,
    t: "THE TOWN CENTRE, WESTOVER ROAD & NIGHTLIFE",
    d: "Shops around the Square and Old Christchurch Road, independents in Boscombe, then bars, restaurants and clubs along Westover Road in the evening.",
    price: "Varies",
    weather: "Mixed",
    who: "Adults, groups, stag and hen parties",
  },
  {
    n: 8,
    t: "COMPTON ACRES & THE SANDBANKS FERRY",
    d: "Formal gardens in Poole and the chain ferry across to Studland — an easy half-day trip along the coast from Bournemouth.",
    price: "Paid entry / small ferry fare",
    weather: "Dry days",
    who: "Couples, families, garden lovers",
  },
  {
    n: 9,
    t: "RUSSELL-COTES ART GALLERY & MUSEUM",
    d: "A Victorian seaside villa above the pier packed with art and curiosities. Small, indoors and often overlooked.",
    price: "Paid entry",
    weather: "Indoors",
    who: "Adults, older children",
  },
  {
    n: 10,
    t: "A BIRTHDAY OR GROUP DAY OUT",
    d: "If you're organising rather than just visiting, our party packages start at £19.99 per child: 2 hours soft play, arcade credits, a hot meal with a toy, adults free, minimum 8 children.",
    price: "From £19.99 per child",
    weather: "Indoors",
    who: "Under 11s and their grown-ups",
  },
];

const FAQS = [
  {
    q: "What are the best things to do in Bournemouth?",
    a: "The beach and pier, Lower and Central Gardens, Hengistbury Head and the Oceanarium are the classics. For indoor days, LuxPlay in Boscombe (40+ arcade games, 3-level soft play, baby soft play and Cafè Lux) and the Russell-Cotes museum are the most reliable options.",
  },
  {
    q: "What is there to do in Bournemouth when it's raining?",
    a: "Head indoors. LuxPlay at the Sovereign Centre in Boscombe is fully indoors and air conditioned, with arcade credits from £5 and soft play from £8 per child. The Oceanarium, Russell-Cotes and the town centre shops are the other main wet-weather options.",
  },
  {
    q: "What can you do in Bournemouth for free?",
    a: "Bournemouth and Boscombe beaches, the pier approach, Lower and Central Gardens, Boscombe Chine and Hengistbury Head are all free — you usually only pay for parking.",
  },
  {
    q: "What is there to do in Bournemouth in the evening?",
    a: "Westover Road is the main bar and club strip, with restaurants across the town centre and along the seafront. The arcade at LuxPlay is open until 8pm Sunday to Thursday and 9pm on Friday and Saturday.",
  },
  {
    q: "Is Bournemouth worth visiting for a day trip?",
    a: "Yes — the beach, pier and gardens sit within a short walk of each other, so a day trip works easily, with indoor venues in Boscombe and on the seafront as a backup if the weather turns.",
  },
];

const ThingsToDoInBournemouth = () => {
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
        name: "Things To Do In Bournemouth",
        item: "https://luxplay.uk/things-to-do-in-bournemouth",
      },
    ],
  };

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Things to do in Bournemouth",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: THINGS.length,
    itemListElement: THINGS.map((i) => ({
      "@type": "ListItem",
      position: i.n,
      name: i.t,
      description: i.d,
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Things To Do In Bournemouth",
    description:
      "A local guide to things to do in Bournemouth — free ideas, indoor and rainy day options, evenings and rough prices.",
    author: { "@type": "Organization", name: "LUXPLAY", url: "https://luxplay.uk/" },
    publisher: { "@type": "Organization", name: "LUXPLAY", url: "https://luxplay.uk/" },
    mainEntityOfPage: "https://luxplay.uk/things-to-do-in-bournemouth",
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Things To Do In Bournemouth — A Local Guide (Indoor &amp; Free)</title>
        <meta
          name="description"
          content="A local guide to things to do in Bournemouth: beach, pier and gardens, indoor and rainy day options, free ideas, evenings and prices — from the team at LUXPLAY in Boscombe."
        />
        <link rel="canonical" href="https://luxplay.uk/things-to-do-in-bournemouth" />
        <meta property="og:title" content="Things To Do In Bournemouth — A Local Guide" />
        <meta
          property="og:description"
          content="Beach, pier, gardens, indoor and rainy day options, free ideas and evenings in Bournemouth — with prices."
        />
        <meta property="og:url" content="https://luxplay.uk/things-to-do-in-bournemouth" />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content="Things To Do In Bournemouth — A Local Guide" />
        <meta
          name="twitter:description"
          content="Beach, pier, gardens, indoor and rainy day options, free ideas and evenings in Bournemouth."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(listJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
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

          <span className="inline-flex items-center gap-2 border-2 border-neon-green bg-neon-green/10 text-neon-green font-display text-[10px] md:text-sm tracking-[0.3em] uppercase px-5 py-2.5">
            <MapPin className="w-4 h-4" />
            A LOCAL GUIDE · BOURNEMOUTH
          </span>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-wider mt-7 mb-5">
            <span className="text-gradient-neon">THINGS TO DO IN BOURNEMOUTH</span>
          </h1>

          <p className="font-body text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
            We run an indoor entertainment centre in Boscombe, so we get asked this
            every single day. Here's the honest local list — what's free, what
            works when it rains, roughly what it costs and who it suits.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { Icon: CloudRain, label: "RAINY DAY PROOF", sub: "Indoor options marked" },
              { Icon: Sun, label: "FREE IDEAS", sub: "Beach, gardens, walks" },
              { Icon: PoundSterling, label: "REAL PRICES", sub: "No guessing" },
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

      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-14 md:py-20 max-w-4xl mx-auto">
          <div className="space-y-4">
            {THINGS.map((i) => (
              <article key={i.t} className="border-2 border-white/10 bg-[#0a0a16] p-5 md:p-6">
                <h2 className="font-display text-lg md:text-2xl tracking-wide text-neon-pink mb-3">
                  <span className="text-white/40 mr-2">{i.n}.</span>
                  {i.t}
                </h2>
                <p className="font-body text-white/70 text-sm md:text-base mb-4">{i.d}</p>
                <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-body">
                  <div className="border border-white/10 px-3 py-2">
                    <dt className="text-white/40 uppercase tracking-widest">Cost</dt>
                    <dd className="text-neon-green">{i.price}</dd>
                  </div>
                  <div className="border border-white/10 px-3 py-2">
                    <dt className="text-white/40 uppercase tracking-widest">Weather</dt>
                    <dd className="text-neon-cyan">{i.weather}</dd>
                  </div>
                  <div className="border border-white/10 px-3 py-2">
                    <dt className="text-white/40 uppercase tracking-widest">Who for</dt>
                    <dd className="text-white/80">{i.who}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-wrap justify-center gap-3">
            <a
              href="/things-to-do-in-bournemouth-with-kids"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-green text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              WITH KIDS? READ THIS
            </a>
            <a
              href="/soft-play-bournemouth"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-cyan text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              BOOK SOFT PLAY
            </a>
            <a
              href="/arcade-bournemouth"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-pink text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              THE ARCADE
            </a>
          </div>
        </div>
      </section>

      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <h2 className="font-display text-4xl md:text-6xl tracking-wider text-center text-gradient-neon mb-12">
            COMMON QUESTIONS
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

export default ThingsToDoInBournemouth;
