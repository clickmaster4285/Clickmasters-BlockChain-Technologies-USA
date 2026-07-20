// app/hire/page.tsx

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  Code2,
  Headphones,
  Layers3,
  MessageSquareText,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { createMetadata } from "@/config/metadata";
import {
  getFeaturedHirePages,
  getHireCards,
} from "@/lib/hire";
import { getPageHref } from "@/lib/pagination";

const ITEMS_PER_PAGE = 12;

type HirePageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

function getRequestedPage(page?: string): number {
  const parsedPage = Number(page || 1);

  return Number.isFinite(parsedPage) && parsedPage > 0
    ? Math.floor(parsedPage)
    : 1;
}

export async function generateMetadata({
  searchParams,
}: HirePageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = getRequestedPage(resolvedSearchParams?.page);

  return createMetadata({
    title: "Hire Blockchain Developers",
    description:
      "Hire experienced blockchain, Solidity, smart contract, Web3, DeFi, exchange, NFT, and enterprise developers for secure and scalable product development.",
    path: getPageHref("/hire", currentPage),
  });
}

const trustStats = [
  {
    value: "50+",
    label: "Blockchain specialists",
  },
  {
    value: "24–72h",
    label: "Expert matching",
  },
  {
    value: "Flexible",
    label: "Hiring models",
  },
];

const serviceHighlights = [
  {
    icon: ShieldCheck,
    title: "Security-First Engineering",
    description:
      "Build smart contracts and blockchain products with secure architecture, structured reviews, and production-ready standards.",
  },
  {
    icon: Users,
    title: "Specialized Web3 Talent",
    description:
      "Access blockchain developers, architects, auditors, backend engineers, and product specialists matched to your project.",
  },
  {
    icon: Rocket,
    title: "Faster Product Delivery",
    description:
      "Reduce hiring delays and move from technical planning to development with an experienced execution team.",
  },
];

const hiringModels = [
  {
    icon: Code2,
    label: "Dedicated Developer",
    title: "Add a blockchain specialist to your team",
    description:
      "Hire a focused developer who works with your existing team, workflow, tools, and product roadmap.",
    points: [
      "Full-time project involvement",
      "Direct team communication",
      "Flexible monthly engagement",
    ],
  },
  {
    icon: Users,
    label: "Dedicated Team",
    title: "Build with a complete Web3 delivery team",
    description:
      "Get developers, architecture support, quality assurance, and project coordination under one engagement.",
    points: [
      "Cross-functional blockchain team",
      "Managed project delivery",
      "Scalable team composition",
    ],
  },
  {
    icon: BriefcaseBusiness,
    label: "Project-Based",
    title: "Deliver a defined blockchain project",
    description:
      "Ideal for MVPs, smart contracts, token platforms, exchanges, integrations, and enterprise blockchain solutions.",
    points: [
      "Defined scope and milestones",
      "Transparent delivery roadmap",
      "Launch and post-launch support",
    ],
  },
];

const hiringProcess = [
  {
    icon: MessageSquareText,
    step: "01",
    title: "Share Your Requirements",
    description:
      "Tell us about your product, technology stack, timeline, budget, and current development challenges.",
  },
  {
    icon: Search,
    step: "02",
    title: "Get Matched",
    description:
      "We identify developers and specialists whose experience closely matches your technical requirements.",
  },
  {
    icon: BadgeCheck,
    step: "03",
    title: "Review Expertise",
    description:
      "Evaluate the proposed expertise, engagement model, scope, and delivery plan before development begins.",
  },
  {
    icon: Workflow,
    step: "04",
    title: "Start Development",
    description:
      "Your selected developer or team joins the project and begins work using an agreed delivery workflow.",
  },
];

const reasons = [
  {
    icon: Blocks,
    title: "Blockchain-Specific Experience",
    description:
      "Work with specialists who understand smart contracts, tokens, wallets, DeFi, exchanges, consensus, and Web3 infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Development Practices",
    description:
      "Security, testing, access controls, upgradeability, validation, and failure scenarios are considered throughout development.",
  },
  {
    icon: Layers3,
    title: "End-to-End Capabilities",
    description:
      "Get support across architecture, frontend, backend, smart contracts, APIs, infrastructure, testing, and deployment.",
  },
  {
    icon: Headphones,
    title: "Long-Term Technical Support",
    description:
      "Continue with maintenance, upgrades, scaling, integrations, and product improvements after the initial release.",
  },
];

