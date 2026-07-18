"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Copy,
  FileText,
  Layers3,
  Sparkles,
} from "lucide-react";

export default function TemplateHero({
  item,
  readTime,
}: {
  item: any;
  readTime: string;
}) {
  const title =
    item?.hero?.title ||
    item?.meta?.title ||
    item?.title ||
    "Blockchain Template";

  const sectionDescription = String(
    item?.sections?.[0]?.content || item?.sections?.[0]?.heading || "",
  )
    .replace(/[#*_`>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const description =
    item?.hero?.description ||
    item?.excerpt ||
    item?.description ||
    sectionDescription ||
    "A practical professional template designed to help blockchain teams plan, document, and execute projects faster.";

  const format = item?.format || item?.fileType || "Document";

  const sections =
    item?.sectionsCount ||
    item?.sections?.length ||
    item?.content?.filter((block: any) => block?.type === "heading").length ||
    0;

  // Strict Typed Animation Variants for Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.1 
      },
    },
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="group/hero relative isolate overflow-hidden rounded-[2rem] border border-neutral-800 bg-[#000000] p-5 backdrop-blur-2xl sm:p-7 md:rounded-[2.7rem] md:p-10 lg:p-12 transition-all duration-500 hover:border-amber-500/20"
    >
      {/* Grid background with high-contrast subtle layout */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:42px_42px] opacity-80 transition-transform duration-1000 group-hover/hero:scale-[1.01]" />

      {/* Cyberpunk Amber & Emerald Background Glows */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-amber-500/10 blur-[120px] transition-all duration-1000 group-hover/hero:scale-125 group-hover/hero:opacity-100 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="pointer-events-none absolute -bottom-36 left-[20%] h-[24rem] w-[24rem] rounded-full bg-emerald-500/5 blur-[100px] animate-pulse" style={{ animationDuration: '10s' }} />
      
      {/* Top Border Highlight */}
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      {/* Subtle floating background particles */}
      <span className="pointer-events-none absolute left-[7%] top-[18%] h-1.5 w-1.5 rounded-full bg-amber-500/40 animate-ping" style={{ animationDuration: '4s' }} />
      <span className="pointer-events-none absolute right-[8%] top-[26%] h-1 w-1 rounded-full bg-amber-400/60 animate-bounce" style={{ animationDuration: '5s' }} />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        {/* Left Interactive Content Area */}
        <motion.div variants={containerVariants} className="flex flex-col">
          {/* Badges and Metadata */}
          <motion.div variants={fadeInUpVariants} className="mt-2 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-amber-400 transition-all hover:bg-amber-500/20">
              <FileText className="h-4 w-4" />
              {item?.hero?.badge || item?.category || "Template"}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-xs font-semibold text-neutral-400">
              <Clock3 className="h-4 w-4 text-amber-500 animate-pulse" />
              {readTime}
            </span>

            {(item?.date || item?.published) && (
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-2 text-xs font-semibold text-neutral-400">
                <CalendarDays className="h-4 w-4 text-amber-500" />
                {item.date || item.published}
              </span>
            )}
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={fadeInUpVariants}
            className="mt-8 max-w-5xl font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {title}
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p 
            variants={fadeInUpVariants}
            className="mt-6 max-w-3xl text-base leading-8 text-neutral-400 md:text-lg"
          >
            {description}
          </motion.p>

          {/* Features / Meta Grid Cards */}
          <motion.div variants={fadeInUpVariants} className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Format", value: format, icon: FileText },
              { label: "Sections", value: sections || "Complete", icon: Layers3 },
              { label: "Ready For", value: "Professional Use", icon: Sparkles }
            ].map((card, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                className="group/card rounded-2xl border border-neutral-800/80 bg-neutral-950 p-4 transition-colors duration-300 hover:border-amber-500/30 hover:bg-neutral-900/40 cursor-pointer"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400 transition-transform duration-500 group-hover/card:rotate-12 group-hover/card:scale-105">
                  <card.icon className="h-5 w-5" />
                </span>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">
                  {card.label}
                </p>

                <p className="mt-1 font-black text-neutral-200">{card.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Dynamic Buttons */}
          <motion.div variants={fadeInUpVariants} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#template"
              className="group/button inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-black text-black shadow-lg shadow-amber-500/5 hover:shadow-amber-500/20 transition-all duration-300 sm:w-auto"
            >
              View Template
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1.5" />
            </motion.a>

            <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-7 py-3.5 text-sm font-semibold text-neutral-300 transition-all duration-300 hover:border-amber-500/30 hover:bg-neutral-900/60 hover:text-amber-400"
              >
                Request Custom Version
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Animated Stack Layer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 90, damping: 16 }}
          className="relative flex min-h-[450px] items-center justify-center"
        >
          {/* Glow backdrop behind the papers */}
          <div className="pointer-events-none absolute h-[24rem] w-[24rem] rounded-full bg-amber-500/5 blur-[100px]" />

          {/* Abstract Rotating Lines */}
          <div className="pointer-events-none absolute h-[340px] w-[340px] animate-spin rounded-full border border-amber-500/10" style={{ animationDuration: '28s' }} />
          <div className="pointer-events-none absolute h-[270px] w-[270px] animate-spin rounded-full border border-dashed border-neutral-800" style={{ animationDuration: '18s', animationDirection: 'reverse' }} />

          {/* Stack item 1: Back Paper */}
          <div className="absolute h-[320px] w-[245px] rotate-[-10deg] rounded-[1.7rem] border border-neutral-800 bg-neutral-950 transition-all duration-700 ease-out group-hover/hero:rotate-[-15deg] group-hover/hero:-translate-x-7 group-hover/hero:-translate-y-2">
            <div className="space-y-4 p-6 opacity-30">
              <div className="h-3 w-20 rounded-full bg-amber-500/40" />
              <div className="h-2 w-full rounded-full bg-neutral-800" />
              <div className="h-2 w-4/5 rounded-full bg-neutral-800" />
            </div>
          </div>

          {/* Stack item 2: Middle Paper */}
          <div className="absolute h-[330px] w-[250px] rotate-[8deg] rounded-[1.7rem] border border-neutral-800 bg-neutral-950 transition-all duration-700 ease-out group-hover/hero:rotate-[14deg] group-hover/hero:translate-x-7 group-hover/hero:-translate-y-1">
            <div className="space-y-4 p-6 opacity-40">
              <div className="h-3 w-24 rounded-full bg-blue-500/30" />
              <div className="h-2 w-full rounded-full bg-neutral-800" />
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="h-14 rounded-xl bg-neutral-900" />
                <div className="h-14 rounded-xl bg-neutral-900" />
              </div>
            </div>
          </div>

          {/* Stack item 3: Main Document Sheet with Floating Mechanics */}
          <motion.div 
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="relative z-10 h-[350px] w-[265px] overflow-hidden rounded-[1.8rem] border border-neutral-800 bg-gradient-to-br from-neutral-950 to-neutral-900 p-6 shadow-2xl transition-all duration-500 group-hover/hero:border-amber-500/40"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                <FileText className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-amber-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
                Template
              </span>
            </div>

            <h3 className="mt-7 text-2xl font-black leading-tight text-neutral-100">
              Ready-to-use project structure
            </h3>

            <div className="mt-6 space-y-3">
              <div className="h-2.5 w-full rounded-full bg-neutral-800" />
              <div className="h-2.5 w-5/6 rounded-full bg-neutral-800" />
            </div>

            <div className="mt-7 grid gap-3">
              {["Project Overview", "Requirements", "Execution Plan"].map(
                (label, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 p-3 transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-500/10 text-[10px] font-black text-amber-400">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold text-neutral-300">
                      {label}
                    </span>
                  </div>
                ),
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-neutral-800 pt-4">
              <span className="text-xs font-bold text-amber-400">
                Professional Template
              </span>
              <Copy className="h-4 w-4 text-amber-400 animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
          </motion.div>

          {/* Floating Contextual Badge */}
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.4 }}
            className="absolute bottom-3 right-0 z-20 rounded-2xl border border-neutral-800 bg-neutral-950/90 px-4 py-3 backdrop-blur-xl sm:right-4 shadow-xl"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-amber-400">
              Format
            </p>
            <p className="mt-1 text-sm font-bold text-neutral-200">{format}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}