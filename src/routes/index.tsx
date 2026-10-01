import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical, telHref } from "../lib/business";
import CameraFeed, { HERO_IMAGE } from "../components/CameraFeed";
import { PHOTOS } from "../lib/photos";
import { StructuredData } from "../components/StructuredData";
import LogoIntro from "../components/LogoIntro";
import ClientMarquee from "../components/ClientMarquee";
import SolarFeature, { SolarInstallsStrip } from "../components/SolarFeature";
import { BRANDS, CATALOGUE } from "../lib/catalogue";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Site Vision Security — Melbourne Security Systems & Monitoring" },
      { name: "description", content: "Solar-powered 4G/5G security cameras, CCTV installation, alarm systems, access control, and 24/7 remote monitoring for Melbourne homes, businesses, and construction sites." },
      { property: "og:title", content: "Site Vision Security — Get Your Site Secured and Rest Assured" },
      { property: "og:description", content: "Solar-powered 4G/5G security cameras with 24/7 professional monitoring for Melbourne and Victoria." },
    ],
    links: [canonical("/")],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* Brand intro — big logo with scroll animation */}
      <LogoIntro />

      {/* Section 1: Hero */}
      <HeroSection />

      {/* Sites we've secured — scrolling names */}
      <ClientMarquee />

      {/* Solar Cam spotlight + real installs */}
      <SolarFeature />
      <SolarInstallsStrip />

      {/* Section 2: Trust strip */}
      <TrustStrip />

      {/* Section 3: How It Works */}
      <HowItWorks />

      {/* Section 4: Product Tiers */}
      <ProductTiers />

      {/* Products teaser */}
      <ProductsTeaser />

      {/* Service area */}
      <ServiceArea />

      {/* Section 6: FAQ */}
      <FAQSection />
      <StructuredData json={FAQ_JSON_LD} />

      {/* Section 7: Final CTA */}
      <FinalCTA />
    </div>
  );
}

