# 04 — Search Intent and Content Strategy

## 1. Summary

| Item | Decision |
|---|---|
| Primary keyword | blockchain oracle integration |
| Secondary keywords | blockchain oracle integration services; smart contract oracle integration; custom blockchain oracle development; decentralized oracle integration; external API integration with smart contracts; blockchain data feeds integration; oracle integration developers |
| Dominant intent | **Commercial investigation.** A buyer, or a technical lead shortlisting vendors, wants to know: can this team integrate the right oracle safely on my chain, and what will it involve? |
| Secondary intent | Informational (what is an oracle, push vs pull, security). Answered briefly on-page, with depth pushed to FAQ and supporting guides |
| Conversion objective | Book a free 30-minute strategy call (/contact). Secondary: send a brief by email |
| URL | Keep `/process/blockchain-oracle-integration` |
| Page role | Commercial hub for all oracle topics on the site |

## 2. Audience and their concerns

| Segment | What they're trying to do | Top concerns | Where the page answers |
|---|---|---|---|
| DeFi founders / protocol teams | Lending, perps, stablecoins, vaults | Manipulation, stale prices, liquidations, provider choice, audit readiness | Security, push/pull, DeFi use cases, process |
| Smart contract developers (in-house) | Need a second pair of hands or a review | Correct consumer checks, testing, L2 quirks | Validation snippet, testing phase, "when you don't need us" |
| Fintech / tokenisation platforms | NAV, reserves, FX, rates on-chain | Data licensing, update frequency, compliance | RWA use case, custom/first-party oracle |
| Insurtech | Parametric payouts | Data source trust, disputes, payout correctness | Insurance use case, optimistic oracles |
| Enterprise blockchain teams | Connect ERP/IoT to chain, often permissioned | Do we even need a decentralised network? Privacy | Enterprise use case, custom oracle, outbound oracle |
| Web3 gaming / NFT | Randomness | Fairness, cost, delay | VRF section |
| Other dev agencies | White-label oracle work | Capability, process | Services, process |

**Cross-cutting questions** (from the brief and from competitor FAQs): which provider, how APIs connect, data reliability, what if the oracle stops, verification, manipulation, chains, cost, timeline, scaling. Each one maps to a section below.

## 3. Unique positioning

**Positioning line:** *ClickMasters integrates established oracle networks, and builds custom oracles where none fit, so your contracts keep behaving correctly when data is late, wrong or missing.*

Pillars:
1. **Provider-neutral.** We pick the oracle for the data, the chain and the risk, not out of habit. We are not an oracle network and don't sell data.
2. **Failure-first engineering.** Every integration defines what the contract does when data is stale, out of range, or unavailable.
3. **Current with the stack.** For example, Chainlink CRE now covers what Functions and Automation used to do, and VRF v2.5 is the only current VRF version. Most competitor pages are out of date.
4. **Honest scoping.** We say when you don't need custom work.

**Caution:** the existing Chainlink page says "Every DeFi protocol we deliver uses Chainlink", which conflicts with "provider-neutral". Recommended wording on the new page: "Chainlink is the provider we integrate most often. We also work with pull-based and alternative oracles when they fit better." **[CONFIRM with team which non-Chainlink providers they have shipped.]**

## 4. Competitor gaps to exploit

See 01 §5. In short: a provider-selection framework, push vs pull vs request-response vs optimistic, a failure-mode table, a responsibility split, current product naming, chain caveats, cost drivers, oracle-specific testing, a post-launch runbook, and disambiguation from Oracle Corp.

## 5. Recommended page structure (final)

1. **Hero.** H1, value prop, two CTAs, three proof-of-approach bullets (no fake stats)
2. **What is blockchain oracle integration?** Definition, why blockchains can't call APIs, a worked example, and a note that this isn't Oracle Corp
3. **How an oracle integration works.** Seven-step data path
4. **Our blockchain oracle integration services.** Eight service blocks
5. **Choosing an oracle provider.** Selection criteria table, provider summaries, link to comparison page
6. **Integration models.** Push, pull, request-response/workflows, first-party, decentralised, optimistic, custom, cross-chain
7. **Connecting external APIs to smart contracts.** Practical flow, code snippet, error handling
8. **Networks.** What we build on, plus caveats
9. **Use cases.** Eight use cases, each in a problem → data → mechanism → action → limit format
10. **Oracle security and data reliability.** Failure-mode table plus fallbacks and monitoring
11. **Process.** Eight phases, each with deliverables
12. **What affects cost and timeline.** Cost drivers, no invented prices
13. **When you might not need us.** Trust builder
14. **Why ClickMasters.** Verified only
15. **FAQ.** 14 questions
16. **Final CTA**

## 6. Internal linking opportunities (detail in 07)

Smart contract development, DeFi development, asset tokenization, enterprise blockchain, insurance, supply chain, GameFi, Cosmos SDK appchain, cross-chain bridge architecture, DeFi protocol security, audit process, QA testing strategy, the two oracle comparison pages, the VRF how-to, the Chainlink partner page, technology pages for each chain, and the contact page.

## 7. Cannibalisation plan

| Page | Recommended action |
|---|---|
| /partners/blockchain-partner-chainlink | Keep it focused on "Chainlink integration". Link it to this hub with the anchor "blockchain oracle integration", and link from this hub with "Chainlink integration". Update it to replace Automation/Keepers wording with CRE. Remove the absolute "every protocol uses Chainlink" line or reconcile it |
| /comparison/blockchain-oracle-comparison and /comparison/chainlink-vs-band-vs-pyth | Consider merging into one comparison page with a 301. They duplicate each other and quote conflicting feed counts (1,500+ vs 500+) |
| /howto/how-to-implement-chainlink-automation | Update for CRE migration (Automation is now part of CRE per Chainlink). Also fix the code sample, which writes to an unallocated memory array and would revert |
| Existing body copy of this URL | Fully replaced by the new content in 05 |

## 8. Important questions to answer (checklist)

- [x] What is a blockchain oracle / oracle integration
- [x] Why can't smart contracts call APIs
- [x] How does data flow, end to end
- [x] Which provider should I choose
- [x] Push vs pull
- [x] Centralised vs decentralised; first-party vs third-party
- [x] Which chains
- [x] What if the oracle stops or is wrong
- [x] How is manipulation reduced
- [x] Cost drivers and timeline factors
- [x] Can you build a custom oracle
- [x] What do we get at the end (deliverables)
- [x] When don't I need you
