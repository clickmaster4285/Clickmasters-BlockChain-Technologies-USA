# 03 — Enterprise Blockchain Technical Research

**Research date:** 26 November 2026
**Purpose:** Verify the platform, architecture and market facts used in the new page. Everything in the page copy should trace back to this file.

**Legend**
- **VERIFIED**: read on an official doc page, release page or vendor support notice during this research.
- **SECONDARY**: from search results or third-party reporting. Fine for context, but re-check before quoting precisely.
- **ESTABLISHED**: long-standing, widely documented behavior that we did not re-fetch this session. Low risk, but a technical reviewer should sign off.
- **NOT VERIFIED**: we could not confirm it. Do not publish it as fact.

---

## 1. Platform status summary (what to recommend in late 2026)

| Platform | Current status | Recommend in the page? | Evidence |
|---|---|---|---|
| Hyperledger Fabric | Active. v3.1.5 is the latest release (18 Jun 2026). v2.5 remains the LTS release for production. | **Yes, as the primary permissioned option** | VERIFIED |
| Hyperledger Besu | Active. 26.11.2 is the latest release (23 Nov 2026). The repo moved to `besu-eth/besu`, and the docs moved to docs.besu-eth.org. | **Yes, for EVM/Ethereum-compatible permissioned networks** | VERIFIED |
| R3 Corda 4 (Enterprise) | Active. 4.14 is the latest supported version (released 03/2026). A 4.15 release is planned for 12/2026. | **Yes, mainly for regulated financial workflows**, with ClickMasters' Corda capability marked for confirmation | SECONDARY (R3 docs via search; docs.r3.com blocked our fetch) |
| R3 Corda 5 | Corda 5.2 support dates in R3 docs end 04/2026. | **No. Do not recommend Corda 5 for new builds.** | SECONDARY |
| ConsenSys GoQuorum | Active development ended. Besu removed GoQuorum-compatible permissioning (23.4.0) and privacy. Migration path is Besu. | **No.** Mention only as a migration source | SECONDARY |
| Azure Blockchain Service | Retired 10 Sep 2021 | **No.** Cite as a portability lesson | SECONDARY (many consistent sources) |
| IBM Blockchain Platform (software) | Support ended 30 Apr 2023. Customers moved to IBM Support for Hyperledger Fabric. | **No.** Cite as a portability lesson | SECONDARY (IBM support page via search) |
| Amazon Managed Blockchain | Closed to new customers as of 29 Oct 2026. Existing customers can use it until 30 Sep 2027. | **No for new builds.** Important portability point | VERIFIED (aws.amazon.com/managed-blockchain) |
| Oracle Blockchain Platform | Docs still published with no EOL notice on the landing page | Neutral. Not needed in the page | VERIFIED (docs landing page only) |
| Hyperledger Composer | End of life since 2020 | No | SECONDARY |
| Hyperledger FireFly | LFDT "Graduated" project (supernode/middleware) | Yes, as an integration-layer option | VERIFIED (LFDT project list) |
| Hyperledger Cacti | LFDT "Graduated", described as a blockchain integration tool | Yes, briefly, for interoperability | VERIFIED (LFDT project list) |
| Paladin | LFDT "Incubating" (privacy for EVM) | Mention as an emerging option only. Label it incubating. | VERIFIED (stage only) |

**Implication for the page:** the existing ClickMasters page mentions "private Ethereum via Besu with IBFT consensus" and AWS/Azure/GCP. Besu's docs now say QBFT is the recommended consensus for private networks, and IBFT 2.0 is supported only for existing networks. Azure's and AWS's managed blockchain services are retired or closing. The new copy recommends QBFT and self-managed or Kubernetes-based deployment on any cloud.

---

## 2. Hyperledger Fabric

Sources:
- https://github.com/hyperledger/fabric/releases (VERIFIED: v3.1.5 "Latest", 18 Jun 2026; v2.5.16 same day)
- https://hyperledger-fabric.readthedocs.io/en/latest/whatsnew.html (VERIFIED)
- https://hyperledger-fabric.readthedocs.io/en/latest/private-data/private-data.html (VERIFIED)
- https://hyperledger-fabric.readthedocs.io/en/latest/gateway.html (VERIFIED)

