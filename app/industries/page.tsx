// app/industries/page.tsx
import { redirect } from "next/navigation";

import IndustryPagination from "@/components/industries/IndustryPagination";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  Building2,
  Check,
  CheckCircle2,
  FileCheck2,
  Globe2,
  Landmark,
  Layers3,
  Network,
  RadioTower,
  RefreshCcw,
  Rocket,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";

import { createMetadata } from "@/config/metadata";
import { getIndustryCards } from "@/lib/industry";

/* =========================================================
   Metadata
========================================================= */

export const metadata = createMetadata({
  title: "Blockchain Solutions for Global Industries",
  description:
    "Explore secure and scalable blockchain solutions for finance, healthcare, supply chain, real estate, insurance, energy, gaming, government, and enterprise operations.",
  path: "/industries",
});

/* =========================================================
   Static Content
========================================================= */

const heroProofPoints = [
  "Industry-specific architecture",
  "Compliance-aware engineering",
  "Secure enterprise integrations",
];

const heroStats = [
  {
    value: "18+",
    label: "Industries covered",
  },
  {
    value: "360°",
    label: "Product delivery",
  },
  {
    value: "24/7",
    label: "Technical support",
  },
];

const transformationFlow = [
  {
    number: "01",
    icon: ScanLine,
    title: "Identify the Trust Gap",
    description:
      "We identify where fragmented data, manual verification, intermediaries, reconciliation, or limited transparency creates friction.",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Design the Shared System",
    description:
      "We define participants, permissions, transaction rules, governance, integrations, data ownership, and the correct blockchain model.",
  },
  {
    number: "03",
    icon: Blocks,
    title: "Automate Critical Operations",
    description:
      "Smart contracts transform business rules into secure workflows for verification, approvals, ownership, payments, and settlement.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch and Scale",
    description:
      "The platform is deployed, monitored, optimized, integrated with existing systems, and expanded as adoption and transaction volume grow.",
  },
];

const architectureLayers = [
  {
    icon: Globe2,
    label: "Experience Layer",
    title: "Applications and Portals",
    description:
      "Customer applications, enterprise dashboards, mobile products, administration systems, and partner interfaces.",
    items: [
      "Web and mobile applications",
      "Enterprise dashboards",
      "Customer and partner portals",
    ],
  },
  {
    icon: RefreshCcw,
    label: "Integration Layer",
    title: "Connected Business Systems",
    description:
      "Secure APIs and infrastructure connect blockchain products with existing business platforms and external services.",
    items: [
      "ERP and CRM integrations",
      "Payment and banking APIs",
      "Identity and compliance services",
    ],
  },
  {
    icon: Blocks,
    label: "Protocol Layer",
    title: "Smart Contract Infrastructure",
    description:
      "Business rules, digital assets, permissions, workflows, settlement logic, and governance are executed programmatically.",
    items: [
      "Smart contracts",
      "Token and asset logic",
      "Governance and permissions",
    ],
  },
  {
    icon: ShieldCheck,
    label: "Trust Layer",
    title: "Security and Verification",
    description:
      "Identity, encryption, auditability, transaction validation, data integrity, and infrastructure controls protect the platform.",
    items: [
      "Access control",
      "Audit and monitoring",
      "Secure key management",
    ],
  },
];

const businessOutcomes = [
  {
    icon: Zap,
    metric: "Faster",
    title: "Operational Execution",
    description:
      "Replace delayed approvals and manual coordination with programmable workflows and automatic business events.",
  },
  {
    icon: FileCheck2,
    metric: "Verified",
    title: "Business Data",
    description:
      "Create trusted records that participants can validate without repeatedly reconciling disconnected databases.",
  },
  {
    icon: ShieldCheck,
    metric: "Secure",
    title: "Digital Transactions",
    description:
      "Protect ownership, permissions, assets, identities, agreements, and transaction history through secure architecture.",
  },
  {
    icon: Network,
    metric: "Connected",
    title: "Industry Ecosystems",
    description:
      "Give customers, businesses, suppliers, regulators, and service providers access to one coordinated infrastructure.",
  },
];

