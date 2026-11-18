import type { Metadata } from "next";
import localFont from "next/font/local";
import HomeView from "@/components/HomeView";
import { clinic } from "@/lib/site";

// Jameel Noori Nastaleeq, cut down to only the glyphs this page uses (~70 KB instead of 10 MB).
// Rebuild with tools/urdu_font.py whenever the Urdu text changes.
const nastaliq = localFont({
  src: "../fonts/jnn-subset.woff2",
  display: "swap",
  variable: "--font-urdu",
  preload: true,
  // Jameel's letters are drawn small for their em size; scale them up to sit well with Poppins.
  declarations: [{ prop: "size-adjust", value: "145%" }],
  fallback: ["Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", "Urdu Typesetting", "serif"],
});

const title = "الممتاز فزیوتھراپی کلینک | ملیر، کراچی میں فزیوتھراپی";
const description =
  "الممتاز ہسپتال، درخشاں سوسائٹی، ملیر، کراچی کے اندر فزیوتھراپی اور بحالی۔ ڈاکٹر ارشد خان، کنسلٹنٹ فزیوتھراپسٹ۔ روزانہ صبح ۱۱ بجے سے رات ۱۱ بجے تک۔ واٹس ایپ پر بکنگ: 0333-2156512";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/ur",
    languages: { en: "/", ur: "/ur", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: "/ur",
    siteName: clinic.name,
    title,
    description,
    locale: "ur_PK",
    alternateLocale: ["en_PK"],
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: clinic.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export default function UrduHome() {
  return (
    <div className={nastaliq.variable}>
      <HomeView lang="ur" />
    </div>
  );
}
