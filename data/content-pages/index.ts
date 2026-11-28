// Structured page data for the "What We Do → Blockchain Engineering" pages.
// Generated from /content by `node scripts/content-pages/build.mjs`. Do not edit
// the JSON files by hand; edit the source markdown and rebuild.
import blockchainDevelopmentServices from "./blockchain-development-services.json";
import cosmosSdkAppchainDevelopment from "./cosmos-sdk-appchain-development.json";
import web3MobileAppDevelopment from "./web3-mobile-app-development.json";
import smartContractDevelopment from "./smart-contract-development.json";
import enterpriseBlockchainSolutions from "./enterprise-blockchain-solutions.json";
import blockchainOracleIntegration from "./blockchain-oracle-integration.json";

export type Inline =
  | { t: "text"; v: string }
  | { t: "code"; v: string }
  | { t: "a"; href: string; c: Inline[] }
  | { t: "b" | "i"; c: Inline[] };

export type ListItem = { c: Inline[]; children?: ListBlock };
export type ListBlock = { t: "ul" | "ol"; items: ListItem[] };

export type Block =
  | { t: "h"; level: number; c: Inline[]; id: string }
  | { t: "p"; c: Inline[] }
  | ListBlock
  | { t: "table"; head: Inline[][]; rows: Inline[][][] }
  | { t: "code"; lang: string; v: string }
  | { t: "quote"; blocks: Block[] }
  | { t: "cta"; links: { label: string; href: string }[]; rest: Inline[] }
  | { t: "img"; src: string; alt: string; w: number; h: number };

export type ContentSection = {
  id: string;
  title: Inline[];
  blocks: Block[];
  kind?: "faq" | "cta" | "related";
};

export type ContentPageData = {
  key: string;
  path: string;
  breadcrumb: { name: string; path: string }[];
  kicker: string;
  navLabel: string;
  meta: { title: string; description: string };
  title: Inline[];
  titleText: string;
  hero: { blocks: Block[]; image: Extract<Block, { t: "img" }> };
  ogImage?: { src: string; w: number; h: number };
  sections: ContentSection[];
  faq: { q: string; a: Block[]; text: string }[];
};

const pages = [
  blockchainDevelopmentServices,
  cosmosSdkAppchainDevelopment,
  web3MobileAppDevelopment,
  smartContractDevelopment,
  enterpriseBlockchainSolutions,
  blockchainOracleIntegration,
] as unknown as ContentPageData[];

const byPath = new Map(pages.map((p) => [p.path, p]));

/** Returns the content-driven page for a site path, e.g. "/service/smart-contract-development". */
export function getContentPage(path: string): ContentPageData | undefined {
  return byPath.get(path);
}
