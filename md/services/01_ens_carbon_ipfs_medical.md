# ENS Integration Guide — Ethereum Name Service for dApps | Clickmasters

---
**URL:** /ens-integration-guide/
**Primary KW:** ENS integration guide
**Secondary KWs:** Ethereum Name Service integration, how to use ENS in dApp, resolve ENS names
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /web3-development-company/, /web3-dapp-architecture/, /blockchain-wallet-integration/

---

## H1: ENS Integration Guide — Resolving and Registering Ethereum Names in Your dApp

**H2: ENS (Ethereum Name Service) maps human-readable names (vitalik.eth) to Ethereum addresses. Integrating ENS lets users type names instead of 0x addresses — dramatically improving UX. Here is the complete integration guide.**

---

## ENS Resolution: Name to Address

```typescript
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

const client = createPublicClient({
    chain: mainnet,
    transport: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY')
});

// Resolve ENS name to address
async function resolveENS(ensName: string): Promise<string | null> {
    try {
        const normalized = normalize(ensName); // Normalize the name
        const address = await client.getEnsAddress({ name: normalized });
        return address;
    } catch {
        return null;
    }
}

// Reverse lookup: address to ENS name
async function lookupENS(address: `0x${string}`): Promise<string | null> {
    try {
        const name = await client.getEnsName({ address });
        return name;
    } catch {
        return null;
    }
}

// Get ENS avatar (profile picture)
async function getENSAvatar(ensName: string): Promise<string | null> {
    try {
        const avatar = await client.getEnsAvatar({ 
            name: normalize(ensName) 
        });
        return avatar;
    } catch {
        return null;
    }
}

// Batch resolution using Multicall3
async function batchResolveENS(names: string[]): Promise<Record<string, string | null>> {
    const results = await client.multicall({
        contracts: names.map(name => ({
            address: ENS_REGISTRY_ADDRESS,
            abi: ensRegistryABI,
            functionName: 'resolver',
            args: [namehash(name)]
        }))
    });
    
    return Object.fromEntries(
        names.map((name, i) => [name, results[i].result as string | null])
    );
}
```

---

## Address Input Component With ENS Support

```typescript
import { useState, useEffect } from 'react';
import { isAddress } from 'viem';

function AddressInput({ onAddressChange }: { onAddressChange: (addr: string) => void }) {
    const [input, setInput] = useState('');
    const [resolved, setResolved] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'resolving' | 'resolved' | 'error'>('idle');
    
    useEffect(() => {
        const resolve = async () => {
            if (!input) { setResolved(null); setStatus('idle'); return; }
            
            // Direct address: validate and use as-is
            if (isAddress(input)) {
                setResolved(input);
                setStatus('resolved');
                onAddressChange(input);
                
                // Try reverse lookup for display name
                const name = await lookupENS(input);
                if (name) setInput(name); // Show ENS name instead of raw address
                return;
            }
            
            // ENS name: resolve to address
            if (input.endsWith('.eth') || input.includes('.')) {
                setStatus('resolving');
                const addr = await resolveENS(input);
                
                if (addr) {
                    setResolved(addr);
                    setStatus('resolved');
                    onAddressChange(addr);
                    
                    const av = await getENSAvatar(input);
                    setAvatar(av);
                } else {
                    setStatus('error');
                }
            }
        };
        
        const debounceTimer = setTimeout(resolve, 500);
        return () => clearTimeout(debounceTimer);
    }, [input]);
    
    return (
        <div className="address-input">
            <div className="input-wrapper">
                {avatar && <img src={avatar} alt="ENS Avatar" className="ens-avatar" />}
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="0x address or name.eth"
                    className={status === 'error' ? 'error' : ''}
                />
            </div>
            
            {status === 'resolving' && <span className="status">Resolving...</span>}
            {status === 'resolved' && resolved && (
                <span className="resolved-address">
                    {resolved.slice(0, 6)}...{resolved.slice(-4)}
                </span>
            )}
            {status === 'error' && (
                <span className="error-msg">Name not found</span>
            )}
        </div>
    );
}
```

---

## ENS Subnames for Protocol Identity

