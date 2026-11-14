import { createPageMetadata } from "@/lib/cms/page-metadata";
import { createMetadata } from "@/config/metadata";

export const generateMetadata = () =>
  createPageMetadata({
    title: "Contact ClickMasters",
    description:
      "Share your DeFi, NFT, DAO, or Web3 project goals and technical requirements to start a discussion about possible next steps.",
    path: "/contact",
  });

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
