## H1: DeFi Protocol FAQ Hub — 25 Questions Developers and Investors Ask

**URL:** /faq/defi-protocol/
**Schema:** FAQPage, BreadcrumbList
**Internal Links:** /defi-development-company/, /defi-development-cost/, /defi-tokenomics-stress-testing/

**Q1: What is TVL and how is it calculated?**
TVL (Total Value Locked) is the total dollar value of assets deposited in a DeFi protocol. Calculated by: sum of all asset balances × their current USD prices. Tracked by DeFiLlama. TVL is the most common DeFi adoption metric but imperfect — protocols can inflate TVL by accepting their own governance tokens as collateral.

**Q2: What is a flash loan?**
An uncollateralized loan that must be borrowed and repaid within a single transaction. If not repaid within the same block: the entire transaction reverts as if it never happened. Used legitimately for: arbitrage, liquidations, collateral swaps. Used maliciously for: oracle manipulation attacks.

**Q3: What is impermanent loss?**
The difference in value between holding tokens in a liquidity pool vs holding them in a wallet when prices change. When ETH rises 100%, the AMM automatically sells your ETH for USDC — you end up with less ETH (and more USDC) than if you'd just held. The "loss" is relative to a simple hold strategy.

**Q4: What is a vault (ERC-4626)?**
A standardized smart contract interface for yield-bearing tokens. ERC-4626 defines: deposit(), withdraw(), mint(), redeem() with standard accounting. Any yield-aggregator or integration that supports ERC-4626 automatically works with all ERC-4626-compliant vaults — this composability is the standard's main value.

**Q5: What is real yield vs inflationary yield?**
Real yield: protocol revenue (trading fees, liquidation fees) distributed to stakers in stable assets (USDC, ETH). Inflationary yield: staking rewards paid in the protocol's own governance token, financed by new token emission. Real yield is sustainable; inflationary yield dilutes existing holders.

**Q6: What is protocol-owned liquidity (POL)?**
A protocol that owns its own LP positions rather than renting liquidity from yield farmers. OlympusDAO pioneered this via bonds: users sell LP tokens to the protocol at a discount in exchange for vesting protocol tokens. The protocol accumulates LP permanently.

**Q7: What is MEV?**
Maximal Extractable Value — value extracted by validators (or searchers who bribe validators) by reordering, inserting, or excluding transactions in a block. Examples: front-running a large DEX trade, sandwich attacking a swap, arbitraging between DEXes when prices diverge.

**Q8: What is a TWAP oracle?**
Time-Weighted Average Price — calculated from the DEX's on-chain price history over a window (typically 30 minutes). More manipulation-resistant than spot price because sustained manipulation requires holding a large position for the entire time window. Used as a secondary oracle check alongside Chainlink.

**Q9: What is a delta-neutral strategy?**
A position that earns yield while being neutral to price movements. Example: deposit ETH to earn staking yield while simultaneously shorting ETH perpetuals. Net price exposure: approximately zero. Net yield: staking APY + funding rate (if positive).

**Q10: What is the veToken model?**
Vote-escrowed tokens: tokens locked for a fixed period in exchange for governance power and fee share. Longer locks = more voting power. veTokens decay over time. Users who commit long-term get more say. Pioneered by Curve Finance's veCRV; adopted by Balancer, Frax, many others.

**Q11: What is a liquidity bootstrapping pool (LBP)?**
A Balancer-style pool where starting weights heavily favor the project token (e.g., 96/4 project/USDC), then gradually shift to equal (50/50) over hours or days. This creates a Dutch-auction-like price discovery that resists front-running and benefits organic buyers.

**Q12: What is the difference between APR and APY in DeFi?**
APR: simple annual return without compounding. APY: compounded annual return. A 100% APR compounded daily = 172% APY. DeFi protocols that auto-compound your rewards display APY; those requiring manual claiming display APR. Always compare same metric.

