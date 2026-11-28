# 03 — Technical Research: Smart Contract Development (state as of 26 Nov 2026)

Purpose: make sure every technical statement on the new page is accurate and current, and list wording to avoid.

**Source key**
- **[V]** = checked against an official or primary source during this research. The source URL is given.
- **[K]** = well-established practice that was not re-fetched during this research. Spot-check it before you quote it as a fact.

Some official pages refused automated fetches: docs.openzeppelin.com, owasp.org and parts of docs.soliditylang.org. For those, the GitHub repositories, changelogs and blog posts listed below were used instead.

---

## A. Smart contract architecture

| Topic | What matters for the page | Notes / sources |
|---|---|---|
| Modular design and inheritance | Keep contracts small and single-purpose: token, vault, governor, treasury. Compose them with interfaces and libraries. Avoid deep or diamond inheritance unless it is needed. | [K] Solidity inheritance and C3 linearization: https://docs.soliditylang.org/en/latest/contracts.html#inheritance |
| Access control | `Ownable` / `Ownable2Step` suit single-admin contracts. `AccessControl` gives role-based permissions. `AccessManager`, added in OZ v5, centralises roles and execution delays across many contracts. | [V] OZ v5 changelog: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/CHANGELOG.md |
| Admin key safety | Hold privileged roles in a multisig such as Safe. Put sensitive changes behind `TimelockController` so users can see them before they execute. | [K] |
| Upgradeability | Two patterns cover most cases. In UUPS (ERC-1822 style, via `UUPSUpgradeable`), the upgrade logic lives in the implementation. In a Transparent proxy, OZ v5 deploys a `ProxyAdmin` per proxy and sets the admin immutably. Both use ERC-1967 storage slots. OZ 5.6 made initialization mandatory for `ERC1967Proxy`. | [V] OZ releases: https://github.com/OpenZeppelin/openzeppelin-contracts/releases |
| Storage layout for upgrades | ERC-7201 namespaced storage replaced `__gap` arrays in OZ v5 upgradeable contracts. Solidity 0.8.35 added an `erc7201` builtin. The OZ Upgrades Plugins for Hardhat and Foundry validate storage-layout compatibility. | [V] Solidity releases: https://www.soliditylang.org/blog/category/releases/ ; EIP: https://eips.ethereum.org/EIPS/eip-7201 |
| Immutability as a choice | Many contracts should **not** be upgradeable, for example simple tokens and trust-minimised DeFi primitives. Upgradeability trades user trust for flexibility, so present it as a design decision. | Positioning point |
| Events | Events are cheap, indexable logs for off-chain consumers: indexers, subgraphs, monitoring. They are not readable by contracts. | [K] |
| Interoperability | External calls follow checks-effects-interactions. Interfaces are declared explicitly. On ERC-20 integrations, allow for tokens that do not return booleans (`SafeERC20`). | [K] |
| SELFDESTRUCT | Since Dencun (EIP-6780), `SELFDESTRUCT` only deletes code when it is called in the same transaction as creation. Do not design "kill switch" upgrades around it. | [K] https://eips.ethereum.org/EIPS/eip-6780 |

---

## B. Languages and the ecosystems they actually target

| Language | Target ecosystems | Key facts | Page wording |
|---|---|---|---|
| **Solidity** | Ethereum and EVM chains: Arbitrum, Optimism/OP Stack (Base), Polygon PoS, BNB Chain, Avalanche C-Chain, zkSync Era (via zksolc), Linea and others. | Current stable is 0.8.39 (19 Nov 2026) [V]. Checked arithmetic by default since 0.8.0. Custom errors arrived in 0.8.4. `require(cond, CustomError())` arrived in 0.8.26. The `transient` keyword (0.8.28) works only on value-type state variables [V]. | Say "Solidity 0.8.x". Do not hard-code a version on the page. |
| **Vyper** | EVM only | Current stable is v0.4.3 [V]; the v0.5.0 line is in beta. v0.4 introduced a module system. Its best-known production user is Curve. | Offer Vyper "where a project or audit trail calls for it". |
| **Rust** | Solana (Anchor framework), Arbitrum Stylus (Rust compiled to WASM, interoperating with EVM contracts), NEAR (near-sdk-rs), Cosmos (CosmWasm) | Anchor 1.x is stable and 2.0 is at RC [V]. Stylus is live on Arbitrum One and Nova, with SDK 0.10.x audited by OpenZeppelin in Dec 2025 [V]. CosmWasm 3.0.x is current [V]. Polkadot's ink! is no longer actively maintained (Jan 2026) [V]. | Never imply Rust runs on the EVM natively; Stylus is the specific exception. Do not market ink!. |
| **Move** | Sui (object-centric model) and Aptos (resources stored under accounts, plus objects) | The two Move dialects differ, so code is not portable as-is [K]. Formal verification is available through the Move Prover (Aptos) and the Sui Prover by Asymptotic [V]. | Say "Sui Move and Aptos Move", not "Move works everywhere". |
| **Go** | Hyperledger Fabric chaincode (Go, Node.js or Java) [V]. Also Cosmos SDK modules, which are chain-level logic, and EVM tooling such as geth's `abigen` bindings. | Go is **not** an EVM smart-contract language. | Mention Go only in an enterprise/permissioned context. **Include it only if ClickMasters confirms Fabric capability.** |

