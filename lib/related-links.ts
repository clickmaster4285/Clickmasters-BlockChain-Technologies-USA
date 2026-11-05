/**
 * Site-wide contextual internal linking.
 *
 * Builds one index of every indexable detail page (services, guides, tools,
 * locations, industries, ...) and picks related pages by topic overlap, so
 * every page gets 3–6 relevant "Related services" and "Related guides" links
 * instead of depending on a single paginated listing page.
 *
 * Selection is deterministic (topic score, then slug) — never random — so the
 * link graph is stable between builds and crawls.
 */
import { services } from "@/data/services";
import { caseStudies } from "@/data/case-studies";
import { costs } from "@/data/costs";
import industriesData from "@/data/industries";
import { technologies } from "@/data/technologies";
import { getAllCalculators, normalizeCalculatorSlug } from "@/lib/calculators";
import { getAllComparisonArticles } from "@/lib/comparison";
import { getAllFAQs } from "@/lib/faqs";
import { getAllGlossaryTerms } from "@/lib/glossary";
import { getAllHirePages } from "@/lib/hire";
import { getAllHowTos } from "@/lib/howto";
import { getAllListicles } from "@/lib/listicles";
import { getLocations } from "@/lib/location";
import { getAllNews } from "@/lib/news";
import { getPartners } from "@/lib/partner";
import { getProcesses } from "@/lib/process";
import { getAllResources } from "@/lib/resources";
import { getAllTemplates } from "@/lib/templates";
import { getAllTools } from "@/lib/tools";

export type ContentType =
  | "service"
  | "hire"
  | "industries"
  | "locations"
  | "partners"
  | "cost"
  | "howto"
  | "comparison"
  | "glossary"
  | "listicles"
  | "news"
  | "tools"
  | "templates"
  | "resources"
  | "calculators"
  | "faqs"
  | "process"
  | "case-studies"
  | "technologies";

export type LinkEntry = {
  type: ContentType;
  slug: string;
  href: string;
  title: string;
  label: string;
};

type IndexedEntry = LinkEntry & {
  topics: Set<string>;
  tokens: Set<string>;
};

/** Content types that describe something we sell (shown under "Related services"). */
const SERVICE_TYPES = new Set<ContentType>([
  "service",
  "hire",
  "industries",
  "locations",
  "partners",
  "cost",
]);

const TYPE_LABELS: Record<ContentType, string> = {
  service: "Service",
  hire: "Hire",
  industries: "Industry",
  locations: "Location",
  partners: "Partner",
  cost: "Cost guide",
  howto: "How-to",
  comparison: "Comparison",
  glossary: "Glossary",
  listicles: "List",
  news: "News",
  tools: "Tool",
  templates: "Template",
  resources: "Resource",
  calculators: "Calculator",
  faqs: "FAQ",
  process: "Process",
  "case-studies": "Case study",
  technologies: "Technology",
};

const ROUTE_PREFIX: Record<ContentType, string> = {
  service: "/service",
  hire: "/hire",
  industries: "/industries",
  locations: "/locations",
  partners: "/partners",
  cost: "/cost",
  howto: "/howto",
  comparison: "/comparison",
  glossary: "/glossary",
  listicles: "/listicles",
  news: "/news",
  tools: "/tools",
  templates: "/templates",
  resources: "/resources",
  calculators: "/calculators",
  faqs: "/faqs",
  process: "/process",
  "case-studies": "/case-studies",
  technologies: "/technologies",
};

