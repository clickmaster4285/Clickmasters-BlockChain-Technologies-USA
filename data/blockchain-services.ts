import {
  Hexagon,
  FileCode,
  Globe,
  Network,
  Wallet,
  Image as ImageIcon,
  Coins,
  Lightbulb,
  Building2,
  Layers,
  Plug,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type BlockchainService = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  technologies: string[];
  benefits: string[];
  accent: "primary" | "secondary" | "tertiary" | "success";
};

export const blockchainServices: BlockchainService[] = [
  {
    slug: "blockchain-consulting-services",
    title: "Blockchain Consulting Services",
    shortDescription: "Chain, architecture, token model, roadmap, and cost planning.",
    fullDescription:
      "Before we write a line of code, we help you choose the right chain, architecture, and token model for your goals. Our blockchain consulting services cover feasibility studies, technical roadmaps, and cost planning, so your project starts with a plan instead of guesswork.",
    icon: Lightbulb,
    technologies: ["Feasibility", "Roadmaps", "Token model", "Cost planning"],
    benefits: ["Strategy first", "Lower risk", "Clear scope"],
    accent: "primary",
  },
  {
    slug: "custom-blockchain-development",
    title: "Custom Blockchain Development",
    shortDescription: "Purpose-built protocols, private networks, and application logic.",
    fullDescription:
      "Not every idea fits an existing framework. Our custom blockchain development work includes purpose-built protocols, private networks, and application logic designed around your exact business rules rather than a generic template.",
    icon: Hexagon,
    technologies: ["Custom protocols", "Private networks", "Business logic"],
    benefits: ["Purpose-built", "Flexible rules", "Template-free"],
    accent: "secondary",
  },
  {
    slug: "blockchain-app-development",
    title: "Blockchain App Development",
    shortDescription: "End-to-end apps with interface, backend, and on-chain components.",
    fullDescription:
      "We design and build blockchain applications end-to-end — user-facing interface, backend logic, and on-chain components working together. Every blockchain app we ship is tested for real-world usage, not just a controlled demo environment.",
    icon: Globe,
    technologies: ["React", "Next.js", "Node.js", "Ethers.js"],
    benefits: ["End-to-end", "Real usage", "Full stack"],
    accent: "primary",
  },
  {
    slug: "smart-contract-development",
    title: "Smart Contract Development",
    shortDescription: "Gas-efficient contracts with security patterns and testing.",
    fullDescription:
      "Smart contracts are the core of most blockchain products, so we treat them accordingly: gas-efficient code, established security patterns, and thorough testing before deployment, with contracts written for Ethereum and other EVM-compatible networks.",
    icon: FileCode,
    technologies: ["Solidity", "Vyper", "Hardhat", "Foundry"],
    benefits: ["Gas-efficient", "Security patterns", "Thorough testing"],
    accent: "secondary",
  },
  {
    slug: "enterprise-blockchain-development",
    title: "Enterprise Blockchain Development",
    shortDescription: "Permissioned networks, data integrity, and integrations.",
    fullDescription:
      "For organizations that need blockchain technology inside an existing operational or compliance framework, our enterprise blockchain development services focus on permissioned networks, data integrity, and integration with the systems your teams already use.",
    icon: Building2,
    technologies: ["Permissioned networks", "Data integrity", "Integrations"],
    benefits: ["Enterprise-ready", "Compliance fit", "System-friendly"],
    accent: "tertiary",
  },
  {
    slug: "blockchain-platform-development",
    title: "Blockchain Platform Development",
    shortDescription: "Infrastructure, APIs, and admin tooling for full platforms.",
    fullDescription:
      "When a single application isn't enough, we build full blockchain platforms — the infrastructure, APIs, and admin tooling that let multiple products or business units operate on the same underlying network.",
    icon: Layers,
    technologies: ["Infrastructure", "APIs", "Admin tooling"],
    benefits: ["Multi-product", "Scalable", "Operational control"],
    accent: "success",
  },
  {
    slug: "dapp-development",
    title: "DApp Development",
    shortDescription: "Wallet connectivity, contract interaction, and live on-chain data.",
    fullDescription:
      "Our decentralized application development covers wallet connectivity, smart contract interaction, and real-time on-chain data, giving users an experience that feels as smooth as any traditional web or mobile app.",
    icon: Network,
    technologies: ["Wallets", "Smart contracts", "On-chain data"],
    benefits: ["Smooth UX", "Real-time data", "Web3 native"],
    accent: "primary",
  },
  {
    slug: "nft-marketplace-development",
    title: "NFT Marketplace Development",
    shortDescription: "Minting, listing, royalty logic, and NFT standards.",
    fullDescription:
      "We build custom NFT marketplaces with minting, listing, and royalty logic built in, supporting standards like ERC-721 and ERC-1155 for teams launching digital collectibles, gaming assets, or ticketing products.",
    icon: ImageIcon,
    technologies: ["ERC-721", "ERC-1155", "Minting", "Royalties"],
    benefits: ["Custom marketplace", "Royalty logic", "Standards-based"],
    accent: "tertiary",
  },
  {
    slug: "crypto-wallet-development",
    title: "Crypto Wallet Development",
    shortDescription: "Secure key handling, multi-chain support, and wallet integrations.",
    fullDescription:
      "From non-custodial mobile wallets to embedded wallet infrastructure, we build crypto wallets with secure key handling, multi-chain support, and integrations for hardware wallets where they're needed.",
    icon: Wallet,
    technologies: ["Non-custodial", "Embedded wallets", "Hardware wallets"],
    benefits: ["Secure keys", "Multi-chain", "Integration-ready"],
    accent: "success",
  },
  {
    slug: "token-development",
    title: "Token Development Services",
    shortDescription: "Supply models, vesting schedules, and token utility.",
    fullDescription:
      "We design and deploy tokens with tokenomics that hold up under real usage — supply models, vesting schedules, and utility mapped to how your product will actually be used, not just how it looks on a whitepaper.",
    icon: Coins,
    technologies: ["Tokenomics", "Vesting", "Utility mapping"],
    benefits: ["Real usage", "Supply models", "Whitepaper-ready"],
    accent: "tertiary",
  },
  {
    slug: "blockchain-integration-services",
    title: "Blockchain Integration Services",
    shortDescription: "Add blockchain to existing software, payment flows, and data systems.",
    fullDescription:
      "Many businesses don't need a new product — they need blockchain technology added to what they already run. Our blockchain integration services connect existing software, payment flows, or data systems to on-chain infrastructure with minimal disruption.",
    icon: Plug,
    technologies: ["Existing software", "Payments", "Data systems"],
    benefits: ["Minimal disruption", "On-chain links", "Business continuity"],
    accent: "primary",
  },
  {
    slug: "blockchain-security-audits",
    title: "Blockchain Security Audits",
    shortDescription: "Structured security review before launch.",
    fullDescription:
      "Every contract we deploy — and any codebase a client brings us — goes through a structured security review before launch, covering common vulnerability classes, gas optimization, and logic errors that automated tools tend to miss.",
    icon: ShieldCheck,
    technologies: ["Security review", "Gas optimization", "Logic checks"],
    benefits: ["Pre-launch review", "Manual coverage", "Safer deployment"],
    accent: "secondary",
  },
];
