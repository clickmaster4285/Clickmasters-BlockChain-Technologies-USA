"use client";

import {
  ArrowDownRight,
  BadgeCheck,
  CheckCircle2,
  Lightbulb,
  LineChart,
  Quote,
  Rocket,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

type ContentSection = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  paragraphs?: string[];
  points?: string[];
};

type CaseStudyContentProps = {
  overview?: string;
  sections?: ContentSection[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
};

const defaultSections: ContentSection[] = [
  {
    id: "challenge",
    eyebrow: "The Challenge",
    title:
      "Strong market potential, but an inconsistent acquisition system.",
    description:
      "Nexora had a valuable SaaS product and a growing market, but its marketing funnel was not converting attention into predictable revenue.",
    paragraphs: [
      "The company was investing in paid acquisition, content, and product-led growth, but each channel operated independently. Messaging varied across campaigns, landing pages lacked clear conversion paths, and reporting focused on surface-level metrics rather than qualified opportunities.",
      "As acquisition costs increased, the team needed a clearer growth strategy that connected positioning, campaigns, conversion, analytics, and sales performance.",
    ],
    points: [
      "High customer acquisition costs",
      "Inconsistent campaign messaging",
      "Low landing-page conversion",
      "Limited attribution and reporting",
    ],
  },
  {
    id: "research",
    eyebrow: "Research & Discovery",
    title:
      "Understanding the audience, buying journey, and commercial opportunity.",
    description:
      "We started by identifying where demand was being lost and which customer segments had the strongest growth potential.",
    paragraphs: [
      "Our discovery process combined stakeholder interviews, customer research, campaign analysis, competitor benchmarking, sales-call insights, and funnel analytics.",
      "This revealed that the strongest opportunity was not simply increasing traffic. Nexora needed to improve message clarity, strengthen trust, and create a more intentional path from first interaction to qualified sales conversation.",
    ],
    points: [
      "Customer and stakeholder interviews",
      "Competitor and category analysis",
      "Paid-media account audit",
      "Conversion and funnel analysis",
    ],
  },
  {
    id: "strategy",
    eyebrow: "The Strategy",
    title:
      "One connected growth system built around high-intent demand.",
    description:
      "We designed a strategy that aligned market positioning, acquisition, conversion, and performance reporting.",
    paragraphs: [
      "Instead of treating campaigns, landing pages, and analytics as separate deliverables, we created one integrated system. Every channel used consistent positioning, every campaign mapped to a specific customer need, and every conversion path supported a measurable business objective.",
      "The strategy prioritized qualified pipeline growth rather than raw lead volume, helping the internal team focus investment on the audiences and channels most likely to generate revenue.",
    ],
    points: [
      "Refined value proposition",
      "Segment-specific campaign strategy",
      "Conversion-focused landing pages",
      "Revenue-aligned measurement framework",
    ],
  },
  {
    id: "execution",
    eyebrow: "Execution",
    title:
      "From strategic direction to a scalable acquisition engine.",
    description:
      "We translated the strategy into campaigns, landing pages, messaging systems, and reporting infrastructure.",
    paragraphs: [
      "The execution phase included a new paid-media account structure, audience-specific creative concepts, redesigned landing pages, improved lead qualification, and a real-time reporting dashboard.",
      "Campaigns were tested in controlled phases, allowing the team to validate messaging and audience performance before increasing budget. Weekly optimization focused on cost efficiency, conversion quality, and pipeline contribution.",
    ],
    points: [
      "Campaign architecture and launch",
      "Landing-page design and development",
      "Creative testing framework",
      "Analytics and reporting dashboard",
    ],
  },
  {
    id: "impact",
    eyebrow: "The Impact",
    title:
      "More qualified opportunities, stronger efficiency, and clearer decisions.",
    description:
      "The new system gave Nexora a more predictable way to generate and measure growth.",
    paragraphs: [
      "Within the engagement period, qualified lead volume increased significantly while customer acquisition costs declined. Landing-page conversion improved, paid-media efficiency strengthened, and the sales team received better-qualified opportunities.",
      "Beyond the immediate performance gains, Nexora gained a repeatable framework for testing campaigns, evaluating channels, and making future growth decisions with greater confidence.",
    ],
    points: [
      "184% increase in qualified leads",
      "41% reduction in acquisition cost",
      "72% improvement in conversion",
      "3.8× return on advertising spend",
    ],
  },
];

const sectionIcons = {
  challenge: Target,
  research: Search,
  strategy: Lightbulb,
  execution: Rocket,
  impact: LineChart,
};

export default function CaseStudyContent({
  overview = "Nexora partnered with ClickMasters to transform fragmented marketing activity into a connected, measurable, and scalable growth system.",
  sections = defaultSections,
  quote = {
    text: "ClickMasters did more than improve our campaigns. They helped us understand how every part of our acquisition journey should work together.",
    author: "Sarah Mitchell",
    role: "VP of Growth, Nexora",
  },
}: CaseStudyContentProps) {
  return (
    <section className="relative overflow-hidden bg-[#07101d] py-24 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-amber-400/[0.04] blur-[140px]" />

        <div className="absolute bottom-40 right-0 h-96 w-96 rounded-full bg-blue-500/[0.04] blur-[140px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:92px_92px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Overview */}
        <div className="grid gap-10 border-b border-white/[0.08] pb-20 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16 lg:pb-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
              <Sparkles className="h-4 w-4" />
              Project Overview
            </div>
          </div>

          <div>
            <p className="max-w-4xl text-3xl font-black leading-[1.25] tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              {overview}
            </p>

            <div className="mt-8 flex items-center gap-3 text-xs font-bold text-[#7f8da1]">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              Strategy, design, execution, and optimization
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="divide-y divide-white/[0.08]">
          {sections.map((section, index) => {
            const Icon =
              sectionIcons[
                section.id as keyof typeof sectionIcons
              ] ?? Target;

            return (
              <article
                key={section.id}
                id={section.id}
                className="grid scroll-mt-28 gap-10 py-20 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16 lg:py-28"
              >
                {/* Sticky label */}
                <div>
                  <div className="lg:sticky lg:top-28">
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.08] text-amber-400">
                        <Icon className="h-5 w-5" />
                      </span>

                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-[#67758a]">
                          Section {String(index + 1).padStart(2, "0")}
                        </p>

                        <p className="mt-1 text-sm font-black text-white">
                          {section.eyebrow}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-amber-400/30 to-transparent lg:block" />
                  </div>
                </div>

                {/* Main content */}
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
                    {section.eyebrow}
                  </p>

                  <h2 className="mt-5 max-w-4xl text-3xl font-black leading-[1.08] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                    {section.title}
                  </h2>

                  <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-[#a0adbe] sm:text-lg">
                    {section.description}
                  </p>

                  {section.paragraphs && (
                    <div className="mt-8 max-w-3xl space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm font-medium leading-7 text-[#8290a4] sm:text-base sm:leading-8"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.points && (
                    <div className="mt-9 grid gap-3 sm:grid-cols-2">
                      {section.points.map((point) => (
                        <div
                          key={point}
                          className="group flex items-center gap-3 rounded-[1.2rem] border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-300 hover:border-amber-400/20 hover:bg-amber-400/[0.04]"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />

                          <span className="text-sm font-bold text-[#a8b3c2]">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {index < sections.length - 1 && (
                    <div className="mt-12 inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.17em] text-[#59677a]">
                      Continue to next chapter
                      <ArrowDownRight className="h-4 w-4 text-amber-400" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Testimonial quote */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-[#0c1727] p-6 shadow-[0_35px_110px_rgba(0,0,0,0.34)] sm:p-9 lg:rounded-[2.6rem] lg:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/[0.09] blur-[120px]" />

          <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-10">
            <span className="grid h-14 w-14 place-items-center rounded-[1.3rem] border border-amber-400/20 bg-amber-400/[0.08] text-amber-400">
              <Quote className="h-6 w-6" />
            </span>

            <div>
              <blockquote className="max-w-4xl text-2xl font-black leading-[1.35] tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                “{quote.text}”
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-amber-400 text-sm font-black text-[#111827]">
                  {quote.author
                    .split(" ")
                    .map((name) => name.charAt(0))
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <p className="text-sm font-black text-white">
                    {quote.author}
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#758398]">
                    {quote.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}