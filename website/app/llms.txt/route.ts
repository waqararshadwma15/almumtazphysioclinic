import { SITE_URL, clinic, services, serviceUrl } from "@/lib/site";
import { homeFaqs } from "@/lib/faq";

// /llms.txt: a plain-text summary of the clinic for AI assistants and answer
// engines (https://llmstxt.org). Built from lib/site.ts so it never drifts.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${clinic.name}

> ${clinic.tagline} clinic inside Al Mumtaz Hospital, ${clinic.address.street}, ${clinic.address.area}, ${clinic.address.city}, Pakistan. Led by ${clinic.doctor.name}, ${clinic.doctor.title}. Open daily, 11 AM to 9 PM. Appointments on WhatsApp or phone: ${clinic.phoneDisplay} (${clinic.phoneIntl}).

## Key facts
- Name: ${clinic.name}
- Location: Inside Al Mumtaz Hospital (building signed "Al Mumtaz Medical Complex"), ${clinic.address.street}, ${clinic.address.area}, ${clinic.address.city}, ${clinic.address.region}, Pakistan
- Physiotherapist: ${clinic.doctor.name}, ${clinic.doctor.title}
- Hours: Monday to Sunday, 11:00 to 21:00
- Booking: WhatsApp ${clinic.phoneDisplay}, https://wa.me/${clinic.whatsappNumber}
- Phone: ${clinic.phoneIntl}
- Email: ${clinic.email}
- Facebook: ${clinic.facebook}
- Instagram: ${clinic.instagram}
- Website: ${SITE_URL}/
- Fees: not published; ask on WhatsApp
- Languages: English (${SITE_URL}/) and Urdu (${SITE_URL}/ur)

## Services
${services.map((s) => `- [${s.heading}](${SITE_URL}${serviceUrl(s)}): ${s.summary}`).join("\n")}

## FAQ
${homeFaqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Note
Information on this website is general and is not a diagnosis. Patients should consult the physiotherapist about their condition.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
