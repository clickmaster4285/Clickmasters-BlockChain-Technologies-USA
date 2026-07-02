# NFT Marketplace Aggregator Architecture — Multi-Platform Routing | Clickmasters

---
**URL:** /nft-marketplace-aggregator/
**Primary KW:** NFT marketplace aggregator development
**Secondary KWs:** build NFT aggregator, multi-marketplace NFT, NFT best price routing
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-marketplace-development/, /nft-marketplace-smart-contract/, /web3-development-company/

---

## H1: NFT Marketplace Aggregator Architecture — Routing NFT Orders Across OpenSea, Blur, and LooksRare

**H2: NFT aggregators (Gem, Blur's aggregator, NFTGo) route orders across multiple marketplaces to find the best price. Building one requires parsing multiple marketplace protocols, batching multi-buy transactions, and handling partial fills. Here is the architecture.**

---

## Why NFT Aggregators Exist

When you want to buy 10 NFTs from a collection: OpenSea might have 4 at floor price, Blur has 3 cheaper ones, and LooksRare has 3. Without an aggregator: 3 separate transactions, 3 marketplace interfaces, manually checking prices. With an aggregator: one transaction that fills the best-priced items across all marketplaces simultaneously.

---

## Seaport Protocol Integration (OpenSea)

```solidity
// Seaport is OpenSea's open-source marketplace protocol
// Used by OpenSea, Blur (for Seaport-compatible orders), and others

interface ISeaport {
    struct BasicOrderParameters {
        address considerationToken;
        uint256 considerationIdentifier;
        uint256 considerationAmount;
        address payable offerer;
        address zone;
        address offerToken;
        uint256 offerIdentifier;
        uint256 offerAmount;
        BasicOrderType basicOrderType;
        uint256 startTime;
        uint256 endTime;
        bytes32 zoneHash;
        uint256 salt;
        bytes32 offererConduitKey;
        bytes32 fulfillerConduitKey;
        uint256 totalOriginalAdditionalRecipients;
        AdditionalRecipient[] additionalRecipients;
        bytes signature;
    }
    
    function fulfillBasicOrder(BasicOrderParameters calldata parameters) 
        external payable returns (bool fulfilled);
    
    function fulfillAvailableAdvancedOrders(
        AdvancedOrder[] memory advancedOrders,
        CriteriaResolver[] calldata criteriaResolvers,
        FulfillmentComponent[][] calldata offerFulfillments,
        FulfillmentComponent[][] calldata considerationFulfillments,
        bytes32 fulfillerConduitKey,
        address recipient,
        uint256 maximumFulfilled
    ) external payable returns (bool[] memory availableOrders, Execution[] memory executions);
}
```

---

## Aggregator Router Contract

```solidity
contract NFTAggregatorRouter is ReentrancyGuard, Ownable {
    ISeaport public seaport;
    
    struct MarketplaceTrade {
        uint8 marketplaceId;   // 0=Seaport, 1=Blur, 2=LooksRare
        bytes tradeData;       // Marketplace-specific encoded call
        uint256 value;         // ETH value for this trade
        bool requireSuccess;   // If false: skip if this trade fails
    }
    
    // Execute multiple marketplace trades in one transaction
    function aggregateBuy(
        MarketplaceTrade[] calldata trades,
        bool allowPartialFills
    ) external payable nonReentrant {
        uint256 remainingValue = msg.value;
        
        for (uint256 i = 0; i < trades.length; i++) {
            MarketplaceTrade calldata trade = trades[i];
            
            require(remainingValue >= trade.value, "Insufficient ETH");
            remainingValue -= trade.value;
            
            bool success;
            if (trade.marketplaceId == 0) {
                success = _executSeaportOrder(trade.tradeData, trade.value);
            } else if (trade.marketplaceId == 1) {
                success = _executeBlurOrder(trade.tradeData, trade.value);
            } else if (trade.marketplaceId == 2) {
                success = _executeLooksRareOrder(trade.tradeData, trade.value);
            }
            
            if (!success && trade.requireSuccess) {
                revert("Required trade failed");
            }
            if (!success && allowPartialFills) {
                // Refund ETH for failed trade
                remainingValue += trade.value;
            }
        }
        
        // Return any unused ETH
        if (remainingValue > 0) {
            payable(msg.sender).transfer(remainingValue);
        }
    }
    
    function _executSeaportOrder(bytes memory data, uint256 value) internal returns (bool) {
        (bool success,) = address(seaport).call{value: value}(data);
        return success;
    }
    
    function _executeBlurOrder(bytes memory data, uint256 value) internal returns (bool) {
        (bool success,) = BLUR_EXCHANGE.call{value: value}(data);
        return success;
    }
    
    function _executeLooksRareOrder(bytes memory data, uint256 value) internal returns (bool) {
        (bool success,) = LOOKSRARE_EXCHANGE.call{value: value}(data);
        return success;
    }
}
```

---

## Off-Chain Price Aggregation API

```typescript
// Fetch floor listings across all marketplaces
async function aggregateNFTListings(
    contractAddress: string,
    maxCount: number
) {
    const [seaportListings, blurListings, looksrareListings] = await Promise.all([
        fetchSeaportListings(contractAddress, maxCount),
        fetchBlurListings(contractAddress, maxCount),
        fetchLooksRareListings(contractAddress, maxCount)
    ]);
    
    // Combine and sort by price
    const allListings = [
        ...seaportListings.map(l => ({ ...l, source: 'seaport' })),
        ...blurListings.map(l => ({ ...l, source: 'blur' })),
        ...looksrareListings.map(l => ({ ...l, source: 'looksrare' }))
    ].sort((a, b) => Number(a.price - b.price));
    
    // Deduplicate (same NFT listed on multiple platforms)
    const seen = new Set<string>();
    const deduped = allListings.filter(listing => {
        const key = `${listing.tokenId}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
    
    return deduped.slice(0, maxCount);
}

