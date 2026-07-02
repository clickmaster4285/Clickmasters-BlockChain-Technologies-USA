## H1: Liquid Staking Protocol Development — LSD Architecture and Validator Management

**URL:** /liquid-staking-protocol-development/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /defi-development-company/, /defi-development-cost/, /smart-contract-development/

Liquid staking protocols (Lido, Rocket Pool, Frax Ether) let users stake ETH while receiving a liquid receipt token (stETH, rETH, sfrxETH). This receipt token can be used in DeFi while the underlying ETH earns validator rewards. Here is the complete architecture.

### Liquid Staking Architecture

```
User deposits 1 ETH
  ↓
LiquidStakingPool contract receives ETH
  ↓
Pool issues 1 stETH (receipt token) to user
  ↓
Pool batches ETH deposits (need 32 ETH per validator)
  ↓
Node operators run validators with pooled ETH
  ↓
Validator rewards accrue (currently ~4% APY)
  ↓
stETH balance increases daily via rebase (or exchange rate increases for non-rebasing)
  ↓
User can use stETH in DeFi (collateral, LP, yield strategies)
  ↓
User burns stETH → receives ETH + accumulated rewards
```

### Core Liquid Staking Contract (Lido-Style Rebase)

```solidity
contract LiquidStakingPool is ERC20Permit, ReentrancyGuard, Ownable {
    
    // Validator node operator registry
    mapping(address => NodeOperator) public operators;
    address[] public operatorList;
    
    // Protocol state
    uint256 public totalPooledEther;    // Total ETH under management
    uint256 public totalShares;         // Total internal shares (≠ token supply for rebase)
    
    // Insurance/reserve fund
    uint256 public insuranceFund;
    
    struct NodeOperator {
        string name;
        address rewardAddress;
        uint256 totalValidators;
        uint256 activeValidators;
        uint256 stoppedValidators;
        bool active;
    }
    
    // Deposit ETH, receive stETH
    function submit(address referral) external payable nonReentrant returns (uint256 sharesAmount) {
        require(msg.value > 0, "Zero deposit");
        
        // Calculate shares for this deposit
        sharesAmount = getSharesByPooledEth(msg.value);
        
        if (sharesAmount == 0) {
            // First deposit: 1:1 ratio
            sharesAmount = msg.value;
        }
        
        // Mint shares to depositor
        _mintShares(msg.sender, sharesAmount);
        totalPooledEther += msg.value;
        
        emit Submitted(msg.sender, msg.value, referral);
        
        // Forward to deposit contract when batch ready
        _maybeDeployNewValidators();
    }
    
    // Rebase: called after beacon chain rewards are reported
    // This increases totalPooledEther, which increases every stETH holder's balance
    function handleOracleReport(
        uint256 beaconValidators,
        uint256 beaconBalance,      // Current ETH balance on beacon chain
        uint256 withdrawalVaultBalance  // ETH pending withdrawal
    ) external onlyOracle {
        uint256 preTotalPooledEther = totalPooledEther;
        
        uint256 newTotalPooledEther = beaconBalance + withdrawalVaultBalance + 
                                      address(this).balance;
        
        if (newTotalPooledEther > preTotalPooledEther) {
            uint256 rewards = newTotalPooledEther - preTotalPooledEther;
            
            // Protocol fee: 10% of rewards
            uint256 protocolFee = rewards * 1000 / 10000;
            uint256 insuranceShare = protocolFee * 5000 / 10000;  // 50% of fee to insurance
            uint256 treasuryShare = protocolFee - insuranceShare;
            
            // Mint fee shares (dilutes stETH holders by fee amount)
            _mintShares(insuranceFund, getSharesByPooledEth(insuranceShare));
            _mintShares(treasury, getSharesByPooledEth(treasuryShare));
        }
        
        totalPooledEther = newTotalPooledEther;
        
        emit PostTotalShares(totalPooledEther, preTotalPooledEther, totalShares);
    }
    
    // ERC-20 override: balanceOf returns ETH value, not shares
    function balanceOf(address account) public view override returns (uint256) {
        return getPooledEthByShares(sharesOf(account));
    }
    
    // Internal shares accounting
    function getSharesByPooledEth(uint256 ethAmount) public view returns (uint256) {
        if (totalPooledEther == 0) return ethAmount;
        return ethAmount * totalShares / totalPooledEther;
    }
    
    function getPooledEthByShares(uint256 sharesAmount) public view returns (uint256) {
        if (totalShares == 0) return 0;
        return sharesAmount * totalPooledEther / totalShares;
    }
    
    // Deploy new validator when we have 32+ ETH
    function _maybeDeployNewValidators() internal {
        while (address(this).balance >= 32 ether && operatorList.length > 0) {
            address operator = _selectNextOperator();
            _depositToBeacon(operator);
        }
    }
    
    function _depositToBeacon(address operator) internal {
        // Deposit 32 ETH to Ethereum deposit contract
        // Node operator provides pubkey, withdrawal credentials, signature
        DEPOSIT_CONTRACT.deposit{value: 32 ether}(
            operators[operator].pubkey,
            abi.encodePacked(address(this)),  // withdrawal credentials = this contract
            operators[operator].signature,
            operators[operator].depositDataRoot
        );
        
        operators[operator].totalValidators++;
        operators[operator].activeValidators++;
        
        emit ValidatorDeposited(operator, operators[operator].totalValidators);
    }
    
    address public immutable DEPOSIT_CONTRACT = 0x00000000219ab540356cBB839Cbe05303d7705Fa;
    address public treasury;
    
    mapping(address => uint256) private _shares;
    
    function sharesOf(address account) public view returns (uint256) {
        return _shares[account];
    }
    
    function _mintShares(address account, uint256 sharesAmount) internal {
        _shares[account] += sharesAmount;
        totalShares += sharesAmount;
    }
    
    event Submitted(address indexed sender, uint256 amount, address referral);
    event PostTotalShares(uint256 postTotalPooledEther, uint256 preTotalPooledEther, uint256 totalShares);
    event ValidatorDeposited(address operator, uint256 validatorIndex);
}
```

