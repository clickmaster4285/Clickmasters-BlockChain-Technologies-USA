# 06 — On-Page SEO

## 1. Core elements

| Element | Recommendation | Notes |
|---|---|---|
| **URL** | `https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions`, **unchanged** | Already matches the primary keyword. Changing it would risk losing existing equity, and there is no SEO reason to change it. |
| **SEO title** | `Enterprise Blockchain Solutions & Development \| ClickMasters` | 58 characters. Primary keyword first, commercial variant second. The current title uses "Clickmasters"; keep whichever brand casing the site standardizes on. |
| Title alternative | `Enterprise Blockchain Solutions: Fabric, Besu & Integration \| ClickMasters` | 74 characters, so likely truncated. Use only if testing a platform-led title. |
| **Meta description** | `Enterprise blockchain solutions for multi-party processes: consulting, Hyperledger Fabric and Besu networks, ERP integration, security and operations. Talk to our team.` | About 165 characters. May truncate on mobile. Shorter option below. |
| Meta description (short) | `Permissioned blockchain networks on Hyperledger Fabric and Besu, integrated with your ERP and built to run in production. Find out if blockchain fits your process.` | About 160 characters |
| **H1** | `Enterprise Blockchain Solutions for Business Processes That Cross Company Lines` | One H1 only. Contains the primary keyword naturally. |
| Canonical | Self-referencing canonical to the URL above | |
| Robots | index, follow | |
| Open Graph title | `Enterprise Blockchain Solutions \| ClickMasters` | |
| OG description | Short meta description | |
| OG image | Custom 1200×630 image (see images) | |

## 2. Heading hierarchy

```
H1  Enterprise Blockchain Solutions for Business Processes That Cross Company Lines
H2  What Are Enterprise Blockchain Solutions?
  H3  Public, Private, Permissioned and Consortium Networks Compared
H2  Is Blockchain the Right Choice for Your Use Case?
H2  Our Enterprise Blockchain Development Services
  H3  Enterprise Blockchain Consulting and Use-Case Validation
  H3  Blockchain Architecture and Platform Selection
  H3  Permissioned and Private Blockchain Development
  H3  Consortium Network Design and Governance
  H3  Smart Contract and Chaincode Development
  H3  Enterprise Blockchain Integration
  H3  Enterprise Asset Tokenization
  H3  Applications, Dashboards and APIs
  H3  Infrastructure, Deployment and Ongoing Operations
H2  Enterprise Blockchain Platforms: Choosing the Right Foundation
  H3  Hyperledger Fabric
  H3  Hyperledger Besu
  H3  R3 Corda
  H3  When to Look Beyond These Platforms
  H3  A Note on Portability
  H3  What Drives the Platform Decision
H2  How a Production Enterprise Network Is Built
H2  Integrating Blockchain with ERP, CRM and Legacy Systems
H2  Enterprise Blockchain Security and Privacy
H2  Enterprise Blockchain Use Cases by Industry
  H3  Banking and Financial Services
  H3  Trade Finance
  H3  Supply Chain and Logistics
  H3  Manufacturing
  H3  Healthcare
  H3  Insurance
  H3  Real Estate
  H3  Government and Public Sector
  H3  Retail and Product Authentication
H2  How We Deliver Enterprise Blockchain Projects
H2  Benefits and Trade-Offs of Enterprise Blockchain
  H3  What Organizations Gain
  H3  What You Need to Plan For
H2  What Does Enterprise Blockchain Development Cost?
H2  Why Work with ClickMasters on Enterprise Blockchain
H2  Frequently Asked Questions About Enterprise Blockchain
  H3  ×14 questions
H2  Discuss Your Enterprise Blockchain Requirements
```

**Implementation notes:**
- The current page template places generic H2s ("Overview", "Quick estimate", "Related services", "Related guides", "Specialised solutions", "Also on this topic") below the content. If the template injects them automatically, demote them to non-heading elements or H3s, or rename them descriptively. Otherwise they add noise to the outline.
- FAQ questions can be H3s or an accordion (`<details>`). Either way, the answer text must be present in the HTML on load, not fetched on click.

## 3. Keyword placement map

| Location | Keyword(s) |
|---|---|
| Title | enterprise blockchain solutions, (enterprise blockchain) development |
| Meta | enterprise blockchain solutions, Hyperledger Fabric, Besu, ERP integration |
| H1 | enterprise blockchain solutions |
| First 100 words | "permissioned blockchain networks", "shared, tamper-evident record" (semantic). The primary phrase is in the H1 directly above. |
| H2 #1 | enterprise blockchain solutions |
| Network table | private / permissioned / consortium blockchain |
| Services H2 | enterprise blockchain development services |
| Services H3s | enterprise blockchain consulting, permissioned and private blockchain development, consortium, smart contract, enterprise blockchain integration, tokenization |
| Platforms H2/H3 | Hyperledger Fabric, Hyperledger Besu, R3 Corda, enterprise blockchain platform |
| Architecture | blockchain architecture, node infrastructure, consensus, identity |
| Integration H2 | blockchain ERP integration, CRM, legacy systems, APIs |
| Security H2 | enterprise blockchain security, privacy, key management |
| Industry H2 | enterprise blockchain use cases + industry terms |
| Process H2 | enterprise blockchain implementation (body), development process |
| Cost H2 | enterprise blockchain development cost |
| Why H2 | enterprise blockchain (development company in meta/schema) |
| FAQ | primary keyword in Q1, plus question-form long-tails |
| Final H2 | enterprise blockchain requirements |

