## H1: Blockchain Technical Due Diligence Checklist — For Investors and Acquirers

**URL:** /tools/blockchain-technical-due-diligence/
**Schema:** Article, BreadcrumbList
**Internal Links:** /blockchain-consulting/, /resources/how-to-evaluate-blockchain-audit-firm/, /blockchain-development-cost/

This checklist is for investors, acquirers, and enterprise partners evaluating a blockchain protocol or company's technical maturity.

### TIER 1: NON-NEGOTIABLE (Fail if absent)

**Smart Contract Security:**
- [ ] All production contracts audited by named, reputable firm
- [ ] Audit report publicly available (with findings and remediation status)
- [ ] Zero unresolved Critical or High findings
- [ ] Contracts verified on Etherscan (source code visible)
- [ ] Bug bounty program active with material bounty ($50K+ Critical)

**Key Management:**
- [ ] Admin keys held in multi-sig (3-of-N minimum)
- [ ] No single-EOA admin keys for any production protocol
- [ ] Upgrade timelocks ≥ 48 hours for any significant parameter change
- [ ] Multisig signers are named individuals, not anonymous

**Verifiable History:**
- [ ] Deployed contract addresses provided and match description
- [ ] On-chain transaction history consistent with claimed launch date and usage
- [ ] Named engineers with verifiable GitHub history

---

### TIER 2: STRONG POSITIVE SIGNALS

**Testing and Quality:**
- [ ] Test coverage ≥ 95% (evidence: coverage report)
- [ ] Fuzz tests implemented for all critical math functions
- [ ] Invariant tests passing
- [ ] Fork tests against mainnet state

**Architecture:**
- [ ] Clear and reasonable upgrade path (UUPS or Transparent Proxy)
- [ ] Oracle design: dual-oracle with divergence threshold
- [ ] No circular dependencies in token economics
- [ ] Clear mechanism for emergency pause

**Track Record:**
- [ ] Protocol has operated without incident for ≥ 90 days
- [ ] No prior exploits (or prior exploits fully disclosed and resolved)
- [ ] TVL trend: flat or growing (declining TVL = trust signal)
- [ ] Protocol revenue covers operating costs at current scale

---

### TIER 3: CONCERNS (Flag for further investigation)

**Yellow flags:**
- Single audit by lesser-known firm
- Admin timelock < 24 hours
- Closed-source contracts
- No bug bounty program
- Anonymous team
- Token emissions significantly exceeding protocol revenue
- Recent large TVL decline without explanation
- Governance controlled by <5 addresses

**Red flags:**
- No audit at all for protocol handling funds
- Unlimited admin access (no timelock, no multi-sig)
- Team cannot explain their own codebase clearly
- Prior exploit not disclosed
- Audit report not publicly available
- Admin keys held by single person

---

### Technical Interview Questions for Protocol Team

1. "Walk me through how you would respond if your protocol were exploited at 2am UTC."
2. "What is the worst-case scenario if your oracle goes down for 30 minutes? Walk me through exactly what happens."
3. "If token price drops 70%, does your emission model still work? Show me the numbers."
4. "Who can pause the protocol? What is the exact process?"
5. "What is the most dangerous thing an insider could do with their current access?"

### FAQ

**What is a reasonable timeline to complete technical due diligence on a DeFi protocol?**
Thorough technical DD for a DeFi protocol: 2–4 weeks. This includes: code review (1 week), audit report analysis (2–3 days), on-chain analytics (2–3 days), team interviews (3–5 hours), tokenomics modeling (1 week). For acquisitions or significant investments (>$5M): engage an independent technical advisor for the code review component.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: ERC-20 Token Contract Template — Production-Ready Implementation

**URL:** /tools/erc20-token-template/
**Schema:** Article, BreadcrumbList
**Internal Links:** /smart-contract-development/, /token-launch-services/, /blockchain-tokenomics-design/

A production-ready ERC-20 token contract including: fixed supply, permit (EIP-2612), capped minting, vesting integration hooks, and OpenZeppelin best practices.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title ProtocolToken
 * @notice Production-ready ERC-20 governance token
 * @dev Includes: fixed max supply, EIP-2612 permit, EIP-5805 votes, 
 *      owner-controlled minting, pausable transfers, vesting support
 */
