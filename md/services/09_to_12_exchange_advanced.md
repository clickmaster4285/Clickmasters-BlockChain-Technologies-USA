# Crypto Exchange Market Microstructure — Bid-Ask Spread, Depth, and Execution Quality | Clickmasters

---
**URL:** /crypto-exchange-market-microstructure/
**Primary KW:** crypto exchange market microstructure
**Secondary KWs:** exchange order book depth, bid ask spread crypto, market quality exchange, execution quality crypto
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /crypto-exchange-development/, /crypto-exchange-matching-engine/, /crypto-exchange-liquidity/

---

## H1: Crypto Exchange Market Microstructure — Building an Exchange With Professional-Grade Execution Quality

**H2: Market microstructure determines whether professional traders and institutions will trade on your exchange. Tight spreads, deep order books, and low market impact separate professional exchanges from retail toys. Here is the complete architecture.**

---

## The Four Pillars of Exchange Quality

**Pillar 1 — Bid-Ask Spread:** The difference between the best bid (buy price) and best ask (sell price). A 0.10% spread on BTC/USD ($50,000): $50 spread. Traders pay this on every round-trip. Tighter spread = better exchange for traders = more volume.

**Pillar 2 — Order Book Depth:** How much liquidity exists within 0.5–1% of the mid-price? An exchange with $500 on each side within 1% of mid-price is unusable for institutional traders. $200,000+ each side is institutional-grade.

**Pillar 3 — Market Impact:** How much does a $50,000 trade move the price? Low impact = better execution for large traders. High impact = traders route to other exchanges.

**Pillar 4 — Order-to-Trade Ratio:** Professional markets have many limit orders (adds liquidity) relative to trades (takes liquidity). High-quality exchanges attract market makers who provide tight quotes.

---

## Spread and Depth Targets by Exchange Tier

| Exchange Tier | BTC/USD Spread | BTC/USD Depth (1% each side) | Use Case |
|---|---|---|---|
| Tier 1 (Binance, Coinbase) | 0.01–0.03% | $5M–$50M | Institutional, HFT |
| Tier 2 (Kraken, Bybit) | 0.03–0.10% | $500K–$5M | Active retail, professional |
| New exchange (launch target) | 0.10–0.30% | $50K–$500K | Retail, niche market |
| Unviable | >0.50% | <$10K | No sustainable business |

**Your target at launch:** 0.15% spread, $100,000 depth each side within 1% of mid-price. Requires at least one professional market maker with a contractual obligation.

---

## Market Impact Model

```python
def price_impact(trade_size_usd, order_book_depth_usd, elasticity=0.5):
    """
    Estimate price impact of a trade.
    elasticity: market microstructure parameter (0.3-0.7 for crypto)
    """
    impact_pct = (trade_size_usd / order_book_depth_usd) ** elasticity
    return impact_pct

# Example: $100,000 trade on exchange with $500,000 depth within 1%
impact = price_impact(100_000, 500_000, 0.5)
# impact ≈ 0.447% (0.447% of $50,000 BTC = $224 additional cost)
```

For institutional traders moving $1M+: market impact on a thin exchange makes the effective spread uncompetitive vs. larger exchanges. Market impact is why liquidity attracts liquidity — deep books compound.

---

## Fee Tier Structure That Attracts Professional Traders

```python
# Maker-taker fee schedule
FEE_SCHEDULE = [
    # (30-day_volume_usd, maker_fee_bps, taker_fee_bps)
    (0,          -1,  7),   # Level 0: -0.01% maker rebate, 0.07% taker
    (100_000,    -2,  6),   # Level 1
    (1_000_000,  -3,  5),   # Level 2
    (10_000_000, -4,  4),   # Level 3
    (50_000_000, -5,  3),   # Level 4: VIP
]

def calculate_fee(volume_30d, order_type, trade_size):
    for threshold, maker, taker in reversed(FEE_SCHEDULE):
        if volume_30d >= threshold:
            fee_bps = maker if order_type == 'maker' else taker
            fee = trade_size * fee_bps / 10000
            return fee
    return trade_size * FEE_SCHEDULE[0][2] / 10000
```

**The maker rebate is critical:** Professional market makers will only provide tight quotes if they earn a rebate for doing so. A negative maker fee (rebate) incentivizes limit order placement, which improves spread and depth. Revenue comes from the positive taker fee on the other side.

---

