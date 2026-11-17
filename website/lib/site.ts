// Single source of truth for clinic details.
// Only verified facts live here. Anything still to be confirmed by the
// clinic is listed in README.md under "Waiting on the clinic".

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
  address: {
    line1: "Inside Al Mumtaz Hospital",
    street: "25/243, Darakhshan Society (Kala Board Bus Stop)",
    area: "Malir",
    city: "Karachi",
    region: "Sindh",
    country: "PK",
  },
  hours: { label: "Open daily, 11 AM to 11 PM", opens: "11:00", closes: "23:00" },
  // Google Maps lists the building as "Al Mumtaz Medical Complex".
  mapsQuery: "Al Mumtaz Medical Complex, Darakhshan Society, Malir, Karachi",
};

export const services: { name: string; roman: string; icon: IconName }[] = [
  { name: "Neck Pain", roman: "Gardan ka dard", icon: "neck" },
  { name: "Back Pain", roman: "Kamar ka dard", icon: "back" },
  { name: "Frozen Shoulder", roman: "Kandhe ki akran", icon: "shoulder" },
  { name: "Tennis Elbow", roman: "Kohni ka dard", icon: "elbow" },
  { name: "Knee Pain", roman: "Ghutnon ka dard", icon: "knee" },
  { name: "Ankle Pain", roman: "Takhne ka dard", icon: "ankle" },
  { name: "Joint Pain", roman: "Joron ka dard", icon: "joint" },
  { name: "Sports Injury", roman: "Khel ke dauran chot", icon: "sport" },
  { name: "Stroke Rehabilitation / Paralysis", roman: "Falij ke baad bahali", icon: "stroke" },
  { name: "Facial Palsy", roman: "Chehre ka laqwa", icon: "face" },
  { name: "Erb's Palsy", roman: "Bachon ke bazu ki kamzori", icon: "child" },
  { name: "Cerebral Palsy (CP Child)", roman: "Bachon ki CP", icon: "child" },
];

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
