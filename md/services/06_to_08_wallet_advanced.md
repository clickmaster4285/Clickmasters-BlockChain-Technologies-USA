# Social Recovery Wallet Architecture — Losing Seed Phrases Without Losing Funds | Clickmasters

---
**URL:** /social-recovery-wallet/
**Primary KW:** social recovery wallet
**Secondary KWs:** wallet social recovery blockchain, how to implement social recovery, smart wallet recovery, guardian wallet system
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /crypto-wallet-development/, /web3-account-abstraction/, /bip39-hd-wallet-architecture/

---

## H1: Social Recovery Wallet Architecture — Guardian-Based Account Recovery Without Seed Phrases

**H2: Social recovery replaces the seed phrase backup with a set of trusted "guardians" who can collectively authorize wallet recovery. Vitalik Buterin designed it; Argent deployed it at scale. Here is the complete technical implementation.**

---

## The Seed Phrase Problem

BIP-39 seed phrases are a cryptographic masterpiece that completely fails as a UX pattern. 27% of Bitcoin is estimated to be permanently lost — primarily from lost or mismanaged seed phrases. The average person cannot safely manage a 24-word secret that, if lost, means permanent fund loss.

**Social recovery reframes the problem:** Instead of "memorize/store 24 words that are the master key to everything," it becomes "designate 3–5 trusted people who can together authorize a new signing key for your account."

---

## How Social Recovery Works

```
1. User creates Smart Account wallet (ERC-4337)
2. User designates 3–5 guardians (other wallet addresses — could be:
   - Friend's Metamask address
   - Your own separate device's address
   - A trusted institution's signing service)
   
3. Normal operation: user signs transactions with their primary device key

4. If primary device key is lost or compromised:
   - User contacts 3+ guardians
   - Guardians submit recovery signatures on-chain
   - After a security time delay (typically 24–72 hours): 
     new signing key is accepted
   - User now controls the account with their new device

5. The account address never changes — funds remain in the same contract
```

---

## Smart Contract Implementation