contract ProtocolToken is ERC20, ERC20Permit, ERC20Votes, Ownable, Pausable {
    
    /// @notice Maximum total supply that can ever be minted
    uint256 public immutable MAX_SUPPLY;
    
    /// @notice Whether minting has been permanently disabled
    bool public mintingDisabled;
    
    /// @notice Addresses authorized to mint new tokens
    mapping(address => bool) public minters;
    
    // ============ ERRORS ============
    error MaxSupplyExceeded(uint256 requested, uint256 available);
    error MintingDisabled();
    error NotMinter(address caller);
    error ZeroAddress();
    error ZeroAmount();
    
    // ============ EVENTS ============
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    event MintingPermanentlyDisabled();
    
    /**
     * @param name_ Token name
     * @param symbol_ Token symbol  
     * @param maxSupply_ Maximum total supply (in wei, with 18 decimals)
     * @param initialHolder_ Address receiving initial supply allocation
     * @param initialAmount_ Initial mint amount
     */
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 maxSupply_,
        address initialHolder_,
        uint256 initialAmount_
    ) ERC20(name_, symbol_) ERC20Permit(name_) Ownable(msg.sender) {
        if (initialHolder_ == address(0)) revert ZeroAddress();
        if (initialAmount_ > maxSupply_) revert MaxSupplyExceeded(initialAmount_, maxSupply_);
        
        MAX_SUPPLY = maxSupply_;
        
        if (initialAmount_ > 0) {
            _mint(initialHolder_, initialAmount_);
        }
    }
    
    // ============ MINTING ============
    
    /**
     * @notice Mint new tokens (up to MAX_SUPPLY)
     * @dev Only callable by addresses with minter role
     */
    function mint(address to, uint256 amount) external {
        if (mintingDisabled) revert MintingDisabled();
        if (!minters[msg.sender] && msg.sender != owner()) revert NotMinter(msg.sender);
        if (to == address(0)) revert ZeroAddress();
        if (amount == 0) revert ZeroAmount();
        
        uint256 available = MAX_SUPPLY - totalSupply();
        if (amount > available) revert MaxSupplyExceeded(amount, available);
        
        _mint(to, amount);
    }
    
    /**
     * @notice Permanently disable minting (irreversible)
     * @dev Once called, no more tokens can ever be minted
     */
    function disableMintingPermanently() external onlyOwner {
        mintingDisabled = true;
        emit MintingPermanentlyDisabled();
    }
    
    // ============ MINTER MANAGEMENT ============
    
    function addMinter(address minter) external onlyOwner {
        if (minter == address(0)) revert ZeroAddress();
        minters[minter] = true;
        emit MinterAdded(minter);
    }
    
    function removeMinter(address minter) external onlyOwner {
        minters[minter] = false;
        emit MinterRemoved(minter);
    }
    
    // ============ EMERGENCY PAUSE ============
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    // ============ OVERRIDES ============
    
    function _update(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) whenNotPaused {
        super._update(from, to, amount);
    }
    
    function nonces(address owner_) 
        public view override(ERC20Permit, Nonces) 
        returns (uint256) 
    {
        return super.nonces(owner_);
    }
}
```

### Vesting Contract Integration

```solidity
// VestingVault.sol — holds tokens and releases per schedule
contract VestingVault is Ownable {
    
    IERC20 public immutable token;
    
    struct VestingSchedule {
        address beneficiary;
        uint256 totalAmount;
        uint256 startTime;
        uint256 cliffDuration;  // seconds
        uint256 vestingDuration; // total vesting seconds
        uint256 released;
        bool revocable;
        bool revoked;
    }
    
    mapping(bytes32 => VestingSchedule) public schedules;
    bytes32[] public scheduleIds;
    
    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
    }
    
    function createSchedule(
        address beneficiary,
        uint256 amount,
        uint256 cliffSeconds,
        uint256 vestingSeconds,
        bool revocable
    ) external onlyOwner returns (bytes32 scheduleId) {
        token.transferFrom(msg.sender, address(this), amount);
        
        scheduleId = keccak256(abi.encodePacked(beneficiary, block.timestamp, amount));
        
        schedules[scheduleId] = VestingSchedule({
            beneficiary: beneficiary,
            totalAmount: amount,
            startTime: block.timestamp,
            cliffDuration: cliffSeconds,
            vestingDuration: vestingSeconds,
            released: 0,
            revocable: revocable,
            revoked: false
        });
        
        scheduleIds.push(scheduleId);
        emit ScheduleCreated(scheduleId, beneficiary, amount);
    }
    
    function release(bytes32 scheduleId) external {
        VestingSchedule storage s = schedules[scheduleId];
        require(msg.sender == s.beneficiary || msg.sender == owner(), "Unauthorized");
        require(!s.revoked, "Revoked");
        
        uint256 releasable = _computeReleasable(s);
        require(releasable > 0, "Nothing to release");
        
        s.released += releasable;
        token.transfer(s.beneficiary, releasable);
        
        emit TokensReleased(scheduleId, releasable);
    }
    
    function _computeReleasable(VestingSchedule storage s) internal view returns (uint256) {
        if (block.timestamp < s.startTime + s.cliffDuration) return 0;
        
        uint256 elapsed = block.timestamp - s.startTime;
        uint256 vested;
        
        if (elapsed >= s.vestingDuration) {
            vested = s.totalAmount;
        } else {
            vested = s.totalAmount * elapsed / s.vestingDuration;
        }
        
        return vested - s.released;
    }
    
    event ScheduleCreated(bytes32 scheduleId, address beneficiary, uint256 amount);
    event TokensReleased(bytes32 scheduleId, uint256 amount);
}
```

### FAQ

**Should we use OpenZeppelin Contracts or write our own ERC-20?**
Always use OpenZeppelin. Their contracts are audited by the leading security firms, used in $100B+ of DeFi, and maintain backwards-compatible updates. Writing your own ERC-20 from scratch introduces risk without benefit. Customize via inheritance (add features on top of OZ base), not by rewriting the core standard.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Blockchain Data Analytics Templates — Dune Dashboards and On-Chain KPIs

**URL:** /tools/blockchain-analytics-templates/
**Schema:** Article, BreadcrumbList
**Internal Links:** /defi-development-company/, /blockchain-development-services/, /resources/blockchain-project-metrics-dashboard/

Every production blockchain protocol needs on-chain analytics for transparency and decision-making. Here are the SQL query templates for Dune Analytics.

### Protocol TVL Dashboard Query (Dune Analytics)

```sql
-- Dune SQL: Track protocol TVL over time
-- Replace contract_address with your vault/pool address