```typescript
// Protocols can issue subnames like user.yourprotocol.eth
// This requires owning the parent name (yourprotocol.eth)

import { ENS } from '@ensdomains/ensjs';
import { addEnsContracts } from '@ensdomains/ensjs/contracts';

const ensClient = ENS.withContracts(addEnsContracts(client));

// Mint a subname for a user
async function createSubname(
    parentName: string,    // 'yourprotocol.eth'
    label: string,         // 'alice'
    targetAddress: string  // Alice's wallet
): Promise<void> {
    // This creates 'alice.yourprotocol.eth' → Alice's address
    await ensClient.setSubnameOwner({
        name: `${label}.${parentName}`,
        newOwner: targetAddress,
        account: protocolOwnerAccount
    });
}

// Use case: DeFi protocol issues trading IDs
// 'alice.defiprotocol.eth' resolves to Alice's trading account
// Alice can use this in the protocol UI and for payments
```

---

## FAQ

**Does ENS work on L2 chains like Arbitrum or Base?**
ENS resolution happens on Ethereum L1 (where the ENS contracts live). However, "ENS on L2" is actively developed — Coinbase launched .cb.id subnames on Base; other L2s are implementing EIP-3668 (CCIP-Read) to enable off-chain and L2 name resolution verified on L1. As of 2025: for production ENS integration, resolve on Ethereum L1; for custom protocol namespaces, consider L2 subnames.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Carbon Credit Tokenization — On-Chain Carbon Registry | Clickmasters

---
**URL:** /carbon-credit-tokenization/
**Primary KW:** carbon credit tokenization blockchain
**Secondary KWs:** tokenize carbon credits, on-chain carbon registry, blockchain carbon offsets
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /commodity-tokenization/, /asset-tokenization-platform/, /blockchain-development-energy/

---

## H1: Carbon Credit Tokenization — Building an On-Chain Carbon Registry With Verifiable Retirements

**H2: Toucan Protocol, Flowcarbon, and KlimaDAO have tokenized 20M+ tonnes of carbon credits on blockchain. The architecture: verified credit ingestion, ERC-20 token minting, and immutable retirement. Here is how to build it.**

---

## Carbon Credit Lifecycle on Blockchain

```
Step 1: Off-chain verification
  Carbon project (reforestation, renewable energy, methane capture)
  → Verified by Verra (VCS), Gold Standard, or American Carbon Registry
  → Credits issued in traditional registry (Verra's registry is the standard)

Step 2: Bridge to blockchain (Toucan Protocol model)
  Credit holder retires credits in Verra registry → marks them as "bridged"
  → Toucan's bridge contract verified the Verra retirement
  → Mints equivalent "Base Carbon Tonne" (BCT) ERC-20 tokens on Polygon

Step 3: Trading
  BCT tokens trade on DEXs (Uniswap, SushiSwap on Polygon)
  Price discovery: BCT spot price visible on-chain 24/7
  Fractionalization: 1 BCT = 1 tonne = $3–$10 (varies by vintage and type)

Step 4: On-chain retirement
  Company buys BCT tokens → calls retire() function
  retire() burns the tokens permanently
  Immutable retirement record: on-chain transaction hash proves retirement
  Corporate sustainability claim: cite the transaction hash
```

---

## Carbon Token Smart Contract

```solidity
contract CarbonToken is ERC20, Ownable {
    
    // Each token represents 1 tonne of CO2 equivalent
    // decimals = 18, so 1e18 = 1 tonne
    
    struct CreditMetadata {
        string projectId;        // e.g., "VCS-1234"
        string projectName;      // e.g., "Amazon Reforestation - Brazil"
        uint256 vintage;         // e.g., 2023 (year carbon was captured)
        string methodology;      // e.g., "VM0007"
        string registry;         // e.g., "Verra"
        string verificationId;   // Registry verification certificate ID
    }
    
    mapping(bytes32 => CreditMetadata) public creditMetadata;
    
    struct RetirementRecord {
        address retiredBy;
        uint256 amount;
        uint256 timestamp;
        string beneficiary;      // Who is claiming the offset
        string reason;           // e.g., "Q3 2025 carbon neutrality claim"
        bytes32 creditId;        // Which credit pool was retired
    }
    
    RetirementRecord[] public retirements;
    uint256 public totalRetired;
    
    // Registry operator mints tokens when credits are bridged from Verra
    function mintCredits(
        address recipient,
        uint256 tonnes,         // Number of tonnes (in 18-decimal units)
        bytes32 creditId,       // Hash of credit metadata
        CreditMetadata calldata metadata
    ) external onlyOwner {
        creditMetadata[creditId] = metadata;
        _mint(recipient, tonnes);
        emit CreditsIssued(recipient, tonnes, creditId, metadata.projectId);
    }
    
    // Retire credits — burns tokens permanently
    function retire(
        uint256 amount,
        string calldata beneficiary,
        string calldata reason,
        bytes32 creditId
    ) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(creditMetadata[creditId].vintage > 0, "Invalid credit pool");
        
        // Burn the tokens permanently
        _burn(msg.sender, amount);
        totalRetired += amount;
        
        // Create immutable retirement record
        retirements.push(RetirementRecord({
            retiredBy: msg.sender,
            amount: amount,
            timestamp: block.timestamp,
            beneficiary: beneficiary,
            reason: reason,
            creditId: creditId
        }));
        
        emit CreditsRetired(
            msg.sender, 
            amount, 
            beneficiary, 
            block.timestamp,
            retirements.length - 1  // Retirement record ID
        );
    }
    
    // Corporate verification: retrieve retirement certificate
    function getRetirementCertificate(uint256 retirementId) 
        external view returns (RetirementRecord memory, CreditMetadata memory) 
    {
        RetirementRecord memory ret = retirements[retirementId];
        return (ret, creditMetadata[ret.creditId]);
    }
    
    event CreditsIssued(address indexed recipient, uint256 amount, bytes32 creditId, string projectId);
    event CreditsRetired(
        address indexed retiredBy, 
        uint256 amount, 
        string beneficiary,
        uint256 timestamp,
        uint256 retirementId
    );
}
```

