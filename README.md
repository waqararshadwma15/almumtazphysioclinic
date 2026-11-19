# Al Mumtaz Physiotherapy Clinic

Digital marketing and website files for **Al Mumtaz Physiotherapy Clinic** (Physiotherapy & Rehabilitation), inside Al Mumtaz Hospital, Malir, Karachi.

> All medical content must be reviewed by the clinic's physiotherapist before it is published. Do not add qualifications, testimonials or treatment outcomes that the clinic has not provided.

## Folder layout

| Folder | What is in it |
|---|---|
| `website/` | Next.js site: animated English homepage (`/`), full Urdu page (`/ur`, Jameel Noori Nastaleeq), 12 service pages (`/services/...`), FAQ, schema, sitemap and `/llms.txt`. Clinic details live in `website/lib/site.ts`, page copy in `website/lib/i18n.ts`. See `website/README.md`. |
| `branding/` | Logo (`clinic-logo.svg`), profile picture, Facebook cover, intro post, poster drafts (all showing Daily 11 AM-9 PM). Dated screenshots of the live Facebook, Instagram and TikTok profiles. Editable HTML sources and images in `branding/source/`. |
| `content/` | First-month social media content calendar (`first-month-content-calendar.xlsx`). |
| `reports/` | Project summary PDF (`al-mumtaz-project-summary-2026-11-17.pdf`) and its HTML source. |
| `videos/` | Faceless reels (1080x1920 MP4, end cards show 11 AM-9 PM), `scripts-and-captions.md`, and the build sources in `videos/source/`. The English reels are archived here only: they were deleted from Facebook and Instagram. |
| `videos/urdu/` | Urdu voiceover versions of the four reels (final energetic mix), `urdu-voiceover-scripts.md`, voice sample and rebuild scripts in `videos/urdu/source/`. **These are the reels live on Facebook, Instagram and TikTok.** The copies already published still show 11 PM on the end card; only their captions were changed to 9 PM. |

## Current status (19 Nov 2026)

Clinic hours: **daily 11 AM to 9 PM** (changed from 11 PM on 19 Nov 2026).

| Item | Status |
|---|---|
| Website | Live at https://almumtazphysio.vercel.app (English `/`, Urdu `/ur`, 12 service pages). Hours 11 AM-9 PM on every page, in schema and `/llms.txt`. Footer links to Facebook and Instagram. |
| Google Search Console | Site verified (`website/public/googlea15be5aff938d444.html`, keep this file), `sitemap.xml` submitted, home page indexed. |
| Facebook Page | facebook.com/almumtazphysioclinic: name, logo, new cover, hours 11:00-21:00, bio and WhatsApp button live (screenshot `branding/fb-page-hours-11-9-2026-11-19.jpg`). |
| Instagram | @almumtazphysioclinic, Business profile (screenshot `branding/instagram-profile-2026-11-18.jpg`). Bio and reel captions still say 11 PM: needs login to change to 9 PM. |
| TikTok | @almumtazphysioclinic created, bio "Daily 11AM-9PM" (screenshot `branding/tiktok-profile-2026-11-19.jpg`, taken at creation before the reels and the hours change). Switch to Business account and profile photo still to do in the app. |
| Reels | The four Urdu voiceover reels are public on Facebook, Instagram and TikTok. Captions changed to 9 PM on Facebook and TikTok; Instagram pending. English versions were deleted. |
| Still pending | Instagram login (bio, captions, name, website, address, Facebook link), Google Business Profile hours and website link, LinkedIn, real clinic photos, Dr. Arshad's photo and review of the Urdu scripts and website service text. |

## Run the website locally

Needs Node.js 20 or newer.

```bash
cd website
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production check
```

## Deploy the website on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub and click **Add New > Project**.
2. Import this repository and set **Root Directory** to `website`. Framework preset: Next.js.
3. Under **Environment Variables** add `NEXT_PUBLIC_SITE_URL` = the final address (for example `https://www.yourdomain.pk`). Deploy.
4. When a domain is bought, add it under **Settings > Domains**, add the new domain as a property in Google Search Console and submit `https://<domain>/sitemap.xml` there (the vercel.app address is already verified and its sitemap submitted).

Every push to `main` redeploys the site automatically.

## Rebuild the videos

```bash
cd videos/source
node build.js            # scripts.json -> HTML scenes
node render.js <id> 30   # renders one video with Playwright + ffmpeg
```

## Rebuild the Urdu reels

See `videos/urdu/urdu-voiceover-scripts.md` and the scripts in `videos/urdu/source/` (Piper `ur_PK-fasih` voice, ffmpeg, Playwright).

## Never commit

Passwords, access tokens, `.env` files, or patient information (names, phone numbers, medical details). The `.gitignore` blocks `.env*` files. Not kept in this repo on purpose: phone screenshots in the project's uploads folder and `website/al-mumtaz-website.zip` (a duplicate of `website/`).
