import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  Clock3,
  Layers3,
  LineChart,
  Sparkles,
  Wrench,
} from "lucide-react";

import BackToTop from "@/components/ui/BackToTop";
import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import {
  CALCULATORS_BASE_PATH,
  CALCULATORS_SITE_URL,
  getCalculatorCards,
  getCalculatorResourceLabel,
  type CalculatorCardData,
  type CalculatorResourceType,
} from "@/lib/calculators";

/* =========================================================
   Metadata
========================================================= */

export const metadata: Metadata = {
  title: "Blockchain Calculators, Simulators & Planning Tools | ClickMasters",

  description:
    "Use free blockchain calculators, DeFi yield tools, gas estimators, tokenomics simulators, ROI calculators, templates, and smart contract planning guides.",

  keywords: [
    "blockchain calculator",
    "Ethereum gas calculator",
    "DeFi yield calculator",
    "tokenomics simulator",
    "NFT rarity calculator",
    "blockchain ROI calculator",
    "crypto exchange calculator",
    "smart contract tools",
  ],

  alternates: {
    canonical: CALCULATORS_BASE_PATH,
  },

  openGraph: {
    title: "Blockchain Calculators, Simulators & Planning Tools",
    description:
      "Free blockchain calculators, simulators, templates, checklists, and planning resources for Web3 projects.",
    type: "website",
    url: `${CALCULATORS_SITE_URL}${CALCULATORS_BASE_PATH}`,
  },

  twitter: {
    card: "summary_large_image",
    title: "Blockchain Calculators, Simulators & Planning Tools",
    description:
      "Estimate gas costs, DeFi returns, token economics, exchange revenue, and blockchain ROI.",
  },
};

/* =========================================================
   Page Constants
========================================================= */

const resourceOrder: CalculatorResourceType[] = [
  "calculator",
  "simulator",
  "template",
  "checklist",
  "guide",
];

const resourceDescriptions: Record<CalculatorResourceType, string> = {
  calculator:
    "Enter your assumptions and calculate estimated costs, returns, revenue, rarity, or business impact.",

  simulator:
    "Model multiple scenarios and understand how changes in supply, demand, emissions, and market conditions affect outcomes.",

  template:
    "Use a structured professional template to define requirements, scope, responsibilities, and project boundaries.",

  checklist:
    "Follow a practical preparation checklist to reduce mistakes, delays, and avoidable project costs.",

  guide:
    "Compare technical approaches, understand tradeoffs, and make better blockchain architecture decisions.",
};

const resourceSymbols: Record<CalculatorResourceType, string> = {
  calculator: "∑",
  simulator: "↗",
  template: "T",
  checklist: "✓",
  guide: "G",
};

/* =========================================================
   Main Page
========================================================= */

export default function CalculatorsPage() {
  const calculators = getCalculatorCards();

  const interactiveResources = calculators.filter(
    (calculator) => calculator.isInteractive,
  );

  const supportingResources = calculators.filter(
    (calculator) => !calculator.isInteractive,
  );

  const schemas = createPageSchemas(calculators);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.collectionPageSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumbSchema),
        }}
      />

      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/35 to-bg-base pb-24 pt-32">
        <PageBackground />

        <section className="site-container relative px-6">
          <HeroSection
            totalResources={calculators.length}
            interactiveCount={interactiveResources.length}
            supportingCount={supportingResources.length}
          />

          {interactiveResources.length > 0 && (
            <FeaturedSection calculators={interactiveResources.slice(0, 3)} />
          )}

          <ResourceLibrary calculators={calculators} />

          <BottomCta />
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

function PageBackground() {
  return (
    <>
      <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-amber-base/10 blur-[110px]" />

      <div className="pointer-events-none absolute right-[-12rem] top-[34rem] h-[30rem] w-[30rem] rounded-full bg-amber-base/10 blur-[110px]" />

      <div className="pointer-events-none absolute left-1/2 top-[72rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald-base/5 blur-[110px]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
    </>
  );
}

/* =========================================================
   Hero
========================================================= */

