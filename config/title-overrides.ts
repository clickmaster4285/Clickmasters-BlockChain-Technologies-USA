/**
 * Explicit <title> values for pages whose automatic title would collide with
 * another page's, or would otherwise end mid-phrase.
 *
 * Titles are normally derived from each page's own title by `buildPageTitle`
 * in config/metadata.ts, which shortens long titles at natural breakpoints.
 * Some pages are near-duplicates of a page in another section (for example a
 * cost guide and a tool covering the same topic). Their titles differ only in
 * the part that has to be cut to stay within ~60 characters, so the automatic
 * titles come out identical. Each title below is written from that page's own
 * title / H1 and keeps the detail that tells the two pages apart.
 *
 * Values are used verbatim. Run `npm run check:titles` after a build to list
 * any new collisions.
 */
export const TITLE_OVERRIDES: Record<string, string> = {
  // Scope document template: calculator resource vs tool.
  "/calculators/blockchain-scope-document-template":
    "Scope Document Template — Define What You Are Building",
  "/tools/blockchain-scope-document-template":
    "Blockchain Project Scope Template — Define Before You Build",

  // Media & entertainment: comparison article vs service page.
  "/comparison/blockchain-media-entertainment":
    "Blockchain for Media — Rights Management and Royalties",
  "/service/blockchain-development-media":
    "Blockchain for Media — Royalties, NFTs, and IP Management",

  // Nonprofits: comparison article vs service page.
  "/comparison/blockchain-nonprofit-solutions":
    "Blockchain for Nonprofits — Donation Transparency",
  "/service/blockchain-nonprofit-donor-engagement":
    "Blockchain for Nonprofits — Donor Engagement | Clickmasters",

  // Blockchain vs database: comparison article vs service page.
  "/comparison/blockchain-vs-traditional-database":
    "Blockchain vs Database — When Each Is the Right Choice",
  "/service/blockchain-vs-traditional-database":
    "Blockchain vs Database — When Blockchain Is the Right Choice",

  // Ethereum vs Hyperledger: comparison article vs tool.
  "/comparison/ethereum-vs-hyperledger":
    "Ethereum vs Hyperledger Fabric — Enterprise Decision Guide",
  "/tools/ethereum-vs-hyperledger-fabric":
    "Ethereum vs Hyperledger Fabric — Complete Comparison",

  // Enterprise blockchain FAQ: FAQ hub vs news article.
  "/faqs/enterprise-blockchain-faq":
    "Enterprise Blockchain FAQ — What Enterprises Need to Know",
  "/news/enterprise-blockchain-faq-it-operations":
    "Enterprise Blockchain FAQ — 20 Questions for IT Teams",

  // Glossaries (the /glossary hub keeps "Blockchain Glossary").
  "/glossary/blockchain-glossary-essential":
    "Blockchain Glossary — 100 Essential Terms | Clickmasters",
  "/glossary/defi-protocol-terms-glossary":
    "DeFi Protocol Terms Glossary | Clickmasters",

  // Crypto exchange hiring: individual developer vs engineering team.
  "/hire/hire-crypto-exchange-engineering-team":
    "Hire a Crypto Exchange Engineering Team | Clickmasters",

  // GameFi hiring: hire page vs service page.
  "/hire/hire-gamefi-developer":
    "Hire GameFi Developer — Tokenomics, NFT Items, Game Servers",
  "/service/hire-gamefi-developer":
    "Hire GameFi Developer — On-Chain Game Economy Specialists",

  // Choosing a development company: how-to vs evaluation resource.
  "/resources/how-to-choose-blockchain-development-company":
    "Blockchain Development Company — 8-Point Evaluation Guide",

  // Small business: industry page vs service page.
  "/industries/blockchain-for-small-business":
    "Blockchain for Small Business — Payments, Loyalty, Invoicing",
  "/service/blockchain-for-small-business":
    "Blockchain for Small Business — Use Cases Under $25,000",

  // Too long to fit and has no natural breakpoint; the automatic word cut would
  // end on "…Private Equity and Venture".
  "/service/blockchain-private-equity-venture-capital":
    "Blockchain Development for Private Equity and VC Firms",

  // Enterprise governance: process guide vs service page.
  "/process/enterprise-blockchain-governance":
    "Enterprise Blockchain Governance — Multi-Party Networks",
  "/service/enterprise-blockchain-governance":
    "Enterprise Blockchain Governance — Consortiums That Last",

  // Over 60 characters as written, shortened by hand so the title keeps its
  // keyword and the detail that sets the page apart (a plain cut lost it).
  "/case-studies/case-study-clinical-trial-blockchain":
    "Clinical Trial Data Integrity on Blockchain — 21 CFR Part 11",
  "/case-studies/case-study-nft-ticketing-music-festival":
    "NFT Ticketing for a Music Festival — Eliminating Scalpers",
  "/case-studies/case-study-tokenized-real-estate-fund":
    "Tokenized Real Estate Fund — $2M Raised From 180 Investors",

  "/comparison/arbitrum-vs-optimism-vs-base":
    "Arbitrum vs Optimism vs Base — Layer 2 Comparison 2025",
  "/comparison/blockchain-government-solutions":
    "Blockchain for Government — Federal and Municipal Uses",
  "/comparison/cbdc-vs-stablecoin-vs-cryptocurrency":
    "CBDC vs Stablecoin vs Cryptocurrency — Business Comparison",
  "/comparison/centralized-exchange-vs-dex":
    "Centralized Exchange vs DEX — Which to Build for Business",
  "/comparison/crypto-exchange-cex-vs-dex":
    "CEX vs DEX — Centralized vs Decentralized Exchanges",
  "/comparison/crypto-exchange-white-label-vs-custom":
    "Crypto Exchange White Label vs Custom Build — Comparison",
  "/comparison/defi-vs-cefi":
    "DeFi vs CeFi — Decentralized vs Centralized Finance",
  "/comparison/hardhat-vs-foundry":
    "Hardhat vs Foundry — Solidity Framework Comparison",
  "/comparison/hire-tokenomics-designer":
    "Hire a Tokenomics Designer — Token Launch Economic Modeling",
  "/comparison/hyperledger-vs-corda":
    "Hyperledger Fabric vs Corda — Enterprise Comparison",
  "/comparison/ipfs-vs-arweave-vs-on-chain-nft":
    "IPFS vs Arweave vs On-Chain — NFT Metadata Storage",
  "/comparison/nft-vs-traditional-digital-asset":
    "NFT vs Traditional Digital Asset — What Ownership Means",
  "/comparison/proof-of-work-vs-proof-of-stake-business":
    "Proof of Work vs Proof of Stake — A Guide for Businesses",
  "/comparison/proof-of-work-vs-proof-of-stake-detailed":
    "Proof of Work vs Proof of Stake — Technical Comparison",
  "/comparison/public-vs-private-blockchain":
    "Public vs Private Blockchain — Which Suits Your Business?",
  "/comparison/upgradeable-vs-immutable-smart-contracts":
    "Upgradeable vs Immutable Smart Contracts — Which to Choose?",
  "/comparison/zksync-vs-polygon-zkevm-vs-scroll":
    "zkSync vs Polygon zkEVM vs Scroll — ZK Rollups in 2025",

  "/cost/smart-contract-development-cost":
    "Smart Contract Development Cost in 2025 — Pricing Breakdown",

  "/glossary/cryptography-fundamentals-glossary":
    "Cryptography and Security Glossary — 30 Core Terms",
  "/glossary/ecosystem-glossary":
    "Blockchain Ecosystem Glossary — 40 Protocol & Network Terms",
  "/glossary/regulatory-glossary":
    "Blockchain Regulatory Glossary — 30 Legal & Compliance Terms",

  "/howto/how-to-build-defi-protocol-step-by-step":
    "How to Build a DeFi Protocol — Step-by-Step Guide",
  "/howto/how-to-build-token-launchpad":
    "How to Build a Token Launchpad — IDO and Fair Launch Guide",
  "/howto/how-to-launch-token-checklist":
    "How to Launch a Token — Legal, Technical, Community Steps",

  "/listicles/questions-before-hiring-blockchain-firm":
    "10 Questions to Ask Before Hiring a Blockchain Firm",

  "/news/cftc-digital-asset-rules-2025":
    "CFTC Digital Asset Rules 2025 — What Changed | Clickmasters",
  "/news/solana-mobile-chapter2-2025":
    "Solana Mobile Chapter 2 and Mobile-First Web3 | Clickmasters",

  "/resources/blockchain-news-ethereum-sequencer-decentralization-2025":
    "Ethereum's Road to a Decentralized Sequencer — 2025 Update",
  "/resources/smart-contract-audit-preparation":
    "Smart Contract Audit Preparation — Maximize Audit Value",

  "/service/blockchain-development-energy":
    "Energy Blockchain — RECs, Carbon Credits, Grid Management",
  "/service/blockchain-development-retail":
    "Blockchain for Retail — Loyalty, Authentication, Payments",
  "/service/blockchain-regenerative-agriculture":
    "Blockchain for Organic and Regenerative Agriculture",
  "/service/complete-blockchain-services-overview":
    "Blockchain Consulting and Development Services Overview",
  "/service/defi-development-company":
    "DeFi Development — AMM, Lending, Yield & Perpetuals",
  "/service/hardware-wallet-dapp-integration":
    "Hardware Wallet Integration for dApps — Ledger and Trezor",

  "/templates/blockchain-news-institutional-defi-protocols-2025":
    "Institutional DeFi Launches 2025 — Aave Pro, Compound v4",
  "/templates/blockchain-news-polkadot-2025":
    "Polkadot Parachains 2025 — DOT Staking and Cross-Chain",
  "/templates/blockchain-news-solana-ecosystem-2025":
    "Solana in 2025 — DEX Volume Surpasses Ethereum",
  "/templates/smart-contract-specification-template":
    "Smart Contract Specification Template — Define Before Coding",
  "/templates/web3-pitch-deck-template":
    "Web3 Pitch Deck Template — 12 Slides for Fundraising",

  "/tools/enterprise-blockchain-business-case":
    "Enterprise Blockchain Business Case Template — CFO-Ready",
  "/tools/erc20-token-template":
    "ERC-20 Token Contract Template — Production-Ready Code",
  "/tools/smart-contract-development-cost":
    "Smart Contract Development Cost — 2025 Pricing Guide",
};
