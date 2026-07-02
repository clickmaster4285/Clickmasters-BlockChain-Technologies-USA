## H1: Smart Contract Pre-Launch Security Checklist — 50-Point Audit Readiness Tool

**URL:** /tools/smart-contract-security-checklist/
**Schema:** Article, BreadcrumbList
**Internal Links:** /blockchain-security-audit/, /smart-contract-development/, /defi-protocol-security-audit/

Run this checklist before submitting your contracts to a security audit. Resolving these issues before the audit saves audit time (cost) and avoids findings that would otherwise delay your launch.

### SECTION 1: CODE QUALITY (10 checks)

- [ ] Solidity version is pinned (e.g., `pragma solidity 0.8.24;` not `^0.8.0`)
- [ ] Named imports used (`import {ERC20} from "@openzeppelin/..."` not `import "@openzeppelin/..."`)
- [ ] All functions have NatSpec documentation (`@notice`, `@param`, `@return`)
- [ ] No unused imports or state variables
- [ ] All state variables have explicit visibility (`public`, `private`, `internal`)
- [ ] Events emitted for all state changes
- [ ] Custom errors used instead of `require(bool, string)` for gas efficiency
- [ ] No `tx.origin` used for authorization (use `msg.sender`)
- [ ] No `block.timestamp` used for randomness (use Chainlink VRF)
- [ ] No `block.number` used for time calculations (timestamps only)

### SECTION 2: ACCESS CONTROL (8 checks)

- [ ] All admin functions require appropriate role or ownership check
- [ ] Admin key is a multisig (Gnosis Safe), not a single EOA
- [ ] Ownership cannot be transferred to address(0) accidentally
- [ ] Role assignments emit events
- [ ] `DEFAULT_ADMIN_ROLE` is not assigned to deployer in production (use specific roles)
- [ ] Time-lock on sensitive admin operations (upgrade, fee change, parameter change)
- [ ] Emergency pause implemented (Pausable from OpenZeppelin)
- [ ] Pause key held separately from upgrade key

### SECTION 3: REENTRANCY (6 checks)

- [ ] `nonReentrant` modifier on all external functions that transfer ETH or tokens
- [ ] Check-Effects-Interactions pattern followed throughout
- [ ] No `.call{value:}` without nonReentrant guard
- [ ] No `.transfer()` or `.send()` (use `.call{value:}` with check)
- [ ] Token transfers use SafeERC20 (`safeTransfer`, `safeTransferFrom`)
- [ ] No external calls in constructor

### SECTION 4: ARITHMETIC (5 checks)

- [ ] Solidity 0.8.x used (built-in overflow protection) OR explicit SafeMath
- [ ] Division before multiplication avoided (precision loss)
- [ ] No division by zero possible (denominator validated)
- [ ] Fixed-point arithmetic uses consistent precision (1e18 throughout)
- [ ] `unchecked` blocks only used where overflow is provably impossible

### SECTION 5: ORACLE SECURITY (5 checks)

- [ ] No spot price used for liquidations or collateral calculation
- [ ] TWAP or Chainlink price feed used for all financial calculations
- [ ] Oracle staleness check implemented (reject prices older than X minutes)
- [ ] Oracle manipulation protection (divergence threshold between two oracles)
- [ ] Fallback oracle configured for when primary oracle fails

### SECTION 6: FLASH LOAN PROTECTION (4 checks)