function HeroSection({
  totalResources,
  interactiveCount,
  supportingCount,
}: {
  totalResources: number;
  interactiveCount: number;
  supportingCount: number;
}) {
  return (
    <section className="group/hero relative overflow-hidden rounded-[2rem] border border-white/10 bg-bg-base/75 p-6 shadow-[0_40px_140px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:rounded-[2.75rem] md:p-10 lg:p-14">
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base to-transparent" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-amber-base/15 blur-[100px] transition-transform duration-1000 group-hover/hero:scale-110" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] rounded-full bg-emerald-base/5 blur-[100px]" />

      <div className="relative">
        <Breadcrumb />

        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base shadow-[0_0_30px_rgba(245,158,11,0.08)]">
              <Calculator className="h-4 w-4" />
              Blockchain Calculation Hub
            </div>

            <h1 className="mt-7 max-w-5xl font-display text-4xl font-black leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              Model blockchain costs,{" "}
              <span className="relative inline-block text-amber-base">
                returns and ROI
                <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-amber-base to-transparent" />
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-silver md:text-lg">
              Use practical calculators and simulators to estimate transaction
              fees, DeFi returns, token economics, exchange revenue, NFT rarity,
              and enterprise blockchain ROI before you build.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#calculator-library"
                className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-bg-base shadow-[0_15px_45px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(245,158,11,0.3)] sm:w-auto"
              >
                Explore calculators
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-silver backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/5 hover:text-amber-base sm:w-auto"
              >
                Discuss your project
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <StatCard
                value={formatCount(totalResources)}
                label="Total resources"
                icon={Layers3}
              />

              <StatCard
                value={formatCount(interactiveCount)}
                label="Interactive tools"
                icon={Wrench}
              />

              <StatCard
                value={formatCount(supportingCount)}
                label="Guides and templates"
                icon={CheckCircle2}
              />
            </div>
          </div>

          <HeroVisual totalResources={totalResources} />
        </div>
      </div>
    </section>
  );
}

function HeroVisual({ totalResources }: { totalResources: number }) {
  return (
    <div className="relative flex min-h-[390px] items-center justify-center">
      <div className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full bg-amber-base/10 blur-[90px]" />
      <div className="pointer-events-none absolute h-[350px] w-[350px] rounded-full border border-amber-base/15" />
      <div className="pointer-events-none absolute h-[285px] w-[285px] rounded-full border border-dashed border-white/10" />

      <span className="absolute left-[8%] top-[24%] grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-bg-base/80 text-amber-base shadow-xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:rotate-3">
        <BarChart3 className="h-5 w-5" />
      </span>

      <span className="absolute right-[4%] top-[20%] grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-bg-base/80 text-amber-base shadow-xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:-rotate-3">
        <LineChart className="h-5 w-5" />
      </span>

      <span className="absolute bottom-[12%] left-[14%] grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-bg-base/80 text-amber-base shadow-xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1 hover:rotate-3">
        <Sparkles className="h-5 w-5" />
      </span>

      <div className="relative z-10 w-full max-w-[330px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-7 shadow-[0_28px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-3xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
          <Calculator className="h-12 w-12" />
        </div>

        <h2 className="mt-7 text-center text-2xl font-black text-text-primary">
          Calculation Workspace
        </h2>

        <p className="mt-4 text-center text-sm leading-7 text-silver">
          Scenario models for gas fees, DeFi yield, token supply, exchange
          revenue, NFT rarity, and enterprise ROI.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className="text-2xl font-black text-amber-base">
              {formatCount(totalResources)}
            </p>
            <p className="mt-1 text-xs text-silver">Resources</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
            <p className="text-2xl font-black text-amber-base">Free</p>
            <p className="mt-1 text-xs text-silver">Free use</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Breadcrumb
========================================================= */

function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-sm text-silver"
    >
      <Link href="/" className="transition-colors hover:text-amber-base">
        Home
      </Link>

      <span aria-hidden="true">/</span>

      <span className="text-silver-light">Calculators</span>
    </nav>
  );
}

/* =========================================================
   Featured Calculators
========================================================= */

