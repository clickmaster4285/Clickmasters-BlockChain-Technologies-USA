## H1: Soulbound Token Architecture — Non-Transferable Credentials on Blockchain

**URL:** /soulbound-token-development/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /zk-identity-verification/, /nft-event-ticketing/

Soulbound tokens (SBTs) — non-transferable NFTs permanently bound to a wallet address — are the ideal on-chain credential primitive. University degrees, professional certifications, KYC verifications, and community memberships cannot be sold or transferred.

### SBT Contract Implementation

```solidity
// EIP-5192: Minimal Soulbound NFT standard
interface IERC5192 {
    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);
    function locked(uint256 tokenId) external view returns (bool);
}

contract SoulboundToken is ERC721, IERC5192 {
    
    // Issuer management: only authorized issuers can mint credentials
    mapping(address => bool) public authorizedIssuers;
    mapping(address => string) public issuerNames;  // issuer → organization name
    
    struct Credential {
        address issuer;
        string  credentialType;  // "CPA_LICENSE", "MD_DEGREE", "KYC_VERIFIED"
        string  recipient;       // Human-readable name (display only)
        uint256 issuedAt;
        uint256 expiresAt;       // 0 = never expires
        bytes32 dataHash;        // Hash of detailed credential document
        string  ipfsUri;         // Link to full credential document
        bool    revoked;
    }
    
    mapping(uint256 => Credential) public credentials;
    uint256 public tokenCount;
    
    // All tokens are locked (non-transferable) by default
    function locked(uint256 tokenId) public pure override returns (bool) {
        return true;  // All SBTs are permanently locked
    }
    
    // Issue credential to a wallet address
    function issueCredential(
        address recipient,
        string calldata credentialType,
        string calldata recipientName,
        uint256 expiresAt,
        bytes32 dataHash,
        string calldata ipfsUri
    ) external returns (uint256 tokenId) {
        require(authorizedIssuers[msg.sender], "Not authorized issuer");
        
        tokenId = ++tokenCount;
        credentials[tokenId] = Credential({
            issuer: msg.sender,
            credentialType: credentialType,
            recipient: recipientName,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            dataHash: dataHash,
            ipfsUri: ipfsUri,
            revoked: false
        });
        
        _mint(recipient, tokenId);
        emit Locked(tokenId);  // Immediately locked per EIP-5192
        
        emit CredentialIssued(tokenId, recipient, credentialType, msg.sender);
    }
    
    // Issuer can revoke (e.g., license suspension)
    function revokeCredential(uint256 tokenId, string calldata reason) external {
        require(credentials[tokenId].issuer == msg.sender, "Not issuer");
        credentials[tokenId].revoked = true;
        emit CredentialRevoked(tokenId, reason);
    }
    
    // Prevent all transfers (enforces soulbound property)
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        // Allow mint (from == address(0)) but block all transfers
        require(from == address(0), "Soulbound: non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    // Check credential validity
    function isValid(uint256 tokenId) public view returns (bool) {
        Credential memory c = credentials[tokenId];
        if (c.revoked) return false;
        if (c.expiresAt != 0 && block.timestamp > c.expiresAt) return false;
        return true;
    }
    
    // Holder-initiated burn (holder can delete their own credential)
    function burnMyCredential(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        _burn(tokenId);
        emit CredentialBurned(tokenId, msg.sender);
    }
    
    event CredentialIssued(uint256 indexed tokenId, address indexed recipient, string credentialType, address issuer);
    event CredentialRevoked(uint256 indexed tokenId, string reason);
    event CredentialBurned(uint256 indexed tokenId, address by);
}
```

### Professional Credential Use Cases