/** The 12 core service pages (footer + parent hubs for every specialised page). */
export const CORE_SERVICES: Array<{
  slug: string;
  label: string;
  topics: string[];
}> = [
  {
    slug: "blockchain-development-services",
    label: "Blockchain Development",
    topics: ["blockchain-dev"],
  },
  {
    slug: "smart-contract-development",
    label: "Smart Contract Development",
    topics: ["smart-contract", "security"],
  },
  {
    slug: "defi-development-company",
    label: "DeFi Development",
    topics: ["defi", "tokenomics"],
  },
  {
    slug: "nft-development-company",
    label: "NFT Development",
    topics: ["nft"],
  },
  {
    slug: "crypto-wallet-development",
    label: "Crypto Wallet Development",
    topics: ["wallet"],
  },
  {
    slug: "crypto-exchange-development",
    label: "Crypto Exchange Development",
    topics: ["exchange", "compliance"],
  },
  {
    slug: "enterprise-blockchain-solutions",
    label: "Enterprise Blockchain",
    topics: ["enterprise", "industry"],
  },
  {
    slug: "asset-tokenization-platform",
    label: "Asset Tokenization",
    topics: ["tokenization", "real-estate"],
  },
  {
    slug: "web3-development-company",
    label: "Web3 Development",
    topics: ["web3", "layer2", "cross-chain"],
  },
  {
    slug: "gamefi-development-company",
    label: "GameFi Development",
    topics: ["gamefi"],
  },
  {
    slug: "blockchain-consulting",
    label: "Blockchain Consulting",
    topics: ["consulting"],
  },
  {
    slug: "crypto-payment-gateway-development",
    label: "Crypto Payment Gateway",
    topics: ["payments"],
  },
];

const CORE_SLUGS = new Set(CORE_SERVICES.map((core) => core.slug));
const GENERIC_CORE = "blockchain-development-services";

/**
 * Topic vocabulary. A page belongs to a topic when any of the phrases appears
 * in its title, slug, category or tags. Topic matches weigh far more than
 * plain word overlap.
 */
const TOPIC_PATTERNS: Record<string, RegExp> = {
  defi: /\b(defi|amm|liquidity|lending|yield|perpetual|staking|stablecoin|impermanent|flash loan|mev|vetoken|liquidation|uniswap|options protocol)\b/,
  nft: /\b(nfts?|erc-?721|erc-?1155|royalt(y|ies)|minting|generative art)\b/,
  wallet:
    /\b(wallets?|custod(y|ial)|seed phrase|passkeys?|account abstraction|ledger|trezor|cold storage)\b/,
  exchange:
    /\b((?<!(data|information|health) )exchanges?|cex|dex|matching engine|order book|market making|market microstructure|trading)\b/,
  "smart-contract":
    /\b(smart contracts?|solidity|vyper|upgrade(able)? patterns?|proxy|design patterns?|erc-?20)\b/,
  security:
    /\b(audits?|auditors?|security|exploits?|vulnerabilit(y|ies)|attack|incident response|bug bounty|due diligence|qa|testing)\b/,
  tokenization:
    /\b(tokeni[sz](ation|ed|e)|rwa|real[- ]world assets?|reit|private credit|commodit(y|ies)|tranche|treasur(y|ies)|esop|securit(y|ies) token|buidl)\b/,
  "real-estate": /\b(real estate|property|crowdfunding|title management)\b/,
  enterprise:
    /\b(enterprise|hyperledger|fabric|consortium|private (blockchain|ethereum)|permissioned|corda|besu)\b/,
  web3: /\b(web3|dapps?|full[- ]stack|subgraph|the graph|mobile app|web3 login)\b/,
  layer2:
    /\b(layer ?2|l2s?|layer ?3|rollups?|zksync|arbitrum|optimism|base|polygon|scroll|zk(evm)?|scaling)\b/,
  "cross-chain":
    /\b(cross[- ]chain|multi[- ]?chain|bridges?|interoperab(le|ility)|cosmos|polkadot|substrate|appchain)\b/,
  gamefi: /\b(gamefi|gaming|games?|play[- ]to[- ]earn|p2e|metaverse)\b/,
  dao: /\b(daos?|governance|voting)\b/,
  payments:
    /\b(payments?|payment gateway|merchant|checkout|crypto payments?|payroll)\b/,
  compliance:
    /\b(compliance|aml|kyc|regulat(ion|ory|ions)|sec|cftc|fincen|mica|tax|legislation|licensing|law)\b/,
  consulting:
    /\b(consult(ing|ant|ants)?|strategy|roadmap|business case|roi|use cases?|choose|hiring|vendor|feasibility)\b/,
  tokenomics:
    /\b(tokenomics|token launch|launch(pad)?|token burn|vesting|ico|ido|token economy|token sale)\b/,
  cost: /\b(costs?|pricing|price|budget|calculator)\b/,
  location:
    /\b(company in|new york|texas|california|florida|georgia|tennessee|carolina|colorado|alabama|louisiana|chicago|miami|austin|seattle|boston|san francisco|los angeles|dallas|houston|atlanta|denver)\b/,
  industry:
    /\b(healthcare|pharma(ceutical)?|medical|hospital|finance|financial|banks?|banking|insurance|supply chain|logistics|energy|carbon|agriculture|food|government|public sector|education|legal|retail|media|entertainment|sports|nonprofits?|manufacturing|hr|publishing|private equity|venture capital|startups?|small business)\b/,
  "blockchain-dev":
    /\b(blockchain development|development company|development services|what is blockchain|blockchain technology)\b/,
  hire: /\b(hire|hiring|developers?)\b/,
};

