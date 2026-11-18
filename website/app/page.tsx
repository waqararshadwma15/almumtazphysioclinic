import HomeView from "@/components/HomeView";
import { clinic, services, mapsLink, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "Physiotherapy"],
  "@id": `${SITE_URL}/#clinic`,
  name: clinic.name,
  description: `${clinic.tagline} inside Al Mumtaz Hospital, Malir, Karachi.`,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/icon-512.png`,
  telephone: clinic.phoneIntl,
  email: clinic.email,
  medicalSpecialty: "Physiotherapy",
  address: {
    "@type": "PostalAddress",
    streetAddress: `${clinic.address.line1}, ${clinic.address.street}`,
    addressLocality: `${clinic.address.area}, ${clinic.address.city}`,
    addressRegion: clinic.address.region,
    addressCountry: clinic.address.country,
  },
  areaServed: { "@type": "City", name: "Karachi" },
  hasMap: mapsLink,
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: clinic.hours.opens,
    closes: clinic.hours.closes,
  }],
  availableService: services.map((s) => ({ "@type": "MedicalTherapy", name: s.name })),
  employee: { "@type": "Person", name: clinic.doctor.name, jobTitle: clinic.doctor.title },
  sameAs: [clinic.facebook],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomeView lang="en" />
    </>
  );
}
