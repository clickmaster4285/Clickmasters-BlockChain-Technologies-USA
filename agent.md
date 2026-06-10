# ClickMaster Mobile — Migration Guide & Progress

## Migration: TanStack Start (Vite/Bun) → Next.js 16 App Router

Reference: https://nextjs.org/docs/app/guides/migrating/from-vite

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

## Current State Assessment

The project is **still in its Vite/TanStack Start state**. None of the migration steps have been executed yet. The `app/routes/` directory still has TanStack route files, `vite.config.ts` is present, and all dependencies are Vite-based.

### What exists right now:
- `app/routes/__root.tsx` — TanStack root layout with `<Outlet />`, `<HeadContent />`, `<Scripts />`
- `app/routes/index.tsx` — Home page with `createFileRoute("/")`
- `app/routes/about.tsx` — About page with `createFileRoute("/about")`
- `app/routes/contact.tsx` — Contact page with `createFileRoute("/contact")`
- `app/router.tsx` — TanStack router factory
- `app/routeTree.gen.ts` — Auto-generated TanStack route tree
- `app/server.ts` — TanStack/Nitro server entry
- `app/start.ts` — TanStack start instance
- `app/lib/config.server.ts` — Server-only config (to be deleted)
- `app/lib/error-capture.ts` — Error capture (to be deleted)
- `app/lib/error-page.ts` — Error page HTML (to be deleted)
- `app/lib/lovable-error-reporting.ts` — Lovable error reporting (to be deleted)
- `app/lib/api/example.functions.ts` — TanStack server function (to be deleted)
- 10 `.asset.json` imports across routes and components (Lovable-specific, to be replaced with URL strings)
- `components.json` has `rsc: false` and `@/* → ./src/*` paths (needs update)
- `tsconfig.json` has `paths: @/* → ./src/*` and `types: ["vite/client"]` (needs update)

### What does NOT exist (no services/solutions pages):
- There are NO `routes/services.tsx` or `routes/solutions.tsx` files
- The `agent.md` from a prior session listed them but they were never created
- Only 3 routes exist: `/`, `/about`, `/contact`

---

## Migration Plan (13 Steps)

### Step 1: Dependencies
**Goal:** Swap Vite/TanStack packages for Next.js equivalents.

```bash
npm install next@16.2.7 @tailwindcss/postcss
npm uninstall vite @vitejs/plugin-react @tanstack/react-start @tanstack/react-router \
  @tanstack/router-plugin @lovable.dev/vite-tanstack-config vite-tsconfig-paths \
  @tailwindcss/vite nitro @supabase/supabase-js
```

Update `package.json` scripts:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

### Step 2: Config Files
**Goal:** Create Next.js config files, update tsconfig.

**`next.config.mjs`:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server mode (no output: 'export')
  images: { unoptimized: true },
};
export default nextConfig;
```

**`postcss.config.mjs`:**
```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**`tsconfig.json` changes:**
- `paths: { "@/*": ["./*"] }` (remove `src` prefix — no `src` directory)
- `plugins: [{ "name": "next" }]` instead of vite plugin
- `types: ["next"]` instead of `["vite/client"]`
- Add `esModuleInterop: true`, `allowJs: true`, `incremental: true`
- Update `include` to `["**/*.ts", "**/*.tsx", "next.config.mjs", ...]`

### Step 3: Root Layout (`app/layout.tsx`)
**Goal:** Convert `__root.tsx` to Next.js root layout.

Key changes:
- Remove `createRootRouteWithContext`, `HeadContent`, `Scripts`, `Outlet`
- Use `export const metadata` instead of `head: () => ({ meta: [...] })`
- Google Fonts via `<link>` in `<head>` (not CSS import)
- Wrap children in `<QueryClientProvider>` via `app/providers.tsx` (client component)
- Keep `SmoothScroll` inside providers
- Import `app/styles.css` directly (not `?url`)

Create `app/providers.tsx` as a `'use client'` wrapper for `QueryClientProvider`.

### Step 4: Home Page (`app/page.tsx`)
**Goal:** Convert `routes/index.tsx` to Next.js page.

Key changes:
- Remove `createFileRoute("/")` wrapper and `Route` export
- Remove `head()` export — metadata handled by layout or `generateMetadata`
- Replace `.asset.json` imports with URL strings:
  - `heroVideo.url` → `"/media/hero-bg.mp4"`
  - `heroSide.url` → `"/media/cta-bg.png"`
- Add `'use client'` if needed (this page uses no hooks, but its children do)

### Step 5: About Page (`app/about/page.tsx`)
**Goal:** Convert `routes/about.tsx` to Next.js page.

Key changes:
- Remove `createFileRoute("/about")` wrapper
- Replace `Link` from `@tanstack/react-router` → `next/link`
- `to="/contact"` → `href="/contact"`

### Step 6: Contact Page (`app/contact/page.tsx`)
**Goal:** Convert `routes/contact.tsx` to Next.js page.

Key changes:
- Remove `createFileRoute("/contact")` wrapper
- This page uses `useState` → needs `'use client'`

### Step 7: Error Pages
**Goal:** Create Next.js error and not-found pages.

- `app/error.tsx` — `'use client'` error boundary (replaces `ErrorComponent` from `__root.tsx`)
- `app/not-found.tsx` — 404 page (replaces `NotFoundComponent` from `__root.tsx`)

