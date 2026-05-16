"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Droplet, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SearchTrigger } from "./SearchTrigger";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/report", label: "Reports" },
  { href: "/learn", label: "Learn" },
  { href: "/explore", label: "Contaminants" },
  { href: "/water", label: "States" },
  { href: "/news", label: "News" },
  { href: "/about", label: "About" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass border-b border-line/70"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex h-16 md:h-18 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ocean-600 text-white shadow-soft">
              <Droplet className="h-4 w-4" strokeWidth={2.5} />
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-[15px] md:text-base text-ocean-700 tracking-tight">
                Water Awareness
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">
                Foundation
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-3 py-2 text-sm font-medium text-ink/70 hover:text-ocean-700 transition-colors"
              >
                {item.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-brass-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <SearchTrigger variant="compact" />
            <Link
              href="/donate"
              className="text-sm font-medium text-ink/70 hover:text-ocean-700 transition-colors px-2"
            >
              Donate
            </Link>
            <Link href="/#check-your-water">
              <Button size="sm">Check Your Water</Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <SearchTrigger variant="compact" />
            <button
              type="button"
              className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-ocean-700 hover:bg-ocean-50"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-white">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium text-ink hover:bg-ocean-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-lg text-base font-medium text-ink hover:bg-ocean-50"
            >
              Donate
            </Link>
            <Link
              href="/#check-your-water"
              onClick={() => setOpen(false)}
              className="mt-2"
            >
              <Button className="w-full">Check Your Water</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