const STOPWORDS = new Set(
  "a an and are as at be by for from how in into is it its of on or the to vs what when where which who why with your our you we us complete guide 2024 2025 2026 best top using use step steps clickmasters page pages blockchain development company services service".split(
    " ",
  ),
);

const cleanTitle = (value: unknown) =>
  String(value ?? "")
    .replace(/^H1:\s*/i, "")
    .replace(/\s*\|\s*Clickmasters.*$/i, "")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** Short anchor text: the part before " — " / ":" when it is still descriptive. */
const shortLabel = (title: string) => {
  const head = title.split(/\s[—–-]\s|:\s/)[0]?.trim() ?? title;
  return head.length >= 12 ? head : title;
};

const textOf = (value: unknown): string => {
  if (!value) return "";
  if (Array.isArray(value)) return value.map(textOf).join(" ");
  if (typeof value === "object") return "";
  return String(value);
};

const tokenize = (text: string) =>
  new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2 && !STOPWORDS.has(word)),
  );

const topicsOf = (text: string) => {
  const lower = text.toLowerCase().replace(/[-_/]+/g, " ");
  const found = new Set<string>();
  for (const [topic, pattern] of Object.entries(TOPIC_PATTERNS)) {
    if (pattern.test(lower)) found.add(topic);
  }
  return found;
};

/** The fields we read from any collection item; collections differ in shape. */
type RawItem = {
  slug?: string;
  title?: unknown;
  name?: unknown;
  meta?: { title?: unknown };
  category?: unknown;
  tags?: unknown;
  industry?: unknown;
  service?: unknown;
};

const asItems = (value: unknown): RawItem[] =>
  Array.isArray(value) ? (value as RawItem[]) : [];

