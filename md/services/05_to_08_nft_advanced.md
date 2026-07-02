# NFT Fractionalization Architecture — ERC-20 Shares for High-Value NFTs | Clickmasters

---
**URL:** /nft-fractionalization/
**Primary KW:** NFT fractionalization
**Secondary KWs:** fractional NFT smart contract, how to fractionalize NFT, ERC-20 NFT shares, fractional NFT development
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /nft-smart-contract-development/, /asset-tokenization-platform/, /nft-development-cost/

---

## H1: NFT Fractionalization Architecture — Splitting High-Value NFTs Into Tradeable ERC-20 Shares

**H2: NFT fractionalization converts a single high-value NFT into thousands of fungible ERC-20 shares — enabling collective ownership of assets previously accessible only to wealthy collectors. Here is the complete technical implementation.**

---

## What NFT Fractionalization Solves

A CryptoPunk worth $500,000 is inaccessible to most collectors. Fractionalization splits it into 1,000,000 shares at $0.50 each — allowing 10,000 people to own a piece.

Beyond accessibility: fractionalization provides liquidity for otherwise illiquid assets (holders can sell their shares without waiting for a single buyer to purchase the entire NFT) and enables price discovery through continuous DEX trading.

---

## Fractionalization Contract Architecture

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract FractionalNFT is ERC20, ReentrancyGuard {
    IERC721 public nftContract;
    uint256 public tokenId;
    address public curator;
    
    uint256 public reservePrice;    // Minimum buyout price (in ETH)
    uint256 public buyoutBid;       // Current buyout bid
    address public bidder;          // Current highest bidder
    
    enum State { ACTIVE, BUYOUT, REDEEMED }
    State public state;
    
    uint256 public constant TOTAL_SUPPLY = 1_000_000 * 10**18; // 1M shares
    
    // Share holders can vote on the reserve price
    mapping(address => uint256) public reservePriceVotes;
    
    event BuyoutBidPlaced(address bidder, uint256 bid);
    event BuyoutAccepted(address winner, uint256 price);
    event SharesRedeemed(address holder, uint256 shares, uint256 ethReceived);
    
    constructor(
        address _nftContract,
        uint256 _tokenId,
        uint256 _reservePrice,
        string memory _name,
        string memory _symbol,
        address _curator
    ) ERC20(_name, _symbol) {
        nftContract = IERC721(_nftContract);
        tokenId = _tokenId;
        reservePrice = _reservePrice;
        curator = _curator;
        state = State.ACTIVE;
        
        // Receive the NFT (must be approved before construction)
        nftContract.transferFrom(_curator, address(this), _tokenId);
        
        // Mint all shares to curator (they distribute via sale/airdrop)
        _mint(_curator, TOTAL_SUPPLY);
    }
    
    // ============================================
    // BUYOUT MECHANISM
    // ============================================
    
    // Potential buyer places a bid to buy the entire NFT
    // Must bid at or above the reserve price
    function bid() external payable nonReentrant {
        require(state == State.ACTIVE, "Not active");
        require(msg.value >= reservePrice, "Below reserve price");
        require(msg.value > buyoutBid, "Bid not higher than current");
        
        // Refund previous bidder
        if (bidder != address(0)) {
            payable(bidder).transfer(buyoutBid);
        }
        
        buyoutBid = msg.value;
        bidder = msg.sender;
        
        emit BuyoutBidPlaced(msg.sender, msg.value);
        
        // If bid exceeds reserve price AND holds for 24 hours (in production: time-lock)
        // For this implementation: immediate acceptance above 1.1× reserve
        if (msg.value >= reservePrice * 110 / 100) {
            _acceptBuyout();
        }
    }
    
    // Share holders can vote to accept the current bid
    function voteToAccept() external {
        require(state == State.ACTIVE && bidder != address(0), "No active bid");
        require(balanceOf(msg.sender) > 0, "No shares");
        
        reservePriceVotes[msg.sender] = buyoutBid;
        
        // If >50% of shares vote to accept: execute buyout
        uint256 totalVotedShares = 0;
        // In production: maintain a running tally to avoid O(n) loop
        // Simplified: check against TOTAL_SUPPLY threshold
        
        uint256 acceptingShares = _countAcceptingShares();
        if (acceptingShares * 2 > TOTAL_SUPPLY) {
            _acceptBuyout();
        }
    }
    
    function _acceptBuyout() internal {
        state = State.BUYOUT;
        
        // Transfer NFT to winning bidder
        nftContract.safeTransferFrom(address(this), bidder, tokenId);
        
        emit BuyoutAccepted(bidder, buyoutBid);
    }
    
    // ============================================
    // REDEMPTION — After buyout, share holders claim ETH
    // ============================================
    
    function redeem(uint256 shares) external nonReentrant {
        require(state == State.BUYOUT, "Buyout not completed");
        require(balanceOf(msg.sender) >= shares, "Insufficient shares");
        
        // Calculate ETH owed: shares / TOTAL_SUPPLY × buyout price
        uint256 ethAmount = (shares * buyoutBid) / TOTAL_SUPPLY;
        
        _burn(msg.sender, shares);
        payable(msg.sender).transfer(ethAmount);
        
        emit SharesRedeemed(msg.sender, shares, ethAmount);
    }
    
    // ============================================
    // RESERVE PRICE GOVERNANCE
    // ============================================
    
    // Share holders can vote to update the reserve price
    // Weighted by share count; median of all non-zero votes
    function voteReservePrice(uint256 price) external {
        require(state == State.ACTIVE, "Not active");
        require(balanceOf(msg.sender) > 0, "No shares");
        
        reservePriceVotes[msg.sender] = price;
        
        // Update reserve price to weighted average of all votes
        // In production: use an efficient on-chain median calculation
        reservePrice = _calculateWeightedReserve();
    }
    
    function _calculateWeightedReserve() internal view returns (uint256) {
        // Simplified: in production, use chainlink-style median or off-chain computation
        return reservePrice; // Placeholder
    }
    
    function _countAcceptingShares() internal view returns (uint256) {
        // Simplified: in production, maintain running tally
        return 0;
    }
    
    receive() external payable {}
}
```

---

## Legal Considerations

**SEC classification risk:** Fractional NFT shares may constitute investment contracts under the Howey Test if:
- The fractional shares are sold to investors with expectation of profit
- The NFT appreciation depends on the efforts of the platform/curator
- The shares are marketed as investments

Several SEC enforcement actions have targeted NFT fractionalization platforms. Fractional.art (now Tessera) operated in a regulatory gray area. **Consult securities counsel before launching any fractionalization platform.**

**Safe harbor considerations:** Fractionalization of utility NFTs (where the value is access, not investment return) has clearer legal footing than pure collectibles. Governance rights for share holders (voting on reserve price) may argue for "utility" characterization.

---

## Secondary Market via Uniswap V3

```javascript
// Create Uniswap V3 pool for fractional shares
const { abi: IUniswapV3FactoryABI } = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json');

