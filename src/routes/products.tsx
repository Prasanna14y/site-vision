import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical, telHref } from "../lib/business";
import { BRANDS, CATALOGUE } from "../lib/catalogue";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Security Products — Cameras, Alarms, Cables & More — Site Vision Security" },
      { name: "description", content: "Buy security cameras, NVRs, alarm systems, access control, intercoms, cables, and accessories from Site Vision Security in Hallam, Melbourne. Hikvision, Dahua, Bosch, Hills, and Honeywell." },
      { property: "og:title", content: "Security Products — Site Vision Security" },
    ],
    links: [canonical("/products")],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <div className="eyebrow mb-3">Products</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">
            Security products
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#4A4A4A] max-w-[640px]">
            Cameras, recorders, alarms, access control, cables, and accessories from leading brands — buy the gear on its own, or have our team supply and install it.
          </p>

          {/* Category quick links */}
          <nav aria-label="Product categories" className="mt-8 flex flex-wrap gap-2">
            {CATALOGUE.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="inline-flex items-center gap-2 border border-[#E5E5E5] bg-white px-3.5 py-2 text-sm font-medium text-[#1A1A1A] hover:border-[#DF2227] hover:text-[#DF2227] transition-colors"
              >
                <c.icon size={15} aria-hidden="true" />
                {c.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Brands */}
      <section className="border-b border-[#E5E5E5] bg-white py-6">
        <div className="content-container flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <span className="font-mono text-[0.65rem] tracking-[0.15em] text-[#4A4A4A] uppercase">Brands we supply</span>
          {BRANDS.map((b) => (
            <span key={b} className="font-display font-bold text-[#1A1A1A]/70 tracking-tight">{b}</span>
          ))}
        </div>
      </section>

      {/* Catalogue */}
      <section className="section-padding bg-white">
        <div className="content-container space-y-16">
          {CATALOGUE.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <div className="flex items-end justify-between gap-4 mb-6 pb-4 border-b-2 border-[#1A1A1A]">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                    <cat.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight">{cat.name}</h2>
                    <p className="text-sm text-[#4A4A4A]">{cat.blurb}</p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => (
                  <div key={item.name} className="group border border-[#E5E5E5] p-5 flex flex-col hover:border-[#1A1A1A] transition-colors">
                    <h3 className="font-display text-lg font-bold text-[#1A1A1A]">{item.name}</h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mt-1.5 flex-1">{item.desc}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm font-semibold">
                      <Link to="/quote" search={{ product: item.name }} className="text-[#DF2227] hover:underline">
                        Enquire →
                      </Link>
                      {item.href && (
                        <Link to={item.href} className="text-[#1A1A1A] hover:text-[#DF2227]">
                          Details
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How buying works */}
      <section className="section-padding bg-[#F5F5F5]">
        <div className="content-container grid md:grid-cols-3 gap-8">
          {[
            ["Tell us what you need", "Send an enquiry with the products you're after, or describe your site and we'll recommend the right gear."],
            ["Get availability & pricing", "We'll come back with options, availability, and a price."],
            ["Buy it or have it installed", "Take the equipment yourself, or have our team supply and install it for you."],
          ].map(([title, body], i) => (
            <div key={title}>
              <div className="font-mono text-xs text-[#DF2227] mb-2">0{i + 1}</div>
              <h3 className="font-display text-lg font-bold text-[#1A1A1A] mb-2">{title}</h3>
              <p className="text-sm text-[#4A4A4A] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white text-center">
        <div className="content-container">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1A1A1A] tracking-tight mb-3">
            Can't see what you need?
          </h2>
          <p className="text-[#4A4A4A] mb-6 max-w-[520px] mx-auto">
            We supply a wide range of security equipment beyond what's listed here. Ask us — or let us install it for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/quote" search={{ product: "General product enquiry" }} className="btn-filled">
              Send a product enquiry <span className="arrow">→</span>
            </Link>
            <Link to="/services" className="btn-outline">View installation services</Link>
            {BUSINESS.phoneDisplay && (
              <a href={telHref()} className="btn-outline">Call {BUSINESS.phoneDisplay}</a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
