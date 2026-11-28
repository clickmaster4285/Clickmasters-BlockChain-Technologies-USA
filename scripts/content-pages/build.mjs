// Converts the approved page copy in /content into structured page data.
// Usage: node scripts/content-pages/build.mjs
// Output: data/content-pages/<key>.json (consumed by components/content-page)
//
// Editorial material is stripped: HTML comments, editor/file-note blockquotes,
// [CONFIRM …], [VERIFY …], [PLACEHOLDER …] and [EDITOR NOTE …] notes, and
// "→ link:" developer instructions.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PAGES } from "./pages.mjs";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const outDir = path.join(root, "data", "content-pages");
fs.mkdirSync(outDir, { recursive: true });

/* ------------------------------------------------------------------ */
/* 1. Clean the raw markdown                                           */
/* ------------------------------------------------------------------ */

const NOTE_START = /\[(CONFIRM|VERIFY|PLACEHOLDER|EDITOR NOTE)/;

/** Removes bracketed editorial notes, including multi-line ones. */
function stripNotes(src) {
  let out = "";
  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    const m = rest.match(NOTE_START);
    if (!m) {
      out += rest;
      break;
    }
    const start = i + m.index;
    out += src.slice(i, start);
    let depth = 0;
    let j = start;
    for (; j < src.length; j++) {
      if (src[j] === "[") depth++;
      else if (src[j] === "]") {
        depth--;
        if (depth === 0) break;
      }
    }
    i = j + 1;
    // swallow wrapping bold markers and trailing colon text like "]:"
    if (out.endsWith("**") && src.slice(i, i + 2) === "**") {
      out = out.slice(0, -2);
      i += 2;
    }
    out += "\u0000"; // marker: a note was removed here
  }
  return out;
}

