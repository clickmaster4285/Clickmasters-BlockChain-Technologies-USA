"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Layers3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

type FeaturedCaseStudyProps = {
  slug?: string;
  client?: string;
  title?: string;
  description?: string;
  image?: string;
  industry?: string;
  service?: string;
  duration?: string;
  result?: string;
  resultLabel?: string;
  tags?: string[];
};

export default function FeaturedCaseStudy({
  slug = "nexora-saas-growth",
  client = "Nexora",
  title = "Transforming a SaaS platform into a predictable growth engine.",
  description = "We rebuilt Nexora’s acquisition strategy, redesigned its conversion journey, and launched a performance-led growth system that increased qualified leads while reducing acquisition costs.",
  image = "/images/case-studies/nexora-featured.jpg",
  industry = "SaaS",
  service = "Growth Strategy",
  duration = "16 Weeks",
  result = "+184%",
  resultLabel = "Qualified Leads",
  tags = [
    "Conversion Strategy",
    "Paid Acquisition",
    "Landing Pages",
    "Analytics",
  ],
}: FeaturedCaseStudyProps) {
  const projectDetails = [
    {
      label: "Industry",
      value: industry,
      icon: Layers3,
    },
    {
      label: "Service",
      value: service,
      icon: Sparkles,
    },
    {
      label: "Timeline",
      value: duration,
      icon: CalendarDays,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#07101d] py-24 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-amber-400/[0.055] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.19em] text-amber-400">
              <Sparkles className="h-4 w-4" />
              Featured Case Study
            </div>

            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              Strategy, creativity, and execution working as{" "}
              <span className="text-amber-400">one system.</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm font-medium leading-7 text-[#8e9caf] sm:text-base">
            A closer look at how focused strategy and disciplined execution
            created measurable commercial impact.
          </p>
        </div>

        {/* Featured card */}
        <article className="group relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0c1727] shadow-[0_40px_120px_rgba(0,0,0,0.38)] lg:rounded-[2.6rem]">
          <div className="pointer-events-none absolute -right-36 -top-36 h-96 w-96 rounded-full bg-amber-400/[0.08] blur-[120px]" />

          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Image side */}
            <div className="relative min-h-[430px] overflow-hidden sm:min-h-[540px] lg:min-h-[720px]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07101d] via-transparent to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0c1727]/80" />

              <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-7 sm:top-7">
                <span className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                  {industry}
                </span>

                <span className="rounded-full bg-amber-400 px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#111827]">
                  Featured
                </span>
              </div>

              {/* Result floating card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/15 bg-[#081321]/80 p-5 shadow-2xl backdrop-blur-2xl sm:bottom-7 sm:left-7 sm:right-auto sm:w-[280px]">
                <div className="flex items-center gap-2 text-emerald-300">
                  <TrendingUp className="h-4 w-4" />

                  <span className="text-[9px] font-black uppercase tracking-[0.16em]">
                    Primary Result
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-4xl font-black tracking-[-0.04em] text-white">
                      {result}
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#8d9aae]">
                      {resultLabel}
                    </p>
                  </div>

                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300">
                    <TrendingUp className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="relative flex flex-col justify-center p-6 sm:p-9 lg:p-12 xl:p-14">
              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                  {client}
                </p>

                <h3 className="mt-6 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl xl:text-5xl">
                  {title}
                </h3>

                <p className="mt-6 text-sm font-medium leading-7 text-[#8f9caf] sm:text-base sm:leading-8">
                  {description}
                </p>

                {/* Tags */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[9px] font-bold text-[#9aa7b9]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Details */}
                <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {projectDetails.map((detail) => {
                    const Icon = detail.icon;

                    return (
                      <div
                        key={detail.label}
                        className="rounded-[1.25rem] border border-white/[0.07] bg-white/[0.025] p-4"
                      >
                        <div className="flex items-center gap-2 text-[#718096]">
                          <Icon className="h-4 w-4" />

                          <p className="text-[8px] font-black uppercase tracking-[0.16em]">
                            {detail.label}
                          </p>
                        </div>

                        <p className="mt-3 text-sm font-black text-white">
                          {detail.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Process list */}
                <div className="mt-8 space-y-3 border-t border-white/[0.07] pt-7">
                  {[
                    "Repositioned the acquisition strategy",
                    "Improved landing-page conversion flow",
                    "Built measurable campaign reporting",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm font-bold text-[#a8b3c2]"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${slug}`}
                  className="group/button mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-amber-400 px-7 py-3.5 text-sm font-black text-[#111827] shadow-[0_18px_45px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_24px_60px_rgba(245,158,11,0.3)]"
                >
                  View Full Case Study

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1 group-hover/button:-translate-y-1" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}