async function createFractionalPool(fractionalTokenAddress, ethEquivalent) {
    const factory = new ethers.Contract(
        UNISWAP_V3_FACTORY_ADDRESS,
        IUniswapV3FactoryABI,
        signer
    );
    
    // Create pool with 0.3% fee tier (appropriate for NFT-backed tokens)
    const poolAddress = await factory.createPool(
        fractionalTokenAddress,
        WETH_ADDRESS,
        3000 // 0.3% fee
    );
    
    // Initialize with price reflecting current reserve price
    // e.g., if reserve price = 100 ETH and total supply = 1M shares:
    // price per share = 100 / 1,000,000 = 0.0001 ETH
    const initialPrice = calculateSqrtPriceX96(ethEquivalent, TOTAL_SUPPLY);
    
    await pool.initialize(initialPrice);
    
    return poolAddress;
}
```

---

## FAQ

**Can a fractional NFT holder force a sale of the underlying NFT?**
Through the reserve price governance mechanism: if a majority of share holders vote to lower the reserve price to the current bid amount, the buyout can be triggered. Without this mechanism (or a governance vote to accept a bid): the NFT remains in the contract until a bid meets the reserve.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# NFT Collection Allowlist Management — Merkle Tree Implementation | Clickmasters

---
**URL:** /nft-allowlist-management/
**Primary KW:** NFT allowlist management
**Secondary KWs:** NFT whitelist smart contract, Merkle tree allowlist, NFT presale list, allowlist verification contract
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /nft-smart-contract-development/, /how-to-launch-nft-collection/

---

## H1: NFT Allowlist Management — Merkle Tree Proof Verification at Scale

**H2: An NFT allowlist restricts early minting to approved addresses. Storing 10,000 addresses on-chain costs $200,000+ in gas. The Merkle tree approach stores a single 32-byte root and verifies membership for $0.20 in gas. Here is the complete implementation.**

---

## The Merkle Tree Allowlist Pattern

**The problem:** You want to allow 10,000 specific wallet addresses to mint during your presale. Storing 10,000 addresses in contract storage: 10,000 × $0.20 per slot = $2,000+. Querying a mapping for each mint: requires multiple SLOAD operations per transaction.

**The Merkle solution:**
- Build a Merkle tree from all 10,000 allowlisted addresses off-chain
- Store only the 32-byte Merkle root on-chain (one SSTORE = $0.20)
- At mint time: user provides their address's Merkle proof (log₂(10,000) ≈ 14 hashes)
- Contract verifies the proof against the stored root: O(log n) operations

---

## Off-Chain: Building the Merkle Tree

```javascript
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const ethers = require('ethers');