## Order Types That Professional Traders Require

**Post-Only orders:** Guarantee the order rests as a maker (earns rebate). If the order would execute immediately (taking liquidity), it is rejected instead of converted to a taker. Essential for market makers managing their rebate economics.

**Iceberg orders:** A large order that displays only a small portion in the order book. The rest is hidden and refills as the visible portion executes. Prevents front-running of large institutional orders.

**Time-Weighted Average Price (TWAP):** Breaks a large order into time-based slices to minimize market impact. [→ TWAP implementation](/crypto-exchange-order-types/)

**Stop-Loss OCO:** One-Cancels-the-Other combining a take-profit limit with a stop-loss. Required for retail risk management.

**Immediate-or-Cancel (IOC):** Fill what is available immediately; cancel the rest. For traders who do not want a resting order.

**Fill-or-Kill (FOK):** Fill completely or cancel entirely. For block traders who need complete execution or nothing.

---

## Latency Requirements by Trader Type

| Trader Type | Maximum Acceptable Latency | Order Type |
|---|---|---|
| HFT market maker | <1 millisecond | WebSocket, colocation |
| Algorithmic trader | <10 milliseconds | WebSocket, API |
| Active retail | <100 milliseconds | WebSocket, app |
| Passive retail | <1 second | REST API, app |

