import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical } from "../../lib/business";
import { LOCATIONS } from "../../lib/locations";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    meta: [
      { title: "Areas We Service — Security Systems Across Melbourne's South-East | Site Vision Security" },
      { name: "description", content: "Site Vision Security installs CCTV, alarms, access control and intercoms, and hires Solar Cams for building sites, across Hallam, Narre Warren, Berwick, Dandenong, Cranbourne, Pakenham, Frankston and all of Melbourne." },
      { property: "og:title", content: "Areas We Service — Site Vision Security" },
    ],
    links: [canonical("/locations")],
  }),
  component: LocationsPage,
});

const FOCUS_LABEL = {
  residential: "Homes",
  commercial: "Commercial & industrial",
  construction: "Building sites & new homes",
  mixed: "Homes & businesses",
} as const;

function LocationsPage() {
  return (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <div className="eyebrow mb-3">Areas we service</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">
            Local to Melbourne's south-east
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#4A4A4A] max-w-[640px]">
            We're based in {BUSINESS.location} and install security across Casey, Cardinia, Greater Dandenong, and Frankston — and the rest of Melbourne and regional Victoria.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {LOCATIONS.map((l) => (
              <Link
                key={l.slug}
                to="/locations/$suburb"
                params={{ suburb: l.slug }}
                className="group border border-[#E5E5E5] p-4 md:p-6 hover:border-[#1A1A1A] transition-colors flex flex-col"
              >
                <div className="font-mono text-[0.55rem] md:text-[0.65rem] tracking-[0.12em] md:tracking-[0.15em] text-[#DF2227] uppercase mb-2 leading-snug">{FOCUS_LABEL[l.focus]}</div>
                <h2 className="font-display text-lg md:text-2xl font-bold text-[#1A1A1A] tracking-tight">{l.name}</h2>
                <p className="hidden md:block text-sm text-[#4A4A4A] mt-2 leading-relaxed flex-1">{l.headline}</p>
                <p className="hidden md:block text-xs text-[#4A4A4A] mt-3">Also: {l.alsoCovering.slice(0, 3).join(", ")}</p>
                <span className="mt-auto pt-3 md:pt-4 text-sm font-semibold text-[#DF2227] group-hover:underline">View →</span>
              </Link>
            ))}
          </div>
          <p className="mt-10 text-center text-[#4A4A4A]">
            Don't see your suburb? We cover all of Melbourne and regional Victoria —{" "}
            <Link to="/contact" className="font-semibold text-[#1A1A1A] border-b-2 border-[#DF2227] hover:text-[#DF2227]">get in touch</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
