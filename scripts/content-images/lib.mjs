// Shared SVG drawing helpers for content diagrams (ClickMasters brand: navy + amber).
export const C = {
  bg1: "#0a1020",
  bg2: "#121b30",
  card: "#151f36",
  card2: "#1b2742",
  stroke: "#2c3a5a",
  amber: "#F5A524",
  amberSoft: "#E8A33D",
  amberDim: "rgba(245,165,36,0.14)",
  text: "#F1F5F9",
  muted: "#9AA8BF",
  dim: "#64748b",
  green: "#34D399",
  red: "#F87171",
  blue: "#60A5FA",
};
export const FONT = "'Segoe UI', 'Inter', 'Helvetica Neue', Arial, sans-serif";
export const MONO = "'Consolas', 'JetBrains Mono', monospace";

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Greedy word-wrap using an approximate glyph width. */
export function wrap(text, maxWidth, size) {
  const max = Math.max(4, Math.floor(maxWidth / (size * 0.53)));
  const out = [];
  for (const para of String(text).split("\n")) {
    let line = "";
    for (const w of para.split(" ")) {
      const t = line ? line + " " + w : w;
      if (t.length > max && line) {
        out.push(line);
        line = w;
      } else line = t;
    }
    out.push(line);
  }
  return out;
}

/** Multi-line text. anchor: start|middle|end. vcenter: y is the block centre. */
export function text(x, y, str, o = {}) {
  const size = o.size ?? 20;
  const lh = o.lh ?? size * 1.28;
  const lines = o.maxWidth
    ? wrap(str, o.maxWidth, size)
    : String(str).split("\n");
  const y0 = o.vcenter ? y - ((lines.length - 1) * lh) / 2 + size * 0.35 : y;
  const tsp = lines
    .map(
      (l, i) =>
        `<tspan x="${x}" y="${(y0 + i * lh).toFixed(1)}">${esc(l)}</tspan>`,
    )
    .join("");
  return `<text font-family="${o.mono ? MONO : FONT}" font-size="${size}" font-weight="${o.weight ?? 400}" fill="${o.fill ?? C.text}" text-anchor="${o.anchor ?? "start"}"${o.ls ? ` letter-spacing="${o.ls}"` : ""}${o.italic ? ` font-style="italic"` : ""}>${tsp}</text>`;
}
export const linesOf = (str, maxWidth, size) =>
  wrap(str, maxWidth, size).length;

