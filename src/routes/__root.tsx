import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import Header from "../components/Header";
import Footer from "../components/Footer";
import appMetaJson from "../app-meta.json";
import MobileActionBar from "../components/MobileActionBar";
import { StructuredData } from "../components/StructuredData";
import { BUSINESS } from "../lib/business";
import { installReveal } from "../lib/reveal";
import { FAQS, SOLAR_FAQS } from "../lib/faq";

// Settings for the chat assistant (public/assets/chat-widget.js).
const CHAT_CONFIG = JSON.stringify({
  endpoint: __STATIC_BUILD__ ? "/api/chat.php" : "/api/chat",
  quoteUrl: "/quote",
  phoneDisplay: BUSINESS.phoneDisplay,
  phoneHref: BUSINESS.phoneHref ? `tel:${BUSINESS.phoneHref}` : "",
  faqs: [...FAQS, ...SOLAR_FAQS.map(([q, a]) => ({ q, a }))],
}).replace(/</g, "\\u003c");

// LocalBusiness structured data — lets Google show address, phone, and hours.
const LOCAL_BUSINESS_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BUSINESS.siteUrl}/#business`,
  name: BUSINESS.name,
  url: BUSINESS.siteUrl,
  image: `${BUSINESS.siteUrl}/assets/og-card.jpg`,
  logo: `${BUSINESS.siteUrl}/assets/favicon-180.png`,
  telephone: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address[0],
    addressLocality: "Hallam",
    addressRegion: "VIC",
    postalCode: "3803",
    addressCountry: "AU",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Melbourne" },
    { "@type": "State", name: "Victoria" },
  ],
  sameAs: Object.values(BUSINESS.social).filter(Boolean),
  knowsAbout: ["CCTV installation", "Solar security cameras", "Alarm systems", "Alarm monitoring", "Access control", "Video intercom"],
});

declare const __HF_DESIGN_INSPECTOR__: boolean;

const DEFAULT_TITLE = "Site Vision Security — Melbourne Security Systems";
const DEFAULT_DESCRIPTION = "Solar-powered 4G/5G security cameras, CCTV, alarm systems, and 24/7 monitoring for homes, businesses, and construction sites across Melbourne and Victoria.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

const APP_HOST_ZONES = ["higgsfield.app", "higgsfield-dev.app"];

function toOwnAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const u = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => u.hostname === zone || u.hostname.endsWith(`.${zone}`),
    );
    if (isAppHost) return u.pathname + u.search;
    return value;
  } catch {
    return value;
  }
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = toOwnAssetUrl(meta.og_image_url);
  const favicon = toOwnAssetUrl(meta.favicon_url);
  const ogVideo = toOwnAssetUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "author", content: "Site Vision Security" },
      { name: "theme-color", content: "#FFFFFF" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_AU" },
      { property: "og:site_name", content: "Site Vision Security" },
      { name: "twitter:card", content: ogImage ? "summary_large_image" : "summary" },
      { name: "twitter:site", content: "@SiteVisionSec" },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
      ...(favicon ? [{ rel: "icon", href: favicon }] : []),
      { rel: "apple-touch-icon", href: "/assets/favicon-180.png" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <img src="/assets/favicon.svg" alt="Site Vision Security" className="w-20 h-20 mx-auto mb-6" />
        <h1 className="text-5xl font-bold font-display text-[#1A1A1A] tracking-tight mb-3">404</h1>
        <p className="text-[#4A4A4A] mb-6">This page isn't being monitored. Let's get you back somewhere secure.</p>
        <a href="/" className="btn-pill">Go Home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold font-display text-[#1A1A1A] tracking-tight mb-3">Something went wrong</h1>
        <p className="text-[#4A4A4A] mb-6">An error occurred. Try refreshing or head back home.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-pill"
          >
            Try again
          </button>
          <a href="/" className="btn-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-white text-[#1A1A1A] font-body antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();

  // Scroll-reveal for each page's sections (re-run after client-side navigation).
  useEffect(() => {
    let cleanup = () => {};
    const timer = setTimeout(() => {
      cleanup = installReveal();
    }, 50);
    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, [pathname]);

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) return;
    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => installHiggsfieldDesignInspector())
      .catch(() => {});
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="skip-link">Skip to content</a>
      <StructuredData json={LOCAL_BUSINESS_JSON_LD} />
      <div className="flex flex-col min-h-dvh pb-16 lg:pb-0">
        <Header />
        <main id="main" className="flex-1 pt-16 md:pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
      <MobileActionBar />
      <script type="application/json" id="sv-chat-config" dangerouslySetInnerHTML={{ __html: CHAT_CONFIG }} />
      <script async src="/assets/chat-widget.js" />
    </QueryClientProvider>
  );
}


