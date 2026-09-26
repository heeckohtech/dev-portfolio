import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#FAF9F6",
          color: "#1A1917",
        }}
      >
        <div style={{ fontSize: 28, color: "#B5502F", marginBottom: 20 }}>
          WAHAB — DEVELOPER, LEARNER, BUILDER
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          Building my way into full-stack engineering — in public.
        </div>
      </div>
    ),
    { ...size }
  );
}