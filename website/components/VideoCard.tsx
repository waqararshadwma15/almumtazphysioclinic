"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/Icons";

type Item = { id: string; title: string };

/**
 * Reel thumbnails that open in a full-screen 9:16 player (native <dialog>).
 * - Only the small posters (~20-35 KB) load with the page; a video (~0.9 MB)
 *   downloads only when its thumbnail is tapped.
 * - Esc, the close button, or a tap outside the player closes it; the video
 *   stops and page scrolling is restored. Arrows / swipe move between reels.
 */
export default function VideoGallery({ items, playLabel, closeLabel, prevLabel, nextLabel }: {
  items: Item[]; playLabel: string; closeLabel: string; prevLabel: string; nextLabel: string;
}) {
  const dlg = useRef<HTMLDialogElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const touchX = useRef<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const n = items.length;

  const show = (i: number) => {
    setOpen(i);
    const d = dlg.current;
    if (d && !d.open) { d.showModal(); document.documentElement.classList.add("modal-open"); }
  };
  const close = useCallback(() => dlg.current?.close(), []);
  const step = useCallback((dir: number) => setOpen((i) => (i === null ? i : (i + dir + n) % n)), [n]);

  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const onClose = () => { vid.current?.pause(); setOpen(null); document.documentElement.classList.remove("modal-open"); };
    const onKey = (e: KeyboardEvent) => {
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => { d.removeEventListener("close", onClose); d.removeEventListener("keydown", onKey); };
  }, [step]);

  const cur = open === null ? null : items[open];

  return (
    <>
      <ul className="video-row">
        {items.map((v, i) => (
          <li key={v.id} className="reveal" style={{ ["--i" as string]: i }}>
            <figure className="video-card">
              <button type="button" className="video-frame video-poster" onClick={() => show(i)} aria-label={`${playLabel}: ${v.title}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/videos/${v.id}.webp`} alt="" width={540} height={960} loading="lazy" decoding="async" />
                <span className="video-play"><PlayIcon /></span>
              </button>
              <figcaption>{v.title}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dlg}
        className="video-modal"
        aria-label={cur?.title ?? playLabel}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) < 60) return;
          const rtl = document.documentElement.dir === "rtl";
          step((dx < 0) !== rtl ? 1 : -1);
        }}
      >
        {cur && (
          <div className="vm-body">
            <video
              key={cur.id}
              ref={vid}
              src={`/videos/${cur.id}.mp4`}
              poster={`/videos/${cur.id}.webp`}
              controls
              autoPlay
              playsInline
              preload="auto"
            />
            <p className="vm-title">{cur.title}</p>
          </div>
        )}
        <button type="button" className="vm-btn vm-close" onClick={close} aria-label={closeLabel}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <button type="button" className="vm-btn vm-prev" onClick={() => step(-1)} aria-label={prevLabel}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button type="button" className="vm-btn vm-next" onClick={() => step(1)} aria-label={nextLabel}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </dialog>
    </>
  );
}
