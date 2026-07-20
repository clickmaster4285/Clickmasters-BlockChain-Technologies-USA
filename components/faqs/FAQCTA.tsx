import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function FAQCTA() {
  return (
    <section className="bg-bg-base px-4 pb-20 sm:px-6 sm:pb-24">
      <div className="container mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-border-default bg-text-primary p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)] sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-base/20 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                Still unsure?
              </p>

              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">
                Bring your project question to the team.
              </h2>

              <p className="mt-4 max-w-2xl text-sm font-medium leading-7 text-white/70 sm:text-base">
                Share your use case, budget range, timeline, and technical
                concerns. We will help you find the clearest next step.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/75">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-base" />
                  Technical guidance
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-base" />
                  Project-specific scope
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-base" />
                  Clear delivery path
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-base px-6 text-sm font-black text-bg-base transition hover:-translate-y-0.5"
              >
                Contact us
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/service"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 text-sm font-bold text-white transition hover:border-amber-base/40 hover:text-amber-base"
              >
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
