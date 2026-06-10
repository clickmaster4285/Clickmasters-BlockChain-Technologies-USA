---
name: tailwind-v4-custom-colors
description: Add custom color tokens to Tailwind CSS v4 via @theme inline so they work as simple utility classes (e.g., text-silver-dim, bg-amber-base)
source: auto-skill
extracted_at: '2026-06-10T09:18:00.211Z'
---

# Tailwind CSS v4 — Custom Color Tokens via `@theme inline`

## Problem

In Tailwind CSS v4, custom CSS properties defined on `:root` are **NOT** automatically available as Tailwind utility classes (e.g., `text-silver-dim`, `bg-amber-base`). You must explicitly map each custom property inside `@theme inline` for Tailwind to generate the corresponding utilities.

## Root Cause

Tailwind v4 scans only `@theme inline` for `color-*` entries to build utility classes. Properties defined solely on `:root` are consumed by the browser as CSS custom properties, but Tailwind never sees them during build — so `text-silver-dim` returns "class not found" at build time.

## Solution: Two-Phase Approach

### Phase 1 — Define and Map Tokens (styles.css)

```css
@theme inline {
  /* Map every custom color as: --color-<name>: var(--<name>) */
  --color-bg-base: var(--bg-base);
  --color-bg-surface: var(--bg-surface);
  --color-silver-dim: var(--silver-dim);
  --color-silver-mid: var(--silver-mid);
  --color-silver-base: var(--silver-base);
  --color-amber-base: var(--amber-base);
  --color-amber-glow: var(--amber-glow);
  --color-amber-border: var(--amber-border);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-border-default: var(--border-default);
  /* ... etc for every custom token */
}

:root {
  /* Actual hex/rgb values */
  --bg-base: #060608;
  --silver-dim: #475569;
  --amber-base: #F59E0B;
  --amber-glow: rgba(245, 158, 11, 0.15);
  /* ... etc */
}
```

This enables both:
- `var(--amber-base)` in CSS/inline styles
- `text-amber-base`, `bg-amber-glow`, `border-amber-border` as Tailwind classes

### Phase 2 — Batch-Replace Hardcoded Colors in Components

Replace patterns across all component files:

| Before (hardcoded) | After (Tailwind class) |
|---|---|
| `style={{ background: "#060608" }}` | `bg-bg-base` |
| `style={{ color: "#F59E0B" }}` | `text-amber-base` |
| `style={{ color: "var(--color-silver-mid)" }}` | `text-silver-mid` |
| `style={{ background: "rgba(245,158,11,0.1)" }}` | `bg-amber-glow` |
| `className="bg-[#050B18]"` | `className="bg-bg-elevated"` |
| `style={{ borderColor: "rgba(245,158,11,0.25)" }}` | `border-amber-border` |

**Before updating any component files, always fix `@theme inline` first.** Otherwise the Tailwind classes won't exist and the build will fail.

## Checklist for Color System Migration

1. Audit all custom colors needed (from design spec or palette prompt)
2. Add all `var()` definitions in `:root` block
3. Add matching `--color-*: var(--*)` entries in `@theme inline`
4. Update `@layer base`, `@utility` blocks (e.g., `text-gradient`, `shadow-glow`) to reference new tokens
5. Batch-update all components: replace hex colors and inline `style={{}}` with Tailwind classes
6. Run `npm run build` to verify zero errors

## Common Pitfalls

- **Don't confuse naming**: `--color-amber-base` in `@theme inline` maps to `var(--amber-base)` from `:root`, NOT `var(--color-amber-base)`
- **Don't forget glow/shadow variants**: `rgba()` values for glows and borders still need their own `--color-*: var(--*)` mapping
- **Shadcn/ui components** automatically use `--color-primary`, `--color-secondary`, etc. — if you map those to your custom tokens, shadcn buttons/accordions/etc. inherit the new palette
- **Inline `<style>` blocks**: `<style>{`...`}</style>` in JSX still works fine for dynamic/animation values — only the *color values* inside should change
