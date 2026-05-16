interface MarqueeProps {
  items: string[];
  speed?: number;
}

/**
 * Infinite horizontal scroll, CSS-only. Items repeat twice (a + b copy)
 * so the loop is seamless. Brass dot between items. Used as the
 * announcement strip on the homepage between hero and stats.
 */
export function Marquee({ items, speed = 50 }: MarqueeProps) {
  const dur = `${speed}s`;
  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-ocean-700 via-ocean-800 to-ocean-700 py-5 select-none"
    >
      {/* Edge masks for soft fade */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ocean-700 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ocean-700 to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap will-change-transform" style={{ animation: `marquee ${dur} linear infinite` }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center px-8">
                <span className="font-serif italic text-base md:text-lg text-white/85 tracking-tight">
                  {item}
                </span>
                <span className="ml-8 inline-block h-1.5 w-1.5 rounded-full bg-brass-400" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
