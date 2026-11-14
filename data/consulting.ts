/**
 * Content for the blockchain consulting enquiry journey:
 *   - /faqs/blockchain-development-consulting-enterprise  (supporting buyer guide)
 *   - /service/blockchain-consulting                      (commercial landing page)
 *
 * Source: "Blockchain consulting: developer implementation handoff" (11 Nov 2026).
 *
 * Claims policy (BC-06, BC-09): this file deliberately contains no prices,
 * durations, project counts, response deadlines, named advisers, clients or
 * certifications. Add any of them only after the business owner has verified
 * the evidence, and record who approved it.
 */

export const CONSULTING_FAQ_PATH =
  "/faqs/blockchain-development-consulting-enterprise";
export const CONSULTING_SERVICE_PATH = "/service/blockchain-consulting";

export type TextItem = { title: string; description: string };
export type QA = { question: string; answer: string };
export type ResourceLink = { title: string; description: string; href: string };

/* ------------------------------------------------------------------------ */
/* Shared                                                                    */
/* ------------------------------------------------------------------------ */

export const sampleAssessment = {
  label: "Illustrative example — not a client engagement",
  title: "Sample feasibility assessment: shared supplier traceability records",
  scenario:
    "A fictional regional food distributor works with about 40 suppliers and a group of retail customers. Retailers want lot-level traceability so that recalls can be answered quickly. The distributor asks whether a blockchain network is needed to share these records.",
  assumptions: [
    "The distributor already runs the central order and inventory system, and retailers accept its records today.",
    "Suppliers use different systems; some can integrate through an API, others only through a web form.",
    "Records contain commercial details (prices, volumes) that suppliers do not want visible to each other.",
    "No regulator or retailer requires participants to operate their own infrastructure.",
  ],
  options: [
    {
      title: "Option A — Central database with partner access",
      description:
        "Extend the existing system with a traceability data model, supplier submission API and web form, role-based access for retailers, and an append-only audit log.",
    },
    {
      title: "Option B — Permissioned blockchain network",
      description:
        "Each participant operates or hosts a node on a permissioned network. Custody events are written to a shared ledger, with private channels for commercial data.",
    },
    {
      title: "Option C — Hybrid: central database with tamper-evidence",
      description:
        "Option A, plus periodic cryptographic fingerprints of the audit log published to an external ledger so that later changes to historical records can be detected.",
    },
  ],
  recommendation:
    "Start with Option A, and evaluate Option C if retailers ask for independent proof that historical records have not been altered. Option B is not recommended under these assumptions.",
  rationale: [
    "One party is already trusted to operate the shared record, so the multi-party trust problem that a blockchain network addresses is limited.",
    "Most suppliers would need hosted nodes or a web portal anyway, which removes much of the decentralization benefit of Option B.",
    "Options A and C keep commercial data under conventional access controls, which is simpler to govern than private channels across many organizations.",
    "The recommendation should be revisited if retailers or a consortium require that no single company controls the record.",
  ],
  limitations: [
    "This is a fictional scenario written to show the structure of a deliverable. It does not describe a customer project.",
    "No cost, timeline or performance figures are included; a real assessment derives them from the client's own systems and data.",
    "A real assessment is based on stakeholder interviews, review of current systems and documents, and review by a qualified team member.",
  ],
};

/* ------------------------------------------------------------------------ */
/* FAQ guide page                                                            */
/* ------------------------------------------------------------------------ */

