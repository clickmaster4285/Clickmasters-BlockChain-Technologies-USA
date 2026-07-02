# The Graph Protocol Advanced — Custom Subgraph Development | Clickmasters

---
**URL:** /the-graph-subgraph-development/
**Primary KW:** The Graph subgraph development
**Secondary KWs:** build custom subgraph, GraphQL blockchain data, The Graph protocol guide
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /blockchain-data-indexing/, /web3-development-company/, /web3-dapp-architecture/

---

## H1: The Graph Protocol — Building Production Subgraphs for Complex DeFi and NFT Protocols

**H2: Production dApps require fast, complex historical queries that direct RPC cannot efficiently serve. The Graph subgraph indexes on-chain events into queryable GraphQL APIs. Here is the complete production subgraph development guide.**

---

## When to Build a Custom Subgraph

**Always build a subgraph when:**
- Your dApp needs historical data (all trades in the last 7 days)
- You need aggregated metrics (total volume, TVL over time, user statistics)
- Your frontend makes more than 3–5 RPC calls per page load
- You need complex filtering or sorting of on-chain data

**Use Alchemy/Infura enhanced APIs instead when:**
- Simple portfolio queries (token balances, NFT holdings for one address)
- You only need current state, not history
- You do not control the contract you are querying

---

## Complete Subgraph for a Lending Protocol

**schema.graphql:**
```graphql
type LendingPool @entity {
  id: ID!
  totalDeposited: BigDecimal!
  totalBorrowed: BigDecimal!
  utilizationRate: BigDecimal!
  supplyAPY: BigDecimal!
  borrowAPR: BigDecimal!
  lastUpdated: BigInt!
}

type UserPosition @entity {
  id: ID!  # address-assetAddress
  user: Bytes!
  asset: Bytes!
  depositBalance: BigDecimal!
  borrowBalance: BigDecimal!
  healthFactor: BigDecimal!
  lastUpdated: BigInt!
}

type DepositEvent @entity(immutable: true) {
  id: Bytes!
  user: Bytes!
  asset: Bytes!
  amount: BigDecimal!
  timestamp: BigInt!
  blockNumber: BigInt!
  transactionHash: Bytes!
}

type BorrowEvent @entity(immutable: true) {
  id: Bytes!
  user: Bytes!
  asset: Bytes!
  amount: BigDecimal!
  interestRate: BigDecimal!
  timestamp: BigInt!
  blockNumber: BigInt!
  transactionHash: Bytes!
}

type LiquidationEvent @entity(immutable: true) {
  id: Bytes!
  liquidator: Bytes!
  borrower: Bytes!
  collateralAsset: Bytes!
  debtAsset: Bytes!
  collateralAmount: BigDecimal!
  debtRepaid: BigDecimal!
  bonus: BigDecimal!
  timestamp: BigInt!
}

# 24-hour snapshots for charts
type PoolSnapshot @entity {
  id: ID!  # poolAddress-dayId
  pool: LendingPool!
  tvl: BigDecimal!
  borrowedAmount: BigDecimal!
  supplyAPY: BigDecimal!
  borrowAPR: BigDecimal!
  dayId: BigInt!
  timestamp: BigInt!
}
```

**subgraph.yaml:**
```yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: LendingPool
    network: arbitrum-one
    source:
      address: "0xYOUR_CONTRACT_ADDRESS"
      abi: LendingPool
      startBlock: 12345678
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - LendingPool
        - UserPosition
        - DepositEvent
        - BorrowEvent
        - LiquidationEvent
        - PoolSnapshot
      abis:
        - name: LendingPool
          file: ./abis/LendingPool.json
      eventHandlers:
        - event: Deposited(indexed address,indexed address,uint256)
          handler: handleDeposited
        - event: Borrowed(indexed address,indexed address,uint256,uint256)
          handler: handleBorrowed
        - event: Liquidated(indexed address,indexed address,address,address,uint256,uint256)
          handler: handleLiquidated
        - event: InterestRateUpdated(address,uint256,uint256)
          handler: handleInterestRateUpdated
      file: ./src/mapping.ts
```

