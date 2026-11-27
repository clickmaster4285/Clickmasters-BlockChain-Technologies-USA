import { C, frame, box, arrow, text, timeline, pill, rect, path, numCircle } from "../lib.mjs";

const K = "Smart Contract Development";
const LIFE = [
  ["Specify", "Business rules, roles, invariants"],
  ["Architect", "Contracts, admin powers, upgrades"],
  ["Build", "Iterations with tests alongside"],
  ["Test", "Fuzz, invariant, fork, static analysis"],
  ["Audit", "Independent firm reviews frozen code"],
  ["Deploy", "Testnet rehearsal, verified mainnet"],
  ["Operate", "Monitoring, runbooks, upgrades"],
];

function lifecycleRing(cx, cy, R, nodeW, nodeH, ts, ss, Rx = R * 1.65) {
  let s = `<ellipse cx="${cx}" cy="${cy}" rx="${Rx}" ry="${R}" fill="none" stroke="${C.amber}" stroke-opacity="0.45" stroke-width="2.5" stroke-dasharray="3 9"/>`;
  LIFE.forEach(([t, d], i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / LIFE.length;
    const x = cx + Rx * Math.cos(a), y = cy + R * Math.sin(a);
    s += box(x - nodeW / 2, y - nodeH / 2, nodeW, nodeH, { title: t, sub: ss ? d : undefined, titleSize: ts, subSize: ss, accent: i === 4, pad: 12 });
    s += numCircle(x - nodeW / 2 + 4, y - nodeH / 2 + 4, i + 1, { r: 15 });
  });
  return s;
}

