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
- Local business schema (JSON-LD, `MedicalClinic` + `Physiotherapy`) is in `app/page.tsx`.
- Urdu text uses Jameel Noori Nastaleeq, pre-shaped into SVG (`app/urdu.json`) because the font file is 10 MB.
  To change Urdu text: edit `tools/phrases.json`, then
  `pip install fonttools uharfbuzz && python3 tools/urdu_svg.py "<path to Jameel Noori Nastaleeq Regular.ttf>" tools/phrases.json app/urdu.json`
- `tools/make-icons-og.js` regenerates the app icons and `public/og.jpg` share image (needs Playwright).

## Waiting on the clinic (do not invent)
- Dr. Arshad Khan's photo (with consent) to replace the "AK" initials, and his qualifications / experience if he wants them shown.
- Real clinic photos to replace `public/hero-treatment.jpg` (currently an illustrative image, not the clinic).
- Roman Urdu service names under each service: to be checked by Dr. Arshad.
- Fees: not shown anywhere. Add only if the clinic wants them public.
- Map pin: Google Maps only lists the building as "Al Mumtaz Medical Complex". Once the clinic's own Google Business Profile exists, update `mapsQuery` in `lib/site.ts`.
- Domain name.
