import rawTechnologies from "./technology";

type RawTechnology = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  author?: string;
  readTime?: string;
  hero?: {
    badge?: string;
    title?: string;
    description?: string;
  };
  credibility?: string[];
  content?: Array<{
    type?: string;
    text?: string;
    items?: string[];
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
};

type TechnologyCard = {
  href: string;
  title: string;
};

type TechnologyDetail = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  highlights: Array<{
    label: string;
    value: string;
  }>;
  overview: string[];
  capabilities: string[];
  whyWeUseIt: Array<{
    title: string;
    description: string;
  }>;
  useCases: Array<{
    title: string;
    description: string;
  }>;
  strengths: string[];
  considerations: string[];
  process: Array<{
    title: string;
    description: string;
  }>;
  security: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedTechnologies: TechnologyCard[];
  relatedServices: TechnologyCard[];
};

const shortNames: Record<string, string> = {
  "what-is-blockchain": "BC",
  "ethereum-blockchain-development": "ETH",
  "hyperledger-development": "HLF",
  "solana-development": "SOL",
  "polygon-blockchain-development": "POL",
  "arbitrum-development": "ARB",
  "base-blockchain-development": "BASE",
  "bnb-chain-development": "BNB",
  "avalanche-blockchain-development": "AVAX",
  "cosmos-blockchain-development": "ATOM",
  "immutable-x-development": "IMX",
  "polkadot-development": "DOT",
};

const displayNames: Record<string, string> = {
  "what-is-blockchain": "Blockchain",
  "ethereum-blockchain-development": "Ethereum",
  "hyperledger-development": "Hyperledger Fabric",
  "solana-development": "Solana",
  "polygon-blockchain-development": "Polygon",
  "arbitrum-development": "Arbitrum",
  "base-blockchain-development": "Base",
  "bnb-chain-development": "BNB Chain",
  "avalanche-blockchain-development": "Avalanche",
  "cosmos-blockchain-development": "Cosmos SDK",
  "immutable-x-development": "Immutable X",
  "polkadot-development": "Polkadot",
};

const relatedServices: TechnologyCard[] = [
  {
    title: "Blockchain Development",
    href: "/service/blockchain-development",
  },
  {
    title: "Smart Contract Development",
    href: "/service/smart-contract-development",
  },
  {
    title: "dApp Development",
    href: "/service/dapp-development",
  },
  {
    title: "Web3 Development",
    href: "/service/web3-development",
  },
];

function getName(entry: RawTechnology) {
  if (displayNames[entry.slug]) {
    return displayNames[entry.slug];
  }

  return entry.title
    .split("—")[0]
    .replace(/\bDevelopment\b.*$/i, "")
    .replace(/^What Is\s+/i, "")
    .replace(/\?.*$/, "")
    .trim();
}

function getShortName(entry: RawTechnology) {
  if (shortNames[entry.slug]) {
    return shortNames[entry.slug];
  }

  return getName(entry)
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 4)
    .toUpperCase();
}

function getTextBlocks(entry: RawTechnology) {
  return (entry.content ?? [])
    .filter((block) => block.text)
    .map((block) => block.text ?? "");
}

function getListItems(entry: RawTechnology) {
  return (entry.content ?? []).flatMap(
    (block) => block.items ?? [],
  );
}

function getHeadings(entry: RawTechnology) {
  return (entry.content ?? [])
    .filter((block) => block.type === "heading" && block.text)
    .map((block) => block.text ?? "");
}

function sentenceFrom(text: string) {
  return (
    text
      .split(/(?<=[.!?])\s+/)
      .find((sentence) => sentence.length > 24) ?? text
  );
}

function makeOverview(entry: RawTechnology) {
  const textBlocks = getTextBlocks(entry);
  const overview = [
    entry.hero?.description,
    ...textBlocks,
  ].filter(Boolean) as string[];

  return overview.slice(0, 3);
}

function makeCapabilities(entry: RawTechnology) {
  const listItems = getListItems(entry);
  const credibility = entry.credibility ?? [];

  return [
    ...listItems,
    ...credibility.map((item) => `${item} implementation`),
  ].slice(0, 6);
}

function makeWhyWeUseIt(entry: RawTechnology) {
  const name = getName(entry);
  const credibility = entry.credibility ?? [];

  if (credibility.length > 0) {
    return credibility.slice(0, 4).map((item) => ({
      title: item,
      description: `${name} is evaluated against this requirement before architecture, implementation, security testing, and production deployment.`,
    }));
  }

  return [
    {
      title: "Production fit",
      description:
        "We use this technology when its ecosystem, security model, and operational profile match the product requirements.",
    },
  ];
}

