import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS, canonical } from "../../lib/business";
import SectorPage from "../../components/SectorPage";
import { SOLAR_INSTALLS } from "../../lib/solarCam";

export const Route = createFileRoute("/industries/residential")({
  head: () => ({
    meta: [
      { title: "Home Security Systems Melbourne — CCTV, Alarms & Intercoms | Site Vision Security" },
      { name: "description", content: "Home security cameras, alarms, video intercoms, smart home and 24/7 monitoring installed by Site Vision Security — 500+ Melbourne homes secured." },
      { property: "og:title", content: "Home Security Systems Melbourne — CCTV, Alarms & Intercoms | Site Vision Security" },
    ],
    links: [canonical("/industries/residential")],
  }),
  component: Page,
});

function Page() {
  return (
    <SectorPage
      eyebrow="Residential"
      title="Home security that lets you switch off"
      intro="Cameras, alarms, and intercoms designed around your home — so you can check in from your phone, and know someone's watching when you can't."
      photo={SOLAR_INSTALLS[0]}
      stat={{ value: `${BUSINESS.homesSecured}+`, label: "homes secured across Melbourne" }}
      quoteLabel="Get a home security quote"
      services={[
        "CCTV cameras & recorders",
        "Home alarm systems",
        "24/7 alarm monitoring (Grade A1)",
        "Video intercoms & doorbells",
        "Smart home & automation",
        "Wi-Fi, TV & speaker installation",
        "Digital TV antennas",
        "Ducted vacuum",
      ]}
      highlights={[
        { title: "Designed for your home", body: "We look at entries, driveways, and blind spots, then recommend only what you actually need." },
        { title: "Control from your phone", body: "Watch cameras live, get alerts, and arm or disarm your alarm from anywhere." },
        { title: "Tidy installation", body: "Neat cabling and careful mounting — we treat your home like our own." },
        { title: "Upgrade what you have", body: "Got an older system? We can often reuse what works and upgrade the rest." },
      ]}
    />
  );
}
