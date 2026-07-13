import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";

export default function GlossaryCTA({
  title = "Need help applying this blockchain concept?",
  description = "Talk with ClickMasters and understand how this concept fits your product, architecture, or Web3 strategy.",
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
  };
  compact?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-amber-base via-amber-light to-amber-base text-bg-base ${
        compact ? "p-6 sm:p-7 md:p-8" : "p-8 sm:p-10 md:p-14"
      }`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-black/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-bg-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
          <BookOpenCheck className="h-4 w-4" />
          Expert Guidance
        </div>

        <h2
          className={`mt-5 max-w-4xl font-black leading-tight ${
            compact
              ? "text-2xl sm:text-3xl"
              : "text-3xl sm:text-4xl md:text-5xl"
          }`}
        >
          {cta.title || title}
        </h2>

        <p
          className={`mt-5 max-w-3xl text-bg-base/80 ${
            compact
              ? "text-sm leading-7"
              : "text-base leading-8 md:text-lg"
          }`}
        >
          {cta.description || description}
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={cta.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bg-base px-7 py-3.5 text-sm font-black text-amber-base transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            {cta.primaryText}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {cta.secondaryText && (
            <Link
              href="/glossary"
              className="inline-flex w-full items-center justify-center rounded-full border border-bg-base/25 px-7 py-3.5 text-sm font-bold text-bg-base transition-colors hover:bg-bg-base/10 sm:w-auto"
            >
              {cta.secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}