---

## Corporate Carbon Claim Documentation

When a company retires carbon credits on-chain, they can produce:
1. Transaction hash (public, immutable proof of retirement)
2. Retirement certificate generated from on-chain data
3. Credit metadata (project, vintage, registry, methodology)
4. Amount retired in tonnes

This documentation is stronger than traditional registry retirements because:
- Blockchain record cannot be altered retroactively
- Any third party can verify independently using the transaction hash
- Timestamp is cryptographically proven (cannot be backdated)

---

## FAQ

**Are tokenized carbon credits accepted by CDP and SBTi for corporate reporting?**
As of 2025: Verra-verified credits retired through recognized bridge protocols (Toucan, Flowcarbon) are generally accepted for voluntary carbon market claims. CDP (Carbon Disclosure Project) and GHG Protocol accept voluntary market credits when properly documented. However: specific reporting frameworks (SBTi target-setting) have quality requirements that not all tokenized credit types meet. Verify the specific methodology and vintage requirements with your sustainability reporting advisor.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# IPFS and Filecoin Advanced — Decentralized Storage for Production dApps | Clickmasters

---
**URL:** /ipfs-filecoin-advanced/
**Primary KW:** IPFS Filecoin production storage
**Secondary KWs:** IPFS advanced guide, Filecoin integration dApp, decentralized storage production
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /nft-metadata-architecture/, /web3-development-company/, /ipfs-vs-arweave-vs-on-chain-nft/

---

## H1: IPFS and Filecoin Advanced Guide — Production Decentralized Storage Architecture

**H2: IPFS is content addressing. Filecoin is incentivized storage. Together they provide decentralized, permanent data storage. Here is how production dApps integrate both.**

---

## Content Addressing vs. Location Addressing

**Traditional (location-based):** URL points to a server location. `https://cdn.example.com/image.jpg` → if the server goes down, the image is gone. The URL says nothing about what the content IS.

**IPFS (content-based):** CID identifies content by its hash. `ipfs://QmXoXHcBDhZ...` → any node with this content can serve it. If you change the file, the CID changes. Immutable by design.

---

## Production IPFS Integration

```typescript
import { NFTStorage, File } from 'nft.storage';
import { Web3Storage } from 'web3.storage';

class ProductionIPFSClient {
    private nftStorage: NFTStorage;
    
    constructor(apiKey: string) {
        this.nftStorage = new NFTStorage({ token: apiKey });
    }
    
    // Upload NFT metadata and image atomically
    async uploadNFTMetadata(params: {
        name: string;
        description: string;
        imageFile: File;
        attributes: { trait_type: string; value: string }[];
    }): Promise<string> {
        
        const metadata = await this.nftStorage.store({
            name: params.name,
            description: params.description,
            image: params.imageFile,
            attributes: params.attributes
        });
        
        // Returns ipfs://CID — permanent content-addressed URI
        return metadata.url;
    }
    
    // Upload directory of files (for 10,000 PFP collection)
    async uploadCollection(files: File[]): Promise<string> {
        const cid = await this.nftStorage.storeDirectory(files);
        return `ipfs://${cid}`;
    }
    
    // Verify content is pinned and accessible
    async verifyPin(cid: string): Promise<boolean> {
        try {
            const status = await this.nftStorage.check(cid);
            return status.pin.status === 'pinned';
        } catch {
            return false;
        }
    }
}

