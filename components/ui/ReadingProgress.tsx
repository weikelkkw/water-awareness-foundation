"use client";

import { useEffect, useState } from "react";

/** Slim brass-cyan reading progress bar at the very top of the viewport. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setPct(0);
        return;
      }
      const v = Math.min(1, Math.max(0, window.scrollY / max));
      setPct(v);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
      <div
        className="h-full transition-[width] duration-150"
        style={{
          width: `${pct * 100}%`,
          background:
            "linear-gradient(90deg, #C9A663 0%, #00B4D8 50%, #0B3D5C 100%)",
        }}
      />
    </div>
  );
}
