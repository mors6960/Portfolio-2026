import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0e0f13", color: "#eeeff4", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "58%" }}>
          <div style={{ fontSize: 26, color: "#5eead4" }}>Full-stack developer</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
            <div style={{ fontSize: 30, color: "#9a968e", marginTop: 20, lineHeight: 1.3 }}>The interface, the API and the data behind it.</div>
          </div>
          <div style={{ fontSize: 22, color: "#9a968e" }}>{profile.location}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "42%", gap: 14 }}>
          {[["GET", "/api/tasks", "200"], ["POST", "/api/tasks", "201"], ["PATCH", "/api/tasks/7c2e", "200"]].map(([m, p, s]) => (
            <div key={p + m} style={{ display: "flex", justifyContent: "space-between", background: "#0a1220", border: "1px solid #232a35", borderRadius: 16, padding: "18px 22px", fontSize: 24, fontFamily: "monospace" }}>
              <span style={{ color: "#7dd3fc" }}>{m}</span>
              <span style={{ color: "#d6deeb" }}>{p}</span>
              <span style={{ color: "#a5e3a0" }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
