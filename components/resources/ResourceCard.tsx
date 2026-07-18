"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
} from "lucide-react";

type ResourceCardProps = {
  item: {
    id?: number | string;
    slug: string;
    title: string;
    excerpt?: string;
    category?: string;
    badge?: string;
    image?: string;
    author?: string;
    date?: string;
    readTime?: string;
    format?: string;
    featured?: boolean;
    popular?: boolean;
    tags?: string[];
  };
  index?: number;
  variant?: "default" | "compact" | "featured";
};

function formatResourceDate(date?: string) {
  if (!date) return "";

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

function ResourceVisual({
  title,
  badge,
  image,
}: {
  title: string;
  badge?: string;
  image?: string;
}) {
  return (
    <div className="relative h-full min-h-[156px] overflow-hidden rounded-[1.05rem] border border-[#26344c] bg-[#0b1220] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      {image ? (
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(217,119,6,0.28),transparent_34%),radial-gradient(circle_at_78%_72%,rgba(5,150,105,0.18),transparent_34%),linear-gradient(145deg,#111c31,#070d18_72%)]" />

          <div className="absolute left-4 right-4 top-4 rounded-[0.9rem] border border-[#31415d] bg-[#0d1728]/90 p-3 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-base" />
              <span className="h-2 w-2 rounded-full bg-emerald-base" />
              <span className="h-2 w-2 rounded-full bg-slate-500" />
            </div>

            <div className="space-y-2">
              <span className="block h-2 w-full rounded-full bg-slate-600/70" />
              <span className="block h-2 w-10/12 rounded-full bg-slate-700/80" />
              <span className="block h-2 w-7/12 rounded-full bg-slate-700/70" />
            </div>
          </div>

          <div className="absolute bottom-4 right-4 grid h-12 w-12 rotate-6 place-items-center rounded-2xl border border-amber-base/25 bg-amber-base/10 text-amber-base shadow-[0_16px_35px_rgba(217,119,6,0.18)] transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 group-hover:bg-amber-base group-hover:text-[#090f1a]">
            <FileText className="h-5 w-5" />
          </div>

          <div className="absolute bottom-4 left-4 max-w-[70%]">
            <p className="text-[9px] font-black uppercase tracking-[0.14em] text-amber-base">
              {badge || "Resource"}
            </p>
            <p className="mt-1 line-clamp-2 text-xs font-black leading-4 text-slate-100">
              {title}
            </p>
          </div>
        </>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.10] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:left-[125%] group-hover:opacity-100" />
    </div>
  );
}

export default function ResourceCard({
  item,
  index = 0,
  variant = "default",
}: ResourceCardProps) {
  const formattedDate = formatResourceDate(item.date);
  const visibleTags = item.tags?.slice(0, 2) || [];
  const animationDelay = `${Math.min(index * 60, 360)}ms`;

  if (variant === "compact") {
    return (
      <Link
        href={`/resources/${item.slug}`}
        className="group relative flex min-w-0 items-start gap-4 overflow-hidden rounded-[1.15rem] border border-[#223049] bg-[#090f1a] p-4 shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/45 hover:shadow-[0_24px_60px_rgba(15,23,42,0.24)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-amber-base/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-[1rem] border border-amber-base/20 bg-amber-base/10 text-amber-base transition-all duration-300 group-hover:rotate-6 group-hover:bg-amber-base group-hover:text-[#090f1a]">
          <FileText className="h-5 w-5" />
        </span>

        <div className="relative min-w-0 flex-1">
          <p className="mb-2 truncate text-[10px] font-black uppercase text-amber-base">
            {item.category || "Resource"}
          </p>

          <h3 className="line-clamp-2 text-sm font-black leading-6 text-slate-100 transition-colors duration-300 group-hover:text-amber-100">
            {item.title}
          </h3>
        </div>

        <ArrowUpRight className="relative mt-1 h-4 w-4 shrink-0 text-slate-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-base" />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/resources/${item.slug}`}
        className="group relative block min-h-[500px] overflow-hidden rounded-[1.5rem] border border-[#223049] bg-[#090f1a] shadow-[0_28px_90px_rgba(15,23,42,0.24)] transition-all duration-500 hover:-translate-y-1 hover:border-amber-base/45 hover:shadow-[0_34px_105px_rgba(15,23,42,0.30)]"
      >
        <div className="absolute inset-0">
          <ResourceVisual
            title={item.title}
            badge={item.badge || item.category}
            image={item.image}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#090f1a] via-[#090f1a]/80 to-[#090f1a]/20" />
        </div>

        <div className="relative flex min-h-[500px] flex-col justify-between p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-3 py-1.5 text-[10px] font-black uppercase text-amber-base backdrop-blur-xl">
              <BookOpen className="h-3.5 w-3.5" />
              {item.badge || "Featured"}
            </span>

            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#30405e] bg-[#111b2d]/80 text-slate-100 backdrop-blur-xl transition-all duration-300 group-hover:border-amber-base/45 group-hover:bg-amber-base group-hover:text-[#090f1a]">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>

          <div>
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-amber-base" />
                {item.readTime || "Guide"}
              </span>

              {formattedDate && (
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-amber-base" />
                  {formattedDate}
                </span>
              )}
            </div>

            <h3 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl">
              {item.title}
            </h3>

            {item.excerpt && (
              <p className="mt-5 max-w-2xl line-clamp-3 text-sm font-medium leading-7 text-slate-300 sm:text-base">
                {item.excerpt}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article
      className="animate-resource-card-reveal group relative h-full overflow-hidden rounded-[1.35rem] border border-[#223049] bg-[#090f1a] opacity-0 shadow-[0_22px_70px_rgba(15,23,42,0.20)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/45 hover:shadow-[0_30px_90px_rgba(15,23,42,0.28)]"
      style={{
        animationDelay,
      }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-base/10 blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-24 left-8 h-52 w-52 rounded-full bg-emerald-base/10 blur-[70px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <Link
        href={`/resources/${item.slug}`}
        className="relative flex h-full flex-col p-5 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_128px]">
          <div className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-3 py-1.5 text-[10px] font-black uppercase text-amber-base">
                <BookOpen className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">
                  {item.badge || item.category || "Resource"}
                </span>
              </span>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold text-slate-400">
              {item.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-amber-base" />
                  {item.readTime}
                </span>
              )}

              {formattedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-amber-base" />
                  {formattedDate}
                </span>
              )}
            </div>

            <h3 className="line-clamp-3 text-xl font-black leading-7 text-white transition-colors duration-300 group-hover:text-amber-100">
              {item.title}
            </h3>
          </div>

          <ResourceVisual
            title={item.title}
            badge={item.badge || item.category}
            image={item.image}
          />
        </div>

        {item.excerpt && (
          <p className="mt-5 line-clamp-3 text-sm font-medium leading-6 text-slate-300">
            {item.excerpt}
          </p>
        )}

        {visibleTags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#26344c] bg-[#111b2d] px-3 py-1.5 text-[10px] font-bold text-slate-300 transition-colors duration-300 group-hover:border-amber-base/25 group-hover:text-amber-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-[#223049] pt-4">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-200">
                {item.author || "ClickMasters Team"}
              </p>
              <p className="mt-1 text-[10px] font-black uppercase text-slate-500">
                {item.category || "Resource"}
              </p>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 text-xs font-black text-amber-base">
              Read
              <span className="grid h-9 w-9 place-items-center rounded-full border border-amber-base/25 bg-amber-base/10 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-amber-base group-hover:text-[#090f1a]">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
