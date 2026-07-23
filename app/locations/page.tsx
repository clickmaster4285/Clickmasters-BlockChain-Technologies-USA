// app/locations/page.tsx

import type { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import { redirect } from "next/navigation";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  CheckCircle2,
  Globe2,
  Home,
  Landmark,
  Map,
  MapPin,
  Network,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users2,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";

import LocationPagination from "@/components/locations/LocationPagination";

import {
  getLocationCards,
  getLocationsCount,
} from "@/lib/location";

/* =========================================================
   Metadata
========================================================= */

export const metadata: Metadata = {
  title:
    "Global Blockchain Development Locations | ClickMasters",

  description:
    "Explore ClickMasters blockchain development services across major cities, countries, and technology markets worldwide.",

  alternates: {
    canonical: "/locations",
  },

  openGraph: {
    title:
      "Global Blockchain Development Locations | ClickMasters",

    description:
      "Explore blockchain development services, regional expertise, enterprise solutions, and technology delivery across global markets.",

    url: "/locations",

    type: "website",
  },
};

/* =========================================================
   Static Content
========================================================= */

const heroProofPoints = [
  "Regional business understanding",
  "Enterprise blockchain delivery",
  "Global engineering capabilities",
];

const heroStats = [
  {
    value: "Global",
    label: "Delivery coverage",
  },
  {
    value: "360°",
    label: "Product development",
  },
  {
    value: "24/7",
    label: "Technical support",
  },
];

const deliveryBenefits = [
  {
    icon: Globe2,
    title: "Global Technical Expertise",
    description:
      "Access experienced blockchain engineers, product designers, architects, security specialists, and integration experts.",
  },
  {
    icon: Landmark,
    title: "Regional Business Context",
    description:
      "Solutions are designed around local industries, regulations, customer expectations, infrastructure, and market conditions.",
  },
  {
    icon: Network,
    title: "Connected Delivery Model",
    description:
      "Strategy, design, engineering, integrations, testing, deployment, optimization, and support are handled through one coordinated process.",
  },
  {
    icon: ShieldCheck,
    title: "Security-First Architecture",
    description:
      "Smart contract security, access control, data protection, transaction integrity, infrastructure, and monitoring are considered from day one.",
  },
];

const engagementSteps = [
  {
    number: "01",
    icon: MapPin,
    title: "Understand Your Market",
    description:
      "We evaluate your target users, business model, industry, regulations, competitors, integrations, and operational requirements.",
  },
  {
    number: "02",
    icon: Building2,
    title: "Define the Right Solution",
    description:
      "We identify the blockchain use case, product scope, architecture, participants, permissions, workflows, and business logic.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Build and Launch",
    description:
      "Our team handles product design, development, smart contracts, integrations, testing, deployment, and production readiness.",
  },
  {
    number: "04",
    icon: Users2,
    title: "Support and Scale",
    description:
      "We monitor, optimize, maintain, and expand the product as users, transaction volume, integrations, and business requirements grow.",
  },
];

/* =========================================================
   Page Types
========================================================= */

type LocationsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

/* =========================================================
   Page
========================================================= */

export default async function LocationsPage({
  searchParams,
}: LocationsPageProps) {
  const resolvedSearchParams = await searchParams;

  const locations = getLocationCards();

  const totalLocations = getLocationsCount();

  const cardsPerPage = 9;

  const requestedPage = Number(
    resolvedSearchParams.page ?? "1",
  );

  const currentPage =
    Number.isInteger(requestedPage) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  const totalPages = Math.max(
    1,
    Math.ceil(locations.length / cardsPerPage),
  );

  if (currentPage > totalPages) {
    redirect(
      totalPages === 1
        ? "/locations"
        : `/locations?page=${totalPages}`,
    );
  }

  const startIndex =
    (currentPage - 1) * cardsPerPage;

  const visibleLocations = locations.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-background via-bg-base to-background pb-24 pt-32">
        {/* =====================================================
            Global Background Decoration
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-72 -top-52 h-[44rem] w-[44rem] rounded-full bg-amber-base/[0.06] blur-[135px]" />

          <div className="absolute -right-64 top-[34rem] h-[40rem] w-[40rem] rounded-full bg-amber-base/[0.045] blur-[135px]" />

          <div className="absolute bottom-[28rem] left-[32%] h-[34rem] w-[34rem] rounded-full bg-amber-base/[0.025] blur-[140px]" />

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
                <span className="hidden sm:inline">Home</span>
              </Link>

              <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />

              <span className="min-w-0 truncate font-bold text-text-primary">
                Locations
              </span>
            </div>
          </nav>

          {/* =====================================================
              Hero
          ====================================================== */}

          <section className="relative min-h-[680px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface via-bg-base to-background shadow-[0_40px_140px_rgba(0,0,0,0.32)]">
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

            <div className="grid min-h-[680px] gap-14 p-6 md:p-10 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:p-14 xl:p-16">
              {/* Hero Content */}

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.075] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-base">
                  <Sparkles className="h-4 w-4" />

                  Global Blockchain Delivery
                </div>

                <h1 className="mt-8 max-w-4xl font-display text-4xl font-black leading-[1.04] tracking-[-0.04em] text-text-primary sm:text-5xl md:text-6xl xl:text-[4.5rem]">
                  Blockchain Development Across{" "}
                  <span className="bg-gradient-to-r from-amber-base via-amber-light to-amber-base bg-clip-text text-transparent">
                    Global Markets
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-silver md:text-lg">
                  Explore our blockchain development services
                  across major cities and technology markets. We
                  combine global engineering expertise with
                  regional business understanding to build secure,
                  scalable, and production-ready digital products.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-amber-base px-7 py-4 text-sm font-black text-bg-base shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
                  >
                    Discuss Your Project

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/service"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-7 py-4 text-sm font-bold text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.05] hover:text-amber-base"
                  >
                    Explore Services

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

              {/* Hero Visual */}

              <div className="relative mx-auto w-full max-w-[590px]">
                <div className="absolute -inset-8 rounded-[3rem] bg-amber-base/[0.07] blur-[90px]" />

                <div className="relative overflow-hidden rounded-[2.35rem] border border-white/10 bg-surface p-3 shadow-[0_35px_110px_rgba(0,0,0,0.32)]">
                  <div className="relative aspect-[4/4.45] overflow-hidden rounded-[1.85rem] bg-bg-base">
                    <div
                      className="absolute inset-0 opacity-[0.16]"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(225,157,45,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(225,157,45,0.18) 1px, transparent 1px)",

                        backgroundSize: "34px 34px",
                      }}
                    />

                    <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-base/10" />

                    <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-base/20" />

                    <div className="absolute left-1/2 top-1/2 h-[35%] w-[35%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-base/30" />

                    <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[2rem] border border-amber-base/25 bg-amber-base text-bg-base shadow-glow">
                      <Globe2 className="h-14 w-14" />
                    </div>

                    {[
                      {
                        left: "18%",
                        top: "24%",
                      },
                      {
                        left: "74%",
                        top: "18%",
                      },
                      {
                        left: "82%",
                        top: "61%",
                      },
                      {
                        left: "24%",
                        top: "76%",
                      },
                      {
                        left: "58%",
                        top: "82%",
                      },
                    ].map((position, index) => (
                      <span
                        key={`${position.left}-${position.top}`}
                        className="absolute"
                        style={position}
                      >
                        <span className="relative flex h-4 w-4">
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-base opacity-40"
                            style={{
                              animationDelay: `${index * 250}ms`,
                            }}
                          />

                          <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-bg-base bg-amber-base" />
                        </span>
                      </span>
                    ))}

                    <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-base/75 px-4 py-2 text-xs font-bold text-text-primary backdrop-blur-xl">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-base opacity-60" />

                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-base" />
                      </span>

                      Global delivery network
                    </div>

                    <div className="absolute inset-x-5 bottom-5 rounded-[1.7rem] border border-white/10 bg-bg-base/80 p-5 backdrop-blur-xl md:p-6">
                      <div className="flex items-end justify-between gap-5">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                            Regional Expertise
                          </p>

                          <p className="mt-2 max-w-sm text-lg font-black leading-snug text-text-primary md:text-xl">
                            Global engineering connected to local
                            business requirements
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {[
                              "Global",
                              "Secure",
                              "Scalable",
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
                          <Map className="h-6 w-6" />
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
                        Development
                      </p>

                      <p className="text-xs font-black text-text-primary">
                        Enterprise ready
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-5 bottom-[25%] hidden rounded-2xl border border-white/10 bg-bg-base/90 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl md:block">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                      <Globe2 className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-[10px] text-silver">
                        Coverage
                      </p>

                      <p className="text-xs font-black text-text-primary">
                        Worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              Delivery Benefits
          ====================================================== */}

          <section className="mt-24">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                  Global Delivery
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                  Global Capabilities With Regional Business
                  Understanding
                </h2>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-silver lg:justify-self-end">
                Successful blockchain products require more than
                technical development. They require understanding
                the market, users, regulations, integrations, and
                operating environment surrounding the product.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {deliveryBenefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article
                    key={benefit.title}
                    className="group rounded-[1.8rem] border border-white/[0.085] bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-surface/90"
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-base/10 text-amber-base transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </span>

                    <h3 className="mt-7 text-xl font-black text-text-primary">
                      {benefit.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-silver">
                      {benefit.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* =====================================================
              Location Explorer
          ====================================================== */}

          <section className="pt-24">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.065] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-base">
                  <MapPin className="h-4 w-4" />

                  Development Locations
                </div>

                <h2 className="mt-5 max-w-4xl text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                  Explore Blockchain Development Services by
                  Location
                </h2>
              </div>

              <div className="lg:text-right">
                <p className="text-sm leading-7 text-silver">
                  Select a location to explore regional blockchain
                  expertise, business opportunities, technology
                  services, delivery capabilities, and local market
                  insights.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs font-bold text-amber-base">
                  {totalLocations} location guides available
                </div>
              </div>
            </div>

            {visibleLocations.length > 0 ? (
              <>
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {visibleLocations.map(
                    (location, index) => {
                      const globalIndex =
                        startIndex + index + 1;

                      const locationName =
                        location.city ||
                        location.country ||
                        location.region ||
                        "Global";

                      return (
                        <Link
                          key={location.slug}
                          href={`/locations/${location.slug}`}
                          className="group relative flex min-h-[510px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface shadow-[0_20px_65px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:bg-surface/90 hover:shadow-[0_30px_90px_rgba(0,0,0,0.25)]"
                        >
                          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-base/[0.045] blur-[60px] transition-colors duration-500 group-hover:bg-amber-base/[0.09]" />

                          {/* Card Visual */}

                          <div className="relative h-[230px] overflow-hidden border-b border-white/[0.08] bg-bg-base sm:h-[245px]">
                            {location.image ? (
                              <>
                                <Image
                                  src={location.image}
                                  alt={location.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />

                                <div className="absolute inset-0 bg-gradient-to-br from-bg-base/65 via-transparent to-amber-base/10" />
                              </>
                            ) : (
                              <>
                                <div
                                  className="absolute inset-0 opacity-[0.16]"
                                  style={{
                                    backgroundImage:
                                      "linear-gradient(rgba(225,157,45,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(225,157,45,0.18) 1px, transparent 1px)",

                                    backgroundSize:
                                      "28px 28px",
                                  }}
                                />

                                <div className="absolute inset-0 grid place-items-center">
                                  <span className="grid h-24 w-24 place-items-center rounded-[1.7rem] border border-amber-base/25 bg-surface text-amber-base transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110">
                                    <MapPin className="h-11 w-11" />
                                  </span>
                                </div>
                              </>
                            )}

                            <div className="absolute -left-14 -top-14 h-44 w-44 rounded-full bg-amber-base/[0.10] blur-3xl" />

                            <div className="absolute -bottom-16 right-8 h-52 w-52 rounded-full bg-amber-base/[0.05] blur-3xl" />

                            <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-base/55 to-transparent" />

                            <div className="absolute left-5 top-5">
                              <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-bg-base/75 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-base backdrop-blur-xl">
                                <MapPin className="h-3.5 w-3.5" />

                                {locationName}
                              </span>
                            </div>

                            <span className="absolute right-5 top-5 grid h-9 min-w-9 place-items-center rounded-full border border-white/10 bg-bg-base/70 px-2 font-mono text-[10px] font-bold text-silver backdrop-blur-xl">
                              {String(
                                globalIndex,
                              ).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Card Content */}

                          <div className="relative flex flex-1 flex-col p-6 md:p-7">
                            <div className="flex items-center justify-between gap-4">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                                Blockchain Development
                              </p>

                              <span className="shrink-0 text-xs font-medium text-silver">
                                {location.readTime ||
                                  "Location guide"}
                              </span>
                            </div>

                            <h3 className="mt-4 text-2xl font-black leading-[1.2] tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-amber-base">
                              {location.title}
                            </h3>

                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-silver">
                              {location.excerpt}
                            </p>

                            {location.credibility &&
                              location.credibility.length >
                                0 && (
                                <div className="mt-5 flex flex-wrap gap-2">
                                  {location.credibility
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
                                <span className="text-sm font-black text-text-primary transition-colors duration-300 group-hover:text-amber-base">
                                  Explore location
                                </span>

                                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.09] bg-white/[0.025] text-amber-base transition-all duration-300 group-hover:border-amber-base/30 group-hover:bg-amber-base group-hover:text-bg-base">
                                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    },
                  )}
                </div>

                <LocationPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <div className="mt-12 rounded-[2rem] border border-white/10 bg-surface p-12 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                  <MapPin className="h-7 w-7" />
                </span>

                <h3 className="mt-5 text-2xl font-black text-text-primary">
                  No location pages found
                </h3>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-silver">
                  Confirm that your location entries include a
                  valid title and slug inside the locations data
                  file.
                </p>
              </div>
            )}
          </section>

          {/* =====================================================
              Engagement Process
          ====================================================== */}

          <section className="mt-24 overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-surface via-bg-base to-background p-6 shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:p-10 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                Engagement Process
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                From Local Opportunity to Production-Ready
                Blockchain Product
              </h2>

              <p className="mt-5 text-sm leading-7 text-silver md:text-base">
                We combine market understanding, product strategy,
                technical architecture, engineering, integrations,
                security, and long-term support.
              </p>
            </div>

            <div className="relative mt-12">
              <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-amber-base/25 to-transparent lg:block" />

              <div className="grid gap-5 lg:grid-cols-4">
                {engagementSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <article
                      key={step.number}
                      className="group relative rounded-[1.75rem] border border-white/[0.085] bg-surface/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-surface"
                    >
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="grid h-16 w-16 place-items-center rounded-2xl border border-amber-base/20 bg-bg-base text-amber-base shadow-[0_10px_35px_rgba(0,0,0,0.18)]">
                          <Icon className="h-6 w-6" />
                        </span>

                        <span className="font-mono text-xs font-bold text-amber-base/45">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="mt-6 text-xl font-black text-text-primary">
                        {step.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-silver">
                        {step.description}
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

                    Build From Anywhere
                  </div>

                  <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-text-primary md:text-5xl">
                    Build a Secure Blockchain Product for Your
                    Market
                  </h2>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-silver md:text-base">
                    Share your location, industry, business
                    challenge, or product idea. Our team will help
                    define the correct use case, architecture,
                    integrations, roadmap, and delivery model.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-base px-8 py-4 text-sm font-black text-bg-base shadow-glow transition-transform duration-300 hover:-translate-y-1 hover:bg-amber-light"
                  >
                    Book a Free Consultation

                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/industries"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-8 py-4 text-sm font-bold text-text-primary transition-all duration-300 hover:border-amber-base/30 hover:bg-amber-base/[0.05] hover:text-amber-base"
                  >
                    Explore Industries

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
