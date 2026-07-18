import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Layers3,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

export default function ToolCard({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  return (
    <Link
      href={`/tools/${item.slug}`}
      className="group relative block h-full rounded-[2rem] p-[1px] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.015]"
    >
      {/* Animated outer border */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-white/5 to-white/10 transition-all duration-500 group-hover:from-amber-base/80 group-hover:via-amber-base/10 group-hover:to-amber-base/40" />

      {/* Hover shadow */}
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] bg-amber-base/0 blur-3xl transition-all duration-500 group-hover:bg-amber-base/15" />

      <article className="relative flex h-full min-h-[430px] flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-gradient-to-br from-bg-base via-bg-base to-surface/80 p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition-all duration-500 group-hover:shadow-[0_35px_100px_rgba(0,0,0,0.5)]">
        {/* Moving glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-base/10 blur-3xl transition-all duration-700 group-hover:right-[-2rem] group-hover:top-[-2rem] group-hover:scale-125 group-hover:bg-amber-base/20" />

        <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-amber-base/5 blur-3xl transition-transform duration-700 group-hover:scale-125" />

        {/* Animated top line */}
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-amber-base to-transparent transition-transform duration-700 group-hover:scale-x-100" />

        <div className="relative flex h-full flex-col">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base transition-all duration-300 group-hover:border-amber-base/40 group-hover:bg-amber-base/15">
              <Sparkles className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              {item.badge || "Blockchain Tool"}
            </span>

            <span className="font-mono text-xs font-bold text-silver/40 transition-colors duration-300 group-hover:text-amber-base">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Icon */}
          <div className="mt-7">
            <span className="relative grid h-16 w-16 place-items-center rounded-[1.25rem] border border-amber-base/20 bg-gradient-to-br from-amber-base/15 to-amber-base/5 text-amber-base shadow-[0_12px_35px_rgba(245,158,11,0.08)] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base group-hover:shadow-[0_18px_45px_rgba(245,158,11,0.25)]">
              <Wrench className="h-8 w-8 transition-transform duration-500 group-hover:-rotate-6" />

              <span className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-bg-base bg-amber-base opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100" />
            </span>
          </div>

          {/* Category */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-silver transition-colors duration-300 group-hover:text-amber-base">
              <Layers3 className="h-4 w-4 text-amber-base" />
              {item.category || "Blockchain Utility"}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-5 text-2xl font-black leading-tight text-text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-base">
            {item.title}
          </h3>

          {/* Description */}
          <p className="mt-4 line-clamp-4 flex-1 text-sm leading-7 text-silver">
            {item.excerpt}
          </p>

          {/* Meta pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.readTime && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-silver transition-colors duration-300 group-hover:border-amber-base/20 group-hover:bg-amber-base/5">
                <Clock3 className="h-3.5 w-3.5 text-amber-base" />
                {item.readTime}
              </span>
            )}

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-silver transition-colors duration-300 group-hover:border-amber-base/20 group-hover:bg-amber-base/5">
              <Zap className="h-3.5 w-3.5 text-amber-base" />
              {item.status || "Available"}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
            <span className="text-sm font-black text-amber-base">
              Launch Tool
            </span>

            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-silver transition-all duration-500 group-hover:rotate-6 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base group-hover:shadow-[0_12px_35px_rgba(245,158,11,0.25)]">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}