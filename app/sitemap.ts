import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = profile.siteUrl.replace(/\/$/, "");
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1, images: profile.photo ? [`${base}${profile.photo}`] : undefined },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