function collect(): IndexedEntry[] {
  const sources: Array<[ContentType, unknown]> = [
    ["service", services],
    ["hire", getAllHirePages()],
    ["industries", industriesData],
    ["locations", getLocations()],
    ["partners", getPartners()],
    ["cost", costs],
    ["howto", getAllHowTos()],
    ["comparison", getAllComparisonArticles()],
    ["glossary", getAllGlossaryTerms()],
    ["listicles", getAllListicles()],
    ["news", getAllNews()],
    ["tools", getAllTools()],
    ["templates", getAllTemplates()],
    ["resources", getAllResources()],
    ["calculators", getAllCalculators()],
    ["faqs", getAllFAQs()],
    ["process", getProcesses()],
    ["case-studies", caseStudies],
    ["technologies", technologies],
  ];

  const seen = new Set<string>();
  const entries: IndexedEntry[] = [];

  for (const [type, items] of sources) {
    for (const item of asItems(items)) {
      const rawSlug = item?.slug ? String(item.slug) : "";
      // Calculator routes use the normalised slug (see getCalculatorStaticParams).
      const slug =
        type === "calculators" ? normalizeCalculatorSlug(rawSlug) : rawSlug;
      if (!slug) continue;
      // The content library is a hub page, not a topical page.
      if (type === "service" && slug.startsWith("resources/")) continue;

      const href = `${ROUTE_PREFIX[type]}/${slug}`;
      if (seen.has(href)) continue;
      seen.add(href);

      const title = cleanTitle(
        item.title || item.meta?.title || item.name || slug.replace(/-/g, " "),
      );
      const topicText = [
        title,
        slug,
        textOf(item.category),
        textOf(item.tags),
        textOf(item.industry),
        textOf(item.service),
      ].join(" ");

      entries.push({
        type,
        slug,
        href,
        title,
        label: shortLabel(title),
        topics: topicsOf(topicText),
        tokens: tokenize(
          `${title} ${slug.replace(/-/g, " ")} ${textOf(item.category)}`,
        ),
      });
    }
  }

  return entries;
}

let cache:
  | {
      entries: IndexedEntry[];
      byHref: Map<string, IndexedEntry>;
      idf: Map<string, number>;
      topicIdf: Map<string, number>;
      parentOf: Map<string, string>;
      childrenOf: Map<string, IndexedEntry[]>;
    }
  | undefined;

function getIndex() {
  if (cache) return cache;

  const entries = collect();
  const byHref = new Map(entries.map((entry) => [entry.href, entry]));

  const df = new Map<string, number>();
  const topicDf = new Map<string, number>();
  for (const entry of entries) {
    entry.tokens.forEach((token) => df.set(token, (df.get(token) ?? 0) + 1));
    entry.topics.forEach((topic) =>
      topicDf.set(topic, (topicDf.get(topic) ?? 0) + 1),
    );
  }
  const total = entries.length || 1;
  const idf = new Map(
    [...df].map(([token, count]) => [token, Math.log(total / count)]),
  );
  const topicIdf = new Map(
    [...topicDf].map(([topic, count]) => [topic, 1 + Math.log(total / count)]),
  );

  cache = {
    entries,
    byHref,
    idf,
    topicIdf,
    parentOf: new Map(),
    childrenOf: new Map(),
  };

  // Assign every service-type page to its parent core service.
  const coreEntries = CORE_SERVICES.map((core) =>
    byHref.get(`/service/${core.slug}`),
  ).filter((entry): entry is IndexedEntry => Boolean(entry));

  for (const entry of entries) {
    if (!SERVICE_TYPES.has(entry.type) || entry.type === "cost") continue;
    if (entry.type === "service" && CORE_SLUGS.has(entry.slug)) continue;

    const parent = findParentCore(entry, coreEntries);
    cache.parentOf.set(entry.href, parent);
    const list = cache.childrenOf.get(parent) ?? [];
    list.push(entry);
    cache.childrenOf.set(parent, list);
  }

  for (const list of cache.childrenOf.values()) {
    list.sort((a, b) => a.label.localeCompare(b.label));
  }

  return cache;
}

function score(a: IndexedEntry, b: IndexedEntry) {
  const { idf, topicIdf } = getIndex();
  let value = 0;
  a.topics.forEach((topic) => {
    if (b.topics.has(topic)) value += 3 * (topicIdf.get(topic) ?? 1);
  });
  a.tokens.forEach((token) => {
    if (b.tokens.has(token)) value += idf.get(token) ?? 0;
  });
  return value;
}

function findParentCore(entry: IndexedEntry, coreEntries: IndexedEntry[]) {
  // City / state pages sit under the general development service.
  if (entry.type === "locations" || entry.topics.has("location"))
    return `/service/${GENERIC_CORE}`;

  let best = `/service/${GENERIC_CORE}`;
  let bestScore = 0;
  for (const core of CORE_SERVICES) {
    const coreEntry = coreEntries.find((item) => item.slug === core.slug);
    if (!coreEntry) continue;
    let value = core.topics.reduce(
      (sum, topic) => sum + (entry.topics.has(topic) ? 25 : 0),
      0,
    );
    value += score(entry, coreEntry);
    if (value > bestScore) {
      bestScore = value;
      best = coreEntry.href;
    }
  }
  return best;
}