**Q13: What is a perpetuals protocol?**
A decentralized exchange for perpetual futures — derivative contracts with no expiry date. Users can long/short crypto with leverage. Revenue from: trading fees + funding rates (paid between longs and shorts to keep perpetuals price anchored to spot). GMX, Synthetix Perps, and dYdX are major examples.

**Q14: What is funding rate?**
In perpetuals: a periodic payment between long and short position holders. When longs outweigh shorts: longs pay shorts (positive funding rate). When shorts outweigh longs: shorts pay longs (negative funding rate). Funding rates keep perpetuals prices anchored to spot prices.

**Q15: What is an automated portfolio rebalancer?**
A DeFi protocol that automatically rebalances a portfolio to target allocations when they drift. Example: maintain 50% ETH / 50% BTC. When ETH rises: automatically sells ETH, buys BTC to restore 50/50. Generates fees for liquidity providers from the rebalancing trades.

**Q16: What is composability in DeFi?**
The ability to combine multiple DeFi protocols into complex financial products because they share open standards. Example: Yearn Finance is built by combining Aave lending + Uniswap liquidity + Chainlink oracles + other protocols — Yearn didn't build any of those primitives.

**Q17: What is a CDP (Collateralized Debt Position)?**
A debt position where you deposit collateral and mint a stablecoin against it. MakerDAO: deposit ETH, mint DAI. You own the minted DAI; if your collateral falls below the liquidation ratio, your CDP is liquidated. The stablecoin's peg is maintained by the liquidation mechanism.

**Q18: What is a stable swap (Curve-style)?**
An AMM optimized for assets that should trade at or near 1:1 (stablecoins, liquid staking tokens). The stable swap curve concentrates liquidity near the peg, enabling very low slippage for large stable-to-stable trades. Curve Finance pioneered this model.

**Q19: What is liquidity fragmentation?**
When the same asset's liquidity is split across many DEX pools, each with insufficient depth. Result: high slippage for large trades. Aggregators like 1inch solve this by routing through multiple pools. Protocol design choices (concentrated liquidity, single canonical pool) reduce fragmentation.

**Q20: What is a MEV bot?**
An automated program that monitors the public mempool for profitable MEV opportunities and submits competing transactions with higher fees to capture them. Categories: arbitrage bots, sandwich bots, liquidation bots. Searchers submit bundles to Flashbots to avoid competing bots seeing their strategy.

**Q21: What is gas optimization in smart contracts?**
Writing contract code that uses less gas per operation — reducing transaction costs for users. Techniques: pack struct variables to share storage slots, use custom errors instead of string errors, cache frequently read storage variables in memory, minimize on-chain storage.

**Q22: What is a bonding mechanism?**
A way for protocols to acquire liquidity or treasury assets by offering discounted protocol tokens in exchange. OlympusDAO's bond: sell ETH/DAI LP tokens to the protocol at a 5% discount; receive protocol tokens vesting over 5 days.

**Q23: What is protocol governance?**
The system through which token holders propose and vote on changes to protocol parameters (fees, supported assets, emission rates, upgrades). On-chain governance: votes execute automatically via smart contracts. Off-chain governance: votes are signals; core team implements them.

**Q24: What is a stablecoin depeg?**
When a stablecoin trades significantly above or below its target price ($1.00 for USD stablecoins). Depeg events signal a breakdown in the mechanisms maintaining the peg. USD Coin (USDC) briefly depegged to $0.87 in March 2023 due to the Silicon Valley Bank exposure panic.

**Q25: What is the relationship between TVL and market cap?**
TVL measures capital deposited; market cap measures total token valuation. The TVL/MC ratio reveals "how much real capital is backing the protocol's token value." A ratio < 1 means the token is valued higher than the protocol's deposited assets — common for valuable ecosystems; extreme ratios > 50x indicate speculative excess.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---

## H1: NFT Platform FAQ Hub — 25 Questions From Creators, Collectors, and Brands

**URL:** /faq/nft-platform/
**Schema:** FAQPage, BreadcrumbList
**Internal Links:** /nft-development-company/, /nft-marketplace-development/, /nft-development-cost/

