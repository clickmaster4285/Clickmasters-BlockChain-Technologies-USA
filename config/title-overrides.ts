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
};
