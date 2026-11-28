# 08 — Structured Data Recommendations

All JSON-LD below has been parsed as valid JSON. Before publishing, run it through Google's Rich Results Test (https://search.google.com/test/rich-results) and the Schema Markup Validator (https://validator.schema.org/).

## 1. What to use, and why

| Type | Use? | Reason |
|---|---|---|
| **Organization** | Yes | Identifies the business. Uses only verified facts: name, URL, email, contact page. |
| **WebSite / WebPage** | Yes | Connects the page to the site and the service entity via `@id` |
| **Service** | Yes | Describes the offering. **No `offers.price`**, because no verified prices exist. |
| **BreadcrumbList** | Yes | Matches the visible breadcrumb (Home › Services › Enterprise Blockchain Solutions) |
| **FAQPage** | Optional (see note) | The visible page has 14 FAQs, so the markup is legitimate. But Google has limited FAQ rich results to well-known, authoritative government and health websites since August 2023. A commercial services site should not expect an FAQ rich result. The markup is still valid, harmless and readable by other systems. Include it only if the template can guarantee the markup always matches the visible FAQ text. |
| AggregateRating / Review | **No** | No verified reviews exist on the site. Adding them would breach Google's guidelines and the "no fabrication" rule. |
| LocalBusiness / PostalAddress | **No** | No verified street address. The site only says "USA". |
| `foundingDate`, `award`, `numberOfEmployees` | **No** | Not verified ("since 2014" is unsubstantiated) |
| `sameAs` | Add later | **CONFIRM:** the company's official LinkedIn, Clutch, GitHub or X profiles. Add only URLs the company controls. |
| `logo` | Add | **CONFIRM:** the absolute URL of the logo file (not found during research) |

## 2. Main graph (Organization + WebSite + WebPage + Service + BreadcrumbList)

Place it in a single `<script type="application/ld+json">` in the page `<head>` or body.

