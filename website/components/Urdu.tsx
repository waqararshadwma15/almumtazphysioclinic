import data from "@/app/urdu.json";

type Key = keyof typeof data;

/**
 * Urdu phrases in Jameel Noori Nastaleeq, pre-shaped into SVG outlines
 * (the full font is 10 MB, far too heavy for a fast mobile site).
 * The real Urdu text stays in the page for screen readers and search engines.
 * To change a phrase: edit tools/phrases.json and re-run tools/urdu_svg.py.
 */
export default function Urdu({ k, height = 34, className }: { k: Key; height?: number; className?: string }) {
  const p = data[k];
  const [x, y, w, h] = p.vb;
  return (
    <span className={`urdu ${className ?? ""}`} lang="ur" dir="rtl">
      <svg
        viewBox={`${x} ${y} ${w} ${h}`}
        height={height}
        width={Math.round((height * w) / h)}
        aria-hidden="true"
        focusable="false"
      >
        <path d={p.d} fill="currentColor" />
      </svg>
      <span className="sr-only">{p.text}</span>
    </span>
  );
}
