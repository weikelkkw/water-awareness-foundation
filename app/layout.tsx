import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/water/SiteNav";
import { SiteFooter } from "@/components/water/SiteFooter";

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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Water Awareness Foundation",
    url: SITE_URL,
    description:
      "An independent foundation publishing clear, science-backed information about U.S. tap water.",
    sameAs: [],
  };

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteNav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