export const consultingGuide = {
  metaTitle: "Enterprise Blockchain Consulting: Scope & Deliverables",
  metaDescription:
    "Explore enterprise blockchain consulting: feasibility, platform selection, vendor evaluation and business cases. See deliverables and discuss your requirements.",
  breadcrumb: "Enterprise blockchain consulting",
  eyebrow: "Enterprise consulting guide",
  h1: "What Does Enterprise Blockchain Consulting Include?",
  intro:
    "Enterprise blockchain consulting helps your team evaluate whether blockchain fits a business process, compare platform options, and plan the next step before committing to development. This guide explains the decisions, deliverables, and questions to discuss with an adviser.",
  primaryCta: { label: "Discuss Your Blockchain Use Case", href: "#contact" },
  secondaryCta: {
    label: "Explore Blockchain Consulting Services",
    href: CONSULTING_SERVICE_PATH,
  },
  readGuide: { label: "Read the guide", href: "#faq-content" },

  directAnswer: {
    heading: "Short answer",
    paragraphs: [
      "Enterprise blockchain consulting is advisory work that happens before any development commitment. It answers whether blockchain is the right tool for a specific business process, which kind of network and platform would fit, whether to build, buy or partner, and how to assess the vendors involved.",
      "The output is a set of written recommendations your team can act on — with internal developers, another vendor, or ClickMasters. The cost and duration of an engagement depend on its scope, which is agreed after an initial requirements discussion.",
    ],
  },

  deliverables: [
    {
      title: "Feasibility recommendation",
      description:
        "A written recommendation on whether blockchain, a conventional database, or a hybrid approach fits the process — with the rationale and the assumptions it depends on.",
    },
    {
      title: "Platform decision matrix",
      description:
        "Where blockchain is justified: public or permissioned network, candidate platforms, and how each scores against your specific requirements.",
    },
    {
      title: "Build/buy comparison",
      description:
        "A comparison of building a custom solution, adopting an existing product, or partnering with an industry platform, including the cost drivers and risks of each path.",
    },
    {
      title: "Vendor evaluation",
      description:
        "A structured framework for assessing development vendors or proposals you have already received: scope completeness, architecture choices, assumptions and delivery risk.",
    },
    {
      title: "Executive decision brief",
      description:
        "A concise summary of the recommendation, options and open risks, written for board members and executives who are not blockchain specialists.",
    },
  ] satisfies TextItem[],

  buyerFaqs: [
    {
      question: "When should we use a database instead of blockchain?",
      answer:
        "Use a conventional database when one organization controls the data and the other parties are willing to rely on it. A database with access controls and audit logging is usually simpler, faster and cheaper to operate. Blockchain is worth evaluating when several organizations that do not fully trust each other need to write to and rely on the same record, and no single party can or should operate it. A feasibility recommendation records which of these applies to your process and the assumptions behind that conclusion.",
    },
    {
      question: "What information do we need to provide?",
      answer:
        "A description of the business process and the problem you want to solve, the organizations and roles involved, the existing systems and data that would need to integrate, any regulatory or privacy constraints, and who will make the final decision. Vendor proposals you have already received are also useful. You do not need complete information to start; gaps are recorded as assumptions so that the recommendation shows what it depends on.",
    },
    {
      question:
        "Can you review a proposal from a vendor we are already talking to?",
      answer:
        "Yes. A vendor evaluation can review an existing proposal or delivery plan against your requirements, covering scope completeness, architecture choices, stated assumptions and delivery risk. The review is limited to the documents and information you share, so it is an assessment of the proposal rather than an audit of the vendor.",
    },
    {
      question: "What affects the price of a consulting engagement?",
      answer:
        "The main drivers are the number of stakeholders and organizations involved, the number of systems to integrate, data protection and privacy requirements, how many platform or vendor alternatives need evaluating, and which deliverables you need. Pricing is agreed after the initial requirements discussion, once the scope is defined.",
    },
    {
      question: "How is confidential information handled?",
      answer:
        "Do not send confidential documents, credentials, private keys or seed phrases through the initial enquiry form. If the evaluation will involve sensitive information, mention this in your enquiry so that confidentiality terms, such as a non-disclosure agreement, can be discussed and agreed before those details are shared.",
    },
    {
      question: "Do we have to use ClickMasters for development afterwards?",
      answer:
        "No. Consulting deliverables are written so that they can be used by your internal team or by another vendor. If you later want ClickMasters to carry out development, that work is scoped and agreed separately from the consulting engagement.",
    },
  ] satisfies QA[],

  resources: [
    {
      title: "Blockchain vs traditional database",
      description: "A decision framework for the first feasibility question.",
      href: "/comparison/blockchain-vs-traditional-database",
    },
    {
      title: "Hyperledger Fabric vs Ethereum",
      description:
        "How permissioned and public platforms compare for enterprise use.",
      href: "/comparison/hyperledger-fabric-vs-ethereum",
    },
    {
      title: "Enterprise blockchain vendor evaluation",
      description: "Criteria for assessing blockchain development vendors.",
      href: "/resources/enterprise-blockchain-vendor-evaluation",
    },
  ] satisfies ResourceLink[],
};

/* ------------------------------------------------------------------------ */
/* Service page                                                              */
/* ------------------------------------------------------------------------ */

