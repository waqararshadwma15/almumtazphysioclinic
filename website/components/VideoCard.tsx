"use client";

import { useRef, useState } from "react";
import { PlayIcon } from "@/components/Icons";

/**
 * A reel that costs nothing until it is tapped: only the small poster (~20-35 KB)
 * loads with the page. Tapping swaps in the video (≈0.9 MB, 540x960) and plays it
 * with sound, since the user asked for it. Playing one reel pauses the others.
 */
export default function VideoCard({ id, title, playLabel }: { id: string; title: string; playLabel: string }) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const poster = `/videos/${id}.webp`;

  const onPlay = () => {
    document.querySelectorAll<HTMLVideoElement>(".video-card video").forEach((v) => {
      if (v !== ref.current) v.pause();
    });
  };

  return (
    <figure className="video-card">
      <div className="video-frame">
        {on ? (
          <video ref={ref} src={`/videos/${id}.mp4`} poster={poster} controls autoPlay playsInline preload="metadata" onPlay={onPlay}>
          </video>
        ) : (
          <button type="button" className="video-poster" onClick={() => setOn(true)} aria-label={`${playLabel}: ${title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={poster} alt="" width={540} height={960} loading="lazy" decoding="async" />
            <span className="video-play"><PlayIcon /></span>
          </button>
        )}
      </div>
      <figcaption>{title}</figcaption>
    </figure>
  );
}
