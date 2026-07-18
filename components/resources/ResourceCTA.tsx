"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  FileText,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type ResourceCTAProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  newsletterEnabled?: boolean;
};

const benefits = [
  "Practical blockchain guides",
  "Clear implementation takeaways",
  "No spam, only useful updates",
];

export default function ResourceCTA({
  title = "Turn useful knowledge into confident action",
  description = "Explore practical resources, strategic guides, expert insights, and carefully curated learning materials designed to help you make smarter digital decisions.",
  primaryLabel = "Explore Resources",
  primaryHref = "/resources",
  secondaryLabel = "View Latest Insights",
  secondaryHref = "/news",
  newsletterEnabled = true,
}: ResourceCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (
      !normalizedEmail ||
      !normalizedEmail.includes("@") ||
      !normalizedEmail.includes(".")
    ) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-bg-base via-surface/50 to-bg-base px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute left-[-8rem] top-0 h-80 w-80 rounded-full bg-amber-base/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] bottom-0 h-80 w-80 rounded-full bg-emerald-base/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-bg-base/85 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:p-10">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-base/20 bg-amber-base/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-base">
              <Sparkles className="h-4 w-4" />
              ClickMasters Knowledge Hub
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-black leading-tight text-text-primary sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-silver sm:text-base">
              {description}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-[1.1rem] border border-white/10 bg-surface/70 p-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-base/15 bg-amber-base/10 text-amber-base">
                    <Check className="h-4 w-4" />
                  </span>

                  <p className="mt-3 text-sm font-bold leading-5 text-text-primary">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryHref}
                className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-amber-base px-7 py-3.5 text-sm font-black text-bg-base shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-amber-light"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href={secondaryHref}
                className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-full border border-white/10 bg-surface px-7 py-3.5 text-sm font-black text-silver transition-all duration-300 hover:-translate-y-1 hover:border-amber-base/25 hover:text-amber-base"
              >
                {secondaryLabel}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-surface/85 p-5 shadow-soft sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base">
                <Mail className="h-5 w-5" />
              </span>

              <span className="rounded-full border border-emerald-base/20 bg-emerald-base/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-emerald-base">
                Free Updates
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-black text-text-primary">
              Get the best resources in your inbox
            </h3>

            <p className="mt-3 text-sm font-medium leading-6 text-silver">
              Receive carefully selected guides, frameworks,
              and insights without unnecessary noise.
            </p>

            {newsletterEnabled ? (
              <form
                onSubmit={handleSubmit}
                className="mt-6"
              >
                <label className="relative block">
                  <span className="sr-only">
                    Email address
                  </span>

                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-silver" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus("idle");
                    }}
                    placeholder="Enter your email address"
                    className="h-14 w-full rounded-[1.1rem] border border-white/10 bg-bg-base pl-11 pr-4 text-sm font-semibold text-text-primary outline-none transition-all duration-300 placeholder:text-silver-mid focus:border-amber-base/30 focus:ring-4 focus:ring-amber-base/[0.08]"
                  />
                </label>

                <button
                  type="submit"
                  className="group mt-3 inline-flex h-13 w-full items-center justify-center gap-3 rounded-[1.1rem] bg-amber-base px-6 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-light"
                >
                  Join Resource Updates
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {status === "success" && (
                  <p className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-base">
                    <ShieldCheck className="h-4 w-4" />
                    You are on the list.
                  </p>
                )}

                {status === "error" && (
                  <p className="mt-3 text-xs font-bold text-red-600">
                    Please enter a valid email address.
                  </p>
                )}
              </form>
            ) : (
              <Link
                href={primaryHref}
                className="mt-6 inline-flex h-13 w-full items-center justify-center gap-3 rounded-[1.1rem] bg-amber-base px-6 text-sm font-black text-bg-base transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-light"
              >
                <FileText className="h-4 w-4" />
                Browse Resources
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