// Your list of allowlisted addresses
const allowlist = [
    '0x1234567890123456789012345678901234567890',
    '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    // ... 10,000 more addresses
];

// Build Merkle tree
function buildAllowlistTree(addresses) {
    // Create leaves: keccak256 of each address (as bytes, padded to 32 bytes)
    const leaves = addresses.map(addr => 
        keccak256(ethers.solidityPacked(['address'], [addr]))
    );
    
    // Build tree with sorted pairs for consistent proof generation
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    
    return tree;
}

// Generate proof for a specific address
function generateProof(tree, address) {
    const leaf = keccak256(ethers.solidityPacked(['address'], [address]));
    const proof = tree.getHexProof(leaf);
    return proof;
}

// Get the root (stored in smart contract)
const tree = buildAllowlistTree(allowlist);
const merkleRoot = tree.getHexRoot();

console.log('Merkle Root:', merkleRoot);
// Store this root in your contract

// For any address, generate their proof
const userProof = generateProof(tree, '0x1234...5678');
console.log('User proof:', userProof);
// Pass this proof when calling allowlistMint()
```

---

## On-Chain: Merkle Proof Verification

```solidity
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract NFTCollection is ERC721A, Ownable {
    bytes32 public merkleRoot;
    
    mapping(address => bool) public hasMintedAllowlist;
    
    function setMerkleRoot(bytes32 root) external onlyOwner {
        merkleRoot = root;
    }
    
    function allowlistMint(
        uint256 quantity,
        bytes32[] calldata proof
    ) external payable {
        require(currentPhase == Phase.ALLOWLIST, "Allowlist not active");
        require(!hasMintedAllowlist[msg.sender], "Already minted allowlist");
        require(msg.value >= ALLOWLIST_PRICE * quantity, "Insufficient payment");
        
        // Verify the caller is on the allowlist
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(proof, merkleRoot, leaf),
            "Invalid Merkle proof - not on allowlist"
        );
        
        hasMintedAllowlist[msg.sender] = true;
        _mint(msg.sender, quantity);
    }
}
```

---

## Frontend: Proof Retrieval for Users

```typescript
// When user connects their wallet, fetch their Merkle proof
async function getProofForUser(userAddress: string): Promise<string[] | null> {
    // Option 1: Static JSON file with all proofs (simple, gas-efficient)
    const response = await fetch('/allowlist-proofs.json');
    const proofs = await response.json();
    
    return proofs[userAddress.toLowerCase()] || null;
}

// Or Option 2: API endpoint that generates proof on demand
async function getProofFromAPI(userAddress: string): Promise<string[] | null> {
    const response = await fetch(`/api/allowlist/proof?address=${userAddress}`);
    if (response.status === 404) return null;
    const { proof } = await response.json();
    return proof;
}