const toLink = ({
  type,
  slug,
  href,
  title,
  label,
}: IndexedEntry): LinkEntry => ({
  type,
  slug,
  href,
  title,
  label,
});

export const getTypeLabel = (type: ContentType) => TYPE_LABELS[type];

export type RelatedLinkGroups = {
  services: LinkEntry[];
  guides: LinkEntry[];
  /** Specialised pages (industry, location, use-case) that belong to this core service. */
  children: LinkEntry[];
  /** Reciprocal links to closely related pages that few others link to. */
  extra: LinkEntry[];
  parent?: LinkEntry;
};

const SERVICE_LIMIT = 5;
const GUIDE_LIMIT = 6;
/** Every page should be picked by at least this many other pages' modules. */
const MIN_INBOUND = 3;
/** Max reciprocal "also on this topic" links added to any one page. */
const EXTRA_LIMIT = 3;

type ComputedLinks = {
  services: IndexedEntry[];
  guides: IndexedEntry[];
  children: IndexedEntry[];
  extra: IndexedEntry[];
  parent?: IndexedEntry;
  ranked: IndexedEntry[];
};

let linkCache: Map<string, ComputedLinks> | undefined;

function rankFor(current: IndexedEntry) {
  return getIndex()
    .entries.filter((entry) => entry.href !== current.href)
    .map((entry) => ({ entry, value: score(current, entry) }))
    .filter(({ value }) => value > 0)
    .sort(
      (a, b) => b.value - a.value || a.entry.href.localeCompare(b.entry.href),
    )
    .map(({ entry }) => entry);
}

/**
 * Builds the link modules for every page once, then runs a reciprocity pass:
 * pages that few modules picked are added (as "also on this topic") to the
 * modules of their closest topical neighbours, so no page is left with a
 * single linking page.
 */
function getAllLinks() {
  if (linkCache) return linkCache;
  const index = getIndex();
  linkCache = new Map();

  for (const entry of index.entries) {
    linkCache.set(entry.href, computeLinks(entry));
  }

  const inbound = new Map<string, number>();
  for (const links of linkCache.values()) {
    for (const target of [
      ...links.services,
      ...links.guides,
      ...links.children,
    ]) {
      inbound.set(target.href, (inbound.get(target.href) ?? 0) + 1);
    }
  }

  // Least-linked pages first, so they get first pick of neighbour slots.
  const needy = index.entries
    .filter((entry) => (inbound.get(entry.href) ?? 0) < MIN_INBOUND)
    .sort(
      (a, b) =>
        (inbound.get(a.href) ?? 0) - (inbound.get(b.href) ?? 0) ||
        a.href.localeCompare(b.href),
    );

  for (const entry of needy) {
    let count = inbound.get(entry.href) ?? 0;
    for (const neighbour of linkCache.get(entry.href)?.ranked ?? []) {
      if (count >= MIN_INBOUND) break;
      const links = linkCache.get(neighbour.href);
      if (!links || links.extra.length >= EXTRA_LIMIT) continue;
      const already = [
        ...links.services,
        ...links.guides,
        ...links.children,
        ...links.extra,
      ].some((item) => item.href === entry.href);
      if (already) continue;
      links.extra.push(entry);
      count += 1;
    }
    inbound.set(entry.href, count);
  }

  return linkCache;
}

/**
 * Topic-matched related links for a page.
 * Services: parent core service first, then the closest service-type pages.
 * Guides: closest how-tos, comparisons, tools, glossaries, etc. — mixed types.
 */
