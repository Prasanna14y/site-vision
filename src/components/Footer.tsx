import { Link } from "@tanstack/react-router";
import { BUSINESS, mobileHref, telHref } from "../lib/business";

const industries: { label: string; path: string; hash?: string }[] = [
  { label: "Residential", path: "/services", hash: "residential" },
  { label: "Commercial & Industrial", path: "/services", hash: "commercial" },
  { label: "Construction Sites", path: "/industries/construction" },
  { label: "Farm & Rural", path: "/industries/farm" },
  { label: "Construction Site Camera Hire", path: "/construction-site-camera-hire" },
  { label: "Areas We Service", path: "/locations" },
];

const products: { label: string; path: string; hash?: string }[] = [
  { label: "Security Cameras", path: "/products", hash: "cameras" },
  { label: "Recorders & Storage", path: "/products", hash: "recorders" },
  { label: "Alarm Systems", path: "/products", hash: "alarms" },
  { label: "Access Control & Intercoms", path: "/products", hash: "access" },
  { label: "Cables & Networking", path: "/products", hash: "cables" },
  { label: "All Products", path: "/products" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main footer */}
      <div className="content-container py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4 -ml-2" aria-label="Site Vision Security — home">
              <img src="/assets/logo/main-on-dark.svg" alt="Site Vision Security" width={5835} height={1564} loading="lazy" className="h-14 w-auto" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-[260px]">
              Australian owned and operated security experts — {BUSINESS.yearsExperience} years of CCTV, alarms, and monitoring across Victoria.
            </p>
            {BUSINESS.licence && (
              <p className="mt-5 text-xs font-mono text-white/50">{BUSINESS.licence}</p>
            )}
          </div>

          {/* Services */}
          <div>
            <h2 className="font-mono text-[0.65rem] tracking-[0.15em] text-white/50 uppercase mb-5">Services</h2>
            <ul className="space-y-3">
              {industries.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    hash={item.hash}
                    className="text-sm text-white/70 hover:text-[#DF2227] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h2 className="font-mono text-[0.65rem] tracking-[0.15em] text-white/50 uppercase mb-5">Products</h2>
            <ul className="space-y-3">
              {products.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    hash={item.hash}
                    className="text-sm text-white/70 hover:text-[#DF2227] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="font-mono text-[0.65rem] tracking-[0.15em] text-white/50 uppercase mb-5">Contact</h2>
            <ul className="space-y-3 text-sm text-white/70">
              {BUSINESS.phoneDisplay && (
                <li>
                  <a href={telHref()} className="hover:text-[#DF2227] transition-colors font-semibold text-white">
                    {BUSINESS.phoneDisplay}
                  </a>
                  {BUSINESS.mobileDisplay && (
                    <>
                      {" / "}
                      <a href={mobileHref()} className="hover:text-[#DF2227] transition-colors font-semibold text-white">
                        {BUSINESS.mobileDisplay}
                      </a>
                    </>
                  )}
                </li>
              )}
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-[#DF2227] transition-colors">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="text-white/50">
                {BUSINESS.address[0]}<br/>{BUSINESS.address[1]}
              </li>
              {BUSINESS.hours && <li className="text-white/50">{BUSINESS.hours}</li>}
              <li className="pt-2">
                <Link to="/quote" className="text-[#DF2227] text-sm font-semibold hover:underline">
                  Request a Quote →
                </Link>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-3 mt-5">
              {BUSINESS.social.facebook && (<a href={BUSINESS.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#DF2227] hover:text-[#DF2227] transition-colors text-white/50 text-xs" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>)}
              {BUSINESS.social.instagram && (<a href={BUSINESS.social.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#DF2227] hover:text-[#DF2227] transition-colors text-white/50 text-xs" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>)}
              {BUSINESS.social.linkedin && (<a href={BUSINESS.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#DF2227] hover:text-[#DF2227] transition-colors text-white/50 text-xs" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>)}
              {BUSINESS.social.youtube && (<a href={BUSINESS.social.youtube} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#DF2227] hover:text-[#DF2227] transition-colors text-white/50 text-xs" aria-label="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              </a>)}
              {BUSINESS.social.google && (<a href={BUSINESS.social.google} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-[#DF2227] hover:text-[#DF2227] transition-colors text-white/50 text-xs" aria-label="Google reviews">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 10.2v3.9h5.5c-.2 1.4-1.7 4.2-5.5 4.2-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C17.2 3.6 15.1 2.6 12.5 2.6 7.3 2.6 3.1 6.8 3.1 12s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6l-8.8-.4z"/></svg>
              </a>)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="content-container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>&copy; {currentYear} Site Vision Security. All rights reserved.</span>
          <div className="flex gap-4">
            {BUSINESS.abn && <span>ABN {BUSINESS.abn}</span>}
            <Link to="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

