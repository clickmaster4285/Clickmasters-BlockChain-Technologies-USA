# 03 — Oracle Technical Research

**Research date:** 26 November 2026
**Method:** Official documentation read directly where reachable. Where a doc page could not be fetched or its content was ambiguous, this is stated next to the fact. Facts marked **[UNVERIFIED]** must not appear on the page as hard claims.

> Why this matters: oracle products changed a lot in 2025–2026 (Chainlink Functions/Automation folded into CRE, Pyth Core moved onto the Pyth Pro backend, Band V3 narrowed to price data, RedStone renamed its delivery models, VRF v1/v2 shut down). Content written from memory or from 2024-era competitor pages will be wrong. The new page is written to stay accurate by describing **patterns** first and **products** second.

---

## 1. Fundamentals

### 1.1 What an oracle is
- ethereum.org defines oracles as applications that produce data feeds that make off-chain data sources available to smart contracts. Smart contracts cannot, by default, read information stored outside the blockchain. — https://ethereum.org/developers/docs/oracles/

### 1.2 Why blockchains cannot call an API
- Ethereum execution is deterministic: every node must reach the same result from the same inputs. If a contract fetched a live API value, nodes executing at different times could get different answers and consensus would break. The data must therefore be **written on-chain as a transaction** (or supplied in transaction calldata) so every node sees the same value. — ethereum.org (as above)
- Plain-language version for the page: *a blockchain is a group of computers that must agree on every result. If each one called a price API separately, they'd get slightly different numbers and could never agree. An oracle fetches the data once, proves or agrees on it, and hands every node the same value.*

### 1.3 Components (and who's who)
| Component | Role | Example |
|---|---|---|
| Data source / provider | Origin of the data | Exchange, market-data vendor, weather API, ERP, IoT gateway |
| Oracle node / operator | Off-chain software that fetches, signs, and reports data | Chainlink node operator, Pyth publisher, RedStone node, API3 first-party feed |
| Aggregation / consensus layer | Combines reports from many nodes/sources into one value | Chainlink OCR, Pythnet aggregation, Tellor/BandChain validators, DIA Lumina aggregator |
| On-chain oracle contract | Stores or verifies the value on the target chain | Chainlink aggregator + proxy, Pyth contract, API3 `Api3ReaderProxyV1`, RedStone adapter |
| Consumer contract | The client's contract that reads and acts on the data | Lending pool, insurance policy, game contract |

- ethereum.org describes the basic shape as an on-chain contract that receives requests / emits events plus off-chain nodes that fetch data and write results back.

