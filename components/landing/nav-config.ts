// components/landing/nav-config.ts
// Primary site navigation (mega menu + mobile accordion).
//
// Every href below points at a route that already exists in this codebase
// (static route, data-driven slug in /data, or a homepage section id). Do not
// add a link here until its page exists: items without a page are listed in
// PLANNED_NAV_PAGES instead, so they can be switched on once built.
//
// Portfolio and case-study content on this site is illustrative (see
// components/landing/Portfolio.tsx and app/case-studies/[slug]/page.tsx), so
// everything under "Our Work" carries the "Illustrative" badge and must not be
// described as verified client work.
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Banknote,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ClipboardCheck,
  Code2,
  Coins,
  Compass,
  Cpu,
  FileText,
  FlaskConical,
  Gamepad2,
  GitCompare,
  Globe2,
  GraduationCap,
  Handshake,
  HeartPulse,
  Hexagon,
  Home,
  Landmark,
  Layers,
  Library,
  LifeBuoy,
  ListChecks,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircleQuestion,
  Network,
  Newspaper,
  PiggyBank,
  PlugZap,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Truck,
  UserSearch,
  WalletCards,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

export type MenuLink = {
  label: string;
  href: string;
  desc?: string;
  icon?: LucideIcon;
  badge?: string;
};

export type MenuGroup = {
  heading: string;
  links: MenuLink[];
  /** Render links as compact chips (no descriptions). */
  compact?: boolean;
};

export type MenuSection = {
  id: string;
  label: string;
  /** Intro shown in the panel's side card. */
  summary: string;
  /** Hub page for the whole section, if one exists. */
  overview?: { label: string; href: string };
  groups: MenuGroup[];
  /** Small print shown under the side card (e.g. illustrative disclaimer). */
  note?: string;
};

const ILLUSTRATIVE = "Illustrative";

