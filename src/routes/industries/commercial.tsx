import { createFileRoute } from "@tanstack/react-router";
import { canonical } from "../../lib/business";
import SectorPage from "../../components/SectorPage";
import { SECURED_SITES } from "../../components/ClientMarquee";

export const Route = createFileRoute("/industries/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial & Industrial Security Melbourne — CCTV, Alarms, Access Control | Site Vision Security" },
      { name: "description", content: "CCTV, intruder alarms, access control, ANPR and Grade A1 monitoring for shops, service stations, offices, warehouses and industrial sites across Melbourne." },
      { property: "og:title", content: "Commercial & Industrial Security Melbourne — CCTV, Alarms, Access Control | Site Vision Security" },
    ],
    links: [canonical("/industries/commercial")],
  }),
  component: Page,
});

function Page() {
  return (
    <SectorPage
      eyebrow="Commercial & Industrial"
      title="Security that protects your business — and your people"
      intro="From service stations and food outlets to warehouses and factories, we design systems that deter theft, record what matters, and control who gets in."
      quoteLabel="Get a business security quote"
      services={[
        "IP / HD CCTV systems",
        "Intruder alarms & 24/7 monitoring",
        "Access control (cards, fobs, keypads)",
        "Video intercoms",
        "ANPR number-plate cameras",
        "Perimeter detection",
        "Security fog systems",
        "Data & phone cabling",
      ]}
      highlights={[
        { title: "Built around your risks", body: "Cash areas, stock rooms, car parks, and entries — every camera has a job." },
        { title: "Know who comes and goes", body: "Access control and intercoms put you in charge of every door and gate." },
        { title: "After-hours protection", body: "Alarms with Grade A1 monitoring respond when you're closed." },
        { title: "Evidence you can use", body: "Clear footage you can find, review, and export quickly when something happens." },
      ]}
    >
      <section className="section-padding bg-[#1A1A1A] text-white">
        <div className="content-container text-center">
          <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-4">Sites we've secured</div>
          <p className="font-display font-bold text-2xl md:text-4xl tracking-tight leading-snug max-w-4xl mx-auto">
            {SECURED_SITES.filter((s) => !/^\d/.test(s)).join(" · ")}
            <span className="text-[#DF2227]"> & many more</span>
          </p>
        </div>
      </section>
    </SectorPage>
  );
}