export function rect(x, y, w, h, o = {}) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r ?? 14}" fill="${o.fill ?? C.card}" stroke="${o.stroke ?? C.stroke}" stroke-width="${o.sw ?? 1.5}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.filter ? ` filter="url(#${o.filter})"` : ""}/>`;
}

/** Card with optional title + sub text, centred or left aligned. */
export function box(x, y, w, h, o = {}) {
  const accent = o.accent;
  let s = rect(x, y, w, h, {
    fill: o.fill ?? (accent ? "#1f2033" : C.card),
    stroke: o.stroke ?? (accent ? C.amber : C.stroke),
    sw: accent ? 2 : 1.5,
    dash: o.dash,
    r: o.r,
    filter: accent ? "glow" : undefined,
  });
  const pad = o.pad ?? 18;
  const ts = o.titleSize ?? 22;
  const ss = o.subSize ?? 16;
  const left = o.align === "left";
  const tx = left ? x + pad : x + w / 2;
  const anchor = left ? "start" : "middle";
  const titleLines = o.title ? linesOf(o.title, w - pad * 2, ts) : 0;
  const subLines = o.sub ? linesOf(o.sub, w - pad * 2, ss) : 0;
  const blockH =
    titleLines * ts * 1.25 +
    (subLines ? 8 + subLines * ss * 1.35 : 0) +
    (o.subKicker ? 26 : 0);
  let cy = o.top ? y + pad + ts * 0.85 : y + h / 2 - blockH / 2 + ts * 0.85;
  if (o.kicker) {
    s += text(tx, o.top ? cy - 2 : cy - 4, o.kicker, {
      size: 13,
      weight: 700,
      fill: C.amber,
      anchor,
      ls: 2,
    });
    cy += 24;
  }
  if (o.title) {
    s += text(tx, cy, o.title, {
      size: ts,
      weight: 600,
      maxWidth: w - pad * 2,
      anchor,
      fill: o.titleFill ?? C.text,
      lh: ts * 1.25,
    });
    cy += titleLines * ts * 1.25 + 8;
  }
  if (o.subKicker) {
    s += text(tx, cy + 4, o.subKicker, {
      size: 12,
      weight: 700,
      fill: C.amber,
      anchor,
      ls: 2,
    });
    cy += 26;
  }
  if (o.sub) {
    s += text(tx, cy - ss * 0.2, o.sub, {
      size: ss,
      maxWidth: w - pad * 2,
      anchor,
      fill: C.muted,
      lh: ss * 1.35,
      mono: o.subMono,
    });
  }
  return s;
}

export function arrow(x1, y1, x2, y2, o = {}) {
  const col = o.color ?? C.amberSoft;
  const marker =
    col === C.amberSoft
      ? "ah"
      : col === C.red
        ? "ahRed"
        : col === C.green
          ? "ahGreen"
          : "ahMuted";
  let s = `<path d="M${x1},${y1} L${x2},${y2}" stroke="${col}" stroke-width="${o.sw ?? 2.5}" fill="none"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""} marker-end="url(#${marker})"${o.both ? ` marker-start="url(#${marker}S)"` : ""}/>`;
  if (o.label) {
    const mx = (x1 + x2) / 2 + (o.lx ?? 0);
    const my = (y1 + y2) / 2 + (o.ly ?? -10);
    s += text(mx, my, o.label, {
      size: o.lsize ?? 15,
      fill: o.lfill ?? C.muted,
      anchor: "middle",
      weight: 500,
    });
  }
  return s;
}

/** Orthogonal path arrow through points. */
export function path(points, o = {}) {
  const col = o.color ?? C.amberSoft;
  const marker =
    col === C.amberSoft
      ? "ah"
      : col === C.red
        ? "ahRed"
        : col === C.green
          ? "ahGreen"
          : "ahMuted";
  const d = points.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  return `<path d="${d}" stroke="${col}" stroke-width="${o.sw ?? 2.5}" fill="none" stroke-linejoin="round"${o.dash ? ` stroke-dasharray="${o.dash}"` : ""}${o.noHead ? "" : ` marker-end="url(#${marker})"`}/>`;
}

export function pill(x, y, label, o = {}) {
  const size = o.size ?? 14;
  const w = o.w ?? label.length * size * 0.62 + 30;
  const h = size + 16;
  const fill = o.fill ?? C.amberDim;
  const col = o.color ?? C.amber;
  const bx = o.anchor === "middle" ? x - w / 2 : x;
  return (
    `<rect x="${bx}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${col}" stroke-opacity="0.5"/>` +
    text(bx + w / 2, y + h / 2 + size * 0.36, label, {
      size,
      weight: 700,
      fill: col,
      anchor: "middle",
      ls: o.ls ?? 0.5,
    })
  );
}

export function numCircle(cx, cy, n, o = {}) {
  const r = o.r ?? 24;
  return (
    `<circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="${C.amber}" opacity="0.15"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.fill ?? C.bg2}" stroke="${C.amber}" stroke-width="2.5"/>` +
    text(cx, cy + r * 0.36, String(n).padStart(2, "0"), {
      size: r * 0.82,
      weight: 700,
      anchor: "middle",
    })
  );
}

const defs = `
<defs>
  <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${C.bg2}"/><stop offset="1" stop-color="${C.bg1}"/>
  </linearGradient>
  <radialGradient id="glowBg" cx="0.78" cy="0.2" r="0.6">
    <stop offset="0" stop-color="${C.amber}" stop-opacity="0.13"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/>
  </radialGradient>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
    <path d="M48 0 L0 0 0 48" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
  </pattern>
  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="${C.amber}" flood-opacity="0.28"/>
  </filter>
  ${[
    ["ah", C.amberSoft],
    ["ahMuted", C.muted],
    ["ahRed", C.red],
    ["ahGreen", C.green],
  ]
    .map(
      ([id, col]) =>
        `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${col}"/></marker>` +
        `<marker id="${id}S" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${col}"/></marker>`,
    )
    .join("")}
