"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ElementType, ReactNode } from "react";
import {
  BadgeCheck,
  Banknote,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Coins,
  Cpu,
  Factory,
  FileText,
  Gamepad2,
  GitCompare,
  Globe2,
  GraduationCap,
  HeartPulse,
  Hexagon,
  Home,
  Library,
  ListChecks,
  LockKeyhole,
  Menu,
  Network,
  Newspaper,
  PlugZap,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Users,
  WalletCards,
  Workflow,
  Wrench,
  X,
  Zap,
} from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  desc: string;
  icon: ElementType;
};

const servicesLinks: NavItem[] = [
  { label: "Smart Contract Development", desc: "Secure smart contracts for production blockchain products.", icon: ShieldCheck },
  { label: "DApp Development", desc: "Decentralized apps with polished product experiences.", icon: Hexagon },
  { label: "Web3 Development", desc: "Wallet, token, and chain-connected applications.", icon: Globe2 },
  { label: "Crypto Wallet Development", desc: "Custody, signing, and multi-chain wallet flows.", icon: WalletCards },
  { label: "Crypto Exchange Development", desc: "Exchange architecture, trading, and liquidity systems.", icon: Banknote },
  { label: "DeFi Development", desc: "Lending, staking, swaps, vaults, and protocol tooling.", icon: Coins },
  { label: "NFT Marketplace Development", desc: "Marketplaces for collections, assets, and digital goods.", icon: ShoppingBag },
  { label: "Token Development", desc: "Token contracts, launches, vesting, and tokenomics.", icon: BadgeCheck },
  { label: "DAO Development", desc: "Governance, treasury, voting, and community systems.", icon: Users },
  { label: "Blockchain Consulting", desc: "Technical strategy for launches and enterprise adoption.", icon: BriefcaseBusiness },
  { label: "Blockchain Security & Audit", desc: "Security reviews, risk reduction, and audit readiness.", icon: LockKeyhole },
  { label: "Blockchain Integration", desc: "Connect blockchain systems with existing products.", icon: PlugZap },
];

const industriesLinks: NavItem[] = [
  { label: "FinTech & Banking", desc: "Payments, custody, compliance, and financial rails.", icon: Banknote },
  { label: "Healthcare", desc: "Records, consent, identity, and secure data exchange.", icon: HeartPulse },
  { label: "Real Estate", desc: "Tokenization, escrow, property records, and ownership.", icon: Home },
  { label: "Supply Chain & Logistics", desc: "Traceability, provenance, and multi-party workflows.", icon: Truck },
  { label: "Manufacturing", desc: "Parts tracking, quality records, and supplier networks.", icon: Factory },
  { label: "Retail & E-commerce", desc: "Loyalty, payments, authentication, and marketplaces.", icon: ShoppingBag },
  { label: "Education", desc: "Credentials, certificates, identity, and learning records.", icon: GraduationCap },
  { label: "Gaming & Entertainment", desc: "Game assets, rewards, memberships, and fan economies.", icon: Gamepad2 },
  { label: "Insurance", desc: "Claims, policies, parametric products, and audit trails.", icon: ShieldCheck },
  { label: "Energy & Utilities", desc: "Grid data, carbon tracking, and settlement systems.", icon: Zap },
  { label: "Government", desc: "Public records, procurement, identity, and transparency.", icon: Building2 },
];

const solutionLinks: NavItem[] = [
  { label: "Crypto Solutions", desc: "Crypto-native product strategy and implementation.", icon: Coins },
  { label: "Enterprise Blockchain Solutions", desc: "Private and consortium systems for business workflows.", icon: Building2 },
  { label: "Private Blockchain Solutions", desc: "Permissioned networks for controlled environments.", icon: LockKeyhole },
  { label: "Web3 Solutions", desc: "Wallet-enabled applications, memberships, and token systems.", icon: Globe2 },
  { label: "DeFi Solutions", desc: "Protocol architecture for decentralized finance products.", icon: Banknote },
  { label: "Tokenization Solutions", desc: "Real-world asset and digital asset tokenization.", icon: BadgeCheck },
  { label: "DAO Solutions", desc: "Governance and treasury systems for communities.", icon: Users },
  { label: "DEX Solutions", desc: "Swap, liquidity, and decentralized exchange tooling.", icon: Workflow },
  { label: "Cross-Chain Solutions", desc: "Bridge and interoperability patterns across chains.", icon: Network },
  { label: "Blockchain Payment Solutions", desc: "On-chain payments, settlement, and merchant flows.", icon: WalletCards },
  { label: "Layer 2 Solutions", desc: "Scaling, rollups, and low-fee blockchain experiences.", icon: Boxes },
  { label: "Blockchain Integration Solutions", desc: "Integrate chains, contracts, wallets, and APIs.", icon: PlugZap },
];

