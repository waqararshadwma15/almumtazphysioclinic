import { clinic, services, type Service } from "@/lib/site";

// Short, direct answers written for people, Google answer boxes and AI
// assistants alike. Only verified clinic facts. No fees, results or
// qualifications are stated. Review with Dr. Arshad Khan before going live.

export type Faq = { q: string; a: string; roman?: string };

const serviceList = services.map((s) => s.name).join(", ");

export const homeFaqs: Faq[] = [
  {
    q: "Where is Al Mumtaz Physiotherapy Clinic?",
    a: `The clinic is inside Al Mumtaz Hospital, ${clinic.address.street}, ${clinic.address.area}, ${clinic.address.city}.`,
    roman: "Clinic Al Mumtaz Hospital ke andar hai, Darakhshan Society, Kala Board bus stop, Malir, Karachi.",
  },
  {
    q: "What are the clinic timings?",
    a: "The clinic is open every day, Monday to Sunday, from 11 AM to 11 PM.",
    roman: "Clinic rozana subah 11 baje se raat 11 baje tak khula hai, Sunday ko bhi.",
  },
  {
    q: "How do I book an appointment?",
    a: `Send a WhatsApp message to ${clinic.phoneDisplay} with your name and the problem you need help with, and the clinic will reply with an available time. You can also call the same number.`,
    roman: `Appointment ke liye ${clinic.phoneDisplay} par WhatsApp karein ya call karein.`,
  },
  {
    q: "Who is the physiotherapist?",
    a: `Sessions are with ${clinic.doctor.name}, ${clinic.doctor.title} at ${clinic.name}.`,
  },
  {
    q: "What conditions does the clinic treat?",
    a: `The clinic offers physiotherapy and rehabilitation for ${serviceList}.`,
  },
  {
    q: "Do you treat children?",
    a: "Yes. The clinic offers physiotherapy for children, including Erb's palsy and cerebral palsy (CP).",
    roman: "Ji haan, bachon ki CP aur Erb's palsy ki physiotherapy bhi hoti hai.",
  },
  {
    q: "What are the fees?",
    a: `Please ask on WhatsApp at ${clinic.phoneDisplay} for the current consultation and session fees.`,
  },
  {
    q: "What should I bring to my first visit?",
    a: "If you have them, bring any previous reports, X-rays, MRI scans or prescriptions related to your problem, and wear comfortable clothes.",
  },
];

/** Heading for use mid-sentence: "back pain physiotherapy", keeps "Erb's". */
export const inSentence = (s: Service) =>
  s.heading.startsWith("Erb") ? s.heading : s.heading.charAt(0).toLowerCase() + s.heading.slice(1);

export function serviceFaqs(s: Service): Faq[] {
  const t = inSentence(s);
  return [
    {
      q: `Is ${t} available in Malir, Karachi?`,
      a: `Yes. ${clinic.name}, inside Al Mumtaz Hospital, Darakhshan Society, Malir, Karachi, offers ${t}. It is open daily from 11 AM to 11 PM. Book on WhatsApp at ${clinic.phoneDisplay}.`,
    },
    {
      q: "How many sessions will I need?",
      a: "It depends on your condition. The physiotherapist will assess you at the first visit and explain a suggested plan.",
    },
    {
      q: "How do I book?",
      a: `Send a WhatsApp message to ${clinic.phoneDisplay} saying you would like ${t}, or call the same number.`,
    },
  ];
}
