import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/water/SiteNav";
import { SiteFooter } from "@/components/water/SiteFooter";
import { SearchProvider } from "@/components/water/SearchProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://waterawarenessfoundation.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Water Awareness Foundation — Know what's in your water.",
    template: "%s · Water Awareness Foundation",
  },
  description:
    "An independent foundation publishing clear, science-backed information about U.S. tap water — what's in it, what it does, and what to do about it.",
  applicationName: "Water Awareness Foundation",
  keywords: [
    "tap water quality",
    "EWG tap water database",
    "PFAS",
    "lead in water",
    "water filter",
    "drinking water safety",
  ],
  authors: [{ name: "Water Awareness Foundation" }],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Water Awareness Foundation",
    description:
      "Know what's in your water. Independent, science-backed reports for every U.S. ZIP code.",
    siteName: "Water Awareness Foundation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Water Awareness Foundation",
    description:
      "Know what's in your water. Independent, science-backed reports for every U.S. ZIP code.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE_URL}#organization`,
    name: "Water Awareness Foundation",
    alternateName: "WAF",
    url: SITE_URL,
    logo: `${SITE_URL}/opengraph-image`,
    description:
      "An independent, non-commercial foundation publishing clear, science-backed information about U.S. tap water.",
    foundingDate: "2026",
    knowsAbout: [
      "Drinking water quality",
      "PFAS contamination",
      "Lead in tap water",
      "Water filtration",
      "EWG Tap Water Database",
      "EPA Safe Drinking Water Act",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Press",
        email: "press@waterawarenessfoundation.com",
      },
      {
        "@type": "ContactPoint",
        contactType: "Donor inquiries",
        email: "donate@waterawarenessfoundation.com",
      },
      {
        "@type": "ContactPoint",
        contactType: "Corrections",
        email: "corrections@waterawarenessfoundation.com",
      },
    ],
    sameAs: [],
  };

  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: "Water Awareness Foundation",
    publisher: { "@id": `${SITE_URL}#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {plausibleDomain && (
          <>
            {/* Pageviews + outbound-link auto-tracking + tagged events for
                custom conversion tracking (Donate Click, Newsletter Signup,
                ZIP Report Submit, Water File Generate). */}
            <script
              defer
              data-domain={plausibleDomain}
              src="https://plausible.io/js/script.outbound-links.tagged-events.js"
            />
            <script
              dangerouslySetInnerHTML={{
                __html:
                  "window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }",
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-ocean-700 focus:text-white"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <SiteNav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SearchProvider />
      </body>
    </html>
  );
}
