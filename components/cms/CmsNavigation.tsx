"use client";
// components/cms/CmsNavigation.tsx
// ERP navigation (data.navigation.header / footer) rendered inside the site's
// own Navbar and Footer. The root layout loads it once (cached 60s) and
// provides it here. While the ERP has no navigation items (or is down) these
// components render nothing, so the site looks exactly as before.
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { createContext, useContext, type ReactNode } from "react";

export type NavLink = { id: string; label: string; url: string; target: string; children: NavLink[] };
export type SiteNav = { header: NavLink[]; footer: NavLink[] };

const EMPTY: SiteNav = { header: [], footer: [] };
const NavContext = createContext<SiteNav>(EMPTY);

export function CmsNavigationProvider({ nav, children }: { nav: SiteNav | null; children: ReactNode }) {
  return <NavContext.Provider value={nav ?? EMPTY}>{children}</NavContext.Provider>;
}

function NavAnchor({ item, className, onClick }: { item: NavLink; className: string; onClick?: () => void }) {
  if (!item.url) return <span className={className}>{item.label}</span>;
  const external = /^https?:\/\//i.test(item.url) || item.target === "_blank";
  if (external) {
    return (
      <a href={item.url} className={className} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.url} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

/** Extra top-level items for the desktop navbar <ul>. */
export function CmsHeaderLinks() {
  const { header } = useContext(NavContext);
  return (
    <>
      {header.map((item) => (
        <li key={item.id} className="group relative">
          {item.children.length ? (
            <>
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-silver transition-colors hover:text-silver-light xl:text-base">
                {item.label}
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-5 w-64 -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                <div className="absolute -top-5 left-0 h-5 w-full" />
                <div className="rounded-2xl border border-border bg-bg-base/95 p-2 shadow-soft backdrop-blur-2xl">
                  {[item, ...item.children].filter((c) => c.url).map((child) => (
                    <NavAnchor
                      key={child.id}
                      item={child}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-text-primary hover:bg-amber-base/10 hover:text-amber-base"
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <NavAnchor
              item={item}
              className="text-sm font-medium text-silver transition-colors hover:text-silver-light xl:text-base"
            />
          )}
        </li>
      ))}
    </>
  );
}

/** Extra section for the mobile menu. */
export function CmsMobileLinks({ onNavigate }: { onNavigate: () => void }) {
  const { header } = useContext(NavContext);
  const flat = header.flatMap((item) => [item, ...item.children]).filter((i) => i.url);
  if (!flat.length) return null;
  return (
    <li className="pt-3">
      <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-base">More</p>
      <div className="grid gap-2">
        {flat.map((item) => (
          <NavAnchor
            key={item.id}
            item={item}
            onClick={onNavigate}
            className="block rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm font-semibold text-foreground hover:bg-muted"
          />
        ))}
      </div>
    </li>
  );
}

/** Extra footer column(s): top-level items with children become columns, the rest a "More" column. */
export function CmsFooterLinks() {
  const { footer } = useContext(NavContext);
  if (!footer.length) return null;
  const groups = footer.filter((i) => i.children.length);
  const loose = footer.filter((i) => !i.children.length);
  const columns = [...groups.map((g) => ({ title: g.label, links: g.children })), ...(loose.length ? [{ title: "More", links: loose }] : [])];
  return (
    <div className="mt-10 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {columns.map((col) => (
        <div key={col.title}>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{col.title}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {col.links.map((link) => (
              <li key={link.id}>
                <NavAnchor item={link} className="text-foreground/80 hover:text-primary" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