Sources:
- Solidity releases: https://www.soliditylang.org/blog/category/releases/
- Vyper releases: https://github.com/vyperlang/vyper/releases
- Anchor release notes: https://www.anchor-lang.com/docs/updates/release-notes/1-0-0
- Arbitrum Stylus overview: https://docs.arbitrum.io/stylus/reference/overview
- CosmWasm release: https://cosmwasm.github.io/blog/2026/05/22/new-release
- ink! repository: https://github.com/use-ink/ink
- Sui Prover: https://blog.sui.io/asymptotic-move-prover-formal-verification/
- Hyperledger Fabric chaincode languages: https://github.com/hyperledger/fabric/blob/v2.5.5/docs/source/sdk_chaincode.md

---

## C. Standards: real use cases

| Standard | What it is for | Implementation notes |
|---|---|---|
| ERC-20 | Fungible tokens: utility, governance and stablecoin-style tokens | Decimals, supply caps, mint/burn roles. ERC-2612 `permit` enables gasless approvals. |
| ERC-721 | Unique NFTs: collectibles, tickets, certificates, deeds | Metadata URI strategy (IPFS/Arweave or on-chain), enumerable extension cost, safe-transfer callbacks. |
| ERC-1155 | Multi-token contracts that mix fungible and non-fungible items, such as game items, editions and memberships | Batch transfers save gas. The receiver hook is a reentrancy surface. |
| ERC-2981 | Royalty *information* | It only signals a royalty; marketplaces choose whether to honour it, and nothing enforces it on-chain. State this honestly. |
| ERC-4626 | Tokenized yield vaults | First-depositor/inflation attack. OZ mitigates it with virtual shares and a decimals offset (since v4.9) [V]; OZ 5.6 added `_transferIn`/`_transferOut` hooks [V]. |
| ERC-4337 | Account abstraction: smart accounts, bundlers, paymasters (gas sponsorship), EntryPoint | EntryPoint v0.7, v0.8 (EIP-7702 support) and v0.9 (latest; bundler support uneven) [V]. OZ 5.4+ ships `Account` building blocks and 5.7 adds Paymasters [V]. |
| EIP-7702 | Lets EOAs delegate to contract code. Live since Pectra, 7 May 2025 [V]. | Sponsored transactions and batching for existing wallets. Delegation targets need careful review. |
| ERC-3643 (T-REX) | Permissioned, identity-gated security/RWA tokens | Compliance modules and ONCHAINID. Relevant to RWA tokenization. |
| ERC-1967 / ERC-7201 | Proxy storage slots / namespaced storage | The foundations of safe upgradeability. |
| EIP-1153 | Transient storage (Dencun, Mar 2024) | Cheap per-transaction locks, for example `ReentrancyGuardTransient` (OZ 5.1) [V]. |
| Governor + Timelock (OZ) | DAO proposals, voting and delayed execution | Requires ERC20Votes/ERC721Votes. Quorum and voting-period design are product decisions. |

Sources:
- EIPs: https://eips.ethereum.org/
- Pectra: https://ethereum.org/roadmap/pectra/
- ERC-4337 EntryPoint releases: https://github.com/eth-infinitism/account-abstraction/releases
- OZ v5.1 announcement: https://www.openzeppelin.com/news/introducing-openzeppelin-contracts-v5.1

---

## D. Application patterns: what each involves

