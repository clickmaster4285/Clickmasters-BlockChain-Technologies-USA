# 03 — Technical Research: Cosmos Stack (verified 26 Nov 2026)

**Purpose:** a fact base for 05-new-cosmos-appchain-content.md. Every claim the page relies on is listed here with its source.

**Method:** sources were read directly (GitHub repositories, release tags, go.mod files, CHANGELOGs, and docs.cosmos.network). Key claims were then spot-checked again independently:
- SDK v0.55.1 go.mod pins CometBFT v0.40.0.
- The release-family page says CometBFT v1.x was retracted.
- The Gaia CHANGELOG records removal of the Interchain Security provider module.
- An ibc-go v11.2.0 tag exists.
- The CometBFT README confirms the Tendermint fork lineage.
- Multiple outlets report the Leap Wallet shutdown.

Items marked **[UNVERIFIED]** could not be confirmed from a primary source in this session. The content avoids relying on them.

> ⚠️ **The Cosmos stack changed a lot in 2025–2026.** Many third-party pages, including most competitor pages, are now wrong about Interchain Security, CometBFT v1, Leap Wallet, Sei and x/params. **Re-check this file's version table before publishing and every 6 months after.**

---

## 1. Version and stewardship snapshot

| Component | Current state (Nov 2026) | Source |
|---|---|---|
| **Release families** | Cosmos Labs supports **at most two "release families"** at once and targets two new families a year. **2026.1** = SDK 0.55.x · CometBFT 0.40.x · Cosmos EVM 0.7.x · Enterprise Groups/PoA 1.x. **2025.1** = SDK 0.53.x · CometBFT 0.38.x · Cosmos EVM 0.6.x. SDK ≤0.50, CometBFT ≤0.37 and Cosmos EVM ≤0.5 are EOL. | https://docs.cosmos.network/sdk/latest/release-family.md |
| **Cosmos SDK** | v0.55.1 / v0.54.5 (14 Nov 2026). v0.54.0–0.54.4 are retracted. v0.53.x is still supported. | https://github.com/cosmos/cosmos-sdk/releases |
| **CometBFT** | v0.40.0 (Jul 2026); v0.39.x and v0.38.x still patched. **v1.0.x is retracted. Do not present v1 as current.** | https://github.com/cometbft/cometbft/releases ; release-family page |
| **ibc-go** | v11.2.0 (Jul 2026). The repo moved to `lfdt-ibc/ibc-go` (old path redirects). IBC is now an **LF Decentralized Trust** project. | https://github.com/cosmos/ibc-go ; https://ibcprotocol.dev/ |
| **CosmWasm / wasmd** | CosmWasm 3.x (3.0 released Jun 2025, adds IBC v2 entry points); wasmd v0.70.5 (Oct 2026), built on SDK v0.54 and ibc-go v11.2. No wasmd release targets SDK v0.55 yet. | https://github.com/CosmWasm/wasmd ; https://medium.com/cosmwasm/fd84d72c2d35 |
| **Cosmos EVM** | v0.7.4 (Nov 2026), Apache-2.0, still **pre-v1** (README: stable only at v1 after audit and benchmarking). Gas token must have 18 decimals. Users listed in the README: Ondo, Mezo, Mantra, XRP sidechain, TAC, Stable. | https://github.com/cosmos/evm |
| **Stewardship** | The ICF acquired Skip (Dec 2024). Skip became Interchain Labs, then **Cosmos Labs** (Sep 2025). Cosmos Labs maintains the SDK, CometBFT and Cosmos EVM, and acquired Mintscan (Jun 2026). | https://cosmos.network/blog/interchain-labs-becomes-cosmos-labs ; https://cosmos.network/blog/cosmos-labs-mintscan-and-team |
| **Cosmovisor** | v1.7.3 (Aug 2026) | cosmos-sdk releases |
| **Ignite CLI** | v29.x stable; v30 in RC (scaffolds SDK 0.55, ibc-go 11.2, CometBFT 0.40) | https://raw.githubusercontent.com/ignite/cli/main/changelog.md |

