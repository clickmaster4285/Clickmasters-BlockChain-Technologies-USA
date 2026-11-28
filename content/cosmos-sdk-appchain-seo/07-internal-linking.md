# 07 — Internal Linking Plan

**Verification method:** On 26 Nov 2026 the site's `/sitemap.xml` index (20 child sitemaps, 521 URLs) was downloaded. Every URL got a live GET request: 520 returned HTTP 200, and one timed out (`/faqs/crypto-exchange-development-faq`, not used here).
- **Every URL marked ✅ below is listed in the sitemap and returned HTTP 200.**
- URLs marked 🟡 PROPOSED do not exist yet.
- These guessed URLs were confirmed **not to exist (404)** and must not be linked: `/service/cosmos-blockchain-development`, `/service/cosmwasm-development`, `/service/ibc-development`, `/service/substrate-development`, `/service/layer-1-blockchain-development`, `/service/appchain-development`.

Domain prefix omitted below: `https://clickmastersblockchaintechnologies.com`

---

## A. Outbound links FROM the new page (already placed in 05-new-cosmos-appchain-content.md)

| Source URL | Target URL | Anchor Text | Context (section in 05) | SEO Purpose |
|---|---|---|---|---|
| /service/cosmos-sdk-appchain-development | ✅ /technologies/cosmos-blockchain-development | Cosmos SDK technology overview | "Cosmos SDK, CometBFT and IBC, explained" intro | Hand informational intent to the tech hub; separate the two pages' roles |
| /service/cosmos-sdk-appchain-development | ✅ /service/blockchain-consulting | blockchain consulting | Decision framework ("not sure an appchain is right") | Route undecided buyers; support the consulting page |
| /service/cosmos-sdk-appchain-development | ✅ /comparison/layer1-vs-layer2-blockchain | Layer 1 vs Layer 2 comparison | Decision framework (rollup option) | Topical support for the decision content |
| /service/cosmos-sdk-appchain-development | ✅ /technologies/polkadot-development | Polkadot and Substrate development | Framework comparison table | Correct owner for Substrate; avoid cannibalising |
| /service/cosmos-sdk-appchain-development | ✅ /process/blockchain-architecture-design | blockchain architecture design process | Architecture & specification phase | Supports process depth (E-E-A-T) |
| /service/cosmos-sdk-appchain-development | ✅ /process/blockchain-consensus-mechanisms | how consensus mechanisms compare | CometBFT section | Topical cluster: consensus |
| /service/cosmos-sdk-appchain-development | ✅ /service/smart-contract-development | smart contract development | CosmWasm / Cosmos EVM section | Pass relevance to the core smart-contract service |
| /service/cosmos-sdk-appchain-development | ✅ /comparison/solidity-vs-rust-smart-contracts | Solidity vs Rust | Choosing an execution environment | Support the language decision |
| /service/cosmos-sdk-appchain-development | ✅ /process/cross-chain-bridge-architecture | cross-chain bridge architecture | IBC vs bridges paragraph | Topical cluster: interoperability |
| /service/cosmos-sdk-appchain-development | ✅ /service/defi-bridge-security-advanced | bridge security engineering | IBC vs bridges / security | Commercial cross-sell |
| /service/cosmos-sdk-appchain-development | ✅ /service/defi-staking-distribution-architecture | staking reward distribution architecture | Staking & tokenomics | Commercial cross-sell |
| /service/cosmos-sdk-appchain-development | ✅ /calculators/token-economics-simulator | token economics simulator | Tokenomics section | Engagement / tool link |
| /service/cosmos-sdk-appchain-development | ✅ /process/dao-governance-design | on-chain governance design | Governance section | Topical cluster: governance |
| /service/cosmos-sdk-appchain-development | ✅ /service/crypto-wallet-development | wallet development | Wallets & frontends section | Commercial cross-sell |
| /service/cosmos-sdk-appchain-development | ✅ /service/blockchain-qa-testing-strategy | blockchain QA and testing strategy | Testing section | Supports security methodology |
| /service/cosmos-sdk-appchain-development | ✅ /process/smart-contract-audit-process | audit process | Security section | Trust and methodology |
| /service/cosmos-sdk-appchain-development | ✅ /howto/how-to-set-up-blockchain-monitoring | blockchain monitoring setup guide | Operations & monitoring | Supporting guide |
| /service/cosmos-sdk-appchain-development | ✅ /service/blockchain-disaster-recovery-planning | disaster recovery planning | Incident response / maintenance | Commercial cross-sell |
| /service/cosmos-sdk-appchain-development | ✅ /service/defi-development-company | DeFi protocol development | Use cases (DeFi chains) | Pass relevance to DeFi service |
| /service/cosmos-sdk-appchain-development | ✅ /service/enterprise-blockchain-solutions | enterprise blockchain solutions | Use cases (permissioned chains) | Pass relevance to enterprise service |
| /service/cosmos-sdk-appchain-development | ✅ /service/asset-tokenization-platform | asset tokenization platform | Use cases (RWA chains) | Commercial cross-sell |
| /service/cosmos-sdk-appchain-development | ✅ /service/blockchain-development-services | blockchain development services | "Why ClickMasters" (parent service) | Topical hierarchy: child → parent |
| /service/cosmos-sdk-appchain-development | ✅ /howto/how-to-write-blockchain-technical-specification | how to write a blockchain technical specification | Engagement / first step | Pre-sale education |
| /service/cosmos-sdk-appchain-development | ✅ /cost/blockchain-development-cost | blockchain development cost guide | Cost section | Supports cost intent |
| /service/cosmos-sdk-appchain-development | ✅ /contact | Book an appchain architecture review | All CTAs | Conversion |

