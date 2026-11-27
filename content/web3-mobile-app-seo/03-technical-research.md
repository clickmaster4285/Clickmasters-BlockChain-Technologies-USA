# 03 — Technical Research: Web3 Mobile App Development

Research date: 26 November 2026
Purpose: Check every technical claim on the new service page against current official documentation, and record the outdated names and claims the page must avoid.

> **How these facts were checked.** Facts marked **[V]** were checked against an official or primary source, listed in the Sources section. Facts marked **[K]** are stable, well-known standards that weren't re-fetched this session. Some official domains (developer.apple.com HTML pages, developer.android.com, docs.solana.com, docs.solanamobile.com) failed to resolve from the research environment. For those, facts were taken from official search snippets or official PDFs, and they're marked as such.

---

## 1. Avoid list: outdated names and claims

These are mistakes competitor pages make, or would make if copied from 2023–2024 content. The new page avoids all of them.

| Don't say | Say instead | Status |
|---|---|---|
| "Web3Modal" / "Web3Wallet" (WalletConnect SDKs) | **Reown AppKit** (dApp side), **WalletKit** (wallet side) | [V] renamed; WalletKit docs now live on WalletConnect Docs |
| "MetaMask SDK" as the current product | **MetaMask Connect** (`@metamask/connect-evm`, `connect-multichain`, `connect-solana`); old SDK is "legacy" | [V] |
| "Web3Auth" as an independent company | **MetaMask Embedded Wallets** (Consensys acquired Web3Auth, June 2025) | [V] |
| "Coinbase Wallet SDK" / "Coinbase Smart Wallet" as current | **Base Account** (Base Account SDK); Coinbase Wallet SDK is legacy | [V] |
| Magic as an independent embedded-wallet vendor | Payward (Kraken) acquired the Magic Labs embedded-wallet business (July 2026) | [V] — safest not to name |
| "Private keys are stored in the Secure Enclave" | The Secure Enclave holds **P-256 keys only**. secp256k1 / ed25519 wallet keys are *encrypted by* an enclave-protected key and stored in the Keychain | [V] |
| "Solana Mobile Wallet Adapter works on iOS" | MWA is **Android-only**; iOS needs embedded wallets, passkeys or Safari extension wallets | [V] |
| Recommend `EncryptedSharedPreferences` | `androidx.security:security-crypto` is **deprecated**. Use Android Keystore + Tink, or DataStore + Tink | [V] |
| "The Graph hosted service" | Hosted service **sunset**. Use The Graph Network / Substreams, or Goldsky | [V] |
| React Native "New Architecture is opt-in" | New Architecture is the **only** architecture since 0.82 | [V] |
| "P-256 precompile is coming to Ethereum" | **Live** on Ethereum mainnet via EIP-7951 in the Fusaka upgrade (3 Dec 2025) | [V] |
| EPNS / Push Protocol as a standard notification layer | Standard pattern: backend listener / webhook → APNs / FCM | [V] |
| "Zero vulnerabilities", "military-grade", "real-time on-chain without delays" | Describe actual controls, and be honest that block time and finality limit what "real time" means | Credibility rule |

---

## 2. How a mobile app talks to a blockchain

### 2.1 The three layers

1. **Read layer.** The app (or its backend) queries chain state through **JSON-RPC** nodes. Common calls: `eth_call` for contract reads, `eth_getBalance`, `eth_getTransactionReceipt`, `eth_feeHistory`, and `eth_subscribe` over WebSocket for new blocks and logs. [K]
2. **Write layer.** A transaction is built, **signed by the user's key** (in an external wallet, an embedded wallet, or a smart account), then broadcast with `eth_sendRawTransaction`. The app never needs a raw key if signing is delegated to a wallet. [K]
3. **Index layer.** Historic, aggregated or cross-contract data (transfer history, NFT holdings, positions) is too slow and expensive to rebuild from raw RPC on a phone. Indexers such as **The Graph Network subgraphs / Substreams** or **Goldsky** turn contract events into queryable APIs (usually GraphQL). [V]