```solidity
contract SocialRecoveryWallet is ReentrancyGuard {
    address public owner;            // Current signing key
    
    mapping(address => bool) public guardians;
    uint256 public guardianCount;
    uint256 public threshold;        // Required guardians to recover (e.g., 2-of-3)
    
    // Pending recovery request
    struct RecoveryRequest {
        address proposedNewOwner;
        uint256 guardianApprovals;
        mapping(address => bool) hasApproved;
        uint256 initiatedAt;
        bool executed;
    }
    
    RecoveryRequest public pendingRecovery;
    uint256 public constant RECOVERY_DELAY = 2 days; // Security time-lock
    
    // ============================================
    // GUARDIAN MANAGEMENT
    // ============================================
    
    function addGuardian(address guardian) external {
        require(msg.sender == owner, "Not owner");
        require(!guardians[guardian], "Already guardian");
        require(guardian != owner, "Owner cannot be guardian");
        
        guardians[guardian] = true;
        guardianCount++;
        
        emit GuardianAdded(guardian);
    }
    
    function removeGuardian(address guardian) external {
        require(msg.sender == owner, "Not owner");
        require(guardians[guardian], "Not a guardian");
        require(guardianCount - 1 >= threshold, "Would drop below threshold");
        
        guardians[guardian] = false;
        guardianCount--;
        
        emit GuardianRemoved(guardian);
    }
    
    // ============================================
    // RECOVERY PROCESS
    // ============================================
    
    // Any guardian can initiate recovery
    function initiateRecovery(address newOwner) external {
        require(guardians[msg.sender], "Not a guardian");
        require(newOwner != address(0), "Invalid new owner");
        require(!pendingRecovery.executed, "Recovery already executed");
        
        // Start fresh recovery request
        delete pendingRecovery;
        pendingRecovery.proposedNewOwner = newOwner;
        pendingRecovery.initiatedAt = block.timestamp;
        pendingRecovery.hasApproved[msg.sender] = true;
        pendingRecovery.guardianApprovals = 1;
        
        emit RecoveryInitiated(msg.sender, newOwner, block.timestamp);
    }
    
    // Additional guardians approve the same recovery
    function approveRecovery() external {
        require(guardians[msg.sender], "Not a guardian");
        require(pendingRecovery.proposedNewOwner != address(0), "No recovery initiated");
        require(!pendingRecovery.hasApproved[msg.sender], "Already approved");
        require(!pendingRecovery.executed, "Recovery already executed");
        
        pendingRecovery.hasApproved[msg.sender] = true;
        pendingRecovery.guardianApprovals++;
        
        emit RecoveryApproved(msg.sender, pendingRecovery.guardianApprovals);
    }
    
    // Execute recovery after threshold met + delay elapsed
    function executeRecovery() external nonReentrant {
        require(pendingRecovery.proposedNewOwner != address(0), "No recovery initiated");
        require(!pendingRecovery.executed, "Already executed");
        require(
            pendingRecovery.guardianApprovals >= threshold,
            "Insufficient guardian approvals"
        );
        require(
            block.timestamp >= pendingRecovery.initiatedAt + RECOVERY_DELAY,
            "Recovery delay not elapsed"
        );
        
        address newOwner = pendingRecovery.proposedNewOwner;
        pendingRecovery.executed = true;
        
        // Transfer ownership to new key
        address oldOwner = owner;
        owner = newOwner;
        
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    // Owner can cancel pending recovery (if they still have access)
    function cancelRecovery() external {
        require(msg.sender == owner, "Not owner");
        delete pendingRecovery;
        emit RecoveryCancelled(msg.sender);
    }
    
    // ============================================
    // TRANSACTION EXECUTION
    // ============================================
    
    function execute(
        address target,
        uint256 value,
        bytes calldata data
    ) external nonReentrant returns (bytes memory result) {
        require(msg.sender == owner, "Not owner");
        
        (bool success, bytes memory returnData) = target.call{value: value}(data);
        require(success, "Execution failed");
        
        return returnData;
    }
    
    // Events
    event GuardianAdded(address indexed guardian);
    event GuardianRemoved(address indexed guardian);
    event RecoveryInitiated(address indexed guardian, address newOwner, uint256 timestamp);
    event RecoveryApproved(address indexed guardian, uint256 totalApprovals);
    event OwnershipTransferred(address indexed oldOwner, address indexed newOwner);
    event RecoveryCancelled(address indexed owner);
}
```

---

## The 2-Day Delay Is a Security Feature

Why wait 2 days before recovery executes? **If the wallet owner still has their device,** they can cancel the recovery during the delay period — protecting against a malicious guardian colluding to take over the wallet.

Attack scenario without delay: 3 malicious guardians coordinate → initiate recovery → immediately transfer all funds. Takes seconds.

With 2-day delay: malicious guardians initiate recovery → legitimate owner receives notification → owner cancels recovery within 2 days → funds protected.

**The notification system is critical:** The smart contract emits `RecoveryInitiated` event. The wallet application monitors for this event and pushes an immediate notification to the owner's device: "WARNING: Someone is attempting to recover your wallet. Cancel if this wasn't you."

---

## Argent's Production Lessons

Argent pioneered social recovery in consumer wallets. Their production insights:

1. **Most users choose other Argent users as guardians** — because they already understand the system. The onboarding flow explicitly suggests guardians.

2. **Institutions as guardians** — Argent offered Argent as a guardian of last resort (their company key). This provides a backstop for users who have no crypto-native friends. Tradeoff: introduces centralization risk.

3. **Guardian diversity matters** — recommending one guardian from each category (another wallet, a hardware device, a trusted person) provides better resilience than 3 hot wallets owned by the same person.

---

## FAQ

**Can guardians steal my funds without recovery?**
No. Guardians can only authorize a recovery (changing the signing key). They cannot directly access funds — they do not know your private key and the smart contract only allows guardians to submit recovery signatures, not transfer funds. A successful recovery would replace your signing key with a new one you provide — guardians never hold the new key.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Hardware Wallet Integration for dApps — Ledger and Trezor Connect | Clickmasters

