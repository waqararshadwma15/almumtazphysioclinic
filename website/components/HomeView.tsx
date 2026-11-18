import Image from "next/image";
import Link from "next/link";
import Urdu from "@/components/Urdu";
import Motion from "@/components/Motion";
import ThemeToggle from "@/components/ThemeToggle";
import HeroCarousel, { type Slide } from "@/components/HeroCarousel";
import {
  ServiceIcon, WhatsAppIcon, PinIcon, ClockIcon, PhoneIcon, MailIcon,
  HospitalIcon, UserIcon, FamilyIcon, FacebookIcon, InstagramIcon,
} from "@/components/Icons";
import { FaqList } from "@/components/Chrome";
import { clinic, services, serviceUrl, telLink, mapsLink, mapsEmbed } from "@/lib/site";
import { homeFaqs } from "@/lib/faq";
import { dict, waLinkFor, type Lang } from "@/lib/i18n";

// Illustrative photos (not taken at the clinic). Replace with real clinic photos when available.
const heroSlides = (t: (typeof dict)["en"]): Slide[] => [
  { src: "/hero-treatment.jpg", alt: t.heroAlt, width: 1500, height: 656, position: "55% 50%" },
  { src: "/hero/knee.jpg", alt: t.heroAlts[0], width: 1200, height: 800, position: "50% 20%" },
  { src: "/hero/upper-back.jpg", alt: t.heroAlts[1], width: 506, height: 900, position: "50% 45%" },
  { src: "/hero/back.jpg", alt: t.heroAlts[2], width: 600, height: 900, position: "50% 40%" },
  { src: "/hero/hip.jpg", alt: t.heroAlts[3], width: 600, height: 900, position: "50% 45%" },
  { src: "/hero/arm.jpg", alt: t.heroAlts[4], width: 467, height: 900, position: "50% 55%" },
];

const whyIcons = [HospitalIcon, ClockIcon, UserIcon, FamilyIcon, WhatsAppIcon];