**Implication for the page:** A production mobile dApp almost always has a **backend** between the phone and the chain. The backend handles indexing, caching, webhooks, push notifications and rate-limited RPC keys. This is a real differentiator to explain, because most competitors imply that the app "talks directly to the blockchain".

### 2.2 RPC infrastructure

- Managed providers: **Alchemy, Infura, QuickNode** (all active). [K]
- **Infura DIN** is a decentralized RPC network with failover on paid plans. [V]
- Best practice: use a separate RPC endpoint and API key per environment. Keep paid API keys **server-side or behind a proxy**, never hard-coded in an app binary, which can be decompiled. Configure failover between providers. [K]
- **Chain IDs** (EIP-155) prevent cross-chain replay of signed transactions. **CAIP-2** (chain identifiers like `eip155:1`) and **CAIP-10** (account identifiers) are how WalletConnect and MetaMask Connect address multiple chains in one session. [K][V for usage in SDKs]

### 2.3 Transaction lifecycle and status tracking

States the UI must represent: *built → awaiting signature → signed → broadcast (pending in mempool) → included in block → confirmed / finalized*, or *dropped / replaced / reverted*.

- Use `eth_getTransactionReceipt` polling or WebSocket subscriptions, plus server-side webhooks for background updates. [K]
- Finality differs by chain. Ethereum L1 finalizes in epochs (about 13 minutes for economic finality). L2s show "soft" confirmation fast, while L1 settlement is later. Solana has its own commitment levels ("processed", "confirmed", "finalized"). [K]
- The UI must never show "success" on broadcast alone.

### 2.4 Gas fee estimation

- EVM chains use the **EIP-1559** fee model: a base fee, which is burned, plus a priority fee. Estimate with `eth_estimateGas` and `eth_feeHistory`, and show fees in fiat before the user signs. [K]
- **Gas sponsorship**: ERC-4337 **paymasters** or EIP-7702-delegated accounts let the app pay fees for the user, so a new user doesn't need native tokens just to start. [V]

---

## 3. Wallet connection models

### 3.1 External wallet connection (user brings their own wallet)

**WalletConnect protocol (SDKs by Reown)** [V]
- **AppKit** is for apps that connect to wallets. **WalletKit** is for apps that *are* wallets.
- Mobile SDKs: Swift (`ReownAppKit`), Kotlin/Android (`com.reown:appkit`), React Native (`@reown/appkit-*-react-native`), Flutter (`reown_appkit`). Unity and .NET also exist.
- Mobile flow: the app creates a pairing URI, then deep-links or universal-links to the wallet. The user approves the session in the wallet, and the wallet returns to the app. Messages travel over WalletConnect's encrypted relay.
- **Link Mode** routes one-click auth and session requests over iOS Universal Links / Android App Links, which reduces reliance on the WebSocket relay. It requires an `apple-app-site-association` file / `assetlinks.json` and One-Click Auth. In React Native AppKit, Link Mode is disabled when non-EVM chains are included.
- iOS caveat: from iOS 17, automatic redirection back to *browser-based* dApps after wallet interaction isn't possible. Native apps can return through their registered links.
- The app must not assume a session was approved just because the user returned to it. It has to confirm the session event.

**MetaMask Connect** [V]
- Rebuilt on the **CAIP-25 Multichain API**, covering EVM and Solana.
- React Native quickstarts exist. They require `react-native-get-random-values` as the first import, and Expo Go isn't supported (a dev client / prebuild is needed).
- Native Swift and Kotlin Connect SDKs couldn't be confirmed, so the page claims React Native integration and generic WalletConnect-based connection for native apps.

**Base Account (Coinbase)** [V]
- Successor to the legacy Coinbase Wallet SDK. React Native is supported through the Mobile Wallet Protocol client, which provides an EIP-1193 provider and a wagmi connector.

