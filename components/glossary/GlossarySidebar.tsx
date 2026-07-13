import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  FileQuestion,
  Layers3,
  Tags,
} from "lucide-react";

export default function GlossarySidebar({
  item,
  related,
  readTime,
}: {
  item: any;
  related: any[];
  readTime: string;
}) {
  const category =
    item?.category ||
    item?.group ||
    item?.type ||
    "Blockchain Glossary";

  const faqs = item?.faqs || item?.faq || [];

  const tags =
    item?.tags ||
    item?.credibility ||
    item?.keywords ||
    [];

  return (
    <aside className="space-y-6">
      <div className="space-y-6 lg:sticky lg:top-28">
        {/* Expert Help */}
        <div className="rounded-3xl border border-amber-base/20 bg-gradient-to-b from-amber-base/15 to-surface/80 p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
            Expert Help
          </p>

          <h3 className="mt-3 text-2xl font-black leading-tight text-text-primary">
            Need help applying this concept?
          </h3>

          <p className="mt-3 text-sm leading-7 text-silver">
            Get practical guidance on how this blockchain term applies to your
            product, technical architecture, implementation plan, or business
            strategy.
          </p>

          <Link
            href="/contact"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-5 py-3 text-sm font-black text-bg-base transition-transform hover:-translate-y-0.5"
          >
            Book a Call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Term Summary */}
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
            Term Summary
          </p>

          <div className="mt-5 space-y-3 text-sm text-silver">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 shrink-0 text-amber-base" />
                Read time
              </span>

              <strong className="text-right text-amber-base">
                {readTime}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 shrink-0 text-amber-base" />
                Term
              </span>

              <strong className="max-w-[150px] text-right text-amber-base">
                {item?.term || item?.title || "Glossary Term"}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <Layers3 className="h-4 w-4 shrink-0 text-amber-base" />
                Category
              </span>

              <strong className="max-w-[150px] text-right text-amber-base">
                {category}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <FileQuestion className="h-4 w-4 shrink-0 text-amber-base" />
                FAQ
              </span>

              <strong className="text-amber-base">
                {faqs.length}
              </strong>
            </div>
          </div>
        </div>

        {/* Tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
              <Tags className="h-4 w-4" />
              Related Topics
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag: any, index: number) => {
                const text =
                  typeof tag === "string"
                    ? tag
                    : tag?.title || tag?.label || tag?.text;

                if (!text) return null;

                return (
                  <span
                    key={`${text}-${index}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-silver"
                  >
                    {text}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Terms */}
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                Continue Learning
              </p>

              <h3 className="mt-2 text-xl font-black text-text-primary">
                Related Terms
              </h3>
            </div>

            <Link
              href="/glossary"
              className="text-xs font-bold text-silver transition-colors hover:text-amber-base"
            >
              View all
            </Link>
          </div>

          {related.length > 0 ? (
            <div className="mt-5 space-y-3">
              {related.map((term: any) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-amber-base/30 hover:bg-amber-base/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black leading-6 text-text-primary transition-colors group-hover:text-amber-base">
                        {term.term || term.title}
                      </p>

                      {(term.definition ||
                        term.excerpt ||
                        term.description) && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-silver">
                          {term.definition ||
                            term.excerpt ||
                            term.description}
                        </p>
                      )}
                    </div>

                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber-base transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-silver">
              More related glossary terms will appear here.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}