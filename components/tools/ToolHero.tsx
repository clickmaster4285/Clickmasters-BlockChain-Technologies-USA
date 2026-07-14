import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Sparkles,
  Wrench,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function ToolHero({
  item,
  readTime,
}: {
  item: any;
  readTime: string;
}) {
  const title =
    item?.hero?.title ||
    item?.title ||
    "Blockchain Tool";

  const description =
    item?.hero?.description ||
    item?.excerpt ||
    item?.description ||
    "Professional blockchain tool for developers, startups and enterprises.";

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-bg-base/70 p-6 shadow-[0_35px_120px_rgba(0,0,0,.45)] backdrop-blur-xl md:p-12">
      {/* Background Effects */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-amber-base/10 blur-3xl" />

      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base to-transparent" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_420px]">

        {/* LEFT */}
        <div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Link>

          <div className="mt-7 flex flex-wrap gap-3">

            <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
              <Wrench className="h-4 w-4" />
              {item?.hero?.badge || item?.category || "Tool"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
              <Clock3 className="h-4 w-4 text-amber-base" />
              {readTime}
            </span>

            {(item?.date || item?.published) && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-silver">
                <CalendarDays className="h-4 w-4 text-amber-base" />
                {item.date || item.published}
              </span>
            )}
          </div>

          <h1 className="mt-8 max-w-5xl font-display text-4xl font-black leading-tight tracking-tight text-text-primary md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-silver">
            {description}
          </p>

          {/* Features */}

          <div className="mt-8 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <ShieldCheck className="h-6 w-6 text-amber-base" />
              <h4 className="mt-3 font-black">
                Enterprise Ready
              </h4>
              <p className="mt-2 text-sm text-silver">
                Built for production environments.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <Zap className="h-6 w-6 text-amber-base" />
              <h4 className="mt-3 font-black">
                Fast Results
              </h4>
              <p className="mt-2 text-sm text-silver">
                Save hours of manual planning.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <Sparkles className="h-6 w-6 text-amber-base" />
              <h4 className="mt-3 font-black">
                Professional
              </h4>
              <p className="mt-2 text-sm text-silver">
                Trusted by blockchain teams.
              </p>
            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#tool"
              className="inline-flex items-center gap-2 rounded-full bg-amber-base px-7 py-3 text-sm font-black text-bg-base transition-all hover:-translate-y-1"
            >
              Launch Tool
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-silver transition-all hover:border-amber-base/30 hover:text-amber-base"
            >
              Talk to Expert
            </Link>

          </div>
        </div>

        {/* RIGHT */}

        <div className="relative flex items-center justify-center">

          <div className="absolute h-80 w-80 rounded-full bg-amber-base/15 blur-3xl" />

          {/* Floating Rings */}

          <div className="absolute h-72 w-72 animate-spin rounded-full border border-amber-base/20 [animation-duration:22s]" />

          <div className="absolute h-56 w-56 animate-spin rounded-full border border-white/10 [animation-duration:15s] [animation-direction:reverse]" />

          {/* Center Card */}

          <div className="relative w-full max-w-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl">

            <div className="mx-auto flex h-24 w-24 animate-pulse items-center justify-center rounded-3xl bg-amber-base/10">

              <Wrench className="h-12 w-12 text-amber-base" />

            </div>

            <h3 className="mt-8 text-center text-2xl font-black">
              Blockchain Tool
            </h3>

            <p className="mt-4 text-center text-sm leading-7 text-silver">
              Interactive planning, estimation,
              calculations and enterprise-grade
              blockchain utilities.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">

              <div className="rounded-2xl bg-white/[0.03] p-4 text-center">
                <p className="text-2xl font-black text-amber-base">
                  AI
                </p>

                <p className="mt-1 text-xs text-silver">
                  Assisted
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.03] p-4 text-center">
                <p className="text-2xl font-black text-amber-base">
                  24/7
                </p>

                <p className="mt-1 text-xs text-silver">
                  Available
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}