# 04 — Search Intent and Content Strategy

## 1. Search intent

| Layer | What the searcher wants | How the page satisfies it |
|---|---|---|
| **Informational** (head term, IBM/Visa-style results) | "What is enterprise blockchain, how does it differ from crypto, which type do I need?" | Definition, network-type table, platform comparison, architecture overview |
| **Evaluative** | "Is it worth it for us? Which platform? What are the risks?" | Fit test (both sides), trade-offs, industry limitations, security, costs of ownership |
| **Commercial / vendor selection** | "Who can build and integrate this, and can I trust them?" | Services, process with deliverables, Why ClickMasters, CTA |

The page leads with business value, adds decision support in the middle, and converts at the end. Each major section ends with a link or CTA, so readers at any stage have a next step.

## 2. Target audience

| Persona | Primary concern | Content that answers it |
|---|---|---|
| CTO / CIO / enterprise architect | Platform fit, architecture, integration, long-term operability | Platforms H2, architecture H2, integration H2, portability note |
| Digital transformation / innovation lead | Is this real value or hype? How do I justify it internally? | Fit test, benefits vs trade-offs, PoC-first process |
| CFO / business sponsor | Cost, ROI, risk | Cost drivers, trade-offs, no guaranteed ROI, phased approach |
| CISO / risk / compliance | Security, privacy, regulation | Security H2, compliance disclaimer, off-chain personal data |
| Procurement / vendor management | What exactly will we receive? | Deliverables per stage, engagement flexibility |
| Industry operators (bank, insurer, manufacturer, hospital, agency) | "Does this apply to my sector?" | Industry H3s with challenge, solution and limitation, plus links to industry pages |
| Existing network owners | Migration from retired services, upgrades | Portability note, migration FAQ |

## 3. Buyer concerns → page response

| Concern | Response on page |
|---|---|
| Do we even need blockchain? | Dedicated section with criteria on both sides and a promise to say no |
| Which platform? | Comparison table plus selection factors. No single "best" claim. |
| Cost | Cost drivers, PoC-first approach, link to the cost guide. No invented prices. |
| Integration with existing systems | Six concrete patterns |
| Data privacy | Channels/collections, off-chain personal data, GDPR erasure tension, Besu privacy caveat |
| Governance | Consortium H3, architecture list, trade-offs |
| Scalability / performance | Treated honestly: "very high throughput with no multi-party trust problem → use a database". No TPS claims. |
| Security | Layered security H2. No absolute claims. |
| Long-term maintenance | Operations H3, stage 9, portability, "someone must own certificates" trade-off |
| Vendor selection | Why ClickMasters (verified points only) plus CONFIRM slots for proof |
| ROI | Benefits framed as possibilities. Explicitly no promised figure. |

## 4. Main conversion goal

**Primary:** discovery call booking (→ /contact). It appears in the hero and the final CTA.
**Secondary:** email to sales@ (final CTA), and engagement with the cost guide and consulting page (mid-funnel).
**Soft CTA:** the hero's "See if blockchain fits your use case" anchor. It keeps sceptical readers on the page.

## 5. Unique positioning

> **"The enterprise blockchain partner that tells you when you don't need one, and builds networks you can keep running after we leave."**

Three supporting pillars, each backed by page content:
1. **Honest fit assessment**: the fit section, the "a database is better when…" list, and limitations per industry
2. **Integration-first engineering**: the integration H2, plus stage 6 of the process
3. **Portable, production-grade delivery**: open-source clients, infrastructure as code, Kubernetes, runbooks, and the portability note on retired managed services

All three are consistent with statements already on the ClickMasters site: the About page says blockchain isn't always the right answer, and the current enterprise page lists IaC, CI and runbook deliverables. None of them requires an unverified claim.

## 6. Competitor content gaps we fill

1. Current technical status (QBFT, removed Besu private transactions, Fabric LTS/BFT, AWS closure)
2. Vendor and service lock-in, plus migration
3. Industry limitations, not just benefits
4. Concrete ERP integration patterns
5. Deliverables per delivery stage
6. Honest compliance statement

Gaps we **cannot** fill without company input: named case studies, certifications, team bios, verified reviews.

## 7. Recommended page structure (final)

1. Hero: H1, value proposition, primary CTA, soft CTA, [trust strip: CONFIRM]
2. What are enterprise blockchain solutions? → H3 network-type comparison table
3. Is blockchain the right choice? (fit test)
4. Enterprise blockchain development services (9 H3s)
5. Platforms: table, Fabric, Besu, Corda, beyond, portability, selection factors
6. How a production network is built (architecture)
7. Integration with ERP, CRM and legacy systems
8. Security and privacy (+ compliance statement)
9. Use cases by industry (9 H3s: challenge / help / limitation)
10. Delivery process (9-stage table + timeline note)
11. Benefits and trade-offs
12. Cost
13. Why ClickMasters
14. FAQs (14)
15. Final CTA

Why this order: definition and fit come before services. Enterprise buyers who distrust hype need to see that early. The technical sections sit mid-page for evaluators. Industry sections come after the technical foundation, so they can refer to it. Process, cost and proof cluster near the CTA, where vendor-selection readers look.

## 8. Internal linking opportunities

See `07-internal-linking-strategy.md`. 29 links (including 2 CTA links to /contact) to 27 verified destinations, each with descriptive and varied anchors.

## 9. Questions the page must answer

All answered on the page: what it is, how it works, public vs private vs consortium, do I need it, which platform, Fabric vs Corda, Fabric suitability, ERP integration, cost, timeline, security, industries, consortium definition, migration, whether partners must run nodes.

## 10. Tone and style rules applied

- Plain English first, technical terms explained on first use
- Short paragraphs. Tables wherever buyers compare options.
- No "revolutionize", "unlock", "seamless", "cutting-edge", "game-changer"
- Benefits phrased as "can" or "helps", never guaranteed
- Each industry section includes a limitation
