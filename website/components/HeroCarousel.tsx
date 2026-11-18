"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = { src: string; alt: string; width: number; height: number; position?: string };

/**
 * Hero picture carousel: crossfades every few seconds.
 * - Only the first picture loads with the page (it is the LCP image); the rest are
 *   added after the page has loaded, so mobile speed is unchanged.
 * - Pauses on hover, keyboard focus, touch and when the tab is hidden.
 * - Swipe on phones, arrows and dots everywhere; mirrored for Urdu (RTL).
 * - No autoplay and no fade under prefers-reduced-motion.
 */
export default function HeroCarousel({
  slides, rtl = false, labels, interval = 5000,
}: {
  slides: Slide[];
  rtl?: boolean;
  labels: { region: string; prev: string; next: string; goTo: string }; // goTo uses {n}
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false); // other slides mounted
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const touchX = useRef<number | null>(null);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const n = slides.length;

  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const mount = () => setTimeout(() => setReady(true), 1200);
    if (document.readyState === "complete") { const t = mount(); return () => clearTimeout(t); }
    window.addEventListener("load", mount, { once: true });
    return () => window.removeEventListener("load", mount);
  }, []);

  useEffect(() => {
    if (!ready || paused || reduce) return;
    const id = setInterval(() => { if (!document.hidden) setIndex((i) => (i + 1) % n); }, interval);
    return () => clearInterval(id);
  }, [ready, paused, reduce, n, interval]);

  const pauseBriefly = () => {
    setPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 8000);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; pauseBriefly(); };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    const forward = rtl ? dx > 0 : dx < 0;
    setReady(true);
    go(index + (forward ? 1 : -1));
  };

  const step = (d: number) => { setReady(true); pauseBriefly(); go(index + d); };

  return (
    <div
      className={`hero-carousel ${reduce ? "no-fade" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hc-track" aria-live={paused ? "polite" : "off"}>
        {slides.map((s, i) => (i === 0 || ready) && (
          <div
            key={s.src}
            className={`hc-slide ${i === index ? "is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${n}`}
            aria-hidden={i !== index}
          >
            <Image
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              priority={i === 0}
              sizes="(max-width: 900px) 100vw, 46vw"
              style={{ objectPosition: s.position ?? "50% 50%" }}
            />
          </div>
        ))}
      </div>

      <button type="button" className="hc-arrow hc-prev" onClick={() => step(-1)} aria-label={labels.prev}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" className="hc-arrow hc-next" onClick={() => step(1)} aria-label={labels.next}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="hc-dots">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={i === index ? "is-active" : ""}
            aria-label={labels.goTo.replace("{n}", String(i + 1))}
            aria-current={i === index ? "true" : undefined}
            onClick={() => { setReady(true); pauseBriefly(); go(i); }}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
