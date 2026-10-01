import { Link } from "@tanstack/react-router";
import { SOLAR_CAM, SOLAR_PHOTOS, SOLAR_POINTS } from "../lib/solarCam";

/** Home-page spotlight for the Solar Cam (weekly hire for building sites). */
export default function SolarFeature() {
  const p = SOLAR_PHOTOS.site;
  return (
    <section className="relative bg-[#111] text-white overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Photo */}
        <div className="relative min-h-[320px] lg:min-h-[640px]">
          <picture>
            <source srcSet={p.webp} type="image/webp" />
            <img
              src={p.jpg}
              alt={p.alt}
              width={p.w}
              height={p.h}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#111]/70 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#111]/40" aria-hidden="true" />
          <span className="absolute top-5 left-5 bg-[#DF2227] text-white text-[0.65rem] font-mono tracking-[0.2em] px-3 py-1.5">
            NOW AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Copy */}
        <div className="content-container lg:max-w-none lg:px-14 xl:px-20 py-14 lg:py-20 flex flex-col justify-center">
          <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-4">{SOLAR_CAM.offer}</div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05]">
            {SOLAR_CAM.name}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/70 max-w-[520px]">
            Protect your materials, tools, and machinery with a self-powered security camera we install on your site — and move with you as the build progresses.
          </p>
          <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {SOLAR_POINTS.slice(0, 4).map((pt) => (
              <li key={pt.title} className="flex gap-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                <span>
                  <span className="block font-semibold text-sm">{pt.title}</span>
                  <span className="block text-sm text-white/60">{pt.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/quote" search={{ product: SOLAR_CAM.enquiry }} className="btn-filled text-base">
              Book a Solar Cam <span className="arrow">→</span>
            </Link>
            <Link to="/solar-cam" className="btn-outline text-base border-white/30 text-white hover:bg-white hover:text-[#1A1A1A]">
              How hire works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