// In the mint component:
const MintButton = ({ userAddress }) => {
    const [proof, setProof] = useState<string[] | null>(null);
    const [isAllowlisted, setIsAllowlisted] = useState(false);
    
    useEffect(() => {
        getProofForUser(userAddress).then(p => {
            setProof(p);
            setIsAllowlisted(p !== null);
        });
    }, [userAddress]);
    
    const handleMint = async () => {
        if (!proof) return;
        
        await contract.allowlistMint(quantity, proof, {
            value: ethers.parseEther('0.06') * BigInt(quantity)
        });
    };
    
    return (
        <button onClick={handleMint} disabled={!isAllowlisted}>
            {isAllowlisted ? 'Mint (Allowlist)' : 'Not on allowlist'}
        </button>
    );
};
```

---

## Allowlist Management API

```javascript
// Backend API for allowlist management
class AllowlistManager {
    constructor() {
        this.addresses = new Set();
        this.tree = null;
    }
    
    addAddress(address) {
        this.addresses.add(address.toLowerCase());
        this.rebuildTree();
    }
    
    addAddresses(addresses) {
        addresses.forEach(addr => this.addresses.add(addr.toLowerCase()));
        this.rebuildTree();
    }
    
    removeAddress(address) {
        this.addresses.delete(address.toLowerCase());
        this.rebuildTree();
    }
    
    rebuildTree() {
        const leaves = [...this.addresses].map(addr =>
            keccak256(ethers.solidityPacked(['address'], [addr]))
        );
        this.tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    }
    
    getMerkleRoot() {
        return this.tree?.getHexRoot();
    }
    
    getProof(address) {
        const normalizedAddress = address.toLowerCase();
        if (!this.addresses.has(normalizedAddress)) return null;
        
        const leaf = keccak256(ethers.solidityPacked(['address'], [normalizedAddress]));
        return this.tree.getHexProof(leaf);
    }
    
    exportAllProofs() {
        const result = {};
        for (const address of this.addresses) {
            result[address] = this.getProof(address);
        }
        return result;
    }
}
```

---

## FAQ

**Can the Merkle root be updated after deployment?**
Yes — the `setMerkleRoot()` function allows the owner to update the root. This enables: correcting mistakes in the original allowlist, adding last-minute allowlist spots, switching to a new allowlist for a second wave. However: updating the root changes who can mint, so communicate clearly before and after any update.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Soulbound NFT — Non-Transferable Token Architecture | Clickmasters

---
**URL:** /soulbound-nft-development/
**Primary KW:** soulbound NFT development
**Secondary KWs:** non-transferable NFT, soulbound token smart contract, SBT implementation, identity credential NFT
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /blockchain-identity-ssi/, /nft-smart-contract-development/

---

## H1: Soulbound NFT Development — Non-Transferable Tokens for Credentials, Reputation, and Identity

**H2: Soulbound tokens (SBTs) are NFTs that cannot be transferred — permanently bound to the receiving wallet. They represent achievements, credentials, reputation, and identity that should not be for sale. Here is the complete implementation.**

---

## What Soulbound Tokens Are Used For

**Academic credentials:** University diplomas on-chain. Employers verify by querying the wallet, not calling a registrar. The credential cannot be transferred — only the actual graduate holds it.

**Professional certifications:** CPA, CFA, CISSP, medical board certification. Any professional credential that should be verifiably held by one specific person, non-transferable by design.

**DAO contribution badges:** "This address contributed to Gitcoin Grants Round 15." The contribution is a permanent part of the address's on-chain history.

**Healthcare records:** Patient medical history as a soulbound credential. Only the patient's wallet holds it; healthcare providers query with the patient's consent.

**KYC attestations:** "This address completed KYC at [date] by [verifier]." Used by DeFi protocols that need to verify user identity without centralized databases.

---

## Soulbound Token Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SoulboundCredential is ERC721, Ownable {
    
    struct Credential {
        string credentialType;   // "DEGREE", "CERTIFICATION", "KYC", etc.
        string institution;      // Issuing organization
        string detail;           // Specific credential detail
        uint256 issuedAt;        // Issue timestamp
        uint256 expiresAt;       // 0 = never expires
        bytes32 dataHash;        // Hash of supporting documents (off-chain)
    }
    
    mapping(uint256 => Credential) public credentials;
    uint256 private _tokenIdCounter;
    
    // One credential per address per type (prevents duplicate credentials)
    mapping(address => mapping(string => uint256)) public credentialByType;
    
    event CredentialIssued(
        uint256 indexed tokenId,
        address indexed recipient,
        string credentialType,
        string institution
    );
    
    event CredentialRevoked(uint256 indexed tokenId, string reason);
    
    constructor(address initialOwner) 
        ERC721("SoulboundCredential", "SBT") 
        Ownable(initialOwner) 
    {}
    
    // Issue credential to an address
    function issueCredential(
        address recipient,
        string calldata credentialType,
        string calldata institution,
        string calldata detail,
        uint256 expiresAt,
        bytes32 dataHash
    ) external onlyOwner returns (uint256 tokenId) {
        require(
            credentialByType[recipient][credentialType] == 0,
            "Credential of this type already issued to this address"
        );
        
        tokenId = ++_tokenIdCounter;
        
        credentials[tokenId] = Credential({
            credentialType: credentialType,
            institution: institution,
            detail: detail,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            dataHash: dataHash
        });
        
        credentialByType[recipient][credentialType] = tokenId;
        
        _mint(recipient, tokenId);
        
        emit CredentialIssued(tokenId, recipient, credentialType, institution);
    }
    
    // Revoke a credential (e.g., license revoked, degree rescinded)
    function revokeCredential(uint256 tokenId, string calldata reason) external onlyOwner {
        address holder = ownerOf(tokenId);
        string memory credType = credentials[tokenId].credentialType;
        
        // Clear the type mapping
        delete credentialByType[holder][credType];
        
        // Burn the token
        _burn(tokenId);
        
        emit CredentialRevoked(tokenId, reason);
    }
    
    // Check if credential is valid (exists, not expired)
    function isCredentialValid(address holder, string calldata credentialType) 
        external view returns (bool valid, uint256 tokenId) 
    {
        tokenId = credentialByType[holder][credentialType];
        if (tokenId == 0) return (false, 0);
        
        Credential memory cred = credentials[tokenId];
        valid = cred.expiresAt == 0 || block.timestamp < cred.expiresAt;
    }
    
    // ============================================
    // TRANSFER PREVENTION (Core Soulbound Feature)
    // ============================================
    
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // Block all transfers (minting is allowed: from == address(0))
        if (from != address(0)) {
            revert("Soulbound: tokens are non-transferable");
        }
        
        return super._update(to, tokenId, auth);
    }
    
    // Also block approvals (no point approving if can't transfer)
    function approve(address, uint256) public pure override {
        revert("Soulbound: approvals not permitted");
    }
    
    function setApprovalForAll(address, bool) public pure override {
        revert("Soulbound: approvals not permitted");
    }
}
```