### 1.4 Design patterns (ethereum.org)
- **Immediate-read** (data that's already on-chain and looked up directly), **publish-subscribe** (a data feed that is updated and read, e.g. ETH/USD), and **request-response** (contract asks for specific data; requester pays for the off-chain work and the callback gas). Pub-sub and request-response are the most common.

### 1.5 The oracle problem
- The core question is how to make sure the data is **correct** (authentic, untampered), **available** (keeps updating), and that reporters are **incentivised** to be honest. ethereum.org uses these three criteria — correctness, availability, incentive compatibility. — ethereum.org
- Decentralisation is a **spectrum**, not a binary (ethereum.org). Mechanisms include authenticity proofs (TLS proofs, TEE attestations), staking/voting, and Schelling-point schemes.

---

## 2. Oracle types (practical trade-offs)

| Type | What it is | Good for | Trade-off |
|---|---|---|---|
| Software oracle | Pulls from APIs, websites, databases | Prices, rates, scores, events | Only as good as the API and its availability |
| Hardware oracle | Data from sensors, RFID, IoT devices | Cold chain, logistics, energy metering | Device tampering and physical trust; needs attestation/secure hardware |
| Inbound oracle | Off-chain → on-chain | Most DeFi and parametric uses | — |
| Outbound oracle | On-chain event → off-chain action | Trigger payments, notify ERP, unlock a device | Off-chain system must trust the chain event and handle reorgs/finality |
| Centralised oracle | Single operator signs data | Internal enterprise data, low-value or permissioned apps | Single point of failure and trust (ethereum.org: weak correctness/availability guarantees) |
| Decentralised oracle network | Many independent nodes and/or sources aggregate | High-value DeFi, public apps | Higher cost, slower to add new data types, still depends on source quality |
| First-party oracle | Data provider runs the oracle and signs its own data | Removing middle layers (API3, Pyth publishers, DIA first-party trades) | Trust shifts to the provider's reputation and key management |
| Third-party oracle network | Independent node operators relay others' data | Broad coverage, operator diversity | Extra layer between source and contract |
| Cross-chain oracle | Data or messages across chains | Multi-chain apps, cross-chain collateral | Adds bridge/messaging risk; see Chainlink CCIP, Band IBC delivery |
| Computational oracle | Off-chain compute with result delivered on-chain | Heavy maths, randomness, ML scores, reserve proofs | Need to verify computation (DON consensus, TEEs, proofs) |
| Human-input / optimistic oracle | People assert answers, others can dispute | Event outcomes, insurance claims, subjective data (UMA, Tellor) | Delay (challenge window); relies on economic security and dispute participation |

---

## 3. Integration architecture (end-to-end)

1. **Data source** — choose primary and backup sources; check licensing (market-data licences often prohibit redistribution on public chains).
2. **Oracle node / provider infrastructure** — existing network (Chainlink, Pyth, RedStone, API3, etc.) or a custom node.
3. **Retrieval and validation** — schema checks, bounds, outlier filtering, signatures.
4. **Aggregation / consensus** — median of nodes/sources (Chainlink OCR), weighted aggregation (Pyth), medianised aggregator (DIA Lumina), validator signing (Tellor, BandChain), optimistic assertion (UMA).
5. **On-chain oracle contract** — stores the value (push) or verifies a signed update submitted with the user's transaction (pull).
6. **Consumer contract** — reads the value **and validates it** (staleness, bounds, sequencer status, confidence).
7. **Execution** — liquidate, settle, mint, pay out, or revert/pause if the data fails checks.

**How architecture changes by model:**
- *Push (Chainlink Data Feeds, API3 Market, RedStone Push, Supra push):* steps 1–5 run continuously regardless of demand; the consumer just reads.
- *Pull (Pyth, RedStone Pull, Chainlink Data Streams, Supra pull):* step 5 happens inside the user's transaction; the front end or keeper must fetch a signed update off-chain first.
- *Request-response / workflow (Chainlink CRE, Band request-based feeds):* the contract (or a trigger) initiates the job; the result arrives in a later callback or transaction.
- *Optimistic (UMA, Tellor):* a value is proposed and becomes final after a dispute window; consumers must wait or accept dispute risk.

---

## 4. Integration models — advantages and limits

| Model | Advantages | Limitations | Fits |
|---|---|---|---|
| Push data feeds | Simple read; always on-chain; works for any contract including liquidations triggered by anyone | Updates only on heartbeat/deviation → value can lag; operator pays gas so feed list per chain is limited | Lending, stablecoins, collateral valuation |
| Pull data feeds | Fresher prices at execution; many feeds on many chains; cost paid only when used | Integration touches the front end/keeper; user pays update cost; must enforce freshness yourself | Perps, options, DEXs, high-frequency apps |
| Request-response | Arbitrary data, custom APIs | Latency (two transactions), callback complexity, per-request cost | One-off lookups, settlement, KYC/credit checks |
| First-party API connectivity | Fewer intermediaries; provider-signed data | Fewer independent parties; depends on provider uptime/keys | Enterprises that own the data; premium data vendors |
| Decentralised oracle network | Operator diversity, no single key | Cost, onboarding time for new data types | High-value public DeFi |
| Custom oracle infrastructure | Any data, any chain, full control | You own uptime, security, key management, monitoring | Niche data, private chains, appchains |
| Hybrid on/off-chain compute | Heavy logic off-chain, verified result on-chain | Verification model must be explicit (DON, TEE, proofs) | Risk scoring, reserve checks, complex settlements |

---

## 5. Provider research (verified 26 Nov 2026)

### Chainlink — https://docs.chain.link/
- **Data Feeds** (push): consumers call `latestRoundData()` on a proxy, which returns `roundId, answer, startedAt, updatedAt, answeredInRound`. Nodes update when off-chain value moves past a **deviation threshold**, or when the **heartbeat** interval elapses. Parameters per feed are on data.chain.link. `answeredInRound` is deprecated. — https://docs.chain.link/data-feeds/using-data-feeds.md, https://docs.chain.link/data-feeds/historical-data.md
- **Developer responsibilities:** Chainlink's docs put the onus on integrators to add their own checks. — https://docs.chain.link/data-feeds/developer-responsibilities.md
- **Feed risk categories:** Low, Medium, High, Very High market risk, plus New Token, Custom, Deprecating, Unrated; custom feeds include single-source and calculated types; market-hours feeds (ETFs, FX, metals) should be used only during trading windows. — https://docs.chain.link/data-feeds/selecting-data-feeds.md
- **Shutdown behaviour:** after a feed is shut down, `latestAnswer` returns 0 and `latestRoundData` reverts — consumers need a plan for this. (same docs)
- **L2 Sequencer Uptime Feeds:** answer 0 = up, 1 = down; `startedAt` used to enforce a grace period after recovery (docs example 3600 s). Chainlink states it is **no longer expanding** these feeds to new networks; existing feeds continue (mainnet list includes Arbitrum, Base, OP, Scroll, ZKsync, Mantle, Metis, Celo and others). — https://docs.chain.link/data-feeds/l2-sequencer-feeds.md
- **Data Streams** (pull, low latency): recommended by Chainlink for apps needing lower latency than Data Feeds. — https://docs.chain.link/data-feeds/selecting-data-feeds.md (Data Streams page itself returned only a title.)
- **VRF v2.5:** random values delivered with a proof verified on-chain before use; subscription or direct funding; payment in LINK or native token. **VRF v1 and v2 were deprecated 29 Nov 2024 and shut down in November 2026** (v1: 18 Nov 2026; v2: 30 Nov 2026). — https://docs.chain.link/vrf.md
- **CCIP:** cross-chain messaging and token transfers; docs reference "CCIP 2.0" (cross-chain verifiers, compliance, configurable settlement speeds). — https://docs.chain.link/ccip.md
- **CRE (Chainlink Runtime Environment):** workflows built with the `cre` CLI and SDK (Go/TypeScript) using triggers (e.g. cron) and capabilities (HTTP, EVM read, EVM write). — https://docs.chain.link/cre/getting-started/overview.md
- **Functions and Automation → CRE:** Chainlink's docs index (https://docs.chain.link/llms.txt) labels Functions and Automation as sunset and points new automation/API work to CRE. Chainlink announced in 2026 that Functions and Automation have been upgraded from stand-alone services to CRE workflows (Chainlink on X; secondary coverage). The Functions docs reference a mainnet sunset of 30 June 2026. **Treat exact dates as [CONFIRM ON DOCS] — secondary sources conflict.**
  - **Implication for ClickMasters:** existing pages `/howto/how-to-implement-chainlink-automation` and `/partners/blockchain-partner-chainlink` describe Automation/Keepers as current. Flag for update. The new page refers to "Chainlink CRE (which now covers what Functions and Automation used to do)".
- Any API is legacy per the docs index.

### Pyth Network — https://docs.pyth.network/
- **Pull model** verified: the EVM guide calls `getUpdateFee(update)`, then `updatePriceFeeds{value: fee}(update)`, then `getPriceNoOlderThan(id, maxAge)`, which reverts with `StalePrice` if too old. — https://docs.pyth.network/price-feeds/core/use-real-time-data/pull-integration/evm
- Updates fetched from **Hermes** (REST and streaming endpoints).
- Prices published with a **confidence interval**; best-practice guidance includes using EMA price or pausing when confidence/price is too wide. Values are fixed-point (`value × 10^exponent`).
- Data comes from **first-party publishers** (exchanges, trading firms).
- **Fees:** docs state Core update fees were removed on EVM, Solana and Sui following governance proposal OP-PIP-128. — https://docs.pyth.network/pro/on-chain-fees **[do not put fee amounts on the page; say "check current fees"]**
- **Product change:** Pyth Core contracts were upgraded on 26 Aug 2026 to use the **Pyth Pro** backend, keeping the same interface; docs now lead with Pyth Pro (configurable feeds/update schedules for subscribers).
- **Entropy**: Pyth's on-chain RNG for EVM chains (commit-reveal). — https://docs.pyth.network/entropy

### API3 — https://docs.api3.org/
- Current docs lead with **API3 Market** (catalogue of feeds on major EVM networks; buy a plan, no sales call) and **OEV Rewards** (API3 says it returns 80% of oracle-extractable-value revenue to the dApp).
- Read via `Api3ReaderProxyV1.read()` → `(int224 value, uint32 timestamp)`, 18 decimals; proxy also implements Chainlink's `AggregatorV2V3Interface`. Docs warn that `timestamp` is the off-chain reported time, so don't require `timestamp <= block.timestamp`. — https://docs.api3.org/dapps/integration/contract-integration.html
- Market plans: deviation thresholds 5% / 2.5% / 1% / 0.5% / 0.25% with a 24 h heartbeat. — https://docs.api3.org/dapps/integration/
- API3 describes itself as a first-party oracle solution (its own claim). **Airnode docs URLs returned 404 — do not describe Airnode as the current integration path without checking.**

### Band Protocol — https://docs.bandchain.org/
- Built on **BandChain**, a Cosmos SDK chain. Data delivered cross-chain via **IBC** or third-party cross-chain messaging; native TSS verification mentioned.
- **V3 upgrade: BandChain focuses exclusively on price data.** Don't present Band as a general-purpose API oracle.
- Also lists Band VRF, Signaling Hub, Data Tunnel.

### RedStone — https://docs.redstone.finance/
- **Pull:** signed data packages injected into the user's transaction calldata; contract extends a consumer base and calls e.g. `getOracleNumericValueFromTxMsg`. — https://docs.redstone.finance/docs/stage1-market-data/price-feeds/pull-model/
- **Push:** built on pull; a relayer writes to a `PriceFeedsAdapter` on time or deviation conditions, with optional Chainlink-compatible wrapper. — .../push-model/
- Current docs list multiple products (Push, Pull, Bolt, Live, Proof of Reserve, Atom, others). The 2024 "Core/Classic/X" naming is older — **use "pull" and "push" on the page**.

### UMA — https://docs.uma.xyz/
- "An optimistic oracle and dispute arbitration system." OOv2 (request → third-party proposer answers) and OOv3 (integrations make assertions) are live. — https://docs.uma.xyz/
- Proposals post a bond; anyone can dispute during the **liveness** window (set per request); disputes escalate to the **DVM**, resolved by UMA token-holder vote. — https://docs.uma.xyz/developers/optimistic-oracle/internal-optimistic-oracle.md
- Default liveness/bond values **[UNVERIFIED — don't state numbers]**.

### Tellor — https://docs.tellor.io/
- Tellor now runs its own Layer 1 ("Tellor is a Layer 1 blockchain built for... consensus on any subjective data"); reporters stake and earn TRB; validators sign aggregated values before relaying to other chains.
- Whitepaper: disputes with tiered fees; consumers using non-robust values should allow time for disputes before relying on them; no fixed delay given. — https://docs.tellor.io/tellor/whitepaper

### DIA — https://www.diadata.org/docs/
- Sources first-party trades from DEXs/CEXs; methodology inspectable; custom feeds; **Lumina** = newer stack on an Ethereum L2 rollup (feeders → pods → medianising aggregator), running alongside the older "DIA Nexus". DIA states availability on 65+ EVM and WASM chains (vendor claim). — https://www.diadata.org/lumina/
- docs.diadata.org returned HTTP 403 to automated fetch.

### Supra — https://docs.supra.com/
- Push and pull price feeds, dVRF (distributed VRF), automation, and SupraNova bridge; separate SupraEVM/SupraMVM. Product name "DORA" not found in current docs — don't use.

### Chronicle — https://docs.chroniclelabs.org/
- Started in 2017 inside MakerDAO (now Sky), independent since 2023. **Scribe** uses Schnorr signature aggregation for near-constant verification gas. Production read access requires **whitelisting**. Now also markets "Proof of Asset". TVS figures are vendor claims.

---

## 6. Network compatibility — what we can and cannot say

| Network | Verified facts | How to phrase on the page |
|---|---|---|
| Ethereum | Supported by every provider researched | "Ethereum mainnet and testnets" |
| Arbitrum, Base, OP Mainnet | Listed in Chainlink L2 sequencer feed networks; must handle sequencer downtime | Mention sequencer-uptime checks explicitly |
| Polygon, BNB Chain, Avalanche | Common EVM targets; feed availability varies per asset | "Feed availability differs by chain and asset — we check before design" |
| Solana | Pyth originated on Solana; Rust/Anchor integration differs from EVM | Mention as non-EVM with different integration code |
| Cosmos appchains | Band delivers via IBC | Link to Cosmos SDK appchain page |
| Private/permissioned chains | Public oracle networks usually unavailable | Custom or first-party oracle |

**Rule:** no provider supports every asset on every chain. Each provider publishes per-network address lists. The page must say feed availability is checked per asset per chain during discovery.

ClickMasters' site has technology pages for Ethereum, Polygon, Solana, Arbitrum, Base, BNB Chain and Avalanche (see 07). Homepage also lists Optimism.

---

## 7. Security and reliability

| Risk | What goes wrong | Mitigation |
|---|---|---|
| Spot-price manipulation | Contract reads a DEX spot price that a flash loan can move within one block | Never use spot AMM price as an oracle; use aggregated feeds; TWAP only as a secondary check and only with deep liquidity |
| Thin/illiquid market data | Even an honest oracle reports a manipulated market (low-liquidity token) | Check feed risk category; supply caps; collateral factors; avoid "New Token"/single-source feeds for collateral |
| Stale data | Feed stops updating; push value lags during volatility | Check `updatedAt` vs heartbeat; Pyth `getPriceNoOlderThan`; reject or pause |
| L2 sequencer downtime | Prices can't update while users on L1 can force transactions | Chainlink sequencer uptime feed + grace period |
| Wrong decimals / units | Value off by 10^x | Read `decimals()`; normalise; unit tests per feed |
| Zero / negative / out-of-bounds answers | Feed returns 0 after shutdown, or bad value | Bounds checks; circuit breaker; `latestRoundData` revert handling (try/catch) |
| Wide confidence | Pyth confidence interval unusually wide | Pause or use conservative price |
| Single point of failure | One node / one key / one API | Multi-source aggregation; operator diversity; fallback oracle |
| Optimistic dispute window | Value can be overturned | Wait for finality or size exposure to bond economics |
| Market-hours feeds | FX/equity feeds stale outside trading hours | Gate usage to trading windows |
| Admin / upgrade risk | Feed proxy or your own oracle config changed maliciously | Timelocks, multisig, access control (OpenZeppelin), monitoring config changes |
| Off-chain key compromise (custom oracle) | Attacker signs fake data | HSM/KMS keys, threshold signing, rotation, rate limits |

**Fallback strategy patterns:** primary + secondary oracle with deviation check between them; pause-on-disagreement; graceful degradation (block new borrows but allow repayments); manual governance override behind a timelock.

**Monitoring:** alert on time since last update, deviation between providers, gas balance of relayers/subscriptions, sequencer status, and config changes.

**Honest framing:** decentralised oracles reduce single-operator trust but do not remove source risk, market manipulation of thin markets, integration bugs, or downtime. Chainlink's own docs place responsibility on integrators for checks.

---

## 8. Use cases (problem → data → mechanism → contract action → limits)

| Use case | External data | Typical mechanism | What the contract does | Key limits |
|---|---|---|---|---|
| DeFi price feeds / lending | Asset/USD prices | Push feeds (sometimes + pull for fresh execution) | Values collateral, sets borrow limits, triggers liquidation | Stale data in fast markets; thin-liquidity tokens |
| Liquidations | Prices + time | Push feed read by keepers; pull update bundled into liquidation tx | Permits liquidation when health factor < 1 | Keeper must be reliable (CRE workflow or own bot) |
| Derivatives / perps | Low-latency prices | Pull (Pyth, Data Streams, RedStone) | Settles PnL, funding, margin | Latency races; confidence handling |
| Stablecoins | Collateral prices; proof of reserves | Push feeds; reserve feeds | Mint/redeem limits, peg mechanisms | Reserve attestations are only as good as the auditor/custodian |
| Parametric insurance | Weather, flight status, event data | Request-response / CRE workflow, or optimistic oracle (UMA) | Pays out when a threshold is met | Data licensing; single API risk; dispute windows |
| RWA tokenisation | NAV, interest rates, reserves, FX | Custom/first-party feed, proof-of-reserve | Updates token NAV, gates minting, distributes yield | Off-chain legal truth; data updates may be daily, not real-time |
| Supply chain | IoT sensor readings, shipment scans | Hardware → gateway → custom/first-party oracle | Records custody events, releases payment on delivery | Physical tampering; oracle can't verify the box contents |
| Gaming / NFTs | Random numbers | Chainlink VRF v2.5, Pyth Entropy, Supra dVRF | Loot, reveals, matchmaking | Callback gas limits; request→fulfil delay; never use block hash |
| Cross-chain apps | Messages, token state | CCIP, IBC (Band), others | Sync state/collateral across chains | Adds messaging/bridge risk |
| Enterprise integration | ERP, CRM, bank APIs | Custom adapter / first-party signer / CRE HTTP capability; outbound oracle back to ERP | Automates settlement; emits events consumed off-chain | Data privacy; may not need a decentralised network at all |
| Automated execution | Time, events, conditions | CRE workflows (replacing Chainlink Automation), other keeper networks, or own keepers | Runs rebalances, payouts, expirations | Workflow funding and monitoring |

Not every use case needs a decentralised network: internal enterprise data on a permissioned chain may be best served by a signed first-party oracle with audit logs.

---

## 9. Sources

- ethereum.org Oracles — https://ethereum.org/developers/docs/oracles/
- Chainlink docs index — https://docs.chain.link/llms.txt
- Chainlink Using Data Feeds — https://docs.chain.link/data-feeds/using-data-feeds.md
- Chainlink Developer Responsibilities — https://docs.chain.link/data-feeds/developer-responsibilities.md
- Chainlink Selecting Data Feeds — https://docs.chain.link/data-feeds/selecting-data-feeds.md
- Chainlink L2 Sequencer Uptime Feeds — https://docs.chain.link/data-feeds/l2-sequencer-feeds.md
- Chainlink VRF — https://docs.chain.link/vrf.md
- Chainlink CCIP — https://docs.chain.link/ccip.md
- Chainlink CRE — https://docs.chain.link/cre/getting-started/overview.md
- Chainlink push vs pull explainer — https://chain.link/education-hub/pull-oracles-vs-push-oracles
- Pyth EVM pull integration — https://docs.pyth.network/price-feeds/core/use-real-time-data/pull-integration/evm
- Pyth on-chain fees — https://docs.pyth.network/pro/on-chain-fees
- Pyth Entropy — https://docs.pyth.network/entropy
- API3 integration — https://docs.api3.org/dapps/integration/ and https://docs.api3.org/dapps/integration/contract-integration.html
- BandChain overview — https://docs.bandchain.org/introduction/overview
- RedStone pull / push — https://docs.redstone.finance/docs/stage1-market-data/price-feeds/pull-model/ and .../push-model/
- RedStone push vs pull blog — https://www.redstone.finance/blog/pull-oracles-vs-push-oracles/
- UMA — https://docs.uma.xyz/ and https://docs.uma.xyz/developers/optimistic-oracle/internal-optimistic-oracle.md
- Tellor whitepaper — https://docs.tellor.io/tellor/whitepaper
- DIA Lumina — https://www.diadata.org/lumina/ and https://www.diadata.org/docs/
- Supra — https://docs.supra.com/
- Chronicle — https://docs.chroniclelabs.org/understandingChronicle
- Chainlink Functions/Automation → CRE announcement (secondary) — https://x.com/chainlink/status/2085355413898166378 ; https://www.cryptowisser.com/news/chainlink-folds-functions-and-automation-into-unified-cre-workflows/

### Not verified (do not state as fact)
- Exact Functions/Automation sunset dates (sources conflict).
- UMA default liveness and bond sizes.
- API3 Airnode current status (docs 404'd).
- Per-chain feed lists for any provider (must be checked per project).