**Solana** [V]
- **Mobile Wallet Adapter (MWA)** is **Android-only** (including Chrome on Android). Solana Mobile says iOS isn't supported, because iOS suspends background apps and deep links aren't a viable substitute.
- iOS alternatives: embedded / wallet-as-a-service, passkey-based wallets (with ed25519 caveats), and Safari Web Extension wallets.
- Seed Vault and the Solana dApp Store are part of the Solana Mobile Stack. [K]

### 3.2 Embedded wallets (app creates a wallet for the user)

- The user signs in with email, social login or a passkey, and a non-custodial or semi-custodial wallet is provisioned without any seed phrase on screen. [V]
- Architectures: **MPC / threshold signing** (key shares split between device, provider and recovery), **secure-enclave/TEE-based key management**, or **smart accounts** (ERC-4337) with passkey signers. [V]
- Current providers (verify the commercial fit for each project):
  - **Privy** (acquired by Stripe, June 2025, still operating)
  - **Dynamic** (acquired by Fireblocks, October 2025)
  - **Turnkey** (independent)
  - **MetaMask Embedded Wallets** (formerly Web3Auth)
  - **Coinbase CDP Embedded Wallets** (GA October 2025; React Native/Expo, iOS 15.1+, Android 7.0+)
  - **thirdweb**
- Trade-off to explain to buyers: embedded wallets remove onboarding friction, but they add provider dependency, pricing per wallet or operation, and recovery-design decisions.

### 3.3 Smart accounts and account abstraction

- **ERC-4337**: UserOperations, EntryPoint contract, bundlers and paymasters. The latest EntryPoint is v0.9, and v0.7 is still widely used. Bundler and paymaster support differs between versions, so pinning versions matters. [V]
- **EIP-7702** has been live on Ethereum mainnet since the **Pectra** upgrade (7 May 2025). It lets an existing EOA delegate to smart-contract code, enabling batching and sponsorship without migrating to a new address. [V]
- **EIP-7951** (P-256 / secp256r1 precompile) has been live on Ethereum mainnet since **Fusaka**, 3 Dec 2025. This makes it cheap to verify **passkey / WebAuthn and Secure-Enclave-generated signatures** on-chain. RIP-7212 provided the same on many L2s earlier. [V]
- **Mobile relevance:** passkeys plus P-256 verification mean a smart account can be controlled by a key that *does* live in the Secure Enclave / StrongBox, behind Face ID or a fingerprint. That gives hardware-backed signing without a seed phrase. This is an important, accurate differentiator.
- ERC-4337 and EIP-7702 are **EVM-only**. Don't imply they apply to Solana or Bitcoin.

### 3.4 Sign-in with a wallet

- **SIWE / EIP-4361** is a standard signed message (domain, address, nonce, issued-at, expiry, chain ID). The backend verifies the signature and issues a session. It replaces passwords for wallet users. [K]
- **EIP-1271** verifies signatures from smart-contract accounts, so smart accounts can also sign in. [K]
- **EIP-712** typed structured data signing shows the user readable fields instead of an opaque hex blob, which is essential to avoid "blind signing". [K]

---

## 4. Key security on mobile

### 4.1 iOS [V]

- **Secure Enclave** supports only **NIST P-256** keys, for signing or key agreement. Ethereum (secp256k1) and Solana (ed25519) keys **cannot** be generated or stored inside it.
- **Correct pattern for self-custody keys:** generate the wallet key, then encrypt it with a key that is protected by the Secure Enclave. Store the ciphertext in the **Keychain** with an access-control policy (for example `kSecAttrAccessibleWhenPasscodeSetThisDeviceOnly` plus `.biometryCurrentSet`), so decryption needs Face ID / Touch ID or the device passcode. Apple's own wording is that such keys are "protected by", not "located in", the Secure Enclave.
- **LocalAuthentication** framework for biometric gating; pair it with Keychain access control rather than a simple yes/no biometric check that can be bypassed on a compromised device.
- Use the ThisDeviceOnly accessibility classes so key material isn't restored to another device through backups.

### 4.2 Android [V/K]

