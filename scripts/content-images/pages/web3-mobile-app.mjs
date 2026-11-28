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
  sequence,
  numCircle,
  stack,
} from "../lib.mjs";

const K = "Web3 Mobile App Development";

/** Phone frame. content(x, y, w, h) returns inner SVG for the screen area. */
function phone(x, y, w, h, os, content) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="44" fill="#05070d" stroke="#3a4766" stroke-width="3"/>`;
  s += `<rect x="${x + 12}" y="${y + 12}" width="${w - 24}" height="${h - 24}" rx="34" fill="#0d1426"/>`;
  if (os === "ios")
    s += `<rect x="${x + w / 2 - 50}" y="${y + 24}" width="100" height="26" rx="13" fill="#05070d"/>`;
  else s += `<circle cx="${x + w / 2}" cy="${y + 36}" r="8" fill="#05070d"/>`;
  s += text(x + 36, y + 44, "9:41", { size: 14, weight: 600, fill: C.text });
  s += content(x + 12, y + 64, w - 24, h - 88);
  s += `<rect x="${x + w / 2 - 60}" y="${y + h - 26}" width="120" height="5" rx="2.5" fill="#4b5878"/>`;
  return s;
}

function row(x, y, w, k, v, o = {}) {
  return (
    text(x, y, k, { size: o.size ?? 15, fill: C.muted }) +
    text(x + w, y, v, {
      size: o.size ?? 15,
      fill: o.fill ?? C.text,
      anchor: "end",
      weight: o.weight ?? 600,
    })
  );
}

function button(x, y, w, label, primary = true, h = 48) {
  return (
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${primary ? C.amber : "transparent"}" stroke="${primary ? C.amber : C.stroke}" stroke-width="1.5"/>` +
    text(x + w / 2, y + h / 2 + 6, label, {
      size: 16,
      weight: 700,
      anchor: "middle",
      fill: primary ? "#111" : C.text,
    })
  );
}

function signingScreen(x, y, w, h) {
  const p = 22;
  let s = text(x + p, y + 36, "Confirm swap", { size: 22, weight: 700 });
  s += pill(x + w - p - 120, y + 14, "Base", {
    size: 12,
    w: 120,
    color: C.blue,
    fill: "rgba(96,165,250,0.12)",
  });
  s += rect(x + p, y + 64, w - p * 2, 168, { fill: C.card, r: 16 });
  s += text(x + p + 18, y + 96, "You send", { size: 14, fill: C.muted });
  s += text(x + p + 18, y + 128, "250.00 USDC", { size: 24, weight: 700 });
  s += `<line x1="${x + p + 18}" y1="${y + 148}" x2="${x + w - p - 18}" y2="${y + 148}" stroke="${C.stroke}"/>`;
  s += text(x + p + 18, y + 176, "You receive (estimated)", {
    size: 14,
    fill: C.muted,
  });
  s += text(x + p + 18, y + 208, "≈ 0.0812 ETH", {
    size: 24,
    weight: 700,
    fill: C.green,
  });
  s += row(x + p, y + 270, w - p * 2, "Network fee", "$0.04");
  s += row(x + p, y + 302, w - p * 2, "Spend approval", "250 USDC only");
  s += row(x + p, y + 334, w - p * 2, "Contract", "Verified ✓", {
    fill: C.green,
  });
  s += row(x + p, y + 366, w - p * 2, "Simulation", "No unusual effects", {
    fill: C.green,
  });
  s += button(x + p, y + h - 128, w - p * 2, "Confirm with Face ID");
  s += button(x + p, y + h - 68, w - p * 2, "Reject", false);
  return s;
}

