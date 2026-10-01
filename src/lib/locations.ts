// Suburb landing pages (/locations/<slug>) — local SEO.
// Each suburb has its own angle and wording on purpose: near-identical pages
// with only the suburb swapped are treated by Google as "doorway pages".
// Add real local jobs/photos here over time (see SEO-PLAN.md).
// No imports here — vite.config.ts reads this list for the static build.

export type Location = {
  slug: string;
  name: string;
  council: string;
  /** Rough drive from the Hallam base — keep it approximate, never a promise. */
  drive: string;
  headline: string;
  intro: string;
  /** Unique local section: what's typical in this area and how we help. */
  localTitle: string;
  local: string[];
  /** Services in the order that matters most for this area. */
  services: string[];
  focus: "residential" | "commercial" | "construction" | "mixed";
  nearby: string[]; // other location slugs
  alsoCovering: string[]; // neighbouring suburbs (text only)
  faqs: [string, string][];
};

export const LOCATIONS: Location[] = [
  {
    slug: "hallam",
    name: "Hallam",
    council: "City of Casey",
    drive: "right here",
    headline: "Security systems in Hallam — from the local team",
    intro:
      "Site Vision Security is based right here in Hallam, at 31 Rusty Pl. For local homes and businesses that means advice from people down the road, quick site visits, and a team that's easy to reach after the install.",
    localTitle: "Your neighbourhood security company",
    local: [
      "Hallam mixes family homes with busy trade and light-industrial streets. We install everything from a few home cameras and an alarm to full CCTV, access control, and monitoring for workshops and warehouses.",
      "Because we're local, servicing, upgrades, and moving equipment are easy to arrange — and you can always drop in to talk through what you need.",
    ],
    services: ["CCTV & AI smart cameras", "Intruder alarms & Grade A1 monitoring", "Access control for workshops & warehouses", "Video intercoms & doorbells", "Solar Cam hire for building sites", "Data & phone cabling"],
    focus: "mixed",
    nearby: ["narre-warren", "dandenong", "berwick"],
    alsoCovering: ["Hampton Park", "Endeavour Hills", "Doveton", "Lynbrook"],
    faqs: [
      ["Can I visit your office in Hallam?", "Yes — we're at 31 Rusty Pl, Hallam VIC 3803. Give us a call first so the right person is there to help."],
      ["Do you service businesses in Hallam's industrial streets?", "Yes. We install CCTV, alarms, access control, and monitoring for workshops, warehouses, and trade businesses, as well as homes."],
    ],
  },
  {
    slug: "narre-warren",
    name: "Narre Warren",
    council: "City of Casey",
    drive: "a few minutes",
    headline: "Home & business security in Narre Warren",
    intro:
      "From family homes in Narre Warren and Narre Warren South to shops and offices around Fountain Gate, we design security that suits how you live and work — installed by a team just minutes away in Hallam.",
    localTitle: "Homes and busy retail, side by side",
    local: [
      "Many Narre Warren homes want a simple, reliable setup: cameras covering the driveway, front door, and backyard, an alarm, and a video doorbell for deliveries — all on your phone.",
      "For shops and offices near Fountain Gate, we focus on clear footage of entries and counters, after-hours alarms with monitoring, and access control for staff.",
    ],
    services: ["Home CCTV & AI smart cameras", "Video doorbells & intercoms", "Home & business alarms", "24/7 Grade A1 alarm monitoring", "Retail & office CCTV", "Access control"],
    focus: "mixed",
    nearby: ["hallam", "berwick", "cranbourne"],
    alsoCovering: ["Narre Warren South", "Narre Warren North", "Hampton Park", "Lysterfield South"],
    faqs: [
      ["Do you install video doorbells in Narre Warren?", "Yes — video doorbells and intercoms are one of our most common home installs, and they work alongside your cameras and alarm in one app."],
      ["Can you secure a shop near Fountain Gate?", "Yes. We install retail CCTV, alarms with monitoring, and access control for shops and offices. Call us or request a free quote."],
    ],
  },
  {
    slug: "berwick",
    name: "Berwick",
    council: "City of Casey",
    drive: "around 10 minutes",
    headline: "Security cameras & alarms for Berwick homes",
    intro:
      "Berwick's established streets, larger blocks, and acreage around Harkaway call for security that covers long driveways and wide yards — and looks neat on the house. That's what we design.",
    localTitle: "Built for larger homes and bigger blocks",
    local: [
      "Bigger properties mean more ground to cover. We plan camera positions for driveways, gates, side paths, and sheds, and use AI smart cameras so you're alerted to people and cars — not swaying trees or wildlife.",
      "For acreage and rural-residential properties around Harkaway and Beaconsfield, gate and driveway detection plus solar cameras can cover areas where running cable isn't practical.",
    ],
    services: ["AI smart cameras for homes", "Driveway & gate detection", "Home alarms with monitoring", "Video intercoms & gate intercoms", "Smart home & automation", "Solar cameras for acreage"],
    focus: "residential",
    nearby: ["narre-warren", "pakenham", "hallam"],
    alsoCovering: ["Beaconsfield", "Harkaway", "Officer", "Narre Warren North"],
    faqs: [
      ["Can you cover a long driveway or acreage in Berwick?", "Yes. We combine well-placed cameras with driveway and gate detection, and use solar cameras where power isn't available."],
      ["Will the cameras suit the look of my home?", "We choose discreet camera styles and plan tidy cable runs so the system protects the house without spoiling it."],
    ],
  },
  {
    slug: "dandenong",
    name: "Dandenong",
    council: "City of Greater Dandenong",
    drive: "around 10–15 minutes",
    headline: "Commercial & industrial security in Dandenong",
    intro:
      "Dandenong and Dandenong South are home to some of Melbourne's biggest industrial and commercial precincts. We secure warehouses, factories, yards, and shopfronts with systems built for large sites and after-hours risk.",
    localTitle: "Security for warehouses, yards and factories",
    local: [
      "Industrial sites have long perimeters, roller doors, loading bays, and valuable stock or machinery. We design CCTV that covers every approach, with AI detection so after-hours alerts are real events — not false alarms.",
      "Add access control for staff and contractors, number-plate recognition at gates, intruder alarms with Grade A1 monitoring, and security fog for high-value stock rooms.",
    ],
    services: ["Commercial & industrial CCTV", "Perimeter detection", "ANPR number-plate cameras", "Access control for staff & contractors", "Intruder alarms & Grade A1 monitoring", "Security fog systems"],
    focus: "commercial",
    nearby: ["hallam", "frankston", "narre-warren"],
    alsoCovering: ["Dandenong South", "Keysborough", "Noble Park", "Doveton"],
    faqs: [
      ["Do you secure warehouses in Dandenong South?", "Yes. Warehouses, factories, and yards are a core part of our work — CCTV, perimeter detection, access control, ANPR, alarms, and monitoring."],
      ["Can you log vehicles coming through our gate?", "Yes. ANPR (number-plate recognition) cameras record vehicles at gates, driveways, and car parks."],
    ],
  },
  {
    slug: "cranbourne",
    name: "Cranbourne",
    council: "City of Casey",
    drive: "around 15 minutes",
    headline: "Security for Cranbourne's new homes and building sites",
    intro:
      "Cranbourne, Cranbourne East, Cranbourne West, and nearby Clyde are full of new estates — and new builds. We protect building sites during construction, then the finished home once you move in.",
    localTitle: "From building site to new home",
    local: [
      "Building sites in new estates are a magnet for theft of tools, materials, and appliances. Our self-powered Solar Cam needs no site power or internet, so it can go up on day one of the build.",
      "Once you've moved in, we can set up home cameras, an alarm, and a video doorbell — ideal for new estates where the neighbours are still settling in.",
    ],
    services: ["Solar Cam hire for building sites", "New-home CCTV packages", "Home alarms with monitoring", "Video doorbells & intercoms", "Data & TV cabling for new builds", "Smart home & automation"],
    focus: "construction",
    nearby: ["narre-warren", "pakenham", "frankston"],
    alsoCovering: ["Cranbourne East", "Cranbourne West", "Cranbourne North", "Clyde", "Botanic Ridge"],
    faqs: [
      ["Can you protect my house while it's being built in Cranbourne?", "Yes — that's exactly what the Site Vision Solar Cam is for. It's hired by the week and needs no site power or internet."],
      ["Can you install security in a brand-new home?", "Yes. We set up cameras, alarms, intercoms, and cabling for new builds — and can plan it with your builder before handover."],
    ],
  },
  {
    slug: "pakenham",
    name: "Pakenham",
    council: "Cardinia Shire",
    drive: "around 20 minutes",
    headline: "Building site & home security in Pakenham",
    intro:
      "Pakenham and Officer sit in one of Melbourne's fastest-growing corridors. Between new estates, building sites, and the Pakenham industrial area, we cover homes, businesses, and construction across Cardinia Shire.",
    localTitle: "Growth-corridor security",
    local: [
      "With so many homes under construction, site theft is a real cost for builders and owners. The Site Vision Solar Cam gives a building site a visible, self-powered camera — no power or NBN needed — on simple weekly hire.",
      "For Pakenham businesses and the industrial area, we install CCTV, alarms with Grade A1 monitoring, and access control; for homes, cameras, alarms, and intercoms you control from your phone.",
    ],
    services: ["Solar Cam hire for building sites", "Industrial & business CCTV", "Home CCTV & AI cameras", "Alarms & Grade A1 monitoring", "Access control", "Solar cameras for rural blocks"],
    focus: "construction",
    nearby: ["berwick", "cranbourne", "narre-warren"],
    alsoCovering: ["Officer", "Pakenham Upper", "Nar Nar Goon", "Beaconsfield"],
    faqs: [
      ["Do you hire Solar Cams for building sites in Pakenham and Officer?", "Yes. We install the Solar Cam on site and hire it by the week for as long as your build runs."],
      ["Do you also cover rural properties near Pakenham?", "Yes — solar cameras, driveway and gate detection, and shed alarms suit rural blocks where power and internet are limited."],
    ],
  },
  {
    slug: "frankston",
    name: "Frankston",
    council: "City of Frankston",
    drive: "around 25 minutes",
    headline: "Security cameras & alarms in Frankston",
    intro:
      "From homes in Frankston, Frankston South, and Langwarrin to shops in the Frankston centre and businesses around Carrum Downs, we install security that holds up in a bayside environment.",
    localTitle: "Homes, shops and coastal conditions",
    local: [
      "Near the bay, outdoor equipment has to cope with salty air and wind. We choose weather-sealed cameras and housings from trusted brands, and mount them to last.",
      "For Frankston shops and the Carrum Downs business area, we cover entries, counters, and car parks with clear footage, and add alarms with monitoring for after-hours peace of mind.",
    ],
    services: ["Home CCTV & AI smart cameras", "Retail & business CCTV", "Alarms with Grade A1 monitoring", "Video intercoms & doorbells", "Access control", "Smart home & automation"],
    focus: "mixed",
    nearby: ["dandenong", "cranbourne", "hallam"],
    alsoCovering: ["Frankston South", "Langwarrin", "Carrum Downs", "Seaford"],
    faqs: [
      ["Do you install security in Frankston and Langwarrin?", "Yes. We service Frankston, Frankston South, Langwarrin, Carrum Downs, and Seaford for homes and businesses."],
      ["Will outdoor cameras cope with bayside weather?", "We use weather-sealed cameras and housings from trusted brands and mount them securely, so they're built for outdoor conditions."],
    ],
  },
];

export const findLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