- **Android Keystore** with hardware backing (TEE) or **StrongBox** (a separate secure element on supporting devices) holds non-exportable keys. Like iOS, it doesn't support secp256k1 natively, so the same wrap-and-store pattern applies.
- **BiometricPrompt** with `setUserAuthenticationRequired` / auth-bound keys, so a key can't be used without a fresh biometric. [K]
- `EncryptedSharedPreferences` / `security-crypto` is deprecated. Use Keystore-wrapped keys with **Tink**, or **DataStore + Tink**. [V]
- Play Integrity API for device and app attestation. [K]

### 4.3 Application security framework

- **OWASP MASVS v2** (verification standard) and **MASTG v2.0** (testing guide, released June 2026) are the current mobile security baseline. [V]
- **OWASP Mobile Top 10 (2024)**: M1 Improper Credential Usage, M2 Inadequate Supply Chain Security, M3 Insecure Authentication/Authorization, M4 Insufficient Input/Output Validation, M5 Insecure Communication, M6 Inadequate Privacy Controls, M7 Insufficient Binary Protections, M8 Security Misconfiguration, M9 Insecure Data Storage, M10 Insufficient Cryptography. [V]
- Web3-specific controls:
  - transaction simulation before signing
  - human-readable decoding (EIP-712)
  - contract allow-lists in dApp browsers
  - phishing domain checks
  - clipboard protection for addresses
  - screenshot blocking on seed screens
  - certificate pinning for backend APIs
  - root / jailbreak detection as a risk signal (not a guarantee)
- Smart contract security is a **separate** discipline: unit, fuzz and invariant tests (Foundry / Hardhat), OpenZeppelin libraries, and independent audit before mainnet.

---

## 5. On-chain vs off-chain architecture

| Belongs on-chain | Belongs off-chain |
|---|---|
| Asset ownership (tokens, NFTs) | User profiles, preferences, media |
| Value transfer, settlement | Search, feeds, analytics |
| Rules that must be trustless (escrow, governance votes, staking logic) | Push notifications, chat, KYC data (never on-chain) |
| Commitments / hashes of off-chain data | Caches of indexed chain data for fast UI |

NFT metadata and media usually live on **IPFS** or **Arweave**, referenced by `tokenURI` and loaded through a gateway or CDN. [K]

Personal data must not go on-chain, because of immutability and privacy law (GDPR right to erasure).

---

## 6. Token standards and use cases

- **ERC-20** fungible tokens, **ERC-721** NFTs, **ERC-1155** multi-token (games, editions). All Final. [K]
- **ERC-6551** token-bound accounts are still in **Review**, so the page doesn't present them as a settled standard. [V]
- DeFi mobile integration means connecting to existing protocols' contracts or SDKs (swaps through aggregators, lending positions, staking). In practice it usually means reading positions from indexers and building transactions the user signs. [K]
- Crypto payments: wallet-to-wallet transfers, stablecoin checkout, payment requests through QR code or links (EIP-681 URI format for EVM), plus fiat on-ramps (provider SDKs). [K]
- DAO governance: on-chain voting through governor contracts, or gasless off-chain signed votes (for example Snapshot-style signed messages). [K]

---

## 7. Push notifications for on-chain events [V]

- A phone can't keep a WebSocket to a node open in the background. iOS suspends apps, and Android restricts background work.
- **Pattern:** a backend listener (own node subscription, or provider webhooks such as Alchemy Address Activity webhooks across 30+ EVM chains and Solana) detects the event and sends it through **APNs** (iOS) or **FCM** (Android).
- Example events: incoming transfer, transaction confirmed or failed, liquidation-risk threshold, NFT sold, governance proposal opened.
- Privacy: map wallet addresses to device tokens on the server with care, and don't put balances in notification payloads shown on the lock screen.

---

## 8. In-app dApp browsers [V]

- Built on **WKWebView** (iOS) and Android **WebView**. An **EIP-1193** provider is injected through `WKUserScript` / `WKScriptMessageHandler` or `addJavascriptInterface`, and announced with **EIP-6963** (multi-injected provider discovery, Final).
- Every signing request crosses the native bridge, where the app shows a native confirmation sheet. This is the security boundary.
- App Store: browsing NFTs and linking to non-IAP NFT purchases is restricted outside the US storefront (see §10).

