import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Wrench,
} from "lucide-react";

export default function ToolCTA({
  title = "Need help using this tool for your blockchain project?",
  description = "Talk with ClickMasters and get expert guidance tailored to your product, architecture, budget, timeline, and technical goals.",
  cta,
  compact = false,
}: {
  title?: string;
  description?: string;
  cta: {
    title?: string;
    description?: string;
    primaryText: string;
    secondaryText?: string;
    href: string;
    secondaryHref?: string;
  };
  compact?: boolean;
}) {
  return (
    <section
      className={`group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-amber-base via-amber-light to-amber-base text-bg-base shadow-[0_28px_90px_rgba(0,0,0,0.28)] ${
        compact
          ? "p-6 sm:p-7 md:p-8"
          : "p-8 sm:p-10 md:p-14"
      }`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-black/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-bg-base/50 to-transparent" />

      <div className="relative flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-bg-base/10 bg-bg-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] backdrop-blur-sm">
          <Wrench className="h-4 w-4" />
          Tool Assistance
        </div>

        <h2
          className={`mt-5 max-w-4xl font-black leading-tight ${
            compact
              ? "text-2xl sm:text-3xl"
              : "text-3xl sm:text-4xl md:text-5xl"
          }`}
        >
          {cta?.title || title}
        </h2>

        <p
          className={`mt-5 max-w-3xl text-bg-base/80 ${
            compact
              ? "text-sm leading-7"
              : "text-base leading-8 md:text-lg"
          }`}
        >
          {cta?.description || description}
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={cta?.href || "/contact"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bg-base px-7 py-3.5 text-sm font-black text-amber-base shadow-[0_14px_35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.3)] sm:w-auto"
          >
            {cta?.primaryText || "Book a Free Strategy Call"}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {cta?.secondaryText && (
            <Link
              href={cta.secondaryHref || "/tools"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-bg-base/25 bg-bg-base/5 px-7 py-3.5 text-sm font-bold text-bg-base transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg-base/10 sm:w-auto"
            >
              <Sparkles className="h-4 w-4" />
              {cta.secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}