**Q1: What blockchain should I mint my NFT on?**
For maximum visibility/buyers: Ethereum mainnet or Polygon PoS. For lowest cost: Polygon, Arbitrum, or Immutable zkEVM (free minting). For Solana ecosystem: Solana. Decision factors: your audience (where your buyers already have wallets), mint budget, desired secondary marketplace availability.

**Q2: How much does it cost to mint an NFT?**
Gas cost per mint: Ethereum mainnet $5–$50, Arbitrum $0.05–$0.50, Polygon $0.001–$0.01, Solana $0.0005, Immutable zkEVM $0 (gas-sponsored). IPFS/Arweave storage: $500–$2,000 one-time for a 10,000-piece collection. Smart contract deployment: $15,000–$40,000 (development + audit).

**Q3: What is the difference between ERC-721 and ERC-1155?**
ERC-721: each token ID is unique (1-of-1 or unique within a collection). ERC-1155: multiple copies can exist per token ID (editions). Use ERC-721 for: unique art, PFP collections. Use ERC-1155 for: game items (100 bronze swords), edition prints, event tickets (500 general admission passes).

**Q4: Can I make changes to my NFT's metadata after minting?**
If your contract allows the owner to update tokenURI: yes. If the tokenURI is frozen at mint: no. Immutable metadata is a feature for valuable collections (collectors trust what they bought). Mutable metadata is a feature for dynamic NFTs (the image changes based on game state, real-world events, etc.).

**Q5: What is lazy minting and how does it work?**
Lazy minting defers on-chain NFT creation until first purchase. The creator signs off-chain metadata; the smart contract mints the NFT when a buyer purchases it (buyer pays gas). Benefit: creator pays zero gas before a sale. Used by OpenSea, Rarible, and others.

**Q6: How do I store NFT metadata so it doesn't disappear?**
IPFS with pinning: use Pinata or NFT.Storage to permanently pin your metadata. Arweave: one-time payment, permanent storage guaranteed. On-chain: SVG or small metadata stored directly in the contract (permanent as long as Ethereum exists, but expensive for large images). Never use centralized servers for permanent NFTs.

**Q7: What is a floor price?**
The lowest listed price of any NFT in a collection. Not stored on-chain — calculated by aggregating listings from OpenSea, Blur, and other marketplaces. Floor price is the most commonly cited valuation metric for collections.

**Q8: What is an NFT reveal?**
A mechanism where NFTs are minted showing a placeholder image and traits are assigned later. Before reveal: all NFTs look identical. At reveal: a random seed assigns unique traits to each token ID. Prevents buyers from cherry-picking rare traits before minting, and creates a community reveal event.

**Q9: How do I prevent sniping during an NFT mint?**
Sniping: bots detect when rare traits will be assigned and mint specific token IDs. Defenses: commit-reveal scheme (traits assigned post-mint via verifiable random seed), fixed trait-per-tokenId assignment (same order always — reveals are just making the assignments public), no correlation between mint order and rarity.

**Q10: What are the most common NFT marketplace fees?**
OpenSea: 2.5% platform fee. Blur: 0% platform fee (paid via token incentives). MagicEden: 2% platform fee. Foundation: 5% platform fee. Creator royalties are additional (ERC-2981 standard: 5–10% typical).

**Q11: Can I list the same NFT on multiple marketplaces simultaneously?**
Yes — your wallet controls the NFT; multiple marketplaces can simultaneously display listings you signed. Risk: if you sell on OpenSea and then forget to cancel the Blur listing, someone could buy the same NFT on Blur (which you no longer own). Canceling listings requires gas.

**Q12: What is a mint pass?**
An NFT granting the holder the right to mint one or more NFTs from an upcoming collection. Sold before the main collection launch to generate revenue and build community. Mint pass holders guaranteed access without competing in a public mint. Often transferable — creates a secondary market before the main collection launches.