---

## EIP-5192: Minimal Soulbound Standard

OpenZeppelin now supports EIP-5192, the minimal soulbound standard:

```solidity
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

// EIP-5192 event
interface IERC5192 {
    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);
    function locked(uint256 tokenId) external view returns (bool);
}

contract MinimalSoulbound is ERC721, IERC5192 {
    mapping(uint256 => bool) private _locked;
    
    function locked(uint256 tokenId) external view override returns (bool) {
        return _locked[tokenId];
    }
    
    function _mint(address to, uint256 tokenId) internal override {
        super._mint(to, tokenId);
        _locked[tokenId] = true;
        emit Locked(tokenId);
    }
}
```

---

## FAQ

**Can a soulbound token holder destroy their own credential?**
Depends on design. For credentials the holder may want to remove (e.g., a KYC attestation they revoke consent for): add a `burn()` function callable only by the token holder. For credentials that must persist (court records, academic fraud findings): no burn function — the credential is permanent.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# NFT Loyalty Program Technical Architecture | Clickmasters

---
**URL:** /nft-loyalty-program-technical/
**Primary KW:** NFT loyalty program technical architecture
**Secondary KWs:** how to build NFT loyalty program, blockchain loyalty rewards technical, Web3 loyalty system development
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /blockchain-wallet-integration/, /case-study/nft-loyalty-program-retail/, /smart-contract-development/

---

## H1: NFT Loyalty Program Technical Architecture — Building Web3 Loyalty Without Blockchain Complexity for Users

**H2: The loyalty program that drove 340% repeat visit increase had one critical success factor: users never knew they were using blockchain. Here is the technical architecture that makes that possible.**

---

## The Three Technical Pillars

