import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical, telHref } from "../lib/business";
import { StructuredData } from "../components/StructuredData";
import { SOLAR_CAM, SOLAR_INSTALLS, SOLAR_PHOTOS, SOLAR_POINTS } from "../lib/solarCam";

export const Route = createFileRoute("/solar-cam")({
  head: () => ({
    meta: [
      { title: `${SOLAR_CAM.name} — Solar Security Camera Hire for Building Sites | Melbourne` },
      { name: "description", content: "Hire a solar-powered security camera for your building site by the week. No site power or internet needed — installed, monitored from your phone, and moved as your build progresses. Melbourne & Victoria." },
      { property: "og:title", content: `${SOLAR_CAM.name} — Weekly Hire for Building Sites` },
      { property: "og:image", content: SOLAR_PHOTOS.site.jpg },
    ],
    links: [canonical("/solar-cam")],
  }),
  component: SolarCamPage,
});

const STEPS = [
  ["Book", "Tell us your site address, start date, and how many cameras you need."],
  ["We install", "Our team sets the Solar Cam up on site — no power or cabling required."],
  ["Site protected", "Watch live from your phone and get alerts while the warning sign and siren deter intruders."],
  ["Move or collect", "As the build progresses we can reposition it — and collect it when the job's done."],
];

const WHO = ["Builders & developers", "Home builders", "Civil & infrastructure", "Renovation sites", "Vacant land & properties", "Equipment & material yards"];

const FAQS = [
  ["How does the weekly hire work?", "You hire the Solar Cam by the week for as long as your job runs. We deliver and install it, and collect it when you're finished. Contact us for current hire rates."],
  ["Do I need power or internet on site?", "No. The Solar Cam runs on its own solar panel and battery and connects over the mobile network — no site power, NBN, or Wi-Fi needed."],
  ["Can I see the camera on my phone?", "Yes. You can view the site live and receive alerts from your phone, wherever you are."],
  ["Can you move it as the build changes?", "Yes. As your site changes we can reposition the camera to keep the right areas covered."],
  ["How many cameras do I need?", "It depends on your site's size and layout. Tell us about the site and we'll recommend how many — usually one or two for a standard home build."],
  ["Where do you deliver?", "We service building sites across Melbourne and regional Victoria, from our base in Hallam."],
];

const FAQ_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

function Pic({ p, className = "", eager = false }: { p: { webp: string; jpg: string; alt: string; w: number; h: number }; className?: string; eager?: boolean }) {
  return (
    <picture>
      <source srcSet={p.webp} type="image/webp" />
      <img src={p.jpg} alt={p.alt} width={p.w} height={p.h} loading={eager ? "eager" : "lazy"} decoding="async" className={className} />
    </picture>
  );
}

function SolarCamPage() {
  const enquire = { product: SOLAR_CAM.enquiry };
  return (
    <div>
      <StructuredData json={FAQ_LD} />

      {/* Hero */}
      <section className="relative bg-[#111] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Pic p={SOLAR_PHOTOS.site} eager className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111]/95 via-[#111]/75 to-[#111]/20" />
        </div>
        <div className="content-container relative py-20 md:py-28 lg:py-36">
          <div className="max-w-xl">
            <span className="inline-block bg-[#DF2227] text-white text-[0.65rem] font-mono tracking-[0.2em] px-3 py-1.5 mb-6">
              {SOLAR_CAM.offer.toUpperCase()}
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.02]">
              {SOLAR_CAM.name}
            </h1>
            <p className="mt-5 text-lg text-white/75 leading-relaxed">
              A self-powered security camera for your building site. No power, no internet, no fuss — we install it, you watch from your phone, and thieves see they're being watched.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/quote" search={enquire} className="btn-filled text-base">Book a Solar Cam <span className="arrow">→</span></Link>
              {BUSINESS.phoneDisplay && (
                <a href={telHref()} className="btn-outline text-base border-white/40 text-white hover:bg-white hover:text-[#1A1A1A]">Call {BUSINESS.phoneDisplay}</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="max-w-2xl mb-12">
            <div className="eyebrow mb-3">Why hire a Solar Cam</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">Site security without the setup</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E5E5E5] border border-[#E5E5E5]">
            {SOLAR_POINTS.map((pt, i) => (
              <div key={pt.title} className="bg-white p-6 lg:p-8">
                <div className="font-mono text-xs text-[#DF2227] mb-3">0{i + 1}</div>
                <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">{pt.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{pt.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo + how hire works */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-container grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Pic p={SOLAR_PHOTOS.tower} className="w-full max-h-[620px] object-cover" />
          <div>
            <div className="eyebrow mb-3">How hire works</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-8">Up and running on your site</h2>
            <ol className="space-y-6">
              {STEPS.map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="w-9 h-9 shrink-0 bg-[#1A1A1A] text-white font-display font-bold flex items-center justify-center">{i + 1}</span>
                  <div>
                    <h3 className="font-display font-bold text-[#1A1A1A]">{title}</h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mt-1">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/quote" search={enquire} className="btn-filled text-base mt-10 inline-flex">Check availability <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* Gallery — real installs */}
      <section id="gallery" className="section-padding bg-white scroll-mt-20">
        <div className="content-container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow mb-3">Real installs</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">The {SOLAR_CAM.short} on site</h2>
              <p className="mt-3 text-[#4A4A4A] max-w-[560px]">Solar Cams protecting building sites around Melbourne.</p>
            </div>
            <Link to="/quote" search={enquire} className="btn-outline text-sm">Book one for your site</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {SOLAR_INSTALLS.map((p) => (
              <div key={p.webp} className="overflow-hidden bg-[#F5F5F5]">
                <Pic p={p} className="w-full h-full aspect-[3/4] object-cover hover:scale-[1.04] transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="section-padding bg-[#1A1A1A] text-white">
        <div className="content-container grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-3">Who it's for</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Made for building sites</h2>
            <p className="mt-4 text-white/60 max-w-[460px]">
              Materials, tools, and machinery are left on site overnight and on weekends. The {SOLAR_CAM.short} keeps an eye on them when you can't.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {WHO.map((w) => (
              <li key={w} className="border border-white/15 px-4 py-3 text-sm font-medium">{w}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">FAQ</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">Solar Cam hire questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(([q, a]) => (
              <details key={q} className="group bg-white border border-[#E5E5E5]">
                <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                  <span className="font-semibold text-sm md:text-base text-[#1A1A1A] pr-4">{q}</span>
                  <svg className="w-4 h-4 shrink-0 text-[#4A4A4A] transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <div className="px-5 pb-5"><p className="text-sm text-[#4A4A4A] leading-relaxed">{a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center">
        <div className="content-container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-3">Secure your site this week</h2>
          <p className="text-[#4A4A4A] mb-7 max-w-[520px] mx-auto">Tell us where and when — we'll confirm availability and hire rates.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/quote" search={enquire} className="btn-filled">Book a Solar Cam <span className="arrow">→</span></Link>
            {BUSINESS.phoneDisplay && <a href={telHref()} className="btn-outline">Call {BUSINESS.phoneDisplay}</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