### Withdrawal Queue (Post-Shapella)

```solidity
contract WithdrawalQueue is ReentrancyGuard {
    
    struct WithdrawalRequest {
        address owner;
        uint256 stethAmount;
        uint256 ethAmount;     // Calculated at finalization
        bool finalized;
        bool claimed;
        uint256 timestamp;
    }
    
    mapping(uint256 => WithdrawalRequest) public requests;
    uint256 public lastRequestId;
    uint256 public lastFinalizedRequestId;
    
    // User requests withdrawal
    function requestWithdrawal(uint256 stethAmount) external returns (uint256 requestId) {
        require(stethAmount >= MIN_STETH_WITHDRAWAL, "Below minimum");
        
        ISTETH(steth).transferFrom(msg.sender, address(this), stethAmount);
        
        requestId = ++lastRequestId;
        requests[requestId] = WithdrawalRequest({
            owner: msg.sender,
            stethAmount: stethAmount,
            ethAmount: 0,
            finalized: false,
            claimed: false,
            timestamp: block.timestamp
        });
        
        emit WithdrawalRequested(requestId, msg.sender, stethAmount);
    }
    
    // Oracle finalizes batch of requests after ETH arrives from beacon chain
    function finalize(uint256 lastIdToFinalize) external onlyOracle {
        for (uint256 id = lastFinalizedRequestId + 1; id <= lastIdToFinalize; id++) {
            WithdrawalRequest storage req = requests[id];
            
            // Calculate ETH owed based on current exchange rate
            req.ethAmount = ILiquidStakingPool(pool).getPooledEthByShares(
                ILiquidStakingPool(pool).getSharesByPooledEth(req.stethAmount)
            );
            req.finalized = true;
        }
        
        lastFinalizedRequestId = lastIdToFinalize;
    }
    
    // User claims ETH after finalization
    function claimWithdrawal(uint256 requestId) external nonReentrant {
        WithdrawalRequest storage req = requests[requestId];
        require(req.owner == msg.sender, "Not request owner");
        require(req.finalized, "Not finalized yet");
        require(!req.claimed, "Already claimed");
        
        req.claimed = true;
        payable(msg.sender).transfer(req.ethAmount);
        
        emit WithdrawalClaimed(requestId, msg.sender, req.ethAmount);
    }
    
    uint256 public constant MIN_STETH_WITHDRAWAL = 100 wei;
    address public pool;
    address public steth;
    
    event WithdrawalRequested(uint256 indexed requestId, address indexed owner, uint256 stethAmount);
    event WithdrawalClaimed(uint256 indexed requestId, address indexed owner, uint256 ethAmount);
}
```