/** The whole home page, rendered in English (`/`) or Urdu (`/ur`). */
export default function HomeView({ lang }: { lang: Lang }) {
  const t = dict[lang] as (typeof dict)["en"];
  const ur = lang === "ur";
  const wa = (service?: string) => waLinkFor(t, service);
  const Ltr = ({ children }: { children: React.ReactNode }) => <bdi dir="ltr" className="ltr">{children}</bdi>;

  return (
    <div lang={t.lang} dir={t.dir} className={`page page-${lang}`}>
      {ur && (
        // Keep <html lang/dir> in sync for this page (the root layout is shared).
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="ur";document.documentElement.dir="rtl";` }} />
      )}
      <Motion locale={ur ? "ur-PK-u-nu-arabext" : "en-PK"} />
      <a href="#main" className="skip">{t.skip}</a>

      <header className="top">
        <div className="wrap top-in">
          <a href={ur ? "/ur" : "/"} className="brand">
            <Image src="/logo.svg" alt="" width={36} height={43} priority unoptimized />
            <span className="brand-txt">
              <strong>{t.brand1}</strong>
              <span>{t.brand2}</span>
            </span>
          </a>
          <nav aria-label={ur ? "مینو" : "Main"} className="nav">
            <a href="#services">{t.nav.services}</a>
            <a href="#doctor">{t.nav.doctor}</a>
            <a href="#location">{t.nav.location}</a>
            {!ur && <a href="#faq">FAQ</a>}
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <ThemeToggle labels={t.theme} />
          <a className="lang-switch" href={t.switchHref} hrefLang={ur ? "en" : "ur"} lang={ur ? "en" : "ur"} aria-label={t.switchAria}>
            {t.switchLabel}
          </a>
          <a className="btn btn-wa btn-sm" href={wa()} target="_blank" rel="noopener" aria-label={t.bookWa}>
            <WhatsAppIcon size={18} /> <span>{t.book}</span>
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true">
            <span className="orb orb-1" /><span className="orb orb-2" /><span className="orb orb-3" />
            <span className="hero-grid" />
          </div>
          <div className="wrap hero-in">
            <div className="hero-copy">
              <p className="eyebrow anim-up" style={{ ["--d" as string]: "0ms" }}><HospitalIcon /> {t.eyebrow}</p>
              <h1 className="hero-title">
                <span className="line"><span>{t.h1a}</span></span>{" "}
                <span className="line"><span className="hl">{t.h1b}</span></span>
              </h1>
              {!ur && <Urdu k="centre" height={46} className="hero-ur anim-up" />}
              <p className="lead anim-up" style={{ ["--d" as string]: "260ms" }}>{t.lead}</p>
              <div className="cta-row anim-up" style={{ ["--d" as string]: "380ms" }}>
                <a className="btn btn-wa btn-lg btn-pulse" href={wa()} target="_blank" rel="noopener">
                  <WhatsAppIcon /> {t.bookWa}
                </a>
                <a className="btn btn-ghost btn-lg" href={telLink}>
                  <PhoneIcon /> {t.call}{ur && <> <Ltr>{clinic.phoneDisplay}</Ltr></>}
                </a>
              </div>
              <ul className="hero-facts anim-up" style={{ ["--d" as string]: "500ms" }}>
                <li><ClockIcon /> {t.factHours}</li>
                <li><PinIcon /> {t.factArea}</li>
              </ul>
            </div>
            <div className="hero-media">
              <div className="hero-img">
                <HeroCarousel slides={heroSlides(t)} rtl={ur} labels={t.carousel} />
              </div>
              {/* Info cards sit in a strip under the photos, never on top of them. */}
              <div className="hero-badges">
                <div className="float-card" aria-hidden="true">
                  <span className="fc-ic"><ClockIcon /></span>
                  <span><strong>{t.badgeOpen}</strong><small>{t.badgeOpenSub}</small></span>
                </div>
                <div className="float-card" aria-hidden="true">
                  <span className="fc-ic fc-ic-o"><HospitalIcon /></span>
                  <span><strong>{t.badgeHosp}</strong><small>{t.badgeHospSub}</small></span>
                </div>
              </div>
            </div>
          </div>
          <svg className="hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
            <path className="w2" d="M0 50 C240 10 480 10 720 40 C960 70 1200 70 1440 30 L1440 80 L0 80Z" />
            <path d="M0 64 C260 24 520 24 760 52 C1000 78 1220 70 1440 44 L1440 80 L0 80Z" />
          </svg>
        </section>

        {/* SERVICE TICKER */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((k) => (
              <span className="ticker-group" key={k}>
                {services.map((s) => (<span key={s.name}>{t.serviceName(s.name)}<i>✦</i></span>))}
              </span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <section className="stats" aria-label={ur ? "کلینک ایک نظر میں" : "Clinic at a glance"}>
          <div className="wrap stats-in">
            {t.stats.map((s, i) => (
              <div className="stat reveal" style={{ ["--i" as string]: i }} key={s.label}>
                <span className="stat-n"><span data-count={s.n}>{new Intl.NumberFormat(ur ? "ur-PK-u-nu-arabext" : "en-PK").format(s.n)}</span>{s.suffix}</span>
                <span className="stat-l">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="section">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="kicker">{t.svcKicker}</p>
              <h2>{t.svcTitle}</h2>
              {!ur && <Urdu k="treat" height={34} className="sec-ur" />}
              <p className="muted">{t.svcNote}</p>
            </div>
            <ul className="grid-services">
              {services.map((s, i) => {
                const inner = (
                  <>
                    <span className="svc-ic"><ServiceIcon name={s.icon} /></span>
                    <span className="svc-txt">
                      <strong>{t.serviceName(s.name)}</strong>
                      <span lang={ur ? "en" : undefined} dir={ur ? "ltr" : undefined}>{t.serviceSub(s.name)}</span>
                    </span>
                    <span className="svc-go" aria-hidden="true">{ur ? "←" : "→"}</span>
                  </>
                );
                return (
                  <li key={s.slug} className="reveal" style={{ ["--i" as string]: i % 3 }}>
                    {/* English cards open the service page; Urdu cards go straight to WhatsApp (service pages are English only). */}
                    {ur
                      ? <a className="svc" href={wa(s.name)} target="_blank" rel="noopener">{inner}</a>
                      : <Link className="svc" href={serviceUrl(s)}>{inner}</Link>}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* STEPS */}
        <section className="section section-steps">
          <div className="wrap">
            <div className="sec-head reveal">
              <p className="kicker">{t.stepsKicker}</p>
              <h2>{t.stepsTitle}</h2>
            </div>
            <ol className="book-steps">
              {t.steps.map((s, i) => (
                <li key={s.t} className="step reveal" style={{ ["--i" as string]: i }}>
                  <span className="step-n">{new Intl.NumberFormat(ur ? "ur-PK-u-nu-arabext" : "en-PK").format(i + 1)}</span>
                  <h3>{s.t}</h3>
                  <p>{s.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* DOCTOR + WHY US */}
        <section id="doctor" className="section section-mint">
          <div className="wrap doc-grid">
            <div className="doc-card reveal">
              <div className="doc-avatar" aria-hidden="true"><span>{t.docAvatar}</span></div>
              <p className="kicker">{t.docKicker}</p>
              <h2 className="doc-name">{t.docName}</h2>
              <p className="doc-title">{t.docTitle}</p>
              <p className="muted">{t.docPlace}</p>
              <a className="btn btn-wa" href={wa()} target="_blank" rel="noopener"><WhatsAppIcon /> {t.docBtn}</a>
            </div>
            <div>
              <div className="reveal">
                <p className="kicker">{t.whyKicker}</p>
                <h2>{t.whyTitle}</h2>
              </div>
              <ul className="why">
                {t.why.map((w, i) => {
                  const Ic = whyIcons[i];
                  return (
                    <li key={w.t} className="reveal" style={{ ["--i" as string]: i }}>
                      <span className={`why-ic ${i === 4 ? "why-wa" : ""}`}><Ic /></span>
                      <div><strong>{w.t}</strong><p>{w.p}</p></div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" className="section">
          <div className="wrap loc-grid">
            <div className="reveal">
              <p className="kicker">{t.locKicker}</p>
              <h2>{t.locTitle}</h2>
              {!ur && <Urdu k="location" height={30} className="sec-ur" />}
              <ul className="info">
                <li><PinIcon /><div><strong>{t.addrTitle}</strong><p>{t.addrLine}</p></div></li>
                <li><ClockIcon /><div><strong>{t.hoursTitle}</strong><p>{t.hoursSub}</p>{!ur && <Urdu k="hours" height={26} className="info-ur" />}</div></li>
              </ul>
              <a className="btn btn-outline" href={mapsLink} target="_blank" rel="noopener"><PinIcon /> {t.directions}</a>
            </div>
            <div className="map reveal" style={{ ["--i" as string]: 1 }}>
              <iframe title={t.mapTitle} src={mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          </div>
        </section>

        {/* FAQ (English; the answers are not yet translated) */}
        {!ur && (
          <section id="faq" className="section section-mint">
            <div className="wrap faq-wrap">
              <div className="sec-head reveal">
                <p className="kicker">Questions</p>
                <h2>Frequently asked questions</h2>
                <p className="muted">
                  {clinic.name} is a physiotherapy and rehabilitation clinic inside Al Mumtaz Hospital, Darakhshan Society,
                  Malir, Karachi, led by {clinic.doctor.name}, {clinic.doctor.title}. It is open daily from 11 AM to 11 PM and
                  appointments are booked on WhatsApp at {clinic.phoneDisplay}.
                </p>
              </div>
              <div className="reveal"><FaqList faqs={homeFaqs} /></div>
            </div>
          </section>
        )}

        {/* CONTACT */}
        <section id="contact" className="section contact">
          <div className="contact-bg" aria-hidden="true"><span className="orb orb-1" /><span className="orb orb-2" /></div>
          <div className="wrap contact-in reveal">
            <h2>{t.contactTitle}</h2>
            {!ur && <Urdu k="book" height={40} className="contact-ur" />}
            <p>{t.contactText}</p>
            <div className="cta-row center">
              <a className="btn btn-wa btn-lg btn-pulse" href={wa()} target="_blank" rel="noopener">
                <WhatsAppIcon /> {t.contactWa}{ur && <> <Ltr>{clinic.phoneDisplay}</Ltr></>}
              </a>
              <a className="btn btn-light btn-lg" href={telLink}><PhoneIcon /> {t.callNow}</a>
            </div>
            <ul className="contact-list">
              <li><MailIcon /> <a href={`mailto:${clinic.email}`} dir="ltr">{clinic.email}</a></li>
              <li><FacebookIcon /> <a href={clinic.facebook} target="_blank" rel="noopener" dir="ltr">facebook.com/almumtazphysioclinic</a></li>
              <li><InstagramIcon /> <a href={clinic.instagram} target="_blank" rel="noopener" dir="ltr">instagram.com/almumtazphysioclinic</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <div className="foot-brand">
            <Image src="/logo.svg" alt="" width={30} height={36} unoptimized />
            <div>
              <strong>{t.footName}</strong>
              <p>{t.footLine}</p>
              <p><a href={telLink}><Ltr>{clinic.phoneDisplay}</Ltr></a> · {t.factHours}</p>
              <p className="foot-social"><a href={clinic.instagram} target="_blank" rel="noopener" dir="ltr">Instagram</a> · <a href={clinic.facebook} target="_blank" rel="noopener" dir="ltr">Facebook</a></p>
            </div>
          </div>
          {!ur && (
            <nav aria-label="Services" className="foot-svc">
              <p className="foot-h">Physiotherapy services in Malir, Karachi</p>
              <ul>
                {services.map((s) => (<li key={s.slug}><Link href={serviceUrl(s)}>{s.name}</Link></li>))}
              </ul>
            </nav>
          )}
          <p className="foot-note">{t.footNote}</p>
          <p className="foot-copy">© {new Date().getFullYear()} {t.footName} · <a href={t.switchHref} hrefLang={ur ? "en" : "ur"} lang={ur ? "en" : "ur"}>{t.switchLabel}</a></p>
        </div>
      </footer>

      {/* Desktop floating WhatsApp button */}
      <a className="fab-wa" href={wa()} target="_blank" rel="noopener" aria-label={t.bookWa}><WhatsAppIcon size={28} /></a>

      {/* Mobile sticky booking bar */}
      <div className="sticky-bar">
        <a className="btn btn-wa" href={wa()} target="_blank" rel="noopener"><WhatsAppIcon /> {t.stickyWa}</a>
        <a className="btn btn-call" href={telLink}><PhoneIcon /> {t.stickyCall}</a>
      </div>
    </div>
  );
}