// Build batched transaction for buying cheapest N NFTs
async function buildBatchBuyTransaction(
    listings: Listing[],
    buyerAddress: string
) {
    const trades = listings.map(listing => ({
        marketplaceId: getMarketplaceId(listing.source),
        tradeData: encodeTradeData(listing),
        value: listing.price,
        requireSuccess: false  // Allow partial fills
    }));
    
    const totalValue = listings.reduce((sum, l) => sum + l.price, 0n);
    
    return {
        trades,
        totalValue,
        estimatedGas: await estimateGas(trades, buyerAddress)
    };
}
```

---

## FAQ

**Should we build our own aggregator or integrate with Reservoir?**
Reservoir Protocol provides an open-source aggregation layer with indexing across 100+ marketplaces. For most applications: integrate Reservoir rather than building from scratch. Building a custom aggregator adds value when you need proprietary routing logic, custom fee structures, or tight integration with your own marketplace.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Dynamic NFT Architecture — Evolving Metadata and On-Chain State | Clickmasters

---
**URL:** /dynamic-nft-architecture/
**Primary KW:** dynamic NFT architecture
**Secondary KWs:** evolving NFT metadata, on-chain dynamic NFT, NFT that changes, mutable NFT
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /nft-smart-contract-development/, /blockchain-oracle-integration/

---

## H1: Dynamic NFT Architecture — NFTs That Change Based on On-Chain and Off-Chain Events

**H2: Dynamic NFTs update their metadata in response to on-chain state changes, oracle data, or game events. A character that levels up, a sports card that shows live stats, a loyalty NFT that reflects tier. Here is the complete implementation.**

---

## Two Dynamic NFT Patterns

**Pattern 1: On-Chain Metadata (Fully Decentralized)**
All NFT attributes stored in smart contract storage. `tokenURI()` generates JSON dynamically from on-chain data. No IPFS dependency — metadata is permanent as long as Ethereum exists.

**Pattern 2: Mutable IPFS Metadata (Simpler)**
Metadata stored on IPFS but the contract `baseURI` can be updated by the owner. Simpler implementation but introduces trust assumption (owner can change metadata).

---

## Pattern 1: Fully On-Chain Dynamic NFT

```solidity
contract DynamicCharacterNFT is ERC721 {
    
    struct CharacterStats {
        uint256 level;
        uint256 experience;
        uint256 strength;
        uint256 agility;
        uint256 intelligence;
        string characterClass;  // "Warrior", "Mage", "Rogue"
        uint256 wins;
        uint256 losses;
    }
    
    mapping(uint256 => CharacterStats) public characterStats;
    
    // tokenURI generates JSON dynamically from current on-chain stats
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        CharacterStats memory stats = characterStats[tokenId];
        
        // Build JSON metadata
        string memory attributes = string(abi.encodePacked(
            '[',
            _buildAttribute("Level", Strings.toString(stats.level)), ',',
            _buildAttribute("Experience", Strings.toString(stats.experience)), ',',
            _buildAttribute("Strength", Strings.toString(stats.strength)), ',',
            _buildAttribute("Agility", Strings.toString(stats.agility)), ',',
            _buildAttribute("Intelligence", Strings.toString(stats.intelligence)), ',',
            _buildAttribute("Class", stats.characterClass), ',',
            _buildAttribute("Wins", Strings.toString(stats.wins)), ',',
            _buildAttribute("Losses", Strings.toString(stats.losses)),
            ']'
        ));
        
        // Generate SVG image based on current stats
        string memory svg = _generateCharacterSVG(tokenId, stats);
        string memory svgBase64 = Base64.encode(bytes(svg));
        
        string memory json = Base64.encode(bytes(string(abi.encodePacked(
            '{"name": "Character #', Strings.toString(tokenId), '",',
            '"description": "A blockchain RPG character that grows with gameplay.",',
            '"image": "data:image/svg+xml;base64,', svgBase64, '",',
            '"attributes": ', attributes, '}'
        ))));
        
        return string(abi.encodePacked('data:application/json;base64,', json));
    }
    
    // Game server updates stats (requires GAME_SERVER_ROLE)
    function updateCharacterStats(
        uint256 tokenId,
        uint256 experienceGained,
        bool won
    ) external onlyGameServer {
        CharacterStats storage stats = characterStats[tokenId];
        
        stats.experience += experienceGained;
        
        if (won) stats.wins++;
        else stats.losses++;
        
        // Level up if enough experience
        uint256 expForNextLevel = stats.level * 1000;
        if (stats.experience >= expForNextLevel) {
            stats.level++;
            stats.strength += 5;
            stats.agility += 3;
            stats.intelligence += 2;
            
            emit LevelUp(tokenId, stats.level);
        }
        
        // EIP-4906: Notify marketplaces to refresh metadata
        emit MetadataUpdate(tokenId);
    }
    
    function _generateCharacterSVG(
        uint256 tokenId,
        CharacterStats memory stats
    ) internal pure returns (string memory) {
        // Generate an SVG that visually represents the character stats
        // Color, size, and visual elements based on level, class, and stats
        string memory levelColor = stats.level >= 50 ? '#FFD700' :  // Gold for 50+
                                   stats.level >= 20 ? '#C0C0C0' :  // Silver for 20+
                                   '#CD7F32';                        // Bronze for below 20
        
        return string(abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">',
            '<rect width="300" height="300" fill="#1a1a2e"/>',
            '<circle cx="150" cy="100" r="60" fill="', levelColor, '"/>',
            '<text x="150" y="200" text-anchor="middle" fill="white" font-size="20">',
            'Level ', Strings.toString(stats.level), ' ', stats.characterClass,
            '</text>',
            '<text x="150" y="240" text-anchor="middle" fill="#aaa" font-size="14">',
            'STR:', Strings.toString(stats.strength),
            ' AGI:', Strings.toString(stats.agility),
            ' INT:', Strings.toString(stats.intelligence),
            '</text>',
            '</svg>'
        ));
    }
    
    function _buildAttribute(string memory trait, string memory value) 
        internal pure returns (string memory) 
    {
        return string(abi.encodePacked(
            '{"trait_type":"', trait, '","value":"', value, '"}'
        ));
    }
    
    bytes32 public constant GAME_SERVER_ROLE = keccak256("GAME_SERVER_ROLE");
    mapping(address => bool) public gameServers;
    
    modifier onlyGameServer() {
        require(gameServers[msg.sender], "Not game server");
        _;
    }
    
    event LevelUp(uint256 indexed tokenId, uint256 newLevel);
    event MetadataUpdate(uint256 indexed tokenId);  // EIP-4906
}
```

---

## Chainlink-Triggered Dynamic NFT

```solidity
// Sports card NFT that updates stats via Chainlink External Adapter
contract SportsCardNFT is ERC721, ChainlinkClient {
    
    mapping(uint256 => PlayerStats) public playerStats;
    mapping(bytes32 => uint256) public requestToTokenId;
    
    // Request live stats update via Chainlink
    function requestStatsUpdate(uint256 tokenId) external returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            JOB_ID,
            address(this),
            this.fulfillStatsUpdate.selector
        );
        
        req.add("playerId", Strings.toString(getPlayerId(tokenId)));
        req.add("path", "stats");
        
        requestId = sendChainlinkRequest(req, ORACLE_FEE);
        requestToTokenId[requestId] = tokenId;
    }
    
    // Chainlink callback with updated stats
    function fulfillStatsUpdate(
        bytes32 requestId,
        bytes memory statsData
    ) external recordChainlinkFulfillment(requestId) {
        uint256 tokenId = requestToTokenId[requestId];
        
        // Decode stats from Chainlink response
        (uint256 points, uint256 assists, uint256 rebounds) = 
            abi.decode(statsData, (uint256, uint256, uint256));
        
        playerStats[tokenId].seasonPoints = points;
        playerStats[tokenId].seasonAssists = assists;
        playerStats[tokenId].seasonRebounds = rebounds;
        playerStats[tokenId].lastUpdated = block.timestamp;
        
        emit MetadataUpdate(tokenId);  // Notify marketplaces to refresh
    }
}
```

---

## FAQ

**How do marketplaces know when dynamic NFT metadata has changed?**
EIP-4906 defines the `MetadataUpdate(uint256 tokenId)` event. When a dynamic NFT's metadata changes, the contract emits this event. Marketplaces (OpenSea, Blur, Zora) listen for these events and refresh the cached metadata automatically. Without EIP-4906, updated metadata may not appear on marketplaces for hours or days.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Web3 Session Keys — Gasless and Frictionless dApp Interactions | Clickmasters

---
**URL:** /web3-session-keys/
**Primary KW:** Web3 session keys
**Secondary KWs:** session key smart wallet, gasless Web3 sessions, temporary signing key dApp
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /web3-account-abstraction/, /erc-4337-account-abstraction-implementation/, /web3-development-company/

---

## H1: Web3 Session Keys — Pre-Authorized Signing for Seamless dApp Interactions

**H2: Session keys allow users to pre-authorize a temporary key to sign specific operations without wallet popups. The user signs once to start a gaming session; all in-game transactions execute automatically. Here is the implementation.**

---

## Why Session Keys Exist

In traditional Web3 games: every item transfer, every battle result, every reward claim requires a MetaMask popup. This makes games unplayable — no one wants 50 wallet confirmations per gaming session.

Session keys solve this: the user approves a session at game start ("Allow game to sign item transfers for the next 2 hours"). The session key (a temporary private key held by the game server) signs all transactions within those constraints without requiring the user's approval each time.

---

## Session Key Architecture (ERC-4337 Smart Account)

```solidity
contract SessionKeyModule is Ownable {
    
    struct SessionKeyConfig {
        address sessionKey;           // Temporary signer address
        uint256 validAfter;          // Session start timestamp
        uint256 validUntil;          // Session end timestamp
        address[] allowedContracts; // Which contracts this key can call
        bytes4[] allowedFunctions;  // Which function selectors can be called
        uint256 maxValuePerTx;      // Maximum ETH per transaction
        uint256 totalSpentValue;    // Track cumulative ETH spent
        uint256 maxTotalValue;      // Maximum ETH over entire session
        bool active;
    }
    
    mapping(address => mapping(address => SessionKeyConfig)) public sessionKeys;
    // owner → sessionKey → config
    
    // User creates a session key configuration
    function createSessionKey(
        address sessionKey,
        uint256 durationSeconds,
        address[] calldata allowedContracts,
        bytes4[] calldata allowedFunctions,
        uint256 maxValuePerTx,
        uint256 maxTotalValue
    ) external {
        sessionKeys[msg.sender][sessionKey] = SessionKeyConfig({
            sessionKey: sessionKey,
            validAfter: block.timestamp,
            validUntil: block.timestamp + durationSeconds,
            allowedContracts: allowedContracts,
            allowedFunctions: allowedFunctions,
            maxValuePerTx: maxValuePerTx,
            totalSpentValue: 0,
            maxTotalValue: maxTotalValue,
            active: true
        });
        
        emit SessionKeyCreated(msg.sender, sessionKey, block.timestamp + durationSeconds);
    }
    
    // Validate that a session key is permitted to execute an operation
    function validateSessionKeyExecution(
        address owner,
        address sessionKey,
        address targetContract,
        bytes4 functionSelector,
        uint256 value
    ) external view returns (bool) {
        SessionKeyConfig memory config = sessionKeys[owner][sessionKey];
        
        if (!config.active) return false;
        if (block.timestamp < config.validAfter) return false;
        if (block.timestamp > config.validUntil) return false;
        if (value > config.maxValuePerTx) return false;
        if (config.totalSpentValue + value > config.maxTotalValue) return false;
        
        // Check contract is allowed
        bool contractAllowed = false;
        for (uint256 i = 0; i < config.allowedContracts.length; i++) {
            if (config.allowedContracts[i] == targetContract) {
                contractAllowed = true;
                break;
            }
        }
        if (!contractAllowed) return false;
        
        // Check function is allowed
        bool functionAllowed = false;
        for (uint256 i = 0; i < config.allowedFunctions.length; i++) {
            if (config.allowedFunctions[i] == functionSelector) {
                functionAllowed = true;
                break;
            }
        }
        
        return functionAllowed;
    }
    
    // Game server calls this after each session key transaction
    function recordSessionSpend(
        address owner,
        address sessionKey,
        uint256 value
    ) external onlyAuthorized {
        sessionKeys[owner][sessionKey].totalSpentValue += value;
    }
    
    // User revokes session key at any time
    function revokeSessionKey(address sessionKey) external {
        sessionKeys[msg.sender][sessionKey].active = false;
        emit SessionKeyRevoked(msg.sender, sessionKey);
    }
    
    event SessionKeyCreated(address indexed owner, address sessionKey, uint256 expiresAt);
    event SessionKeyRevoked(address indexed owner, address sessionKey);
}
```

---

## Frontend Session Key Flow

```typescript
async function startGameSession(userSmartAccount: Address) {
    // Generate a temporary signing key (held by game server, not user)
    const sessionPrivateKey = generatePrivateKey();
    const sessionKey = privateKeyToAddress(sessionPrivateKey);
    
    // Send to user's wallet for approval (ONCE per session)
    const sessionConfig = {
        sessionKey,
        durationSeconds: 7200, // 2-hour session
        allowedContracts: [GAME_ITEMS_CONTRACT, BATTLE_CONTRACT],
        allowedFunctions: [
            // Only these specific operations are permitted
            getFunctionSelector('transferItem(uint256,address)'),
            getFunctionSelector('reportBattleResult(uint256,bool)'),
            getFunctionSelector('claimReward(uint256)'),
        ],
        maxValuePerTx: 0n, // No ETH per transaction (gasless via paymaster)
        maxTotalValue: 0n
    };
    
    // User approves the session key setup (one wallet popup)
    const tx = await smartAccount.writeContract({
        address: SESSION_KEY_MODULE,
        abi: SESSION_KEY_ABI,
        functionName: 'createSessionKey',
        args: [
            sessionConfig.sessionKey,
            BigInt(sessionConfig.durationSeconds),
            sessionConfig.allowedContracts,
            sessionConfig.allowedFunctions,
            sessionConfig.maxValuePerTx,
            sessionConfig.maxTotalValue
        ]
    });
    
    await waitForTransactionReceipt({ hash: tx });
    
    // Store session key securely in game server memory
    await gameServer.storeSessionKey(userSmartAccount, sessionPrivateKey);
    
    return { sessionKey, expiresAt: Date.now() + 7200000 };
}

