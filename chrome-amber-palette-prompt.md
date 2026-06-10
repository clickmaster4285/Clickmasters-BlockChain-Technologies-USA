# ClickMasters — Chrome & Amber Color System
# Complete Lovable Implementation Prompt

Apply the "Chrome & Amber" color system to the entire ClickMasters blockchain landing page. This replaces ALL current colors (electric blue #2563EB, cyan #06B6D4, violet #7C3AED, and navy #050B18). Do not change any copy, layout, fonts, component structure, or animations — only colors.

---

## STEP 1 — DESIGN TOKENS (globals.css or tailwind.config)

Replace the entire color system with these tokens. Add them as CSS custom properties on :root:

```css
:root {
  /* ── Backgrounds ── */
  --color-bg-base:     #060608;   /* page, navbar, footer */
  --color-bg-surface:  #0D0D12;   /* cards, section alternates */
  --color-bg-elevated: #141420;   /* hover cards, dropdowns */
  --color-bg-overlay:  #1C1C2A;   /* modals, tooltips */

  /* ── Silver (primary) ── */
  --color-silver-dim:    #475569;  /* disabled, borders subtle */
  --color-silver-mid:    #64748B;  /* muted text, dividers */
  --color-silver-base:   #94A3B8;  /* icons, secondary labels */
  --color-silver-light:  #CBD5E1;  /* active nav, subheadings */
  --color-silver-bright: #E2E8F0;  /* primary body text */

  /* ── Amber (accent — surgical use only) ── */
  --color-amber-dim:    #92400E;   /* amber tint on dark bg */
  --color-amber-base:   #F59E0B;   /* CTAs, stat numbers, eyebrows */
  --color-amber-light:  #FCD34D;   /* hover state, gradient end */
  --color-amber-glow:   rgba(245, 158, 11, 0.15); /* card glow, aura */
  --color-amber-border: rgba(245, 158, 11, 0.25); /* card borders on hover */

  /* ── Text ── */
  --color-text-primary:   #F8FAFC;  /* headlines, hero text */
  --color-text-secondary: #94A3B8;  /* body, descriptions */
  --color-text-muted:     #475569;  /* labels, meta, footnotes */

  /* ── Borders ── */
  --color-border-default: rgba(148, 163, 184, 0.08);  /* card borders resting */
  --color-border-hover:   rgba(148, 163, 184, 0.20);  /* card borders on hover */
  --color-border-amber:   rgba(245, 158, 11, 0.30);   /* amber-accented borders */

  /* ── Functional ── */
  --color-success: #10B981;   /* keep — on-chain confirmed, audits passed */
  --color-danger:  #EF4444;   /* keep — errors only */
}
```

---

## STEP 2 — TAILWIND CONFIG (if using Tailwind)

```js
// tailwind.config.js — extend colors:
colors: {
  bg: {
    base:     '#060608',
    surface:  '#0D0D12',
    elevated: '#141420',
    overlay:  '#1C1C2A',
  },
  silver: {
    dim:    '#475569',
    mid:    '#64748B',
    base:   '#94A3B8',
    light:  '#CBD5E1',
    bright: '#E2E8F0',
  },
  amber: {
    dim:   '#92400E',
    base:  '#F59E0B',
    light: '#FCD34D',
  },
  white: '#F8FAFC',
}
```

---

## STEP 3 — GLOBAL BASE STYLES

```css
/* globals.css */

html, body {
  background-color: #060608;
  color: #F8FAFC;
}

/* Selection highlight */
::selection {
  background: rgba(245, 158, 11, 0.25);
  color: #F8FAFC;
}

/* Scrollbar (webkit) */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #060608; }
::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover { background: #F59E0B; }

/* Focus rings — amber instead of blue */
:focus-visible {
  outline: 2px solid #F59E0B;
  outline-offset: 3px;
}
```

---

## STEP 4 — NAVBAR

```css
/* Navbar background */
nav {
  background: rgba(6, 6, 8, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.06);
}

/* Logo text */
.navbar-logo {
  color: #F8FAFC;
  /* "CLICKMASTERS" word — make the first letter amber */
}
.navbar-logo span.accent { color: #F59E0B; }

/* Nav links */
.nav-link {
  color: #64748B;
  transition: color 0.2s;
}
.nav-link:hover { color: #CBD5E1; }
.nav-link.active { color: #F8FAFC; }

/* CTA button in navbar */
.navbar-cta {
  background: #F59E0B;
  color: #060608;  /* BLACK text on amber — critical for contrast */
  font-weight: 600;
  border: none;
}
.navbar-cta:hover {
  background: #FCD34D;
  color: #060608;
}
```

---

## STEP 5 — HERO SECTION

```css
/* Hero background */
.hero-section {
  background: #060608;
  /* Subtle amber radial glow behind the CTA image — replace blue glow */
}

.hero-glow {
  background: radial-gradient(
    ellipse 60% 50% at 70% 50%,
    rgba(245, 158, 11, 0.06),
    transparent 70%
  );
}

/* Eyebrow tag "Securing $100M+ on-chain value" */
.hero-eyebrow {
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.3);
  background: rgba(245, 158, 11, 0.08);
}

/* Hero headline */
.hero-headline {
  color: #F8FAFC;
}

/* Gradient word (e.g. "Decentralized") */
.hero-gradient-text {
  background: linear-gradient(135deg, #CBD5E1 0%, #F59E0B 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Hero subtext */
.hero-subtext { color: #64748B; }

/* Primary CTA button */
.btn-primary {
  background: #F59E0B;
  color: #060608;
  font-weight: 600;
  box-shadow: 0 8px 32px rgba(245, 158, 11, 0.25);
  border: none;
}
.btn-primary:hover {
  background: #FCD34D;
  box-shadow: 0 12px 40px rgba(245, 158, 11, 0.35);
  transform: translateY(-2px);
}

/* Secondary CTA button */
.btn-secondary {
  background: transparent;
  color: #CBD5E1;
  border: 1px solid rgba(148, 163, 184, 0.25);
}
.btn-secondary:hover {
  border-color: rgba(245, 158, 11, 0.4);
  color: #F59E0B;
}

/* Hero stat pills (4.9 on Clutch / 50+ Smart Contracts / $100M+ Secured) */
.hero-stat {
  color: #94A3B8;
  border-right: 1px solid rgba(148, 163, 184, 0.15);
}
.hero-stat strong { color: #F8FAFC; }

/* Scroll indicator */
.scroll-indicator { color: #475569; }

/* Block number badge "node://mainnet..." */
.block-badge {
  color: #475569;
  border: 1px solid rgba(148, 163, 184, 0.1);
  font-family: monospace;
  background: rgba(13, 13, 18, 0.8);
}
```

---

## STEP 6 — LOGO MARQUEE STRIP

```css
.marquee-strip {
  border-top: 1px solid rgba(148, 163, 184, 0.06);
  border-bottom: 1px solid rgba(148, 163, 184, 0.06);
  background: #0D0D12;
}

.marquee-label {
  color: #475569;
}

/* All logos: silver tint — replace the current #9CA3AF with this: */
/* Update all simpleicons URLs from /9CA3AF to /64748B */
/* Example: https://cdn.simpleicons.org/ethereum/64748B */
/* On hover of individual logos: */
.marquee-logo:hover { filter: brightness(1.8) sepia(1) saturate(3) hue-rotate(10deg); }
/* This creates a subtle amber glow on hover */
```

---

## STEP 7 — SERVICES SECTION

```css
.services-section {
  background: #060608;
}

/* Section eyebrow "/ Services" */
.section-eyebrow {
  color: #F59E0B;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Section headline */
.section-headline { color: #F8FAFC; }
.section-subtext { color: #64748B; }

/* Service cards */
.service-card {
  background: #0D0D12;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.25rem;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}
.service-card:hover {
  border-color: rgba(245, 158, 11, 0.25);
  box-shadow: 0 0 0 1px rgba(245, 158, 11, 0.1),
              0 20px 60px rgba(0, 0, 0, 0.4);
  transform: translateY(-4px);
}

/* Service icon background */
.service-icon-bg {
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.1);
  /* Icon itself in silver */
  color: #94A3B8;
}
/* On card hover, icon shifts to amber */
.service-card:hover .service-icon-bg {
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.2);
  color: #F59E0B;
}

/* Service card title */
.service-card-title { color: #E2E8F0; }
.service-card-body  { color: #64748B; }

/* Tech tags inside service cards */
.service-tech-tag {
  background: rgba(148, 163, 184, 0.06);
  color: #64748B;
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 9999px;
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
}

/* "Discuss project" link */
.service-link {
  color: #64748B;
  transition: color 0.2s;
}
.service-link:hover { color: #F59E0B; }
```

---

## STEP 8 — DOMINATE / STATS SECTION

```css
.dominate-section {
  background: #0D0D12;
  border-top: 1px solid rgba(148, 163, 184, 0.06);
  border-bottom: 1px solid rgba(148, 163, 184, 0.06);
}

/* Stat cards */
.stat-card {
  background: #141420;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.25rem;
}

/* Animated counter numbers — AMBER. This is the hero use of amber on this section. */
.stat-number {
  color: #F59E0B;
  font-variant-numeric: tabular-nums;
}

/* Stat label */
.stat-label {
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
}

/* Stat card bottom border accent */
.stat-card::after {
  content: '';
  display: block;
  height: 2px;
  background: linear-gradient(90deg, #F59E0B, #FCD34D);
  border-radius: 0 0 1.25rem 1.25rem;
  opacity: 0.5;
}

/* Tech pill badges */
.tech-pill {
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.12);
  color: #64748B;
  border-radius: 9999px;
}
.tech-pill:hover {
  border-color: rgba(245, 158, 11, 0.3);
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.05);
}

/* CTA banner inside Dominate section */
.dominate-cta-banner {
  background: linear-gradient(135deg,
    rgba(148, 163, 184, 0.04),
    rgba(245, 158, 11, 0.04)
  );
  border: 1px solid rgba(245, 158, 11, 0.15);
  border-radius: 1.5rem;
}
.dominate-cta-headline { color: #F8FAFC; }
.dominate-cta-sub { color: #64748B; }
```

---

## STEP 9 — PORTFOLIO SECTION

```css
.portfolio-section { background: #060608; }

/* Portfolio card */
.portfolio-card {
  background: #0D0D12;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.25rem;
  overflow: hidden;
}
.portfolio-card:hover {
  border-color: rgba(245, 158, 11, 0.2);
}

/* Category badge (DeFi / NFT / Wallet / DAO) */
.portfolio-badge {
  background: rgba(148, 163, 184, 0.08);
  color: #94A3B8;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 9999px;
  font-size: 0.7rem;
  padding: 0.25rem 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Project title */
.portfolio-title { color: #E2E8F0; }
.portfolio-desc  { color: #64748B; }

/* Project stats (TVL $50M / Chains 4 / Audits 3) */
.portfolio-stat-label { color: #475569; font-size: 0.75rem; }
.portfolio-stat-value {
  color: #F59E0B;  /* Amber — these are the "proof" numbers */
  font-weight: 600;
}

/* Dividers between stats */
.portfolio-stat-divider {
  border-color: rgba(148, 163, 184, 0.08);
}
```

---

## STEP 10 — PROCESS / SPACE JOURNEY SECTION

```css
.process-section {
  background: #0D0D12;
}

/* Timeline spine */
.timeline-line {
  background: linear-gradient(180deg,
    #F59E0B 0%,
    #CBD5E1 50%,
    #475569 100%
  );
  width: 2px;
}

/* Timeline dot */
.timeline-dot {
  background: #F59E0B;
  border: 3px solid #060608;
  box-shadow: 0 0 0 1px #F59E0B;
}

/* Step number (01, 02...) */
.step-number-ghost {
  color: rgba(148, 163, 184, 0.04); /* ghost behind card */
  font-size: 8rem;
}

/* Step card */
.step-card {
  background: #141420;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.25rem;
}
/* Active/hovered step card */
.step-card:hover {
  border-color: rgba(245, 158, 11, 0.2);
}

/* Step badge number */
.step-badge {
  background: rgba(245, 158, 11, 0.1);
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.25);
  font-weight: 700;
}

/* Step icon */
.step-icon { color: #94A3B8; }
.step-card:hover .step-icon { color: #F59E0B; }

/* Step title */
.step-title { color: #E2E8F0; }
.step-desc  { color: #64748B; }

/* Duration pill */
.step-duration {
  background: rgba(148, 163, 184, 0.06);
  color: #475569;
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 9999px;
  font-size: 0.75rem;
}
```

---

## STEP 11 — COMPARISON TABLE SECTION

```css
.comparison-section { background: #060608; }

/* Table wrapper */
.comparison-table {
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: 1.25rem;
  overflow: hidden;
}

/* Header row */
.comparison-header {
  background: #0D0D12;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
}

/* ClickMasters column header — amber accent */
.comparison-header .col-us {
  color: #F59E0B;
  font-weight: 600;
}

/* Competitor column header */
.comparison-header .col-them {
  color: #475569;
}

/* Data rows */
.comparison-row {
  border-bottom: 1px solid rgba(148, 163, 184, 0.05);
}
.comparison-row:last-child { border-bottom: none; }
.comparison-row:hover { background: rgba(148, 163, 184, 0.02); }

/* Row label */
.comparison-row .col-label { color: #94A3B8; }

/* ClickMasters value — bright */
.comparison-row .col-us { color: #E2E8F0; }

/* ClickMasters column — amber left border */
.col-us-wrapper {
  border-left: 2px solid rgba(245, 158, 11, 0.4);
  padding-left: 1rem;
}

/* Competitor value — dim */
.comparison-row .col-them { color: #475569; }

/* Check icon in ClickMasters col */
.check-icon { color: #F59E0B; }

/* X icon in competitor col */
.x-icon { color: #475569; }
```

---

## STEP 12 — WHO WE SERVE SECTION

```css
.serve-section { background: #0D0D12; }

/* Serve cards */
.serve-card {
  background: #141420;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.25rem;
  transition: all 0.2s;
}
.serve-card:hover {
  border-color: rgba(245, 158, 11, 0.2);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.05);
}

/* Serve icon */
.serve-icon {
  color: #64748B;
  background: rgba(148, 163, 184, 0.05);
  border: 1px solid rgba(148, 163, 184, 0.1);
}
.serve-card:hover .serve-icon {
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.08);
  border-color: rgba(245, 158, 11, 0.2);
}

.serve-title { color: #CBD5E1; }
.serve-desc  { color: #475569; }
```

---

## STEP 13 — TESTIMONIALS SECTION

```css
.testimonials-section { background: #060608; }

/* Testimonial card */
.testimonial-card {
  background: #0D0D12;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.5rem;
}

/* Quote mark */
.quote-mark {
  color: rgba(245, 158, 11, 0.2);
  font-size: 5rem;
  line-height: 1;
}

/* Quote text */
.quote-text {
  color: #94A3B8;
  font-style: italic;
}

/* Quotee name */
.quote-name { color: #E2E8F0; }
.quote-role { color: #475569; }

/* Avatar circle */
.avatar-circle {
  /* Use silver gradient instead of brand color gradient */
  background: linear-gradient(135deg, #475569, #94A3B8);
  color: #F8FAFC;
}

/* Category badge on testimonial card */
.testimonial-badge {
  background: rgba(245, 158, 11, 0.08);
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.2);
}

/* Divider line between quote and author */
.testimonial-divider {
  border-color: rgba(148, 163, 184, 0.07);
}
```

---

## STEP 14 — TECH STACK SECTION

```css
.techstack-section { background: #0D0D12; }

/* Category column header pill */
.category-pill {
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.12);
  color: #94A3B8;
}

/* Tech item row */
.tech-item {
  background: rgba(148, 163, 184, 0.02);
  border: 1px solid rgba(148, 163, 184, 0.06);
  color: #64748B;
  border-radius: 0.75rem;
  transition: all 0.15s;
}
.tech-item:hover {
  border-color: rgba(245, 158, 11, 0.3);
  background: rgba(245, 158, 11, 0.04);
  color: #CBD5E1;
  transform: translateY(-2px);
}

/* Update ALL tech icon URLs from current color to silver: */
/* https://cdn.simpleicons.org/{icon}/64748B */
/* On hover, switch to their brand color via JS or parent hover filter */

/* Marquee text rows */
.marquee-text {
  color: #1E2535;  /* Very dim — almost invisible, just texture */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
}

/* Bottom trust line */
.trust-line {
  color: #475569;
}
.trust-line svg { color: #F59E0B; } /* shield icon in amber */
```

---

## STEP 15 — AWARDS SECTION

```css
.awards-section { background: #060608; }

/* Award cards */
.award-card {
  /* Remove current gradient backgrounds — replace with uniform dark */
  background: #0D0D12;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.25rem;
  transition: all 0.2s;
}
.award-card:hover {
  border-color: rgba(245, 158, 11, 0.25);
  box-shadow: 0 0 30px rgba(245, 158, 11, 0.06);
}

/* Award icon — use a trophy SVG in amber instead of emoji */
.award-icon { color: #F59E0B; }

/* Award title */
.award-title { color: #E2E8F0; }

/* Awarding body */
.award-body { color: #475569; }

/* Year badge */
.award-year {
  color: #475569;
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.1);
}
```

---

## STEP 16 — FAQ SECTION

```css
.faq-section { background: #0D0D12; }

/* FAQ item */
.faq-item {
  background: #141420;
  border: 1px solid rgba(148, 163, 184, 0.07);
  border-radius: 1.25rem;
}
.faq-item:hover {
  border-color: rgba(148, 163, 184, 0.15);
}
.faq-item[data-open="true"] {
  border-color: rgba(245, 158, 11, 0.2);
}

/* Question text */
.faq-question {
  color: #E2E8F0;
}
.faq-question:hover { color: #F8FAFC; }

/* Chevron icon — amber */
.faq-chevron {
  color: #64748B;
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 50%;
}
.faq-item[data-open="true"] .faq-chevron {
  color: #F59E0B;
  border-color: rgba(245, 158, 11, 0.3);
  background: rgba(245, 158, 11, 0.08);
}

/* Answer text */
.faq-answer {
  color: #64748B;
  border-top: 1px solid rgba(148, 163, 184, 0.05);
}
```

---

## STEP 17 — FINAL CTA SECTION

```css
.final-cta-section {
  background: #060608;
  /* Top accent line */
  border-top: 1px solid rgba(245, 158, 11, 0.15);
}

/* Big eyebrow */
.cta-eyebrow {
  color: #F59E0B;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
}

/* Headline */
.cta-headline {
  color: #F8FAFC;
}
/* One word in headline gets gradient */
.cta-headline .gradient-word {
  background: linear-gradient(135deg, #CBD5E1, #F59E0B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Subtext */
.cta-subtext { color: #64748B; }

/* Contact buttons */
.contact-btn-email {
  background: #F59E0B;
  color: #060608;
  font-weight: 600;
}
.contact-btn-email:hover { background: #FCD34D; }

.contact-btn-phone {
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #94A3B8;
}
.contact-btn-phone:hover {
  border-color: rgba(245, 158, 11, 0.3);
  color: #F59E0B;
}

.contact-btn-whatsapp {
  background: rgba(37, 211, 102, 0.1);
  border: 1px solid rgba(37, 211, 102, 0.2);
  color: #25D366;
}
.contact-btn-whatsapp:hover {
  background: rgba(37, 211, 102, 0.15);
  border-color: rgba(37, 211, 102, 0.4);
}
```

---

## STEP 18 — FOOTER

```css
footer {
  background: #040406;
  border-top: 1px solid rgba(148, 163, 184, 0.06);
}

/* Logo */
.footer-logo { color: #F8FAFC; }

/* Footer tagline */
.footer-tagline { color: #475569; }

/* Section headings */
.footer-heading {
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
}

/* Footer links */
.footer-link {
  color: #475569;
  transition: color 0.15s;
}
.footer-link:hover { color: #CBD5E1; }

/* Copyright */
.footer-copyright { color: #2D3748; }

/* Bottom tagline "Beyond the code — beyond the chain" */
.footer-bottom-tagline { color: #2D3748; }
```

---

## STEP 19 — SCROLL PROGRESS BAR

```css
/* Replace blue→cyan→violet gradient with: */
.scroll-progress-bar {
  background: linear-gradient(90deg, #F59E0B, #FCD34D, #CBD5E1);
}
```

---

## STEP 20 — WHATSAPP FAB

```css
/* Keep WhatsApp green — it's a functional brand color, not UI color */
/* Only change: the notification dot border matches new base bg */
.wa-fab-dot {
  border-color: #060608; /* was #050B18 */
}
/* Expanded text background matches new surface */
.wa-fab-expanded {
  background: linear-gradient(135deg, #25D366, #128C7E);
}
```

---

## STEP 21 — CUSTOM CURSOR

```css
/* Replace cyan cursor with amber */
.cursor-dot {
  background: #F59E0B;
}
.cursor-ring {
  border-color: rgba(245, 158, 11, 0.5);
}
/* On hover of interactive elements */
.cursor-ring.hover {
  border-color: rgba(245, 158, 11, 0.8);
  background: rgba(245, 158, 11, 0.05);
}
```

---

## STEP 22 — MARQUEE / LOGO STRIP — ICON COLOR UPDATE

Update ALL simpleicons.org image URLs. Find every instance of `/9CA3AF` in the img src URLs and replace with `/64748B`:

```
FIND:    cdn.simpleicons.org/{icon}/9CA3AF
REPLACE: cdn.simpleicons.org/{icon}/64748B
```

---

## WHAT MUST NOT CHANGE

- All font families (Syne, Space Grotesk) — unchanged
- All font sizes and weights — unchanged
- All spacing, padding, margin, layout — unchanged
- All component structures, section order — unchanged
- All copy/text content — unchanged
- All animations (Framer Motion, Lenis, counters) — unchanged
- WhatsApp FAB green (#25D366, #128C7E) — keep as-is
- Success color (#10B981) and danger color (#EF4444) — keep as-is
- All video assets and images — unchanged

---

## COLOR USAGE RULES TO ENFORCE

1. **Amber (#F59E0B) is used ONLY for:** primary CTA buttons, stat numbers (counters), section eyebrow labels, open FAQ chevrons, portfolio stat values, the ClickMasters column in the comparison table, timeline dots, the shield icon in the tech trust line, and the scroll progress bar. Nowhere else.

2. **Silver (#94A3B8 / #CBD5E1) is used for:** all secondary text, icons at rest, card borders on hover, tech item text, nav links at rest. It is NOT used for primary actions.

3. **White (#F8FAFC) is used for:** headlines, hero text, card titles, the primary body text. Full opacity only.

4. **Black text on amber backgrounds:** any element with background #F59E0B or #FCD34D MUST have text color #060608 (near-black), never white — amber is too light for white text to meet contrast standards.

5. **No blue, cyan, violet, or indigo anywhere** — these colors are fully removed from the design system.
