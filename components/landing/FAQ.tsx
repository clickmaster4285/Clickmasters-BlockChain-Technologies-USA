"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What does a blockchain development company actually do?",
    a: "A blockchain development company designs, builds, and secures software that runs on a blockchain — including smart contracts, decentralized applications, wallets, and the systems that connect them to a business's existing tools. At Clickmasters, that also includes the planning and security work that happens before and after the build.",
  },
  {
    q: "How much do blockchain development services cost?",
    a: "Cost depends on scope: a single audited smart contract is a much smaller project than a full platform with a custom token and mobile app. Most engagements are priced after a short discovery phase, once requirements are clear, so you get a fixed quote instead of an open-ended estimate.",
  },
  {
    q: "How long does it take to build a blockchain application?",
    a: "A focused smart contract or MVP can often be delivered in a matter of weeks, while a full platform with multiple integrations typically takes a few months. Timelines are set during the discovery phase based on your specific requirements.",
  },
  {
    q: "Which blockchains do you build on?",
    a: "We primarily work with Ethereum and EVM-compatible networks such as Polygon, Arbitrum, and Base, along with Solana and enterprise ledger frameworks for permissioned use cases. Chain selection is part of our consulting process.",
  },
  {
    q: "Do you offer custom blockchain development, or only pre-built templates?",
    a: "Both, depending on what fits the project. Many products can launch faster on proven, audited standards, but when a business model needs something a template can't support, our custom blockchain development team builds it from the ground up.",
  },
  {
    q: "Is blockchain technology only for finance and crypto companies?",
    a: "No. While DeFi is a common use case, blockchain technology solutions are increasingly used in supply chain tracking, healthcare data sharing, real estate tokenization, gaming, and loyalty programs — anywhere verified, tamper-resistant records add value.",
  },
  {
    q: "Do you handle security audits for smart contracts?",
    a: "Yes. Every contract we write goes through internal security review before launch, and we can also review and audit smart contracts from an existing codebase as a standalone engagement.",
  },
  {
    q: "Do you provide support after the project launches?",
    a: "Yes. Blockchain products need ongoing monitoring, updates, and occasional scaling work, and our team stays engaged after launch rather than handing off the project and moving on.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden border-y border-border bg-bg-surface py-24 md:py-28">
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
      <div className="site-container relative px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-glow/50 px-3.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-base">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-base" />
            FAQ
          </div>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            Straight answers to the questions we hear most often from clients evaluating a
            blockchain development company.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="px-2 text-left text-base font-semibold text-text-primary transition-colors hover:text-amber-base md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-2 pb-4 text-sm leading-relaxed text-text-secondary">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
