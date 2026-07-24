import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Layers3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Footer } from "@/components/landing/Footer";
import { Navbar } from "@/components/landing/Navbar";
import BackToTop from "@/components/ui/BackToTop";
import { createMetadata } from "@/config/metadata";
import { technologies } from "@/data/technologies";

export const metadata = createMetadata({
  title: "Blockchain Technologies We Use",
  description:
    "Explore the blockchain platforms, smart contract tools, infrastructure, and Web3 technologies used by ClickMasters to build secure production-ready products.",
  path: "/technologies",
});

const selectionPrinciples = [
  {
    icon: ShieldCheck,
    title: "Security",
    description:
      "Battle-tested tooling, secure architecture, threat modeling, and audit-ready implementation.",
  },
  {
    icon: Layers3,
    title: "Scalability",
    description:
      "Infrastructure designed for future transaction growth, data volume, and user demand.",
  },
  {
    icon: Cpu,
    title: "Maintainability",
    description:
      "Clean architecture, documentation, testing, monitoring, and predictable upgrade paths.",
  },
  {
    icon: Sparkles,
    title: "Interoperability",
    description:
      "Reliable connections across wallets, chains, APIs, oracles, indexers, and external systems.",
  },
];

export default function TechnologiesPage() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Navbar />

      <main className="overflow-hidden bg-bg-base">
        <section className="relative isolate border-b border-white/[0.07] pb-20 pt-36 lg:pb-28 lg:pt-44">
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
                Technologies
              </span>
            </nav>

            <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-base/25 bg-amber-base/[0.07] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-amber-base">
                  <Cpu className="h-4 w-4" />
                  Blockchain Technology Stack
                </div>

                <h1 className="mt-7 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.045em] text-text-primary sm:text-5xl lg:text-7xl">
                  Technologies behind production-ready Web3 products.
                </h1>

                <p className="mt-7 max-w-3xl text-base leading-8 text-silver sm:text-lg">
                  We select blockchain platforms, smart contract frameworks,
                  infrastructure tools, and application technologies based on
                  security, scalability, maintainability, and real-world
                  product requirements.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-amber-base px-6 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light hover:shadow-[0_18px_50px_rgba(225,157,45,0.25)]"
                  >
                    Discuss your technology stack
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/service"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.025] px-6 text-sm font-black text-text-primary transition-all duration-300 hover:border-amber-base/40 hover:bg-amber-base/[0.07] hover:text-amber-base"
                  >
                    Explore our services
                  </Link>
                </div>
              </div>

              <aside className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface/80 p-7 backdrop-blur-xl">
                <div className="absolute right-0 top-0 h-36 w-36 translate-x-1/3 -translate-y-1/3 rounded-full bg-amber-base/[0.12] blur-3xl" />

                <div className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/25 bg-amber-base/[0.08] text-amber-base">
                    <Layers3 className="h-5 w-5" />
                  </span>

                  <p className="mt-7 text-5xl font-black tracking-[-0.04em] text-text-primary">
                    {technologies.length}
                  </p>

                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-amber-base">
                    Technology guides
                  </p>

                  <div className="mt-6 space-y-3 border-t border-white/[0.08] pt-6">
                    {[
                      "Platform and chain selection",
                      "Smart contract infrastructure",
                      "Production deployment guidance",
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

        <section className="border-b border-white/[0.07] py-12">
          <div className="site-container relative grid gap-5 px-6 md:grid-cols-2 lg:grid-cols-4">
            {selectionPrinciples.map(({ icon: Icon, title, description }) => (
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
            ))}
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="site-container relative px-6">
            <div className="flex flex-col justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  Engineering Stack
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-text-primary sm:text-4xl">
                  The right technology for every blockchain product
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-silver sm:text-base">
                  Each technology is evaluated against network requirements,
                  transaction volume, security constraints, interoperability,
                  developer experience, and long-term maintenance.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {technologies.map((technology, index) => (
                <article
                  key={technology.slug}
                  className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[2rem] border border-white/[0.09] bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-amber-base/35 hover:shadow-[0_30px_90px_rgba(0,0,0,0.24)]"
                >
                  <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-amber-base/[0.05] blur-[60px] transition-colors duration-500 group-hover:bg-amber-base/[0.1]" />

                  <div className="relative border-b border-white/[0.08] p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-amber-base/25 bg-amber-base/[0.08] text-sm font-black tracking-[0.15em] text-amber-base">
                        {technology.shortName}
                      </div>

                      <span className="inline-flex items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/[0.06] px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-amber-base">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        {technology.category}
                      </span>
                    </div>

                    <p className="mt-7 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
                      Technology {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.025em] text-text-primary transition-colors duration-300 group-hover:text-amber-base">
                      {technology.name}
                    </h3>
                  </div>

                  <div className="relative flex flex-1 flex-col p-7">
                    <p className="line-clamp-4 text-sm leading-7 text-silver">
                      {technology.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {technology.capabilities
                        .slice(0, 3)
                        .map((capability) => (
                          <span
                            key={capability}
                            className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-[10px] font-medium text-silver"
                          >
                            {capability}
                          </span>
                        ))}
                    </div>

                    <div className="mt-auto pt-7">
                      <Link
                        href={`/technologies/${technology.slug}`}
                        className="group/link flex items-center justify-between gap-4 border-t border-white/[0.08] pt-5"
                      >
                        <span className="text-xs font-black text-amber-base">
                          Explore {technology.name}
                        </span>

                        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-amber-base transition-all duration-300 group-hover/link:border-amber-base group-hover/link:bg-amber-base group-hover/link:text-bg-base">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 lg:pb-32">
          <div className="site-container relative px-6">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-amber-base/25 bg-surface px-7 py-12 text-center sm:px-10 lg:px-16 lg:py-16">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(225,157,45,0.18),transparent_35%),radial-gradient(circle_at_90%_70%,rgba(225,157,45,0.08),transparent_30%)]" />

              <div className="relative mx-auto max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-base">
                  Build with confidence
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.035em] text-text-primary sm:text-4xl lg:text-5xl">
                  Unsure which technology fits your product?
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-silver sm:text-base">
                  Share your product requirements with our blockchain
                  engineers. We will help you evaluate the right network,
                  architecture, development tools, and infrastructure.
                </p>

                <Link
                  href="/contact"
                  className="mt-9 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-amber-base px-7 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light hover:shadow-[0_18px_50px_rgba(225,157,45,0.25)]"
                >
                  Book a free strategy call
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
