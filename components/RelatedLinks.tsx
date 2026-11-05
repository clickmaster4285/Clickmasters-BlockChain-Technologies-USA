import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  getRelatedLinks,
  getTypeLabel,
  type ContentType,
  type LinkEntry,
} from "@/lib/related-links";

type RelatedLinksProps = {
  type: ContentType;
  slug: string;
  className?: string;
};

function LinkList({ items }: { items: LinkEntry[] }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            title={item.title}
            className="group flex h-full items-start justify-between gap-3 rounded-xl border border-border bg-background/40 p-4 transition-colors hover:border-amber-base/50"
          >
            <span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-amber-base">
                {getTypeLabel(item.type)}
              </span>
              <span className="mt-1 block text-sm font-semibold leading-snug text-foreground group-hover:text-amber-base">
                {item.label}
              </span>
            </span>
            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-silver-base group-hover:text-amber-base"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Contextual cross-links: "Related services" + "Related guides", and on core
 * service pages the specialised industry / location pages that sit under them.
 * Links are picked by topic (see lib/related-links.ts), never at random.
 */
export default function RelatedLinks({
  type,
  slug,
  className = "",
}: RelatedLinksProps) {
  const { services, guides, children, extra } = getRelatedLinks(type, slug);
  if (!services.length && !guides.length && !children.length && !extra.length)
    return null;

  return (
    <section
      aria-label="Related content"
      className={`site-container relative px-6 py-16 ${className}`}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {services.length > 0 && (
          <nav
            aria-labelledby={`related-services-${slug}`}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2
              id={`related-services-${slug}`}
              className="text-xl font-bold tracking-tight"
            >
              Related services
            </h2>
            <LinkList items={services} />
          </nav>
        )}

        {guides.length > 0 && (
          <nav
            aria-labelledby={`related-guides-${slug}`}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <h2
              id={`related-guides-${slug}`}
              className="text-xl font-bold tracking-tight"
            >
              Related guides
            </h2>
            <LinkList items={guides} />
          </nav>
        )}
      </div>

      {children.length > 0 && (
        <nav
          aria-labelledby={`specialised-${slug}`}
          className="mt-6 rounded-2xl border border-border bg-surface p-6"
        >
          <h2
            id={`specialised-${slug}`}
            className="text-xl font-bold tracking-tight"
          >
            Specialised solutions
          </h2>
          <p className="mt-2 text-sm text-silver-base">
            Industry, location, and use-case pages built on this service.
          </p>
          <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {children.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.title}
                  className="text-sm text-silver-base hover:text-amber-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {extra.length > 0 && (
        <nav
          aria-labelledby={`also-${slug}`}
          className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2"
        >
          <h2
            id={`also-${slug}`}
            className="font-mono text-[11px] uppercase tracking-widest text-silver-base"
          >
            Also on this topic
          </h2>
          {extra.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={item.title}
              className="text-sm text-foreground/80 underline-offset-4 hover:text-amber-base hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </section>
  );
}
