## H1: How to Launch a DeFi Protocol — Week-by-Week Execution Guide

**URL:** /how-to-launch-defi-protocol/
**Schema:** HowTo, FAQPage, BreadcrumbList
**Internal Links:** /defi-development-company/, /tools/defi-launch-checklist/, /token-launch-services/

### Weeks 1–4: Architecture and Specification

**Week 1:** Define the core mechanism. Write a 2-page plain English description of what your protocol does and how it works. Show it to 10 potential users. Can they explain it back to you? If not: simplify.

**Week 2:** Platform selection. Which chain? Document the decision with specific reasons tied to your use case (liquidity depth, user base, gas costs, ecosystem).

**Week 3:** Technical specification. Every function, every state variable, every event. The spec should be detailed enough that two different teams could independently implement the same contract.

**Week 4:** Oracle design. Draw the oracle architecture: which price feeds, what divergence threshold, what happens if the oracle fails. This is non-negotiable before writing code.

### Weeks 5–16: Development

**Weeks 5–8:** Smart contract development. CEI pattern throughout. No external calls before state updates. Custom errors. OpenZeppelin for standard components.

**Weeks 9–12:** Testing. 95%+ line coverage mandatory. Fuzz tests on all critical math functions. Invariant tests. Fork tests against mainnet state.

**Weeks 13–14:** Internal security review. Run Slither, Aderyn, Mythril. Review every finding. Fix all Critical and High.

**Weeks 15–16:** Frontend development. Transaction status management. Gas estimation. Error handling. WalletConnect + RainbowKit.

### Weeks 17–22: Audit

**Week 17:** Submit to audit firm. Prepare documentation package: architecture diagram, invariants list, known issues, integration points.

**Weeks 18–21:** Audit execution. Answer auditor questions promptly. Begin remediation planning as findings come in.

**Week 22:** Receive draft report. Triage findings. Prepare responses. Implement Critical and High fixes immediately.

### Weeks 23–26: Launch Preparation

**Week 23:** Remediation complete. Submit to auditor for re-review. Bug bounty launched on Immunefi (minimum $50K Critical bounty).

**Week 24:** Deploy to mainnet testnet (Sepolia/Arbitrum Sepolia). Run for 1–2 weeks. Test with team members using real workflows.

**Week 25:** Multi-sig configured and tested. All keyholders execute a test transaction. Emergency pause tested.

**Week 26:** Final audit report received. Publish publicly. Announce launch date.

### Week 27+: Launch and Monitor

Deploy to mainnet via multi-sig. Initial TVL cap (e.g., $500K max for first 30 days). Monitor Forta alerts and Tenderly alerts 24/7 for first week. Daily metrics review for first 30 days.

### FAQ

**What is the most common reason DeFi protocols fail in the first 90 days?**
TVL too concentrated in protocol's own token emissions (mercenary capital that leaves when emissions reduce) AND the protocol failing to build genuine utility beyond yield farming. Protocols that survive: provide a service users genuinely need and would pay for even without token rewards.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: How to Set Up Hyperledger Fabric — Step-by-Step Network Deployment

**URL:** /how-to-set-up-hyperledger-fabric/
**Schema:** HowTo, FAQPage, BreadcrumbList
**Internal Links:** /hyperledger-fabric-development/, /enterprise-blockchain-solutions/, /blockchain-enterprise-it-integration/

### Prerequisites

```bash
# Install Docker (required for Fabric containers)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Fabric binaries
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.5.0 1.5.7
export PATH=$PATH:$(pwd)/fabric-samples/bin
```

### Step 1: Define Your Network Structure

Before running any commands, document your network:
- How many organizations?
- What is each org's MSP ID?
- Which org runs the ordering service?
- What channels will exist?
- What chaincode will run on each channel?

### Step 2: Generate Crypto Material

```bash
# cryptogen: generates TLS certs and signing keys for all network components
cat > crypto-config.yaml << 'EOF'
OrdererOrgs:
  - Name: Orderer
    Domain: example.com
    Specs:
      - Hostname: orderer
    
PeerOrgs:
  - Name: Org1
    Domain: org1.example.com
    EnableNodeOUs: true
    Template:
      Count: 2       # 2 peer nodes for Org1
    Users:
      Count: 1       # 1 additional user besides admin

  - Name: Org2  
    Domain: org2.example.com
    EnableNodeOUs: true
    Template:
      Count: 2
    Users:
      Count: 1
EOF

cryptogen generate --config=./crypto-config.yaml
```

### Step 3: Create Channel Artifacts

```bash
# configtx.yaml: defines organizations, policies, and genesis block
# Create channel transaction
configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/mychannel.tx -channelID mychannel

# Create genesis block for the ordering service
configtxgen -profile TwoOrgsOrdererGenesis -outputBlock ./channel-artifacts/genesis.block
```

### Step 4: Start the Network

```bash
# docker-compose.yaml defines all network containers
docker-compose -f docker/docker-compose-test-net.yaml up -d

# Check all containers are running
docker ps

# Expected: peer0.org1.example.com, peer0.org2.example.com, orderer.example.com
```

### Step 5: Create and Join Channel

```bash
# Create channel (only once)
peer channel create -o orderer.example.com:7050 \
  -c mychannel \
  -f ./channel-artifacts/mychannel.tx \
  --tls --cafile $ORDERER_CA

# Join Org1 peer to channel
peer channel join -b mychannel.block

# Switch to Org2 and join
export CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/fabric/crypto-config/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=peer0.org2.example.com:9051
peer channel join -b mychannel.block
```

### Step 6: Deploy Chaincode

