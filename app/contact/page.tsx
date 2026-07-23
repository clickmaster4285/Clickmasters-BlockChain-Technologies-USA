"use client";

import { useState } from "react";

import {
  Mail,
  MessageCircle,
  Phone,
  Send,
  LoaderCircle,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

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

      service: "Blockchain",

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
      const response = await fetch(
        "https://crm.clickmasters.pk/api/leads",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      const responseData = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          responseData?.error ||
            "Unable to submit your message.",
        );
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error(
        "CRM lead submission failed:",
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
            Tell us about your protocol, product, or
            DAO. Our engineers reply within 24 hours
            with a scoped plan and timeline.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-surface p-6 md:p-8"
            >
              <div className="grid gap-5">
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
                    placeholder="+44 0000 000000"
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
                    defaultValue=""
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
              <a
                href="mailto:sales@clickmastersdigitalmarketing.com"
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

              <a
                href="tel:+447988576086"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>

                <div>
                  <p className="font-semibold">
                    UK
                  </p>

                  <p className="text-sm text-muted-foreground">
                    +44 7988 576086
                  </p>
                </div>
              </a>

              <a
                href="tel:+92 33325394285"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>

                <div>
                  <p className="font-semibold">
                    PK
                  </p>

                  <p className="text-sm text-muted-foreground">
                    +92 33325394285
                  </p>
                </div>
              </a>

              <a
                href="tel:+923325394285"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>

                <div>
                  <p className="font-semibold">
                    Pakistan
                  </p>

                  <p className="text-sm text-muted-foreground">
                    +92 332 5394285
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/13252024074"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" />
                </span>

                <div>
                  <p className="font-semibold">
                    WhatsApp
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Chat with our team
                  </p>
                </div>
              </a>

              <div className="rounded-2xl border border-dashed border-border p-5">
                <p className="font-semibold">
                  Free 30-min consultation
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Book a strategy call to scope your
                  blockchain project.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}