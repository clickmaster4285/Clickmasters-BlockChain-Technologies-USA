import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Copy,
  FileText,
  Layers3,
  Sparkles,
} from "lucide-react";

export default function TemplateHero({
  item,
  readTime,
}: {
  item: any;
  readTime: string;
}) {
  const title =
    item?.hero?.title ||
    item?.title ||
    "Blockchain Template";

  const description =
    item?.hero?.description ||
    item?.excerpt ||
    item?.description ||
    "A practical professional template designed to help blockchain teams plan, document, and execute projects faster.";

  const format =
    item?.format ||
    item?.fileType ||
    "Document";

  const sections =
    item?.sectionsCount ||
    item?.sections?.length ||
    item?.content?.filter(
      (block: any) => block?.type === "heading"
    ).length ||
    0;

  return (
    <section className="group/hero relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1524] p-5 shadow-[0_38px_120px_rgba(0,0,0,0.48)] sm:p-7 md:rounded-[2.7rem] md:p-10 lg:p-12">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:42px_42px] opacity-60" />

      {/* Background glows */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-amber-base/15 blur-[110px] transition-transform duration-1000 group-hover/hero:scale-110" />

      <div className="pointer-events-none absolute -bottom-36 left-[20%] h-[24rem] w-[24rem] rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/90 to-transparent" />

      {/* Small animated particles */}
      <span className="pointer-events-none absolute left-[7%] top-[18%] h-1.5 w-1.5 animate-template-particle rounded-full bg-amber-base" />

      <span className="pointer-events-none absolute right-[8%] top-[26%] h-1 w-1 animate-template-particle-delayed rounded-full bg-amber-base" />

      <span className="pointer-events-none absolute bottom-[14%] left-[46%] h-1.5 w-1.5 animate-template-particle rounded-full bg-blue-400" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Left content */}
        <div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#aab6c8] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:text-amber-base"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Templates
          </Link>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              <FileText className="h-4 w-4" />
              {item?.hero?.badge || item?.category || "Template"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#aab6c8]">
              <Clock3 className="h-4 w-4 text-amber-base" />
              {readTime}
            </span>

            {(item?.date || item?.published) && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-[#aab6c8]">
                <CalendarDays className="h-4 w-4 text-amber-base" />
                {item.date || item.published}
              </span>
            )}
          </div>

          <h1 className="mt-8 max-w-5xl font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#aab6c8] md:text-lg">
            {description}
          </p>

          {/* Meta cards */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="group/card rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-400 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.05]">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-400 group-hover/card:rotate-6 group-hover/card:scale-110">
                <FileText className="h-5 w-5" />
              </span>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#7f8da3]">
                Format
              </p>

              <p className="mt-1 font-black text-white">
                {format}
              </p>
            </div>

            <div className="group/card rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-400 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.05]">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-400 group-hover/card:rotate-6 group-hover/card:scale-110">
                <Layers3 className="h-5 w-5" />
              </span>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#7f8da3]">
                Sections
              </p>

              <p className="mt-1 font-black text-white">
                {sections || "Complete"}
              </p>
            </div>

            <div className="group/card rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all duration-400 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.05]">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-400 group-hover/card:rotate-6 group-hover/card:scale-110">
                <Sparkles className="h-5 w-5" />
              </span>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[#7f8da3]">
                Ready For
              </p>

              <p className="mt-1 font-black text-white">
                Professional Use
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#template"
              className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-[#101827] shadow-[0_16px_45px_rgba(245,158,11,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(245,158,11,0.3)] sm:w-auto"
            >
              View Template
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
            </a>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-[#d7deea] transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.05] hover:text-amber-base sm:w-auto"
            >
              Request Custom Version
            </Link>
          </div>
        </div>

        {/* Right animated document stack */}
        <div className="relative flex min-h-[450px] items-center justify-center">
          <div className="pointer-events-none absolute h-[24rem] w-[24rem] rounded-full bg-amber-base/10 blur-[90px]" />

          <div className="pointer-events-none absolute h-[340px] w-[340px] animate-template-ring rounded-full border border-amber-base/15" />

          <div className="pointer-events-none absolute h-[270px] w-[270px] animate-template-ring-reverse rounded-full border border-dashed border-white/10" />

          {/* Back paper */}
          <div className="absolute h-[320px] w-[245px] rotate-[-10deg] rounded-[1.7rem] border border-white/10 bg-[#111c2d] shadow-[0_25px_70px_rgba(0,0,0,0.35)] transition-transform duration-700 group-hover/hero:rotate-[-13deg] group-hover/hero:translate-x-[-8px]">
            <div className="space-y-4 p-6 opacity-50">
              <div className="h-3 w-20 rounded-full bg-amber-base/40" />
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-4/5 rounded-full bg-white/10" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Middle paper */}
          <div className="absolute h-[330px] w-[250px] rotate-[8deg] rounded-[1.7rem] border border-white/10 bg-[#152238] shadow-[0_28px_80px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover/hero:rotate-[11deg] group-hover/hero:translate-x-[8px]">
            <div className="space-y-4 p-6 opacity-60">
              <div className="h-3 w-24 rounded-full bg-blue-400/30" />
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-3/4 rounded-full bg-white/10" />
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-14 rounded-xl bg-white/5" />
                <div className="h-14 rounded-xl bg-white/5" />
              </div>
            </div>
          </div>

          {/* Main paper */}
          <div className="relative z-10 h-[350px] w-[265px] animate-template-main-paper overflow-hidden rounded-[1.8rem] border border-amber-base/25 bg-gradient-to-br from-[#17243a] to-[#0f1828] p-6 shadow-[0_38px_100px_rgba(0,0,0,0.52)]">
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                <FileText className="h-5 w-5" />
              </span>

              <span className="rounded-full bg-amber-base/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-amber-base">
                Template
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-black leading-tight text-white">
              Ready-to-use project structure
            </h3>

            <div className="mt-6 space-y-3">
              <div className="h-2.5 w-full rounded-full bg-white/10" />
              <div className="h-2.5 w-5/6 rounded-full bg-white/10" />
              <div className="h-2.5 w-3/4 rounded-full bg-white/10" />
            </div>

            <div className="mt-7 grid gap-3">
              {["Project Overview", "Requirements", "Execution Plan"].map(
                (label, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-base/10 text-[10px] font-black text-amber-base">
                      0{index + 1}
                    </span>

                    <span className="text-xs font-bold text-[#c8d1df]">
                      {label}
                    </span>
                  </div>
                )
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-xs font-bold text-amber-base">
                Professional Template
              </span>

              <Copy className="h-4 w-4 text-amber-base" />
            </div>
          </div>

          {/* Floating format badge */}
          <div className="absolute bottom-3 right-0 z-20 rounded-2xl border border-white/10 bg-[#101827]/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-4">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-base">
              Format
            </p>

            <p className="mt-1 text-sm font-bold text-white">
              {format}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}