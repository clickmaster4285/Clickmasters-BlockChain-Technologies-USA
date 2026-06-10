# ClickMaster Mobile — Migration Guide & Progress

## Migration: TanStack Start (Vite/Bun) → Next.js 16 App Router

**Status: ✅ COMPLETED** — All 13 steps done. Build passes. 4 routes compile as static pages.

---

## Tech Stack

| Layer | Before | After |
|---|---|---|
| Framework | TanStack Start (SSR) | Next.js 16 (App Router) |
| Build | Vite 7 + Nitro (Cloudflare) | Next.js + Turbopack |
| Routing | TanStack Router (file-based `app/routes/`) | Next.js App Router (`app/` pages) |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` | Tailwind CSS v4 + `@tailwindcss/postcss` |
| UI | shadcn/ui (46) + 24 landing components | Same (unchanged) |
| Animations | Framer Motion + Lenis | Same (unchanged) |
| Data | React Query | React Query (unchanged) |
| Backend | Supabase + Resend API route | **Removed** (user request) |
| Package manager | Bun → npm | npm |

---

## What Was Done (Summary)

### 1. Dependencies Swapped
- Installed: `next@16.2.7`, `@tailwindcss/postcss`
- Removed: `vite`, `@vitejs/plugin-react`, `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `@lovable.dev/vite-tanstack-config`, `vite-tsconfig-paths`, `@tailwindcss/vite`, `nitro`, `@supabase/supabase-js`
- Scripts updated: `dev` → `next dev`, `build` → `next build`, `start` → `next start`, `lint` → `next lint`

### 2. Config Files Created/Updated
- **`next.config.mjs`** — Server mode, `images: { unoptimized: true }`
- **`postcss.config.mjs`** — `@tailwindcss/postcss` plugin
- **`tsconfig.json`** — `types: ["next"]`, `plugins: [{ "name": "next" }]`, `esModuleInterop: true`, `allowJs: true`, `incremental: true`, `paths: { "@/*": ["./*"] }`

### 3. Root Layout (`app/layout.tsx`)
- Replaced TanStack `__root.tsx` with Next.js root layout
- `export const metadata` with title, description, OG/Twitter cards
- Google Fonts via `<link>` tags
- `Providers` (QueryClientProvider) + `SmoothScroll` + `{children}`
- Imports `app/styles.css`

### 4. Pages Created
- **`app/page.tsx`** — Home page with all landing components (CinematicEntry → WhatsAppFAB)
- **`app/about/page.tsx`** — About page, `next/link` instead of TanStack `Link`
- **`app/contact/page.tsx`** — Contact page, `'use client'`, form with `useState`
- **`app/contact/layout.tsx`** — Separate metadata export (client components can't export metadata)
- **`app/error.tsx`** — `'use client'` error boundary
- **`app/not-found.tsx`** — 404 page with `next/link`

### 5. Providers (`app/providers.tsx`)
- `'use client'` wrapper providing `QueryClientProvider` from `@tanstack/react-query`

### 6. Asset Migration (10 imports across 6 files)
All `.asset.json` sidecar imports replaced with direct URL strings:
- `CinematicEntry.tsx` — `"/media/intro.mp4"`
- `Hero.tsx` — `"/media/hero-bg.mp4"`, `"/media/cta-bg.png"` (5 occurrences)
- `FinalCTA.tsx` — `"/media/cta.mp4"`, `"/media/cta-bg.png"`
- `Services.tsx` — `"/media/services-bg.jpeg"`
- `Portfolio.tsx` — `"/media/portfolio-bg.jpeg"`
- `Testimonials.tsx` — `"/media/testimonials-bg.jpg"`

### 7. `'use client'` Directives Added (17 files)
`BlockchainNetwork.tsx`, `CinematicEntry.tsx`, `Counter.tsx`, `CursorGlow.tsx`, `Dominate.tsx`, `Hero.tsx`, `MagneticButton.tsx`, `Navbar.tsx`, `Process.tsx`, `Reveal.tsx`, `ScrollProgress.tsx`, `Services.tsx`, `SmoothScroll.tsx`, `TechStack.tsx`, `TrustedMarquee.tsx`, `WhatsAppFAB.tsx`, `VideoWithFallback.tsx`

### 8. `components.json` Updated
- `rsc: true` (was `false`)
- `css: "app/styles.css"` (was `src/styles.css`)

### 9. `.gitignore` Updated
- Added: `.next`, `next-env.d.ts`
- Removed: `.output`, `.vinxi`, `.tanstack/**`, `.nitro`, `.wrangler/`, `.dev.vars`

### 10. Old Files Deleted
- `vite.config.ts`, `app/router.tsx`, `app/routeTree.gen.ts`, `app/server.ts`, `app/start.ts`
- `app/routes/` (entire directory)
- `app/lib/config.server.ts`, `app/lib/error-capture.ts`, `app/lib/error-page.ts`, `app/lib/lovable-error-reporting.ts`
- `app/lib/api/` (entire directory)
- `lib/error-capture.ts`, `lib/error-page.ts`

---

## Build Output

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
└ ○ /contact
○  (Static)  prerendered as static content
```

All 4 routes compile as static pages. No errors.

---

## Key Decisions & Gotchas

1. **No `src/` directory** — Project uses flat structure; path alias set to `@/* → ./*`
2. **Metadata split** — `app/contact/page.tsx` has `'use client'` so metadata moved to `app/contact/layout.tsx`
3. **`.asset.json` files** — Lovable-specific sidecars that don't exist on disk; actual media in `public/media/`
4. **React Query preserved** — Wrapped in `app/providers.tsx` as `'use client'` component
5. **No style or logic changes** — All 46 shadcn/ui components and 24 landing components untouched

---

## Post-Migration Enhancements (Future, Not Done)

- Set `metadataBase` in root layout to fix OG image URL warning
- Optimize images with Next.js `<Image>` component
- Optimize fonts with `next/font`
- Add per-page `generateMetadata()` for dynamic SEO
- Add `loading.tsx` files for loading states
- Adopt SSR/SSG per page (move data fetching to server components)
