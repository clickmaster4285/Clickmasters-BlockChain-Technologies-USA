"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Layers3,
  Share2,
  Sparkles,
  Target,
} from "lucide-react";

type SidebarItem = {
  label: string;
  value: string;
  icon: React.ElementType;
};

type NavigationItem = {
  id: string;
  label: string;
};

type CaseStudySidebarProps = {
  client?: string;
  industry?: string;
  service?: string;
  duration?: string;
  year?: string;
  projectUrl?: string;
  navigation?: NavigationItem[];
};

const defaultNavigation: NavigationItem[] = [
  {
    id: "challenge",
    label: "The Challenge",
  },
  {
    id: "research",
    label: "Research & Discovery",
  },
  {
    id: "strategy",
    label: "The Strategy",
  },
  {
    id: "execution",
    label: "Execution",
  },
  {
    id: "impact",
    label: "The Impact",
  },
];

export default function CaseStudySidebar({
  client = "Nexora",
  industry = "SaaS",
  service = "Growth Strategy",
  duration = "16 Weeks",
  year = "2026",
  projectUrl = "/contact",
  navigation = defaultNavigation,
}: CaseStudySidebarProps) {
  const projectDetails: SidebarItem[] = [
    {
      label: "Client",
      value: client,
      icon: Target,
    },
    {
      label: "Industry",
      value: industry,
      icon: Layers3,
    },
    {
      label: "Service",
      value: service,
      icon: Sparkles,
    },
    {
      label: "Duration",
      value: duration,
      icon: Clock3,
    },
    {
      label: "Year",
      value: year,
      icon: CalendarDays,
    },
  ];

  return (
    <aside className="relative">
      <div className="space-y-5 lg:sticky lg:top-24">
        {/* Project details */}
        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/[0.08] bg-[#0c1727] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.28)] sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-amber-400/[0.08] blur-[70px]" />

          <div className="relative">
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
                  Project Details
                </p>

                <h3 className="mt-2 text-xl font-black tracking-[-0.025em] text-white">
                  Engagement overview
                </h3>
              </div>

              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.08] text-amber-400">
                <Sparkles className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {projectDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="flex items-center justify-between gap-5 rounded-[1.1rem] border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.07] bg-[#0f1c2d] text-amber-400">
                        <Icon className="h-4 w-4" />
                      </span>

                      <span className="text-xs font-bold text-[#748297]">
                        {detail.label}
                      </span>
                    </div>

                    <span className="text-right text-xs font-black text-white">
                      {detail.value}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link
              href={projectUrl}
              className="group mt-5 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-amber-400 px-5 py-3 text-sm font-black text-[#111827] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-[0_18px_45px_rgba(245,158,11,0.24)]"
            >
              Start a similar project

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* Page navigation */}
        <div className="rounded-[1.8rem] border border-white/[0.08] bg-[#0c1727]/90 p-5 backdrop-blur-xl sm:p-6">
          <div className="flex items-center gap-3 border-b border-white/[0.07] pb-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-amber-400">
              <Layers3 className="h-4 w-4" />
            </span>

            <div>
              <p className="text-sm font-black text-white">
                In this case study
              </p>

              <p className="mt-1 text-xs font-medium text-[#748196]">
                Jump to any chapter
              </p>
            </div>
          </div>

          <nav className="mt-4" aria-label="Case study sections">
            <ul className="space-y-1.5">
              {navigation.map((item, index) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="group flex items-center justify-between gap-4 rounded-[1rem] px-3 py-3 transition-all duration-300 hover:bg-amber-400/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-[#566478] transition-colors duration-300 group-hover:text-amber-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-xs font-bold text-[#8e9caf] transition-colors duration-300 group-hover:text-white">
                        {item.label}
                      </span>
                    </div>

                    <ArrowUpRight className="h-3.5 w-3.5 text-[#536175] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Trust card */}
        <div className="relative overflow-hidden rounded-[1.8rem] border border-emerald-400/15 bg-emerald-400/[0.045] p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-emerald-400/[0.08] blur-[60px]" />

          <div className="relative">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
            </span>

            <h3 className="mt-5 text-lg font-black text-white">
              Results built for long-term growth
            </h3>

            <p className="mt-3 text-xs font-medium leading-6 text-[#8290a4]">
              Every engagement is designed around measurable outcomes,
              transparent reporting, and systems your team can continue using.
            </p>

            <div className="mt-5 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Strategy backed by execution
            </div>
          </div>
        </div>

        {/* Share card */}
        <button
          type="button"
          onClick={async () => {
            if (typeof window === "undefined") return;

            const shareData = {
              title: document.title,
              text: `Explore the ${client} case study`,
              url: window.location.href,
            };

            try {
              if (navigator.share) {
                await navigator.share(shareData);
                return;
              }

              await navigator.clipboard.writeText(
                window.location.href
              );
            } catch {
              // User cancelled sharing or clipboard permission was unavailable.
            }
          }}
          className="group flex w-full items-center justify-between gap-4 rounded-[1.4rem] border border-white/[0.08] bg-white/[0.025] px-5 py-4 text-left transition-all duration-300 hover:border-amber-400/20 hover:bg-amber-400/[0.05]"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.07] bg-[#0d1929] text-[#7d8a9e] transition-colors duration-300 group-hover:text-amber-400">
              <Share2 className="h-4 w-4" />
            </span>

            <div>
              <p className="text-xs font-black text-white">
                Share this case study
              </p>

              <p className="mt-1 text-[10px] font-medium text-[#68768a]">
                Send it to your team
              </p>
            </div>
          </div>

          <ArrowUpRight className="h-4 w-4 text-[#59677b] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-400" />
        </button>
      </div>
    </aside>
  );
}