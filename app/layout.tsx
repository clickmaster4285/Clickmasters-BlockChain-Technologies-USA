import type { Metadata } from "next";
import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { Providers } from "./providers";
import "./styles.css";

export const metadata: Metadata = {
  title: "ClickMasters Blockchain & Web3 Development Company",
  description:
    "Premium blockchain and Web3 development agency. Smart contracts, DApps, NFT marketplaces, crypto wallets — engineered with enterprise-grade security.",
  authors: [{ name: "ClickMasters" }],
  openGraph: {
    title: "ClickMasters Blockchain & Web3 Development Company",
    description:
      "Premium blockchain and Web3 development agency. Smart contracts, DApps, NFT marketplaces, crypto wallets — engineered with enterprise-grade security.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de7261e0-0436-450c-9a3c-9ca03c8b412d/id-preview-6dbeee8e--e52e8bd9-dd8f-4169-9888-7709ce1b9945.lovable.app-1781010839656.png",
    ],
  },
  twitter: {
    card: "summary",
    site: "@ClickMasters",
    title: "ClickMasters Blockchain & Web3 Development Company",
    description:
      "Premium blockchain and Web3 development agency. Smart contracts, DApps, NFT marketplaces, crypto wallets — engineered with enterprise-grade security.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/de7261e0-0436-450c-9a3c-9ca03c8b412d/id-preview-6dbeee8e--e52e8bd9-dd8f-4169-9888-7709ce1b9945.lovable.app-1781010839656.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Providers>
          <SmoothScroll />
          {children}
        </Providers>
      </body>
    </html>
  );
}
