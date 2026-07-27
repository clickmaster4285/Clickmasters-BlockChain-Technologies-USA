import Link from "next/link";
import { ArrowRight, Clock3, Sparkles } from "lucide-react";

import {
  getCalculatorResourceLabel,
  type CalculatorCardData,
} from "@/lib/calculators";

type CalculatorRelatedProps = {
  calculators: CalculatorCardData[];
  title?: string;
};

export default function CalculatorRelated({
  calculators,
  title = "Related Resources",
}: CalculatorRelatedProps) {
  if (calculators.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-white/10 pt-14 sm:pt-16">
      <div>
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-amber-base">
            <span className="h-px w-8 bg-amber-base" />
            Continue Learning
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-text-primary sm:text-4xl">
            {title}
          </h2>

          <p className="mt-4 text-base leading-8 text-silver">
            Explore additional blockchain calculators, simulators, templates,
            and technical resources related to this topic.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {calculators.map((calculator) => (
            <RelatedCard key={calculator.slug} calculator={calculator} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Related Card
========================================================= */

function RelatedCard({ calculator }: { calculator: CalculatorCardData }) {
  return (
    <Link
      href={calculator.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:bg-bg-base hover:shadow-[0_28px_80px_rgba(0,0,0,0.14)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/0 blur-3xl transition-all duration-700 group-hover:bg-amber-base/15 group-hover:scale-125" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-amber-base to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
            <Sparkles className="h-3.5 w-3.5" />
            {getCalculatorResourceLabel(calculator.resourceType)}
          </span>

          <ResourceIcon type={calculator.resourceType} />
        </div>

        <h3 className="mt-7 text-xl font-black leading-snug text-text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-base">
          {calculator.title}
        </h3>

        <p className="mt-4 line-clamp-4 text-sm leading-7 text-silver">
          {calculator.excerpt}
        </p>

        {calculator.credibility.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {calculator.credibility.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] font-bold text-silver"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold text-silver">
              <Clock3 className="h-3.5 w-3.5 text-amber-base" />
              {calculator.readTime}
            </p>

            {calculator.formattedDate && (
              <p className="mt-1 text-xs text-silver/70">
                {calculator.formattedDate}
              </p>
            )}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-black text-amber-base">
            Open
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   Resource Icon
========================================================= */

function ResourceIcon({ type }: { type: CalculatorCardData["resourceType"] }) {
  const config = {
    calculator: {
      symbol: "∑",
    },
    simulator: {
      symbol: "↗",
    },
    template: {
      symbol: "T",
    },
    checklist: {
      symbol: "✓",
    },
    guide: {
      symbol: "G",
    },
  };

  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-sm font-black text-amber-base transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base">
      {config[type].symbol}
    </span>
  );
}
