# 07 — Internal Linking Strategy

Domain: `https://clickmastersblockchaintechnologies.com` (paths below are relative to it)

**How the URLs were checked.** Every URL was checked during research on 26 Nov 2026. Each one has a status:
- **200** means it was fetched and returned HTTP 200.
- **Sitemap** means it is listed in the site's XML sitemaps but wasn't fetched individually. Confirm these before publishing.
- **Proposed** means the page doesn't exist and would be new.

---

## 1. Outbound contextual links from the target page

Source URL for all of these: `/service/web3-mobile-app-development`

| # | Target URL | Status | Suggested anchor text | Context (section in 05) | SEO purpose |
|---|---|---|---|---|---|
| 1 | /howto/how-to-add-blockchain-to-existing-app | Sitemap | adding blockchain to an existing app | H3 "Adding Web3 Features to an Existing Mobile App" | Supports the "convert existing app" question cluster |
| 2 | /service/crypto-wallet-development | 200 | crypto wallet development | H3 "Mobile Crypto Wallet Development" | Hands wallet-builder intent to the owning page (avoids cannibalization) |
| 3 | /service/defi-development-company | Sitemap | DeFi protocol development | H3 "DeFi Mobile App Development" | Service cluster |
| 4 | /service/nft-development-company | Sitemap | NFT development | H3 "NFT Mobile App Development" | Service cluster |
| 5 | /service/crypto-payment-gateway-development | Sitemap | crypto payment gateway | H3 "Crypto Payments in Mobile Apps" | Service cluster |
| 6 | /partners/blockchain-partner-magic-privy | 200 | embedded wallet integration with Magic and Privy | H3 "Embedded Wallets…" | Depth on embedded wallets. ⚠ Magic's wallet business was acquired by Payward (Kraken) in July 2026, so check that page is still accurate |
| 7 | /service/social-recovery-wallet | 200 | social recovery wallets | H3 "Smart Accounts, Gas Sponsorship and Passkeys" | Topic depth |
| 8 | /comparison/custodial-vs-non-custodial-wallet | 200 | custodial vs non-custodial wallets | After the wallet model table | Supports the decision |
| 9 | /partners/blockchain-partner-alchemy | Sitemap | Alchemy node infrastructure | H3 "Reading On-Chain Data Fast" | Topic depth |
| 10 | /service/smart-contract-development | Sitemap | smart contract development | H3 "Writing to Smart Contracts" | Core service link |
| 11 | /howto/how-to-deploy-smart-contract-multi-chain | Sitemap | deploying contracts across multiple chains | H3 "Multi-Chain Mobile Applications" | Supports multi-chain |
| 12 | /technologies/solana-development | 200 | Solana development | Multi-chain H3 (networks line) | Chain cluster |
| 13 | /technologies/arbitrum-development | Sitemap | Arbitrum | Multi-chain H3 | Chain cluster |
| 14 | /technologies/base-blockchain-development | Sitemap | Base | Multi-chain H3 | Chain cluster |
| 15 | /service/crypto-wallet-push-notifications | 200 | push notifications for crypto wallets | H3 "The Backend Between Your App and the Chain" | Hands depth to the owning page |
| 16 | /service/web3-development-company | 200 | full-stack Web3 development | End of the framework section | Links sibling pillar; owns "web3 app development company" |
| 17 | /process/crypto-wallet-key-management | Sitemap | crypto wallet key management | H3 "Private Key Protection" | Security depth |
| 18 | /service/biometric-wallet-authentication | 200 | biometric wallet authentication | H3 "Biometric Authentication…" | Hands depth to the owning page |
| 19 | /technologies | 200 | blockchain technologies we work with | Tech stack table | Hub link |
| 20 | /cost/web3-development-cost | 200 | Web3 development cost guide | Cost H2 | Supports cost intent |
| 21 | /cost/crypto-wallet-development-cost | 200 | crypto wallet development cost | Cost H2 | Supports cost intent |
| 22 | /service/gamefi-development-company | Sitemap | GameFi development | Industries | Vertical cluster |
| 23 | /service/asset-tokenization-platform | Sitemap | asset tokenization platforms | Industries | Vertical cluster |
| 24 | /industries | Sitemap (hub) | industries we serve | Industries | Hub |
| 25 | /news/solana-mobile-chapter2-2025 | 200 | Solana Mobile and mobile-first Web3 | Related Guides block | Informational support (most mobile-focused article on the site) |
| 26 | /hire/hire-web3-developer | Sitemap | hire Web3 developers | Optional in the closing CTA | Captures hire-intent users |
| 27 | /contact | 200 | Book a Free Strategy Call | CTAs | Conversion |

