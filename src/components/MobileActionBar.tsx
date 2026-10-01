import { Link } from "@tanstack/react-router";
import { BUSINESS, telHref } from "../lib/business";

/** Sticky Call / Quote bar shown on phones and tablets only. */
export default function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-[#E5E5E5] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom)]">
      {BUSINESS.phoneDisplay ? (
        <a
          href={telHref()}
          className="flex items-center justify-center gap-2 h-14 text-sm font-semibold text-[#1A1A1A]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          Call {BUSINESS.phoneDisplay}
        </a>
      ) : (
        <Link to="/contact" className="flex items-center justify-center h-14 text-sm font-semibold text-[#1A1A1A]">
          Contact us
        </Link>
      )}
      <Link
        to="/quote"
        className="flex items-center justify-center h-14 bg-[#DF2227] text-white text-sm font-semibold"
      >
        Get a Free Quote →
      </Link>
    </div>
  );
}