/* =============== HERO =============== */
function HeroSection() {
  return (
    <section className="relative py-12 md:py-0 md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 security-grid opacity-40" />

      {/* Background visual */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F8F8F8]" />

      {/* Decorative red accent line */}
      <div className="absolute top-0 left-0 w-1 h-full bg-[#DF2227] hidden md:block" />

      <div className="content-container relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center md:min-h-[70vh]">
          {/* Left: Text */}
          <div className="max-w-xl pt-8">
            <div className="eyebrow mb-5">Melbourne & Victoria</div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1A1A1A] tracking-tight leading-none">
              Security cameras &amp; alarms,
              <br />
              <span className="text-[#DF2227]">monitored 24/7</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-[#4A4A4A] leading-relaxed max-w-[500px]">
              Solar-powered, 4G/5G connected security systems for homes, businesses, and construction sites across Melbourne and Victoria. No mains power needed.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link to="/quote" className="hero-cta-link text-lg">
                Get a Free Quote →
              </Link>
              {BUSINESS.phoneDisplay && (<a href={telHref()} className="btn-outline text-base">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                Call Now
              </a>)}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 mt-10 text-xs text-[#4A4A4A]">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="font-medium">{BUSINESS.yearsExperience} Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="font-medium">Australian Owned &amp; Operated</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span className="font-medium">24/7 Monitoring Centre</span>
              </div>
            </div>
          </div>

          {/* Right: Hero visual */}
          <div className="relative">
            <CameraFeed
              cam="CAM-01"
              label="Live monitoring • 4G/5G connected"
              image={PHOTOS.hero ?? HERO_IMAGE}
              alt={PHOTOS.hero ? "Site Vision Security camera installation" : "Security camera view of a Melbourne home at dusk"}
              priority
              className="border border-[#E5E5E5]"
            />
            {/* Spec badge */}
            <div className="hidden sm:block absolute -bottom-3 -right-3 bg-[#1A1A1A] text-white px-4 py-3 text-xs font-mono leading-tight">
              <span className="text-[#DF2227] font-bold text-sm">4K</span> HDR<br />
              <span className="text-white/60">Night Vision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== TRUST STRIP =============== */
function TrustStrip() {
  return (
    <section className="border-t border-b border-[#E5E5E5] bg-[#F5F5F5] py-8">
      <div className="content-container">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {/* Accreditation badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-mono text-[#4A4A4A] text-center">
            <span className="bg-white border border-[#E5E5E5] px-3 py-2 font-semibold">{BUSINESS.yearsExperience} YEARS</span>
            <span className="hidden sm:inline">|</span>
            <span>BOSCH • HIKVISION • DAHUA • HILLS</span>
            <span className="hidden sm:inline">|</span>
            <span>ASIAL GRADE A1 MONITORING</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== HOW IT WORKS =============== */
function HowItWorks() {
  const steps = [
    {
      number: "01",
      label: "Design & Install",
      desc: "We survey your site, design a custom system, and install solar-powered 4G/5G cameras in hours — not days. No trenching, no mains power, no disruption.",
      icon: "🔲"
    },
    {
      number: "02",
      label: "Monitoring & Response",
      desc: "Your system connects to our 24/7 monitoring centre. Any alert is verified and acted on within seconds — not minutes.",
      icon: "🔲"
    },
    {
      number: "03",
      label: "Maintenance",
      desc: "Remote diagnostics and regular system checks keep your cameras online. We handle firmware, battery health, and signal strength proactively.",
      icon: "🔲"
    },
    {
      number: "04",
      label: "Footage & Records",
      desc: "Access your footage on demand via our secure portal or mobile app. Clips are stored encrypted in Australian data centres.",
      icon: "🔲"
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <div className="text-center mb-14">
          <div className="eyebrow mb-3">Process</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            How it works
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#4A4A4A] max-w-[600px] mx-auto">
            From survey to secure — four steps to a fully monitored property.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Step number */}
              <div className="text-5xl md:text-6xl font-bold font-display text-[#DF2227] opacity-10 leading-none mb-4">
                {step.number}
              </div>
              {/* Vertical connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-3 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px bg-[#E5E5E5]" />
              )}
              <h3 className="text-xl font-bold font-display text-[#1A1A1A] mb-2">{step.label}</h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============== PRODUCT TIERS =============== */
function ProductTiers() {
  const tiers = [
    {
      name: "Home",
      subtitle: "For houses, townhouses & units",
      features: ["Solar or wired 4K cameras", "Colour night vision", "Intruder alarm & app control", "Video intercom & smart home options", "Optional 24/7 alarm monitoring"],
      bestFor: "Homes, townhouses, holiday homes",
    },
    {
      name: "Business",
      subtitle: "For shops, offices & warehouses",
      featured: true,
      features: ["IP / HD CCTV systems", "Solar cameras for yards & car parks", "Intruder alarms & 24/7 monitoring", "Access control & intercoms", "Security fog systems", "Data & phone cabling"],
      bestFor: "Retail, offices, warehouses, workshops",
    },
    {
      name: "Sites & Large Properties",
      subtitle: "For construction, farms & big perimeters",
      features: ["Off-grid solar 4G/5G cameras", "Perimeter detection", "ANPR number-plate cameras", "Siren & strobe deterrence", "Multi-camera, multi-site setups"],
      bestFor: "Construction sites, farms, car yards, solar farms",
    },
  ];

  return (
    <section className="section-padding bg-[#F5F5F5]" id="products">
      <div className="content-container">
        <div className="text-center mb-14">
          <div className="eyebrow mb-3">Services</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            Solutions for every site
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#4A4A4A] max-w-[600px] mx-auto">
            One size doesn't fit all. We design a system that matches your site's size and risk profile.
          </p>
          <Link to="/services" className="inline-block mt-4 text-sm font-semibold text-[#1A1A1A] border-b-2 border-[#DF2227] pb-0.5 hover:text-[#DF2227] transition-colors">
            View all services →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`bg-white border ${
                tier.featured ? "border-[#DF2227] border-2" : "border-[#E5E5E5]"
              } relative flex flex-col`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DF2227] text-white text-[0.65rem] font-mono tracking-widest px-4 py-1">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold font-display text-[#1A1A1A]">{tier.name}</h3>
                <p className="text-sm text-[#4A4A4A] mt-1">{tier.subtitle}</p>
                <p className="mt-4 text-[0.7rem] font-mono text-[#4A4A4A] uppercase tracking-wider mb-4 pb-4 border-b border-[#E5E5E5]">
                  {tier.bestFor}
                </p>
                <ul className="space-y-3">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto px-6 lg:px-8 pb-6 lg:pb-8">
                <Link to="/quote" className="card-cta w-full justify-center">
                  Get a Free Quote →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============== PRODUCTS TEASER =============== */
function ProductsTeaser() {
  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="eyebrow mb-3">Products</div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
              Shop security products
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#4A4A4A] max-w-[560px]">
              Need just the equipment? We supply cameras, recorders, alarms, access control, cables, and accessories from {BRANDS.slice(0, 3).join(", ")} and more.
            </p>
          </div>
          <Link to="/products" className="btn-outline text-sm">Browse all products</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {CATALOGUE.map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              hash={cat.id}
              className="group border border-[#E5E5E5] p-5 md:p-6 hover:border-[#1A1A1A] transition-colors"
            >
              <span className="w-10 h-10 bg-[#F5F5F5] text-[#DF2227] flex items-center justify-center mb-4 group-hover:bg-[#1A1A1A] transition-colors">
                <cat.icon size={20} aria-hidden="true" />
              </span>
              <h3 className="font-display text-base md:text-lg font-bold text-[#1A1A1A]">{cat.name}</h3>
              <p className="hidden sm:block text-sm text-[#4A4A4A] mt-1">{cat.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============== SERVICE AREA =============== */
const AREAS = [
  { region: "South-East Melbourne", places: ["Hallam", "Narre Warren", "Berwick", "Dandenong", "Cranbourne", "Pakenham", "Officer", "Clyde", "Keysborough", "Frankston"] },
  { region: "Greater Melbourne", places: ["Inner city & CBD", "Eastern suburbs", "Northern suburbs", "Western suburbs", "Bayside", "Mornington Peninsula"] },
  { region: "Regional Victoria", places: ["Geelong", "Ballarat", "Bendigo", "Gippsland", "Yarra Valley", "Contact us for your area"] },
];

function ServiceArea() {
  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
          <div className="md:col-span-2">
            <div className="eyebrow mb-3">Service area</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              Local to Melbourne's south-east
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#4A4A4A] leading-relaxed">
              Our team is based in {BUSINESS.location}, so we're close by for installs, servicing, and call-outs across Casey, Cardinia, Greater Dandenong, and Frankston — and we cover the rest of Melbourne and regional Victoria too.
            </p>
            <Link to="/contact" className="inline-block mt-6 text-sm font-semibold text-[#1A1A1A] border-b-2 border-[#DF2227] pb-0.5 hover:text-[#DF2227] transition-colors">
              Check coverage for your suburb →
            </Link>
          </div>
          <div className="md:col-span-3 grid sm:grid-cols-3 gap-6">
            {AREAS.map((area) => (
              <div key={area.region} className="border-t-2 border-[#1A1A1A] pt-4">
                <h3 className="font-mono text-[0.65rem] tracking-[0.15em] text-[#DF2227] uppercase mb-3">{area.region}</h3>
                <ul className="space-y-1.5">
                  {area.places.map((p) => (
                    <li key={p} className="text-sm text-[#4A4A4A]">{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== FAQ =============== */
/* FAQ content — also emitted as FAQPage structured data for Google. */
const FAQS = [
  {
    q: "Do solar cameras still work through a Melbourne winter?",
    a: "Yes. Our solar cameras pair the panel with a high-capacity battery sized for short, overcast winter days, so they keep recording through runs of poor sun. We position and angle every panel on site to get the most out of the light available.",
  },
  {
    q: "Do I need mains power, Wi-Fi or an NBN connection?",
    a: "No. Solar cameras run off their own panel and battery and connect over the 4G/5G mobile network, so they suit construction sites, farms, and anywhere cabling isn't practical. For homes and businesses that already have power and internet, we also install wired IP/HD CCTV systems.",
  },
  {
    q: "How does monitoring work?",
    a: "Alarm monitoring runs through a Melbourne monitoring centre operating to ASIAL Australian Standards, Grade A1. When an alarm or camera event is triggered, operators assess it and follow the response plan agreed with you — contacting you, your nominated contacts, or emergency services as required. You can also watch your cameras live from the app.",
  },
  {
    q: "Can I see my cameras on my phone?",
    a: "Yes. Every system comes with app access, so you can view live and recorded footage, get motion alerts, and arm or disarm your alarm from anywhere.",
  },
  {
    q: "Which brands do you install?",
    a: "We work with leading security brands including Bosch, Hills, Hikvision, Dahua, and Honeywell, and recommend the equipment that best suits your site and budget.",
  },
  {
    q: "Can you upgrade or take over my existing system?",
    a: "Often, yes. We can assess your existing cameras or alarm, reuse what's still serviceable, and upgrade the rest — including adding monitoring or app access to an older system.",
  },
  {
    q: "What areas do you service?",
    a: "We're based in Hallam and service all of Melbourne — especially the south-east, including Casey, Cardinia, Dandenong, and Frankston — plus regional Victoria. Contact us to confirm coverage for your location.",
  },
  {
    q: "How do I get a quote?",
    a: "Fill in the quote form or give us a call. Tell us your suburb, the type of property, and what you want to protect, and we'll come back with a tailored recommendation — free and with no obligation.",
  },
];

const FAQ_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

function FAQSection() {

  return (
    <section className="section-padding bg-[#F5F5F5]">
      <div className="content-container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">FAQ</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight">
            Common questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-white border border-[#E5E5E5]">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <span className="font-semibold text-sm md:text-base text-[#1A1A1A] pr-4">{faq.q}</span>
                <svg className="w-4 h-4 shrink-0 text-[#4A4A4A] transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============== FINAL CTA =============== */
function FinalCTA() {
  return (
    <section className="section-padding bg-[#1A1A1A] relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      <div className="content-container text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="eyebrow text-white/40 mb-4">Get Protected</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Your site deserves more than a camera. It deserves a command centre.
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/60 max-w-[550px] mx-auto">
            No obligation site survey and fast quote — usually within 24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link to="/quote" className="btn-filled text-base">
              Get Your Free Quote
              <span className="arrow">→</span>
            </Link>
            {BUSINESS.phoneDisplay && (<a href={telHref()} className="btn-outline text-base border-white/30 text-white hover:bg-white hover:text-[#1A1A1A]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              {BUSINESS.phoneDisplay}
            </a>)}
          </div>
        </div>
      </div>
    </section>
  );
}


