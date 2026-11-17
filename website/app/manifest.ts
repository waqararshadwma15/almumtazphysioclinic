import type { MetadataRoute } from "next";
import { clinic } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: clinic.name,
    short_name: clinic.shortName,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0A2A35",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
