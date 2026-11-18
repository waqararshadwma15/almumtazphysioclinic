import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import HomeView from "@/components/HomeView";
import { clinic } from "@/lib/site";

// Google's Noto Nastaliq Urdu, self-hosted by Next.js and loaded only on /ur.
const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-urdu",
  preload: true,
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
