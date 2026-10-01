import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical } from "../lib/business";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Site Vision Security" },
      { name: "description", content: "100% Australian owned and operated security company with 25 years of experience in CCTV, alarms, monitoring, and access control across Melbourne and Victoria." },
      { property: "og:title", content: "About — Site Vision Security" },
    ],
    links: [canonical("/about")],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <div className="eyebrow mb-3">About</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">
            {BUSINESS.yearsExperience} years of keeping Victoria secure
          </h1>
          <p className="mt-4 text-lg text-[#4A4A4A] max-w-[600px]">
            100% Australian owned and operated commercial and home security experts. We design, install, and monitor security systems tailored to each property — and to each budget.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1A1A1A] tracking-tight mb-6">Our story</h2>
              <div className="space-y-4 text-base text-[#4A4A4A] leading-relaxed">
                <p>Site Vision Security is an Australian owned and operated security company based in Hallam, in Melbourne's south-east. With {BUSINESS.yearsExperience} years of experience, our team designs and installs security systems that deter crime, manage threats, and help catch offenders.</p>
                <p>We customise every solution to the property in front of us, for both residential and commercial customers. Our services cover CCTV, intruder alarms, access control, video intercoms, perimeter detection, and ANPR — and we partner with leading global brands such as Bosch, Hills, Hikvision, Dahua, and Honeywell.</p>
                <p>Alarm monitoring runs through a Melbourne-based monitoring centre operating to the ASIAL Australian Standard, Grade A1. Today we're adding solar-powered 4G/5G cameras for sites where mains power and Wi-Fi aren't an option.</p>
              </div>
            </div>
            <div className="bg-[#F5F5F5] p-6 lg:p-8">
              <div className="text-[0.65rem] font-mono tracking-[0.15em] text-[#DF2227] uppercase mb-6">At a Glance</div>
              <div className="space-y-6">
                {[
                  [`${BUSINESS.yearsExperience} Years`, "Experience in commercial and home security"],
                  [`${BUSINESS.homesSecured}+ Homes`, "Secured across Melbourne"],
                  [`${BUSINESS.sitesSecured}+ Sites`, "Construction sites, farms & land secured"],
                  ["Grade A1", "Melbourne monitoring centre to ASIAL Australian Standards"],
                  ["Leading brands", "Bosch, Hills, Hikvision, Dahua, Honeywell"],
                  ["100% Australian", "Owned and operated, based in Hallam VIC"],
                ].map(([stat, desc], i) => (
                  <div key={i} className="border-b border-[#E5E5E5] pb-4 last:border-0 last:pb-0">
                    <div className="font-bold font-display text-xl text-[#1A1A1A]">{stat}</div>
                    <div className="text-sm text-[#4A4A4A]">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service area */}
          <div className="bg-[#1A1A1A] text-white p-8 mt-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-display text-xl font-bold mb-3">Service Area</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">We service the entire Melbourne metropolitan area and most regional centres across Victoria. Our team regularly deploys systems in Geelong, Ballarat, Bendigo, the Yarra Valley, Mornington Peninsula, Surf Coast, and Gippsland.</p>
                <p className="text-white/60 text-sm leading-relaxed">Contact us to check coverage for your specific location.</p>
              </div>
              <div className="bg-white/5 p-4">
                <div className="text-[0.65rem] font-mono tracking-[0.15em] text-white/40 uppercase mb-3">Melbourne & Victoria</div>
                <div className="text-xs text-white/50 leading-relaxed font-mono">
                  <div>Greater Melbourne • Geelong • Ballarat</div>
                  <div>Bendigo • Yarra Valley • Mornington Peninsula</div>
                  <div>Surf Coast • Gippsland • Macedon Ranges</div>
                  <div>Western District • High Country</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] section-padding text-center">
        <div className="content-container">
          <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1A1A1A] tracking-tight mb-4">Let's talk about your site</h2>
          <p className="text-[#4A4A4A] mb-6">No obligation, no pressure — just a straightforward conversation about what you need.</p>
          <Link to="/quote" className="btn-filled">Request a Quote <span className="arrow">→</span></Link>
        </div>
      </section>
    </div>
  );
}

