import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "../../lib/business";

export const Route = createFileRoute("/industries/farm")({
  head: () => ({
    meta: [
      { title: "Farm & Rural Security — Site Vision Security" },
      { name: "description", content: "Solar-powered 4G security cameras for rural Victoria properties. No broadband, no mains power needed. Protect livestock, equipment, and outbuildings remotely." },
    ],
    links: [canonical("/industries/farm")],
  }),
  component: () => (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <Link to="/services" className="text-xs font-mono text-[#DF2227] tracking-wider hover:underline mb-4 inline-block">← BACK TO SERVICES</Link>
          <div className="eyebrow mb-3">Farm & Rural</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">Self-Sufficient Security for the Bush</h1>
          <p className="mt-4 text-lg text-[#4A4A4A] max-w-[600px]">Tough, off-grid cameras built for the Australian landscape. No powerlines, no broadband — just reliable protection for what you've built.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1A1A1A] tracking-tight mb-6">Off-grid by design</h2>
              <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">Rural properties face unique challenges — long distances, limited connectivity, and no mains power at the sites that need watching most. Our cameras are engineered for these conditions: oversized solar panels, extended battery reserves, and 4G/5G modems with external antenna ports for fringe reception areas.</p>
              <p className="text-base text-[#4A4A4A] leading-relaxed mb-6">Whether you're monitoring a hay shed in Euroa, a shearing shed in Hamilton, or a vineyard gate in the Yarra Valley — our systems work where others won't.</p>
              <Link to="/quote" className="btn-filled">Get a Rural Quote <span className="arrow">→</span></Link>
            </div>
            <div className="bg-[#F5F5F5] p-6 lg:p-8">
              <div className="text-[0.65rem] font-mono tracking-[0.15em] text-[#DF2227] uppercase mb-4">Rural Features</div>
              <ul className="space-y-4">
                {[
                  ["Extended Solar Range", "Large panels + high-capacity battery for limited-sun conditions"],
                  ["Fringe Signal Mode", "Optimised 4G/5G with external antenna support for remote areas"],
                  ["Livestock Monitoring", "AI detection for stock movement, gate openings, vehicle access"],
                  ["Weatherproof Enclosure", "IP67 rated — dust, rain, extreme heat, and hail resistant"],
                  ["Low-Bandwidth Mode", "Full security monitoring on as little as 500MB/month per camera"],
                ].map(([title, desc], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    <div>
                      <div className="font-semibold text-[#1A1A1A] text-sm">{title}</div>
                      <div className="text-xs text-[#4A4A4A] mt-0.5">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[#1A1A1A] p-8 text-center text-white">
            <div className="font-display text-xl md:text-2xl font-bold mb-3">Coverage across the state</div>
            <p className="text-white/60 text-sm max-w-[600px] mx-auto">We service farms and rural properties across Victoria — from the Murray River to the Surf Coast, from the High Country to the Western District. Telstra and Optus 4G/5G coverage maps are checked during every site assessment.</p>
          </div>
        </div>
      </section>
    </div>
  ),
});

