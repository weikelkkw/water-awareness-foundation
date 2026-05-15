import { ImageResponse } from "next/og";
import { CATEGORY_META, getArticle, type Category } from "@/lib/content/mdx";

export const runtime = "nodejs";
export const alt = "Water Awareness Foundation article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const a = getArticle(params.category as Category, params.slug);
  const title = a?.title ?? "Water Awareness Foundation";
  const meta = CATEGORY_META[params.category as Category];
  const eyebrow = meta?.eyebrow ?? "Article";

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
            top: -250,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(0,180,216,0.4), transparent 65%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(201,166,99,0.45), transparent 65%)",
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
              {eyebrow}
            </div>
          </div>

          <div
            style={{
              fontSize: title.length > 80 ? 58 : 72,
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: -1.2,
              maxWidth: 1040,
            }}
          >
            {title}
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
