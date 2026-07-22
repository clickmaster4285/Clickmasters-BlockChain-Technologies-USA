"use client";

// components/industries/IndustryDetailPage.tsx

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Blocks,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Clock3,
  Code2,
  Database,
  FileText,
  Fingerprint,
  Layers3,
  Link2,
  Network,
  Quote,
  RadioTower,
  ShieldCheck,
  Sparkles,
  UserRound,
  Workflow,
  Zap,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";

import type { IndustryData } from "@/app/industries/[slug]/page";

/* =========================================================
   Types
========================================================= */

type IndustryDetailPageProps = {
  industry: IndustryData;
  relatedIndustries: IndustryData[];
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type TocItem = {
  id: string;
  label: string;
};

/* =========================================================
   Utilities
========================================================= */

function createSectionId(text: string, index: number) {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug || `section-${index + 1}`;
}

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsedDate);
}

/* =========================================================
   Reveal Animation
========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      style={
        {
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
      className={[
        "industry-reveal",
        visible ? "industry-reveal-visible" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/* =========================================================
   Scroll Progress
========================================================= */

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentProgress =
        (window.scrollY / documentHeight) * 100;

      setProgress(
        Math.min(100, Math.max(0, currentProgress)),
      );
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-amber-base via-amber-light to-amber-base shadow-[0_0_18px_rgba(232,170,60,0.55)] transition-[width] duration-100"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}

/* =========================================================
   Hero Network
========================================================= */

const networkNodes = [
  {
    left: "9%",
    top: "20%",
    delay: "0s",
    size: "h-3 w-3",
  },
  {
    left: "23%",
    top: "67%",
    delay: ".7s",
    size: "h-2 w-2",
  },
  {
    left: "44%",
    top: "32%",
    delay: "1.1s",
    size: "h-3.5 w-3.5",
  },
  {
    left: "67%",
    top: "18%",
    delay: "1.8s",
    size: "h-2.5 w-2.5",
  },
  {
    left: "78%",
    top: "72%",
    delay: "2.2s",
    size: "h-3 w-3",
  },
  {
    left: "91%",
    top: "42%",
    delay: "2.8s",
    size: "h-2 w-2",
  },
];

function BlockchainNetworkDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="industry-network-line"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity="0"
            />

            <stop
              offset="50%"
              stopColor="currentColor"
              stopOpacity=".7"
            />

            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        <g
          fill="none"
          stroke="url(#industry-network-line)"
          strokeWidth="1"
          className="text-amber-base"
        >
          <path
            d="M80 160 C220 70 300 360 440 230"
            className="industry-draw-line"
          />

          <path
            d="M220 480 C340 400 410 180 620 135"
            className="industry-draw-line industry-draw-line-delay"
          />

          <path
            d="M440 230 C590 320 650 520 820 500"
            className="industry-draw-line industry-draw-line-delay-two"
          />

          <path
            d="M620 135 C760 80 850 310 930 280"
            className="industry-draw-line industry-draw-line-delay-three"
          />
        </g>
      </svg>

      {networkNodes.map((node, index) => (
        <span
          key={index}
          className={[
            "industry-network-node absolute rounded-full border border-amber-base/50 bg-amber-base shadow-[0_0_22px_rgba(225,157,45,0.7)]",
            node.size,
          ].join(" ")}
          style={{
            left: node.left,
            top: node.top,
            animationDelay: node.delay,
          }}
        />
      ))}
    </div>
  );
}

/* =========================================================
   Mouse Glow
========================================================= */

function InteractiveGlow() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const bounds = container.getBoundingClientRect();

    container.style.setProperty(
      "--pointer-x",
      `${event.clientX - bounds.left}px`,
    );

    container.style.setProperty(
      "--pointer-y",
      `${event.clientY - bounds.top}px`,
    );
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="industry-pointer-glow pointer-events-none absolute inset-0"
    />
  );
}

/* =========================================================
   Hero
========================================================= */