</defs>`;

/** Full canvas with brand background, kicker, title and footer mark. */
export function frame({
  w = 1600,
  h = 900,
  kicker,
  title,
  subtitle,
  body,
  titleSize,
}) {
  const ts = titleSize ?? (w < 1400 ? 40 : 44);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
${defs}
<rect width="${w}" height="${h}" fill="url(#bgGrad)"/>
<rect width="${w}" height="${h}" fill="url(#grid)"/>
<rect width="${w}" height="${h}" fill="url(#glowBg)"/>
<rect x="0" y="0" width="${w}" height="6" fill="${C.amber}"/>
${kicker ? text(80, 72, kicker.toUpperCase(), { size: 15, weight: 700, fill: C.amber, ls: 3 }) : ""}
${title ? text(80, 122, title, { size: ts, weight: 700 }) : ""}
${subtitle ? text(80, 160, subtitle, { size: 19, fill: C.muted }) : ""}
${body}
<g opacity="0.75">
  <rect x="${w - 232}" y="${h - 50}" width="10" height="10" rx="2" fill="${C.amber}"/>
  ${text(w - 214, h - 40, "ClickMasters", { size: 15, weight: 700, fill: C.text })}
  ${text(w - 115, h - 40, "Blockchain", { size: 15, fill: C.muted })}
</g>
</svg>`;
}

/** Horizontal numbered timeline. steps: [{title, sub}] */
export function timeline(
  steps,
  {
    x0 = 80,
    x1 = 1520,
    y = 330,
    cardH = 300,
    alternate = false,
    top = true,
  } = {},
) {
  const n = steps.length;
  const gap = alternate ? (x1 - x0) / (n + 1) : (x1 - x0) / n;
  const cxOf = (i) => (alternate ? x0 + gap * (i + 1) : x0 + gap * i + gap / 2);
  let s = `<line x1="${cxOf(0)}" y1="${y}" x2="${cxOf(n - 1)}" y2="${y}" stroke="${C.amber}" stroke-opacity="0.55" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>`;
  steps.forEach((st, i) => {
    const cx = cxOf(i);
    const cw = alternate ? gap * 2 - 24 : gap - 16;
    const up = alternate && i % 2 === 1;
    const ch = alternate ? 165 : cardH;
    const cy = up ? y - 48 - ch : y + 48;
    const bx = cx - cw / 2;
    s += `<line x1="${cx}" y1="${up ? y - 26 : y + 26}" x2="${cx}" y2="${up ? cy + ch : cy}" stroke="${C.stroke}" stroke-width="2"/>`;
    s += box(bx, cy, cw, ch, {
      title: st.title,
      sub: st.sub,
      kicker: st.kicker,
      subKicker: st.subKicker,
      top,
      titleSize: st.titleSize ?? (alternate ? 19 : n > 6 ? 19 : 21),
      subSize: alternate ? 15 : n > 6 ? 14.5 : 16,
      pad: 16,
      accent: st.accent,
    });
    s += numCircle(cx, y, i + 1, { r: n > 7 ? 21 : 24 });
  });
  return s;
}

/** Vertical stack of layers with arrows between. layers: [{title, sub, accent}] */
export function stack(
  layers,
  {
    x = 80,
    y = 200,
    w = 900,
    h = 100,
    gap = 26,
    arrows = true,
    both = false,
  } = {},
) {
  let s = "";
  layers.forEach((l, i) => {
    const ly = y + i * (h + gap);
    s += box(x, ly, w, h, {
      title: l.title,
      sub: l.sub,
      accent: l.accent,
      align: "left",
      pad: 28,
      titleSize: l.titleSize ?? 22,
      kicker: l.kicker,
    });
    if (l.tag)
      s += pill(
        x + w - 28 - (l.tag.length * 13 * 0.62 + 30),
        ly + h / 2 - 14.5,
        l.tag,
        { size: 13 },
      );
    if (arrows && i < layers.length - 1)
      s += arrow(x + w / 2, ly + h + 3, x + w / 2, ly + h + gap - 3, {
        both,
        sw: 2.5,
      });
  });
  return s;
}

