// components/cms/CmsRichText.tsx
// Renders CMS rich-text HTML as React elements through a tag allow-list (A6).
// Nothing is injected as raw HTML: text goes through React (escaped), only
// allow-listed tags are created, and the only attributes kept are a validated
// href on links and a validated src/alt on images. Unknown tags are unwrapped;
// script-like tags are dropped together with their content.

import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { isExternal, safeHref, safeImage } from "./cmsContent";

const TAG_CLASSES: Record<string, string> = {
  h1: "mt-10 mb-4 text-3xl font-bold tracking-tight text-text-primary md:text-4xl first:mt-0",
  h2: "mt-10 mb-4 text-2xl font-bold tracking-tight text-text-primary md:text-3xl first:mt-0",
  h3: "mt-8 mb-3 text-xl font-semibold text-text-primary md:text-2xl first:mt-0",
  h4: "mt-6 mb-2 text-lg font-semibold text-text-primary first:mt-0",
  h5: "mt-6 mb-2 text-base font-semibold text-text-primary first:mt-0",
  h6: "mt-6 mb-2 text-sm font-semibold uppercase tracking-wider text-text-secondary first:mt-0",
  p: "mt-4 text-base leading-relaxed text-text-secondary md:text-lg first:mt-0",
  ul: "mt-4 list-disc space-y-2 pl-6 text-base text-text-secondary marker:text-amber-base md:text-lg",
  ol: "mt-4 list-decimal space-y-2 pl-6 text-base text-text-secondary marker:text-amber-base md:text-lg",
  li: "pl-1 leading-relaxed",
  blockquote:
    "my-8 border-l-2 border-amber-base pl-6 text-lg italic text-text-primary md:text-xl",
  strong: "font-semibold text-text-primary",
  b: "font-semibold text-text-primary",
  em: "italic",
  i: "italic",
  u: "underline underline-offset-4",
  s: "line-through",
  small: "text-sm",
  sub: "",
  sup: "",
  code: "rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-sm text-text-primary",
  pre: "mt-4 overflow-x-auto rounded-xl border border-border bg-bg-elevated p-4 font-mono text-sm",
  hr: "my-10 border-border",
  br: "",
  a: "font-medium text-amber-base underline underline-offset-4 transition-colors hover:text-amber-dim",
  img: "my-6 h-auto max-w-full rounded-2xl border border-border",
  figure: "my-6",
  figcaption: "mt-2 text-center text-sm text-text-muted",
  table: "w-full border-collapse text-left text-sm",
  thead: "bg-bg-surface",
  tbody: "",
  tr: "border-b border-border",
  th: "px-4 py-3 font-semibold text-text-primary",
  td: "px-4 py-3 text-text-secondary",
};
const VOID_TAGS = new Set(["br", "hr", "img"]);
const BLOCK_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "blockquote",
  "pre",
  "hr",
  "div",
  "table",
  "figure",
  "section",
]);
const DROP_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "template",
  "noscript",
  "svg",
  "math",
  "textarea",
  "select",
  "button",
  "form",
  "input",
  "head",
  "title",
  "link",
  "meta",
  "base",
  "frame",
  "frameset",
  "applet",
]);

