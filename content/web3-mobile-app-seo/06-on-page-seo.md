# 06 — On-Page SEO

## 1. Core elements

| Element | Recommendation | Notes |
|---|---|---|
| **URL** | `https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development` | Unchanged. The slug already matches the primary keyword. |
| **Canonical** | Self-referencing: `<link rel="canonical" href="https://clickmastersblockchaintechnologies.com/service/web3-mobile-app-development">` | Already in place. Keep it absolute and without a trailing slash, matching the sitemap entry. |
| **SEO title** | `Web3 Mobile App Development for iOS & Android \| ClickMasters` | 60 characters. Primary keyword first; platform modifiers capture "iOS" and "Android" variants. Current title: "Web3 Mobile App Development \| Clickmasters". Use the brand capitalization "ClickMasters" from the Organization schema consistently. |
| **Alternative title (A/B)** | `Web3 Mobile App Development Company \| iOS & Android dApps` | 57 characters. Use it if Search Console shows "company" queries dominate impressions. |
| **Meta description** | `Web3 mobile app development for iOS and Android: wallet connection, embedded wallets, smart contract integration and secure signing. Book a free call.` | 150 characters. The current meta just repeats the H1 and has no CTA. |
| **H1** | `Web3 Mobile App Development Services for iOS and Android` | Exactly one H1. Remove the current duplicate `<p>` that repeats the H1 under it. |
| **Primary keyword** | web3 mobile app development | |
| **Open Graph** | `og:type` = `website` (currently "article"); `og:title` = SEO title; `og:description` = meta; `og:image` = a dedicated 1200×630 image (see §4) instead of the generic `/media/hero.webp` | |
| **Robots** | index, follow | Unchanged |

## 2. Secondary keyword mapping

| Keyword | Where it appears in 05 |
|---|---|
| web3 mobile app development services | H1; H2 "Web3 Mobile App Development Services" |
| web3 mobile app development company | H2 "Why Choose ClickMasters for Web3 Mobile App Development" (body); title variant |
| blockchain mobile app development | Recommended addition to the intro paragraph (see §3); Service schema `alternateName` |
| custom web3 mobile applications | H3 "Custom Web3 Mobile Application Development" |
| mobile dApp development | H3 "Mobile dApp Development" |
| crypto mobile app development | Services body ("Mobile Crypto Wallet Development" H3) |
| web3 iOS / Android app development | H1 modifiers; H3 "Native iOS (Swift, SwiftUI) and Android (Kotlin, Jetpack Compose)"; FAQ "Can Web3 apps run on both iOS and Android?" |
| cross-platform web3 app development | H2 "Native vs Cross-Platform Web3 App Development" |
| web3 wallet integration | H2 "Wallet Integration…" |
| smart contract integration | H2 "Smart Contract and Blockchain Network Integration" |
| multi-chain | H3 "Multi-Chain Mobile Applications" |
| DeFi / NFT mobile app development | H3s |
| mobile wallet security / private key management | H2 security + H3 "Private Key Protection on iOS and Android" |
| web3 mobile app development cost | H2 "How Much Does Web3 Mobile App Development Cost?" + FAQ |

## 3. Keyword placement checklist

- [x] Primary keyword in the title (first position)
- [x] Primary keyword in the H1 (with "Services")
- [x] Primary keyword in the meta description
- [x] Primary keyword in the first 100 words. The hero sentence uses "iOS and Android apps where a wallet is how people sign in…". **Recommended edit:** start the intro with the primary phrase in the second sentence, for example "Our Web3 mobile app development team designs the whole system around the phone…" so the exact phrase appears early. It is already applied in the final version of 05 (see 09-final-quality-review.md).
- [x] Primary keyword in at least one H2 ("What Web3 Mobile App Development Actually Involves", cost H2, "Why Choose…")
- [x] Primary keyword in an FAQ question ("What is Web3 mobile app development?")
- [x] Primary keyword in the hero image alt text
- [x] Variants used naturally: "Web3 mobile apps", "mobile dApps", "iOS and Android Web3 apps"
- [x] No exact-match repetition in adjacent sentences

## 4. Image recommendations

Use original diagrams and UI mockups, not stock photos of phones with coins. Export WebP at under 150 KB, set explicit width and height, lazy-load everything below the fold, and don't lazy-load the hero image (it's the LCP element).

