// Brands whose sites (e.g. franchise stores) Site Vision has secured.
// Shown as plain text — not the brands' official logos (trademark/endorsement).
export const SECURED_SITES = ["BP", "Shell Reddy Express", "Ampol", "Sharetea", "7-Eleven"];

/** Infinite scrolling "Sites we've secured" strip. Pure CSS (see `.marquee` in styles.css). */
export default function ClientMarquee() {
  // Repeated so one row is always wider than the screen (no gap on wide monitors).
  const items = [...SECURED_SITES, "& many more", ...SECURED_SITES, "& many more"];
  const row = (hidden: boolean) => (
    <ul className="marquee-row flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((name, i) => (
        <li key={`${name}-${i}`} className="flex items-center shrink-0">
          <span className="px-8 md:px-12 font-display font-bold text-xl md:text-3xl tracking-tight text-[#1A1A1A]/80 whitespace-nowrap">
            {name}
          </span>
          <span className="w-2 h-2 bg-[#DF2227] rotate-45 shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="border-y border-[#E5E5E5] bg-white py-8 md:py-10 overflow-hidden" aria-label="Sites we've secured">
      <p className="text-center font-mono text-[0.65rem] md:text-xs tracking-[0.25em] text-[#4A4A4A] uppercase mb-5 md:mb-6">
        Sites we've secured
      </p>
      <div className="marquee relative flex">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}
