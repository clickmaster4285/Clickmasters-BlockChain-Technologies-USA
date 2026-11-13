"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { currentSourcePage, trackEvent } from "@/lib/analytics";

type CtaLocation = "header" | "hero" | "body" | "sticky" | "footer";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  ctaLocation: CtaLocation;
};

/** Link that reports a `consulting_cta_click` event when activated. */
export default function TrackedLink({
  ctaLocation,
  href,
  onClick,
  ...props
}: TrackedLinkProps) {
  const target = typeof href === "string" ? href : href.pathname || "";

  return (
    <Link
      href={href}
      onClick={(event) => {
        trackEvent("consulting_cta_click", {
          source_page: currentSourcePage(),
          cta_location: ctaLocation,
          destination_type: target.startsWith("#")
            ? "on_page_section"
            : target.startsWith("/contact")
              ? "contact_page"
              : "internal_page",
        });
        onClick?.(event);
      }}
      {...props}
    />
  );
}
