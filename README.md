# Site Vision Security — website

The website for **Site Vision Security**: security systems, installation, and monitoring in Hallam, Melbourne.

**Stack:** TanStack Start (React 19 + Vite), Tailwind CSS v4. It builds to a Cloudflare Worker.

## Quick start

```bash
npm install
npm run dev          # http://localhost:5317
```

## Where things live

| What | Where |
|---|---|
| Business details (phone, email, address, hours, socials, licence) | `src/lib/business.ts`. Leave a field empty (`""`) to hide it on the site. |
| Product catalogue (Products page) | `src/lib/catalogue.ts` |
| Pages | `src/routes/` (`services.tsx`, `products.tsx`, `quote.tsx`, the `industries/*` detail pages, …) |
| Header / footer / sticky mobile bar | `src/components/` |
| Logo splash on the home page | `src/components/LogoIntro.tsx` (timing in `src/styles.css`, under "Home logo splash") |
| Brand logo pack (SVG/PNG/PDF/EPS, colours, fonts) | `brand/` |
| Logos used by the site | `public/assets/logo/`, `public/assets/favicon.svg` |

## Adding install photos

1. Put photos in `install-photos/` named `hero`, `residential`, `commercial`, `construction`, `farm`, `solar-cam` (`.jpg`, `.png`, `.heic` or `.webp`). See `install-photos/README.txt`.
2. Run:
   ```bash
   npm run photos
   ```
   This resizes them into `public/assets/photos/` and updates `src/lib/photos.ts`. A slot with no photo keeps its styled camera-feed panel.

## Client preview (single HTML file)

`preview/Site-Vision-Security-Preview.html` is the whole site in one file, with styles and images built in. Anyone can open it in a browser.

To rebuild it after changes, keep `npm run dev` running in one terminal and run this in another:

```bash
npm run preview:html
```

## AI chat assistant

A chat bubble on every page (`public/assets/chat-widget.js`). It calls `POST /api/chat` (`src/routes/api/chat.ts`), which asks Claude (`claude-opus-5-5`, low effort, short replies). Claude's instructions and knowledge are built from the site's own data in `src/lib/assistant.server.ts`, so answers stay in sync with the pages. It never quotes prices or specs.

- **Turn on AI answers:** set the `ANTHROPIC_API_KEY` secret.
  - Locally: `ANTHROPIC_API_KEY=... npm run dev`
  - Cloudflare: `npx wrangler secret put ANTHROPIC_API_KEY`
- **Without a key** (and in the single-file preview), the widget answers from the FAQ (`src/lib/faq.ts`) instead.
- **Before launch,** add rate limiting for `/api/chat`, for example a Cloudflare WAF rate-limit rule, to cap API spend.

## Build & deploy

```bash
npm run build        # typecheck + production build → dist/
```

`wrangler.jsonc` is set up for Cloudflare Workers. The live domain is `sitevision.au`. Canonical URLs and structured data use `siteUrl` in `src/lib/business.ts`.

## Still to supply

- Install photos (see above)
- Victorian Private Security Business Licence number, and ABN (`src/lib/business.ts`)
- New Site Vision social media links (they currently point to the old NS Systems pages)
- Confirmation of the product range in `src/lib/catalogue.ts`
