# 02 — Keyword Research

**Date:** 26 November 2026

## Data availability statement

No keyword tool (Ahrefs, Semrush, Google Keyword Planner, Search Console) was available for this research. **Search volume and keyword difficulty are therefore marked "Unavailable" throughout.** No numbers were estimated or invented.

Priority and intent are based on:
- the queries' observed SERP make-up (which page types surfaced: agency, protocol docs, Oracle Corp, blogs);
- relevance to ClickMasters' verified services;
- competitor targeting (titles and H1s of ranking pages).

**Recommended next step:** pull volume and KD for every keyword below from Google Keyword Planner or Semrush (US database), plus Search Console impressions for the current URL. Then re-check the priority column.

Legend — **Priority:** P1 (must target), P2 (support), P3 (mention naturally / FAQ only).

---

## 1. Primary keyword selection

| Candidate | Intent | SERP observation | Fit |
|---|---|---|---|
| **blockchain oracle integration** | Commercial / mixed | Agency pages (Protofire title uses it), ethereum.org, IBM; some Oracle Corp noise | **Best**: matches URL slug, existing title, and service intent |
| blockchain oracle development | Commercial | Heavy Oracle Corp noise; agencies (Codezeros, LeewayHertz) | Secondary |
| smart contract oracle integration | Commercial / technical | Cleaner intent (no Oracle Corp) | Secondary; use in H2 and body |
| blockchain oracle services | Mixed | Oracle Corp + protocols | Secondary |
| oracle integration services | Ambiguous | Dominated by Oracle Corp / Oracle Integration Cloud | **Do not target alone**; only with "blockchain" |

**Primary keyword: `blockchain oracle integration`** (with the commercial modifier "services" in the title).
Reason: it matches the existing URL `/process/blockchain-oracle-integration` (no redirect needed), it's what the top relevant agency page targets, and it contains the disambiguating word "blockchain".

---

## 2. Keyword table

Vol = search volume. KD = keyword difficulty. Both **Unavailable** for every row (see statement above), so those columns are left out to keep the table readable.

### 2.1 Primary and secondary (commercial)

| Keyword | Intent | Relevance | Priority | Recommended section |
|---|---|---|---|---|
| blockchain oracle integration | Commercial | High | P1 | Title, H1, intro, meta, URL (existing) |
| blockchain oracle integration services | Commercial | High | P1 | Title, services H2, CTA |
| smart contract oracle integration | Commercial | High | P1 | H2 "Smart contract and API integration", body |
| blockchain oracle development | Commercial | High | P2 | Services (custom oracle), FAQ |
| oracle development services | Commercial | Medium (ambiguous) | P2 | Services; always paired with "blockchain/smart contract" |
| custom blockchain oracle development | Commercial | High | P2 | Services: custom oracle |
| decentralized oracle integration | Commercial | High | P2 | Types of integration |
| oracle network integration | Commercial | Medium | P2 | Services |
| smart contract data integration | Commercial | Medium | P2 | Intro / API section |
| real-world data integration blockchain | Commercial / info | Medium | P2 | What is integration |
| external API integration with smart contracts | Commercial / info | High | P2 | API section, FAQ |
| blockchain API integration | Mixed (often means RPC/node APIs) | Medium | P3 | API section, with clarification |
| blockchain data feeds integration | Commercial | High | P2 | Price feed service |
| on-chain and off-chain data integration | Info / commercial | Medium | P3 | Architecture |
| oracle integration developers | Commercial (hire) | High | P2 | Why ClickMasters, CTA |
| external data integration for DeFi | Commercial | High | P2 | DeFi use case |
| enterprise oracle integration | Commercial | Medium | P2 | Enterprise use case |
| blockchain oracle services | Mixed | Medium | P3 | Intro |
| oracle integration services | Ambiguous | Low alone | P3 | Only as "blockchain oracle integration services" |

### 2.2 Platform-specific

