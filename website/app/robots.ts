import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Search engines and AI assistants are all welcome: being quoted by ChatGPT,
// Gemini, Perplexity or Claude is part of the plan (GEO).
const aiBots = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "Google-Extended", "PerplexityBot",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "Applebot-Extended", "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: aiBots, allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
