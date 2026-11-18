import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { SITE_URL, clinic } from "@/lib/site";
import "./globals.css";
import "./motion.css";
import "./theme.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

const title = `${clinic.name} | Physiotherapy in Malir, Karachi`;
const description =
  "Physiotherapy in Malir, Karachi: back, neck, knee and shoulder pain, stroke and nerve rehab, sports injuries. Inside Al Mumtaz Hospital, Darakhshan Society. Open daily 11 AM to 11 PM. WhatsApp 0333-2156512.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s | ${clinic.name}` },
  description,
  applicationName: clinic.name,
  keywords: [
    "physiotherapy Malir", "physiotherapist Karachi", "physiotherapy clinic Karachi",
    "back pain treatment Karachi", "neck pain physiotherapy", "frozen shoulder",
    "knee pain physiotherapy", "stroke rehabilitation Karachi", "cerebral palsy physiotherapy",
    "Al Mumtaz Hospital Malir", "physiotherapy Darakhshan Society", "Kala Board physiotherapy",
    "physio near me Malir", "tennis elbow treatment Karachi", "facial palsy physiotherapy",
    "Erb's palsy physiotherapy", "sports injury physiotherapy Karachi",
  ],
  authors: [{ name: clinic.name }],
  category: "health",
  alternates: { canonical: "/" },
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
  other: { "geo.region": "PK-SD", "geo.placename": "Malir, Karachi" },
};

export const viewport: Viewport = {
  themeColor: "#0A2A35",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK" className={poppins.variable} suppressHydrationWarning>
      <body>
        {/* Lets CSS hide scroll-reveal content only when JavaScript can show it again. */}
        {/* Also sets the light/dark theme before first paint (saved choice, else the device setting). */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var d=document.documentElement;d.classList.add("js");var t;try{t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t;if(t==="dark"){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#08181E")}})()` }} />
        {children}
      </body>
    </html>
  );
}
