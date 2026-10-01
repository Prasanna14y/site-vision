import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical } from "../../lib/business";
import SectorPage from "../../components/SectorPage";
import { SOLAR_CAM, SOLAR_INSTALLS } from "../../lib/solarCam";

export const Route = createFileRoute("/industries/construction")({
  head: () => ({
    meta: [
      { title: "Construction Site Security Melbourne — Solar Cam Hire | Site Vision Security" },
      { name: "description", content: "Protect your building site with Site Vision Solar Cam weekly hire — no power or internet needed. 700+ construction sites, farms and land secured across Melbourne and Victoria." },
      { property: "og:title", content: "Construction Site Security Melbourne — Solar Cam Hire | Site Vision Security" },
    ],
    links: [canonical("/industries/construction")],
  }),
  component: Page,
});

function Page() {
  return (
    <SectorPage
      eyebrow="Construction sites"
      title="Stop theft on your building site"
      intro="Tools, materials, and machinery left on site are easy targets. Our self-powered Solar Cam goes up fast, needs no power or internet, and tells thieves they're being watched."
      photo={SOLAR_INSTALLS[3]}
      stat={{ value: `${BUSINESS.sitesSecured}+`, label: "construction sites, farms & land secured" }}
      quoteLabel="Book a Solar Cam"
      services={[
        `${SOLAR_CAM.name} — weekly hire`,
        "Siren, strobe & warning signage",
        "Live view & alerts on your phone",
        "Relocation as the build progresses",
        "Perimeter detection for larger sites",
        "Permanent CCTV & alarms at handover",
      ]}
      highlights={[
        { title: "No power, no internet", body: "Runs on its own solar panel and battery and connects over the mobile network." },
        { title: "Up quickly", body: "We install it on site, so you're protected from day one of the build." },
        { title: "Moves with the job", body: "As the site changes we can reposition the camera — and collect it at the end." },
        { title: "Weekly hire", body: "Hire for as long as the job runs. No equipment to buy." },
      ]}
    >
      <section className="section-padding bg-white pt-0">
        <div className="content-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 4, 6, 11].map((i) => (
              <picture key={i}>
                <source srcSet={SOLAR_INSTALLS[i].webp} type="image/webp" />
                <img src={SOLAR_INSTALLS[i].jpg} alt={SOLAR_INSTALLS[i].alt} loading="lazy" className="w-full aspect-[3/4] object-cover" />
              </picture>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/solar-cam" className="text-sm font-semibold text-[#1A1A1A] border-b-2 border-[#DF2227] pb-0.5 hover:text-[#DF2227]">See how Solar Cam hire works →</Link>
          </div>
        </div>
      </section>
    </SectorPage>
  );
}
