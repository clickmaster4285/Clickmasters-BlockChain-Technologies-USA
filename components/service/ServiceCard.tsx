"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Service } from "@/data/services";

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.article
      initial={shouldReduce ? {} : { opacity: 0, y: 8 }}
      animate={shouldReduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group block rounded-2xl border border-border bg-surface p-6 card tilt-card focus:outline-none focus-visible:ring focus-visible:ring-amber-base"
    >
      <Link href={`/service/${service.slug}`} aria-label={`Open ${service.title} service page`} className="block">
        <p className="font-mono text-xs text-primary">{service.hero.eyebrow}</p>
        <h3 className="mt-3 text-xl font-semibold">{service.title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{service.short}</p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {service.sections.slice(0, 2).map((ss) => (
            <li key={ss.heading}><span className="font-semibold">{ss.heading}:</span> {ss.content}</li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-base">Learn more
            <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">Contact</span>
        </div>
      </Link>
    </motion.article>
  );
}