// During game: sign transaction with session key (no wallet popup)
async function executeGameAction(
    userSmartAccount: Address,
    action: GameAction
) {
    const sessionKey = await gameServer.getSessionKey(userSmartAccount);
    
    // Build UserOperation signed with session key
    const userOp = await buildUserOperation({
        sender: userSmartAccount,
        callData: encodeGameAction(action),
        // Session key signature instead of user's wallet signature
        signature: await signWithSessionKey(sessionKey, userOpHash)
    });
    
    // Submit via bundler — no wallet popup for the user
    return await bundler.sendUserOperation(userOp);
}
```

---

## FAQ

**What stops a compromised game server from draining user funds using session keys?**
The session key constraints in the smart contract: (1) it can only call specific contracts (`allowedContracts`), (2) it can only call specific functions (`allowedFunctions`), (3) it cannot spend more than `maxValuePerTx`, (4) it expires at `validUntil`. A compromised session key can only do what was pre-authorized — it cannot transfer ETH or call any contract outside the allowed list.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# MPC Wallet Architecture — Multi-Party Computation for Institutional Custody | Clickmasters

---
**URL:** /crypto-wallet-mpc-architecture/
**Primary KW:** MPC wallet architecture
**Secondary KWs:** multi-party computation crypto custody, MPC key management, threshold signature scheme
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /crypto-wallet-development/, /crypto-wallet-key-management/, /crypto-exchange-cold-storage/

---

## H1: MPC Wallet Architecture — Threshold Signatures for Institutional-Grade Key Management

**H2: Multi-Party Computation (MPC) splits a private key across multiple parties so no single party ever holds the complete key. This eliminates single points of failure in custody without the operational complexity of traditional multi-sig. Here is the architecture.**

---

## MPC vs Multi-Sig: Key Differences

| Factor | Multi-Sig (Gnosis Safe) | MPC (Fireblocks, ZenGo) |
|---|---|---|
| On-chain footprint | Every signer appears on-chain | Single address — no visible signers |
| Gas cost | Higher (multiple signatures in tx) | Same as EOA transaction |
| Privacy | All signers' addresses public | Signing parties not revealed on-chain |
| Key compromise | 1-of-N signers compromised: safe | 1-of-N parties compromised: safe |
| Setup complexity | Smart contract deployment | Off-chain key generation ceremony |
| Hardware compatibility | Hardware wallet per signer | Custom HSM per party |
| Best for | DAO governance, protocol admin | Exchange hot wallets, institutional custody |

---

## MPC-CMP Protocol (Fireblocks' Approach)

```
KEY GENERATION (offline ceremony):
1. Party A, B, C each generate a random secret share: a, b, c
2. They compute a combined public key: PubKey = a*G + b*G + c*G
   (no single party knows the private key = a+b+c)
