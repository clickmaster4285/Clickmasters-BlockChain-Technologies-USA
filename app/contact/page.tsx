"use client";

import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="container mx-auto max-w-5xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Contact</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            Let's build your <span className="text-gradient">Web3 project</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Tell us about your protocol, product or DAO. Our engineers reply within 24 hours
            with a scoped plan and timeline.
          </p>

          <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-3xl border border-border bg-surface p-6 md:p-8"
            >
              <div className="grid gap-5">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required placeholder="Jane Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="you@protocol.xyz" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Project type</Label>
                  <select
                    id="type"
                    className="h-10 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>Select…</option>
                    <option>DeFi</option>
                    <option>NFT</option>
                    <option>DAO</option>
                    <option>Wallet</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="msg">Message</Label>
                  <Textarea id="msg" rows={5} required placeholder="Tell us about your project…" />
                </div>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
                >
                  {sent ? "Thanks — we'll be in touch" : "Send message"}
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
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">sales@clickmastersdigitalmarketing.com</p>
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
                  <p className="font-semibold">UK</p>
                  <p className="text-sm text-muted-foreground">+44 7988 576086</p>
                </div>
              </a>
              <a
                href="tel:+13252024074"
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold">US</p>
                  <p className="text-sm text-muted-foreground">+1 325 202 4074</p>
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
                  <p className="font-semibold">Pakistan</p>
                  <p className="text-sm text-muted-foreground">+92 332 5394285</p>
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
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Chat with our team</p>
                </div>
              </a>
              <div className="rounded-2xl border border-dashed border-border p-5">
                <p className="font-semibold">Free 30-min consultation</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Book a strategy call to scope your blockchain project.
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
