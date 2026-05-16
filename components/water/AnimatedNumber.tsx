"use client";

import { useEffect, useRef, useState } from "react";

type FormatType = "plain" | "comma" | "millions" | "percent" | "times";

interface Props {
  value: number;
  /** Total animation duration in ms. */
  duration?: number;
  /** Formatting preset (server-passable; functions can't cross the boundary). */
  format?: FormatType;
  /** Suffix appended after the formatted number, e.g. "+", "M" */
  suffix?: string;
  className?: string;
}

function formatValue(n: number, type: FormatType): string {
  switch (type) {
    case "millions":
      return `${(n / 1_000_000).toFixed(1)}M`;
    case "percent":
      return `${n}%`;
    case "times":
      return `${n}×`;
    case "comma":
      return n.toLocaleString();
    case "plain":
    default:
      return String(n);
  }
}

/**
 * Counts from 0 to `value` once the element enters the viewport. Uses
 * IntersectionObserver + requestAnimationFrame. Deterministic on the
 * server (renders the final value via `suppressHydrationWarning` so the
 * initial paint isn't 0).
 */
export function AnimatedNumber({
  value,
  duration = 1800,
  format = "plain",
  suffix = "",
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reset to 0 on the client after mount, then animate.
    setDisplay(0);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            animate();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();

    function animate() {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(Math.round(value * eased));
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    }
  }, [value, duration]);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {formatValue(display, format)}
      {suffix}
    </span>
  );
}
