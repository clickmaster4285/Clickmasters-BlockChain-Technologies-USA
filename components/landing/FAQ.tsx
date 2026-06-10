import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Which blockchains do you support?",
    a: "Ethereum, Polygon, Solana, BNB Chain, Avalanche, Arbitrum, Optimism, Base, and more — both EVM and non-EVM ecosystems.",
  },
  {
    q: "Do you audit smart contracts?",
    a: "Yes — we provide formal verification in-house plus third-party audits from partners like CertiK and Hacken before mainnet deploy.",
  },
  {
    q: "Can you build cross-chain DApps?",
    a: "Absolutely. We integrate LayerZero, Wormhole, Chainlink CCIP and native bridges depending on your security and latency requirements.",
  },
  {
    q: "What's your typical timeline for a DApp?",
    a: "MVP DApps ship in 8–12 weeks. Larger protocols with custom tokenomics and multi-chain support typically run 12–16 weeks.",
  },
  {
    q: "Do you provide post-launch support?",
    a: "Yes — 24/7 on-chain monitoring, incident response, maintenance plans, and contract upgrade paths via proxy patterns.",
  },
  {
    q: "How do you handle security?",
    a: "Defense in depth: multiple audits, fuzz testing, bug bounties, multi-sig wallets, time-locks, and continuous on-chain alerting.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative overflow-hidden border-y border-border bg-bg-surface py-24">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-40" />
      <div className="container relative mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">/ FAQ</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
            Answers before you ask
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Everything founders and protocols ask us before kicking off a Web3 engagement.
          </p>
        </div>
        <div className="mt-12 rounded-2xl border border-border bg-background p-2 md:p-4">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="px-4 text-left text-base font-semibold md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-muted-foreground">
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
