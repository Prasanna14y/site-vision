import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { BUSINESS, telHref } from "../lib/business";

type Photo = { webp: string; jpg: string; alt: string; w: number; h: number };

/** Shared layout for the Residential / Commercial / Construction / Farm pages. */
export default function SectorPage({
  eyebrow,
  title,
  intro,
  photo,
  stat,
  services,
  highlights,
  quoteLabel,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  photo?: Photo;
  stat?: { value: string; label: string };
  services: string[];
  highlights: { title: string; body: string }[];
  quoteLabel: string;
  children?: ReactNode;
}) {
  return (
    <div>
      {/* Hero */}
      <section className={`relative overflow-hidden ${photo ? "bg-[#111] text-white" : "bg-[#F5F5F5]"}`}>
        {photo && (
          <>
            <picture>
              <source srcSet={photo.webp} type="image/webp" />
              <img src={photo.jpg} alt={photo.alt} width={photo.w} height={photo.h} loading="eager" className="absolute inset-0 w-full h-full object-cover" />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111]/95 via-[#111]/75 to-[#111]/30" />
          </>
        )}
        <div className="content-container relative py-16 md:py-24">
          <Link to="/services" className={`text-xs font-mono tracking-wider hover:underline mb-6 inline-block ${photo ? "text-white/60" : "text-[#DF2227]"}`}>
            ← ALL SERVICES
          </Link>
          <div className="font-mono text-xs tracking-[0.2em] text-[#DF2227] uppercase mb-3">{eyebrow}</div>
          <h1 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl leading-[1.05] ${photo ? "" : "text-[#1A1A1A]"}`}>
            {title}
          </h1>
          <p className={`mt-5 text-base md:text-lg max-w-[600px] leading-relaxed ${photo ? "text-white/75" : "text-[#4A4A4A]"}`}>{intro}</p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Link to="/quote" className="btn-filled text-base">{quoteLabel} <span className="arrow">→</span></Link>
            {BUSINESS.phoneDisplay && (
              <a href={telHref()} className={`btn-outline text-base ${photo ? "border-white/40 text-white hover:bg-white hover:text-[#1A1A1A]" : ""}`}>
                Call {BUSINESS.phoneDisplay}
              </a>
            )}
          </div>
          {stat && (
            <div className="mt-10 inline-flex items-baseline gap-3 border-l-2 border-[#DF2227] pl-4">
              <span className="font-display font-bold text-4xl md:text-5xl">{stat.value}</span>
              <span className={`text-sm ${photo ? "text-white/70" : "text-[#4A4A4A]"}`}>{stat.label}</span>
            </div>
          )}
        </div>
      </section>

      {/* What we install + highlights */}
      <section className="section-padding bg-white">
        <div className="content-container grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="eyebrow mb-3">What we install</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-6">Services</h2>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s} className="flex items-start gap-3 text-[#1A1A1A]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 content-start">
            {highlights.map((h, i) => (
              <div key={h.title} className="border border-[#E5E5E5] p-6 hover:border-[#1A1A1A] transition-colors">
                <div className="font-mono text-xs text-[#DF2227] mb-3">0{i + 1}</div>
                <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">{h.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {children}

      {/* CTA */}
      <section className="section-padding bg-[#F5F5F5] text-center">
        <div className="content-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">Let's talk about your property</h2>
          <p className="text-[#4A4A4A] mb-6 max-w-[520px] mx-auto">Free advice and a no-obligation quote from our Hallam team.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/quote" className="btn-filled">{quoteLabel} <span className="arrow">→</span></Link>
            <Link to="/products" className="btn-outline">Browse products</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
