"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Boxes,
  ChevronDown,
  FileText,
  GitCompare,
  Hexagon,
  Library,
  ListChecks,
  Menu,
  Newspaper,
  Wrench,
  X,
} from "lucide-react";

const links = [
  { label: "Services", href: "/service" },
  { label: "Solution", href: "/solution" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const blogLinks = [
  {
    label: "Comparison",
    href: "/comparison",
    desc: "Compare platforms, tools, chains, and Web3 solutions.",
    icon: GitCompare,
  },
  {
    label: "How To",
    href: "/howto",
    desc: "Step-by-step blockchain guides and implementation tutorials.",
    icon: BookOpen,
  },
  {
    label: "Listicles",
    href: "/listicles",
    desc: "Curated lists, rankings, ideas, and expert recommendations.",
    icon: ListChecks,
  },
  {
    label: "News",
    href: "/news",
    desc: "Latest blockchain, crypto, Web3, and enterprise updates.",
    icon: Newspaper,
  },
];

const resourceLinks = [
  {
    label: "Glossary",
    href: "/glossary",
    desc: "Simple explanations of blockchain and Web3 terminology.",
    icon: Library,
  },
  {
    label: "Tools",
    href: "/tools",
    desc: "Calculators, checklists, audit tools, and useful resources.",
    icon: Wrench,
  },
  {
    label: "Templates",
    href: "/templates",
    desc: "Ready-to-use documents, specs, and planning templates.",
    icon: FileText,
  },
  {
    label: "Resources",
    href: "/resources",
    desc: "Guides, frameworks, insights, and expert learning material.",
    icon: Boxes,
  },
];
const blogFeatured: Record<string, any[]> = {
  Comparison: [
    {
      title: "Hyperledger Fabric vs Ethereum",
      desc: "Enterprise blockchain comparison for private vs public infrastructure.",
      href: "/comparison/hyperledger-fabric-vs-ethereum",
      badge: "Comparison",
    },
    {
      title: "Ethereum vs Solana",
      desc: "Which blockchain should you choose for your application in 2025?",
      href: "/comparison/ethereum-vs-solana",
      badge: "Popular",
    },
  ],
  "How To": [
    {
      title: "How to Launch a Token",
      desc: "From tokenomics and contracts to liquidity and exchange listings.",
      href: "/howto/how-to-launch-a-token",
      badge: "Guide",
    },
    {
      title: "Build a Blockchain App",
      desc: "Step-by-step implementation guidance for Web3 builders.",
      href: "/howto",
      badge: "How-To",
    },
  ],
  Listicles: [
    {
      title: "Best Blockchain Certifications",
      desc: "Courses and certifications that actually matter in 2025.",
      href: "/listicles",
      badge: "List",
    },
    {
      title: "Top Blockchain Use Cases",
      desc: "Real-world blockchain use cases with practical ROI.",
      href: "/listicles",
      badge: "Featured",
    },
  ],
  News: [
    {
      title: "Blockchain News Hub",
      desc: "Latest enterprise blockchain, crypto, and Web3 updates.",
      href: "/news",
      badge: "News",
    },
    {
      title: "Ethereum Roadmap Updates",
      desc: "Track important ecosystem and infrastructure changes.",
      href: "/news",
      badge: "Latest",
    },
  ],
};

const resourceFeatured: Record<string, any[]> = {
  Glossary: [
    {
      title: "Blockchain Glossary",
      desc: "Simple explanations of Web3 and blockchain terminology.",
      href: "/glossary",
      badge: "Glossary",
    },
    {
      title: "Smart Contract Terms",
      desc: "Understand the core language of blockchain development.",
      href: "/glossary",
      badge: "Terms",
    },
  ],
  Tools: [
    {
      title: "Blockchain Cost Calculator",
      desc: "Estimate project budget, timelines, and technical scope.",
      href: "/tools",
      badge: "Tool",
    },
    {
      title: "Security Checklist",
      desc: "Plan safer launches with practical audit preparation tools.",
      href: "/tools",
      badge: "Checklist",
    },
  ],
  Templates: [
    {
      title: "Tokenomics Template",
      desc: "Plan supply, vesting, emissions, and launch structure.",
      href: "/templates",
      badge: "Template",
    },
    {
      title: "Project Scope Template",
      desc: "Document features, architecture, milestones, and budget.",
      href: "/templates",
      badge: "Docs",
    },
  ],
  Resources: [
    {
      title: "Blockchain Resource Hub",
      desc: "Guides, frameworks, checklists, and planning resources.",
      href: "/resources",
      badge: "Hub",
    },
    {
      title: "Developer Path Guide",
      desc: "Structured learning path for blockchain builders.",
      href: "/resources",
      badge: "Guide",
    },
  ],
};

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: {
    label: string;
    href: string;
    desc: string;
    icon: React.ElementType;
  }[];
}) {
  const isBlog = label.toLowerCase() === "blog";
  const featuredMap = isBlog ? blogFeatured : resourceFeatured;
  const [active, setActive] = useState(items[0]?.label);

  const activeCards = featuredMap[active] || [];

  return (
    <li className="group relative">
      <button className="inline-flex items-center gap-1.5 text-base font-medium text-silver transition-colors hover:text-silver-light">
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-5 w-[850px] -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="absolute -top-5 left-0 h-5 w-full" />

        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-bg-base/95 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-amber-base/15 blur-3xl" />

          <div className="relative grid gap-4 lg:grid-cols-[300px_1fr]">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
              <p className="px-2 pb-3 text-[11px] font-black uppercase tracking-[0.24em] text-amber-base">
                {isBlog ? "Blog Categories" : "Resource Categories"}
              </p>

              <div className="space-y-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.label;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => setActive(item.label)}
                      className={`group/item flex items-center gap-3 rounded-2xl border p-3 transition-all ${
                        isActive
                          ? "border-amber-base/35 bg-amber-base/10"
                          : "border-transparent hover:border-amber-base/25 hover:bg-amber-base/10"
                      }`}
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-base/10 text-amber-base transition-transform group-hover/item:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>

                      <span className="min-w-0">
                        <span
                          className={`block text-sm font-black ${
                            isActive ? "text-amber-base" : "text-text-primary"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="line-clamp-1 block text-xs leading-5 text-silver">
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.24em] text-amber-base">
                    Featured in {active}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-black text-text-primary">
                    Latest picks
                  </h3>
                </div>

                <Link
                  href={items.find((i) => i.label === active)?.href || "#"}
                  className="rounded-full border border-white/10 px-4 py-2 text-xs font-bold text-silver transition-colors hover:border-amber-base/30 hover:text-amber-base"
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {activeCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    className="group/card relative min-h-[210px] overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-amber-base/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/35"
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-amber-base/15 blur-2xl opacity-0 transition-opacity group-hover/card:opacity-100" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <span className="inline-flex rounded-full bg-amber-base/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-amber-base">
                          {card.badge}
                        </span>

                        <h4 className="mt-4 text-lg font-black leading-tight text-text-primary transition-colors group-hover/card:text-amber-base">
                          {card.title}
                        </h4>

                        <p className="mt-3 text-sm leading-6 text-silver">
                          {card.desc}
                        </p>
                      </div>

                      <span className="mt-5 text-sm font-black text-amber-base">
                        Read more →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center">
      <nav
        className={`site-container flex items-center justify-between gap-6 rounded-full border border-border bg-bg-base/5 px-3 py-3 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-soft" : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-glow text-amber-base">
            <Hexagon className="h-4 w-4" strokeWidth={2} />
          </span>

          <span className="font-display text-base font-bold tracking-tight text-text-primary">
            CLICK<span className="text-amber-base">MASTERS</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-base font-medium text-silver transition-colors hover:text-silver-light"
              >
                {l.label}
              </Link>
            </li>
          ))}

          <DesktopDropdown label="Blog" items={blogLinks} />
          <DesktopDropdown label="Resources" items={resourceLinks} />
        </ul>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber-base px-4 py-2.5 text-sm font-semibold text-bg-base transition-transform hover:-translate-y-0.5"
          >
            Book a Free Strategy Call
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-20 max-h-[75vh] overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-soft md:hidden">
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {l.label}
                </Link>
              </li>
            ))}

            <li className="pt-3">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-base">
                Blog
              </p>

              <div className="grid gap-2">
                {blogLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 hover:bg-muted"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-base/10 text-amber-base">
                        <Icon className="h-4 w-4" />
                      </span>

                      <span>
                        <span className="block text-sm font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="block text-xs leading-5 text-silver">
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </li>

            <li className="pt-3">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-base">
                Resources
              </p>

              <div className="grid gap-2">
                {resourceLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 hover:bg-muted"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-base/10 text-amber-base">
                        <Icon className="h-4 w-4" />
                      </span>

                      <span>
                        <span className="block text-sm font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="block text-xs leading-5 text-silver">
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </li>

            <li>
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-full bg-amber-base px-4 py-2.5 text-center text-sm font-semibold text-bg-base"
              >
                Book a Free Strategy Call
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
