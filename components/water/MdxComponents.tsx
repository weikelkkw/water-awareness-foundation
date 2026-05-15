import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }: any) => {
    const isInternal = typeof href === "string" && href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="text-cyan-600 underline-offset-4 hover:underline">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-600 underline-offset-4 hover:underline"
        {...props}
      >
        {children}
      </a>
    );
  },
  Callout: ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <aside className="not-prose callout">
      <span className="callout-label">Key takeaways</span>
      {title && <h4>{title}</h4>}
      <div>{children}</div>
    </aside>
  ),
  PullQuote: ({ children, attribution }: { children: React.ReactNode; attribution?: string }) => (
    <blockquote className="pullquote">
      {children}
      {attribution && (
        <footer className="mt-3 text-sm not-italic font-sans text-muted">— {attribution}</footer>
      )}
    </blockquote>
  ),
  Stat: ({ value, label }: { value: string; label: string }) => (
    <div className="not-prose inline-block rounded-2xl bg-ocean-50 border border-ocean-100 px-5 py-4 my-3 mr-3">
      <div className="font-serif text-3xl text-ocean-700">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted mt-1">{label}</div>
    </div>
  ),
};
