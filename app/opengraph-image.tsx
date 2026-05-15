import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Water Awareness Foundation — Know what's in your water.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #062642 0%, #0B3D5C 45%, #093150 100%)",
          color: "white",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Soft cyan bloom */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(0,180,216,0.4), transparent 65%)",
          }}
        />
        {/* Brass bloom */}
        <div
          style={{
            position: "absolute",
            bottom: -150,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 65%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#C9A663",
            }}
          />
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#D9BB7E",
            }}
          >
            Water Awareness Foundation
          </div>
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 400,
            lineHeight: 1.04,
            letterSpacing: -1.5,
            maxWidth: 950,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>What&apos;s actually</div>
          <div style={{ fontStyle: "italic", color: "#3FCBEA" }}>
            in your tap water?
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 26,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.78)",
            maxWidth: 850,
          }}
        >
          Clear, science-backed reports on the drinking water in every U.S.
          ZIP code.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            fontSize: 16,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          wateraware.org
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 14,
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
            color: "#D9BB7E",
          }}
        >
          Independent · Non-commercial
        </div>
      </div>
    ),
    { ...size }
  );
}
