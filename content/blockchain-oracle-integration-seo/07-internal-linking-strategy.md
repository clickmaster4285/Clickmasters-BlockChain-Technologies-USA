# 07 — Internal Linking Strategy

**Verification:** every destination URL below returned HTTP 200 with real content when fetched on 26 Nov 2026. URLs were taken from the site's own sitemaps (`/sitemap.xml` index → `sitemap-services`, `sitemap-process`, `sitemap-technology`, `sitemap-howtos`, `sitemap-partners`, etc.). No URLs were invented.

Base: `https://clickmastersblockchaintechnologies.com`

## 1. Outbound links from the new page (already placed in 05)

| # | Destination (verified) | Anchor text | Placement | Reason |
|---|---|---|---|---|
| 1 | /contact | Book a free 30-minute strategy call | Hero, end | Primary conversion |
| 2 | /comparison/blockchain-oracle-comparison | blockchain oracle comparison | Providers section | Sends "which oracle" intent to the comparison page; avoids duplication |
| 3 | /partners/blockchain-partner-chainlink | Chainlink integration | FAQ "What is Chainlink oracle integration?" | Lets the Chainlink-specific page own that query |
| 4 | /technologies/ethereum-blockchain-development | Ethereum development | Networks | Supports network claims |
| 5 | /technologies/arbitrum-development | Arbitrum development | Networks | Same |
| 6 | /technologies/base-blockchain-development | Base development | Networks | Same |
| 7 | /technologies/polygon-blockchain-development | Polygon development | Networks | Same |
| 8 | /technologies/bnb-chain-development | BNB Chain development | Networks | Same |
| 9 | /technologies/avalanche-blockchain-development | Avalanche development | Networks | Same |
| 10 | /technologies/solana-development | Solana development | Networks | Same |
| 11 | /service/cosmos-sdk-appchain-development | Cosmos SDK appchain development | Networks | Appchain and IBC context |
| 12 | /service/defi-development-company | DeFi development | Lending use case | Main commercial neighbour |
| 13 | /service/blockchain-insurance-solutions | blockchain insurance solutions | Insurance use case | Parametric insurance |
| 14 | /service/asset-tokenization-platform | asset tokenization platform development | RWA use case | NAV and reserve feeds |
| 15 | /service/blockchain-development-supply-chain | blockchain for supply chain | Supply chain use case | IoT oracles |
| 16 | /service/gamefi-development-company | GameFi development | Gaming use case | VRF |
| 17 | /process/cross-chain-bridge-architecture | cross-chain bridge architecture guide | Cross-chain use case | Sibling process guide |
| 18 | /service/enterprise-blockchain-solutions | enterprise blockchain solutions | Enterprise use case | Permissioned chains |
| 19 | /process/smart-contract-audit-process | smart contract audit process | Security section | Audit readiness |
| 20 | /cost/smart-contract-development-cost | smart contract development cost guide | Cost section | Budget context (note: page is "2025", so update it) |
| 21 | /service/smart-contract-development | smart contracts | Why ClickMasters | Core service |
| 22 | /service/blockchain-qa-testing-strategy | blockchain QA testing strategy | Why ClickMasters | Testing proof |

### Optional additions (verified, not yet placed)
| Destination | Anchor | Where |
|---|---|---|
| /process/defi-protocol-security | DeFi protocol security | Security section, after the risk table |
| /howto/how-to-integrate-chainlink-vrf | how to integrate Chainlink VRF | VRF service block |
| /service/defi-liquidation-bot-architecture | liquidation bot architecture | Lending use case. **Caution:** that page claims keeper earnings of $10K–$500K/month with no source; fix it before linking |
| /process/blockchain-architecture-design | blockchain architecture design | Architecture step |
| /service/blockchain-consulting | blockchain consulting | "When you might not need us" |

Don't link to `/howto/how-to-implement-chainlink-automation` until it's updated for Chainlink CRE (see §3).

## 2. Inbound links to add (pointing to this page)

| Source page (verified) | Suggested anchor | Placement |
|---|---|---|
| /partners/blockchain-partner-chainlink | blockchain oracle integration services | Intro or "Related services" |
| /comparison/blockchain-oracle-comparison | oracle integration services | Under "Need help choosing an oracle?" CTA |
| /comparison/chainlink-vs-band-vs-pyth | blockchain oracle integration | CTA block |
| /howto/how-to-integrate-chainlink-vrf | oracle integration | "Expert assistance" block |
| /service/defi-development-company | price feed and oracle integration | Lending/perps section |
| /service/smart-contract-development | smart contract oracle integration | Services list |
| /process/defi-protocol-security | oracle integration | Oracle manipulation section |
| /service/asset-tokenization-platform | NAV and reserve oracle integration | Distributions/valuation section |
| /service/blockchain-insurance-solutions | oracle integration for parametric insurance | Parametric example |
| /process (hub) | Blockchain Oracle Integration | Existing listing; check the title is refreshed |

Use varied anchors. Avoid exact-match "blockchain oracle integration" on every inbound link.

## 3. Site issues found during verification (for the team)

| Issue | Page | Recommendation |
|---|---|---|
| Outdated product naming | /howto/how-to-implement-chainlink-automation, /partners/blockchain-partner-chainlink | Chainlink has folded Automation (and Functions) into CRE workflows. Update both pages |
| Broken code sample | /howto/how-to-implement-chainlink-automation | The custom-logic sample writes to an unallocated `address[] memory` array, which reverts |
| Duplicate intent | Two oracle comparison pages | Merge, then 301 |
| Conflicting numbers | Chainlink feed counts "1,500+" vs "500+"; VRF cost "0.25–0.5" vs "0.25–2.5 LINK" | Reconcile or remove |
| Absolute claim | Chainlink page: "Every DeFi protocol we deliver uses Chainlink" | Soften to match the provider-neutral positioning |
| Partnership wording | /partners/partners-trail-of-bits and /partners index use "Partnership" without describing a formal agreement | Confirm a formal relationship exists or reword to "audit firms we coordinate with" |
| Case studies not labelled | /case-studies shows figures (e.g. $48M TVL) with no illustrative label, while the homepage labels its examples illustrative | Confirm which are real |
| Stale date | Several pages dated 2025-06-23 / "Cost in 2025" | Refresh |
| Old pricing | Current oracle page FAQ ($3,000–$8,000; $10,000–$25,000 + $3,000–$15,000/month) | Removed in new content; don't reuse without confirmation |