**Link density:** 30 contextual links (25 unique URLs) across ~7,300 published words, so roughly 1 per 240 words, spread across sections. All 25 unique paths in 05 were cross-checked against this verified list. If the CMS template also renders "Related services" and "Related guides" blocks, trim those blocks to avoid repeating links that already appear in the body. Keep `/technologies/cosmos-blockchain-development` in the body link only.

**Recommended replacements in the template's "Related services" block.** The current block links to `/hire/hire-polkadot-developer`, `/service/cross-chain-yield-aggregation`, `/service/web3-development-company`, `/service/crypto-wallet-development` and `/service/defi-bridge-security-advanced`.
- Replace `/hire/hire-polkadot-developer`: it sends Cosmos buyers to a competing ecosystem.
- Replacement: `/service/blockchain-consulting` and `/service/enterprise-blockchain-solutions`.

---

## B. Inbound links TO the new page (edits ClickMasters should make on other pages)

| Source URL | Target URL | Anchor Text | Context | SEO Purpose |
|---|---|---|---|---|
| ✅ /technologies/cosmos-blockchain-development | /service/cosmos-sdk-appchain-development | Cosmos SDK appchain development services | First "What we build" paragraph (replace the existing generic link if one is there) | **Most important link.** Consolidates commercial intent onto the service page. |
| ✅ /service/blockchain-development-services | /service/cosmos-sdk-appchain-development | Cosmos SDK appchain development | Where Go/Rust or custom chains are mentioned | Parent → child hierarchy |
| ✅ /service/complete-blockchain-services-overview | /service/cosmos-sdk-appchain-development | custom Cosmos appchains | Services list | Hub coverage |
| ✅ /service/enterprise-blockchain-solutions | /service/cosmos-sdk-appchain-development | permissioned Cosmos SDK chain | Permissioned network paragraph | Enterprise relevance |
| ✅ /service/defi-development-company | /service/cosmos-sdk-appchain-development | launch your protocol as its own appchain | DeFi architecture options | DeFi buyers outgrowing shared L1/L2 |
| ✅ /service/blockchain-consulting | /service/cosmos-sdk-appchain-development | application-specific blockchain development | "Platform selection" content | Decision-stage routing |
| ✅ /technologies/polkadot-development | /service/cosmos-sdk-appchain-development | Cosmos SDK appchain alternative | Substrate vs Cosmos mention | Cross-ecosystem comparison |
| ✅ /comparison/layer1-vs-layer2-blockchain | /service/cosmos-sdk-appchain-development | build a sovereign Cosmos appchain | Layer 1 options paragraph | Informational → commercial |
| ✅ /process/cross-chain-bridge-architecture | /service/cosmos-sdk-appchain-development | IBC-native appchains | Interoperability options | Interop cluster |
| ✅ /process/blockchain-consensus-mechanisms | /service/cosmos-sdk-appchain-development | CometBFT-based appchain development | BFT / PoS section | Consensus cluster |
| ✅ /howto/how-to-implement-cross-chain-bridge | /service/cosmos-sdk-appchain-development | Cosmos IBC integration | IBC alternative to bridges | Interop cluster |
| ✅ /technologies | /service/cosmos-sdk-appchain-development | Cosmos SDK appchains | Technology hub card for Cosmos | Hub coverage |
| ✅ /service | /service/cosmos-sdk-appchain-development | Cosmos SDK Appchain Development | Services index | Crawl depth |
| ✅ /cost/blockchain-development-cost | /service/cosmos-sdk-appchain-development | Cosmos appchain development cost | Custom L1 cost row | Cost intent |
| ✅ /howto/how-to-choose-blockchain-development-company | /service/cosmos-sdk-appchain-development | specialist Cosmos SDK development company | Specialisation advice | Vendor-selection intent |

Anchors are varied deliberately. No more than two inbound links should use the exact primary phrase.

---

## C. Proposed new pages (do not link until they exist)

| Proposed URL | Why | Link from this page with |
|---|---|---|
| 🟡 /comparison/cosmos-sdk-vs-substrate | Question keyword "cosmos sdk vs substrate" has comparison intent. No such page exists. | "Cosmos SDK vs Substrate comparison" |
| 🟡 /cost/cosmos-appchain-development-cost | Cost queries are conversion-critical; the site already has a /cost/ hub | "Cosmos appchain cost breakdown" |
| 🟡 /hire/hire-cosmos-sdk-developer | A /hire/hire-polkadot-developer page exists but there is no Cosmos equivalent; "hire cosmos sdk developers" has demand | "hire Cosmos SDK developers" |
| 🟡 /glossary/cosmos-ibc-glossary | Supports the many technical entities on this page | "IBC and Cosmos glossary" |

**Do not create** separate pages for "Cosmos appchain development company" or "custom Cosmos blockchain development". They are the same intent as this page and would cannibalise it.

---

## D. Contact form fix (conversion)
The `/contact` "Project type" dropdown has no appchain or L1 option. Add **"Appchain / Layer 1 (Cosmos SDK)"** so leads from this page are tagged correctly. This does not affect SEO, but it does affect lead quality.