// For large files: use direct Kubo node or Estuary
async function uploadLargeFile(filePath: string, sizeGB: number): Promise<string> {
    if (sizeGB < 32) {
        // Use NFT.Storage (free tier up to 31GB total)
        const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY! });
        const data = fs.readFileSync(filePath);
        const cid = await client.storeBlob(new Blob([data]));
        return cid;
    } else {
        // Use Filecoin deal for large files
        return await createFilecoinDeal(filePath);
    }
}
```

---

## Filecoin Storage Deals for Permanent Data

```javascript
// Create a Filecoin storage deal using Lighthouse SDK
import lighthouse from '@lighthouse-web3/sdk';

async function storeOnFilecoin(filePath: string, apiKey: string): Promise<string> {
    // Upload to IPFS and create Filecoin deal in one call
    const uploadResponse = await lighthouse.upload(
        filePath,
        apiKey,
        false, // not encrypted
        (progressData) => {
            console.log(`Upload: ${progressData.total.percentage.toFixed(2)}%`);
        }
    );
    
    const cid = uploadResponse.data.Hash;
    
    // Verify the deal is active on Filecoin
    const dealStatus = await lighthouse.getDealStatus(cid);
    
    console.log(`CID: ${cid}`);
    console.log(`Filecoin deals: ${dealStatus.data.length} active deals`);
    
    return `ipfs://${cid}`;
}

// Calculate storage cost
async function calculateStorageCost(fileSizeGB: number): Promise<void> {
    // Current Filecoin storage pricing (approximate)
    const pricePerGBPerYear = 0.0000000001; // Near-zero on Filecoin
    const yearsToStore = 3; // Minimum deal duration
    
    const totalCost = fileSizeGB * pricePerGBPerYear * yearsToStore;
    console.log(`Storage cost for ${fileSizeGB}GB for ${yearsToStore} years: $${totalCost.toFixed(8)} FIL`);
    
    // NFT.Storage (Filecoin-backed): free up to 31GB
    // Beyond that: ~$0.0000000001/GB/year (essentially free at current prices)
}
```

---

## Multi-Provider Redundancy

```typescript
// Store data on multiple IPFS pinning services for redundancy
const PINNING_SERVICES = [
    { name: 'NFT.Storage', endpoint: 'https://api.nft.storage' },
    { name: 'Pinata', endpoint: 'https://api.pinata.cloud' },
    { name: 'Web3.Storage', endpoint: 'https://api.web3.storage' }
];