function IndustryHero({
  industry,
}: {
  industry: IndustryData;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] pt-28 md:pt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-bg-base to-background" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="absolute -left-44 top-12 h-[34rem] w-[34rem] rounded-full bg-amber-base/[0.055] blur-[130px]" />

      <div className="absolute -right-44 bottom-0 h-[36rem] w-[36rem] rounded-full bg-amber-base/[0.06] blur-[140px]" />

      <BlockchainNetworkDecoration />

      <div className="site-container relative px-6 pb-20 pt-10 md:pb-24 lg:pb-28">
        <nav
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-silver"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="transition-colors hover:text-amber-base"
          >
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            href="/industries"
            className="transition-colors hover:text-amber-base"
          >
            Industries
          </Link>

          <span aria-hidden="true">/</span>

          <span
            className="max-w-full truncate text-silver-light"
            aria-current="page"
          >
            {industry.title}
          </span>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="relative z-10">
            <div className="industry-hero-entry inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.075] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-amber-base backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />

              {industry.hero.badge || industry.category}
            </div>

            <h1 className="industry-hero-entry industry-hero-entry-two mt-7 max-w-4xl font-display text-4xl font-black leading-[1.04] tracking-[-0.045em] text-text-primary sm:text-5xl md:text-6xl xl:text-[4.35rem]">
              {industry.hero.title || industry.title}
            </h1>

            <p className="industry-hero-entry industry-hero-entry-three mt-7 max-w-3xl text-base leading-8 text-silver md:text-lg">
              {industry.hero.description || industry.excerpt}
            </p>

            <div className="industry-hero-entry industry-hero-entry-four mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-silver">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-4 w-4 text-amber-base" />

                {industry.author}
              </span>

              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-amber-base" />

                {formatDate(industry.date)}
              </span>

              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-amber-base" />

                {industry.readTime}
              </span>
            </div>

            <div className="industry-hero-entry industry-hero-entry-five mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-base px-7 py-4 text-sm font-black text-bg-base shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
              >
                Discuss Your Project

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
          <button
  type="button"
  onClick={() => {
    document
      .getElementById("industry-content")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }}
  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-7 py-4 text-sm font-bold text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35 hover:bg-amber-base/[0.05] hover:text-amber-base"
>
  Explore the Guide

  <ChevronDown className="h-4 w-4" />
</button>
            </div>

            {industry.credibility.length > 0 && (
              <div className="industry-hero-entry industry-hero-entry-six mt-10 grid gap-3 sm:grid-cols-2">
                {industry.credibility
                  .slice(0, 4)
                  .map((item, index) => (
                    <div
                      key={item}
                      className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-surface/45 px-4 py-3.5 backdrop-blur-xl transition-all duration-300 hover:border-amber-base/25 hover:bg-surface"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                        {index % 2 === 0 ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <BadgeCheck className="h-4 w-4" />
                        )}
                      </span>

                      <span className="text-xs font-semibold leading-5 text-silver transition-colors group-hover:text-text-primary">
                        {item}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="industry-hero-visual relative mx-auto w-full max-w-[600px]">
            <div className="absolute -inset-8 rounded-[3rem] bg-amber-base/[0.07] blur-[90px]" />

            <div className="industry-float-slow absolute -left-5 top-[18%] z-20 hidden rounded-2xl border border-white/10 bg-bg-base/85 p-4 shadow-2xl backdrop-blur-xl md:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                  <ShieldCheck className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] text-silver">
                    Infrastructure
                  </p>

                  <p className="text-xs font-black text-text-primary">
                    Security-led
                  </p>
                </div>
              </div>
            </div>

            <div className="industry-float-reverse absolute -right-5 bottom-[20%] z-20 hidden rounded-2xl border border-white/10 bg-bg-base/85 p-4 shadow-2xl backdrop-blur-xl md:block">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
                  <Network className="h-5 w-5" />
                </span>

                <div>
                  <p className="text-[10px] text-silver">
                    Architecture
                  </p>

                  <p className="text-xs font-black text-text-primary">
                    Enterprise-ready
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-surface p-3 shadow-[0_40px_120px_rgba(0,0,0,0.3)]">
              <InteractiveGlow />

              <div className="relative aspect-[4/4.5] overflow-hidden rounded-[1.9rem]">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 46vw"
                  className="industry-hero-image object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/5 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-r from-bg-base/25 via-transparent to-transparent" />

                <div className="absolute inset-x-5 bottom-5 rounded-[1.7rem] border border-white/10 bg-bg-base/75 p-5 backdrop-blur-xl md:p-6">
                  <div className="flex items-end justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                        Industry Intelligence
                      </p>

                      <p className="mt-2 max-w-sm text-lg font-black leading-snug text-text-primary">
                        Strategy, architecture and implementation
                        insights
                      </p>
                    </div>

                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-base text-bg-base shadow-glow">
                      <Blocks className="h-6 w-6" />
                    </span>
                  </div>

                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="industry-loading-line h-full rounded-full bg-gradient-to-r from-amber-base to-amber-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Value Strip
========================================================= */

const valueStripItems = [
  {
    icon: ShieldCheck,
    title: "Secure Architecture",
    text: "Security, permissions and data integrity considered from day one.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    text: "Business rules transformed into programmable operations.",
  },
  {
    icon: Database,
    title: "Trusted Data",
    text: "Verifiable records shared across connected participants.",
  },
  {
    icon: RadioTower,
    title: "System Integration",
    text: "Blockchain connected with your existing business systems.",
  },
];

function IndustryValueStrip() {
  return (
    <section className="site-container relative z-10 -mt-8 px-6">
      <div className="grid overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface/85 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl md:grid-cols-2 xl:grid-cols-4">
        {valueStripItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal
              key={item.title}
              delay={index * 90}
              className="h-full"
            >
              <article className="group relative h-full border-b border-white/[0.08] p-6 transition-colors hover:bg-amber-base/[0.035] md:border-r xl:border-b-0">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-base/10 text-amber-base transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-5 w-5" />
                </span>

                <h2 className="mt-5 text-base font-black text-text-primary">
                  {item.title}
                </h2>

                <p className="mt-2 text-xs leading-6 text-silver">
                  {item.text}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   Table of Contents
========================================================= */

function TableOfContents({
  items,
}: {
  items: TocItem[];
}) {
  const [activeId, setActiveId] = useState(
    items[0]?.id || "",
  );

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top -
              second.boundingClientRect.top,
          );

        if (visibleEntries[0]) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -68% 0px",
        threshold: [0, 0.2, 0.5, 1],
      },
    );

    elements.forEach((element) =>
      observer.observe(element),
    );

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="hidden xl:block">
      <div className="sticky top-28 space-y-5">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-surface/70 p-5 backdrop-blur-xl">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
              <BookOpen className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-text-primary">
                On This Page
              </p>

              <p className="mt-0.5 text-[10px] text-silver">
                Navigate this industry guide
              </p>
            </div>
          </div>

          <nav className="mt-4 max-h-[55vh] space-y-1 overflow-y-auto pr-1">
            {items.map((item, index) => {
              const active = activeId === item.id;

              return (
                <a
                  key={`${item.id}-${index}`}
                  href={`#${item.id}`}
                  className={[
                    "group relative flex items-start gap-3 rounded-xl px-3 py-3 text-xs leading-5 transition-all",
                    active
                      ? "bg-amber-base/[0.09] text-text-primary"
                      : "text-silver hover:bg-white/[0.025] hover:text-text-primary",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full transition-all",
                      active
                        ? "bg-amber-base shadow-[0_0_12px_rgba(230,165,50,.8)]"
                        : "bg-white/20 group-hover:bg-amber-base/50",
                    ].join(" ")}
                  />

                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-amber-base/20 bg-bg-base p-5">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-base/[0.1] blur-3xl" />

          <div className="relative">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-base text-bg-base">
              <Sparkles className="h-5 w-5" />
            </span>

            <h3 className="mt-5 text-lg font-black text-text-primary">
              Have a similar challenge?
            </h3>

            <p className="mt-2 text-xs leading-6 text-silver">
              Discuss your use case, architecture and delivery
              roadmap with our blockchain team.
            </p>

            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center gap-2 text-xs font-black text-amber-base"
            >
              Book a consultation

              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
   Content Blocks
========================================================= */

function FeaturedAnswer({
  text,
}: {
  text: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] border border-amber-base/20 bg-gradient-to-br from-amber-base/[0.1] via-surface to-surface p-6 md:p-8">
        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-base/[0.1] blur-[70px]" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-base text-bg-base shadow-glow">
              <Zap className="h-5 w-5" />
            </span>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-base">
                Executive Answer
              </p>

              <p className="mt-1 text-xs text-silver">
                Key information at a glance
              </p>
            </div>
          </div>

          <p className="mt-6 text-base font-medium leading-8 text-text-primary md:text-lg md:leading-9">
            {text}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function ContentHeading({
  text,
  id,
}: {
  text: string;
  id: string;
}) {
  return (
    <Reveal>
      <div
        id={id}
        className="scroll-mt-32 border-t border-white/[0.08] pt-10 first:border-t-0 first:pt-0"
      >
        <div className="flex items-start gap-4">
          <span className="mt-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/[0.08] text-amber-base">
            <CircleDot className="h-4 w-4" />
          </span>

          <h2 className="text-2xl font-black leading-tight tracking-[-0.025em] text-text-primary md:text-3xl">
            {text}
          </h2>
        </div>
      </div>
    </Reveal>
  );
}

function ContentParagraph({
  text,
}: {
  text: string;
}) {
  return (
    <Reveal>
      <p className="text-base leading-8 text-silver md:text-[1.04rem] md:leading-9">
        {text}
      </p>
    </Reveal>
  );
}

function ContentList({
  items,
}: {
  items: string[];
}) {
  return (
    <Reveal>
      <div className="grid gap-3">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="group flex items-start gap-4 rounded-2xl border border-white/[0.075] bg-surface/55 px-5 py-4 transition-all duration-300 hover:border-amber-base/25 hover:bg-surface"
          >
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-base/10 text-amber-base transition-transform group-hover:scale-110">
              <Check className="h-3.5 w-3.5" />
            </span>

            <span className="text-sm leading-7 text-silver transition-colors group-hover:text-text-primary">
              {item}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function ContentTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-surface/60">
        <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
            <Layers3 className="h-4 w-4" />
          </span>

          <div>
            <p className="text-xs font-black text-text-primary">
              Industry Comparison
            </p>

            <p className="mt-0.5 text-[10px] text-silver">
              Structured operational analysis
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] border-collapse text-left">
            <thead>
              <tr className="bg-amber-base/[0.065]">
                {headers.map((header) => (
                  <th
                    key={header}
                    className="border-b border-white/[0.08] px-5 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-amber-base"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition-colors hover:bg-white/[0.025]"
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={[
                        "border-b border-white/[0.065] px-5 py-4 text-sm leading-6",
                        cellIndex === 0
                          ? "font-bold text-text-primary"
                          : "text-silver",
                      ].join(" ")}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

function ContentCode({
  text,
}: {
  text: string;
}) {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-bg-base">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-base/10 text-amber-base">
              <Code2 className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-black text-text-primary">
                Technical Example
              </p>

              <p className="mt-0.5 text-[10px] text-silver">
                Implementation reference
              </p>
            </div>
          </div>

          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-base/60" />
          </div>
        </div>

        <pre className="overflow-x-auto p-5 text-sm leading-7 text-silver md:p-6">
          <code>{text}</code>
        </pre>
      </div>
    </Reveal>
  );
}

/* =========================================================
   Article Renderer
========================================================= */

function IndustryArticle({
  industry,
  headingMap,
}: {
  industry: IndustryData;
  headingMap: Map<number, string>;
}) {
  return (
    <article className="space-y-8">
      {industry.content.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "featuredAnswer":
            return (
              <FeaturedAnswer
                key={key}
                text={block.text}
              />
            );

          case "heading":
            return (
              <ContentHeading
                key={key}
                text={block.text}
                id={
                  headingMap.get(index) ||
                  `section-${index + 1}`
                }
              />
            );

          case "paragraph":
            return (
              <ContentParagraph
                key={key}
                text={block.text}
              />
            );

          case "list":
            return (
              <ContentList
                key={key}
                items={block.items}
              />
            );

          case "table":
            return (
              <ContentTable
                key={key}
                headers={block.headers}
                rows={block.rows}
              />
            );

          case "code":
            return (
              <ContentCode
                key={key}
                text={block.text}
              />
            );

          default:
            return null;
        }
      })}
    </article>
  );
}

/* =========================================================
   Architecture Visual
========================================================= */

const architectureNodes = [
  {
    icon: Fingerprint,
    label: "Identity",
    position:
      "left-[8%] top-[16%] md:left-[12%] md:top-[18%]",
  },
  {
    icon: Database,
    label: "Data",
    position:
      "right-[8%] top-[16%] md:right-[12%] md:top-[18%]",
  },
  {
    icon: Link2,
    label: "Contracts",
    position:
      "bottom-[14%] left-[8%] md:bottom-[17%] md:left-[12%]",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    position:
      "bottom-[14%] right-[8%] md:bottom-[17%] md:right-[12%]",
  },
];

function ArchitectureVisual() {
  return (
    <section className="mt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.09] bg-gradient-to-br from-surface via-bg-base to-background p-6 md:p-10 lg:p-14">
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-amber-base/[0.07] blur-[100px]" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
                Connected Architecture
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
                An Industry Platform Is More Than a Smart Contract
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-silver md:text-base">
                Production systems combine identity, data,
                programmable workflows, infrastructure,
                integrations and security into one coordinated
                architecture.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Permission and identity controls",
                  "On-chain and off-chain data design",
                  "Business system integrations",
                  "Monitoring and operational support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/[0.075] bg-white/[0.025] px-4 py-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-base" />

                    <span className="text-xs leading-5 text-silver">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[550px]">
              <div className="absolute inset-[13%] rounded-full border border-amber-base/10" />

              <div className="industry-rotate-slow absolute inset-[21%] rounded-full border border-dashed border-amber-base/30" />

              <div className="industry-rotate-reverse absolute inset-[30%] rounded-full border border-white/10" />

              <div className="absolute inset-0">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 500 500"
                  className="h-full w-full"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-amber-base/25"
                  >
                    <path
                      d="M250 250 L95 105"
                      className="industry-draw-line"
                    />

                    <path
                      d="M250 250 L405 105"
                      className="industry-draw-line industry-draw-line-delay"
                    />

                    <path
                      d="M250 250 L95 395"
                      className="industry-draw-line industry-draw-line-delay-two"
                    />

                    <path
                      d="M250 250 L405 395"
                      className="industry-draw-line industry-draw-line-delay-three"
                    />
                  </g>
                </svg>
              </div>

              <div className="absolute left-1/2 top-1/2 z-10 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-amber-base/30 bg-bg-base shadow-[0_0_80px_rgba(225,157,45,0.15)] md:h-40 md:w-40">
                <div className="text-center">
                  <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-amber-base text-bg-base shadow-glow">
                    <Blocks className="h-6 w-6" />
                  </span>

                  <p className="mt-3 text-xs font-black text-text-primary">
                    Blockchain
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-amber-base">
                    Trust Layer
                  </p>
                </div>
              </div>

              {architectureNodes.map((node, index) => {
                const Icon = node.icon;

                return (
                  <div
                    key={node.label}
                    className={[
                      "industry-architecture-node absolute z-20",
                      node.position,
                    ].join(" ")}
                    style={{
                      animationDelay: `${index * 0.45}s`,
                    }}
                  >
                    <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-surface/90 shadow-xl backdrop-blur-xl md:h-24 md:w-24">
                      <div className="text-center">
                        <Icon className="mx-auto h-5 w-5 text-amber-base" />

                        <p className="mt-2 text-[10px] font-black text-text-primary">
                          {node.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================================================
   FAQs
========================================================= */

function IndustryFAQs({
  faqs,
}: {
  faqs: IndustryData["faqs"];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    faqs.length > 0 ? 0 : null,
  );

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
              Frequently Asked Questions
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
              Important Questions Before You Build
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-silver">
              Clear answers to common strategic, technical and
              implementation questions related to this industry.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <Reveal
                key={faq.question}
                delay={index * 70}
              >
                <article
                  className={[
                    "overflow-hidden rounded-[1.5rem] border transition-all duration-300",
                    open
                      ? "border-amber-base/25 bg-surface"
                      : "border-white/[0.08] bg-surface/55",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(open ? null : index)
                    }
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-6"
                  >
                    <span className="flex items-start gap-4">
                      <span
                        className={[
                          "grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-black transition-all",
                          open
                            ? "bg-amber-base text-bg-base"
                            : "bg-amber-base/10 text-amber-base",
                        ].join(" ")}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="pt-1.5 text-sm font-black leading-6 text-text-primary md:text-base">
                        {faq.question}
                      </span>
                    </span>

                    <ChevronDown
                      className={[
                        "h-5 w-5 shrink-0 text-amber-base transition-transform duration-300",
                        open ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-300",
                      open
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-white/[0.07] px-5 py-5 text-sm leading-7 text-silver md:px-6 md:pl-[5.25rem]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   Related Industries
========================================================= */

function RelatedIndustries({
  industries,
}: {
  industries: IndustryData[];
}) {
  if (industries.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <Reveal>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-base">
              Continue Exploring
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-text-primary md:text-5xl">
              Related Industry Insights
            </h2>
          </div>

          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 text-sm font-black text-amber-base"
          >
            View all industries

            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {industries.map((industry, index) => (
          <Reveal
            key={industry.slug}
            delay={index * 90}
            className="h-full"
          >
            <Link
              href={`/industries/${industry.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/30"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

                <span className="absolute left-5 top-5 rounded-full border border-amber-base/20 bg-bg-base/75 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-amber-base backdrop-blur-xl">
                  {industry.hero.badge ||
                    industry.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-black leading-snug text-text-primary transition-colors group-hover:text-amber-base">
                  {industry.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-7 text-silver">
                  {industry.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-white/[0.08] pt-5">
                  <span className="text-xs font-black text-text-primary">
                    Read industry guide
                  </span>

                  <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-amber-base transition-all group-hover:bg-amber-base group-hover:text-bg-base">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   CTA
========================================================= */

function IndustryCTA({
  cta,
}: {
  cta: IndustryData["cta"];
}) {
  return (
    <section className="mt-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-base/20 bg-bg-base p-8 shadow-[0_30px_110px_rgba(0,0,0,0.22)] md:p-12 lg:p-16">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-base/[0.14] via-transparent to-amber-base/[0.035]" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,.9) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="industry-rotate-slow absolute -right-24 -top-24 h-80 w-80 rounded-full border border-amber-base/10" />

          <div className="industry-rotate-reverse absolute -right-10 -top-10 h-52 w-52 rounded-full border border-amber-base/20" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-amber-base">
                <Sparkles className="h-4 w-4" />

                Start Your Industry Project
              </div>

              <h2 className="mt-5 max-w-4xl text-3xl font-black leading-tight text-text-primary md:text-5xl">
                {cta.title}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-silver md:text-base">
                {cta.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-amber-base px-8 py-4 text-sm font-black text-bg-base shadow-glow transition-all hover:-translate-y-1 hover:bg-amber-light"
              >
                {cta.primaryText}

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-8 py-4 text-sm font-bold text-text-primary transition-all hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-base/[0.05] hover:text-amber-base"
              >
                {cta.secondaryText}

                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================================================
   Main Component
========================================================= */

export default function IndustryDetailPage({
  industry,
  relatedIndustries,
}: IndustryDetailPageProps) {
  const { tocItems, headingMap } = useMemo(() => {
    const generatedItems: TocItem[] = [];
    const generatedMap = new Map<number, string>();
    const duplicateCounter = new Map<string, number>();

    industry.content.forEach((block, index) => {
      if (block.type !== "heading") {
        return;
      }

      const baseId = createSectionId(block.text, index);
      const count = duplicateCounter.get(baseId) || 0;

      duplicateCounter.set(baseId, count + 1);

      const uniqueId =
        count === 0 ? baseId : `${baseId}-${count + 1}`;

      generatedMap.set(index, uniqueId);

      generatedItems.push({
        id: uniqueId,
        label: block.text,
      });
    });

    return {
      tocItems: generatedItems,
      headingMap: generatedMap,
    };
  }, [industry.content]);

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main className="overflow-hidden bg-gradient-to-b from-background via-bg-base to-background">
          <IndustryHero industry={industry} />

          <IndustryValueStrip />

          <section
            id="industry-content"
            className="site-container scroll-mt-24 px-6 pt-24"
          >
      

              <div className="min-w-0">
                <div className="mb-10 flex items-center justify-between gap-5 border-b border-white/[0.08] pb-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                      <FileText className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-sm font-black text-text-primary">
                        Complete Industry Guide
                      </p>

                      <p className="mt-1 text-xs text-silver">
                        Strategy, architecture and implementation
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-2 text-xs text-silver sm:inline-flex">
                    <Clock3 className="h-3.5 w-3.5 text-amber-base" />

                    {industry.readTime}
                  </div>
                </div>

                <IndustryArticle
                  industry={industry}
                  headingMap={headingMap}
                />
              </div>
            

            <ArchitectureVisual />

            <IndustryFAQs faqs={industry.faqs} />

            <RelatedIndustries
              industries={relatedIndustries}
            />

            <IndustryCTA cta={industry.cta} />
          </section>
        </main>

        <div className="h-24 bg-background" />

        <Footer />

        <BackToTop />
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        .industry-reveal {
          opacity: 0;
          transform: translateY(34px);
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .industry-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .industry-hero-entry {
          opacity: 0;
          transform: translateY(24px);
          animation: industryHeroEntry 850ms
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .industry-hero-entry-two {
          animation-delay: 100ms;
        }

        .industry-hero-entry-three {
          animation-delay: 200ms;
        }

        .industry-hero-entry-four {
          animation-delay: 300ms;
        }

        .industry-hero-entry-five {
          animation-delay: 400ms;
        }

        .industry-hero-entry-six {
          animation-delay: 500ms;
        }

        .industry-hero-visual {
          opacity: 0;
          transform: translateX(40px) scale(0.97);
          animation: industryHeroVisual 1100ms
            cubic-bezier(0.22, 1, 0.36, 1) 180ms forwards;
        }

        .industry-hero-image {
          animation: industryImageBreath 12s ease-in-out
            infinite alternate;
        }

        .industry-loading-line {
          width      <div className="grid gap-12 xl:grid-cols-[230px_minmax(0,1fr)] 2xl:grid-cols-[260px_minmax(0,1fr)]">
              <TableOfContents items={tocItems} />: 28%;
          animation: industryLoadingLine 4.5s ease-in-out
            infinite;
        }

        .industry-float-slow {
          animation: industryFloat 5s ease-in-out infinite;
        }

        .industry-float-reverse {
          animation: industryFloatReverse 6s ease-in-out
            infinite;
        }

        .industry-network-node {
          animation: industryNodePulse 3.5s ease-in-out
            infinite;
        }

        .industry-draw-line {
          stroke-dasharray: 12 12;
          animation: industryLineFlow 8s linear infinite;
        }

        .industry-draw-line-delay {
          animation-delay: -2s;
        }

        .industry-draw-line-delay-two {
          animation-delay: -4s;
        }

        .industry-draw-line-delay-three {
          animation-delay: -6s;
        }

        .industry-pointer-glow {
          background: radial-gradient(
            420px circle at var(--pointer-x, 50%)
              var(--pointer-y, 50%),
            rgba(232, 170, 60, 0.11),
            transparent 48%
          );
          z-index: 2;
        }

        .industry-rotate-slow {
          animation: industryRotate 24s linear infinite;
        }

        .industry-rotate-reverse {
          animation: industryRotateReverse 20s linear infinite;
        }

        .industry-architecture-node {
          animation: industryArchitectureFloat 4.5s ease-in-out
            infinite;
        }

        @keyframes industryHeroEntry {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes industryHeroVisual {
          from {
            opacity: 0;
            transform: translateX(40px) scale(0.97);
          }

          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes industryImageBreath {
          from {
            transform: scale(1);
          }

          to {
            transform: scale(1.06);
          }
        }

        @keyframes industryLoadingLine {
          0% {
            width: 18%;
            transform: translateX(-35%);
          }

          50% {
            width: 72%;
            transform: translateX(25%);
          }

          100% {
            width: 18%;
            transform: translateX(480%);
          }
        }

        @keyframes industryFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
          }

          50% {
            transform: translateY(-12px) rotate(1deg);
          }
        }

        @keyframes industryFloatReverse {
          0%,
          100% {
            transform: translateY(0) rotate(1deg);
          }

          50% {
            transform: translateY(12px) rotate(-1deg);
          }
        }

        @keyframes industryNodePulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.85);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        @keyframes industryLineFlow {
          to {
            stroke-dashoffset: -96;
          }
        }

        @keyframes industryRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes industryRotateReverse {
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes industryArchitectureFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
          }

          .industry-reveal,
          .industry-hero-entry,
          .industry-hero-visual {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }

          .industry-hero-image,
          .industry-loading-line,
          .industry-float-slow,
          .industry-float-reverse,
          .industry-network-node,
          .industry-draw-line,
          .industry-rotate-slow,
          .industry-rotate-reverse,
          .industry-architecture-node {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
