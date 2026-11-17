# Al Mumtaz Physiotherapy Clinic

Digital marketing and website files for **Al Mumtaz Physiotherapy Clinic** (Physiotherapy & Rehabilitation), inside Al Mumtaz Hospital, Malir, Karachi.

> All medical content must be reviewed by the clinic's physiotherapist before it is published. Do not add qualifications, testimonials or treatment outcomes that the clinic has not provided.

## Folder layout

| Folder | What is in it |
|---|---|
| `website/` | One-page Next.js site (mobile first, English + Urdu). Clinic details live in `website/lib/site.ts`. See `website/README.md`. |
| `branding/` | Logo (`clinic-logo.svg`), profile picture, Facebook cover, intro post, poster drafts. Editable HTML sources and images in `branding/source/`. |
| `content/` | First-month social media content calendar (`first-month-content-calendar.xlsx`). |
| `reports/` | Project summary PDF (`al-mumtaz-project-summary-2026-11-17.pdf`) and its HTML source. |
| `videos/` | Faceless reels (1080x1920 MP4), `scripts-and-captions.md`, and the build sources in `videos/source/`. |

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
4. When a domain is bought, add it under **Settings > Domains**, then submit `https://<domain>/sitemap.xml` in Google Search Console.

Every push to `main` redeploys the site automatically.

## Rebuild the videos

```bash
cd videos/source
node build.js            # scripts.json -> HTML scenes
node render.js <id> 30   # renders one video with Playwright + ffmpeg
```

## Never commit

Passwords, access tokens, `.env` files, or patient information (names, phone numbers, medical details). The `.gitignore` blocks `.env*` files.
