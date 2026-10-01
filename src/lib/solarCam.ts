// The Site Vision Solar Cam — the flagship product, offered on weekly hire for
// building sites. Change the name here and it updates everywhere.
// Deliberately no technical specs (kept off the site for competitive reasons).
export const SOLAR_CAM = {
  name: "Site Vision Solar Cam",
  short: "Solar Cam",
  offer: "Weekly hire for building sites",
  enquiry: "Site Vision Solar Cam — weekly hire",
};

const photo = (name: string) => ({ webp: `/assets/solar/${name}.webp`, jpg: `/assets/solar/${name}.jpg` });

export const SOLAR_PHOTOS = {
  site: { ...photo("site"), alt: "Site Vision Solar Cam on a pole at a residential building site", w: 1536, h: 1024 },
  closeup: { ...photo("closeup"), alt: "Site Vision Solar Cam with solar panel, siren and warning sign", w: 1536, h: 1024 },
  detail: { ...photo("detail"), alt: "Close-up of the Site Vision Solar Cam camera, siren and 24 hour surveillance sign", w: 1536, h: 1024 },
  tower: { ...photo("tower"), alt: "Site Vision Solar Cam tower with solar panel above a new home build", w: 1024, h: 1536 },
  tower2: { ...photo("tower-2"), alt: "Site Vision Solar Cam installed beside site fencing", w: 1024, h: 1536 },
};

export const SOLAR_POINTS = [
  { title: "No power needed", body: "Runs on its own solar panel and battery — no site power, generators, or electricians." },
  { title: "No internet needed", body: "Connects over the mobile network, so there's no NBN or Wi-Fi to organise." },
  { title: "Seen to deter", body: "Camera, siren, and a bold warning sign tell would-be thieves the site is watched." },
  { title: "Watch from your phone", body: "Check the site live and get alerts wherever you are." },
  { title: "Installed for you", body: "We set it up on site, and move or collect it as the build progresses." },
  { title: "Simple weekly hire", body: "Hire it for as long as the job runs — no need to buy equipment." },
];

// Real Solar Cam installs (photos from the business). GPS/EXIF stripped on import.
const INSTALL_SIZES: [number, number][] = [
  [1400, 1050], [1400, 1050], [1050, 1400], [1050, 1400], [1050, 1400], [1050, 1400],
  [1050, 1400], [1400, 1050], [1050, 1400], [534, 1345], [684, 1400], [1050, 1400],
];

export const SOLAR_INSTALLS = INSTALL_SIZES.map(([w, h], i) => {
  const n = `install-${String(i + 1).padStart(2, "0")}`;
  return {
    webp: `/assets/solar/installs/${n}.webp`,
    jpg: `/assets/solar/installs/${n}.jpg`,
    alt: `Site Vision Solar Cam installed on a Melbourne building site (${i + 1})`,
    w,
    h,
  };
});
