"use client";

import { useEffect, useState } from "react";
import { Hexagon, Menu, X } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

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
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between gap-6 rounded-full border border-border bg-bg-base/85 px-3 py-2 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-soft" : ""
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-amber-glow text-amber-base">
            <Hexagon className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="font-display text-sm font-bold tracking-tight text-text-primary">
            CLICK<span className="text-amber-base">MASTERS</span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-silver-mid transition-colors hover:text-silver-light">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-amber-base px-4 py-2 text-sm font-semibold text-bg-base transition-transform hover:-translate-y-0.5"
          >
            Book a Call
          </a>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="absolute left-4 right-4 top-20 rounded-2xl border border-border bg-surface p-4 shadow-soft md:hidden">
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-amber-base px-4 py-2 text-center text-sm font-semibold text-bg-base"
              >
                Book a Call
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