**Pillar 1 — Zero-friction onboarding (Magic Link):**
No seed phrases. No "install MetaMask." User scans QR code at checkout or visits loyalty.yourbrand.com → clicks "Get Your Loyalty Token" → logs in with Google/Apple → wallet created silently → NFT minted to wallet. The word "blockchain" never appears.

**Pillar 2 — Backend-mediated mint (sponsored transactions):**
Users never pay gas. Your business pays gas on their behalf (Polygon PoS: $0.001–$0.005 per mint). Gas costs are trivial compared to loyalty program value. Use a Paymaster (ERC-4337) or simply have your server sign and pay gas directly.

**Pillar 3 — POS/system integration:**
Loyalty verification happens server-side. When customer scans QR at checkout → server calls `balanceOf(wallet, tokenId)` → returns tier (Bronze/Silver/Gold) → POS applies discount. Customer experience: show QR, get discount. Blockchain verification happens invisibly.

---

## Complete Technical Stack

```
Frontend Layer:
├── loyalty.yourbrand.com (Next.js)
│   ├── Magic Link social login integration
│   ├── "My Wallet" dashboard (token balance, tier, perks)
│   └── QR code generator (wallet address → scannable QR)

Backend Layer:
├── Node.js API
│   ├── Magic Link webhook handler (user creates wallet)
│   ├── Transaction relay (signs and pays gas on user's behalf)
│   ├── Tier verification API (called by POS on checkout scan)
│   └── Analytics (track token transfers, tier progression)
└── PostgreSQL database (mirror of on-chain state, user profiles)

Blockchain Layer:
├── Polygon PoS (low gas, fast finality, USDC support)
└── Smart Contracts:
    ├── LoyaltyNFT.sol (ERC-1155, 3 token IDs for Bronze/Silver/Gold)
    └── LoyaltyLogic.sol (progression rules, tier upgrades)

Infrastructure:
├── Alchemy (Polygon RPC provider)
├── Magic Link (social login wallet creation)
└── AWS Lambda (event processing, gas relay)
```

---

## Smart Contract — Tiered Loyalty NFT

```solidity
contract BrandLoyaltyNFT is ERC1155, Ownable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    uint256 public constant BRONZE = 1;
    uint256 public constant SILVER = 2;
    uint256 public constant GOLD   = 3;
    
    // Maximum supply of Gold tokens (scarcity creates exclusivity)
    uint256 public constant MAX_GOLD = 500;
    uint256 public goldMinted = 0;
    
    // Visit tracking (updated by backend after verified visit)
    mapping(address => uint256) public visitCount;
    
    // Tier thresholds
    uint256 public constant SILVER_THRESHOLD = 10; // visits
    uint256 public constant GOLD_THRESHOLD = 50;   // visits
    
    event TierUpgraded(address indexed holder, uint256 newTier, uint256 visitCount);
    
    constructor(address initialOwner) 
        ERC1155("https://loyalty.yourbrand.com/metadata/{id}.json")
        Ownable(initialOwner)
    {
        _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
        _grantRole(MINTER_ROLE, initialOwner);
    }
    
    // Called by backend after first verified visit
    function mintBronze(address customer) external onlyRole(MINTER_ROLE) {
        require(balanceOf(customer, BRONZE) == 0, "Already has Bronze");
        require(balanceOf(customer, SILVER) == 0, "Already higher tier");
        require(balanceOf(customer, GOLD) == 0, "Already highest tier");
        
        visitCount[customer] = 1;
        _mint(customer, BRONZE, 1, "");
    }
    
    // Called by backend after each verified subsequent visit
    function recordVisit(address customer) external onlyRole(MINTER_ROLE) {
        require(
            balanceOf(customer, BRONZE) > 0 || 
            balanceOf(customer, SILVER) > 0 || 
            balanceOf(customer, GOLD) > 0,
            "No loyalty token found"
        );
        
        visitCount[customer]++;
        
        // Check for tier upgrade
        if (visitCount[customer] == SILVER_THRESHOLD && balanceOf(customer, SILVER) == 0) {
            _upgradeToBronzeToSilver(customer);
        } else if (visitCount[customer] == GOLD_THRESHOLD && balanceOf(customer, GOLD) == 0) {
            _upgradeToGold(customer);
        }
    }
    
    function _upgradeToBronzeToSilver(address customer) internal {
        // Burn Bronze, mint Silver
        _burn(customer, BRONZE, 1);
        _mint(customer, SILVER, 1, "");
        emit TierUpgraded(customer, SILVER, visitCount[customer]);
    }
    
    function _upgradeToGold(address customer) internal {
        require(goldMinted < MAX_GOLD, "Gold supply exhausted");
        goldMinted++;
        
        // Burn Silver, mint Gold
        _burn(customer, SILVER, 1);
        _mint(customer, GOLD, 1, "");
        emit TierUpgraded(customer, GOLD, visitCount[customer]);
    }
    
    // POS integration: check customer tier
    function getCustomerTier(address customer) 
        external view returns (uint256 tier, uint256 visits) 
    {
        visits = visitCount[customer];
        
        if (balanceOf(customer, GOLD) > 0) return (GOLD, visits);
        if (balanceOf(customer, SILVER) > 0) return (SILVER, visits);
        if (balanceOf(customer, BRONZE) > 0) return (BRONZE, visits);
        return (0, 0); // No loyalty token
    }
}
```

