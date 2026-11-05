import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { createMetadata } from "@/config/metadata";

export const metadata = createMetadata({
  title: "About ClickMasters — Blockchain Development",
  description:
    "Learn about ClickMasters' blockchain and Web3 service areas, project considerations, and approach to planning decentralized products.",
  path: "/about",
});

const serviceAreas = [
  {
    label: "Smart contract development",
    href: "/service/smart-contract-development",
    description: "Contracts with explicit roles, upgrade controls and test coverage for asset-handling logic.",
  },
  {
    label: "DeFi development",
    href: "/service/defi-development-company",
    description: "Lending, AMM, staking and yield protocols, including oracle and liquidation design.",
  },
  {
    label: "Asset tokenization platforms",
    href: "/service/asset-tokenization-platform",
    description: "Transfer-restricted tokens, investor onboarding and the reporting that regulated offerings need.",
  },
  {
    label: "Crypto wallet development",
    href: "/service/crypto-wallet-development",
    description: "Custodial, non-custodial and smart-account wallets with deliberate key-management choices.",
  },
  {
    label: "Enterprise blockchain solutions",
    href: "/service/enterprise-blockchain-solutions",
    description: "Permissioned networks, consortium governance and integration with existing systems.",
  },
  {
    label: "Blockchain consulting",
    href: "/service/blockchain-consulting",
    description: "Use-case validation, network selection and cost estimates before development starts.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    description: "Define the problem, participants, assets, constraints and what success looks like.",
  },
  {
    title: "Architecture",
    description: "Decide what belongs on chain, choose networks and document integrations and trust assumptions.",
  },
  {
    title: "Build and review",
    description: "Implement in short iterations with automated tests, internal security review and an independent audit where assets are at risk.",
  },
  {
    title: "Launch and operate",
    description: "Deploy with monitoring, incident runbooks and a documented handoff to the team that will run it.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="site-container px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">About</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
            About <span className="text-gradient">ClickMasters</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            ClickMasters designs and builds blockchain and Web3 software for teams evaluating
            decentralized products, smart contracts, and the infrastructure around them. We focus
            on getting the fundamentals right — a clear problem, a sound architecture, and code
            that has been tested and reviewed before it handles real value.
          </p>

          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl border border-border bg-surface p-8 md:p-10">
              <h2 className="text-3xl font-bold tracking-tight">Areas of focus</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                The service library covers blockchain architecture, smart contract development,
                decentralized applications, DeFi systems, tokenization, wallets, exchanges, and
                enterprise integrations. Each area has different technical and operational
                requirements. A useful evaluation starts by defining the users, assets, trust
                assumptions, and business process the software is meant to support.
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                Blockchain is not automatically the right answer for every product. Teams should
                compare on-chain and conventional components, identify who controls keys and
                upgrades, and consider how privacy, reliability, and ongoing operations will work
                before committing to an architecture.
              </p>
            </section>

            <section className="rounded-3xl border border-border bg-surface p-8 md:p-10">
              <h2 className="text-3xl font-bold tracking-tight">Planning a project</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                A project brief should describe the problem, intended users, target networks,
                external systems, compliance constraints, and expected launch conditions. For
                smart contracts, it should also define roles, asset flows, upgrade or pause
                controls, and the tests required before deployment. These details help teams
                compare implementation options and surface risks early.
              </p>
              <p className="mt-4 leading-7 text-muted-foreground">
                Delivery plans commonly include discovery, architecture, implementation, review,
                testing, deployment preparation, and post-launch operations. The exact scope and
                sequence depend on the product. Independent security review and clear operational
                ownership should be considered for systems that manage valuable assets.
              </p>
            </section>
          </div>

          {/*
            TODO(BCT-03): add verified company facts here once confirmed by the
            business owner — legal entity name, registration jurisdiction,
            address, founding date, named team members and their credentials.
            Do not publish unverified details.
          */}
          <section className="mt-10 rounded-3xl border border-border bg-surface p-8 md:p-10">
            <h2 className="text-3xl font-bold tracking-tight">What we build</h2>
            <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
              Most engagements fall into a handful of solution areas. Each one has its own
              service page with the technical detail, typical scope and questions to ask before
              you start:
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {serviceAreas.map((area) => (
                <li key={area.href} className="rounded-2xl border border-border bg-background/40 p-5">
                  <Link href={area.href} className="font-semibold text-amber-base hover:underline">
                    {area.label}
                  </Link>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{area.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-4xl leading-7 text-muted-foreground">
              For an overview organized by use case rather than by service, see the{" "}
              <Link href="/solution" className="text-amber-base hover:underline">solutions hub</Link>.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-border bg-surface p-8 md:p-10">
            <h2 className="text-3xl font-bold tracking-tight">How we work</h2>
            <ol className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <p className="font-mono text-xs font-bold text-amber-base">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.description}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 max-w-4xl leading-7 text-muted-foreground">
              The detailed, phase-by-phase version of this process is described on our{" "}
              <Link href="/process" className="text-amber-base hover:underline">process pages</Link>.
            </p>
          </section>

          <section className="mt-10 rounded-3xl border border-border bg-surface p-8 md:p-10">
            <h2 className="text-3xl font-bold tracking-tight">
              How to evaluate a blockchain project
            </h2>
            <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
              Begin with the problem and the participants, not a preferred
              protocol. Identify where parties need a shared record, which
              actions require independent verification, and what information
              must remain private. Compare a distributed ledger with a
              conventional database and a hybrid design before choosing a
              network. Record the expected transaction volume, integrations,
              user experience, and operational responsibilities.
            </p>
            <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
              A sound delivery plan also defines who controls deployment keys,
              how upgrades and emergency pauses work, how data is monitored,
              and who responds to incidents. These decisions affect contracts,
              infrastructure, testing, and support. The service and resource
              pages on this site provide starting points for comparing those
              choices; project-specific scope should be confirmed with the
              people responsible for the product.
            </p>
          </section>

          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Work with us
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
