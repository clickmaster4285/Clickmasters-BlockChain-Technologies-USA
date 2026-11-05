import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { slugifyCategory } from "@/lib/pagination";

const FILTER_KEYS = new Set(["category", "letter", "search", "page"]);
const QUERY_KEYS = ["page", "category", "letter", "search"] as const;
const LISTING_REWRITE_HEADER = "x-listing-path-rewrite";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  if (pathname === "/comparison/cex-vs-dex-exchange") {
    const url = request.nextUrl.clone();
    url.pathname = "/comparison/crypto-exchange-cex-vs-dex";
    return NextResponse.redirect(url, 301);
  }

  const hasListingQuery = QUERY_KEYS.some((key) => searchParams.has(key));

  if (hasListingQuery && request.headers.get(LISTING_REWRITE_HEADER) !== "1") {
    const parts: string[] = [];

    for (const key of ["category", "letter", "search"] as const) {
      const value = searchParams.get(key)?.trim().toLowerCase();
      if (!value || value === "all") continue;
      const segment =
        key === "category" ? slugifyCategory(value) : encodeURIComponent(value);
      if (!segment) continue;
      parts.push(key, segment);
    }

    const page = Number(searchParams.get("page"));
    if (Number.isFinite(page) && page > 1) {
      parts.push("page", String(Math.floor(page)));
    }

    const url = request.nextUrl.clone();
    url.pathname = parts.length
      ? `${pathname.replace(/\/$/, "")}/${parts.join("/")}`
      : pathname;
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length >= 3) {
    const params = new URLSearchParams();
    const canonicalSegments = [segments[0]];
    let index = 1;
    let valid = true;
    let redirectCategory = false;

    while (index < segments.length) {
      const key = segments[index]?.toLowerCase();
      const value = segments[index + 1];

      if (!key || !value || !FILTER_KEYS.has(key)) {
        valid = false;
        break;
      }

      if (key === "category") {
        const slug = slugifyCategory(value);
        if (!slug || slug === "all") {
          valid = false;
          break;
        }
        if (value !== slug) redirectCategory = true;
        params.set(key, slug);
        canonicalSegments.push(key, slug);
      } else {
        let decoded = value;
        try {
          decoded = decodeURIComponent(value);
        } catch {
          decoded = value;
        }
        params.set(key, decoded);
        canonicalSegments.push(key, decoded);
      }

      index += 2;
    }

    if (valid && index === segments.length) {
      const url = request.nextUrl.clone();

      if (redirectCategory) {
        url.pathname = `/${canonicalSegments.join("/")}`;
        url.search = "";
        return NextResponse.redirect(url, 301);
      }

      url.pathname = `/${segments[0]}`;
      url.search = params.toString();
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(LISTING_REWRITE_HEADER, "1");
      return NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
