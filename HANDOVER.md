# Site Vision Security: Website Handover

Welcome! This repository is the complete source of the Site Vision Security website. This guide covers how to **go live on HostGator**, how to **make everyday updates**, and what's **still needed before launch**. The SEO plan is in [SEO-PLAN.md](SEO-PLAN.md).

---

## 1. Go live on HostGator (first time)

The ready-to-upload website is attached to the latest **[Release](../../releases/latest)**:
- `site-vision-hostgator.zip`: the whole website
- `sitevision-config.example.php`: the private settings file

Steps in **cPanel**:
1. **File Manager → `public_html`**: back up and remove any old site files.
2. Upload `site-vision-hostgator.zip`, then right-click it → **Extract**. Delete the zip afterwards.
3. **Settings → Show Hidden Files**: check that `.htaccess` is there.
4. **SSL/TLS Status**: turn on **AutoSSL** (free HTTPS).
5. **MultiPHP Manager**: set the domain to **PHP 8.1 or newer**.
6. **Email Accounts**: create a sending address on the domain, for example `website@sitevision.au`.
7. Rename `sitevision-config.example.php` to **`sitevision-config.php`** and upload it to your **home folder, one level ABOVE `public_html`**, so it can never be downloaded. Fill in:
   - `anthropic_api_key`: the Claude API key from console.anthropic.com. This turns on AI answers in the chat. Leave it empty for FAQ-only answers.
   - `quote_to`: where quote requests are emailed (default `info@sitevision.au`).
   - `mail_from`: the sending address from step 6.
8. **Test:** open the site, send yourself a test quote, and ask the chat a question.

> If you add an API key, set a monthly **spend limit** at console.anthropic.com.

---

## 2. Everyday updates

Most updates are a **one-file text edit**. You can make them right here on GitHub: open the file, click the ✏️ pencil, change the text and click **Commit changes**. Then rebuild and re-upload (section 3).

| To change… | Edit this file |
|---|---|
| Phone, email, address, hours, social links, licence number, ABN | `src/lib/business.ts` |
| "500+ homes / 700+ sites / 25 years" numbers | `src/lib/business.ts` |
| Products list (Products page) | `src/lib/catalogue.ts` |
| Solar Cam name, selling points, photos | `src/lib/solarCam.ts` |
| FAQ questions & answers (also used by the chat) | `src/lib/faq.ts` |
| "Sites we've secured" scrolling names | `src/components/ClientMarquee.tsx` |
| Page wording | `src/routes/` (one file per page, e.g. `services.tsx`, `about.tsx`) |
| Logos | `public/assets/logo/` (full brand pack in `brand/`) |

**Tips**
- In `business.ts`, a field left empty (`""`) is hidden on the site. That's useful until you have the licence number or ABN.
- Keep the quotes `"…"` and commas exactly as they are, and change only the words inside the quotes.
- **New install photos:** add them to `install-photos/` (see the README there), then run `npm run photos`.

---

## 3. Rebuild & re-upload after changes

This needs a computer with **Node.js 20+** and **Composer**, so it's best handled by your web developer:

```bash
npm install
npm run build:static
```

This produces `deploy/site-vision-hostgator.zip`. Upload and extract it into `public_html` as in section 1. The `sitevision-config.php` settings file in your home folder stays where it is and doesn't need re-uploading.

To preview locally before uploading, run `npm run dev` and open http://localhost:5317.

---

## 4. Before launch: still needed

- [ ] **Confirm the domain:** the signs say **sitevisionsecurity.com.au**, the email uses **sitevision.au**. Pick one and set `siteUrl` in `src/lib/business.ts`.
- [ ] **Redirect the old site** (nssystems.com.au) to the new domain, page by page (301 redirects). See the SEO plan.
- [ ] **Victorian Private Security Business Licence number** and **ABN**: add both to `src/lib/business.ts`.
- [ ] **New Site Vision social media links.** They currently point to the old NS Systems pages.
- [ ] **Confirm the product range** in `src/lib/catalogue.ts`.
- [ ] **Confirm the claims:** "500+ homes", "700+ construction sites, farms & land", and the brands listed under "Sites we've secured".
- [ ] **Photo permission** from the customers whose homes appear in the install photos.
- [ ] Replace the generic Privacy Policy wording if your lawyer or accountant has a preferred version.

---

## 5. What's in this repository

- `src/`: website source (React + TanStack Start + Tailwind)
- `php/`: HostGator chat assistant (`chat.php`) and quote form emailer (`quote.php`)
- `public/assets/`: logos, photos, chat widget
- `brand/`: full logo pack (SVG, PNG, PDF, EPS) and brand colours/fonts
- `preview/`: single-file HTML preview of the whole site
- `README.md`: technical details for developers
