import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";
import { CloudRain, MapPin, Sun, Baby } from "lucide-react";

const FooterSection = lazy(() => import("@/components/FooterSection"));

const IDEAS = [
  {
    n: 1,
    t: "LUXPLAY — ARCADE, SOFT PLAY & CAFÉ (BOSCOMBE)",
    d: "Our place, so we'll be upfront about it: 40+ arcade and prize machines, a 3-level soft play frame, a separate baby soft play area for under-3s and Cafè Lux, all indoors and air conditioned at the Sovereign Centre. Soft play is £8 per child for 2 hours (£4 for the baby area) and adults go free. Arcade credits start at £5.",
    price: "Soft play from £8 · credits from £5",
    weather: "Indoors — rain or shine",
    age: "0–11 for soft play, all ages for the arcade",
  },
  {
    n: 2,
    t: "BOURNEMOUTH BEACH & PIER",
    d: "Seven miles of sandy beach with the pier at the centre. Free to walk on, ideal on a clear day, and easy to combine with an indoor stop later when everyone's had enough sand.",
    price: "Free (beach)",
    weather: "Dry days",
    age: "All ages",
  },
  {
    n: 3,
    t: "LOWER & CENTRAL GARDENS",
    d: "The long stretch of gardens running from the town centre down to the seafront — mini golf, an aviary, a bandstand and plenty of space for a picnic and a run around.",
    price: "Free to walk",
    weather: "Dry days",
    age: "All ages",
  },
  {
    n: 4,
    t: "OCEANARIUM, BOURNEMOUTH SEAFRONT",
    d: "Indoor aquarium next to the pier with sharks, turtles and penguins. A solid wet-weather option for younger children who need something to look at rather than climb on.",
    price: "Paid entry",
    weather: "Indoors",
    age: "Toddlers upwards",
  },
  {
    n: 5,
    t: "HENGISTBURY HEAD",
    d: "A proper walk with big views over Christchurch Harbour and the sea, plus the little land train in season. Good for burning off energy without spending anything.",
    price: "Free (parking charged)",
    weather: "Dry days",
    age: "Walking children upwards",
  },
  {
    n: 6,
    t: "UPTON COUNTRY PARK, POOLE",
    d: "Fifteen minutes along the coast: parkland, woodland trails, a play area and a café. Easy to pair with a Bournemouth day out.",
    price: "Free (parking charged)",
    weather: "Dry days",
    age: "All ages",
  },
  {
    n: 7,
    t: "BOSCOMBE SEAFRONT & CHINE",
    d: "Quieter than the main Bournemouth beach, with the chine gardens walk down to the sand — and a five-minute walk from LuxPlay if the weather turns.",
    price: "Free",
    weather: "Dry days",
    age: "All ages",
  },
  {
    n: 8,
    t: "A BIRTHDAY PARTY INSTEAD",
    d: "If the day out is actually a birthday, our party packages start at £19.99 per child: 2 hours soft play, arcade credits, a hot meal with a toy, adults free, minimum 8 children.",
    price: "From £19.99 per child",
    weather: "Indoors",
    age: "Under 11s",
  },
];

const FAQS = [
  {
    q: "What are the best fun things to do in Bournemouth with kids?",
    a: "For dry days the beach, the pier, Lower Gardens and Hengistbury Head are hard to beat and mostly free. For wet or cold days the reliable indoor options are LuxPlay in Boscombe (arcade, 3-level soft play, baby soft play and café) and the Oceanarium on the seafront.",
  },
  {
    q: "What is there to do in Bournemouth when it's raining?",
    a: "Stick to indoor venues. LuxPlay at the Sovereign Centre in Boscombe is fully indoors and air conditioned, with 40+ arcade games, soft play from £8 per child and Cafè Lux on site — so the children play while the adults sit down with a coffee. The Oceanarium is the other main indoor option.",
  },
  {
    q: "What can you do in Bournemouth for free with children?",
    a: "Bournemouth and Boscombe beaches, the pier approach, Lower and Central Gardens, Boscombe Chine and Hengistbury Head are all free to walk around — you usually only pay for parking.",
  },
  {
    q: "Where can toddlers play indoors in Bournemouth?",
    a: "LuxPlay has a separate padded baby soft play area for 0–3 year olds, away from the bigger frame, at £4 per child for a 2-hour session with adults free.",
  },
  {
    q: "How much does a family day out in Bournemouth cost?",
    a: "A beach and gardens day costs little more than parking and lunch. An indoor day at LuxPlay is around £8 per child for a 2-hour soft play session plus whatever you add in arcade credits (from £5), with adults free.",
  },
];

