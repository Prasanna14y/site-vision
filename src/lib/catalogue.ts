// Product catalogue — the equipment Site Vision supplies (sold on its own, or
// supplied and installed). Product *types*, not SKUs: no model numbers or
// prices; every item links to an enquiry. Edit freely as the range firms up.
import {
  Cctv,
  HardDrive,
  Siren,
  KeyRound,
  Cable,
  PlugZap,
  type LucideIcon,
} from "lucide-react";

export type Product = { name: string; desc: string; href?: string };
export type Category = { id: string; name: string; blurb: string; icon: LucideIcon; items: Product[] };

export const BRANDS = ["Hikvision", "Dahua", "Bosch", "Hills", "Honeywell"];

export const CATALOGUE: Category[] = [
  {
    id: "cameras",
    name: "Security Cameras",
    blurb: "CCTV cameras for homes, businesses, and remote sites.",
    icon: Cctv,
    items: [
      { name: "AI Smart Cameras", desc: "Person and vehicle detection for fewer false alerts and faster footage search." },
      { name: "IP Bullet Cameras", desc: "Long-range outdoor cameras for driveways, perimeters, and car parks." },
      { name: "IP Dome & Turret Cameras", desc: "Discreet, vandal-resistant cameras for entries, shopfronts, and ceilings." },
      { name: "PTZ Cameras", desc: "Pan-tilt-zoom cameras to cover large areas and follow movement." },
      { name: "Site Vision Solar Cam", desc: "Self-powered site camera — available on weekly hire for building sites.", href: "/solar-cam" },
      { name: "ANPR Cameras", desc: "Number-plate recognition cameras for car parks and gates." },
    ],
  },
  {
    id: "recorders",
    name: "Recorders & Storage",
    blurb: "Record, store, and play back your footage.",
    icon: HardDrive,
    items: [
      { name: "NVR Recorders", desc: "Network video recorders for IP camera systems, with app access." },
      { name: "DVR Recorders", desc: "Recorders for analogue and HD-over-coax cameras — great for upgrades." },
      { name: "Surveillance Hard Drives", desc: "Drives rated for 24/7 recording." },
      { name: "Monitors", desc: "Screens for live viewing at reception, the office, or home." },
    ],
  },
  {
    id: "alarms",
    name: "Alarm Systems",
    blurb: "Intruder alarm equipment from leading brands.",
    icon: Siren,
    items: [
      { name: "Alarm Panels & Keypads", desc: "Wired and wireless control panels with app arm/disarm." },
      { name: "Motion Detectors", desc: "Indoor and outdoor PIR sensors, including pet-friendly options." },
      { name: "Door & Window Sensors", desc: "Reed switches to protect every entry point." },
      { name: "Sirens & Strobes", desc: "Indoor and outdoor sirens to deter and alert." },
      { name: "Security Fog Systems", desc: "Fog cannons that fill a room in seconds." },
    ],
  },
  {
    id: "access",
    name: "Access Control & Intercoms",
    blurb: "Control who comes in — and see who's at the door.",
    icon: KeyRound,
    items: [
      { name: "Card & Fob Readers", desc: "Readers and keypads for doors and gates." },
      { name: "Fobs & Cards", desc: "Proximity fobs and cards for staff and residents." },
      { name: "Electric Locks & Strikes", desc: "Maglocks and strikes for controlled doors." },
      { name: "Video Intercoms & Doorbells", desc: "Answer the door from your phone, anywhere." },
    ],
  },
  {
    id: "cables",
    name: "Cables & Networking",
    blurb: "Everything to connect your system properly.",
    icon: Cable,
    items: [
      { name: "Cat6 Network Cable", desc: "For IP cameras, PoE, and data runs." },
      { name: "Coax & Power Cable", desc: "RG59 coax and power cable for analogue and HD-over-coax systems." },
      { name: "Connectors", desc: "RJ45, BNC, and DC connectors, joiners, and baluns." },
      { name: "PoE Switches & Injectors", desc: "Power and connect IP cameras over one cable." },
    ],
  },
  {
    id: "power",
    name: "Power & Mounting",
    blurb: "The hardware that keeps it all running and in place.",
    icon: PlugZap,
    items: [
      { name: "Power Supplies & Backup Batteries", desc: "Keep cameras and alarms running through outages." },
      { name: "Brackets & Junction Boxes", desc: "Wall, pole, and corner mounts for a clean install." },
      { name: "Poles & Solar Kits", desc: "Mounting poles, panels, and batteries for off-grid cameras." },
      { name: "Weatherproof Enclosures", desc: "Protect equipment outdoors." },
      { name: "Security Signage", desc: "\"CCTV in operation\" and alarm warning signs." },
    ],
  },
];

/** Link to the quote form with the product pre-filled. */
export const enquireHref = (product: string) => ({ to: "/quote" as const, search: { product } });
