import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title =
    searchParams.get("title")?.slice(0, 120) ?? "KodStudio — Software Studio";
  const subtitle =
    searchParams.get("subtitle")?.slice(0, 160) ?? "Сайты · Боты · Mobile";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(ellipse at top left, rgba(107,91,255,0.45), transparent 55%), radial-gradient(ellipse at bottom right, rgba(232,121,249,0.4), transparent 55%), #0A0A14",
          color: "#F4F4F8",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6B5BFF 0%, #8B5CF6 50%, #E879F9 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "white",
              boxShadow: "0 8px 32px -8px rgba(107,91,255,0.6)",
            }}
          >
            K
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            KodStudio
          </span>
        </div>

        {/* Middle: title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              margin: 0,
              maxWidth: 1000,
              backgroundImage:
                "linear-gradient(135deg, #6B5BFF 0%, #8B5CF6 50%, #E879F9 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: 30,
              color: "#A1A1B5",
              margin: 0,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom: url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6B6B7E",
            fontSize: 22,
          }}
        >
          <span>kodstudio.dev</span>
          <span>Software Studio · 2026</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    },
  );
}