### Notable recent SDK changes (all relevant to new builds)
- **v0.50 (2023, now EOL):** ABCI 2.0 (FinalizeBlock, vote extensions, PrepareProposal/ProcessProposal), Optimistic Execution (opt-in), PreBlocker, mandatory AutoCLI, IAVL v1.
- **v0.53 (Apr 2025):** opt-in **unordered transactions** (ADR-070, TTL via `timeout_timestamp`), x/epochs, custom `MintFn` for x/mint, a CheckTx handler hook.
- **v0.54 (Apr 2026):** **Block-STM parallel execution** (opt-in). Log v2 and OpenTelemetry. CometBFT v0.39: experimental libp2p, AdaptiveSync, app-side mempool. x/circuit, x/nft and x/crisis deprecated and moved to `contrib/`. Benchmarks published by Cosmos Labs are vendor figures; **the page does not quote TPS numbers.**
- **v0.55 (Jul 2026), "Ledger Security":**
  - validator **consensus-key rotation** (`MsgRotateConsPubKey`)
  - **post-quantum ML-DSA-65 keys** for consensus and accounts
  - app-side mempool ABCI methods (InsertTx/ReapTxs)
  - x/params and x/protocolpool **removed**
  - SIGN_MODE_TEXTUAL removed
  - ships **cosmos-kms** v1.0 as the official remote signer
  - begins **TMKMS deprecation**

  Sources: https://docs.cosmos.network/sdk/latest/upgrade/v0.55-release ; https://github.com/cosmos/cosmos-sdk/blob/main/UPGRADING.md
- **Enterprise modules licensing:** `enterprise/group` (formerly x/group) and the new **PoA** module ship under a **Source Available Evaluation License** from Cosmos Labs; commercial production use requires a licence. The core SDK remains Apache-2.0. Source: https://raw.githubusercontent.com/cosmos/cosmos-sdk/main/enterprise/README.md
- **Module set in v0.55 `x/`:** auth, authz, bank, consensus, distribution, epochs, evidence, feegrant, genutil, gov, mint, slashing, staking, upgrade.

---

## 2. Cosmos SDK architecture (for the "how it works" section)
- **Language:** Go. Applications are compiled into a single node binary.
- **BaseApp:** the boilerplate that implements ABCI, routes messages to modules and manages state commits.
- **ABCI 2.0 (ABCI++):** the interface between the consensus engine and the application. Methods:
  - InitChain, CheckTx, Query
  - **PrepareProposal / ProcessProposal** (the proposer builds a block; validators accept or reject it)
  - **ExtendVote / VerifyVoteExtension** (validators attach data such as oracle prices to precommits)
  - **FinalizeBlock** (executes the block)
  - Commit
  - snapshot methods for state sync

  Source: https://raw.githubusercontent.com/cometbft/cometbft/v0.40.0/spec/abci/abci++_methods.md
- **Modules** (`x/...`): self-contained units that own a slice of state, each with:
  - a **keeper**, which controls access to its store; modules interact only through keeper interfaces (object-capability style)
  - **Msg services** (protobuf-defined state transitions) and **Query services** (gRPC; REST through gRPC-gateway)
  - genesis import/export
  - optional PreBlocker/BeginBlock/EndBlock hooks
- **Ante handler:** pre-execution checks (signature verification, fee deduction, gas metering). This is the place for custom fee logic.
- **App wiring:** depinject or manual wiring in app.go. Docs cover both.
- **Store:** multistore of IAVL trees (IAVL v1.2.x). Each module gets its own KV store, committed to a single app hash.
- **Upgrades:** `x/upgrade` schedules a software upgrade at a height through governance. The node halts at that height, and **Cosmovisor** swaps the binary. The new binary runs **in-place store migrations** (`RunMigrations`) inside an upgrade handler.
- **Default pruning:** keeps 362,880 recent states (`app.toml`). Options are nothing / everything / custom. `minimum-gas-prices` is set per node.

Sources: https://docs.cosmos.network/sdk/latest ; https://raw.githubusercontent.com/cosmos/cosmos-sdk/v0.55.1/server/config/toml.go
**[UNVERIFIED this session but standard and long-documented]:** BaseApp/keeper/depinject descriptions. They were not refetched; the wording is kept general.

---