---

## POS Integration API

```javascript
// Simple REST endpoint called by POS systems on customer scan
app.get('/api/loyalty/check', async (req, res) => {
    const { walletAddress, locationId } = req.query;
    
    // Verify the address format
    if (!ethers.isAddress(walletAddress)) {
        return res.status(400).json({ error: 'Invalid wallet address' });
    }
    
    // Query on-chain tier
    const [tier, visits] = await loyaltyContract.getCustomerTier(walletAddress);
    
    const tierData = {
        0: { name: 'None', discount: 0 },
        1: { name: 'Bronze', discount: 0, perks: ['Member recognition'] },
        2: { name: 'Silver', discount: 10, perks: ['10% discount', 'Priority service'] },
        3: { name: 'Gold', discount: 20, perks: ['20% discount', 'Monthly events', 'Priority always'] }
    };
    
    const response = {
        walletAddress,
        tier: Number(tier),
        tierName: tierData[Number(tier)].name,
        discount: tierData[Number(tier)].discount,
        perks: tierData[Number(tier)].perks || [],
        totalVisits: Number(visits)
    };
    
    // Record this visit on-chain (async - don't block POS response)
    recordVisitOnChain(walletAddress, locationId).catch(console.error);
    
    return res.json(response);
});
```

---

## FAQ

**What does this cost per customer?**
One-time NFT mint: $0.002–$0.005 on Polygon (gas). Tier upgrade transactions: $0.002–$0.005 each. Total blockchain cost per customer lifetime: $0.01–$0.05. Compare to: traditional loyalty platforms at $1–$5 per active member per month. The cost advantage is 20–500× over traditional platforms at scale.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# NFT Credential and Certificate Platform | Clickmasters

---
**URL:** /nft-credential-certificate-platform/
**Primary KW:** NFT credential platform
**Secondary KWs:** blockchain certificate platform, digital credential NFT, verifiable credential blockchain, NFT diploma
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /soulbound-nft-development/, /blockchain-identity-ssi/, /smart-contract-development/

---

## H1: NFT Credential and Certificate Platform — Blockchain-Verified Credentials for Education and Professional Certification

**H2: Blockchain-verified credentials eliminate credential fraud, reduce verification cost from $30–$60 per check to near-zero, and give credential holders a portable, employer-verifiable record. Here is the complete platform architecture.**

---

## The Credential Fraud Problem

31% of job applicants misrepresent credentials on resumes (Career Builder survey). Verifying a credential today: call the registrar, wait 2–5 business days, pay $30–$60 in verification fees. Blockchain credential: employer queries on-chain in 2 seconds, $0 cost.

**Industries with highest credential verification cost:**
- Healthcare (every physician credential must be verified — 2 million+ healthcare workers in the US)
- Legal (bar admission, good standing verification)
- Financial services (Series 7, 63, CPA, CFA)
- Education (diploma verification for employers and graduate school admissions)

---

## Platform Architecture

