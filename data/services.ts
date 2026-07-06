export type Service = {
  slug: string;
  title: string;
  short: string;
  description?: string;
  image?: string;
  icon: string;
  hero: { eyebrow: string; title: string; blurb: string };
  sections: { heading: string; content: string; bullets: string[] }[];
  timeline: { phase: string; duration: string; description: string }[];
  caseStudy?: { title: string; blurb: string; image?: string };
  testimonials?: { quote: string; by: string }[];
  faq: { question: string; answer: string }[];
  sidebar: { title: string; items: string[] }[];
};

export const services: Service[] = [
  {
    slug: "blockchain-development",
    title: "Blockchain Development",
    short: "Platforms, custom protocols and chain integrations.",
    image: "/media/wallet-mock.jpeg",
    icon: "Blocks",
    hero: {
      eyebrow: "Engineering",
      title: "Blockchain platforms and custom protocols",
      blurb: "Design and build L1/L2 integrations, custom chains and bridge logic with production-grade tooling.",
    },
    sections: [
      { heading: "Architecture & Design", content: "Consensus design, validators, indexing and infra planning for reliable throughput.", bullets: ["Consensus mechanism selection & design", "Validator node topology & incentive modeling", "Custom indexing layer with sub-second finality"] },
      { heading: "Integration", content: "RPC, oracles, relayers, and bridge design for safe cross-chain flows.", bullets: ["Multi-chain RPC failover & load balancing", "Oracle integration (Chainlink, Pyth, custom)", "Bridge architecture with fraud-proof design"] },
      { heading: "Monitoring & Ops", content: "On-chain observability, alerting and runbooks for production stability.", bullets: ["Real-time on-chain event monitoring", "Automated alerting with PagerDuty/Slack", "Incident runbooks & disaster recovery plans"] },
    ],
    timeline: [
      { phase: "Discovery", duration: "1 week", description: "Stakeholder interviews, chain selection, success metrics." },
      { phase: "Architecture", duration: "2 weeks", description: "Protocol design, validator topology, integration mapping." },
      { phase: "Implementation", duration: "6-10 weeks", description: "Core chain logic, integrations, indexing pipeline." },
      { phase: "Testing", duration: "2-3 weeks", description: "Load testing, chaos engineering, cross-chain validation." },
      { phase: "Launch", duration: "1 week", description: "Genesis deployment, monitoring setup, handoff." },
    ],
    caseStudy: { title: "Marketplace at Scale", blurb: "Built a high-throughput marketplace with lazy-minting and royalties, reducing gas costs by 40%.", image: "https://source.unsplash.com/1200x630/?marketplace,blockchain" },
    testimonials: [
      { quote: "ClickMasters delivered a custom L2 solution that cut our transaction costs by 60% while maintaining security.", by: "CTO, ChainForge Protocol" },
      { quote: "Their deep understanding of consensus mechanisms helped us avoid critical design pitfalls early.", by: "Lead Engineer, NovaChain" },
    ],
    faq: [
      { question: "Which chains do you support?", answer: "We work with EVM chains (Ethereum, Polygon, Arbitrum, Optimism, Base), Solana, Cosmos SDK chains, and custom Substrate-based L1s." },
      { question: "How do you handle cross-chain security?", answer: "We use battle-tested bridge patterns with fraud proofs, optimistic verification, and multi-sig guardian sets. Every bridge design undergoes independent threat modeling." },
      { question: "What's the typical timeline for a custom chain?", answer: "A custom L2 takes 3-5 months. An L1 with novel consensus takes 6-12 months. We'll give you a precise estimate after the discovery phase." },
    ],
    sidebar: [
      { title: "Supported Chains", items: ["Ethereum & L2s", "Solana", "Cosmos SDK", "Substrate / Polkadot", "Avalanche Subnets"] },
      { title: "Monitoring & SLOs", items: ["99.9% uptime target", "Sub-second finality tracking", "Automated incident response", "Custom Grafana dashboards"] },
    ],
  },
  {
    slug: "smart-contract-development",
    title: "Smart Contract Development",
    short: "Secure smart contract implementation.",
    icon: "ShieldCheck",
    hero: {
      eyebrow: "Security",
      title: "Secure smart contract implementation",
      blurb: "Audited patterns, upgradeable proxies, and gas-optimized Solidity & Vyper code.",
    },
    sections: [
      { heading: "Formal Verification", content: "Property-based testing and formal tools to reduce exploitable surface.", bullets: ["Invariant testing with Echidna & Medusa", "Mathematical proof of critical properties", "Automated vulnerability scanning pipeline"] },
      { heading: "Audits & Reviews", content: "Third-party audit-ready delivery and actionable remediation plans.", bullets: ["Internal review before external audit", "Full audit trail & response documentation", "Post-audit remediation with re-verification"] },
      { heading: "Gas Optimization", content: "Tactics to reduce per-tx costs and improve UX for users.", bullets: ["Storage layout optimization & packing", "Batch operations & calldata compression", "Gas benchmarking with CI regression tests"] },
    ],
    timeline: [
      { phase: "Discovery", duration: "3-5 days", description: "Requirements, contract scope, threat model kickoff." },
      { phase: "Design", duration: "1-2 weeks", description: "Architecture, upgrade patterns, interface specification." },
      { phase: "Implementation", duration: "3-6 weeks", description: "Contract development with continuous testing." },
      { phase: "Audit", duration: "2-3 weeks", description: "Internal review, external audit, remediation." },
      { phase: "Deploy", duration: "3-5 days", description: "Mainnet deployment, verification, monitoring setup." },
    ],
    testimonials: [
      { quote: "Zero critical findings in our Trail of Bits audit. ClickMasters sets the bar for contract quality.", by: "Security Lead, DeFi Protocol" },
      { quote: "Their gas optimizations saved our users over $2M in the first year alone.", by: "Founder, NFT Platform" },
    ],
    faq: [
      { question: "Which languages do you use?", answer: "Primarily Solidity and Vyper for EVM chains, Anchor for Solana, and CosmWasm for Cosmos. We pick the right tool for your chain." },
      { question: "Do you handle proxy/upgrade patterns?", answer: "Yes — we implement UUPS, Transparent Proxy, and custom upgrade patterns with proper access control and timelock governance." },
      { question: "What if an audit finds issues?", answer: "We remediate all findings and re-submit for verification at no extra cost. Our contracts typically pass with zero critical or high findings on the first external audit." },
    ],
    sidebar: [
      { title: "Security Artifacts", items: ["Threat model document", "Audit report & responses", "Remediation verification", "Continuous monitoring setup"] },
      { title: "Standards", items: ["ERC-20 / ERC-721 / ERC-1155", "ERC-4626 (Tokenized Vaults)", "EIP-2535 (Diamonds)", "Custom module designs"] },
    ],
  },
  {
    slug: "dapp-development",
    title: "DApp Development",
    short: "DApp architecture and frontend integration.",
    icon: "LayoutGrid",
    hero: {
      eyebrow: "Product",
      title: "DApp architecture and frontend integration",
      blurb: "Wallet-first UX, batching, meta-transactions and performant frontends.",
    },
    sections: [
      { heading: "Wallet UX", content: "Seamless onboarding, account abstraction, and gasless flows.", bullets: ["Embedded wallet creation (Web3Auth, Dynamic)", "Account abstraction with paymaster integration", "Session keys & gasless meta-transactions"] },
      { heading: "Indexing & APIs", content: "Graph-based or custom indexers with performant query layers.", bullets: ["The Graph subgraph design & deployment", "Custom indexer with real-time WebSocket feeds", "API layer with caching & rate limiting"] },
      { heading: "Quality & CI", content: "End-to-end tests, staging environments and release pipelines.", bullets: ["Contract integration tests (Hardhat/Foundry)", "E2E browser testing with Synpress", "Staged rollout with feature flags"] },
    ],
    timeline: [
      { phase: "Discovery", duration: "1 week", description: "User flows, chain selection, tech stack decisions." },
      { phase: "Design", duration: "2-3 weeks", description: "UX wireframes, component architecture, API design." },
      { phase: "Build", duration: "6-10 weeks", description: "Frontend, indexer, and contract integration." },
      { phase: "QA", duration: "2 weeks", description: "E2E testing, performance audit, security review." },
      { phase: "Launch", duration: "1 week", description: "Production deploy, CDN setup, monitoring." },
    ],
    testimonials: [
      { quote: "Our DApp went from concept to 10K daily users in 3 months. The UX is unmatched.", by: "CEO, DeFi Startup" },
    ],
    faq: [
      { question: "Which frontend frameworks do you use?", answer: "Primarily Next.js with wagmi/viem or RainbowKit for wallet connection. We also build with React Native for mobile-first DApps." },
      { question: "Do you support account abstraction?", answer: "Yes — we implement ERC-4337 compliant smart accounts with paymasters, session keys, and batched user operations." },
      { question: "How do you handle on-chain data?", answer: "We use The Graph for indexed data, direct RPC calls for real-time state, and custom WebSocket services for live updates." },
    ],
    sidebar: [
      { title: "Tech Stack", items: ["Next.js / React", "wagmi + viem", "The Graph", "RainbowKit / Dynamic"] },
      { title: "Performance", items: ["Sub-2s initial load", "Optimistic UI updates", "Edge-cached API routes", "Bundle size < 200KB gzipped"] },
    ],
  },
  {
    slug: "web3-development",
    title: "Web3 Development",
    short: "Web3 product development and integrations.",
    icon: "Globe",
    hero: {
      eyebrow: "Product",
      title: "Web3 product development and integrations",
      blurb: "From token strategy to integrations with wallets, marketplaces and analytics.",
    },
    sections: [
      { heading: "Token Strategy", content: "Design tokenomics, vesting and distribution flows.", bullets: ["Token supply & allocation modeling", "Vesting schedules with cliff & linear release", "Distribution mechanics (airdrop, liquidity mining)"] },
      { heading: "Integrations", content: "Analytics, off-chain services and identity systems.", bullets: ["Dune Analytics & Nansen dashboards", "Off-chain compute with Chainlink Functions", "Identity verification (Polygon ID, World ID)"] },
      { heading: "Compliance", content: "Best-effort guidance for regulatory considerations and KYC flows.", bullets: ["Jurisdiction-specific regulatory review", "KYC/AML integration (Sumsub, Onfido)", "Legal structuring advisory referrals"] },
    ],
    timeline: [
      { phase: "Discovery", duration: "1-2 weeks", description: "Product-market fit, token model, integration audit." },
      { phase: "Design", duration: "2-3 weeks", description: "Tokenomics simulation, architecture, compliance review." },
      { phase: "Build", duration: "8-12 weeks", description: "Full product build with integrations." },
      { phase: "QA", duration: "2-3 weeks", description: "Integration testing, compliance audit, load testing." },
      { phase: "Launch", duration: "1-2 weeks", description: "Phased rollout, liquidity provisioning, monitoring." },
    ],
    testimonials: [
      { quote: "They built our entire Web3 stack — token, vesting, staking, and analytics dashboard — in under 4 months.", by: "Founder, GameFi Platform" },
    ],
    faq: [
      { question: "Do you help with tokenomics design?", answer: "Yes — we model token supply, inflation, utility, and governance mechanisms. We also simulate economic attacks and stress-test the model." },
      { question: "Can you integrate with existing Web2 systems?", answer: "Absolutely. We bridge Web2 and Web3 with APIs, webhook services, and identity layering so your existing users can onboard seamlessly." },
      { question: "What about regulatory compliance?", answer: "We provide best-effort guidance and partner with legal firms for jurisdiction-specific advice. We integrate KYC/AML providers as needed." },
    ],
    sidebar: [
      { title: "Integrations", items: ["WalletConnect & SDKs", "Chainlink & Oracles", "The Graph & Custom Indexers", "Analytics (Dune, Nansen)"] },
      { title: "Compliance", items: ["KYC/AML providers", "Regulatory review", "Legal partner referrals", "Audit-ready documentation"] },
    ],
  },
  {
    slug: "crypto-wallet-development",
    title: "Crypto Wallet Development",
    short: "Wallet apps with secure asset handling.",
    icon: "Wallet",
    hero: {
      eyebrow: "Security",
      title: "Wallet apps with secure asset handling",
      blurb: "Custodial and non-custodial wallets, key management and secure signing UX.",
    },
    sections: [
      { heading: "Key Management", content: "Secure key storage, hardware integrations and recovery flows.", bullets: ["MPC-based key sharding (Fireblocks, TSS)", "Hardware security module (HSM) integration", "Social recovery & seedless onboarding"] },
      { heading: "Signing UX", content: "Composable approvals and safe multi-sig experiences.", bullets: ["Human-readable transaction previews", "Multi-sig with configurable thresholds", "Spending limits & time-locked approvals"] },
      { heading: "Cross-Platform", content: "Mobile and extension strategies for broad user reach.", bullets: ["React Native for iOS & Android", "Browser extension (Chrome, Firefox, Safari)", "WalletConnect v2 session management"] },
    ],
    timeline: [
      { phase: "Discovery", duration: "1 week", description: "Platform targets, security requirements, chain support." },
      { phase: "Design", duration: "2-3 weeks", description: "Key architecture, signing flows, recovery mechanisms." },
      { phase: "Build", duration: "8-12 weeks", description: "Core wallet engine, UI, and cross-platform clients." },
      { phase: "Security Audit", duration: "3-4 weeks", description: "Penetration testing, key management audit, code review." },
      { phase: "Launch", duration: "1-2 weeks", description: "App Store submission, phased rollout, monitoring." },
    ],
    testimonials: [
      { quote: "The MPC wallet they built handles $50M+ in assets with zero security incidents in 18 months.", by: "CFO, Digital Asset Fund" },
    ],
    faq: [
      { question: "Do you build both custodial and non-custodial wallets?", answer: "Yes. We implement MPC-based custodial solutions and fully non-custodial wallets with self-custody key management." },
      { question: "Which chains do you support?", answer: "We support 20+ chains including Ethereum, Solana, Bitcoin, Cosmos ecosystem, and major L2s. Chain-agnostic architecture allows rapid additions." },
      { question: "How do you handle key recovery?", answer: "We implement social recovery, MPC-based recovery, and optional hardware backup. Users never need to manage seed phrases unless they opt in." },
    ],
    sidebar: [
      { title: "Security Features", items: ["MPC key sharding", "Biometric authentication", "Transaction simulation", "Address book & allowlists"] },
      { title: "Supported Platforms", items: ["iOS & Android", "Chrome extension", "Firefox & Safari", "Desktop (Electron)"] },
    ],
  },
  {
    slug: "nft-marketplace-development",
    title: "NFT Marketplace Development",
    short: "NFT marketplace platforms and tooling.",
    icon: "Image",
    hero: {
      eyebrow: "Collectibles",
      title: "NFT marketplace platforms and tooling",
      blurb: "Royalties, lazy-minting, and performant discovery for creators and collectors.",
    },
    sections: [
      { heading: "Marketplace Logic", content: "Listings, bidding, reserve pricing and execution guarantees.", bullets: ["Sealed-bid & Dutch auction support", "Reserve price enforcement with settlement", "Royalty distribution (EIP-2981 & custom)"] },
      { heading: "Creator Tools", content: "Drops, minting pipelines and off-chain asset handling.", bullets: ["Allowlist & merkle-tree minting", "Lazy minting with deferred metadata", "Off-chain asset storage (IPFS/Arweave)"] },
      { heading: "Scalability", content: "Batching, relayers and L2 strategies to lower fees.", bullets: ["Gasless transactions via relayers", "L2 deployment (Polygon, Arbitrum)", "Batch minting & transfer operations"] },
    ],
    timeline: [
      { phase: "Discovery", duration: "1 week", description: "Marketplace model, chain selection, creator requirements." },
      { phase: "Design", duration: "2-3 weeks", description: "Auction mechanics, royalty flows, UI/UX design." },
      { phase: "Build", duration: "6-10 weeks", description: "Contracts, marketplace UI, creator dashboard." },
      { phase: "Testing", duration: "2 weeks", description: "Auction simulation, edge case testing, load testing." },
      { phase: "Launch", duration: "1 week", description: "Deployment, creator onboarding, marketplace go-live." },
    ],
    caseStudy: { title: "Generative Art Platform", blurb: "Launched a generative art marketplace with lazy minting and royalties, processing 50K+ mints in the first month." },
    testimonials: [
      { quote: "The marketplace handled our 10K-piece generative collection mint without a single failed transaction.", by: "Founder, ArtBlocks Fork" },
    ],
    faq: [
      { question: "Do you support multiple auction types?", answer: "Yes — English (ascending), Dutch (descending), sealed-bid, and reserve price auctions. We can also implement custom auction mechanics." },
      { question: "How do you handle royalties?", answer: "We implement EIP-2981 for on-chain royalty enforcement and marketplace-level royalty distribution. Creator fees are configurable per collection." },
      { question: "Can you build on multiple chains?", answer: "Yes. We deploy on Ethereum, Polygon, Arbitrum, Base, and Solana. Cross-chain bridging for NFTs is also available." },
    ],
    sidebar: [
      { title: "Auction Types", items: ["English (ascending)", "Dutch (descending)", "Sealed-bid", "Reserve price"] },
      { title: "Minting Options", items: ["Lazy minting", "Allowlist / allowlist", "Public mint", "Batch minting"] },
    ],
  },
  {
    slug: "token-development",
    title: "Token Development",
    short: "Token standards and launch support.",
    icon: "Coins",
    hero: {
      eyebrow: "Economics",
      title: "Token standards and launch support",
      blurb: "ERC patterns, custom modules and secure launch pipelines with vesting.",
    },
    sections: [
      { heading: "Standards", content: "ERC-20/721/1155 and custom token modules.", bullets: ["ERC-20 with permit & vote delegation", "ERC-721A for gas-efficient batch minting", "ERC-1155 for multi-token contracts"] },
      { heading: "Launch", content: "Fair-launch mechanics, vesting, and liquidity planning.", bullets: ["Merkle-distributed airdrop claims", "Linear & cliff vesting with governance", "DEX liquidity bootstrapping (LBP, LBP)"] },
      { heading: "Governance", content: "On-chain voting, timelocks and proposer/builder models.", bullets: ["Governor Bravo / OpenZeppelin Governor", "Timelock controller with execution delays", "Delegation & voting power analytics"] },
    ],
    timeline: [
      { phase: "Discovery", duration: "1 week", description: "Token model, distribution strategy, governance needs." },
      { phase: "Design", duration: "2 weeks", description: "Tokenomics simulation, standard selection, vesting design." },
      { phase: "Build", duration: "3-5 weeks", description: "Token contracts, vesting, airdrop, governance." },
      { phase: "Audit", duration: "2-3 weeks", description: "Contract audit, economic attack simulation." },
      { phase: "Launch", duration: "1-2 weeks", description: "Fair launch, liquidity provisioning, governance activation." },
    ],
    testimonials: [
      { quote: "Our token launch was flawless — fair distribution, zero bot issues, and immediate liquidity.", by: "Founder, DeFi Protocol" },
    ],
    faq: [
      { question: "Which token standard should I use?", answer: "It depends on your use case. ERC-20 for fungible tokens, ERC-721 for unique NFTs, ERC-1155 for mixed. We'll recommend the best fit during discovery." },
      { question: "How do you ensure a fair launch?", answer: "We implement anti-bot measures (merkle proofs, commit-reveal), fair allocation mechanisms, and transparent on-chain distribution tracking." },
      { question: "Do you set up governance?", answer: "Yes — we deploy Governor contracts with timelocks, delegation systems, and voting interfaces. We can also integrate with Snapshot for off-chain signaling." },
    ],
    sidebar: [
      { title: "Token Standards", items: ["ERC-20 (Fungible)", "ERC-721 (NFT)", "ERC-1155 (Multi)", "ERC-4626 (Vault)"] },
      { title: "Launch Tools", items: ["Merkle airdrop", "Merkle airdrop", "DEX liquidity", "Governance setup"] },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug) as Service | undefined;
}

export function getAllServiceSlugs() {
  return services.map((s) => s.slug);
}
