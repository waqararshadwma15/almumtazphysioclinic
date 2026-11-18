"use client";

import { useEffect } from "react";

/**
 * Small, dependency-free motion layer (~1 KB):
 * - fades/slides `.reveal` elements in as they scroll into view
 * - counts `[data-count]` numbers up once visible
 * - marks the header as "scrolled" for its compact style
 * Everything is visible without JavaScript, and with prefers-reduced-motion
 * the final state is shown at once.
 */
export default function Motion({ locale = "en-PK" }: { locale?: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fmt = new Intl.NumberFormat(locale);

    const header = document.querySelector<HTMLElement>(".top");
    const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const countUp = (el: HTMLElement) => {
      const end = Number(el.dataset.count || 0);
      if (reduce) { el.textContent = fmt.format(end); return; }
      const dur = 1400;
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt.format(Math.round(end * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const targets = document.querySelectorAll<HTMLElement>(".reveal, [data-count]");
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach((el) => { el.classList.add("in"); if (el.dataset.count) countUp(el); });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("in");
          if (el.dataset.count) countUp(el);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    root.classList.add("motion-on");

    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [locale]);

  return null;
}