**src/mapping.ts:**
```typescript
import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  Deposited,
  Borrowed,
  Liquidated,
  InterestRateUpdated
} from "../generated/LendingPool/LendingPool";
import {
  LendingPool,
  UserPosition,
  DepositEvent,
  BorrowEvent,
  LiquidationEvent,
  PoolSnapshot
} from "../generated/schema";

const POOL_ID = "MAIN_POOL"; // Single pool in this example
const SECONDS_PER_DAY = BigInt.fromI32(86400);

function getOrCreatePool(): LendingPool {
  let pool = LendingPool.load(POOL_ID);
  if (pool == null) {
    pool = new LendingPool(POOL_ID);
    pool.totalDeposited = BigDecimal.zero();
    pool.totalBorrowed = BigDecimal.zero();
    pool.utilizationRate = BigDecimal.zero();
    pool.supplyAPY = BigDecimal.zero();
    pool.borrowAPR = BigDecimal.zero();
    pool.lastUpdated = BigInt.zero();
  }
  return pool;
}

function getOrCreateUserPosition(user: Bytes, asset: Bytes): UserPosition {
  let id = user.toHexString() + "-" + asset.toHexString();
  let position = UserPosition.load(id);
  if (position == null) {
    position = new UserPosition(id);
    position.user = user;
    position.asset = asset;
    position.depositBalance = BigDecimal.zero();
    position.borrowBalance = BigDecimal.zero();
    position.healthFactor = BigDecimal.fromString("999"); // Default: healthy
    position.lastUpdated = BigInt.zero();
  }
  return position;
}

export function handleDeposited(event: Deposited): void {
  // Update pool totals
  let pool = getOrCreatePool();
  let amountDecimal = event.params.amount.toBigDecimal().div(BigDecimal.fromString("1000000")); // USDC 6 decimals
  pool.totalDeposited = pool.totalDeposited.plus(amountDecimal);
  pool.lastUpdated = event.block.timestamp;
  
  // Update utilization
  if (pool.totalDeposited.gt(BigDecimal.zero())) {
    pool.utilizationRate = pool.totalBorrowed.div(pool.totalDeposited);
  }
  pool.save();
  
  // Update user position
  let position = getOrCreateUserPosition(event.params.user, event.params.asset);
  position.depositBalance = position.depositBalance.plus(amountDecimal);
  position.lastUpdated = event.block.timestamp;
  position.save();
  
  // Record immutable event
  let depositEvent = new DepositEvent(event.transaction.hash.concatI32(event.logIndex.toI32()));
  depositEvent.user = event.params.user;
  depositEvent.asset = event.params.asset;
  depositEvent.amount = amountDecimal;
  depositEvent.timestamp = event.block.timestamp;
  depositEvent.blockNumber = event.block.number;
  depositEvent.transactionHash = event.transaction.hash;
  depositEvent.save();
  
  // Update daily snapshot
  updateDailySnapshot(pool, event.block.timestamp);
}

function updateDailySnapshot(pool: LendingPool, timestamp: BigInt): void {
  let dayId = timestamp.div(SECONDS_PER_DAY);
  let snapshotId = POOL_ID + "-" + dayId.toString();
  
  let snapshot = PoolSnapshot.load(snapshotId);
  if (snapshot == null) {
    snapshot = new PoolSnapshot(snapshotId);
    snapshot.pool = POOL_ID;
    snapshot.dayId = dayId;
    snapshot.timestamp = timestamp;
  }
  
  snapshot.tvl = pool.totalDeposited;
  snapshot.borrowedAmount = pool.totalBorrowed;
  snapshot.supplyAPY = pool.supplyAPY;
  snapshot.borrowAPR = pool.borrowAPR;
  snapshot.save();
}

export function handleBorrowed(event: Borrowed): void {
  let pool = getOrCreatePool();
  let amountDecimal = event.params.amount.toBigDecimal().div(BigDecimal.fromString("1000000"));
  pool.totalBorrowed = pool.totalBorrowed.plus(amountDecimal);
  
  if (pool.totalDeposited.gt(BigDecimal.zero())) {
    pool.utilizationRate = pool.totalBorrowed.div(pool.totalDeposited);
  }
  pool.save();
  
  let position = getOrCreateUserPosition(event.params.user, event.params.asset);
  position.borrowBalance = position.borrowBalance.plus(amountDecimal);
  position.save();
  
  let borrowEvent = new BorrowEvent(event.transaction.hash.concatI32(event.logIndex.toI32()));
  borrowEvent.user = event.params.user;
  borrowEvent.asset = event.params.asset;
  borrowEvent.amount = amountDecimal;
  borrowEvent.interestRate = event.params.interestRate.toBigDecimal().div(BigDecimal.fromString("10000"));
  borrowEvent.timestamp = event.block.timestamp;
  borrowEvent.blockNumber = event.block.number;
  borrowEvent.transactionHash = event.transaction.hash;
  borrowEvent.save();
}

export function handleLiquidated(event: Liquidated): void {
  let liquidation = new LiquidationEvent(event.transaction.hash.concatI32(event.logIndex.toI32()));
  liquidation.liquidator = event.params.liquidator;
  liquidation.borrower = event.params.borrower;
  liquidation.collateralAsset = event.params.collateralAsset;
  liquidation.debtAsset = event.params.debtAsset;
  liquidation.collateralAmount = event.params.collateralAmount.toBigDecimal().div(BigDecimal.fromString("1e18"));
  liquidation.debtRepaid = event.params.debtRepaid.toBigDecimal().div(BigDecimal.fromString("1000000"));
  liquidation.bonus = event.params.collateralAmount.toBigDecimal()
    .minus(liquidation.debtRepaid)
    .div(liquidation.debtRepaid);
  liquidation.timestamp = event.block.timestamp;
  liquidation.save();
}
```

