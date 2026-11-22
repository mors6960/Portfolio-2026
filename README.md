# Shubham Mor · Portfolio

Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript.

```bash
npm install
npm run dev     # http://localhost:3000 — the terminal lists every placeholder still to fill
npm run build
```

## Edit your content

Everything you'd change is in **`lib/content.ts`**: profile, about, experience, projects (with full case
studies), stack. Text in `[square brackets]` is a placeholder; it shows highlighted on the page until replaced.
Only write what is true: no invented metrics, clients or testimonials.

- Résumé: put `resume.pdf` in `public/` and set `resumeUrl: "/resume.pdf"`.
- Production URL: set `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, Open Graph).

## What's inside (and where the ideas came from)

| Feature | Inspired by | File |
|---|---|---|
| X-ray hero: a working app with its backend underneath (lens on hover, Backend switch on touch/keyboard, live request log) | Adham Dannaway's designer/coder split | `components/xray-demo.tsx` |
| Sticky identity column + scroll-spy nav, list dimming on hover | Brittany Chiang | `app/page.tsx`, `components/sidebar.tsx` |
| Cursor spotlight | Brittany Chiang | `components/spotlight.tsx` |
| ⌘K command menu (lazy-loaded) | Paco Coursey (cmdk) | `components/command-menu*.tsx` |
| Magnetic buttons | Dennis Snellenberg | `components/magnetic.tsx` |
| Opt-in UI sounds (Web Audio, no files) + confetti on copy email | Josh W. Comeau | `lib/prefs.ts`, `lib/confetti.ts` |
| Latest GitHub push, refreshed hourly | live-data portfolios | `components/github-activity.tsx` |
| Recruiter-first case studies: results → problem → build → architecture → hard parts | hiring-manager research | `app/work/[slug]/page.tsx` |
| Fast and accessible: Lighthouse a11y/BP/SEO 100, mobile perf 92–96 | Lee Robinson's restraint | — |
