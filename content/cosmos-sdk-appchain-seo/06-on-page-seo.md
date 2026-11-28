# 06 — On-Page SEO Specification

## 1. Core elements

| Element | Recommendation | Notes |
|---|---|---|
| **Primary keyword** | cosmos sdk appchain development | Matches URL slug; see 02 §1 |
| **SEO title** (≤60 chars) | `Cosmos SDK Appchain Development Services \| Clickmasters` (55 chars) | Follows the site pattern "{Topic} \| Clickmasters". Deliberately **omits "Cosmos SDK Development Services"**, which /technologies/cosmos-blockchain-development currently uses as its title (cannibalisation guard). |
| Alternative title (A/B) | `Cosmos SDK Appchain Development Company \| Clickmasters` (54) | Use if Search Console shows "company" queries dominating impressions |
| **Meta description** (≤155 chars) | `Build a sovereign Cosmos SDK appchain: custom Go modules, CometBFT, IBC to Cosmos and Ethereum, validators and mainnet launch. Book an architecture review.` (155 chars) | Replaces the current meta, which just repeats the H1 |
| **H1** | `Cosmos SDK Appchain Development Services` | Exactly one H1. The current H1 ("…— Building Your Own Application-Specific Blockchain") is replaced. |
| **Subheading (H2 under H1, or styled `<p class="lead">`)** | `Design, build and launch an application-specific blockchain that you control` | Carries the secondary phrase "application-specific blockchain". If the template only allows one heading before content, render it as a styled paragraph rather than an H2 to keep the outline clean. |
| **URL** | Keep `/service/cosmos-sdk-appchain-development` | Do not change (per brief) |
| **Canonical** | `<link rel="canonical" href="https://clickmastersblockchaintechnologies.com/service/cosmos-sdk-appchain-development">` | Self-referencing, absolute, no trailing slash (matches the site's current pattern) |
| **Robots** | `index, follow` | Current setting is correct |
| **Open Graph** | og:title = SEO title; og:description = meta description; **og:type = `website`** (currently `article`, which is wrong for a service page); og:image = the hero image below (1200×630) | |
| **Twitter card** | `summary_large_image` with the same title, description and image | |
| **Breadcrumb (visible)** | Home / Services / Cosmos SDK Appchain Development | The template currently uses the full H1 as the last crumb; shorten it |

## 2. Secondary keyword mapping

| Keyword | Placement in 05 |
|---|---|
| cosmos sdk development services | "What Our Cosmos SDK Appchain Development Services Cover" H2 (close variant); body |
| cosmos sdk development company | "Why Work With ClickMasters…" section body; alt title |
| cosmos appchain development (company) | Intro, "Why Work With ClickMasters on Your Cosmos Appchain" H2, cost H2 |
| custom cosmos blockchain development | Services table intro and modules section (as "custom Cosmos SDK module development") |
| application-specific blockchain (development) | Subheading, FAQ 1, decision framework |
| sovereign blockchain | Intro ("sovereign, application-specific blockchain"), security model section |
| IBC integration services | H2 "IBC Integration Services: Connecting Your Appchain" |
| interchain accounts / interchain queries | H3s under IBC |
| CosmWasm / Cosmos EVM development | H2 "Smart Contracts on Your Appchain…" |
| CometBFT consensus | H2 "CometBFT Consensus and Block Production Design" |
| cosmos validator infrastructure / node infrastructure | H2 "Validator and Node Infrastructure" |
| tokenomics / gas fee model / staking / governance | H2 "Staking, Governance and Tokenomics Design" + H3s |
| testnet / mainnet deployment / genesis | H2 "From Testnet to Mainnet: Our Launch Playbook" |
| chain upgrades / maintenance | H2 "After Mainnet: Upgrades, Monitoring and Maintenance" |
| cosmos appchain cost / timeline | H2 "Cosmos Appchain Development Cost and Timeline" + FAQs |
| cosmos sdk vs substrate | FAQ |

**Density check:** the exact primary phrase appears 6 times in ~7,300 published words: H1, intro, "Why Work With ClickMasters" intro, FAQ question, FAQ answer, and the final CTA H2. That is natural, and no further insertion is needed. Semantic coverage comes from the entities in 02 §3.

## 3. Heading hierarchy (final, as implemented in 05)

```
H1 Cosmos SDK Appchain Development Services
  [lead paragraph, bold, not a heading] Design, build and launch an application-specific blockchain that you control.
  H2 Do You Need a Cosmos Appchain? A Decision Framework
    H3 Signals an appchain is the right architecture
    H3 Signals you should not build one (yet)
    H3 Appchain vs smart contracts vs rollup vs permissioned chain
  H2 What Our Cosmos SDK Appchain Development Services Cover
  H2 Cosmos SDK, CometBFT, IBC and the Cosmos Hub: How an Appchain Fits Together
  H2 Custom Cosmos Blockchain Development: SDK Modules for Your Business Logic
    H3 What belongs in a custom module
    H3 Standard modules we configure, not rewrite
    H3 How we engineer modules
  H2 CometBFT Consensus and Block Production Design
  H2 Choosing a Security Model: Sovereign PoS, Proof of Authority or Shared Security
  H2 IBC Integration Services: Connecting Your Appchain
    H3 How IBC works, in brief
    H3 Interchain Accounts (ICA)
    H3 Interchain Queries (ICQ)
    H3 IBC middleware: forwarding, rate limits and callbacks
    H3 IBC v2: connecting to Ethereum and EVM networks
    H3 Relayer operations
    H3 IBC vs traditional bridges
  H2 Smart Contracts on Your Appchain: Native Modules, CosmWasm or Cosmos EVM
    H3 CosmWasm in practice
    H3 Cosmos EVM in practice
  H2 Staking, Governance and Tokenomics Design
    H3 Staking and slashing parameters
    H3 On-chain governance
    H3 Token supply, inflation and genesis allocation
    H3 Gas and fee models
  H2 Validator and Node Infrastructure
  H2 Wallet, Explorer and dApp Integration
  H2 Security Engineering and Testing
  H2 From Testnet to Mainnet: Our Launch Playbook
  H2 After Mainnet: Upgrades, Monitoring and Maintenance
  H2 What Teams Build With Cosmos Appchains
    H3 Reference architecture: a perpetuals DEX appchain
  H2 How a Cosmos Appchain Engagement Runs
  H2 Cosmos Appchain Development Cost and Timeline
  H2 Why Work With ClickMasters on Your Cosmos Appchain
  H2 Frequently Asked Questions
    H3 ×17 questions
  H2 Start Your Cosmos SDK Appchain Development With an Architecture Review
```
Totals: 1 H1, 20 H2, 37 H3. CTAs appear in 6 places: hero, after the decision framework, after IBC, after launch, after cost, and the final block.

**Template note:** the existing service template adds its own H2 blocks ("Technical deliverables", "Integrations", "Timeline", "Quick estimate", "Focus Areas", "Project Details", "Related services", "Related guides").
- **Disable or replace** "Technical deliverables", "Integrations" and "Timeline". Their current contents are EVM boilerplate (e.g. "Auditable smart contract source code", The Graph, OpenZeppelin Defender, and a 3–8 week build). That boilerplate contradicts this page.
- If they cannot be removed, populate them from 05: the deliverables column of the process table, the IBC/relayer/wallet integrations, and the timeline table.
- Keep "Related services/guides" but update their links per 07 §A.

## 4. Images

Use original diagrams. No stock "glowing blockchain" imagery. All images in WebP, with explicit width/height (CLS), `loading="lazy"` except the hero, and compressed under ~120 KB.

| # | Placement | Content brief | Filename | Alt text |
|---|---|---|---|---|
| 1 | Hero | Layered diagram: your custom modules on top of the Cosmos SDK standard modules, CometBFT beneath, IBC connections out to other chains and Ethereum | `cosmos-sdk-appchain-architecture-overview.webp` | Cosmos SDK appchain architecture showing custom modules, CometBFT consensus and IBC connections |
| 2 | Decision framework | Visual decision tree: smart contract → rollup → sovereign appchain → permissioned chain | `appchain-vs-smart-contract-vs-rollup-decision-tree.webp` | Decision tree comparing smart contracts, rollups and Cosmos appchains |
| 3 | Architecture H2 | ABCI 2.0 flow: PrepareProposal → ProcessProposal → ExtendVote → FinalizeBlock → Commit between CometBFT and the SDK app | `abci-2-cometbft-cosmos-sdk-block-flow.webp` | ABCI 2.0 block flow between CometBFT and a Cosmos SDK application |
| 4 | Modules H2 | Module anatomy: keeper, Msg server, query server, store, ante handler, begin/end block hooks | `cosmos-sdk-custom-module-anatomy.webp` | Anatomy of a custom Cosmos SDK module with keeper, message server and store |
| 5 | IBC H3 "How IBC works" | Two chains with light clients, connection, channel, packet → ack/timeout, relayer in between | `ibc-light-clients-connections-channels-packets.webp` | How IBC works: light clients, connections, channels and packets relayed between two chains |
| 6 | IBC v2 H3 | Cosmos appchain ↔ Ethereum via IBC v2 contracts and proof-based light client; attestation path shown dashed | `ibc-v2-cosmos-ethereum-connection.webp` | IBC v2 connection between a Cosmos appchain and Ethereum |
| 7 | Validator H2 | Validator behind sentry nodes, remote signer/HSM, public RPC tier, monitoring stack | `cosmos-validator-sentry-node-architecture.webp` | Cosmos validator infrastructure with sentry nodes, remote signer and monitoring |
| 8 | Launch H2 | Timeline: devnet → internal testnet → public testnet → gentx window → genesis → mainnet | `cosmos-appchain-testnet-to-mainnet-launch-timeline.webp` | Cosmos appchain launch timeline from devnet to mainnet genesis |
| 9 | Upgrades H2 | Governance proposal → upgrade height → halt → Cosmovisor binary swap → store migration | `cosmos-chain-upgrade-cosmovisor-flow.webp` | Cosmos SDK chain upgrade flow using governance and Cosmovisor |
| 10 | OG/social | Hero diagram cropped 1200×630 with the page title | `cosmos-sdk-appchain-development-og.webp` | Cosmos SDK appchain development services by ClickMasters |

## 5. Additional on-page recommendations
- **Tables:** render as real HTML `<table>` elements (with `<th scope>`), not images. They are good candidates for rich results and AI-overview extraction.
- **FAQ:** render as visible content (accordion is fine if the text is in the HTML on load).
- **Jump links:** add a sticky table of contents with anchor links to each H2. The page is long, and this helps both UX and sitelinks.
- **Editor notes:** every `[EDITOR NOTE]` block in 05 must be removed or resolved before publishing.
- **Last-updated date:** show "Technical details reviewed: November 2026" near the footer of the page. This is honest and signals freshness, and it matters for a fast-moving stack. Update it whenever 03 is re-verified.
- **Author / reviewer box (E-E-A-T):** add "Reviewed by [Name], [Role]", with a link to a real engineer profile, once ClickMasters supplies one. Omit it otherwise.
- **Core Web Vitals:** the diagrams should be SVG or WebP, and no heavy scripts should run above the fold.
- **External links:** two or three authoritative outbound links help credibility, for example docs.cosmos.network, ibcprotocol.dev and github.com/cosmos/cosmos-sdk. Open them in the same tab, no nofollow needed. The draft deliberately keeps them out of the body copy, so add them to a short "Further reading" line under the FAQ if the template allows.

## 6. Cannibalisation summary
| Page | Title (recommended) | Role |
|---|---|---|
| /service/cosmos-sdk-appchain-development | Cosmos SDK Appchain Development Services \| Clickmasters | Commercial service: build and launch |
| /technologies/cosmos-blockchain-development | *Recommend:* Cosmos SDK Technology Overview: Modules, IBC & CosmWasm \| Clickmasters | Informational hub |
| /technologies/polkadot-development | unchanged | Substrate owner |

Also recommended: update the Cosmos technologies page FAQ cost answer and this page's cost section so they say the same thing (see the editor note in 05).
