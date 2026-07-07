import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileQuestion,
  GitCompare,
  Tags,
} from "lucide-react";

export default function ComparisonSidebar({
  article,
  related,
  readTime,
}: {
  article: any;
  related: any[];
  readTime: number;
}) {
  return (
    <aside className="space-y-6">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-3xl border border-amber-base/20 bg-gradient-to-b from-amber-base/15 to-surface/80 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
            Expert Help
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight">
            Need help choosing the right stack?
          </h3>

          <p className="mt-3 text-sm leading-6 text-silver">
            Get a practical technical recommendation based on your use case,
            budget, timeline, compliance, and scale requirements.
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
            Article Summary
          </p>

          <div className="mt-5 space-y-3 text-sm text-silver">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-base" />
                Read time
              </span>
              <strong className="text-amber-base">{readTime} min</strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-amber-base" />
                Type
              </span>
              <strong className="text-amber-base">Comparison</strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <FileQuestion className="h-4 w-4 text-amber-base" />
                FAQ
              </span>
              <strong className="text-amber-base">
                {article.faq?.length || 0}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-amber-base" />
                Word Count
              </span>
              <strong className="text-amber-base">
                {article.meta?.wordCount || "Guide"}
              </strong>
            </div>
          </div>
        </div>

        {article.tags?.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
              <Tags className="h-4 w-4" />
              Tags
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
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
            Related Guides
          </p>

          <div className="mt-4 space-y-3">
            {related.map((item: any) => (
              <Link
                key={item.slug}
                href={`/comparison/${item.slug}`}
                className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm font-semibold leading-6 text-silver transition-colors hover:border-amber-base/30 hover:text-amber-base"
              >
                {item.title}

                <ArrowRight className="mt-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}