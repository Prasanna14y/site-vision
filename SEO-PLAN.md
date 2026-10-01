# Site Vision Security: 6-Month SEO Plan

**Goal:** more calls and quote requests from people in Melbourne searching for security cameras, alarms and construction-site camera hire.

**Honest timeline:** fixing the Google Business Profile and making the business details consistent everywhere can lift **Google Maps ("Map Pack") rankings within weeks**. **Page-one organic rankings for competitive searches** like "CCTV installation Melbourne" usually take **3–6+ months** of steady work. SEO compounds: it builds over time rather than switching on.

---

## Already built into the website ✅
- Fast-loading pages that work well on phones
- Google-readable business details (`LocalBusiness` schema: name, address, phone, hours, service area)
- FAQ markup, so questions can show directly in Google results
- `sitemap.xml` and `robots.txt`
- A dedicated page for each service type: Residential, Commercial, Construction, Farm, Solar Cam hire, Products
- Suburbs and service areas mentioned on the home page
- HTTPS and clean URLs (via `.htaccess` on HostGator)
- **Location pages** for Hallam, Narre Warren, Berwick, Dandenong, Cranbourne, Pakenham and Frankston, each with its own local angle, FAQs and Google-readable service-area data, plus an "Areas we service" hub (`/locations`)
- **Construction site camera hire page** (`/construction-site-camera-hire`) for builders, alongside the Solar Cam product page

---

## Month 1: Foundations 🔴 Highest priority

### 1. Settle the domain, and don't lose the old site's history
- Pick **one** domain. Right now the signs say **sitevisionsecurity.com.au**, the email is **sitevision.au**, and the old site is **nssystems.com.au**.
- **301-redirect every old nssystems.com.au page** to its matching new page, for example `/cctv-camera-systems` → `/services`. This passes on 25 years of Google history. Skipping it means starting from zero.
- Update `siteUrl` in `src/lib/business.ts` to the chosen domain and rebuild.

### 2. Google Business Profile (GBP): the biggest quick win
- Rename the existing profile (currently linked as `g.page/nssystemssecurity`) to **Site Vision Security**. Keep the profile rather than making a new one, so the reviews and history stay.
- **Primary category:** Security system supplier. **Secondary:** CCTV installer, Burglar alarm store, Security service.
- Add every service and product category, the service areas (Casey, Cardinia, Dandenong, Frankston, Melbourne), opening hours, the website link and the quote link.
- Upload the real install photos, especially the Solar Cam on building sites. Add new photos monthly.
- Post a GBP update every 2 weeks: a recent install, Solar Cam availability or a security tip.

### 3. NAP consistency (Name, Address, Phone)
Use **exactly** the same details everywhere:
> **Site Vision Security** · 31 Rusty Pl, Hallam VIC 3803 · 1300 108 555

### 4. Google Search Console + Bing Webmaster Tools
- Verify the site and submit `https://<domain>/sitemap.xml`.
- Use the "change of address" tool when moving from nssystems.com.au.

---

## Months 1–2: Citations & reviews

### Business directories
Update existing listings (many will still say *NS Systems*) or create new ones:
Yellow Pages · True Local · Hotfrog · Oneflare · hipages · Word of Mouth · StartLocal · Apple Business Connect (Apple Maps) · Bing Places · Facebook page.

### Reviews: the strongest Map Pack factor
- After **every** job, text the customer the Google review link. Create a short link in GBP under "Ask for reviews".
- Aim for **2–4 new reviews a month**. Steady beats a sudden burst.
- **Reply to every review**, good or bad, mentioning the service naturally ("Thanks for choosing us for your CCTV install in Berwick").

### Trust signals on the site
- Show the **Victorian Private Security Business Licence number** in the footer. It's required, and it builds trust.
- Add the ABN.

---

## Months 2–4: Content that matches real searches

### Location pages: built ✅, now make them stronger
- Pages are live for **Hallam, Narre Warren, Berwick, Dandenong, Cranbourne, Pakenham and Frankston** (`src/lib/locations.ts`).
- Each month, add **real local proof** to them: a recent job in that suburb, a photo (with permission), or a customer quote. Pages with genuine local detail outrank generic ones.
- Add more suburbs only when there's something real to say about them, such as Officer, Clyde, Keysborough or Carrum Downs.

### Solar Cam hire pages: built ✅ (likely the fastest organic win)
- `/construction-site-camera-hire` targets builders searching "construction site camera hire Melbourne" and "building site security camera".
- `/solar-cam` targets "solar security camera hire".
- Ask builder customers for Google reviews that mention "site camera" and "Solar Cam".
- Don't create more near-identical hire pages for every keyword. That's a doorway-page pattern Google penalises.

### Helpful articles (1–2 a month)
Answer what customers actually ask:
- How much does home CCTV cost in Melbourne?
- Solar vs wired security cameras for building sites
- Are AI security cameras worth it?
- How to stop tool theft on a construction site
- Do I need alarm monitoring?

### Projects / case studies page
Real jobs with photos (with permission), the suburb, the problem and what was installed.

---

## Months 3–6: Authority (links from other websites)
- **Supplier listings:** apply for Hikvision, Dahua, Bosch and Hills installer or dealer directories.
- **Industry:** ASIAL membership listing, plus the local chamber of commerce (Casey Cardinia).
- **Builder partners:** builders who hire the Solar Cam can mention and link "site security by Site Vision".
- **Local PR:** pitch a story on construction-site theft and prevention to local news sites.
- **Sponsorships:** local sports clubs often list sponsors with a link.

---

## What to expect

| When | Realistic result |
|---|---|
| **2–6 weeks** | Renamed GBP and consistent NAP lift Map Pack visibility around Hallam for "security cameras near me" |
| **2–3 months** | Rankings for lower-competition terms: Solar Cam hire, suburb + service, brand name |
| **3–6+ months** | Page-one movement for competitive terms ("CCTV installation Melbourne"), provided reviews, content and links keep building |

---

## Track every month
- **GBP Insights:** calls, direction requests, website clicks
- **Search Console:** impressions, clicks, top search terms
- **Leads:** quote form emails and phone calls (ask "how did you find us?")
- **Rankings** for ~10 target terms, for example:
  CCTV installation Melbourne · security cameras Berwick · alarm installation Narre Warren · construction site camera hire Melbourne · solar security camera hire · security systems Hallam · commercial CCTV Dandenong · farm security cameras Victoria · AI security cameras Melbourne · Site Vision Security

---

## Owner checklist

| Task | Who | When |
|---|---|---|
| Choose domain + 301 redirects from nssystems.com.au | Developer | Week 1 |
| Rename & complete Google Business Profile | Business owner | Week 1 |
| Search Console + Bing verification, submit sitemap | Developer | Week 1 |
| Add licence number + ABN to site | Business owner → developer | Week 1–2 |
| Update directory listings (NAP) | Business owner / VA | Weeks 2–6 |
| Review-request routine after every job | Business owner & techs | Ongoing |
| GBP photos & posts | Business owner | Fortnightly |
| Location pages + Solar Cam hire pages | Built. Owner adds local jobs and photos | Monthly |
| 1–2 articles a month | Owner / writer | Months 2–6 |
| Supplier, industry & builder links | Business owner | Months 3–6 |
