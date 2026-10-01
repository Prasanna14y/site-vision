import type { ReactNode } from "react";

/**
 * A "live camera feed" frame — corner brackets, REC indicator and a HUD strip —
 * used for the site's visuals. Pass an image, or children (e.g. an icon) for a
 * stylised feed when no photo is available.
 */
export default function CameraFeed({
  cam,
  label,
  image,
  alt = "",
  priority = false,
  children,
  className = "",
}: {
  cam: string;
  label: string;
  image?: { webp: string; jpg: string };
  alt?: string;
  priority?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[4/3] overflow-hidden bg-[#111] ${className}`}>
      {image ? (
        <picture>
          <source srcSet={image.webp} type="image/webp" />
          <img
            src={image.jpg}
            alt={alt}
            width={1600}
            height={914}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(223,34,39,0.10) 0%, transparent 65%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 32px 32px, 32px 32px",
          }}
          aria-hidden="true"
        >
          {children}
        </div>
      )}

      {/* Scan line */}
      <div className="absolute inset-x-0 h-px bg-[#DF2227]/30 animate-[scan_6s_linear_infinite] pointer-events-none" aria-hidden="true" />

      {/* Corner brackets + REC */}
      <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <g stroke="#DF2227" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke">
          <path d="M0,0 L24,0 M0,0 L0,24" />
          <path d="M400,0 L376,0 M400,0 L400,24" />
          <path d="M0,300 L24,300 M0,300 L0,276" />
          <path d="M400,300 L376,300 M400,300 L400,276" />
        </g>
      </svg>
      <div className="absolute top-3 right-4 flex items-center gap-1.5 text-[0.6rem] font-mono text-[#DF2227]" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-[#DF2227] animate-pulse" />
        REC
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-8 pb-3 flex items-end justify-between gap-4" aria-hidden="true">
        <span className="text-white/60 text-[0.6rem] font-mono tracking-widest uppercase">{label}</span>
        <span className="text-white/40 text-[0.6rem] font-mono tracking-widest">{cam}</span>
      </div>
    </div>
  );
}

export const HERO_IMAGE = {
  webp: "/assets/hero-security-cam.webp",
  jpg: "/assets/hero-security-cam.jpg",
};
