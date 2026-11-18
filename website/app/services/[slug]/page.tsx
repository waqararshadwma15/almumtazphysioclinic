import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceIcon, PinIcon, ClockIcon, PhoneIcon, UserIcon } from "@/components/Icons";
import { Header, Footer, WaButton, FaqList } from "@/components/Chrome";
import { clinic, services, serviceBySlug, serviceUrl, telLink, mapsLink } from "@/lib/site";
import { serviceFaqs } from "@/lib/faq";
import { serviceGraph, ldJson } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  const title = `${s.heading} in Malir, Karachi`;
  const description = `${s.summary} ${clinic.name}, inside Al Mumtaz Hospital, Malir. ${clinic.doctor.name}. Open daily 11 AM to 11 PM. WhatsApp ${clinic.phoneDisplay}.`;
  return {
    title,
    description,
    alternates: { canonical: serviceUrl(s) },
    openGraph: {
      type: "website", url: serviceUrl(s), siteName: clinic.name, locale: "en_PK",
      title: `${title} | ${clinic.name}`, description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: clinic.name }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${clinic.name}`, description, images: ["/og.jpg"] },
  };
}

export default async function ServicePage({ params }: Props) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const faqs = serviceFaqs(s);
  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson(serviceGraph(s, faqs)) }} />
      <Header />

      <main id="main">
        <section className="svc-hero">
          <div className="wrap">
            <nav aria-label="Breadcrumb" className="crumbs">
              <ol>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/#services">Services</Link></li>
                <li aria-current="page">{s.name}</li>
              </ol>
            </nav>
            <div className="svc-hero-in">
              <span className="svc-hero-ic"><ServiceIcon name={s.icon} /></span>
              <div>
                <h1>{s.heading} in Malir, Karachi</h1>
                <p className="svc-roman" lang="ur-Latn">{s.roman}</p>
              </div>
            </div>
            <p className="lead">{s.summary}</p>
            <div className="cta-row">
              <WaButton label={`Ask about ${s.name}`} service={s.name} className="btn-lg" />
              <a className="btn btn-ghost btn-lg" href={telLink}><PhoneIcon /> Call {clinic.phoneDisplay}</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap svc-body">
            <div>
              <h2>What to expect at your visit</h2>
              <ol className="steps">
                <li><strong>Book on WhatsApp.</strong> Send your name and a short note about your problem to {clinic.phoneDisplay}. The clinic replies with an available time.</li>
                <li><strong>Assessment.</strong> {clinic.doctor.name} asks about your symptoms and history and checks how you move.</li>
                <li><strong>Your plan.</strong> The physiotherapist explains a treatment plan suited to you. The number of sessions depends on your condition.</li>
                <li><strong>Home advice.</strong> You may be given exercises and advice to continue at home between sessions.</li>
              </ol>
              <p className="muted">Bring any previous reports, X-rays, MRI scans or prescriptions you have.</p>
            </div>
            <aside className="svc-card" aria-label="Clinic details">
              <p className="kicker">Where and when</p>
              <ul className="info">
                <li><PinIcon /><div><strong>{clinic.address.line1}</strong><p>{clinic.address.street}, {clinic.address.area}, {clinic.address.city}</p></div></li>
                <li><ClockIcon /><div><strong>{clinic.hours.label}</strong><p>Monday to Sunday</p></div></li>
                <li><UserIcon /><div><strong>{clinic.doctor.name}</strong><p>{clinic.doctor.title}</p></div></li>
              </ul>
              <a className="btn btn-outline" href={mapsLink} target="_blank" rel="noopener"><PinIcon /> Get directions</a>
            </aside>
          </div>
        </section>

        <section className="section section-mint">
          <div className="wrap faq-wrap">
            <h2>Questions about {s.name.toLowerCase().startsWith("erb") ? s.name : s.name.toLowerCase()}</h2>
            <FaqList faqs={faqs} />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2>Other services</h2>
            <ul className="svc-links">
              {others.map((o) => (
                <li key={o.slug}><Link href={serviceUrl(o)}>{o.name}</Link></li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
