import Image from "next/image";
import Urdu from "@/components/Urdu";
import {
  ServiceIcon, WhatsAppIcon, PinIcon, ClockIcon, PhoneIcon, MailIcon,
  HospitalIcon, UserIcon, FamilyIcon, FacebookIcon,
} from "@/components/Icons";
import { clinic, services, waLink, telLink, mapsLink, mapsEmbed, SITE_URL } from "@/lib/site";

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

function WaButton({ label = "Book on WhatsApp", service, className = "" }: { label?: string; service?: string; className?: string }) {
  return (
    <a className={`btn btn-wa ${className}`} href={waLink(service)} target="_blank" rel="noopener">
      <WhatsAppIcon /> {label}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a href="#main" className="skip">Skip to content</a>

      <header className="top">
        <div className="wrap top-in">
          <a href="#" className="brand">
            <Image src="/logo.svg" alt="" width={36} height={43} priority unoptimized />
            <span className="brand-txt">
              <strong>Al Mumtaz</strong>
              <span>Physiotherapy Clinic</span>
            </span>
          </a>
          <nav aria-label="Main" className="nav">
            <a href="#services">Services</a>
            <a href="#doctor">Doctor</a>
            <a href="#location">Location</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="btn btn-wa btn-sm" href={waLink()} target="_blank" rel="noopener" aria-label="Book on WhatsApp">
            <WhatsAppIcon size={18} /> <span>Book</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero">
          <div className="wrap hero-in">
            <div className="hero-copy">
              <p className="eyebrow"><HospitalIcon /> Inside Al Mumtaz Hospital, Malir</p>
              <h1>Physiotherapy &amp; Rehabilitation in Malir, Karachi</h1>
              <Urdu k="centre" height={46} className="hero-ur" />
              <p className="lead">
                {clinic.doctor.name}, {clinic.doctor.title}. Neck, back, knee and shoulder pain, sports injuries,
                stroke rehabilitation and children&apos;s physiotherapy, open every day.
              </p>
              <div className="cta-row">
                <WaButton className="btn-lg" />
                <a className="btn btn-ghost btn-lg" href={telLink}><PhoneIcon /> Call {clinic.phoneDisplay}</a>
              </div>
              <ul className="hero-facts">
                <li><ClockIcon /> Daily 11 AM – 11 PM</li>
                <li><PinIcon /> Darakhshan Society, Malir</li>
              </ul>
            </div>
            <div className="hero-media">
              <Image
                src="/hero-treatment.jpg"
                alt="Physiotherapist supporting a patient's knee during treatment"
                width={1500} height={656} priority
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
          </div>
          <svg className="hero-wave" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40 C120 0 260 0 400 24 L400 40Z" /></svg>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="wrap">
            <div className="sec-head">
              <p className="kicker">What we treat</p>
              <h2>Our services</h2>
              <Urdu k="treat" height={34} className="sec-ur" />
              <p className="muted">Tap any service to ask about it on WhatsApp.</p>
            </div>
            <ul className="grid-services">
              {services.map((s) => (
                <li key={s.name}>
                  <a className="svc" href={waLink(s.name)} target="_blank" rel="noopener">
                    <span className="svc-ic"><ServiceIcon name={s.icon} /></span>
                    <span className="svc-txt">
                      <strong>{s.name}</strong>
                      <span>{s.roman}</span>
                    </span>
                    <span className="svc-go" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DOCTOR + WHY US */}
        <section id="doctor" className="section section-mint">
          <div className="wrap doc-grid">
            <div className="doc-card">
              <div className="doc-avatar" aria-hidden="true">AK</div>
              <p className="kicker">Your physiotherapist</p>
              <h2 className="doc-name">{clinic.doctor.name}</h2>
              <p className="doc-title">{clinic.doctor.title}</p>
              <p className="muted">{clinic.name}, Al Mumtaz Hospital</p>
              <WaButton label="Book with Dr. Arshad" />
            </div>
            <div>
              <p className="kicker">Why patients choose us</p>
              <h2>Care that is easy to reach</h2>
              <ul className="why">
                <li><span className="why-ic"><HospitalIcon /></span><div><strong>Inside a hospital</strong><p>Located within Al Mumtaz Hospital, Darakhshan Society, Malir.</p></div></li>
                <li><span className="why-ic"><ClockIcon /></span><div><strong>Open every day, 11 AM – 11 PM</strong><p>Daytime, evening or after work, seven days a week.</p></div></li>
                <li><span className="why-ic"><UserIcon /></span><div><strong>Consultant Physiotherapist</strong><p>Your sessions are with {clinic.doctor.name}.</p></div></li>
                <li><span className="why-ic"><FamilyIcon /></span><div><strong>Children to adults</strong><p>From sports injuries and joint pain to stroke rehabilitation and CP in children.</p></div></li>
                <li><span className="why-ic why-wa"><WhatsAppIcon /></span><div><strong>Book on WhatsApp</strong><p>Send a message and we will confirm your appointment time.</p></div></li>
              </ul>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" className="section">
          <div className="wrap loc-grid">
            <div>
              <p className="kicker">Find us</p>
              <h2>Location &amp; timings</h2>
              <Urdu k="location" height={30} className="sec-ur" />
              <ul className="info">
                <li><PinIcon /><div><strong>{clinic.address.line1}</strong><p>{clinic.address.street}, {clinic.address.area}, {clinic.address.city}</p></div></li>
                <li><ClockIcon /><div><strong>{clinic.hours.label}</strong><p>Monday to Sunday</p><Urdu k="hours" height={26} className="info-ur" /></div></li>
              </ul>
              <a className="btn btn-outline" href={mapsLink} target="_blank" rel="noopener"><PinIcon /> Get directions</a>
            </div>
            <div className="map">
              <iframe
                title={`Map: ${clinic.name}, Al Mumtaz Hospital, Malir`}
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section contact">
          <div className="wrap contact-in">
            <h2>Book your appointment</h2>
            <Urdu k="book" height={40} className="contact-ur" />
            <p>Message us on WhatsApp with your name and the problem you need help with. We will reply with an available time.</p>
            <div className="cta-row center">
              <WaButton label={`WhatsApp ${clinic.phoneDisplay}`} className="btn-lg" />
              <a className="btn btn-light btn-lg" href={telLink}><PhoneIcon /> Call now</a>
            </div>
            <ul className="contact-list">
              <li><MailIcon /> <a href={`mailto:${clinic.email}`}>{clinic.email}</a></li>
              <li><FacebookIcon /> <a href={clinic.facebook} target="_blank" rel="noopener">facebook.com/almumtazphysioclinic</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <div className="foot-brand">
            <Image src="/logo.svg" alt="" width={30} height={36} unoptimized />
            <div>
              <strong>{clinic.name}</strong>
              <p>{clinic.tagline} · {clinic.address.line1}, {clinic.address.area}, {clinic.address.city}</p>
            </div>
          </div>
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