const technologyLinks: NavItem[] = [
  { label: "Ethereum", desc: "EVM smart contracts, DeFi, NFTs, and protocol builds.", icon: Hexagon },
  { label: "Solana", desc: "High-throughput apps, tokens, and performance-focused UX.", icon: Zap },
  { label: "Polygon", desc: "Scaling, marketplaces, payments, and consumer Web3.", icon: Network },
  { label: "BNB Chain", desc: "BSC tokens, DeFi products, and wallet integrations.", icon: Coins },
  { label: "Hyperledger", desc: "Enterprise and permissioned blockchain networks.", icon: Building2 },
  { label: "Avalanche", desc: "Subnets, DeFi, tokenization, and custom networks.", icon: Boxes },
  { label: "Arbitrum", desc: "Layer 2 apps with Ethereum security and lower fees.", icon: Workflow },
  { label: "Optimism", desc: "OP Stack, rollups, and scalable EVM ecosystems.", icon: Cpu },
];

const companyLinks: NavItem[] = [
  { label: "About Us", href: "/about", desc: "Learn about ClickMasters and our Web3 delivery approach.", icon: Building2 },
  { label: "Why Choose Us", desc: "What makes our blockchain team a stronger partner.", icon: Star },
  { label: "Our Team", desc: "Meet the people behind strategy, design, and engineering.", icon: Users },
  { label: "Testimonials", desc: "Client feedback and results from delivered projects.", icon: BadgeCheck },
];

