import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  PenTool,
  Sparkles,
} from "lucide-react";

export default function HowToHero({
  item,
  readTime,
}: {
  item: any;
  readTime: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-bg-base/70 p-8 shadow-[0_35px_120px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-12">
      <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-base/10 blur-3xl" />

      <div className="relative">
        <Link
          href="/howto"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to How-To Guides
        </Link>

        <div className="mt-7 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-base/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            <BookOpen className="h-4 w-4" />
            {item.hero?.badge || item.category || "How-To Guide"}
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
            <Clock className="h-4 w-4 text-amber-base" />
            {readTime}
          </span>

          {item.date && (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
              <CalendarDays className="h-4 w-4 text-amber-base" />
              {item.date}
            </span>
          )}
        </div>

        <h1 className="mt-7 max-w-5xl font-display text-4xl font-black leading-tight tracking-tight text-text-primary md:text-6xl">
          {item.hero?.title || item.title}
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-silver">
          {item.hero?.description || item.excerpt}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {item.author && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
              <PenTool className="h-4 w-4 text-amber-base" />
              {item.author}
            </div>
          )}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-silver">
            <Sparkles className="h-4 w-4 text-amber-base" />
            Step-by-step implementation
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#guide"
            className="inline-flex items-center gap-2 rounded-full bg-amber-base px-7 py-3 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
          >
            Start Reading
            <ArrowRight className="h-4 w-4" />
          </a>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
          >
            Ask an Expert
          </Link>
        </div>
      </div>
    </section>
  );
}