function makeUseCases(entry: RawTechnology) {
  const listItems = getListItems(entry);
  const headings = getHeadings(entry).filter(
    (heading) => !heading.endsWith(":"),
  );

  const source = listItems.length > 0 ? listItems : headings;

  return source.slice(0, 6).map((item) => ({
    title: item.split(":")[0].replace(/[.。]$/, ""),
    description: item.includes(":")
      ? item.split(":").slice(1).join(":").trim()
      : `A practical ${getName(entry)} implementation area for secure, scalable blockchain products.`,
  }));
}

function makeHighlights(entry: RawTechnology) {
  return [
    {
      label: "Category",
      value: entry.category ?? "Technology",
    },
    {
      label: "Read time",
      value: entry.readTime ?? "Guide",
    },
    {
      label: "Focus",
      value: entry.credibility?.[0] ?? "Production systems",
    },
    {
      label: "Delivery",
      value: "Architecture to launch",
    },
  ];
}

function makeRelatedTechnologies(
  entry: RawTechnology,
  allEntries: RawTechnology[],
) {
  return allEntries
    .filter((item) => item.slug !== entry.slug)
    .slice(0, 4)
    .map((item) => ({
      title: getName(item),
      href: `/technologies/${item.slug}`,
    }));
}

export const technologies: TechnologyDetail[] = (
  rawTechnologies as RawTechnology[]
).map((entry, index, allEntries) => {
  const name = getName(entry);
  const overview = makeOverview(entry);
  const capabilities = makeCapabilities(entry);
  const useCases = makeUseCases(entry);
  const strengths = [
    ...(entry.credibility ?? []),
    ...capabilities,
  ].slice(0, 6);

  return {
    slug: entry.slug,
    name,
    shortName: getShortName(entry),
    category: entry.category ?? "Technology",
    eyebrow: entry.hero?.badge ?? "Technology",
    title: entry.hero?.title ?? entry.title,
    summary: entry.excerpt ?? sentenceFrom(overview[0] ?? entry.title),
    description:
      entry.hero?.description ??
      entry.excerpt ??
      sentenceFrom(overview[0] ?? entry.title),
    highlights: makeHighlights(entry),
    overview:
      overview.length > 0
        ? overview
        : [entry.excerpt ?? entry.title],
    capabilities:
      capabilities.length > 0
        ? capabilities
        : [
            `${name} architecture design`,
            `${name} application development`,
            `${name} production deployment`,
          ],
    whyWeUseIt: makeWhyWeUseIt(entry),
    useCases:
      useCases.length > 0
        ? useCases
        : [
            {
              title: `${name} applications`,
              description:
                "Secure application design, development, integration, and production launch.",
            },
          ],
    strengths:
      strengths.length > 0
        ? strengths
        : [
            "Production-ready architecture",
            "Security-first implementation",
            "Long-term maintainability",
          ],
    considerations: [
      "Security model, audit scope, and operational monitoring must be planned before launch.",
      "Infrastructure, wallet, indexer, and API dependencies should be tested under realistic production load.",
      "Upgrade paths, governance, and maintenance ownership need clear documentation.",
    ],
    process: [
      {
        title: "Discovery and fit",
        description:
          "We validate requirements, user flows, transaction volume, security constraints, and integration needs.",
      },
      {
        title: "Architecture",
        description:
          "We define contracts, backend services, infrastructure, data flows, testing strategy, and deployment environments.",
      },
      {
        title: "Implementation",
        description:
          "Our engineers build, integrate, test, and document the production system.",
      },
      {
        title: "Launch and support",
        description:
          "We deploy, monitor, optimize, and support the system after production release.",
      },
    ],
    security: [
      {
        title: "Threat modeling",
        description:
          "Architecture is reviewed for asset custody, access control, external dependencies, and abuse cases.",
      },
      {
        title: "Testing",
        description:
          "Implementation includes unit, integration, edge-case, and regression testing before release.",
      },
      {
        title: "Audit readiness",
        description:
          "Smart contracts and critical infrastructure are prepared for independent security review where required.",
      },
      {
        title: "Monitoring",
        description:
          "Production systems include observability, alerts, incident response planning, and maintenance workflows.",
      },
    ],
    faqs: entry.faqs ?? [],
    relatedTechnologies: makeRelatedTechnologies(
      entry,
      allEntries,
    ),
    relatedServices: relatedServices.slice(
      index % 2,
      index % 2 + 3,
    ),
  };
});

export default technologies;
