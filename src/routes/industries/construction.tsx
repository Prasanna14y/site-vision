import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "../../lib/business";

export const Route = createFileRoute("/industries/construction")({
  head: () => ({
    meta: [
      { title: "Construction Site Security — Site Vision Security" },
      { name: "description", content: "Solar-powered 4G security cameras for Melbourne construction sites. Quick-deploy, wireless, motion-activated deterrent. Protect your plant, materials, and progress." },
    ],
    links: [canonical("/industries/construction")],
  }),
  component: () => (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <Link to="/services" className="text-xs font-mono text-[#DF2227] tracking-wider hover:underline mb-4 inline-block">← BACK TO SERVICES</Link>
          <div className="eyebrow mb-3">Construction</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">Site Security That Moves With You</h1>
          <p className="mt-4 text-lg text-[#4A4A4A] max-w-[600px]">Deploy in hours, relocate as the build progresses. Solar-powered, 4G/5G connected — no power poles, no Wi-Fi, no compromise.</p>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1A1A1A] tracking-tight mb-6">Built for the build site</h2>
              <p className="text-base text-[#4A4A4A] leading-relaxed mb-4">Construction sites are open, unpowered, and constantly changing — which makes them the hardest property type to secure. Site Vision's solar camera poles deploy anywhere on site in under an hour, with no trenching, no sparky, and no site WiFi. When the project moves to the next phase, the cameras move with it.</p>
              <p className="text-base text-[#4A4A4A] leading-relaxed mb-6">Each camera tower is self-contained: solar panel, battery, 4G modem, 4K camera with colour night vision, and a siren/strobe deterrent. No external cables. No data costs — we include the SIM.</p>
              <Link to="/solar-cam" className="btn-filled">Hire a Solar Cam <span className="arrow">→</span></Link>
            </div>
            <div className="bg-[#F5F5F5] p-6 lg:p-8">
              <div className="text-[0.65rem] font-mono tracking-[0.15em] text-[#DF2227] uppercase mb-4">Key Benefits</div>
              <ul className="space-y-4">
                {[
                  ["Quick Deployment", "Full site covered and online within hours — not days"],
                  ["No Infrastructure", "No power, no data cabling, no civil works needed"],
                  ["Active Deterrence", "Motion triggers siren + strobe + verbal warning automatically"],
                  ["Time-Lapse Recording", "Document your build progress automatically"],
                  ["Rapid Redeployment", "Pack up and move to the next site in half a day"],
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
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-[#E5E5E5] p-6 text-center">
              <div className="text-3xl font-bold font-display text-[#DF2227]">60 min</div>
              <div className="text-sm text-[#4A4A4A] mt-1">Per-pole installation</div>
            </div>
            <div className="border border-[#E5E5E5] p-6 text-center">
              <div className="text-3xl font-bold font-display text-[#DF2227]">4G/5G</div>
              <div className="text-sm text-[#4A4A4A] mt-1">No site power or NBN needed</div>
            </div>
            <div className="border border-[#E5E5E5] p-6 text-center">
              <div className="text-3xl font-bold font-display text-[#DF2227]">100%</div>
              <div className="text-sm text-[#4A4A4A] mt-1">Wireless — no site disruption</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
});

