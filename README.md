# Al Mumtaz Physiotherapy Clinic

Digital marketing and website files for **Al Mumtaz Physiotherapy Clinic** (Physiotherapy & Rehabilitation), inside Al Mumtaz Hospital, Malir, Karachi.

> All medical content must be reviewed by the clinic's physiotherapist before it is published. Do not add qualifications, testimonials or treatment outcomes that the clinic has not provided.

## Folder layout

| Folder | What is in it |
|---|---|
| `website/` | Next.js site: animated English homepage (`/`), full Urdu page (`/ur`, Jameel Noori Nastaleeq), 12 service pages (`/services/...`), FAQ, schema, sitemap and `/llms.txt`. Clinic details live in `website/lib/site.ts`, page copy in `website/lib/i18n.ts`. See `website/README.md`. |
| `branding/` | Logo (`clinic-logo.svg`), profile picture, Facebook cover, intro post, poster drafts. Editable HTML sources and images in `branding/source/`. |
| `content/` | First-month social media content calendar (`first-month-content-calendar.xlsx`). |
| `reports/` | Project summary PDF (`al-mumtaz-project-summary-2026-11-17.pdf`) and its HTML source. |
| `videos/` | Faceless reels (1080x1920 MP4), `scripts-and-captions.md`, and the build sources in `videos/source/`. The English reels are archived here only: they were deleted from Facebook and Instagram. |
| `videos/urdu/` | Urdu voiceover versions of the four reels (final energetic mix), `urdu-voiceover-scripts.md`, voice sample and rebuild scripts in `videos/urdu/source/`. **These are the reels live on Facebook and Instagram.** |

## Current status (19 Nov 2026)

| Item | Status |
|---|---|
| Website | Live at https://almumtazphysio.vercel.app (English `/`, Urdu `/ur`, 12 service pages). Footer on every page links to Facebook and Instagram. |
| Google Search Console | Site verified (`website/public/googlea15be5aff938d444.html`, keep this file) and `sitemap.xml` submitted. |
| Facebook Page | facebook.com/almumtazphysioclinic: name, logo, cover, hours, bio and WhatsApp button live. |
| Instagram | @almumtazphysioclinic, Business profile (screenshot `branding/instagram-profile-2026-11-18.jpg`). |
| Reels | The four Urdu voiceover reels are published on Facebook and Instagram. English versions were deleted. |
| Still pending | LinkedIn, TikTok, Google Business Profile (map pin), real clinic photos, Dr. Arshad's photo and review of the website service text. |

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
