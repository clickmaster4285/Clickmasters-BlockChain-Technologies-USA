import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  FileText,
  Layers3,
  Sparkles,
} from "lucide-react";

export default function TemplateCard({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  return (
    <Link
      href={`/templates/${item.slug}`}
      className="group relative block h-full rounded-[2rem] p-[1px] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.015]"
    >
      {/* Animated border */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-white/5 to-white/10 transition-all duration-500 group-hover:from-amber-base/80 group-hover:via-amber-base/10 group-hover:to-blue-400/30" />

      {/* Outer glow */}
      <div className="pointer-events-none absolute inset-5 rounded-[2rem] bg-amber-base/0 blur-3xl transition-all duration-500 group-hover:bg-amber-base/12" />

      <article className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-gradient-to-br from-[#101827] via-[#111b2b] to-[#162238] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:shadow-[0_38px_110px_rgba(0,0,0,0.52)]">
        {/* Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

        {/* Moving glows */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-base/8 blur-3xl transition-all duration-700 group-hover:right-[-2rem] group-hover:top-[-2rem] group-hover:scale-125 group-hover:bg-amber-base/18" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-blue-500/5 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-blue-500/10" />

        {/* Top light */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-amber-base to-transparent transition-transform duration-700 group-hover:scale-x-100" />

        <div className="relative flex h-full flex-col">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base transition-all duration-300 group-hover:border-amber-base/40 group-hover:bg-amber-base/15">
              <Sparkles className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              {item.badge || "Template"}
            </span>

            <span className="font-mono text-xs font-bold text-[#66758d] transition-colors duration-300 group-hover:text-amber-base">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Document preview */}
          <div className="relative mt-7 flex h-[150px] items-center justify-center">
            <div className="absolute h-28 w-24 -rotate-6 rounded-2xl border border-white/10 bg-[#172338] transition-all duration-500 group-hover:-translate-x-2 group-hover:-rotate-12" />

            <div className="absolute h-28 w-24 rotate-6 rounded-2xl border border-white/10 bg-[#1a2942] transition-all duration-500 group-hover:translate-x-2 group-hover:rotate-12" />

            <div className="relative z-10 h-32 w-28 overflow-hidden rounded-2xl border border-amber-base/25 bg-gradient-to-br from-[#1b2a42] to-[#101827] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-1 group-hover:border-amber-base/50">
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-base/10 text-amber-base">
                  <FileText className="h-4 w-4" />
                </span>

                <span className="h-2 w-8 rounded-full bg-amber-base/40" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-2 w-full rounded-full bg-white/15" />
                <div className="h-2 w-5/6 rounded-full bg-white/10" />
                <div className="h-2 w-3/4 rounded-full bg-white/10" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="h-6 rounded-lg bg-white/5" />
                <div className="h-6 rounded-lg bg-white/5" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="mt-5">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8997aa] transition-colors duration-300 group-hover:text-amber-base">
              <Layers3 className="h-4 w-4 text-amber-base" />
              {item.category || "Blockchain Template"}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-5 text-2xl font-black leading-tight text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-base">
            {item.title}
          </h3>

          {/* Description */}
          <p className="mt-4 line-clamp-4 flex-1 text-sm leading-7 text-[#aab6c8]">
            {item.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.format && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-[#aab6c8] transition-colors duration-300 group-hover:border-amber-base/20 group-hover:bg-amber-base/5">
                <FileText className="h-3.5 w-3.5 text-amber-base" />
                {item.format}
              </span>
            )}

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-[#aab6c8] transition-colors duration-300 group-hover:border-amber-base/20 group-hover:bg-amber-base/5">
              <Layers3 className="h-3.5 w-3.5 text-amber-base" />
              {item.sections || "Complete"} sections
            </span>

            {item.readTime && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-[#aab6c8] transition-colors duration-300 group-hover:border-amber-base/20 group-hover:bg-amber-base/5">
                <Clock3 className="h-3.5 w-3.5 text-amber-base" />
                {item.readTime}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-sm font-black text-amber-base">
              View Template
            </span>

            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#aab6c8] transition-all duration-500 group-hover:rotate-6 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-[#101827] group-hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)]">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}