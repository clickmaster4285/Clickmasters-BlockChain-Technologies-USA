## H1: Web3 Development FAQ — 20 Questions From dApp Developers

**URL:** /faq/web3-development/
**Schema:** FAQPage, BreadcrumbList
**Internal Links:** /web3-development-company/, /web3-dapp-architecture/, /smart-contract-development/

**Q1: What is the difference between ethers.js and viem?**
Both are JavaScript/TypeScript libraries for interacting with Ethereum. viem (2022+): TypeScript-first, tree-shakeable, type-safe, no class-based API. Faster and smaller bundle than ethers. ethers.js v6 (2023): refactored for TypeScript, still widely used. For new projects in 2025: viem is the default recommendation. For existing ethers.js projects: no urgent need to migrate unless bundle size or type safety is causing issues.

**Q2: What is wagmi and when do we use it?**
wagmi is a collection of React hooks for Ethereum built on top of viem. `useAccount()`, `useBalance()`, `useContractRead()`, `useContractWrite()`. Use wagmi when building React-based dApps — it handles connection management, chain switching, transaction watching, and state synchronization. For non-React: use viem directly.

**Q3: How do we handle wallet connection for multiple wallets?**
Use RainbowKit (built on wagmi) or ConnectKit — they provide pre-built wallet connection UI supporting MetaMask, WalletConnect, Coinbase Wallet, and 100+ others in one modal. Avoid building custom wallet connection — the fragmentation of wallet standards makes custom implementations brittle.

**Q4: How do we read smart contract state on the frontend?**
```typescript
import { useContractRead } from 'wagmi';
const { data: balance } = useContractRead({
  address: TOKEN_ADDRESS,
  abi: ERC20_ABI,
  functionName: 'balanceOf',
  args: [userAddress],
  watch: true,  // Re-fetches on every block
});
```
For batch reads (multiple calls in one RPC request): use the Multicall3 contract with `useContractReads` (plural).

**Q5: How do we handle transaction confirmation UX?**
Three-stage UX: (1) user signs transaction → show "Transaction submitted" toast with Etherscan link, (2) waiting for inclusion → show loading spinner, (3) transaction mined → show success. Use `waitForTransactionReceipt` from viem:
```typescript
const hash = await walletClient.writeContract({ ... });
const receipt = await publicClient.waitForTransactionReceipt({ hash });
// receipt.status === 'success' or 'reverted'
```

**Q6: How do we display ETH/token amounts to users?**
Never display raw wei (`1000000000000000000`). Use `formatEther()` for ETH, `formatUnits(amount, decimals)` for tokens. Always display to 4–6 significant decimal places. For USD values: fetch ETH/USD price from Chainlink, multiply, format to 2 decimal places.

**Q7: How do we handle the gas estimation for a transaction?**
```typescript
const gas = await publicClient.estimateContractGas({
  address: CONTRACT_ADDRESS,
  abi: CONTRACT_ABI,
  functionName: 'deposit',
  args: [amount],
  account: userAddress,
});
// Add 20% buffer: gas * 120n / 100n
```
Show the estimated cost in USD to users before they confirm.

**Q8: How do we detect if a user is on the wrong network?**
```typescript
const { chain } = useNetwork();
const isCorrectChain = chain?.id === TARGET_CHAIN_ID;
if (!isCorrectChain) {
  await switchNetwork({ chainId: TARGET_CHAIN_ID });
}
```
Always show a clear "Switch to [Network]" prompt — never silently fail because user is on wrong chain.

**Q9: How do we handle ENS name resolution in the frontend?**
viem: `await client.getEnsAddress({ name: 'vitalik.eth' })`. Cache ENS resolutions — they rarely change. On input fields: debounce ENS resolution calls (500ms after user stops typing), show resolved address below the input field.

**Q10: How do we implement "connect wallet" for mobile apps?**
WalletConnect v2 is the standard for mobile — it creates a QR code (or deeplink on mobile browser) that any WalletConnect-compatible mobile wallet can scan. For React Native: use `@walletconnect/react-native-dapp`. For iOS/Android native: WalletConnect SDK exists for both platforms.

**Q11: What is The Graph and when do we need it?**
The Graph indexes blockchain events into a queryable GraphQL API. You need it when: fetching historical data (all transactions for a user), computing aggregates (total protocol volume), or making complex queries that would require dozens of RPC calls. Not needed for: simple current-state reads (token balance, current price).

**Q12: How do we implement real-time blockchain data updates?**
Three approaches: (1) Poll every block (`watch: true` in wagmi reads — simple but moderate RPC cost), (2) WebSocket subscription (`publicClient.watchContractEvent({ ... })` — efficient, real-time), (3) Alchemy/Infura Webhooks (post to your server on specific events — best for server-side processing). For user-facing price displays: poll every 10–15 seconds.

