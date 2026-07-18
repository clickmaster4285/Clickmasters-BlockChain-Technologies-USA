"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Clock3,
  LineChart,
  MousePointerClick,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

type ResultItem = {
  value: string;
  label: string;
  description: string;
  change?: string;
  trend?: "up" | "down";
  icon: React.ElementType;
};

type CaseStudyResultsProps = {
  eyebrow?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
  results?: ResultItem[];
};

const defaultResults: ResultItem[] = [
  {
    value: "184%",
    label: "Qualified Lead Growth",
    description:
      "Average increase in high-intent leads across selected growth campaigns.",
    change: "+62% vs target",
    trend: "up",
    icon: Users,
  },
  {
    value: "3.8×",
    label: "Return on Ad Spend",
    description:
      "Stronger paid-media efficiency through improved targeting and conversion.",
    change: "+1.4× increase",
    trend: "up",
    icon: BarChart3,
  },
  {
    value: "41%",
    label: "Lower Acquisition Cost",
    description:
      "Reduced customer acquisition costs through better funnel performance.",
    change: "-41% overall",
    trend: "down",
    icon: TrendingDown,
  },
  {
    value: "72%",
    label: "Conversion Improvement",
    description:
      "Higher landing-page and checkout conversion after experience optimization.",
    change: "+29% in 90 days",
    trend: "up",
    icon: MousePointerClick,
  },
];

export default function CaseStudyResults({
  eyebrow = "Results that matter",
  title = "Performance measured by",
  highlightedText = "real business outcomes.",
  description = "We focus on the metrics that directly influence growth, efficiency, customer acquisition, and long-term commercial performance.",
  results = defaultResults,
}: CaseStudyResultsProps) {
  return (
    <section className="relative overflow-hidden bg-[#091321] py-24 sm:py-28 lg:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-amber-400/[0.05] blur-[130px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/[0.05] blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:88px_88px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
              <Sparkles className="h-4 w-4" />
              {eyebrow}
            </div>

            <h2 className="mt-6 max-w-4xl text-4xl font-black leading-[1.04] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {title}{" "}
              <span className="text-amber-400">
                {highlightedText}
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-xl text-sm font-medium leading-7 text-[#8f9caf] sm:text-base">
              {description}
            </p>

            <div className="mt-5 flex items-center gap-3 text-xs font-bold text-[#7f8da1]">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              Based on completed client engagements
            </div>
          </div>
        </div>

        {/* Results grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {results.map((result, index) => {
            const Icon = result.icon;
            const TrendIcon =
              result.trend === "down"
                ? TrendingDown
                : TrendingUp;

            return (
              <article
                key={result.label}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                className="group animate-case-result-reveal relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#0d1929] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/25 hover:shadow-[0_34px_90px_rgba(0,0,0,0.36)] sm:p-7"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/[0.07] blur-[65px] transition-all duration-500 group-hover:bg-amber-400/[0.12]" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-amber-400 transition-all duration-300 group-hover:border-amber-400/20 group-hover:bg-amber-400/10">
                      <Icon className="h-5 w-5" />
                    </span>

                    {result.change && (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-black ${
                          result.trend === "down"
                            ? "border-blue-400/20 bg-blue-400/[0.07] text-blue-300"
                            : "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                        }`}
                      >
                        <TrendIcon className="h-3.5 w-3.5" />
                        {result.change}
                      </span>
                    )}
                  </div>

                  <p className="mt-8 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">
                    {result.value}
                  </p>

                  <h3 className="mt-4 text-base font-black text-white">
                    {result.label}
                  </h3>

                  <p className="mt-3 text-sm font-medium leading-6 text-[#8492a6]">
                    {result.description}
                  </p>

                  <div className="mt-7 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-transparent" />

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-[#647287]">
                      <LineChart className="h-3.5 w-3.5" />
                      Verified result
                    </div>

                    <ArrowUpRight className="h-4 w-4 text-[#627085] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-400" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom performance panel */}
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0c1727]/80 p-5 backdrop-blur-xl sm:p-7 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
                How we measure success
              </p>

              <h3 className="mt-4 text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                Every decision connects back to a measurable objective.
              </h3>

              <p className="mt-4 text-sm font-medium leading-7 text-[#8896aa]">
                From acquisition and conversion to retention and revenue, every
                project is tracked through clear performance indicators.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  icon: BarChart3,
                  title: "Clear KPIs",
                  description: "Defined before execution begins.",
                },
                {
                  icon: Clock3,
                  title: "Live Tracking",
                  description: "Performance monitored continuously.",
                },
                {
                  icon: BadgeCheck,
                  title: "Verified Impact",
                  description: "Results reported transparently.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.3rem] border border-white/[0.07] bg-white/[0.025] p-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-400">
                      <Icon className="h-4 w-4" />
                    </span>

                    <h4 className="mt-4 text-sm font-black text-white">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-xs font-medium leading-5 text-[#748196]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}