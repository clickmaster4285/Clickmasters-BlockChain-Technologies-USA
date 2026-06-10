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

---

## Chrome & Amber Color System Overhaul

**Status: ✅ COMPLETED** — All 19 landing components + BlockchainNetwork updated. Build passes. Zero inline `style={{}}` color overrides remain.

### Color Palette (defined in `app/styles.css`)

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#060608` | Page background |
| `--bg-surface` | `#0D0D12` | Section backgrounds (TrustedMarquee, Comparison, FAQ) |
| `--bg-elevated` | `#141420` | Section backgrounds (Services, TechStack, Process, Dominate, Awards, Footer) |
| `--silver-dim` | `#475569` | Muted text |
| `--silver-mid` | `#64748B` | Nav links at rest |
| `--silver-base` | `#94A3B8` | Secondary text |
| `--silver-light` | `#CBD5E1` | Hover states, pill text |
| `--silver-bright` | `#E2E8F0` | Tech item text |
| `--amber-dim` | `#92400E` | CTA banner background |
| `--amber-base` | `#F59E0B` | CTAs, stat numbers, eyebrows, icons |
| `--amber-light` | `#FCD34D` | Gradient endpoints, hover accents |
| `--amber-glow` | `rgba(245,158,11,0.15)` | Icon backgrounds, card hover glow |
| `--amber-border` | `rgba(245,158,11,0.25)` | Borders on hover |
| `--text-primary` | `#F8FAFC` | Headlines, hero text |
| `--text-secondary` | `#94A3B8` | Secondary text |
| `--text-muted` | `#475569` | Muted text |

### @theme inline Mapping

All custom colors mapped in `@theme inline` block so Tailwind generates utility classes:
- `bg-bg-base`, `bg-bg-surface`, `bg-bg-elevated`, `bg-bg-overlay`
- `text-silver-dim`, `text-silver-mid`, `text-silver-base`, `text-silver-light`, `text-silver-bright`
- `bg-silver-dim`, `bg-silver-base`, etc.
- `text-amber-dim`, `text-amber-base`, `text-amber-light`
- `bg-amber-base`, `bg-amber-glow`, `bg-amber-border`
- `border-amber-border`, `border-border-amber`
- `text-text-primary`, `text-text-secondary`, `text-text-muted`
- `bg-amber-glow`, `text-amber-base`, etc.

### What Changed (Per Component)

