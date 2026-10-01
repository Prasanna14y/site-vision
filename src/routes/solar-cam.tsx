import { createFileRoute, Link } from "@tanstack/react-router";
import CameraFeed from "../components/CameraFeed";
import { PHOTOS } from "../lib/photos";
import { BUSINESS, canonical, telHref } from "../lib/business";

export const Route = createFileRoute("/solar-cam")({
  head: () => ({
    meta: [
      { title: "Solar Cam 4K — Site Vision Security" },
      { name: "description", content: "Solar-powered 4G/5G security camera with 4K HDR, colour night vision, two-way audio, and siren/strobe deterrence. No mains power needed. Ideal for construction sites and remote properties." },
      { property: "og:title", content: "Solar Cam 4K — Site Vision Security" },
    ],
    links: [canonical("/solar-cam")],
  }),
  component: SolarCamPage,
});

const features = [
  {
    title: "No Mains Power Required",
    desc: "A high-efficiency 20W solar panel and 10,000mAh battery keep the camera running for 7-10 days without direct sunlight. No electrician, no trenching, no power bills.",
    icon: "sun",
  },
  {
    title: "4K HDR Colour Night Vision",
    desc: "Advanced starlight sensor delivers full-colour footage in near-total darkness (0.01 lux). See faces, vehicle plates, and clothing details — not grayscale silhouettes.",
    icon: "moon",
  },
  {
    title: "Two-Way Audio with Noise Cancellation",
    desc: "Speak directly through the camera to challenge intruders or talk to delivery drivers. Built-in noise cancellation ensures clear audio even in wind or traffic.",
    icon: "mic",
  },
  {
    title: "Siren & Strobe Deterrence",
    desc: "When motion is detected, the 100dB siren and high-intensity LED strobe activate automatically — a proven deterrent that drives intruders off before a crime occurs.",
    icon: "bell",
  },
  {
    title: "4G/5G Cellular Connectivity",
    desc: "No WiFi, no Ethernet, no broadband required. Each camera has its own SIM and connects directly to the Telstra/Optus/Vodafone network. Deploy anywhere there's mobile coverage.",
    icon: "signal",
  },
  {
    title: "Rapid Deployment",
    desc: "Mount on a wall, pole, or our freestanding solar pole kit. Installation takes under an hour per camera. No cables, no disruption, no wait for utility connections.",
    icon: "zap",
  },
];

const specs = [
  { label: "Resolution", value: "4K HDR (3840×2160) @ 15fps" },
  { label: "Night Vision", value: "Full colour, 0.01 lux starlight sensor" },
  { label: "Lens", value: "120° wide-angle, f/1.6 aperture" },
  { label: "Detection", value: "PIR + AI motion (human/vehicle/animal)" },
  { label: "Audio", value: "Two-way with noise cancellation" },
  { label: "Deterrent", value: "100dB siren + LED strobe" },
  { label: "Battery", value: "10,000mAh LiFePO4 (7-10 day reserve)" },
  { label: "Solar Panel", value: "20W monocrystalline" },
  { label: "Connectivity", value: "4G LTE / 5G (auto failover)" },
  { label: "SIM", value: "Included with annual plan" },
  { label: "Storage", value: "Cloud — 7/30/90 day retention" },
  { label: "Weather Rating", value: "IP67 — dust, rain, hail proof" },
  { label: "Operating Temp", value: "-20°C to +60°C" },
  { label: "Dimensions", value: "180×120×100mm (camera head)" },
  { label: "Weight", value: "2.8kg (including battery)" },
];

function SolarCamPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-padding bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(223,34,39,0.3) 0%, transparent 50%)'
        }} />
        <div className="content-container relative z-10">
          <div className="eyebrow text-white/40 mb-3">Featured Product</div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">Solar Cam 4K</h1>
                <span className="text-[0.6rem] font-mono tracking-widest bg-[#DF2227] text-white px-2 py-1">BEST SELLER</span>
              </div>
              <p className="text-lg text-white/60 mt-4 leading-relaxed">
                The security camera that needs nothing but sunlight. No mains power, no WiFi, no electrician. Just 4K protection, anywhere.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/quote" className="btn-filled text-base inline-flex">Get a Free Quote <span className="arrow">→</span></Link>
                {BUSINESS.phoneDisplay && <a href={telHref()} className="btn-outline text-base border-white/30 text-white hover:bg-white hover:text-[#1A1A1A]">{BUSINESS.phoneDisplay}</a>}
              </div>
            </div>
            <CameraFeed cam="SOLAR-01" label="Solar • 4G/5G • off-grid" image={PHOTOS["solar-cam"]} alt="Site Vision solar security camera installed on a pole" className="border border-white/10">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="rgba(223,34,39,0.6)" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </CameraFeed>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="text-center mb-14">
            <div className="eyebrow mb-3">Features</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">Everything you need, nothing you don't</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="border border-[#E5E5E5] p-6">
                <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {f.icon === "sun" && <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>}
                    {f.icon === "moon" && <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>}
                    {f.icon === "mic" && <><rect x="6" y="2" width="12" height="12" rx="3"/><path d="M12 18v4"/><path d="M8 22h8"/><path d="M16 14a4 4 0 01-8 0"/></>}
                    {f.icon === "bell" && <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>}
                    {f.icon === "signal" && <><path d="M2 15s3-6 10-6 10 6 10 6"/><path d="M6 12s2-3 6-3 6 3 6 3"/><path d="M10 9s1-1 2-1 2 1 2 1"/></>}
                    {f.icon === "zap" && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>}
                  </svg>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] text-sm mb-2">{f.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-container">
          <div className="text-center mb-12">
            <div className="eyebrow mb-3">Technical Specifications</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1A1A1A] tracking-tight">Built for Australian conditions</h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white border border-[#E5E5E5] divide-y divide-[#E5E5E5]">
            {specs.map((s, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm font-mono text-[#4A4A4A]">{s.label}</span>
                <span className="text-sm text-[#1A1A1A] font-medium text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1A1A] section-padding">
        <div className="content-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight mb-4">Ready to go solar?</h2>
          <p className="text-white/60 max-w-[500px] mx-auto mb-6">Get a fast quote and site assessment. We'll have your first camera online within 48 hours of approval.</p>
          <Link to="/quote" className="btn-filled text-base">Get a Quote <span className="arrow">→</span></Link>
        </div>
      </section>
    </div>
  );
}


