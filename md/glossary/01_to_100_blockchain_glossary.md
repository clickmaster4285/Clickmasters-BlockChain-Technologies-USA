# Blockchain Glossary — 100 Essential Terms Defined | Clickmasters

---
**URL:** /blockchain-glossary/
**Primary KW:** blockchain glossary
**Secondary KWs:** blockchain terms definitions, crypto glossary, blockchain terminology, DeFi glossary
**Schema:** Article, DefinedTerm, BreadcrumbList
**Internal Links:** /what-is-blockchain/, /what-is-defi/, /smart-contract-development/, /blockchain-development-services/

---

## H1: Blockchain Glossary — 100 Essential Terms Every Business Leader and Developer Must Know

---

**Account Abstraction (ERC-4337):** An Ethereum standard that allows smart contracts to act as wallets, enabling programmable transaction logic — including gasless transactions, session keys, social recovery, and batch operations without changing the core Ethereum protocol.

**Address:** A 42-character hexadecimal string (beginning with 0x on Ethereum) derived from a wallet's public key. Functions as the identifier for sending and receiving transactions on a blockchain. Example: `0x742d35Cc6634C0532...`

**AML (Anti-Money Laundering):** Regulatory framework requiring financial businesses to detect and prevent money laundering. Crypto exchanges and custodial businesses must implement AML programs under FinCEN's Bank Secrecy Act rules.

**AMM (Automated Market Maker):** A type of decentralized exchange that uses liquidity pools and a mathematical formula (typically x·y=k) instead of an order book to price and execute trades. Uniswap, Curve, and Balancer are AMM protocols.

**Arbitrage:** Exploiting price differences for the same asset across different markets. In DeFi: buying on one exchange where price is lower and selling on another where price is higher in the same transaction, profiting from the spread.

**Audit (Smart Contract):** Independent security review of smart contract code by a specialized firm before production deployment. Identifies vulnerabilities including reentrancy, access control failures, integer errors, and economic attack vectors.

**Blockchain:** A distributed ledger where data is stored in cryptographically linked blocks validated by network consensus. Immutable, transparent, and decentralized — no single party can alter the historical record.

**Block:** A batch of validated transactions added to the blockchain at regular intervals. Each block contains: a list of transactions, a timestamp, the previous block's cryptographic hash (linking it to the chain), and the validator's signature.

**Block Explorer:** A web interface that allows anyone to query the blockchain — viewing transactions, wallet balances, smart contract state, and block history. Etherscan is the most widely used Ethereum block explorer.

**Bridge:** Infrastructure enabling asset or message transfer between two separate blockchain networks. Examples: Arbitrum Bridge (Ethereum↔Arbitrum), Wormhole (multi-chain). High-value attack target due to concentrated locked assets.

**BIP-39:** Bitcoin Improvement Proposal 39 — the standard for generating mnemonic (seed phrase) words from cryptographic entropy. Defines the 2,048-word wordlist from which 12- or 24-word recovery phrases are constructed.

**BIP-44:** Standard defining the hierarchical deterministic wallet derivation path structure: m / purpose' / coin_type' / account' / change / address_index.

**Burn:** Permanently removing tokens from circulation by sending them to an address from which they can never be retrieved (address(0) on Ethereum) or by calling a smart contract's `_burn()` function. Used for fee structures, sink mechanisms, and deflationary tokenomics.

**Bytecode:** The compiled form of a smart contract that runs on the Ethereum Virtual Machine (EVM). Solidity source code is compiled to EVM bytecode before deployment.

**Calldata:** Transaction data included in a blockchain transaction. Cheaper to store than contract state — used for function arguments and read-only data not requiring persistence.

**CEX (Centralized Exchange):** A cryptocurrency exchange that holds user funds (custodial) and operates an internal order book. Examples: Coinbase, Binance, Kraken.

**Chainlink:** The dominant decentralized oracle network providing real-world data (price feeds, random numbers, external API data) to smart contracts. Used as the primary price oracle by Aave, Compound, Synthetix, and most major DeFi protocols.

**Channel (Hyperledger Fabric):** A private sub-ledger within a Hyperledger Fabric network visible only to the organizations that participate in it. Enables data privacy in multi-party enterprise networks.

**Chaincode:** The smart contract equivalent in Hyperledger Fabric — business logic deployed to channels, written in Go, JavaScript, or Java.

**Cold Wallet:** A cryptocurrency wallet not connected to the internet. Used for long-term storage of significant assets. Examples: Ledger hardware wallet, air-gapped computer, paper wallet.

