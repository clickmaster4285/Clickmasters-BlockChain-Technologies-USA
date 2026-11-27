# 08 — Structured Data Recommendations

Add all blocks as JSON-LD in the page `<head>` (or before `</body>`). Validate with Google's Rich Results Test and the Schema.org validator before release.

**Not included on purpose:** `aggregateRating`, `review`, `offers`/`price`, `foundingDate`, `address`, `telephone`, `sameAs`, `award`, `memberOf`. None of these could be verified for ClickMasters. Add them only with evidence **[CONFIRM]**.

## 1. Organization

Ideally this lives once, site-wide (e.g. on the homepage), and is referenced by `@id`. If the site already outputs Organization schema, reuse its `@id` instead.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://clickmastersblockchaintechnologies.com/#organization",
  "name": "ClickMasters",
  "url": "https://clickmastersblockchaintechnologies.com/",
  "email": "sales@clickmastersblockchaintechnologies.com",
  "logo": "https://clickmastersblockchaintechnologies.com/[CONFIRM-logo-path].png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "sales@clickmastersblockchaintechnologies.com",
    "url": "https://clickmastersblockchaintechnologies.com/contact"
  }
}
```

## 2. Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://clickmastersblockchaintechnologies.com/process/blockchain-oracle-integration#service",
  "name": "Blockchain Oracle Integration Services",
  "serviceType": "Blockchain oracle integration",
  "description": "Design and development of blockchain oracle integrations that connect smart contracts to price feeds, external APIs and real-world data, including custom oracle development, validation, fallback handling, testing and monitoring.",
  "url": "https://clickmastersblockchaintechnologies.com/process/blockchain-oracle-integration",
  "provider": { "@id": "https://clickmastersblockchaintechnologies.com/#organization" },
  "areaServed": { "@type": "Country", "name": "United States" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Oracle integration services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Price feed and market data integration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Smart contract oracle integration and review" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "External API integration with smart contracts" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom blockchain oracle development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Verifiable randomness (VRF) integration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cross-chain oracle integration" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Oracle security testing and monitoring" } }
    ]
  }
}
```

Notes:
- `areaServed`: the homepage says the company is "built for U.S. business needs". If it serves clients worldwide, remove `areaServed` or change it **[CONFIRM]**.
- Remove any `itemListElement` the team doesn't confirm (custom oracle, cross-chain, monitoring), so it matches the published copy.
- Offers are listed without prices, which is valid.

## 3. BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://clickmastersblockchaintechnologies.com/" },
    { "@type": "ListItem", "position": 2, "name": "Development Process", "item": "https://clickmastersblockchaintechnologies.com/process" },
    { "@type": "ListItem", "position": 3, "name": "Blockchain Oracle Integration", "item": "https://clickmastersblockchaintechnologies.com/process/blockchain-oracle-integration" }
  ]
}
```

## 4. FAQPage: optional

**Guideline status:** since August 2023, Google shows FAQ rich results only for well-known, authoritative government and health sites. A blockchain agency page will almost certainly **not** get the FAQ rich result. The markup is still valid, it describes visible content, and other search and AI systems may read it. It's low-risk if it matches the visible FAQ exactly.

**Recommendation:** optional. Include it only if every question and answer below is visible on the page word-for-word. If FAQ answers are edited, update the schema to match. If the team prefers less maintenance, leave it out. There's no SEO penalty for omitting it.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is blockchain oracle integration?",
      "acceptedAnswer": { "@type": "Answer", "text": "It's the work of connecting smart contracts to an oracle, the service that brings off-chain data such as prices, events or API results on-chain. It includes choosing the data source and oracle, writing the contract code that reads the data, validating every value, and monitoring the system after launch." }
    },
    {
      "@type": "Question",
      "name": "Why do smart contracts need blockchain oracles?",
      "acceptedAnswer": { "@type": "Answer", "text": "Blockchains require every node to compute the same result. Contracts therefore can't call outside APIs themselves, because nodes would get different answers. Oracles fetch the data off-chain and deliver one agreed or verifiable value that every node can use." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between push and pull oracles?",
      "acceptedAnswer": { "@type": "Answer", "text": "Push oracles write updates on-chain on a schedule or when the value moves past a threshold, so the data is always there to read. Pull oracles keep signed updates off-chain, and your transaction brings the latest one on-chain when needed. Pull can be fresher and covers more feeds; push is simpler to consume." }
    },
    {
      "@type": "Question",
      "name": "Can external APIs connect directly to smart contracts?",
      "acceptedAnswer": { "@type": "Answer", "text": "Not directly. A contract can't make an HTTP call. The API is called off-chain by an oracle node or workflow, and the result is delivered on-chain, ideally after validation or agreement across several nodes or sources." }
    },
    {
      "@type": "Question",
      "name": "What happens if an oracle provides incorrect data?",
      "acceptedAnswer": { "@type": "Answer", "text": "That depends on what your contract was built to do. A well-designed integration rejects values that are stale, out of range or inconsistent with a second source, then pauses risky actions or switches to a fallback. Without those checks, the contract will act on the bad data." }
    },
    {
      "@type": "Question",
      "name": "How much does blockchain oracle integration cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Cost depends on the integration type, the number of feeds and chains, whether custom data sources or oracle infrastructure are needed, the level of security testing, and ongoing provider and gas costs. We give a fixed-price quote after a discovery session." }
    }
  ]
}
```

Extend `mainEntity` with the remaining FAQ items from 05 if all 14 are kept. Copy the answer text exactly from the published page, as plain text without links.

## 5. Optional: WebPage with reviewer

If a named engineer reviews the page **[CONFIRM]**:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://clickmastersblockchaintechnologies.com/process/blockchain-oracle-integration#webpage",
  "url": "https://clickmastersblockchaintechnologies.com/process/blockchain-oracle-integration",
  "name": "Blockchain Oracle Integration Services | ClickMasters",
  "isPartOf": { "@id": "https://clickmastersblockchaintechnologies.com/#website" },
  "about": { "@id": "https://clickmastersblockchaintechnologies.com/process/blockchain-oracle-integration#service" },
  "dateModified": "[PUBLISH-DATE]",
  "reviewedBy": { "@type": "Person", "name": "[CONFIRM engineer name]", "jobTitle": "[CONFIRM]" }
}
```

Don't use `Article` schema with the old "June 23, 2025" date. The page is being fully rewritten.
