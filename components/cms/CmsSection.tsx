// components/cms/CmsSection.tsx
// Shared shell + building blocks for CMS sections, in the site's own design.
// The shell honours section settings (A3): width, paddingY, background,
// motion, plus an anchor id for in-page links like "#features".
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import CmsMotion from "./CmsMotion";
import { isExternal, splitHeading, type CmsLink } from "./cmsContent";

export type Settings = Record<string, unknown>;

const WIDTHS: Record<string, string> = {
  narrow: "mx-auto w-full max-w-3xl px-6",
  default: "mx-auto w-full max-w-6xl px-6",
  wide: "site-container px-6",
  superWide: "site-container px-6",
  full: "site-container px-6",
};

const BACKGROUNDS: Record<string, string> = {
  primary: "cms-surface-primary",
  gradient: "cms-surface-primary",
  brand: "cms-surface-primary",
  dark: "cms-surface-dark",
  muted: "cms-surface-muted",
  light: "cms-surface-light",
};

export const settingStr = (s: Settings, key: string) =>
  typeof s[key] === "string" ? (s[key] as string) : "";

function padding(s: Settings, fallback: [number, number]): [number, number] {
  const p = s.paddingY;
  const clamp = (n: unknown, d: number) =>
    typeof n === "number" && Number.isFinite(n)
      ? Math.min(Math.max(n, 0), 320)
      : d;
  if (Array.isArray(p))
    return [clamp(p[0], fallback[0]), clamp(p[1] ?? p[0], fallback[1])];
  if (typeof p === "number")
    return [clamp(p, fallback[0]), clamp(p, fallback[1])];
  return fallback;
}

export function sectionBackground(s: Settings) {
  return BACKGROUNDS[settingStr(s, "background")] ?? "";
}

export function CmsSection({
  settings,
  id,
  children,
  className = "",
  defaultWidth = "default",
  defaultPadding = [80, 112],
  background,
  contained = true,
}: {
  settings: Settings;
  id?: string;
  children: ReactNode;
  className?: string;
  defaultWidth?: string;
  defaultPadding?: [number, number];
  /** Overrides settings.background (e.g. a CTA that defaults to the brand gradient). */
  background?: string;
  /** false: children control their own width (full-bleed layouts). */
  contained?: boolean;
}) {
  const [pt, pb] = padding(settings, defaultPadding);
  const width = WIDTHS[settingStr(settings, "width")] ?? WIDTHS[defaultWidth];
  const bg = background ?? sectionBackground(settings);
  const style = {
    "--cms-pt": `${pt}px`,
    "--cms-pb": `${pb}px`,
  } as React.CSSProperties;
  const body = contained ? (
    <div className={`relative ${width}`}>{children}</div>
  ) : (
    children
  );
  return (
    <section
      id={id}
      className={`cms-pad relative overflow-hidden ${bg} ${className}`}
      style={style}
    >
      <CmsMotion motion={settingStr(settings, "motion") || "none"}>
        {body}
      </CmsMotion>
    </section>
  );
}

export function containerClass(settings: Settings, fallback = "default") {
  return WIDTHS[settingStr(settings, "width")] ?? WIDTHS[fallback];
}

/** The site's amber pill eyebrow. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
      {children}
    </div>
  );
}

/** Heading with the site's gradient accent on its last word(s). */
export function GradientHeading({
  text,
  as: Tag = "h2",
  className = "text-3xl font-bold tracking-tight text-text-primary md:text-5xl",
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const { head, tail } = splitHeading(text);
  return (
    <Tag className={className}>
      {head}
      {head && tail ? " " : ""}
      {tail && <span className="text-gradient">{tail}</span>}
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "center",
  className = "mb-12",
}: {
  eyebrow?: string;
  heading?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  if (!eyebrow && !heading && !description) return null;
  const center = align === "center";
  return (
    <div
      className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {heading && (
        <div className={eyebrow ? "mt-5" : ""}>
          <GradientHeading text={heading} />
        </div>
      )}
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed text-text-secondary md:text-lg ${center ? "mx-auto max-w-2xl" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function CmsButton({
  link,
  variant = "primary",
  shape = "",
}: {
  link: CmsLink;
  variant?: "primary" | "secondary";
  shape?: string;
}) {
  const radius = /square|sharp/i.test(shape)
    ? "rounded-md"
    : /rounded/i.test(shape)
      ? "rounded-xl"
      : "rounded-full";
  const cls =
    variant === "primary"
      ? `cms-btn-primary group inline-flex items-center gap-2 ${radius} bg-amber-base px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]`
      : `group inline-flex items-center gap-2 ${radius} border border-border-hover bg-surface/60 px-6 py-3 text-sm font-semibold text-text-primary backdrop-blur transition-all hover:-translate-y-0.5 hover:border-amber-base hover:text-amber-base`;
  const inner = (
    <>
      {link.text}
      {variant === "primary" && (
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );
  if (isExternal(link.link)) {
    return (
      <a
        href={link.link}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </a>
    );
  }
  if (link.link.startsWith("/")) {
    return (
      <Link href={link.link} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={link.link} className={cls}>
      {inner}
    </a>
  );
}

export function ButtonRow({
  primary,
  secondary,
  shape,
  center = false,
}: {
  primary?: CmsLink;
  secondary?: CmsLink;
  shape?: string;
  center?: boolean;
}) {
  if (!primary && !secondary) return null;
  return (
    <div
      className={`mt-8 flex flex-wrap items-center gap-3 ${center ? "justify-center" : ""}`}
    >
      {primary && <CmsButton link={primary} shape={shape} />}
      {secondary && (
        <CmsButton link={secondary} variant="secondary" shape={shape} />
      )}
    </div>
  );
}

/** Link that picks next/link for site paths and a new tab for external URLs. */
export function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

const GRID_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
};

/** settings.columns → responsive grid classes. */
export function gridCols(settings: Settings, fallback: number) {
  const n =
    typeof settings.columns === "number"
      ? Math.round(settings.columns)
      : Number(settings.columns);
  return GRID_COLS[Number.isFinite(n) && n >= 1 && n <= 6 ? n : fallback];
}

/** Plain <img> (CMS images come from arbitrary hosts, so next/image isn't used). */
export function CmsImg({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      className={className}
    />
  );
}