**Composability:** The ability of DeFi protocols to interoperate — using the output of one protocol as the input to another in the same transaction. Uniswap LP tokens staked in Aave as collateral is an example.

**Consensus Mechanism:** The process by which blockchain network nodes agree on which transactions are valid and which blocks to add to the chain. Major consensus mechanisms: Proof of Work (Bitcoin), Proof of Stake (Ethereum post-Merge), BFT (Hyperledger Fabric).

**DAO (Decentralized Autonomous Organization):** An organization governed by smart contracts and token holder voting, with no centralized management. Decisions made through on-chain proposals and votes executed automatically after a timelock.

**dApp (Decentralized Application):** An application with its business logic running on a blockchain via smart contracts rather than a centralized server. The frontend may be centralized; the core logic is on-chain.

**DeFi (Decentralized Finance):** Financial services — lending, trading, saving, insurance — running on blockchain smart contracts without traditional financial intermediaries.

**DEX (Decentralized Exchange):** A cryptocurrency exchange where trading occurs via smart contracts without a custodial party holding user funds. Users trade directly from their wallets.

**DID (Decentralized Identifier):** A W3C standard for self-sovereign digital identity. A DID is a unique identifier anchored to a blockchain, controllable by its owner without requiring a central registrar.

**EIP (Ethereum Improvement Proposal):** A formal proposal to change the Ethereum protocol or establish standards. Notable EIPs: EIP-20 (ERC-20 token standard), EIP-721 (NFT standard), EIP-1559 (fee market reform), EIP-4337 (account abstraction).

**ERC-20:** The Ethereum token standard for fungible tokens. Defines the interface (transfer, approve, allowance, balanceOf, totalSupply) that any fungible token must implement for interoperability with wallets and DeFi protocols.

**ERC-721:** The Ethereum standard for non-fungible tokens (NFTs). Each token has a unique ID and owner. Defines ownerOf, safeTransferFrom, getApproved, and tokenURI functions.

**ERC-1155:** A multi-token standard supporting both fungible and non-fungible tokens in a single contract. Enables batch transfers for gas efficiency. Standard for gaming items and multi-edition art.

**ERC-2981:** The NFT royalty standard. Adds royaltyInfo(tokenId, salePrice) function returning the royalty recipient and amount. Adopted by OpenSea, Foundation, and other major NFT marketplaces.

**ERC-4337:** The account abstraction standard for Ethereum. Enables smart contract wallets with programmable transaction logic without protocol changes.

**EVM (Ethereum Virtual Machine):** The runtime environment executing smart contracts on Ethereum and all EVM-compatible chains (Polygon, Arbitrum, Avalanche C-Chain, BNB Chain, etc.).

**Epoch:** A defined period in Proof of Stake consensus. Ethereum: 32 slots (6.4 minutes). Validators are assigned to committees per epoch. Checkpoints for finality occur at epoch boundaries.

**Externally Owned Account (EOA):** A blockchain account controlled by a private key — as opposed to a contract account (controlled by smart contract code). MetaMask manages EOAs. EOAs initiate transactions; contracts can only respond to calls.

**Fiat On-Ramp:** Infrastructure enabling users to purchase cryptocurrency using traditional money (bank transfer, credit card). Coinbase, MoonPay, and Ramp are common fiat on-ramp providers.

**FinCEN (Financial Crimes Enforcement Network):** US Treasury bureau responsible for enforcing the Bank Secrecy Act. Crypto businesses acting as Money Services Businesses (MSBs) must register with FinCEN and implement AML programs.

**Finality:** The point at which a blockchain transaction is considered irreversible. On Ethereum: probabilistic finality after 12 seconds; economic finality (extremely difficult to reverse) after ~12.8 minutes.

**Flash Loan:** A DeFi primitive allowing borrowing of any amount of assets within a single transaction, with no collateral required — as long as the loan is repaid by the end of the same transaction. Used for arbitrage, liquidations, and (maliciously) oracle manipulation attacks.

**Flywheel:** A self-reinforcing growth mechanism. DeFi flywheel: higher TVL → more fees → more protocol revenue → more token buyback → higher token price → more liquidity incentive → higher TVL.

**Fork:** A change to the blockchain protocol. Hard fork: backward-incompatible change creating two separate chains. Soft fork: backward-compatible change. Ethereum has undergone multiple hard forks (Constantinople, Byzantium, The Merge).

**Foundry:** A fast, portable smart contract development framework written in Rust. Tools: forge (compile/test), cast (interact), anvil (local node), chisel (REPL). The current professional standard for Solidity development.

