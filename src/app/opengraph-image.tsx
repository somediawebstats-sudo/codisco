import { ImageResponse } from "next/og";

export const alt = "CODISCO GIBAT, travaux, climatisation et hygiène 3D au Congo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "#f7f9f8",
          color: "#0f2234",
          fontFamily: "Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 260,
            right: -95,
            top: -170,
            background: "#e4f1eb",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 32, fontWeight: 700 }}>
          <span style={{ color: "#00634c" }}>CODISCO</span>
          <span>GIBAT</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 930 }}>
          <div style={{ color: "#00634c", fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>
            DEPUIS PLUS DE 30 ANS AU CONGO
          </div>
          <div style={{ fontSize: 62, lineHeight: 1.12, fontWeight: 700 }}>
            Votre partenaire technique, de Pointe-Noire à Brazzaville.
          </div>
          <div style={{ fontSize: 26, color: "#435363" }}>
            Travaux et maintenance · Climatisation et réfrigération · Hygiène 3D
          </div>
        </div>
        <div style={{ display: "flex", height: 9, width: 220, borderRadius: 5, background: "#00634c" }} />
      </div>
    ),
    size,
  );
}
