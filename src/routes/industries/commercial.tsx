import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "../../lib/business";

export const Route = createFileRoute("/industries/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Security — Site Vision Security" },
      { name: "description", content: "Multi-site security management for Melbourne businesses. Solar 4G cameras, access control, staff monitoring, and 24/7 professional response." },
    ],
    links: [canonical("/industries/commercial")],
  }),
  component: () => (
    <Page
      title="Commercial Security"
      subtitle="Unified security for your entire portfolio"
      desc="One dashboard. One monitoring centre. One reliable system across all your properties — retail, warehousing, offices, and mixed-use sites."
      features={[
        { title: "Multi-Site Dashboard", desc: "View every camera from every property on one screen. Switch between sites in a single click." },
        { title: "Access Control Integration", desc: "Link doors, gates, and fob readers to your camera system. See who entered and when." },
        { title: "After-Hours Detection", desc: "AI motion analysis distinguishes staff from intruders. Alerts only when there's a real event." },
        { title: "Employee & Contractor Oversight", desc: "Know who is on site and when. Perfect for after-hours trades and shift management." },
        { title: "Cloud Retention & Audit Trail", desc: "All footage stored in Australian data centres. 30-90 day retention for compliance and insurance." },
      ]}
      backLink="/services"
    />
  ),
});

function Page({ title, subtitle, desc, features, backLink }: any) {
  return (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <Link to={backLink} className="text-xs font-mono text-[#DF2227] tracking-wider hover:underline mb-4 inline-block">← BACK TO SERVICES</Link>
          <div className="eyebrow mb-3">Commercial</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">{title}</h1>
          <p className="mt-4 text-lg text-[#4A4A4A] max-w-[600px]">{subtitle}</p>
          <p className="mt-4 text-base text-[#4A4A4A] max-w-[600px]">{desc}</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f: any, i: number) => (
              <div key={i} className="border border-[#E5E5E5] p-6">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="font-semibold text-[#1A1A1A]">{f.title}</span>
                </div>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/quote" className="btn-filled">Get a Commercial Quote <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

