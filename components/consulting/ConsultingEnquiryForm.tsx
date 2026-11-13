"use client";

import { useId, useRef, useState } from "react";
import { CircleAlert, CircleCheckBig, LoaderCircle, Mail, Send } from "lucide-react";

import { sendContactMail } from "@/app/actions/sendMail";
import { currentSourcePage, trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";
type FieldName = "name" | "email" | "summary";
type FieldErrors = Partial<Record<FieldName, string>>;

const CONTACT_EMAIL = "sales@clickmastersblockchaintechnologies.com";

const inputClass =
  "w-full rounded-xl border border-border-default bg-white px-4 py-3 text-sm text-text-primary shadow-sm transition placeholder:text-text-muted focus:border-amber-base focus:outline-none focus:ring-2 focus:ring-amber-base/30 aria-[invalid=true]:border-destructive";

function validate(values: { name: string; email: string; summary: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name) errors.name = "Enter your name.";
  if (!values.email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email address, for example name@company.com.";
  if (!values.summary) errors.summary = "Describe the decision you need to make.";
  return errors;
}

/**
 * Consulting enquiry section (BC-01, BC-02, BC-10, BC-11).
 *
 * Renders the `id="contact"` target used by the header and hero CTAs.
 * Submits through the existing `sendContactMail` server action, which
 * validates on the server and only reports success once the lead is accepted.
 */
export default function ConsultingEnquiryForm({ formId }: { formId: string }) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedRef = useRef(false);
  const pendingRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    company: `${uid}-company`,
    phone: `${uid}-phone`,
    summary: `${uid}-summary`,
  };

  function handleStart() {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("consulting_form_start", {
      source_page: currentSourcePage(),
      form_id: formId,
    });
  }

  function reportError(category: "validation" | "server" | "network") {
    trackEvent("consulting_form_error", { form_id: formId, error_category: category });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Prevent duplicate submissions while one is pending.
    if (pendingRef.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) || "").trim();

    const values = {
      name: get("name"),
      email: get("email"),
      summary: get("summary"),
    };
    const company = get("company");
    const phone = get("phone");

    const errors = validate(values);
    setFieldErrors(errors);
    const firstInvalid = (Object.keys(errors) as FieldName[])[0];
    if (firstInvalid) {
      setStatus("idle");
      reportError("validation");
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }

    pendingRef.current = true;
    setStatus("loading");
    setErrorMessage("");

    const sourcePage = currentSourcePage();
    const params = new URLSearchParams(window.location.search);

    try {
      const result = await sendContactMail({
        name: values.name,
        email: values.email,
        phone,
        message: values.summary,
        company,
        enquiryType: "Blockchain Consulting",
        sourcePage,
        website: "clickmastersblockchaintechnologies.com",
        service: "Blockchain Consulting",
        landingPage: window.location.href,
        referrer: document.referrer,
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_term: params.get("utm_term") || "",
        utm_content: params.get("utm_content") || "",
        honeypot: get("website_url"),
      });

      if (!result.ok) {
        reportError("server");
        setStatus("error");
        setErrorMessage(
          result.error === "Please enter a valid email address."
            ? result.error
            : `We could not submit your enquiry. Your details are still in the form — please try again, or email ${CONTACT_EMAIL}.`,
        );
        statusRef.current?.focus();
        return;
      }

      trackEvent("generate_lead", {
        form_id: formId,
        service: "blockchain_consulting",
        source_page: sourcePage,
      });
      setStatus("success");
      setFieldErrors({});
      form.reset();
      statusRef.current?.focus();
    } catch {
      // Transport failure (offline, timeout). Entered data is kept.
      reportError("network");
      setStatus("error");
      setErrorMessage(
        `Your enquiry could not be sent. Check your connection and try again, or email ${CONTACT_EMAIL}. Your details are still in the form.`,
      );
      statusRef.current?.focus();
    } finally {
      pendingRef.current = false;
    }
  }

  const describedBy = (field: FieldName, hint?: string) =>
    [hint, fieldErrors[field] ? `${ids[field]}-error` : null].filter(Boolean).join(" ") || undefined;

  return (
    <section
      id="contact"
      aria-labelledby={`${uid}-heading`}
      className="scroll-mt-32 bg-bg-base py-16 sm:py-20"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 rounded-2xl border border-border-default bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-8 lg:grid-cols-[1.4fr_1fr] lg:p-10">
          <div>
            <h2
              id={`${uid}-heading`}
              className="text-3xl font-black tracking-tight text-text-primary"
            >
              Discuss Your Blockchain Decision
            </h2>
            <p className="mt-3 text-base leading-7 text-text-secondary">
              Tell us what you are evaluating, what is uncertain, and any existing
              systems or vendors involved.
            </p>

            <form
              noValidate
              onSubmit={handleSubmit}
              onFocus={handleStart}
              className="mt-6 grid gap-5"
              aria-describedby={`${uid}-privacy`}
            >
              {/* Honeypot: hidden from people and assistive technology. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${uid}-website`}>Leave this field empty</label>
                <input id={`${uid}-website`} name="website_url" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label htmlFor={ids.name} className="text-sm font-bold text-text-primary">
                    Name <span className="font-medium text-text-secondary">(required)</span>
                  </label>
                  <input
                    id={ids.name}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={describedBy("name")}
                    className={inputClass}
                  />
                  {fieldErrors.name && (
                    <p id={`${ids.name}-error`} className="text-sm font-medium text-destructive">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <label htmlFor={ids.email} className="text-sm font-bold text-text-primary">
                    Email <span className="font-medium text-text-secondary">(required)</span>
                  </label>
                  <input
                    id={ids.email}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                    aria-describedby={describedBy("email")}
                    className={inputClass}
                  />
                  {fieldErrors.email && (
                    <p id={`${ids.email}-error`} className="text-sm font-medium text-destructive">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <label htmlFor={ids.company} className="text-sm font-bold text-text-primary">
                    Company <span className="font-medium text-text-secondary">(optional)</span>
                  </label>
                  <input
                    id={ids.company}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor={ids.phone} className="text-sm font-bold text-text-primary">
                    Phone <span className="font-medium text-text-secondary">(optional)</span>
                  </label>
                  <input
                    id={ids.phone}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor={ids.summary} className="text-sm font-bold text-text-primary">
                  What decision do you need to make?{" "}
                  <span className="font-medium text-text-secondary">(required)</span>
                </label>
                <p id={`${ids.summary}-hint`} className="text-sm leading-6 text-text-secondary">
                  For example: blockchain or database, which platform, build or buy,
                  or a review of a vendor proposal. Please do not include private keys,
                  seed phrases, passwords or confidential documents.
                </p>
                <textarea
                  id={ids.summary}
                  name="summary"
                  rows={5}
                  required
                  aria-invalid={Boolean(fieldErrors.summary)}
                  aria-describedby={describedBy("summary", `${ids.summary}-hint`)}
                  className={inputClass}
                />
                {fieldErrors.summary && (
                  <p id={`${ids.summary}-error`} className="text-sm font-medium text-destructive">
                    {fieldErrors.summary}
                  </p>
                )}
              </div>

              <div ref={statusRef} tabIndex={-1} className="outline-none">
                <div role="status" aria-live="polite">
                  {status === "success" && (
                    <div className="flex items-start gap-3 rounded-2xl border border-emerald-base/30 bg-emerald-base/10 p-4">
                      <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-emerald-base" aria-hidden="true" />
                      <p className="text-sm font-semibold text-text-primary">
                        Thank you. Your consulting enquiry has been received.
                      </p>
                    </div>
                  )}
                </div>
                <div role="alert">
                  {status === "error" && (
                    <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
                      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-text-primary">Submission failed</p>
                        <p className="mt-1 text-sm text-text-secondary">{errorMessage}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <p id={`${uid}-privacy`} className="text-xs leading-6 text-text-secondary">
                We use these details only to respond to your enquiry. Submitting this
                form does not sign you up for marketing.
              </p>

              <button
                type="submit"
                disabled={status === "loading"}
                aria-disabled={status === "loading"}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-black text-bg-base shadow-glow transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-base disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:justify-self-start"
              >
                {status === "loading" ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Request a Consulting Discussion
                  </>
                )}
              </button>
            </form>
          </div>

          <aside className="space-y-4 lg:border-l lg:border-border-default lg:pl-8">
            <h3 className="text-lg font-black text-text-primary">What happens next</h3>
            <p className="text-sm leading-7 text-text-secondary">
              Tell us the decision you need to make and the systems involved. We will
              review your enquiry and discuss an appropriate scope.
            </p>
            <h3 className="pt-2 text-lg font-black text-text-primary">Prefer email?</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() =>
                trackEvent("consulting_contact_click", {
                  source_page: currentSourcePage(),
                  channel: "email",
                })
              }
              className="flex items-center gap-3 rounded-xl border border-border-default bg-bg-base p-4 text-sm font-semibold text-text-primary transition hover:border-amber-base/40 hover:text-amber-base"
            >
              <Mail className="h-5 w-5 shrink-0 text-amber-base" aria-hidden="true" />
              <span className="break-all">{CONTACT_EMAIL}</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
