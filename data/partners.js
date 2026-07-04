const partners=[
  {
    "slug": "audit_legal_infra_partners",
    "meta": {
      "url": "/partners/trail-of-bits/",
      "title": "Trail of Bits Partnership — Smart Contract Security Audit Integration",
      "secondaryKeywords": [],
      "schema": "Article, BreadcrumbList",
      "wordCount": 1406
    },
    "sections": [
      {
        "heading": "H1: Trail of Bits Partnership — Smart Contract Security Audit Integration",
        "content": "URL:*Schema:***Internal Links:*\nTrail of Bits (trailofbits.com) is one of the most respected blockchain security firms globally. Their client list includes: Ethereum Foundation, Protocol Labs, MakerDAO, Compound, Chainlink, and the US Department of Defense.\n\n### Why We Partner with Trail of Bits\n\n**Technical depth:*\n**Published research:*\n**Government credibility:*\n### How the Partnership Works\n\nFor Clickmasters clients requiring security audits, we coordinate the Trail of Bits engagement process:\n\n**Typical engagement timeline:*\n**Cost range for Trail of Bits audits:*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*",
        "bullets": [
          "Scope definition and RFP preparation",
          "Codebase documentation for audit readiness",
          "Communication bridge between your team and audit researchers",
          "Remediation coordination after findings delivery"
        ]
      },
      {
        "heading": "H1: Certora Formal Verification Partnership — Mathematical Proof of Smart Contract Correctness",
        "content": "URL:*Schema:***Internal Links:*\nCertora provides formal verification for smart contracts using the Certora Prover — a tool that mathematically proves that a smart contract satisfies specified properties. Used by: Aave, Compound, Balancer, MakerDAO, Uniswap.\n\n### Formal Verification vs Traditional Audit\n\n| Factor | Traditional Audit | Formal Verification (Certora) |\n|---|---|---|\n| Approach | Manual code review + tools | Mathematical proofs of properties |\n| Coverage | Auditor's knowledge + test cases | All possible inputs, all execution paths |\n| Time | 2–4 weeks | 4–8 weeks (specification writing is complex) |\n| Cost | $25K–$150K | $50K–$300K+ |\n| What it proves | \"We didn't find vulnerabilities\" | \"This property CANNOT be violated\" |\n| Best for | General DeFi protocols | High-TVL protocols ($100M+), lending, bridging |\n\n**The key distinction:*\n### When to Use Certora\n\n**Must have:*\n**Consider:*\n**May not need:*\n### Integration Timeline\n\nFormal verification requires specification writing (defining what properties to prove) before tool execution. Specification writing typically takes 1–2 weeks with input from your development team. Total engagement: 6–10 weeks from kickoff to verified final report.\n\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*"
      },
      {
        "heading": "H1: Cooley LLP Partnership — Blockchain Legal Services for Startups and Enterprises",
        "content": "URL:*Schema:***Internal Links:*\nLegal clarity is the first step in any blockchain project that involves token issuance, financial services, or regulated industries. We partner with leading blockchain legal practices to provide integrated technical + legal guidance.\n\n### When You Need Blockchain Legal Counsel\n\n**Token issuance (any type):*\n**Exchange operation:*\n**DeFi protocol governance:*\n**Enterprise blockchain:*\n### Legal + Technical Integration\n\nOur process: technical scope and legal scope defined in parallel, not sequentially. The legal structure determines the technical design (Reg D 506(c) → transfer restriction smart contract → KYC whitelist). Building the technology before legal clarity is backward.\n\n**Estimated legal costs for blockchain projects:*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*"
      },
      {
        "heading": "H1: AWS Blockchain Partnership — Managed Blockchain and CloudHSM Integration",
        "content": "URL:*Schema:***Internal Links:*\nAmazon Web Services provides the infrastructure layer for most enterprise blockchain deployments: Amazon Managed Blockchain (Hyperledger Fabric hosting), CloudHSM (key management), and the full AWS security posture that enterprise IT departments require.\n\n### Amazon Managed Blockchain\n\nAmazon Managed Blockchain provides managed Hyperledger Fabric networks without the operational overhead of running Fabric nodes on bare metal or self-managed EC2:\n\n**What it manages:*\n**What you still manage:*\n**Pricing:*\n**When to use:*\n### CloudHSM for Blockchain Key Management\n\nAWS CloudHSM provides FIPS 140-2 Level 3 validated hardware security modules for enterprise blockchain:\n\n**Use cases:*\n**Integration pattern:*\n**Cost:*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*",
        "bullets": [
          "Certificate authority (CA) operation",
          "Fabric peer node provisioning and scaling",
          "Orderer node operation",
          "Network monitoring and alerting",
          "TLS certificate rotation",
          "Chaincode development and deployment",
          "Channel creation and membership management",
          "Integration with external systems",
          "Application development",
          "Fabric ordering service and peer node private keys",
          "Certificate authority signing keys",
          "Application-level wallet keys for automated transactions",
          "Admin key management for smart contract upgrades"
        ]
      },
      {
        "heading": "H1: Alchemy Developer Platform Partnership — RPC, NFT API, and Webhooks",
        "content": "URL:*Schema:***Internal Links:*\nAlchemy (alchemy.com) provides the Web3 developer infrastructure layer: enhanced JSON-RPC, NFT API, Webhook event streaming, and analytics. Used by: OpenSea, dYdX, Adobe, and most major DeFi protocols.\n\n### Why Alchemy Over Raw RPC\n\n**Reliability:*\n**Enhanced APIs beyond standard JSON-RPC:*// Standard JSON-RPC: can't do this efficiently\n// Get all NFTs owned by an address across all collections\n// Would require querying every NFT contract ever deployed\n\n// Alchemy NFT API: one call\nconst nfts = await alchemy.nft.getNftsForOwner('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');\n// Returns: all NFTs with metadata, image URLs, collection info\n\n// Alchemy Token API\nconst tokenBalances = await alchemy.core.getTokenBalances('0xaddress');\n// Returns: all ERC-20 token balances for an address\n\n// Alchemy Transfers API\nconst transfers = await alchemy.core.getAssetTransfers({\n  fromAddress: '0xaddress',\n  category: ['erc721', 'erc1155'],\n  withMetadata: true\n});\n// Returns: full transfer history with NFT metadata\n```\n\n**Webhooks:*\n### Alchemy Notify for Real-Time dApp Features\n\n```typescript\nconst webhook = await alchemy.notify.createWebhook(\n  'https://your-server.com/webhook',\n  WebhookType.NFT_ACTIVITY,\n  {\n    nftFilters: [\n      { contractAddress: '0xYourNFTContract', tokenId: '1234' }\n    ]\n  }\n);\n```\n\nUse case: Your NFT marketplace gets a webhook the instant an NFT is transferred — update your database, send notification to the buyer, update the listing status. No polling loop required.\n\n[BUTTON — PRIMARY] Book a Free Strategy Call →",
        "bullets": [
          "Address activity (any transaction from/to an address)",
          "NFT activity (mints, transfers, sales)",
          "Custom webhook for specific contract events",
          "Mined transactions (transaction confirmed notification)"
        ]
      }
    ],
    "faq": [],
    "ctas": [
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      }
    ],
    "tags": [
      "Partner"
    ],
    "category": "partner"
  },
  {
    "slug": "technology_partners",
    "meta": {
      "url": "/blockchain-partner-chainlink/",
      "title": "Blockchain Development Partner: Chainlink Oracle Integration | Clickmasters",
      "primaryKeyword": "Chainlink oracle integration partner",
      "secondaryKeywords": [
        "Chainlink development",
        "integrate Chainlink DeFi",
        "Chainlink price feeds",
        "oracle integration service"
      ],
      "schema": "Service, BreadcrumbList",
      "wordCount": 2554
    },
    "sections": [
      {
        "heading": "H1: Chainlink Oracle Integration — Production-Grade Price Feeds and VRF for Your Protocol",
        "content": "**H2: Every DeFi protocol we deliver uses Chainlink for price feeds and Chainlink VRF for verifiable randomness. Oracle design is the leading exploit vector in DeFi — we integrate Chainlink correctly, with all required validations.*"
      },
      {
        "heading": "Why Chainlink Is Our Standard",
        "content": "The Mango Markets exploit ($114M), Compound oracle incidents, and dozens of smaller exploits all trace back to vulnerable oracle design. Chainlink's decentralized node network, TWAP pricing, and deviation-based update mechanism make it the most manipulation-resistant oracle available.\n\n**What we always implement:*// Production Chainlink integration with all required validations\nfunction getValidatedPrice(AggregatorV3Interface priceFeed) \n    internal view returns (int256 price) \n{\n    (\n        uint80 roundId,\n        int256 answer,\n        uint256 startedAt,\n        uint256 updatedAt,\n        uint80 answeredInRound\n    ) = priceFeed.latestRoundData();\n    \n    require(answer > 0, \"Chainlink: invalid price\");\n    require(updatedAt != 0, \"Chainlink: incomplete round\");\n    require(block.timestamp     require(answeredInRound >= roundId, \"Chainlink: stale round\");\n    \n    return answer;\n}\n```\n\n**What we never implement:*\n---",
        "bullets": [
          "Spot price oracles from AMM pools (flash loan manipulable)",
          "Chainlink without staleness checks (can be stale during oracle outage)",
          "Single oracle without deviation validation (no defense against outlier data)"
        ]
      },
      {
        "heading": "Chainlink Products We Integrate",
        "content": "**Price Feeds:*\n**Chainlink VRF (Verifiable Random Function):*\n**Chainlink Automation (Keepers):*\n**Chainlink CCIP (Cross-Chain Interoperability Protocol):*\n**Chainlink Functions:*\n---"
      },
      {
        "heading": "Integration Timeline",
        "content": "Adding Chainlink price feeds to an existing DeFi protocol: 1–2 weeks. Adding Chainlink VRF to a gaming protocol: 1–2 weeks. Full oracle architecture design (price feeds + TWAP + circuit breakers) for a new DeFi protocol: 3–4 weeks as part of initial development.\n\n---"
      },
      {
        "heading": "FAQ",
        "content": "**Does Chainlink have price feeds for every token?*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*--\n--Primary KW:*Secondary KWs:*Schema:*Internal Links:*\n---"
      },
      {
        "heading": "H1: OpenZeppelin Contracts — Why We Build Every Smart Contract on Audited Foundations",
        "content": "**H2: OpenZeppelin Contracts is the most audited, most widely used smart contract library in existence. Every production contract we deliver starts from an OpenZeppelin base — not from scratch. Here is why this matters for your project.*"
      },
      {
        "heading": "What OpenZeppelin Provides",
        "content": "**Token standards (audited, battle-tested):*\n**Access control:*\n**Security utilities:*\n**Governance:*\n**Proxy patterns:*\n---",
        "bullets": [
          "ERC-20 (with extensions: ERC20Votes, ERC20Permit, ERC20Snapshot, ERC20Burnable)",
          "ERC-721 (with extensions: ERC721URIStorage, ERC721Enumerable, ERC721Royalty)",
          "ERC-1155 (multi-token standard)",
          "ERC-2981 (royalty standard)",
          "Ownable (single owner)",
          "AccessControl (role-based, multiple roles and role admins)",
          "AccessControlEnumerable (list all role members)",
          "ReentrancyGuard (prevents reentrancy attacks)",
          "Pausable (emergency circuit breaker)",
          "PullPayment (safer ETH payment pattern)",
          "Governor (on-chain proposal and voting)",
          "TimelockController (mandatory delay on governance execution)",
          "GovernorVotes, GovernorQuorumFraction, GovernorTimelockControl",
          "TransparentUpgradeableProxy",
          "UUPS (Universal Upgradeable Proxy Standard)",
          "BeaconProxy (upgrade many instances simultaneously)"
        ]
      },
      {
        "heading": "Why \"Build on OpenZeppelin\" Is Not \"Just Copy-Paste\"",
        "content": "Using OpenZeppelin as a base is sound engineering — the same way using React or Django is sound engineering for web development. But using it incorrectly introduces vulnerabilities:\n\n**Common mistakes with OpenZeppelin:*2. Using `Ownable` without understanding that `transferOwnership()` is immediate (no timelock)\n3. Using upgradeable proxy without proper storage gap (`__gap[50]` must be included)\n4. Calling `_safeMint()` in a loop (reentrancy vector if recipient is a contract)\n5. Missing override of `supportsInterface()` when using multiple inheritance\n\n**What we add on top of OpenZeppelin:*\n---",
        "bullets": [
          "Custom business logic (your specific token economics, vesting rules, fee structures)",
          "Security hardening (additional access control, circuit breakers specific to your protocol)",
          "Gas optimization (sometimes more efficient than OpenZeppelin's generic implementations)",
          "Integration logic (connecting to external protocols, oracles, bridges)"
        ]
      },
      {
        "heading": "Our Standard OpenZeppelin Pattern Library",
        "content": "```solidity\n// Template: Standard governance token\nimport \"@openzeppelin/contracts/token/ERC20/ERC20.sol\";\nimport \"@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol\";\nimport \"@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol\";\nimport \"@openzeppelin/contracts/access/Ownable.sol\";\nimport \"@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol\";\n\n// Template: Upgradeable DeFi protocol\nimport \"@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol\";\nimport \"@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol\";\nimport \"@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol\";\nimport \"@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol\";\n\n// Template: DAO governance\nimport \"@openzeppelin/contracts/governance/Governor.sol\";\nimport \"@openzeppelin/contracts/governance/extensions/GovernorSettings.sol\";\nimport \"@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol\";\nimport \"@openzeppelin/contracts/governance/extensions/GovernorVotes.sol\";\nimport \"@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol\";\nimport \"@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol\";\nimport \"@openzeppelin/contracts/governance/TimelockController.sol\";\n```\n\n---"
      },
      {
        "heading": "FAQ",
        "content": "**Does using OpenZeppelin mean our code is automatically safe?*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*--\n--Primary KW:*Secondary KWs:*Schema:*Internal Links:*\n---"
      },
      {
        "heading": "H1: Alchemy Infrastructure — Our Primary RPC and Developer Tool Provider",
        "content": "**H2: Every production Web3 application we deliver uses Alchemy as the primary blockchain RPC provider — for its reliability, developer tools, and APIs that go beyond basic RPC. Here is why we chose Alchemy and what it provides.*"
      },
      {
        "heading": "Why Alchemy for Production Applications",
        "content": "**Reliability:*\n**Beyond basic RPC:*\n**Webhooks:*\n---",
        "bullets": [
          "`alchemy_getAssetTransfers`: Efficient query for all token transfers to/from an address (without scanning every block)",
          "`alchemy_getTokenBalances`: Get all ERC-20 token balances for a wallet in one call",
          "`alchemy_getNFTs`: Get all NFTs owned by a wallet with metadata",
          "`alchemy_simulateExecution`: Simulate a transaction before sending (preview results without gas cost)"
        ]
      },
      {
        "heading": "Our Standard Alchemy Integration",
        "content": "```typescript\nimport { Alchemy, Network } from 'alchemy-sdk';\n\nconst config = {\n    apiKey: process.env.ALCHEMY_API_KEY,\n    network: Network.ETH_MAINNET,\n    maxRetries: 3,\n    batchRequests: true,\n};\n\nconst alchemy = new Alchemy(config);\n\n// Multi-chain configuration\nconst chains = {\n    ethereum: new Alchemy({ ...config, network: Network.ETH_MAINNET }),\n    arbitrum: new Alchemy({ ...config, network: Network.ARB_MAINNET }),\n    polygon:  new Alchemy({ ...config, network: Network.MATIC_MAINNET }),\n    base:     new Alchemy({ ...config, network: Network.BASE_MAINNET }),\n};\n\n// Efficient wallet portfolio query\nasync function getWalletPortfolio(address: string) {\n    const [nativeBalance, tokenBalances, nfts] = await Promise.all([\n        chains.ethereum.core.getBalance(address),\n        chains.ethereum.core.getTokenBalances(address),\n        chains.ethereum.nft.getNftsForOwner(address),\n    ]);\n    \n    return { nativeBalance, tokenBalances, nfts };\n}\n\n// Address activity monitoring via webhook\nasync function setupAddressMonitoring(addresses: string[]) {\n    await fetch(`${ALCHEMY_WEBHOOK_URL}/team-webhooks`, {\n        method: 'POST',\n        headers: { 'X-Alchemy-Token': process.env.ALCHEMY_ADMIN_KEY },\n        body: JSON.stringify({\n            webhook_type: 'ADDRESS_ACTIVITY',\n            webhook_url: `${process.env.BASE_URL}/api/webhooks/alchemy`,\n            network: 'ETH_MAINNET',\n            addresses\n        })\n    });\n}\n```\n\n---"
      },
      {
        "heading": "Alchemy vs Infura: Our Recommendation",
        "content": "**Alchemy:*\n**Infura:*\n**Standard pattern:*\n---"
      },
      {
        "heading": "FAQ",
        "content": "**Do you get a referral commission from Alchemy?*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*--\n--Primary KW:*Secondary KWs:*Schema:*Internal Links:*\n---"
      },
      {
        "heading": "H1: Magic Link and Privy — Social Login Wallets for Mainstream Web3 Onboarding",
        "content": "**H2: The biggest barrier to Web3 adoption is wallet setup. Magic Link and Privy solve this by creating wallets from Google/Apple login — no seed phrases, no browser extension installation. We integrate both and can advise which fits your use case.*"
      },
      {
        "heading": "Magic Link",
        "content": "**What it is:*\n**How the key is protected:*\n**Best for:*\n**Pricing:*\n**Integration:*import { Magic } from 'magic-sdk';\n\nconst magic = new Magic(process.env.MAGIC_API_KEY, {\n    network: {\n        rpcUrl: 'https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY',\n        chainId: 137,\n    }\n});\n\n// User logs in with Google\nconst handleLogin = async () => {\n    await magic.oauth.loginWithRedirect({\n        provider: 'google',\n        redirectURI: `${window.location.origin}/callback`,\n    });\n};\n\n// Get user's wallet address after login\nconst address = (await magic.user.getMetadata()).publicAddress;\n```\n\n---",
        "bullets": [
          "Consumer applications where the user base is not crypto-native",
          "Applications where the brand experience matters more than wallet portability",
          "Gasless applications (Magic integrates with Biconomy and Alchemy AA for sponsored transactions)",
          "Any application where \"setup your crypto wallet\" would cause 80%+ abandonment"
        ]
      },
      {
        "heading": "Privy",
        "content": "**What it is:*\n**How the key is protected:*\n**Best for:*\n**Pricing:*\n**Integration:*import { PrivyProvider } from '@privy-io/react-auth';\n\nfunction App() {\n    return (\n        <PrivyProvider\n            appId={process.env.PRIVY_APP_ID}\n            config={{\n                loginMethods: ['email', 'google', 'twitter', 'wallet'],\n                appearance: {\n                    theme: 'dark',\n                    accentColor: '#676FFF',\n                },\n                embeddedWallets: {\n                    createOnLogin: 'users-without-wallets', // Only create if no wallet\n                },\n            }}\n        >\n            <YourApp />\n        </PrivyProvider>\n    );\n}\n\n// In component\nconst { login, user, authenticated } = usePrivy();\nconst { wallets } = useWallets();\n// wallets includes both embedded (Privy) and connected (MetaMask) wallets\n```\n\n---",
        "bullets": [
          "Applications serving both crypto-native (existing wallets) and mainstream (social login) users",
          "Applications where progressive decentralization matters (users start with social login, gradually take custody)",
          "Multi-chain applications (Privy supports 20+ chains from one integration)"
        ]
      },
      {
        "heading": "Magic vs Privy: Choosing Between Them",
        "content": "| Factor | Magic Link | Privy |\n|---|---|---|\n| External wallet support | No (Magic only) | Yes (MetaMask, WalletConnect + embedded) |\n| Key security | WebAuthn (device hardware) | Threshold sharing (device + Privy + HSM) |\n| Key portability | Device-tied | Recoverable across devices |\n| Multi-chain | Requires separate Magic instances | Single integration, all chains |\n| Price (standard) | $99/month | $99/month |\n| Best for | Mobile-first, single chain | Multi-chain, mixed crypto/non-crypto audience |\n\n---"
      },
      {
        "heading": "FAQ",
        "content": "**Can users export their key from Magic or Privy to MetaMask?*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*--\n--Primary KW:*Secondary KWs:*Schema:*Internal Links:*\n---"
      },
      {
        "heading": "H1: Fireblocks Institutional Custody Integration — MPC Wallets for Exchanges and Custodians",
        "content": "**H2: Fireblocks is the institutional-standard MPC custody provider used by 1,800+ financial institutions. For exchanges and custodians requiring HSM-grade security without the hardware overhead, Fireblocks is our recommended solution.*"
      },
      {
        "heading": "What Fireblocks Provides",
        "content": "**MPC-CMP Protocol:*\n**Policy Engine:*\n**Multi-chain support:*\n**Transaction monitoring:*\n---"
      },
      {
        "heading": "Fireblocks API Integration",
        "content": "```javascript\nconst FireblocksSDK = require('@fireblocks/fireblocks-sdk');\n\nconst fireblocks = new FireblocksSDK.FireblocksSDK(\n    process.env.FIREBLOCKS_API_SECRET,\n    process.env.FIREBLOCKS_API_KEY,\n    'https://api.fireblocks.io'\n);\n\n// Create a new vault account for a user\nasync function createUserVault(userId) {\n    const vault = await fireblocks.createVaultAccount(`user_${userId}`, false);\n    \n    // Create wallet for each supported asset\n    await fireblocks.createVaultAsset(vault.id, 'ETH');\n    await fireblocks.createVaultAsset(vault.id, 'USDC_POLYGON');\n    await fireblocks.createVaultAsset(vault.id, 'BTC');\n    \n    return vault;\n}\n\n// Get deposit address for a user\nasync function getDepositAddress(vaultAccountId, assetId) {\n    const addresses = await fireblocks.getDepositAddresses(vaultAccountId, assetId);\n    return addresses[0].address;\n}\n\n// Initiate a withdrawal\nasync function withdraw(fromVaultId, toAddress, amount, assetId) {\n    const result = await fireblocks.createTransaction({\n        assetId,\n        amount: amount.toString(),\n        source: {\n            type: 'VAULT_ACCOUNT',\n            id: fromVaultId\n        },\n        destination: {\n            type: 'ONE_TIME_ADDRESS',\n            oneTimeAddress: { address: toAddress }\n        },\n        note: `User withdrawal     });\n    \n    return result.id; // Transaction ID for monitoring\n}\n\n// Monitor transaction status\nasync function getTransactionStatus(txId) {\n    const tx = await fireblocks.getTransactionById(txId);\n    return tx.status; // SUBMITTED, PENDING_SIGNATURE, BROADCASTING, COMPLETED, FAILED\n}\n```\n\n---"
      },
      {
        "heading": "Cost Considerations",
        "content": "Fireblocks pricing is not public but typically: $2,000–$15,000/month depending on transaction volume, number of vaults, and features. Compared to building your own MPC infrastructure ($200,000+ development cost + ongoing key management overhead): Fireblocks is cost-effective for exchanges processing under $100M/day.\n\nAt high volumes (>$1B/day): building proprietary MPC infrastructure may become economically justified. The break-even is typically 3–5 years of Fireblocks fees vs. development and maintenance of proprietary solution.\n\n---"
      },
      {
        "heading": "FAQ",
        "content": "**Can users on our exchange withdraw directly to hardware wallets?*\n**[BUTTON — PRIMARY] Book a Free Strategy Call →*"
      }
    ],
    "faq": [
      {
        "question": "Does Chainlink have price feeds for every token?",
        "answer": "Chainlink covers 500+ pairs on major networks. For long-tail tokens without Chainlink coverage: we use Uniswap V3 TWAP as a fallback (with appropriate period — 30 minutes minimum for flash loan resistance). For tokens with no oracle coverage on any source: we do not include them as collateral in lending protocols."
      },
      {
        "question": "Does using OpenZeppelin mean our code is automatically safe?",
        "answer": "No. OpenZeppelin provides audited base implementations. Your code extending those bases — and how you combine them — is your responsibility and requires its own audit. Most real-world vulnerabilities are in the custom logic that sits on top of the OpenZeppelin base, not in OpenZeppelin itself."
      },
      {
        "question": "Do you get a referral commission from Alchemy?",
        "answer": "No. We recommend Alchemy because it is the best infrastructure provider for the applications we build. Our obligation is to our clients' production reliability, not to any vendor relationship."
      },
      {
        "question": "Can users export their key from Magic or Privy to MetaMask?",
        "answer": "Magic: not currently (by design for security). Privy: yes — users can export their private key if they want full self-custody. This is a philosophical difference: Magic prioritizes security over portability; Privy prioritizes user sovereignty."
      },
      {
        "question": "Can users on our exchange withdraw directly to hardware wallets?",
        "answer": "Yes — Fireblocks handles withdrawal to any Ethereum address, including hardware wallet addresses. From the withdrawal perspective, a Ledger address and a MetaMask address are identical — both are just Ethereum addresses. The Fireblocks policy engine may require additional verification for withdrawals above defined thresholds, regardless of destination address type."
      }
    ],
    "ctas": [
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      },
      {
        "text": "Book a Free Strategy Call",
        "href": "#",
        "primary": true
      }
    ],
    "tags": [
      "Partner",
      "Blockchain"
    ],
    "category": "partner"
  }
];
function getPartnerBySlug(slug){return partners.find(i=>i.slug===slug);}
function getPartnerCards(o2){let c=partners.map(i=>({slug:i.slug,title:i.meta.title,description:i.sections[0]?.content?.substring(0,200)||i.meta.title,category:'partner',tags:i.tags,url:i.meta.url}));
if(o2?.tag)c=c.filter(x=>x.tags?.includes(o2.tag));if(o2?.search){const q=o2.search.toLowerCase();c=c.filter(x=>x.title.toLowerCase().includes(q)||x.description.toLowerCase().includes(q));}
if(o2?.offset)c=c.slice(o2.offset);if(o2?.limit)c=c.slice(0,o2.limit);return c;}
function getPartnersByTag(t){return partners.filter(i=>i.tags?.includes(t));}
function searchPartners(q2){const q=q2.toLowerCase();return partners.filter(i=>i.meta.title.toLowerCase().includes(q)||i.slug.toLowerCase().includes(q));}
module.exports={partners,getPartnerBySlug,getPartnerCards,getPartnersByTag,searchPartners};