3. Each party stores only their share

SIGNING (when transaction needs to be signed):
1. Transaction hash H presented to all parties
2. Each party generates a partial signature using their secret share
3. Two of three parties (2-of-3 threshold) combine partial signatures
4. Combined signature is cryptographically valid for PubKey
5. No complete private key is ever reconstructed

KEY PROPERTIES:
- The complete private key (a+b+c) never exists in any single location
- Loss of one party's share: can reconstruct with remaining shares
- Compromise of one party: attacker cannot sign without other party
- Any transaction requires 2-of-3 parties to cooperate
```

---

## Building With MPC: API Integration Pattern

```typescript
// Fireblocks SDK integration for MPC-based transactions
import { FireblocksSDK, CreateTransactionResponse } from '@fireblocks/fireblocks-sdk';

class MPCWalletService {
    private fireblocks: FireblocksSDK;
    
    constructor() {
        this.fireblocks = new FireblocksSDK(
            fs.readFileSync(process.env.FIREBLOCKS_SECRET_KEY_PATH, 'utf-8'),
            process.env.FIREBLOCKS_API_KEY
        );
    }
    
    // Create a transaction (triggers MPC signing)
    async createTransaction(params: {
        sourceVaultId: string,
        destAddress: string,
        asset: string,
        amount: string,
        note?: string
    }): Promise<CreateTransactionResponse> {
        
        const tx = await this.fireblocks.createTransaction({
            assetId: params.asset,
            source: {
                type: 'VAULT_ACCOUNT',
                id: params.sourceVaultId
            },
            destination: {
                type: 'ONE_TIME_ADDRESS',
                oneTimeAddress: {
                    address: params.destAddress
                }
            },
            amount: params.amount,
            note: params.note || 'Automated transaction'
        });
        
        return tx;
    }
    
