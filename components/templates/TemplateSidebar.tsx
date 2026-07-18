import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  FileText,
  Layers3,
  Sparkles,
  Tags,
} from "lucide-react";

export default function TemplateSidebar({
  item,
  related,
  readTime,
}: {
  item: any;
  related: any[];
  readTime: string;
}) {
  const category =
    item?.category || item?.type || item?.group || "Blockchain Template";

  const format = item?.format || item?.fileType || "Document";

  const sections =
    item?.sectionsCount ||
    item?.sections?.length ||
    item?.content?.filter((block: any) => block?.type === "heading").length ||
    0;

  const tags = item?.tags || item?.credibility || item?.keywords || [];

  return (
    <aside className="space-y-6">
      <div className="space-y-6 lg:sticky lg:top-28">
        {/* Custom template CTA */}
        <div className="group relative overflow-hidden rounded-3xl border border-amber-base/20 bg-gradient-to-br from-amber-base/10 via-bg-base to-bg-surface p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
              <Sparkles className="h-3.5 w-3.5" />
              Custom Template
            </div>

            <h3 className="mt-4 text-2xl font-black leading-tight text-text-primary">
              Need this adapted to your project?
            </h3>

            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Get a professionally customized version for your blockchain
              product, internal workflow, proposal, or client documentation.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-5 py-3 text-sm font-black text-[#101827] transition-all duration-300 hover:-translate-y-0.5"
            >
              Request Custom Version
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Template summary */}
        <div className="rounded-3xl border border-border-default bg-bg-surface/90 p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
              <FileText className="h-5 w-5" />
            </span>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                Template Summary
              </p>

              <h3 className="mt-1 text-lg font-black text-text-primary">
                Quick details
              </h3>
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm text-text-secondary">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border-default bg-bg-base p-4">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 shrink-0 text-amber-base" />
                Read time
              </span>

              <strong className="text-right text-amber-base">{readTime}</strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border-default bg-bg-base p-4">
              <span className="inline-flex items-center gap-2">
                <FileText className="h-4 w-4 shrink-0 text-amber-base" />
                Format
              </span>

              <strong className="max-w-[150px] text-right text-amber-base">
                {format}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border-default bg-bg-base p-4">
              <span className="inline-flex items-center gap-2">
                <Layers3 className="h-4 w-4 shrink-0 text-amber-base" />
                Category
              </span>

              <strong className="max-w-[150px] text-right text-amber-base">
                {category}
              </strong>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-border-default bg-bg-base p-4">
              <span className="inline-flex items-center gap-2">
                <Layers3 className="h-4 w-4 shrink-0 text-amber-base" />
                Sections
              </span>

              <strong className="text-right text-amber-base">
                {sections || "Complete"}
              </strong>
            </div>
          </div>
        </div>

        {/* Tags */}
        {Array.isArray(tags) && tags.length > 0 && (
          <div className="rounded-3xl border border-border-default bg-bg-surface/90 p-6">
            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              <Tags className="h-4 w-4" />
              Included Topics
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
                    className="rounded-full border border-border-default bg-bg-base px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:text-amber-base"
                  >
                    {text}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Related templates */}
        <div className="rounded-3xl border border-border-default bg-bg-surface/90 p-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                Continue Exploring
              </p>

              <h3 className="mt-2 text-xl font-black text-text-primary">
                Related Templates
              </h3>
            </div>

            <Link
              href="/templates"
              className="text-xs font-bold text-text-secondary transition-colors hover:text-amber-base"
            >
              View all
            </Link>
          </div>

          {related.length > 0 ? (
            <div className="mt-5 space-y-3">
              {related.map((template: any) => (
                <Link
                  key={template.slug}
                  href={`/templates/${template.slug}`}
                  className="group block rounded-2xl border border-border-default bg-bg-base p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-amber-base/[0.05]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-black leading-6 text-text-primary transition-colors group-hover:text-amber-base">
                        {template.title ||
                          template.meta?.title ||
                          "Blockchain Template"}
                      </p>

                      {(template.excerpt ||
                        template.description ||
                        template.hero?.description ||
                        template.sections?.[0]?.content) && (
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-text-secondary">
                          {template.excerpt ||
                            template.description ||
                            template.hero?.description ||
                            template.sections?.[0]?.content}
                        </p>
                      )}
                    </div>

                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-amber-base transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm leading-6 text-text-secondary">
              More related templates will appear here.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