export default async function HirePage({
  searchParams,
}: HirePageProps) {
  const resolvedSearchParams = await searchParams;

  const requestedPage = getRequestedPage(
    resolvedSearchParams?.page
  );

  const hireCards = getHireCards();
  const featuredPages = getFeaturedHirePages(6);

  const totalPages = Math.max(
    Math.ceil(hireCards.length / ITEMS_PER_PAGE),
    1
  );

  const safeCurrentPage = Math.min(
    requestedPage,
    totalPages
  );

  const paginatedCards = hireCards.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const pageStart =
    hireCards.length === 0
      ? 0
      : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;

  const pageEnd = Math.min(
    safeCurrentPage * ITEMS_PER_PAGE,
    hireCards.length
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/40 to-bg-base pb-24 pt-32">
        <div className="pointer-events-none absolute left-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-amber-base/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[-12rem] top-[24rem] h-[30rem] w-[30rem] rounded-full bg-amber-base/10 blur-3xl" />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="site-container relative px-6">
          {/* Hero */}

          <section className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-bg-base/75 shadow-[0_35px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/90 to-transparent" />
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-amber-base/15 blur-3xl" />
            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-amber-base/5 blur-3xl" />

            <div className="grid min-h-[650px] items-center gap-10 p-6 md:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:p-14">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-base">
                  <Sparkles className="h-4 w-4" />
                  Hire Blockchain Experts
                </div>

                <h1 className="mt-7 max-w-4xl font-display text-4xl font-black leading-[1.08] tracking-tight text-text-primary md:text-6xl xl:text-7xl">
                  Build Your Product With{" "}
                  <span className="text-amber-base">
                    Proven Blockchain Developers
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-silver md:text-lg">
                  Hire experienced blockchain, Solidity, smart
                  contract, Web3, DeFi, exchange, and enterprise
                  developers who can turn complex requirements into
                  secure and scalable products.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="#hire-expertise"
                    className="inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3.5 text-sm font-bold text-bg-base shadow-glow transition-all duration-300 hover:-translate-y-1"
                  >
                    Explore Developer Roles
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-silver transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/40 hover:text-amber-base"
                  >
                    Discuss Your Project
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    "Vetted expertise",
                    "Flexible engagement",
                    "Security-first delivery",
                  ].map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-2 text-sm font-medium text-silver"
                    >
                      <CheckCircle2 className="h-4 w-4 text-amber-base" />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {trustStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur"
                    >
                      <div className="font-display text-2xl font-black text-amber-base">
                        {item.value}
                      </div>

                      <div className="mt-1 text-xs font-medium leading-5 text-silver">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[570px]">
                <div className="absolute -inset-5 rounded-[2.5rem] bg-amber-base/10 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-surface/80 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                  <div className="relative aspect-[4/4.2] overflow-hidden rounded-[1.75rem]">
                    <Image
                      src="/media/blockchain.png"
                      alt="Hire experienced blockchain developers"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-center transition-transform duration-[3500ms] ease-out hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/5 to-transparent" />

                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-base/75 px-4 py-2 text-xs font-bold text-text-primary backdrop-blur-xl">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-base opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-base" />
                      </span>
                      Experts available
                    </div>

                    <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/10 bg-bg-base/80 p-5 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-base">
                            Developer Network
                          </p>
                          <p className="mt-2 text-lg font-black text-text-primary">
                            Specialized Web3 engineering talent
                          </p>
                        </div>

                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-base text-bg-base">
                          <Code2 className="h-6 w-6" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 top-[30%] hidden rounded-2xl border border-white/10 bg-bg-base/90 p-4 shadow-2xl backdrop-blur-xl md:block">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                      <ShieldCheck className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs text-silver">
                        Development approach
                      </p>
                      <p className="text-sm font-bold text-text-primary">
                        Security first
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-[28%] hidden rounded-2xl border border-white/10 bg-bg-base/90 p-4 shadow-2xl backdrop-blur-xl md:block">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                      <Clock3 className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs text-silver">
                        Expert matching
                      </p>
                      <p className="text-sm font-bold text-text-primary">
                        Within 24–72 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Service highlights */}

          <section className="mt-8 grid gap-5 md:grid-cols-3">
            {serviceHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-3xl border border-white/10 bg-surface/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-base/10 text-amber-base transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>

                  <h2 className="mt-5 text-xl font-black text-text-primary">
                    {item.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-silver">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </section>

          {/* Featured roles */}

          {featuredPages.length > 0 && (
            <section className="mt-24">
              <div className="mb-9 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                    Featured Expertise
                  </p>

                  <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                    Hire Specialists for Your Core Blockchain Stack
                  </h2>
                </div>

                <p className="max-w-xl text-sm leading-7 text-silver">
                  Start with our most requested developer roles or
                  explore the complete hiring library below.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredPages.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/hire/${item.slug}`}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-surface via-surface/90 to-bg-base shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40 hover:shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
                  >
                    <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-base/10 blur-3xl transition-all duration-500 group-hover:bg-amber-base/20" />

                    <div className="absolute right-6 top-4 font-display text-7xl font-black text-white/[0.025]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-center opacity-80 transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/25 to-transparent" />

                      <div className="absolute left-5 top-5 flex items-center gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/20 bg-bg-base/80 text-amber-base backdrop-blur-xl">
                          <Code2 className="h-6 w-6" />
                        </span>

                        <span className="rounded-full border border-white/10 bg-bg-base/75 px-3 py-1 text-xs text-silver backdrop-blur-xl">
                          {item.readTime || "Hiring guide"}
                        </span>
                      </div>
                    </div>

                    <div className="relative flex min-h-[260px] flex-col p-7">

                      <h3 className="mt-7 text-2xl font-black leading-tight text-text-primary transition-colors group-hover:text-amber-base">
                        {item.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-silver">
                        {item.excerpt}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.credibility
                          ?.slice(0, 3)
                          .map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-silver"
                            >
                              {skill}
                            </span>
                          ))}
                      </div>

                      <div className="mt-auto pt-7">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-base">
                          View hiring guide
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All hire roles */}

          <section
            id="hire-expertise"
            className="scroll-mt-28 pt-24"
          >
            <div className="mb-9 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Hire Expertise Library
                </p>

                <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                  Find the Right Blockchain Developer for Your Project
                </h2>
              </div>

              <div className="max-w-xl">
                <p className="text-sm leading-7 text-silver">
                  Showing {pageStart}–{pageEnd} of{" "}
                  {hireCards.length} specialist hiring guides.
                  Select a role to review capabilities, use cases,
                  hiring considerations, and project requirements.
                </p>
              </div>
            </div>

            {paginatedCards.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedCards.map((item, index) => {
                  const globalIndex =
                    (safeCurrentPage - 1) *
                      ITEMS_PER_PAGE +
                    index +
                    1;

                  return (
                    <Link
                      key={item.slug}
                      href={`/hire/${item.slug}`}
                      className="group relative flex min-h-[380px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-surface/80 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-2 hover:border-amber-base/40 hover:shadow-[0_26px_80px_rgba(0,0,0,0.32)]"
                    >
                      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/10 blur-3xl transition-colors group-hover:bg-amber-base/20" />

                      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/10">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover object-center opacity-75 transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/30 to-transparent" />

                        <div className="absolute left-5 top-5 flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-bg-base/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-base backdrop-blur-xl">
                            <Users className="h-3.5 w-3.5" />
                            Hire
                          </span>
                        </div>

                        <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-bg-base/75 px-3 py-1 font-mono text-xs text-silver/80 backdrop-blur-xl">
                          {String(globalIndex).padStart(
                            2,
                            "0"
                          )}
                        </span>
                      </div>

                      <div className="relative flex h-full flex-col p-6">
                        <div className="flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-2 text-xs font-medium text-silver">
                            <Clock3 className="h-4 w-4 text-amber-base" />
                            {item.readTime || "Hiring guide"}
                          </span>

                          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-amber-base transition-transform group-hover:translate-x-1">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>

                        <h3 className="mt-6 text-xl font-black leading-tight text-text-primary transition-colors group-hover:text-amber-base">
                          {item.title}
                        </h3>

                        <p className="mt-4 line-clamp-4 text-sm leading-7 text-silver">
                          {item.excerpt}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {item.credibility
                            ?.slice(0, 3)
                            .map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] font-medium text-silver"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-6">
                          <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-base">
                            View role
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-surface/70 p-10 text-center">
                <h3 className="text-2xl font-black text-text-primary">
                  No hiring guides found
                </h3>

                <p className="mt-3 text-sm text-silver">
                  Please check that your Hire entries use the
                  category value &quot;Hire&quot;.
                </p>
              </div>
            )}

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
                {safeCurrentPage > 1 ? (
                  <Link
                    href={getPageHref(
                      "/hire",
                      safeCurrentPage - 1
                    )}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-surface px-5 text-sm font-bold text-silver transition-all hover:border-amber-base/40 hover:text-amber-base"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Link>
                ) : (
                  <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-5 text-sm font-bold text-silver/40">
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </span>
                )}

                {Array.from({
                  length: Math.min(3, totalPages),
                }).map((_, index) => {
                  const startPage =
                    safeCurrentPage >= totalPages - 1
                      ? Math.max(totalPages - 2, 1)
                      : safeCurrentPage;

                  const page = startPage + index;
                  const isActive =
                    page === safeCurrentPage;

                  if (page > totalPages) {
                    return null;
                  }

                  return (
                    <Link
                      key={page}
                      href={getPageHref("/hire", page)}
                      aria-current={
                        isActive ? "page" : undefined
                      }
                      className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-black transition-all ${
                        isActive
                          ? "border-amber-base bg-amber-base text-bg-base shadow-glow"
                          : "border-white/10 bg-surface text-silver hover:border-amber-base/40 hover:text-amber-base"
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}

                {safeCurrentPage < totalPages ? (
                  <Link
                    href={getPageHref(
                      "/hire",
                      safeCurrentPage + 1
                    )}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-amber-base px-5 text-sm font-bold text-bg-base transition-transform hover:-translate-y-0.5"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <span className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full bg-amber-base/30 px-5 text-sm font-bold text-bg-base/50">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </span>
                )}
              </div>
            )}
          </section>

          {/* Hiring models */}

          <section className="mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                Flexible Engagement
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                Choose the Right Hiring Model
              </h2>

              <p className="mt-5 text-sm leading-7 text-silver md:text-base">
                Engage one developer, assemble a complete team, or
                deliver a defined project with a model aligned to
                your product stage and technical needs.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {hiringModels.map((model) => {
                const Icon = model.icon;

                return (
                  <article
                    key={model.title}
                    className="group rounded-[2rem] border border-white/10 bg-surface/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid h-13 w-13 place-items-center rounded-2xl bg-amber-base/10 p-3 text-amber-base">
                        <Icon className="h-6 w-6" />
                      </span>

                      <span className="rounded-full border border-amber-base/20 bg-amber-base/10 px-3 py-1 text-xs font-bold text-amber-base">
                        {model.label}
                      </span>
                    </div>

                    <h3 className="mt-6 text-2xl font-black leading-tight text-text-primary">
                      {model.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-silver">
                      {model.description}
                    </p>

                    <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                      {model.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 text-sm text-silver"
                        >
                          <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Process */}

          <section className="mt-24 overflow-hidden rounded-[2.2rem] border border-white/10 bg-bg-base/70 p-6 md:p-10 lg:p-12">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Simple Hiring Process
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                  From Requirement to Development Without Hiring Delays
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-silver">
                  Our structured process helps you identify the
                  required expertise, review the engagement model,
                  and begin development with clear expectations.
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-bold text-bg-base shadow-glow transition-transform hover:-translate-y-1"
                >
                  Start the Hiring Process
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {hiringProcess.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.step}
                      className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/70 p-6"
                    >
                      <div className="absolute right-5 top-3 font-display text-5xl font-black text-white/[0.035]">
                        {item.step}
                      </div>

                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                        <Icon className="h-5 w-5" />
                      </span>

                      <h3 className="mt-5 text-lg font-black text-text-primary">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-silver">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why us */}

          <section className="mt-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Why ClickMasters
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-text-primary md:text-5xl">
                  More Than a Developer Marketplace
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-silver">
                  Get specialized blockchain capability supported
                  by architecture, security, delivery, and
                  long-term technical expertise.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {reasons.map((reason) => {
                  const Icon = reason.icon;

                  return (
                    <article
                      key={reason.title}
                      className="rounded-3xl border border-white/10 bg-surface/70 p-6 transition-colors hover:border-amber-base/30"
                    >
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                        <Icon className="h-6 w-6" />
                      </span>

                      <h3 className="mt-5 text-xl font-black text-text-primary">
                        {reason.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-silver">
                        {reason.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Final CTA */}

          <section className="mt-24">
            <div className="relative overflow-hidden rounded-[2.2rem] border border-amber-base/20 bg-gradient-to-r from-amber-base via-amber-light to-surface p-8 text-bg-base md:p-14">
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-bg-base/15 blur-3xl" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-bg-base/70">
                    Start Building
                  </p>

                  <h2 className="mt-3 max-w-4xl text-3xl font-black leading-tight md:text-5xl">
                    Need the Right Blockchain Developer for Your
                    Next Product?
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-bg-base/80 md:text-base">
                    Share your requirements and receive a practical
                    recommendation for the expertise, team
                    structure, timeline, and engagement model your
                    project needs.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-bg-base px-8 py-4 text-sm font-bold text-amber-base shadow-glow transition-transform hover:-translate-y-1"
                >
                  Book a Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
