import type { CostSection } from "@/lib/cost-type";
import { parseCostContent, cleanInlineMarks } from "@/lib/parse-cost-content";
import SectionShell from "@/components/cost/SectionShell";
import RevealOnScroll from "@/components/cost/RevealOnScroll";

/**
 * Generic prose fallback — animation identity: FLOAT-RISE
 * Drifts up from below and settles into a slow idle float, editorial
 * drop-cap styling, with a soft floating decorative orb unique to this
 * section type only.
 */
export default function GenericSection({
  section,
  index,
}: {
  section: CostSection;
  index: number;
}) {
  const parsed = parseCostContent(section.content, section.bullets ?? []);
  const allBullets = [...parsed.labelBlocks.map((b) => `${b.label}: ${b.description}`), ...parsed.plainBullets];

  return (
    <SectionShell tone="elevated" eyebrow={`0${index}`} className="relative overflow-hidden">
      <div className="pointer-events-none absolute right-[6%] top-10 h-40 w-40 rounded-full bg-emerald-glow blur-3xl animate-float-slow" />
      <div className="max-w-3xl">
        {parsed.h2 && (
          <RevealOnScroll effect="float-rise">
            <h2 className="text-balance font-display text-2xl font-semibold text-text-primary md:text-3xl">
              {parsed.h2}
            </h2>
          </RevealOnScroll>
        )}
        {parsed.intro && (
          <RevealOnScroll effect="float-rise" delay={100}>
            <p className="first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-semibold first-letter:text-amber-base mt-5 text-pretty text-[15px] leading-[1.8] text-text-secondary md:text-base">
              {cleanInlineMarks(parsed.intro)}
            </p>
          </RevealOnScroll>
        )}
        {allBullets.length > 0 && (
          <RevealOnScroll effect="slide-left" delay={180}>
            <ul className="mt-6 space-y-3 border-l-2 border-amber-border pl-5">
              {allBullets.map((b, i) => (
                <li key={i} className="text-sm leading-relaxed text-text-secondary">
                  {cleanInlineMarks(b)}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        )}
      </div>
    </SectionShell>
  );
}
