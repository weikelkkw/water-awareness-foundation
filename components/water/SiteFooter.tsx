import Link from "next/link";
import { Droplet } from "lucide-react";
import { NewsletterCapture } from "./NewsletterCapture";

const COLUMNS = [
  {
    title: "Reports",
    links: [
      { href: "/report", label: "Find your ZIP" },
      { href: "/compare", label: "Compare two ZIPs" },
      { href: "/methodology", label: "How we score water" },
    ],
  },
  {
    title: "Learn",
    links: [
      { href: "/learn", label: "Education library" },
      { href: "/explore", label: "Contaminant explorer" },
      { href: "/facts", label: "Water facts" },
      { href: "/news", label: "Water news" },
    ],
  },
  {
    title: "Foundation",
    links: [
      { href: "/about", label: "Who we are" },
      { href: "/authors", label: "Authors & reviewers" },
      { href: "/methodology", label: "Methodology" },
      { href: "/transparency", label: "Transparency" },
      { href: "/press", label: "Press" },
      { href: "/newsletter", label: "Newsletter" },
      { href: "mailto:hello@wateraware.org", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ocean-700 text-white mt-24">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-20 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-inset ring-white/10">
                <Droplet className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="font-serif text-lg">Water Awareness Foundation</span>
            </div>
            <p className="text-white/75 leading-relaxed text-[15px] max-w-md">
              An independent, non-commercial foundation publishing plain-English
              reports on what's in U.S. tap water — and what to do about it. No
              affiliates, no product placements, no fear-mongering. Just data,
              sourced and explained.
            </p>
            <div className="mt-8 max-w-md">
              <NewsletterCapture variant="dark" />
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-200/90 mb-4 font-semibold">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white text-[15px] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-200/90 mb-4 font-semibold">
              Transparency
            </div>
            <ul className="space-y-3">
              <li>
                <Link href="/methodology" className="text-white/80 hover:text-white text-[15px]">
                  Sources
                </Link>
              </li>
              <li>
                <Link href="/about#funding" className="text-white/80 hover:text-white text-[15px]">
                  Funding
                </Link>
              </li>
              <li>
                <Link href="/about#corrections" className="text-white/80 hover:text-white text-[15px]">
                  Corrections
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-sm text-white/60">
        <div>
          © {year} Water Awareness Foundation. Educational use encouraged with
          attribution.
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/methodology" className="hover:text-white">Methodology</Link>
          <Link href="/privacy" className="hover:text-white">Privacy</Link>
          <Link href="/terms" className="hover:text-white">Terms</Link>
          <Link href="/transparency" className="hover:text-white">Transparency</Link>
        </div>
      </div>
    </footer>
  );
}