- [ ] Internal accounting used (not `token.balanceOf(address(this))`)
- [ ] Same-block action restriction where applicable
- [ ] No functions that allow manipulation of stored values within one transaction
- [ ] Donation attack prevention (surplus tokens don't affect accounting)

### SECTION 7: UPGRADEABILITY (5 checks, if applicable)

- [ ] Proxy pattern is one of: UUPS, Transparent, or Diamond (no custom pattern)
- [ ] Storage layout documented and will not change in upgrades
- [ ] Initializer function cannot be called twice (`initializer` modifier)
- [ ] Upgrade function requires timelock + multisig
- [ ] `_disableInitializers()` called in implementation constructor

### SECTION 8: TESTING (7 checks)

- [ ] Line coverage ≥ 95% (run `forge coverage`)
- [ ] Branch coverage ≥ 88%
- [ ] Fuzz tests implemented for all critical mathematical functions
- [ ] Invariant tests implemented (key protocol invariants cannot be violated)
- [ ] Fork tests against mainnet state for any integration with existing DeFi
- [ ] All edge cases tested: zero amounts, max amounts, single user, empty state
- [ ] Negative test cases: unauthorized callers, invalid inputs, over-limit values

### SECTION 9: DEPLOYMENT READINESS (5 checks)

- [ ] Deployment script tested on testnet (not just local)
- [ ] Constructor arguments documented and validated
- [ ] Contract verified on Etherscan (source code visible)
- [ ] Multisig has been set up and tested before deployment
- [ ] Emergency contact plan (who to call if exploit detected)

### SECTION 10: DOCUMENTATION (5 checks)

- [ ] README explains what the protocol does and how it works
- [ ] Architecture diagram included
- [ ] All external function interfaces documented
- [ ] Known limitations and trust assumptions documented
- [ ] Links to all deployed contract addresses

---

### SCORING

45–50: Audit-ready. Submit to auditor.
40–44: Minor issues. Fix before submitting.
35–39: Moderate issues. Address section failures before auditing.
Below 35: Significant gaps. Audit will find many issues — resolve first to reduce cost.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Token Launch Checklist — 40 Steps From Contract to Listing

**URL:** /tools/token-launch-checklist/
**Schema:** Article, BreadcrumbList
**Internal Links:** /token-launch-services/, /blockchain-tokenomics-design/, /token-vesting-best-practices/

This checklist covers every technical, legal, and marketing step for a successful token launch. Used by Clickmasters Blockchain Technologies across 1,000+ delivered projects.

### PHASE 1: PREPARATION (T-12 to T-8 Weeks)

**Technical:**
- [ ] Token contract finalized and tested (95%+ coverage)
- [ ] Vesting contracts deployed and funded on testnet
- [ ] Tokenomics model stress-tested at -70% price scenario
- [ ] External security audit initiated
- [ ] Multi-sig wallet (Gnosis Safe) configured with final keyholders

**Legal:**
- [ ] Legal counsel engaged (US securities analysis complete)
- [ ] Regulation D 506(c) or applicable exemption confirmed
- [ ] Geographic restrictions list finalized (US? Non-US only? All except OFAC?)
- [ ] Terms of service and token sale agreement drafted
- [ ] KYC/AML provider selected and integrated

**Community:**
- [ ] Whitepaper or litepaper published
- [ ] Tokenomics documentation published (supply schedule, vesting schedule with exact dates)
- [ ] Community channels established (Discord, Twitter/X, Telegram)

### PHASE 2: PRE-LAUNCH (T-8 to T-2 Weeks)

**Technical:**
- [ ] Security audit completed — all Critical/High findings resolved
- [ ] Audit report published publicly
- [ ] Contracts deployed to mainnet testnet (Sepolia/Goerli)
- [ ] Initial DEX liquidity strategy confirmed (which DEX, which fee tier, how much)
- [ ] LP lock strategy confirmed (Unicrypt or equivalent, minimum 6 months)
- [ ] Multisig tested with all keyholders (test transaction approved and executed)

**Infrastructure:**
- [ ] Website with tokenomics page live
- [ ] Block explorer links to deployed contracts (mainnet deploy)
- [ ] Status page for protocol monitoring
- [ ] Discord bot for price/TVL display

**Legal:**
- [ ] KYC whitelisting complete for all pre-sale participants
- [ ] Token purchase agreements signed
- [ ] Investor vesting contracts deployed and linked to participant addresses

### PHASE 3: LAUNCH WEEK (T-7 to T-0 Days)

**T-7 days:**
- [ ] Announce launch date publicly with exact time (UTC)
- [ ] Publish final token distribution breakdown
- [ ] Publish DEX listing details (which pool, initial price)
- [ ] Final audit report version published

**T-1 day:**
- [ ] Test all public-facing functions one final time on mainnet (with tiny amounts)
- [ ] All team members on standby
- [ ] Emergency pause test (confirm pause works)
- [ ] Bug bounty program activated (Immunefi)

**T-0 (Launch):**
- [ ] Deploy token contract to mainnet
- [ ] Execute initial distribution (team, investors, community allocation) via multisig
- [ ] Add initial DEX liquidity (multisig transaction)
- [ ] Lock LP tokens (Unicrypt transaction)
- [ ] Verify contract on Etherscan
- [ ] Publish all contract addresses publicly

### PHASE 4: POST-LAUNCH (T+1 to T+30 Days)

- [ ] Monitor: unusual transaction patterns, large sells, suspicious addresses
- [ ] Run Slither and Aderyn against deployed bytecode to verify deployment
- [ ] Publish post-launch transparency report (actual distribution vs planned)
- [ ] First community governance vote (if governance is live)
- [ ] First vesting unlock communication (30 days before if applicable)
- [ ] TVL/volume milestone announcements
- [ ] Ecosystem grant applications (for relevant L2 ecosystems)

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Blockchain Vendor Comparison Tool — How to Evaluate Development Firms

**URL:** /tools/blockchain-vendor-comparison/
**Schema:** Article, BreadcrumbList
**Internal Links:** /questions-before-hiring-blockchain-firm/, /how-to-choose-blockchain-development-company/, /blockchain-consulting/

Use this scoring matrix to evaluate blockchain development vendors side by side. Score each vendor 1–5 on each criterion.

### SCORING MATRIX

| Criterion | Weight | Vendor A | Vendor B | Vendor C |
|---|---|---|---|---|
| **Portfolio quality** | 20% | /5 | /5 | /5 |
| Verifiable deployed contracts | | | | |
| Published audit reports | | | | |
| Comparable use cases delivered | | | | |
| **Team verification** | 20% | /5 | /5 | /5 |
| Named engineers with GitHub profiles | | | | |
| Auditable on-chain contribution history | | | | |
| Client reference calls available | | | | |
| **Process maturity** | 20% | /5 | /5 | /5 |
| Technical specification before coding | | | | |
| Audit integration in workflow | | | | |
| Defined testing standards (coverage %) | | | | |
| **Communication quality** | 15% | /5 | /5 | /5 |
| Response time during evaluation | | | | |
| Clarity of technical explanations | | | | |
| Transparent about limitations | | | | |
| **Timeline reliability** | 15% | /5 | /5 | /5 |
| References confirm on-time delivery | | | | |
| Milestone-based project structure | | | | |
| Change order process defined | | | | |
| **Price competitiveness** | 10% | /5 | /5 | /5 |
| Within budget for scope | | | | |
| Fixed price vs T&M model | | | | |
| Payment milestones tied to deliverables | | | | |

### WEIGHTED SCORE CALCULATION

```
Vendor score = Σ (criterion_score × weight)

Example:
Portfolio: 4 × 0.20 = 0.80
Team:      3 × 0.20 = 0.60
Process:   5 × 0.20 = 1.00
Communication: 4 × 0.15 = 0.60
Timeline:  4 × 0.15 = 0.60
Price:     3 × 0.10 = 0.30

Total: 3.90 / 5.00
```

### DISQUALIFYING RED FLAGS (Any = Reject)

- [ ] Cannot provide deployed contract addresses on Etherscan
- [ ] No published audit reports from independent firm
- [ ] Unwilling to provide direct client references
- [ ] Fixed-price quote without seeing technical requirements
- [ ] Promises "will not need an audit" or "audit is optional"
- [ ] Development team is anonymous
- [ ] No technical specification in their process

### CLARIFYING QUESTIONS TO ASK

1. "Show me the Etherscan links for your three most comparable deployments."
2. "Which security audit firm do you work with? Show me their published reports."
3. "Can I speak with the engineer who will actually write my smart contracts?"
4. "What is your test coverage standard? Can you show me a sample test suite?"
5. "What happens if the audit finds Critical findings? Who pays for remediation?"
6. "What are the payment milestones tied to?"
7. "Have you built a comparable project for a US client navigating SEC/FinCEN?"

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Blockchain Project Scope Document Template — Define Before You Build

**URL:** /tools/blockchain-scope-document-template/
**Schema:** Article, BreadcrumbList
**Internal Links:** /enterprise-blockchain-solutions/, /blockchain-consulting/, /blockchain-development-cost/

A scope document defines exactly what will be built, preventing scope creep and misaligned expectations. This template is used in every Clickmasters Blockchain Technologies engagement.

### BLOCKCHAIN PROJECT SCOPE DOCUMENT

**Project:** [Project Name]
**Client:** [Company Name]
**Date:** [Date]
**Version:** 1.0 (requires mutual sign-off before development begins)

---

**SECTION 1: PROJECT OVERVIEW**

**Problem statement:** [1–2 sentences on the specific business problem being solved]

**Solution summary:** [2–3 sentences on the blockchain-based solution]

**Primary success metric:** [Specific, measurable — e.g., "Supply chain query response time reduced from 5 days to under 1 minute"]

**Stakeholders:**
- Client technical lead: [Name, email]
- Client business owner: [Name, email]
- Clickmasters technical lead: [Name, email]
- Clickmasters project manager: [Name, email]

---

**SECTION 2: IN SCOPE**

*Smart Contracts:*
1. [Contract name] — [specific functions and their descriptions]
2. [Contract name] — [specific functions and their descriptions]

*Frontend/Portal:*
1. [Page/feature] — [specific functionality]
2. [Page/feature] — [specific functionality]

*Integrations:*
1. [System] — [specific integration type, e.g., "Read-only SAP event listener via REST API"]
2. [System] — [specific integration type]

*Blockchain Network:*
- Network: [Ethereum / Arbitrum / Hyperledger Fabric / etc.]
- Environment: Sepolia testnet for development; [Mainnet/Production] for deployment

---

**SECTION 3: OUT OF SCOPE**

The following are explicitly NOT included in this engagement:
- Mobile application development
- Ongoing infrastructure operations (client responsibility post-delivery)
- Legal counsel for regulatory compliance
- Third-party service costs (audit firm, oracle provider, RPC provider)
- [Other explicit exclusions]

---

**SECTION 4: DELIVERABLES AND ACCEPTANCE CRITERIA**

| Deliverable | Acceptance Criteria | Due Date |
|---|---|---|
| Technical Specification Document | Client approval, all function signatures defined | Week 6 |
| Smart contracts (testnet) | All unit tests passing, 95%+ coverage | Week 16 |
| Frontend (staging) | Client UAT sign-off | Week 20 |
| Security audit report | All Critical/High findings resolved | Week 24 |
| Production deployment | Contract verified on explorer, client access confirmed | Week 28 |

---

**SECTION 5: CHANGE ORDER PROCESS**

Any feature or functionality not listed in Section 2 requires a Change Order:
1. Client identifies requested change
2. Clickmasters estimates impact (timeline, cost)
3. Both parties sign Change Order before implementation begins
4. Change Orders added to this document as appendices

---

**SECTION 6: PAYMENT SCHEDULE**

| Milestone | Amount | Due |
|---|---|---|
| Contract signing | 25% | At signing |
| TSD approval | 25% | Week 6 |
| Testnet deployment | 25% | Week 16 |
| Production deployment | 25% | Week 28 |

---

**SIGNATURES**

Client: _____________________ Date: _______
Clickmasters: _______________ Date: _______

**NDA signed before the first call**

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