export const primaryNav: MenuSection[] = [
  {
    id: "what-we-do",
    label: "What We Do",
    summary:
      "Blockchain engineering from first smart contract to enterprise-grade networks, built security-first.",
    overview: { label: "View all services", href: "/service" },
    groups: [
      {
        heading: "Blockchain Engineering",
        links: [
          {
            label: "Blockchain Development",
            href: "/service/blockchain-development-services",
            desc: "End-to-end builds across contracts, DeFi, NFT and enterprise.",
            icon: Hexagon,
          },
          {
            label: "Custom Blockchain Development",
            href: "/service/cosmos-sdk-appchain-development",
            desc: "Application-specific chains and appchains on Cosmos SDK.",
            icon: Boxes,
          },
          {
            label: "Blockchain App Development",
            href: "/service/web3-mobile-app-development",
            desc: "Mobile apps with wallet and DeFi integration.",
            icon: Smartphone,
          },
          {
            label: "Smart Contract Development",
            href: "/service/smart-contract-development",
            desc: "Solidity, Rust and Go contracts for production.",
            icon: Code2,
          },
          {
            label: "Enterprise Blockchain Development",
            href: "/service/enterprise-blockchain-solutions",
            desc: "Hyperledger Fabric, private Ethereum and consortiums.",
            icon: Building2,
          },
          {
            label: "Blockchain Integration",
            href: "/process/blockchain-oracle-integration",
            desc: "Connect contracts to oracles, APIs and existing systems.",
            icon: PlugZap,
          },
        ],
      },
      {
        heading: "Web3 & Digital Assets",
        links: [
          {
            label: "Web3 Development",
            href: "/service/web3-development-company",
            desc: "Full-stack Web3 apps, subgraphs and wallet flows.",
            icon: Globe2,
          },
          {
            // No standalone dApp page yet; the Web3 page covers full-stack dApps.
            label: "DApp Development",
            href: "/service/web3-development-company",
            desc: "Decentralized apps with production-grade UX.",
            icon: Layers,
          },
          {
            label: "NFT Marketplace Development",
            href: "/service/nft-development-company",
            desc: "Minting contracts, marketplaces and royalties.",
            icon: ShoppingBag,
          },
          {
            label: "Crypto Wallet Development",
            href: "/service/crypto-wallet-development",
            desc: "Non-custodial, multi-chain and smart-account wallets.",
            icon: WalletCards,
          },
          {
            label: "Token Development",
            href: "/howto/how-to-launch-a-token",
            desc: "Token contracts, tokenomics, vesting and launch.",
            icon: Coins,
          },
          {
            label: "Crypto Exchange Development",
            href: "/service/crypto-exchange-development",
            desc: "CEX and DEX matching engines and infrastructure.",
            icon: Banknote,
          },
          {
            label: "Asset Tokenization",
            href: "/service/asset-tokenization-platform",
            desc: "Real estate, private equity and RWA tokenization.",
            icon: BadgeCheck,
          },
        ],
      },
      {
        heading: "Advisory & Security",
        links: [
          {
            label: "Blockchain Security Audits",
            href: "/process/smart-contract-audit-process",
            desc: "Audit process, risk review and launch readiness.",
            icon: LockKeyhole,
          },
          {
            label: "Blockchain Consulting",
            href: "/service/blockchain-consulting",
            desc: "Technical strategy for launches and enterprise adoption.",
            icon: BriefcaseBusiness,
          },
          {
            label: "Blockchain Solutions",
            href: "/solution",
            desc: "Solutions organized by business use case.",
            icon: Sparkles,
          },
          {
            label: "Technologies We Work With",
            href: "/technologies",
            desc: "Chains, frameworks and tooling in our stack.",
            icon: Cpu,
          },
          {
            label: "Hire Blockchain Developers",
            href: "/hire",
            desc: "Dedicated Solidity, Rust and Web3 engineers.",
            icon: UserSearch,
          },
        ],
      },
      {
        heading: "Platforms",
        compact: true,
        links: [
          {
            label: "Ethereum",
            href: "/technologies/ethereum-blockchain-development",
          },
          { label: "Solana", href: "/technologies/solana-development" },
          {
            label: "Polygon",
            href: "/technologies/polygon-blockchain-development",
          },
          { label: "BNB Chain", href: "/technologies/bnb-chain-development" },
          { label: "Arbitrum", href: "/technologies/arbitrum-development" },
          {
            label: "Avalanche",
            href: "/technologies/avalanche-blockchain-development",
          },
          { label: "Base", href: "/technologies/base-blockchain-development" },
          {
            label: "Hyperledger",
            href: "/technologies/hyperledger-development",
          },
        ],
      },
    ],
  },
  {
    id: "who-we-serve",
    label: "Who We Serve",
    summary:
      "Blockchain products shaped around the regulatory, operational and growth needs of your sector.",
    overview: { label: "Explore all industries", href: "/industries" },
    groups: [
      {
        heading: "By Business Type",
        links: [
          {
            label: "Startups & Entrepreneurs",
            href: "/service/blockchain-development-startups",
            desc: "From MVP to a Series A-ready protocol.",
            icon: Rocket,
          },
          {
            label: "Enterprise Businesses",
            href: "/service/enterprise-blockchain-solutions",
            desc: "Permissioned networks and consortium systems.",
            icon: Building2,
          },
          {
            label: "Financial Institutions",
            href: "/industries/blockchain-development-finance",
            desc: "Settlement, compliance and capital-markets rails.",
            icon: Landmark,
          },
          {
            label: "FinTech Companies",
            href: "/industries/blockchain-development-fintech",
            desc: "Payments, custody and financial infrastructure.",
            icon: Banknote,
          },
          {
            label: "DeFi & Web3 Startups",
            href: "/service/defi-development-company",
            desc: "AMMs, lending, yield and perpetuals protocols.",
            icon: Coins,
          },
          {
            label: "Small Businesses",
            href: "/industries/blockchain-for-small-business",
            desc: "Crypto payments, loyalty and invoice automation.",
            icon: Store,
          },
        ],
      },
      {
        heading: "By Industry",
        links: [
          {
            label: "Real Estate",
            href: "/industries/blockchain-development-real-estate",
            desc: "Tokenization, escrow and property records.",
            icon: Home,
          },
          {
            label: "Healthcare",
            href: "/industries/blockchain-development-healthcare",
            desc: "Records, consent and secure data exchange.",
            icon: HeartPulse,
          },
          {
            label: "Gaming",
            href: "/industries/blockchain-development-gaming",
            desc: "Game assets, rewards and player economies.",
            icon: Gamepad2,
          },
          {
            label: "Supply Chain",
            href: "/industries/blockchain-development-supply-chain",
            desc: "Traceability, provenance and multi-party workflows.",
            icon: Truck,
          },
          {
            label: "Insurance",
            href: "/industries/blockchain-development-insurance",
            desc: "Claims, parametric products and audit trails.",
            icon: ShieldCheck,
          },
          {
            label: "Retail & E-commerce",
            href: "/industries/blockchain-development-retail",
            desc: "Loyalty, payments and product authentication.",
            icon: ShoppingBag,
          },
        ],
      },
      {
        heading: "More Sectors",
        compact: true,
        links: [
          {
            label: "Energy & Utilities",
            href: "/industries/blockchain-development-energy",
          },
          {
            label: "Government",
            href: "/industries/blockchain-development-government",
          },
          {
            label: "Education",
            href: "/industries/blockchain-development-education",
          },
          {
            label: "Logistics",
            href: "/industries/blockchain-development-logistics",
          },
          {
            label: "Manufacturing",
            href: "/comparison/blockchain-development-manufacturing",
          },
          { label: "U.S. Locations", href: "/locations" },
        ],
      },
    ],
  },
  {
    id: "how-we-work",
    label: "How We Work",
    summary:
      "A staged delivery process with security review built in, so you see progress at every step.",
    overview: { label: "See our delivery process", href: "/#process" },
    groups: [
      {
        heading: "Plan",
        links: [
          {
            label: "Discovery & Consultation",
            href: "/service/blockchain-consulting",
            desc: "Goals, requirements, chain selection and scope.",
            icon: Compass,
          },
          {
            label: "Architecture & Planning",
            href: "/process/blockchain-architecture-design",
            desc: "System design, data flow and contract structure.",
            icon: Network,
          },
        ],
      },
      {
        heading: "Build & Verify",
        links: [
          {
            label: "Development & Engineering",
            href: "/service/blockchain-development-services",
            desc: "Contracts and application built in parallel.",
            icon: Code2,
          },
          {
            label: "Testing & Security Review",
            href: "/service/blockchain-qa-testing-strategy",
            desc: "Test strategy and staged security review.",
            icon: ClipboardCheck,
          },
        ],
      },
      {
        heading: "Process Deep Dives",
        links: [
          {
            label: "Smart Contract Audit Process",
            href: "/process/smart-contract-audit-process",
            desc: "How contracts are reviewed before launch.",
            icon: LockKeyhole,
          },
          {
            label: "All Technical Process Guides",
            href: "/process",
            desc: "Governance, bridges, oracles, key management and more.",
            icon: Workflow,
          },
        ],
      },
    ],
  },
  {
    id: "our-work",
    label: "Our Work",
    summary:
      "Example scenarios that show the kinds of blockchain products we design and how we approach them.",
    overview: { label: "Browse all case studies", href: "/case-studies" },
    note: "Projects and case studies shown here are illustrative examples, not verified client engagements.",
    groups: [
      {
        heading: "Showcase",
        links: [
          {
            label: "Portfolio",
            href: "/#work",
            desc: "Example lending, NFT, wallet and governance builds.",
            icon: Star,
            badge: ILLUSTRATIVE,
          },
          {
            label: "Case Studies",
            href: "/case-studies",
            desc: "Scenario write-ups across finance, supply chain and Web3.",
            icon: FileText,
            badge: ILLUSTRATIVE,
          },
          {
            label: "Example Engagements",
            href: "/#example-engagements",
            desc: "How we run typical blockchain projects.",
            icon: BadgeCheck,
            badge: ILLUSTRATIVE,
          },
        ],
      },
      {
        heading: "Scenarios by Category",
        links: [
          {
            label: "Blockchain: Cross-Border Settlement",
            href: "/case-studies/case-study-blockchain-settlement-financial-services",
            desc: "Enterprise payment settlement scenario.",
            icon: Hexagon,
            badge: ILLUSTRATIVE,
          },
          {
            label: "DeFi: Lending Protocol",
            href: "/case-studies/case-study-defi-lending-protocol",
            desc: "Protocol design and pre-launch security scenario.",
            icon: PiggyBank,
            badge: ILLUSTRATIVE,
          },
          {
            label: "NFT & Web3: Event Ticketing",
            href: "/case-studies/case-study-nft-ticketing-music-festival",
            desc: "NFT ticketing scenario for a music festival.",
            icon: Sparkles,
            badge: ILLUSTRATIVE,
          },
        ],
      },
    ],
  },
  {
    id: "why-clickmasters",
    label: "Why ClickMasters",
    summary:
      "Engineering-first delivery, security as a process and one accountable team from scope to launch.",
    overview: { label: "Why teams choose us", href: "/#why-choose-us" },
    groups: [
      {
        heading: "Our Difference",
        links: [
          {
            label: "Why Choose ClickMasters",
            href: "/#why-choose-us",
            desc: "Engineering culture, fixed-price scoping, one team.",
            icon: Star,
          },
          {
            label: "Our Expertise",
            href: "/#dominate",
            desc: "Capabilities across planning, contracts and Web3.",
            icon: BriefcaseBusiness,
          },
          {
            label: "Technology Advantage",
            href: "/#tech-stack",
            desc: "The chains, languages and tools we build with.",
            icon: Cpu,
          },
        ],
      },
      {
        heading: "Quality & Outcomes",
        links: [
          {
            label: "Security & Quality Standards",
            href: "/tools/smart-contract-security-checklist",
            desc: "Our 50-point pre-launch security checklist.",
            icon: ShieldCheck,
          },
          {
            label: "Client Benefits",
            href: "/#benefits",
            desc: "Faster production, built-in security, lower long-term cost.",
            icon: Zap,
          },
          {
            label: "Post-Launch Support",
            href: "/#process",
            desc: "Monitoring, updates and scaling after launch.",
            icon: LifeBuoy,
          },
        ],
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    summary:
      "Guides, comparisons, cost breakdowns and tools to help you plan a blockchain project with confidence.",
    overview: { label: "Open the resource hub", href: "/resources" },
    groups: [
      {
        heading: "Read",
        links: [
          {
            label: "Blog & Articles",
            href: "/listicles",
            desc: "Curated lists, rankings and expert picks.",
            icon: Newspaper,
          },
          {
            label: "Blockchain Guides",
            href: "/resources",
            desc: "Guides, checklists and planning playbooks.",
            icon: BookOpen,
          },
          {
            label: "Web3 Tutorials",
            href: "/howto",
            desc: "Step-by-step build and launch tutorials.",
            icon: GraduationCap,
          },
          {
            label: "Industry News",
            href: "/news",
            desc: "Enterprise blockchain, crypto and Web3 updates.",
            icon: Newspaper,
          },
        ],
      },
      {
        heading: "Plan & Compare",
        links: [
          {
            label: "Comparisons",
            href: "/comparison",
            desc: "Chains, platforms and approaches side by side.",
            icon: GitCompare,
          },
          {
            label: "Cost Guides",
            href: "/cost",
            desc: "What blockchain projects cost and why.",
            icon: Banknote,
          },
          {
            label: "Calculators",
            href: "/calculators",
            desc: "Gas, ROI, yield and tokenomics simulators.",
            icon: Calculator,
          },
          {
            label: "Tools & Checklists",
            href: "/tools",
            desc: "Launch checklists and audit-readiness tools.",
            icon: Wrench,
          },
        ],
      },
      {
        heading: "Reference",
        links: [
          {
            label: "Glossary",
            href: "/glossary",
            desc: "Blockchain and Web3 terms explained simply.",
            icon: Library,
          },
          {
            label: "FAQs",
            href: "/faqs",
            desc: "Answers on cost, security, timelines and more.",
            icon: MessageCircleQuestion,
          },
          {
            label: "Templates",
            href: "/templates",
            desc: "Specs, whitepapers and planning templates.",
            icon: ListChecks,
          },
          {
            label: "Project Failure Analysis",
            href: "/resources/blockchain-project-failure-analysis",
            desc: "The 8 root causes of blockchain project failure.",
            icon: FlaskConical,
          },
        ],
      },
    ],
  },
  {
    id: "who-we-are",
    label: "Who We Are",
    summary:
      "A blockchain and Web3 engineering team focused on secure, production-ready software.",
    overview: { label: "About ClickMasters", href: "/about" },
    groups: [
      {
        heading: "Company",
        links: [
          {
            label: "About ClickMasters",
            href: "/about",
            desc: "Who we are and how we approach blockchain work.",
            icon: Building2,
          },
          {
            label: "Partners",
            href: "/partners",
            desc: "Security, infrastructure and integration partners.",
            icon: Handshake,
          },
        ],
      },
      {
        heading: "Get in Touch",
        links: [
          {
            label: "Contact Us",
            href: "/contact",
            desc: "Tell us about your project and timeline.",
            icon: Mail,
          },
          {
            label: "Locations",
            href: "/locations",
            desc: "Cities and regions we work with across the U.S.",
            icon: MapPin,
          },
        ],
      },
    ],
  },
];

/**
 * Menu items from the navigation brief that have no page yet. They are kept
 * out of the live menu (no invented routes). Build the page, then move the
 * entry into primaryNav.
 */
export const PLANNED_NAV_PAGES = [
  { section: "How We Work", label: "Business Analysis" },
  { section: "How We Work", label: "UI/UX Design" },
  { section: "How We Work", label: "Deployment" },
  { section: "How We Work", label: "Maintenance & Support" },
  { section: "Our Work", label: "Crypto Wallet Projects" },
  { section: "Our Work", label: "Technical Demonstrations" },
  { section: "Why ClickMasters", label: "Development Philosophy" },
  { section: "Insights", label: "Research & Reports" },
  { section: "Who We Are", label: "Our Team" },
  { section: "Who We Are", label: "Mission & Vision" },
  { section: "Who We Are", label: "Careers" },
] as const;