### FAQ

**How does liquid staking differ from a staking pool?**
A staking pool aggregates ETH to deploy validators but may not give you a liquid receipt token. Liquid staking always issues a transferable token representing your staked position. This token (stETH, rETH) can be used in DeFi while your ETH earns validator rewards. The liquid token is what makes it "liquid" staking.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Yield Optimization Vault — Automated Strategy Switching and Harvesting

**URL:** /defi-yield-optimization-vault/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /defi-yield-farming-development/, /defi-development-company/, /cross-chain-yield-aggregator/

Yield optimization vaults (Yearn-style) automatically compound yield by harvesting rewards, swapping to the deposit asset, and reinvesting. Here is the production architecture.

### Vault Architecture (ERC-4626 Standard)

```solidity
contract YieldVault is ERC4626, Ownable, ReentrancyGuard {
    
    // Pluggable strategy interface
    IStrategy public strategy;
    
    // Keeper network for harvesting
    address public keeper;
    
    uint256 public lastHarvestTimestamp;
    uint256 public totalHarvestedYield;
    
    // Fees
    uint256 public performanceFee = 2000;  // 20% of yield (basis points)
    uint256 public managementFee = 200;    // 2% annual (basis points)
    address public feeRecipient;
    
    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        IStrategy _strategy,
        address _feeRecipient
    ) ERC4626(_asset) ERC20(_name, _symbol) {
        strategy = _strategy;
        feeRecipient = _feeRecipient;
        lastHarvestTimestamp = block.timestamp;
    }
    
    // Override ERC-4626: deposited assets go directly to strategy
    function _deposit(
        address caller,
        address receiver,
        uint256 assets,
        uint256 shares
    ) internal override {
        super._deposit(caller, receiver, assets, shares);
        
        // Forward deposited assets to strategy
        IERC20(asset()).transfer(address(strategy), assets);
        strategy.deploy();
    }
    
    // Override ERC-4626: withdraw from strategy
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal override {
        // Pull assets from strategy
        strategy.withdraw(assets);
        super._withdraw(caller, receiver, owner, assets, shares);
    }
    
    // Total assets = strategy's deployed capital + vault's cash balance
    function totalAssets() public view override returns (uint256) {
        return IERC20(asset()).balanceOf(address(this)) + strategy.estimatedTotalAssets();
    }
    
    // Keeper harvests rewards, compounds into more of the deposit asset
    function harvest() external onlyKeeper nonReentrant {
        uint256 beforeAssets = totalAssets();
        
        // Strategy claims rewards (COMP, CRV, etc.) and sells them for deposit asset
        strategy.harvest();
        
        uint256 afterAssets = totalAssets();
        uint256 yieldGenerated = afterAssets > beforeAssets ? afterAssets - beforeAssets : 0;
        
        if (yieldGenerated > 0) {
            // Charge performance fee on yield
            uint256 performanceFeeAmount = yieldGenerated * performanceFee / 10000;
            
            // Mint vault shares representing fee (dilutes depositors by fee %)
            uint256 feeShares = convertToShares(performanceFeeAmount);
            _mint(feeRecipient, feeShares);
            
            totalHarvestedYield += yieldGenerated;
        }
        
        // Charge management fee (time-based)
        _chargeManagementFee();
        
        lastHarvestTimestamp = block.timestamp;
        
        emit Harvested(yieldGenerated, block.timestamp);
    }
    
    function _chargeManagementFee() internal {
        uint256 timeSinceLast = block.timestamp - lastHarvestTimestamp;
        uint256 annualFee = totalAssets() * managementFee / 10000;
        uint256 periodFee = annualFee * timeSinceLast / 365 days;
        
        if (periodFee > 0) {
            uint256 feeShares = convertToShares(periodFee);
            _mint(feeRecipient, feeShares);
        }
    }
    
    modifier onlyKeeper() {
        require(msg.sender == keeper || msg.sender == owner(), "Not keeper");
        _;
    }
    
    event Harvested(uint256 yield, uint256 timestamp);
}

// Pluggable strategy: deploy in Aave, harvest AAVE rewards
contract AaveV3Strategy is IStrategy {
    
    IPool public aavePool;
    IERC20 public depositToken;
    IERC20 public aToken;
    IAaveIncentives public incentives;
    
    function deploy() external override onlyVault {
        uint256 balance = depositToken.balanceOf(address(this));
        if (balance > 0) {
            depositToken.approve(address(aavePool), balance);
            aavePool.supply(address(depositToken), balance, address(this), 0);
        }
    }
    
    function withdraw(uint256 amount) external override onlyVault {
        aavePool.withdraw(address(depositToken), amount, vault);
    }
    
    function estimatedTotalAssets() external view override returns (uint256) {
        return aToken.balanceOf(address(this));
    }
    
    function harvest() external override onlyVault {
        // Claim AAVE rewards
        address[] memory assets = new address[](1);
        assets[0] = address(aToken);
        uint256 claimed = incentives.claimRewards(assets, type(uint256).max, address(this), AAVE_TOKEN);
        
        if (claimed > 0) {
            // Swap AAVE → depositToken via DEX
            _swapAaveForDepositToken(claimed);
            
            // Redeploy
            deploy();
        }
    }
    
    function _swapAaveForDepositToken(uint256 aaveAmount) internal {
        // UniswapV3 swap: AAVE → USDC
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: AAVE_TOKEN,
            tokenOut: address(depositToken),
            fee: 3000,
            recipient: address(this),
            deadline: block.timestamp + 300,
            amountIn: aaveAmount,
            amountOutMinimum: _getMinimumOut(aaveAmount),  // slippage protection
            sqrtPriceLimitX96: 0
        });
        
        IERC20(AAVE_TOKEN).approve(address(swapRouter), aaveAmount);
        swapRouter.exactInputSingle(params);
    }
    
    address constant AAVE_TOKEN = 0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9;
    address public vault;
    ISwapRouter public swapRouter;
    
    modifier onlyVault() { require(msg.sender == vault, "Not vault"); _; }
}
```

