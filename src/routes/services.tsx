import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, House } from "lucide-react";
import { BUSINESS, canonical, telHref } from "../lib/business";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Security Installation Services — Residential & Commercial — Site Vision Security" },
      { name: "description", content: "CCTV, alarm, access control, intercom, and monitoring installation for homes and for commercial, industrial, construction, and rural sites across Melbourne and Victoria." },
      { property: "og:title", content: "Security Installation Services — Site Vision Security" },
    ],
    links: [canonical("/services")],
  }),
  component: ServicesPage,
});

const AUDIENCES = [
  {
    id: "residential",
    icon: House,
    title: "Residential",
    lead: "Security for houses, townhouses, units, and holiday homes.",
    services: [
      "CCTV & AI smart cameras",
      "Home alarm systems",
      "24/7 alarm monitoring",
      "Video intercoms & doorbells",
      "Smart home & automation",
      "Wi-Fi, TV & speaker installation",
      "Digital TV antennas",
      "Ducted vacuum",
    ],
    links: [{ label: "Residential security", to: "/industries/residential" }],
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial & Industrial",
    lead: "Security for shops, offices, warehouses, factories, construction sites, and farms.",
    services: [
      "IP / HD & AI smart CCTV",
      "Intruder alarms & 24/7 monitoring",
      "Access control",
      "Perimeter detection",
      "ANPR number-plate cameras",
      "Solar Cam hire for building sites",
      "Security fog systems",
      "Data & phone cabling",
    ],
    links: [
      { label: "Commercial", to: "/industries/commercial" },
      { label: "Construction sites", to: "/industries/construction" },
      { label: "Solar Cam hire", to: "/solar-cam" },
      { label: "Farm & rural", to: "/industries/farm" },
    ],
  },
] as const;

const SERVICES: [string, string][] = [
  ["CCTV Installation", "HD, ultra-HD, and IP camera systems designed around your property."],
  ["AI Smart Cameras", "Person and vehicle detection, smart alerts, tripwires, and fast footage search."],
  ["Solar Cam Hire", "Weekly hire of our self-powered Solar Cam for building sites."],
  ["Alarm Installation", "Wired, wireless, and remotely monitored intruder alarms."],
  ["Alarm Monitoring", "Melbourne monitoring centre operating to ASIAL Australian Standards, Grade A1."],
  ["Access Control", "Control exactly who can enter your property, and when."],
  ["Video Intercoms", "From simple audio doorbells to video units with on-site monitoring."],
  ["Perimeter Detection", "Detection for large sites — solar farms, construction sites, car yards, and warehouses."],
  ["ANPR Systems", "Automatic number-plate recognition for car parks and gates."],
  ["Security Fog Systems", "Fog cannons that stop intruders before they can take anything."],
  ["Upgrades & Takeovers", "Upgrade or take over an existing camera or alarm system."],
  ["Servicing & Repairs", "Maintenance, fault-finding, and repairs for security systems."],
  ["Data & Phone Cabling", "Network and phone cabling across your premises."],
  ["Smart Home Systems", "Lights, blinds, climate, locks, and garage doors from one app."],
  ["Wi-Fi, TV & Speakers", "Wall-mounted TVs and speakers with clean, concealed cabling."],
  ["Digital TV Antennas", "Supply and installation across Melbourne metro."],
  ["Ducted Vacuum", "Ducted vacuum systems to suit a wide range of homes."],
];

function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <div className="eyebrow mb-3">Services</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">
            Installation &amp; monitoring services
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#4A4A4A] max-w-[640px]">
            We design, install, and look after security systems — for homes, and for commercial and industrial sites of every size. Need just the equipment? <Link to="/products" className="text-[#1A1A1A] font-semibold border-b-2 border-[#DF2227] hover:text-[#DF2227]">See our products</Link>.
          </p>
        </div>
      </section>

      {/* Residential vs Commercial & Industrial */}
      <section className="section-padding bg-white">
        <div className="content-container grid md:grid-cols-2 gap-6 lg:gap-8">
          {AUDIENCES.map((a) => (
            <div key={a.id} id={a.id} className="scroll-mt-24 border border-[#E5E5E5] flex flex-col">
              <div className="bg-[#1A1A1A] text-white p-6 lg:p-8">
                <a.icon size={28} className="text-[#DF2227] mb-4" aria-hidden="true" />
                <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{a.title}</h2>
                <p className="text-white/60 mt-2 text-sm md:text-base">{a.lead}</p>
              </div>
              <div className="p-6 lg:p-8 flex-1 flex flex-col">
                <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2.5">
                  {a.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                  {a.links.map((l) => (
                    <Link key={l.to} to={l.to} className="text-[#1A1A1A] border-b-2 border-[#DF2227] pb-0.5 hover:text-[#DF2227]">
                      {l.label} →
                    </Link>
                  ))}
                </div>
                <Link to="/quote" className="btn-filled text-sm mt-6 self-start">
                  Get a {a.title.toLowerCase()} quote <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full service list */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-container">
          <div className="eyebrow mb-3">Everything we do</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight mb-10">All services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 swipe-mobile">
            {SERVICES.map(([name, desc]) => (
              <div key={name} className="bg-white border border-[#E5E5E5] p-5">
                <h3 className="font-display text-base font-bold text-[#1A1A1A] mb-1.5">{name}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-[#4A4A4A]">
            We install equipment from Bosch, Hills, Hikvision, Dahua, and Honeywell.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center">
        <div className="content-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">Not sure what you need?</h2>
          <p className="text-[#4A4A4A] mb-6 max-w-[520px] mx-auto">
            Tell us about your property and we'll recommend a system — free and with no obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/quote" className="btn-filled">Get a Free Quote <span className="arrow">→</span></Link>
            {BUSINESS.phoneDisplay && <a href={telHref()} className="btn-outline">Call {BUSINESS.phoneDisplay}</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
