import {
  C,
  frame,
  box,
  arrow,
  text,
  timeline,
  pill,
  rect,
  path,
  decisionChain,
  numCircle,
  stack,
} from "../lib.mjs";

const K = "Enterprise Blockchain Solutions";

export default {
  slug: "enterprise-blockchain-solutions",
  contentDir: "enterprise-blockchain-solutions-seo",
  images: [
    {
      file: "enterprise-blockchain-shared-ledger.webp",
      placement: "Hero",
      alt: "Four organizations sharing one permissioned blockchain ledger, each running its own node",
      svg: () => {
        let body = "";
        const cx = 800,
          cy = 510;
        body += `<circle cx="${cx}" cy="${cy}" r="250" fill="none" stroke="${C.amber}" stroke-opacity="0.25" stroke-width="2" stroke-dasharray="4 10"/>`;
        body += box(cx - 190, cy - 110, 380, 220, {
          title: "Shared permissioned ledger",
          sub: "One agreed record. Identified members, controlled visibility, tamper-evident history",
          accent: true,
          titleSize: 24,
          subSize: 16,
        });
        const orgs = [
          ["Bank", "Trade finance & payments", 80, 200],
          ["Supplier", "Goods issued, invoices", 1120, 200],
          ["Carrier", "Custody & delivery events", 80, 640],
          ["Insurer", "Cover & claims", 1120, 640],
        ];
        orgs.forEach(([t, d, x, y]) => {
          body += box(x, y, 400, 150, {
            title: t,
            sub: d,
            align: "left",
            pad: 28,
            titleSize: 26,
            subSize: 16.5,
          });
          const nx = x + 400 - 124;
          body += pill(nx, y + 108, "OWN NODE", { size: 11, ls: 1.5, w: 100 });
          const ex = x < 800 ? x + 404 : x - 4;
          const ey = y + 75;
          const tx = x < 800 ? cx - 194 : cx + 194;
          const ty = y < 500 ? cy - 70 : cy + 70;
          body += arrow(ex, ey, tx, ty, { both: true, sw: 2.5 });
        });
        body += text(
          cx,
          850,
          "Each member keeps a synchronised copy; no single company runs the master database",
          { size: 18, fill: C.muted, anchor: "middle" },
        );
        return frame({
          kicker: K,
          title: "Four organizations, one shared ledger",
          body,
        });
      },
    },
    {
      file: "blockchain-network-types-comparison.webp",
      placement: "Network types",
      alt: "Comparison of public, private, permissioned and consortium blockchain networks",
      svg: () => {
        const q = [
          [
            "Public",
            "e.g. Ethereum mainnet",
            "Anyone",
            "Open validator set",
            "Public verifiability, tokenized assets for broad markets",
          ],
          [
            "Private",
            "One organization",
            "Membership set by one company",
            "That company's nodes",
            "Internal audit trails. Often a database is better",
          ],
          [
            "Permissioned",
            "Approved participants",
            "Identified members only",
            "Selected participants under defined rules",
            "Most enterprise deployments",
          ],
          [
            "Consortium",
            "Shared governance",
            "Several organizations decide jointly",
            "Validators from multiple members",
            "Trade finance, supply chain, insurance, healthcare data",
            true,
          ],
        ];
        let body = "";
        const w = 710,
          h = 300;
        q.forEach(([t, s, join, val, use, acc], i) => {
          const x = 80 + (i % 2) * (w + 20),
            y = 190 + Math.floor(i / 2) * (h + 20);
          body += box(x, y, w, h, { accent: acc });
          body += text(x + 32, y + 56, t, {
            size: 30,
            weight: 700,
            fill: acc ? C.amber : C.text,
          });
          body += text(x + 32, y + 86, s, { size: 16, fill: C.muted });
          [
            ["WHO CAN JOIN", join],
            ["WHO VALIDATES", val],
            ["TYPICAL USE", use],
          ].forEach(([k, v], j) => {
            const yy = y + 136 + j * 52;
            body += text(x + 32, yy, k, {
              size: 12.5,
              weight: 700,
              fill: C.amber,
              ls: 1.5,
            });
            body += text(x + 210, yy, v, { size: 17.5, maxWidth: w - 240 });
          });
        });
        body += text(
          80,
          838,
          "Most multi-company use cases call for a permissioned consortium network.",
          { size: 18, fill: C.muted },
        );
        return frame({
          kicker: K,
          title: "Public, private, permissioned and consortium networks",
          body,
        });
      },
    },
    {
      file: "do-you-need-blockchain-decision-flow.webp",
      placement: "Fit section",
      alt: "Decision flowchart for deciding whether a business needs blockchain or a database",
      svg: () => {
        const body = decisionChain(
          [
            {
              q: "Do three or more independent organizations write to and rely on the same records?",
              out: "Use a database or integration",
              outSub: "One owner, internal data quality problem",
            },
            {
              q: "Is no single participant trusted, or allowed, to run the master database?",
              out: "Let the trusted party host it",
              outSub: "A shared database with partner access",
            },
            {
              q: "Are disputes, reconciliation or audit evidence a measurable cost?",
              out: "Conventional integration first",
              outSub: "APIs and data standards may be enough",
            },
            {
              q: "Will partners run nodes, share governance and agree data standards?",
              out: "Not ready yet",
              outSub: "Resolve governance before building",
            },
          ],
          {
            title: "Evaluate a permissioned blockchain",
            sub: "A real multi-party trust problem. Next step: feasibility and a proof of concept",
            kicker: "GOOD FIT",
          },
          { y: 210, qh: 240, oy: 590, oh: 190 },
        );
        return frame({
          kicker: K,
          title: "Do you need a blockchain, or a database?",
          body,
        });
      },
    },
    {
      file: "hyperledger-fabric-vs-besu-data-visibility.webp",
      placement: "Platforms",
      alt: "How data visibility differs between Hyperledger Fabric channels and a Hyperledger Besu network",
      svg: () => {
        let body = "";
        // Fabric
        body += rect(80, 190, 700, 620, { fill: "rgba(21,31,54,0.6)", r: 22 });
        body += text(110, 238, "Hyperledger Fabric", { size: 28, weight: 700 });
        body += text(
          110,
          268,
          "Visibility controlled per channel and per collection",
          { size: 16, fill: C.muted },
        );
        body += rect(110, 300, 640, 220, {
          fill: "rgba(245,165,36,0.06)",
          stroke: C.amber,
          r: 16,
          dash: "6 5",
        });
        body += text(130, 330, "CHANNEL A: separate ledger", {
          size: 13,
          weight: 700,
          fill: C.amber,
          ls: 1.5,
        });
        ["Org 1", "Org 2", "Org 3"].forEach(
          (o, i) =>
            (body += box(135 + i * 205, 350, 185, 60, {
              title: o,
              titleSize: 18,
            })),
        );
        body += box(135, 425, 595, 80, {
          title: "Private data collection",
          sub: "Org 1 and Org 2 see the data; Org 3 holds only its hash",
          titleSize: 18,
          subSize: 14.5,
          accent: true,
        });
        body += rect(110, 545, 640, 130, {
          fill: "rgba(96,165,250,0.06)",
          stroke: C.blue,
          r: 16,
          dash: "6 5",
        });
        body += text(130, 575, "CHANNEL B: separate ledger", {
          size: 13,
          weight: 700,
          fill: C.blue,
          ls: 1.5,
        });
        ["Org 2", "Org 4"].forEach(
          (o, i) =>
            (body += box(135 + i * 205, 595, 185, 60, {
              title: o,
              titleSize: 18,
            })),
        );
        body += text(110, 715, "Org 1 and Org 3 can't see Channel B at all.", {
          size: 17,
          fill: C.text,
        });
        body += text(
          110,
          745,
          "Endorsement policies can require sign-off from",
          { size: 16, fill: C.muted },
        );
        body += text(110, 769, "specific members, e.g. buyer and carrier.", {
          size: 16,
          fill: C.muted,
        });
        // Besu
        body += rect(820, 190, 700, 620, { fill: "rgba(21,31,54,0.6)", r: 22 });
        body += text(850, 238, "Hyperledger Besu", { size: 28, weight: 700 });
        body += text(
          850,
          268,
          "One shared Ethereum-compatible network (QBFT)",
          { size: 16, fill: C.muted },
        );
        const cx = 1170,
          cy = 470;
        body += `<circle cx="${cx}" cy="${cy}" r="150" fill="${C.amberDim}" stroke="${C.amber}" stroke-opacity="0.5" stroke-width="2"/>`;
        body += text(cx, cy - 6, "Every node reads", {
          size: 19,
          weight: 600,
          anchor: "middle",
        });
        body += text(cx, cy + 20, "every transaction", {
          size: 19,
          weight: 600,
          anchor: "middle",
        });
        [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ].forEach(([dx, dy], i) => {
          const x = cx + dx * 250 - 70,
            y = cy + dy * 120 - 28;
          body += box(x, y, 140, 56, { title: `Org ${i + 1}`, titleSize: 17 });
        });
        body += text(
          850,
          690,
          "No built-in private transactions. Confidential data needs:",
          { size: 17, fill: C.text },
        );
        [
          "separate networks per business group",
          "off-chain storage with on-chain hashes",
          "emerging privacy layers",
        ].forEach((t, i) => {
          body += `<circle cx="862" cy="${719 + i * 28}" r="4" fill="${C.amber}"/>`;
          body += text(876, 725 + i * 28, t, { size: 16, fill: C.muted });
        });
        return frame({
          kicker: K,
          title: "Data visibility: Fabric channels vs a Besu network",
          body,
        });
      },
    },
    {
      file: "enterprise-blockchain-architecture-layers.webp",
      placement: "Architecture",
      alt: "Layers of a production enterprise blockchain architecture, from nodes to applications",
      svg: () => {
        const layers = [
          {
            title: "Applications, dashboards & APIs",
            sub: "Portals for members, REST / gRPC APIs for partners without nodes",
            tag: "USERS",
          },
          {
            title: "Integration layer",
            sub: "Event listeners, message queues, ERP / CRM / payment connectors",
            tag: "INTEGRATION",
          },
          {
            title: "Smart contracts & chaincode",
            sub: "Business rules, approved by members, upgraded without disruption",
            tag: "LOGIC",
            accent: true,
          },
          {
            title: "Consensus & ordering",
            sub: "Crash fault-tolerant for trusted members; BFT (4+ validators) when not",
            tag: "AGREEMENT",
          },
          {
            title: "Identity & membership",
            sub: "X.509 certificates from each member's CA or enterprise PKI",
            tag: "TRUST",
          },
          {
            title: "Node infrastructure",
            sub: "Redundant peers, orderers or validators per member, multi-zone",
            tag: "INFRA",
          },
        ];
        let body = stack(layers, {
          x: 80,
          y: 186,
          w: 1000,
          h: 90,
          gap: 14,
          arrows: false,
        });
        body += box(1120, 186, 400, 300, {
          title: "Off-chain storage",
          sub: "Large files and personal data stay in your systems, linked to the ledger by hash",
          titleSize: 23,
          subSize: 16,
          pad: 26,
        });
        body += path(
          [
            [1116, 336],
            [1095, 336],
            [1095, 440],
            [1084, 440],
          ],
          { dash: "6 5" },
        );
        body += box(1120, 510, 400, 290, {
          title: "Operations",
          sub: "HA and disaster recovery, observability, alerts on certificate expiry, the most common cause of outages",
          titleSize: 23,
          subSize: 16,
          pad: 26,
        });
        return frame({
          kicker: K,
          title: "Layers of a production enterprise blockchain",
          body,
        });
      },
    },
    {
      file: "blockchain-erp-integration-pattern.webp",
      placement: "Integration",
      alt: "Event-driven integration between an ERP system and an enterprise blockchain network",
      svg: () => {
        const nodes = [
          ["ERP", "SAP, Oracle, Dynamics"],
          ["Business event", "Goods issued, invoice approved"],
          [
            "Integration service + queue",
            "Kafka / RabbitMQ, idempotent retries",
          ],
          ["Shared ledger", "Transaction recorded for all members", true],
          ["Event listener", "Watches partner updates"],
          ["CRM / data warehouse", "Teams act without a new tool"],
        ];
        let body = "";
        const w = 220,
          gap = 24,
          y = 300,
          h = 190;
        nodes.forEach(([t, s, acc], i) => {
          const x = 80 + i * (w + gap);
          body += box(x, y, w, h, {
            title: t,
            sub: s,
            accent: acc,
            titleSize: 20,
            subSize: 15,
            pad: 14,
          });
          if (i < nodes.length - 1)
            body += arrow(x + w + 2, y + h / 2, x + w + gap - 2, y + h / 2);
        });
        body += text(
          80 + (w * 3 + gap * 2) / 2,
          y - 30,
          "YOUR SYSTEMS → LEDGER",
          { size: 14, weight: 700, fill: C.amber, anchor: "middle", ls: 2 },
        );
        body += text(
          80 + 3 * (w + gap) + (w * 3 + gap * 2) / 2,
          y - 30,
          "LEDGER → YOUR SYSTEMS",
          { size: 14, weight: 700, fill: C.amber, anchor: "middle", ls: 2 },
        );
        const extras = [
          [
            "API layer",
            "Smaller partners connect via secured REST or gRPC, identities tied to certificates",
          ],
          [
            "Legacy databases",
            "Change-data-capture or scheduled extraction, reconciled until retirement",
          ],
          [
            "Payments & banking",
            "Settlement instructions out, confirmations back to close the loop",
          ],
        ];
        extras.forEach(([t, d], i) => {
          const x = 80 + i * 486;
          body += box(x, 580, 470, 170, {
            title: t,
            sub: d,
            align: "left",
            pad: 26,
            titleSize: 21,
            subSize: 16,
            top: true,
          });
        });
        return frame({
          kicker: K,
          title: "Event-driven ERP integration with an enterprise ledger",
          body,
        });
      },
    },
    {
      file: "enterprise-blockchain-delivery-process.webp",
      placement: "Process",
      alt: "Nine stages of enterprise blockchain delivery, from discovery to ongoing maintenance",
      w: 1600,
      h: 760,
      svg: () => {
        const steps = [
          ["Business discovery", "Process map, stakeholders, requirements"],
          ["Feasibility & validation", "Go / no-go recommendation"],
          ["Platform & architecture", "Architecture doc, governance outline"],
          ["Proof of concept", "Working PoC, refined estimate"],
          ["Solution development", "Source code, tests, CI pipeline"],
          ["System integration", "Integration services, interface specs"],
          ["Testing & security", "Test reports, remediation log"],
          ["Production readiness", "Production environment, runbooks"],
          ["Monitoring & maintenance", "Support per agreed terms"],
        ].map(([title, sub]) => ({ title, sub }));
        const body = timeline(steps, {
          y: 440,
          alternate: true,
          top: false,
        });
        return frame({
          h: 760,
          kicker: K,
          title: "Nine stages of enterprise blockchain delivery",
          body,
        });
      },
    },
    {
      file: "enterprise-blockchain-solutions-og.webp",
      og: true,
      placement: "OG / social image (1200×630)",
      alt: "Enterprise blockchain solutions by ClickMasters",
      svg: () => {
        let body = "";
        body += text(80, 250, "Enterprise Blockchain", {
          size: 62,
          weight: 700,
        });
        body += text(80, 324, "Solutions", {
          size: 62,
          weight: 700,
          fill: C.amber,
        });
        body += text(
          80,
          384,
          "Permissioned networks · Hyperledger · ERP integration",
          { size: 22, fill: C.muted },
        );
        ["Fabric", "Besu", "Integration"].forEach(
          (l, i) =>
            (body += box(80 + i * 220, 440, 200, 66, {
              title: l,
              titleSize: 19,
              accent: i === 0,
            })),
        );
        const cx = 980,
          cy = 290;
        body += `<circle cx="${cx}" cy="${cy}" r="120" fill="none" stroke="${C.amber}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="4 8"/>`;
        body += `<rect x="${cx - 55}" y="${cy - 40}" width="110" height="80" rx="14" fill="${C.amberDim}" stroke="${C.amber}" stroke-width="2"/>`;
        body += text(cx, cy + 8, "Ledger", {
          size: 20,
          weight: 700,
          anchor: "middle",
          fill: C.amber,
        });
        [
          [-120, 0],
          [120, 0],
          [0, -120],
          [0, 120],
        ].forEach(
          ([dx, dy]) =>
            (body += `<circle cx="${cx + dx}" cy="${cy + dy}" r="18" fill="${C.card2}" stroke="${C.amber}" stroke-width="2.5"/>`),
        );
        return frame({
          w: 1200,
          h: 630,
          kicker: "ClickMasters Blockchain",
          body,
        });
      },
    },
  ],
};
