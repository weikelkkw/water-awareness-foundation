"use client";

/**
 * Rising-bubbles layer for the homepage hero. Deterministic seed so SSR
 * and client render identical positions (no hydration mismatch).
 */

// Deterministic bubble layout — fixed array so SSR and client agree.
// Sizes in px, x-positions in %, durations in s, delays in s, drift in vw.
// More bubbles, bigger, more size variance so they read clearly.
const BUBBLES = [
  { size: 28, x: 4,  dur: 16, delay: 0,    drift: 3 },
  { size: 48, x: 9,  dur: 22, delay: -4,   drift: -4 },
  { size: 18, x: 15, dur: 13, delay: -8,   drift: 2 },
  { size: 72, x: 22, dur: 26, delay: -2,   drift: 5 },
  { size: 24, x: 28, dur: 14, delay: -10,  drift: -3 },
  { size: 38, x: 34, dur: 19, delay: -6,   drift: 3 },
  { size: 86, x: 42, dur: 28, delay: -1,   drift: -5 },
  { size: 22, x: 49, dur: 14, delay: -7,   drift: 2 },
  { size: 56, x: 55, dur: 23, delay: -12,  drift: -4 },
  { size: 30, x: 61, dur: 17, delay: -5,   drift: 3 },
  { size: 64, x: 67, dur: 24, delay: -9,   drift: -3 },
  { size: 26, x: 73, dur: 16, delay: -3,   drift: 2 },
  { size: 78, x: 80, dur: 27, delay: -13,  drift: -5 },
  { size: 20, x: 86, dur: 14, delay: -4,   drift: 2 },
  { size: 44, x: 92, dur: 20, delay: -7,   drift: -3 },
  { size: 16, x: 96, dur: 12, delay: -10,  drift: 1.5 },
  { size: 52, x: 2,  dur: 22, delay: -14,  drift: 4 },
  { size: 34, x: 38, dur: 18, delay: -15,  drift: -2 },
  { size: 18, x: 70, dur: 13, delay: -11,  drift: 2 },
  { size: 60, x: 18, dur: 24, delay: -17,  drift: -4 },
  { size: 28, x: 58, dur: 16, delay: -16,  drift: 3 },
  { size: 14, x: 88, dur: 11, delay: -2,   drift: 1.5 },
];

export function HeroAtmosphere() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Rising bubbles — the only atmospheric effect */}
      <div className="absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${b.x}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
              ["--drift" as never]: `${b.drift}vw`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .bubble {
          position: absolute;
          bottom: -100px;
          border-radius: 9999px;
          /* Glass-sphere body: light ocean tint interior, brighter center */
          background:
            radial-gradient(
              circle at 32% 30%,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(220, 244, 251, 0.85) 18%,
              rgba(125, 209, 234, 0.7) 45%,
              rgba(11, 61, 92, 0.5) 88%,
              rgba(11, 61, 92, 0.7) 100%
            );
          /* Crisp outer ring + interior depth + outer glow */
          box-shadow:
            inset 0 0 0 1.5px rgba(255, 255, 255, 0.95),
            inset 0 0 0 3px rgba(0, 180, 216, 0.55),
            inset 6px -6px 14px rgba(255, 255, 255, 0.55),
            inset -8px 8px 18px rgba(11, 61, 92, 0.35),
            0 4px 18px rgba(11, 61, 92, 0.2),
            0 0 24px rgba(0, 180, 216, 0.4);
          opacity: 0;
          animation-name: bubble-rise;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.42, 0, 0.6, 1);
          will-change: transform, opacity;
          pointer-events: none;
        }
        .bubble::before {
          /* Secondary rim highlight at the bottom-right for spherical depth */
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: radial-gradient(
            circle at 72% 78%,
            rgba(255, 255, 255, 0.55) 0%,
            rgba(255, 255, 255, 0) 28%
          );
          pointer-events: none;
        }
        .bubble::after {
          /* Primary specular highlight — a bright white sheen at the top-left */
          content: "";
          position: absolute;
          top: 10%;
          left: 14%;
          width: 32%;
          height: 32%;
          border-radius: 9999px;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.7) 55%,
            rgba(255, 255, 255, 0) 100%
          );
          filter: blur(0.5px);
        }
        @keyframes bubble-rise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
            transform: translate3d(0, -8vh, 0) scale(0.85);
          }
          50% {
            opacity: 0.95;
            transform: translate3d(calc(var(--drift) * 0.6), -55vh, 0) scale(1);
          }
          85% {
            opacity: 0.75;
            transform: translate3d(var(--drift), -90vh, 0) scale(1.05);
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--drift), -115vh, 0) scale(1.1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .bubble {
            animation: none;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
