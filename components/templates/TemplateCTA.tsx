import Link from "next/link";
import { ArrowRight, FileText, Sparkles } from "lucide-react";

type TemplateCTAData = {
  title?: string;
  description?: string;
  primaryText?: string;
  secondaryText?: string;
  href?: string;
  secondaryHref?: string;
};

export default function TemplateCTA({
  cta,
  title = "Need a custom version of this template?",
  description = "Get a professionally tailored blockchain template designed around your project, team, documentation, and business requirements.",
  compact = false,
}: {
  cta?: TemplateCTAData;
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  const primaryHref = cta?.href || "/contact";
  const secondaryHref = cta?.secondaryHref || "/templates";

  return (
    <section
      className={`group relative isolate overflow-hidden rounded-[2rem] border border-amber-base/20 bg-bg-surface/90 ${
        compact ? "p-6 sm:p-7 md:p-8" : "p-8 sm:p-10 md:p-14"
      }`}
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:34px_34px] opacity-50" />

      <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full bg-amber-base/15 blur-[90px] transition-transform duration-1000 group-hover:scale-125" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-emerald-base/8 blur-[90px] transition-transform duration-1000 group-hover:scale-125" />

      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />

      {/* Floating document shapes */}
      <div className="pointer-events-none absolute right-[8%] top-[18%] hidden h-24 w-20 rotate-6 rounded-xl border border-border-default bg-bg-base/80 backdrop-blur-xl md:block md:animate-template-paper-one" />

      <div className="pointer-events-none absolute bottom-[12%] left-[8%] hidden h-20 w-16 -rotate-6 rounded-xl border border-amber-base/20 bg-amber-base/[0.06] backdrop-blur-xl md:block md:animate-template-paper-two" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
          <Sparkles className="h-4 w-4 animate-pulse" />
          Template Support
        </div>

        <span className="mt-6 grid h-16 w-16 place-items-center rounded-2xl border border-amber-base/20 bg-gradient-to-br from-amber-base/15 to-amber-base/5 text-amber-base transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-amber-base/40">
          <FileText className="h-8 w-8" />
        </span>

        <h2
          className={`mt-6 max-w-4xl font-display font-black leading-tight tracking-tight text-text-primary ${
            compact
              ? "text-2xl sm:text-3xl"
              : "text-3xl sm:text-4xl md:text-5xl"
          }`}
        >
          {cta?.title || title}
        </h2>

        <p
          className={`mt-5 max-w-3xl text-text-secondary ${
            compact ? "text-sm leading-7" : "text-base leading-8 md:text-lg"
          }`}
        >
          {cta?.description || description}
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={primaryHref}
            className="group/primary inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-[#101827] transition-all duration-300 hover:-translate-y-1 sm:w-auto"
          >
            {cta?.primaryText || "Use This Template"}

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/primary:translate-x-1" />
          </Link>

          {cta?.secondaryText && (
            <Link
              href={secondaryHref}
              className="inline-flex w-full items-center justify-center rounded-full border border-border-default bg-bg-base px-7 py-3.5 text-sm font-bold text-text-secondary backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.06] hover:text-amber-base sm:w-auto"
            >
              {cta.secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