---

## 9. Frameworks and stacks (current versions)

| Stack | Status (Nov 2026) | Web3 notes |
|---|---|---|
| **Swift / SwiftUI** | Current [K] | Reown AppKit/WalletKit Swift SDKs; direct Keychain / Secure Enclave / CryptoKit access; community libraries (web3.swift) |
| **Kotlin / Jetpack Compose** | Current [K] | Reown Kotlin SDKs; Solana MWA (Android); Keystore / StrongBox; web3j (JVM) |
| **Kotlin Multiplatform / Compose Multiplatform** | KMP stable since Nov 2023; Compose MP for iOS stable since 1.8.0 (May 2025) [V] | Shared business logic with native UI; fewer turnkey Web3 SDKs |
| **React Native** | 0.88 (Oct 2026); New Architecture only since 0.82; Hermes V1 default since 0.84 [V] | Broadest Web3 SDK coverage (viem, wagmi, Reown AppKit RN, MetaMask Connect, Base Account, Privy/Dynamic/CDP). Needs polyfills: `react-native-get-random-values` first, Buffer, TextEncoder; native crypto modules for performance |
| **Expo** | SDK 54+ bundles most polyfills [V] | Dev client required (not Expo Go) for most wallet SDKs |
| **Flutter** | 3.50 (Nov 2026) [V] | `reown_appkit` Flutter package; web3dart is community-maintained (original repo archived 2022); fewer embedded-wallet SDKs; strong custom UI and animation |

**Recommendation logic for the page:**
- **React Native** when the Web3 SDK surface (EVM, embedded wallets, account abstraction) and a shared TypeScript codebase with a web dApp matter most.
- **Flutter** when brand-heavy UI matters most and the Web3 surface is narrower (WalletConnect + contract reads/writes).
- **Native** for wallets and security-critical signing apps, deep OS integration (Secure Enclave, passkeys, widgets, StrongBox), or Solana Seed Vault / MWA on Android.

---

## 10. App Store and Google Play rules

### Apple App Review Guidelines [V — official PDF]

- **3.1.5(i) Wallets:** may facilitate virtual currency storage if offered by developers **enrolled as an organization**.
- **3.1.5(ii) Mining:** no on-device mining; cloud-based mining is allowed.
- **3.1.5(iii) Exchanges:** may facilitate transactions on an approved exchange only in countries or regions where the app has **appropriate licensing**.
- **3.1.5(iv):** ICOs, crypto futures and crypto-securities trading must come from established banks, securities firms or approved financial institutions.
- **3.1.5(v):** no crypto rewards for tasks such as downloading apps or posting on social media.
- **3.1.1 NFTs:**
  - In-app purchase may be used to sell NFT-related services (minting, listing, transferring).
  - Apps may let users view their own NFTs, as long as **NFT ownership does not unlock features or functionality** in the app.
  - Outside the US storefront, apps may not include buttons, external links or calls to action to non-IAP NFT purchases.
- **5.1.1(ix):** apps in highly regulated fields, including crypto exchanges, must be submitted by a legal entity.

### Google Play [V — Play Console Help, policy updated October 2026]

- Crypto exchanges and software wallets must complete the **Financial Features declaration**.
- Exchanges and custodial wallets need licences in listed jurisdictions (including the US, UK, EU under MiCA, Canada, Japan, South Korea, Hong Kong, UAE and others). Unlicensed apps must remove those countries from distribution.
- **Non-custodial software wallets** are out of scope of the licensing requirement but must confirm their status in the declaration.

**Why this matters on the page:** custody model and feature design (for example NFT-gated features) decide whether an app is approvable. ClickMasters can position "store-compliance by design" as a planning step, without promising approval.

---

## 11. Key distinctions (used in page copy)

