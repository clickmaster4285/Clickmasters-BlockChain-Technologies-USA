import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const FILTER_KEYS = new Set(["category", "letter", "search", "page"]);
const QUERY_KEYS = ["page", "category", "letter", "search"] as const;

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  const hasListingQuery = QUERY_KEYS.some((key) => searchParams.has(key));

  if (hasListingQuery) {
    const parts: string[] = [];

    for (const key of ["category", "letter", "search"] as const) {
      const value = searchParams.get(key)?.trim().toLowerCase();
      if (!value || value === "all") continue;
      parts.push(key, encodeURIComponent(value));
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
    let index = 1;
    let valid = true;

    while (index < segments.length) {
      const key = segments[index]?.toLowerCase();
      const value = segments[index + 1];

      if (!key || !value || !FILTER_KEYS.has(key)) {
        valid = false;
        break;
      }

      params.set(key, decodeURIComponent(value));
      index += 2;
    }

    if (valid && index === segments.length) {
      const url = request.nextUrl.clone();
      url.pathname = `/${segments[0]}`;
      url.search = params.toString();
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
