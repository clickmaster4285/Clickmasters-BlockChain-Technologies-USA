import { C, frame, box, arrow, text, stack, timeline, pill, rect, numCircle } from "../lib.mjs";

const K = "Blockchain Development Services";

export default {
  slug: "blockchain-development-services",
  contentDir: "blockchain-development-services",
  images: [
    {
      file: "blockchain-application-architecture.webp",
      placement: "Hero, after intro bullets (IMAGE 1)",
      alt: "Layered architecture of a blockchain application, from user app and backend to smart contracts and network",
      svg: () => {
        const layers = [
          { title: "Users", sub: "Customers, partners and staff, using browser wallets, mobile wallets or single sign-on", tag: "ACCESS" },
          { title: "Web & mobile app", sub: "React, Next.js, React Native, Flutter: screens, wallet connection, transaction previews", tag: "APPLICATION" },
          { title: "Backend & indexer", sub: "Node.js services, The Graph, PostgreSQL, Redis: fast reads, history, APIs", tag: "OFF-CHAIN" },
          { title: "Smart contracts", sub: "Solidity, Vyper, Rust, Go: business rules, assets, roles and upgrade paths", tag: "ON-CHAIN", accent: true },
          { title: "Blockchain network", sub: "Ethereum, Layer 2 rollups, Solana, Avalanche or a permissioned ledger", tag: "SETTLEMENT" },
        ];
        let body = stack(layers, { x: 80, y: 190, w: 980, h: 104, gap: 24 });
        // side panel
        body += box(1110, 190, 410, 616, { fill: C.card, top: true, pad: 28, kicker: "WHAT EACH LAYER OWNS", title: " " });
        const notes = [
          ["Trust", "Contracts enforce rules anyone can verify"],
          ["Speed", "Indexers answer queries without hitting RPC nodes"],
          ["Privacy", "Personal data stays off-chain; only proofs go on-chain"],
          ["Resilience", "Fallback RPC providers, monitoring and alerts"],
        ];
        notes.forEach(([h, d], i) => {
          const y = 290 + i * 128;
          body += `<rect x="1138" y="${y - 22}" width="6" height="74" rx="3" fill="${C.amber}"/>`;
          body += text(1162, y, h, { size: 21, weight: 600 });
          body += text(1162, y + 30, d, { size: 16.5, fill: C.muted, maxWidth: 330 });
        });
        return frame({ kicker: K, title: "How a blockchain application is layered", body });
      },
    },
    {
      file: "blockchain-development-services-map.webp",
      placement: 'Start of "Our Blockchain Development Services" (IMAGE 2)',
      alt: "Map of ClickMasters blockchain development services grouped by on-chain, application and enterprise work",
      svg: () => {
        const groups = [
          { name: "On-chain", items: [["Custom Blockchain Development", "Networks, consensus, nodes"], ["Smart Contract Development", "Tokens, DeFi, NFTs, governance"]] },
          { name: "Application", items: [["Blockchain Software & Apps", "Web, mobile and backend"], ["dApp Development", "Wallet-connected front ends"], ["Web3 Product Development", "Communities, DAOs, loyalty"]] },
          { name: "Enterprise & integration", items: [["Enterprise Blockchain", "Permissioned and consortium"], ["Consulting & Architecture", "Feasibility and design"], ["Blockchain Integration", "ERP, CRM, payments, data"]] },
        ];
        let body = "";
        const colW = 460, gap = 30, y0 = 200;
        groups.forEach((g, gi) => {
          const x = 80 + gi * (colW + gap);
          body += rect(x, y0, colW, 610, { fill: "rgba(21,31,54,0.55)", stroke: C.stroke, r: 20, dash: "6 6" });
          body += pill(x + 24, y0 + 22, g.name.toUpperCase(), { size: 14, ls: 1.5 });
          const tileH = 150;
          g.items.forEach(([t, s], i) => {
            const ty = y0 + 84 + i * (tileH + 22);
            body += box(x + 24, ty, colW - 48, tileH, { title: t, sub: s, align: "left", pad: 26, titleSize: 23, subSize: 17, accent: gi === 0 && i === 1 });
          });
        });
        return frame({ kicker: K, title: "Eight services, three kinds of work", body });
      },
    },
    {
      file: "blockchain-network-comparison.webp",
      placement: 'Choosing the Right Blockchain Network (IMAGE 3)',
      alt: "Comparison of public, Layer 2 and permissioned blockchain networks by openness and privacy",
      svg: () => {
        const px = 140, py = 190, pw = 900, ph = 610;
        let body = rect(px, py, pw, ph, { fill: "rgba(21,31,54,0.5)", r: 16 });
        body += `<line x1="${px + pw / 2}" y1="${py}" x2="${px + pw / 2}" y2="${py + ph}" stroke="${C.stroke}" stroke-width="1.5" stroke-dasharray="4 6"/>`;
        body += `<line x1="${px}" y1="${py + ph / 2}" x2="${px + pw}" y2="${py + ph / 2}" stroke="${C.stroke}" stroke-width="1.5" stroke-dasharray="4 6"/>`;
        body += arrow(px, py + ph + 30, px + pw, py + ph + 30, { color: C.muted, sw: 2 });
        body += text(px + pw / 2, py + ph + 62, "Control and data privacy →", { size: 18, anchor: "middle", fill: C.muted, weight: 600 });
        body += `<g transform="translate(${px - 40},${py + ph / 2}) rotate(-90)">${text(0, 0, "Openness and decentralization →", { size: 18, anchor: "middle", fill: C.muted, weight: 600 })}</g>`;
        body += arrow(px - 22, py + ph, px - 22, py, { color: C.muted, sw: 2 });
        const q = [["Open & public", px + 20, py + 34], ["Open with extra controls", px + pw - 20, py + 34, "end"], ["Low openness, low control", px + 20, py + ph - 18], ["Private & governed", px + pw - 20, py + ph - 18, "end"]];
        q.forEach(([t, x, y, a]) => (body += text(x, y, t, { size: 15, fill: C.dim, anchor: a ?? "start", weight: 600 })));
        const pts = [
          ["Ethereum mainnet", 0.12, 0.12, "Max decentralization, liquidity"],
          ["Layer 2 rollups", 0.3, 0.26, "Arbitrum, Optimism, Base"],
          ["Solana", 0.2, 0.42, "High throughput, non-EVM"],
          ["Avalanche L1s", 0.6, 0.47, "Dedicated blockspace"],
          ["Permissioned ledgers", 0.84, 0.8, "Hyperledger-based networks"],
        ];
        pts.forEach(([t, fx, fy, d], i) => {
          const cx = px + fx * pw, cy = py + fy * ph;
          body += `<circle cx="${cx}" cy="${cy}" r="22" fill="${C.amber}" opacity="0.18"/><circle cx="${cx}" cy="${cy}" r="11" fill="${i === 4 ? C.blue : C.amber}"/>`;
          const right = fx < 0.7;
          body += text(right ? cx + 26 : cx - 26, cy - 2, t, { size: 20, weight: 600, anchor: right ? "start" : "end" });
          body += text(right ? cx + 26 : cx - 26, cy + 22, d, { size: 15.5, fill: C.muted, anchor: right ? "start" : "end" });
        });
        body += box(1100, 190, 420, 610, { top: true, pad: 28, kicker: "HOW WE DECIDE", title: " " });
        ["Value at risk", "Who the users are", "Privacy needs", "Throughput and cost", "Ecosystem: liquidity, wallets, oracles", "Regulatory context", "Exit cost"].forEach((t, i) => {
          const y = 282 + i * 72;
          body += numCircle(1150, y, i + 1, { r: 17 });
          body += text(1182, y + 6, t, { size: 18.5, maxWidth: 310 });
        });
        return frame({ kicker: K, title: "Choosing a blockchain network: openness vs control", body });
      },
    },
    {
      file: "blockchain-development-process.webp",
      placement: "Process section (IMAGE 4)",
      alt: "Six-phase blockchain development process from discovery to post-launch operations",
      svg: () => {
        const steps = [
          { title: "Discovery & Feasibility", sub: "Scope summary, key risks, honest build / don't-build call" },
          { title: "Architecture & Design", sub: "Architecture doc, threat model, interface specs, phased estimate", accent: true },
          { title: "Proof of Concept", sub: "Testnet prototype and findings report, when one assumption carries the risk" },
          { title: "Iterative Build", sub: "Sprint demos on testnet, repo access, CI with tests and gas reports" },
          { title: "Security & Launch Prep", sub: "Audit package, remediation reports, runbooks, staged launch plan" },
          { title: "Operate & Evolve", sub: "Monitoring dashboards, incident runbook, next-release roadmap" },
        ].map((s) => ({ ...s, subKicker: "YOU RECEIVE" }));
        const body = timeline(steps, { y: 330, cardH: 250 });
        return frame({ kicker: K, title: "Our six-phase blockchain development process", body });
      },
    },
    {
      file: "smart-contract-security-layers.webp",
      placement: "Security section (IMAGE 5)",
      alt: "Smart contract security layers: secure design, coding, testing, audit and monitoring",
      svg: () => {
        const layers = [
          ["Operational security", "Multisig admin keys, timelocks, monitoring, incident runbooks"],
          ["Independent review", "Audit package, external audit firm, fixes re-verified"],
          ["Testing", "Unit, integration, fork, fuzz and invariant tests"],
          ["Secure coding", "Reviewed libraries, peer review, static analysis"],
          ["Security by design", "Threat model, minimal on-chain surface, narrow admin roles"],
        ];
        const cx = 560, cy = 520;
        let body = "";
        layers.forEach(([t], i) => {
          const w = 900 - i * 150, h = 600 - i * 100;
          const op = 0.06 + i * 0.05;
          body += `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${36 - i * 3}" fill="${C.amber}" fill-opacity="${op}" stroke="${C.amber}" stroke-opacity="${0.25 + i * 0.12}" stroke-width="2"/>`;
          body += text(cx, cy - h / 2 + 36, t, { size: 19 + i, weight: 600, anchor: "middle", fill: i === 4 ? C.text : C.amberSoft });
        });
        body += box(cx - 140, cy + 0, 280, 80, { title: "Your smart contract", titleSize: 21, accent: true });
        // legend
        layers.slice().reverse().forEach(([t, d], i) => {
          const y = 230 + i * 116;
          body += numCircle(1090, y + 16, i + 1, { r: 18 });
          body += text(1124, y + 10, t, { size: 21, weight: 600 });
          body += text(1124, y + 38, d, { size: 16, fill: C.muted, maxWidth: 390 });
        });
        return frame({ kicker: K, title: "Smart contract security, layer by layer", body });
      },
    },
    {
      file: "blockchain-industry-use-cases.webp",
      placement: "Industries section (IMAGE 6)",
      alt: "Blockchain use cases across finance, real estate, supply chain, healthcare, gaming and retail",
      svg: () => {
        const items = [
          ["Financial services", "Stablecoin payouts, tokenized funds, faster settlement", "$"],
          ["Real estate", "Fractional ownership, rental income distribution, escrow", "⌂"],
          ["Supply chain", "Tamper-evident custody records and certifications", "⇄"],
          ["Healthcare", "Consent records and audit trails; health data stays off-chain", "+"],
          ["Gaming", "Player-owned items and marketplaces with creator royalties", "◆"],
          ["Retail", "Portable loyalty points and product authenticity", "★"],
        ];
        let body = "";
        const cw = 460, ch = 280, gx = 30, gy = 30;
        items.forEach(([t, d, ic], i) => {
          const x = 80 + (i % 3) * (cw + gx), y = 200 + Math.floor(i / 3) * (ch + gy);
          body += box(x, y, cw, ch, { fill: C.card });
          body += `<circle cx="${x + 62}" cy="${y + 70}" r="34" fill="${C.amberDim}" stroke="${C.amber}" stroke-opacity="0.6" stroke-width="2"/>`;
          body += text(x + 62, y + 81, ic, { size: 30, weight: 700, anchor: "middle", fill: C.amber });
          body += text(x + 34, y + 152, t, { size: 26, weight: 600 });
          body += text(x + 34, y + 190, d, { size: 18, fill: C.muted, maxWidth: cw - 68 });
        });
        return frame({ kicker: K, title: "Where blockchain earns its place, by industry", body });
      },
    },
  ],
};
