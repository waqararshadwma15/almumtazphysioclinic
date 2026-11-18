import { SITE_URL, clinic, services, serviceUrl, mapsLink, type Service } from "@/lib/site";
import type { Faq } from "@/lib/faq";

// schema.org JSON-LD builders. Every value comes from lib/site.ts or lib/faq.ts.

export const ids = {
  clinic: `${SITE_URL}/#clinic`,
  website: `${SITE_URL}/#website`,
  doctor: `${SITE_URL}/#dr-arshad-khan`,
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function clinicNode() {
  return {
    "@type": ["MedicalClinic", "Physiotherapy"],
    "@id": ids.clinic,
    name: clinic.name,
    alternateName: [clinic.shortName, "Al Mumtaz Physiotherapy"],
    description: `${clinic.tagline} clinic inside Al Mumtaz Hospital, Darakhshan Society, Malir, Karachi. Open daily 11 AM to 11 PM.`,
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og.jpg`,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
    telephone: clinic.phoneIntl,
    email: clinic.email,
    medicalSpecialty: "Physiotherapy",
    isAcceptingNewPatients: true,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${clinic.address.line1}, ${clinic.address.street}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      addressCountry: clinic.address.country,
    },
    ...(clinic.geo ? { geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng } } : {}),
    containedInPlace: { "@type": "Hospital", name: "Al Mumtaz Hospital", alternateName: "Al Mumtaz Medical Complex" },
    areaServed: [
      { "@type": "Place", name: "Malir, Karachi" },
      { "@type": "City", name: "Karachi" },
    ],
    hasMap: mapsLink,
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: days, opens: clinic.hours.opens, closes: clinic.hours.closes }],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: clinic.phoneIntl,
      contactType: "appointments",
      availableLanguage: ["en", "ur"],
    },
    availableService: services.map((s) => ({ "@type": "MedicalTherapy", name: s.heading, url: `${SITE_URL}${serviceUrl(s)}` })),
    employee: { "@id": ids.doctor },
    sameAs: clinic.sameAs,
  };
}

export function doctorNode() {
  return {
    "@type": "Person",
    "@id": ids.doctor,
    name: clinic.doctor.name,
    jobTitle: clinic.doctor.title,
    worksFor: { "@id": ids.clinic },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    url: `${SITE_URL}/`,
    name: clinic.name,
    inLanguage: "en-PK",
    publisher: { "@id": ids.clinic },
  };
}

export function faqNode(faqs: Faq[], pageUrl: string) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.roman ? `${f.a} (${f.roman})` : f.a },
    })),
  };
}

export function homeGraph(faqs: Faq[]) {
  const url = `${SITE_URL}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(),
      clinicNode(),
      doctorNode(),
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${clinic.name} | Physiotherapy in Malir, Karachi`,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.clinic },
        inLanguage: "en-PK",
      },
      faqNode(faqs, url),
    ],
  };
}

export function serviceGraph(s: Service, faqs: Faq[]) {
  const url = `${SITE_URL}${serviceUrl(s)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${s.heading} in Malir, Karachi`,
        description: s.summary,
        isPartOf: { "@id": ids.website },
        inLanguage: "en-PK",
        about: { "@type": "MedicalCondition", name: s.name },
        mainEntity: {
          "@type": "MedicalTherapy",
          name: s.heading,
          description: s.summary,
          relevantSpecialty: "Physiotherapy",
          provider: { "@id": ids.clinic },
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
            { "@type": "ListItem", position: 3, name: s.name, item: url },
          ],
        },
      },
      clinicNode(),
      faqNode(faqs, url),
    ],
  };
}

/** JSON for a <script type="application/ld+json">, with "<" escaped. */
export const ldJson = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
