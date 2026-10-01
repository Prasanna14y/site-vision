// Single source of truth for the business's real-world details.
// Anything left empty ("") is hidden on the site rather than shown as a placeholder.
// Contact details from the business's previous site; brand per the Site Vision logo pack.
export const BUSINESS = {
  name: "Site Vision Security",
  siteUrl: "https://sitevision.au", // live domain (matches info@sitevision.au)

  phoneDisplay: "1300 108 555",
  phoneHref: "1300108555",
  mobileDisplay: "0447 533 555",
  mobileHref: "0447533555",
  email: "info@sitevision.au",
  bookingEmail: "",
  location: "Hallam, Victoria",
  address: ["31 Rusty Pl", "Hallam VIC 3803"],
  hours: "Monday–Saturday 9am–5pm",
  yearsExperience: 25,

  licence: "", // not published on the old site — add when known
  abn: "",

  social: {
    facebook: "https://www.facebook.com/nssystems.com.au/",
    instagram: "https://www.instagram.com/ns_systems/",
    youtube: "https://www.youtube.com/channel/UCuEaRH0lup3c-2ZSqFcFU2w",
    google: "https://g.page/nssystemssecurity",
    linkedin: "",
  },
} as const;

export const telHref = () => (BUSINESS.phoneHref ? `tel:${BUSINESS.phoneHref}` : "");
export const mobileHref = () => (BUSINESS.mobileHref ? `tel:${BUSINESS.mobileHref}` : "");

export const canonical = (path: string) => ({ rel: "canonical", href: `${BUSINESS.siteUrl}${path}` });