**Before publishing:**
- Add `"logo": "https://…/logo.png"` to Organization once the URL is confirmed.
- Confirm that `/service` (not `/services`) is the canonical services index for the breadcrumb.
- `areaServed: "Worldwide"` assumes the company serves international clients. **CONFIRM**, or change it to `"United States"`.
- Remove any service from `hasOfferCatalog` that the company doesn't actually offer.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://clickmastersblockchaintechnologies.com/#organization",
      "name": "ClickMasters Blockchain Technologies",
      "url": "https://clickmastersblockchaintechnologies.com/",
      "email": "sales@clickmastersblockchaintechnologies.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "sales@clickmastersblockchaintechnologies.com",
        "url": "https://clickmastersblockchaintechnologies.com/contact"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://clickmastersblockchaintechnologies.com/#website",
      "url": "https://clickmastersblockchaintechnologies.com/",
      "name": "ClickMasters Blockchain Technologies",
      "publisher": { "@id": "https://clickmastersblockchaintechnologies.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions#webpage",
      "url": "https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions",
      "name": "Enterprise Blockchain Solutions & Development | ClickMasters",
      "description": "Enterprise blockchain solutions for multi-party processes: consulting, Hyperledger Fabric and Besu networks, ERP integration, security and operations.",
      "isPartOf": { "@id": "https://clickmastersblockchaintechnologies.com/#website" },
      "about": { "@id": "https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions#service" },
      "breadcrumb": { "@id": "https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions#breadcrumb" },
      "inLanguage": "en-US"
    },
    {
      "@type": "Service",
      "@id": "https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions#service",
      "name": "Enterprise Blockchain Solutions",
      "serviceType": "Enterprise blockchain development",
      "description": "Consulting, architecture, development, integration and operation of permissioned and consortium blockchain networks on Hyperledger Fabric and Hyperledger Besu, connected to ERP, CRM, payment and legacy systems.",
      "url": "https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions",
      "provider": { "@id": "https://clickmastersblockchaintechnologies.com/#organization" },
      "areaServed": "Worldwide",
      "audience": {
        "@type": "BusinessAudience",
        "audienceType": "Enterprises, financial institutions, supply chain, healthcare, insurance and public-sector organizations"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Enterprise blockchain services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise blockchain consulting and use-case validation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain architecture and platform selection" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Permissioned and private blockchain development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Consortium network design and governance" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Smart contract and chaincode development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Enterprise blockchain integration" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Blockchain infrastructure, deployment and operations" } }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://clickmastersblockchaintechnologies.com/service/enterprise-blockchain-solutions#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://clickmastersblockchaintechnologies.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://clickmastersblockchaintechnologies.com/service" },
        { "@type": "ListItem", "position": 3, "name": "Enterprise Blockchain Solutions" }
      ]
    }
  ]
}
```

## 3. FAQPage (optional)

Generated directly from the FAQ section of `05-new-enterprise-blockchain-content.md`, so the text matches the visible answers (links removed). **If any FAQ wording changes during editing, regenerate or update this block to match.** Mismatched FAQ markup violates Google's structured-data guidelines.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are enterprise blockchain solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enterprise blockchain solutions are shared-ledger systems built for businesses rather than public cryptocurrency networks. A known group of organizations runs the network. Every participant is identified, and access to data is controlled. They're used to share records, automate multi-party workflows and create audit trails that no single participant can alter."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a private and a public blockchain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Anyone can join and read a public blockchain such as Ethereum, and anyone can help validate it. A private or permissioned blockchain restricts participation to approved organizations and controls who can read and write data. Enterprises usually choose permissioned networks for confidentiality, predictable performance and clear governance. They may still connect to public chains to settle tokenized assets or publish proofs."
      }
    },
    {
      "@type": "Question",
      "name": "Which blockchain platform is best for enterprise use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No single platform is best. Hyperledger Fabric suits multi-organization networks that need fine-grained data segregation. Hyperledger Besu suits teams that want Ethereum compatibility, token standards or a path to public networks. R3 Corda suits financial workflows where only the transacting parties should see each deal. The right choice depends on privacy needs, token requirements, team skills and governance, which is why we assess those first."
      }
    },
    {
      "@type": "Question",
      "name": "Is Hyperledger Fabric suitable for enterprise applications?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Fabric was designed for permissioned enterprise networks and is actively maintained, with v2.5 as the long-term support release and the v3 line adding Byzantine fault-tolerant ordering. Its channels and private data collections are well suited to networks where competitors share infrastructure. It does require skilled operation, particularly around certificates and network upgrades."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Hyperledger Fabric and Corda?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fabric keeps a shared ledger per channel, and every channel member holds a copy, with private data collections for finer control. Corda shares each transaction only with the parties involved, and a notary prevents double-spending. Fabric is more common in supply chain and cross-industry consortia. Corda is used mainly in regulated financial services. Fabric chaincode is written in Go, Node.js or Java; Corda applications in Kotlin or Java."
      }
    },
    {
      "@type": "Question",
      "name": "Can blockchain integrate with existing ERP systems?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, and in most successful projects it has to. Integration services listen for business events in systems such as SAP, Oracle or Microsoft Dynamics and write them to the ledger automatically. Ledger events flow back the same way. Users keep working in their existing ERP screens. Message queues and APIs handle retries, ordering and partners that don't run their own nodes."
      }
    },
    {
      "@type": "Question",
      "name": "How much does enterprise blockchain development cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the number of organizations, platform, contract complexity, integration scope, security requirements and support needs. A proof of concept costs far less than a production consortium network. We provide an estimate after a discovery phase, once scope is clear enough to price responsibly. For more detail, see our breakdown of enterprise blockchain costs."
      }
    },
    {
      "@type": "Question",
      "name": "How long does enterprise blockchain implementation take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A focused proof of concept is much faster than a multi-organization production rollout, where partner onboarding, governance agreements, security reviews and integration testing usually set the pace. We give you a timeline after discovery, based on your actual scope and the number of organizations involved."
      }
    },
    {
      "@type": "Question",
      "name": "Is enterprise blockchain secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A well-built enterprise blockchain is tamper-evident and attributes every transaction to a verified identity, which is a strong security foundation. It is not automatically secure, though. Risks come from weak key management, contract bugs, misconfigured permissions and poorly maintained infrastructure. Security depends on design, testing, key management and day-to-day operations."
      }
    },
    {
      "@type": "Question",
      "name": "What industries benefit from enterprise blockchain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The strongest fits are industries where several independent organizations share a process: banking and capital markets, trade finance, supply chain and logistics, manufacturing, insurance, healthcare data exchange, real estate and public-sector procurement. Industry matters less than process. If several parties must trust the same records, blockchain is worth evaluating."
      }
    },
    {
      "@type": "Question",
      "name": "Does every enterprise need a private blockchain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. If one organization controls the process and its partners already trust it, a conventional database with good access controls and APIs is usually cheaper and simpler. A private blockchain run by a single company often adds cost without a real benefit. Blockchain earns its place when multiple organizations need a shared record that none of them controls alone."
      }
    },
    {
      "@type": "Question",
      "name": "What is a consortium blockchain?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A consortium blockchain is a permissioned network governed jointly by several organizations, often from the same industry. Members agree on rules for joining, validating transactions, upgrading smart contracts and sharing costs. It sits between a fully public network and a single company's private network. It's the most common model for industry-wide enterprise blockchain projects."
      }
    },
    {
      "@type": "Question",
      "name": "Can an existing blockchain network be migrated or upgraded?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Usually, yes. Common examples include moving off a retired managed service such as Azure Blockchain Service or Amazon Managed Blockchain, upgrading Fabric to a supported version, or migrating from GoQuorum to Hyperledger Besu. Migration needs careful planning for node identities, ledger data, certificates and contract state, plus a rollback plan."
      }
    },
    {
      "@type": "Question",
      "name": "Do partners need to run their own nodes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not always. Larger members typically run nodes to hold their own copy of the ledger and take part in validation. Smaller partners can connect through secure APIs or a web portal, with their transactions still signed under their own identity. The right mix is a governance decision we help consortium members make early."
      }
    }
  ]
}
```

## 4. Site-wide consistency notes

- If other templates already output an Organization entity, reuse the same `@id` (`https://clickmastersblockchaintechnologies.com/#organization`) rather than defining a second, conflicting one.
- Don't add ratings, reviews, prices or awards to any schema on the site unless they're verifiable and visible on the page.
- If the old page output FAQ schema with its previous questions, remove it when the new content goes live.
