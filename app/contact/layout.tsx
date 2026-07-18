import { createMetadata } from "@/config/metadata";

export const metadata = createMetadata({
  title: "Contact ClickMasters — Build Your Web3 Project",
  description:
    "Tell us about your DeFi, NFT, DAO or Web3 project. Senior blockchain engineers reply within 24 hours with a scoped plan.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
