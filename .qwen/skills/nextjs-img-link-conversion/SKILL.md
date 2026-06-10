---
name: nextjs-img-link-conversion
description: Convert raw HTML <img> and <a> tags to Next.js <Image> and <Link> components with proper attributes, handling edge cases like Turbopack type conflicts.
source: auto-skill
extracted_at: '2026-06-10T12:04:29.516Z'
---

# Next.js — `<img>` → `<Image>` and `<a>` → `<Link>` Conversion

## When to Apply

Use this skill when migrating a non-Next.js project (or cleaning up a Next.js project) that uses raw HTML `<img>` and `<a>` tags that should be converted to Next.js optimized components.

## Part 1: `<img>` → `<Image>`

### Import
```tsx
import Image from "next/image";
```

### Rules

1. **Background/decorative images** (fill their container with `absolute inset-0`): Use the `fill` prop. Remove `absolute inset-0 h-full w-full` from className — `fill` handles positioning.
   ```tsx
   // Before
   <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
   // After
   <Image src={bg} alt="" fill className="object-cover opacity-55" />
   ```

2. **Sized images** (logos, icons): Add explicit `width` and `height` as numbers.
   ```tsx
   // Before
   <img src={logo} alt="Logo" className="h-7 w-auto" />
   // After
   <Image src={logo} alt="Logo" width={64} height={28} className="h-7 w-auto" />
   ```

3. **Already-converted `<Image>` missing dimensions**: If `next.config.mjs` does NOT have `images.unoptimized: true`, every `<Image>` MUST have either:
   - `fill` prop (fills nearest `position: relative` parent), OR
   - Both `width` and `height` props (numbers, not strings)

### Gotcha: Turbopack Type Conflicts

If `<Image>` is used inside a `<span>` or `<div>` that has inline `style={{}}` attributes with dynamic values, Turbopack's built-in TypeScript checker may throw:
```
Type error: JSX element class does not support attributes because it does not have a 'props' property.
```
This error does NOT appear with `npx tsc --noEmit` — it's Turbopack-specific.

**Fix:** Use plain `<img>` for these specific cases instead:
```tsx
// If <Image> causes Turbopack type error inside inline-styled elements:
<img src={icon} alt="" loading="lazy" className="h-4 w-4" />
```
This commonly happens in components like tech stacks where icons are inside dynamically-styled `<span>` wrappers.

## Part 2: `<a>` → `<Link>`

### Import
```tsx
import Link from "next/link";
```

### Rules

1. **Hash links** (`href="#section"`): Convert to `<Link>`.
   ```tsx
   // Before
   <a href="#contact" className="...">Contact</a>
   // After
   <Link href="#contact" className="...">Contact</Link>
   ```

2. **Internal page links** (`href="/about"`): Convert to `<Link>`.
   ```tsx
   <Link href="/about" className="...">About</Link>
   ```

3. **Keep as `<a>`**: `mailto:` and `tel:` links require native browser behavior — never convert these.
   ```tsx
   // KEEP as <a>:
   <a href="mailto:hello@example.com">hello@example.com</a>
   <a href="tel:+1234567890">+1 234 567 890</a>
   ```

4. **External links** (`href="https://..."`): Keep as `<a>` unless you need Next.js prefetching. If converting, add `target="_blank"` and `rel="noopener noreferrer"`.

### Batch Conversion Pattern

When a file has many `<a>` tags to convert:
1. Add `import Link from "next/link";` at the top
2. Replace all `<a href="#...">` with `<Link href="#...">` (both opening and closing tags)
3. Replace all `<a href="/...">` with `<Link href="/...">`
4. Leave `<a href="mailto:...">` and `<a href="tel:...">` untouched
5. Verify with grep: search for remaining `<a ` — only `mailto:` and `tel:` should remain

## Verification

After all conversions:
```bash
# Check for remaining raw <img> tags (should find none)
grep -r "<img " --include="*.tsx" .

# Check for remaining <a> tags (should only find mailto:/tel:)
grep -r "<a " --include="*.tsx" .

# Build to confirm
npm run build
```