async function pinWithRedundancy(cid: string): Promise<void> {
    const pinPromises = PINNING_SERVICES.map(async service => {
        try {
            await pinToPinningService(cid, service);
            console.log(`Pinned on ${service.name}`);
        } catch (e) {
            console.warn(`Failed to pin on ${service.name}: ${e}`);
        }
    });
    
    await Promise.allSettled(pinPromises);
}
```

---

## FAQ

**What happens if NFT.Storage shuts down?**
NFT.Storage data is stored on Filecoin's incentivized network with multiple deal replicas across independent storage providers. Even if NFT.Storage the company closes, the Filecoin deal remains active (storage providers continue to be paid through the Filecoin protocol). For additional redundancy: pin to multiple services (Pinata, Infura IPFS) simultaneously.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Blockchain for Medical Records — HIPAA-Compliant Architecture | Clickmasters

---
**URL:** /blockchain-medical-records/
**Primary KW:** blockchain medical records
**Secondary KWs:** blockchain EHR integration, HIPAA blockchain, medical data blockchain
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /blockchain-development-healthcare/, /enterprise-blockchain-solutions/, /blockchain-faq-healthcare/

---

## H1: Blockchain for Medical Records — HIPAA-Compliant Architecture for Patient Data

**H2: Patient health records cannot go on a public blockchain — HIPAA prohibits it. But blockchain can provide immutable audit trails, consent management, and interoperability without exposing Protected Health Information. Here is the correct architecture.**

---

## The Fundamental Rule: PHI Never On-Chain

HIPAA Protected Health Information (PHI) includes: name, date of birth, Social Security number, diagnosis, treatment, insurance information, and 16 other identifiers. PHI cannot be stored on any public blockchain.

**The correct architecture:**
- PHI stays in HIPAA-compliant storage (Epic, Cerner, AWS HealthLake)
- Blockchain stores: cryptographic hashes of documents, consent records, access logs, credential attestations
- The hash on-chain proves: "this document existed and had this exact content at this timestamp" — without revealing any PHI

---

## Consent Management Architecture

```solidity
// Patient consent management on blockchain
// No PHI — only consent attestations
contract PatientConsentRegistry {
    
    // Consent record: patient permits specific provider to access specific data
    struct ConsentRecord {
        bytes32 patientId;      // Pseudonymous patient identifier (not SSN/name)
        bytes32 providerId;     // Provider identifier
        bytes32[] dataTypes;    // Hash of data type categories (not actual data)
        uint256 grantedAt;
        uint256 expiresAt;
        bool active;
        string purposeCode;     // "TREATMENT", "RESEARCH", "BILLING"
    }
    
    mapping(bytes32 => mapping(bytes32 => ConsentRecord)) public consents;
    // patientId → providerId → ConsentRecord
    
    event ConsentGranted(bytes32 indexed patientId, bytes32 indexed providerId, uint256 expiresAt);
    event ConsentRevoked(bytes32 indexed patientId, bytes32 indexed providerId);
    
    // Patient grants consent to provider
    // Called by patient-controlled wallet or their healthcare institution
    function grantConsent(
        bytes32 patientId,
        bytes32 providerId,
        bytes32[] calldata dataTypes,
        uint256 durationDays,
        string calldata purposeCode
    ) external {
        // Verify caller is authorized for this patient
        require(authorizedCallers[msg.sender][patientId], "Not authorized");
        
        consents[patientId][providerId] = ConsentRecord({
            patientId: patientId,
            providerId: providerId,
            dataTypes: dataTypes,
            grantedAt: block.timestamp,
            expiresAt: block.timestamp + (durationDays * 1 days),
            active: true,
            purposeCode: purposeCode
        });
        
        emit ConsentGranted(patientId, providerId, block.timestamp + (durationDays * 1 days));
    }
    
    // Patient revokes consent
    function revokeConsent(bytes32 patientId, bytes32 providerId) external {
        require(authorizedCallers[msg.sender][patientId], "Not authorized");
        consents[patientId][providerId].active = false;
        emit ConsentRevoked(patientId, providerId);
    }
    
    // Provider checks consent before accessing data
    function checkConsent(
        bytes32 patientId,
        bytes32 providerId,
        bytes32 dataType
    ) external view returns (bool authorized) {
        ConsentRecord memory consent = consents[patientId][providerId];
        
        if (!consent.active) return false;
        if (block.timestamp > consent.expiresAt) return false;
        
        for (uint256 i = 0; i < consent.dataTypes.length; i++) {
            if (consent.dataTypes[i] == dataType) return true;
        }
        
        return false;
    }
    
    mapping(address => mapping(bytes32 => bool)) public authorizedCallers;
}
```

---

## Document Integrity: Hash-on-Chain Pattern

```python
# Healthcare document integrity verification
import hashlib
import json
from datetime import datetime

def create_document_attestation(document_path: str, patient_pseudonym: str) -> dict:
    """
    Create a blockchain attestation for a healthcare document.
    The document itself stays in HIPAA-compliant storage.
    Only the hash goes on-chain.
    """
    # Read document
    with open(document_path, 'rb') as f:
        document_bytes = f.read()
    
    # Generate SHA-256 hash
    document_hash = hashlib.sha256(document_bytes).hexdigest()
    
    # Create attestation (goes on-chain)
    attestation = {
        'patient_pseudonym': patient_pseudonym,  # NOT the patient's name/SSN
        'document_hash': '0x' + document_hash,
        'document_type': 'CLINICAL_NOTE',  # Category, not content
        'timestamp': datetime.utcnow().isoformat(),
        'creator_institution_id': 'HOSPITAL_ABC_PSEUDONYM'
    }
    
    # DOES NOT INCLUDE:
    # - Patient name, SSN, DOB
    # - Diagnosis, treatment details
    # - Any PHI
    
    return attestation

def verify_document_integrity(document_path: str, on_chain_hash: str) -> bool:
    """
    Verify a document hasn't been altered since its hash was recorded on-chain.
    """
    with open(document_path, 'rb') as f:
        current_hash = '0x' + hashlib.sha256(f.read()).hexdigest()
    
    return current_hash == on_chain_hash
```

---

## FAQ

**Can Epic or Cerner records be directly integrated with blockchain?**
Epic supports HL7 FHIR R4 APIs — records can be exported in standard format. The integration pattern: Epic → FHIR export → hash the document → store hash on-chain (via the healthcare system's API call). Epic itself does not write to blockchain; your integration middleware does, after receiving the FHIR export. Epic's SMART on FHIR authorization model controls which systems can export records.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

**SCHEMA on all pages:** Article + FAQPage + BreadcrumbList.
