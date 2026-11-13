import Link from "next/link";
import { Hexagon } from "lucide-react";
import { CmsFooterLinks } from "@/components/cms/CmsNavigation";

// The 12 core service pages — keep in sync with CORE_SERVICES in lib/related-links.ts.
// Hardcoded here because the footer also renders inside client components.
const CORE_SERVICE_LINKS = [
  ["Blockchain Development", "/service/blockchain-development-services"],
  ["Smart Contract Development", "/service/smart-contract-development"],
  ["DeFi Development", "/service/defi-development-company"],
  ["NFT Development", "/service/nft-development-company"],
  ["Crypto Wallet Development", "/service/crypto-wallet-development"],
  ["Crypto Exchange Development", "/service/crypto-exchange-development"],
  ["Enterprise Blockchain", "/service/enterprise-blockchain-solutions"],
  ["Asset Tokenization", "/service/asset-tokenization-platform"],
  ["Web3 Development", "/service/web3-development-company"],
  ["GameFi Development", "/service/gamefi-development-company"],
  ["Blockchain Consulting", "/service/blockchain-consulting"],
  ["Crypto Payment Gateway", "/service/crypto-payment-gateway-development"],
] as const;

const RESOURCE_HUB_LINKS = [
  ["All Services", "/service"],
  ["Industries", "/industries"],
  ["Locations", "/locations"],
  ["Technologies", "/technologies"],
  ["Hire Developers", "/hire"],
  ["Partners", "/partners"],
  ["Case Studies", "/case-studies"],
  ["How-To Guides", "/howto"],
  ["Comparisons", "/comparison"],
  ["Development Process", "/process"],
  ["Cost Guides", "/cost"],
  ["Calculators", "/calculators"],
  ["Tools", "/tools"],
  ["Templates", "/templates"],
  ["Resources", "/resources"],
  ["Blockchain Content Library", "/service/resources/blockchain-content-library"],
  ["Best-Of Lists", "/listicles"],
  ["Glossary", "/glossary"],
  ["FAQs", "/faqs"],
  ["News", "/news"],
] as const;

export function Footer() {
  return (
    <footer className="dark relative overflow-hidden border-t border-white/10 bg-bg-elevated text-foreground">
      <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-base to-transparent" />
      <div className="site-container relative px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1.5fr_0.7fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                <Hexagon className="h-4 w-4" />
              </span>
              <span className="font-display text-sm font-bold tracking-tight text-text-primary">CLICKMASTERS</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Blockchain &amp; Web3 development company. Engineering decentralized infrastructure for founders, protocols and enterprises.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Services</p>
            <ul className="mt-4 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {CORE_SERVICE_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-foreground/80 hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Resources</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {RESOURCE_HUB_LINKS.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-foreground/80 hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Company</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/solution" className="text-foreground/80 hover:text-primary">Solution</Link></li>
              <li><Link href="/about" className="text-foreground/80 hover:text-primary">About</Link></li>
              <li><Link href="/contact" className="text-foreground/80 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:sales@clickmastersblockchaintechnologies.com" className="break-all text-foreground/80 hover:text-primary">sales@clickmastersblockchaintechnologies.com</a></li>
            </ul>
          </div>
        </div>
        <CmsFooterLinks />
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ClickMasters. All rights reserved.</p>
          <p className="font-mono uppercase tracking-widest">Beyond the code — beyond the chain</p>
        </div>
      </div>
    </footer>
  );
}
