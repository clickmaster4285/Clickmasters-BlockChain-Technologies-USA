import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  FileQuestion,
  Layers3,
  ShieldCheck,
  Sparkles,
  Tags,
  Wrench,
  Zap,
} from "lucide-react";

export default function ToolSidebar({
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
    item?.type ||
    item?.group ||
    "Blockchain Tool";

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
        <div className="group relative overflow-hidden rounded-3xl border border-amber-base/20 bg-gradient-to-b from-amber-base/15 via-surface/90 to-surface/80 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
              <Sparkles className="h-3.5 w-3.5" />
              Expert Support
            </div>

            <h3 className="mt-4 text-2xl font-black leading-tight text-text-primary">
              Need help applying this tool?
            </h3>

            <p className="mt-3 text-sm leading-7 text-silver">
              Get practical guidance on how to use the results for your
              blockchain architecture, cost planning, security strategy, or
              product roadmap.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-5 py-3 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
            >
              Book a Free Call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Tool Summary */}
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
              <Wrench className="h-5 w-5" />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                Tool Summary
              </p>

              <h3 className="mt-1 text-lg font-black text-text-primary">
                Quick details
              </h3>
            </div>
          </div>

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
                <Layers3 className="h-4 w-4 shrink-0 text-amber-base" />
                Category
              </span>

              <strong className="max-w-[150px] text-right text-amber-base">
                {category}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 shrink-0 text-amber-base" />
                Status
              </span>

              <strong className="text-right text-amber-base">
                {item?.status || "Available"}
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

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-amber-base" />
                Usage
              </span>

              <strong className="text-right text-amber-base">
                Professional
              </strong>
            </div>
          </div>
        </div>

        {/* Tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
              <Tags className="h-4 w-4" />
              Tool Capabilities
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag: any, index: number) => {
                const text =
                  typeof tag === "string"
                    ? tag
                    : tag?.title ||
                      tag?.label ||
                      tag?.text;

                if (!text) return null;

                return (
                  <span
                    key={`${text}-${index}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-silver transition-colors hover:border-amber-base/25 hover:text-amber-base"
                  >
                    {text}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Related Tools */}
        <div className="rounded-3xl border border-white/10 bg-surface/80 p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                Continue Exploring
              </p>

              <h3 className="mt-2 text-xl font-black text-text-primary">
                Related Tools
              </h3>
            </div>

            <Link
              href="/tools"
              className="text-xs font-bold text-silver transition-colors hover:text-amber-base"
            >
              View all
            </Link>
          </div>

          {related.length > 0 ? (
            <div className="mt-5 space-y-3">
              {related.map((tool: any) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black leading-6 text-text-primary transition-colors group-hover:text-amber-base">
                        {tool.title}
                      </p>

                      {(tool.excerpt ||
                        tool.description ||
                        tool.hero?.description) && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-silver">
                          {tool.excerpt ||
                            tool.description ||
                            tool.hero?.description}
                        </p>
                      )}
                    </div>

                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber-base transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-silver">
              More related blockchain tools will appear here.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}