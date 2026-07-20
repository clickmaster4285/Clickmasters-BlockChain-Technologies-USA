import Link from "next/link";
import { ArrowDown, BadgeCheck, BookOpenCheck, MessageCircleQuestion } from "lucide-react";

interface FAQHeroProps {
  totalQuestions: number;
}

export default function FAQHero({ totalQuestions }: FAQHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-bg-base via-amber-base/5 to-bg-base pb-14 pt-28 sm:pt-32"
      aria-labelledby="faq-hero-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.055)_1px,transparent_1px)] bg-[size:70px_70px] opacity-60" />
      <div className="pointer-events-none absolute -left-72 -top-56 h-[46rem] w-[46rem] rounded-full bg-amber-base/[0.09] blur-[140px]" />
      <div className="pointer-events-none absolute -right-72 top-64 h-[42rem] w-[42rem] rounded-full bg-emerald-base/[0.06] blur-[140px]" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-base shadow-sm">
              <MessageCircleQuestion className="h-4 w-4" />
              FAQ Knowledge Hub
            </div>

            <h1
              id="faq-hero-title"
              className="mt-7 max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-7xl"
            >
              Clear answers for blockchain projects, from idea to launch.
            </h1>

            <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-text-secondary sm:text-lg">
              Browse curated FAQ hubs covering DeFi, NFTs, exchanges,
              tokenization, enterprise blockchain, deployment workflows, and
              real project case studies.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#faq-browser"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-amber-base px-6 text-sm font-black text-bg-base shadow-glow transition hover:-translate-y-0.5"
              >
                Explore FAQs
                <ArrowDown className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-border-default bg-white px-6 text-sm font-bold text-text-primary transition hover:border-amber-base/40 hover:text-amber-base"
              >
                Ask a project question
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border-default bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-border-default pb-5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-base/20 bg-emerald-base/10 text-emerald-base">
                <BookOpenCheck className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-text-muted">
                  Content Library
                </p>
                <p className="mt-1 text-sm font-black text-text-primary">
                  Searchable technical answers
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <HeroStat label="FAQ hubs" value={`${totalQuestions}`} />
              <HeroStat label="Categories" value="7" />
              <HeroStat label="Code-ready" value="Yes" />
              <HeroStat label="Updated" value="2026" />
            </div>

            <div className="mt-5 rounded-xl border border-amber-base/20 bg-amber-base/10 p-4">
              <div className="flex gap-3">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-base" />
                <p className="text-sm font-semibold leading-6 text-text-secondary">
                  Click any card to open the full relevant guide, including
                  tables, lists, and technical code blocks where available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border-default bg-bg-base p-4">
      <p className="text-2xl font-black tracking-tight text-text-primary">
        {value}
      </p>
      <p className="mt-1 text-xs font-bold leading-5 text-text-secondary">
        {label}
      </p>
    </div>
  );
}
