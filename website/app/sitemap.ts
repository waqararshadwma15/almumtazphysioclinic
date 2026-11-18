import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${SITE_URL}/`, ur: `${SITE_URL}/ur` };
  return [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/ur`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