| Keyword | Intent | Relevance | Priority | Section | Note |
|---|---|---|---|---|---|
| chainlink integration / chainlink oracle integration | Commercial | High | P2 | Providers, FAQ | Overlaps /partners/blockchain-partner-chainlink. Coordinate (see 04) |
| chainlink data feeds integration | Commercial / technical | High | P2 | Price feeds, providers | |
| chainlink price feeds | Info / technical | High | P3 | Providers | Docs rank; mention |
| chainlink VRF integration | Commercial | High | P3 | Gaming use case | Link to VRF how-to |
| chainlink CRE / chainlink runtime environment | Technical | Medium–High (new) | P2 | Automation service, providers | Low-competition opportunity; few agencies mention it |
| chainlink functions | Technical | Medium | P3 | Providers (as "now part of CRE") | Don't present as current standalone |
| chainlink automation | Technical | Medium | P3 | Automation service (as "now part of CRE") | Update ClickMasters how-to |
| chainlink CCIP integration | Commercial | Medium | P3 | Cross-chain | |
| chainlink data streams | Technical | Medium | P3 | Pull feeds | |
| pyth network integration / pyth price feeds | Commercial / technical | High | P2 | Providers, pull model | Already on existing page |
| API3 dAPIs / API3 integration | Technical | Medium | P3 | Providers | **[CONFIRM capability]** |
| API3 Airnode | Technical | Low (docs status unclear) | — | Skip | Docs URLs 404 |
| band protocol integration | Technical | Medium | P3 | Providers, Cosmos | |
| redstone oracle integration | Technical | Medium | P3 | Providers | **[CONFIRM]** |
| UMA optimistic oracle | Technical | Medium | P3 | Types (optimistic), insurance | **[CONFIRM]** |
| tellor oracle, DIA oracle, supra oracle, chronicle oracle | Technical | Low–Medium | P3 | One-line mentions | |

### 2.3 Technical / semantic (use naturally; don't force)

| Term | Section |
|---|---|
| decentralized oracle networks (DONs) | Types, providers |
| data feeds, price feeds | Services, use cases |
| oracle nodes, node operators | What is integration, architecture |
| oracle adapters / external adapters | Custom oracle service |
| oracle aggregator, data aggregation | Architecture, security |
| API connectivity | API section |
| off-chain computation, hybrid smart contracts | Architecture, CRE |
| on-chain verification, signed data | Pull model, security |
| data freshness, heartbeat, deviation threshold | Security, push model |
| data availability | Security |
| oracle security, oracle manipulation, price manipulation | Security |
| stale data / stale price | Security, FAQ |
| L2 sequencer uptime | Security, networks |
| circuit breaker, fallback oracle | Security |
| cross-chain data, cross-chain messaging | Cross-chain service |
| verifiable randomness, VRF | Gaming |
| smart contract automation, event-driven execution | Automation |
| push-based oracle, pull-based oracle | Types (H3s) |
| first-party oracle, third-party oracle network | Types |
| optimistic oracle, dispute window | Types, insurance |
| confidence interval (Pyth) | Security |
| proof of reserve, NAV feed | RWA use case |
| TWAP | Security (as secondary check, not primary oracle) |

### 2.4 Informational (FAQ / explainer sections)

| Question | Intent | Priority | Section |
|---|---|---|---|
| what is a blockchain oracle | Info | P1 | "What is blockchain oracle integration?" + FAQ |
| how do blockchain oracles work | Info | P1 | Architecture section + FAQ |
| why do smart contracts need oracles | Info | P1 | Intro section + FAQ |
| what is a decentralized oracle network | Info | P2 | Types + FAQ |
| centralized vs decentralized oracles | Info | P2 | Types + FAQ |
| push vs pull oracles | Info | P2 | Types + FAQ (competitor gap) |
| how do oracles connect APIs to smart contracts | Info | P2 | API section + FAQ |
| can smart contracts call APIs directly | Info | P2 | FAQ |
| how secure are blockchain oracles | Info | P2 | Security + FAQ |
| what is an oracle data feed | Info | P3 | Services |
| what happens if an oracle gives wrong data | Info | P2 | Security + FAQ |
| how much does blockchain oracle integration cost | Commercial-info | P1 | Cost section + FAQ |
| how long does oracle integration take | Commercial-info | P2 | Process + FAQ |
| which oracle is best / chainlink vs pyth | Comparison | P3 | Provider section (link to comparison pages; don't compete) |

---

## 3. Keyword clusters (for page and site)

| Cluster | Owner page | Supporting pages |
|---|---|---|
| Blockchain oracle integration (commercial) | **This page** | — |
| Chainlink-specific integration | /partners/blockchain-partner-chainlink (or merge, see 04) | How-to VRF, how-to Automation (needs CRE update) |
| Oracle comparison / which oracle | /comparison/blockchain-oracle-comparison | /comparison/chainlink-vs-band-vs-pyth (consider merging) |
| Oracle security / manipulation | This page (section) + /process/defi-protocol-security | /process/smart-contract-audit-process |
| Cross-chain data | /process/cross-chain-bridge-architecture | This page links to it |

---

## 4. Avoid

- Bare "oracle" + "services" combinations (Oracle Corp intent).
- "oracle cloud", "oracle database", "OCI" terms (competitors drifted here; irrelevant).
- Stuffing every provider name into headings. Providers appear in one section and the FAQ.
- Repeating the exact primary keyword in every H2. Target density is natural, roughly 6–10 exact uses across ~4,000 words, plus variants.
