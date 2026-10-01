import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS, canonical } from "../lib/business";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Site Vision Security" },
      { name: "description", content: "How Site Vision Security collects, uses, and protects your personal information." },
    ],
    links: [canonical("/privacy")],
  }),
  component: PrivacyPage,
});

const sections: [string, string][] = [
  [
    "What we collect",
    "When you request a quote or contact us, we collect the details you give us — typically your name, phone number, email address, state, and information about your property or site.",
  ],
  [
    "How we use it",
    "We use your information only to respond to your enquiry, prepare a quote, deliver and support the services you engage us for, and contact you about them. We do not sell your personal information.",
  ],
  [
    "Who we share it with",
    "We only share your information with people who help us deliver our services (for example installers or our monitoring provider), or where the law requires it.",
  ],
  [
    "Security footage",
    "Footage recorded by systems we install and monitor is handled in line with your service agreement and applicable Victorian surveillance laws, and is only accessed for monitoring, support, or when lawfully requested.",
  ],
  [
    "Access and correction",
    "You can ask to see or correct the personal information we hold about you at any time by contacting us. We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth).",
  ],
];

function PrivacyPage() {
  return (
    <div>
      <section className="bg-[#F5F5F5] section-padding">
        <div className="content-container">
          <div className="eyebrow mb-3">Legal</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#1A1A1A] tracking-tight">Privacy Policy</h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="content-container max-w-[760px] space-y-10">
          {sections.map(([heading, body]) => (
            <div key={heading}>
              <h2 className="font-display text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-3">{heading}</h2>
              <p className="text-base text-[#4A4A4A] leading-relaxed">{body}</p>
            </div>
          ))}
          <div className="border-t border-[#E5E5E5] pt-8">
            <h2 className="font-display text-xl md:text-2xl font-bold text-[#1A1A1A] tracking-tight mb-3">Contact</h2>
            <p className="text-base text-[#4A4A4A] leading-relaxed">
              Questions about privacy? Email{" "}
              <a href={`mailto:${BUSINESS.email}`} className="text-[#DF2227] font-semibold hover:underline">
                {BUSINESS.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