1. **Navbar.tsx** — Removed all `style={{}}` inline styles. Uses `bg-bg-base/85`, `text-amber-base`, `text-silver-mid`, `hover:text-silver-light`, `bg-amber-glow`
2. **Hero.tsx** — `bg-bg-base`, `bg-bg-elevated`, `text-amber-base` for stat highlights, `text-amber-light` for TrendingUp icon, `bg-amber-glow` for radial glow, removed cyan/violet rotating text gradient (now `text-amber-base`)
3. **TrustedMarquee.tsx** — `bg-bg-surface` (was `#F5F0E8`)
4. **Services.tsx** — `bg-bg-elevated` (was `#0D1117`), `text-amber-base` (was `#00E5FF`)
5. **Dominate.tsx** — `bg-bg-elevated` (was `#050B18`), `text-gradient` for stat numbers (was inline blue→cyan gradient), `bg-linear-to-r from-amber-base to-silver-light` for bottom border, `from-amber-base to-amber-light` for CTA button, `border-amber-border bg-amber-glow` for tech pills (was blue)
6. **Portfolio.tsx** — `bg-bg-base` (was `#05050A`), `text-amber-base` for "Selected work" label and metric values (was `#00E5FF`)
7. **Process.tsx** — `bg-bg-elevated` (was `#050B18`→`#020810` gradient), `bg-amber-base` for timeline dots (was `#06B6D4`), `bg-amber-glow` for icon boxes, `from-amber-base via-amber-light to-silver-light` for progress spine (was blue→violet→cyan)
8. **Comparison.tsx** — `bg-bg-surface` (was `#F5F0E8`)
9. **Audience.tsx** — `bg-bg-base` (was `#05050A`), `text-amber-base bg-amber-glow` for icons (was `#00E5FF`)
10. **Testimonials.tsx** — `bg-bg-surface` (was `#0A0A14`), amber/silver gradients for avatar circles (was blue/violet/cyan), `fill-amber-base text-amber-base` for stars, `text-amber-base` for category labels
11. **TechStack.tsx** — `bg-bg-elevated` (was `#050B18`), `text-amber-base` for header/ShieldCheck, amber/silver accents for category labels (was blue/violet/cyan/pink), `border-amber-border bg-amber-glow` for hover states
12. **Awards.tsx** — `bg-bg-elevated` (was `#0D1117`), amber/silver/green gradients (was blue/violet), `text-amber-base` for header
13. **FAQ.tsx** — `bg-bg-surface` (was `#F5F0E8`)
14. **FinalCTA.tsx** — `from-amber-dim via-amber-base to-amber-light` gradient background (was `#0052FF`→`#7C3AED` blue→violet), `text-amber-base` for email button
15. **Footer.tsx** — `bg-bg-elevated` (was `#111827`), `from-transparent via-amber-base to-transparent` top border gradient (was blue→violet)
16. **ScrollProgress.tsx** — `bg-linear-amber` (was `#0052FF`→`#7C3AED`→`#10B981`)
17. **CursorGlow.tsx** — `rgba(245,158,11,0.35)` / `rgba(245,158,11,0.08)` (was `rgba(0,82,255,0.35)` / `rgba(124,58,237,0.15)`)
18. **WhatsAppFAB.tsx** — `ring-bg-base` (was `#050B18`), `bg-bg-elevated` for tooltip
19. **BlockchainNetwork.tsx** — Canvas draws with `rgba(245,158,11,...)` / `rgba(203,213,225,...)` (was `rgba(0,82,255,...)` / `rgba(124,58,237,...)`)

### Colors Eliminated
- `#2563EB` (electric blue) — **gone**
- `#06B6D4` (cyan) — **gone**
- `#7C3AED` (violet) — **gone**
- `#00E5FF` (bright cyan) — **gone**
- `#050B18` (navy) — **gone**, replaced with `bg-bg-elevated`
- `#05050A` (near-black) — **gone**, replaced with `bg-bg-base`
- `#0D1117` (dark gray) — **gone**, replaced with `bg-bg-elevated`
- `#0A0A14` (dark) — **gone**, replaced with `bg-bg-surface`
- `#F5F0E8` (light cream) — **gone**, replaced with `bg-bg-surface`
- `#111827` (gray) — **gone**, replaced with `bg-bg-elevated`
- `#EC4899` (pink) — **gone** (TechStack Cloud category)
- `#93C5FD` (light blue) — **gone**

### Preserved Colors
- `#F59E0B` / `#FCD34D` / `#92400E` — **amber scale** (now the sole accent)
- `#94A3B8` / `#CBD5E1` / `#E2E8F0` / `#64748B` / `#475569` — **silver scale**
- `#F8FAFC` — **white text**
- `#060608` — **black text on amber**
- `#10B981` — **success green** (kept)
- `#EF4444` — **danger red** (kept)
- `#25D366` — **WhatsApp green** (kept)

### Approach
- **No inline `style={{}}` for colors** — all colors applied via Tailwind utility classes
- **No layout, font, component structure, or animation changes** — only colors
- **User's explicit instruction**: "use colors from global css and minimum the hard coded color" and "i want it should be text-silver-dim simple"

---

## Post-Migration Enhancements (Future, Not Done)

- Set `metadataBase` in root layout to fix OG image URL warning
- Optimize images with Next.js `<Image>` component
- Optimize fonts with `next/font`
- Add per-page `generateMetadata()` for dynamic SEO
- Add `loading.tsx` files for loading states
- Adopt SSR/SSG per page (move data fetching to server components)
