## H1: Automated Market Maker Advanced Design — Curve Stableswap and Balancer Weighted Pools

**URL:** /amm-advanced-design/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /defi-development-company/, /dex-smart-contract-development/, /concentrated-liquidity-market-making/

Uniswap V2's constant product (x·y=k) is just one AMM formula. Curve's stableswap and Balancer's weighted pools address different trading needs. Here is the mathematics and implementation.

### Curve StableSwap Invariant

Curve's innovation: concentrate liquidity near the peg price (1:1 for stablecoins) while maintaining the constant product behavior for large imbalances.

```python
def curve_stableswap_invariant(x_values: list, A: float) -> float:
    """
    Curve's StableSwap invariant: combination of constant sum and constant product
    
    D = total value (the invariant)
    A = amplification coefficient (higher A = more concentrated near peg)
    
    A * n^n * sum(x_i) + D = A * D * n^n + D^(n+1) / n^n * prod(x_i)
    """
    n = len(x_values)
    S = sum(x_values)
    P = 1
    for x in x_values:
        P *= x
    
    # Solve for D using Newton's method
    D = S  # Initial guess
    Ann = A * n ** n
    
    for _ in range(255):  # Max iterations
        D_prev = D
        Dpn = D ** (n + 1)
        D_pn_prod = Dpn / (n ** n * P)
        
        D = (Ann * S + n * D_pn_prod) * D / ((Ann - 1) * D + (n + 1) * D_pn_prod)
        
        if abs(D - D_prev) <= 1:
            break
    
    return D

# At A=100 (typical Curve value), price impact for $1M USDC→USDT swap
# in a $100M pool: ~0.01% (vs ~1% for Uniswap V2)
# The higher A, the more capital efficient near the peg
```

### Balancer Weighted Pools

Balancer generalizes Uniswap V2 to support up to 8 tokens with configurable weights (not 50/50):

```
Uniswap V2 invariant: x * y = k  (50/50 weights)
Balancer invariant: x^0.5 * y^0.5 = k  (equivalent)

Balancer general: Σ(x_i^w_i) = k  where w_i are weights summing to 1
Example: 80/20 ETH/USDC pool
  ETH^0.8 * USDC^0.2 = k

Effect: 80/20 pool holds much more ETH relative to USDC
  This creates less price impact for large ETH trades (more depth on the side that has larger weight)
  But creates more impermanent loss for USDC (smaller weight side more exposed)
```

### Balancer Pool Contract Interface

```solidity
interface IWeightedPool {
    
    // Swap between any two tokens in the pool
    function swap(
        IVault.SingleSwap memory singleSwap,
        IVault.FundManagement memory funds,
        uint256 limit,
        uint256 deadline
    ) external returns (uint256);
    
    // Get pool ID (needed for Balancer Vault interactions)
    function getPoolId() external view returns (bytes32);
    
    // Get normalized weights
    function getNormalizedWeights() external view returns (uint256[] memory);
    
    // Get spot price (in BPT terms)
    function getSwapFeePercentage() external view returns (uint256);
}

// Example: Join a Balancer 80/20 ETH/USDC pool
interface IVault {
    function joinPool(
        bytes32 poolId,
        address sender,
        address recipient,
        JoinPoolRequest memory request
    ) external;
    
    struct JoinPoolRequest {
        IAsset[] assets;          // Pool tokens
        uint256[] maxAmountsIn;   // Max you'll contribute of each
        bytes userData;           // Pool-specific encode (join type, amounts)
        bool fromInternalBalance;
    }
}
```

### FAQ

**When should you use Curve vs Uniswap V3 for a stablecoin pair?**
Curve: when you want maximum capital efficiency for assets that should trade exactly at 1:1 (USDC/USDT, stETH/ETH, FRAX/USDC). Curve's stableswap invariant provides dramatically lower slippage than Uniswap V3 even with concentrated liquidity for these pairs. Uniswap V3: when you want flexibility and integration with the broader Uniswap ecosystem. Curve tends to dominate for stablecoin-to-stablecoin volume; Uniswap V3 for stable-to-volatile.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Cross-Chain Token Deployment — Omnichain Fungible Tokens and Lock-Unlock Patterns

**URL:** /cross-chain-token-deployment/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /blockchain-bridge-development/, /token-launch-services/, /smart-contract-development/

Deploying a token that exists natively on multiple chains requires careful design to prevent double-spending while maintaining fungibility.