export default {
  slug: "web3-mobile-app",
  contentDir: "web3-mobile-app-seo",
  images: [
    {
      file: "web3-mobile-app-development-ios-android.webp",
      placement: "Hero",
      alt: "Web3 mobile app development: iOS and Android app screens showing wallet connection and a transaction preview",
      svg: () => {
        let body = "";
        body += text(80, 260, "One product,", { size: 40, weight: 700 });
        body += text(80, 310, "iOS and Android", {
          size: 40,
          weight: 700,
          fill: C.amber,
        });
        body += text(80, 360, "Wallet connection, readable signing and", {
          size: 20,
          fill: C.muted,
        });
        body += text(80, 388, "honest transaction status on both platforms.", {
          size: 20,
          fill: C.muted,
        });
        [
          ["Wallet connect", "WalletConnect / Reown AppKit"],
          ["Embedded wallets", "Email, social or passkey sign-in"],
          ["Readable signing", "EIP-712, simulation, fiat fees"],
        ].forEach(([t, d], i) => {
          const y = 450 + i * 100;
          body += numCircle(104, y + 30, i + 1, { r: 20 });
          body += text(140, y + 26, t, { size: 21, weight: 600 });
          body += text(140, y + 52, d, { size: 16, fill: C.muted });
        });
        // iOS phone: connect sheet
        body += phone(640, 160, 380, 650, "ios", (x, y, w, h) => {
          let s = text(x + 22, y + 40, "Portfolio", { size: 24, weight: 700 });
          s += rect(x + 22, y + 58, w - 44, 110, { fill: C.card, r: 16 });
          s += text(x + 42, y + 92, "Total balance", {
            size: 14,
            fill: C.muted,
          });
          s += text(x + 42, y + 134, "$0.00", { size: 32, weight: 700 });
          s += `<rect x="${x}" y="${y + 220}" width="${w}" height="${h - 220}" rx="28" fill="${C.card2}" stroke="${C.stroke}"/>`;
          s += `<rect x="${x + w / 2 - 24}" y="${y + 232}" width="48" height="5" rx="2.5" fill="#4b5878"/>`;
          s += text(x + 24, y + 280, "Connect a wallet", {
            size: 21,
            weight: 700,
          });
          [
            "MetaMask",
            "Coinbase Wallet",
            "Phantom",
            "Other (WalletConnect)",
          ].forEach((wl, i) => {
            const yy = y + 316 + i * 54;
            s += rect(x + 22, yy, w - 44, 44, { fill: C.card, r: 12 });
            s += `<circle cx="${x + 50}" cy="${yy + 22}" r="11" fill="${i === 0 ? C.amber : C.stroke}"/>`;
            s += text(x + 74, yy + 28, wl, { size: 16, weight: 500 });
          });
          s += text(x + w / 2, y + h - 6, "Or continue with email or passkey", {
            size: 13.5,
            fill: C.amber,
            anchor: "middle",
            weight: 600,
          });
          return s;
        });
        // Android phone: transaction preview
        body += phone(1100, 160, 380, 650, "android", signingScreen);
        return frame({
          kicker: K,
          title: "Web3 mobile apps for iOS and Android",
          body,
        });
      },
    },
    {
      file: "web3-mobile-app-architecture-layers.webp",
      placement: '"What Web3 Mobile App Development Actually Involves"',
      alt: "Diagram of Web3 mobile app architecture: mobile client, wallet and signing layer, backend and indexer, blockchain network",
      svg: () => {
        const layers = [
          {
            title: "Mobile client",
            sub: "Screens, navigation, local security, deep links, notifications · Swift/SwiftUI, Kotlin/Compose, React Native, Flutter",
            tag: "LAYER 1",
          },
          {
            title: "Wallet & signing",
            sub: "Create or connect a wallet, sign messages and transactions · Reown AppKit, MetaMask Connect, embedded wallets, smart accounts",
            tag: "LAYER 2",
            accent: true,
          },
          {
            title: "Backend & indexing",
            sub: "Fast reads, history, search, push, protected API keys · Node.js, The Graph / Goldsky, webhooks, PostgreSQL / Redis",
            tag: "LAYER 3",
          },
          {
            title: "Blockchain",
            sub: "Ownership, settlement and contract logic · Ethereum, Arbitrum, Base, Optimism, Polygon, Avalanche, Solana",
            tag: "LAYER 4",
          },
        ];
        let body = stack(layers, {
          x: 80,
          y: 200,
          w: 1440,
          h: 128,
          gap: 32,
          both: true,
        });
        return frame({
          kicker: K,
          title: "The four layers of a Web3 mobile app",
          body,
        });
      },
    },
    {
      file: "walletconnect-mobile-deep-link-flow.webp",
      placement: '"External Wallet Connection"',
      alt: "Mobile wallet connection flow using WalletConnect deep links between a dApp and a wallet app",
      svg: () => {
        const parts = [
          { id: "u", label: "User", sub: "On their phone" },
          { id: "a", label: "Your app", sub: "Reown AppKit SDK", accent: true },
          { id: "r", label: "Encrypted relay", sub: "WalletConnect network" },
          { id: "w", label: "Wallet app", sub: "MetaMask, Coinbase, Phantom" },
        ];
        const msgs = [
          { from: "u", to: "a", label: "Taps “Connect wallet”" },
          { from: "a", to: "r", label: "Creates session request" },
          {
            from: "a",
            to: "w",
            label: "Opens wallet via deep link / universal link",
          },
          { from: "w", self: true, label: "User approves the connection" },
          {
            from: "w",
            to: "r",
            label: "Session approval",
            dash: "6 5",
            color: C.muted,
          },
          {
            from: "w",
            to: "a",
            label: "Returns user to your app",
            dash: "6 5",
            color: C.muted,
          },
          {
            from: "a",
            self: true,
            label: "Confirms session from the wallet's response",
            color: C.green,
          },
          {
            from: "a",
            to: "w",
            label: "Later signing requests reopen the wallet briefly",
          },
        ];
        let body = sequence(parts, msgs, { y: 180, rowH: 66 });
        return frame({
          kicker: K,
          title: "How a mobile app connects to an external wallet",
          body,
        });
      },
    },
    {
      file: "embedded-wallet-vs-external-wallet-onboarding.webp",
      placement: '"Which Wallet Model Fits Your App?"',
      alt: "Comparison of embedded wallet onboarding with email or passkey versus connecting an external crypto wallet",
      svg: () => {
        const col = (x, t, s, steps, fit, trade, acc) => {
          let o = rect(x, 190, 700, 620, {
            fill: acc ? "#1d2034" : "rgba(21,31,54,0.6)",
            stroke: acc ? C.amber : C.stroke,
            r: 20,
          });
          o += text(x + 32, 244, t, {
            size: 30,
            weight: 700,
            fill: acc ? C.amber : C.text,
          });
          o += text(x + 32, 276, s, { size: 16.5, fill: C.muted });
          steps.forEach((st, i) => {
            const y = 306 + i * 86;
            o += numCircle(x + 58, y + 34, i + 1, { r: 19 });
            o += box(x + 96, y, 572, 68, {
              title: st,
              titleSize: 18.5,
              align: "left",
              pad: 22,
            });
          });
          o += text(x + 32, 700, "BEST FOR", {
            size: 13,
            weight: 700,
            fill: C.green,
            ls: 2,
          });
          o += text(x + 32, 726, fit, { size: 16, maxWidth: 300 });
          o += text(x + 370, 700, "PLAN FOR", {
            size: 13,
            weight: 700,
            fill: C.red,
            ls: 2,
          });
          o += text(x + 370, 726, trade, { size: 16, maxWidth: 300 });
          return o;
        };
        let body = col(
          80,
          "Embedded wallet",
          "Created inside your app at sign-in",
          [
            "Sign in with email, Google, Apple or passkey",
            "Wallet created silently, no seed phrase",
            "Gas sponsored, so no token needed to start",
            "Export key later if the user chooses",
          ],
          "Mainstream consumers, games, loyalty",
          "Provider fees and dependency; recovery design",
          true,
        );
        body += col(
          820,
          "External wallet",
          "User brings MetaMask, Coinbase, Phantom…",
          [
            "Tap “Connect wallet”",
            "Wallet app opens via deep link",
            "Approve the connection in the wallet",
            "Return to your app; session stays live",
          ],
          "Crypto-native DeFi and trading users",
          "App switching on every signature; fewer signups",
        );
        body +=
          `<circle cx="800" cy="500" r="30" fill="${C.bg1}" stroke="${C.amber}" stroke-width="2"/>` +
          text(800, 507, "vs", {
            size: 20,
            weight: 700,
            anchor: "middle",
            fill: C.amber,
          });
        return frame({
          kicker: K,
          title: "Embedded vs external wallet onboarding",
          body,
        });
      },
    },
    {
      file: "readable-transaction-signing-mobile-ui.webp",
      placement: '"Transaction Signing Users Can Understand"',
      alt: "Mobile transaction signing screen showing readable approval details, network fee in dollars and confirmation status",
      svg: () => {
        let body = phone(560, 160, 400, 710, "ios", signingScreen);
        const notes = [
          [
            80,
            250,
            "Readable requests",
            "EIP-712 typed data: “Spend up to 250 USDC”, not hex",
          ],
          [
            80,
            450,
            "Fees in plain money",
            "EIP-1559 estimate shown in the user's currency",
          ],
          [
            80,
            650,
            "Simulation first",
            "Expected tokens out and in; unusual approvals flagged",
          ],
        ];
        notes.forEach(([x, y, t, d]) => {
          body += box(x, y, 400, 130, {
            title: t,
            sub: d,
            align: "left",
            pad: 24,
            titleSize: 21,
            subSize: 15.5,
          });
          body += arrow(x + 404, y + 65, 576, y + 65, {
            color: C.muted,
            dash: "5 5",
            sw: 2,
          });
        });
        // status states
        body += text(1060, 250, "HONEST STATUS", {
          size: 14,
          weight: 700,
          fill: C.amber,
          ls: 2,
        });
        const st = [
          ["Awaiting signature", C.muted],
          ["Submitted", C.blue],
          ["Confirmed", C.green],
          ["Failed / dropped", C.red],
        ];
        st.forEach(([t, col], i) => {
          const y = 280 + i * 120;
          body += rect(1060, y, 460, 92, { fill: C.card, r: 16 });
          body += `<circle cx="1102" cy="${y + 46}" r="12" fill="${col}"/>`;
          body += text(1130, y + 53, t, { size: 21, weight: 600 });
          if (i < 2)
            body += arrow(1102, y + 96, 1102, y + 116, {
              color: C.muted,
              sw: 2,
            });
          if (i === 3)
            body += text(1130, y + 78, "with retry or speed-up options", {
              size: 14,
              fill: C.muted,
            });
        });
        body += text(1060, 790, "Never “Success” just because a", {
          size: 16,
          fill: C.muted,
        });
        body += text(1060, 814, "transaction was broadcast.", {
          size: 16,
          fill: C.muted,
        });
        return frame({
          kicker: K,
          title: "A signing screen users can actually read",
          body,
        });
      },
    },
    {
      file: "mobile-wallet-private-key-protection-secure-enclave.webp",
      placement: '"Private Key Protection"',
      alt: "How a mobile wallet protects private keys: encryption with a Secure Enclave or Android Keystore key and biometric unlock",
      svg: () => {
        let body = "";
        body += box(80, 220, 340, 160, {
          title: "Wallet private key",
          sub: "secp256k1 / ed25519: can't live inside the secure chip directly",
          titleSize: 22,
          subSize: 15.5,
        });
        body += arrow(424, 300, 556, 300, {
          label: "encrypted with",
          lsize: 15,
        });
        body += rect(560, 190, 480, 230, {
          fill: "rgba(245,165,36,0.06)",
          stroke: C.amber,
          sw: 2,
          r: 20,
          dash: "8 6",
        });
        body += text(588, 226, "SECURE HARDWARE", {
          size: 13,
          weight: 700,
          fill: C.amber,
          ls: 2,
        });
        body += box(588, 246, 424, 150, {
          title: "Hardware-backed P-256 key",
          sub: "Secure Enclave (iOS) · Keystore / StrongBox (Android). Never leaves the chip",
          accent: true,
          titleSize: 21,
          subSize: 15,
        });
        body += arrow(1044, 300, 1176, 300, { label: "ciphertext", lsize: 15 });
        body += box(1180, 220, 340, 160, {
          title: "Encrypted key at rest",
          sub: "iOS Keychain or Keystore-protected storage, marked device-only",
          titleSize: 21,
          subSize: 15.5,
        });
        // unlock path
        body += box(560, 560, 480, 180, {
          title: "Fresh biometric check",
          sub: "Face ID, Touch ID or fingerprint bound to the hardware key itself, not a yes/no flag a compromised device could skip",
          titleSize: 22,
          subSize: 15.5,
        });
        body += arrow(800, 556, 800, 424, {
          label: "unlocks key use",
          lx: 70,
          lsize: 15,
        });
        body += box(80, 580, 400, 140, {
          title: "No cloud backups",
          sub: "Device-only items aren't copied to backups or other devices",
          titleSize: 20,
          subSize: 15,
        });
        body += box(1120, 580, 400, 140, {
          title: "Even better: passkey smart account",
          sub: "Signing key never leaves secure hardware at all",
          titleSize: 20,
          subSize: 15,
          stroke: C.green,
        });
        return frame({
          kicker: K,
          title: "How a mobile wallet protects private keys",
          body,
        });
      },
    },
    {
      file: "react-native-flutter-native-web3-comparison.webp",
      placement: '"Native vs Cross-Platform" (optional)',
      alt: "Comparison of React Native, Flutter and native Swift/Kotlin for Web3 mobile app development",
      svg: () => {
        const cols = ["React Native", "Flutter", "Native (Swift / Kotlin)"];
        const rows = [
          ["Web3 SDK coverage", ["Broadest", "Moderate", "Good"], [3, 2, 2]],
          [
            "Embedded wallet SDKs",
            ["Most providers", "Fewer providers", "Several providers"],
            [3, 1, 2],
          ],
          [
            "Code shared with web dApp",
            ["High (TypeScript)", "Low", "None"],
            [3, 1, 0],
          ],
          [
            "Access to secure hardware",
            ["Native modules", "Plugins", "Direct"],
            [2, 1, 3],
          ],
        ];
        const best = [
          "Mobile dApps, DeFi and NFT front ends",
          "Brand-led consumer apps",
          "Wallets, security-critical signing",
        ];
        let body = "";
        const x0 = 80,
          lw = 380,
          cw = 340,
          cg = 13;
        cols.forEach((c, i) => {
          const x = x0 + lw + i * (cw + cg);
          body += box(x, 190, cw, 70, {
            title: c,
            titleSize: 22,
            accent: i === 2,
          });
        });
        rows.forEach(([lbl, vals, score], r) => {
          const y = 280 + r * 104;
          body += rect(x0, y, 1440, 92, {
            fill: r % 2 ? "rgba(21,31,54,0.35)" : "rgba(21,31,54,0.7)",
            r: 12,
            stroke: "transparent",
          });
          body += text(x0 + 24, y + 54, lbl, { size: 19, weight: 600 });
          vals.forEach((v, i) => {
            const x = x0 + lw + i * (cw + cg);
            body += text(x + 24, y + 42, v, { size: 18 });
            for (let d = 0; d < 3; d++)
              body += `<rect x="${x + 24 + d * 40}" y="${y + 58}" width="32" height="8" rx="4" fill="${d < score[i] ? C.amber : C.stroke}"/>`;
          });
        });
        const y = 280 + 4 * 104;
        body += text(x0 + 24, y + 48, "Best fit", {
          size: 19,
          weight: 700,
          fill: C.amber,
        });
        best.forEach(
          (b, i) =>
            (body += text(x0 + lw + i * (cw + cg) + 24, y + 48, b, {
              size: 17,
              maxWidth: cw - 40,
              fill: C.text,
            })),
        );
        return frame({
          kicker: K,
          title: "React Native vs Flutter vs native for Web3 apps",
          body,
        });
      },
    },
    {
      file: "web3-mobile-app-development-process.webp",
      placement: "Process",
      alt: "Six-step Web3 mobile app development process from discovery to store launch and support",
      w: 1600,
      h: 650,
      svg: () => {
        const steps = [
          [
            "Discovery & architecture",
            "1–2 weeks: architecture doc, wallet model, fixed-price scope",
          ],
          [
            "UX & interface design",
            "Onboarding, signing and recovery flows designed first",
          ],
          [
            "Contract & backend build",
            "Smart contracts, indexers, APIs and notifications",
          ],
          [
            "Mobile development",
            "TestFlight and Play internal builds, tested with real wallets",
          ],
          [
            "Security review & testing",
            "Mobile hardening, contract review, real-device testing",
          ],
          [
            "Store launch & support",
            "App Store and Google Play submission, then ongoing support",
          ],
        ].map(([title, sub]) => ({ title, sub }));
        const body = timeline(steps, { y: 260, cardH: 210, top: false });
        return frame({
          h: 650,
          kicker: K,
          title: "Our six-step Web3 mobile app process",
          body,
        });
      },
    },
    {
      file: "og-web3-mobile-app-development.webp",
      og: true,
      placement: "OG / social image (1200×630, not rendered on page)",
      alt: "Web3 mobile app development services by ClickMasters",
      svg: () => {
        let body = text(80, 240, "Web3 Mobile App", { size: 60, weight: 700 });
        body += text(80, 312, "Development", {
          size: 60,
          weight: 700,
          fill: C.amber,
        });
        body += text(80, 370, "iOS & Android · Wallets · Readable signing", {
          size: 22,
          fill: C.muted,
        });
        ["iOS", "Android", "Wallets"].forEach(
          (l, i) =>
            (body += box(80 + i * 190, 420, 170, 64, {
              title: l,
              titleSize: 19,
              accent: i === 2,
            })),
        );
        body += phone(860, 110, 250, 470, "ios", (x, y, w, h) => {
          let s = text(x + 18, y + 34, "Confirm", { size: 18, weight: 700 });
          s += rect(x + 16, y + 52, w - 32, 110, { fill: C.card, r: 14 });
          s += text(x + 30, y + 86, "You send", { size: 12, fill: C.muted });
          s += text(x + 30, y + 112, "250 USDC", { size: 19, weight: 700 });
          s += text(x + 30, y + 146, "≈ 0.0812 ETH", {
            size: 16,
            weight: 700,
            fill: C.green,
          });
          s += row(x + 18, y + 196, w - 36, "Fee", "$0.04", { size: 13 });
          s += row(x + 18, y + 222, w - 36, "Contract", "Verified ✓", {
            size: 13,
            fill: C.green,
          });
          s += button(x + 16, y + h - 70, w - 32, "Confirm", true, 42);
          return s;
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
