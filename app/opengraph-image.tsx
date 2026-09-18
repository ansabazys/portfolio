import { ImageResponse } from "next/og";

export const alt = "Ansab Azys — Designer & Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAFAF8",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 100px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#141413",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              background: "#141413",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FAFAF8",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <span
            style={{
              fontSize: "18px",
              letterSpacing: "0.15em",
              color: "#666561",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Ansab Azys
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#141413",
            }}
          >
            Designer &amp; Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: "26px",
              color: "#5E5D59",
              lineHeight: 1.4,
            }}
          >
            Designing brands, user interfaces, SaaS applications, and calm digital products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #EAE8E2",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#666561",
          }}
        >
          <span>Kerala, India · Available for projects</span>
          <span>ansabazys.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
