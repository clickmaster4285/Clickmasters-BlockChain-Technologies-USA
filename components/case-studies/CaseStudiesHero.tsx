"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Layers3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

type HeroStat = {
  value: string;
  label: string;
};

type FloatingProject = {
  client: string;
  category: string;
  result: string;
  resultLabel: string;
};

type CaseStudiesHeroProps = {
  eyebrow?: string;
  title?: string;
  highlightedText?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  totalProjects?: number;
  industriesCount?: number;
  averageGrowth?: string;
  clientSatisfaction?: string;
  featuredClients?: string[];
};

const floatingProjects: FloatingProject[] = [
  {
    client: "Nexora",
    category: "SaaS Growth",
    result: "+184%",
    resultLabel: "Qualified leads",
  },
  {
    client: "Urbanly",
    category: "E-commerce",
    result: "3.8×",
    resultLabel: "Return on ad spend",
  },
  {
    client: "Finora",
    category: "Fintech",
    result: "+127%",
    resultLabel: "Organic traffic",
  },
];

export default function CaseStudiesHero({
  eyebrow = "Proven client success",
  title = "Work that creates",
  highlightedText = "measurable impact.",
  description = "Explore how ClickMasters combines strategy, creativity, technology, and performance marketing to solve complex problems and produce meaningful business results.",
  primaryLabel = "Explore Case Studies",
  primaryHref = "#case-studies-grid",
  secondaryLabel = "Start a Project",
  secondaryHref = "/contact",
  totalProjects = 48,
  industriesCount = 12,
  averageGrowth = "146%",
  clientSatisfaction = "98%",
  featuredClients = [
    "NEXORA",
    "FINORA",
    "URBANLY",
    "VANTAGE",
    "APEX",
  ],
}: CaseStudiesHeroProps) {
  const stats: HeroStat[] = [
    {
      value: `${totalProjects}+`,
      label: "Projects Delivered",
    },
    {
      value: `${industriesCount}+`,
      label: "Industries Served",
    },
    {
      value: averageGrowth,
      label: "Average Growth",
    },
    {
      value: clientSatisfaction,
      label: "Client Satisfaction",
    },
  ];

  function scrollToCaseStudies() {
    const section = document.getElementById(
      "case-studies-grid"
    );

    if (!section) return;

    const top =
      section.getBoundingClientRect().top +
      window.scrollY -
      100;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#07101d] pt-28 sm:pt-32 lg:pt-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(245,158,11,0.13),transparent_27%),radial-gradient(circle_at_82%_40%,rgba(56,189,248,0.08),transparent_28%),radial-gradient(circle_at_55%_85%,rgba(99,102,241,0.07),transparent_30%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:84px_84px] [mask-image:linear-gradient(to_bottom,black,black_70%,transparent)]" />

        <div className="absolute left-1/2 top-[48%] h-[56rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

        <div className="absolute left-1/2 top-[48%] h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/[0.04]" />

        <div className="absolute -left-40 top-44 h-96 w-96 animate-case-hero-glow-one rounded-full bg-amber-400/[0.08] blur-[120px]" />

        <div className="absolute -right-44 top-1/3 h-96 w-96 animate-case-hero-glow-two rounded-full bg-blue-500/[0.07] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid min-h-[calc(100vh-9rem)] items-center gap-14 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:pb-20">
          {/* Content */}
          <div className="relative z-10">
            <div className="animate-case-hero-reveal inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
              <Sparkles className="h-4 w-4" />
              {eyebrow}
            </div>

            <h1
              className="animate-case-hero-reveal mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
              style={{
                animationDelay: "100ms",
              }}
            >
              {title}{" "}
              <span className="relative inline-block text-amber-400">
                {highlightedText}

                <span className="absolute -bottom-2 left-0 h-[5px] w-full origin-left animate-case-hero-line rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-transparent" />
              </span>
            </h1>

            <p
              className="animate-case-hero-reveal mt-8 max-w-2xl text-base font-medium leading-8 text-[#94a2b6] sm:text-lg"
              style={{
                animationDelay: "200ms",
              }}
            >
              {description}
            </p>

            <div
              className="animate-case-hero-reveal mt-9 flex flex-col gap-3 sm:flex-row"
              style={{
                animationDelay: "300ms",
              }}
            >
              <Link
                href={primaryHref}
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-black text-[#101827] shadow-[0_18px_45px_rgba(245,158,11,0.24)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_24px_60px_rgba(245,158,11,0.32)]"
              >
                {primaryLabel}

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href={secondaryHref}
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-7 py-3.5 text-sm font-black text-[#c8d2df] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-amber-400/[0.06] hover:text-amber-400"
              >
                {secondaryLabel}

                <BriefcaseBusiness className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
              </Link>
            </div>

            {/* Trust points */}
            <div
              className="animate-case-hero-reveal mt-8 flex flex-wrap gap-x-6 gap-y-3"
              style={{
                animationDelay: "400ms",
              }}
            >
              {[
                "Strategy-led execution",
                "Transparent reporting",
                "Measurable outcomes",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-bold text-[#8997aa]"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative min-h-[610px] lg:min-h-[700px]">
            <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] sm:h-[38rem] sm:w-[38rem]" />

            <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/[0.06] sm:h-[29rem] sm:w-[29rem]" />

            {/* Main dashboard */}
            <div className="animate-case-hero-dashboard absolute left-1/2 top-1/2 z-20 w-[88%] max-w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-white/[0.1] bg-[#0d1929]/95 p-5 shadow-[0_45px_130px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-400/[0.1] blur-[80px]" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#748298]">
                    Performance Overview
                  </p>

                  <h2 className="mt-2 text-lg font-black text-white">
                    Campaign Results
                  </h2>
                </div>

                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-400">
                  <BarChart3 className="h-5 w-5" />
                </span>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-[1.3rem] border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#6f7d91]">
                      Revenue
                    </span>

                    <TrendingUp className="h-3.5 w-3.5 text-emerald-300" />
                  </div>

                  <p className="mt-3 text-2xl font-black text-white">
                    +184%
                  </p>

                  <p className="mt-1 text-[10px] font-bold text-emerald-300">
                    Above target
                  </p>
                </div>

                <div className="rounded-[1.3rem] border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#6f7d91]">
                      Conversion
                    </span>

                    <Award className="h-3.5 w-3.5 text-amber-400" />
                  </div>

                  <p className="mt-3 text-2xl font-black text-white">
                    7.4%
                  </p>

                  <p className="mt-1 text-[10px] font-bold text-amber-400">
                    New record
                  </p>
                </div>
              </div>

              {/* Graph */}
              <div className="relative mt-4 overflow-hidden rounded-[1.4rem] border border-white/[0.07] bg-[#091321] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[9px] font-black uppercase tracking-[0.16em] text-[#6f7d91]">
                    Growth Trend
                  </p>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 text-[8px] font-black text-emerald-300">
                    LIVE
                  </span>
                </div>

                <div className="mt-8 flex h-32 items-end gap-2 sm:gap-3">
                  {[28, 42, 36, 58, 49, 73, 66, 92].map(
                    (height, index) => (
                      <div
                        key={`${height}-${index}`}
                        className="group/bar flex h-full flex-1 items-end"
                      >
                        <div
                          className="animate-case-hero-bar w-full origin-bottom rounded-t-md bg-gradient-to-t from-amber-500/35 to-amber-300 transition-all duration-300 group-hover/bar:brightness-125"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${
                              650 + index * 80
                            }ms`,
                          }}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="mt-3 flex justify-between text-[8px] font-bold uppercase tracking-[0.1em] text-[#536176]">
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between rounded-[1.2rem] border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-400/10 text-blue-300">
                    <Layers3 className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-xs font-black text-white">
                      Full-funnel strategy
                    </p>

                    <p className="mt-1 text-[9px] font-semibold text-[#69778b]">
                      Acquisition to retention
                    </p>
                  </div>
                </div>

                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              </div>
            </div>

            {/* Floating project cards */}
            {floatingProjects.map((project, index) => {
              const positionClasses = [
                "left-0 top-[8%] sm:left-[2%]",
                "right-0 top-[17%] sm:right-[1%]",
                "bottom-[5%] left-[8%] sm:left-[12%]",
              ];

              const animationClasses = [
                "animate-case-project-float-one",
                "animate-case-project-float-two",
                "animate-case-project-float-three",
              ];

              return (
                <div
                  key={project.client}
                  className={`absolute z-30 w-[185px] rounded-[1.3rem] border border-white/[0.09] bg-[#101d2f]/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl ${positionClasses[index]} ${animationClasses[index]}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[0.16em] text-amber-400">
                        {project.category}
                      </p>

                      <h3 className="mt-2 text-sm font-black text-white">
                        {project.client}
                      </h3>
                    </div>

                    <TrendingUp className="h-4 w-4 text-emerald-300" />
                  </div>

                  <p className="mt-4 text-xl font-black text-white">
                    {project.result}
                  </p>

                  <p className="mt-1 text-[9px] font-semibold text-[#77859a]">
                    {project.resultLabel}
                  </p>
                </div>
              );
            })}

            {/* Decorative badges */}
            <div className="animate-case-badge-float absolute bottom-[15%] right-[6%] z-30 hidden items-center gap-3 rounded-full border border-white/[0.09] bg-[#101d2f]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                <Award className="h-4 w-4" />
              </span>

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.13em] text-[#718096]">
                  Client Rating
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  4.9 / 5.0
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-20 grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0c1727]/75 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`animate-case-hero-reveal relative px-6 py-7 sm:px-8 ${
                index !== stats.length - 1
                  ? "border-b border-white/[0.07] sm:border-b-0 sm:border-r"
                  : ""
              }`}
              style={{
                animationDelay: `${550 + index * 90}ms`,
              }}
            >
              <p className="text-3xl font-black tracking-[-0.04em] text-white">
                {stat.value}
              </p>

              <p className="mt-2 text-[9px] font-black uppercase tracking-[0.17em] text-[#718096]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Featured clients */}
        <div className="relative z-20 flex flex-col items-center justify-between gap-6 py-10 lg:flex-row">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#657287]">
            Trusted by ambitious brands
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-end">
            {featuredClients.map((client) => (
              <span
                key={client}
                className="text-xs font-black tracking-[0.18em] text-[#68768a] transition-colors duration-300 hover:text-white"
              >
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll button */}
        <button
          type="button"
          onClick={scrollToCaseStudies}
          aria-label="Scroll to case studies"
          className="group absolute bottom-3 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] text-[#657287] transition-colors duration-300 hover:text-amber-400 xl:flex"
        >
          Explore work

          <span className="grid h-10 w-7 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025]">
            <ArrowDown className="h-3.5 w-3.5 animate-case-scroll-arrow" />
          </span>
        </button>
      </div>
    </section>
  );
}