## 3. CometBFT
- **Lineage:** "CometBFT is a fork of Tendermint Core and implements the Tendermint consensus algorithm." The fork happened in late 2022/early 2023 after Tendermint Core was archived. **Use "CometBFT"; mention Tendermint only as history.** Source: https://raw.githubusercontent.com/cometbft/cometbft/v0.40.0/README.md
- **Properties:**
  - Byzantine fault tolerant: safety holds while less than one-third of voting power is faulty.
  - Blocks are committed with more than two-thirds of precommits, giving **deterministic (single-block) finality**, with no probabilistic reorgs.
  - Validators are weighted by stake.
  - Docs now live at docs.cosmos.network/cometbft.
- **Tunable consensus timeouts** (`config.toml`): timeout_propose, timeout_prevote, timeout_precommit and timeout_commit. These, plus network latency and validator count/geography, decide block time. **The page makes no TPS or latency promises.**
- **Mempool options:** flood (default), nop, app (app-side mempool in v0.39+).
- **Metrics:** Prometheus endpoint (disabled by default; port 26660).
- **State sync:** a light-client-verified snapshot restore for fast node bootstrapping.

Source: https://docs.cosmos.network/cometbft/next/docs/core/configuration

---

## 4. IBC
- **IBC v1 ("classic") stack:**
  - **light clients** verify the counterparty's consensus state (e.g. 07-tendermint)
  - **connections** pair two clients through a four-step handshake
  - **channels** connect application modules (ordered or unordered; **ibc-go supports only ORDERED and UNORDERED**, so ORDERED_ALLOW_TIMEOUT must not be claimed)
  - **packets** carry data; receipts lead to **acknowledgements**
  - **timeouts** refund or revert when a packet isn't received in time
- **Relayers** are off-chain processes that move packets and proofs. They are **trusted only for liveness**: they can delay packets but not forge them, because proofs are verified on-chain.
  - Hermes (v1.13.x) and the Go relayer (v2.6, little recent activity).
  - The Cosmos Labs **IBC v2 relayer** (Cosmos ↔ EVM chains) is source-available under an evaluation licence; production use requires contacting Cosmos Labs.

  Sources: https://docs.cosmos.network/ibc/next/infra/relayer/overview ; https://github.com/cosmos/ibc-relayer
- **Relayer fees:** the **ICS-29 fee middleware was removed in ibc-go v10.** Relayer operation is now normally funded by the chain/team or a service provider. This is a real budget line.
- **IBC v2 ("Eureka"), from ibc-go v10:**
  - packets are routed **client-to-client**, with no channel handshake
  - multi-payload packets are on the roadmap
  - connects Cosmos chains to **Ethereum and EVM L2s** through Solidity IBC contracts (repo `lfdt-ibc/ibc-contracts`, formerly cosmos/solidity-ibc-eureka)
    - **Direction matters:** on Ethereum, the Solidity contracts verify the Cosmos chain with a CometBFT/Tendermint light client, and SP1 zero-knowledge proofs make that verification affordable in gas
    - on the Cosmos side, a light client of Ethereum verifies the other direction
    - corrected after the independent review; sources: https://docs.cosmos.network/skip-go/eureka/eureka-tech-overview ; https://blog.succinct.xyz/ibc/
  - an **attestation light client** (ibc-go v11) relies on a fixed attestor quorum, which is **a weaker trust model than a light client; say so**

  Source: https://ibcprotocol.dev/docs/ibc/02-how-ibc-works/01-overview.md
- **Apps and middleware (current):**
  - **ICS-20** fungible token transfer
  - **ICS-27 Interchain Accounts (ICA):** a controller chain opens and controls an account on a host chain, sending it messages over IBC
  - **ICS27-GMP:** general message passing over IBC v2 (ibc-go v11)
  - **Packet Forward Middleware:** multi-hop transfers, upstreamed into ibc-go v11.1
  - **Rate-limiting middleware:** caps on token flows per channel or denom, in ibc-go v11.2
  - **Callbacks middleware:** replaces ibc-hooks, so contracts and modules react to packet lifecycle events
