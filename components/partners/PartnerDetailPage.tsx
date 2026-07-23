// components/partners/PartnerDetailPage.tsx

"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheckBig,
  Clock3,
  Code2,
  Cpu,
  Database,
  FileText,
  Globe2,
  Handshake,
  Home,
  Layers3,
  Network,
  Orbit,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Users2,
  Workflow,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";

import type {
  NormalizedPartnerEntry,
  PartnerContentBlock,
} from "@/lib/partner";

/* =========================================================
   Types
========================================================= */

type PartnerDetailPageProps = {
  partner: NormalizedPartnerEntry;
  relatedPartners: NormalizedPartnerEntry[];
};

type SectionId =
  | "overview"
  | "capabilities"
  | "partner-content"
  | "process"
  | "faq"
  | "related";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

type FAQItemProps = {
  question: string;
  answer: string;
  index: number;
};

/* =========================================================
   Helpers
========================================================= */

function getPartnerDisplayName(
  partner: NormalizedPartnerEntry,
): string {
  const titleLead = partner.title
    .split(/\s+[—–]\s+/)[0]
    ?.trim();

  if (titleLead) {
    return titleLead;
  }

  return partner.slug
    .replace(/^partners?-/, "")
    .replace(/^blockchain-partner-/, "")
    .split("-")
    .filter(Boolean)
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1),
    )
    .join(" ");
}

function getPartnerType(
  partner: NormalizedPartnerEntry,
): string {
  const title = partner.title.toLowerCase();

  if (
    title.includes("audit") ||
    title.includes("security")
  ) {
    return "Blockchain Security";
  }

  if (
    title.includes("legal") ||
    title.includes("counsel")
  ) {
    return "Legal and Compliance";
  }

  if (
    title.includes("aws") ||
    title.includes("alchemy") ||
    title.includes("infrastructure")
  ) {
    return "Blockchain Infrastructure";
  }

  if (
    title.includes("wallet") ||
    title.includes("magic") ||
    title.includes("privy")
  ) {
    return "Wallet Infrastructure";
  }

  if (
    title.includes("fireblocks") ||
    title.includes("custody")
  ) {
    return "Institutional Custody";
  }

  if (
    title.includes("chainlink") ||
    title.includes("oracle")
  ) {
    return "Oracle Infrastructure";
  }

  if (
    title.includes("openzeppelin") ||
    title.includes("contracts")
  ) {
    return "Smart Contract Standards";
  }

  if (
    title.includes("certora") ||
    title.includes("verification")
  ) {
    return "Formal Verification";
  }

  return "Technology Integration";
}

/* =========================================================
   Static Content
========================================================= */

const navigationItems: Array<{
  id: SectionId;
  label: string;
}> = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "capabilities",
    label: "Capabilities",
  },
  {
    id: "partner-content",
    label: "Integration Guide",
  },
  {
    id: "process",
    label: "Process",
  },
  {
    id: "faq",
    label: "FAQs",
  },
];

