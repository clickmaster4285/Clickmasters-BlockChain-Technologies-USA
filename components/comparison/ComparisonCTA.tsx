import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ComparisonCTA({
  title = "Need help making the right blockchain decision?",
  description = "Book a free strategy call and get expert guidance on architecture, cost, timeline, security, and launch planning.",
  cta,
  compact = false,
}: {
  title?: string;
  description?: string;
  cta: {
    text: string;
    href: string;
    primary?: boolean;
  };
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-amber-base/20 bg-gradient-to-r from-amber-base via-amber-light to-surface text-bg-base ${
        compact ? "p-6 md:p-8" : "p-10 md:p-14"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-bg-base/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-bg-base/15 blur-3xl" />

      <div className="relative">
        <h3
          className={`font-black leading-tight ${
            compact ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
          }`}
        >
          {title}
        </h3>

        <p
          className={`mt-4 max-w-2xl text-bg-base/80 ${
            compact ? "text-sm leading-6" : "mx-auto text-base leading-7"
          }`}
        >
          {description}
        </p>

        <Link
          href={cta.href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-bg-base px-7 py-3 text-sm font-bold text-amber-base transition-transform hover:-translate-y-0.5"
        >
          {cta.text}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}