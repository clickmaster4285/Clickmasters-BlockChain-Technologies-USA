"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, CircleCheckBig, LoaderCircle, Send } from "lucide-react";

import { sendContactMail } from "@/app/actions/sendMail";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "h-11 w-full rounded-lg border border-white/15 bg-slate-950/45 px-3 text-sm text-white placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/25";

export default function ServiceEnquiryForm({
  serviceType,
}: {
  serviceType: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const searchParams = new URLSearchParams(window.location.search);

    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await sendContactMail({
        name: String(data.get("name") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        message: String(data.get("message") ?? "").trim(),
        honeypot: String(data.get("honeypot") ?? ""),
        website: "clickmastersblockchaintechnologies.com",
        service: "Blockchain",
        enquiryType: serviceType,
        sourcePage: window.location.pathname,
        landingPage: window.location.href,
        referrer: document.referrer,
        utm_source: searchParams.get("utm_source") ?? "",
        utm_medium: searchParams.get("utm_medium") ?? "",
        utm_campaign: searchParams.get("utm_campaign") ?? "",
        utm_term: searchParams.get("utm_term") ?? "",
        utm_content: searchParams.get("utm_content") ?? "",
      });

      if (!result.ok) {
        throw new Error(result.error || "Unable to submit your enquiry.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Service enquiry submission failed:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur sm:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
        Start a conversation
      </p>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
        Discuss your project
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">
        Share a few details and our team will get back to you.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-3.5">
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          <label htmlFor="service-enquiry-website">
            Leave this field empty
          </label>
          <input
            id="service-enquiry-website"
            name="honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <label
          className="grid gap-1.5 text-sm font-semibold text-slate-100"
          htmlFor="service-enquiry-name"
        >
          Name
          <input
            id="service-enquiry-name"
            name="name"
            autoComplete="name"
            required
            placeholder="Your name"
            className={fieldClass}
          />
        </label>

        <label
          className="grid gap-1.5 text-sm font-semibold text-slate-100"
          htmlFor="service-enquiry-email"
        >
          Work email
          <input
            id="service-enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@company.com"
            className={fieldClass}
          />
        </label>

        <label
          className="grid gap-1.5 text-sm font-semibold text-slate-100"
          htmlFor="service-enquiry-phone"
        >
          Phone <span className="font-normal text-slate-400">(optional)</span>
          <input
            id="service-enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 000 0000"
            className={fieldClass}
          />
        </label>

        <label
          className="grid gap-1.5 text-sm font-semibold text-slate-100"
          htmlFor="service-enquiry-message"
        >
          What are you looking to build?
          <textarea
            id="service-enquiry-message"
            name="message"
            required
            rows={3}
            placeholder="Tell us about your goals and timeline."
            className={`${fieldClass} h-auto min-h-20 resize-y py-2.5`}
          />
        </label>

        {status === "success" && (
          <p
            role="status"
            className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900"
          >
            <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0" />
            Thanks — your enquiry has been sent.
          </p>
        )}

        {status === "error" && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-900"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-1 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-amber-dim disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Request a consultation
            </>
          )}
        </button>
      </form>
    </div>
  );
}