**Medical Licensing (DEA, State Medical Board):**
```solidity
contract MedicalLicenseRegistry is SoulboundToken {
    
    struct MedicalLicense {
        string  licenseNumber;
        string  licenseType;    // "MD", "DO", "NP", "PA"
        string  specialty;
        string[] authorizedStates;
        string  deaRegistration;
    }
    
    mapping(uint256 => MedicalLicense) public medicalLicenses;
    
    function issueMedicalLicense(
        address physician,
        MedicalLicense calldata licenseData,
        uint256 expirationDate
    ) external onlyAuthorizedMedicalBoard returns (uint256 tokenId) {
        bytes32 dataHash = keccak256(abi.encode(licenseData));
        
        tokenId = issueCredential(
            physician,
            "MEDICAL_LICENSE",
            licenseData.licenseType,
            expirationDate,
            dataHash,
            ""
        );
        
        medicalLicenses[tokenId] = licenseData;
    }
    
    // Hospital can verify physician credentials instantly
    function verifyPhysicianLicense(address physician, string calldata state)
        external view returns (bool licensed, string memory licenseType, bool expired)
    {
        // Find all tokens for this address and check medical licenses
        uint256[] memory physicianTokens = _getTokensForAddress(physician);
        
        for (uint256 i = 0; i < physicianTokens.length; i++) {
            uint256 tid = physicianTokens[i];
            if (!isValid(tid)) continue;
            
            MedicalLicense memory lic = medicalLicenses[tid];
            for (uint256 j = 0; j < lic.authorizedStates.length; j++) {
                if (keccak256(bytes(lic.authorizedStates[j])) == keccak256(bytes(state))) {
                    return (true, lic.licenseType, false);
                }
            }
        }
        return (false, "", false);
    }
}
```

### FAQ

**Can a soulbound token holder avoid the non-transferability by transferring their entire wallet?**
This is the fundamental limitation of wallet-bound (not person-bound) credentials. If someone transfers their private key, the credential transfers with it. Mitigation: (1) combine SBT with biometric verification (Face ID-linked passkey wallet — much harder to transfer), (2) require periodic re-verification (expiring SBTs), (3) for high-stakes credentials like medical licenses, combine with off-chain verification for critical decisions.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: ERC-4907 Rental NFT Standard — Time-Limited Usage Rights

**URL:** /erc-4907-rental-nft/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /gamefi-nft-integration/, /nft-development-cost/

ERC-4907 adds a "user" role to NFTs — a separate address that has usage rights for a limited time without owning the token. Perfect for NFT rentals: gaming tools, virtual land, event access passes.

### ERC-4907 Implementation

