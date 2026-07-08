"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Which blockchains do you support?",
    a: "Ethereum, Polygon, Solana, BNB Chain, Avalanche, Arbitrum, Optimism, Base, and more - both EVM and non-EVM ecosystems.",
  },
  {
    q: "Do you audit smart contracts?",
    a: "Yes - we provide formal verification in-house plus third-party audits from partners like CertiK and Hacken before mainnet deploy.",
  },
  {
    q: "Can you build cross-chain DApps?",
    a: "Absolutely. We integrate LayerZero, Wormhole, Chainlink CCIP and native bridges depending on your security and latency requirements.",
  },
  {
    q: "What's your typical timeline for a DApp?",
    a: "MVP DApps ship in 8-12 weeks. Larger protocols with custom tokenomics and multi-chain support typically run 12-16 weeks.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes - 24/7 on-chain monitoring, incident response, maintenance plans, and contract upgrade paths via proxy patterns.",
  },
  {
    q: "How do you handle security?",
    a: "Defense in depth: multiple audits, fuzz testing, bug bounties, multi-sig wallets, time-locks, and continuous on-chain alerting.",
  },
  {
    q: "How much does blockchain development cost?",
    a: "Smart contracts start at $8,000. Full DeFi protocols range from $150,000 to $500,000 depending on scope. We provide a fixed-price quote after the discovery phase - no hourly surprises.",
  },
  {
    q: "Do you sign NDAs before the first call?",
    a: "Yes - a mutual NDA is signed before any discovery call. All case studies are anonymized. Your project details, architecture, and code remain confidential.",
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
            Answers before you ask
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary">
            Everything founders and protocols ask us before kicking off a Web3 engagement.
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