Facts:
- **LTS:** "Hyperledger Fabric v2.5 remains the long-term support (LTS) release for production users." (VERIFIED)
- **BFT ordering:** Fabric v3.0 is the first release with a BFT ordering service, based on the SmartBFT library. It requires channel capability V3_0. Raft (crash fault tolerant) has been available since v1.4. (VERIFIED)
- **Ed25519** MSP signing support was added in v3.0. (VERIFIED)
- **v3.1** added batched chaincode reads and writes. (VERIFIED)
- **Private data collections:** private data is sent peer-to-peer via gossip only to authorized organizations. A hash of the data is endorsed, ordered and written to every peer's ledger. The ordering service does not see the private data. Collections let all channel members see that a transaction happened while only a subset sees the data. Purge and implicit per-organization collections are supported. (VERIFIED)
- **Channels:** separate ledgers for separate sets of members. (ESTABLISHED)
- **Fabric Gateway:** introduced in v2.4 peers. Docs direct client apps to the Fabric Gateway client APIs (Go, Node, Java). (VERIFIED) The docs page we read does not say the older SDKs are deprecated, so the page must not claim that.
- **Deprecated or removed:** Kafka and Solo ordering, the system channel, the legacy (v1.x) chaincode lifecycle, and gossip block dissemination (deprecated in 3.1.x). (VERIFIED, release notes)
- **Execute-order-validate:** transactions are simulated by endorsing peers, ordered, then validated against endorsement policies before commit. (ESTABLISHED)
- **Identity:** each organization's identities are defined by an MSP and usually issued by a Fabric CA or an enterprise PKI using X.509 certificates. (ESTABLISHED)
- **Chaincode languages:** Go, Node.js (JavaScript/TypeScript) and Java. (ESTABLISHED; the 404'd "chaincode4noobs" page was not re-found)

Where Fabric fits: multi-organization networks that need per-transaction data segregation (channels and collections), fine-grained endorsement rules, and no native cryptocurrency or gas.

---

## 3. Hyperledger Besu

Sources:
- https://github.com/besu-eth/besu/releases (VERIFIED: 26.11.2 "Latest", 23 Nov 2026)
- https://docs.besu-eth.org/private-networks (VERIFIED)
- https://docs.besu-eth.org/private-networks/how-to/configure/consensus/ibft (VERIFIED)

Facts:
- Besu is an Ethereum client (Java) for public Ethereum and private/permissioned networks. (VERIFIED/ESTABLISHED)
- Private networks typically use proof of authority: QBFT or IBFT 2.0. "IBFT 2.0 is supported for existing private networks, but QBFT is the recommended enterprise-grade consensus protocol for private networks." (VERIFIED)
- Besu supports permissioning (node and account allowlists). (VERIFIED in general; detail of onchain permissioning not re-read)
- **Private transactions removed:** the 26.11.x release notes refer to privacy types "orphaned when private transaction support was removed." (VERIFIED wording; exact removal version NOT VERIFIED.) The page must therefore not say Besu supports private transactions via Tessera. Confidentiality on Besu networks has to be designed through network segmentation, off-chain data with on-chain hashes or commitments, or privacy layers such as LFDT Paladin (incubating).
- Smart contracts: Solidity or Vyper on the EVM, with standard Ethereum tooling. (ESTABLISHED)
- Clique status: NOT VERIFIED. Don't mention it.

Where Besu fits: organizations that want EVM compatibility, Solidity tooling, token standards (ERC-20/721/1155/3643-style), or a path to public Ethereum or its layer 2s.

---

## 4. R3 Corda

Sources (SECONDARY: found via search; direct fetch of docs.r3.com returned 403):
- https://docs.r3.com/en/platform/corda/eol-schedule.html
- https://docs.r3.com/en/platform/corda/5.2/release-notes/support.html
- https://docs.r3.com/en/platform/corda.html
- https://r3.com/

Facts:
- The supported documentation table covers Corda 4.8 through 4.14. 4.14 was released 03/2026, with 4.15 planned for 12/2026. (SECONDARY)
- Corda 5.2 support dates in R3 docs end 04/2026. (SECONDARY)
- R3's homepage references a separate "Corda protocol" launched with a Corda Foundation, labelled "Launching Q4 2026". This is not yet established, so **don't mention it in the page.**
- Architecture (ESTABLISHED): Corda shares transactions point-to-point only with the parties involved, rather than broadcasting to all nodes. Notary services provide uniqueness (double-spend) consensus. CorDapps are written in Kotlin or Java and use states, contracts and flows.

Where Corda fits: bilateral or small-group financial workflows where only the transacting parties should ever see the data, such as syndicated lending, trade finance and capital markets.

**ClickMasters capability:** the current enterprise page mentions Fabric and Besu but not Corda, and no Corda service page was found on the site. **Corda delivery capability requires company confirmation.**

---

## 5. Linux Foundation Decentralized Trust (LFDT)

Sources: https://www.lfdecentralizedtrust.org/ and https://www.lfdecentralizedtrust.org/projects (VERIFIED)

- LFDT hosts the Hyperledger projects, including Fabric and Besu.
- Graduated: Besu, Cacti, Fabric, FireFly, Hiero, Indy, Iroha.
- Incubating, among others: AnonCreds, Identus, Paladin, Web3j, IBC.
- Formation date: NOT VERIFIED on pages read. Don't state a date.

---

## 6. Enterprise Ethereum Alliance

Source: https://entethalliance.org/ (VERIFIED)
- Member-led nonprofit founded 2017 (schema metadata). It published a "State of Privacy on Ethereum for Enterprise" report in May 2026.
- Spec-level claims were not verified, so don't cite specific EEA specifications.

---

## 7. Managed blockchain services (portability lesson)

| Service | Fact | Source |
|---|---|---|
| Azure Blockchain Service | New deployments stopped 10 May 2021. Service retired 10 Sep 2021. | SECONDARY: https://www.theregister.com/2021/05/13/azure_blockchain_eol/ , https://learn.microsoft.com/en-us/answers/questions/556870/microsoft-blockchain-service-discontinued |
| IBM Blockchain Platform | Support ended 30 Apr 2023. Customers moved to IBM Support for Hyperledger Fabric. | SECONDARY: https://www.ibm.com/support/pages/node/6952383 |
| Amazon Managed Blockchain | Not available to new customers from 29 Oct 2026. Existing customers can use it until 30 Sep 2027. | VERIFIED: https://aws.amazon.com/managed-blockchain/ |

**Why it matters to buyers:** enterprise networks often outlive the vendor services that host them. Architecture decisions should favor open-source clients, infrastructure as code, and deployments the organization can move between clouds or on-premises. Of all the competitors reviewed, none makes this point. It's a credible differentiator for the page.

---

## 8. Architecture topics (ESTABLISHED; general practice, no single source)

- **Node roles:** Fabric uses peers (endorsing/committing), orderers and CAs. Besu uses validators, bootnodes and RPC/member nodes. Corda uses nodes and notaries.
- **Consensus:** CFT (Raft) tolerates crashes. BFT (SmartBFT, QBFT) tolerates a minority of faulty or malicious validators. BFT needs at least 3f+1 nodes to tolerate f faulty ones (e.g. 4 validators tolerate 1).
- **Identity:** X.509/PKI, MSPs, certificate rotation and revocation, HSM-backed keys for signing.
- **On-chain vs off-chain:** keep personal and bulky data off-chain. Store hashes, references and state transitions on-chain. Use off-chain stores (databases, object storage, IPFS where appropriate) with access control.
- **Privacy and regulation:** immutability conflicts with erasure rights (e.g. GDPR Art. 17). The common mitigation is no personal data on-chain, plus deletable off-chain records or crypto-shredding. Fabric private data purge helps but does not remove hashes.
- **HA/DR:** multiple nodes per organization across availability zones, ledger snapshots/backups, CA and key backup, and runbooks for validator loss and certificate expiry.
- **Governance:** member onboarding and offboarding, chaincode/contract upgrade approval (Fabric's lifecycle requires approvals from organizations per policy), validator set changes, cost sharing, dispute resolution, and exit rules.

## 9. Integration patterns (ESTABLISHED and SECONDARY)

- **ERP/SAP pattern:** a business event in the ERP (e.g. goods issue) triggers a ledger transaction through an integration layer, so users keep their existing screens. SAP community blogs describe S/4HANA events sent via messaging into a Fabric network. (SECONDARY, 2018–2019 sources; the pattern is still valid, product names may have changed)
- **Integration layer:** REST/gRPC API services, event streaming (Kafka, RabbitMQ), outbox pattern for reliable publishing, idempotent transaction submission, and block/event listeners that update read models.
- **Middleware:** Hyperledger FireFly provides APIs, event streams, identity and token abstractions over multiple chains. (VERIFIED as a graduated project; docs fetch failed)
- **Oracles:** external data feeds signed by trusted parties for on-chain use.
- **Interoperability:** Hyperledger Cacti; bridges; anchoring hashes to a public chain for public verifiability.

## 10. Security topics (ESTABLISHED)

- Role- and attribute-based access control (Fabric attribute-based access control via certificate attributes; Besu account/node permissioning)
- Key management: HSMs/cloud KMS, key rotation, separation of duties, signer services
- Smart contract and chaincode security: unit and integration tests, static analysis, peer review, independent audit for high-value logic. Chaincode determinism matters (non-deterministic code causes endorsement mismatches).
- Node hardening: TLS/mTLS between nodes, network segmentation, patching cadence, secrets management
- Monitoring: Prometheus/Grafana metrics (Fabric and Besu both expose metrics), log aggregation, alerting on block production, endorsement failures and certificate expiry
- Incident response: runbooks, key compromise procedures, consortium communication plan

## 11. Compliance positioning (rule for copy)

Blockchain does not make an organization compliant with HIPAA, GDPR, SOX, PCI DSS, AML/KYC rules or any other regime. Compliance depends on jurisdiction, data classification, implementation and operating controls. The page may say a ledger *can support* audit trails and evidence. It must not say the technology *ensures* compliance.

## 12. Things the page must NOT claim

- That Besu supports private transactions (removed)
- That IBFT is the recommended Besu consensus (QBFT is)
- Hosting on Azure Blockchain Service, IBM Blockchain Platform, or new Amazon Managed Blockchain deployments
- Corda 5 for new builds
- "FedRAMP-ready" (on the current page). FedRAMP authorizes cloud services through a formal process. A custom-built network isn't "FedRAMP-ready" unless deployed on authorized infrastructure with an ATO path. **Remove unless the company can substantiate it.**
- Fixed prices, timelines, TPS figures, ROI or savings
