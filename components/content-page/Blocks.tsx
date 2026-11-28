import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import type { Block, Inline, ListBlock } from "@/data/content-pages";

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

export function SmartLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Inlines({ nodes }: { nodes: Inline[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        switch (n.t) {
          case "text":
            return <span key={i}>{n.v}</span>;
          case "code":
            return (
              <code
                key={i}
                className="rounded-md border border-amber-base/15 bg-amber-base/[0.07] px-1.5 py-0.5 font-mono text-[0.86em] text-amber-800"
              >
                {n.v}
              </code>
            );
          case "b":
            return (
              <strong key={i} className="font-semibold text-text-primary">
                <Inlines nodes={n.c} />
              </strong>
            );
          case "i":
            return (
              <em key={i}>
                <Inlines nodes={n.c} />
              </em>
            );
          case "a":
            return (
              <SmartLink
                key={i}
                href={n.href}
                className="font-medium text-amber-700 underline decoration-amber-base/30 underline-offset-[3px] transition-colors hover:text-amber-900 hover:decoration-amber-base"
              >
                <Inlines nodes={n.c} />
              </SmartLink>
            );
        }
      })}
    </>
  );
}

function List({ list, nested = false }: { list: ListBlock; nested?: boolean }) {
  if (list.t === "ol") {
    return (
      <ol className={`${nested ? "mt-3" : "my-6"} space-y-3`}>
        {list.items.map((it, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-base/10 text-xs font-bold text-amber-700 ring-1 ring-amber-base/25">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 leading-7 text-text-secondary">
              <Inlines nodes={it.c} />
              {it.children && <List list={it.children} nested />}
            </div>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className={`${nested ? "mt-3" : "my-6"} space-y-2.5`}>
      {list.items.map((it, i) => (
        <li key={i} className="flex gap-3 leading-7 text-text-secondary">
          <span
            aria-hidden="true"
            className={`mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full ${nested ? "bg-silver-mid" : "bg-amber-base"}`}
          />
          <div className="min-w-0 flex-1">
            <Inlines nodes={it.c} />
            {it.children && <List list={it.children} nested />}
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CtaButtons({
  links,
  dark = false,
}: {
  links: { label: string; href: string }[];
  dark?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((l, i) =>
        i === 0 ? (
          <SmartLink
            key={l.href + l.label}
            href={l.href}
            className="group inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(217,119,6,0.7)] transition-all hover:-translate-y-0.5 hover:bg-amber-600"
          >
            {l.label.replace(/\s*→$/, "")}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </SmartLink>
        ) : (
          <SmartLink
            key={l.href + l.label}
            href={l.href}
            className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors ${
              dark
                ? "border-white/20 text-white hover:border-amber-light hover:text-amber-light"
                : "border-slate-300 text-text-primary hover:border-amber-base hover:text-amber-700"
            }`}
          >
            {l.label.replace(/\s*→$/, "")}
          </SmartLink>
        ),
      )}
    </div>
  );
}

export function Figure({
  block,
  priority = false,
}: {
  block: Extract<Block, { t: "img" }>;
  priority?: boolean;
}) {
  return (
    <figure className="group my-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#0a1020] shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)]">
      <Image
        src={block.src}
        alt={block.alt}
        width={block.w}
        height={block.h}
        unoptimized
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transition-none"
      />
    </figure>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h": {
            const Tag = (b.level <= 3 ? "h3" : "h4") as "h3" | "h4";
            return (
              <Tag
                key={i}
                id={b.id}
                className={`scroll-mt-28 font-bold tracking-tight text-text-primary ${
                  b.level <= 3
                    ? "mt-10 text-xl md:text-[1.35rem]"
                    : "mt-7 text-lg"
                }`}
              >
                <Inlines nodes={b.c} />
              </Tag>
            );
          }
          case "p":
            return (
              <p
                key={i}
                className="my-4 text-[1.02rem] leading-8 text-text-secondary"
              >
                <Inlines nodes={b.c} />
              </p>
            );
          case "ul":
          case "ol":
            return <List key={i} list={b} />;
          case "table":
            return (
              <div
                key={i}
                className="my-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      {b.head.map((h, j) => (
                        <th
                          key={j}
                          scope="col"
                          className="px-4 py-3.5 font-semibold"
                        >
                          <Inlines nodes={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr
                        key={j}
                        className="border-t border-slate-200 odd:bg-white even:bg-slate-50/70"
                      >
                        {r.map((c, k) =>
                          k === 0 ? (
                            <th
                              key={k}
                              scope="row"
                              className="px-4 py-3.5 align-top font-semibold text-text-primary"
                            >
                              <Inlines nodes={c} />
                            </th>
                          ) : (
                            <td
                              key={k}
                              className="px-4 py-3.5 align-top leading-6 text-text-secondary"
                            >
                              <Inlines nodes={c} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "code":
            return (
              <div
                key={i}
                className="my-8 overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1220]"
              >
                {b.lang && (
                  <div className="border-b border-white/10 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-amber-light">
                    {b.lang}
                  </div>
                )}
                <pre className="overflow-x-auto p-5 text-[13px] leading-6 text-slate-200">
                  <code>{b.v}</code>
                </pre>
              </div>
            );
          case "quote":
            return (
              <aside
                key={i}
                className="my-8 rounded-2xl border border-amber-base/25 bg-gradient-to-br from-amber-50 to-white p-6 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              >
                <Info
                  className="mb-3 h-5 w-5 text-amber-600"
                  aria-hidden="true"
                />
                <Blocks blocks={b.blocks} />
              </aside>
            );
          case "cta":
            return (
              <div
                key={i}
                className="my-8 flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <CtaButtons links={b.links} />
                {b.rest.length > 0 && (
                  <p className="text-sm text-text-secondary">
                    <Inlines nodes={b.rest} />
                  </p>
                )}
              </div>
            );
          case "img":
            return <Figure key={i} block={b} />;
        }
      })}
    </>
  );
}
