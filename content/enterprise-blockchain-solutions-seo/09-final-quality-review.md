# 09 — Final Competitor and SEO Quality Review

**Reviewed:** `05-new-enterprise-blockchain-content.md` (final draft), against the competitors in `01-competitor-research.md`
**Date:** 26 November 2026

No rankings, indexing or traffic outcomes are promised. Results depend on the site's overall authority, technical health, competition and search-engine changes.

---

## 1. Scorecard

| Criterion | Assessment | Notes |
|---|---|---|
| Search intent satisfaction | **Strong** | Covers the informational layer (definition, network types, platforms) that IBM-style results reward, and the commercial layer (services, process, CTA) that agency results reward |
| Topical coverage | **Strong** | Broader than every competitor reviewed on fit guidance, platform status, integration patterns, limitations and trade-offs. See the matrix in file 01. |
| Technical accuracy | **Strong, pending sign-off** | Reflects Fabric v2.5 LTS and v3 SmartBFT, Besu QBFT, removal of Besu private transactions, Corda 4 vs 5 status, and the Azure/IBM/AWS service closures. Facts trace to file 03. |
| Enterprise relevance | **Strong** | Governance, integration, compliance, operations and procurement deliverables are all addressed |
| Keyword targeting | **Good** | Primary keyword in title, H1, first H2, FAQ, final H2. 7 exact-match uses in about 5,500 words. Variants carry the rest. No stuffing. |
| Originality | **Strong** | Written from scratch. Structure, wording and examples differ from the current page and all competitors. No competitor sentences were reused. |
| Readability | **Good** | Short paragraphs, tables for comparisons, jargon explained on first use. Some platform sections are dense for non-technical readers, but they sit mid-page, after the business framing. |
| Conversion | **Good** | Hero CTA, soft CTA anchor, CTA after integration and cost-related links, final CTA plus email. A mid-page CTA could be added after the industries section if the template supports a CTA block. |
| E-E-A-T | **Weakest area** | Expertise is shown through accurate, specific content. **Experience and trust signals are missing:** no verified case studies, named experts, certifications or reviews. Only the company can fix this (see section 3). |
| Internal linking | **Strong** | 29 links, 27 verified destinations, descriptive varied anchors, cannibalization managed (file 07) |
| Structured data | **Good** | Valid Organization/WebPage/Service/Breadcrumb graph. FAQPage optional, generated from the visible text. No fabricated fields. |
| Unsupported claims | **Controlled** | All company-specific claims are either supported by existing site statements or wrapped in `[CONFIRM]` notes |

---

## 2. Issues found during review and fixed

| Issue | Fix applied |
|---|---|
| "Most of the networks we're asked to build are permissioned consortium networks" implied unverified delivery history | Reworded to a market statement: "most multi-company use cases call for…" |
| "Guarantee that each business event is written exactly once" overstated what queues provide | Reworded: queues plus idempotent design "prevent a business event from being lost or recorded twice" |
| Parent hub page wasn't linked | Added a link to /service/blockchain-development-services in the services intro |
| Same anchor used twice for the cost guide | FAQ anchor changed to "breakdown of enterprise blockchain costs" |
| Corda risked appearing as a confirmed service | Paragraph framed as advisory, with a CONFIRM note. Corda is not in the services list or schema. |
| The current page recommends Besu with IBFT | New copy recommends QBFT, per Besu docs |
| The current page lists public Web3 tools as "Integrations" | Replaced with enterprise integration patterns (ERP, CRM, queues, payments, legacy) |
| Compliance language risk | Explicit statement that blockchain doesn't make a business compliant |
| Security absolutes | "Tamper-evident, not invulnerable" framing. No "unhackable" or "bank-grade" claims. |
| Fixed prices and timelines | Removed. Cost drivers and a discovery-first estimate instead. Existing ranges kept only as a CONFIRM note. |

## 3. Remaining weaknesses (require ClickMasters input)

Ranked by impact:

1. **No verified proof of delivery.** The strongest competitors (ScienceSoft, Vention) win on named case studies. Even one anonymized enterprise case study ("a regional logistics consortium of five carriers…") with real scope, stack and outcome would substantially improve trust. The homepage's "illustrative" examples can't be used.
2. **No named experts.** Add an author or reviewer box ("Technical review by [Name], Lead Blockchain Architect") with a short bio. This improves E-E-A-T, and readers can see it.
3. **No certifications.** If the company holds ISO 27001 or SOC 2, or staff hold Linux Foundation certifications, add them. Don't imply them otherwise.
4. **Unsubstantiated site-wide claims.** "Since 2014", "1,000+ projects", "FedRAMP-ready", "95%+ coverage", "24/7 on-chain alerting" and "formal verification + 3rd party" appear elsewhere on the site. If they can't be evidenced, removing them protects credibility with enterprise procurement teams, who do check.
5. **Capability confirmations:** Corda delivery; enterprise (permissioned) tokenization scope; post-launch support/SLA model; NDA-before-first-meeting practice; whether fixed-price scoping applies to enterprise work; serving regions (`areaServed`).
6. **Stale linked page:** `/cost/enterprise-blockchain-cost` says "2025" in its title and H1.
7. **Unrelated related-links block** in the current template (political campaign finance, yield aggregation, etc.) dilutes topical relevance. Trim it.

## 4. Technical facts to have an engineer sign off

These are accurate per the sources in file 03, but they move quickly or came from secondary sources:
- Besu private transaction removal: release-note wording verified, exact version not
- Corda 4.14 as the current supported release, and Corda 5.2's end-of-support date (R3 docs found via search; direct fetch was blocked)
- Amazon Managed Blockchain dates (29 Oct 2026 closed to new customers; 30 Sep 2027 end): verified on the AWS page, but recheck at publication
- Fabric chaincode languages (Go, Node.js, Java) and Corda languages (Kotlin, Java): well established, not re-fetched

## 5. Competitive position summary

| Dimension | New page vs best competitor |
|---|---|
| Decision support (fit, trade-offs, limitations) | **Ahead** of all reviewed |
| Technical currency | **Ahead.** Several competitors still list Quorum, IBM Blockchain Platform or Amazon Managed Blockchain. |
| Integration depth | **On par with or ahead of** Innowise and Vention |
| Process clarity | **Ahead** (deliverables per stage) |
| FAQ coverage | **On par with or ahead of** Innowise (14 vs 10) |
| Pricing transparency | **Behind** PixelPlex and ScienceSoft, which publish ranges. Fix only with real company pricing data. |
| Proof and trust signals | **Behind** ScienceSoft, Vention and Kaleido, pending company input |

## 6. Pre-publication checklist

- [ ] Resolve all 9 `[CONFIRM: …]` notes in file 05, then delete them
- [ ] Engineer sign-off on section 4 facts
- [ ] Legal/compliance glance at the security and compliance paragraph
- [ ] Implement title, meta, single H1 and breadcrumb (file 06)
- [ ] Recrawl all 27 internal destinations
- [ ] Add JSON-LD (file 08) and validate in the Rich Results Test
- [ ] Create original diagrams (file 06, section 4)
- [ ] Remove the old page's FAQ schema and unrelated related-links block
- [ ] After launch: monitor queries and positions for this URL in Search Console for 8–12 weeks before further changes