- **Interchain Queries:**
  - **async-icq (ICS-31) is no longer officially supported** (not tested against ibc-go v11)
  - the production pattern is **Neutron-style ICQ**: a relayer submits KV values with Merkle proofs, the querying chain verifies them against the counterparty light client, and owner contracts get callbacks
  - Sources: https://docs.cosmos.network/sdk/latest/upgrade/v0.54-release ; https://neutron-org.github.io/neutron-docs/relaying/icq-relayer
- **IBC vs trusted bridges:**
  - IBC verifies the counterparty chain's consensus on-chain through light clients; security reduces to the two chains' validator sets.
  - Many bridges rely on an external multisig or committee whose keys can be stolen or collude.
  - **Do not call IBC "trustless" or "zero-trust" without qualification.** It inherits the security of both connected chains, and attestation clients add a committee assumption.
- **Ecosystem stats:** avoid "X chains connected" figures unless sourced live (e.g. Map of Zones / IBC dashboards).

---

## 5. CosmWasm
- Contracts are written in Rust, compiled to Wasm, and run in the wasmd module (x/wasm) using the wasmvm runtime.
- **Entry points:**
  - `instantiate` (required)
  - `execute`, `query`, `migrate`, `reply`, `sudo` (privileged calls from chain modules or governance, not users)
  - IBC v1 entry points: channel open, connect, close; packet receive, ack, timeout
  - **IBC v2 entry points added in CosmWasm 3.0**
- **Actor model:** a contract does not call another synchronously. It returns messages or submessages that execute after it, and `reply` handles the results. This removes the classic synchronous reentrancy pattern but **does not remove logic bugs**, so do not claim it "eliminates reentrancy" in general.
- **Permissions:** `code_upload_access` can be NOBODY, EVERYBODY or ANY_OF_ADDRESSES, plus a default instantiate permission. This supports **permissioned contract deployment**: governance-gated uploads, as Neutron and the Hub do. Real example: the Cosmos Hub temporarily disabled uploads in Gaia v28.1.1 and re-enabled them in v28.2.1.
- **Migration:** contracts with an admin can be migrated to a new code ID. The admin key is a governance and security decision.
- **Support windows:** wasmd v0.54.x / wasmvm 2.2.x / cosmwasm 2.2.x unsupported from 1 Jun 2026.

Sources: https://github.com/CosmWasm/cosmwasm ; https://raw.githubusercontent.com/CosmWasm/wasmd/main/proto/cosmwasm/wasm/v1/types.proto ; https://cosmwasm.github.io/blog

---

## 6. Cosmos EVM
- An EVM execution layer as Cosmos SDK modules, with Ethereum JSON-RPC.
- Standard tooling works: Solidity, Hardhat, Foundry, Remix, MetaMask.
- **Precompiles** expose SDK modules (staking, distribution, bank, ICS-20) to Solidity.
- Uses separate Cosmos chain-ID (string) and EVM chain-ID (integer).
- Has its own EIP-1559-style fee market.
- v0.7 adds the Krakatoa app-side mempool, Block-STM, an ICS-02 client-router precompile and OpenTelemetry.
- **Pre-v1 status** means: pin versions, budget for state-breaking upgrades. v0.7.4 shipped six security advisories.

Sources: https://github.com/cosmos/evm ; https://docs.cosmos.network/evm/ ; https://decrypt.co/310444

---

## 7. Security models

| Model | Status (Nov 2026) | Notes |
|---|---|---|
| **Sovereign PoS** (own validator set, x/staking) | Default and most common | Security equals the value staked by the chain's own validators and delegators. Requires bootstrapping a validator set and an economic security budget. |
| **Proof of Authority** (Cosmos Labs Enterprise PoA module) | Available in release family 2026.1; **source-available licence; commercial licence required** | For permissioned / consortium chains. Stride moved from Interchain Security to PoA (Aug 2026). |
| **Interchain Security / Partial Set Security** (Cosmos Hub as provider) | **Retired on the Cosmos Hub.** Gaia v27 blocked new consumer chains; **Gaia v28 removed the provider module** (Aug 2026); Neutron (Apr 2025) and Stride (Aug 2026) left. | **Do not market ICS as an option.** |
| **Mesh Security** | No 2026 production evidence found | Omit. |
| **Bitcoin staking (Babylon)** | Babylon is a Cosmos SDK chain (SDK v0.53.8) offering BTC-staking and timestamping security services | Mention only as an emerging option that needs case-by-case evaluation. |

