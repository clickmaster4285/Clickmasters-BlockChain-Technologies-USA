// components/process/ProcessCard.tsx

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import type { ProcessCardData } from "@/lib/process";

/* =========================================================
   Types
========================================================= */

type ProcessCardProps = {
  process: ProcessCardData;
  priority?: boolean;
  className?: string;
};

/* =========================================================
   Category Styles
========================================================= */

const categoryStyles: Record<
  string,
  {
    badge: string;
    icon: string;
  }
> = {
  Security: {
    badge:
      "border-red-400/20 bg-red-400/[0.08] text-red-300",
    icon:
      "border-red-400/20 bg-red-400/[0.08] text-red-300",
  },

  Technical: {
    badge:
      "border-blue-400/20 bg-blue-400/[0.08] text-blue-300",
    icon:
      "border-blue-400/20 bg-blue-400/[0.08] text-blue-300",
  },

  Legal: {
    badge:
      "border-purple-400/20 bg-purple-400/[0.08] text-purple-300",
    icon:
      "border-purple-400/20 bg-purple-400/[0.08] text-purple-300",
  },

  Enterprise: {
    badge:
      "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300",
    icon:
      "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300",
  },
};

const defaultCategoryStyle = {
  badge:
    "border-amber-base/20 bg-amber-base/[0.08] text-amber-base",

  icon:
    "border-amber-base/20 bg-amber-base/[0.08] text-amber-base",
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
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

/* =========================================================
   Component
========================================================= */

export default function ProcessCard({
  process,
  priority = false,
  className = "",
}: ProcessCardProps) {
  const categoryStyle =
    categoryStyles[process.category] ??
    defaultCategoryStyle;

  const formattedDate = formatProcessDate(
    process.date,
  );

  const processImage =
    process.hero.image || process.image;

  return (
    <article
      className={[
        "group relative flex h-full min-h-[590px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:shadow-[0_30px_90px_rgba(0,0,0,0.26)]",
        className,
      ].join(" ")}
    >
      {/* =====================================================
          Image
      ====================================================== */}

      <Link
        href={`/process/${process.slug}`}
        aria-label={`Read ${process.title}`}
        className="relative block h-[260px] overflow-hidden border-b border-white/[0.08] bg-bg-base"
      >
        {processImage ? (
          <>
            <Image
              src={processImage}
              alt={process.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-r from-bg-base/30 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-bg-base via-surface to-amber-base/[0.12]">
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(225,157,45,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(225,157,45,0.22) 1px, transparent 1px)",

                backgroundSize: "32px 32px",
              }}
            />

            <div className="absolute inset-0 grid place-items-center">
              <span
                className={[
                  "grid h-24 w-24 place-items-center rounded-[1.7rem] border transition-all duration-500 group-hover:rotate-3 group-hover:scale-110",
                  categoryStyle.icon,
                ].join(" ")}
              >
                <ShieldCheck className="h-11 w-11" />
              </span>
            </div>
          </div>
        )}

        {/* Category */}

        <span
          className={[
            "absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] backdrop-blur-xl",
            categoryStyle.badge,
          ].join(" ")}
        >
          <BadgeCheck className="h-3.5 w-3.5" />

          {process.category}
        </span>

        {/* Read Time */}

        {process.readTime && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-base/75 px-3.5 py-1.5 text-[10px] font-bold text-text-primary backdrop-blur-xl">
            <Clock3 className="h-3.5 w-3.5 text-amber-base" />

            {process.readTime}
          </span>
        )}

        {/* Image Bottom Label */}

        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4">
          <span className="rounded-full border border-white/10 bg-bg-base/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-silver backdrop-blur-xl">
            Process Guide
          </span>

          <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-bg-base/70 text-amber-base backdrop-blur-xl transition-all duration-300 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>

      {/* =====================================================
          Content
      ====================================================== */}

      <div className="flex flex-1 flex-col p-6 md:p-7">
        {/* Meta */}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-silver">
          {formattedDate && (
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-amber-base" />

              {formattedDate}
            </span>
          )}

          {process.author && (
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-amber-base" />

              {process.author}
            </span>
          )}
        </div>

        {/* Title */}

        <h2 className="mt-5 text-xl font-black leading-[1.35] tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-amber-base md:text-2xl">
          <Link
            href={`/process/${process.slug}`}
            className="outline-none"
          >
            {process.title}
          </Link>
        </h2>

        {/* Excerpt */}

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-silver">
          {process.excerpt}
        </p>

        {/* Credibility Items */}

        {process.credibility.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {process.credibility
              .slice(0, 3)
              .map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-silver transition-all duration-300 group-hover:border-amber-base/20 group-hover:bg-amber-base/[0.04]"
                >
                  {item}
                </span>
              ))}
          </div>
        )}

        {/* Footer */}

        <div className="mt-auto pt-7">
          <div className="border-t border-white/[0.08] pt-5">
            <Link
              href={`/process/${process.slug}`}
              className="group/link flex items-center justify-between gap-4"
            >
              <span className="text-sm font-black text-text-primary transition-colors duration-300 group-hover/link:text-amber-base">
                Explore complete process
              </span>

              <span className="inline-flex items-center gap-2 text-xs font-black text-amber-base">
                Read guide

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hover Accent */}

      <div className="pointer-events-none absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-base via-amber-light to-transparent transition-transform duration-500 group-hover:scale-x-100" />

      <div className="pointer-events-none absolute -bottom-28 -right-28 h-64 w-64 rounded-full bg-amber-base/[0.035] blur-[75px] transition-all duration-700 group-hover:scale-125 group-hover:bg-amber-base/[0.08]" />
    </article>
  );
}