### FAQ

**How often should yield vaults harvest?**
Optimal harvest frequency balances gas cost vs compounding benefit. At current Arbitrum gas prices ($0.05–$0.20 per harvest tx), the break-even harvest threshold: gas cost / APY differential gain per harvest. For a 5% APY vault with $10M TVL: harvesting every 24 hours generates ~$1,370 additional compound yield per day. Gas cost on Arbitrum: ~$0.20. Harvest daily. For smaller vaults: harvest when accumulated yield exceeds $500–$1,000 (3–10x the gas cost).

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Flash Loan Attack Vectors — How They Work and How to Prevent Them

**URL:** /flash-loan-attack-prevention/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /defi-protocol-security-audit/, /defi-development-company/, /smart-contract-security-best-practices/

Flash loans enable borrowing unlimited capital with zero collateral — repaid within one transaction. They are legitimate DeFi tools but also the mechanism behind $1B+ in protocol exploits. Here is how attacks work and how to prevent them.

### How Flash Loan Attacks Work

```
A flash loan attack in one transaction:

1. Borrow $100M USDC from Aave (no collateral, must repay in same tx)
2. Use $100M to manipulate a price oracle on a DEX (spot price)
3. Protocol reads the manipulated price:
   "ETH is now worth $50,000 each" (real price: $2,000)
4. Borrow $48M of OTHER assets against $1M of ETH (valued at $50,000)
   at the inflated price
5. Price returns to normal at end of tx
6. Repay $100M + fee to Aave
7. Walk away with $48M borrowed assets against $1M real collateral
8. Net profit: $47M (never repaid)

Total time: 1 Ethereum block (~12 seconds)
```