```bash
# Fabric 2.x lifecycle: package → install → approve → commit

# Package
peer lifecycle chaincode package mycc.tar.gz \
  --path ./chaincode/mycc \
  --lang golang \
  --label mycc_1.0

# Install on each org's peers
peer lifecycle chaincode install mycc.tar.gz

# Approve for Org1
peer lifecycle chaincode approveformyorg \
  -o orderer.example.com:7050 \
  --channelID mychannel \
  --name mycc \
  --version 1.0 \
  --sequence 1 \
  --tls --cafile $ORDERER_CA

# Approve for Org2 (same command, different env vars)
peer lifecycle chaincode approveformyorg ...

# Commit chaincode (after all required orgs have approved)
peer lifecycle chaincode commit \
  -o orderer.example.com:7050 \
  --channelID mychannel \
  --name mycc \
  --version 1.0 \
  --sequence 1 \
  --tls --cafile $ORDERER_CA \
  --peerAddresses peer0.org1.example.com:7051 \
  --peerAddresses peer0.org2.example.com:9051
```

### Step 7: Test With Invoke and Query

```bash
# Invoke chaincode function (state-changing)
peer chaincode invoke \
  -o orderer.example.com:7050 \
  --channelID mychannel \
  --name mycc \
  -c '{"function":"createAsset","Args":["asset1","blue","5","Tomoko","300"]}' \
  --tls --cafile $ORDERER_CA

# Query chaincode (read-only)
peer chaincode query \
  -C mychannel \
  -n mycc \
  -c '{"Args":["ReadAsset","asset1"]}'
```

### FAQ

**What is the most common Fabric deployment mistake?**
Not testing certificate expiry rotation before going to production. Fabric certificates expire (default: 1 year for enrollment certs). Certificate rotation in production requires careful coordination across all peers and orderers. Test your certificate rotation procedure in staging before your first production cert expires.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: How to Deploy a Smart Contract to Multiple Blockchains — Multi-Chain Strategy

**URL:** /how-to-deploy-smart-contract-multi-chain/
**Schema:** HowTo, FAQPage, BreadcrumbList
**Internal Links:** /smart-contract-development/, /web3-development-company/, /zksync-vs-arbitrum-vs-optimism/

Deploying the same smart contract to multiple EVM-compatible chains is straightforward but requires careful chain-specific configuration.

### The Multi-Chain Deployment Architecture

**Same bytecode, different addresses:** EVM-compatible chains share the same instruction set. The same compiled Solidity bytecode deploys to Ethereum, Arbitrum, Base, and Polygon — at different addresses on each chain.

**What varies per chain:**
- Gas price and limits (check `forge gas-price`)
- Block time (important for timelock calculations)
- Chain ID (for EIP-712 signatures)
- External contract addresses (oracles, routers, tokens)

### Foundry Multi-Chain Configuration

```toml
# foundry.toml

[rpc_endpoints]
mainnet = "https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}"
arbitrum = "https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}"
optimism = "https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}"
base = "https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}"
polygon = "https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}"

[etherscan]
mainnet = { key = "${ETHERSCAN_KEY}" }
arbitrum = { key = "${ARBISCAN_KEY}", url = "https://api.arbiscan.io/api" }
base = { key = "${BASESCAN_KEY}", url = "https://api.basescan.org/api" }
polygon = { key = "${POLYGONSCAN_KEY}", url = "https://api.polygonscan.com/api" }
```

### Chain-Specific Address Registry

```solidity
// addresses/Addresses.sol
library ChainAddresses {
    
    struct ChainConfig {
        address usdc;
        address weth;
        address uniswapV3Router;
        address chainlinkEthUsd;
    }
    
    function get(uint256 chainId) internal pure returns (ChainConfig memory) {
        if (chainId == 1) { // Ethereum mainnet
            return ChainConfig({
                usdc: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48,
                weth: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2,
                uniswapV3Router: 0xE592427A0AEce92De3Edee1F18E0157C05861564,
                chainlinkEthUsd: 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419
            });
        } else if (chainId == 42161) { // Arbitrum One
            return ChainConfig({
                usdc: 0xaf88d065e77c8cC2239327C5EDb3A432268e5831,
                weth: 0x82aF49447D8a07e3bd95BD0d56f35241523fBab1,
                uniswapV3Router: 0xE592427A0AEce92De3Edee1F18E0157C05861564,
                chainlinkEthUsd: 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612
            });
        }
        // Add more chains...
        revert("Unsupported chain");
    }
}
```

### Deployment Script

```solidity
// script/Deploy.s.sol
contract DeployScript is Script {
    function run() external {
        ChainAddresses.ChainConfig memory config = ChainAddresses.get(block.chainid);
        
        vm.startBroadcast(vm.envUint("DEPLOYER_KEY"));
        
        MyProtocol protocol = new MyProtocol(
            config.usdc,
            config.weth,
            config.uniswapV3Router,
            config.chainlinkEthUsd
        );
        
        vm.stopBroadcast();
        
        // Write deployment to JSON
        _writeDeployment(block.chainid, address(protocol));
    }
}
```

```bash
# Deploy to all chains
for CHAIN in mainnet arbitrum optimism base polygon; do
  forge script script/Deploy.s.sol \
    --rpc-url $CHAIN \
    --broadcast \
    --verify \
    -vvvv
done
```

### FAQ

**Should we deploy to all chains simultaneously or phase the rollout?**
Phase the rollout. Deploy to Arbitrum first (largest DeFi ecosystem), run for 30–90 days, confirm the protocol works as expected. Then deploy to Base, then Optimism. Each deployment requires its own liquidity bootstrapping and user acquisition — spreading across 5 chains at launch dilutes your liquidity and user attention.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
