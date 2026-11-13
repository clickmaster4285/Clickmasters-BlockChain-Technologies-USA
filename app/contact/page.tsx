"use client";

import { useEffect, useState } from "react";

import {
  Mail,
  Send,
  LoaderCircle,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { sendContactMail } from "@/app/actions/sendMail";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type SubmissionStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

export default function ContactPage() {
  const [status, setStatus] =
    useState<SubmissionStatus>("idle");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [projectType, setProjectType] =
    useState("");

  // Non-sensitive service identifier from links such as
  // /contact?service=blockchain-consulting preselects the project type.
  useEffect(() => {
    const service = new URLSearchParams(
      window.location.search,
    ).get("service");

    if (service === "blockchain-consulting") {
      setProjectType("Blockchain Consulting");
    }
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(
      formData.get("name") || "",
    ).trim();

    const email = String(
      formData.get("email") || "",
    ).trim();

    const phone = String(
      formData.get("phone") || "",
    ).trim();

    const projectType = String(
      formData.get("projectType") || "",
    ).trim();

    const message = String(
      formData.get("message") || "",
    ).trim();

    const searchParams = new URLSearchParams(
      window.location.search,
    );

    const payload = {
      name,
      email,
      phone,

      message: projectType
        ? `Project Type: ${projectType}\n\n${message}`
        : message,

      website:
        "clickmastersblockchaintechnologies.com",

      service:
        projectType === "Blockchain Consulting"
          ? "Blockchain Consulting"
          : "Blockchain",

      landingPage: window.location.href,
      referrer: document.referrer,

      utm_source:
        searchParams.get("utm_source") || "",

      utm_medium:
        searchParams.get("utm_medium") || "",

      utm_campaign:
        searchParams.get("utm_campaign") || "",

      utm_term:
        searchParams.get("utm_term") || "",

      utm_content:
        searchParams.get("utm_content") || "",
    };

    try {
      const result = await sendContactMail(payload);

      if (!result.ok) {
        throw new Error(
          result.error ||
            "Unable to submit your message.",
        );
      }

      setStatus("success");
      form.reset();
      setProjectType("");
    } catch (error) {
      console.error(
        "Contact form submission failed:",
        error,
      );

      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pb-24 pt-32">
        <section className="site-container px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            Contact
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            Let&apos;s build your{" "}
            <span className="text-gradient">
              Web3 project
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Tell us about your protocol, product, or DAO. Share your goals and constraints so we
            can discuss a suitable next step. Include relevant technical constraints, timelines,
            existing systems, or stakeholder requirements.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-surface p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                Send a project brief
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Share the product, timeline, and chain so we can reply with a scoped plan.
              </p>
              <div className="mt-6 grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Name
                  </Label>

                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Email
                  </Label>

                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@protocol.xyz"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">
                    Phone number
                  </Label>

                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 555 000 0000"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="projectType">
                    Project type
                  </Label>

                  <select
                    id="projectType"
                    name="projectType"
                    className="h-10 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                    value={projectType}
                    onChange={(event) =>
                      setProjectType(event.target.value)
                    }
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-background"
                    >
                      Select…
                    </option>

                    <option
                      value="Blockchain Consulting"
                      className="bg-background"
                    >
                      Blockchain Consulting
                    </option>

                    <option
                      value="DeFi"
                      className="bg-background"
                    >
                      DeFi
                    </option>

                    <option
                      value="NFT"
                      className="bg-background"
                    >
                      NFT
                    </option>

                    <option
                      value="DAO"
                      className="bg-background"
                    >
                      DAO
                    </option>

                    <option
                      value="Wallet"
                      className="bg-background"
                    >
                      Wallet
                    </option>

                    <option
                      value="Smart Contracts"
                      className="bg-background"
                    >
                      Smart Contracts
                    </option>

                    <option
                      value="Tokenization"
                      className="bg-background"
                    >
                      Tokenization
                    </option>

                    <option
                      value="Enterprise Blockchain"
                      className="bg-background"
                    >
                      Enterprise Blockchain
                    </option>

                    <option
                      value="Other"
                      className="bg-background"
                    >
                      Other
                    </option>
                  </select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">
                    Message
                  </Label>

                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project…"
                  />
                </div>

                {status === "success" && (
                  <div
                    role="status"
                    className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/10 p-4"
                  >
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                    <div>
                      <p className="text-sm font-semibold">
                        Message sent successfully
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Thank you. Our team will contact
                        you shortly.
                      </p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4"
                  >
                    <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

                    <div>
                      <p className="text-sm font-semibold">
                        Submission failed
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {errorMessage}
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "loading" ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Sending message…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send message
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                Talk to the team
              </h2>
              <a
                href="mailto:sales@clickmastersblockchaintechnologies.com"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>

                <div>
                  <p className="font-semibold">
                    Email
                  </p>

                  <p className="break-all text-sm text-muted-foreground">
                    sales@clickmastersblockchaintechnologies.com
                  </p>
                </div>
              </a>

              <div className="rounded-2xl border border-dashed border-border p-5">
                <p className="font-semibold">
                  Project discussion
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Share your goals and questions so the right topics can be
                  covered in a follow-up conversation.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold">Describe the problem</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Explain what the product should help people do, who will use it,
                and which process or trust issue it addresses. If you are still
                exploring an idea, describe the decision you need to make
                rather than committing to a particular blockchain or token.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold">Share the constraints</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Useful context can include target networks, existing systems,
                user roles, data privacy needs, compliance considerations,
                expected launch timing, and any technical documentation you
                already have. Avoid sending passwords, private keys, seed
                phrases, or other credentials through the form.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="text-xl font-semibold">Plan a useful discussion</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A first project conversation can focus on feasibility, scope,
                architecture options, integration dependencies, security
                responsibilities, and open questions. The right next step
                depends on the information available; no delivery estimate or
                outcome is implied before requirements are reviewed.
              </p>
            </article>
          </section>

          <section className="mt-8 rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h2 className="text-xl font-semibold">What happens after you reach out?</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
              The information in your message helps determine whether the
              question is about product discovery, a technical design,
              implementation, or an existing system. If important details are
              missing, they can be clarified before discussing scope. For an
              existing application, describe the affected component and the
              behavior you are trying to change without including confidential
              customer data or access credentials.
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
              You can also use the service pages, technical guides, tools, and
              checklists to prepare questions in advance. A clear description
              of the intended outcome, constraints, and unresolved decisions
              makes a project conversation more useful for everyone involved.
            </p>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
