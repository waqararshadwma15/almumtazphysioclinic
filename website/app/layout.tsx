import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SITE_URL, clinic } from "@/lib/site";
import "./globals.css";
import "./motion.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const title = `${clinic.name} | Physiotherapy in Malir, Karachi`;
const description =
  "Physiotherapy & Rehabilitation inside Al Mumtaz Hospital, Darakhshan Society, Malir, Karachi. Dr. Arshad Khan, Consultant Physiotherapist. Open daily 11 AM to 11 PM. Book on WhatsApp 0333-2156512.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: clinic.name,
  keywords: [
    "physiotherapy Malir", "physiotherapist Karachi", "physiotherapy clinic Karachi",
    "back pain treatment Karachi", "neck pain physiotherapy", "frozen shoulder",
    "knee pain physiotherapy", "stroke rehabilitation Karachi", "cerebral palsy physiotherapy",
    "Al Mumtaz Hospital Malir",
  ],
  alternates: {
    canonical: "/",
    languages: { en: "/", ur: "/ur", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: clinic.name,
    title,
    description,
    locale: "en_PK",
    alternateLocale: ["ur_PK"],
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: clinic.name }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0A2A35",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body>
        {/* Lets CSS hide scroll-reveal content only when JavaScript can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js")` }} />
        {children}
      </body>
    </html>
  );
}