### Actual Attack: The Euler Finance Pattern ($197M, March 2023)

Euler Finance's vulnerability: a donation function that didn't properly account for bad debt could be exploited via flash loans to create insolvent positions. The attacker:
1. Flash borrowed $30M DAI
2. Created a leveraged position and a donation that created artificial bad debt
3. Liquidated their own position at a profit
4. Repeated multiple times within one block
5. Result: $197M drained

### Prevention Architecture

```solidity
contract FlashLoanSafeProtocol {
    
    // PREVENTION 1: Never use spot price for financial decisions
    // Always use TWAP (Time-Weighted Average Price)
    
    function getSecurePrice(address token) public view returns (uint256) {
        // Chainlink: manipulation-resistant oracle
        (, int256 chainlinkPrice, , uint256 updatedAt, ) = priceFeed.latestRoundData();
        require(block.timestamp - updatedAt < 1 hours, "Stale oracle");
        require(chainlinkPrice > 0, "Invalid price");
        
        uint256 chainlinkPriceUSD = uint256(chainlinkPrice);
        
        // TWAP from Uniswap V3: 30-minute average
        uint256 twapPrice = _getUniswapTWAP(token, 1800);  // 1800 seconds = 30 min
        
        // Divergence check: if Chainlink and TWAP differ by >2%, reject
        uint256 diff = chainlinkPriceUSD > twapPrice ? 
            chainlinkPriceUSD - twapPrice : 
            twapPrice - chainlinkPriceUSD;
        
        require(diff * 100 / chainlinkPriceUSD < 2, "Price oracle divergence");
        
        return chainlinkPriceUSD;
    }
    
    // PREVENTION 2: Reentrancy guard on all state-changing functions
    // Flash loan attacks rely on calling back into your protocol
    
    // PREVENTION 3: Check-Effects-Interactions pattern
    function safeWithdraw(uint256 amount) external nonReentrant {
        // CHECK
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        // EFFECTS (update state BEFORE external call)
        balances[msg.sender] -= amount;
        
        // INTERACTIONS (external call LAST)
        IERC20(token).transfer(msg.sender, amount);
    }
    
    // PREVENTION 4: Slippage protection on all DEX interactions
    function _swapWithSlippageProtection(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut  // Caller specifies minimum output
    ) internal returns (uint256 amountOut) {
        amountOut = dex.swap(tokenIn, tokenOut, amountIn);
        require(amountOut >= minAmountOut, "Slippage exceeded");
    }
    
    // PREVENTION 5: Donation attacks — track virtual and real balances separately
    // Never rely on token.balanceOf(address(this)) for accounting
    // Always track balances with internal accounting variables
    
    mapping(address => uint256) public balances;        // Internal accounting
    uint256 public totalTrackedBalance;                 // Sum of all user balances
    
    // Any excess tokens (donations) don't affect accounting
    function getExcessBalance() external view returns (uint256) {
        return IERC20(token).balanceOf(address(this)) - totalTrackedBalance;
    }
    
    // PREVENTION 6: Same-block transaction limits
    mapping(address => uint256) public lastActionBlock;
    
    modifier notSameBlock() {
        require(block.number > lastActionBlock[msg.sender], "Same block not allowed");
        lastActionBlock[msg.sender] = block.number;
        _;
    }
}
```