| A | B | Difference |
|---|---|---|
| Web3 mobile app | Traditional mobile app | Identity = wallet keys rather than a password database; assets live on a public ledger; some logic runs in smart contracts that can't be quietly changed; transactions have fees and finality delays |
| Mobile crypto wallet | Mobile dApp | A wallet **holds keys and signs**; a dApp **requests** signatures from a wallet (external or embedded) to use a protocol |
| Embedded wallet | External wallet connection | Embedded: created inside the app with email, social or passkey, so onboarding is easy but there's provider dependency. External: the user's existing MetaMask, Coinbase, Phantom etc. through WalletConnect or SDKs, so crypto-native users get full control but more app-switching |
| On-chain | Off-chain | Trustless, public, costly and slow vs fast, private, cheap, mutable |
| Native | Cross-platform | Deepest OS security APIs and performance vs one codebase and faster delivery |
| Blockchain API (indexer/provider) | Direct smart contract interaction | Indexed, aggregated reads for UI speed vs authoritative state, and writes that require signing |

---

## Sources

**WalletConnect / Reown**
- https://docs.reown.com/appkit/flutter
- https://docs.reown.com/appkit/upgrade/from-web3modal-android
- https://docs.reown.com/advanced/walletkit-migration
- https://docs.walletconnect.com/wallets/features/link-mode
- https://docs.reown.com/appkit/react-native/core/link-mode
- https://docs.walletconnect.com/wallets/ios/mobile-linking
- https://docs.walletconnect.com/wallets/android/mobile-linking

**MetaMask**
- https://docs.metamask.io/metamask-connect/evm/quickstart/react-native/
- https://docs.metamask.io/metamask-connect/troubleshooting/metro-polyfill-issues/
- https://docs.metamask.io/embedded-wallets
- https://consensys.io/blog/consensys-acquires-web3auth-to-enhance-metamasks-user-experience-user-safety

**Base / Coinbase**
- https://docs.base.org/base-account/guides/migration-guide
- https://docs.base.org/base-account/quickstart/mobile-integration
- https://docs.cdp.coinbase.com/embedded-wallets/react-native

**Ethereum standards and upgrades**
- https://eips.ethereum.org/EIPS/eip-4337
- https://blog.ethereum.org/2025/04/23/pectra-mainnet
- https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement
- https://eips.ethereum.org/EIPS/eip-6551
- https://reown.com/blog/eip6963-is-now-approved
- https://ethereum.org/en/developers/docs/apis/json-rpc/
- https://ethereum.org/en/developers/docs/gas/

**Solana Mobile**
- https://docs.solanamobile.com/solana-mobile-stack/mobile-wallet-adapter
- https://docs.solanamobile.com/recipes/mobile-wallet-adapter/wallet-signing-on-ios

**Apple**
- https://developer.apple.com/documentation/security/protecting-keys-with-the-secure-enclave
- https://developer.apple.com/app-store/review/guidelines/
- https://developer.apple.com/support/downloads/terms/app-review-guidelines/App-Review-Guidelines-English-UK.pdf

**Android and Google Play**
- https://developer.android.com/jetpack/androidx/releases/security
- https://support.google.com/googleplay/android-developer/answer/16329703

**Frameworks**
- https://docs.flutter.dev/release/release-notes/release-notes-3.50.0
- https://reactnative.dev/blog
- https://blog.jetbrains.com/kotlin/2025/05/compose-multiplatform-1-8-0-released-compose-multiplatform-for-ios-is-stable-and-production-ready/

**Indexing and infrastructure**
- https://thegraph.com/docs/en/sunrise
- https://www.alchemy.com/docs/alchemy-subgraphs/deprecation-notice
- https://www.alchemy.com/docs/reference/webhook-types

**Mobile security**
- https://owasp.org/www-project-mobile-top-10/
- https://github.com/OWASP/owasp-masvs/releases
- https://github.com/OWASP/mastg/releases

**Embedded-wallet providers**
- https://blog.privy.io/blog/announcing-our-acquisition-by-stripe
- https://www.fireblocks.com/company-news-updates/fireblocks-acquires-dynamic
- https://www.theblock.co/post/409705/kraken-parent-payward-acquires-magic-labs-embedded-wallet-business