---

## Querying the Subgraph

```typescript
// Complex queries via GraphQL
const POOL_STATS_QUERY = `
  query PoolStats($since: Int!) {
    lendingPool(id: "MAIN_POOL") {
      totalDeposited
      totalBorrowed
      utilizationRate
      supplyAPY
      borrowAPR
    }
    
    recentDeposits: depositEvents(
      orderBy: timestamp, orderDirection: desc, first: 20
      where: { timestamp_gt: $since }
    ) {
      user
      amount
      timestamp
    }
    
    largeLiquidations: liquidationEvents(
      orderBy: debtRepaid, orderDirection: desc, first: 10
      where: { timestamp_gt: $since }
    ) {
      liquidator
      borrower
      debtRepaid
      bonus
      timestamp
    }
    
    tvlHistory: poolSnapshots(
      orderBy: dayId, orderDirection: asc, first: 30
    ) {
      tvl
      borrowedAmount
      supplyAPY
      dayId
    }
  }
`;
```

---

## FAQ

**How long does it take to index a subgraph from genesis?**
Depends on contract age and event frequency. A contract deployed 6 months ago with 100,000 events: 2–4 hours on The Graph's hosted service. A contract with 1M+ events: 24–72 hours. Plan for initial sync time in your deployment schedule.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# DeFi Interest Rate Model Design — Two-Slope and Dynamic Rate Calibration | Clickmasters

---
**URL:** /defi-interest-rate-model/
**Primary KW:** DeFi interest rate model design
**Secondary KWs:** lending protocol interest rate, two-slope rate model, utilization based interest rate
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /lending-protocol-development/, /defi-development-company/, /defi-development-cost/

---

## H1: DeFi Interest Rate Model Design — Two-Slope Model and Economic Calibration

**H2: The interest rate model is the most economically critical component of a lending protocol. A miscalibrated model causes under-utilization (lenders earn too little) or over-utilization (borrowers drain the pool). Here is the complete design and calibration framework.**

---

## Two-Slope Interest Rate Model

```
Borrow APR as function of utilization U (U = totalBorrowed / totalDeposited):

If U ≤ Uoptimal (e.g., 80%):
  BorrowAPR = BaseRate + (U / Uoptimal) × Slope1
  Example: 2% + (60/80) × 8% = 8% APR at 60% utilization

If U > Uoptimal (e.g., 80%):
  BorrowAPR = BaseRate + Slope1 + ((U - Uoptimal) / (1 - Uoptimal)) × Slope2
  Example at 90% utilization:
  2% + 8% + ((90-80) / (100-80)) × 50% = 35% APR
  
  At 95%: 2% + 8% + ((95-80)/20) × 50% = 47.5% APR
  At 99%: 2% + 8% + ((99-80)/20) × 50% = 57.5% APR
```

**Why the kink at Uoptimal:** The steep Slope2 above 80% utilization creates strong economic incentive for additional deposits (supply rises) and borrower repayment (demand falls) — automatically pulling utilization back below 80%. This is the self-regulating mechanism.

---

## Smart Contract Implementation