```solidity
// EIP-4907: Rental NFT Standard
interface IERC4907 {
    event UpdateUser(uint256 indexed tokenId, address indexed user, uint64 expires);
    
    function setUser(uint256 tokenId, address user, uint64 expires) external;
    function userOf(uint256 tokenId) external view returns (address);
    function userExpires(uint256 tokenId) external view returns (uint256);
}

contract RentalNFT is ERC721, IERC4907 {
    
    struct UserInfo {
        address user;
        uint64  expires;  // Unix timestamp
    }
    
    mapping(uint256 => UserInfo) private _users;
    
    // Owner or approved can set a temporary user
    function setUser(uint256 tokenId, address user, uint64 expires) 
        external override 
    {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "ERC4907: not owner or approved"
        );
        
        _users[tokenId] = UserInfo(user, expires);
        emit UpdateUser(tokenId, user, expires);
    }
    
    // Returns the current user (if rental not expired)
    function userOf(uint256 tokenId) external view override returns (address) {
        if (_users[tokenId].expires >= block.timestamp) {
            return _users[tokenId].user;
        }
        return address(0);
    }
    
    function userExpires(uint256 tokenId) external view override returns (uint256) {
        return _users[tokenId].expires;
    }
    
    // When NFT is transferred, user rights are cleared
    function _beforeTokenTransfer(
        address from, address to, uint256 tokenId, uint256 batchSize
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
        
        // Clear user when ownership changes
        if (from != to && _users[tokenId].user != address(0)) {
            delete _users[tokenId];
            emit UpdateUser(tokenId, address(0), 0);
        }
    }
}

// Rental marketplace using ERC-4907
contract NFTRentalMarketplace is ReentrancyGuard {
    
    struct RentalListing {
        address nftContract;
        uint256 tokenId;
        address owner;
        uint256 pricePerDay;  // USDC per day
        uint256 minDays;
        uint256 maxDays;
        bool    active;
    }
    
    mapping(bytes32 => RentalListing) public listings;
    IERC20 public usdc;
    uint256 public platformFee = 500; // 5%
    
    function listForRent(
        address nftContract,
        uint256 tokenId,
        uint256 pricePerDay,
        uint256 minDays,
        uint256 maxDays
    ) external {
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not owner");
        
        bytes32 listingId = keccak256(abi.encodePacked(nftContract, tokenId));
        listings[listingId] = RentalListing({
            nftContract: nftContract,
            tokenId: tokenId,
            owner: msg.sender,
            pricePerDay: pricePerDay,
            minDays: minDays,
            maxDays: maxDays,
            active: true
        });
        
        emit Listed(listingId, nftContract, tokenId, pricePerDay);
    }
    
    function rentNFT(bytes32 listingId, uint256 numDays) external nonReentrant {
        RentalListing memory listing = listings[listingId];
        require(listing.active, "Not listed");
        require(numDays >= listing.minDays && numDays <= listing.maxDays, "Invalid duration");
        
        uint256 totalCost = listing.pricePerDay * numDays;
        uint256 fee = totalCost * platformFee / 10000;
        
        usdc.transferFrom(msg.sender, listing.owner, totalCost - fee);
        usdc.transferFrom(msg.sender, address(this), fee);
        
        // Set user on ERC-4907 NFT
        uint64 expires = uint64(block.timestamp + numDays * 1 days);
        IERC4907(listing.nftContract).setUser(listing.tokenId, msg.sender, expires);
        
        emit Rented(listingId, msg.sender, numDays, expires);
    }
    
    event Listed(bytes32 indexed id, address nft, uint256 tokenId, uint256 pricePerDay);
    event Rented(bytes32 indexed id, address renter, uint256 numDays, uint64 expires);
}
```

### Use Cases for ERC-4907

**GameFi:** Rent rare weapons/characters for a gaming session. Owner earns passive income; renter gets temporary access without buying.

**Virtual land:** Rent a Decentraland or The Sandbox parcel for a 30-day virtual event without permanently transferring it.

**Access passes:** Rent a "VIP pass" NFT granting Discord server access for 7 days. Pass owner keeps the NFT.

**Software licenses:** Time-limited software license NFTs. ISV mints 1,000 license NFTs; enterprises rent them monthly rather than buying perpetual licenses.

### FAQ

**How does the smart contract know if I have rental access vs ownership for in-game privileges?**
The game server or dApp reads both `ownerOf(tokenId)` and `userOf(tokenId)`. If `userOf` returns a non-zero address for the current user and `userExpires` is in the future: grant user-level access. If `ownerOf` matches: grant owner-level access (which may include the ability to further sublicense, modify, or sell). The hierarchy: owner has full rights; user has usage rights during the rental period.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: Infrastructure Tokenization — Data Centers, Fiber Networks, and Cloud Assets

**URL:** /infrastructure-tokenization/
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /asset-tokenization-platform/, /real-estate-tokenization-platform/, /enterprise-blockchain-solutions/

Physical infrastructure — data centers, fiber optic networks, cell towers, renewable energy installations — can be tokenized as revenue-sharing instruments, enabling fractional investment in assets previously only accessible to large institutions.

### Infrastructure Token Economics

```
Traditional Infrastructure Investment:
  Data center: $50M construction cost
  Minimum investment: $5M+ (institutional)
  Returns: 8–12% annual yield from colocation fees
  Liquidity: nearly zero (10-year hold typical)

Tokenized Infrastructure:
  Same data center, tokenized into 500,000 tokens at $100/token
  Minimum investment: $100 (retail accessible)
  Same 8–12% yield, distributed monthly in USDC
  Secondary market: 24/7 trading on ATS
```

### Revenue-Sharing Infrastructure Token

