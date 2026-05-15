"use client";

/**
 * Cinematic atmospheric layer for the homepage hero.
 *
 * - Two animated radial-gradient orbs drifting slowly (CSS-only, GPU-cheap)
 * - Rising bubbles — water-themed ambient motion, deterministic seed so
 *   server and client render identical bubble positions (no hydration mismatch)
 * - A grid faintly visible underneath
 * - A noise-style overlay via SVG for filmic texture
 *
 * Deliberately CSS-driven (no Framer Motion) — the goal is presence,
 * not animation density. Less is more here.
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
      {/* Base wash — slightly deeper so bubbles pop against it */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-100 via-ocean-50/60 to-canvas" />

      {/* Faint grid */}
      <div className="absolute inset-0 bg-grid-faint opacity-30" />

      {/* Drifting cyan orb */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,180,216,0.35), transparent 65%)",
          animation: "atmos-drift-a 22s ease-in-out infinite alternate",
        }}
      />

      {/* Drifting ocean orb */}
      <div
        className="absolute -bottom-[25%] -right-[10%] w-[70vw] h-[70vw] max-w-[1000px] max-h-[1000px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle at center, rgba(11,61,92,0.4), transparent 65%)",
          animation: "atmos-drift-b 28s ease-in-out infinite alternate",
        }}
      />

      {/* Brass accent — small, intentional */}
      <div
        className="absolute top-[35%] right-[15%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, rgba(201,166,99,0.35), transparent 65%)",
          animation: "atmos-drift-c 26s ease-in-out infinite alternate",
        }}
      />

      {/* Rising bubbles — water-themed ambient motion */}
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

      {/* God rays — angled light beams from above-left, mix-blended over the wash */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="god-ray god-ray-a" />
        <div className="god-ray god-ray-b" />
        <div className="god-ray god-ray-c" />
      </div>

      {/* Caustics — animated SVG turbulence emulating moving water light */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.18] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          <filter id="caustic-filter" x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.022"
              numOctaves="2"
              seed="3"
              stitchTiles="stitch"
            >
              <animate
                attributeName="baseFrequency"
                dur="22s"
                values="0.012 0.022; 0.018 0.014; 0.012 0.022"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.78
                      0 0 0 0 0.96
                      0 0 0 0 1
                      0 0 0 8 -3.5"
            />
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#caustic-filter)" />
      </svg>

      {/* Wave divider — sits at the very bottom of the hero, transitioning into the next dark band */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-16 md:h-20 pointer-events-none"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,40 C240,90 480,10 720,40 C960,70 1200,20 1440,50 L1440,100 L0,100 Z"
          fill="rgba(11, 61, 92, 0.06)"
        >
          <animate
            attributeName="d"
            dur="14s"
            repeatCount="indefinite"
            values="
              M0,40 C240,90 480,10 720,40 C960,70 1200,20 1440,50 L1440,100 L0,100 Z;
              M0,50 C240,20 480,80 720,45 C960,15 1200,75 1440,40 L1440,100 L0,100 Z;
              M0,40 C240,90 480,10 720,40 C960,70 1200,20 1440,50 L1440,100 L0,100 Z
            "
          />
        </path>
        <path
          d="M0,60 C240,30 480,90 720,55 C960,30 1200,80 1440,60 L1440,100 L0,100 Z"
          fill="rgba(11, 61, 92, 0.1)"
        >
          <animate
            attributeName="d"
            dur="18s"
            repeatCount="indefinite"
            values="
              M0,60 C240,30 480,90 720,55 C960,30 1200,80 1440,60 L1440,100 L0,100 Z;
              M0,55 C240,80 480,30 720,65 C960,90 1200,40 1440,55 L1440,100 L0,100 Z;
              M0,60 C240,30 480,90 720,55 C960,30 1200,80 1440,60 L1440,100 L0,100 Z
            "
          />
        </path>
      </svg>

      {/* Filmic noise — subtle */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-multiply pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>

      <style jsx>{`
        @keyframes atmos-drift-a {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(40px, 30px) scale(1.08);
          }
        }
        @keyframes atmos-drift-b {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(-50px, -40px) scale(1.1);
          }
        }
        @keyframes atmos-drift-c {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-30px, 30px);
          }
        }
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
        /* ===== God rays — angled streaks of light from the top ===== */
        .god-ray {
          position: absolute;
          top: -10%;
          width: 30%;
          height: 130%;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.55) 30%,
            rgba(189, 238, 248, 0.35) 70%,
            rgba(189, 238, 248, 0) 100%
          );
          filter: blur(20px);
          transform-origin: top center;
          mix-blend-mode: screen;
          opacity: 0.5;
          will-change: transform, opacity;
        }
        .god-ray-a {
          left: 8%;
          transform: rotate(-14deg);
          animation: ray-pulse-a 11s ease-in-out infinite alternate;
        }
        .god-ray-b {
          left: 38%;
          width: 22%;
          transform: rotate(-8deg);
          animation: ray-pulse-b 14s ease-in-out infinite alternate;
        }
        .god-ray-c {
          left: 64%;
          width: 26%;
          transform: rotate(-18deg);
          animation: ray-pulse-c 13s ease-in-out infinite alternate;
        }
        @keyframes ray-pulse-a {
          0% {
            opacity: 0.3;
            transform: rotate(-14deg) translateX(0);
          }
          100% {
            opacity: 0.55;
            transform: rotate(-12deg) translateX(20px);
          }
        }
        @keyframes ray-pulse-b {
          0% {
            opacity: 0.2;
            transform: rotate(-8deg) translateX(0);
          }
          100% {
            opacity: 0.5;
            transform: rotate(-10deg) translateX(-15px);
          }
        }
        @keyframes ray-pulse-c {
          0% {
            opacity: 0.35;
            transform: rotate(-18deg) translateX(0);
          }
          100% {
            opacity: 0.55;
            transform: rotate(-16deg) translateX(25px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bubble,
          .god-ray {
            animation: none;
          }
          .bubble {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