---
**URL:** /hardware-wallet-dapp-integration/
**Primary KW:** hardware wallet dApp integration
**Secondary KWs:** Ledger integration dApp, Trezor connect dApp, hardware wallet Web3, secure dApp signing
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /blockchain-wallet-integration/, /crypto-wallet-development/, /walletconnect-2-integration/

---

## H1: Hardware Wallet Integration — Connecting Ledger and Trezor to Your dApp

**H2: Hardware wallets (Ledger, Trezor) are used by users with significant holdings who require maximum security for their transactions. Integrating hardware wallet support gives your dApp access to this high-value user segment.**

---

## Why Hardware Wallet Support Matters

Hardware wallet users have a specific profile:
- Average holdings: $50,000+ (vs $2,000 for software wallet users)
- Highest spending power of any user segment
- Security-conscious — they chose hardware specifically for security
- Likely to be disappointed if your dApp does not support their wallet

**Transaction amounts:** A DeFi protocol serving hardware wallet users processes significantly larger average transactions. An AMM that works only with MetaMask misses users moving $500,000+ who would use a hardware wallet for that size transaction.

---

## Integration via WalletConnect 2.0

The simplest approach: hardware wallet support via WalletConnect 2.0. Both Ledger and Trezor support WalletConnect — your dApp integrates WalletConnect once and hardware wallets work automatically.

```typescript
// WalletConnect 2.0 already handles hardware wallets
// Users connect Ledger Live or Trezor Suite → WalletConnect QR code
// Your dApp code is identical for hardware and software wallets

import { createConfig } from 'wagmi'
import { walletConnect } from 'wagmi/connectors'

const config = createConfig({
    connectors: [
        walletConnect({ projectId: process.env.WALLETCONNECT_PROJECT_ID }),
    ],
    // Hardware wallet users connect via WalletConnect — no additional code needed
})
```

---

## Direct Ledger Integration (Ledger Connect Kit)

For applications where WalletConnect is insufficient (custom transaction types, specialized signing):

```typescript
import { LedgerLive } from '@ledgerhq/connect-kit';

class LedgerDirectIntegration {
    private ledgerLive: LedgerLive;
    
    async connectLedger() {
        const connectKit = await import('@ledgerhq/connect-kit-loader');
        const kit = await connectKit.loadConnectKit();
        
        // Check if Ledger Live is installed
        const checkResult = await kit.checkSupport({
            walletConnectVersion: 2,
            providerOptions: {
                walletConnectV2: {
                    projectId: process.env.WALLETCONNECT_PROJECT_ID,
                    chains: [1, 137], // Ethereum, Polygon
                    optionalChains: [42161], // Arbitrum
                },
            },
        });
        
        if (checkResult.isLedgerConnectSupported) {
            // Use Ledger Connect (browser extension or desktop app)
            const provider = await kit.getProvider();
            await provider.request({ method: 'eth_requestAccounts' });
            return new ethers.BrowserProvider(provider);
        } else {
            // Fall back to WalletConnect (works with Ledger Live mobile)
            return await this.connectViaWalletConnect();
        }
    }
    
    async signTransaction(provider: ethers.BrowserProvider, tx: TransactionRequest) {
        const signer = await provider.getSigner();
        
        // Ledger displays transaction details on the device screen
        // User must physically confirm on the Ledger device
        // This is the security advantage — the private key never leaves hardware
        
        const signedTx = await signer.signTransaction(tx);
        return signedTx;
    }
}
```

---

## Hardware Wallet UX Considerations

**Longer confirmation time:** Hardware wallet transactions require physical device confirmation. Users tap "Sign" on your dApp → they must press a physical button on their device. Typical: 5–15 seconds. Design your UI to:
- Show "Please confirm on your Ledger/Trezor" message
- Not show loading spinners that timeout in 5 seconds
- Not show error messages for delays up to 60 seconds