Sources: https://raw.githubusercontent.com/cosmos/gaia/main/CHANGELOG.md (verified: "Remove Interchain Security provider module") ; https://forum.cosmos.network/t/hub-weekly-update-12-august-13-2026/17241 ; https://github.com/babylonlabs-io/babylon

---

## 8. Default parameters (SDK defaults, not Cosmos Hub values)

| Module | Defaults (source: each module's params.go on main) |
|---|---|
| x/staking | unbonding_time **21 days**; max_validators **100**; max_entries 7; historical_entries 10,000; min_commission 0 |
| x/slashing | signed_blocks_window **100**; min_signed_per_window **0.5**; downtime_jail_duration **10 min**; slash_fraction_double_sign **5%**; slash_fraction_downtime **1%** |
| x/gov | max_deposit_period 2 days; voting_period 2 days; expedited voting 1 day; quorum **33.4%**; threshold **50%**; veto **33.4%**; expedited threshold 66.7% |
| x/mint | inflation_min 7%; inflation_max 20%; inflation_rate_change 13%; goal_bonded **67%** |
| x/distribution | community_tax **2%** |

**Correction to common competitor claims:** the "0.01% downtime slash" is a Cosmos Hub governance value, not the SDK default (1%). Production chains change most of these values, and the page says parameters are **designed per chain**.

Also relevant:
- **x/feegrant:** one account pays another's fees, useful for sponsored onboarding.
- **x/authz:** delegated permissions.
- **Skip's x/feemarket** is marked "No Longer Maintained" (https://github.com/skip-mev/feemarket). Dynamic fee markets on new chains should come from Cosmos EVM's EIP-1559 market or a maintained custom module.

---

## 9. Operations tooling
- **Genesis:**
  - `genesis.json` holds initial accounts, balances, vesting and module params.
  - Validators submit **gentx** files, which are collected into the final genesis (x/genutil).
  - The chain starts when more than two-thirds of genesis voting power is online.
  - Historical launch examples: Regen and Juno ran 1–2-week gentx windows plus a rehearsal. dYdX onboarded 60+ genesis validators.
  - Sources: Regen community update (Medium); https://www.theblock.co/post/259658
- **Validator architecture:**
  - validator node behind **sentry nodes** (the validator connects only to its sentries)
  - remote signing with **cosmos-kms** (new official signer; AWS KMS and PKCS#11 backends) or **Horcrux** (MPC threshold signing)
  - **TMKMS is deprecated** (≈6 months after v0.55)
  - **v0.55 consensus-key rotation** lets operators rotate keys without re-creating validators
- **Endpoints:**
  - CometBFT RPC (26657), gRPC (9090), REST/LCD (1317), state-sync snapshot providers, archive nodes
  - **chain-registry** (github.com/cosmos/chain-registry) metadata for wallets, explorers and relayers
- **Monitoring:** CometBFT Prometheus metrics; SDK OpenTelemetry (v0.54+); Grafana dashboards. Explorers: Mintscan (now owned by Cosmos Labs) and Ping.pub (status not re-verified).
- **Wallets and frontend:**
  - Keplr and Cosmostation for Cosmos-native chains; MetaMask/Rabby for Cosmos EVM chains
  - **Leap Wallet shut down on 28 May 2026; do not list it.** Sources: https://www.theblock.co/news/business/2026-04-03-cosmos-ecosystems-leap-wallet-is-shutting-down-396325 ; https://beincrypto.com/leap-wallet-shutdown-cosmos-migration-2026
  - CosmJS 0.39; Interchain Kit ("Cosmos Kit 3.0", Hyperweb)
- **Testing tooling:** SDK simulation framework (randomised message fuzzing and invariant checks); `interchaintest` (Docker-based multi-chain e2e including relayers); Go unit and integration tests; Go native fuzzing.
  **[UNVERIFIED this session]:** the current maintenance state of interchaintest. It is mentioned as a tool type, not a promise.

---

## 10. Production Cosmos SDK chains (for ecosystem-context mentions; verified via go.mod)

| Chain | Note |
|---|---|
| dYdX v4 | Order-book derivatives chain on an SDK v0.50 fork + CometBFT 0.38 fork |
| Osmosis | DEX chain, SDK v0.50 fork |
| Celestia | Data-availability chain, SDK fork (base v0.53.8) + celestia-core |
| Noble | Asset-issuance chain (native USDC on Cosmos), SDK v0.50.14 |
| Akash | Compute marketplace, SDK v0.53.8 fork |
| Neutron | Smart-contract chain, SDK v0.53 fork |
| Cronos | EVM chain, SDK v0.54 fork |
| Babylon | Bitcoin staking, SDK v0.53.8 |
| Injective | Finance chain, Cosmos SDK with native EVM module |

**Do not cite:**
- **Sei** as a Cosmos SDK example: it is moving to EVM-only and disabled IBC in 2026.
- **Binance Chain** (wound down).
- **Terra** (collapsed).
- **Berachain** (the current target page cites it). Berachain runs on BeaconKit, which uses CometBFT consensus with standard Ethereum execution clients rather than a conventional Cosmos SDK module stack. It is not a clean "Cosmos SDK appchain" example, so avoid it. **[Not re-verified this session; excluded out of caution.]**

---

## 11. Framework comparison facts

| | Cosmos SDK | Polkadot SDK (Substrate) | OP Stack / Arbitrum Orbit (rollup appchains) |
|---|---|---|---|
| Language | Go (plus CosmWasm Rust or Solidity via Cosmos EVM) | Rust (FRAME pallets → Wasm runtime) | Solidity / EVM (Orbit also supports Rust/C++ via Stylus) |
| Security | Sovereign validator set (or PoA) | Shared security from the relay chain via Agile Coretime | Inherits L1 (Ethereum) settlement security; sequencer usually centralised |
| Interop | IBC (light-client), IBC v2 to Ethereum | XCM within Polkadot; bridges outside | Native bridge to L1; third-party bridges elsewhere |
| Upgrades | Governance proposal → halt height → binary swap (Cosmovisor) + store migrations | Forkless runtime upgrade (`set_code`) | Upgrade keys or L1 governance contracts |
| Finality | Deterministic, single-block | Via relay-chain finality (GRANDPA) | Soft confirmations from sequencer; L1 finality after posting/challenge (optimistic) or proof (ZK) |

Sources: https://docs.polkadot.com/develop/parachains/maintenance/runtime-upgrades ; https://www.parity.io/blog/polkadot-upgrade-2025-what-you-need-to-know. OP Stack/Orbit rows are standard documented behaviour (docs.optimism.io, docs.arbitrum.io); **[not refetched this session]**, so the page keeps that row qualitative.

---

## 12. Required distinctions (brief, Phase 3)

| Pair | Distinction |
|---|---|
| Cosmos SDK vs Cosmos Hub | The SDK is a Go framework for building chains. The Cosmos Hub (Gaia) is one chain built with it, with the ATOM token. Building with the SDK does not require connecting to, paying or being secured by the Hub. |
| Cosmos SDK vs CosmWasm | The SDK builds the chain itself (Go modules, protocol-level logic). CosmWasm is an optional module that lets the chain run Rust/Wasm smart contracts deployed after launch. |
| Cosmos SDK vs CometBFT | CometBFT is the consensus and networking engine (orders transactions, finalises blocks). The SDK is the application/state machine (decides what transactions do). They talk over ABCI. |
| IBC vs traditional bridges | IBC verifies the counterparty's consensus on-chain using light clients; relayers are liveness-only. Typical bridges trust an external validator or multisig committee. |
| Appchain vs smart contracts on an existing network | An appchain controls its own block space, fees, ordering, validator set and upgrade path, at the cost of running a network. Contracts inherit an existing chain's security, users and liquidity, but share its block space and rules. |
| Sovereign vs shared security | Sovereign: the chain's own validators and token secure it. Shared: another network's validators secure it (ICS on the Hub, now retired; Polkadot relay chain; Ethereum for rollups). |