const ThingsToDoBournemouth = () => {
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
        name: "Things To Do In Bournemouth With Kids",
        item: "https://luxplay.uk/things-to-do-in-bournemouth-with-kids",
      },
    ],
  };

  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fun things to do in Bournemouth with kids",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: IDEAS.length,
    itemListElement: IDEAS.map((i) => ({
      "@type": "ListItem",
      position: i.n,
      name: i.t,
      description: i.d,
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Fun Things To Do In Bournemouth With Kids",
    description:
      "A local guide to fun things to do in Bournemouth with children, including indoor and rainy day options, free ideas and rough prices.",
    author: { "@type": "Organization", name: "LUXPLAY", url: "https://luxplay.uk/" },
    publisher: { "@type": "Organization", name: "LUXPLAY", url: "https://luxplay.uk/" },
    mainEntityOfPage: "https://luxplay.uk/things-to-do-in-bournemouth-with-kids",
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Fun Things To Do In Bournemouth With Kids (Indoor &amp; Rainy Day)</title>
        <meta
          name="description"
          content="A local guide to fun things to do in Bournemouth with kids — indoor and rainy day options, free ideas, prices and ages, from the team at LUXPLAY in Boscombe."
        />
        <link rel="canonical" href="https://luxplay.uk/things-to-do-in-bournemouth-with-kids" />
        <meta
          property="og:title"
          content="Fun Things To Do In Bournemouth With Kids (Indoor & Rainy Day)"
        />
        <meta
          property="og:description"
          content="Indoor, rainy day and free things to do in Bournemouth with children — with prices and ages."
        />
        <meta property="og:url" content="https://luxplay.uk/things-to-do-in-bournemouth-with-kids" />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content="Fun Things To Do In Bournemouth With Kids" />
        <meta
          name="twitter:description"
          content="Indoor, rainy day and free things to do in Bournemouth with children — with prices and ages."
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
            <span className="text-gradient-neon">FUN THINGS TO DO IN BOURNEMOUTH WITH KIDS</span>
          </h1>

          <p className="font-body text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
            We run an indoor play centre in Boscombe, so we spend a lot of time
            answering this question for families. Here's the honest list — what's
            free, what's indoors when the weather turns, roughly what it costs and
            which ages it suits.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            {[
              { Icon: CloudRain, label: "RAINY DAY PROOF", sub: "Indoor options marked" },
              { Icon: Sun, label: "FREE IDEAS", sub: "Beach, gardens, walks" },
              { Icon: Baby, label: "TODDLER FRIENDLY", sub: "Under-3 options" },
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

      {/* The list */}
      <section className="relative luxplay-pattern-bg">
        <div className="relative z-10 px-6 md:px-12 lg:px-20 py-14 md:py-20 max-w-4xl mx-auto">
          <div className="space-y-4">
            {IDEAS.map((i) => (
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
                    <dt className="text-white/40 uppercase tracking-widest">Ages</dt>
                    <dd className="text-white/80">{i.age}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-wrap justify-center gap-3">
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
            <a
              href="/parties"
              className="neon-cta inline-flex items-center justify-center font-display text-sm tracking-widest px-6 py-4 bg-neon-green text-[#070710] transition-transform duration-200 hover:scale-105"
            >
              BIRTHDAY PARTIES
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

export default ThingsToDoBournemouth;
