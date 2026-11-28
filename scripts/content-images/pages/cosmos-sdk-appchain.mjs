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
  numCircle,
} from "../lib.mjs";

const K = "Cosmos SDK Appchain Development";

function archDiagram(scale = 1) {
  // Returns body for the layered architecture (used by hero and OG).
  let s = "";
  s += rect(80, 190, 940, 620, {
    fill: "rgba(21,31,54,0.5)",
    r: 22,
    stroke: C.stroke,
  });
  s += text(110, 230, "YOUR APPCHAIN NODE BINARY", {
    size: 14,
    weight: 700,
    fill: C.muted,
    ls: 2,
  });
  // custom modules
  s += pill(110, 252, "YOU BUILD", { size: 12, ls: 1.5 });
  ["x/orders", "x/rewards", "x/compliance"].forEach((m, i) => {
    s += box(110 + i * 296, 292, 284, 92, {
      title: m,
      sub: "Custom module",
      accent: true,
      titleSize: 21,
      subSize: 14.5,
      subMono: false,
    });
  });
  s += pill(110, 404, "YOU CONFIGURE", {
    size: 12,
    ls: 1.5,
    color: C.blue,
    fill: "rgba(96,165,250,0.12)",
  });
  [
    "auth",
    "bank",
    "staking",
    "gov",
    "slashing",
    "distribution",
    "ibc-go",
    "CosmWasm / EVM",
  ].forEach((m, i) => {
    const x = 110 + (i % 4) * 222,
      y = 444 + Math.floor(i / 4) * 70;
    s += box(x, y, 210, 58, { title: m, titleSize: 17 });
  });
  s += box(110, 600, 880, 64, {
    title: "ABCI 2.0",
    sub: "PrepareProposal · ProcessProposal · ExtendVote · FinalizeBlock",
    titleSize: 18,
    subSize: 14.5,
    fill: C.card2,
  });
  s += box(110, 684, 880, 100, {
    title: "CometBFT consensus & networking",
    sub: "Deterministic finality once more than two-thirds of voting power commits",
    titleSize: 21,
    subSize: 15,
  });
  // IBC side
  s += pill(1100, 196, "IBC CONNECTIONS", { size: 13, ls: 1.5 });
  const peers = [
    ["Other IBC chains", "Light-client verified, via ibc-go"],
    ["Cosmos Hub", "Optional, never required"],
    ["Ethereum & EVM", "IBC v2 Solidity contracts"],
  ];
  peers.forEach(([t, d], i) => {
    const y = 250 + i * 190;
    s += box(1130, y, 390, 150, {
      title: t,
      sub: d,
      titleSize: 22,
      subSize: 15.5,
    });
    s += arrow(1024, 470 + (i - 1) * 60, 1124, y + 75, {
      both: true,
      sw: 2.5,
      dash: i === 2 ? "8 6" : undefined,
    });
  });
  return s;
}