- **Token creation.** Supply model (fixed, capped, or elastic), mint and burn authority, pausability, blocklists (a compliance versus decentralisation trade-off) and permit.
- **Vesting.** Cliff plus linear release; OZ `VestingWallet` or a custom vesting schedule with revocation rules. Edge cases: rounding, a revocation in the middle of a cliff, and sending tokens to the vesting contract before the schedule starts.
- **Staking.** Reward-per-token accumulator pattern (O(1) per user). Reward-rate changes, an empty pool, and decimals mismatches between the staking and reward tokens.
- **NFT minting.** Allowlists (a Merkle root rather than on-chain arrays), signature-based mints (EIP-712 with nonces to prevent replay), reveal mechanics, supply caps, and ERC-721A-style batch-mint trade-offs.
- **Marketplaces.** Listings and offers signed off-chain and settled on-chain, royalty lookup through ERC-2981, and escrow versus approval-based settlement.
- **AMMs.** The constant-product invariant, fee accounting, price-manipulation resistance (TWAP rather than spot price), and slippage/deadline parameters.
- **Lending.** Collateral factors, health factor, liquidation incentive, oracle choice (Chainlink Data Feeds plus staleness checks), interest-rate models, and bad-debt handling.
- **Yield/farming.** Emission schedules and reward-token economics; reward rounding exploits.
- **DAO governance.** Governor, a votes token, a timelock, proposal thresholds, quorum, and treasury execution.
- **Escrow and payments.** Conditional release, dispute/arbiter role, deadlines, pull-over-push payments, and stablecoin handling.
- **RWA tokenization.** Identity and compliance gating (ERC-3643), forced transfers and recovery for regulated assets, and an off-chain legal wrapper. The contract does not make an asset legally compliant.
- **Enterprise workflow automation.** Role-based approvals, audit trails through events, and integration through APIs, indexers and oracles. Permissioned chains such as Fabric exist where privacy is needed.

---

## E. Testing and security

### Testing toolchain

**Foundry** [V]
- v1.0 shipped in Feb 2025. The latest release found is v1.8.0, which adds symbolic testing in preview and mutation testing.
- Docs now live at https://getfoundry.sh/; book.getfoundry.sh is the legacy URL.
- The tools are `forge`, `cast`, `anvil` and `chisel`.
- Capabilities include:
  - fuzz tests;
  - invariant tests with handlers and ghost variables;
  - fork tests via `--fork-url` or `vm.createSelectFork`;
  - `forge test --gas-report` and `forge snapshot`;
  - `forge verify-contract` against Etherscan V2, Sourcify and Blockscout.

**Hardhat 3** [V]
- Hardhat 3 is stable.
- It supports Foundry-compatible Solidity tests (unit, fuzz and invariant) alongside TypeScript tests (node:test or Mocha), has built-in `--coverage`, and runs on the Rust-based EDR runtime.
- Hardhat 2 reaches end of life at the earlier of the Hegota upgrade or 1 Jun 2027.
- Ignition handles deployments [K].
- Sources: https://hardhat.org/docs/hardhat3/whats-new ; https://hardhat.org/docs/reference/hardhat-2-end-of-life

### Test layers to describe on the page

1. **Unit tests.** One test per function and per revert path.
2. **Integration tests.** Several contracts together, plus external protocols.
3. **Mainnet-fork tests.** Run against real deployed protocols and oracle state.
4. **Fuzz tests.** Randomised inputs.
5. **Invariant tests.** Properties that must always hold, for example "total shares are backed by assets" or "no user can withdraw more than they deposited plus rewards".
6. **Coverage review.** Coverage is a signal, not a goal.
7. **Gas snapshots.** Catch regressions between versions.

### Analysis tools

| Tool | Type | Status |
|---|---|---|
| Slither (Trail of Bits) | Static analysis, 90+ detectors | Active [K] https://github.com/crytic/slither |
| Echidna (Trail of Bits) | Property-based fuzzer | Active [K] |
| Medusa (Trail of Bits) | Parallel fuzzer built on geth | v1 released Feb 2025 [V] https://blog.trailofbits.com/2025/02/14/unleashing-medusa-fast-and-scalable-smart-contract-fuzzing/ |
| Halmos (a16z) | Symbolic testing that reuses Foundry tests | [K] not re-verified |
| Certora Prover | Formal verification | Open source (GPL-3.0) since Feb 2025 [V] https://certora.com/blog/certora-goes-open-source |
| SMTChecker | Formal checks built into solc | [K] |
| Mythril (Consensys) | Symbolic execution | Maintenance looks inactive [uncertain]. Treat it as legacy and do not list it as a primary tool. |

### Vulnerability classes

