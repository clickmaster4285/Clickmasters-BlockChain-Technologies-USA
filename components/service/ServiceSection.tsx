"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Blocks, ShieldCheck, LayoutGrid, Globe, Wallet, Image, Coins } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Blocks,
  ShieldCheck,
  LayoutGrid,
  Globe,
  Wallet,
  Image,
  Coins,
};

interface Props {
  section: { heading: string; content: string; bullets: string[] };
  index: number;
}

export default function ServiceSection({ section, index }: Props) {
  const reduce = useReducedMotion();
  const Icon = iconMap[section.heading.split(" ")[0]] || Blocks;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={reduce ? {} : { opacity: 0, y: 16 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`group rounded-2xl border border-border bg-surface p-6 md:p-8 card hover:border-amber-border transition-colors`}
    >
      <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 items-start`}>
        {/* Icon block */}
        <div className="flex-shrink-0">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-amber-glow text-amber-base border border-amber-border">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold">{section.heading}</h3>
          <p className="mt-2 text-sm text-silver-base leading-relaxed">{section.content}</p>
          <ul className="mt-4 space-y-2">
            {section.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm text-silver-base">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-base flex-shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
