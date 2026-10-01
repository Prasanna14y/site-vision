import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS, canonical } from "../../lib/business";
import SectorPage from "../../components/SectorPage";
import { SOLAR_CAM, SOLAR_PHOTOS } from "../../lib/solarCam";

export const Route = createFileRoute("/industries/farm")({
  head: () => ({
    meta: [
      { title: "Farm & Rural Security Victoria — Solar Cameras, Alarms & Perimeter | Site Vision Security" },
      { name: "description", content: "Security for farms, rural properties and vacant land across Victoria — solar cameras that need no power or internet, perimeter detection, gates and alarms." },
      { property: "og:title", content: "Farm & Rural Security Victoria — Solar Cameras, Alarms & Perimeter | Site Vision Security" },
    ],
    links: [canonical("/industries/farm")],
  }),
  component: Page,
});

function Page() {
  return (
    <SectorPage
      eyebrow="Farm, rural & land"
      title="Eyes on your property, wherever it is"
      intro="Sheds, machinery, fuel, and gates are often far from power and internet. We protect rural properties and vacant land with solar cameras, detection, and alarms built for the distance."
      photo={SOLAR_PHOTOS.tower2}
      stat={{ value: `${BUSINESS.sitesSecured}+`, label: "construction sites, farms & land secured" }}
      quoteLabel="Get a rural security quote"
      services={[
        "Solar cameras — no power or internet needed",
        "Perimeter & driveway detection",
        "Gate & entry cameras (incl. ANPR)",
        "Shed & machinery alarms",
        "Phone alerts & live view",
        `${SOLAR_CAM.name} hire for vacant land`,
      ]}
      highlights={[
        { title: "Off-grid ready", body: "Solar-powered cameras connect over the mobile network — ideal where cabling isn't practical." },
        { title: "Know who's coming", body: "Driveway and gate detection tell you the moment a vehicle arrives." },
        { title: "Protect the big-ticket items", body: "Machinery, fuel, and tools in sheds get alarms and cameras where it counts." },
        { title: "Vacant land covered", body: "Short-term Solar Cam hire suits land waiting on a build." },
      ]}
    />
  );
}
