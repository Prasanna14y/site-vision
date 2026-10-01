import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { BUSINESS, telHref } from "../lib/business";

type NavItem = {
  label: string;
  path: string;
  badge?: string;
  children?: { label: string; path: string; hash?: string }[];
};

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  {
    label: "Services",
    path: "/services",
    children: [
      { label: "Residential", path: "/services", hash: "residential" },
      { label: "Commercial & Industrial", path: "/services", hash: "commercial" },
      { label: "Construction site camera hire", path: "/construction-site-camera-hire" },
      { label: "Areas we service", path: "/locations" },
    ],
  },
  { label: "Products", path: "/products" },
  { label: "Solar Cam Hire", path: "/solar-cam", badge: "HIRE" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    // Service detail pages live under /industries/*
    if (path === "/services")
      return ["/services", "/industries", "/locations", "/construction-site-camera-hire"].some((p) => location.pathname.startsWith(p));
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      <div className="content-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 -ml-2" aria-label="Site Vision Security — home">
            <img src="/assets/logo/main.svg" alt="Site Vision Security" width={5835} height={1564} className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={`relative inline-flex items-center gap-1 px-2.5 xl:px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-[#DF2227]"
                      : "text-[#1A1A1A] hover:text-[#DF2227]"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 bg-[#DF2227] text-white text-[0.55rem] font-mono font-bold tracking-wider px-1.5 py-0.5 leading-none">{item.badge}</span>
                  )}
                  {item.children && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform group-hover:rotate-180"><polyline points="6 9 12 15 18 9" /></svg>
                  )}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 xl:left-3 xl:right-3 h-0.5 bg-[#DF2227]" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-150 absolute left-0 top-full pt-2 z-50">
                    <div className="min-w-[230px] bg-white border border-[#E5E5E5] shadow-lg py-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          to={c.path}
                          hash={c.hash}
                          className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F5F5F5] hover:text-[#DF2227]"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {BUSINESS.phoneDisplay && (
<a
              href={telHref()}
              className="hidden xl:inline text-sm font-semibold text-[#1A1A1A] hover:text-[#DF2227] transition-colors whitespace-nowrap"
            >
              {BUSINESS.phoneDisplay}
            </a>
)}
            <Link to="/quote" className="btn-pill text-sm">
              Get a Free Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span className={`block h-0.5 bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-[680px]' : 'max-h-0'
        }`}
      >
        <nav className="border-t border-[#E5E5E5] bg-white px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`block px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                  isActive(item.path)
                    ? "text-[#DF2227] bg-red-50"
                    : "text-[#1A1A1A] hover:bg-[#F5F5F5]"
                }`}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-2 bg-[#DF2227] text-white text-[0.55rem] font-mono font-bold tracking-wider px-1.5 py-0.5 align-middle">{item.badge}</span>
                )}
              </Link>
              {item.children?.map((c) => (
                <Link
                  key={c.label}
                  to={c.path}
                  hash={c.hash}
                  className="block pl-7 pr-3 py-2 text-sm text-[#4A4A4A] hover:bg-[#F5F5F5]"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-3 space-y-2">
            {BUSINESS.phoneDisplay && (
<a
              href={telHref()}
              className="block px-3 py-2.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#DF2227]"
            >
              {BUSINESS.phoneDisplay}
            </a>
)}
            <Link
              to="/quote"
              className="block text-center btn-pill w-full"
            >
              Get a Free Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

