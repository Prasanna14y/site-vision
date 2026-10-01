// Brands whose sites (e.g. franchise stores) Site Vision has secured.
// Shown as plain text — not the brands' official logos (trademark/endorsement).
export const SECURED_SITES = ["BP", "Shell Reddy Express", "Ampol", "Gotcha", "7-Eleven", "500+ Homes", "700+ Construction Sites, Farms & Land"];

const MORE = "& many more";

/** Infinite scrolling "Sites we've secured" strip. Pure CSS (see `.marquee` in styles.css). */
export default function ClientMarquee() {
  // Repeated so one row is always wider than the screen (no gap on wide monitors).
  const items = [...SECURED_SITES, ...SECURED_SITES];
  const row = (hidden: boolean) => (
    <ul className="marquee-row flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((name, i) => (
        <li key={`${name}-${i}`} className="flex items-center shrink-0">
          <span className="px-8 md:px-12 font-display font-bold text-xl md:text-3xl tracking-tight whitespace-nowrap text-[#1A1A1A]/80">
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
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="marquee relative flex flex-1 min-w-0 overflow-hidden">
          {row(false)}
          {row(true)}
        </div>
        {/* Fixed at the end of the strip — always reads last */}
        <p className="shrink-0 text-center mt-4 md:mt-0 md:pl-6 md:pr-10 font-display font-bold text-xl md:text-3xl tracking-tight text-[#DF2227] whitespace-nowrap">
          {MORE}
        </p>
      </div>
    </section>
  );
}