### Pattern 1: Canonical Home + Wrapped Copies

```
The "hub and spoke" model:
  Home chain (e.g., Ethereum): mints and burns canonical tokens
  Bridge locks tokens on Ethereum, mints wrapped on destination
  
  Ethereum: MYTOKEN (100M supply, canonical)
  Arbitrum: wMYTOKEN (wrapped version, backed by locked Ethereum tokens)
  Polygon: wMYTOKEN (another wrapped version)
  
  Bridge contract on Ethereum: "lock/release" (holds locked tokens)
  Bridge contracts on L2s: "mint/burn" (creates wrapped tokens)
  
RISK: Bridge contract on Ethereum holds ALL locked tokens
  → Prime target for exploitation (concentrated custody)
```

### Pattern 2: LayerZero OFT (Omnichain Fungible Token)

```solidity
// OFT: tokens are burned on source, minted on destination
// No bridge contract holding custody — just atomic burn/mint

import {OFT} from "@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFT.sol";

contract MyOmnichainToken is OFT {
    
    constructor(
        string memory name,
        string memory symbol,
        address lzEndpoint,
        address owner
    ) OFT(name, symbol, lzEndpoint, owner) {
        // Token is deployed on each chain
        // On each chain: same contract, same symbol
        // LayerZero handles burn-on-source, mint-on-destination
    }
    
    // No special functions needed: OFT base handles cross-chain transfer
    // Users call: oft.send(dstEid, sendParam, messagingFee, refundAddress)
}

// Frontend: send tokens from Arbitrum to Base
async function sendOFT(amount, destinationEid) {
    const sendParam = {
        dstEid: destinationEid,        // Destination chain (Base = 30184)
        to: ethers.zeroPadValue(recipientAddress, 32),
        amountLD: amount,
        minAmountLD: amount * 99n / 100n,  // 1% slippage tolerance
        extraOptions: "0x",
        composeMsg: "0x",
        oftCmd: "0x"
    };
    
    const [nativeFee] = await oft.quoteSend(sendParam, false);
    
    const tx = await oft.send(
        sendParam,
        { nativeFee, lzTokenFee: 0n },
        recipientAddress,
        { value: nativeFee }
    );
    
    await tx.wait();
    // Tokens burned on source, minted on destination automatically
}
```

### Pattern 3: Circle CCTP for USDC (Native Burn/Mint)

The gold standard for USDC cross-chain: Circle's own burn/mint mechanism with no bridge custody:

```
User burns USDC on Ethereum → Circle observes the burn → attestation issued
→ User submits attestation to destination chain → Native USDC minted on destination

Security: Circle's own attestation server validates burns
No third-party bridge contract holds funds
Every USDC on every chain is backed by Circle's reserve
```

### FAQ

**How does the total supply work with OFT if tokens exist on multiple chains?**
With OFT: the total supply is globally consistent. When 1,000 tokens are burned on Arbitrum, 1,000 tokens are minted on Base. The sum of all balances across all chains always equals the original supply. This is enforced by LayerZero's messaging: the burn transaction on the source chain emits a message that triggers the mint on the destination. If the message is lost (relayer failure): the tokens don't arrive at the destination but are also burned on source — user can retry with same message.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Yield Farming Protocol Development — Gauges, Bribes, and Vote-Escrowed Models

**URL:** /yield-farming-protocol-development/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /defi-development-company/, /defi-yield-optimization-vault/, /blockchain-tokenomics-design/

The veToken gauge model (Curve, Balancer, Frax) is the most sophisticated liquidity incentive system in DeFi. Here is the complete implementation guide.

### The Gauge System

A gauge is a smart contract that receives protocol token emissions and distributes them to LPs based on veToken votes.

```
VOTING POWER:
  User locks 1,000 CRV for 4 years → gets 1,000 veCRV
  User locks 1,000 CRV for 1 year → gets 250 veCRV (25% of max lock)
  
GAUGE VOTING:
  veCRV holders allocate their vote weight to gauges
  Weekly snapshot: how much vote weight each gauge has
  Emission rate proportional to vote weight received
  
  Gauge A: 40% of votes → 40% of weekly emissions
  Gauge B: 35% of votes → 35% of weekly emissions
  Gauge C: 25% of votes → 25% of weekly emissions
  
BRIBERY:
  Protocol X wants emissions in Gauge A to attract LPs to their pool
  Protocol X pays weekly bribes to veCRV holders who vote for Gauge A
  Bribe market: Votium (Curve), Hidden Hand (Balancer)
  Current bribery economics: $0.20–$0.50 of bribes → $1.00 of emission value
```

