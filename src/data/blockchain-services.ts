import {
  Hexagon,
  FileCode,
  Globe,
  Network,
  Wallet,
  Image as ImageIcon,
  Coins,
  type LucideIcon,
} from "lucide-react";

export type BlockchainService = {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: LucideIcon;
  technologies: string[];
  benefits: string[];
  accent: "primary" | "secondary" | "tertiary" | "success";
};

export const blockchainServices: BlockchainService[] = [
  {
    slug: "blockchain-development",
    title: "Blockchain Development",
    shortDescription: "Custom L1, L2 and sidechain protocols built for scale.",
    fullDescription:
      "Custom blockchain solutions from scratch — Layer 1, Layer 2, sidechains, and private networks with enterprise consensus and validator infrastructure.",
    icon: Hexagon,
    technologies: ["Solidity", "Rust", "Go", "Cosmos SDK", "Substrate"],
    benefits: ["Custom consensus", "Validator setup", "Cross-chain ready"],
    accent: "primary",
  },
  {
    slug: "smart-contract-development",
    title: "Smart Contracts",
    shortDescription: "Audit-ready contracts for DeFi, NFTs and DAOs.",
    fullDescription:
      "Audit-ready smart contracts for DeFi, NFTs, and DAOs. Gas optimization, security patterns, and formal verification baked in.",
    icon: FileCode,
    technologies: ["Solidity", "Vyper", "Hardhat", "Foundry"],
    benefits: ["Formal verification", "Gas optimization", "Audit-ready"],
    accent: "secondary",
  },
  {
    slug: "dapp-development",
    title: "DApp Development",
    shortDescription: "Full-stack DApps with seamless Web3 UX.",
    fullDescription:
      "Full-stack decentralized applications with wallet connectivity, smart contract interaction, and real-time blockchain data.",
    icon: Globe,
    technologies: ["React", "Next.js", "Wagmi", "Ethers.js"],
    benefits: ["Wallet integration", "Real-time data", "Friendly UX"],
    accent: "primary",
  },
  {
    slug: "web3-development",
    title: "Web3 Development",
    shortDescription: "End-to-end Web3 product engineering.",
    fullDescription:
      "End-to-end Web3 product development — from authentication to indexing. TheGraph, IPFS, ENS, and decentralized storage.",
    icon: Network,
    technologies: ["TheGraph", "IPFS", "Arweave", "ENS"],
    benefits: ["Decentralized storage", "Indexing", "ENS integration"],
    accent: "tertiary",
  },
  {
    slug: "crypto-wallet-development",
    title: "Crypto Wallets",
    shortDescription: "Non-custodial wallets with multi-chain support.",
    fullDescription:
      "Non-custodial and custodial wallets with multi-chain support, transaction signing, and hardware wallet integration.",
    icon: Wallet,
    technologies: ["React Native", "Web3Auth", "WalletConnect"],
    benefits: ["Multi-chain", "Key management", "Hardware support"],
    accent: "success",
  },
  {
    slug: "nft-marketplace-development",
    title: "NFT Marketplaces",
    shortDescription: "Marketplaces with minting, trading and royalties.",
    fullDescription:
      "Custom NFT marketplaces with minting, trading, royalties, and cross-chain NFT support — ERC-721 and ERC-1155.",
    icon: ImageIcon,
    technologies: ["ThirdWeb", "Moralis", "OpenZeppelin", "Pinata"],
    benefits: ["Royalty logic", "Cross-chain NFTs", "Bulk minting"],
    accent: "secondary",
  },
  {
    slug: "token-development",
    title: "Token Development",
    shortDescription: "Token standards, presale and tokenomics.",
    fullDescription:
      "ERC-20, ERC-721, ERC-1155 and custom token standards. Presale contracts, vesting schedules, and tokenomics consulting.",
    icon: Coins,
    technologies: ["OpenZeppelin", "Vesting", "ERC standards"],
    benefits: ["Tokenomics design", "Presale contracts", "Liquidity locking"],
    accent: "tertiary",
  },
];