**Gas:** The unit measuring computational work on the Ethereum network. Each EVM operation has a fixed gas cost. Total transaction cost = gas used × gas price (in Gwei).

**Gas Limit:** The maximum gas a transaction can consume. Set by the sender. If execution exceeds the gas limit, the transaction reverts but gas used up to the point of reversion is still paid.

**Gas Price:** The price per unit of gas, denominated in Gwei (10⁻⁹ ETH). Post-EIP-1559: split into base fee (burned) + priority tip (to validators).

**Governance Token:** An ERC-20 token granting holders voting rights on protocol decisions — parameter changes, treasury allocation, code upgrades. Examples: UNI (Uniswap), AAVE, MKR (MakerDAO).

**Gwei:** A denomination of ETH. 1 Gwei = 0.000000001 ETH. Gas prices are typically quoted in Gwei.

**Hard Cap:** The maximum supply of a token that will ever exist. No new tokens can be created beyond this limit. Bitcoin's hard cap is 21 million BTC.

**Hash:** A fixed-length output of a cryptographic hash function (SHA-256, Keccak-256). Deterministic (same input always produces same output), collision-resistant (practically impossible to find two inputs with the same hash), one-way (cannot reverse-compute the input from the output).

**HD Wallet (Hierarchical Deterministic Wallet):** A wallet that generates a tree of key pairs from a single master seed using BIP-32 derivation. One seed phrase backs up an unlimited number of accounts and addresses.

**Health Factor:** In DeFi lending protocols: the ratio of a user's collateral value (adjusted by liquidation threshold) to their outstanding debt. A health factor below 1.0 means the position is eligible for liquidation.

**Howey Test:** The four-part test from SEC v. W.J. Howey Co. (1946) determining whether an asset is a security: (1) investment of money, (2) in a common enterprise, (3) with expectation of profits, (4) primarily from others' efforts.

**HSM (Hardware Security Module):** A physical device that generates, stores, and uses cryptographic keys without exposing key material to software. Required for production exchange hot wallets. FIPS 140-2 Level 3 is the enterprise standard.

**Impermanent Loss:** The loss experienced by an AMM liquidity provider compared to simply holding the two tokens. Occurs because the AMM rebalances the ratio as prices change, resulting in the LP holding more of the declining asset.

**IPFS (InterPlanetary File System):** A content-addressed distributed storage system. Files are identified by their content hash (CID). Used for storing NFT metadata and images — the NFT contract stores the IPFS URI.

**KYC (Know Your Customer):** Identity verification process required by financial regulators for customer onboarding. Crypto exchanges must collect and verify customer identity before allowing trading.

**L1 (Layer 1):** The base blockchain protocol (Ethereum, Bitcoin, Solana). All security guarantees ultimately derive from the L1 consensus mechanism.

**L2 (Layer 2):** A protocol built on top of an L1 that processes transactions off-chain and settles proofs to the L1. Provides higher throughput and lower cost while inheriting L1 security. Examples: Arbitrum, Optimism, zkSync, Polygon PoS.

**Liquidity Mining:** A DeFi incentive mechanism where a protocol distributes its governance or utility tokens to users who provide liquidity to its pools. Used to bootstrap initial TVL.

**Liquidity Pool:** A smart contract holding two or more tokens that enables decentralized trading. Liquidity providers deposit token pairs; traders swap against the pool and pay fees to LPs.

**Mainnet:** The production blockchain network — as opposed to testnet (development/testing environment). Mainnet transactions use real assets with real value.

**MPC (Multi-Party Computation):** A cryptographic technique distributing a private key among multiple parties such that any M-of-N must cooperate to sign a transaction — without the complete key ever being assembled in one place.

**MEV (Maximal Extractable Value):** Value extracted by validators or searchers by reordering, inserting, or excluding transactions within a block. Includes: arbitrage, liquidation front-running, sandwich attacks.

**Mempool:** The pool of pending, unconfirmed transactions waiting to be included in a block. Transactions in the public mempool are visible to all network participants including MEV searchers.

**Merkle Tree:** A binary tree of hash values where each leaf node contains a data hash and each internal node contains the hash of its children. The root hash (Merkle root) summarizes all data in the tree. Used in blockchain block headers and NFT allowlist verification.

**Metadata (NFT):** The JSON file containing an NFT's attributes, name, description, and image URI. Stored off-chain (IPFS, Arweave) for most collections; stored on-chain for fully on-chain NFTs.

**Mint:** The act of creating a new token or NFT on the blockchain. For NFTs: each newly created token is "minted" to the recipient's wallet.