function clean(raw, page) {
  let s = raw.replace(/\r\n/g, "\n").replace(/<!--[\s\S]*?-->/g, "");
  const lines0 = s.split("\n");
  const h1 = lines0.findIndex(
    (l) => l.startsWith("# ") && l.slice(2).trim().startsWith(page.h1),
  );
  if (h1 < 0) throw new Error(`${page.key}: H1 "${page.h1}" not found`);
  s = lines0.slice(h1).join("\n");

  // Drop editorial blockquotes as whole blocks (before stripping notes).
  s = s
    .split(/\n(?=\n)/)
    .map((chunk) => chunk)
    .join("\n");
  const lines = s.split("\n");
  const kept = [];
  for (let k = 0; k < lines.length; k++) {
    const l = lines[k];
    if (
      /^>\s*(\*\*)?\s*(Editor|\[EDITOR|\[CONFIRM|\[VERIFY|FILE NOTES|Editorial)/i.test(
        l,
      )
    ) {
      while (k + 1 < lines.length && lines[k + 1].startsWith(">")) k++;
      continue;
    }
    kept.push(l);
  }
  s = stripNotes(kept.join("\n"));

  let pendingId = null;
  const out = [];
  for (let line of s.split("\n")) {
    const hadNote = line.includes("\u0000");
    line = line
      .replace(/\u0000/g, "")
      .replace(/[ \t]+$/, "")
      .replace(/\s+([.,;])$/, "$1");
    if (/^→\s*link/i.test(line)) continue;
    const aid = line.match(/^<a id="([^"]+)"><\/a>$/);
    if (aid) {
      pendingId = aid[1];
      continue;
    }
    if (hadNote && /^\s*[-*]\s+\*\*[^*]+\*\*\s*$/.test(line)) continue; // bullet emptied by a note
    if (hadNote && /^\s*>?\s*$/.test(line)) continue;
    if (/^#{1,6}\s/.test(line) && pendingId) {
      if (!/\{#/.test(line)) line += ` {#${pendingId}}`;
      pendingId = null;
    }
    line = line.replace(/\s*\*\(on-page block\)\*/g, "");
    // CTA: **[Label]** → `url`
    line = line.replace(
      /\*\*\[([^\]]+)\]\*\*\s*→\s*`([^`]+)`/g,
      "**[$1]($2)**",
    );
    // Bare CTA: **[Label]** with no link target
    line = line.replace(/\*\*\[([^\]]+)\](?!\()\*\*/g, (_, label) => {
      const email = label.match(/[\w.+-]+@[\w.-]+/);
      return `**[${label}](${email ? `mailto:${email[0]}` : "/contact"})**`;
    });
    // "- Label → /path" link lists
    line = line.replace(
      /^(\s*[-*]\s+)([^[\]→]+?)\s*→\s*(\/[\w/-]+)\s*$/,
      "$1[$2]($3)",
    );
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n");
}

/* ------------------------------------------------------------------ */
/* 2. Inline parser                                                    */
/* ------------------------------------------------------------------ */

const INLINE = [
  { t: "code", re: /`([^`]+)`/ },
  { t: "a", re: /\[([^\]]+)\]\(([^)\s]+)\)/ },
  { t: "b", re: /\*\*(.+?)\*\*/ },
  { t: "i", re: /(?<![*\w])\*(?!\s)(.+?)(?<!\s)\*(?![*\w])/ },
  { t: "i", re: /(?<![\w])_(?!\s)(.+?)(?<!\s)_(?![\w])/ },
];

function inline(str) {
  const nodes = [];
  let s = str;
  while (s.length) {
    let best = null;
    for (const p of INLINE) {
      const m = s.match(p.re);
      if (m && (best === null || m.index < best.m.index)) best = { p, m };
    }
    if (!best) {
      nodes.push({ t: "text", v: s });
      break;
    }
    const { p, m } = best;
    if (m.index > 0) nodes.push({ t: "text", v: s.slice(0, m.index) });
    if (p.t === "code") nodes.push({ t: "code", v: m[1] });
    else if (p.t === "a") nodes.push({ t: "a", href: m[2], c: inline(m[1]) });
    else nodes.push({ t: p.t, c: inline(m[1]) });
    s = s.slice(m.index + m[0].length);
  }
  return nodes;
}

const plain = (nodes) =>
  nodes
    .map((n) => (n.t === "text" || n.t === "code" ? n.v : plain(n.c)))
    .join("");

/* ------------------------------------------------------------------ */
/* 3. Block parser                                                     */
/* ------------------------------------------------------------------ */

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

const isList = (l) => /^\s*([-*]|\d+\.)\s+/.test(l);
const isTableSep = (l) => /^\s*\|?\s*:?-{2,}/.test(l);
const splitRow = (l) =>
  l
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((c) => c.trim());

function parseList(lines) {
  // lines: raw list lines (with indentation). Builds nested lists.
  const parse = (items, baseIndent) => {
    const list = { t: /^\s*\d+\./.test(items[0]) ? "ol" : "ul", items: [] };
    let k = 0;
    while (k < items.length) {
      const l = items[k];
      const indent = l.match(/^\s*/)[0].length;
      const text = l.replace(/^\s*([-*]|\d+\.)\s+/, "");
      const children = [];
      k++;
      while (k < items.length && items[k].match(/^\s*/)[0].length > indent)
        children.push(items[k++]);
      const item = { c: inline(text) };
      if (children.length) item.children = parse(children, indent + 2);
      list.items.push(item);
    }
    return list;
  };
  // merge continuation lines (non-list, indented) into previous item
  const merged = [];
  for (const l of lines) {
    if (isList(l) || !merged.length) merged.push(l);
    else merged[merged.length - 1] += " " + l.trim();
  }
  return parse(merged, 0);
}

function parseBlocks(md) {
  const lines = md.split("\n");
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^-{3,}\s*$/.test(l) || /^\*{3,}\s*$/.test(l)) {
      i++;
      continue;
    }
    const h = l.match(/^(#{1,6})\s+(.*?)(?:\s*\{#([\w-]+)\})?\s*$/);
    if (h) {
      const c = inline(h[2]);
      blocks.push({
        t: "h",
        level: h[1].length,
        c,
        id: h[3] ?? slugify(plain(c)),
      });
      i++;
      continue;
    }
    if (l.startsWith("```")) {
      const lang = l.slice(3).trim();
      const body = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```"))
        body.push(lines[i++]);
      i++;
      blocks.push({ t: "code", lang, v: body.join("\n") });
      continue;
    }
    if (
      l.trim().startsWith("|") &&
      i + 1 < lines.length &&
      isTableSep(lines[i + 1])
    ) {
      const head = splitRow(l).map(inline);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|"))
        rows.push(splitRow(lines[i++]).map(inline));
      blocks.push({ t: "table", head, rows });
      continue;
    }
    if (l.startsWith(">")) {
      const body = [];
      while (i < lines.length && lines[i].startsWith(">"))
        body.push(lines[i++].replace(/^>\s?/, ""));
      const inner = parseBlocks(body.join("\n"));
      if (inner.length) blocks.push({ t: "quote", blocks: inner });
      continue;
    }
    if (isList(l)) {
      const body = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        (isList(lines[i]) || /^\s+\S/.test(lines[i]))
      )
        body.push(lines[i++]);
      blocks.push(parseList(body));
      continue;
    }
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !lines[i].startsWith("```") &&
      !isList(lines[i]) &&
      !/^-{3,}\s*$/.test(lines[i])
    )
      para.push(lines[i++].trim());
    if (!para.length) {
      i++;
      continue;
    }
    blocks.push(toParagraph(para.join(" ")));
  }
  return blocks;
}

/** Paragraphs that open with link buttons become CTA blocks. */
function toParagraph(text) {
  const c = inline(text);
  const links = [];
  let k = 0;
  for (; k < c.length; k++) {
    const n = c[k];
    const link =
      n.t === "a"
        ? n
        : n.t === "b" && n.c.length === 1 && n.c[0].t === "a"
          ? n.c[0]
          : null;
    if (link) links.push({ label: plain(link.c), href: link.href });
    else if (n.t === "text" && /^[\s·|]*$/.test(n.v)) continue;
    else break;
  }
  const startsWithBoldLink =
    c[0] && c[0].t === "b" && c[0].c.length === 1 && c[0].c[0].t === "a";
  if (links.length && startsWithBoldLink) {
    const rest = c.slice(k);
    if (rest[0]?.t === "text")
      rest[0] = { t: "text", v: rest[0].v.replace(/^[\s·|]+/, "") };
    return {
      t: "cta",
      links,
      rest: rest.filter((n) => n.t !== "text" || n.v.trim()),
    };
  }
  return { t: "p", c };
}

/* ------------------------------------------------------------------ */
/* 4. Assemble the page                                                */
/* ------------------------------------------------------------------ */

function build(page) {
  const raw = fs.readFileSync(path.join(root, "content", page.source), "utf8");
  const blocks = parseBlocks(clean(raw, page));
  const h1 = blocks.shift();
  const firstH2 = blocks.findIndex((b) => b.t === "h" && b.level === 2);
  const heroBlocks = blocks.slice(0, firstH2);
  const body = blocks.slice(firstH2);

  const sections = [];
  for (const b of body) {
    if (b.t === "h" && b.level === 2)
      sections.push({ id: b.id, title: b.c, blocks: [] });
    else sections.at(-1).blocks.push(b);
  }

  // Images: insert after the first paragraph that follows the matching heading.
  const img = (f) => ({
    t: "img",
    src: `/images/${page.imageDir}/${f.file}`,
    alt: f.alt,
    w: 1600,
    h: 900,
  });
  for (const f of page.images) {
    let placed = false;
    for (const sec of sections) {
      const matchSection = plain(sec.title)
        .toLowerCase()
        .startsWith(f.heading.toLowerCase());
      let idx = -1;
      if (matchSection) idx = 0;
      else {
        const hi = sec.blocks.findIndex(
          (b) =>
            b.t === "h" &&
            plain(b.c).toLowerCase().startsWith(f.heading.toLowerCase()),
        );
        if (hi >= 0) idx = hi + 1;
      }
      if (idx < 0) continue;
      if (sec.blocks[idx]?.t === "p") idx++;
      sec.blocks.splice(idx, 0, img(f));
      placed = true;
      break;
    }
    if (!placed)
      throw new Error(`${page.key}: no heading matches "${f.heading}"`);
  }

  // FAQ
  const faqSec = sections.find((s) =>
    /frequently asked|^faq/i.test(plain(s.title)),
  );
  const faq = [];
  if (faqSec) {
    for (const b of faqSec.blocks) {
      if (b.t === "h" && b.level === 3) faq.push({ q: plain(b.c), a: [] });
      else if (faq.length) faq.at(-1).a.push(b);
    }
    faqSec.kind = "faq";
  }
  for (const s of sections) {
    if (s.kind) continue;
    if (/^related/i.test(plain(s.title))) s.kind = "related";
  }
  // Closing CTA: the last non-related section after the FAQ that contains a CTA.
  const faqIdx = sections.indexOf(faqSec);
  for (let k = sections.length - 1; k > faqIdx; k--) {
    const s = sections[k];
    if (!s.kind && s.blocks.some((b) => b.t === "cta")) {
      s.kind = "cta";
      // "Related …" H3 blocks trailing the CTA become their own section.
      const ri = s.blocks.findIndex(
        (b) => b.t === "h" && /^related/i.test(plain(b.c)),
      );
      if (ri >= 0) {
        sections.splice(k + 1, 0, {
          id: "related",
          title: [{ t: "text", v: "Related services and guides" }],
          blocks: s.blocks.splice(ri),
          kind: "related",
        });
      }
      break;
    }
  }

  // Short plain-text answers for FAQPage schema.
  const textOf = (bs) =>
    bs
      .map((b) =>
        b.t === "p"
          ? plain(b.c)
          : b.t === "ul" || b.t === "ol"
            ? b.items.map((it) => plain(it.c)).join(" ")
            : "",
      )
      .filter(Boolean)
      .join(" ");

  return {
    key: page.key,
    path: page.path,
    breadcrumb: page.breadcrumb,
    kicker: page.kicker,
    navLabel: page.navLabel,
    meta: page.meta,
    title: h1.c,
    titleText: plain(h1.c),
    hero: { blocks: heroBlocks, image: img(page.hero) },
    ogImage: page.og
      ? { src: `/images/${page.imageDir}/${page.og}`, w: 1200, h: 630 }
      : undefined,
    sections,
    faq: faq.map((f) => ({ q: f.q, a: f.a, text: textOf(f.a) })),
  };
}

let ok = true;
for (const page of PAGES) {
  try {
    const data = build(page);
    fs.writeFileSync(
      path.join(outDir, `${page.key}.json`),
      JSON.stringify(data),
    );
    const leftover = JSON.stringify(data).match(
      /\[(CONFIRM|VERIFY|PLACEHOLDER|EDITOR)|→ link|Editor:/g,
    );
    console.log(
      `${page.key}: ${data.sections.length} sections, ${data.faq.length} FAQs${leftover ? `  ⚠ leftover: ${leftover.join(", ")}` : ""}`,
    );
  } catch (e) {
    ok = false;
    console.error(e.message);
  }
}
if (!ok) process.exit(1);