| # | Placement | Image | Filename | Alt text |
|---|---|---|---|---|
| 1 | Hero | Two phones (iOS + Android) showing a wallet-connect sheet and a transaction preview | `web3-mobile-app-development-ios-android.webp` | Web3 mobile app development: iOS and Android app screens showing wallet connection and a transaction preview |
| 2 | "What Web3 Mobile App Development Actually Involves" | Four-layer architecture diagram (mobile client → wallet/signing → backend/indexer → blockchain) | `web3-mobile-app-architecture-layers.webp` | Diagram of Web3 mobile app architecture: mobile client, wallet and signing layer, backend and indexer, blockchain network |
| 3 | "External Wallet Connection" | Sequence diagram: app → deep link → wallet approval → return to app → relay session | `walletconnect-mobile-deep-link-flow.webp` | Mobile wallet connection flow using WalletConnect deep links between a dApp and a wallet app |
| 4 | "Which Wallet Model Fits Your App?" | Side-by-side onboarding: embedded (email/passkey) vs external wallet | `embedded-wallet-vs-external-wallet-onboarding.webp` | Comparison of embedded wallet onboarding with email or passkey versus connecting an external crypto wallet |
| 5 | "Transaction Signing Users Can Understand" | Mockup: readable signing sheet with fiat fee and status states | `readable-transaction-signing-mobile-ui.webp` | Mobile transaction signing screen showing readable approval details, network fee in dollars and confirmation status |
| 6 | "Private Key Protection" | Diagram: wallet key encrypted by a Secure Enclave / Keystore key, stored device-only, unlocked by biometrics | `mobile-wallet-private-key-protection-secure-enclave.webp` | How a mobile wallet protects private keys: encryption with a Secure Enclave or Android Keystore key and biometric unlock |
| 7 | "Native vs Cross-Platform" | Simple comparison graphic (optional; the table may be enough) | `react-native-flutter-native-web3-comparison.webp` | Comparison of React Native, Flutter and native Swift/Kotlin for Web3 mobile app development |
| 8 | Process | 6-step horizontal timeline | `web3-mobile-app-development-process.webp` | Six-step Web3 mobile app development process from discovery to store launch and support |
| 9 | OG / social | 1200×630 branded card with the H1 text | `og-web3-mobile-app-development.webp` | (Not rendered on page) |

## 5. Technical on-page recommendations

1. **Heading hygiene:** one H1, no skipped levels. The current page has H2 timeline steps that should be H3s under one H2. "Focus Areas" repeats earlier H2s and should be removed.
2. **FAQ markup:** render the 12 FAQs as visible H3 question / answer pairs (accordions are fine if the content is in the DOM on load).
3. **Tables:** use real `<table>` markup with `<th scope="col">` so they qualify for table-style snippets and stay accessible.
4. **Code samples:** the current page has code blocks. They aren't in the new copy because buyers rarely need them. If engineering wants to keep proof-of-depth code, put one short snippet in a collapsible "For engineers" block under "External Wallet Connection". Update it to current packages (`@reown/appkit-*`, viem).
5. **Core Web Vitals:** the site is a Next.js app and responded slowly during research (several timeouts). Check TTFB and LCP for this URL in PageSpeed Insights before and after launch.
6. **Internal links:** about 20 contextual links (see 07). Keep the "Related Services" and "Related Guides" blocks, but swap the current location-page links (Austin, San Francisco) for topically relevant pages.
7. **Last updated date:** show a visible "Last reviewed: [date]" with a technical reviewer name (see 08 E-E-A-T notes). Web3 SDK names change often, and freshness is a trust signal.
8. **Author / reviewer box:** add a short "Technically reviewed by [Name, Role]" with a link to a real bio. `[PLACEHOLDER]` until the company supplies one.

## 6. E-E-A-T on-page checklist

| Signal | Status | Action |
|---|---|---|
| Technical expertise shown in copy | ✅ In 05 | — |
| Accurate, current technical claims | ✅ Checked in 03 | Review quarterly (SDK renames are frequent) |
| Named author or technical reviewer | ❌ Missing | Add a real engineer bio and LinkedIn/GitHub |
| Verifiable Web3 mobile projects | ❌ Missing (site case studies are labelled illustrative) | Publish 2–3 real case studies with store links |
| Third-party reviews (Clutch/GoodFirms) | ❌ None found | Create profiles; collect verified client reviews |
| Contact details (address/phone) | ❌ Only email | Add a business address and phone to /contact and the Organization schema if they exist |
| Clear commercial terms | ✅ NDA, fixed-price scoping, single lead | — |
| Methodology | ✅ Process with deliverables | — |
| Security practice transparency | ✅ MASVS, independent audit (verify) | Confirm the audit policy |
