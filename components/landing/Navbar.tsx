"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Boxes,
  ChevronDown,
  FileText,
  GitCompare,
  Hexagon,
  Library,
  ListChecks,
  Menu,
  Newspaper,
  Wrench,
  X,
} from "lucide-react";

const links = [
  { label: "Services", href: "/service" },
  { label: "Solution", href: "/solution" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const blogLinks = [
  {
    label: "Comparison",
    href: "/comparison",
    desc: "Compare platforms, tools, chains, and Web3 solutions.",
    icon: GitCompare,
  },
  {
    label: "How To",
    href: "/howto",
    desc: "Step-by-step blockchain guides and implementation tutorials.",
    icon: BookOpen,
  },
  {
    label: "Listicles",
    href: "/listicles",
    desc: "Curated lists, rankings, ideas, and expert recommendations.",
    icon: ListChecks,
  },
  {
    label: "News",
    href: "/news",
    desc: "Latest blockchain, crypto, Web3, and enterprise updates.",
    icon: Newspaper,
  },
];

const resourceLinks = [
  {
    label: "Glossary",
    href: "/glossary",
    desc: "Simple explanations of blockchain and Web3 terminology.",
    icon: Library,
  },
  {
    label: "Tools",
    href: "/tools",
    desc: "Calculators, checklists, audit tools, and useful resources.",
    icon: Wrench,
  },
  {
    label: "Templates",
    href: "/templates",
    desc: "Ready-to-use documents, specs, and planning templates.",
    icon: FileText,
  },
  {
    label: "Resources",
    href: "/resources",
    desc: "Guides, frameworks, insights, and expert learning material.",
    icon: Boxes,
  },
];

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: {
    label: string;
    href: string;
    desc: string;
    icon: React.ElementType;
  }[];
}) {
  return (
    <li className="group relative">
      <button className="inline-flex items-center gap-1.5 text-base font-medium text-silver transition-colors hover:text-silver-light">
        {label}
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
      </button>

      <div className="pointer-events-none absolute left-1/2 top-full z-50 mt-5 w-[520px] -translate-x-1/2 translate-y-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
        <div className="absolute -top-5 left-0 h-5 w-full" />

        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-bg-base/95 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/70 to-transparent" />
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-amber-base/10 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-2">
            {items.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/item rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/30 hover:bg-amber-glow"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-base/20 bg-amber-base/10 text-amber-base transition-transform duration-300 group-hover/item:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>

                    <span className="font-display text-base font-bold text-text-primary transition-colors group-hover/item:text-amber-base">
                      {item.label}
                    </span>
                  </div>

                  <p className="text-sm leading-6 text-silver">{item.desc}</p>
                </Link>
              );
            })}
          </div>

          
        </div>
      </div>
    </li>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center">
      <nav
        className={`site-container flex items-center justify-between gap-6 rounded-full border border-border bg-bg-base/5 px-3 py-3 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-soft" : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-glow text-amber-base">
            <Hexagon className="h-4 w-4" strokeWidth={2} />
          </span>

          <span className="font-display text-base font-bold tracking-tight text-text-primary">
            CLICK<span className="text-amber-base">MASTERS</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-base font-medium text-silver transition-colors hover:text-silver-light"
              >
                {l.label}
              </Link>
            </li>
          ))}

          <DesktopDropdown label="Blog" items={blogLinks} />
          <DesktopDropdown label="Resources" items={resourceLinks} />
        </ul>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber-base px-4 py-2.5 text-sm font-semibold text-bg-base transition-transform hover:-translate-y-0.5"
          >
            Book a Free Strategy Call
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-20 max-h-[75vh] overflow-y-auto rounded-2xl border border-border bg-surface p-4 shadow-soft md:hidden">
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {l.label}
                </Link>
              </li>
            ))}

            <li className="pt-3">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-base">
                Blog
              </p>

              <div className="grid gap-2">
                {blogLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 hover:bg-muted"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-base/10 text-amber-base">
                        <Icon className="h-4 w-4" />
                      </span>

                      <span>
                        <span className="block text-sm font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="block text-xs leading-5 text-silver">
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </li>

            <li className="pt-3">
              <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-base">
                Resources
              </p>

              <div className="grid gap-2">
                {resourceLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 hover:bg-muted"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-base/10 text-amber-base">
                        <Icon className="h-4 w-4" />
                      </span>

                      <span>
                        <span className="block text-sm font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="block text-xs leading-5 text-silver">
                          {item.desc}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </li>

            <li>
              <Link
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-full bg-amber-base px-4 py-2.5 text-center text-sm font-semibold text-bg-base"
              >
                Book a Free Strategy Call
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
