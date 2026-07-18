"use client";

import {
  BadgeCheck,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

type TestimonialStat = {
  value: string;
  label: string;
};

type CaseStudyTestimonialProps = {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  initials?: string;
  rating?: number;
  stats?: TestimonialStat[];
};

const defaultStats: TestimonialStat[] = [
  {
    value: "+184%",
    label: "Qualified Leads",
  },
  {
    value: "-41%",
    label: "Acquisition Cost",
  },
  {
    value: "3.8×",
    label: "Return on Ad Spend",
  },
];

export default function CaseStudyTestimonial({
  quote = "ClickMasters helped us move from disconnected marketing activity to a clear growth system. The strategy was practical, the execution was disciplined, and the impact was visible across both marketing and sales.",
  author = "Sarah Mitchell",
  role = "VP of Growth",
  company = "Nexora",
  initials = "SM",
  rating = 5,
  stats = defaultStats,
}: CaseStudyTestimonialProps) {
  const normalizedRating = Math.min(Math.max(rating, 0), 5);

  return (
    <section className="relative overflow-hidden bg-[#091321] py-24 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/[0.065] blur-[150px]" />

        <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/[0.045] blur-[130px]" />

        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-purple-500/[0.035] blur-[130px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:90px_90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/[0.09] bg-[#0c1727]/95 p-6 shadow-[0_45px_140px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-9 lg:rounded-[3rem] lg:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/[0.1] blur-[125px]" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-500/[0.055] blur-[140px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            {/* Testimonial content */}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.07] px-4 py-2 text-[10px] font-black uppercase tracking-[0.19em] text-amber-400">
                  <Sparkles className="h-4 w-4" />
                  Client Perspective
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-300">
                  <BadgeCheck className="h-4 w-4" />
                  Verified Client
                </div>
              </div>

              <div className="mt-9">
                <span className="grid h-14 w-14 place-items-center rounded-[1.3rem] border border-amber-400/20 bg-amber-400/[0.08] text-amber-400 shadow-[0_15px_45px_rgba(245,158,11,0.1)]">
                  <Quote className="h-6 w-6" />
                </span>

                <blockquote className="mt-7 max-w-4xl text-2xl font-black leading-[1.32] tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl xl:text-[2.7rem]">
                  “{quote}”
                </blockquote>
              </div>

              <div className="mt-9 flex flex-col gap-5 border-t border-white/[0.08] pt-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-amber-400/20 bg-amber-400 text-sm font-black text-[#111827] shadow-[0_12px_35px_rgba(245,158,11,0.2)]">
                    {initials}
                  </div>

                  <div>
                    <p className="text-base font-black text-white">
                      {author}
                    </p>

                    <p className="mt-1 text-xs font-bold text-[#7b899d]">
                      {role}, {company}
                    </p>
                  </div>
                </div>

                <div>
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${normalizedRating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index < normalizedRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-white/15"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-[9px] font-black uppercase tracking-[0.15em] text-[#68768a]">
                    Client satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* Performance card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#091321]/90 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:p-6">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-400/[0.07] blur-[75px]" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-300">
                        Engagement Impact
                      </p>

                      <h3 className="mt-2 text-xl font-black tracking-[-0.03em] text-white">
                        Results the team could measure
                      </h3>
                    </div>

                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300">
                      <TrendingUp className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="group flex items-center justify-between gap-5 rounded-[1.2rem] border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-emerald-400/20 hover:bg-emerald-400/[0.035]"
                      >
                        <span className="text-xs font-bold text-[#8290a4]">
                          {stat.label}
                        </span>

                        <span className="text-xl font-black tracking-[-0.035em] text-white">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-[1.2rem] border border-amber-400/15 bg-amber-400/[0.05] p-4">
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

                      <p className="text-xs font-medium leading-6 text-[#8c99ac]">
                        Performance tracked through shared reporting and
                        agreed commercial metrics throughout the engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 hidden rounded-[1.2rem] border border-white/[0.08] bg-[#0b1724]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400/[0.1] text-amber-400">
                    <Quote className="h-4 w-4" />
                  </span>

                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.14em] text-[#6f7d91]">
                      Partnership
                    </p>

                    <p className="mt-1 text-xs font-black text-white">
                      Strategy through execution
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