WITH daily_balances AS (
    SELECT 
        DATE_TRUNC('day', block_time) AS day,
        SUM(CASE WHEN to = 0xYOUR_CONTRACT_ADDRESS 
            THEN value ELSE -value END) 
            / 1e6 AS usdc_delta  -- USDC has 6 decimals
    FROM erc20_ethereum.evt_Transfer
    WHERE (to = 0xYOUR_CONTRACT_ADDRESS 
           OR "from" = 0xYOUR_CONTRACT_ADDRESS)
      AND contract_address = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48  -- USDC
      AND block_time >= DATE '2024-01-01'
    GROUP BY 1
),
cumulative AS (
    SELECT 
        day,
        SUM(usdc_delta) OVER (ORDER BY day) AS tvl_usdc
    FROM daily_balances
)
SELECT 
    day,
    tvl_usdc,
    tvl_usdc * eth_price.price AS tvl_usd
FROM cumulative
LEFT JOIN prices.usd eth_price 
    ON eth_price.symbol = 'USDC'
    AND eth_price.minute = DATE_TRUNC('minute', cumulative.day)
ORDER BY day DESC
```

### Unique Users Query

```sql
-- Count unique depositors per week
SELECT 
    DATE_TRUNC('week', block_time) AS week,
    COUNT(DISTINCT "from") AS new_depositors,
    COUNT(DISTINCT "from") OVER (ORDER BY DATE_TRUNC('week', block_time)) AS cumulative_users
FROM erc20_ethereum.evt_Transfer
WHERE to = 0xYOUR_CONTRACT_ADDRESS
  AND contract_address = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
  AND block_time >= DATE '2024-01-01'
GROUP BY 1
ORDER BY 1 DESC
```

### Protocol Revenue Query

```sql
-- Track fee revenue collected by protocol treasury
WITH fee_events AS (
    SELECT 
        DATE_TRUNC('day', block_time) AS day,
        SUM(CAST(data AS DOUBLE) / 1e6) AS daily_fees_usdc
    FROM ethereum.logs
    WHERE contract_address = 0xYOUR_CONTRACT
      AND topic0 = 0xFEE_COLLECTED_EVENT_SIGNATURE
      AND block_time >= DATE '2024-01-01'
    GROUP BY 1
)
SELECT 
    day,
    daily_fees_usdc,
    SUM(daily_fees_usdc) OVER (ORDER BY day) AS cumulative_fees_usdc,
    daily_fees_usdc * 365 AS annualized_revenue_rate
FROM fee_events
ORDER BY day DESC
```

### Shareable Dune Dashboard Template

```
PROTOCOL NAME — Analytics Dashboard

PANEL 1: TVL (Line Chart)
  X-axis: Date | Y-axis: TVL in USD
  Data source: Query 1 (TVL over time)
  Date range selector: Last 7D / 30D / 90D / All

PANEL 2: Daily Volume (Bar Chart)
  X-axis: Date | Y-axis: Volume USD
  Data source: Transaction volume query

PANEL 3: Unique Depositors (Counter + Line)
  Total unique depositors (counter): big number widget
  New depositors per week (line chart)

PANEL 4: Protocol Revenue (Bar + Cumulative Line)
  Daily fee revenue (bars) + Cumulative (line)
  Annualized run rate (counter)

PANEL 5: Top Depositors Table
  Address | Balance | % of TVL | First Deposit Date
  Identifies whale concentration risk

PANEL 6: Oracle Health
  Price feed last updated (must be < 1 hour ago)
  Divergence between Chainlink and TWAP (must be < 1%)
```

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