**MSB (Money Services Business):** A FinCEN classification for businesses exchanging currency, transmitting money, or providing money services. Crypto exchanges and custodial businesses are typically MSBs, requiring FinCEN registration and AML programs.

**MSP (Membership Service Provider):** The identity management component in Hyperledger Fabric. Manages X.509 certificates defining which organizations and identities are authorized to participate in the network.

**Multi-Sig (Multi-Signature):** A wallet requiring M-of-N private key signatures to authorize any transaction. Gnosis Safe is the industry-standard multi-sig implementation. Used for DAO treasuries, exchange admin keys, and protocol governance.

**NYDFS BitLicense:** New York State's cryptocurrency business license, administered by the Department of Financial Services. Required for any business engaging in virtual currency business activity with New York residents. Among the most demanding crypto regulatory requirements in the US.

**Non-Custodial:** A wallet or service where the user controls their own private keys. The service provider cannot access or recover user funds. Examples: MetaMask, Coinbase Wallet (self-custody mode).

**NFT (Non-Fungible Token):** A unique blockchain record proving ownership of a specific item. Implemented as ERC-721 or ERC-1155 on Ethereum. Each NFT has a unique token ID distinguishing it from all other tokens.

**Node:** A computer participating in a blockchain network — storing a copy of the ledger and validating transactions.

**On-Chain:** Data or operations recorded directly on the blockchain. Permanent, publicly verifiable, and trustless but expensive (gas cost) and slow (block time).

**OpenZeppelin:** The provider of the most widely used smart contract security library. OpenZeppelin Contracts includes audited implementations of ERC-20, ERC-721, ERC-1155, access control, and security utilities.

**Oracle:** A service that brings off-chain data (prices, events, random numbers, external API data) onto the blockchain. Blockchain smart contracts cannot access external data without oracles. Chainlink is the dominant oracle network.

**Order Book:** A list of buy and sell orders sorted by price. Used in centralized exchanges (CEX) and some decentralized order book protocols. More complex than AMM but better price discovery for volatile assets.

**PDC (Private Data Collection):** A Hyperledger Fabric mechanism allowing specific organizations within a channel to share data that other channel members cannot see. The hash of private data is stored on the public ledger; the data itself is shared peer-to-peer between authorized organizations only.

**Paymaster (ERC-4337):** A smart contract that sponsors gas fees on behalf of users in an account abstraction transaction. Enables gasless dApps where users never need to hold ETH.

**Private Key:** A 256-bit cryptographic secret that controls a blockchain wallet. Anyone who knows the private key has complete access to all assets in the corresponding wallet. Never shared, never stored online.

**Proof of Stake (PoS):** A consensus mechanism where validators lock (stake) cryptocurrency as collateral to participate in block production. Validators are selected proportionally to their stake. Used by Ethereum post-Merge.

**Proof of Work (PoW):** A consensus mechanism where miners compete to solve a cryptographic puzzle. The first to solve it adds the next block and earns the block reward. Used by Bitcoin. Energy-intensive by design — the energy expenditure makes attacks expensive.

**Proxy Contract:** An upgradeable smart contract architecture where a proxy contract stores state and forwards calls to an implementation contract that contains the business logic. Upgrading the implementation (via governance) allows bug fixes without migrating state.

**Public Key:** The cryptographic counterpart to a private key, derived from it via elliptic curve multiplication. Used to derive the wallet address. Can be shared publicly — it identifies the wallet without giving access to it.