const blogLinks: NavItem[] = [
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

const resourceLinks: NavItem[] = [
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

const primaryDropdowns = [
  { label: "Services", items: servicesLinks },
  { label: "Industries", items: industriesLinks },
  { label: "Solution", items: solutionLinks },
  { label: "Technologies", items: technologyLinks },
];

const mobileSections = [
  ...primaryDropdowns,
  { label: "Blog", items: blogLinks },
  { label: "Resources", items: resourceLinks },
  { label: "Company", items: companyLinks },
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
      title: "Advanced Blockchain Glossary",
      desc: "Explore 50 advanced technical terms used in DeFi, smart contracts, EVM development, and production blockchain systems.",
      href: "/glossary/advanced-blockchain-glossary",
      badge: "Developer Glossary",
    },
    {
      title: "Enterprise & Regulatory Glossary",
      desc: "Understand enterprise blockchain, compliance, regulatory, identity, custody, and institutional terminology.",
      href: "/glossary/enterprise-regulatory-glossary",
      badge: "Enterprise Glossary",
    },
  ],
  Tools: [
    {
      title: "Token Launch Checklist",
      desc: "Token launches that fail from exploited contracts, weak economics, or poor launch sequencing.",
      href: "/tools/token-launch-checklist",
      badge: "Checklist",
    },
    {
      title: "NFT Project Launch Checklist",
      desc: "The most common NFT project failures are preventable with the right launch plan.",
      href: "/tools/nft-launch-checklist",
      badge: "Checklist",
    },
  ],
  Templates: [
    {
      title: "Blockchain Industry News Hub",
      desc: "Track US regulatory developments, DeFi security incidents, and enterprise blockchain launches.",
      href: "/templates/blockchain-news-us-businesses",
      badge: "Template",
    },
    {
      title: "Blockchain Technology Partner Program",
      desc: "Partner resources for firms serving clients who need blockchain execution.",
      href: "/templates/blockchain-technology-partner-program",
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

function NavEntry({
  item,
  children,
  className = "",
  onClick,
}: {
  item: NavItem;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  if (item.href) {
    return (
      <Link href={item.href} onClick={onClick} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function DesktopSimpleDropdown({
  label,
  items,
}: {
  label: string;
  items: NavItem[];
}) {
  const [active, setActive] = useState(items[0]?.label);
  const activeItem = items.find((item) => item.label === active) || items[0];
  const ActiveIcon = activeItem?.icon || Hexagon;

  return (
    <li className="group relative">
      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-silver transition-colors hover:text-silver-light xl:text-base">
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-5 w-[760px] -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="absolute -top-5 left-0 h-5 w-full" />

        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-bg-base/95 p-4 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/80 to-transparent" />
          <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-amber-base/10 blur-3xl" />

          <div className="relative grid gap-4 lg:grid-cols-[1fr_250px]">
            <div>
              <p className="px-2 pb-3 text-[11px] font-black uppercase tracking-[0.24em] text-amber-base">
                {label}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.label;

                  return (
                    <div key={item.label} onMouseEnter={() => setActive(item.label)}>
                      <NavEntry
                        item={item}
                        className={`group/item flex min-h-[86px] w-full items-start gap-3 rounded-2xl border p-3 text-left transition-all ${
                          isActive
                            ? "border-amber-base/35 bg-amber-base/10"
                            : "border-white/5 bg-white/[0.025] hover:border-amber-base/25 hover:bg-amber-base/10"
                        }`}
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-base/10 text-amber-base transition-transform group-hover/item:scale-110">
                          <Icon className="h-5 w-5" />
                        </span>

                        <span className="min-w-0">
                          <span
                            className={`block text-sm font-black leading-tight ${
                              isActive ? "text-amber-base" : "text-text-primary"
                            }`}
                          >
                            {item.label}
                          </span>
                          <span className="mt-1 line-clamp-2 block text-xs leading-5 text-silver">
                            {item.desc}
                          </span>
                        </span>
                      </NavEntry>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.035] p-5">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-base/15 blur-2xl" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-base text-bg-base">
                  <ActiveIcon className="h-6 w-6" />
                </span>
                <p className="mt-5 text-[11px] font-black uppercase tracking-[0.22em] text-amber-base">
                  Explore
                </p>
                <h3 className="mt-2 font-display text-2xl font-black leading-tight text-text-primary">
                  {activeItem?.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-silver">
                  {activeItem?.desc}
                </p>
                <div className="mt-6 h-px bg-gradient-to-r from-amber-base/60 to-transparent" />
                <p className="mt-4 text-xs leading-5 text-silver">
                  Pages will be connected here as each section is finalized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: NavItem[];
}) {
  const isBlog = label.toLowerCase() === "blog";
  const featuredMap = isBlog ? blogFeatured : resourceFeatured;
  const [active, setActive] = useState(items[0]?.label);

  const activeCards = featuredMap[active] || [];

  return (
    <li className="group relative">
      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-silver transition-colors hover:text-silver-light xl:text-base">
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
                      href={item.href || "#"}
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
        className={`site-container flex items-center justify-between gap-4 rounded-full border border-border bg-bg-base/5 px-3 py-3 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-soft" : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-3 pl-2">
          <Image
            src="/media/logo.webp"
            alt="ClickMasters Logo"
            width={170}
            height={45}
            priority
            className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {primaryDropdowns.map((dropdown) => (
            <DesktopSimpleDropdown
              key={dropdown.label}
              label={dropdown.label}
              items={dropdown.items}
            />
          ))}
          <DesktopDropdown label="Blog" items={blogLinks} />
          <DesktopDropdown label="Resources" items={resourceLinks} />
          <DesktopSimpleDropdown label="Company" items={companyLinks} />
        </ul>

        <div className="hidden xl:block">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-amber-base px-4 py-2.5 text-sm font-semibold text-bg-base transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-base"
            aria-label="Book a free strategy call"
          >
            Book a Free Strategy Call
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-20 max-h-[75vh] overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-soft lg:hidden">
          <ul className="flex flex-col gap-2">
            {mobileSections.map((section) => (
              <li key={section.label} className="pt-3">
                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-base">
                  {section.label}
                </p>

                <div className="grid gap-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <NavEntry
                        key={item.label}
                        item={item}
                        onClick={() => item.href && setOpen(false)}
                        className="flex w-full gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-left hover:bg-muted"
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
                      </NavEntry>
                    );
                  })}
                </div>
              </li>
            ))}

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
