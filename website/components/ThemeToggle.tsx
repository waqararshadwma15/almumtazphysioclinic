"use client";

import { useEffect, useState } from "react";

/**
 * Light / dark switch. The first visit follows the phone or computer setting;
 * a tap is remembered in localStorage. The theme is applied before the page
 * paints by the small script in app/layout.tsx, so there is no flash.
 */
export default function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = () => {
    const next = !(document.documentElement.dataset.theme === "dark");
    const theme = next ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next ? "#08181E" : "#0A2A35");
    try { localStorage.setItem("theme", theme); } catch {}
    setDark(next);
  };

  const label = dark ? labels.toLight : labels.toDark;
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label} aria-pressed={dark ?? undefined}>
      {/* Both icons are rendered; CSS shows the right one from the start, before React loads. */}
      <svg className="ic-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
      </svg>
      <svg className="ic-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
