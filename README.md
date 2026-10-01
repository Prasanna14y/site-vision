# Site Vision Security: Website

Source code for the **Site Vision Security** website: security cameras, alarms, access control, monitoring and Solar Cam hire, based in Hallam, Melbourne.

> **Business owner?** Start with **[HANDOVER.md](HANDOVER.md)** (go-live steps and how to update the site) and **[SEO-PLAN.md](SEO-PLAN.md)** (the 6-month SEO roadmap).
> The ready-to-upload website is attached to the **[latest release](../../releases/latest)**.

- **Live preview:** https://prasanna14y.github.io/site-vision-preview/
- **Hosting:** HostGator (cPanel), as a static HTML site with two small PHP endpoints
- **Stack:** React 19 · TanStack Start · Vite · Tailwind CSS v4 · PHP 8.1+ (chat + quote form)

---

## Requirements

| Tool | Needed for |
|---|---|
| **Node.js 20+** and npm | Developing and building the site |
| **Composer** (+ PHP 8.1+) | Bundling the PHP chat endpoint (`npm run build:static` runs `composer install` automatically) |
| `zip` | Packaging the HostGator upload (pre-installed on macOS/Linux) |

## Quick start

```bash
npm install
npm run dev            # http://localhost:5317
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local development server at http://localhost:5317 |
| `npm run build:static` | **HostGator build.** Pre-renders every page to HTML, adds `.htaccess`, `404.html` and the PHP endpoints, and writes `deploy/site-vision-hostgator.zip` |
| `npm run photos` | Imports photos from `install-photos/` (resized, with GPS data stripped) |
| `npm run preview:html` | Rebuilds the single-file preview `preview/Site-Vision-Security-Preview.html` (needs `npm run dev` running) |
| `npm run typecheck` | TypeScript check |
| `npm run build` | Server build (Cloudflare Workers). Not used for HostGator |

---

## Where things live

| What | Where |
|---|---|
| Business details: phone, email, address, hours, socials, licence, ABN, domain (`siteUrl`), stats | `src/lib/business.ts`. A field left empty (`""`) is hidden on the site |
| Product catalogue | `src/lib/catalogue.ts` |
| Solar Cam name, selling points, photos | `src/lib/solarCam.ts` (photos in `public/assets/solar/`) |
| FAQ (home page, Solar Cam page and chat assistant) | `src/lib/faq.ts` |
| "Sites we've secured" scrolling strip | `src/components/ClientMarquee.tsx` |
| Suburb landing pages (`/locations/<suburb>`) | `src/lib/locations.ts`. Every suburb needs its own wording, to avoid Google's "doorway page" penalty |
| Pages | `src/routes/`, one file per page; service detail pages in `src/routes/industries/` |
| Header, footer, mobile action bar, logo splash | `src/components/` |
| Styles, animations, mobile swipe rows | `src/styles.css` |
| Logos, favicon, photos, chat widget | `public/assets/` |
| PHP endpoints (HostGator) | `php/` |
| Brand logo pack (SVG/PNG/PDF/EPS, colours, fonts) | `brand/` |

## Install photos

Put photos in `install-photos/` named `hero`, `residential`, `commercial`, `construction`, `farm` or `solar-cam` (`.jpg`, `.png`, `.heic` or `.webp`), then run `npm run photos`. They are resized into `public/assets/photos/` and `src/lib/photos.ts` is updated. A slot with no photo keeps its styled camera-feed panel.

The Solar Cam gallery uses `public/assets/solar/installs/` (listed in `src/lib/solarCam.ts`).

---

## Deploying to HostGator

```bash
npm run build:static
```

Upload `deploy/site-vision-hostgator.zip` to `public_html` and extract it. Then place the settings file `sitevision-config.php` (from `php/sitevision-config.example.php`) in the cPanel home folder, **one level above** `public_html`. The full step-by-step guide is in **[HANDOVER.md](HANDOVER.md#1-go-live-on-hostgator-first-time)**.

The package contains:
- Every page as `…/index.html`, plus `sitemap.xml`, `robots.txt` and `404.html`
- `.htaccess`: HTTPS redirect, clean URLs, old-URL redirects, caching and compression
- `api/chat.php` and `api/quote.php`, with private files in `api/lib/` (blocked from the web)

> Canonical URLs, the sitemap and structured data use `siteUrl` in `src/lib/business.ts`. Set it to the final domain before building.

## AI chat assistant

A chat bubble on every page (`public/assets/chat-widget.js`). It sends questions to Claude (`claude-opus-5-5`, low effort, short replies). The assistant's instructions and knowledge are generated from the site's own data in `src/lib/assistant.server.ts`, so answers stay in sync with the pages. It never quotes prices or technical specs.

| Hosting | Endpoint | API key |
|---|---|---|
| HostGator | `api/chat.php` (official Anthropic PHP SDK) | `anthropic_api_key` in `sitevision-config.php` |
| Node / Cloudflare | `POST /api/chat` (`src/routes/api/chat.ts`) | `ANTHROPIC_API_KEY` environment variable / secret |

- With no API key, or offline in the single-file preview, the widget answers from the FAQ instead.
- The PHP endpoint limits each visitor to 30 messages per 10 minutes. Also set a monthly spend limit at console.anthropic.com.

## Quote form

On HostGator, `api/quote.php` emails each request to `quote_to` (default `info@sitevision.au`) with PHP `mail()`, using the customer's address as Reply-To. It has a honeypot spam trap and allows 5 requests per hour per visitor. If sending fails, or the site isn't on PHP hosting, the form opens the visitor's email app with the details filled in.

---

## Project structure

```
src/
  routes/          pages (+ api/chat.ts, sitemap, robots)
  components/      header, footer, logo splash, sections
  lib/             business details, catalogue, FAQ, Solar Cam data, assistant prompt
php/               HostGator endpoints: chat.php, quote.php, lib/bootstrap.php
public/assets/     logos, photos, chat widget
scripts/           build helpers (static finish, photo import, single-file export)
brand/             logo pack
install-photos/    drop folder for new photos
preview/           single-file HTML preview of the site
```

## Before launch

See the checklist in **[HANDOVER.md](HANDOVER.md#4-before-launch-still-needed)**. In short: the final domain, the licence number and ABN, the new social links, the product range, and 301 redirects from the old nssystems.com.au site.