const deliveryAdvantages = [
  {
    icon: Landmark,
    title: "Industry and Business Understanding",
    description:
      "We connect blockchain capabilities with the participants, workflows, regulations, risks, and economics of your industry.",
  },
  {
    icon: ShieldCheck,
    title: "Security-Led Architecture",
    description:
      "Access control, smart contract risks, data protection, upgradeability, failure scenarios, and monitoring are considered from day one.",
  },
  {
    icon: RadioTower,
    title: "Existing System Integration",
    description:
      "We connect blockchain products with payment systems, ERP, CRM, identity services, banking APIs, cloud infrastructure, and third-party platforms.",
  },
  {
    icon: BadgeCheck,
    title: "Production-Ready Delivery",
    description:
      "Architecture, product design, development, testing, deployment, monitoring, optimization, and support are handled under one engagement.",
  },
];

/* =========================================================
   Page
========================================================= */

type IndustriesPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function IndustriesPage({
  searchParams,
}: IndustriesPageProps) {
  const resolvedSearchParams = await searchParams;

  const cardsPerPage = 9;

  const requestedPage = Number(
    resolvedSearchParams.page || "1",
  );

  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
      

  const industryCards = getIndustryCards();

  const totalPages = Math.max(
    1,
    Math.ceil(industryCards.length / cardsPerPage),
  );

  if (currentPage > totalPages) {
    redirect(
      totalPages === 1
        ? "/industries"
        : `/industries?page=${totalPages}`,
    );
  }

  const startIndex = (currentPage - 1) * cardsPerPage;

  const visibleIndustryCards = industryCards.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-background via-bg-base to-background pb-24 pt-32">
        {/* =====================================================
            Background Decoration
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-18rem] top-[-12rem] h-[42rem] w-[42rem] rounded-full bg-amber-base/[0.06] blur-[130px]" />

          <div className="absolute right-[-16rem] top-[34rem] h-[38rem] w-[38rem] rounded-full bg-amber-base/[0.045] blur-[130px]" />

          <div className="absolute bottom-[24rem] left-[32%] h-[34rem] w-[34rem] rounded-full bg-amber-base/[0.025] blur-[140px]" />

          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="site-container relative px-6">
          {/* =====================================================
              Hero
          ====================================================== */}

          <section className="relative min-h-[700px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface via-bg-base to-background shadow-[0_40px_140px_rgba(0,0,0,0.32)]">
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />

            <div className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-amber-base/[0.08] blur-[110px]" />

            <div className="absolute -bottom-48 left-[20%] h-[30rem] w-[30rem] rounded-full bg-amber-base/[0.035] blur-[120px]" />

            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="grid min-h-[700px] gap-14 p-6 md:p-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:p-14 xl:p-16">
              {/* Hero content */}

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.075] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
                  <Sparkles className="h-4 w-4" />

                  Blockchain Across Industries
                </div>

                <h1 className="mt-8 max-w-4xl font-display text-4xl font-black leading-[1.04] tracking-[-0.04em] text-text-primary sm:text-5xl md:text-6xl xl:text-[4.5rem]">
                  Blockchain Solutions Built for{" "}
                  <span className="bg-gradient-to-r from-amber-base via-amber-light to-amber-base bg-clip-text text-transparent">
                    Real-World Industries
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-silver md:text-lg">
                  We design secure blockchain platforms around
                  your industry&apos;s real workflows, assets,
                  participants, compliance requirements,
                  integrations, and long-term business goals.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="#industry-explorer"
                    className="group inline-flex items-center gap-2 rounded-full bg-amber-base px-7 py-4 text-sm font-black text-bg-base shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
                  >
                    Explore Industries

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-7 py-4 text-sm font-bold text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.05] hover:text-amber-base"
                  >
                    Discuss Your Business

                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {heroProofPoints.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2 rounded-2xl border border-white/[0.075] bg-white/[0.025] px-4 py-3.5 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />

                      <span className="text-xs font-medium leading-5 text-silver">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/[0.08] pt-8">
                  {heroStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-2xl font-black text-text-primary">
                        {stat.value}
                      </div>

                      <div className="mt-1 text-xs text-silver">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero image */}

              <div className="relative mx-auto w-full max-w-[590px]">
                <div className="absolute -inset-8 rounded-[3rem] bg-amber-base/[0.07] blur-[90px]" />

                <div className="relative">
                  <div className="relative overflow-hidden rounded-[2.35rem] border border-white/10 bg-surface p-3 shadow-[0_35px_110px_rgba(0,0,0,0.32)]">
                    <div className="relative aspect-[4/4.45] overflow-hidden rounded-[1.85rem]">
                      <Image
                        src="/media/blockchain.png"
                        alt="Blockchain technology for global industries"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 46vw"
                        className="object-cover object-center transition-transform duration-[1800ms] ease-out hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-bg-base/10" />

                      <div className="absolute inset-0 bg-gradient-to-r from-bg-base/20 via-transparent to-transparent" />

                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-base/75 px-4 py-2 text-xs font-bold text-text-primary backdrop-blur-xl">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-base opacity-60" />

                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-base" />
                        </span>

                        Enterprise blockchain solutions
                      </div>

                      <div className="absolute inset-x-5 bottom-5 rounded-[1.7rem] border border-white/10 bg-bg-base/80 p-5 backdrop-blur-xl md:p-6">
                        <div className="flex items-end justify-between gap-5">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                              Industry Transformation
                            </p>

                            <p className="mt-2 max-w-sm text-lg font-black leading-snug text-text-primary md:text-xl">
                              Secure infrastructure designed around
                              real business operations
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {[
                                "Secure",
                                "Scalable",
                                "Connected",
                              ].map((item) => (
                                <span
                                  key={item}
                                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[10px] font-medium text-silver"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-base text-bg-base shadow-glow">
                            <Blocks className="h-6 w-6" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -left-5 top-[27%] hidden rounded-2xl border border-white/10 bg-bg-base/90 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:block">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                        <ShieldCheck className="h-5 w-5" />
                      </span>

                      <div>
                        <p className="text-[10px] text-silver">
                          Architecture
                        </p>

                        <p className="text-xs font-black text-text-primary">
                          Security first
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute -right-5 bottom-[25%] hidden rounded-2xl border border-white/10 bg-bg-base/90 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:block">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                        <Network className="h-5 w-5" />
                      </span>

                      <div>
                        <p className="text-[10px] text-silver">
                          Infrastructure
                        </p>

                        <p className="text-xs font-black text-text-primary">
                          Enterprise ready
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              Transformation Journey
          ====================================================== */}

          <section className="mt-24">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Transformation Journey
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                  From Industry Friction to Shared Digital
                  Infrastructure
                </h2>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-silver lg:justify-self-end">
                Blockchain creates value when it solves a real
                coordination, ownership, verification, trust, or
                settlement problem—not when it is added only as a
                technology feature.
              </p>
            </div>

            <div className="relative mt-12">
              <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-amber-base/25 to-transparent lg:block" />

              <div className="grid gap-5 lg:grid-cols-4">
                {transformationFlow.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.number}
                      className="group relative rounded-[1.75rem] border border-white/[0.085] bg-surface/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-surface"
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-amber-base/20 bg-bg-base text-amber-base shadow-[0_10px_35px_rgba(0,0,0,0.18)]">
                          <Icon className="h-6 w-6" />
                        </span>

                        <span className="font-mono text-xs font-bold text-amber-base/45">
                          {item.number}
                        </span>
                      </div>

                      <h3 className="mt-6 text-xl font-black text-text-primary">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-silver">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              Industry Explorer
          ====================================================== */}

          <section
            id="industry-explorer"
            className="scroll-mt-28 pt-24"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.065] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-base">
                  <Building2 className="h-4 w-4" />

                  Industry Solutions
                </div>

                <h2 className="mt-5 max-w-4xl text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                  Blockchain Solutions Designed Around Your
                  Industry
                </h2>
              </div>

              <div className="lg:text-right">
                <p className="text-sm leading-7 text-silver">
                  Explore how blockchain can improve trust,
                  ownership, automation, security, verification,
                  and coordination across your industry.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-bold text-amber-base">
                  {industryCards.length} industry guides available
                </div>
              </div>
            </div>

            {industryCards.length > 0 ? (
              <>
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {visibleIndustryCards.map((industry, index) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="group relative flex min-h-[500px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface shadow-[0_20px_65px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:bg-surface/90 hover:shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
                  >
                    <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-base/[0.045] blur-[60px] transition-colors duration-500 group-hover:bg-amber-base/[0.09]" />

                    <div className="relative h-[220px] overflow-hidden border-b border-white/[0.08] bg-gradient-to-br from-bg-base via-surface to-amber-base/[0.12] sm:h-[240px]">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-[0.18]"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(217,119,6,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.18) 1px, transparent 1px)",
                          backgroundSize: "28px 28px",
                        }}
                      />

                      <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-amber-base/[0.10] blur-3xl" />

                      <div className="absolute -bottom-16 right-8 h-52 w-52 rounded-full bg-emerald-base/[0.08] blur-3xl" />

                      <div className="relative flex h-full items-center justify-center p-8">
                        <div className="absolute h-40 w-40 rounded-full bg-amber-base/[0.12] blur-3xl transition-transform duration-700 group-hover:scale-125" />

                        <div className="relative grid h-28 w-28 place-items-center rounded-[1.75rem] border border-white/[0.12] bg-bg-base/80 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.20)] backdrop-blur-xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-105 group-hover:border-amber-base/35 sm:h-32 sm:w-32">
                          <Image
                            src={industry.image}
                            alt={industry.title}
                            width={112}
                            height={112}
                            sizes="112px"
                            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-base/55 to-transparent" />

                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

                      <div className="absolute inset-0 bg-gradient-to-r from-bg-base/15 via-transparent to-transparent" />

                      <div className="absolute left-5 top-5">
                        <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-bg-base/75 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-base backdrop-blur-xl">
                          <Building2 className="h-3.5 w-3.5" />

                          {industry.badge || "Industry"}
                        </span>
                      </div>

                      <span className="absolute right-5 top-5 grid h-9 min-w-9 place-items-center rounded-full border border-white/10 bg-bg-base/70 px-2 font-mono text-[10px] font-bold text-silver backdrop-blur-xl">
                        {String(startIndex + index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col p-6 md:p-7">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                          Blockchain for
                        </p>

                        <span className="text-xs font-medium text-silver">
                          {industry.readTime || "Industry guide"}
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-black leading-[1.2] tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-amber-base">
                        {industry.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-silver">
                        {industry.excerpt}
                      </p>

                      {industry.credibility.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {industry.credibility
                            .slice(0, 3)
                            .map((item) => (
                              <span
                                key={item}
                                className="rounded-full border border-white/[0.085] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-silver"
                              >
                                {item}
                              </span>
                            ))}
                        </div>
                      )}

                      <div className="mt-auto pt-7">
                        <div className="flex items-center justify-between border-t border-white/[0.08] pt-5">
                          <span className="text-sm font-black text-text-primary transition-colors group-hover:text-amber-base">
                            Explore solution
                          </span>

                          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.09] bg-white/[0.025] text-amber-base transition-all duration-300 group-hover:border-amber-base/30 group-hover:bg-amber-base group-hover:text-bg-base">
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                </div>

                <IndustryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <div className="mt-12 rounded-[2rem] border border-white/10 bg-surface p-12 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                  <Building2 className="h-7 w-7" />
                </span>

                <h3 className="mt-5 text-2xl font-black text-text-primary">
                  No industry pages found
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-silver">
                  Confirm that your industry entries contain all
                  required fields and use the category value
                  &quot;Industry&quot;.
                </p>
              </div>
            )}
          </section>

          {/* =====================================================
              Solution Architecture
          ====================================================== */}

          <section className="mt-24 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface via-bg-base to-background p-6 shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:p-10 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Solution Architecture
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                  Every Industry Solution Requires More Than
                  Smart Contracts
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-silver md:text-base">
                  A production blockchain product combines user
                  experience, integrations, programmable
                  infrastructure, security, data, and operational
                  controls into one connected architecture.
                </p>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-base/30 bg-amber-base/[0.08] px-6 py-3 text-sm font-black text-amber-base transition-all hover:-translate-y-1 hover:bg-amber-base hover:text-bg-base"
                >
                  Plan Your Architecture

                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="relative space-y-3">
                <div className="absolute bottom-8 left-7 top-8 w-px bg-gradient-to-b from-amber-base/10 via-amber-base/55 to-amber-base/10" />

                {architectureLayers.map((layer, index) => {
                  const Icon = layer.icon;

                  return (
                    <article
                      key={layer.title}
                      className="group relative ml-4 rounded-[1.5rem] border border-white/[0.08] bg-surface/80 p-5 pl-16 transition-all hover:border-amber-base/30 hover:bg-surface"
                    >
                      <span className="absolute -left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl border border-amber-base/20 bg-bg-base text-amber-base shadow-xl">
                        <Icon className="h-5 w-5" />
                      </span>

                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                            {layer.label}
                          </p>

                          <h3 className="mt-2 text-xl font-black text-text-primary">
                            {layer.title}
                          </h3>

                          <p className="mt-2 max-w-xl text-sm leading-6 text-silver">
                            {layer.description}
                          </p>
                        </div>

                        <span className="font-mono text-xs font-black text-white/15">
                          L{index + 1}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1 text-[10px] font-medium text-silver"
                          >
                            <Check className="h-3 w-3 text-amber-base" />

                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              Business Outcomes
          ====================================================== */}

          <section className="mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                Business Outcomes
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                Technology Designed to Improve Real Operations
              </h2>

              <p className="mt-5 text-sm leading-7 text-silver md:text-base">
                The goal is not simply blockchain adoption. The
                goal is better execution, trusted information,
                secure transactions, and stronger coordination.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {businessOutcomes.map((outcome) => {
                const Icon = outcome.icon;

                return (
                  <article
                    key={outcome.title}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/[0.085] bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-surface/90"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/[0.045] blur-3xl transition-colors group-hover:bg-amber-base/[0.1]" />

                    <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                      <Icon className="h-6 w-6" />
                    </span>

                    <p className="relative mt-8 bg-gradient-to-r from-amber-base to-amber-light bg-clip-text font-display text-4xl font-black text-transparent">
                      {outcome.metric}
                    </p>

                    <h3 className="relative mt-2 text-lg font-black text-text-primary">
                      {outcome.title}
                    </h3>

                    <p className="relative mt-4 text-sm leading-7 text-silver">
                      {outcome.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* =====================================================
              Why ClickMasters
          ====================================================== */}

          <section className="mt-24">
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Why ClickMasters
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                  Industry Strategy Meets Blockchain Engineering
                </h2>

                <p className="mt-6 max-w-lg text-sm leading-7 text-silver">
                  We do not force every business into the same
                  blockchain template. Architecture, technology,
                  governance, integrations, and delivery are
                  selected according to the actual industry
                  environment.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {deliveryAdvantages.map((advantage, index) => {
                  const Icon = advantage.icon;

                  return (
                    <article
                      key={advantage.title}
                      className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/[0.085] bg-surface p-7 transition-all hover:border-amber-base/30 hover:bg-surface/90"
                    >
                      <span className="absolute right-6 top-4 font-display text-6xl font-black text-white/[0.025]">
                        0{index + 1}
                      </span>

                      <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-amber-base/10 text-amber-base transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </span>

                      <h3 className="relative mt-7 text-xl font-black text-text-primary">
                        {advantage.title}
                      </h3>

                      <p className="relative mt-4 text-sm leading-7 text-silver">
                        {advantage.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              Final CTA
          ====================================================== */}

          <section className="mt-24">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-base/20 bg-bg-base p-8 shadow-[0_30px_120px_rgba(0,0,0,0.22)] md:p-12 lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-base/[0.13] via-transparent to-amber-base/[0.035]" />

              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-amber-base/10" />

              <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border border-amber-base/20" />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                    <Sparkles className="h-4 w-4" />

                    Build for Your Industry
                  </div>

                  <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-text-primary md:text-5xl">
                    Turn Your Industry Challenge Into a Secure
                    Digital Platform
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-silver md:text-base">
                    Share your business model, operational
                    challenge, or product idea. We will help define
                    the right blockchain use case, architecture,
                    integrations, roadmap, and delivery model.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-base px-8 py-4 text-sm font-black text-bg-base shadow-glow transition-transform hover:-translate-y-1 hover:bg-amber-light"
                  >
                    Book a Free Consultation

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/service"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-8 py-4 text-sm font-bold text-text-primary transition-all hover:border-amber-base/30 hover:bg-amber-base/[0.05] hover:text-amber-base"
                  >
                    Explore Our Services

                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
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