export default {
  slug: "cosmos-sdk-appchain",
  contentDir: "cosmos-sdk-appchain-seo",
  images: [
    {
      file: "cosmos-sdk-appchain-architecture-overview.webp",
      placement: "Hero",
      alt: "Cosmos SDK appchain architecture showing custom modules, CometBFT consensus and IBC connections",
      svg: () =>
        frame({
          kicker: K,
          title: "Anatomy of a Cosmos SDK appchain",
          body: archDiagram(),
        }),
    },
    {
      file: "appchain-vs-smart-contract-vs-rollup-decision-tree.webp",
      placement: "Decision framework",
      alt: "Decision tree comparing smart contracts, rollups and Cosmos appchains",
      svg: () => {
        let body = "";
        const qs = [
          [
            "Do you need control of block logic, ordering or fees?",
            "Smart contracts on an existing chain",
            "Lowest ops burden; host chain's security, fees and finality",
          ],
          [
            "Do you want Ethereum settlement and EVM tooling above all?",
            "Rollup appchain",
            "OP Stack, Arbitrum Orbit: Ethereum settlement, sequencer-dependent",
            true,
          ],
          [
            "Are all validators known, authorised organisations?",
            "Permissioned Cosmos SDK chain",
            "Proof of authority; enterprises, consortia, regulated assets",
            true,
          ],
        ];
        const qx = 80,
          qw = 560;
        qs.forEach(([q, out, d, yesOut], i) => {
          const y = 185 + i * 180;
          body += box(qx, y, qw, 120, {
            title: q,
            kicker: `QUESTION ${i + 1}`,
            titleSize: 21,
            align: "left",
            pad: 26,
          });
          // outcome to the right
          const lbl = i === 0 ? "No" : "Yes";
          body += arrow(qx + qw + 4, y + 60, 836, y + 60, {
            color: i === 0 ? C.red : C.green,
            label: lbl,
            lfill: i === 0 ? C.red : C.green,
            lsize: 16,
          });
          body += box(840, y, 680, 120, {
            title: out,
            sub: d,
            align: "left",
            pad: 26,
            titleSize: 22,
            subSize: 16,
          });
          if (i < qs.length - 1)
            body += arrow(qx + qw / 2, y + 123, qx + qw / 2, y + 177, {
              color: i === 0 ? C.green : C.red,
              label: i === 0 ? "Yes" : "No",
              lfill: i === 0 ? C.green : C.red,
              lx: 26,
              ly: 6,
              lsize: 16,
            });
        });
        const fy = 185 + 3 * 180 - 15;
        body += arrow(qx + qw / 2, 185 + 2 * 180 + 123, qx + qw / 2, fy - 3, {
          color: C.red,
          label: "No",
          lfill: C.red,
          lx: 26,
          ly: 6,
          lsize: 16,
        });
        body += box(qx, fy, 1440, 105, {
          title: "Sovereign Cosmos SDK appchain",
          sub: "Your own validator set and token, full ABCI 2.0 control, IBC to other chains, Ethereum via IBC v2. Highest operational burden.",
          accent: true,
          titleSize: 24,
          subSize: 16.5,
          align: "left",
          pad: 28,
        });
        return frame({
          kicker: K,
          title: "Smart contract, rollup or appchain? A decision tree",
          body,
        });
      },
    },
    {
      file: "abci-2-cometbft-cosmos-sdk-block-flow.webp",
      placement: "Architecture H2",
      alt: "ABCI 2.0 block flow between CometBFT and a Cosmos SDK application",
      svg: () => {
        let body = "";
        const laneY1 = 200,
          laneY2 = 560,
          laneH = 230;
        body += rect(80, laneY1, 1440, laneH, {
          fill: "rgba(96,165,250,0.05)",
          stroke: "rgba(96,165,250,0.35)",
          r: 20,
        });
        body += text(110, laneY1 + 40, "COMETBFT (CONSENSUS)", {
          size: 15,
          weight: 700,
          fill: C.blue,
          ls: 2,
        });
        body += rect(80, laneY2, 1440, laneH, {
          fill: "rgba(245,165,36,0.05)",
          stroke: "rgba(245,165,36,0.4)",
          r: 20,
        });
        body += text(
          110,
          laneY2 + laneH - 22,
          "COSMOS SDK APPLICATION (YOUR STATE MACHINE)",
          { size: 15, weight: 700, fill: C.amber, ls: 2 },
        );
        const steps = [
          [
            "Proposer selected",
            "Round starts",
            "PrepareProposal",
            "Proposer builds the block; app can reorder, add or drop txs",
          ],
          [
            "Validators receive",
            "Proposal gossiped",
            "ProcessProposal",
            "Each validator's app accepts or rejects the block",
          ],
          [
            "Pre-commit votes",
            "Votes carry extensions",
            "ExtendVote / Verify",
            "Validators attach data (e.g. prices) to their votes",
          ],
          [
            "Block decided",
            "> 2/3 voting power",
            "FinalizeBlock",
            "Transactions execute; events and results returned",
          ],
          [
            "Block committed",
            "Final, no reorgs",
            "Commit",
            "App persists state; new app hash",
          ],
        ];
        const w = 240,
          gap = 50;
        steps.forEach(([c1, c2, a1, a2], i) => {
          const x = 110 + i * (w + gap);
          body += box(x, laneY1 + 66, w, 130, {
            title: c1,
            sub: c2,
            titleSize: 19,
            subSize: 15,
          });
          body += box(x, laneY2 + 22, w, 160, {
            title: a1,
            sub: a2,
            titleSize: 19,
            subSize: 14.5,
            accent: true,
            pad: 14,
          });
          body += arrow(
            x + w / 2 - 30,
            laneY1 + 200,
            x + w / 2 - 30,
            laneY2 + 18,
            { sw: 2.2, label: "request", lx: -42, lsize: 13 },
          );
          body += arrow(
            x + w / 2 + 30,
            laneY2 + 18,
            x + w / 2 + 30,
            laneY1 + 200,
            { sw: 2.2, color: C.muted, label: "response", lx: 52, lsize: 13 },
          );
          if (i < steps.length - 1)
            body += arrow(
              x + w + 4,
              laneY1 + 131,
              x + w + gap - 4,
              laneY1 + 131,
              { color: C.blue === C.blue ? C.muted : C.muted, sw: 2 },
            );
        });
        return frame({
          kicker: K,
          title: "ABCI 2.0: how CometBFT and your app build each block",
          body,
        });
      },
    },
    {
      file: "cosmos-sdk-custom-module-anatomy.webp",
      placement: "Modules H2",
      alt: "Anatomy of a custom Cosmos SDK module with keeper, message server and store",
      svg: () => {
        let body = "";
        // entry points
        body += box(80, 220, 300, 110, {
          title: "Transaction",
          sub: "Signed Msg from a user",
          titleSize: 21,
        });
        body += box(80, 440, 300, 110, {
          title: "gRPC / REST query",
          sub: "Wallets, explorers, apps",
          titleSize: 21,
        });
        body += box(80, 660, 300, 110, {
          title: "Block lifecycle",
          sub: "Begin / end of every block",
          titleSize: 21,
        });
        body += box(450, 220, 260, 110, {
          title: "Ante handler",
          sub: "Signatures, fees, nonces",
          titleSize: 20,
        });
        body += arrow(384, 275, 446, 275);
        // module frame
        body += rect(780, 190, 740, 620, {
          fill: "rgba(245,165,36,0.05)",
          stroke: C.amber,
          sw: 2,
          r: 22,
          dash: "8 6",
        });
        body += text(810, 230, "x/yourmodule", {
          size: 22,
          weight: 700,
          fill: C.amber,
          mono: true,
        });
        body += box(820, 250, 300, 110, {
          title: "Msg server",
          sub: "Validates and routes messages",
          titleSize: 20,
        });
        body += box(820, 440, 300, 110, {
          title: "Query server",
          sub: "Read-only gRPC endpoints",
          titleSize: 20,
        });
        body += box(820, 660, 300, 110, {
          title: "BeginBlock / EndBlock",
          sub: "Scheduled logic each block",
          titleSize: 19,
        });
        body += box(1180, 360, 300, 200, {
          title: "Keeper",
          sub: "Owns the module's state and business rules; the only path to its store",
          accent: true,
          titleSize: 24,
          subSize: 15.5,
        });
        body += box(1180, 640, 300, 130, {
          title: "KVStore",
          sub: "Module's namespaced, deterministic state",
          titleSize: 21,
        });
        body += arrow(714, 275, 816, 300);
        body += arrow(384, 495, 816, 495);
        body += arrow(384, 715, 816, 715);
        body += path([
          [1124, 305],
          [1150, 305],
          [1150, 420],
          [1176, 420],
        ]);
        body += arrow(1124, 495, 1176, 480);
        body += path([
          [1124, 715],
          [1150, 715],
          [1150, 520],
          [1176, 520],
        ]);
        body += arrow(1330, 564, 1330, 636, { both: true });
        body += text(
          810,
          795,
          "Other modules reach this state only through the keeper's exported methods",
          { size: 15, fill: C.muted },
        );
        return frame({
          kicker: K,
          title: "Inside a custom Cosmos SDK module",
          body,
        });
      },
    },
    {
      file: "ibc-light-clients-connections-channels-packets.webp",
      placement: 'IBC H3 "How IBC works"',
      alt: "How IBC works: light clients, connections, channels and packets relayed between two chains",
      svg: () => {
        let body = "";
        const chain = (x, name, other) => {
          let s = rect(x, 200, 470, 560, { fill: "rgba(21,31,54,0.6)", r: 22 });
          s += text(x + 30, 245, name, { size: 26, weight: 700 });
          s += box(x + 30, 275, 410, 100, {
            title: "Application module",
            sub: "e.g. token transfer (ICS-20)",
            titleSize: 20,
          });
          s += box(x + 30, 400, 410, 82, {
            title: "Channel",
            sub: "Ordered or unordered app link",
            titleSize: 19,
            subSize: 14.5,
          });
          s += box(x + 30, 507, 410, 82, {
            title: "Connection",
            sub: "Pairs the two light clients",
            titleSize: 19,
            subSize: 14.5,
          });
          s += box(x + 30, 614, 410, 116, {
            title: `Light client of ${other}`,
            sub: "Tracks the other chain's validators and verifies its headers",
            accent: true,
            titleSize: 20,
            subSize: 14.5,
          });
          return s;
        };
        body += chain(80, "Chain A", "Chain B");
        body += chain(1050, "Chain B", "Chain A");
        // relayer
        body += box(610, 400, 380, 150, {
          title: "Relayer",
          sub: "Carries packets and proofs. Trusted for liveness only: can delay, cannot forge",
          titleSize: 24,
          subSize: 15,
        });
        body += arrow(552, 330, 1048, 330, {
          label: "① Packet + proof of commitment",
          ly: -14,
          lfill: C.text,
          lsize: 17,
        });
        body += arrow(1048, 610, 552, 610, {
          color: C.muted,
          label: "② Acknowledgement written on Chain B",
          ly: -14,
          lfill: C.text,
          lsize: 17,
        });
        body += box(560, 660, 480, 100, {
          title: "③ Timeout",
          sub: "If not received in time, the sender refunds or reverts",
          titleSize: 19,
          subSize: 15,
          stroke: "rgba(248,113,113,0.5)",
          fill: "#1d1a2a",
        });
        return frame({
          kicker: K,
          title: "How IBC moves data between two chains",
          body,
        });
      },
    },
    {
      file: "ibc-v2-cosmos-ethereum-connection.webp",
      placement: "IBC v2 H3",
      alt: "IBC v2 connection between a Cosmos appchain and Ethereum",
      svg: () => {
        let body = "";
        body += rect(80, 200, 500, 520, { fill: "rgba(21,31,54,0.6)", r: 22 });
        body += text(110, 245, "Your Cosmos appchain", {
          size: 25,
          weight: 700,
        });
        body += box(110, 280, 440, 110, {
          title: "IBC v2 (ibc-go)",
          sub: "No channel handshake: packets route between light clients",
          titleSize: 20,
          subSize: 15,
        });
        body += box(110, 420, 440, 120, {
          title: "Ethereum light client",
          sub: "Verifies Ethereum consensus on your chain",
          accent: true,
          titleSize: 20,
          subSize: 15,
        });
        body += box(110, 570, 440, 120, {
          title: "Attestation client",
          sub: "Fixed signer committee where a full light client isn't practical yet",
          dash: "7 6",
          titleSize: 19,
          subSize: 14.5,
        });

        body += rect(1020, 200, 500, 520, {
          fill: "rgba(21,31,54,0.6)",
          r: 22,
        });
        body += text(1050, 245, "Ethereum / EVM network", {
          size: 25,
          weight: 700,
        });
        body += box(1050, 280, 440, 110, {
          title: "IBC Solidity contracts",
          sub: "Send and receive IBC v2 packets",
          titleSize: 20,
          subSize: 15,
        });
        body += box(1050, 420, 440, 120, {
          title: "CometBFT light client",
          sub: "Verifies your appchain; SP1 zero-knowledge proofs keep gas affordable",
          accent: true,
          titleSize: 20,
          subSize: 14.5,
        });
        body += box(1050, 570, 440, 120, {
          title: "Attestation path",
          sub: "Weaker trust assumption, stated plainly",
          dash: "7 6",
          titleSize: 19,
          subSize: 14.5,
        });

        body += box(640, 380, 320, 120, {
          title: "Relayer",
          sub: "Moves packets and proofs both ways",
          titleSize: 22,
          subSize: 15,
        });
        body += arrow(554, 480, 636, 450, { both: true });
        body += arrow(964, 450, 1046, 480, { both: true });
        body += arrow(554, 630, 1046, 630, {
          both: true,
          dash: "8 7",
          color: C.muted,
          label: "Attestation route (dashed = weaker trust)",
          ly: -14,
          lsize: 15,
        });
        body += box(80, 750, 1440, 60, { title: "", fill: C.card });
        body +=
          text(
            110,
            787,
            "Solid = proof-based light-client verification in both directions",
            { size: 17, fill: C.muted },
          ) +
          text(860, 787, "Dashed = committee attestation (weaker trust)", {
            size: 17,
            fill: C.muted,
          });
        return frame({
          kicker: K,
          title: "IBC v2: connecting a Cosmos appchain to Ethereum",
          body,
        });
      },
    },
    {
      file: "cosmos-validator-sentry-node-architecture.webp",
      placement: "Validator H2",
      alt: "Cosmos validator infrastructure with sentry nodes, remote signer and monitoring",
      svg: () => {
        let body = "";
        body += box(80, 200, 300, 120, {
          title: "Public P2P network",
          sub: "Other validators and full nodes",
          titleSize: 20,
        });
        body += box(80, 620, 300, 150, {
          title: "Wallets, apps, integrators",
          sub: "Query and submit transactions",
          titleSize: 20,
        });
        // sentries
        body += rect(450, 190, 330, 360, {
          fill: "rgba(96,165,250,0.05)",
          stroke: "rgba(96,165,250,0.35)",
          r: 20,
          dash: "6 6",
        });
        body += text(474, 224, "SENTRY LAYER", {
          size: 14,
          weight: 700,
          fill: C.blue,
          ls: 2,
        });
        ["Sentry node A", "Sentry node B", "Sentry node C"].forEach((t, i) => {
          body += box(474, 244 + i * 98, 282, 82, {
            title: t,
            sub: "Different region / provider",
            titleSize: 19,
            subSize: 14,
          });
          body += arrow(384, 260, 470, 285 + i * 98, { sw: 2, color: C.muted });
        });
        body += rect(450, 590, 330, 210, {
          fill: "rgba(96,165,250,0.05)",
          stroke: "rgba(96,165,250,0.35)",
          r: 20,
          dash: "6 6",
        });
        body += text(474, 624, "PUBLIC ENDPOINTS", {
          size: 14,
          weight: 700,
          fill: C.blue,
          ls: 2,
        });
        body += box(474, 640, 282, 70, {
          title: "RPC · gRPC · REST",
          titleSize: 18,
        });
        body += box(474, 720, 282, 62, {
          title: "Archive nodes",
          titleSize: 18,
        });
        body += arrow(384, 695, 470, 695, { both: true, sw: 2 });
        // private
        body += rect(850, 190, 380, 610, {
          fill: "rgba(245,165,36,0.05)",
          stroke: "rgba(245,165,36,0.45)",
          r: 20,
          dash: "6 6",
        });
        body += text(874, 224, "PRIVATE NETWORK", {
          size: 14,
          weight: 700,
          fill: C.amber,
          ls: 2,
        });
        body += box(874, 250, 332, 150, {
          title: "Validator node",
          sub: "Never exposed to public P2P; peers only with its sentries",
          accent: true,
          titleSize: 22,
          subSize: 15,
        });
        body += arrow(760, 370, 870, 325, { both: true, sw: 2.2 });
        body += box(874, 450, 332, 130, {
          title: "Remote signer",
          sub: "cosmos-kms, or threshold signing such as Horcrux",
          titleSize: 20,
          subSize: 15,
        });
        body += arrow(1040, 404, 1040, 446, { both: true });
        body += box(874, 630, 332, 140, {
          title: "HSM / cloud KMS",
          sub: "Consensus key never sits on the validator host",
          titleSize: 20,
          subSize: 15,
        });
        body += arrow(1040, 584, 1040, 626, { both: true });
        // monitoring
        body += box(1290, 190, 230, 440, {
          title: "Monitoring",
          sub: "Prometheus metrics, OpenTelemetry, alerts:\n\nmissed blocks\npeer count\nmempool size\nblock-time drift\ndisk growth\nrelayer backlog\nlight-client expiry",
          titleSize: 22,
          subSize: 15.5,
          top: true,
        });
        body += arrow(1234, 330, 1286, 330, {
          color: C.muted,
          dash: "5 5",
          sw: 2,
        });
        return frame({
          kicker: K,
          title: "Validator infrastructure: sentries, signer and monitoring",
          body,
        });
      },
    },
    {
      file: "cosmos-appchain-testnet-to-mainnet-launch-timeline.webp",
      placement: "Launch H2",
      alt: "Cosmos appchain launch timeline from devnet to mainnet genesis",
      svg: () => {
        const steps = [
          {
            title: "Local devnets",
            sub: "Multi-node networks running continuously in CI",
          },
          {
            title: "Internal testnet",
            sub: "Production config, explorer, monitoring and relayers",
          },
          {
            title: "Public testnet",
            sub: "External validators practise operations; real usage finds issues",
          },
          {
            title: "Gentx window",
            sub: "Genesis candidate published; validators submit signed gentxs",
          },
          {
            title: "Genesis",
            sub: "Final genesis file verified and its hash published",
            accent: true,
          },
          {
            title: "Mainnet",
            sub: "First block once > 2/3 of genesis voting power is online",
          },
        ];
        const body = timeline(steps, { y: 320, cardH: 250 });
        return frame({
          kicker: K,
          title: "From devnet to mainnet: the launch timeline",
          body,
        });
      },
    },
    {
      file: "cosmos-chain-upgrade-cosmovisor-flow.webp",
      placement: "Upgrades H2",
      alt: "Cosmos SDK chain upgrade flow using governance and Cosmovisor",
      svg: () => {
        const steps = [
          [
            "Governance proposal",
            "Software upgrade proposal sets an upgrade height",
          ],
          ["Vote passes", "Validators and delegators approve on-chain"],
          ["Upgrade height", "Every node halts at the same block"],
          ["Cosmovisor swap", "Switches to the new binary automatically"],
          ["Store migration", "Upgrade handler migrates stored state"],
          ["Chain resumes", "Blocks continue on the new version"],
        ];
        let body = "";
        const w = 216,
          gap = 28,
          y = 300,
          h = 250;
        steps.forEach(([t, s], i) => {
          const x = 80 + i * (w + gap);
          body += box(x, y, w, h, {
            title: t,
            sub: s,
            titleSize: 20,
            subSize: 15.5,
            accent: i === 3 || i === 4,
            top: true,
            pad: 16,
          });
          body += numCircle(x + w / 2, y, i + 1, { r: 21 });
          if (i < steps.length - 1)
            body += arrow(x + w + 2, y + h / 2, x + w + gap - 2, y + h / 2);
        });
        body += box(80, 640, 1440, 120, { title: "", fill: C.card });
        body += text(110, 690, "WHAT WE DO", {
          size: 14,
          weight: 700,
          fill: C.amber,
          ls: 2,
        });
        body += text(
          110,
          724,
          "Write and rehearse upgrade handlers on a testnet, coordinate validators, and keep the chain on a supported SDK and CometBFT release line.",
          { size: 18, maxWidth: 1380 },
        );
        return frame({
          kicker: K,
          title: "How a Cosmos chain upgrade works",
          body,
        });
      },
    },
    {
      file: "cosmos-sdk-appchain-development-og.webp",
      og: true,
      placement: "OG / social image (1200×630)",
      alt: "Cosmos SDK appchain development services by ClickMasters",
      svg: () => {
        let body = "";
        body += text(80, 250, "Cosmos SDK Appchain", { size: 60, weight: 700 });
        body += text(80, 322, "Development Services", {
          size: 60,
          weight: 700,
          fill: C.amber,
        });
        body += text(
          80,
          382,
          "Custom modules · CometBFT · IBC · Launch & operations",
          { size: 22, fill: C.muted },
        );
        const layers = ["Custom modules", "Cosmos SDK modules", "CometBFT"];
        layers.forEach(
          (l, i) =>
            (body += box(80 + i * 250, 440, 230, 70, {
              title: l,
              titleSize: 18,
              accent: i === 0,
            })),
        );
        body += `<circle cx="1010" cy="250" r="110" fill="none" stroke="${C.amber}" stroke-opacity="0.35" stroke-width="2"/><circle cx="1010" cy="250" r="60" fill="${C.amberDim}" stroke="${C.amber}" stroke-width="2"/>`;
        [
          [0, -110],
          [95, 55],
          [-95, 55],
        ].forEach(
          ([dx, dy]) =>
            (body += `<circle cx="${1010 + dx}" cy="${250 + dy}" r="16" fill="${C.amber}"/>`),
        );
        body += text(1010, 258, "IBC", {
          size: 24,
          weight: 700,
          anchor: "middle",
          fill: C.amber,
        });
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
