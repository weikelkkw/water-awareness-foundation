"use client";

import { useEffect } from "react";

/**
 * Top-level error boundary. Reports to Sentry if NEXT_PUBLIC_SENTRY_DSN is
 * set; otherwise just logs to the console. Keep this dependency-free so it
 * fires even when the regular layout fails to load.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (dsn) {
      // Lightweight beacon — full Sentry SDK can be wired later.
      try {
        navigator.sendBeacon(
          "/api/error",
          JSON.stringify({
            message: error.message,
            digest: error.digest,
            stack: error.stack,
            href: window.location.href,
          })
        );
      } catch {
        /* swallow */
      }
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background:
            "linear-gradient(135deg, #062642 0%, #0B3D5C 45%, #093150 100%)",
          color: "white",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <div
            style={{
              fontSize: 12,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#D9BB7E",
              marginBottom: 16,
            }}
          >
            Unexpected Error
          </div>
          <h1
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 36,
              lineHeight: 1.1,
              margin: "0 0 16px 0",
            }}
          >
            Something broke on our end.
          </h1>
          <p
            style={{
              opacity: 0.8,
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            Our team has been notified. Try reloading; if it keeps happening,
            email <a style={{ color: "#3FCBEA" }} href="mailto:hello@waterawarenessfoundation.com">
              hello@waterawarenessfoundation.com
            </a>{" "}
            and we&apos;ll dig in.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "14px 24px",
              borderRadius: 12,
              border: "none",
              background: "#C9A663",
              color: "#0B3D5C",
              fontWeight: 600,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
