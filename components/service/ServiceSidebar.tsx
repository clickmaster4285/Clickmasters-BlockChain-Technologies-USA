"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  items: { title: string; items: string[] }[];
}

export default function ServiceSidebar({ items }: Props) {
  const reduce = useReducedMotion();

  return (
    <>
      {items.map((group, gi) => (
        <motion.div
          key={group.title}
          initial={reduce ? {} : { opacity: 0, x: 12 }}
          whileInView={reduce ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: gi * 0.1 }}
          className="rounded-2xl border border-border bg-surface p-6"
        >
          <h4 className="font-semibold text-sm uppercase tracking-wider text-amber-base">{group.title}</h4>
          <ul className="mt-3 space-y-2">
            {group.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-silver-base">
                <span className="h-1 w-1 rounded-full bg-amber-base/60 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </>
  );
}
