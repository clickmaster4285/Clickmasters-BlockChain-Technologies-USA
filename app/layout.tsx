import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { Providers } from "./providers";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://clickmastersblockchaintechnologies.com"),
  title: "ClickMasters Blockchain & Web3 Development Company",
  description:
    "Premium blockchain and Web3 development agency. Smart contracts, DApps, NFT marketplaces, crypto wallets — engineered with enterprise-grade security.",
  authors: [{ name: "ClickMasters" }],
  verification: {
    google: "OTGeetIUGUb8E8ejJ8bHzYUfGlYl6SlUGa6-FdtJ82E",
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
        <ViewTransitions>
          <Providers>
            <SmoothScroll />
            {children}
          </Providers>
        </ViewTransitions>
      </body>
    </html>
  );
}
