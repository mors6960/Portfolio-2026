import { ImageResponse } from "next/og";
import { profile, projects } from "@/lib/content";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug)!;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0e0f13", color: "#eeeff4", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#5eead4" }}>Case study · {p.year}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>{p.title}</div>
          <div style={{ fontSize: 30, color: "#c3c6d0", marginTop: 24, lineHeight: 1.35, maxWidth: 1000 }}>
            {p.oneLiner.length > 150 ? p.oneLiner.slice(0, 147) + "…" : p.oneLiner}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {p.tech.slice(0, 4).map((t, i) => (
              <div key={`${t}-${i}`} style={{ display: "flex", fontSize: 22, padding: "8px 18px", borderRadius: 999, border: "1px solid #353943", color: "#c3c6d0" }}>{t}</div>
            ))}
          </div>
          <div style={{ fontSize: 26, fontWeight: 600 }}>{profile.name}</div>
        </div>
      </div>
    ),
    size
  );
}
