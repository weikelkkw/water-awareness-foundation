"use client";

/**
 * Subtle atmospheric layer for long-form body sections.
 *
 * Lighter than HeroAtmosphere — designed to live behind editorial text
 * without competing with it. Drifting low-opacity gradient blooms +
 * gentle grid texture. CSS-only, GPU-cheap.
 *
 * Use it inside a section with `relative overflow-hidden` and bg-canvas
 * (or similar). The component sits absolute behind content.
 */

interface Props {
  variant?: "cyan" | "brass" | "mixed";
  intensity?: "soft" | "medium";
}

export function BodyAtmosphere({ variant = "mixed", intensity = "soft" }: Props) {
  const op = intensity === "medium" ? 0.4 : 0.25;
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle gradient wash to break flat-canvas feeling */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,246,251,0.7) 0%, rgba(250,251,252,0) 35%, rgba(240,246,251,0.7) 100%)",
        }}
      />

      {/* Drifting cyan bloom */}
      {(variant === "cyan" || variant === "mixed") && (
        <div
          className="absolute top-[8%] -left-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl"
          style={{
            opacity: op,
            background:
              "radial-gradient(circle at center, rgba(0,180,216,0.5), transparent 65%)",
            animation: "body-drift-a 32s ease-in-out infinite alternate",
          }}
        />
      )}

      {/* Drifting ocean bloom */}
      {(variant === "cyan" || variant === "mixed") && (
        <div
          className="absolute top-[55%] -right-[10%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl"
          style={{
            opacity: op,
            background:
              "radial-gradient(circle at center, rgba(11,61,92,0.35), transparent 65%)",
            animation: "body-drift-b 36s ease-in-out infinite alternate",
          }}
        />
      )}

      {/* Drifting brass bloom — adds warmth */}
      {(variant === "brass" || variant === "mixed") && (
        <div
          className="absolute top-[30%] left-[35%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-3xl"
          style={{
            opacity: op * 0.7,
            background:
              "radial-gradient(circle at center, rgba(201,166,99,0.4), transparent 65%)",
            animation: "body-drift-c 28s ease-in-out infinite alternate",
          }}
        />
      )}

      {/* Faint grid */}
      <div className="absolute inset-0 bg-grid-faint opacity-[0.35]" />

      <style jsx>{`
        @keyframes body-drift-a {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(40px, 50px) scale(1.05); }
        }
        @keyframes body-drift-b {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, -30px) scale(1.08); }
        }
        @keyframes body-drift-c {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-25px, 35px); }
        }
      `}</style>
    </div>
  );
}