export default {
  slug: "smart-contract-development",
  contentDir: "smart-contract-development-seo",
  images: [
    {
      file: "smart-contract-development-services-lifecycle.webp",
      placement: "Hero",
      alt: "Smart contract development services lifecycle from specification to post-launch monitoring",
      svg: () => {
        let body = lifecycleRing(800, 515, 270, 250, 104, 21, 14.5, 520);
        body += box(660, 465, 280, 120, { title: "Your smart contract system", sub: "Secure, tested, audit-ready", titleSize: 20, subSize: 15, fill: C.card2 });
        return frame({ kicker: K, title: "The smart contract development lifecycle", body });
      },
    },
    {
      file: "smart-contract-development-services-lifecycle-og.webp",
      og: true,
      placement: "og:image (replaces the generic /media/hero.webp), 1200×630",
      alt: "Smart contract development services lifecycle from specification to post-launch monitoring",
      svg: () => {
        let body = text(80, 230, "Smart Contract", { size: 58, weight: 700 });
        body += text(80, 300, "Development Services", { size: 58, weight: 700, fill: C.amber });
        body += text(80, 356, "Specify · Architect · Build · Test · Audit · Deploy · Operate", { size: 20, fill: C.muted });
        ["Solidity", "Rust", "Go"].forEach((l, i) => (body += box(80 + i * 180, 410, 160, 62, { title: l, titleSize: 19, accent: i === 0 })));
        const cx = 960, cy = 320, R = 150;
        body += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${C.amber}" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="3 8"/>`;
        LIFE.forEach((_, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / 7;
          body += numCircle(cx + R * Math.cos(a), cy + R * Math.sin(a), i + 1, { r: 20 });
        });
        return frame({ w: 1200, h: 630, kicker: "ClickMasters Blockchain", body });
      },
    },
    {
      file: "on-chain-vs-off-chain-smart-contract-design.webp",
      placement: '"Before Writing Code: Deciding What Belongs On-Chain"',
      alt: "Diagram showing which product components belong in a smart contract and which stay off-chain",
      svg: () => {
        const cols = [
          ["On-chain", "Public, permanent, costs gas", ["Custody of assets and balances", "Rules users must be able to verify", "Settlement, transfers, payouts", "Governance votes and execution"], C.amber],
          ["Hybrid", "Anchored on-chain", ["Allowlists stored as a Merkle root", "Signed orders settled on-chain", "Price data delivered by an oracle", "Off-chain documents with an on-chain hash"], C.green],
          ["Off-chain", "Private, cheap, easy to change", ["Search, filtering, analytics", "Personal or confidential data", "Heavy computation", "Notifications and user interfaces"], C.blue],
        ];
        let body = "";
        cols.forEach(([t, s, items, col], i) => {
          const x = 80 + i * 490, w = 460;
          body += rect(x, 190, w, 560, { fill: "rgba(21,31,54,0.6)", stroke: col, r: 20 });
          body += `<rect x="${x}" y="190" width="${w}" height="8" rx="4" fill="${col}"/>`;
          body += text(x + 30, 250, t, { size: 30, weight: 700, fill: col });
          body += text(x + 30, 282, s, { size: 16.5, fill: C.muted });
          items.forEach((it, j) => {
            body += box(x + 24, 312 + j * 104, w - 48, 86, { title: it, titleSize: 18.5, align: "left", pad: 22 });
          });
        });
        body += text(80, 800, "Every function that doesn't need to be on-chain is one less function an attacker can call.", { size: 19, fill: C.text, weight: 500 });
        return frame({ kicker: K, title: "What belongs on-chain, off-chain, or both", body });
      },
    },
    {
      file: "smart-contract-languages-by-blockchain.webp",
      placement: "Programming Languages and Blockchain Networks",
      alt: "Smart contract programming languages mapped to the blockchain networks they run on",
      svg: () => {
        const rows = [
          ["EVM", "Ethereum, Arbitrum, Optimism, Base, Polygon, Avalanche C-Chain", "Solidity 0.8.x, Vyper", "Foundry, Hardhat", "Tokens, DeFi, NFTs, DAOs"],
          ["Solana (SVM)", "Solana", "Rust", "Anchor framework", "Trading, payments, consumer apps"],
          ["Permissioned", "Hyperledger Fabric", "Go", "Chaincode", "Private business networks"],
        ];
        let body = "";
        body += text(80, 210, "ECOSYSTEM & NETWORKS", { size: 14, weight: 700, fill: C.muted, ls: 2 });
        body += text(900, 210, "LANGUAGE & TOOLING", { size: 14, weight: 700, fill: C.muted, ls: 2 });
        rows.forEach(([eco, nets, lang, tool, fit], i) => {
          const y = 235 + i * 195;
          body += box(80, y, 640, 165, { title: eco, sub: nets, align: "left", pad: 28, titleSize: 26, subSize: 16.5 });
          body += arrow(724, y + 82, 896, y + 82, { sw: 3 });
          body += box(900, y, 620, 165, { accent: i === 0 });
          body += text(930, y + 58, lang, { size: 28, weight: 700, fill: C.amber, mono: true });
          body += text(930, y + 94, tool, { size: 17, fill: C.text });
          body += text(930, y + 128, "Suited to: " + fit, { size: 16, fill: C.muted });
        });
        return frame({ kicker: K, title: "Smart contract languages by blockchain", body });
      },
    },
    {
      file: "smart-contract-access-control-multisig-timelock.webp",
      placement: "Access Control and Admin Key Design",
      alt: "Smart contract admin roles held by a multisig and executed through a timelock",
      svg: () => {
        let body = "";
        // signers
        body += text(80, 215, "ADMIN SIGNERS", { size: 14, weight: 700, fill: C.muted, ls: 2 });
        for (let i = 0; i < 5; i++) {
          body += `<circle cx="${130 + i * 70}" cy="270" r="26" fill="${i < 3 ? C.amberDim : C.card}" stroke="${i < 3 ? C.amber : C.stroke}" stroke-width="2"/>`;
          body += text(130 + i * 70, 277, "✓", { size: 20, weight: 700, anchor: "middle", fill: i < 3 ? C.amber : C.dim });
        }
        body += box(80, 330, 380, 150, { title: "Multisig wallet", sub: "e.g. 3-of-5 signers must approve every sensitive change", titleSize: 24, subSize: 16, accent: true });
        body += arrow(464, 405, 576, 405, { label: "queue", lsize: 15 });
        body += box(580, 330, 380, 150, { title: "Timelock", sub: "Delay (e.g. 48 hours) so users can see a pending change", titleSize: 24, subSize: 16 });
        body += arrow(964, 405, 1076, 405, { label: "execute", lsize: 15 });
        body += rect(1080, 190, 440, 440, { fill: "rgba(21,31,54,0.6)", r: 20 });
        body += text(1110, 232, "Protocol contracts", { size: 22, weight: 700 });
        [["Upgrade", "Swap implementation"], ["Set fees & parameters", "Narrow role, one job"], ["Pause / unpause", "Guardian can pause fast"]].forEach(([t, d], i) => {
          body += box(1104, 256 + i * 120, 392, 100, { title: t, sub: d, titleSize: 19, subSize: 15, align: "left", pad: 22 });
        });
        // guardian
        body += box(580, 560, 380, 130, { title: "Guardian role", sub: "Can only pause, immediately, in an emergency", titleSize: 22, subSize: 15.5, stroke: "rgba(248,113,113,0.6)", fill: "#1d1a2a" });
        body += path([[964, 625], [1040, 625], [1040, 576], [1100, 576]], { color: C.red });
        body += box(80, 720, 1440, 90, { title: "", fill: C.card });
        body += text(110, 760, "NO SINGLE ROLE DOES EVERYTHING", { size: 14, weight: 700, fill: C.amber, ls: 2 });
        body += text(110, 790, "Two-step ownership transfers, role-based access across contracts, and a published admin powers table.", { size: 17, fill: C.muted });
        return frame({ kicker: K, title: "Admin keys: multisig, timelock and a guardian", body });
      },
    },
    {
      file: "upgradeable-smart-contract-proxy-architecture.webp",
      placement: "Upgradeable or Immutable: Choosing Deliberately",
      alt: "Upgradeable smart contract proxy architecture separating storage from logic",
      svg: () => {
        let body = "";
        body += box(80, 400, 260, 130, { title: "User", sub: "Always calls the same address", titleSize: 24, subSize: 15.5 });
        body += arrow(344, 465, 516, 465, { label: "call", lsize: 16 });
        body += box(520, 340, 400, 250, { title: "Proxy contract", sub: "Holds all storage and balances. Address never changes. Storage layout follows ERC-7201 namespaces", accent: true, titleSize: 26, subSize: 16 });
        body += arrow(924, 430, 1116, 320, { label: "delegatecall", lsize: 16, ly: -16 });
        body += arrow(924, 500, 1116, 610, { dash: "7 6", color: C.muted, label: "was", lsize: 15, ly: 20 });
        body += box(1120, 230, 400, 170, { title: "Implementation v2", sub: "Current logic. No storage of its own", titleSize: 23, subSize: 16, stroke: C.green });
        body += pill(1140, 246, "ACTIVE", { size: 11, color: C.green, fill: "rgba(52,211,153,0.12)", w: 80 });
        body += box(1120, 530, 400, 170, { title: "Implementation v1", sub: "Previous logic, kept for reference", titleSize: 23, subSize: 16, dash: "7 6" });
        body += box(520, 660, 400, 130, { title: "Upgrade authority", sub: "Multisig + timelock; rehearsed on a fork first", titleSize: 21, subSize: 15.5 });
        body += arrow(720, 656, 720, 594, { color: C.muted });
        body += text(80, 220, "UUPS or transparent proxy", { size: 22, weight: 600 });
        body += text(80, 252, "Logic can be replaced; state and address stay put.", { size: 17, fill: C.muted });
        body += text(80, 280, "A storage collision corrupts every balance, so layouts are validated automatically.", { size: 17, fill: C.muted });
        return frame({ kicker: K, title: "How an upgradeable proxy separates storage from logic", body });
      },
    },
    {
      file: "smart-contract-testing-layers.webp",
      placement: "Our Smart Contract Testing Layers",
      alt: "Smart contract testing layers including fuzz, invariant and mainnet fork tests",
      svg: () => {
        const layers = [
          ["Invariant tests", "Long random action sequences; core properties must always hold"],
          ["Fuzz tests", "Edge cases in arithmetic and input handling"],
          ["Fork tests", "Against real deployed protocols, tokens and oracle data"],
          ["Integration tests", "How contracts in the system interact"],
          ["Unit tests", "Each function, revert and event"],
        ];
        const cx = 560, top = 200, h = 112, gap = 10;
        let body = "";
        layers.forEach(([t, d], i) => {
          const wTop = 280 + i * 150, wBot = 280 + (i + 1) * 150;
          const y = top + i * (h + gap);
          const pts = `${cx - wTop / 2},${y} ${cx + wTop / 2},${y} ${cx + wBot / 2},${y + h} ${cx - wBot / 2},${y + h}`;
          body += `<polygon points="${pts}" fill="${C.amber}" fill-opacity="${0.24 - i * 0.035}" stroke="${C.amber}" stroke-opacity="0.6" stroke-width="2"/>`;
          body += text(cx, y + h / 2 - 4, t, { size: 23, weight: 700, anchor: "middle" });
          body += text(cx, y + h / 2 + 22, d, { size: 15, anchor: "middle", fill: C.muted, maxWidth: wTop - 20 });
        });
        body += box(1110, 200, 410, 250, { title: "Static analysis", sub: "Known vulnerability patterns and risky constructs, e.g. Slither, on every change", titleSize: 24, subSize: 16, accent: true });
        body += box(1110, 480, 410, 200, { title: "Gas snapshots", sub: "Catch unintended cost regressions with Foundry gas reports", titleSize: 24, subSize: 16 });
        body += text(1110, 730, "Coverage is reported every release.", { size: 17, fill: C.text });
        body += text(1110, 758, "It shows what ran, not whether the", { size: 16, fill: C.muted });
        body += text(1110, 782, "tests checked the right things.", { size: 16, fill: C.muted });
        return frame({ kicker: K, title: "Smart contract testing, layer by layer", body });
      },
    },
    {
      file: "smart-contract-testing-vs-independent-audit.webp",
      placement: "Development Testing vs. an Independent Smart Contract Audit",
      alt: "Comparison of internal smart contract testing and an independent security audit",
      svg: () => {
        const col = (x, t, s, items, col, acc) => {
          let o = rect(x, 190, 690, 560, { fill: acc ? "#1d2034" : "rgba(21,31,54,0.6)", stroke: acc ? C.amber : C.stroke, r: 20 });
          o += text(x + 34, 248, t, { size: 30, weight: 700, fill: col });
          o += text(x + 34, 280, s, { size: 17, fill: C.muted });
          items.forEach((it, i) => {
            const y = 330 + i * 80;
            o += `<circle cx="${x + 50}" cy="${y}" r="13" fill="none" stroke="${col}" stroke-width="2"/>` + text(x + 50, y + 6, "✓", { size: 15, weight: 700, anchor: "middle", fill: col });
            o += text(x + 80, y + 7, it, { size: 19, maxWidth: 580 });
          });
          return o;
        };
        let body = col(80, "Our development process", "Reduces the issues that reach an audit", ["Secure design and a threat model", "Full test suite: fuzz, invariant, fork", "Static analysis on every change", "Internal peer review of every change", "Audit package: spec, admin powers, invariants", "Remediation of every audit finding"], C.blue);
        body += col(830, "Independent audit", "Value comes from independence", ["Separate team with no stake in the code", "Reviews a frozen, tagged commit", "Published findings and severity ratings", "Fix review after remediation", "Report published beside verified addresses", "Trust signal for users, investors, exchanges"], C.amber, true);
        body += box(80, 770, 1440, 60, { title: "", fill: C.card });
        body += text(110, 808, "A team should never be the final reviewer of its own code. Our internal review is not presented as an audit.", { size: 18, fill: C.text, weight: 500 });
        return frame({ kicker: K, title: "Development testing vs an independent audit", body });
      },
    },
    {
      file: "smart-contract-development-process.webp",
      placement: "Our Smart Contract Development Process",
      alt: "Seven-step smart contract development process with deliverables at each stage",
      svg: () => {
        const steps = [
          ["Discovery", "Written specification draft, scope and estimate"],
          ["Architecture", "Architecture doc, admin powers table, invariant list"],
          ["Build", "Repository access; demos on testnet"],
          ["Test & harden", "Test suite, coverage and gas reports"],
          ["Audit readiness", "Audit package; remediation changes"],
          ["Deploy", "Verified contract addresses; deployment records"],
          ["Operate", "Monitoring, incident runbook, maintenance plan"],
        ].map(([title, sub], i) => ({ title, sub, subKicker: "YOU RECEIVE", accent: i === 4 }));
        const body = timeline(steps, { y: 310, cardH: 260 });
        return frame({ kicker: K, title: "Our seven-step smart contract process", body });
      },
    },
  ],
};
