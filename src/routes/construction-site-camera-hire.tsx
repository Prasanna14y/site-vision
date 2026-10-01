import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical, telHref } from "../lib/business";
import { LOCATIONS } from "../lib/locations";
import { SOLAR_CAM, SOLAR_INSTALLS } from "../lib/solarCam";
import { StructuredData } from "../components/StructuredData";

// Builder-focused landing page for "construction site camera hire Melbourne".
// The product itself is described on /solar-cam; this page speaks to builders.
export const Route = createFileRoute("/construction-site-camera-hire")({
  head: () => ({
    meta: [
      { title: "Construction Site Camera Hire Melbourne | Solar Security Cameras for Builders — Site Vision" },
      { name: "description", content: `Hire a self-powered security camera for your building site by the week. No site power or internet needed. Installed, moved, and collected for you across Melbourne's growth corridors. ${BUSINESS.sitesSecured}+ sites secured.` },
      { property: "og:title", content: "Construction Site Camera Hire Melbourne — Site Vision Security" },
      { property: "og:image", content: SOLAR_INSTALLS[3].jpg },
    ],
    links: [canonical("/construction-site-camera-hire")],
  }),
  component: ConstructionHirePage,
});

const PROBLEMS = [
  ["Tool & equipment theft", "Power tools, generators, and small plant left on site overnight are easy to carry off."],
  ["Materials & copper", "Timber, plumbing fittings, cabling, and copper are targeted on frame and lock-up stages."],
  ["Appliances before handover", "Ovens, cooktops, and hot water units are at risk between fit-off and handover."],
  ["Vandalism & dumping", "Graffiti, broken windows, and illegal rubbish dumping cost time and money to fix."],
];

const SITE_TYPES = ["Single house builds", "Multi-unit & townhouse developments", "Knock-down rebuilds", "Renovations & extensions", "Civil & infrastructure works", "Land & lots awaiting construction"];

const FAQS: [string, string][] = [
  ["Do I need site power or internet for the camera?", "No. The Site Vision Solar Cam runs on its own solar panel and battery and connects over the mobile network, so it can go up before temporary power is connected."],
  ["How is the hire charged?", "Hire is weekly, for as long as your build runs. Contact us for current rates and availability."],
  ["Can the camera move between stages or lots?", "Yes. As the site changes we can reposition the camera to keep the right areas covered, and collect it when you're done."],
  ["Can my site supervisor see the camera?", "Yes. You can view the site live and get alerts on your phone — and share access with the people who need it."],
  ["How many cameras will my site need?", "It depends on the site's size and layout. A standard house build often needs one or two. Tell us about the site and we'll recommend what's needed."],
  ["Which areas do you cover?", "We're based in Hallam and work across Melbourne's south-east growth corridors — Casey and Cardinia — plus the rest of Melbourne and regional Victoria."],
];

