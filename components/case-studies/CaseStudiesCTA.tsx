"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type CaseStudiesCTAProps = {
  eyebrow?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CaseStudiesCTA({
  eyebrow = "Your success story could be next",
  title = "Ready to create",
  highlightedText = "measurable growth?",
  description = "Tell us what you are trying to achieve. We will help you shape the strategy, build the right execution plan, and turn your next project into a result worth showcasing.",
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
  secondaryLabel = "Explore Our Services",
  secondaryHref = "/services",
}: CaseStudiesCTAProps) {
  return (
    <section className="relative overflow-hidden bg-[#07101d] px-4 py-24 sm:px-6 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.08] blur-[150px]" />

        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.05] blur-[130px]" />

        <div className="absolute -right-40 top-0 h-80 w-80 rounded-full bg-purple-500/[0.04] blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:88px_88px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.3rem] border border-white/[0.09] bg-[#0c1727]/95 px-5 py-14 shadow-[0_45px_140px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:px-8 sm:py-16 lg:rounded-[3rem] lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/[0.09] blur-[120px]" />

          <div className="pointer-events-none absolute -bottom-44 -left-32 h-96 w-96 rounded-full bg-blue-500/[0.06] blur-[140px]" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_30%)]" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.74fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                <Sparkles className="h-4 w-4" />
                {eyebrow}
              </div>

              <h2 className="mt-7 max-w-4xl text-4xl font-black leading-[1.03] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                {title}{" "}
                <span className="text-amber-400">
                  {highlightedText}
                </span>
              </h2>

              <p className="mt-7 max-w-2xl text-sm font-medium leading-7 text-[#94a2b6] sm:text-base sm:leading-8">
                {description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primaryHref}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-black text-[#111827] shadow-[0_20px_50px_rgba(245,158,11,0.23)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_26px_65px_rgba(245,158,11,0.32)]"
                >
                  {primaryLabel}

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href={secondaryHref}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-sm font-black text-[#c7d1df] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-amber-400/[0.06] hover:text-amber-400"
                >
                  {secondaryLabel}

                  <BriefcaseBusiness className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {[
                  "Clear strategy",
                  "Transparent process",
                  "Measurable results",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-xs font-bold text-[#8b98ab]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[1.8rem] border border-white/[0.08] bg-[#091321]/85 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.3)] sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#6f7d91]">
                      Typical engagement
                    </p>

                    <h3 className="mt-2 text-xl font-black text-white">
                      From challenge to impact
                    </h3>
                  </div>

                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.08] text-amber-400">
                    <BadgeCheck className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    {
                      number: "01",
                      title: "Discovery",
                      description:
                        "We understand your goals, market, and current challenges.",
                    },
                    {
                      number: "02",
                      title: "Strategy",
                      description:
                        "We define the priorities, roadmap, and success metrics.",
                    },
                    {
                      number: "03",
                      title: "Execution",
                      description:
                        "We build, launch, test, and improve the complete system.",
                    },
                    {
                      number: "04",
                      title: "Growth",
                      description:
                        "We measure outcomes and identify the next opportunities.",
                    },
                  ].map((step) => (
                    <div
                      key={step.number}
                      className="group flex gap-4 rounded-[1.2rem] border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-amber-400/20 hover:bg-amber-400/[0.04]"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-[#0d1929] text-[10px] font-black text-amber-400">
                        {step.number}
                      </span>

                      <div>
                        <h4 className="text-sm font-black text-white">
                          {step.title}
                        </h4>

                        <p className="mt-1 text-xs font-medium leading-5 text-[#758398]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-5 -right-3 hidden rounded-[1.2rem] border border-emerald-400/20 bg-[#0b1724]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/[0.09] text-emerald-300">
                    <BadgeCheck className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#718096]">
                      Client focused
                    </p>

                    <p className="mt-1 text-xs font-black text-white">
                      Built around your goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}