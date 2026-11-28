"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string };

export default function TableOfContents({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700">
        On this page
      </p>
      <ol className="mt-4 max-h-[calc(100vh-15rem)] space-y-0.5 overflow-y-auto pr-1">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] leading-5 transition-colors ${
                  isActive
                    ? "bg-amber-base/10 font-semibold text-amber-800"
                    : "text-text-secondary hover:bg-slate-50 hover:text-text-primary"
                }`}
              >
                <span
                  className={`font-mono text-[11px] leading-5 ${isActive ? "text-amber-600" : "text-silver-mid"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
