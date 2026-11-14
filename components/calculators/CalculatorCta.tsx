import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Sparkles, Wrench } from "lucide-react";

import type { CalculatorCta as CalculatorCtaData } from "@/lib/calculators";

type CalculatorCtaProps = {
  cta: CalculatorCtaData;
};

export default function CalculatorCta({ cta }: CalculatorCtaProps) {
  const primaryHref = cta.primaryHref || "/contact";

  const secondaryHref = cta.secondaryHref || "/service";

  return (
    <section>
      <div>
        <div className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-amber-base via-amber-light to-amber-base px-6 py-12 text-bg-base shadow-[0_28px_90px_rgba(0,0,0,0.22)] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <CtaBackground />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-bg-base/10 bg-bg-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] backdrop-blur-sm">
                <Wrench className="h-4 w-4" />
                Work with ClickMasters
              </span>

              <h2 className="mt-6 text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                {cta.title}
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-bg-base/80 sm:text-lg">
                {cta.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <TrustItem text="Free initial consultation" />
                <TrustItem text="Practical recommendations" />
                <TrustItem text="No-obligation discussion" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 sm:w-auto lg:min-w-[240px]">
              <CtaLink href={primaryHref} variant="primary">
                {cta.primaryText}
              </CtaLink>

              <CtaLink href={secondaryHref} variant="secondary">
                {cta.secondaryText}
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CTA Link
========================================================= */

function CtaLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
}) {
  const className =
    variant === "primary"
      ? "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-bg-base px-7 py-3 text-center text-sm font-black text-amber-base shadow-[0_14px_35px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-bg-base/70 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-base"
      : "inline-flex min-h-12 w-full items-center justify-center rounded-full border border-bg-base/25 bg-bg-base/5 px-7 py-3 text-center text-sm font-bold text-bg-base transition-all duration-300 hover:-translate-y-0.5 hover:bg-bg-base/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-bg-base/60 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-base";

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}

        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}

      {variant === "primary" ? (
        <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
      ) : (
        <Sparkles aria-hidden="true" className="ml-2 h-4 w-4" />
      )}
    </Link>
  );
}

/* =========================================================
   Trust Item
========================================================= */

function TrustItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-medium text-bg-base/75">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bg-base/10 text-[10px] font-black text-bg-base">
        ✓
      </span>

      {text}
    </span>
  );
}

/* =========================================================
   Background
========================================================= */

function CtaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-black/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-bg-base/50 to-transparent" />
    </div>
  );
}

/* =========================================================
   Utility
========================================================= */

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}