### GaugeController Implementation

```solidity
contract GaugeController {
    
    // veToken contract
    IVotingEscrow public votingEscrow;
    
    // Gauge weights
    mapping(address => uint256) public gaugeWeight;     // gauge => total vote weight
    mapping(address => mapping(address => uint256)) public userVoteWeight; // user => gauge => weight
    mapping(address => uint256) public lastVote;        // user => last vote timestamp
    
    uint256 public constant WEIGHT_VOTE_DELAY = 10 days;
    
    // User allocates their vote power to gauges
    function voteForGaugeWeights(
        address[] calldata gauges,
        uint256[] calldata weights  // Must sum to 10000 (100%)
    ) external {
        require(gauges.length == weights.length, "Length mismatch");
        require(
            block.timestamp > lastVote[msg.sender] + WEIGHT_VOTE_DELAY,
            "Vote too soon"
        );
        
        uint256 totalWeight;
        for (uint256 i = 0; i < weights.length; i++) {
            totalWeight += weights[i];
        }
        require(totalWeight == 10000, "Must sum to 100%");
        
        // Clear old votes
        _clearUserVotes(msg.sender);
        
        uint256 userVotingPower = IVotingEscrow(votingEscrow).balanceOf(msg.sender);
        
        for (uint256 i = 0; i < gauges.length; i++) {
            uint256 weightForGauge = userVotingPower * weights[i] / 10000;
            gaugeWeight[gauges[i]] += weightForGauge;
            userVoteWeight[msg.sender][gauges[i]] = weightForGauge;
        }
        
        lastVote[msg.sender] = block.timestamp;
        
        emit VotesAllocated(msg.sender, gauges, weights);
    }
    
    // Get current emission allocation for a gauge
    function getGaugeEmissionRate(address gauge) external view returns (uint256) {
        uint256 totalVoteWeight = _getTotalVoteWeight();
        if (totalVoteWeight == 0) return 0;
        
        return BASE_EMISSION_RATE * gaugeWeight[gauge] / totalVoteWeight;
    }
    
    event VotesAllocated(address indexed user, address[] gauges, uint256[] weights);
}
```

### Bribe Contract

```solidity
contract BribeMarket {
    
    struct Bribe {
        address token;     // Bribe token (usually stablecoins or protocol tokens)
        uint256 amount;    // Total bribe amount
        uint256 deadline;  // When voting period ends
        address gauge;     // Which gauge this bribe is for
        uint256 claimedPerVote; // Tokens per unit of vote weight received
    }
    
    mapping(uint256 => Bribe) public bribes;
    uint256 public bribeCount;
    
    // Protocol deposits bribe for upcoming epoch
    function createBribe(
        address gauge,
        address bribeToken,
        uint256 amount,
        uint256 epochDeadline
    ) external returns (uint256 bribeId) {
        IERC20(bribeToken).transferFrom(msg.sender, address(this), amount);
        
        bribeId = ++bribeCount;
        bribes[bribeId] = Bribe({
            token: bribeToken,
            amount: amount,
            deadline: epochDeadline,
            gauge: gauge,
            claimedPerVote: 0
        });
        
        emit BribeCreated(bribeId, gauge, bribeToken, amount);
    }
    
    // After epoch ends: calculate and allow vote-weight-proportional claims
    function finalizeBribe(uint256 bribeId) external {
        Bribe storage b = bribes[bribeId];
        require(block.timestamp > b.deadline, "Epoch not ended");
        
        uint256 totalVotesForGauge = gaugeController.getHistoricalGaugeWeight(
            b.gauge, b.deadline
        );
        
        b.claimedPerVote = b.amount * 1e18 / totalVotesForGauge;
        
        emit BribeFinalized(bribeId, b.claimedPerVote);
    }
    
    event BribeCreated(uint256 bribeId, address gauge, address token, uint256 amount);
    event BribeFinalized(uint256 bribeId, uint256 tokensPerVote);
}
```

### FAQ

**Is the bribery system in gauge-based protocols legal?**
"Bribery" in the veToken context is a payment to token holders for their governance votes — similar to dividends or profit-sharing. Unlike political bribery (which is illegal), paying someone for their investment decision is generally legal, though the SEC may have views on whether these payments constitute securities distributions. DeFi legal counsel should review any specific protocol's bribery mechanism.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