**Reentrancy:** A smart contract vulnerability where an external call (to another contract or to the attacker's contract) allows the callee to re-enter the calling function before state updates complete. The DAO hack ($60M, 2016) was the most famous reentrancy exploit. Prevented by: checks-effects-interactions pattern and ReentrancyGuard.

**Regulation A+:** An SEC exemption allowing public offerings of securities up to $75M from any US investors without full SEC registration. Requires SEC qualification (3–6 months), annual and semi-annual reporting.

**Regulation D:** An SEC exemption allowing private placement of securities to accredited investors without SEC registration. Rule 506(b): no general solicitation. Rule 506(c): general solicitation permitted, mandatory accredited investor verification.

**Rollup:** A Layer 2 scaling solution that processes transactions off-chain and posts compressed proofs to L1. Optimistic rollups use fraud proofs; ZK rollups use cryptographic validity proofs.

**RPC (Remote Procedure Call):** The protocol your application uses to communicate with a blockchain node. RPC endpoints (provided by Alchemy, Infura, QuickNode) allow reading blockchain state and submitting transactions.

**SAR (Suspicious Activity Report):** A mandatory report filed by financial institutions (including MSBs) with FinCEN when they detect potentially suspicious financial activity.

**Seed Phrase (Mnemonic):** The 12- or 24-word human-readable backup of a wallet's master key. Anyone with the seed phrase can recover the wallet and all its assets. Never stored digitally; kept in a secure physical location.

**Slashing:** The penalty in Proof of Stake networks for validator misbehavior. A portion of the validator's staked ETH is destroyed. Disincentivizes attacks and negligence.

**Slippage:** The difference between the expected price of a trade and the price at execution. In AMMs: larger trades have higher slippage because they move the pool's price ratio further from the starting price.

**Smart Contract:** Code deployed on a blockchain that executes automatically when predefined conditions are met. Immutable after deployment. Execution is trustless — no human authorization required.

**Solidity:** The most widely used programming language for Ethereum smart contracts. Statically typed, compiled to EVM bytecode. Syntax resembles JavaScript/C++.

**Stablecoin:** A cryptocurrency designed to maintain a stable value relative to a reference asset (typically the US dollar). Types: fully reserved (USDC, USDT), crypto-collateralized (DAI), algorithmic (FRAX).

**Staking:** Locking cryptocurrency as collateral to participate in network consensus (Proof of Stake) or to earn yield from a DeFi protocol (DeFi staking).

**Subgraph:** A The Graph protocol indexer that converts on-chain events to queryable GraphQL API. Required for any application needing to query historical blockchain data efficiently.

**TWAP (Time-Weighted Average Price):** The average price of an asset over a defined time period. TWAP oracles are resistant to flash loan price manipulation because manipulating the TWAP requires holding the manipulated price for the entire averaging period.

**Testnet:** A blockchain network used for development and testing with no real value. Ethereum testnets: Sepolia, Holesky. Tokens on testnets are free — obtained from faucets.

**TimelockController:** A smart contract that enforces a mandatory delay between when a governance proposal passes and when it can be executed. Standard governance security mechanism to allow community review of passed proposals.

**Token:** A digital asset issued on a blockchain. Fungible tokens: ERC-20. Non-fungible tokens: ERC-721, ERC-1155.

**Tokenomics:** The economic design of a token — total supply, distribution, vesting, emission schedule, governance rights, and utility. Well-designed tokenomics sustains the protocol through market cycles; poorly designed tokenomics leads to death spirals.

**TVL (Total Value Locked):** The total value of assets deposited in a DeFi protocol, measured in USD. TVL is the primary measure of protocol adoption and trust.

**USDC:** USD Coin — a fully reserved US dollar stablecoin issued by Circle. Each USDC is backed by $1 in US Treasury bills or bank deposits. The standard stablecoin for US business applications.

**Validator:** A participant in a Proof of Stake blockchain network that proposes and attests to blocks. Ethereum validators stake 32 ETH. Earning: block rewards + transaction fees + MEV.

**Verifiable Credential:** A W3C standard for cryptographically signed digital documents representing claims (identity, credentials, certifications). The holder controls sharing; verifiers confirm the issuer's cryptographic signature without calling the issuer.

**VRF (Verifiable Random Function):** A cryptographic function producing random output with a proof of correctness. Chainlink VRF provides provably fair random numbers to smart contracts — used for NFT trait assignment and gaming randomness.

**Wallet:** Software or hardware that manages cryptographic keys allowing users to interact with blockchains. Custodial: the service holds keys. Non-custodial: the user holds keys.

**WalletConnect:** An open protocol enabling secure connection between cryptocurrency wallets and dApps via QR code or deep link. WalletConnect v2 supports 300+ wallets with a single integration.

**Web3:** The third generation of the internet — characterized by user ownership of data and digital assets through blockchain technology, as opposed to Web2 where platforms own user data.

**Whitelist (Allowlist):** A list of approved wallet addresses in an NFT collection or protocol. Only allowlisted addresses can participate in a designated phase (early mint, private sale, governance). Implemented gas-efficiently using Merkle trees.

**Yield Aggregator:** A DeFi protocol that automatically moves capital between yield-generating protocols to maximize returns. Yearn Finance invented the category. Auto-compounds rewards — reinvesting earned tokens to earn yield on yield.

**ZK Proof (Zero-Knowledge Proof):** A cryptographic method allowing one party to prove knowledge of information without revealing the information itself. ZK rollups use ZK proofs to prove transaction validity to Ethereum L1 without revealing every transaction detail.

---

*[→ Need a term explained further? Book a free strategy call.](/blockchain-development-services/)*

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

**SCHEMA:** Article + DefinedTerm (per entry) + BreadcrumbList + FAQPage