function ConstructionHirePage() {
  const enquire = { product: SOLAR_CAM.enquiry };
  const growth = LOCATIONS.filter((l) => l.focus === "construction" || l.slug === "berwick" || l.slug === "narre-warren");
  const faqLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  });

  return (
    <div>
      <StructuredData json={faqLd} />

      {/* Hero */}
      <section className="relative bg-[#111] text-white overflow-hidden">
        <picture>
          <source srcSet={SOLAR_INSTALLS[3].webp} type="image/webp" />
          <img src={SOLAR_INSTALLS[3].jpg} alt={SOLAR_INSTALLS[3].alt} width={SOLAR_INSTALLS[3].w} height={SOLAR_INSTALLS[3].h} loading="eager" className="absolute inset-0 w-full h-full object-cover" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111]/95 via-[#111]/80 to-[#111]/30" />
        <div className="content-container relative py-16 md:py-28">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#DF2227] text-[0.65rem] font-mono tracking-[0.2em] px-3 py-1.5 mb-6">FOR BUILDERS · WEEKLY HIRE</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.03]">
              Construction site camera hire, Melbourne
            </h1>
            <p className="mt-5 text-lg text-white/75 leading-relaxed">
              Stop losing tools, materials, and appliances to site theft. The self-powered {SOLAR_CAM.name} goes up on day one — no power, no NBN — and moves with your build.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/quote" search={enquire} className="btn-filled text-base">Book a site camera <span className="arrow">→</span></Link>
              {BUSINESS.phoneDisplay && (
                <a href={telHref()} className="btn-outline text-base border-white/40 text-white hover:bg-white hover:text-[#1A1A1A]">Call {BUSINESS.phoneDisplay}</a>
              )}
            </div>
            <p className="mt-6 text-sm text-white/60">{BUSINESS.sitesSecured}+ construction sites, farms & land secured · Based in Hallam</p>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="max-w-2xl mb-10">
            <div className="eyebrow mb-3">The problem</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">Building sites are easy targets</h2>
            <p className="mt-4 text-[#4A4A4A] text-base md:text-lg">Sites are empty every night and weekend, often without power or lighting. A visible, monitored camera changes the odds.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 swipe-mobile">
            {PROBLEMS.map(([t, b]) => (
              <div key={t} className="border border-[#E5E5E5] p-6">
                <h3 className="font-display font-bold text-[#1A1A1A] mb-2">{t}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works for builders */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="eyebrow mb-3">How it works</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-8">From slab to handover</h2>
            <ol className="space-y-6">
              {[
                ["Book", "Send the site address, start date, and stage of the build."],
                ["We install", "The Solar Cam goes up with its siren and warning sign — no power or cabling needed."],
                ["You stay informed", "Live view and alerts on your phone, shareable with your supervisor."],
                ["We move or collect it", "Reposition as stages change, and collect at handover."],
              ].map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="w-9 h-9 shrink-0 bg-[#1A1A1A] text-white font-display font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <h3 className="font-display font-bold text-[#1A1A1A]">{t}</h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mt-1">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/solar-cam" className="inline-block mt-8 text-sm font-semibold text-[#1A1A1A] border-b-2 border-[#DF2227] pb-0.5 hover:text-[#DF2227]">
              More about the {SOLAR_CAM.name} →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[4, 11, 6, 2].map((i) => (
              <picture key={i}>
                <source srcSet={SOLAR_INSTALLS[i].webp} type="image/webp" />
                <img src={SOLAR_INSTALLS[i].jpg} alt={SOLAR_INSTALLS[i].alt} loading="lazy" className="w-full aspect-[3/4] object-cover" />
              </picture>
            ))}
          </div>
        </div>
      </section>

      {/* Site types + areas */}
      <section className="section-padding bg-[#1A1A1A] text-white">
        <div className="content-container grid md:grid-cols-2 gap-12">
          <div>
            <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-3">Sites we protect</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-6">Any build, any stage</h2>
            <ul className="grid grid-cols-2 gap-3">
              {SITE_TYPES.map((s) => <li key={s} className="border border-white/15 px-4 py-3 text-sm font-medium">{s}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-3">Growth corridors</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-6">Across Melbourne's south-east</h2>
            <div className="flex flex-wrap gap-2">
              {growth.map((l) => (
                <Link key={l.slug} to="/locations/$suburb" params={{ suburb: l.slug }} className="border border-white/20 px-4 py-2.5 text-sm font-semibold hover:border-[#DF2227] hover:text-[#DF2227] transition-colors">
                  {l.name}
                </Link>
              ))}
              <Link to="/locations" className="px-4 py-2.5 text-sm font-semibold text-[#DF2227] hover:underline">All areas →</Link>
            </div>
            <p className="mt-5 text-sm text-white/60">Also Officer, Clyde, Beaconsfield, Botanic Ridge and the rest of Melbourne and regional Victoria.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="content-container max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-8 text-center">Builder questions</h2>
          <div className="space-y-3">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group border border-[#E5E5E5]">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-semibold text-sm md:text-base text-[#1A1A1A] pr-4">{q}</span>
                  <svg className="w-4 h-4 shrink-0 text-[#4A4A4A] transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <p className="px-5 pb-5 text-sm text-[#4A4A4A] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#DF2227] text-white">
        <div className="content-container py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Protect your site this week</h2>
            <p className="text-white/80 mt-1">Tell us the address and start date — we'll confirm availability and rates.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/quote" search={enquire} className="btn-outline text-base border-white text-white hover:bg-white hover:text-[#DF2227]">Book a site camera</Link>
            {BUSINESS.phoneDisplay && <a href={telHref()} className="inline-flex items-center px-5 py-3 bg-white text-[#DF2227] font-semibold text-base">{BUSINESS.phoneDisplay}</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
