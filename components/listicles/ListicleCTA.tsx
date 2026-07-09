import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ListicleCTA({
  title = "Need expert help choosing the right option?",
  description = "Talk with our blockchain experts and get practical recommendations tailored to your project.",
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
        compact ? "p-6 md:p-8" : "p-10 md:p-14"
      }`}
    >
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-52 w-52 rounded-full bg-black/10 blur-3xl" />

      <div className="relative flex flex-col items-center text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-black/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em]">
          <Sparkles className="h-4 w-4" />
          Expert Recommendation
        </div>

        <h2
          className={`max-w-4xl font-black leading-tight ${
            compact ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
          }`}
        >
          {cta.title || title}
        </h2>

        <p
          className={`mt-5 max-w-3xl text-bg-base/85 ${
            compact ? "text-sm leading-7" : "text-base leading-8 md:text-lg"
          }`}
        >
          {cta.description || description}
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={cta.href}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-bg-base px-7 py-3.5 text-sm font-bold text-amber-base transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            {cta.primaryText}
            <ArrowRight className="h-4 w-4" />
          </Link>

          {cta.secondaryText && (
            <Link
              href="/listicles"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-bg-base transition-colors hover:bg-white/10 sm:w-auto"
            >
              {cta.secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}