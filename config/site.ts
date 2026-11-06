export const siteConfig = {
  name: "ClickMasters",
  url: "https://clickmastersblockchaintechnologies.com",
  description:
    "Blockchain and Web3 development services covering smart contracts, decentralized applications, crypto wallets, and enterprise systems.",
  logo: "/media/logo.webp",
  /**
   * Default social-share / structured-data image, used whenever a page has no
   * image of its own (or its configured image file does not exist). The logo
   * (256x51) is too small for og:image and for Google's Article image
   * guidelines, so a full-size brand image is used instead.
   */
  shareImage: {
    path: "/media/hero.webp",
    width: 1920,
    height: 1120,
  },
  /**
   * Official company profile URLs for Organization `sameAs`
   * (e.g. LinkedIn, X, GitHub, Clutch). Only add profiles the company actually
   * owns and controls — `sameAs` is emitted only when this list is non-empty.
   */
  sameAs: [] as string[],
} as const;