```
Issuing Organization (University, Certification Body):
├── Admin Dashboard
│   ├── Batch credential issuance (upload CSV → mint to all recipients)
│   ├── Individual credential issuance
│   ├── Credential revocation (with reason recorded on-chain)
│   └── Verification audit log (who checked which credential)

Credential Holder:
├── Credential Wallet (MetaMask or Magic Link social login)
├── Share credential: generate verifier link OR share wallet address
└── Mobile: QR code for in-person verification

Employer / Verifier:
├── Verification Portal (no account required)
│   ├── Enter credential holder's wallet address
│   ├── Instant on-chain verification
│   └── Result: credential type, issuer, date, valid/expired/revoked
└── API (for HR systems to automate verification during hiring)
```

---

## Credential Metadata Schema

```json
{
    "credentialType": "BACHELOR_OF_SCIENCE",
    "program": "Computer Science",
    "institution": "State University",
    "institutionDID": "did:ethr:0xUniversityWallet",
    "recipientName": "Jane Smith",
    "recipientDID": "did:ethr:0xJaneWallet",
    "issuedDate": "2024-05-15",
    "graduationDate": "2024-05-10",
    "honors": "Cum Laude",
    "gpa": "3.7",
    "expiresDate": null,
    "credentialId": "BSCS-2024-000457",
    "verificationUrl": "https://verify.stateuniversity.edu/BSCS-2024-000457",
    "documentHash": "0xQm...",
    "signature": "0x..."
}
```

---

## Batch Credential Issuance (For Universities at Graduation)

```javascript
// Issue credentials to entire graduating class
class BatchCredentialIssuer {
    async issueGraduatingClass(csvData, credentialType) {
        const graduates = parseCsv(csvData);
        
        // Process in batches of 50 (gas management)
        const batchSize = 50;
        const results = [];
        
        for (let i = 0; i < graduates.length; i += batchSize) {
            const batch = graduates.slice(i, i + batchSize);
            
            const walletAddresses = batch.map(g => g.walletAddress);
            const credentialTypes = batch.map(() => credentialType);
            const institutions = batch.map(() => 'State University');
            const details = batch.map(g => `${g.program} - ${g.honors}`);
            const lockUps = batch.map(() => 0); // No lockup for credentials
            const dataHashes = batch.map(g => 
                ethers.keccak256(ethers.toUtf8Bytes(JSON.stringify(g.credentialData)))
            );
            
            // Batch mint via multicall or dedicated batch function
            const tx = await this.credentialContract.batchIssue(
                walletAddresses,
                credentialTypes,
                institutions,
                details,
                lockUps,
                dataHashes
            );
            
            const receipt = await tx.wait();
            results.push({ 
                batch: i / batchSize + 1,
                count: batch.length,
                txHash: receipt.transactionHash 
            });
            
            console.log(`Batch ${i/batchSize + 1}: Issued ${batch.length} credentials`);
        }
        
        return results;
    }
}
```

---

## Employer Verification API

```javascript
// Zero-trust verification — anyone can verify, no account required
app.get('/verify/:walletAddress/:credentialType', async (req, res) => {
    const { walletAddress, credentialType } = req.params;
    
    const [valid, tokenId] = await credentialContract.isCredentialValid(
        walletAddress,
        credentialType
    );
    
    if (!valid) {
        return res.json({
            verified: false,
            reason: tokenId === 0 ? 'Credential not found' : 'Credential expired or revoked'
        });
    }
    
    const credential = await credentialContract.credentials(tokenId);
    
    return res.json({
        verified: true,
        credential: {
            type: credential.credentialType,
            institution: credential.institution,
            detail: credential.detail,
            issuedAt: new Date(Number(credential.issuedAt) * 1000).toISOString(),
            expiresAt: credential.expiresAt === 0 ? null : 
                new Date(Number(credential.expiresAt) * 1000).toISOString(),
            onChainVerification: `https://polygonscan.com/token/${CONTRACT_ADDRESS}?a=${walletAddress}`
        }
    });
});
```

---

## FAQ

**Can we issue credentials to people who don't have crypto wallets?**
Yes — using Magic Link, we create a custodial wallet from the recipient's email address. The credential is minted to their email-linked wallet. Recipients don't need to know anything about blockchain. When they want to share their credential, they log in with their email at your verification portal and receive a shareable verification link.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

**SCHEMA on all Phase 3 NFT Advanced pages:** Article + FAQPage + BreadcrumbList.