function FeaturedSection({
  calculators,
}: {
  calculators: CalculatorCardData[];
}) {
  return (
    <section className="pt-16">
      <div>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-amber-base">
              <span className="h-px w-8 bg-amber-base" />
              Popular calculators
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-text-primary sm:text-4xl">
              Start with the most useful models
            </h2>

            <p className="mt-4 text-base leading-8 text-silver">
              Quickly estimate blockchain operating costs, investment returns,
              and project economics using adjustable assumptions.
            </p>
          </div>

          <a
            href="#calculator-library"
            className="group inline-flex items-center gap-2 text-sm font-black text-amber-base transition hover:text-amber-light"
          >
            View complete library
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <FeaturedCalculatorCard
              key={calculator.slug}
              calculator={calculator}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Complete Resource Library
========================================================= */

function ResourceLibrary({
  calculators,
}: {
  calculators: CalculatorCardData[];
}) {
  return (
    <section
      id="calculator-library"
      className="scroll-mt-28 py-20 sm:py-24 lg:py-28"
    >
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-[0.28em] text-amber-base">
            Calculator library
          </span>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-text-primary sm:text-4xl md:text-5xl">
            Explore all blockchain resources
          </h2>

          <p className="mt-5 text-base leading-8 text-silver">
            Choose a calculator, simulator, template, checklist, or technical
            decision guide based on your project needs.
          </p>
        </div>

        {calculators.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-16 space-y-20">
            {resourceOrder.map((resourceType) => {
              const matchingResources = calculators.filter(
                (calculator) => calculator.resourceType === resourceType,
              );

              if (matchingResources.length === 0) {
                return null;
              }

              return (
                <ResourceGroup
                  key={resourceType}
                  resourceType={resourceType}
                  calculators={matchingResources}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function ResourceGroup({
  resourceType,
  calculators,
}: {
  resourceType: CalculatorResourceType;
  calculators: CalculatorCardData[];
}) {
  const title =
    resourceType === "calculator"
      ? "Interactive Calculators"
      : resourceType === "simulator"
        ? "Scenario Simulators"
        : `${getCalculatorResourceLabel(resourceType)} Resources`;

  return (
    <section aria-labelledby={`resource-${resourceType}`}>
      <div className="flex flex-col gap-5 border-b border-white/10 pb-7 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-sm font-black text-amber-base shadow-[0_12px_30px_rgba(245,158,11,0.08)]">
              {resourceSymbols[resourceType]}
            </span>

            <h3
              id={`resource-${resourceType}`}
              className="text-2xl font-black tracking-tight text-text-primary sm:text-3xl"
            >
              {title}
            </h3>
          </div>

          <p className="mt-4 text-sm leading-7 text-silver sm:text-base">
            {resourceDescriptions[resourceType]}
          </p>
        </div>

        <p className="shrink-0 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 text-sm font-bold text-silver">
          {calculators.length}{" "}
          {calculators.length === 1 ? "resource" : "resources"}
        </p>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {calculators.map((calculator) => (
          <CalculatorCard key={calculator.slug} calculator={calculator} />
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   Featured Card
========================================================= */

function FeaturedCalculatorCard({
  calculator,
}: {
  calculator: CalculatorCardData;
}) {
  return (
    <Link
      href={calculator.href}
      className="group relative block h-full rounded-[2rem] p-[1px] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.015]"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-white/5 to-white/10 transition-all duration-500 group-hover:from-amber-base/80 group-hover:via-amber-base/10 group-hover:to-amber-base/40" />
      <div className="pointer-events-none absolute inset-4 rounded-[2rem] bg-amber-base/0 blur-3xl transition-all duration-500 group-hover:bg-amber-base/15" />

      <article className="relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-gradient-to-br from-bg-base via-bg-base to-surface/80 p-7 shadow-[0_22px_70px_rgba(0,0,0,0.14)] transition-all duration-500 group-hover:shadow-[0_35px_100px_rgba(0,0,0,0.18)]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-amber-base/10 blur-3xl transition-all duration-700 group-hover:right-[-2rem] group-hover:top-[-2rem] group-hover:scale-125 group-hover:bg-amber-base/20" />
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-amber-base to-transparent transition-transform duration-700 group-hover:scale-x-100" />

        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base transition-all duration-300 group-hover:border-amber-base/40 group-hover:bg-amber-base/15">
              <Sparkles className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
              {getCalculatorResourceLabel(calculator.resourceType)}
            </span>

            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-lg font-black text-amber-base transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base group-hover:shadow-[0_18px_45px_rgba(245,158,11,0.25)]">
              {resourceSymbols[calculator.resourceType]}
            </span>
          </div>

          <h3 className="mt-10 text-2xl font-black leading-tight text-text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-base">
            {calculator.title}
          </h3>

          <p className="mt-4 line-clamp-4 flex-1 text-sm leading-7 text-silver">
            {calculator.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {calculator.credibility.slice(0, 2).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] font-bold text-silver transition-colors duration-300 group-hover:border-amber-base/20 group-hover:bg-amber-base/5"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-silver">
              <Clock3 className="h-3.5 w-3.5 text-amber-base" />
              {calculator.readTime}
            </span>

            <span className="inline-flex items-center gap-2 text-sm font-black text-amber-base">
              Open calculator
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/* =========================================================
   Standard Calculator Card
========================================================= */

function CalculatorCard({ calculator }: { calculator: CalculatorCardData }) {
  const actionLabel = calculator.isInteractive
    ? calculator.resourceType === "simulator"
      ? "Open simulator"
      : "Open calculator"
    : calculator.resourceType === "template"
      ? "View template"
      : calculator.resourceType === "checklist"
        ? "View checklist"
        : "Read guide";

  return (
    <Link
      href={calculator.href}
      className="group relative flex min-h-[350px] flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-surface/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:bg-bg-base hover:shadow-[0_28px_80px_rgba(0,0,0,0.14)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/0 blur-3xl transition-all duration-700 group-hover:bg-amber-base/15 group-hover:scale-125" />
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-amber-base to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="flex items-center justify-between gap-4">
        <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-sm font-black text-amber-base transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base">
          {resourceSymbols[calculator.resourceType]}
        </span>

        <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-bold text-silver transition-colors group-hover:border-amber-base/25 group-hover:text-amber-base">
          {getCalculatorResourceLabel(calculator.resourceType)}
        </span>
      </div>

      <h4 className="relative mt-8 text-xl font-black leading-snug text-text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-base">
        {calculator.title}
      </h4>

      <p className="relative mt-4 line-clamp-4 text-sm leading-7 text-silver">
        {calculator.excerpt}
      </p>

      {calculator.credibility.length > 0 && (
        <div className="relative mt-6 flex flex-wrap gap-2">
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

      <div className="relative mt-auto flex items-center justify-between pt-7">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-silver">
          <Clock3 className="h-3.5 w-3.5 text-amber-base" />
          {calculator.readTime}
        </span>

        <span className="inline-flex items-center gap-2 text-sm font-black text-amber-base">
          {actionLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   Empty State
========================================================= */

function EmptyState() {
  return (
    <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] border border-white/10 bg-surface/80 px-6 py-14 text-center shadow-[0_24px_80px_rgba(0,0,0,0.12)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-xl font-black text-amber-base">
        ∑
      </div>

      <h3 className="mt-6 text-xl font-black text-text-primary">
        No calculators are available yet
      </h3>

      <p className="mt-3 text-sm leading-7 text-silver">
        Add calculator objects to{" "}
        <code className="rounded bg-amber-base/10 px-2 py-1 text-amber-base">
          data/calculators.ts
        </code>{" "}
        and they will appear here automatically.
      </p>
    </div>
  );
}

/* =========================================================
   Bottom CTA
========================================================= */

function BottomCta() {
  return (
    <section className="pt-4">
      <div>
        <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-amber-base via-amber-light to-amber-base px-6 py-14 text-bg-base shadow-[0_28px_90px_rgba(0,0,0,0.22)] sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-black/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-bg-base/10 bg-bg-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] backdrop-blur-sm">
                <Wrench className="h-4 w-4" />
                Need a custom model?
              </span>

              <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl">
                Turn estimates into a validated blockchain business case
              </h2>

              <p className="mt-5 text-base leading-8 text-bg-base/80">
                Our blockchain specialists can help you validate assumptions,
                calculate realistic costs, model project ROI, and create a
                practical implementation strategy.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-bg-base px-7 py-3 text-sm font-black text-amber-base shadow-[0_14px_35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.3)]"
            >
              Book a free strategy call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Shared Components
========================================================= */

function StatCard({
  value,
  label,
  icon: Icon,
}: {
  value: string;
  label: string;
  icon: typeof Layers3;
}) {
  return (
    <div className="group/stat relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-base/30 hover:bg-amber-base/[0.06]">
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-amber-base/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover/stat:opacity-100" />

      <div className="relative flex items-center justify-between">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-500 group-hover/stat:rotate-6 group-hover/stat:scale-110">
          <Icon className="h-5 w-5" />
        </span>

        <p className="font-mono text-2xl font-black text-amber-base">{value}</p>
      </div>

      <p className="relative mt-4 text-sm font-bold text-silver">{label}</p>
    </div>
  );
}

/* =========================================================
   Schema
========================================================= */

function createPageSchemas(calculators: CalculatorCardData[]) {
  const pageUrl = `${CALCULATORS_SITE_URL}${CALCULATORS_BASE_PATH}`;

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blockchain Calculators, Simulators & Planning Tools",
    description:
      "A collection of free blockchain calculators, simulators, templates, checklists, and technical planning resources.",
    url: pageUrl,

    mainEntity: {
      "@type": "ItemList",
      numberOfItems: calculators.length,

      itemListElement: calculators.map((calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: calculator.title,
        url: `${CALCULATORS_SITE_URL}${calculator.href}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: CALCULATORS_SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: pageUrl,
      },
    ],
  };

  return {
    collectionPageSchema,
    breadcrumbSchema,
  };
}

/* =========================================================
   Utility
========================================================= */

function formatCount(value: number): string {
  return String(value).padStart(2, "0");
}
