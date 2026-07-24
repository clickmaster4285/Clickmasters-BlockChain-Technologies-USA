// app/process/page.tsx

import type { Metadata } from "next";

import Link from "next/link";

import {
  ArrowRight,
  BookOpenCheck,
  Boxes,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";

import ProcessCard from "@/components/process/ProcessCard";
import ProcessPagination from "@/components/process/ProcessPagination";

import {
  getProcessCards,
  getProcessCategories,
  getProcessCount,
} from "@/lib/process";

/* =========================================================
   Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Blockchain Development Process & Technical Guides | ClickMasters",

  description:
    "Explore detailed blockchain development processes, security audit workflows, DeFi architecture, crypto exchange infrastructure, wallet security, DAO governance, tokenization, and enterprise blockchain guides.",

  alternates: {
    canonical: "/process",
  },

  openGraph: {
    title:
      "Blockchain Development Process & Technical Guides | ClickMasters",

    description:
      "Detailed blockchain process guides covering smart contract audits, DeFi security, architecture, exchange infrastructure, wallets, tokenization, governance, bridges, and oracle integration.",

    url: "/process",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Blockchain Development Process & Technical Guides",

    description:
      "Explore professional blockchain development, security, architecture, and implementation processes.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================================
   Constants
========================================================= */

const PROCESSES_PER_PAGE = 9;

const processBenefits = [
  {
    icon: FileSearch,
    title: "Detailed Technical Analysis",
    description:
      "Each guide explains the underlying architecture, security risks, cost considerations, and production requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Approach",
    description:
      "Security considerations are built into every process, from initial architecture through deployment and monitoring.",
  },
  {
    icon: Layers3,
    title: "Production Architecture",
    description:
      "The guides focus on complete production systems rather than isolated proof-of-concept implementations.",
  },
];

/* =========================================================
   Types
========================================================= */

type ProcessPageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

/* =========================================================
   Helpers
========================================================= */

function parsePageNumber(
  value: string | string[] | undefined,
): number {
  const rawValue = Array.isArray(value)
    ? value[0]
    : value;

  const parsedValue = Number.parseInt(
    rawValue ?? "1",
    10,
  );

  if (
    !Number.isFinite(parsedValue) ||
    parsedValue < 1
  ) {
    return 1;
  }

  return parsedValue;
}

/* =========================================================
   Page
========================================================= */

export default async function ProcessPage({
  searchParams,
}: ProcessPageProps) {
  const resolvedSearchParams =
    await searchParams;

  const allProcesses = getProcessCards();
  const processCount = getProcessCount();
  const categories = getProcessCategories();

  const requestedPage = parsePageNumber(
    resolvedSearchParams?.page,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(
      processCount / PROCESSES_PER_PAGE,
    ),
  );

  const currentPage = Math.min(
    requestedPage,
    totalPages,
  );

  const startIndex =
    (currentPage - 1) *
    PROCESSES_PER_PAGE;

  const visibleProcesses =
    allProcesses.slice(
      startIndex,
      startIndex +
        PROCESSES_PER_PAGE,
    );

  const visibleStart =
    processCount === 0
      ? 0
      : startIndex + 1;

  const visibleEnd = Math.min(
    startIndex + visibleProcesses.length,
    processCount,
  );

  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-bg-base">
        {/* =================================================
            Hero
        ================================================== */}

        <section className="relative isolate border-b border-white/[0.07] pb-24 pt-36 lg:pb-32 lg:pt-44">
          {/* Background */}

          <div className="pointer-events-none absolute inset-0 -z-20 bg-bg-base" />

          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(225,157,45,0.16),transparent_34%),radial-gradient(circle_at_85%_30%,rgba(255,255,255,0.05),transparent_30%)]" />

          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.11]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",

              backgroundSize: "72px 72px",

              maskImage:
                "linear-gradient(to bottom, black, transparent 90%)",
            }}
          />

          <div className="site-container relative px-6">
            {/* Breadcrumb */}

            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-silver"
            >
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-amber-base"
              >
                Home
              </Link>

              <ChevronRight className="h-3.5 w-3.5 text-amber-base" />

              <span
                aria-current="page"
                className="text-text-primary"
              >
                Process
              </span>
            </nav>

            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_360px]">
              {/* Hero Copy */}

              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/[0.07] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-base">
                  <BookOpenCheck className="h-4 w-4" />

                  Production Process Guides
                </div>

                <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-text-primary sm:text-5xl lg:text-7xl">
                  The processes behind reliable
                  blockchain systems.
                </h1>

                <p className="mt-7 max-w-3xl text-base leading-8 text-silver sm:text-lg">
                  Explore detailed guides covering
                  blockchain architecture, smart
                  contract security, DeFi systems,
                  wallet infrastructure, exchanges,
                  tokenization, governance, bridges,
                  and production deployment.
                </p>

                {/* Category Pills */}

                {categories.length > 0 && (
                  <div className="mt-9 flex flex-wrap gap-2.5">
                    {categories.map(
                      (category) => (
                        <span
                          key={category}
                          className="rounded-full border border-white/[0.09] bg-white/[0.025] px-4 py-2 text-xs font-bold text-silver"
                        >
                          {category}
                        </span>
                      ),
                    )}
                  </div>
                )}
              </div>

              {/* Stats Card */}

              <aside className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface/80 p-7 backdrop-blur-xl">
                <div className="absolute right-0 top-0 h-36 w-36 translate-x-1/3 -translate-y-1/3 rounded-full bg-amber-base/[0.12] blur-3xl" />

                <div className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/25 bg-amber-base/[0.08] text-amber-base">
                    <Boxes className="h-5 w-5" />
                  </span>

                  <p className="mt-7 text-5xl font-black tracking-[-0.04em] text-text-primary">
                    {processCount}
                  </p>

                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-amber-base">
                    Detailed guides
                  </p>

                  <p className="mt-5 text-sm leading-7 text-silver">
                    Practical technical knowledge
                    developed from production
                    blockchain architecture and
                    implementation experience.
                  </p>

                  <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-6">
                    {[
                      "Security and risk analysis",
                      "Architecture and stack decisions",
                      "Cost and timeline guidance",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm text-silver"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />

                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* =================================================
            Benefits
        ================================================== */}

        <section className="border-b border-white/[0.07] py-12">
          <div className="site-container relative grid gap-5 px-6 md:grid-cols-3">
            {processBenefits.map(
              ({
                icon: Icon,
                title,
                description,
              }) => (
                <article
                  key={title}
                  className="rounded-[1.6rem] border border-white/[0.08] bg-surface/60 p-6"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/[0.07] text-amber-base">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h2 className="mt-5 text-lg font-black text-text-primary">
                    {title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-silver">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>

        {/* =================================================
            Listing
        ================================================== */}

        <section className="py-20 lg:py-28">
          <div className="site-container relative px-6">
            {/* Section Heading */}

            <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  Knowledge Library
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-text-primary sm:text-4xl">
                  Explore our process guides
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-silver sm:text-base">
                  Each guide breaks down the
                  architecture, risks, implementation
                  phases, production requirements,
                  costs, and technical decisions
                  involved.
                </p>
              </div>

              <p className="shrink-0 text-sm font-medium text-silver">
                Showing{" "}
                <span className="font-black text-text-primary">
                  {visibleStart}–{visibleEnd}
                </span>{" "}
                of{" "}
                <span className="font-black text-text-primary">
                  {processCount}
                </span>{" "}
                guides
              </p>
            </div>

            {/* Cards */}

            {visibleProcesses.length > 0 ? (
              <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {visibleProcesses.map(
                  (process, index) => (
                    <ProcessCard
                      key={process.slug}
                      process={process}
                      priority={
                        currentPage === 1 &&
                        index < 3
                      }
                    />
                  ),
                )}
              </div>
            ) : (
              <div className="mt-10 rounded-[2rem] border border-white/[0.08] bg-surface p-10 text-center">
                <h2 className="text-2xl font-black text-text-primary">
                  No process guides found
                </h2>

                <p className="mt-3 text-sm leading-7 text-silver">
                  Process guides will appear here
                  when valid data is available.
                </p>
              </div>
            )}

            {/* Pagination */}

            <ProcessPagination
              currentPage={currentPage}
              totalPages={totalPages}
              className="mt-12"
            />
          </div>
        </section>

        {/* =================================================
            Bottom CTA
        ================================================== */}

        <section className="pb-24 lg:pb-32">
          <div className="site-container relative px-6">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-amber-base/25 bg-surface px-7 py-12 sm:px-10 lg:px-16 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(225,157,45,0.18),transparent_35%),radial-gradient(circle_at_90%_70%,rgba(225,157,45,0.08),transparent_30%)]" />

            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-amber-base/[0.08]" />

            <div className="relative flex flex-col items-start justify-between gap-9 lg:flex-row lg:items-center">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  Build with confidence
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.035em] text-text-primary sm:text-4xl lg:text-5xl">
                  Need help applying these
                  processes to your project?
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-silver sm:text-base">
                  Our team can help you define the
                  architecture, development roadmap,
                  security strategy, implementation
                  phases, and production launch plan.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-xl bg-amber-base px-6 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light hover:shadow-[0_18px_50px_rgba(225,157,45,0.25)]"
              >
                Book a Strategy Call

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