```solidity
contract InfrastructureRevenueToken is ERC20 {
    
    struct AssetInfo {
        string  assetType;         // "DATA_CENTER", "FIBER", "CELL_TOWER", "SOLAR_FARM"
        string  location;
        uint256 constructionCost;
        uint256 expectedAnnualRevenue;
        uint256 leaseExpiry;       // When primary lease ends
        string  primaryTenant;     // Who pays the revenue
        address operatingCompany;  // Who manages the asset
    }
    
    AssetInfo public asset;
    IERC20 public usdc;
    
    // Revenue tracking (same pattern as debt tokens)
    uint256 public cumulativeRevenuePerToken;
    mapping(address => uint256) public lastClaimedPerToken;
    
    // Monthly revenue distribution by operating company
    function distributeRevenue(uint256 amount) external {
        require(msg.sender == asset.operatingCompany, "Not operator");
        
        usdc.transferFrom(msg.sender, address(this), amount);
        
        // Subtract operating expenses before distribution (simplified)
        uint256 netRevenue = amount * 8500 / 10000; // 15% operating expense ratio
        uint256 operatorFee = amount - netRevenue;
        
        usdc.transfer(asset.operatingCompany, operatorFee);
        
        cumulativeRevenuePerToken += netRevenue * 1e18 / totalSupply();
        
        emit RevenueDistributed(amount, netRevenue);
    }
    
    function claimRevenue() external {
        uint256 pending = pendingRevenue(msg.sender);
        require(pending > 0, "Nothing to claim");
        
        lastClaimedPerToken[msg.sender] = cumulativeRevenuePerToken;
        usdc.transfer(msg.sender, pending);
    }
    
    function pendingRevenue(address holder) public view returns (uint256) {
        return balanceOf(holder) * (cumulativeRevenuePerToken - lastClaimedPerToken[holder]) / 1e18;
    }
    
    // Quarterly NAV update from independent appraiser
    function updateNAV(uint256 newAppraised, string calldata appraisalReport) external onlyOwner {
        emit NAVUpdated(newAppraised, appraisalReport, block.timestamp);
    }
    
    event RevenueDistributed(uint256 gross, uint256 net);
    event NAVUpdated(uint256 newValue, string reportHash, uint256 timestamp);
}
```

### IP (Intellectual Property) Tokenization

Beyond physical assets — patents, music catalogs, film libraries, and software licenses can be tokenized:

```solidity
contract IPRoyaltyToken is ERC20 {
    
    struct IPAsset {
        string  ipType;        // "PATENT", "MUSIC_CATALOG", "FILM_LIBRARY"
        string  ipIdentifier;  // Patent number, ISRC range, etc.
        uint256 expiryDate;    // When IP rights expire
        string  licensees;     // Summary of current licensees
        uint256 annualRoyalty; // Expected annual royalty income
    }
    
    IPAsset public ipAsset;
    IERC20 public usdc;
    
    uint256 public cumulativeRoyaltyPerToken;
    mapping(address => uint256) public lastClaimed;
    
    // Royalty aggregator deposits collected royalties
    function depositRoyalties(uint256 amount) external onlyRoyaltyAggregator {
        usdc.transferFrom(msg.sender, address(this), amount);
        cumulativeRoyaltyPerToken += amount * 1e18 / totalSupply();
        emit RoyaltyDeposited(amount, block.timestamp);
    }
    
    function claimRoyalties() external {
        uint256 pending = (cumulativeRoyaltyPerToken - lastClaimed[msg.sender]) * balanceOf(msg.sender) / 1e18;
        require(pending > 0, "No pending royalties");
        lastClaimed[msg.sender] = cumulativeRoyaltyPerToken;
        usdc.transfer(msg.sender, pending);
    }
    
    event RoyaltyDeposited(uint256 amount, uint256 timestamp);
}
```

### FAQ

**Are infrastructure revenue tokens securities under US law?**
Almost certainly yes. Revenue-sharing tokens that give investors a pro-rata claim on asset income from the efforts of the operating company satisfy all prongs of the Howey test. These are securities. Offerings must comply with Reg D 506(c) (accredited investors), Reg A+ ($75M cap, all investors after SEC qualification), or full registration. Do not offer infrastructure tokens to US investors without securities counsel review.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
