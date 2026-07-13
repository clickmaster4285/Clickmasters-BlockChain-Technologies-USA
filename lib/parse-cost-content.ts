
export interface ParsedTable {
  headers: string[];
  rows: string[][];
}
 
export interface ParsedLabelBlock {
  label: string;
  description: string;
}
 
export interface ParsedContent {
  h1: string | null;
  h2: string | null;
  intro: string;
  table: ParsedTable | null;
  labelBlocks: ParsedLabelBlock[];
  /** bullets that didn't pair with a label (plain list items) */
  plainBullets: string[];
}
 
function stripTrailingDivider(raw: string): string {
  return raw.replace(/\n?-{3,}\s*$/, "").trim();
}
 
function extractHeading(raw: string, level: "H1" | "H2"): string | null {
  const re = new RegExp(`#{2,3}\\s*${level}:\\s*(.+)`);
  const m = raw.match(re);
  return m ? m[1].trim() : null;
}
 
function extractTable(raw: string): { table: ParsedTable | null; without: string } {
  const lines = raw.split("\n");
  const tableLines: number[] = [];
  lines.forEach((line, i) => {
    if (/^\s*\|.*\|\s*$/.test(line)) tableLines.push(i);
  });
  if (tableLines.length < 2) return { table: null, without: raw };
 
  // contiguous block
  let start = tableLines[0];
  let end = tableLines[0];
  for (const idx of tableLines) {
    if (idx === end || idx === end + 1) end = idx;
  }
  const block = lines.slice(start, end + 1).filter((l) => /^\s*\|.*\|\s*$/.test(l));
 
  const cellsOf = (line: string) =>
    line
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
 
  const headerRow = cellsOf(block[0]);
  const bodyRows = block
    .slice(1)
    .filter((l) => !/^[\s|:-]+$/.test(l)) // drop the |---|---| separator row
    .map(cellsOf);
 
  const remaining = [...lines.slice(0, start), ...lines.slice(end + 1)].join("\n");
  return { table: { headers: headerRow, rows: bodyRows }, without: remaining };
}
 
/** Matches the doc's `**Label text*` bold-open/single-asterisk-close pattern */
const LABEL_RE = /\*\*([^*][^*]*?)\*(?!\*)/g;
 
function extractLabels(raw: string): { labels: string[]; without: string } {
  const labels: string[] = [];
  let m: RegExpExecArray | null;
  LABEL_RE.lastIndex = 0;
  while ((m = LABEL_RE.exec(raw)) !== null) {
    const text = m[1].trim();
    // Skip the H1/H2 heading markers and button markers, those are handled separately
    if (/^H[12]:/.test(text) || /^\[BUTTON/.test(text)) continue;
    labels.push(text.replace(/:$/, ""));
  }
  const without = raw.replace(LABEL_RE, "");
  return { labels, without };
}
 
/**
 * The intro is only the prose that appears BEFORE the first bold label or
 * table row — anything after that point belongs to a label/table cell, not
 * a free-floating intro paragraph. (The label's own trailing text in the
 * source, e.g. "**Label*Appropriate for: ..." glued with no space, is
 * intentionally discarded here — the real per-label copy comes from the
 * section's `bullets[]`, paired in by the caller.)
 */
function extractIntro(headingStrippedContent: string): string {
  const labelIdx = headingStrippedContent.search(/\*\*[^*]/);
  const tableIdx = headingStrippedContent.search(/^\s*\|.*\|\s*$/m);
  const candidates = [labelIdx, tableIdx].filter((i) => i >= 0);
  const cutoff = candidates.length ? Math.min(...candidates) : headingStrippedContent.length;
  return headingStrippedContent
    .slice(0, cutoff)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .join(" ")
    .trim();
}
 
export function parseCostContent(content: string, bullets: string[] = []): ParsedContent {
  const cleaned = stripTrailingDivider(content);
 
  const h1 = extractHeading(cleaned, "H1");
  const h2 = extractHeading(cleaned, "H2");
 
  const { table } = extractTable(cleaned);
  const { labels } = extractLabels(cleaned);
 
  const headingStripped = cleaned.replace(/#{1,3}\s*H[12]:.*/g, "").trim();
  const intro = extractIntro(headingStripped);
 
  // Pair labels with bullets when counts roughly line up (most sections),
  // otherwise treat bullets as a plain list and skip pairing.
  const labelBlocks: ParsedLabelBlock[] = [];
  const plainBullets: string[] = [];
  const usableBullets = bullets;
 
  if (labels.length > 0 && usableBullets.length >= labels.length) {
    const offset = usableBullets.length - labels.length;
    for (let i = 0; i < labels.length; i++) {
      labelBlocks.push({ label: labels[i], description: usableBullets[offset + i] });
    }
    for (let i = 0; i < offset; i++) plainBullets.push(usableBullets[i]);
  } else if (labels.length > 0) {
    labels.forEach((label, i) => {
      labelBlocks.push({ label, description: usableBullets[i] ?? "" });
    });
  } else {
    plainBullets.push(...usableBullets);
  }
 
  return { h1, h2, intro, table, labelBlocks, plainBullets };
}
 
export function cleanInlineMarks(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*(?!\w)/g, "")
    .trim();
}
 