# 04 — Search Intent & Content Strategy

## 1. Search intent diagnosis
The primary query "Cosmos SDK appchain development" has **mixed intent**:
- **Commercial (dominant for our purposes):** founders, protocol teams and enterprise architects shortlisting a partner to build a chain.
- **Commercial investigation:** "should we build an appchain, and with Cosmos?" This buyer is not yet sure the appchain is right.
- **Informational:** developers learning the SDK. Official docs (docs.cosmos.network) own this intent. We do not compete for it directly; we answer it briefly so evaluators trust the page.

**Strategy:** a commercial service page written **as an engineering-led decision guide.** It answers the buyer's questions in the order they ask them, and every section ends with what ClickMasters delivers. Each technical explanation does three jobs: what the component is, **why a business cares**, and **what decision the buyer must make.**

## 2. Audience and buying concerns → where the page answers them

| Audience | Core concern | Section that answers it |
|---|---|---|
| Web3 founders | "Do we actually need our own chain, or are we over-engineering?" | Decision framework (signals for/against + option table) |
| DeFi protocol teams | MEV/ordering control, oracle data in consensus, fee capture, liquidity access | ABCI 2.0 + vote extensions; fee models; IBC + Ethereum via IBC v2 |
| Blockchain startups | Cost, timeline, team size, validators | Cost & timeline; launch playbook; validator section |
| Enterprise / fintech | Permissioning, compliance, key custody, auditability | Security models (PoA), enterprise licence note, permissioned CosmWasm, key management |
| Developers launching a chain | Technical competence of the partner | Architecture, modules, IBC internals, testing methodology |
| Any team needing dedicated infra | "What does it cost to keep it alive?" | After mainnet: operations, upgrades, support windows |

Buyer questions from the brief, mapped:
- Need an appchain? → **Decision framework**
- Why Cosmos SDK? → **Framework comparison + architecture**
- Infra requirements? → **Validator & node infrastructure**
- How does IBC work? → **IBC section**
- How is security maintained? → **Security model + security engineering**
- Validator selection? → **Validator section + launch playbook + FAQ**
- Costs? → **Cost & timeline**
- Deployment time? → **Timeline table**
- Maintenance? → **After mainnet**

## 3. Differentiation thesis (from 01-competitor-research.md)
The page wins by being **the only current, technically correct, decision-oriented page** in the SERP.

1. **Visibly current (2026).** Release families, SDK v0.55, CometBFT 0.40 (v1 retracted), ibc-go v11, IBC v2 to Ethereum, Cosmos EVM, CosmWasm 3, **Interchain Security retired on the Hub**, Leap shut down. Competitors still say "Tendermint Core", "replicated security" and "Ethermint".
2. **Honest decision framework.** It includes "when not to build an appchain", which matches the site's existing frank tone ("Blockchain is not automatically the right answer").
3. **Coverage nobody else has:** Interchain Queries, relayer economics after fee-middleware removal, consensus-key rotation, remote-signer migration (TMKMS → cosmos-kms), Enterprise PoA licensing, the release-family upgrade cadence.
4. **Launch and operations playbook:** genesis ceremony, gentx, sentries, Cosmovisor upgrades, and incident response.
5. **No invented proof.** Competitors' unverifiable "50+ chains" and NDA logos are a weakness. ClickMasters uses methodology, deliverables and transparent assumptions instead, and adds verified evidence once supplied.

## 4. Information architecture (final)

```
H1  Cosmos SDK Appchain Development Services
    Intro (primary keyword, value, CTA) + "at a glance" box
H2  Do You Need a Cosmos Appchain? A Decision Framework
    H3 Signals an appchain is the right architecture
    H3 Signals you should not build one (yet)
    H3 Appchain vs smart contracts vs rollup vs permissioned chain (table)
H2  What Our Cosmos SDK Appchain Development Services Cover (service/deliverable table)
H2  Cosmos SDK, CometBFT, IBC and the Cosmos Hub: How an Appchain Fits Together
    H3 The application layer: Cosmos SDK
    H3 The consensus layer: CometBFT
    H3 The interoperability layer: IBC
    H3 Where the Cosmos Hub fits (and doesn't)
H2  Custom Cosmos SDK Module Development
    H3 What belongs in a custom module
    H3 Standard modules we configure (not rewrite)
    H3 How we engineer modules
H2  CometBFT Consensus and Block Production Design
H2  Choosing a Security Model: Sovereign PoS, Proof of Authority or Shared Security
H2  IBC Integration Services: Connecting Your Appchain
    H3 How IBC works: clients, connections, channels, packets
    H3 Interchain Accounts (ICA)
    H3 Interchain Queries (ICQ)
    H3 IBC middleware: forwarding, rate limits, callbacks
    H3 IBC v2: connecting to Ethereum and EVM networks
    H3 Relayer operations
    H3 IBC vs traditional bridges
H2  Smart Contracts on Your Appchain: Native Modules, CosmWasm or Cosmos EVM
H2  Staking, Governance and Tokenomics Design
    H3 Staking and slashing parameters
    H3 On-chain governance
    H3 Token supply, inflation and genesis allocation
    H3 Gas and fee models
H2  Validator and Node Infrastructure
H2  Wallet, Explorer and dApp Integration
H2  Security Engineering and Testing
H2  From Testnet to Mainnet: Our Launch Playbook
H2  After Mainnet: Upgrades, Monitoring and Maintenance
H2  What Teams Build With Cosmos Appchains (industry use cases)
H2  Our Cosmos SDK Development Process
H2  Cosmos Appchain Development Cost and Timeline
H2  Why Work With ClickMasters on Your Cosmos Appchain
H2  Frequently Asked Questions
H2  CTA: Book a Cosmos Appchain Architecture Review
```

**Why this order:**
1. Decide (is it right for us?)
2. Scope (what will you do?)
3. Understand (how does it work?)
4. Evaluate depth (modules → ops)
5. Validate fit (use cases)
6. Plan (process, cost)
7. Trust (why us)
8. Remove friction (FAQ)
9. Act (CTA)

## 5. Conversion strategy
- **Primary CTA:** "Book a Cosmos Appchain Architecture Review." This specialises the site's existing "Book a Free Strategy Call" and fits a technical buyer. It appears 4 times: hero, after the decision framework, after cost, and the final block.
- **Secondary CTA:** "Request an Appchain Feasibility Assessment", a paid or free discovery deliverable for undecided buyers. Its scope must be confirmed by ClickMasters.
- **Micro-conversions:** a link to the existing token-economics simulator (/calculators/token-economics-simulator) and the cost guide.
- **Friction reducers:** "NDA before the first meeting" (existing site claim). The code and IP ownership statement must be confirmed by ClickMasters. Deliverables are listed concretely.
- **Lead-quality fix:** add an "Appchain / Layer 1" option to the contact form (07-internal-linking.md §D).

## 6. Tone and style
- Engineering-first, plain US English, second person, and short paragraphs. Tables are used where buyers compare options.
- Explain jargon on first use. No hype words ("revolutionary", "cutting-edge"), and no unverifiable numbers.
- Be frank about trade-offs. This builds trust and matches the site's existing voice.

## 7. Length target
About 5,500–6,500 words of body content. That is longer than any competitor (the longest is ~4,000) because the page covers launch and operations topics nobody else covers, not because of padding. Tables and H3s keep it scannable. If the CMS template needs a shorter page, see the "trim order" note in 09-final-quality-review.md.
