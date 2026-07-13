import type { CostSection } from "@/lib/cost-type";
import type { CSSProperties } from "react";
import { cleanInlineMarks } from "@/lib/parse-cost-content";
import SectionShell from "@/components/cost/SectionShell";
import RevealOnScroll from "@/components/cost/RevealOnScroll";
import RevealGroup from "@/components/cost/RevealGroup";

function groupByDash(labels: string[], bullets: string[]) {
  const groups: { label: string; items: string[] }[] = labels.map((label) => ({ label, items: [] }));
  let idx = -1;
  for (const raw of bullets) {
    if (/^-\s+/.test(raw)) idx = Math.min(idx + 1, groups.length - 1);
    if (idx < 0) idx = 0;
    groups[idx]?.items.push(raw.replace(/^-\s+/, ""));
  }
  return groups.filter((g) => g.items.length > 0);
}

export function isChecklistSection(labels: string[]) {
  return labels.some((l) => /includes:?$/i.test(l)) && labels.some((l) => /red flags?/i.test(l));
}

/**
 * Checklist section — animation identity: BLAST-IN CHECKLIST
 * Each ✓/✕ line item detonates into place with a small rotation settle,
 * cascading item-by-item within each column via --item-i.
 */
export default function ChecklistSection({
  section,
  index,
}: {
  section: CostSection;
  index: number;
}) {
  const h2 = section.content.match(/#{1,3}\s*H2:\s*(.+)/)?.[1]?.trim();
  const labels = Array.from(section.content.matchAll(/\*\*([^*][^*]*?)\*(?!\*)/g))
    .map((m) => m[1].trim())
    .filter((l) => !/^H[12]:/.test(l));
  const groups = groupByDash(labels, section.bullets ?? []);

  const good = groups[0];
  const bad = groups[1];

  return (
    <SectionShell tone="base" eyebrow={`0${index}`} className="bg-cross-dots">
      <div className="max-w-5xl">
        {h2 && (
          <RevealOnScroll effect="slide-left">
            <h2 className="text-balance font-display text-2xl font-semibold text-text-primary md:text-3xl">
              {cleanInlineMarks(h2)}
            </h2>
          </RevealOnScroll>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {good && (
            <RevealGroup className="rounded-2xl border border-emerald-border bg-emerald-glow p-6">
              <h3 className="font-display text-base font-semibold text-emerald-dim">
                {cleanInlineMarks(good.label.replace(/:$/, ""))}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {good.items.map((it, i) => (
                  <li
                    key={i}
                    className="reveal-checklist-item flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                    style={{ "--item-i": i } as CSSProperties}
                  >
                    <span className="mt-0.5 shrink-0 text-emerald-base">✓</span>
                    {cleanInlineMarks(it)}
                  </li>
                ))}
              </ul>
            </RevealGroup>
          )}
          {bad && (
            <RevealGroup className="rounded-2xl border border-red-600/20 bg-red-600/5 p-6">
              <h3 className="font-display text-base font-semibold text-red-700">
                {cleanInlineMarks(bad.label.replace(/:$/, ""))}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {bad.items.map((it, i) => (
                  <li
                    key={i}
                    className="reveal-checklist-item flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                    style={{ "--item-i": i } as CSSProperties}
                  >
                    <span className="mt-0.5 shrink-0 text-red-600">✕</span>
                    {cleanInlineMarks(it)}
                  </li>
                ))}
              </ul>
            </RevealGroup>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
