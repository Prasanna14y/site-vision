import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BUSINESS, canonical, telHref } from "../../lib/business";
import { findLocation, type Location } from "../../lib/locations";
import { SOLAR_CAM, SOLAR_INSTALLS } from "../../lib/solarCam";
import { StructuredData } from "../../components/StructuredData";

export const Route = createFileRoute("/locations/$suburb")({
  loader: ({ params }) => {
    const location = findLocation(params.suburb);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const l = loaderData;
    const title = `Security Cameras & Alarms ${l.name} | CCTV Installation — Site Vision Security`;
    const description = `${l.intro.split(". ")[0]}. CCTV, alarms, intercoms, access control and Solar Cam hire in ${l.name}. Free quote: ${BUSINESS.phoneDisplay}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 300) },
        { property: "og:title", content: title },
      ],
      links: [canonical(`/locations/${l.slug}`)],
    };
  },
  component: LocationPage,
});

const PHOTO_BY_FOCUS: Record<Location["focus"], number | null> = {
  construction: 3,
  residential: 0,
  mixed: 1,
  commercial: null,
};

function LocationPage() {
  const l = Route.useLoaderData();
  const photoIndex = PHOTO_BY_FOCUS[l.focus];
  const photo = photoIndex === null ? null : SOLAR_INSTALLS[photoIndex];
  const nearby = l.nearby.map((s) => findLocation(s)).filter((x): x is Location => !!x);
  const hireFirst = l.focus === "construction";

  const jsonLd = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `Security systems in ${l.name}`,
      serviceType: "Security system installation",
      provider: { "@id": `${BUSINESS.siteUrl}/#business` },
      areaServed: [l.name, ...l.alsoCovering].map((name) => ({ "@type": "Place", name: `${name} VIC` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BUSINESS.siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Areas we service", item: `${BUSINESS.siteUrl}/locations` },
        { "@type": "ListItem", position: 3, name: l.name, item: `${BUSINESS.siteUrl}/locations/${l.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: l.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ]);

  return (
    <div>
      <StructuredData json={jsonLd} />

      {/* Hero */}
      <section className={`relative overflow-hidden ${photo ? "bg-[#111] text-white" : "bg-[#1A1A1A] text-white"}`}>
        {photo && (
          <>
            <picture>
              <source srcSet={photo.webp} type="image/webp" />
              <img src={photo.jpg} alt={photo.alt} width={photo.w} height={photo.h} loading="eager" className="absolute inset-0 w-full h-full object-cover" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111]/95 via-[#111]/80 to-[#111]/35" />
          </>
        )}
        {!photo && <div className="absolute inset-0 security-grid opacity-[0.07]" aria-hidden="true" />}
        <div className="content-container relative py-14 md:py-24">
          <nav aria-label="Breadcrumb" className="text-xs font-mono tracking-wider text-white/60 mb-6">
            <Link to="/" className="hover:text-white">HOME</Link> <span aria-hidden="true">/</span>{" "}
            <Link to="/locations" className="hover:text-white">AREAS</Link> <span aria-hidden="true">/</span>{" "}
            <span className="text-white">{l.name.toUpperCase()}</span>
          </nav>
          <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-3">
            {l.name} · {l.council}
          </div>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05]">{l.headline}</h1>
          <p className="mt-5 text-base md:text-lg text-white/75 max-w-[620px] leading-relaxed">{l.intro}</p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link to="/quote" search={{ suburb: l.name }} className="btn-filled text-base">
              Free quote in {l.name} <span className="arrow">→</span>
            </Link>
            {BUSINESS.phoneDisplay && (
              <a href={telHref()} className="btn-outline text-base border-white/40 text-white hover:bg-white hover:text-[#1A1A1A]">
                Call {BUSINESS.phoneDisplay}
              </a>
            )}
          </div>
          <p className="mt-6 text-sm text-white/60">
            {l.slug === "hallam" ? "Based right here in Hallam" : `Based in Hallam, ${l.drive} away`} · {BUSINESS.yearsExperience} years' experience · {BUSINESS.homesSecured}+ homes and {BUSINESS.sitesSecured}+ sites secured.
          </p>
        </div>
      </section>

      {/* Local + services */}
      <section className="section-padding bg-white">
        <div className="content-container grid lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <div className="eyebrow mb-3">{l.name}</div>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-5">{l.localTitle}</h2>
            <div className="space-y-4 text-base md:text-lg text-[#4A4A4A] leading-relaxed">
              {l.local.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
          <div className="lg:col-span-2 bg-[#F5F5F5] p-6 lg:p-8 self-start">
            <h2 className="font-display text-lg font-bold text-[#1A1A1A] mb-4">What we install in {l.name}</h2>
            <ul className="space-y-2.5">
              {l.services.map((s) => (
                <li key={s} className="flex items-start gap-2.5 text-sm text-[#1A1A1A]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  {s}
                </li>
              ))}
            </ul>
            <Link to="/services" className="inline-block mt-5 text-sm font-semibold text-[#1A1A1A] border-b-2 border-[#DF2227] pb-0.5 hover:text-[#DF2227]">
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* Solar Cam hire */}
      <section className={hireFirst ? "bg-[#111] text-white" : "bg-[#F5F5F5]"}>
        <div className="content-container py-12 md:py-16 grid md:grid-cols-5 gap-8 items-center">
          <picture className="md:col-span-2">
            <source srcSet={SOLAR_INSTALLS[6].webp} type="image/webp" />
            <img src={SOLAR_INSTALLS[6].jpg} alt={SOLAR_INSTALLS[6].alt} loading="lazy" className="w-full max-h-[320px] object-cover" />
          </picture>
          <div className="md:col-span-3">
            <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-3">{SOLAR_CAM.offer}</div>
            <h2 className={`font-display text-2xl md:text-3xl font-bold tracking-tight ${hireFirst ? "" : "text-[#1A1A1A]"}`}>
              Building in {l.name}? Hire a Solar Cam
            </h2>
            <p className={`mt-3 leading-relaxed ${hireFirst ? "text-white/70" : "text-[#4A4A4A]"}`}>
              Our self-powered {SOLAR_CAM.name} needs no site power or internet. We install it on your {l.name} site, you watch from your phone, and we move or collect it as the build progresses.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/quote" search={{ product: SOLAR_CAM.enquiry, suburb: l.name }} className="btn-filled text-sm">
                Book a Solar Cam <span className="arrow">→</span>
              </Link>
              <Link to="/construction-site-camera-hire" className={`btn-outline text-sm ${hireFirst ? "border-white/30 text-white hover:bg-white hover:text-[#1A1A1A]" : ""}`}>
                Construction site hire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ + nearby */}
      <section className="section-padding bg-white">
        <div className="content-container grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-6">{l.name} questions</h2>
            <div className="space-y-3">
              {[...l.faqs, [`Do you cover suburbs near ${l.name}?`, `Yes — we also cover ${l.alsoCovering.join(", ")}, and the rest of Melbourne and regional Victoria.`] as [string, string]].map(([q, a]) => (
                <details key={q} className="group border border-[#E5E5E5]">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                    <span className="font-semibold text-sm md:text-base text-[#1A1A1A] pr-4">{q}</span>
                    <svg className="w-4 h-4 shrink-0 text-[#4A4A4A] transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
                  </summary>
                  <p className="px-4 pb-4 text-sm text-[#4A4A4A] leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-6">Nearby areas</h2>
            <div className="flex flex-wrap gap-2">
              {nearby.map((n) => (
                <Link
                  key={n.slug}
                  to="/locations/$suburb"
                  params={{ suburb: n.slug }}
                  className="border border-[#E5E5E5] px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] hover:border-[#DF2227] hover:text-[#DF2227] transition-colors"
                >
                  {n.name} →
                </Link>
              ))}
              <Link to="/locations" className="px-4 py-2.5 text-sm font-semibold text-[#DF2227] hover:underline">
                All areas
              </Link>
            </div>
            <p className="mt-6 text-sm text-[#4A4A4A]">
              Also covering {l.alsoCovering.join(", ")}.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#DF2227] text-white">
        <div className="content-container py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">Free security quote in {l.name}</h2>
            <p className="text-white/80 mt-1">Tell us about your property — we'll recommend the right system.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/quote" search={{ suburb: l.name }} className="btn-outline text-base border-white text-white hover:bg-white hover:text-[#DF2227]">
              Get a free quote
            </Link>
            {BUSINESS.phoneDisplay && (
              <a href={telHref()} className="inline-flex items-center px-5 py-3 bg-white text-[#DF2227] font-semibold text-base">
                {BUSINESS.phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
