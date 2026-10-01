import { createFileRoute, Link } from "@tanstack/react-router";
import { canonical } from "../../lib/business";

export const Route = createFileRoute("/industries/residential")({
  head: () => ({
    meta: [
      { title: "Residential Security — Site Vision Security" },
      { name: "description", content: "Solar-powered 4K security cameras for Melbourne homes. No mains power needed, 4G/5G connected, 24/7 monitoring. Full night vision, two-way audio, mobile app." },
    ],
    links: [canonical("/industries/residential")],
  }),
  component: ResidentialPage,
});

function ResidentialPage() {
  return (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <Link to="/services" className="text-xs font-mono text-[#DF2227] tracking-wider hover:underline mb-4 inline-block">← BACK TO SERVICES</Link>
          <div className="eyebrow mb-3">Residential</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">Home Security, Reimagined</h1>
          <p className="mt-4 text-lg text-[#4A4A4A] max-w-[600px]">Solar-powered, wire-free security that works when you need it most — during a blackout, in a storm, or when you're on holiday.</p>
        </div>
      </section>
      <SectionDetail />
    </div>
  );
}

function SectionDetail() {
  const features = [
    { title: "No Mains Power Needed", desc: "Every camera runs on solar with battery backup. No electrician required, no trenching through your garden." },
    { title: "Full 4K Colour Night Vision", desc: "See faces, car plates, and package thieves in vivid colour — even in near-total darkness." },
    { title: "Two-Way Audio Talk-Down", desc: "Speak through the camera to deter intruders or talk to delivery drivers from anywhere in the world." },
    { title: "24/7 Professional Monitoring", desc: "When motion is detected, our Melbourne monitoring centre verifies and acts — not just a phone notification." },
    { title: "Mobile App Control", desc: "Live view, clip playback, and system arm/disarm from your phone. Works on 4G/5G so you don't need home Wi-Fi." },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="content-container">
        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-[#1A1A1A] tracking-tight mb-6">Complete peace of mind for your home</h2>
            <p className="text-base text-[#4A4A4A] leading-relaxed mb-6">Whether you live in a suburban house in Camberwell, a townhouse in Fitzroy, or a rural property in the Yarra Valley — our systems are designed for Australian homes. No drilling through heritage walls, no running cables across your roof. Everything mounts in under two hours and works from day one.</p>
            <Link to="/quote" className="btn-filled">Get a Home Quote <span className="arrow">→</span></Link>
          </div>
          <div className="bg-[#F5F5F5] p-6 lg:p-8">
            <div className="text-[0.65rem] font-mono tracking-[0.15em] text-[#DF2227] uppercase mb-4">Includes</div>
            <ul className="space-y-4">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <div>
                    <div className="font-semibold text-[#1A1A1A] text-sm">{f.title}</div>
                    <div className="text-xs text-[#4A4A4A] mt-0.5">{f.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#E5E5E5] pt-12">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold font-display text-[#DF2227]">2-3 hrs</div>
              <div className="text-sm text-[#4A4A4A] mt-1">Average install time</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold font-display text-[#DF2227]">No</div>
              <div className="text-sm text-[#4A4A4A] mt-1">Electrician needed</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold font-display text-[#DF2227]">7 days</div>
              <div className="text-sm text-[#4A4A4A] mt-1">Battery without sunlight</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResidentialPage;