**Q13: What is the Seaport protocol?**
OpenSea's open-source marketplace smart contract. The most widely adopted NFT marketplace protocol. Supports: fixed price listings, English auctions, Dutch auctions, bundle sales, private listings. Compliant marketplaces all read and fill Seaport orders — making listings cross-compatible.

**Q14: What is an NFT burn and when would you use it?**
Permanently destroying an NFT by sending it to the zero address (0x000...dead) or calling a burn function. Use cases: burning to upgrade (burn V1 NFT to receive V2), burning for token redemption (burn NFT to receive physical item), deflationary collection mechanics (burn floor NFTs to increase rarity of remaining tokens).

**Q15: What is a whitelist/allowlist for an NFT project?**
A list of wallet addresses pre-approved to mint before the public sale. Benefits: rewards early community members, reduces gas wars, enables discounted pricing for early supporters. Allowlists are typically earned through community participation tasks.

**Q16: What is a 1/1 NFT?**
A single-edition NFT — only one token exists with that specific artwork/asset. Opposite of a generative collection (many similar tokens). 1/1s are the category most similar to traditional fine art. Primary market: Foundation, SuperRare, MakersPlace.

**Q17: What is the difference between a profile picture (PFP) NFT and a generative art NFT?**
PFP collection: thousands of similar-style portrait images with varying traits (sunglasses, hats, backgrounds), meant to be used as social media profile pictures. Generative art: algorithmically created artwork using code as the artistic medium, typically valued for the algorithm's aesthetic output rather than trait rarity.

**Q18: How do secondary royalties work if a buyer resells on a different marketplace?**
ERC-2981 royalties are enforced by the marketplace, not the contract. If Buyer sells on OpenSea (enforces royalties): creator gets paid. If Buyer sends directly to a new owner without marketplace: no royalty. For guaranteed royalties: implement transfer restrictions that allow only royalty-paying operators.

**Q19: What is the difference between a creator royalty and a platform fee?**
Creator royalty: paid to the original artist/creator on secondary sales (ERC-2981, 5–10%). Platform fee: retained by the marketplace (OpenSea 2.5%, etc.) from every sale. Both are deducted from the sale price before the seller receives their proceeds.

**Q20: What is an NFT bridge?**
A mechanism for moving an NFT from one blockchain to another. The NFT is locked on Chain A; a wrapped version is minted on Chain B. Bridging NFTs is riskier than bridging fungible tokens (liquidity concerns) and is relatively rare. Most NFTs stay on their native chain.

**Q21: What wallets support NFTs?**
MetaMask (most common browser extension), Coinbase Wallet, Trust Wallet, Rainbow Wallet, and Phantom (Solana). All display ERC-721 and ERC-1155 tokens. Hardware wallets (Ledger, Trezor) also support NFT ownership viewing, though interaction requires the companion app.

**Q22: What is gasless minting and how is it possible?**
The creator or a relayer sponsors the gas fee, allowing users to mint without holding ETH. Implementation: meta-transactions (user signs a message; relayer submits transaction and pays gas) or lazy minting (no gas until first sale). The gas is paid — just not by the minter.

**Q23: What is an NFT fractionalization?**
Splitting ownership of an NFT into fungible ERC-20 tokens. Example: split ownership of a valuable BAYC into 1,000,000 FRAC tokens at $0.10 each. The BAYC is held in a vault contract; FRAC token holders own proportional economic rights. Used for expensive collectibles to enable broader ownership.

**Q24: What is an NFT index fund?**
A basket of NFTs held in a smart contract, with ownership represented by fungible tokens. Allows broad exposure to a collection without buying individual high-priced NFTs. NFTX pioneered this model for collections like CryptoPunks and Bored Apes.

**Q25: How do I verify an NFT's authenticity?**
Three verification steps: (1) confirm the contract address matches the official collection address (posted by the creator on their website/Twitter), (2) confirm the token ID falls within the collection's range, (3) confirm the metadata IPFS hash hasn't been altered. All verifiable via Etherscan or the blockchain explorer.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**