type Node = {
  tag: string;
  href?: string;
  src?: string;
  alt?: string;
  children: (Node | string)[];
};

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(text: string) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code =
        e[1] === "x" || e[1] === "X"
          ? parseInt(e.slice(2), 16)
          : parseInt(e.slice(1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function attr(attrs: string, name: string) {
  const m = new RegExp(
    `\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  ).exec(attrs);
  return decodeEntities((m?.[1] ?? m?.[2] ?? m?.[3] ?? "").trim());
}

function parse(html: string): Node {
  const root: Node = { tag: "", children: [] };
  const stack: { name: string; node: Node }[] = [{ name: "#root", node: root }];
  const top = () => stack[stack.length - 1].node;
  let dropping: { name: string; depth: number } | null = null;

  const token =
    /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|[^<]+|</g;
  for (const m of html.matchAll(token)) {
    const [raw, closing, rawName, attrs = ""] = m;
    if (raw.startsWith("<!--")) continue;

    if (!rawName) {
      if (!dropping) top().children.push(decodeEntities(raw));
      continue;
    }

    const name = rawName.toLowerCase();
    const selfClosing = /\/\s*$/.test(attrs);

    if (dropping) {
      if (name === dropping.name && !selfClosing)
        dropping.depth += closing ? -1 : 1;
      if (dropping.depth === 0) dropping = null;
      continue;
    }

    if (closing) {
      const idx = stack.map((s) => s.name).lastIndexOf(name);
      if (idx > 0) stack.length = idx;
      continue;
    }

    if (DROP_TAGS.has(name)) {
      if (
        !selfClosing &&
        !VOID_TAGS.has(name) &&
        name !== "input" &&
        name !== "link" &&
        name !== "meta" &&
        name !== "base"
      ) {
        dropping = { name, depth: 1 };
      }
      continue;
    }

    // HTML's implied end tags keep the output valid for hydration.
    if (BLOCK_TAGS.has(name)) {
      const p = stack.map((s) => s.name).lastIndexOf("p");
      if (p > 0) stack.length = p;
    }
    if (name === "li" && stack[stack.length - 1].name === "li") stack.pop();

    const allowed = name in TAG_CLASSES;
    const node: Node = { tag: allowed ? name : "", children: [] };
    if (name === "a") node.href = safeHref(attr(attrs, "href"));
    if (name === "img") {
      node.src = safeImage(attr(attrs, "src"));
      node.alt = attr(attrs, "alt");
      if (!node.src) continue;
    }
    top().children.push(node);
    if (!VOID_TAGS.has(name) && !selfClosing) stack.push({ name, node });
  }
  return root;
}

function render(node: Node | string, key: number): ReactNode {
  if (typeof node === "string") return node;
  const className = TAG_CLASSES[node.tag] || undefined;

  switch (node.tag) {
    case "":
      return <Fragment key={key}>{node.children.map(render)}</Fragment>;
    case "br":
      return <br key={key} />;
    case "hr":
      return <hr key={key} className={className} />;
    case "img":
      return (
        <img
          key={key}
          src={node.src}
          alt={node.alt ?? ""}
          loading="lazy"
          decoding="async"
          className={className}
        />
      );
    case "a": {
      const children = node.children.map(render);
      if (!node.href) return <Fragment key={key}>{children}</Fragment>;
      return isExternal(node.href) ? (
        <a
          key={key}
          href={node.href}
          className={className}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : node.href.startsWith("/") ? (
        <Link key={key} href={node.href} className={className}>
          {children}
        </Link>
      ) : (
        <a key={key} href={node.href} className={className}>
          {children}
        </a>
      );
    }
    case "table": {
      // Browsers insert <tbody> around bare rows; do it here so hydration matches.
      const kids: (Node | string)[] = [];
      let rows: Node | null = null;
      for (const child of node.children) {
        if (typeof child !== "string" && child.tag === "tr") {
          if (!rows) kids.push((rows = { tag: "tbody", children: [] }));
          rows.children.push(child);
        } else if (typeof child !== "string") {
          rows = null;
          kids.push(child);
        }
      }
      return (
        <div
          key={key}
          className="mt-6 overflow-x-auto rounded-xl border border-border"
        >
          <table className={className}>{kids.map(render)}</table>
        </div>
      );
    }
    case "thead":
    case "tbody":
    case "tr": {
      // Only element children: whitespace text inside table parts breaks hydration.
      const Tag = node.tag as "tbody";
      return (
        <Tag key={key} className={className}>
          {node.children.filter((c) => typeof c !== "string").map(render)}
        </Tag>
      );
    }
    default: {
      const Tag = node.tag as "p";
      return (
        <Tag key={key} className={className}>
          {node.children.map(render)}
        </Tag>
      );
    }
  }
}

export default function CmsRichText({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  if (!html.trim()) return null;
  return <div className={className}>{parse(html).children.map(render)}</div>;
}