## 4. Image recommendations

Use original diagrams. Don't use stock "glowing chain" art; it signals generic content to enterprise buyers. Compress to WebP, add explicit width and height, and lazy-load everything below the hero.

| # | Placement | Image | File name | Alt text |
|---|---|---|---|---|
| 1 | Hero | Simple diagram: four organizations (bank, supplier, carrier, insurer) connected to one shared ledger, each with its own node | `enterprise-blockchain-shared-ledger.webp` | Four organizations sharing one permissioned blockchain ledger, each running its own node |
| 2 | Network types | Four-quadrant graphic: public, private, permissioned, consortium | `blockchain-network-types-comparison.webp` | Comparison of public, private, permissioned and consortium blockchain networks |
| 3 | Fit section | Decision flowchart: "multiple organizations? → shared trust problem? → …" | `do-you-need-blockchain-decision-flow.webp` | Decision flowchart for deciding whether a business needs blockchain or a database |
| 4 | Platforms | Visual of Fabric channels and private data collections vs Besu shared network | `hyperledger-fabric-vs-besu-data-visibility.webp` | How data visibility differs between Hyperledger Fabric channels and a Hyperledger Besu network |
| 5 | Architecture | Layered architecture: nodes, identity/CA, consensus, smart contracts, off-chain storage, integration layer, apps | `enterprise-blockchain-architecture-layers.webp` | Layers of a production enterprise blockchain architecture, from nodes to applications |
| 6 | Integration | ERP → event → integration service/queue → ledger → event listener → CRM/data warehouse | `blockchain-erp-integration-pattern.webp` | Event-driven integration between an ERP system and an enterprise blockchain network |
| 7 | Process | 9-stage horizontal timeline | `enterprise-blockchain-delivery-process.webp` | Nine stages of enterprise blockchain delivery, from discovery to ongoing maintenance |
| 8 | OG/social | Branded card with H1 text | `enterprise-blockchain-solutions-og.webp` | (decorative; OG only) |

Decorative icons (service cards and similar) should use `alt=""`.

## 5. External authoritative references

Link sparingly, to sources that add credibility, with `rel="noopener"`. Use no `nofollow` for these, since they're authoritative.

| Anchor / placement | URL |
|---|---|
| Fabric paragraph: "long-term support release" | https://hyperledger-fabric.readthedocs.io/en/latest/whatsnew.html |
| Fabric: "private data collections" | https://hyperledger-fabric.readthedocs.io/en/latest/private-data/private-data.html |
| Besu: "recommends QBFT" | https://docs.besu-eth.org/private-networks/how-to/configure/consensus/ibft |
| Portability note: "Amazon Managed Blockchain" | https://aws.amazon.com/managed-blockchain/ |
| Platforms: "Linux Foundation Decentralized Trust" (optional, if a mention is added) | https://www.lfdecentralizedtrust.org/projects |
| Corda: "Corda 4 Enterprise" | https://docs.r3.com/en/platform/corda.html (verify that it loads in a browser; our fetch was blocked) |

Three to five external links is enough. They're optional, and the copy reads fine without them.

## 6. Breadcrumbs

Visible breadcrumb above the H1:

`Home › Services › Enterprise Blockchain Solutions`

- Home → `/`
- Services → `/service` (the site's footer "All Services" link; the services library page also exists at `/services`). **CONFIRM which one is canonical.** The footer uses `/service`, and `/services` returned 200 with the library title. Use the canonical one consistently in the breadcrumb and schema.
- Current page (not linked)

## 7. Technical on-page checks before publishing

- [ ] One H1. No template-injected duplicate H1.
- [ ] All `[CONFIRM: …]` notes removed
- [ ] Tables are real HTML `<table>` elements, not images, with `<th>` headers
- [ ] Anchor `#is-blockchain-right` and `#integration` IDs exist
- [ ] FAQ answers are in the initial HTML
- [ ] Core Web Vitals: hero image preloaded, no layout shift from a late-loading trust strip
- [ ] Remove or trim the long unrelated "Specialised solutions" link list (political campaign finance, nonprofit grants, cross-chain yield aggregation). It dilutes topical focus. Keep the relevant ones as contextual links in the body instead.
- [ ] Update `/cost/enterprise-blockchain-cost`'s "2025" title/H1
- [ ] Remove "FedRAMP-ready" sitewide unless substantiated
