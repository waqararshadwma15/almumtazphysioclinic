import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon, PhoneIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import { dict } from "@/lib/i18n";
import { clinic, services, serviceUrl, waLink, telLink } from "@/lib/site";

export function WaButton({ label = "Book on WhatsApp", service, className = "" }: { label?: string; service?: string; className?: string }) {
  return (
    <a className={`btn btn-wa ${className}`} href={waLink(service)} target="_blank" rel="noopener">
      <WhatsAppIcon /> {label}
    </a>
  );
}

export function Header() {
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <header className="top">
        <div className="wrap top-in">
          <Link href="/" className="brand">
            <Image src="/logo.svg" alt="" width={36} height={43} priority unoptimized />
            <span className="brand-txt">
              <strong>Al Mumtaz</strong>
              <span>Physiotherapy Clinic</span>
            </span>
          </Link>
          <nav aria-label="Main" className="nav">
            <Link href="/#services">Services</Link>
            <Link href="/#doctor">Doctor</Link>
            <Link href="/#location">Location</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <ThemeToggle labels={dict.en.theme} />
          <a className="lang-switch" href="/ur" hrefLang="ur" lang="ur" aria-label="اردو میں دیکھیں (View in Urdu)">اردو</a>
          <a className="btn btn-wa btn-sm" href={waLink()} target="_blank" rel="noopener" aria-label="Book on WhatsApp">
            <WhatsAppIcon size={18} /> <span>Book</span>
          </a>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <>
      <footer className="foot">
        <div className="wrap foot-in">
          <div className="foot-brand">
            <Image src="/logo.svg" alt="" width={30} height={36} unoptimized />
            <div>
              <strong>{clinic.name}</strong>
              <p>{clinic.tagline} · {clinic.address.line1}, {clinic.address.street}, {clinic.address.area}, {clinic.address.city}</p>
              <p>
                <a href={telLink}>{clinic.phoneDisplay}</a> · {clinic.hours.label}
              </p>
            </div>
          </div>
          <nav aria-label="Services" className="foot-svc">
            <p className="foot-h">Physiotherapy services in Malir, Karachi</p>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={serviceUrl(s)}>{s.name}</Link></li>
              ))}
            </ul>
          </nav>
          <p className="foot-note">
            Information on this website is general and is not a diagnosis. Please consult the physiotherapist for advice about your condition.
          </p>
          <p className="foot-copy">© {new Date().getFullYear()} {clinic.name}</p>
        </div>
      </footer>

      {/* Mobile sticky booking bar */}
      <div className="sticky-bar">
        <a className="btn btn-wa" href={waLink()} target="_blank" rel="noopener"><WhatsAppIcon /> WhatsApp</a>
        <a className="btn btn-call" href={telLink}><PhoneIcon /> Call</a>
      </div>
    </>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string; roman?: string }[] }) {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <details key={f.q}>
          <summary><h3>{f.q}</h3></summary>
          <p>{f.a}</p>
          {f.roman && <p className="faq-roman" lang="ur-Latn">{f.roman}</p>}
        </details>
      ))}
    </div>
  );
}