The **OWASP Smart Contract Top 10 (2026 edition)** [V] (source: https://github.com/OWASP/www-project-smart-contract-top-10):
1. Access Control
2. Business Logic
3. Price Oracle Manipulation
4. Flash-Loan-Facilitated Attacks
5. Lack of Input Validation
6. Unchecked External Calls
7. Arithmetic Errors
8. Reentrancy
9. Integer Overflow/Underflow
10. Proxy & Upgradeability Vulnerabilities

The 2025 edition is the previous one.

Further classes to cover:
- read-only reentrancy;
- signature replay (missing nonce, chainId or domain);
- front-running and MEV (sandwiching, missing slippage or deadline parameters);
- denial of service through unbounded loops or push payments;
- uninitialized implementation contracts;
- storage collisions in proxies;
- rounding direction in vault and lending maths;
- insecure on-chain randomness (use a VRF instead).

The **SWC Registry** is no longer maintained [V] (https://github.com/SmartContractSecurity/SWC-registry). Do not claim "SWC compliance".

### Development security versus an independent audit (key positioning)

- **Secure development** is what the builder does: threat modelling, safe patterns, tests, static analysis, fuzzing and internal peer review.
- **An independent audit** is a separate team, with no stake in the code, reviewing a frozen commit and publishing findings.

The page must never present internal review as an audit. Neither one guarantees the absence of vulnerabilities.

---

## F. Deployment and maintenance

- **Pipeline.** Local development (anvil or the Hardhat network), then a public testnet (Sepolia for Ethereum; each L2 has its own testnet), then mainnet.
  - Use deterministic deployment where useful (CREATE2, or the CREATE3 helper in OZ 5.7 [V]).
  - Keep scripted, reproducible deployments using Foundry scripts or Hardhat Ignition.
- **Verification.** Etherscan API V2 uses one key across 60+ chains through a `chainid` parameter. V1 was switched off on 15 Aug 2025 [V] (https://docs.etherscan.io/v2-migration). Sourcify and Blockscout also verify contracts.
- **Admin hand-over.** Transfer ownership or roles to a multisig. Renounce roles that are no longer needed, and document every privileged function.
- **Monitoring.**
  - OpenZeppelin **Defender's hosted service retired on 1 Jul 2026** [V]. Its open-source successors, OpenZeppelin Monitor and Relayer, can be self-hosted (https://www.openzeppelin.com/news/defender-sunset-faq).
  - Alternatives include Tenderly (alerts and simulation) and Forta (still operating, now repositioning toward risk/compliance [V]).
  - Monitor events, privileged calls, balance thresholds and oracle deviations.
- **Emergency response.** `Pausable` with a guardian role, rate limits (OZ 5.7 adds a `RateLimiter` [V]), circuit breakers, a pre-written incident runbook, and communication templates.
- **Upgrades.** Validate storage layout, run the upgrade on a fork first, execute it through the timelock or multisig, and verify the new implementation afterwards.

---

## G. Gas optimization techniques (accurate, non-exaggerated)

- **Packing.** Pack storage variables into 32-byte slots where they are read together.
- **constant / immutable.** Use them for fixed values; they live in bytecode and avoid an SLOAD.
- **calldata.** Use `calldata` instead of `memory` for read-only external arguments.
- **Custom errors.** Use them instead of revert strings.
- **Cache storage reads.** EIP-2929 makes a cold SLOAD cost 2,100 gas and a warm one 100 [K]. A zero-to-nonzero SSTORE costs 20,000.
- **unchecked.** Use `unchecked` only where bounds are proven, for example a loop counter.
- **Events instead of storage.** Store data that only off-chain systems need as events.
- **Off-chain data.** Use Merkle proofs and signatures instead of on-chain lists.
- **Transient storage.** Use it for intra-transaction flags.
- **L2 costs.** On L2s, data availability dominates fees; EIP-4844 blobs cut it sharply. Compact calldata matters more than micro-optimising opcodes.

**Principle for the page:** readability and security come before micro-optimisation. The aim is no wasted storage writes and well-designed data flows, not clever assembly.

---

## H. Wording to avoid on the page

1. Presenting "OpenZeppelin Defender" as a current product.
2. Presenting ink! as an active Rust option.
3. "Hardhat 3 beta" (Hardhat 3 is stable).
4. Claiming "SWC-compliant" or treating the SWC Registry as current.
5. Mythril as a primary tool.
6. A hard-coded "latest Solidity version".
7. "Royalties are enforced by ERC-2981."
8. "Go smart contracts on Ethereum."
9. "Audited" when only internal review happened.
10. "100% secure", "bug-free" or "hack-proof".
