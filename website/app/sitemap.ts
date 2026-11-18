import type { MetadataRoute } from "next";
import { SITE_URL, services, serviceUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = { en: `${SITE_URL}/`, ur: `${SITE_URL}/ur` };
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/ur`, lastModified: now, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    ...services.map((s) => ({
      url: `${SITE_URL}${serviceUrl(s)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