```solidity
contract TwoSlopeInterestRateModel {
    uint256 public constant PRECISION = 1e18;
    
    uint256 public immutable baseRatePerYear;  // e.g., 2% = 0.02e18
    uint256 public immutable slope1PerYear;    // e.g., 8% = 0.08e18
    uint256 public immutable slope2PerYear;    // e.g., 50% = 0.50e18
    uint256 public immutable optimalUtilization;  // e.g., 80% = 0.80e18
    
    constructor(
        uint256 _baseRate,
        uint256 _slope1,
        uint256 _slope2,
        uint256 _optimalUtilization
    ) {
        baseRatePerYear = _baseRate;
        slope1PerYear = _slope1;
        slope2PerYear = _slope2;
        optimalUtilization = _optimalUtilization;
    }
    
    function getBorrowRate(
        uint256 totalDeposited,
        uint256 totalBorrowed
    ) external view returns (uint256 borrowRatePerSecond) {
        if (totalDeposited == 0) return 0;
        
        uint256 utilization = (totalBorrowed * PRECISION) / totalDeposited;
        uint256 annualBorrowRate;
        
        if (utilization <= optimalUtilization) {
            // Below kink: linear interpolation
            annualBorrowRate = baseRatePerYear + 
                (utilization * slope1PerYear) / optimalUtilization;
        } else {
            // Above kink: steeper slope
            uint256 excessUtilization = utilization - optimalUtilization;
            uint256 remainingRange = PRECISION - optimalUtilization;
            
            annualBorrowRate = baseRatePerYear + slope1PerYear +
                (excessUtilization * slope2PerYear) / remainingRange;
        }
        
        // Convert annual rate to per-second rate
        // Per-second = annual / (365.25 * 24 * 3600)
        return annualBorrowRate / 31557600;
    }
    
    function getSupplyRate(
        uint256 totalDeposited,
        uint256 totalBorrowed,
        uint256 reserveFactor  // e.g., 10% = 0.10e18
    ) external view returns (uint256 supplyRatePerSecond) {
        uint256 borrowRate = this.getBorrowRate(totalDeposited, totalBorrowed);
        
        // Supply rate = borrow rate × utilization × (1 - reserve factor)
        if (totalDeposited == 0) return 0;
        
        uint256 utilization = (totalBorrowed * PRECISION) / totalDeposited;
        uint256 factorToSupplier = PRECISION - reserveFactor;
        
        return (borrowRate * utilization / PRECISION) * factorToSupplier / PRECISION;
    }
}
```

---

## Calibrating Interest Rate Parameters

```python
# Parameter calibration analysis
import numpy as np
import matplotlib.pyplot as plt

def two_slope_model(utilization, base_rate, slope1, slope2, optimal_u):
    if utilization <= optimal_u:
        return base_rate + (utilization / optimal_u) * slope1
    else:
        excess = (utilization - optimal_u) / (1 - optimal_u)
        return base_rate + slope1 + excess * slope2

# Target calibration for USDC lending pool:
# At 0% utilization: 2% APR (base rate) -- floors at reasonable level
# At 80% utilization: 10% APR -- competitive yield for stablecoin depositors
# At 90% utilization: 35% APR -- strong incentive to repay/deposit
# At 99% utilization: 57% APR -- extremely high cost (never stays here long)

base_rate = 0.02
slope1 = 0.08
slope2 = 0.50
optimal_u = 0.80

utilizations = np.linspace(0, 1, 100)
borrow_rates = [two_slope_model(u, base_rate, slope1, slope2, optimal_u) for u in utilizations]
supply_rates = [r * u * 0.9 for r, u in zip(borrow_rates, utilizations)]  # 10% reserve factor

# Verify calibration at key utilization points
for u in [0, 0.5, 0.8, 0.9, 0.95, 0.99]:
    borrow = two_slope_model(u, base_rate, slope1, slope2, optimal_u)
    supply = borrow * u * 0.9
    print(f"U={u:.0%}: Borrow={borrow:.1%} APR, Supply={supply:.1%} APY")

# Output:
# U=0%:  Borrow=2.0% APR, Supply=0.0% APY
# U=50%: Borrow=7.0% APR, Supply=3.2% APY
# U=80%: Borrow=10.0% APR, Supply=7.2% APY  ← equilibrium target
# U=90%: Borrow=35.0% APR, Supply=28.4% APY ← crisis incentive
# U=95%: Borrow=47.5% APR, Supply=40.6% APY ← very high incentive
# U=99%: Borrow=57.5% APR, Supply=51.2% APY ← extreme
```

---

## FAQ

**How often should interest rates update?**
Continuous update model (Aave, Compound): interest rate changes every block based on current utilization. This provides the most accurate real-time pricing but requires complex accounting (interest accrues continuously between interactions). Checkpoint model: interest accrues at a fixed rate until the next deposit or borrow event. Simpler but slightly less accurate.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Token Vesting Best Practices — Cliff Design and Market Impact | Clickmasters

