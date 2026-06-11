"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  phases: { phase: string; duration: string; description: string }[];
}

export default function ServiceTimeline({ phases }: Props) {
  const reduce = useReducedMotion();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Timeline</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" aria-hidden="true" />

        <ol className="space-y-6">
          {phases.map((p, i) => (
            <motion.li
              key={p.phase}
              initial={reduce ? {} : { opacity: 0, x: -12 }}
              whileInView={reduce ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative flex gap-4 items-start"
            >
              {/* Dot */}
              <span className="relative z-10 mt-1 flex-shrink-0">
                <span className="block h-10 w-10 rounded-full border-2 border-amber-base bg-surface grid place-items-center">
                  <span className="text-xs font-bold text-amber-base font-mono">{i + 1}</span>
                </span>
              </span>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-semibold">{p.phase}</h3>
                  <span className="text-xs font-mono text-amber-base bg-amber-glow px-2 py-0.5 rounded-full">{p.duration}</span>
                </div>
                <p className="mt-1 text-sm text-silver-base">{p.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
