// Single source of truth for clinic details.
// Only verified facts live here. Anything still to be confirmed by the
// clinic is listed in README.md under "Waiting on the clinic".

// The ONE place the site address is set. Change the fallback here, or set
// NEXT_PUBLIC_SITE_URL in Vercel, when the final domain is chosen. Canonical
// URLs, sitemap, robots, llms.txt, Open Graph and all schema use this value.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://almumtazphysio.vercel.app").replace(/\/$/, "");

export const clinic = {
  name: "Al Mumtaz Physiotherapy Clinic",
  shortName: "Al Mumtaz Physio",
  tagline: "Physiotherapy & Rehabilitation",
  doctor: { name: "Dr. Arshad Khan", title: "Consultant Physiotherapist" },
  phoneDisplay: "0333-2156512",
  phoneIntl: "+923332156512",
  whatsappNumber: "923332156512",
  email: "physioammhospital@gmail.com",
  facebook: "https://www.facebook.com/almumtazphysioclinic",
  instagram: "https://www.instagram.com/almumtazphysioclinic",
  address: {
    line1: "Inside Al Mumtaz Hospital",
    street: "25/243, Darakhshan Society (Kala Board Bus Stop)",
    area: "Malir",
    city: "Karachi",
    region: "Sindh",
    country: "PK",
  },
  hours: { label: "Open daily, 11 AM to 9 PM", opens: "11:00", closes: "21:00" },
  // Google Maps lists the building as "Al Mumtaz Medical Complex".
  mapsQuery: "Al Mumtaz Medical Complex, Darakhshan Society, Malir, Karachi",
  // Map coordinates for schema. Left empty until confirmed from the clinic's
  // own Google Business Profile pin, e.g. { lat: 24.89, lng: 67.19 }.
  geo: null as null | { lat: number; lng: number },
  // Add TikTok, LinkedIn and Google Business Profile links here when live.
  sameAs: ["https://www.facebook.com/almumtazphysioclinic", "https://www.instagram.com/almumtazphysioclinic"],
};

export const fullAddress = `${clinic.address.line1}, ${clinic.address.street}, ${clinic.address.area}, ${clinic.address.city}`;

export type Service = {
  slug: string;
  name: string;
  roman: string;
  icon: IconName;
  /** Page heading, e.g. "Back pain physiotherapy". */
  heading: string;
  /** One general sentence on who the service is for. No outcome claims. */
  summary: string;
};

// Summaries are general descriptions only (no promised results). They must be
// reviewed by Dr. Arshad Khan before the site goes live.
export const services: Service[] = [
  { slug: "neck-pain", name: "Neck Pain", roman: "Gardan ka dard", icon: "neck", heading: "Neck pain physiotherapy",
    summary: "For neck pain and stiffness, including discomfort linked to posture, long hours on a phone or computer, or muscle strain." },
  { slug: "back-pain", name: "Back Pain", roman: "Kamar ka dard", icon: "back", heading: "Back pain physiotherapy",
    summary: "For lower and upper back pain and stiffness, including pain linked to long sitting, lifting or posture." },
  { slug: "frozen-shoulder", name: "Frozen Shoulder", roman: "Kandhe ki akran", icon: "shoulder", heading: "Frozen shoulder physiotherapy",
    summary: "For a stiff, painful shoulder that is hard to lift or turn, often called frozen shoulder (adhesive capsulitis)." },
  { slug: "tennis-elbow", name: "Tennis Elbow", roman: "Kohni ka dard", icon: "elbow", heading: "Tennis elbow physiotherapy",
    summary: "For pain on the outer side of the elbow, often linked to repeated gripping or heavy use of the wrist and arm." },
  { slug: "knee-pain", name: "Knee Pain", roman: "Ghutnon ka dard", icon: "knee", heading: "Knee pain physiotherapy",
    summary: "For knee pain and stiffness, including pain when climbing stairs, sitting down, getting up or walking." },
  { slug: "ankle-pain", name: "Ankle Pain", roman: "Takhne ka dard", icon: "ankle", heading: "Ankle pain physiotherapy",
    summary: "For ankle pain, stiffness or weakness, including after a sprain or a twisted ankle." },
  { slug: "joint-pain", name: "Joint Pain", roman: "Joron ka dard", icon: "joint", heading: "Joint pain physiotherapy",
    summary: "For pain and stiffness in the joints, such as the hips, wrists and hands, that makes daily movement harder." },
  { slug: "sports-injury", name: "Sports Injury", roman: "Khel ke dauran chot", icon: "sport", heading: "Sports injury physiotherapy",
    summary: "For injuries from sport, exercise and physical work, such as muscle strains and ligament sprains, and a guided return to activity." },
  { slug: "stroke-rehabilitation", name: "Stroke Rehabilitation / Paralysis", roman: "Falij ke baad bahali", icon: "stroke", heading: "Stroke rehabilitation and paralysis physiotherapy",
    summary: "Rehabilitation after a stroke or for paralysis, working on movement, balance, strength and everyday activities." },
  { slug: "facial-palsy", name: "Facial Palsy", roman: "Chehre ka laqwa", icon: "face", heading: "Facial palsy physiotherapy",
    summary: "For weakness of the muscles on one side of the face, such as Bell's palsy (laqwa)." },
  { slug: "erbs-palsy", name: "Erb's Palsy", roman: "Bachon ke bazu ki kamzori", icon: "child", heading: "Erb's palsy physiotherapy for children",
    summary: "For babies and children with arm weakness caused by an injury to the nerves around the shoulder (brachial plexus), often at birth." },
  { slug: "cerebral-palsy", name: "Cerebral Palsy (CP Child)", roman: "Bachon ki CP", icon: "child", heading: "Cerebral palsy (CP) physiotherapy for children",
    summary: "For children with cerebral palsy, working on movement, posture, balance and daily skills together with the family." },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const serviceUrl = (s: Service) => `/services/${s.slug}`;

export type IconName =
  | "neck" | "back" | "shoulder" | "elbow" | "knee" | "ankle"
  | "joint" | "sport" | "stroke" | "face" | "child";

export function waLink(service?: string) {
  const msg = service
    ? `Assalam o Alaikum! I would like to book an appointment at ${clinic.name} for ${service}.`
    : `Assalam o Alaikum! I would like to book an appointment at ${clinic.name}.`;
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export const telLink = `tel:${clinic.phoneIntl}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.mapsQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(clinic.mapsQuery)}&output=embed`;
