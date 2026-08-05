import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Calculator,
  Clock3,
  Sparkles,
  Wrench,
  ShieldCheck,
  Zap,
} from "lucide-react";

import {
  getCalculatorResourceLabel,
  getCalculatorResourceDescription,
  type CalculatorData,
  type CalculatorResourceType,
} from "@/lib/calculators";

type CalculatorHeroProps = {
  calculator: CalculatorData;
  resourceType: CalculatorResourceType;
  isInteractive: boolean;
};

export default function CalculatorHero({
  calculator,
  resourceType,
  isInteractive,
}: CalculatorHeroProps) {
  const resourceLabel = getCalculatorResourceLabel(resourceType);

  const actionLabel = getPrimaryActionLabel(resourceType, isInteractive);

  return (
    <section className="group/hero relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-bg-base/75 p-6 shadow-[0_35px_120px_rgba(0,0,0,0.16)] backdrop-blur-xl md:p-12">
      <HeroBackground />

      <div className="relative">
        <Breadcrumb title={calculator.title} />

        <div className="grid items-center gap-12 lg:grid-cols-[1fr_420px]">
          <div>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Calculators
            </Link>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                <Calculator className="h-4 w-4" />
                {calculator.hero.badge || resourceLabel}
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
                <Wrench className="h-4 w-4 text-amber-base" />
                {resourceLabel}
              </span>

              {isInteractive && (
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-base/20 bg-emerald-base/10 px-4 py-2 text-xs font-bold text-emerald-base">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-base" />
                  Interactive
                </span>
              )}
            </div>

            <h1 className="mt-8 max-w-5xl font-display text-4xl font-black leading-tight tracking-tight text-text-primary md:text-6xl">
              {calculator.hero.title || calculator.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-silver md:text-lg">
              {calculator.hero.description || calculator.excerpt}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <HeroFeature
                icon={ShieldCheck}
                title="Practical"
                description="Assumptions built for real project planning."
              />
              <HeroFeature
                icon={Zap}
                title="Fast"
                description="Get working estimates without spreadsheet setup."
              />
              <HeroFeature
                icon={Sparkles}
                title="Decision Ready"
                description="Use outputs in scoping and budget reviews."
              />
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={isInteractive ? "#calculator" : "#resource-content"}
                className="group/button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3 text-sm font-black text-bg-base shadow-[0_15px_45px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(245,158,11,0.3)] sm:w-auto"
              >
                {actionLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>

              <Link
                href="/contact"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-silver transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/5 hover:text-amber-base sm:w-auto"
              >
                Discuss your project
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <MetaItem label="By" value={calculator.author} />

              <MetaItem
                label="Reading time"
                value={calculator.readTime}
                icon={Clock3}
              />

              {calculator.date && (
                <MetaItem
                  label="Published"
                  value={formatDate(calculator.date)}
                  icon={CalendarDays}
                />
              )}
            </div>
          </div>

          <HeroSummaryCard
            calculator={calculator}
            resourceType={resourceType}
            isInteractive={isInteractive}
          />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Background
========================================================= */

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl transition-transform duration-1000 group-hover/hero:scale-110" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl" />
      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base to-transparent" />
    </div>
  );
}

/* =========================================================
   Breadcrumb
========================================================= */

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex min-w-0 flex-wrap items-center gap-2 text-sm text-silver"
    >
      <Link href="/" className="transition-colors hover:text-amber-base">
        Home
      </Link>

      <span aria-hidden="true" className="text-silver/50">
        /
      </span>

      <Link
        href="/calculators"
        className="transition-colors hover:text-amber-base"
      >
        Calculators
      </Link>

      <span aria-hidden="true" className="text-silver/50">
        /
      </span>

      <span
        className="min-w-0 max-w-[260px] truncate text-silver-light sm:max-w-[420px]"
        title={title}
      >
        {title}
      </span>
    </nav>
  );
}

/* =========================================================
   Summary Card
========================================================= */

function HeroSummaryCard({
  calculator,
  resourceType,
  isInteractive,
}: CalculatorHeroProps) {
  const resourceLabel = getCalculatorResourceLabel(resourceType);

  return (
    <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.14)] backdrop-blur-xl">
      <div className="pointer-events-none absolute right-[-90px] top-[-90px] h-56 w-56 rounded-full bg-amber-base/10 blur-[80px]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
              {resourceLabel}
            </p>

            <h2 className="mt-3 text-xl font-black text-text-primary">
              What this resource covers
            </h2>
          </div>

          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-lg font-black text-amber-base">
            {getResourceSymbol(resourceType)}
          </span>
        </div>

        <p className="mt-5 text-sm leading-7 text-silver">
          {getCalculatorResourceDescription(resourceType)}
        </p>

        {calculator.credibility.length > 0 && (
          <ul className="mt-7 space-y-3">
            {calculator.credibility.slice(0, 4).map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-silver"
              >
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-base/10 text-[11px] font-black text-amber-base">
                  ✓
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-silver">Availability</span>

            <span className="inline-flex items-center gap-2 text-sm font-black text-amber-base">
              <span className="h-2 w-2 rounded-full bg-amber-base" />
              Free to use
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="text-sm text-silver">Format</span>

            <span className="text-sm font-bold text-text-secondary">
              {isInteractive ? "Interactive web tool" : "Structured resource"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   Meta
========================================================= */

function HeroFeature({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}) {
  return (
    <div className="group/feature relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-base/30 hover:bg-amber-base/[0.06]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-amber-base/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover/feature:opacity-100" />

      <div className="relative">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-500 group-hover/feature:rotate-6 group-hover/feature:scale-110">
          <Icon className="h-5 w-5" />
        </span>

        <h3 className="mt-4 text-sm font-black text-text-primary">{title}</h3>

        <p className="mt-2 text-xs leading-5 text-silver">{description}</p>
      </div>
    </div>
  );
}

function MetaItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof Clock3;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-semibold text-silver">
      {Icon && <Icon className="h-3.5 w-3.5 text-amber-base" />}
      <span>{label}</span>

      <span className="font-bold text-text-secondary">{value}</span>
    </span>
  );
}

/* =========================================================
   Utilities
========================================================= */

function getPrimaryActionLabel(
  resourceType: CalculatorResourceType,
  isInteractive: boolean,
): string {
  if (isInteractive) {
    if (resourceType === "simulator") {
      return "Open simulator";
    }

    return "Use calculator";
  }

  const labels: Record<
    Exclude<CalculatorResourceType, "calculator" | "simulator">,
    string
  > = {
    template: "View template",
    checklist: "View checklist",
    guide: "Read decision guide",
  };

  if (
    resourceType === "template" ||
    resourceType === "checklist" ||
    resourceType === "guide"
  ) {
    return labels[resourceType];
  }

  return "View resource";
}

function getResourceSymbol(resourceType: CalculatorResourceType): string {
  const symbols: Record<CalculatorResourceType, string> = {
    calculator: "∑",
    simulator: "↗",
    template: "T",
    checklist: "✓",
    guide: "G",
  };

  return symbols[resourceType];
}

function formatDate(value: string): string {
  const parsedDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}