**Anchor diversity.** None of the outbound anchors uses the target page's own primary keyword. Each anchor describes the destination page, and no exact-match commercial anchor is repeated.

**Links to remove from the current Related blocks:**
- /locations/blockchain-development-austin and /locations/blockchain-development-san-francisco. These are geographically irrelevant on a service page.
- /service/hardware-wallet-dapp-integration. Keep it only if hardware wallet support (for example Ledger via Bluetooth) is offered for mobile. It has a near-duplicate at /service/hardware-wallet-integration, which should be consolidated site-wide.

---

## 2. Inbound links to the target page (add to these existing pages)

| Source URL | Status | Target URL | Suggested anchor text | Context | SEO purpose |
|---|---|---|---|---|---|
| / (homepage) | 200 | /service/web3-mobile-app-development | Web3 mobile app development | Services section, as a card or link | Strongest internal authority signal |
| /service (services hub) | 200 | same | Web3 mobile apps for iOS and Android | Service listing | Hub → spoke |
| /service/web3-development-company | 200 | same | Web3 mobile app development | Where the page mentions React Native / mobile (about 9 mentions found) | Sibling pillar, and tells search engines the two pages have different jobs |
| /service/crypto-wallet-development | 200 | same | mobile dApps that connect to your wallet | Wallet types / integration section | Separates wallet vs dApp intent |
| /service/biometric-wallet-authentication | 200 | same | building a complete Web3 mobile app | Intro or closing | Spoke → pillar |
| /service/crypto-wallet-push-notifications | 200 | same | Web3 mobile app development services | Intro | Spoke → pillar |
| /service/social-recovery-wallet | 200 | same | mobile Web3 onboarding | Body | Spoke → pillar |
| /news/solana-mobile-chapter2-2025 | 200 | same | build a mobile-first Web3 app | Conclusion | Informational → commercial |
| /howto/how-to-build-web3-app | 200 | same | Web3 mobile app development team | Mobile step / conclusion | Informational → commercial |
| /howto/how-to-add-blockchain-to-existing-app | Sitemap | same | add Web3 features to your mobile app | Conclusion CTA | Informational → commercial |
| /cost/web3-development-cost | 200 | same | Web3 mobile app development | "Mobile app (iOS + Android)" row | Cost → service |
| /cost/crypto-wallet-development-cost | 200 | same | mobile Web3 apps | Non-custodial mobile wallet rows | Cost → service |
| /comparison/custodial-vs-non-custodial-wallet | 200 | same | wallet onboarding for mobile apps | Conclusion | Informational → commercial |
| /partners/blockchain-partner-magic-privy | 200 | same | embedded wallets in iOS and Android apps | Body | Partner → service |
| /technologies/solana-development | 200 | same | Solana mobile apps | Mobile / ecosystem mention | Technology → service |
| /glossary/web3-user-experience-glossary | Sitemap | same | Web3 mobile UX | Entries on onboarding, wallets | Glossary → service |

Vary the anchors across these pages. Use the exact phrase "Web3 mobile app development" in only about 3 of them (homepage, Web3 development page, cost page). Use descriptive variants everywhere else.

---

## 3. Proposed new supporting pages (don't exist yet)

| Proposed URL | Purpose | Links to target with |
|---|---|---|
| /howto/how-to-integrate-walletconnect-mobile-app | Informational: "WalletConnect React Native / Flutter / iOS integration" | "Web3 mobile app development services" |
| /comparison/react-native-vs-flutter-web3 | Informational: framework choice ("flutter vs react native web3" has no strong ranking page) | "cross-platform Web3 app development" |
| /comparison/embedded-wallet-vs-external-wallet | Informational: wallet model decision | "Web3 mobile app development" |
| /resources/app-store-crypto-app-guidelines | Informational: Apple 3.1.5 / 3.1.1 and Google Play crypto policy explainer | "store-ready Web3 mobile apps" |
| /case-studies/[real-web3-mobile-project] | Proof. **Only with a real project** | "our Web3 mobile app work" |

## 4. Site-wide issues spotted during research

- `/service/dapp-development`, `/service/blockchain-app-development` and `/service/token-development` return **404**, but the homepage has sections with those names. Either build these pages or remove the implied links. Until they exist, "dApp development" intent falls to /service/web3-development-company.
- Near-duplicate pages split relevance signals:
  - /service/hardware-wallet-integration vs /service/hardware-wallet-dapp-integration
  - three custodial vs non-custodial comparison URLs
  
  Consider consolidating them with 301 redirects.
