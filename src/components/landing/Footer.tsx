import { Hexagon } from "lucide-react";

export function Footer() {
  return (
    <footer className="dark relative overflow-hidden border-t border-white/10 text-foreground" style={{ background: "#111827" }}>
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,#0052FF,#7C3AED,transparent)" }} />
      <div className="container relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Hexagon className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-bold tracking-tight">CLICKMASTERS</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Blockchain &amp; Web3 development company. Engineering decentralized infrastructure for founders, protocols and enterprises.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Services</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#services" className="text-foreground/80 hover:text-primary">Smart Contracts</a></li>
              <li><a href="#services" className="text-foreground/80 hover:text-primary">DApp Development</a></li>
              <li><a href="#services" className="text-foreground/80 hover:text-primary">NFT Marketplaces</a></li>
              <li><a href="#services" className="text-foreground/80 hover:text-primary">Crypto Wallets</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#work" className="text-foreground/80 hover:text-primary">Work</a></li>
              <li><a href="#process" className="text-foreground/80 hover:text-primary">Process</a></li>
              <li><a href="#contact" className="text-foreground/80 hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:sale@clickmastersblockchaindevelopmentcompany.com" className="break-all text-foreground/80 hover:text-primary">sale@clickmastersblockchaindevelopmentcompany.com</a></li>
              <li><a href="tel:+13252024074" className="text-foreground/80 hover:text-primary">+1 325 202 4074</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ClickMasters Blockchain &amp; Web3 Development Company. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">Beyond the code — beyond the chain</p>
        </div>
      </div>
    </footer>
  );
}