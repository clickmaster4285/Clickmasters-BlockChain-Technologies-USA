# 08 — Structured Data Recommendations

## 1. Existing schema on the target URL

Inspected in the raw HTML on 26 Nov 2026.

| Type | Present | Issues |
|---|---|---|
| Organization | ✅ | Name only, plus logo, description and sales email. Missing `url` consistency, `sameAs` and `@id`. Brand capitalisation differs between schema and page. |
| WebSite | ✅ | Fine. Add an `@id` so other nodes can reference it. |
| BreadcrumbList | ✅ (Home › Services › Smart Contract Development) | Fine. Keep it. |
| Service | ✅ | `serviceType` is the generic "Services". `areaServed` is "United States". **[VERIFY]** whether the company serves only the US. |
| FAQPage | ✅ (2 questions) | Must match the visible FAQ exactly once the new FAQ ships. |
| Review / AggregateRating | ❌ | Correct. **Do not add** self-serving review markup. |

## 2. Eligibility notes (Google guidelines)

- **FAQPage:** Since August 2023, Google shows FAQ rich results only for well-known, authoritative government and health sites. A commercial service page will almost certainly **not** get the rich result. The markup is still valid and harmless if it matches the visible content exactly. Keep it only if the team wants it for other consumers such as AI and answer engines. Never mark up questions that are not visible on the page.
- **Service:** There is no Google rich result for it, but it helps entity understanding.
- **Review/AggregateRating:** Self-serving reviews of your own organisation or service are not eligible. Several competitors (Antier) violate this. Do not copy them.
- **Article:** Not appropriate for a service page. Use it only on how-to and comparison pages, and include a real author.

## 3. Recommended JSON-LD (single `@graph`, replaces the current blocks to avoid duplicates)

Placeholders in `«»` must be filled or removed.

- Do not add an address, telephone number, `foundingDate`, ratings or certifications unless they are verified.
- The site has a "Founded 2014" claim on a template page. It is unverified, so it is **not** included.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://clickmastersblockchaintechnologies.com/#organization",
      "name": "ClickMasters",
      "url": "https://clickmastersblockchaintechnologies.com",
      "logo": "https://clickmastersblockchaintechnologies.com/«logo-path»",
      "sameAs": ["«verified LinkedIn URL»", "«verified GitHub URL»"]
    },
    {
      "@type": "WebSite",
      "@id": "https://clickmastersblockchaintechnologies.com/#website",
      "url": "https://clickmastersblockchaintechnologies.com",
      "name": "ClickMasters",
      "publisher": { "@id": "https://clickmastersblockchaintechnologies.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development#webpage",
      "url": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development",
      "name": "Smart Contract Development Services | ClickMasters",
      "description": "Smart contract development services for Ethereum, EVM chains and Solana: Solidity and Rust engineering, fuzz and invariant testing, audit-ready delivery.",
      "isPartOf": { "@id": "https://clickmastersblockchaintechnologies.com/#website" },
      "breadcrumb": { "@id": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development#breadcrumb" },
      "mainEntity": { "@id": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development#service" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://clickmastersblockchaintechnologies.com" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://clickmastersblockchaintechnologies.com/service" },
        { "@type": "ListItem", "position": 3, "name": "Smart Contract Development", "item": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development" }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development#service",
      "name": "Smart Contract Development Services",
      "serviceType": "Smart contract development",
      "provider": { "@id": "https://clickmastersblockchaintechnologies.com/#organization" },
      "url": "https://clickmastersblockchaintechnologies.com/service/smart-contract-development",
      "description": "Design, development, testing, audit preparation, deployment and maintenance of smart contracts on Ethereum, EVM-compatible networks, Solana and Hyperledger Fabric.",
      "areaServed": "«Worldwide or verified countries»",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Smart contract development services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom smart contract development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Token smart contract development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DeFi smart contract development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NFT smart contract development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DAO governance contracts" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise smart contract solutions" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Smart contract review, upgrades and takeover" } }
        ]
      }
    }
  ]
}
```

**Optional FAQPage.** Only add it if every question and answer below is visible on the page, word for word. Do not include the IP-ownership question until it is verified. Example with two entries; extend it to match the final visible FAQ:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is smart contract development?",
      "acceptedAnswer": { "@type": "Answer", "text": "Smart contract development is the work of designing, writing, testing and deploying programs that run on a blockchain and enforce rules automatically. Examples include transferring tokens, releasing escrowed funds or executing a governance vote. Because deployed contracts are public and often cannot be changed, the work includes architecture, security testing and deployment planning as well as coding." }
    },
    {
      "@type": "Question",
      "name": "Can smart contracts be upgraded after deployment?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, if they are designed to be. Proxy patterns such as UUPS or Transparent proxies separate a contract's address and storage from its logic, so the logic can be replaced. Upgradeability adds trust assumptions and its own risks, so we put upgrade rights behind a multisig and timelock. Some contracts are deliberately left immutable." }
    }
  ]
}
```

## 4. Implementation checks

- Output **one** Organization node site-wide, referenced by `@id`. Do not emit a separate Organization block on every page as well.
- Validate the markup with the Schema.org validator and Google's Rich Results Test after deployment.
- Once real authored content exists, add a `Person` node (technical author or reviewer) to how-to and comparison articles rather than to this service page.