**Q13: How do we handle IPFS metadata for NFTs on the frontend?**
Replace `ipfs://` with a gateway URL: `url.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')`. Use multiple gateways as fallback (Pinata, Cloudflare, NFT.Storage gateway). Cache metadata locally — NFT metadata rarely changes.

**Q14: What is EIP-712 and when do we use it?**
EIP-712 defines structured data signing — instead of signing a raw hex string, users sign human-readable structured data. Use it for: permit approvals (sign to approve without on-chain transaction), order signing in DEX contracts (gasless orders), meta-transactions. The wallet shows the structured data to users: "Sign to approve USDC transfer to [address]" instead of incomprehensible hex.

**Q15: How do we handle failed transactions gracefully?**
Parse the revert reason from the error: `error.cause?.data` contains the ABI-encoded revert reason. Use viem's `decodeErrorResult` to decode custom errors. Show user-friendly messages: "Insufficient balance" not "ExecutionReverted: 0x1b0d...". Always show the Etherscan link for failed transactions.

**Q16: How do we implement a multi-step transaction flow?**
Define steps array with status (pending/active/complete/failed). Execute step 1, await confirmation, update status to complete, automatically trigger step 2. Show progress indicator. On failure: allow retry from failed step (don't restart from beginning if step 1 already completed).

**Q17: How do we test our dApp frontend without real funds?**
Use Foundry's `anvil` for local EVM testing. `anvil --fork-url https://mainnet.infura.io/v3/KEY` — creates a local fork with real mainnet state. Use `deal()` to give test addresses tokens: `vm.deal(address(this), 100 ether)`. Frontend connects to `http://localhost:8545`.

**Q18: How do we handle address checksumming?**
Always store and display EIP-55 checksum addresses. `getAddress(rawAddress)` from viem converts to checksummed form. Comparing addresses: always convert to lowercase before comparing — `a.toLowerCase() === b.toLowerCase()`.

**Q19: What are the most common Web3 frontend performance issues?**
(1) Waterfall RPC calls — use Multicall3 to batch, (2) Polling too frequently — use event subscriptions where possible, (3) Not caching static data — cache ABI, chain config, token list, (4) Large bundle size — import only what you need from viem, (5) Slow IPFS gateway — use multiple gateways and cache aggressively.

**Q20: How do we implement token approval flow for ERC-20?**
Check current allowance first — if `allowance >= amount`, no approval needed. If not: call `approve(spender, MaxUint256)` (unlimited approval) or `approve(spender, amount)` (exact approval). Wait for approval confirmation, then execute the main transaction. Show users clearly: "First transaction: Approve USDC. Second transaction: Deposit."

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Blockchain Deployment Automation — Hardhat Ignition and Foundry Scripts

**URL:** /tools/blockchain-deployment-automation/
**Schema:** Article, BreadcrumbList
**Internal Links:** /smart-contract-development/, /smart-contract-testing-best-practices/, /tools/smart-contract-security-checklist/

Professional blockchain deployments use automated, reproducible deployment scripts — never manual Remix deploys. Here is the production deployment infrastructure.

### Foundry Deployment Script

```solidity
// script/Deploy.s.sol
// Run: forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify

contract DeployScript is Script {
    
    function run() external {
        // Read deployer private key from environment
        uint256 deployerKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);
        
        console.log("Deploying from:", deployer);
        console.log("Chain ID:", block.chainid);
        
        vm.startBroadcast(deployerKey);
        
        // Deploy implementation contracts
        TokenVault vault = new TokenVault();
        console.log("TokenVault deployed:", address(vault));
        
        // Deploy proxy (UUPS pattern)
        bytes memory initData = abi.encodeWithSelector(
            TokenVault.initialize.selector,
            deployer,           // Owner
            address(usdc),      // USDC address for this chain
            500                 // 5% performance fee
        );
        
        ERC1967Proxy proxy = new ERC1967Proxy(address(vault), initData);
        console.log("Proxy deployed:", address(proxy));
        
        // Configure the proxy (cast to implementation interface)
        TokenVault(address(proxy)).setKeeper(keeper);
        console.log("Keeper set:", keeper);
        
        vm.stopBroadcast();
        
        // Write deployment addresses to file
        _writeDeployment(block.chainid, address(proxy), address(vault));
    }
    
    function _writeDeployment(uint256 chainId, address proxy, address impl) internal {
        string memory json = string(abi.encodePacked(
            '{"chainId":', vm.toString(chainId),
            ',"proxy":"', vm.toString(proxy),
            '","implementation":"', vm.toString(impl), '"}'
        ));
        
        vm.writeFile(
            string(abi.encodePacked("deployments/", vm.toString(chainId), ".json")),
            json
        );
    }
}
```

### Multi-Chain Deployment Script

```bash
#!/bin/bash
# deploy-all.sh: Deploy to multiple chains in sequence

set -e  # Exit on any error

CHAINS=("arbitrum" "optimism" "base" "polygon")
CHAIN_IDS=(42161 10 8453 137)

for i in "${!CHAINS[@]}"; do
  CHAIN="${CHAINS[$i]}"
  echo "Deploying to $CHAIN..."
  
  forge script script/Deploy.s.sol \
    --rpc-url $(eval echo \$${CHAIN^^}_RPC_URL) \
    --broadcast \
    --verify \
    --etherscan-api-key $(eval echo \$${CHAIN^^}_ETHERSCAN_KEY) \
    --delay 5 \
    --retries 3
  
  echo "Deployed to $CHAIN successfully"
  echo "Contract address: $(cat deployments/${CHAIN_IDS[$i]}.json | jq -r '.proxy')"
done

echo "All chains deployed. Verifying..."

# Verify deployment consistency across chains
node scripts/verify-deployments.js
```

### Hardhat Ignition (Modern Hardhat Deployments)

```typescript
// ignition/modules/VaultModule.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VaultModule = buildModule("VaultModule", (m) => {
  
  const usdcAddress = m.getParameter("usdcAddress");
  const keeperAddress = m.getParameter("keeperAddress");
  
  // Deploy implementation
  const vault = m.contract("TokenVault");
  
  // Deploy proxy with initialization
  const proxy = m.contract("ERC1967Proxy", [
    vault,
    m.encodeFunctionCall(vault, "initialize", [
      m.getAccount(0),  // Owner = deployer
      usdcAddress,
      500n              // 5% fee
    ])
  ]);
  
  // Post-deployment configuration
  m.call(proxy, "setKeeper", [keeperAddress], { after: [proxy] });
  
  return { vault, proxy };
});

export default VaultModule;
```

### Deployment Verification Checklist

```bash
# After every deployment, verify these on-chain:

# 1. Verify contract is on Etherscan
forge verify-contract \
  --chain-id 42161 \
  --etherscan-api-key $ARBITRUM_ETHERSCAN_KEY \
  $DEPLOYED_ADDRESS \
  src/TokenVault.sol:TokenVault

# 2. Verify initialization was correct
cast call $PROXY_ADDRESS "owner()" --rpc-url $RPC_URL
cast call $PROXY_ADDRESS "feeBps()" --rpc-url $RPC_URL

# 3. Verify proxy points to correct implementation
cast storage $PROXY_ADDRESS 0x360894a13ba1a3210667c828492db98dca3e2076 --rpc-url $RPC_URL

# 4. Verify multisig ownership (if transferring ownership)
cast call $PROXY_ADDRESS "owner()" --rpc-url $RPC_URL
# Should return multisig address, not deployer EOA

# 5. Run a test transaction (small deposit/withdraw)
# ...before announcing production deployment
```

### FAQ

**Should we use Foundry scripts or Hardhat Ignition for production?**
Both are production-ready. Foundry scripts: better for teams already using Foundry for testing (single toolchain). Hardhat Ignition: better for teams with existing Hardhat codebases, complex deployment graphs with many interdependencies, or teams that prefer JavaScript/TypeScript tooling. The most important property of either: idempotent deployments (running the script twice doesn't deploy twice).

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: DeFi Protocol Term Sheet Template — Investment and Token Allocation

**URL:** /tools/defi-protocol-term-sheet/
**Schema:** Article, BreadcrumbList
**Internal Links:** /blockchain-tokenomics-design/, /token-launch-services/, /blockchain-development-cost/

This term sheet template covers the key economic terms for a DeFi protocol seed or private round. Not legal advice — use as a starting framework with your counsel.

### PROTOCOL SEED ROUND TERM SHEET

**Issuer:** [Protocol Name], [Legal Entity] (Wyoming LLC or Cayman Foundation recommended)
**Round:** Seed / Strategic
**Date:** [Date]
**Jurisdiction:** [Cayman Islands / Wyoming / British Virgin Islands]

---

#### SECTION 1: INVESTMENT TERMS

**Total Raise:** $[Amount]
**Valuation Cap:** $[Amount] on fully-diluted token supply
**Token Price (implied):** $[Valuation Cap] / [Total Token Supply] = $[Price per token]
**Round Size:** $[Amount] / $[Price per token] = [Token Amount] tokens allocated to this round

**Vesting:**
- Cliff: [6 months] from Token Generation Event (TGE)
- Linear unlock: over [24 months] following cliff
- Accelerated vesting: None / [Specify if any milestone-based acceleration]

**Lockup:** During cliff period, tokens held in smart contract escrow; unvested tokens not transferable

---

#### SECTION 2: TOKEN ALLOCATION

| Category | % of Total Supply | Tokens | Vesting |
|---|---|---|---|
| Team | 15% | [X] | 12mo cliff, 48mo linear |
| Seed investors | 8% | [X] | 6mo cliff, 24mo linear |
| Strategic partners | 5% | [X] | 6mo cliff, 24mo linear |
| Treasury / DAO | 20% | [X] | Governance-controlled |
| Ecosystem / grants | 15% | [X] | Milestone-based |
| Liquidity mining | 30% | [X] | Per emission schedule |
| Public/community | 7% | [X] | TGE or bonding curve |
| **Total** | **100%** | | |

---

#### SECTION 3: INVESTOR RIGHTS

**Information rights:** Monthly protocol metrics report; quarterly financial report; immediate notification of material adverse events

**Pro-rata right:** Investors in this round have pro-rata right to participate in next private round (up to their current ownership percentage), exercisable within 15 business days of offer

**Most favored nation (MFN):** If subsequent private round is priced below this round's valuation cap: investor receives adjustment to equivalent valuation

**No board seat:** Seed investors receive no board seat or governance control (standard for token investments)

**Governance tokens:** Investors receive governance tokens per vesting schedule; no enhanced governance rights vs. community token holders

---

#### SECTION 4: REPRESENTATIONS AND WARRANTIES

**Protocol:** Represents that (a) smart contracts will be audited by qualified security firm before launch, (b) legal structure reviewed by qualified counsel, (c) no prior token sales or cap table encumbrances

**Investor:** Represents as accredited investor (for US investors); acknowledges token is speculative; acknowledges regulatory uncertainty; has conducted own legal/tax review

---

#### SECTION 5: CLOSING CONDITIONS

- [ ] Regulatory counsel opinion that offering complies with applicable exemptions
- [ ] Technical specification document approved
- [ ] Security audit firm engaged
- [ ] Smart contract code reviewed by investor's technical advisor (right to review, 15 days)

---

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Blockchain API Integration Guide — Alchemy, Infura, QuickNode Comparison

**URL:** /tools/blockchain-api-comparison/
**Schema:** Article, BreadcrumbList
**Internal Links:** /web3-development-company/, /web3-dapp-architecture/, /blockchain-development-services/

Your dApp needs a reliable blockchain RPC provider. Here is the 2025 comparison across the three major providers.

### Provider Comparison

| Factor | Alchemy | Infura | QuickNode |
|---|---|---|---|
| **Free tier** | 300M CU/month | 100K req/day | 10M req/month |
| **Chains (EVM)** | 30+ | 20+ | 60+ |
| **Solana support** | Yes | Limited | Yes |
| **Enhanced APIs** | Best (NFT, Token, Trace) | Limited | Good |
| **Webhooks** | Yes (Notify) | Yes | Yes |
| **Uptime SLA** | 99.9% (Growth+) | 99.9% (Growth+) | 99.9% (Build+) |
| **Pricing (Growth)** | $49/month | $50/month | $49/month |
| **Archive access** | Growth+ | Core+ | All tiers |

### When to Use Each

**Alchemy:** Best for NFT-heavy applications (best NFT API), applications needing Transact/Simulate APIs for transaction simulation before execution, or teams wanting the richest enhanced API surface.

**Infura:** Best for teams with Ethereum foundation relationships, existing Infura integrations, or organizations requiring specific compliance guarantees.

**QuickNode:** Best for applications requiring the widest chain coverage (60+ chains), Solana + EVM in one account, or teams prioritizing endpoint response latency.

### Production Configuration

```typescript
// Multi-provider failover for production resilience
import { createPublicClient, http, fallback } from 'viem';
import { arbitrum } from 'viem/chains';

const alchemyUrl = `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`;
const infuraUrl = `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const quicknodeUrl = `https://your-endpoint.arbitrum-mainnet.quiknode.pro/${process.env.QN_KEY}`;

const client = createPublicClient({
  chain: arbitrum,
  transport: fallback([
    http(alchemyUrl),     // Primary
    http(infuraUrl),      // Fallback 1
    http(quicknodeUrl),   // Fallback 2
  ])
});
// Automatically falls back if primary fails
```

### Cost Optimization Tips

**Cache aggressively:** Token balances, contract ABIs, token metadata, ENS resolutions. Implement a Redis cache for frequently read data — reduces RPC calls by 60–80%.

**Batch with Multicall3:** Replace 10 individual `balanceOf` calls with one Multicall3 request.

**Use webhooks instead of polling:** Instead of polling `getBlockNumber()` every second, set up Alchemy Notify to webhook your server when relevant events occur.

**Right-size your plan:** Check your actual CU/request usage before upgrading. Most applications use 20–30% of what they estimate.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
