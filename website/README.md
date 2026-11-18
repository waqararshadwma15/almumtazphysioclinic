# Al Mumtaz Physiotherapy Clinic – website

One-page Next.js 16 site, mobile first, no client-side JavaScript of its own.
Lighthouse (local production build): mobile 96 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100
(Performance / Accessibility / Best practices / SEO).

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Deploy on Vercel
1. Push this folder to a GitHub repository (or run `npx vercel` inside it).
2. Import the repo in Vercel. Framework preset: Next.js. No settings needed.
3. In Vercel > Settings > Environment Variables, set
   `NEXT_PUBLIC_SITE_URL` = the final address, e.g. `https://www.yourdomain.pk`
   (used for canonical URL, sitemap, robots and the business schema). Redeploy.
4. Add the custom domain in Vercel > Settings > Domains when it is bought.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console, and use the
   site URL on the Facebook Page and the Google Business Profile.

## Where things are
- `lib/site.ts` – all clinic details (name, phone, WhatsApp, address, hours, services). Edit here only.
- `app/page.tsx` – the page sections. `app/globals.css` – styles and brand colours.
- `app/layout.tsx` – SEO metadata. `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
- `lib/schema.ts` – all JSON-LD (clinic, doctor, website, FAQ, service pages, breadcrumbs).
- `lib/faq.ts` – FAQ questions and answers (homepage and per service). Shown on the page and in FAQ schema.
- `app/services/[slug]/page.tsx` – one page per service (12), generated from `services` in `lib/site.ts`.
- `app/llms.txt/route.ts` – `/llms.txt` summary for AI assistants, generated from `lib/site.ts`.

## Site address (one setting)
`SITE_URL` in `lib/site.ts` drives canonical URLs, sitemap, robots, llms.txt, Open Graph and schema.
Set `NEXT_PUBLIC_SITE_URL` in Vercel (or change the fallback in `lib/site.ts`) when the final name is chosen.
- Urdu text uses Jameel Noori Nastaleeq, pre-shaped into SVG (`app/urdu.json`) because the font file is 10 MB.
  To change Urdu text: edit `tools/phrases.json`, then
  `pip install fonttools uharfbuzz && python3 tools/urdu_svg.py "<path to Jameel Noori Nastaleeq Regular.ttf>" tools/phrases.json app/urdu.json`
- `tools/make-icons-og.js` regenerates the app icons and `public/og.jpg` share image (needs Playwright).

## Urdu version and animations
- `/` is English, `/ur` is the full Urdu page (RTL, Jameel Noori Nastaleeq, loaded only on `/ur`). Both pages share `components/HomeView.tsx`; all copy is in `lib/i18n.ts`.
- hreflang alternates (`en`, `ur`, `x-default`) are set in `app/layout.tsx` and `app/ur/page.tsx`, and both URLs are in the sitemap.
- Animations live in `app/motion.css` and the tiny `components/Motion.tsx` (scroll reveal, count-up, header shadow). All motion stops under the visitor's "reduce motion" setting, and content stays visible without JavaScript.
- Lighthouse mobile (local): English 95, Urdu 93–95 performance; accessibility, best practices and SEO 100 on both.
- **Urdu font:** `app/fonts/jnn-subset.woff2` is Jameel Noori Nastaleeq cut down to only the glyphs the Urdu page uses (~70 KB instead of 10 MB).
  **Whenever Urdu text in `lib/i18n.ts` or `app/ur/page.tsx` changes, rebuild it**, or new words show in a fallback font:
  `pip install fonttools brotli uharfbuzz && python3 tools/urdu_font.py "<path to Jameel Noori Nastaleeq Regular.ttf>"`
  The font is freeware ("Free of charge for Urdu lovers") with no formal web licence; its embedding flag allows view-only embedding.

## Light / dark theme and hero carousel
- Theme: `app/theme.css` (dark colours under `[data-theme="dark"]`) and `components/ThemeToggle.tsx` (sun/moon button in the header).
  First visit follows the device setting; the visitor's choice is saved in the browser. A tiny script in `app/layout.tsx` sets the theme before the page paints, so there is no flash.
- Hero carousel: `components/HeroCarousel.tsx`, photos in `public/hero/` plus `public/hero-treatment.jpg`, list in `components/HomeView.tsx` (`heroSlides`).
  Only the first photo loads with the page; the rest load after it. Pauses on hover/touch, swipe on phones, no autoplay with "reduce motion".

## Waiting on the clinic (do not invent)
- Hero carousel photos are illustrative stock-style images, not the clinic: replace them with real clinic photos (with consent) in `public/hero/`.
- Urdu medical wording in `lib/i18n.ts` (service names, hero text): to be checked by Dr. Arshad Khan before launch.
- Service summaries (`lib/site.ts`) and FAQ answers (`lib/faq.ts`): Dr. Arshad to review the wording before launch.
- Map coordinates: set `clinic.geo` in `lib/site.ts` once the Google Business Profile pin is confirmed.
- Dr. Arshad Khan's photo (with consent) to replace the "AK" initials, and his qualifications / experience if he wants them shown.
- Real clinic photos to replace `public/hero-treatment.jpg` (currently an illustrative image, not the clinic).
- Roman Urdu service names under each service: to be checked by Dr. Arshad.
- Fees: not shown anywhere. Add only if the clinic wants them public.
- Map pin: Google Maps only lists the building as "Al Mumtaz Medical Complex". Once the clinic's own Google Business Profile exists, update `mapsQuery` in `lib/site.ts`.
- Domain name.
