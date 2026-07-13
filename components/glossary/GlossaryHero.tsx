import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  Layers3,
  PenTool,
  Sparkles,
} from "lucide-react";

export default function GlossaryHero({
  item,
  readTime,
}: {
  item: any;
  readTime: string;
}) {
  const title =
    item?.hero?.title ||
    item?.title ||
    item?.term ||
    "Blockchain Glossary Term";

  const description =
    item?.hero?.description ||
    item?.definition ||
    item?.excerpt ||
    item?.description ||
    "Understand this blockchain concept, how it works, and where it is used.";

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-bg-base/70 p-5 shadow-[0_35px_120px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-7 md:rounded-[2.5rem] md:p-12">
      <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-base/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />

      <div className="relative">
        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Glossary
        </Link>

        <div className="mt-7 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
            <BookOpen className="h-4 w-4" />
            {item?.hero?.badge || item?.category || "Glossary"}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
            <Clock3 className="h-4 w-4 text-amber-base" />
            {readTime}
          </span>

          {(item?.date || item?.published) && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
              <CalendarDays className="h-4 w-4 text-amber-base" />
              {item.date || item.published}
            </span>
          )}
        </div>

        <h1 className="mt-7 max-w-5xl font-display text-3xl font-black leading-tight tracking-tight text-text-primary sm:text-4xl md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-silver md:text-lg">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {item?.author && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
              <PenTool className="h-4 w-4 text-amber-base" />
              {item.author}
            </span>
          )}

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
            <Layers3 className="h-4 w-4 text-amber-base" />
            Practical Definition
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
            <Sparkles className="h-4 w-4 text-amber-base" />
            Easy Explanation
          </span>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#definition"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3 text-sm font-black text-bg-base transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Read Definition
            <ArrowRight className="h-4 w-4" />
          </a>

          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base sm:w-auto"
          >
            Ask an Expert
          </Link>
        </div>
      </div>
    </section>
  );
}