/** Sequence diagram. parts: [{id,label,sub}] msgs: [{from,to,label,dash,color,note}] */
export function sequence(
  parts,
  msgs,
  { x0 = 215, x1 = 1385, y = 200, rowH = 64, headH = 76 } = {},
) {
  const n = parts.length;
  const gap = (x1 - x0) / (n - 1);
  const xOf = (id) => x0 + parts.findIndex((p) => p.id === id) * gap;
  const yEnd = y + headH + 30 + msgs.length * rowH;
  let s = "";
  parts.forEach((p, i) => {
    const cx = x0 + i * gap;
    s += `<line x1="${cx}" y1="${y + headH}" x2="${cx}" y2="${yEnd}" stroke="${C.stroke}" stroke-width="2" stroke-dasharray="6 6"/>`;
    s += box(cx - 125, y, 250, headH, {
      title: p.label,
      sub: p.sub,
      titleSize: 19,
      subSize: 14,
      accent: p.accent,
      pad: 12,
    });
  });
  msgs.forEach((m, i) => {
    const my = y + headH + 50 + i * rowH;
    if (m.self) {
      const cx = xOf(m.from);
      s += `<rect x="${cx - 6}" y="${my - 20}" width="12" height="34" rx="3" fill="${C.amber}" opacity="0.8"/>`;
      const last = parts.findIndex((p) => p.id === m.from) === n - 1;
      s += text(last ? cx - 22 : cx + 22, my + 4, m.label, {
        size: 16,
        fill: m.color ?? C.text,
        weight: 500,
        anchor: last ? "end" : "start",
      });
      return;
    }
    const a = xOf(m.from),
      b = xOf(m.to);
    const dir = b > a ? 1 : -1;
    s += arrow(a + dir * 8, my, b - dir * 8, my, {
      dash: m.dash,
      color: m.color,
    });
    s += text((a + b) / 2, my - 12, m.label, {
      size: 16,
      anchor: "middle",
      fill: m.lcolor ?? C.text,
      weight: 500,
    });
  });
  return s;
}

/** Decision chain: questions left→right with "Yes" continuing and "No" dropping to outcome cards. */
export function decisionChain(
  steps,
  final,
  {
    x0 = 80,
    x1 = 1520,
    y = 230,
    qh = 150,
    oy = 560,
    oh = 170,
    yes = "Yes",
    no = "No",
  } = {},
) {
  const n = steps.length + 1;
  const gap = 40;
  const w = (x1 - x0 - gap * (n - 1)) / n;
  let s = "";
  steps.forEach((st, i) => {
    const bx = x0 + i * (w + gap);
    s += box(bx, y, w, qh, {
      title: st.q,
      titleSize: 19,
      kicker: `CHECK ${i + 1}`,
      pad: 16,
    });
    s += arrow(bx + w + 2, y + qh / 2, bx + w + gap - 2, y + qh / 2, {
      color: C.green,
      label: st.yes ?? yes,
      lfill: C.green,
      ly: -12,
      lsize: 14,
    });
    s += arrow(bx + w / 2, y + qh + 2, bx + w / 2, oy - 4, {
      color: C.red,
      label: st.no ?? no,
      lfill: C.red,
      lx: 24,
      ly: 4,
      lsize: 14,
    });
    s += box(bx, oy, w, oh, {
      title: st.out,
      sub: st.outSub,
      titleSize: 18,
      subSize: 14.5,
      stroke: "rgba(248,113,113,0.55)",
      fill: "#1d1a2a",
      top: true,
      pad: 16,
    });
  });
  const fx = x0 + steps.length * (w + gap);
  s += box(fx, y, w, oy + oh - y, {
    title: final.title,
    sub: final.sub,
    accent: true,
    titleSize: 22,
    subSize: 15.5,
    kicker: final.kicker ?? "RESULT",
  });
  return s;
}
