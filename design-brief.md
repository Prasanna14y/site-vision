# Site Vision Security — Design Brief

## Design read
For Melbourne property managers, builders, and homeowners who need reliable, actively-monitored security — the site reads as a precision security instrument, not a burglar-alarm tradesman. Calm, technical, authoritative. Every element communicates that the customer is in command of a professionally monitored system.

## Concept spine
**"The Command Centre"** — the site is a monitoring station where the visitor is the operator. Clean panels, measured data points, crisp hierarchy, camera-field-of-view framing. The customer is not sold security; they are handed the controls.

## Delivery tier
**Editorial** — typography + bespoke generated imagery + subtle micro-motion (hover states, scroll reveals). No scroll-scrub film, no WebGL, no heavy GSAP. The confidence comes from craft, not theatrics.

## Locked palette
- **Accent: #E1272C** — precise red, used sparingly on CTAs, underlines, icon accents, hover states only
- **Primary text: #1A1A1A** — near-black for headers and body
- **Secondary text: #4A4A4A** — dark grey for supporting copy
- **Surface: #FFFFFF** — white page backgrounds
- **Surface alt: #F5F5F5** — light grey for section alternation
- **Borders: #E5E5E5** — hairline grey dividers
- **Hard ban:** no blue, no navy, no orange/amber, no neon, no purple
- **Defense:** the red/black/white palette is the user's brand identity. Red appears as a sharp, deliberate accent — not as alarmist blocks. The effect is authoritative without being aggressive.

## Locked type
- **Display: Outfit** (wide, clean sans — authoritative but approachable)
- **Body: Inter Tight** (compact, highly legible for body copy and specs)
- **Mono: JetBrains Mono** (technical specifications and data points)
- Headline scale: `text-3xl md:text-5xl lg:text-6xl tracking-tight leading-none`
- Body: `text-base md:text-lg leading-relaxed max-w-[65ch]`

## Tier-1 technique
B1 — **Cutout parallax rig.** The hero image (a security-camera POV shot of a Melbourne property) is layered: foreground subject background-removed, mid-ground scene, and a subtle grid/scan-line overlay. On scroll, these layers shift at different rates, giving the hero a volumetric, surveillance-dashboard feel. Fallback: a static composed hero with the security-camera frame motif.

## Section plan (Home page — 7 sections)
1. **Hero — Asymmetric split** — headline left, generated security-camera POV visual right. Two CTAs: "Request Pricing" (red underline-draw link) + "Call Now" (outlined frame)
2. **Trust strip — Logo wall + accreditation badges** — horizontal scroll logos of past clients + 3 accreditation badges (years, systems installed, service area)
3. **How it works — 4-step process** — vertical/horizontal stepped layout, each step with generated small icon + label + short description
4. **Product tiers — Asymmetric card grid** — 3 product tiers in a 2+1 or staggered layout, each with specs + red CTA
5. **Testimonials — Split quote wall** — 2-3 testimonials with names/titles, dark portraits, quote marks
6. **FAQ — Accordion** — 5-6 questions, clean bordered accordion
7. **Final CTA — Banner** — full-width red-tinted callout, "Get Your Free Quote" headline + primary CTA

Layout families: 7 distinct (split hero, logo wall, stepped process, asymmetric cards, quote wall, accordion, banner) — no consecutive repeats, no 3-column equal cards.

## Asset plan
- **Hero visual:** security-camera POV of a modern Melbourne home/commercial building at dusk, with subtle surveillance frame overlay — 1920×1080
- **Section texture:** subtle security grid/scan-line pattern for accent backgrounds
- **Custom icon set:** 6-8 glyphs (shield-check, camera, wifi, alarm, key, phone, settings, solar) in consistent 2px stroke style, brand red + charcoal
- **Logo:** derived from user description (shield + eye icon) for favicon/OG
- **OG image:** 1200×630 — brand mark + "Site Vision Security" + tagline on white with red accent bar
- **Favicon:** shield/eye icon alone on transparent background

## CTA inventory
1. **Hero "Request Pricing"** — oversized text link, red underline draws from left on hover, magnetic pull interaction
2. **Hero "Call Now"** — outlined frame (2px red border, white fill, red text), phone icon left, fills red on hover
3. **Product card "Request Pricing"** — bottom-anchored framed block, subtle red left border that floods full on hover
4. **Final CTA "Get Your Free Quote"** — solid red filled button, white text, arrow that travels right on hover
5. **Sticky nav "Request Pricing"** — solid red pill (the only pill on the site), white text, `scale(1.02)` on hover
6. **Inline text links** — black text, red underline that grows from center on hover