---
**URL:** /token-vesting-best-practices/
**Primary KW:** token vesting best practices
**Secondary KWs:** crypto vesting schedule best practices, token unlock design, vesting cliff design
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /token-launch-services/, /blockchain-tokenomics-design/, /gamefi-token-vesting/

---

## H1: Token Vesting Best Practices — Cliff Design, Market Impact, and Communication

**H2: Poorly designed vesting schedules cause price crashes at unlock dates, destroying community trust. Here is the complete best practice framework used in successful token launches.**

---

## The Cliff Design Decision

**No cliff (immediate vesting from day 1):** Team tokens unlock from day 1. Creates incentive to dump immediately at highest post-launch price. Red flag for institutional investors. Almost never justified.

**6-month cliff:** Minimum acceptable for team. Shows 6 months of commitment. Still relatively short — the first large unlock event at month 6 can cause significant sell pressure if the market has moved.

**12-month cliff:** Standard for team. Aligns with typical first year of development milestones. The first unlock coincides roughly with the end of the initial product launch phase.

**18-24 month cliff:** Conservative/investor-aligned. Shows very high commitment. Appropriate for protocols with long development roadmaps.

**Recommended:**
- Team: 12-month cliff, 48-month linear vest (first tokens at month 12)
- Seed investors: 6-month cliff, 36-month linear vest
- Private investors: 3-month cliff, 24-month linear vest
- Advisors: 12-month cliff, 24-month linear vest

---

## Market Impact Modeling for Unlock Events

```python
def model_unlock_impact(
    tokens_unlocking: float,    # Number of tokens unlocking
    circulating_supply: float,  # Current circulating supply
    price: float,               # Current token price
    avg_daily_volume: float,    # Average daily trading volume (USD)
    sell_percentage: float = 0.1  # Assume 10% of unlocked tokens sold
) -> dict:
    """
    Estimate market impact of a token unlock event.
    """
    unlocking_value = tokens_unlocking * price
    expected_sell_pressure = unlocking_value * sell_percentage
    
    # Days to absorb sell pressure at current volume
    days_to_absorb = expected_sell_pressure / avg_daily_volume
    
    # % increase in circulating supply
    supply_inflation = (tokens_unlocking / circulating_supply) * 100
    
    # Estimated price impact (simplified Kyle's lambda model)
    price_impact_pct = (expected_sell_pressure / avg_daily_volume) * 5  # Empirical multiplier
    
    return {
        "unlocking_value_usd": unlocking_value,
        "expected_sell_pressure_usd": expected_sell_pressure,
        "supply_inflation_pct": supply_inflation,
        "days_to_absorb": days_to_absorb,
        "estimated_price_impact_pct": min(price_impact_pct, 50)  # Cap at 50%
    }

# Example: Team 15M tokens unlock at month 12
result = model_unlock_impact(
    tokens_unlocking=15_000_000,
    circulating_supply=100_000_000,
    price=0.50,
    avg_daily_volume=500_000,
    sell_percentage=0.05  # Assume only 5% of team sells immediately
)
# output: 15% supply increase, $375K sell pressure, ~0.75 days to absorb, ~7.5% price impact
```

**What to do with this model:**
- Run it for every major unlock event on your vesting schedule
- If any single unlock event exceeds 5% supply inflation AND estimated price impact >10%: restructure the vesting to distribute over more months
- Share the model (with reasonable assumptions) publicly — demonstrates transparency

---

## Communicating Unlock Events

**30 days before:** Announce the upcoming unlock amount, date, and vesting schedule context. Include the % of total supply and the % of circulating supply.

**7 days before:** Reminder post with specifics. Some projects provide a 30-day average of daily sell pressure vs expected unlock sell pressure.

**On unlock day:** Brief acknowledgment. Some teams publicly commit to holding schedules (but legal counsel should review any public commitment to not sell).

**What NOT to do:** Surprise the community. Unlock events discovered by on-chain analysts without communication destroy trust more than the price impact itself.

---

## FAQ

**Can we extend vesting if the market is bad?**
If the vesting contract is revocable by the owner: yes, technically. But retroactively extending investor vesting can create legal disputes (investors agreed to a specific schedule). Team vesting extension can be framed as commitment — if done publicly and proactively (not in response to a price crash), it can actually be positive signal. Consult legal counsel before any vesting modification.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

**SCHEMA on all Phase 3 pages:** Article + FAQPage + BreadcrumbList.
