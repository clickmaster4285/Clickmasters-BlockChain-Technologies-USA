// Page definitions for the "What We Do → Blockchain Engineering" pages.
// SEO titles / descriptions come from each page's on-page SEO brief in /content.
// `heading` = start of the H2/H3 the image is placed under (case-insensitive).

export const PAGES = [
  {
    key: "blockchain-development-services",
    source:
      "blockchain-development-services/new-blockchain-development-content.md",
    h1: "Blockchain Development Services",
    path: "/service/blockchain-development-services",
    navLabel: "Blockchain Development",
    kicker: "Blockchain Engineering",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/service" },
    ],
    meta: {
      title: "Blockchain Development Services for Business",
      description:
        "Blockchain development services from architecture to launch: smart contracts, dApps, custom and enterprise blockchain software. Book a scoping call.",
    },
    imageDir: "blockchain-development-services",
    hero: {
      file: "blockchain-application-architecture.webp",
      alt: "Layered architecture of a blockchain application, from user app and backend to smart contracts and network",
    },
    images: [
      {
        heading: "Our Blockchain Development Services",
        file: "blockchain-development-services-map.webp",
        alt: "Map of ClickMasters blockchain development services grouped by on-chain, application and enterprise work",
      },
      {
        heading: "Choosing the Right Blockchain Network",
        file: "blockchain-network-comparison.webp",
        alt: "Comparison of public, Layer 2 and permissioned blockchain networks by openness and privacy",
      },
      {
        heading: "How We Build",
        file: "blockchain-development-process.webp",
        alt: "Six-phase blockchain development process from discovery to post-launch operations",
        w: 1600,
        h: 650,
      },
      {
        heading: "Security, Testing and Quality Assurance",
        file: "smart-contract-security-layers.webp",
        alt: "Smart contract security layers: secure design, coding, testing, audit and monitoring",
      },
      {
        heading: "Blockchain Applications by Industry",
        file: "blockchain-industry-use-cases.webp",
        alt: "Blockchain use cases across finance, real estate, supply chain, healthcare, gaming and retail",
      },
    ],
  },
  {
    key: "cosmos-sdk-appchain-development",
    source: "cosmos-sdk-appchain-seo/05-new-cosmos-appchain-content.md",
    h1: "Cosmos SDK Appchain Development Services",
    path: "/service/cosmos-sdk-appchain-development",
    navLabel: "Custom Blockchain Development",
    kicker: "Custom Blockchain Development",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/service" },
    ],
    meta: {
      title: "Cosmos SDK Appchain Development Services",
      description:
        "Build a sovereign Cosmos SDK appchain: custom Go modules, CometBFT, IBC to Cosmos and Ethereum, validators and mainnet launch. Book an architecture review.",
    },
    imageDir: "cosmos-sdk-appchain",
    og: "cosmos-sdk-appchain-development-og.webp",
    hero: {
      file: "cosmos-sdk-appchain-architecture-overview.webp",
      alt: "Cosmos SDK appchain architecture showing custom modules, CometBFT consensus and IBC connections",
    },
    images: [
      {
        heading: "Do You Need a Cosmos Appchain",
        file: "appchain-vs-smart-contract-vs-rollup-decision-tree.webp",
        alt: "Decision tree comparing smart contracts, rollups and Cosmos appchains",
      },
      {
        heading: "Cosmos SDK, CometBFT, IBC and the Cosmos Hub",
        file: "abci-2-cometbft-cosmos-sdk-block-flow.webp",
        alt: "ABCI 2.0 block flow between CometBFT and a Cosmos SDK application",
      },
      {
        heading: "Custom Cosmos Blockchain Development",
        file: "cosmos-sdk-custom-module-anatomy.webp",
        alt: "Anatomy of a custom Cosmos SDK module with keeper, message server and store",
      },
      {
        heading: "How IBC works",
        file: "ibc-light-clients-connections-channels-packets.webp",
        alt: "How IBC works: light clients, connections, channels and packets relayed between two chains",
      },
      {
        heading: "IBC v2",
        file: "ibc-v2-cosmos-ethereum-connection.webp",
        alt: "IBC v2 connection between a Cosmos appchain and Ethereum",
      },
      {
        heading: "Validator and Node Infrastructure",
        file: "cosmos-validator-sentry-node-architecture.webp",
        alt: "Cosmos validator infrastructure with sentry nodes, remote signer and monitoring",
      },
      {
        heading: "From Testnet to Mainnet",
        file: "cosmos-appchain-testnet-to-mainnet-launch-timeline.webp",
        alt: "Cosmos appchain launch timeline from devnet to mainnet genesis",
        w: 1600,
        h: 640,
      },
      {
        heading: "After Mainnet",
        file: "cosmos-chain-upgrade-cosmovisor-flow.webp",
        alt: "Cosmos SDK chain upgrade flow using governance and Cosmovisor",
        w: 1600,
        h: 680,
      },
    ],
  },
  {
    key: "web3-mobile-app-development",
    source: "web3-mobile-app-seo/05-new-web3-mobile-app-content.md",
    h1: "Web3 Mobile App Development Services",
    path: "/service/web3-mobile-app-development",
    navLabel: "Blockchain App Development",
    kicker: "Blockchain App Development",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/service" },
    ],
    meta: {
      title: "Web3 Mobile App Development for iOS & Android",
      description:
        "Web3 mobile app development for iOS and Android: wallet connection, embedded wallets, smart contract integration and secure signing. Book a free call.",
    },
    imageDir: "web3-mobile-app",
    og: "og-web3-mobile-app-development.webp",
    hero: {
      file: "web3-mobile-app-development-ios-android.webp",
      alt: "Web3 mobile app development: iOS and Android app screens showing wallet connection and a transaction preview",
    },
    images: [
      {
        heading: "What Web3 Mobile App Development Actually Involves",
        file: "web3-mobile-app-architecture-layers.webp",
        alt: "Diagram of Web3 mobile app architecture: mobile client, wallet and signing layer, backend and indexer, blockchain network",
      },
      {
        heading: "External Wallet Connection",
        file: "walletconnect-mobile-deep-link-flow.webp",
        alt: "Mobile wallet connection flow using WalletConnect deep links between a dApp and a wallet app",
      },
      {
        heading: "Which Wallet Model Fits",
        file: "embedded-wallet-vs-external-wallet-onboarding.webp",
        alt: "Comparison of embedded wallet onboarding with email or passkey versus connecting an external crypto wallet",
      },
      {
        heading: "Transaction Signing Users Can Understand",
        file: "readable-transaction-signing-mobile-ui.webp",
        alt: "Mobile transaction signing screen showing readable approval details, network fee in dollars and confirmation status",
      },
      {
        heading: "Private Key Protection",
        file: "mobile-wallet-private-key-protection-secure-enclave.webp",
        alt: "How a mobile wallet protects private keys: encryption with a Secure Enclave or Android Keystore key and biometric unlock",
      },
      {
        heading: "Native vs Cross-Platform",
        file: "react-native-flutter-native-web3-comparison.webp",
        alt: "Comparison of React Native, Flutter and native Swift/Kotlin for Web3 mobile app development",
      },
      {
        heading: "Our Web3 Mobile App Development Process",
        file: "web3-mobile-app-development-process.webp",
        alt: "Six-step Web3 mobile app development process from discovery to store launch and support",
        w: 1600,
        h: 650,
      },
    ],
  },
  {
    key: "smart-contract-development",
    source:
      "smart-contract-development-seo/05-new-smart-contract-development-content.md",
    h1: "Smart Contract Development Services",
    path: "/service/smart-contract-development",
    navLabel: "Smart Contract Development",
    kicker: "Smart Contract Development",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/service" },
    ],
    meta: {
      title: "Smart Contract Development Services",
      description:
        "Smart contract development services for Ethereum, EVM chains and Solana: Solidity and Rust engineering, fuzz and invariant testing, audit-ready delivery.",
    },
    imageDir: "smart-contract-development",
    og: "smart-contract-development-services-lifecycle-og.webp",
    hero: {
      file: "smart-contract-development-services-lifecycle.webp",
      alt: "Smart contract development services lifecycle from specification to post-launch monitoring",
    },
    images: [
      {
        heading: "Before Writing Code",
        file: "on-chain-vs-off-chain-smart-contract-design.webp",
        alt: "Diagram showing which product components belong in a smart contract and which stay off-chain",
      },
      {
        heading: "Programming Languages and Blockchain Networks",
        file: "smart-contract-languages-by-blockchain.webp",
        alt: "Smart contract programming languages mapped to the blockchain networks they run on",
      },
      {
        heading: "Access Control and Admin Key Design",
        file: "smart-contract-access-control-multisig-timelock.webp",
        alt: "Smart contract admin roles held by a multisig and executed through a timelock",
      },
      {
        heading: "Upgradeable or Immutable",
        file: "upgradeable-smart-contract-proxy-architecture.webp",
        alt: "Upgradeable smart contract proxy architecture separating storage from logic",
      },
      {
        heading: "Our Smart Contract Testing Layers",
        file: "smart-contract-testing-layers.webp",
        alt: "Smart contract testing layers including fuzz, invariant and mainnet fork tests",
      },
      {
        heading: "Development Testing vs. an Independent",
        file: "smart-contract-testing-vs-independent-audit.webp",
        alt: "Comparison of internal smart contract testing and an independent security audit",
      },
      {
        heading: "Our Smart Contract Development Process",
        file: "smart-contract-development-process.webp",
        alt: "Seven-step smart contract development process with deliverables at each stage",
        w: 1600,
        h: 650,
      },
    ],
  },
  {
    key: "enterprise-blockchain-solutions",
    source:
      "enterprise-blockchain-solutions-seo/05-new-enterprise-blockchain-content.md",
    h1: "Enterprise Blockchain Solutions",
    path: "/service/enterprise-blockchain-solutions",
    navLabel: "Enterprise Blockchain Development",
    kicker: "Enterprise Blockchain Development",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Services", path: "/service" },
    ],
    meta: {
      title: "Enterprise Blockchain Solutions & Development",
      description:
        "Enterprise blockchain solutions for multi-party processes: consulting, Hyperledger Fabric and Besu networks, ERP integration, security and operations.",
    },
    imageDir: "enterprise-blockchain-solutions",
    og: "enterprise-blockchain-solutions-og.webp",
    hero: {
      file: "enterprise-blockchain-shared-ledger.webp",
      alt: "Four organizations sharing one permissioned blockchain ledger, each running its own node",
    },
    images: [
      {
        heading: "Public, Private, Permissioned and Consortium",
        file: "blockchain-network-types-comparison.webp",
        alt: "Comparison of public, private, permissioned and consortium blockchain networks",
      },
      {
        heading: "Is Blockchain the Right Choice",
        file: "do-you-need-blockchain-decision-flow.webp",
        alt: "Decision flowchart for deciding whether a business needs blockchain or a database",
      },
      {
        heading: "Enterprise Blockchain Platforms",
        file: "hyperledger-fabric-vs-besu-data-visibility.webp",
        alt: "How data visibility differs between Hyperledger Fabric channels and a Hyperledger Besu network",
      },
      {
        heading: "How a Production Enterprise Network Is Built",
        file: "enterprise-blockchain-architecture-layers.webp",
        alt: "Layers of a production enterprise blockchain architecture, from nodes to applications",
      },
      {
        heading: "Integrating Blockchain with ERP",
        file: "blockchain-erp-integration-pattern.webp",
        alt: "Event-driven integration between an ERP system and an enterprise blockchain network",
      },
      {
        heading: "How We Deliver Enterprise Blockchain Projects",
        file: "enterprise-blockchain-delivery-process.webp",
        alt: "Nine stages of enterprise blockchain delivery, from discovery to ongoing maintenance",
        w: 1600,
        h: 760,
      },
    ],
  },
  {
    key: "blockchain-oracle-integration",
    source:
      "blockchain-oracle-integration-seo/05-new-blockchain-oracle-integration-content.md",
    h1: "Blockchain Oracle Integration Services",
    path: "/process/blockchain-oracle-integration",
    navLabel: "Blockchain Integration",
    kicker: "Blockchain Integration",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Development Process", path: "/process" },
    ],
    meta: {
      title: "Blockchain Oracle Integration Services",
      description:
        "Blockchain oracle integration for DeFi, tokenization, insurance and enterprise apps. We connect Chainlink, Pyth and custom oracles with stale-data checks.",
    },
    imageDir: "blockchain-oracle-integration",
    hero: {
      file: "blockchain-oracle-integration-hero.webp",
      alt: "Diagram of off-chain data flowing through an oracle into a smart contract",
    },
    images: [
      {
        heading: "How an Oracle Integration Works",
        file: "oracle-integration-data-flow.webp",
        alt: "Seven-step flow of data from an external source through oracle nodes and aggregation to a consumer smart contract",
      },
      {
        heading: "Types of Oracle Integration",
        file: "push-vs-pull-oracle-models.webp",
        alt: "Comparison of push-based and pull-based oracle data delivery",
      },
      {
        heading: "Connecting External APIs",
        file: "api-to-smart-contract-oracle-workflow.webp",
        alt: "Oracle workflow querying two flight-data APIs and paying an insurance claim on-chain",
      },
      {
        heading: "Oracle Security and Data Reliability",
        file: "oracle-failure-handling-flow.webp",
        alt: "Decision flow showing how a contract handles stale, invalid or conflicting oracle data",
      },
      {
        heading: "Our Blockchain Oracle Integration Process",
        file: "oracle-integration-process.webp",
        alt: "Eight-phase blockchain oracle integration process from assessment to monitoring",
        w: 1600,
        h: 760,
      },
    ],
  },
];
