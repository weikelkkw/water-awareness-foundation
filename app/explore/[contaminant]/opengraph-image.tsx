import { ImageResponse } from "next/og";
import { getContaminant } from "@/lib/contaminants";

export const runtime = "nodejs";
export const alt = "Water Awareness Foundation contaminant deep-dive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({
  params,
}: {
  params: { contaminant: string };
}) {
  const c = getContaminant(params.contaminant);
  const title = c?.name ?? "Contaminant";
  const oneLine = c?.oneLine ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #062642 0%, #0B3D5C 45%, #093150 100%)",
          color: "white",
          padding: "70px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(0,180,216,0.45), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            right: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(201,166,99,0.5), transparent 65%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 32,
            }}
          >
            <div style={{ width: 40, height: 1, background: "#D9BB7E" }} />
            <div
              style={{
                fontSize: 16,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#D9BB7E",
              }}
            >
              Contaminant Deep Dive
            </div>
          </div>

          <div
            style={{
              fontSize: 120,
              fontWeight: 400,
              lineHeight: 1,
              letterSpacing: -2,
              marginBottom: 20,
              color: "white",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.78)",
              fontStyle: "italic",
              maxWidth: 1000,
            }}
          >
            {oneLine}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Water Awareness Foundation
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 600,
              color: "#D9BB7E",
            }}
          >
            wateraware.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
