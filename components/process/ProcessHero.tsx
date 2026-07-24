// components/process/ProcessHero.tsx

import Image from "next/image";
import Link from "next/link";

import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  UserRound,
} from "lucide-react";

import type { NormalizedProcessEntry } from "@/lib/process";

/* =========================================================
   Types
========================================================= */

type ProcessHeroProps = {
  process: NormalizedProcessEntry;
  priority?: boolean;
};

/* =========================================================
   Category Styles
========================================================= */

const categoryStyles: Record<
  string,
  {
    badge: string;
    glow: string;
    icon: string;
  }
> = {
  Security: {
    badge:
      "border-red-400/25 bg-red-400/[0.08] text-red-300",

    glow:
      "bg-red-400/[0.14]",

    icon:
      "text-red-300",
  },

  Technical: {
    badge:
      "border-blue-400/25 bg-blue-400/[0.08] text-blue-300",

    glow:
      "bg-blue-400/[0.14]",

    icon:
      "text-blue-300",
  },

  Legal: {
    badge:
      "border-purple-400/25 bg-purple-400/[0.08] text-purple-300",

    glow:
      "bg-purple-400/[0.14]",

    icon:
      "text-purple-300",
  },

  Enterprise: {
    badge:
      "border-emerald-400/25 bg-emerald-400/[0.08] text-emerald-300",

    glow:
      "bg-emerald-400/[0.14]",

    icon:
      "text-emerald-300",
  },
};

const defaultCategoryStyle = {
  badge:
    "border-amber-base/25 bg-amber-base/[0.08] text-amber-base",

  glow:
    "bg-amber-base/[0.14]",

  icon:
    "text-amber-base",
};

/* =========================================================
   Helpers
========================================================= */

function formatProcessDate(date: string): string {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

/* =========================================================
   Component
========================================================= */

export default function ProcessHero({
  process,
  priority = true,
}: ProcessHeroProps) {
  const categoryStyle =
    categoryStyles[process.category] ??
    defaultCategoryStyle;

  const formattedDate = formatProcessDate(
    process.date,
  );

  const heroImage =
    process.hero.image || process.image;

  return (
    <section className="relative isolate overflow-hidden border-b border-white/[0.07] pb-16 pt-32 lg:pb-24 lg:pt-40">
      {/* =====================================================
          Background
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-30 bg-bg-base" />

      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(225,157,45,0.14),transparent_32%),radial-gradient(circle_at_90%_25%,rgba(255,255,255,0.04),transparent_28%)]" />

      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",

          backgroundSize: "72px 72px",

          maskImage:
            "linear-gradient(to bottom, black, transparent 90%)",
        }}
      />

      <div
        className={[
          "pointer-events-none absolute -right-32 top-16 -z-10 h-[420px] w-[420px] rounded-full blur-[120px]",
          categoryStyle.glow,
        ].join(" ")}
      />

      <div className="site-container relative px-6">
        {/* =================================================
            Breadcrumb
        ================================================== */}

        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-silver"
        >
          <Link
            href="/"
            className="transition-colors duration-300 hover:text-amber-base"
          >
            Home
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-amber-base" />

          <Link
            href="/process"
            className="transition-colors duration-300 hover:text-amber-base"
          >
            Process
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-amber-base" />

          <span
            aria-current="page"
            className="max-w-[240px] truncate text-text-primary sm:max-w-md"
          >
            {process.title}
          </span>
        </nav>

        {/* =================================================
            Content Grid
        ================================================== */}

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-16">
          {/* =================================================
              Copy
          ================================================== */}

          <div>
            {/* Badge */}

            <div
              className={[
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.17em] backdrop-blur-xl",
                categoryStyle.badge,
              ].join(" ")}
            >
              <BadgeCheck className="h-4 w-4" />

              {process.hero.badge ||
                process.category}
            </div>

            {/* Title */}

            <h1 className="mt-7 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-text-primary sm:text-5xl lg:text-[4.2rem]">
              {process.hero.title}
            </h1>

            {/* Description */}

            <p className="mt-7 max-w-3xl text-base leading-8 text-silver sm:text-lg">
              {process.hero.description}
            </p>

            {/* Meta */}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/[0.08] py-5 text-xs font-medium text-silver">
              {process.author && (
                <span className="inline-flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-amber-base" />

                  {process.author}
                </span>
              )}

              {formattedDate && (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-amber-base" />

                  {formattedDate}
                </span>
              )}

              {process.readTime && (
                <span className="inline-flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-amber-base" />

                  {process.readTime}
                </span>
              )}
            </div>

            {/* Credibility */}

            {process.credibility.length > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {process.credibility.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                    >
                      <CheckCircle2
                        className={[
                          "mt-0.5 h-4 w-4 shrink-0",
                          categoryStyle.icon,
                        ].join(" ")}
                      />

                      <span className="text-xs font-medium leading-5 text-silver">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          {/* =================================================
              Hero Visual
          ================================================== */}

          <div className="relative">
            <div
              className={[
                "pointer-events-none absolute -inset-8 rounded-full blur-[90px]",
                categoryStyle.glow,
              ].join(" ")}
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-surface shadow-[0_30px_100px_rgba(0,0,0,0.32)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-bg-base">
                {heroImage ? (
                  <>
                    <Image
                      src={heroImage}
                      alt={process.hero.title}
                      fill
                      priority={priority}
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent" />

                    <div className="absolute inset-0 bg-gradient-to-r from-bg-base/20 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-surface via-bg-base to-amber-base/[0.08]">
                    <div
                      className="absolute inset-0 opacity-[0.14]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(225,157,45,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(225,157,45,0.25) 1px, transparent 1px)",

                        backgroundSize:
                          "34px 34px",
                      }}
                    />
                  </div>
                )}

                {/* Overlay Label */}

                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                      Complete Process Guide
                    </p>

                    <p className="mt-2 max-w-sm text-sm font-bold leading-6 text-text-primary">
                      Architecture, security,
                      implementation, cost, and
                      production requirements.
                    </p>
                  </div>

                  <span
                    className={[
                      "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border bg-bg-base/75 backdrop-blur-xl",
                      categoryStyle.badge,
                    ].join(" ")}
                  >
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                </div>
              </div>

              {/* Visual Footer */}

              <div className="grid grid-cols-3 border-t border-white/[0.08] bg-surface">
                <div className="border-r border-white/[0.08] p-4 text-center">
                  <p className="text-lg font-black text-text-primary">
                    01
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-silver">
                    Strategy
                  </p>
                </div>

                <div className="border-r border-white/[0.08] p-4 text-center">
                  <p className="text-lg font-black text-text-primary">
                    02
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-silver">
                    Architecture
                  </p>
                </div>

                <div className="p-4 text-center">
                  <p className="text-lg font-black text-text-primary">
                    03
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.12em] text-silver">
                    Delivery
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Borders */}

            <div className="pointer-events-none absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-[2rem] border border-amber-base/[0.12]" />

            <div className="pointer-events-none absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-tl-[2rem] border-l border-t border-amber-base/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
