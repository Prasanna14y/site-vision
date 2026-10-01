// Scroll-reveal: blocks below the fold fade up as they enter the viewport.
// Applied automatically to the direct children of each section's
// `.content-container` (grid children get a small stagger).
// Uses the Web Animations API, so it never mutates classes/attributes that
// React hydrates — safe to start at any time, and content is never hidden
// if scripts don't run.
// Keep in sync with the vanilla copy in scripts/export-single-html.py.
const KEYFRAMES: Keyframe[] = [
  { opacity: 0, transform: "translateY(24px)" },
  { opacity: 1, transform: "none" },
];

export function installReveal(root: ParentNode = document): () => void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const delays = new WeakMap<Element, number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        e.target.animate(KEYFRAMES, {
          duration: 700,
          delay: delays.get(e.target) ?? 0,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        });
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.01 },
  );

  const fold = window.innerHeight;
  root.querySelectorAll<HTMLElement>("main section:not([data-logo-intro]) .content-container > *").forEach((el) => {
    const isGrid = /\bgrid\b/.test(el.className) && el.children.length > 1;
    const items = isGrid ? Array.from(el.children) : [el];
    items.forEach((item, i) => {
      if (item.getBoundingClientRect().top < fold) return; // already on screen
      if (isGrid) delays.set(item, Math.min(i, 6) * 70);
      io.observe(item);
    });
  });

  return () => io.disconnect();
}
