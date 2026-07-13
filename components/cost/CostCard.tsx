import { Link } from "next-view-transitions";
import type { CostCard as CostCardType } from "@/lib/cost-type";
import { cleanInlineMarks } from "@/lib/parse-cost-content";
import RevealOnScroll from "@/components/cost/RevealOnScroll";

const ACCENTS = [
  "from-amber-base/15 to-transparent",
  "from-emerald-base/15 to-transparent",
];

export default function CostCard({ card, index }: { card: CostCardType; index: number }) {
  const cleanTitle = card.title.split("|")[0].trim();
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <RevealOnScroll effect="pop-bounce" delay={(index % 6) * 90}>
      <div className="flip-card-scene h-full">
        <Link
          href={`/cost/${card.slug}`}
          className="flip-card-inner card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border-default bg-bg-surface p-6 focus-visible:outline-2 focus-visible:outline-amber-base"
          style={{ viewTransitionName: `cost-card-${card.slug}` }}
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-border-default px-2.5 py-1 text-[10px] uppercase tracking-wide text-text-muted">
              {card.category}
            </span>
          </div>

          <h3 className="relative mt-5 text-left font-display text-xl font-semibold leading-snug text-text-primary">
            {cleanTitle}
          </h3>

          <p className="relative mt-3 line-clamp-3 flex-1 text-left text-sm leading-relaxed text-text-secondary">
            {cleanInlineMarks(card.description)}
          </p>

          <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-amber-base">
            See pricing
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 bg-gradient-primary transition-[width] duration-500 group-hover:w-full" />
        </Link>
      </div>
    </RevealOnScroll>
  );
}
