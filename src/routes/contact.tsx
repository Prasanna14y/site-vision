import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical, mobileHref, telHref } from "../lib/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Site Vision Security" },
      { name: "description", content: "Contact Site Vision Security in Melbourne. Call 1300 108 555, email info@sitevision.au, or request a free quote online." },
      { property: "og:title", content: "Contact — Site Vision Security" },
    ],
    links: [canonical("/contact")],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <div className="eyebrow mb-3">Contact</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-[#4A4A4A] max-w-[600px]">
            We're based in Hallam, in Melbourne's south-east, and ready to help. Call, email, or send us an enquiry.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact details */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-[#1A1A1A] tracking-tight mb-6">Contact Details</h2>
                <div className="space-y-5">
                  {BUSINESS.phoneDisplay && (
<div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A] text-sm">Phone</div>
                      <a href={telHref()} className="text-lg font-bold text-[#DF2227] hover:underline">{BUSINESS.phoneDisplay}</a>
                      {BUSINESS.mobileDisplay && (
                        <div><a href={mobileHref()} className="text-base font-semibold text-[#1A1A1A] hover:text-[#DF2227]">{BUSINESS.mobileDisplay}</a></div>
                      )}
                    </div>
                  </div>
)}

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A] text-sm">Email</div>
                      <a href={`mailto:${BUSINESS.email}`} className="text-base text-[#1A1A1A] hover:text-[#DF2227] transition-colors">{BUSINESS.email}</a>
                      {BUSINESS.bookingEmail && (
                        <div className="text-xs text-[#4A4A4A] mt-0.5">Callback requests: <a href={`mailto:${BUSINESS.bookingEmail}`} className="hover:text-[#DF2227]">{BUSINESS.bookingEmail}</a></div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A] text-sm">Address</div>
                      {BUSINESS.address.map((line) => (
                        <div key={line} className="text-base text-[#1A1A1A]">{line}</div>
                      ))}
                      <div className="text-sm text-[#4A4A4A]">Servicing Melbourne and regional Victoria</div>
                    </div>
                  </div>

                  {BUSINESS.hours && (
<div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-[#E5E5E5] flex items-center justify-center shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DF2227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A1A1A] text-sm">Business Hours</div>
                      <div className="text-sm text-[#4A4A4A]">{BUSINESS.hours}</div>
                    </div>
                  </div>
                  )}
                  </div>
                </div>

              {/* Quick links */}
              <div className="border-t border-[#E5E5E5] pt-6">
                <h3 className="font-semibold text-[#1A1A1A] text-sm mb-3">Quick Links</h3>
                <div className="flex flex-wrap gap-3">
                  <Link to="/quote" className="btn-pill text-sm">Request a Quote</Link>
                  <Link to="/products" className="btn-outline text-sm">View Products</Link>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[400px] border border-[#E5E5E5]">
              <iframe
                title="Site Vision Security — 31 Rusty Pl, Hallam VIC 3803"
                src={`https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.address.join(", "))}&output=embed`}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