    // Wait for MPC signing to complete and transaction to broadcast
    async waitForCompletion(txId: string, timeoutMs = 30000): Promise<string> {
        const startTime = Date.now();
        
        while (Date.now() - startTime < timeoutMs) {
            const tx = await this.fireblocks.getTransactionById(txId);
            
            if (tx.status === 'COMPLETED') {
                return tx.txHash!;
            }
            
            if (['FAILED', 'BLOCKED', 'REJECTED', 'CANCELLED'].includes(tx.status)) {
                throw new Error(`Transaction ${txId} failed with status: ${tx.status}`);
            }
            
            await new Promise(r => setTimeout(r, 2000));
        }
        
        throw new Error(`Transaction ${txId} timed out`);
    }
    
    // Policy engine: apply rules before signing
    async createTransactionWithPolicy(params: any): Promise<string> {
        // Fireblocks policy engine checks these rules automatically:
        // - Amount under $10,000: auto-approve
        // - Amount $10,000-$100,000: require 1 human approver
        // - Amount >$100,000: require 2 human approvers
        // - Destination not in whitelist: always require approval
        
        const tx = await this.createTransaction(params);
        return this.waitForCompletion(tx.id);
    }
}
```

---

## When to Use MPC vs Multi-Sig

**Use MPC when:**
- Exchange hot wallet handling thousands of transactions daily (gas savings compound significantly)
- Institutional custody where transaction privacy matters (MPC does not reveal signers on-chain)
- High-frequency automated transactions where multi-sig's manual approval cycle is too slow
- You want to use a managed service (Fireblocks, ZenGo) for the complex cryptography

**Use Multi-Sig when:**
- DAO governance (transparency of who voted is a feature, not a bug)
- Protocol admin keys (community wants to verify who controls admin)
- Cross-organizational governance (Gnosis Safe is the battle-tested standard)
- You want fully on-chain transparency and auditability

---

## FAQ

**Is MPC safer than multi-sig?**
Different security models. MPC: better privacy, no on-chain footprint, lower gas. Multi-sig: fully auditable on-chain, simpler mental model, open-source implementations with $100B+ secured. Both are appropriate for their respective use cases. An exchange hot wallet benefits from MPC's privacy and efficiency; a DAO treasury benefits from multi-sig's transparency.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

**SCHEMA on all Phase 3 advanced pages:** Article + FAQPage + BreadcrumbList.