### FAQ

**Can flash loan attacks be detected and prevented in real-time?**
Not at the transaction level — an entire attack completes within one block. Prevention must be at the design level (no spot price oracles, reentrancy guards, internal accounting). Post-hoc: services like Forta Network run real-time on-chain monitoring and can alert within seconds of an anomalous transaction. Some protocols implement circuit breakers: if total protocol value changes by more than X% in one block, pause all operations.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: veTokenomics Deep Dive — Vote-Escrow Mechanics and Protocol Design

**URL:** /vetokenomics-design/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /blockchain-tokenomics-design/, /defi-development-company/, /token-launch-services/

The vote-escrow model (pioneered by Curve Finance) is the most sophisticated governance tokenomics design in DeFi. Users lock tokens for up to 4 years to receive voting power and fee share. Here is the complete design and implementation.

### veToken Mechanics

```
TOKEN → lock for up to 4 years → veTOKEN (non-transferable)

Lock 1,000 TOKEN for 4 years → receive 1,000 veTOKEN
Lock 1,000 TOKEN for 2 years → receive 500 veTOKEN
Lock 1,000 TOKEN for 1 year  → receive 250 veTOKEN
Lock 1,000 TOKEN for 1 week  → receive 4.8 veTOKEN (1/208th of 4 years)

veTOKEN decays linearly to 0 at lock expiry
User can extend lock or deposit more TOKEN at any time
```

### veToken Contract

```solidity
contract VotingEscrow is ReentrancyGuard {
    
    struct LockedBalance {
        int128 amount;      // TOKEN amount locked
        uint256 end;        // Lock expiry timestamp (rounded to weeks)
    }
    
    struct Point {
        int128 bias;        // veTOKEN balance at checkpoint
        int128 slope;       // Rate of decay (bias/remaining_time)
        uint256 ts;         // Timestamp of checkpoint
        uint256 blk;        // Block number
    }
    
    mapping(address => LockedBalance) public locked;
    mapping(address => Point[]) public userPointHistory;
    
    uint256 public constant MAXTIME = 4 * 365 * 86400;  // 4 years in seconds
    uint256 public constant WEEK = 7 * 86400;
    
    IERC20 public immutable token;
    
    // Create a new lock or add to existing
    function createLock(uint256 value, uint256 unlockTime) external nonReentrant {
        LockedBalance memory existingLock = locked[msg.sender];
        require(existingLock.amount == 0, "Withdraw existing lock first");
        require(value > 0, "Need non-zero value");
        
        // Round unlock time to week boundary (prevent gaming)
        unlockTime = (unlockTime / WEEK) * WEEK;
        require(unlockTime > block.timestamp, "Lock must be in future");
        require(unlockTime <= block.timestamp + MAXTIME, "Exceeds max lock time");
        
        token.transferFrom(msg.sender, address(this), value);
        
        locked[msg.sender] = LockedBalance({
            amount: int128(int256(value)),
            end: unlockTime
        });
        
        _checkpoint(msg.sender, LockedBalance(0, 0), locked[msg.sender]);
        
        emit Deposit(msg.sender, value, unlockTime);
    }
    
    // Current veTOKEN balance (decays over time)
    function balanceOf(address addr) external view returns (uint256) {
        LockedBalance memory lock = locked[addr];
        if (lock.end <= block.timestamp) return 0;
        
        uint256 remainingTime = lock.end - block.timestamp;
        
        // veTOKEN = locked_amount × (remaining_time / MAXTIME)
        return uint256(int256(lock.amount)) * remainingTime / MAXTIME;
    }
    
    // Withdraw after lock expires
    function withdraw() external nonReentrant {
        LockedBalance memory lock = locked[msg.sender];
        require(block.timestamp >= lock.end, "Lock not expired");
        require(lock.amount > 0, "No locked balance");
        
        uint256 value = uint256(int256(lock.amount));
        locked[msg.sender] = LockedBalance(0, 0);
        
        token.transfer(msg.sender, value);
        
        emit Withdraw(msg.sender, value);
    }
    
    function _checkpoint(address addr, LockedBalance memory oldLock, LockedBalance memory newLock) internal {
        // Global and per-user checkpointing for historical balance queries
        // (required for Snapshot governance integration)
        Point memory userPoint;
        
        if (newLock.end > block.timestamp && newLock.amount > 0) {
            userPoint.slope = newLock.amount / int128(int256(MAXTIME));
            userPoint.bias = userPoint.slope * int128(int256(newLock.end - block.timestamp));
        }
        
        userPoint.ts = block.timestamp;
        userPoint.blk = block.number;
        userPointHistory[addr].push(userPoint);
    }
    
    event Deposit(address indexed provider, uint256 value, uint256 locktime);
    event Withdraw(address indexed provider, uint256 value);
}
```