**Colocation:** Top exchanges offer server colocation (traders place servers in the same data center as the exchange's matching engine for sub-millisecond latency). Our exchange architecture supports colocation by design.

---

## FAQ

**Should a new exchange prioritize tight spreads or deep books?**
Neither — they are two outcomes of the same input: professional market maker relationships. A single committed market maker providing quotes within defined parameters simultaneously delivers tight spreads and adequate depth. Negotiate market maker obligations before launch; spreads and depth follow from those obligations.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Crypto Exchange Institutional Features — Prime Brokerage and API Trading | Clickmasters

---
**URL:** /crypto-exchange-institutional-features/
**Primary KW:** crypto exchange institutional features
**Secondary KWs:** institutional crypto exchange features, prime brokerage crypto, FIX API exchange, institutional trading features
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /crypto-exchange-development/, /crypto-exchange-api-design/, /centralized-exchange-development/

---

## H1: Crypto Exchange Institutional Features — Prime Brokerage, FIX API, and Subaccounts

**H2: Institutional traders and prime brokers require features that retail exchanges do not offer: FIX protocol API, sub-account management, portfolio margin, and direct market access. Here is the architecture for each.**

---

## FIX Protocol Integration

FIX (Financial Information eXchange) is the industry standard protocol for institutional order management systems (OMS). Every major institutional trading desk uses FIX — it connects their OMS (Bloomberg EMSX, FlexTrade, Fidessa) directly to the exchange without browser interfaces.

```
FIX Session Architecture:
OMS (Institutional Trader) 
    → FIX Gateway (TCP connection, persistent session)
    → Exchange FIX Engine (validates, normalizes FIX messages)
    → Internal API (translates to exchange's order format)
    → Matching Engine
    → FIX Drop Copy (execution reports back to OMS)
```

**Key FIX message types for crypto exchange:**
- `D` (New Order Single): Place a new order
- `F` (Order Cancel Request): Cancel existing order
- `G` (Order Cancel/Replace Request): Modify existing order
- `8` (Execution Report): Order acknowledgment, fill notification
- `9` (Order Cancel Reject): Cancel rejection notification

**FIX development cost:** $40,000–$80,000 for a production FIX gateway. Requires FIX certification testing with institutional clients.

---

## Sub-Account Architecture

Prime brokers and fund managers need to manage multiple trading accounts (one per fund or strategy) under a single master account.

```javascript
// Sub-account data model
const subAccountSchema = {
    masterAccountId: String,        // The prime broker's master account
    subAccountId: String,           // Individual fund/strategy account
    subAccountName: String,         // "Strategy Alpha", "Fund B", etc.
    balances: {
        BTC: Decimal,
        ETH: Decimal,
        USDC: Decimal,
        // ... other assets
    },
    
    // Position limits per sub-account
    positionLimits: {
        maxNetPosition: Map,        // Max net position per trading pair
        maxDailyVolume: Decimal,    // Max daily notional
        maxOpenOrders: Number,      // Maximum open orders count
    },
    
    // API key scoping
    apiKeys: [{
        key: String,
        scope: ['trade', 'read_only', 'withdraw'],
        subAccountRestriction: String  // Optional: key limited to specific sub-account
    }],
    
    // Internal transfer between sub-accounts (no blockchain tx needed)
    internalTransfers: Boolean
};
```

**Sub-account features required:**
- Independent balance tracking per sub-account
- API keys scoped to individual sub-accounts
- Consolidated master account reporting
- Internal fund transfers between sub-accounts (no withdrawal/deposit cycle)
- Sub-account position limits independent of master limits
- Unified settlement (net settlement across all sub-accounts at end of day)

---

## Portfolio Margin

Standard isolated margin: each position has its own collateral pool. Risk of one position does not affect others.

Portfolio margin (for institutional): a single collateral pool across all positions. Correlated positions (long ETH / short BTC futures) require less total collateral because losses on one offset gains on the other.

```python
# Portfolio margin calculation (simplified)
def calculate_portfolio_margin(positions):
    """
    Calculate margin requirement using portfolio-level risk assessment.
    positions: list of {asset, direction, size_usd, correlation_group}
    """
    # Standard isolated margin
    isolated_margin = sum(pos['size_usd'] * INITIAL_MARGIN_RATE for pos in positions)
    
    # Portfolio margin: offset correlated positions
    net_delta_by_group = {}
    for pos in positions:
        group = pos['correlation_group']
        delta = pos['size_usd'] if pos['direction'] == 'long' else -pos['size_usd']
        net_delta_by_group[group] = net_delta_by_group.get(group, 0) + delta
    
    # Portfolio margin = margin on net delta per correlation group
    portfolio_margin = sum(
        abs(net_delta) * INITIAL_MARGIN_RATE 
        for net_delta in net_delta_by_group.values()
    )
    
    # Apply portfolio margin discount (typically 20-40% savings)
    return min(isolated_margin, portfolio_margin * 1.1)  # Small buffer
```

---

## Block Trading Desk

For trades over $1M that would significantly move the market if placed in the public order book:

```javascript
// Block trade negotiation system
class BlockTradeDesk {
    async initiateBlockTrade(params) {
        const {
            pair,
            side,
            size,
            priceLimit,
            counterpartyIds  // Specific counterparties or 'ANY'
        } = params;
        
        // Send RFQ (Request for Quote) to potential counterparties
        const rfqId = await this.db.blockTrades.create({
            initiatorId: params.userId,
            pair, side, size, priceLimit,
            status: 'RFQ_SENT',
            expiresAt: new Date(Date.now() + 60000) // 60-second RFQ window
        });
        
        // Notify eligible counterparties
        await this.notifyCounterparties(rfqId, counterpartyIds, { pair, side, size });
        
        return { rfqId, expiresIn: 60 };
    }
    
    async respondToRFQ(rfqId, responderId, offeredPrice) {
        const rfq = await this.db.blockTrades.findById(rfqId);
        
        await this.db.blockTrades.addResponse({
            rfqId,
            responderId,
            price: offeredPrice,
            respondedAt: new Date()
        });
    }
    
    async acceptResponse(rfqId, responseId) {
        // Execute the block trade bilaterally
        // No order book interaction — direct match between parties
        await this.matchingEngine.executeBlockTrade(rfqId, responseId);
    }
}
```

---

## FAQ

**At what exchange volume level do institutional features become necessary?**
FIX protocol: institutional traders will not trade >$100,000/day without it — they cannot integrate their OMS to a REST-only exchange. Sub-accounts: needed when your first prime broker client signs up (typically at $500K+ daily volume from a single firm). Portfolio margin: needed to compete for derivatives-focused institutional volume. Build in sequence: REST API → WebSocket → FIX → Sub-accounts → Portfolio margin.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Crypto Exchange Regulatory Deep Dive — Licensing Strategy for US Expansion | Clickmasters

---
**URL:** /crypto-exchange-regulatory-strategy/
**Primary KW:** crypto exchange regulatory strategy US
**Secondary KWs:** exchange licensing strategy, money transmitter license exchange, how to get exchange licenses, BitLicense strategy
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /how-to-start-crypto-exchange/, /blockchain-regulatory-compliance-us/, /us-blockchain-regulations-complete/

---

## H1: Crypto Exchange Regulatory Strategy — The Multi-Year US Licensing Roadmap

**H2: Operating a US crypto exchange without proper licensing is a federal crime. Here is the realistic multi-year licensing roadmap that takes exchanges from bare minimum compliance to full 50-state coverage.**

---

## Year 1: Minimum Viable Compliance

**FinCEN MSB Registration (Week 1):**
Free, online, immediate confirmation. Required before any operations. Non-negotiable. URL: fincen.gov/msb-registrant-search

**AML Program (Month 1–2):**
Written AML policy, compliance officer designation, KYC procedures, transaction monitoring, SAR filing capability. We can provide a template AML program framework ($5,000–$10,000) that your compliance officer adapts and owns.

**State-by-state analysis (Month 2–3):**
Map every state's MTL requirement. Some states exempt certain activities or have no MTL requirement:
- States with no MTL requirement (as of 2025): Montana, South Carolina, a few others
- States with MTL but crypto-exempted: varies — check current status with legal counsel
- States requiring MTL: majority of US states

**Launch in exempt/favorable states first.** This is standard industry practice — establish revenue before investing in expensive MTL applications.

---

## Year 2: Priority State Licensing

**First priority states (largest populations, most active crypto markets):**

| State | License Type | Timeline | Cost (Approx) |
|---|---|---|---|
| Florida | Money Transmitter | 6–12 months | $10,000 + $100K bond |
| Texas | Money Transmitter | 4–8 months | $5,000 + $300K bond |
| Illinois | Transmitter of Money | 6–12 months | $8,000 + $100K bond |
| California | DFPI Registration | 6–12 months | $5,000 |
| Georgia | Money Transmitter | 4–8 months | $5,000 |

**Year 2 budget estimate:** $100,000–$200,000 in legal fees, application fees, and surety bonds for 5 priority states.

---

## Year 3: New York BitLicense

**Why last:** New York BitLicense is the most demanding, most expensive, and slowest state license. Timeline: 18–36 months from application. Cost: $50,000–$200,000 in legal fees + $100,000 application fee + ongoing compliance costs.

**What it requires:** Full application including financial statements (3 years), compliance program documentation, capitalization requirements, technical security review, cybersecurity policy, consumer protection program, and ongoing examination rights.

**Why it is worth pursuing:** New York is the largest financial market in the US. Without a BitLicense, you cannot serve New York residents. The institutional market (Wall Street, hedge funds, family offices in New York) requires a licensed exchange counterparty.

**BitLicense strategy:** Apply in Year 3 only after: revenue demonstrates the ability to support ongoing compliance costs, your compliance team has 2+ years of BSA/AML experience to document, and your technical security posture would withstand NYDFS examination.

---

## The Nationwide Coverage Path

**Year 4–5:** 30–40 state MTL coverage using NMLS (Nationwide Multi-State Licensing System) where available. The MSB Exam (uniform exam for money transmitters) and NMLS streamline multi-state expansion.

**Full 50-state + DC coverage:** Typically 5–7 years from launch. Annual MTL renewal costs: $150,000–$400,000 across all states.

---

## Cost Summary (5-Year Full Compliance Roadmap)

| Period | Activity | Cost |
|---|---|---|
| Year 1 | FinCEN + AML program | $25,000–$50,000 |
| Year 2 | 5 priority state MTLs | $100,000–$200,000 |
| Year 3 | NY BitLicense application | $150,000–$350,000 |
| Year 4–5 | 20–30 additional states | $200,000–$500,000 |
| Ongoing annually | MTL renewals + compliance | $200,000–$500,000/yr |
| **Total 5-year** | | **$675,000–$1,600,000** |

---

## FAQ

**Can we operate while MTL applications are pending?**
In most states: no — operating without a required MTL is illegal, and pending status does not grant permission to operate. In a few states: temporary licenses or provisional status may be available. Your licensing attorney must verify the specific rules for each state where you want to operate before you begin serving residents of that state.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Crypto Exchange Cold Storage Operations — Institutional Custody Procedures | Clickmasters

---
**URL:** /crypto-exchange-cold-storage/
**Primary KW:** crypto exchange cold storage
**Secondary KWs:** exchange cold wallet operations, institutional crypto cold storage, cold wallet procedures exchange
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /crypto-exchange-hot-wallet-architecture/, /crypto-exchange-development/, /crypto-wallet-mpc-architecture/

---

## H1: Crypto Exchange Cold Storage Operations — Procedures for Protecting 95%+ of Customer Assets

**H2: Cold storage holds the majority of customer assets in offline, air-gapped systems. The procedures for accessing cold storage are as important as the technical architecture — both must be documented, tested, and audited.**

---

## Cold Storage Technical Architecture

**Hardware:** Air-gapped computers (never connected to internet after key generation). Hardware Security Modules (HSMs) in FIPS 140-2 Level 3 certified offline devices. Dedicated Ledger Enterprise or Trezor hardware wallets for smaller exchanges.

**Key generation ceremony:**
1. Dedicated air-gapped machine — factory reset, never previously connected
2. OS installed from verified ISO, hash verified against official checksum
3. Key generation software run in offline environment
4. Multiple parties present (N-of-M signers) — ceremony must be witnessed
5. Key shares generated and distributed to individual custodians
6. Public keys recorded for address derivation
7. Air-gapped machine destroyed or permanently disconnected after ceremony

**Multi-signature architecture:**
- Minimum 3-of-5 multi-signature required for any cold withdrawal
- Signers: geographically distributed (different cities, countries for large exchanges)
- Organizational distribution: 2 signers from exchange, 1 from independent custodian, others from board members or investors
- Signer devices: HSM, Ledger Enterprise, or Trezor each — no software wallets

---

## Cold Storage Withdrawal Procedure

```
STANDARD COLD WITHDRAWAL PROCEDURE

Trigger: Hot wallet balance falls below 2% of total assets

Step 1 — Request initiation
- Treasury operations creates withdrawal request
- Documents: amount, destination (hot wallet address), business justification
- Requires sign-off from: CFO or CEO + Compliance Officer
- 24-hour waiting period begins

Step 2 — Signer notification (after 24 hours)
- All M-of-N signers notified via secure channel (Signal or encrypted email)
- Each signer independently verifies: destination address matches known hot wallet, amount is within expected range, no active security incident

Step 3 — Transaction construction
- Transaction constructed on air-gapped device by one signer
- Transaction exported via QR code or USB to signing device
- Never connected to internet

Step 4 — Independent verification (each signer)
- Each signer independently verifies transaction details on their device display
- Any signer can veto if details do not match expectations

Step 5 — Signing session
- M signers gather (physically or via secure video with hardware device shown on camera)
- Each signs independently on their hardware device
- Signatures combined (for multi-sig) or transaction assembled from partial signatures (for MPC)

Step 6 — Broadcast
- Signed transaction exported from air-gapped environment
- Broadcast to network via online computer
- Confirmation monitored until sufficient confirmations

Step 7 — Reconciliation
- Post-withdrawal balance verified on-chain
- Records updated in treasury management system
- Incident report filed (even for routine withdrawals — creates audit trail)

TARGET MAXIMUM FREQUENCY: Monthly or less for major cold→hot transfers
```

---

## Cold Storage Audit Requirements

**Self-audit (quarterly):**
- Verify cold wallet balances on-chain against expected amounts
- Confirm signer access credentials are current (no departed employees as signers)
- Test signing procedure with small test transaction
- Verify backup key shares are accessible and decryptable

**Third-party audit (annual):**
- Independent auditor verifies cold storage controls
- Proof-of-reserves audit (Merkle proof that cold + hot assets ≥ total customer liabilities)
- Penetration test of physical security
- Review of signing procedures and signer identity documentation

---

## Emergency Access Procedure

For scenarios where normal signers are unavailable (natural disaster, simultaneous incapacitation):

```
EMERGENCY ACCESS PROCEDURE (use only when normal procedure impossible)

Recovery threshold: Any 3 of 5 backup key holders can reconstruct the cold wallet
Backup key holders: Exchange CEO, CTO, independent trustee, two board members

Emergency activation requires:
1. Board resolution declaring emergency
2. Legal counsel involvement
3. All actions documented and reported to regulators within 72 hours
4. Post-emergency security review
```

---

## FAQ

**How often should cold wallet balances be verified?**
On-chain balance verification: daily (automated, compares expected vs actual balance). Physical signer access verification: quarterly. Full signing procedure test: semi-annually. Third-party proof-of-reserves audit: annually. FTX failed not because cold storage was technically broken but because customer assets were lent out without customer knowledge — on-chain verification alone cannot detect off-chain misuse of hot wallet assets.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Crypto Exchange Customer Support Infrastructure | Clickmasters

---
**URL:** /crypto-exchange-customer-support/
**Primary KW:** crypto exchange customer support
**Secondary KWs:** exchange support system, crypto exchange help desk, exchange customer service infrastructure
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /crypto-exchange-development/, /how-to-start-crypto-exchange/, /centralized-exchange-development/

---

## H1: Crypto Exchange Customer Support Infrastructure — Ticket System, Knowledge Base, and Escalation Design

**H2: Customer support for a crypto exchange is unlike standard SaaS support — users may have locked funds, failed deposits, or suspected fraud. Every support ticket has financial stakes. Here is the infrastructure that handles this correctly.**

---

## Support Tier Architecture

```
Tier 0 — Self-Service (target: resolves 60% of inquiries)
├── Knowledge base (how-to articles, FAQ)
├── Status page (real-time system status, incident history)
├── AI chatbot (common queries: deposit timing, withdrawal status)
└── Account self-service portal (transaction history, export statements)

Tier 1 — General Support (target: resolves 30% of remaining)
├── Ticket-based support (Zendesk or similar)
├── Response SLA: 24 hours standard, 4 hours VIP
├── Training: deposit/withdrawal status, basic KYC, general platform
└── Cannot: access funds, modify transactions, override compliance

Tier 2 — Technical and Compliance (target: resolves 8%)
├── Complex technical issues (blockchain transaction investigation)
├── Compliance-adjacent (KYC escalations, suspicious account review)
├── Response SLA: 4 hours standard, 1 hour for potential compromise
└── Has: blockchain explorer access, limited account investigation tools

Tier 3 — Security and Fraud (target: resolves 2%)
├── Active compromise investigation
├── Fraud pattern analysis
├── Regulatory inquiry response
└── 24/7 on-call rotation required
```

---

## The Five Most Common Crypto Exchange Support Tickets

**#1 — Deposit not credited (40% of tickets):**
User sent crypto to deposit address, did not receive credit. Common causes: insufficient confirmations (still pending), wrong network (USDC on Polygon sent to Ethereum address), sent to wrong address. Resolution: check on-chain status, confirm transaction hash, verify address matches, check confirmation count.

**#2 — Withdrawal not received (25% of tickets):**
User requested withdrawal, did not arrive. Common causes: AML hold (destination address flagged), processing delay during high volume, blockchain congestion. Resolution: check withdrawal status in admin panel, provide transaction hash, explain AML process without disclosing investigation details.

**#3 — KYC verification stuck (15% of tickets):**
User uploaded ID documents, stuck in "pending" status. Common causes: blurry image, document rejected by OCR, manual review queue. Resolution: check Jumio/Persona status, re-trigger review if expired, request clearer re-upload.

**#4 — Login / 2FA issues (10% of tickets):**
Lost access to 2FA device, account locked. High-security: requires identity re-verification before 2FA reset. Ticket resolution requires human compliance review — cannot be automated.

**#5 — Transaction disputes (10% of tickets):**
User claims they did not authorize a transaction, or believes they were charged incorrectly. Resolution: transaction audit trail, IP log verification, 2FA confirmation log. Suspicious: escalate to Tier 3.

---

## Compliance-Adjacent Support Rules

**Never tell a user their account is flagged for AML review.** This enables money laundering (the user can move funds elsewhere before investigation completes). Standard phrase: "Your account is under review. We cannot provide additional details at this time."

**Never discuss SAR filing with the account subject.** Tipping off a SAR subject is a federal crime (31 U.S.C. § 5318(g)(2)).

**Fraud investigation:** All fraud investigations must be coordinated with your compliance team, not resolved by customer support independently.

---

## Support SLA Matrix

| Priority | Definition | Response Time | Resolution Target |
|---|---|---|---|
| Critical | Potential fund compromise, active fraud | 30 minutes | 4 hours |
| High | Regulatory inquiry, locked account with urgent need | 2 hours | 24 hours |
| Medium | Delayed withdrawal, KYC issue | 24 hours | 72 hours |
| Low | General inquiry, informational | 48 hours | 7 days |

---

## FAQ

**How many support agents do we need at launch?**
For an exchange processing under $1M/day: 2 full-time support agents (1 for coverage, 1 for volume) + 1 part-time compliance liaison. One support agent per $500K–$1M in daily volume as you scale. Compliance investigation: 1 dedicated compliance analyst per $10M+ in daily volume.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

**SCHEMA on all Phase 3 exchange pages:** Article + FAQPage + BreadcrumbList.
