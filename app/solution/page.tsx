import { createPageMetadata } from "@/lib/cms/page-metadata";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Coins,
  Compass,
  FileCode2,
  Gamepad2,
  Landmark,
  Repeat,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { createMetadata } from "@/config/metadata";

export const generateMetadata = () => createPageMetadata({
  title: "Blockchain Solutions Hub",
  description:
    "Blockchain solutions by use case: smart contracts, DeFi, tokenization, wallets and payments, exchanges, enterprise ledgers, Web3 apps, and strategy.",
  path: "/solution",
});

type Solution = {
  icon: typeof Wallet;
  title: string;
  summary: string;
  fit: string;
  links: { label: string; href: string }[];
};

const solutions: Solution[] = [
  {
    icon: FileCode2,
    title: "Smart contracts",
    summary:
      "Contracts that hold assets or enforce business rules need clearly defined roles, upgrade and pause controls, and a test suite that covers failure cases as well as the happy path.",
    fit: "A fit when the rules of an agreement must run the same way for every participant without a central operator.",
    links: [
      { label: "Smart contract development", href: "/service/smart-contract-development" },
      { label: "Smart contract design patterns", href: "/service/smart-contract-design-patterns" },
    ],
  },
  {
    icon: Repeat,
    title: "DeFi protocols",
    summary:
      "Lending markets, AMMs, staking and yield products combine contract logic with oracle design, liquidation mechanics and economic modelling. Protection against MEV and flash-loan attacks is part of the design, not a launch-week patch.",
    fit: "A fit for teams building financial primitives where transparency and composability matter more than central control.",
    links: [
      { label: "DeFi development", href: "/service/defi-development-company" },
      { label: "MEV protection architecture", href: "/service/defi-mev-protection" },
    ],
  },
  {
    icon: Landmark,
    title: "Asset tokenization",
    summary:
      "Tokenizing real estate, private credit or commodities means pairing transfer-restricted tokens with investor onboarding, cap-table logic and the reporting that securities rules require.",
    fit: "A fit when fractional ownership, faster settlement or a wider investor base justifies the compliance work.",
    links: [
      { label: "Asset tokenization platforms", href: "/service/asset-tokenization-platform" },
      { label: "Private credit tokenization", href: "/service/private-credit-tokenization" },
    ],
  },
  {
    icon: Wallet,
    title: "Wallets and crypto payments",
    summary:
      "Custodial, non-custodial and smart-account wallets each trade convenience against key-management risk. Payment gateways add settlement, conversion and accounting exports on top.",
    fit: "A fit for products that need users to hold, send or pay with digital assets inside an existing experience.",
    links: [
      { label: "Crypto wallet development", href: "/service/crypto-wallet-development" },
      { label: "Crypto payment gateways", href: "/service/crypto-payment-gateway-development" },
    ],
  },
  {
    icon: Coins,
    title: "Crypto exchanges",
    summary:
      "An exchange is a matching engine, custody operation and compliance programme at the same time. KYC/AML pipelines, cold-storage procedures and licensing strategy shape the architecture from day one.",
    fit: "A fit for operators planning a centralized, decentralized or hybrid trading venue.",
    links: [
      { label: "Crypto exchange development", href: "/service/crypto-exchange-development" },
      { label: "Exchange KYC/AML pipelines", href: "/service/crypto-exchange-kyc-aml" },
    ],
  },
  {
    icon: Building2,
    title: "Enterprise blockchain",
    summary:
      "Permissioned ledgers give consortium members a shared, auditable record while keeping data private. Governance, onboarding and integration with existing ERP systems decide whether a network lasts.",
    fit: "A fit when several organizations must trust the same record but none should own it outright.",
    links: [
      { label: "Enterprise blockchain solutions", href: "/service/enterprise-blockchain-solutions" },
      { label: "Hyperledger Fabric network setup", href: "/service/hyperledger-fabric-network-setup" },
    ],
  },
  {
    icon: Gamepad2,
    title: "Web3 applications and games",
    summary:
      "Decentralized applications pair on-chain components with ordinary web and mobile front ends. For games, token and NFT economies must be designed to stay sustainable once early rewards slow down.",
    fit: "A fit for consumer products where ownership of digital items or open participation is part of the value.",
    links: [
      { label: "Web3 development", href: "/service/web3-development-company" },
      { label: "GameFi development", href: "/service/gamefi-development-company" },
    ],
  },
  {
    icon: Compass,
    title: "Strategy and consulting",
    summary:
      "Before committing a budget, validate the use case, compare networks and estimate total cost of ownership. Sometimes the honest answer is that a conventional database is the better tool.",
    fit: "A fit for teams that are still deciding whether, where and how blockchain belongs in their product.",
    links: [
      { label: "Blockchain consulting", href: "/service/blockchain-consulting" },
      { label: "Blockchain development services", href: "/service/blockchain-development-services" },
    ],
  },
];

export default function SolutionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="site-container px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Solutions</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Blockchain solutions by use case
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Start from the problem you need to solve, not from a particular network. Each
            solution area below explains what the work involves, when it is a good fit, and
            which of our <Link href="/service" className="text-amber-base underline-offset-4 hover:underline">blockchain development services</Link> cover
            it in detail.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {solutions.map((solution) => (
              <article
                key={solution.title}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 md:p-8"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <solution.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-2xl font-semibold">{solution.title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{solution.summary}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  <span className="font-semibold text-foreground">When it fits: </span>
                  {solution.fit}
                </p>
                <ul className="mt-auto space-y-2 pt-5">
                  {solution.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-amber-base hover:underline"
                      >
                        {link.label}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <section className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-border bg-surface p-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Choose the right system boundary
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                A blockchain product usually combines on-chain contracts with
                user interfaces, APIs, data services, and operational tooling.
                Put only the state and rules that need shared verification on
                chain; keep private or frequently changing information in
                systems designed for those needs. Document how each component
                communicates, what happens when a dependency is unavailable,
                and which party is accountable for updates.
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                Compare public and permissioned networks against transaction
                costs, privacy, throughput, governance, and user onboarding.
                The right choice depends on participants and constraints, not
                on a network&apos;s popularity alone.
              </p>
            </article>
            <article className="rounded-3xl border border-border bg-surface p-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Make delivery and operations explicit
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Before implementation, agree on user journeys, roles,
                integrations, acceptance criteria, test environments, and
                deployment ownership. For contracts that manage assets, plan
                threat modeling, independent review, monitoring, incident
                response, and recovery procedures as part of the system rather
                than as launch-day additions.
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                A practical handoff includes source code, build and deployment
                instructions, configuration guidance, test results, and a clear
                account of known limitations, so your team can maintain the
                system after its initial release.
              </p>
            </article>
          </section>

          <div className="mt-12 rounded-3xl border border-border bg-gradient-to-r from-surface to-bg-elevated p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight">Not sure which solution fits?</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Share the problem, the people involved and any constraints you already know about.
              We will help you work out whether blockchain is the right tool and, if it is, which
              approach to evaluate first.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
