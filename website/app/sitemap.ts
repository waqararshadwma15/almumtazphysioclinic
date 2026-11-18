import type { MetadataRoute } from "next";
import { SITE_URL, services, serviceUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({
      url: `${SITE_URL}${serviceUrl(s)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