### Step 8: Asset Migration
**Goal:** Replace all `.asset.json` imports with URL strings.

Files to update (10 imports across 6 files):

| File | Import | Replace With |
|---|---|---|
| `app/page.tsx` | `heroVideo.url` | `"/media/hero-bg.mp4"` |
| `app/page.tsx` | `heroSide.url` | `"/media/cta-bg.png"` |
| `components/landing/Hero.tsx` | `heroVideo.url` | `"/media/hero-bg.mp4"` |
| `components/landing/Hero.tsx` | `heroSide.url` | `"/media/cta-bg.png"` |
| `components/landing/CinematicEntry.tsx` | `introVideo.url` | `"/media/intro.mp4"` |
| `components/landing/FinalCTA.tsx` | `ctaVideo.url` | `"/media/cta.mp4"` |
| `components/landing/FinalCTA.tsx` | `ctaPoster.url` | `"/media/cta-bg.png"` |
| `components/landing/Services.tsx` | `servicesBg.url` | `"/media/services-bg.jpeg"` |
| `components/landing/Portfolio.tsx` | `portfolioBg.url` | `"/media/portfolio-bg.jpeg"` |
| `components/landing/Testimonials.tsx` | `testimonialsBg.url` | `"/media/testimonials-bg.jpg"` |

All assets already exist in `public/media/`.

### Step 9: `'use client'` Directives
**Goal:** Add `'use client'` to all client-side components.

Landing components needing `'use client'` (use Framer Motion, hooks, or browser APIs):
- `motion.tsx` (if it exists), `decor.tsx` (if it exists)
- `Hero.tsx`, `FinalCTA.tsx`, `Testimonials.tsx`, `Process.tsx`, `Portfolio.tsx`
- `CinematicEntry.tsx`, `CursorGlow.tsx`, `ScrollProgress.tsx`, `SmoothScroll.tsx`
- `FAQ.tsx`, `Navbar.tsx`, `Footer.tsx`, `WhatsAppFAB.tsx`
- `TrustedMarquee.tsx`, `TechStack.tsx`, `Comparison.tsx`, `Audience.tsx`
- `Dominate.tsx`, `Services.tsx`, `Awards.tsx`, `Reveal.tsx`
- `BlockchainNetwork.tsx`, `Counter.tsx`, `MagneticButton.tsx`
- `app/providers.tsx`
- `app/contact/page.tsx` (uses `useState`)
- `app/error.tsx`

### Step 10: Update `components.json`
**Goal:** Fix shadcn/ui config for Next.js.

```json
{
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/styles.css",
    ...
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Key changes: `rsc: true`, `css` path → `app/styles.css` (no `src/`).

### Step 11: Update `.gitignore`
**Goal:** Add Next.js artifacts, remove Vite artifacts.

Add:
```
.next
next-env.d.ts
```

Remove (no longer needed):
```
.output
.vinxi
.tanstack/**
.nitro
.wrangler/
.dev.vars
```

### Step 12: Cleanup — Remove Vite/TanStack Files
**Goal:** Delete all old framework files.

Delete:
- `vite.config.ts`
- `app/router.tsx`
- `app/routeTree.gen.ts`
- `app/server.ts`
- `app/start.ts`
- `app/routes/` (entire directory: `__root.tsx`, `index.tsx`, `about.tsx`, `contact.tsx`, `README.md`)
- `app/lib/config.server.ts`
- `app/lib/error-capture.ts`
- `app/lib/error-page.ts`
- `app/lib/lovable-error-reporting.ts`
- `app/lib/api/` (entire directory)
- `bunfig.toml` (if exists)
- `bun.lock` (if exists)

### Step 13: Build & Verify
**Goal:** Run Next.js build and fix any errors.

```bash
npm run build
```

Expected output: All 3 routes compile successfully (`/`, `/about`, `/contact`).

---

## Vite → Next.js Quick Reference

| Vite | Next.js |
|---|---|
| `import.meta.env.MODE` | `process.env.NODE_ENV` |
| `import.meta.env.PROD` | `process.env.NODE_ENV === 'production'` |
| `import.meta.env.DEV` | `process.env.NODE_ENV !== 'production'` |
| `VITE_*` env prefix | `NEXT_PUBLIC_*` |
| `import img from './x.png'` → string | `import img from './x.png'` → `{src, width, height}` |
| `<img src={img} />` | `<img src={img.src} />` or `<Image src={img} />` |
| `index.html` | `app/layout.tsx` |
| `main.tsx` | `app/page.tsx` |
| `createFileRoute("/path")` | File-based: `app/path/page.tsx` |
| `Link to="/path"` | `Link href="/path"` (from `next/link`) |
| `head: () => ({ meta })` | `export const metadata = {...}` |
| `Outlet` | `{children}` |
| `HeadContent` | `<head>` in layout |
| `Scripts` | Auto-injected by Next.js |
| `.asset.json` sidecar imports | Direct URL strings |

---

## Post-Migration Enhancements (Future)

- Optimize images with Next.js `<Image>` component
- Optimize fonts with `next/font`
- Add Next.js ESLint config (`next lint`)
- Adopt SSR/SSG per page (move data fetching to server components)
- Add loading states with `loading.tsx` files
- Add `generateMetadata()` for per-page SEO