export function getRelatedLinks(
  type: ContentType,
  slug: string,
): RelatedLinkGroups {
  const links = getAllLinks().get(`${ROUTE_PREFIX[type]}/${slug}`);
  if (!links) return { services: [], guides: [], children: [], extra: [] };
  return {
    services: links.services.map(toLink),
    guides: links.guides.map(toLink),
    children: links.children.map(toLink),
    extra: links.extra.map(toLink),
    parent: links.parent ? toLink(links.parent) : undefined,
  };
}

function computeLinks(current: IndexedEntry): ComputedLinks {
  const index = getIndex();
  const { href, type, slug } = current;
  const ranked = rankFor(current);
  const serviceLimit = SERVICE_LIMIT;
  const guideLimit = GUIDE_LIMIT;

  // Parent: explicit for service-type pages, otherwise the best-matching core.
  let parentHref = index.parentOf.get(href);
  if (!parentHref && !(type === "service" && CORE_SLUGS.has(slug))) {
    const coreEntries = CORE_SERVICES.map((core) =>
      index.byHref.get(`/service/${core.slug}`),
    ).filter((entry): entry is IndexedEntry => Boolean(entry));
    parentHref = findParentCore(current, coreEntries);
  }
  const parent = parentHref ? index.byHref.get(parentHref) : undefined;

  const used = new Set<string>([href]);
  const servicesOut: IndexedEntry[] = [];
  if (parent) {
    servicesOut.push(parent);
    used.add(parent.href);
  }

  // Spread service suggestions across types (max 2 per type) so the module
  // does not collapse into one cluster of near-identical pages.
  const perType = new Map<ContentType, number>();
  for (const entry of ranked) {
    if (servicesOut.length >= serviceLimit) break;
    if (!SERVICE_TYPES.has(entry.type) || used.has(entry.href)) continue;
    const count = perType.get(entry.type) ?? 0;
    if (entry.type !== "service" && count >= 2) continue;
    perType.set(entry.type, count + 1);
    servicesOut.push(entry);
    used.add(entry.href);
  }
  // Top up with remaining core services when the topic match is thin.
  for (const core of CORE_SERVICES) {
    if (servicesOut.length >= Math.min(3, serviceLimit)) break;
    const entry = index.byHref.get(`/service/${core.slug}`);
    if (entry && !used.has(entry.href)) {
      servicesOut.push(entry);
      used.add(entry.href);
    }
  }

  const guidesOut: IndexedEntry[] = [];
  const guideTypes = new Map<ContentType, number>();
  for (const entry of ranked) {
    if (guidesOut.length >= guideLimit) break;
    if (SERVICE_TYPES.has(entry.type) || used.has(entry.href)) continue;
    const count = guideTypes.get(entry.type) ?? 0;
    if (count >= 2) continue;
    guideTypes.set(entry.type, count + 1);
    guidesOut.push(entry);
    used.add(entry.href);
  }
  // Relax the per-type cap if we still have room.
  for (const entry of ranked) {
    if (guidesOut.length >= Math.min(3, guideLimit)) break;
    if (SERVICE_TYPES.has(entry.type) || used.has(entry.href)) continue;
    guidesOut.push(entry);
    used.add(entry.href);
  }

  const children =
    type === "service" && CORE_SLUGS.has(slug)
      ? (index.childrenOf.get(href) ?? [])
      : [];

  return {
    services: servicesOut,
    guides: guidesOut,
    children,
    extra: [],
    parent,
    ranked,
  };
}

/** Services grouped under their core service — used for the /service category hub. */
export function getServiceHubGroups() {
  const index = getIndex();
  return CORE_SERVICES.map((core) => {
    const href = `/service/${core.slug}`;
    const entry = index.byHref.get(href);
    return {
      core: entry ? toLink(entry) : undefined,
      label: core.label,
      href,
      items: (index.childrenOf.get(href) ?? [])
        .filter((child) => child.type === "service")
        .map(toLink),
    };
  }).filter((group) => group.core);
}
