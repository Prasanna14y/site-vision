import { createFileRoute, Link } from "@tanstack/react-router";
import { BUSINESS, canonical, telHref } from "../lib/business";
import { useState } from "react";

export const Route = createFileRoute("/quote")({
  // ?product=... pre-fills a product enquiry (from the Products page).
  validateSearch: (search: Record<string, unknown>): { product?: string } =>
    typeof search.product === "string" && search.product ? { product: search.product.slice(0, 120) } : {},
  head: () => ({
    meta: [
      { title: "Get a Free Quote — Site Vision Security" },
      { name: "description", content: "Get a fast, no-obligation quote for security installation or products — CCTV, solar cameras, alarms, access control, intercoms, cables, and more." },
      { property: "og:title", content: "Get a Free Quote — Site Vision Security" },
    ],
    links: [canonical("/quote")],
  }),
  component: QuotePage,
});

function QuotePage() {
  // "sent" = emailed by the server (HostGator PHP); "mailto" = handed to the visitor's email app.
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "mailto">("idle");
  const { product } = Route.useSearch();

  // HostGator build: send through api/quote.php. Otherwise — or if that fails —
  // hand the enquiry to the visitor's email app, pre-addressed and filled in.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const field = (id: string) =>
      ((form.elements.namedItem(id) as HTMLInputElement | null)?.value ?? "").trim();
    const data = {
      name: field("name"),
      phone: field("phone"),
      email: field("email"),
      suburb: field("suburb"),
      state: field("state"),
      enquiryType: field("enquiryType"),
      message: field("message"),
      website: field("website"), // honeypot
    };

    if (__STATIC_BUILD__) {
      setStatus("sending");
      try {
        const res = await fetch("/api/quote.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setStatus("sent");
          return;
        }
      } catch {
        // fall through to the email app
      }
    }

    const body = [
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Suburb: ${data.suburb}, ${data.state}`,
      `Enquiry type: ${data.enquiryType}`,
      "",
      data.message,
    ].join("\n");
    const subject = `Quote request — ${data.enquiryType} — ${data.name} (${data.suburb})`;
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  };

  return (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <div className="eyebrow mb-3">Get a Quote</div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight">
            Get a free quote
          </h1>
          <p className="mt-4 text-lg text-[#4A4A4A] max-w-[600px]">
            Fast quote, no obligation. Tell us about your site and we'll come back with a tailored solution within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-3">
              {status === "sent" || status === "mailto" ? (
                <div className="bg-[#F5F5F5] p-8 text-center">
                  <div className="w-16 h-16 bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 className="text-2xl font-bold font-display text-[#1A1A1A] tracking-tight mb-3">{status === "sent" ? "Request received" : "Almost done"}</h2>
                  {status === "sent" ? (
                    <p className="text-[#4A4A4A] max-w-[420px] mx-auto">Thanks — your quote request is with our team. We'll be in touch within 24 hours{BUSINESS.phoneDisplay && <>. Need us sooner? Call <a href={telHref()} className="text-[#DF2227] font-semibold hover:underline">{BUSINESS.phoneDisplay}</a></>}.</p>
                  ) : (
                  <p className="text-[#4A4A4A] max-w-[420px] mx-auto">Your email app should have opened with your quote request ready to go — just hit send. If it didn't, email us at <a href={`mailto:${BUSINESS.email}`} className="text-[#DF2227] font-semibold hover:underline">{BUSINESS.email}</a>{BUSINESS.phoneDisplay && <> or call <a href={telHref()} className="text-[#DF2227] font-semibold hover:underline">{BUSINESS.phoneDisplay}</a></>}.</p>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Full Name *</label>
                      <input id="name" required type="text" autoComplete="name" className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#DF2227] transition-colors" placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Phone Number *</label>
                      <input id="phone" required type="tel" autoComplete="tel" className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#DF2227] transition-colors" placeholder="0400 000 000" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Email Address *</label>
                      <input id="email" required type="email" autoComplete="email" className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#DF2227] transition-colors" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label htmlFor="suburb" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Suburb *</label>
                      <input id="suburb" required type="text" autoComplete="address-level2" className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#DF2227] transition-colors" placeholder="e.g. Berwick" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">State *</label>
                      <select id="state" required className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#DF2227] transition-colors">
                        <option value="">Select state</option>
                        <option value="VIC">Victoria</option>
                        <option value="NSW">New South Wales</option>
                        <option value="QLD">Queensland</option>
                        <option value="SA">South Australia</option>
                        <option value="WA">Western Australia</option>
                        <option value="TAS">Tasmania</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">Northern Territory</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="enquiryType" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Enquiry Type *</label>
                      <select id="enquiryType" required defaultValue={product ? (product.includes("hire") ? "Solar Cam hire" : "Product") : ""} key={product ?? "none"} className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#DF2227] transition-colors">
                        <option value="">Select type</option>
                        <option value="Residential">Residential Home</option>
                        <option value="Commercial">Commercial Property</option>
                        <option value="Construction">Construction Site</option>
                        <option value="Farm">Farm / Rural Property</option>
                        <option value="Multi-Site">Multi-Site / Enterprise</option>
                        <option value="Existing">Upgrade Existing System</option>
                        <option value="Solar Cam hire">Solar Cam hire (building site)</option>
                        <option value="Product">Buy products / equipment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Message</label>
                    <textarea id="message" rows={4} defaultValue={product ? `I'm interested in: ${product}\n\n` : undefined} key={product ?? "none"} className="w-full border border-[#E5E5E5] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#DF2227] transition-colors resize-y" placeholder="Tell us about your property or site (approx size, number of cameras needed, any specific concerns)" />
                  </div>
                  <p className="text-xs text-[#4A4A4A]">
                    We only use your details to respond to your enquiry. See our{" "}
                    <Link to="/privacy" className="underline hover:text-[#DF2227]">Privacy Policy</Link>.
                  </p>
                  {/* Honeypot for bots — hidden from people and screen readers */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <button type="submit" disabled={status === "sending"} className="btn-filled text-base w-full sm:w-auto disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "Submit Quote Request"}
                    <span className="arrow">→</span>
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2">
              <div className="bg-[#F5F5F5] p-6 lg:p-8 space-y-6">
                <div>
                  <h3 className="font-mono text-[0.65rem] tracking-[0.15em] text-[#DF2227] uppercase">After you submit</h3>
                  <ul className="mt-4 space-y-3 text-sm text-[#4A4A4A]">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                      We review your details within 2 hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                      We prepare a tailored system design and quote
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                      We call or email you within 24 hours
                    </li>
                  </ul>
                </div>

                {BUSINESS.phoneDisplay && (
                  <div className="border-t border-[#E5E5E5] pt-6">
                    <h3 className="font-semibold text-[#1A1A1A] text-sm mb-3">Need it sooner?</h3>
                    <a href={telHref()} className="flex items-center gap-2 text-lg font-bold text-[#DF2227] hover:underline">
                      {BUSINESS.phoneDisplay}
                    </a>
                    {BUSINESS.hours && <p className="text-xs text-[#4A4A4A] mt-1">{BUSINESS.hours}</p>}
                  </div>
                )}

                <div className="border-t border-[#E5E5E5] pt-6">
                  <h3 className="font-semibold text-[#1A1A1A] text-sm mb-3">What we need</h3>
                  <p className="text-sm text-[#4A4A4A] leading-relaxed">A rough address or suburb, the type and size of your property, and any specific concerns. That's enough for a preliminary design.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