const capabilityCards = [
  {
    icon: Blocks,
    number: "01",
    title: "Technical Integration",
    shortDescription:
      "Secure implementation of partner technologies inside production blockchain products.",
    details: [
      "Architecture and integration planning",
      "SDK, API, and smart contract integration",
      "Testing and production validation",
    ],
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Security Review",
    shortDescription:
      "Security requirements are evaluated before partner tools enter the production environment.",
    details: [
      "Threat and dependency analysis",
      "Access-control planning",
      "Failure and recovery scenarios",
    ],
  },
  {
    icon: Layers3,
    number: "03",
    title: "Product Architecture",
    shortDescription:
      "Each integration is selected according to the product workflow, users, and expected scale.",
    details: [
      "On-chain and off-chain workflows",
      "Infrastructure dependencies",
      "Long-term scalability planning",
    ],
  },
  {
    icon: Database,
    number: "04",
    title: "Data and Infrastructure",
    shortDescription:
      "Partner platforms are connected with backend systems, databases, APIs, and monitoring.",
    details: [
      "Backend and API integrations",
      "Event and transaction processing",
      "Monitoring and observability",
    ],
  },
  {
    icon: Network,
    number: "05",
    title: "Multi-System Connectivity",
    shortDescription:
      "Connect blockchain infrastructure with payments, identity, analytics, and enterprise software.",
    details: [
      "Third-party system integration",
      "Cross-chain and multi-chain support",
      "Enterprise application connectivity",
    ],
  },
  {
    icon: Rocket,
    number: "06",
    title: "Deployment and Scaling",
    shortDescription:
      "Move from development to production with reliability, monitoring, and scaling support.",
    details: [
      "Production deployment planning",
      "Performance optimization",
      "Upgrades and ongoing maintenance",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    icon: Search,
    title: "Requirement Analysis",
    description:
      "We evaluate your business model, product architecture, users, transaction volume, compliance needs, and technical constraints.",
  },
  {
    number: "02",
    icon: Workflow,
    title: "Integration Design",
    description:
      "We define how the partner technology connects with smart contracts, backend systems, wallets, APIs, and user workflows.",
  },
  {
    number: "03",
    icon: Code2,
    title: "Implementation",
    description:
      "Our engineers configure and integrate the technology with secure error handling, access control, monitoring, and testing.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch and Support",
    description:
      "We deploy, monitor, optimize, maintain, and upgrade the integration as the blockchain product grows.",
  },
];

const expertiseCards = [
  {
    icon: Cpu,
    title: "Technical Evaluation",
    description:
      "We assess whether the technology fits your architecture, scale, security requirements, and long-term product roadmap.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Integration",
    description:
      "Access control, key management, data protection, failure handling, and infrastructure security are considered from the beginning.",
  },
  {
    icon: Users2,
    title: "User Experience",
    description:
      "Partner technology is integrated without creating unnecessary friction for end users or internal teams.",
  },
  {
    icon: Zap,
    title: "Ongoing Optimization",
    description:
      "We monitor reliability, performance, pricing, vendor changes, and product requirements after launch.",
  },
];

/* =========================================================
   Main Component
========================================================= */

export default function PartnerDetailPage({
  partner,
  relatedPartners,
}: PartnerDetailPageProps) {
  const [readingProgress, setReadingProgress] =
    useState(0);

  const [activeSection, setActiveSection] =
    useState<SectionId>("overview");

  const partnerName =
    getPartnerDisplayName(partner);

  const partnerType = getPartnerType(partner);

  const heroTitle =
    partner.hero?.title || partner.title;

  const heroDescription =
    partner.hero?.description ||
    partner.excerpt;

  const heroBadge =
    partner.hero?.badge ||
    "TECHNOLOGY PARTNER";

  const heroImage =
    partner.hero?.image || partner.image;

  const credibilityItems =
    partner.credibility.length > 0
      ? partner.credibility
      : [
          "Production-ready integration",
          "Security-first architecture",
          "End-to-end technical delivery",
        ];

  const contentBlocks = partner.content;

  const faqItems = partner.faqs;

  const stats = useMemo(
    () => [
      {
        value: partnerName,
        label: "Technology provider",
      },
      {
        value: partnerType,
        label: "Integration category",
      },
      {
        value: "360°",
        label: "Technical delivery",
      },
      {
        value: "24/7",
        label: "Production support",
      },
    ],
    [partnerName, partnerType],
  );

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (scrollableHeight <= 0) {
        setReadingProgress(0);
        return;
      }

      setReadingProgress(
        Math.min(
          100,
          Math.max(
            0,
            (window.scrollY / scrollableHeight) *
              100,
          ),
        ),
      );
    };

    updateReadingProgress();

    window.addEventListener(
      "scroll",
      updateReadingProgress,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateReadingProgress,
      );
    };
  }, []);

  useEffect(() => {
    const availableSections =
      navigationItems
        .map(({ id }) =>
          document.getElementById(id),
        )
        .filter(
          (
            section,
          ): section is HTMLElement =>
            Boolean(section),
        );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter(
            (entry) =>
              entry.isIntersecting,
          )
          .sort(
            (first, second) =>
              second.intersectionRatio -
              first.intersectionRatio,
          )[0];

        if (visibleEntry) {
          setActiveSection(
            visibleEntry.target.id as SectionId,
          );
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    availableSections.forEach((section) =>
      observer.observe(section),
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = useCallback(
    (sectionId: SectionId) => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    },
    [],
  );

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Reading Progress */}

      <div className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-bg-base">
        <div
          className="h-full bg-amber-base shadow-glow transition-[width] duration-150"
          style={{
            width: `${readingProgress}%`,
          }}
        />
      </div>

      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-background via-bg-base to-background pb-24 pt-28 md:pt-32">
        <PageBackground />

        <div className="site-container relative px-6">
          {/* Breadcrumb */}

          <nav
            aria-label="Breadcrumb"
            className="mb-6 overflow-hidden rounded-2xl border border-border-default bg-bg-surface/80 px-4 py-3 backdrop-blur-xl transition-all duration-500 hover:border-amber-base/20 sm:px-5"
          >
            <div className="flex min-w-0 items-center gap-2 overflow-hidden text-xs font-semibold text-text-secondary sm:text-sm">
              <Link
                href="/"
                className="inline-flex shrink-0 items-center gap-2 transition-colors duration-300 hover:text-amber-base"
              >
                <Home className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Home
                </span>
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

              <Link
                href="/partners"
                className="shrink-0 transition-colors duration-300 hover:text-amber-base"
              >
                Partners
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

              <span className="min-w-0 truncate font-bold text-text-primary">
                {partnerName}
              </span>
            </div>
          </nav>

          {/* =====================================================
              Hero
          ====================================================== */}

          <section
            id="overview"
            className="scroll-mt-32"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface shadow-[0_40px_140px_rgba(0,0,0,0.34)] md:rounded-[3rem]">
              <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-amber-base to-transparent" />

              <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-amber-base/[0.08] blur-[120px]" />

              <div className="absolute -bottom-52 left-[18%] h-[30rem] w-[30rem] rounded-full bg-amber-base/[0.04] blur-[130px]" />

              <div className="grid min-h-[720px] lg:grid-cols-[1.03fr_0.97fr]">
                {/* Hero Content */}

                <div className="relative z-10 flex flex-col justify-center p-7 md:p-12 lg:p-14 xl:p-16">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.08] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base md:text-xs">
                    <Handshake className="h-4 w-4" />

                    {heroBadge}
                  </div>

                  <h1 className="mt-8 max-w-4xl font-display text-4xl font-black leading-[1.03] tracking-[-0.045em] text-text-primary sm:text-5xl md:text-6xl xl:text-[4.2rem]">
                    {heroTitle}
                  </h1>

                  <p className="mt-7 max-w-2xl text-base leading-8 text-silver md:text-lg">
                    {heroDescription}
                  </p>

                  <div className="mt-9 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-base px-7 py-4 text-sm font-black text-bg-base shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
                    >
                      Discuss Your Integration

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          "capabilities",
                        )
                      }
                      className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-7 py-4 text-sm font-bold text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.07] hover:text-amber-base"
                    >
                      Explore Capabilities

                      <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                    </button>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {credibilityItems
                      .slice(0, 3)
                      .map((item) => (
                        <div
                          key={item}
                          className="group flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/25 hover:bg-amber-base/[0.05]"
                        >
                          <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-amber-base transition-transform duration-300 group-hover:scale-110" />

                          <span className="text-xs font-medium leading-5 text-silver">
                            {item}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-silver">
                    {partner.readTime && (
                      <span className="inline-flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-amber-base" />

                        {partner.readTime}
                      </span>
                    )}

                    {partner.date && (
                      <span className="inline-flex items-center gap-2">
                        <FileText className="h-4 w-4 text-amber-base" />

                        {partner.date}
                      </span>
                    )}

                    {partner.author && (
                      <span className="inline-flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-amber-base" />

                        {partner.author}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hero Visual */}

                <HeroVisual
                  heroImage={heroImage}
                  heroTitle={heroTitle}
                  partnerName={partnerName}
                  partnerType={partnerType}
                />
              </div>

              {/* Hero Stats */}

              <div className="grid border-t border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="group relative overflow-hidden border-b border-white/[0.08] p-6 transition-colors duration-300 hover:bg-amber-base/[0.05] sm:border-r lg:border-b-0"
                  >
                    <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-amber-base transition-transform duration-500 group-hover:scale-x-100" />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-display text-xl font-black text-text-primary md:text-2xl">
                          {stat.value}
                        </div>

                        <div className="mt-2 text-xs text-silver">
                          {stat.label}
                        </div>
                      </div>

                      <span className="font-mono text-[10px] text-amber-base/45">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              Sticky Navigation
          ====================================================== */}

          <div className="sticky top-20 z-40 mt-6 hidden justify-center lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-bg-base/90 p-1.5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              {navigationItems.map((item) => {
                const isActive =
                  activeSection === item.id;

                const sectionExists =
                  item.id !== "faq" ||
                  faqItems.length > 0;

                if (!sectionExists) {
                  return null;
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      scrollToSection(item.id)
                    }
                    className={[
                      "rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300",
                      isActive
                        ? "bg-amber-base text-bg-base shadow-glow"
                        : "text-silver hover:bg-white/[0.04] hover:text-text-primary",
                    ].join(" ")}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              Expertise Cards
          ====================================================== */}

          <section className="pt-24">
            <SectionHeading
              eyebrow="Why This Integration"
              title={`Production-Ready Integration With ${partnerName}`}
              description="We evaluate each partner technology according to security, technical fit, user experience, infrastructure requirements, cost, reliability, and long-term product scalability."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {expertiseCards.map((card) => {
                const Icon = card.icon;

                return (
                  <SpotlightCard
                    key={card.title}
                    className="group min-h-[310px] p-7"
                  >
                    <div className="relative z-10 flex h-full flex-col">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/[0.08] text-amber-base transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-base group-hover:text-bg-base">
                        <Icon className="h-6 w-6" />
                      </span>

                      <h3 className="mt-8 text-xl font-black text-text-primary">
                        {card.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-silver">
                        {card.description}
                      </p>

                      <div className="mt-auto pt-7">
                        <span className="inline-flex items-center gap-2 text-xs font-black text-amber-base opacity-70 transition-opacity group-hover:opacity-100">
                          Integration expertise

                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* =====================================================
              Capabilities
          ====================================================== */}

          <section
            id="capabilities"
            className="scroll-mt-32 pt-24"
          >
            <SectionHeading
              eyebrow="Integration Capabilities"
              title={`${partnerName} Integration Services`}
              description="Each implementation is planned around real business requirements, security constraints, technical dependencies, user workflows, and future scaling."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {capabilityCards.map(
                (capability) => {
                  const Icon = capability.icon;

                  return (
                    <article
                      key={capability.title}
                      className="group relative min-h-[390px] overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface p-7 transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:shadow-[0_30px_90px_rgba(0,0,0,0.26)]"
                    >
                      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-base/[0.04] blur-[60px] transition-all duration-500 group-hover:bg-amber-base/[0.11]" />

                      <div className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-base to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                      <div className="relative z-10 flex h-full flex-col">
                        <div className="flex items-start justify-between gap-5">
                          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/[0.09] bg-bg-base text-amber-base transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:border-amber-base/30 group-hover:bg-amber-base group-hover:text-bg-base">
                            <Icon className="h-6 w-6" />
                          </span>

                          <span className="font-mono text-xs font-bold text-amber-base/40">
                            {capability.number}
                          </span>
                        </div>

                        <h3 className="mt-8 text-2xl font-black leading-tight tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-amber-base">
                          {capability.title}
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-silver">
                          {
                            capability.shortDescription
                          }
                        </p>

                        <div className="mt-6 grid gap-3 overflow-hidden">
                          {capability.details.map(
                            (detail, index) => (
                              <div
                                key={detail}
                                className="flex translate-y-4 items-start gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                                style={{
                                  transitionDelay: `${index * 70}ms`,
                                }}
                              >
                                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-base/10 text-amber-base">
                                  <Check className="h-3 w-3" />
                                </span>

                                <span className="text-xs leading-6 text-silver">
                                  {detail}
                                </span>
                              </div>
                            ),
                          )}
                        </div>

                        <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-5">
                          <span className="text-xs font-black text-text-primary transition-colors group-hover:text-amber-base">
                            Explore capability
                          </span>

                          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.09] text-amber-base transition-all duration-300 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          </section>

          {/* =====================================================
              Dynamic Partner Content
          ====================================================== */}

          <section
            id="partner-content"
            className="scroll-mt-32 pt-24"
          >
            <div className="grid gap-10 xl:grid-cols-[0.7fr_1.3fr]">
              <div className="xl:sticky xl:top-40 xl:h-fit">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.07] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  <Globe2 className="h-4 w-4" />

                  Integration Intelligence
                </div>

                <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] text-text-primary md:text-5xl">
                  Working With {partnerName}
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-silver md:text-base">
                  Explore the technology, use cases,
                  architecture, costs, security
                  considerations, and implementation details
                  relevant to this integration.
                </p>

                <div className="mt-8 rounded-[1.7rem] border border-white/[0.09] bg-surface p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-silver">
                        Integration Discussion
                      </p>

                      <p className="mt-1 text-sm font-black text-text-primary">
                        Speak with our technical team
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="group mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-base"
                  >
                    Schedule a consultation

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div>
                {contentBlocks.length > 0 ? (
                  <div className="space-y-6">
                    {contentBlocks.map(
                      (block, index) => (
                        <ContentBlockRenderer
                          key={`${block.type}-${index}`}
                          block={block}
                          index={index}
                        />
                      ),
                    )}
                  </div>
                ) : (
                  <SpotlightCard className="p-8 md:p-10">
                    <div className="relative z-10 flex items-start gap-5">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                        <FileText className="h-6 w-6" />
                      </span>

                      <div>
                        <h3 className="text-2xl font-black text-text-primary">
                          Partner Content Required
                        </h3>

                        <p className="mt-4 text-sm leading-7 text-silver">
                          Add content blocks for this
                          partner inside{" "}
                          <code className="rounded-md bg-bg-base px-2 py-1 text-amber-base">
                            data/partners.json
                          </code>
                          .
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                )}
              </div>
            </div>
          </section>

          {/* =====================================================
              Process
          ====================================================== */}

          <section
            id="process"
            className="scroll-mt-32 pt-24"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface p-7 md:rounded-[3rem] md:p-12 lg:p-14">
              <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-base/[0.06] blur-[120px]" />

              <SectionHeading
                centered
                eyebrow="Integration Process"
                title={`From Evaluation to Production With ${partnerName}`}
                description="A structured integration process reduces technical risk, improves security, and keeps business requirements visible throughout delivery."
              />

              <div className="relative mt-14 grid gap-5 lg:grid-cols-4">
                <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-amber-base/30 to-transparent lg:block" />

                {processSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <article
                      key={step.number}
                      className="group relative rounded-[1.75rem] border border-white/[0.09] bg-bg-base/70 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/30 hover:bg-bg-base"
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-amber-base/20 bg-surface text-amber-base transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-base group-hover:text-bg-base">
                          <Icon className="h-6 w-6" />
                        </span>

                        <span className="font-mono text-xs text-amber-base/45">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-7 text-xl font-black text-text-primary">
                        {step.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-silver">
                        {step.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              FAQ
          ====================================================== */}

          {faqItems.length > 0 && (
            <section
              id="faq"
              className="scroll-mt-32 pt-24"
            >
              <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.07] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                    <Sparkles className="h-4 w-4" />

                    Common Questions
                  </div>

                  <h2 className="mt-6 text-3xl font-black tracking-[-0.04em] text-text-primary md:text-5xl">
                    {partnerName} Integration FAQs
                  </h2>

                  <p className="mt-6 max-w-xl text-sm leading-7 text-silver md:text-base">
                    Important information about
                    implementation, security, architecture,
                    costs, user experience, and ongoing
                    support.
                  </p>
                </div>

                <div className="space-y-3">
                  {faqItems.map((faq, index) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* =====================================================
              Related Partners
          ====================================================== */}

          {relatedPartners.length > 0 && (
            <section
              id="related"
              className="scroll-mt-32 pt-24"
            >
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <SectionHeading
                  eyebrow="Technology Ecosystem"
                  title="Explore More Integrations"
                  description="Discover more blockchain security, infrastructure, custody, wallet, oracle, legal, and development technologies."
                />

                <Link
                  href="/partners"
                  className="group inline-flex shrink-0 items-center gap-2 text-sm font-black text-amber-base"
                >
                  View all partners

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedPartners.map(
                  (relatedPartner) => (
                    <RelatedPartnerCard
                      key={relatedPartner.slug}
                      partner={relatedPartner}
                    />
                  ),
                )}
              </div>
            </section>
          )}

          {/* =====================================================
              CTA
          ====================================================== */}

          <section className="pt-24">
            <div className="group relative overflow-hidden rounded-[2rem] border border-amber-base/20 bg-bg-base p-8 shadow-[0_35px_120px_rgba(0,0,0,0.28)] md:rounded-[3rem] md:p-12 lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-base/[0.15] via-transparent to-amber-base/[0.04]" />

              <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full border border-amber-base/10 transition-transform duration-700 group-hover:scale-110" />

              <div className="absolute -right-8 -top-8 h-56 w-56 rounded-full border border-amber-base/20 transition-transform duration-700 group-hover:scale-110" />

              <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                    <Orbit className="h-4 w-4" />

                    Start Your Integration
                  </div>

                  <h2 className="mt-6 max-w-4xl text-3xl font-black leading-tight tracking-[-0.035em] text-text-primary md:text-5xl">
                    {partner.cta.title}
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-silver md:text-base">
                    {partner.cta.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href={
                      partner.cta.primaryLink ||
                      "/contact"
                    }
                    className="group/button inline-flex items-center justify-center gap-2 rounded-full bg-amber-base px-8 py-4 text-sm font-black text-bg-base shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
                  >
                    {partner.cta.primaryText}

                    <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Link>

                  <Link
                    href={
                      partner.cta.secondaryLink ||
                      "/services"
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-8 py-4 text-sm font-bold text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:text-amber-base"
                  >
                    {partner.cta.secondaryText}

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

/* =========================================================
   Hero Visual
========================================================= */

function HeroVisual({
  heroImage,
  heroTitle,
  partnerName,
  partnerType,
}: {
  heroImage?: string;
  heroTitle: string;
  partnerName: string;
  partnerType: string;
}) {
  return (
    <div className="relative min-h-[520px] overflow-hidden border-t border-white/[0.08] lg:min-h-full lg:border-l lg:border-t-0">
      {heroImage ? (
        <>
          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1600ms] hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-transparent lg:from-surface/30" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-bg-base via-surface to-amber-base/[0.12]">
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(225,157,45,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(225,157,45,0.22) 1px, transparent 1px)",

              backgroundSize: "36px 36px",
            }}
          />

          <div className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-base/10" />

          <div className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-base/20" />

          <div className="absolute left-1/2 top-1/2 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2.2rem] bg-amber-base text-bg-base shadow-glow">
            <Handshake className="h-16 w-16" />
          </div>
        </div>
      )}

      {[
        {
          left: "18%",
          top: "22%",
          delay: "0ms",
        },
        {
          left: "77%",
          top: "17%",
          delay: "250ms",
        },
        {
          left: "82%",
          top: "58%",
          delay: "500ms",
        },
        {
          left: "23%",
          top: "70%",
          delay: "750ms",
        },
      ].map((point) => (
        <span
          key={`${point.left}-${point.top}`}
          className="absolute hidden md:flex"
          style={{
            left: point.left,
            top: point.top,
          }}
        >
          <span className="relative flex h-4 w-4">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-base opacity-40"
              style={{
                animationDelay: point.delay,
              }}
            />

            <span className="relative h-4 w-4 rounded-full border-2 border-bg-base bg-amber-base" />
          </span>
        </span>
      ))}

      <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-bg-base/75 px-4 py-2 text-xs font-bold text-text-primary backdrop-blur-xl md:left-8 md:top-8">
        <span className="inline-flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-amber-base opacity-50" />

            <span className="relative h-2.5 w-2.5 rounded-full bg-amber-base" />
          </span>

          Technology integration
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-5 rounded-[1.7rem] border border-white/10 bg-bg-base/80 p-5 backdrop-blur-xl md:inset-x-8 md:bottom-8 md:p-6">
        <div className="flex items-end justify-between gap-5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              {partnerType}
            </p>

            <p className="mt-2 max-w-sm text-xl font-black leading-snug text-text-primary">
              Production-ready integration with{" "}
              {partnerName}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Architecture",
                "Security",
                "Integration",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-silver"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-base text-bg-base shadow-glow">
            <Network className="h-6 w-6" />
          </span>
        </div>
      </div>

      <div className="absolute right-7 top-[25%] hidden rounded-2xl border border-white/10 bg-bg-base/80 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl xl:block">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
            <ShieldCheck className="h-5 w-5" />
          </span>

          <div>
            <p className="text-[10px] text-silver">
              Integration
            </p>

            <p className="text-xs font-black text-text-primary">
              Security first
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Spotlight Card
========================================================= */

function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(
    event: MouseEvent<HTMLDivElement>,
  ) {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const bounds =
      card.getBoundingClientRect();

    card.style.setProperty(
      "--mouse-x",
      `${event.clientX - bounds.left}px`,
    );

    card.style.setProperty(
      "--mouse-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={[
        "relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/30 hover:shadow-[0_28px_85px_rgba(0,0,0,0.24)]",
        className,
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mouse-x) var(--mouse-y), rgba(225,157,45,0.12), transparent 65%)",
        }}
      />

      <div className="absolute inset-x-7 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-amber-base to-transparent transition-transform duration-500 group-hover:scale-x-100" />

      {children}
    </div>
  );
}

/* =========================================================
   Section Heading
========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div
      className={
        centered
          ? "relative mx-auto max-w-3xl text-center"
          : "max-w-4xl"
      }
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
        {eyebrow}
      </p>

      <h2 className="mt-5 text-3xl font-black tracking-[-0.04em] text-text-primary md:text-5xl">
        {title}
      </h2>

      <p
        className={[
          "mt-6 max-w-2xl text-sm leading-7 text-silver md:text-base",
          centered ? "mx-auto" : "",
        ].join(" ")}
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   Content Block Renderer
========================================================= */

function ContentBlockRenderer({
  block,
  index,
}: {
  block: PartnerContentBlock;
  index: number;
}) {
  if (block.type === "featuredAnswer") {
    return (
      <div className="group relative overflow-hidden rounded-[2rem] border border-amber-base/20 bg-surface p-7 transition-all duration-500 hover:border-amber-base/40 md:p-9">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-base/[0.09] blur-[70px] transition-transform duration-700 group-hover:scale-125" />

        <div className="relative flex items-start gap-5">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-amber-base text-bg-base shadow-glow">
            <Sparkles className="h-6 w-6" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
              Featured Answer
            </p>

            <p className="mt-4 text-base font-semibold leading-8 text-text-primary md:text-lg">
              {block.text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (block.type === "heading") {
    if (block.level === 4) {
      return (
        <h4 className="pt-3 text-xl font-black text-text-primary">
          {block.text}
        </h4>
      );
    }

    if (block.level === 3) {
      return (
        <h3 className="pt-5 text-2xl font-black tracking-[-0.025em] text-text-primary md:text-3xl">
          {block.text}
        </h3>
      );
    }

    return (
      <h2 className="pt-8 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-4xl">
        {block.text}
      </h2>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p className="text-base leading-8 text-silver">
        {block.text}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {block.items.map((item) => (
          <div
            key={item}
            className="group flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/25 hover:bg-amber-base/[0.04]"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-base/10 text-amber-base transition-all group-hover:bg-amber-base group-hover:text-bg-base">
              <Check className="h-3.5 w-3.5" />
            </span>

            <p className="text-sm leading-7 text-silver">
              {item}
            </p>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "table") {
    return (
      <div className="overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-surface">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left">
            {block.headers?.length ? (
              <thead className="bg-amber-base/[0.08]">
                <tr>
                  {block.headers.map((header) => (
                    <th
                      key={header}
                      className="border-b border-white/[0.09] px-5 py-4 text-xs font-black uppercase tracking-[0.13em] text-amber-base"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}

            <tbody>
              {block.rows.map(
                (row, rowIndex) => (
                  <tr
                    key={`${index}-${rowIndex}`}
                    className="border-b border-white/[0.07] transition-colors last:border-b-0 hover:bg-amber-base/[0.035]"
                  >
                    {row.map(
                      (cell, cellIndex) => (
                        <td
                          key={`${rowIndex}-${cellIndex}`}
                          className="px-5 py-4 text-sm leading-6 text-silver"
                        >
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (block.type === "code") {
    return (
      <div className="overflow-hidden rounded-[1.7rem] border border-white/[0.09] bg-bg-base">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
            {block.language || "Code"}
          </span>

          <Code2 className="h-4 w-4 text-silver" />
        </div>

        <pre className="overflow-x-auto p-5 text-sm leading-7 text-silver">
          <code>{block.text}</code>
        </pre>
      </div>
    );
  }

  return null;
}

/* =========================================================
   FAQ
========================================================= */

function FAQItem({
  question,
  answer,
  index,
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(
    index === 0,
  );

  return (
    <article
      className={[
        "overflow-hidden rounded-[1.6rem] border bg-surface transition-all duration-300",
        isOpen
          ? "border-amber-base/30 shadow-[0_18px_60px_rgba(0,0,0,0.16)]"
          : "border-white/[0.09] hover:border-amber-base/20",
      ].join(" ")}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((current) => !current)
        }
        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-7 md:py-6"
      >
        <span className="text-sm font-black leading-6 text-text-primary md:text-base">
          {question}
        </span>

        <span
          className={[
            "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300",
            isOpen
              ? "rotate-180 border-amber-base bg-amber-base text-bg-base"
              : "border-white/[0.09] bg-white/[0.025] text-amber-base",
          ].join(" ")}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
      </button>

      <div
        className={[
          "grid transition-all duration-300",
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="overflow-hidden">
          <p className="border-t border-white/[0.08] px-5 py-5 text-sm leading-7 text-silver md:px-7 md:py-6">
            {answer}
          </p>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   Related Partner Card
========================================================= */

function RelatedPartnerCard({
  partner,
}: {
  partner: NormalizedPartnerEntry;
}) {
  const partnerName =
    getPartnerDisplayName(partner);

  return (
    <Link
      href={`/partners/${partner.slug}`}
      className="group relative flex min-h-[470px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
    >
      <div className="relative h-[230px] overflow-hidden border-b border-white/[0.08] bg-bg-base">
        {partner.image ? (
          <>
            <Image
              src={partner.image}
              alt={partner.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(225,157,45,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(225,157,45,0.2) 1px, transparent 1px)",

                backgroundSize: "30px 30px",
              }}
            />

            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-24 w-24 place-items-center rounded-[1.7rem] border border-amber-base/25 bg-surface text-amber-base transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                <Handshake className="h-11 w-11" />
              </span>
            </div>
          </>
        )}

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-bg-base/75 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-amber-base backdrop-blur-xl">
          <BadgeCheck className="h-3.5 w-3.5" />

          {partnerName}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
          Technology Integration
        </p>

        <h3 className="mt-4 text-xl font-black leading-snug text-text-primary transition-colors duration-300 group-hover:text-amber-base">
          {partner.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-silver">
          {partner.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-5">
          <span className="text-sm font-black text-text-primary transition-colors group-hover:text-amber-base">
            Explore integration
          </span>

          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.09] text-amber-base transition-all duration-300 group-hover:border-amber-base group-hover:bg-amber-base group-hover:text-bg-base">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   Page Background
========================================================= */

function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-72 -top-52 h-[44rem] w-[44rem] rounded-full bg-amber-base/[0.055] blur-[135px]" />

      <div className="absolute -right-64 top-[42rem] h-[40rem] w-[40rem] rounded-full bg-amber-base/[0.04] blur-[140px]" />

      <div className="absolute bottom-[32rem] left-[28%] h-[34rem] w-[34rem] rounded-full bg-amber-base/[0.025] blur-[135px]" />

      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)",

          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}