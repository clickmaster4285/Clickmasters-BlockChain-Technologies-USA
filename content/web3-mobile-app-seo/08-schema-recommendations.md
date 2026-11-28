# 08 — Structured Data Recommendations

## 1. Current schema on the target page (checked from raw HTML on 26 Nov 2026)

| Type | Present | Current state | Issue |
|---|---|---|---|
| Organization | ✅ | `@id` `/#organization`, name "ClickMasters", logo `/media/logo.webp`, email | No `url`, `sameAs`, `address` or `telephone`. That's acceptable; only add these if they're real |
| WebSite | ✅ | `@id` `/#website`, publisher → Organization | Fine |
| BreadcrumbList | ✅ | Home › Services › Web3 Mobile App Development | Fine |
| Service | ✅ | name and description both copy the H1; provider → Organization; areaServed = United States | Thin description; no `serviceType`; no link to the page entity |
| FAQPage | ✅ | 1 question | Must be replaced to match the 12 visible FAQs |
| AggregateRating / Review | ❌ | None on any page checked | **Keep it that way.** There are no verifiable reviews, and self-serving review markup on a service page is not eligible for review rich results |

**Rule:** update the existing blocks in place, don't add new ones. Organization, WebSite and BreadcrumbList are site-wide; leave them as they are and reference them by `@id`. Make sure the page outputs exactly **one** Service block and **one** FAQPage block.

## 2. Eligibility notes (Google, current guidance)

- **FAQPage:** since August 2023 Google shows FAQ rich results only for a limited set of well-known, authoritative government and health sites. A commercial service page **won't get FAQ rich results**. The markup is still valid if it matches the visible Q&A exactly, and it gives other search and answer engines clean question-answer pairs. Recommendation: **keep it, update it to the 12 visible FAQs, and don't expect a rich result.**
- **Service:** Google has no Service rich result. It's still useful entity markup. Keep it accurate and in line with the visible content.
- **BreadcrumbList:** eligible for breadcrumb display. Keep it.
- **Article:** don't use it on this page. It's a service landing page, not an article. Also change `og:type` from "article" to "website".
- **HowTo:** don't use it. Google no longer shows HowTo rich results, and the process section isn't a how-to.
- **Review / AggregateRating:** don't add them. There are no genuine third-party reviews, and self-serving reviews aren't eligible on LocalBusiness/Organization pages anyway.

## 3. Recommended JSON-LD for this page

This replaces only the page-level Service + WebPage + FAQPage. The site-wide Organization, WebSite and BreadcrumbList blocks stay as they are and are referenced by `@id`.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development#webpage",
      "url": "https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development",
      "name": "Web3 Mobile App Development for iOS & Android | ClickMasters",
      "description": "Web3 mobile app development for iOS and Android: wallet connection, embedded wallets, smart contract integration and secure signing. Book a free call.",
      "isPartOf": { "@id": "https://clickmastersblockchaintechnologies.com/#website" },
      "about": { "@id": "https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development#service" },
      "inLanguage": "en-US",
      "dateModified": "2026-11-26"
    },
    {
      "@type": "Service",
      "@id": "https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development#service",
      "name": "Web3 Mobile App Development",
      "alternateName": ["Blockchain Mobile App Development", "Mobile dApp Development"],
      "serviceType": "Web3 mobile application development",
      "description": "Design and development of iOS and Android applications with Web3 functionality, including WalletConnect and embedded wallet integration, smart contract integration, multi-chain support, secure key management, backend indexing and push notifications, and App Store and Google Play readiness.",
      "url": "https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development",
      "provider": { "@id": "https://clickmastersblockchaintechnologies.com/#organization" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "Web3 startups, DeFi and NFT platforms, gaming, fintech and enterprise teams"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web3 Mobile App Development Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Web3 Mobile Application Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web3 Integration for Existing Mobile Apps" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile dApp Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Wallet Integration (WalletConnect and Embedded Wallets)" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "DeFi Mobile App Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "NFT Mobile App Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Crypto Payments in Mobile Apps" } }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Web3 mobile app development?",
          "acceptedAnswer": { "@type": "Answer", "text": "It is building iOS and Android apps that use a blockchain for some core functions, usually user identity through a wallet, ownership of tokens or NFTs, payments, or rules enforced by smart contracts. Development covers the mobile client, wallet integration, smart contract interaction, a supporting backend and indexing, and App Store and Google Play compliance." }
        },
        {
          "@type": "Question",
          "name": "Can Web3 apps run on both iOS and Android?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Cross-platform frameworks such as React Native and Flutter ship one codebase to both platforms, and native Swift and Kotlin apps are built separately for each. Most wallet tools, including WalletConnect, support both platforms. A notable exception is Solana's Mobile Wallet Adapter, which works only on Android, so Solana apps on iOS usually use embedded wallets instead." }
        }
      ]
    }
  ]
}
```

**Implementation notes**
- Add **all 12** FAQ questions from `05-new-web3-mobile-app-content.md` to `mainEntity`, using the visible answer text word for word. Two are shown above for brevity.
- `areaServed` copies the current value ("United States"). Change it only if ClickMasters confirms it serves other regions.
- `dateModified` should update whenever the page content changes.
- Leave out `offers.price` / `priceSpecification`. The cost ranges are indicative, and marking them up as prices could mislead.
- Validate with the Schema.org validator and Google's Rich Results Test after deployment.

## 4. Organization block: optional additions (only if verified)

These are **not** in the current schema. Add them only when the facts are real and visible on the site:

```json
{
  "@type": "Organization",
  "@id": "https://clickmastersblockchaintechnologies.com/#organization",
  "url": "https://clickmastersblockchaintechnologies.com/",
  "sameAs": ["[VERIFY: LinkedIn URL]", "[VERIFY: Clutch profile URL]", "[VERIFY: GitHub org URL]"],
  "foundingDate": "[VERIFY: '2014' appears on some pages but not /about — confirm before adding]",
  "address": "[VERIFY: only if a real business address is published on /contact]",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "sales@clickmastersblockchaintechnologies.com"
  }
}
```

Never add `aggregateRating`, `review`, `award` or `numberOfEmployees` unless they come from verifiable sources.
