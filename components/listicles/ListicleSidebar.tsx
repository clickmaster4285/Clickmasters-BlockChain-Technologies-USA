import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  FileQuestion,
  PenTool,
  Tags,
} from "lucide-react";

export default function ListicleSidebar({
  item,
  related,
  readTime,
}: {
  item: any;
  related: any[];
  readTime: string;
}) {
  return (
    <aside className="space-y-6">
      <div className="space-y-6 lg:sticky lg:top-28">
        <div className="rounded-3xl border border-amber-base/20 bg-gradient-to-b from-amber-base/15 to-surface/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            Expert Help
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight">
            Need help choosing the right option?
          </h3>

          <p className="mt-3 text-sm leading-6 text-silver">
            Get practical recommendations based on your project goals, budget,
            timeline, and technical requirements.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-5 py-3 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            List Summary
          </p>

          <div className="mt-5 space-y-3 text-sm text-silver">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-base" />
                Read time
              </span>
              <strong className="text-amber-base">{readTime}</strong>
            </div>

            {item.author && (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="inline-flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-amber-base" />
                  Author
                </span>
                <strong className="text-right text-amber-base">
                  {item.author}
                </strong>
              </div>
            )}

            {item.date && (
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-amber-base" />
                  Date
                </span>
                <strong className="text-amber-base">{item.date}</strong>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-base" />
                Type
              </span>
              <strong className="text-amber-base">
                {item.category || "Listicle"}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <FileQuestion className="h-4 w-4 text-amber-base" />
                FAQ
              </span>
              <strong className="text-amber-base">
                {item.faqs?.length || 0}
              </strong>
            </div>
          </div>
        </div>

        {item.credibility?.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
              <Tags className="h-4 w-4" />
              Highlights
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.credibility.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-silver"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            Related Lists
          </p>

          <div className="mt-4 space-y-3">
            {related.map((list: any) => (
              <Link
                key={list.slug}
                href={`/listicles/${list.slug}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold leading-6 text-silver transition-colors hover:border-amber-base/30 hover:text-amber-base"
              >
                {list.title}

                <ArrowRight className="mt-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}