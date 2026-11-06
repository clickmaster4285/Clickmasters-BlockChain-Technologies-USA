import Link from "next/link";
import type { TemplateCardData } from "@/lib/templates";

/*
 * Styling lives in app/styles.css (.tpl-card*, .mask-icon). The card renders
 * many times per listing page, so named classes, pseudo-element decorations
 * and CSS mask icons keep each page's HTML and RSC payload small.
 */
export default function TemplateCard({
  item,
  index,
}: {
  item: TemplateCardData;
  index: number;
}) {
  return (
    <Link href={`/templates/${item.slug}`} className="tpl-card">
      <div className="tpl-card__halo" />

      <article className="tpl-card__body">
        <div className="tpl-card__glow" />
        <div className="tpl-card__light" />

        <div className="tpl-card__content">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <span className="tpl-card__badge">
              <span className="mask-icon icon-sparkles" aria-hidden="true" />
              {item.badge || "Template"}
            </span>

            <span className="tpl-card__index">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Document preview */}
          <div className="relative mt-7 flex h-[150px] items-center justify-center" aria-hidden="true">
            <div className="tpl-card__sheet tpl-card__sheet--left" />
            <div className="tpl-card__sheet tpl-card__sheet--right" />

            <div className="tpl-card__doc">
              <div className="flex items-center justify-between">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-base/10 text-amber-base">
                  <span className="mask-icon icon-file-text h-4 w-4" />
                </span>
                <span className="h-2 w-8 rounded-full bg-amber-base/40" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-2 w-full rounded-full bg-silver-dim/55" />
                <div className="h-2 w-5/6 rounded-full bg-silver-dim/45" />
                <div className="h-2 w-3/4 rounded-full bg-silver-dim/45" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <div className="h-6 rounded-lg bg-bg-elevated" />
                <div className="h-6 rounded-lg bg-bg-elevated" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="mt-5">
            <span className="tpl-card__category">
              <span className="mask-icon icon-layers h-4 w-4 text-amber-base" aria-hidden="true" />
              {item.category || "Blockchain Template"}
            </span>
          </div>

          <h2 className="tpl-card__title">{item.title}</h2>

          <p className="mt-4 line-clamp-4 flex-1 text-sm leading-7 text-text-secondary">
            {item.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap gap-2">
            {item.format && (
              <span className="tpl-card__chip">
                <span className="mask-icon icon-file-text h-3.5 w-3.5 text-amber-base" aria-hidden="true" />
                {item.format}
              </span>
            )}

            <span className="tpl-card__chip">
              <span className="mask-icon icon-layers h-3.5 w-3.5 text-amber-base" aria-hidden="true" />
              {item.sections || "Complete"} sections
            </span>

            {item.readTime && (
              <span className="tpl-card__chip">
                <span className="mask-icon icon-clock h-3.5 w-3.5 text-amber-base" aria-hidden="true" />
                {item.readTime}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-between border-t border-border-default pt-5">
            <span className="text-sm font-black text-amber-base">View Template</span>

            <span className="tpl-card__arrow">
              <span className="mask-icon icon-arrow-up-right" aria-hidden="true" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