export const consultingService = {
  metaTitle: "Blockchain Consulting Services for Enterprise",
  metaDescription:
    "Evaluate blockchain feasibility, compare platforms and review vendors. Explore consulting deliverables and discuss your enterprise requirements with ClickMasters.",
  breadcrumb: "Blockchain consulting",
  eyebrow: "Blockchain consulting",
  h1: "Blockchain Consulting Services for Enterprise Decisions",
  intro:
    "Evaluate whether blockchain fits your business process, compare implementation options, and define a practical next step. Discuss your requirements for feasibility assessment, platform selection, vendor review, or an implementation roadmap.",
  primaryCta: { label: "Request a Consulting Discussion", href: "#contact" },
  secondaryCta: {
    label: "View a Sample Assessment",
    href: "#sample-assessment",
  },
  supportingLine:
    "Tell us the decision you need to make and the systems involved. We will review your enquiry and discuss an appropriate scope.",

  decisions: [
    {
      title: "Blockchain vs database",
      description:
        "Find out whether your process has a genuine multi-party trust problem, or whether a conventional database would serve it better.",
      href: "#deliverable-feasibility",
    },
    {
      title: "Public vs permissioned network",
      description:
        "Compare open public networks with permissioned networks for privacy, governance, cost and participant control.",
      href: "#deliverable-platform",
    },
    {
      title: "Build vs buy",
      description:
        "Weigh a custom build against adopting an existing product or joining an industry platform.",
      href: "#deliverable-roadmap",
    },
    {
      title: "Platform or vendor evaluation",
      description:
        "Assess candidate platforms, or review vendor proposals you have already received, against your requirements.",
      href: "#deliverable-platform",
    },
  ],

  deliverables: [
    {
      id: "deliverable-feasibility",
      title: "Feasibility brief",
      description:
        "A written recommendation on whether blockchain, a conventional database or a hybrid approach fits the process, with the reasoning behind it.",
    },
    {
      id: "deliverable-requirements",
      title: "Requirements and assumptions",
      description:
        "The business, technical, data and regulatory requirements the recommendation is based on, and the assumptions that still need confirming.",
    },
    {
      id: "deliverable-platform",
      title: "Platform comparison",
      description:
        "A comparison of candidate network types, platforms or vendor proposals, scored against your requirements.",
    },
    {
      id: "deliverable-risk",
      title: "Risk register",
      description:
        "Technical, operational, security and adoption risks for the recommended option, with suggested mitigations.",
    },
    {
      id: "deliverable-roadmap",
      title: "Prioritised roadmap",
      description:
        "The recommended next steps — including build, buy or partner options — in priority order, ready for internal planning or a vendor brief.",
    },
  ],

  engagementSteps: [
    {
      title: "Requirements discussion",
      description:
        "We discuss the decision you need to make, the process and parties involved, and the information available.",
    },
    {
      title: "Agreed scope and commercial terms",
      description:
        "We agree which questions the engagement will answer, which deliverables you will receive, and the commercial terms.",
    },
    {
      title: "Assessment",
      description:
        "We review your systems, documents and requirements, speak with stakeholders as agreed, and evaluate the options.",
    },
    {
      title: "Findings review and next steps",
      description:
        "We walk through the findings and recommendations with your team and agree what happens next.",
    },
  ] satisfies TextItem[],

  feeDrivers: [
    "Stakeholder count",
    "Integrations",
    "Data/privacy requirements",
    "Alternatives evaluated",
    "Deliverables",
  ],

  questions: [
    {
      question: "Can you review the vendors or proposals we already have?",
      answer:
        "Yes. A consulting engagement can review proposals or delivery plans from vendors you are already speaking with, covering scope completeness, architecture choices, assumptions and delivery risk. The review is based on the documents and information you provide.",
    },
    {
      question: "How is confidential information handled?",
      answer:
        "Please do not send confidential documents, credentials, private keys or seed phrases through the enquiry form. If the work will involve sensitive information, tell us in your enquiry so that confidentiality terms, such as a non-disclosure agreement, can be agreed before those details are shared.",
    },
    {
      question: "What do we need to provide?",
      answer:
        "A description of the process and problem, the organizations and roles involved, relevant existing systems, known regulatory or privacy constraints, and any vendor proposals you have received. Missing information is recorded as an assumption rather than blocking the start of the work.",
    },
    {
      question: "Who owns the deliverables?",
      answer:
        "Ownership and permitted use of the deliverables are set out in the engagement terms agreed before work starts. Ask about this during the requirements discussion if you plan to share the deliverables with other vendors or investors.",
    },
    {
      question: "Is development included?",
      answer:
        "No. Consulting covers the assessment and recommendations. The deliverables can be used by your internal team or another vendor. If you want ClickMasters to carry out development afterwards, it is scoped and agreed as a separate engagement.",
    },
  ] satisfies QA[],

  resources: [
    {
      title: "What does enterprise blockchain consulting include?",
      description:
        "Our buyer guide to consulting deliverables and the questions to ask before engaging an adviser.",
      href: CONSULTING_FAQ_PATH,
    },
    {
      title: "Blockchain vs traditional database",
      description: "A decision framework for the first feasibility question.",
      href: "/comparison/blockchain-vs-traditional-database",
    },
    {
      title: "Enterprise blockchain vendor evaluation",
      description: "Criteria for assessing blockchain development vendors.",
      href: "/resources/enterprise-blockchain-vendor-evaluation",
    },
  ] satisfies ResourceLink[],
};