### Gauge Weight Voting (Curve-Style)

```solidity
contract GaugeController {
    
    VotingEscrow public ve;
    
    struct GaugeWeight {
        uint256 bias;
        uint256 slope;
        uint256 lastUpdated;
    }
    
    mapping(address => address) public userVote;          // user → gauge they voted for
    mapping(address => GaugeWeight) public gaugeWeights;  // gauge → vote weight
    mapping(address => uint256) public gaugeRelativeWeights; // gauge → % of total emissions
    
    address[] public gauges;
    
    // User votes their veTOKEN weight toward a liquidity pool gauge
    function voteForGauge(address gauge, uint256 weight) external {
        require(weight <= 10000, "Max 100% weight");
        
        uint256 veBalance = ve.balanceOf(msg.sender);
        require(veBalance > 0, "No veTOKEN");
        
        // Reset previous vote
        if (userVote[msg.sender] != address(0)) {
            _resetVote(msg.sender);
        }
        
        if (weight > 0) {
            userVote[msg.sender] = gauge;
            gaugeWeights[gauge].bias += veBalance * weight / 10000;
            gaugeWeights[gauge].lastUpdated = block.timestamp;
        }
        
        _updateRelativeWeights();
        
        emit VotedForGauge(msg.sender, gauge, weight, veBalance);
    }
    
    // Protocol reads relative weights to set emission rates per pool
    function getEmissionRate(address gauge) external view returns (uint256) {
        return gaugeRelativeWeights[gauge]; // Returns basis points (10000 = 100%)
    }
    
    function _updateRelativeWeights() internal {
        uint256 totalWeight;
        for (uint256 i = 0; i < gauges.length; i++) {
            totalWeight += gaugeWeights[gauges[i]].bias;
        }
        
        for (uint256 i = 0; i < gauges.length; i++) {
            if (totalWeight > 0) {
                gaugeRelativeWeights[gauges[i]] = 
                    gaugeWeights[gauges[i]].bias * 10000 / totalWeight;
            }
        }
    }
    
    event VotedForGauge(address indexed user, address indexed gauge, uint256 weight, uint256 veBalance);
}
```

### FAQ

**What is the "bribe" market in veTokenomics?**
Protocols that want their liquidity pool to receive higher emission rates (more TOKEN rewards) can "bribe" veTOKEN holders to vote for their gauge. Bribe platforms (Votium for veCRV, Hidden Hand for veBAL) aggregate these bribes: vote for gauge X and receive Y USDC per veTOKEN per week. This turns governance votes into a market where protocols compete for emission direction — an elegant mechanism but one that concentrates influence with the largest bribers.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
