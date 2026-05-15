import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <section className="relative overflow-hidden bg-midnight text-white min-h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-1/4 left-1/4 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle at center, rgba(0,180,216,0.55), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-1/4 right-0 w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 bg-grid-faint opacity-[0.06]" />
      </div>

      <Container size="tight" className="relative text-center py-16">
        {/* Cinematic droplet + ripple loader */}
        <div className="relative mx-auto h-40 w-40 mb-10">
          {/* Expanding rings */}
          <span className="absolute inset-0 rounded-full border border-cyan-300/40 droplet-ring droplet-ring-1" />
          <span className="absolute inset-0 rounded-full border border-cyan-300/40 droplet-ring droplet-ring-2" />
          <span className="absolute inset-0 rounded-full border border-brass-300/40 droplet-ring droplet-ring-3" />

          {/* Soft cyan glow */}
          <span
            className="absolute inset-1/4 rounded-full blur-2xl droplet-glow"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,180,216,0.55), transparent 70%)",
            }}
          />

          {/* The droplet itself — glass sphere with highlight */}
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full droplet-core"
            style={{
              background:
                "radial-gradient(circle at 32% 30%, rgba(255,255,255,0.98) 0%, rgba(220,244,251,0.85) 22%, rgba(125,209,234,0.7) 50%, rgba(11,61,92,0.55) 88%, rgba(11,61,92,0.75) 100%)",
              boxShadow:
                "inset 0 0 0 1.5px rgba(255,255,255,0.9), inset 0 0 0 3px rgba(0,180,216,0.6), inset 6px -6px 14px rgba(255,255,255,0.55), inset -6px 6px 16px rgba(11,61,92,0.35), 0 0 32px rgba(0,180,216,0.55)",
            }}
          />
          {/* Specular highlight */}
          <span
            className="absolute droplet-specular pointer-events-none"
            style={{
              top: "calc(50% - 18px)",
              left: "calc(50% - 14px)",
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0) 100%)",
              filter: "blur(0.5px)",
            }}
          />
        </div>

        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-8 bg-brass-300" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-brass-300 font-semibold">
            Live Lookup
          </span>
          <span className="h-px w-8 bg-brass-300" />
        </div>
        <h1 className="display font-serif text-3xl md:text-4xl text-white mb-3 text-balance leading-[1.1]">
          Pulling EWG&apos;s contaminant data
          <em className="not-italic italic font-light text-cyan-300"> for your tap...</em>
        </h1>
        <p className="text-white/65 text-[15px]">
          We&apos;re looking up the utility that serves your ZIP, then pulling
          the latest sampled contaminant levels and EWG&apos;s health-protective
          guidelines. About 10 seconds the first time.
        </p>
      </Container>

      <style>{`
        .droplet-ring {
          opacity: 0;
          transform: scale(0.5);
          animation: droplet-ripple 3.6s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        .droplet-ring-1 { animation-delay: 0s; }
        .droplet-ring-2 { animation-delay: 1.2s; }
        .droplet-ring-3 { animation-delay: 2.4s; }

        @keyframes droplet-ripple {
          0% {
            transform: scale(0.45);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          80% {
            opacity: 0;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .droplet-glow {
          animation: droplet-pulse 2.4s ease-in-out infinite;
        }
        @keyframes droplet-pulse {
          0%, 100% { opacity: 0.45; transform: scale(0.95); }
          50% { opacity: 0.85; transform: scale(1.1); }
        }

        .droplet-core,
        .droplet-specular {
          animation: droplet-bob 3.6s ease-in-out infinite;
        }
        @keyframes droplet-bob {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -54%) scale(1.06); }
        }
        .droplet-specular {
          animation-name: droplet-bob-specular;
        }
        @keyframes droplet-bob-specular {
          0%, 100% { transform: scale(1); }
          50% { transform: translateY(-2px) scale(1.06); }
        }
      `}</style>
    </section>
  );
}