**Blind signing risk:** Hardware wallets can only display what their firmware understands. For custom smart contract calls, Ledger and Trezor may show "Unknown Transaction" — requiring the user to "blind sign" (approve without seeing details). This is a security risk. Ledger's "Ethereum app" supports ERC-20 transfers and standard DeFi operations with full display. Custom contract ABIs require integration with Ledger's [Clear Signing program](https://developers.ledger.com/docs/clear-signing/).

**Ethereum vs EVM chains:** Ledger and Trezor support Ethereum by default. For Arbitrum, Polygon, Optimism: users must manually add the network in Ledger Live. Your dApp's network switching UI should guide users through this process.

---

## FAQ

**Do hardware wallets work with Uniswap, Aave, and other major dApps?**
Yes — all major DeFi dApps support hardware wallets through their WalletConnect integration. Hardware wallet users regularly use Uniswap, Aave, and Compound. The integration is mature. Newer or custom dApps sometimes have UX issues with hardware wallet confirmation timing but not functional issues.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

---
---

# Crypto Wallet Push Notifications and Alerts | Clickmasters

---
**URL:** /crypto-wallet-push-notifications/
**Primary KW:** crypto wallet push notifications
**Secondary KWs:** wallet transaction alerts, blockchain notification system, crypto wallet alerts development
**Schema:** Article, FAQPage, BreadcrumbList
**Internal Links:** /crypto-wallet-development/, /crypto-wallet-app-development/, /how-to-build-crypto-wallet/

---

## H1: Crypto Wallet Push Notifications — Real-Time Blockchain Transaction Alerts

**H2: Push notifications for a crypto wallet require monitoring blockchain events in real time and routing them to millions of user devices. Here is the complete notification architecture from blockchain monitoring to APNs/FCM delivery.**

---

## Notification Architecture

```
Blockchain (Ethereum, Polygon, etc.)
    ↓ Real-time events via Alchemy Webhooks or The Graph subscriptions
    ↓
Notification Service (Node.js)
    ↓ Event processing and user subscription matching
    ↓
Push Notification Queue (Redis Pub/Sub or SQS)
    ↓ Rate limiting, deduplication, batching
    ↓
Push Gateway
    ├── APNs (Apple Push Notification Service) — iOS
    └── FCM (Firebase Cloud Messaging) — Android
    ↓
User Device (iPhone or Android)
    → Push notification displayed to user
```

---

## Blockchain Event Monitoring

```javascript
// Monitor blockchain events using Alchemy Webhooks
class BlockchainEventMonitor {
    constructor(alchemyWebhookSecret) {
        this.secret = alchemyWebhookSecret;
    }
    
    // Register webhook for all address activity
    async registerAddressWebhook(webhookUrl, addresses) {
        const response = await fetch('https://dashboard.alchemyapi.io/api/create-webhook', {
            method: 'POST',
            headers: {
                'X-Alchemy-Token': process.env.ALCHEMY_ADMIN_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                network: 'ETH_MAINNET',
                webhook_type: 'ADDRESS_ACTIVITY',
                webhook_url: webhookUrl,
                addresses: addresses
            })
        });
        
        return response.json();
    }
    
    // Process incoming webhook events
    async processWebhook(payload, signature) {
        // Verify webhook signature
        const isValid = this.verifySignature(payload, signature);
        if (!isValid) throw new Error('Invalid webhook signature');
        
        const activities = payload.event.activity;
        
        for (const activity of activities) {
            await this.processActivity(activity);
        }
    }
    
    async processActivity(activity) {
        const {
            fromAddress,
            toAddress,
            value,           // ETH amount (in ETH units)
            asset,           // 'ETH', 'USDC', 'USDT', etc.
            hash,            // Transaction hash
            blockNum,
            category         // 'external', 'internal', 'token'
        } = activity;
        
        // Check which users have these addresses in their wallet
        const affectedUsers = await this.db.wallets.findByAddresses([fromAddress, toAddress]);
        
        for (const user of affectedUsers) {
            const isReceiving = user.walletAddress.toLowerCase() === toAddress?.toLowerCase();
            const isSending = user.walletAddress.toLowerCase() === fromAddress?.toLowerCase();
            
            const notification = {
                userId: user.id,
                type: isReceiving ? 'RECEIVED' : 'SENT',
                title: isReceiving ? `Received ${value} ${asset}` : `Sent ${value} ${asset}`,
                body: isReceiving 
                    ? `${value} ${asset} received in your wallet` 
                    : `${value} ${asset} sent from your wallet`,
                data: {
                    txHash: hash,
                    asset,
                    amount: value,
                    direction: isReceiving ? 'in' : 'out',
                    explorerUrl: `https://etherscan.io/tx/${hash}`
                }
            };
            
            await this.notificationService.send(notification);
        }
    }
}
```

---

## Push Notification Delivery

```javascript
// Multi-platform push notification service
class PushNotificationService {
    constructor() {
        this.apns = apn.Provider({
            token: {
                key: process.env.APNS_KEY,
                keyId: process.env.APNS_KEY_ID,
                teamId: process.env.APPLE_TEAM_ID,
            },
            production: process.env.NODE_ENV === 'production'
        });
        
        this.fcm = admin.messaging();
    }
    
