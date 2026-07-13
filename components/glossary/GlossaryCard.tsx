import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Layers3,
} from "lucide-react";

export default function GlossaryCard({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  return (
    <Link
      href={`/glossary/${item.slug}`}
      className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-surface/80 p-6 shadow-[0_20px_70px_rgba(0,0,0,.25)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40"
    >
      {/* Glow */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-base">
            <BookOpen className="h-4 w-4" />
            {item.badge || "Glossary"}
          </div>

          <span className="text-xs font-bold text-silver">
            #{index + 1}
          </span>
        </div>

        {/* Category */}
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-silver">
          <Layers3 className="h-4 w-4 text-amber-base" />
          {item.category}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black leading-tight text-text-primary transition-colors duration-300 group-hover:text-amber-base">
          {item.term || item.title}
        </h3>

        {/* Definition */}
        <p className="mt-5 flex-1 text-sm leading-7 text-silver">
          {item.definition}
        </p>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 text-xs text-silver">
            <Clock3 className="h-4 w-4 text-amber-base" />
            {item.readTime}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-base">
            Read Definition

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}