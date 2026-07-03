import { ImageResponse } from "next/og";

export const alt =
  "Camp2Code — Transform tech consumers into tech creators. Coding camp for ages 8–19 in Abuja.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050716",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(135, 213, 0, 0.25) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(65, 83, 195, 0.35) 0%, transparent 50%)",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(135, 213, 0, 0.15)",
              border: "1px solid rgba(135, 213, 0, 0.4)",
              borderRadius: 9999,
              padding: "10px 28px",
              color: "#8ddc11",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {"// ABUJA · AGES 8–19"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 96,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -3,
            }}
          >
            Camp2Code
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#c9cddb",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Transform tech consumers into tech creators — web, mobile, game,
            product & business.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: "#8ddc11" }}>
            camp2code.com
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "#406900",
              color: "#ffffff",
              borderRadius: 12,
              padding: "16px 36px",
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            Start Your Journey
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
