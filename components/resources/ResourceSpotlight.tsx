"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
  FileText,
  Sparkles,
  UserRound,
} from "lucide-react";

type ResourceSpotlightProps = {
  item?: {
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
    tags?: string[];
  };
};

function formatResourceDate(date?: string) {
  if (!date) return "";

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

export default function ResourceSpotlight({
  item,
}: ResourceSpotlightProps) {
  if (!item) return null;

  const formattedDate = formatResourceDate(item.date);
  const visibleTags = item.tags?.slice(0, 4) || [];

  return (
    <section className="relative overflow-hidden bg-[#08111f] py-20 sm:py-24 lg:py-32">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(245,158,11,0.09),transparent_30%),radial-gradient(circle_at_88%_60%,rgba(59,130,246,0.07),transparent_30%)]" />

        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full border border-white/[0.035]" />

        <div className="absolute bottom-[10%] right-[7%] h-56 w-56 rounded-full border border-amber-base/[0.05]" />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
              <Sparkles className="h-4 w-4" />
              Resource Spotlight
            </div>

            <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Start with our most valuable
              <span className="text-amber-base">
                {" "}
                featured resource
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm font-medium leading-7 text-[#8f9db1] sm:text-base">
            Carefully selected guidance designed to help
            founders, teams, and decision-makers move from
            research to practical execution.
          </p>
        </div>

        {/* Spotlight card */}
        <article className="group relative overflow-hidden rounded-[2.4rem] border border-white/[0.08] bg-[#0d1726] shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
            <div className="absolute -left-28 top-0 h-80 w-80 rounded-full bg-amber-base/[0.1] blur-[100px]" />

            <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.08] blur-[100px]" />
          </div>

          <div className="grid min-h-[640px] lg:grid-cols-[0.95fr_1.05fr]">
            {/* Preview panel */}
            <div className="relative min-h-[460px] overflow-hidden border-b border-white/[0.07] lg:min-h-full lg:border-b-0 lg:border-r">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.2),transparent_34%),linear-gradient(145deg,#1a2a42,#0d1726_70%)]" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] via-[#091321]/50 to-transparent" />

              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)] bg-[length:240%_100%] bg-[-150%_0] transition-[background-position] duration-[1500ms] group-hover:bg-[140%_0]" />

              {/* Browser-style preview */}
              <div className="absolute inset-x-6 top-6 overflow-hidden rounded-[1.7rem] border border-white/[0.1] bg-[#0b1524]/80 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:inset-x-10 sm:top-10">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>

                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#607087]">
                    Resource Preview
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                      <FileText className="h-5 w-5" />
                    </span>

                    <div className="flex-1">
                      <div className="h-2.5 w-28 rounded-full bg-white/15" />
                      <div className="mt-2 h-2 w-20 rounded-full bg-white/[0.07]" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-3 w-full rounded-full bg-white/[0.08]" />
                    <div className="h-3 w-[88%] rounded-full bg-white/[0.08]" />
                    <div className="h-3 w-[72%] rounded-full bg-white/[0.08]" />
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                      <div className="h-8 w-8 rounded-xl bg-amber-base/15" />
                      <div className="mt-4 h-2.5 w-16 rounded-full bg-white/12" />
                      <div className="mt-2 h-2 w-10 rounded-full bg-white/[0.06]" />
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
                      <div className="h-8 w-8 rounded-xl bg-blue-400/10" />
                      <div className="mt-4 h-2.5 w-20 rounded-full bg-white/12" />
                      <div className="mt-2 h-2 w-12 rounded-full bg-white/[0.06]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating format badge */}
              <div className="absolute bottom-6 left-6 animate-resource-spotlight-float sm:bottom-10 sm:left-10">
                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-[#08111f]/80 px-4 py-3 shadow-2xl backdrop-blur-xl">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                    <BookOpen className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#67768c]">
                      Format
                    </p>

                    <p className="mt-1 text-xs font-black text-white">
                      {item.format || "Expert Guide"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Number marker */}
              <div className="absolute bottom-6 right-6 grid h-16 w-16 place-items-center rounded-full border border-white/[0.1] bg-[#07101d]/70 backdrop-blur-xl sm:bottom-10 sm:right-10">
                <span className="text-xl font-black text-amber-base">
                  01
                </span>
              </div>
            </div>

            {/* Content panel */}
            <div className="relative flex flex-col justify-center p-6 sm:p-10 lg:p-14 xl:p-16">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                  <Sparkles className="h-3.5 w-3.5" />
                  {item.badge || "Featured Resource"}
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#9aa8ba]">
                  {item.category || "Resource"}
                </span>
              </div>

              <h3 className="mt-7 text-3xl font-black leading-[1.06] tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.4rem]">
                {item.title}
              </h3>

              {item.excerpt && (
                <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-[#9aa8ba] lg:text-lg">
                  {item.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4 text-xs font-bold text-[#8390a4]">
                {item.author && (
                  <span className="inline-flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-amber-base" />
                    {item.author}
                  </span>
                )}

                {item.readTime && (
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-amber-base" />
                    {item.readTime}
                  </span>
                )}

                {formattedDate && (
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-base" />
                    {formattedDate}
                  </span>
                )}
              </div>

              {/* Tags */}
              {visibleTags.length > 0 && (
                <div className="mt-7 flex flex-wrap gap-2">
                  {visibleTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] font-bold text-[#8794a7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Progress indicators */}
              <div className="mt-9 grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Clarity",
                    width: "92%",
                  },
                  {
                    label: "Practicality",
                    width: "86%",
                  },
                  {
                    label: "Depth",
                    width: "96%",
                  },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.15em] text-[#647187]">
                      <span>{metric.label}</span>
                    </div>

                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full origin-left animate-resource-progress rounded-full bg-gradient-to-r from-amber-base to-yellow-300"
                        style={{
                          width: metric.width,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/resources/${item.slug}`}
                  className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-[#101827] shadow-[0_16px_40px_rgba(245,158,11,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_22px_50px_rgba(245,158,11,0.3)]"
                >
                  Explore Resource

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/resources"
                  className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.025] px-7 py-3.5 text-sm font-black text-[#c7d1df] transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/25 hover:bg-amber-base/[0.06] hover:text-amber-base"
                >
                  View All Resources

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}