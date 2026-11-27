import { C, frame, box, arrow, text, timeline, pill, rect, path, sequence, decisionChain, numCircle } from "../lib.mjs";

const K = "Blockchain Oracle Integration";

export default {
  slug: "blockchain-oracle-integration",
  contentDir: "blockchain-oracle-integration-seo",
  images: [
    {
      file: "blockchain-oracle-integration-hero.webp",
      alsoSvg: true,
      placement: "Hero",
      alt: "Diagram of off-chain data flowing through an oracle into a smart contract",
      svg: () => {
        let body = "";
        // sources
        body += pill(80, 196, "OFF-CHAIN DATA", { size: 13, ls: 1.5 });
        const src = [["Exchanges & market data", "Prices, rates, volumes"], ["Public & private APIs", "Weather, flights, sports"], ["IoT devices", "Sensors, telemetry"], ["Enterprise systems", "ERP, banking, records"]];
        src.forEach(([t, s], i) => {
          const y = 248 + i * 140;
          body += box(80, y, 380, 116, { title: t, sub: s, align: "left", pad: 24 });
          body += path([[462, y + 58], [560, y + 58], [560, 520], [608, 520]], { noHead: i !== 1 });
        });
        body += `<path d="M608,520 L620,520" stroke="${C.amberSoft}" stroke-width="2.5" marker-end="url(#ah)"/>`;
        // oracle layer
        body += pill(630, 196, "ORACLE LAYER", { size: 13, ls: 1.5 });
        body += rect(630, 248, 420, 536, { fill: "#1d2034", stroke: C.amber, sw: 2, r: 20, filter: "glow" });
        const steps = [["Fetch", "Independent nodes query each source"], ["Validate", "Format checks, outlier filtering, signatures"], ["Aggregate", "Median or consensus across reports"], ["Deliver", "Push on-chain or sign for pull"]];
        steps.forEach(([t, s], i) => {
          const y = 280 + i * 124;
          body += numCircle(690, y + 40, i + 1, { r: 22 });
          body += text(730, y + 34, t, { size: 22, weight: 600 });
          body += text(730, y + 62, s, { size: 16, fill: C.muted, maxWidth: 300 });
        });
        body += arrow(1054, 516, 1126, 516, { sw: 3 });
        // contract
        body += pill(1130, 196, "ON-CHAIN", { size: 13, ls: 1.5 });
        body += box(1130, 248, 390, 250, { title: "Your smart contract", sub: "Checks freshness, bounds and source before acting", accent: true, titleSize: 26 });
        const uses = ["Liquidate", "Settle", "Pay out", "Pause"];
        uses.forEach((u, i) => {
          const x = 1130 + (i % 2) * 200, y = 530 + Math.floor(i / 2) * 130;
          body += box(x, y, 190, 110, { title: u, titleSize: 20, sub: "", fill: C.card });
        });
        return frame({ kicker: K, title: "How an oracle connects real-world data to smart contracts", body, titleSize: 42 });
      },
    },
    {
      file: "oracle-integration-data-flow.webp",
      alsoSvg: true,
      placement: '"How an Oracle Integration Works, Step by Step"',
      alt: "Seven-step flow of data from an external source through oracle nodes and aggregation to a consumer smart contract",
      svg: () => {
        const steps = [
          ["Data source", "Exchanges, vendors, APIs, IoT"],
          ["Oracle node", "Fetches data and signs reports"],
          ["Retrieval & validation", "Format checks, outliers, signatures"],
          ["Aggregation", "Median, weighting or optimistic assertion"],
          ["Oracle contract", "Stores value (push) or verifies update (pull)"],
          ["Consumer contract", "Re-checks staleness, bounds, decimals"],
          ["Execution", "Liquidate, settle, mint, pay out or pause"],
        ];
        const n = 7, x0 = 80, x1 = 1520, gap = 22;
        const w = (x1 - x0 - gap * (n - 1)) / n;
        const y = 330, h = 240;
        let body = "";
        // zones
        const offW = 4 * w + 3 * gap;
        body += rect(x0 - 14, y - 70, offW + 28, h + 110, { fill: "rgba(96,165,250,0.05)", stroke: "rgba(96,165,250,0.35)", dash: "6 6", r: 20 });
        body += text(x0 + 6, y - 38, "OFF-CHAIN", { size: 14, weight: 700, fill: C.blue, ls: 2 });
        body += rect(x0 + offW + gap - 8, y - 70, x1 - (x0 + offW + gap) + 22, h + 110, { fill: "rgba(245,165,36,0.05)", stroke: "rgba(245,165,36,0.4)", dash: "6 6", r: 20 });
        body += text(x0 + offW + gap + 12, y - 38, "ON-CHAIN", { size: 14, weight: 700, fill: C.amber, ls: 2 });
        steps.forEach(([t, s], i) => {
          const x = x0 + i * (w + gap);
          body += box(x, y, w, h, { title: t, sub: s, titleSize: 19, subSize: 15, pad: 14, accent: i === 5 });
          body += numCircle(x + w / 2, y, i + 1, { r: 20 });
          if (i < n - 1) body += arrow(x + w + 1, y + h / 2, x + w + gap - 1, y + h / 2, { sw: 2.5 });
        });
        const notes = [["Push", "Steps 1–5 run continuously; your contract only reads"], ["Pull", "Step 5 happens inside the user's transaction"], ["Optimistic", "Value is final only after a dispute window"]];
        notes.forEach(([t, d], i) => {
          const x = 80 + i * 486;
          body += box(x, 690, 470, 80, { title: "", fill: C.card });
          body += text(x + 22, 738, t, { size: 18, weight: 700, fill: C.amber });
          body += text(x + 130, 738, d, { size: 15.5, fill: C.muted, maxWidth: 330 });
        });
        return frame({ kicker: K, title: "The seven-step oracle data path", body });
      },
    },
    {
      file: "push-vs-pull-oracle-models.webp",
      alsoSvg: true,
      placement: "Types of Oracle Integration",
      alt: "Comparison of push-based and pull-based oracle data delivery",
      svg: () => {
        const col = (x, name, flow, best, watch) => {
          let s = rect(x, 190, 700, 620, { fill: "rgba(21,31,54,0.6)", r: 20 });
          s += text(x + 32, 240, name, { size: 30, weight: 700 });
          flow.forEach(([t, d], i) => {
            const y = 272 + i * 104;
            s += box(x + 32, y, 636, 82, { title: t, sub: d, align: "left", titleSize: 19, subSize: 15, pad: 22, accent: i === flow.length - 1 });
            if (i < flow.length - 1) s += arrow(x + 350, y + 84, x + 350, y + 102, { sw: 2.5 });
          });
          s += text(x + 32, 718, "BEST FOR", { size: 13, weight: 700, fill: C.green, ls: 2 });
          s += text(x + 32, 744, best, { size: 16, maxWidth: 300, fill: C.text });
          s += text(x + 370, 718, "WATCH FOR", { size: 13, weight: 700, fill: C.red, ls: 2 });
          s += text(x + 370, 744, watch, { size: 16, maxWidth: 300, fill: C.text });
          return s;
        };
        let body = col(80, "Push-based feeds", [
          ["Oracle network", "Monitors the market off-chain"],
          ["Writes on heartbeat or deviation", "e.g. every hour or on a 0.5% move"],
          ["On-chain feed contract", "Always holds the latest value"],
          ["Your contract reads it", "Any caller, any time"],
        ], "Lending, collateral valuation, stablecoins", "Value can lag between updates; match staleness limits to the heartbeat");
        body += col(820, "Pull-based feeds", [
          ["Signed updates off-chain", "Streamed continuously, not stored on-chain"],
          ["Front end or keeper fetches", "Gets the latest signed price"],
          ["Included in the user's transaction", "Update and action in one call"],
          ["Contract verifies, then uses", "Signature and maximum age checked"],
        ], "Perpetuals, options, DEXs, latency-sensitive trading", "Clients must fetch updates; users usually pay the update cost");
        body += `<circle cx="800" cy="500" r="30" fill="${C.bg1}" stroke="${C.amber}" stroke-width="2"/>` + text(800, 507, "vs", { size: 20, weight: 700, anchor: "middle", fill: C.amber });
        return frame({ kicker: K, title: "Push vs pull oracle models", body });
      },
    },
    {
      file: "api-to-smart-contract-oracle-workflow.webp",
      alsoSvg: true,
      placement: "Connecting External APIs and Data to Smart Contracts",
      alt: "Oracle workflow querying two flight-data APIs and paying an insurance claim on-chain",
      svg: () => {
        const parts = [
          { id: "p", label: "Policy contract", sub: "Holds premiums", accent: true },
          { id: "o", label: "Oracle workflow", sub: "Off-chain nodes" },
          { id: "a", label: "Flight API A", sub: "Data provider" },
          { id: "b", label: "Flight API B", sub: "Second provider" },
        ];
        const msgs = [
          { from: "p", to: "o", label: "Scheduled arrival passed: request status" },
          { from: "o", to: "a", label: "Query flight status" },
          { from: "o", to: "b", label: "Query flight status" },
          { from: "a", to: "o", label: "Delayed 3h 10m", dash: "6 5", color: C.muted },
          { from: "b", to: "o", label: "Delayed 3h 05m", dash: "6 5", color: C.muted },
          { from: "o", self: true, label: "Both agree: delay over threshold" },
          { from: "o", to: "p", label: "Deliver signed result on-chain" },
          { from: "p", self: true, label: "Pays the policyholder automatically", color: C.green },
        ];
        let body = sequence(parts, msgs, { y: 180, rowH: 62 });
        body += box(80, 780, 1440, 50, { title: "", fill: "#1d1a2a", stroke: "rgba(248,113,113,0.5)", dash: "6 5", r: 12 });
        body += text(104, 812, "If the APIs disagree or don't respond", { size: 16.5, weight: 700, fill: C.red });
        body += text(420, 812, "→  the claim moves to manual or dispute-based review instead of paying out or rejecting blindly", { size: 16.5, fill: C.text });
        return frame({ kicker: K, title: "Example: a flight-delay insurance oracle workflow", body });
      },
    },
    {
      file: "oracle-failure-handling-flow.webp",
      alsoSvg: true,
      placement: "Oracle Security and Data Reliability",
      alt: "Decision flow showing how a contract handles stale, invalid or conflicting oracle data",
      svg: () => {
        const body = decisionChain(
          [
            { q: "Is the L2 sequencer up, with the grace period passed?", out: "Revert", outSub: "Prices may be stale while the sequencer recovers" },
            { q: "Is the price fresh (age within the feed's heartbeat)?", out: "Pause risky actions", outSub: "Block new borrows and liquidations; keep repay and withdraw open" },
            { q: "Is the value above zero and inside sanity bounds?", out: "Reject the value", outSub: "Circuit breaker trips and alerts the owner" },
            { q: "Do primary and secondary sources agree within the deviation limit?", out: "Switch to fallback or pause", outSub: "Recovery through a timelocked multisig" },
          ],
          { title: "Use the price and execute", sub: "Liquidate, settle, mint or pay out with validated data", kicker: "ALL CHECKS PASS" },
          { y: 220, qh: 220, oy: 580, oh: 190 }
        );
        return frame({ kicker: K, title: "How a contract handles bad oracle data", body });
      },
    },
    {
      file: "oracle-integration-process.webp",
      alsoSvg: true,
      placement: "Our Blockchain Oracle Integration Process",
      alt: "Eight-phase blockchain oracle integration process from assessment to monitoring",
      svg: () => {
        const steps = [
          ["Requirements & data-source assessment", "Data requirements; risk rating per data point"],
          ["Network & provider selection", "Provider recommendation; per-chain availability matrix"],
          ["Architecture design", "Architecture diagram; failure-handling spec; fixed-price proposal"],
          ["Oracle & contract integration", "Source code in your repo; deployment scripts"],
          ["Data validation & testing", "Unit, integration and mainnet-fork test suites"],
          ["Security & failure testing", "Failure-test report; fixes; audit-prep package"],
          ["Deployment", "Verified contracts; configuration record; handover docs"],
          ["Monitoring & maintenance", "Dashboards, alerts and runbook"],
        ].map(([title, sub]) => ({ title, sub, subKicker: "YOU RECEIVE" }));
        const body = timeline(steps, { y: 500, alternate: true });
        return frame({ kicker: K, title: "Our eight-phase oracle integration process", body });
      },
    },
  ],
};