    async send(notification) {
        const user = await this.db.users.findById(notification.userId);
        
        // Get all user devices
        const devices = await this.db.devices.findByUserId(notification.userId);
        
        const results = await Promise.allSettled(
            devices.map(device => {
                if (device.platform === 'ios') {
                    return this.sendApns(device.pushToken, notification);
                } else {
                    return this.sendFcm(device.pushToken, notification);
                }
            })
        );
        
        // Handle failed deliveries (remove invalid tokens)
        for (let i = 0; i < results.length; i++) {
            if (results[i].status === 'rejected') {
                const error = results[i].reason;
                if (this.isInvalidToken(error)) {
                    await this.db.devices.delete(devices[i].id);
                }
            }
        }
    }
    
    async sendApns(token, notification) {
        const note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour
        note.badge = 1;
        note.sound = 'ping.aiff';
        note.alert = { title: notification.title, body: notification.body };
        note.payload = notification.data;
        note.topic = process.env.IOS_BUNDLE_ID;
        
        const result = await this.apns.send(note, token);
        if (result.failed.length > 0) throw new Error(result.failed[0].error);
    }
    
    async sendFcm(token, notification) {
        await this.fcm.send({
            token,
            notification: {
                title: notification.title,
                body: notification.body,
            },
            data: notification.data,
            android: {
                notification: {
                    sound: 'default',
                    channelId: 'transactions',
                    priority: 'high'
                }
            }
        });
    }
    
    isInvalidToken(error) {
        const invalidErrors = ['BadDeviceToken', 'Unregistered', 'InvalidRegistration'];
        return invalidErrors.some(e => error.message?.includes(e));
    }
}
```

---

## User Notification Preferences

```typescript
// Notification settings per user
interface NotificationPreferences {
    userId: string;
    
    // Transaction notifications
    receiveAlerts: boolean;          // Alert on receiving any funds
    sendAlerts: boolean;             // Alert on sending funds
    minReceiveAmount: number;        // Only alert above threshold ($10 default)
    
    // DeFi position alerts
    healthFactorAlerts: boolean;     // Alert when health factor drops below 1.2
    liquidationWarning: boolean;     // Critical alert at HF < 1.05
    
    // Price alerts
    priceAlerts: PriceAlert[];       // Per-asset price targets
    
    // Security alerts
    newDeviceLoginAlert: boolean;    // Alert when new device logs in
    recoveryAttemptAlert: boolean;   // Alert on social recovery initiation
    
    // Delivery settings
    emailFallback: boolean;          // Send email if push fails
    quietHours: {
        enabled: boolean;
        startHour: number;           // 22 (10pm)
        endHour: number;             // 8 (8am)
        timezone: string;
    };
}
```

---

## FAQ

**How do we handle notifications when a user has multiple devices?**
Send to all registered devices simultaneously. Each device independently receives and displays the notification. The read state is synchronized through your backend — when the user opens the notification on one device, mark it as read for all devices. FCM and APNs each handle delivery to multiple tokens per user gracefully.

**[BUTTON — PRIMARY] Book a Free Strategy Call →**

**SCHEMA on all Phase 3 wallet pages:** Article + FAQPage + BreadcrumbList.
