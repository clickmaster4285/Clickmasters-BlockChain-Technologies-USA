"use client";
// components/cms/ErpPageEdits.tsx
// Applies published ERP "edited page" instructions (text, styles, section
// duplicates/moves/removals) to the current route's DOM. Mounted once in the
// root layout, before the page content, so it covers code-owned and created
// pages on first load and on every client-side navigation. Renders nothing.
//
// Live updates: while the tab is visible it polls /api/cms-live (and checks
// immediately when the tab regains focus). A new edits publish is re-applied
// in place; a new publish of a created page is fetched with router.refresh().
// No manual reload needed.
//
// React safety (B6): every change is recorded and reverted in the layout-effect
// cleanup, which React runs during the commit's mutation phase. This component
// is an earlier sibling of the page tree, so the DOM is back to the shape React
// expects before React patches or removes the old route's nodes. Removals only
// hide (display: none !important), moved nodes go back to their original
// parent + sibling, and copies (data-erp-clone) are removed on cleanup.
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useLayoutEffect, useRef, useState } from "react";
import { normalizeEditPath, type ErpEdit } from "@/lib/cms/erp-edits-shared";
import { EditSession, waitForTargets } from "@/lib/cms/erp-edits-dom";

const LIST_TTL_MS = 60_000;
const MAX_HIDE_MS = 1500;
const REFRESH_TIMEOUT_MS = 8000;
const POLL_MS = (() => {
  const v = Number(process.env.NEXT_PUBLIC_CMS_LIVE_POLL_MS ?? 15000);
  return Number.isFinite(v) && v >= 0 ? Math.max(v, v === 0 ? 0 : 3000) : 15000;
})();

const warn = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "production") console.warn("[erp-edits]", ...args);
};

/* ------------------------------ data ------------------------------ */

async function getJson(url: string): Promise<Record<string, unknown>> {
  const res = await fetch(url, { cache: "no-store", headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return ((await res.json()) ?? {}) as Record<string, unknown>;
}

// B1: the list of edited paths, cached 60s (live polling catches new ones).
let pathsCache: { at: number; promise: Promise<Set<string>>; value?: Set<string> } | null = null;

function editedPaths() {
  if (pathsCache && Date.now() - pathsCache.at < LIST_TTL_MS) return pathsCache;
  const entry: NonNullable<typeof pathsCache> = {
    at: Date.now(),
    promise: getJson("/api/erp-edits")
      .then((json) => new Set((Array.isArray(json.paths) ? json.paths : []).filter((p): p is string => typeof p === "string")))
      .catch((error) => {
        warn("could not load edited pages list", error);
        return new Set<string>();
      }),
  };
  entry.promise.then((value) => (entry.value = value));
  pathsCache = entry;
  return entry;
}

async function pageEdits(path: string): Promise<{ edits: ErpEdit[]; hash: string | null }> {
  const json = await getJson(`/api/erp-edits?path=${encodeURIComponent(path)}`);
  return {
    edits: Array.isArray(json.edits) ? (json.edits as ErpEdit[]) : [],
    hash: typeof json.hash === "string" ? json.hash : null,
  };
}

if (typeof window !== "undefined") editedPaths();

/** Hides <main> while edits load (anti-flicker, max 1.5s); returns an idempotent reveal. */
function hideMain(): () => void {
  if (document.documentElement.dataset.antiFlicker === "off") return () => {};
  const main = document.querySelector<HTMLElement>("main");
  if (!main) return () => {};
  const value = main.style.getPropertyValue("opacity");
  const priority = main.style.getPropertyPriority("opacity");
  main.style.setProperty("opacity", "0", "important");
  let revealed = false;
  const timer = setTimeout(() => reveal(), MAX_HIDE_MS);
  function reveal() {
    if (revealed) return;
    revealed = true;
    clearTimeout(timer);
    if (value) main!.style.setProperty("opacity", value, priority);
    else main!.style.removeProperty("opacity");
  }
  return reveal;
}

const cmsPageHash = () => document.querySelector("[data-cms-hash]")?.getAttribute("data-cms-hash") ?? null;

/* ------------------------------- component ------------------------------ */

export default function ErpPageEdits() {
  const pathname = usePathname();
  const router = useRouter();
  // Bumped to re-apply on the same path (live update / after a refresh).
  const [generation, setGeneration] = useState(0);
  const state = useRef({
    session: null as EditSession | null,
    applied: undefined as string | null | undefined, // hash of applied edits; undefined = loading
    forceFetch: false,
    refreshing: false,
  });

  useLayoutEffect(() => {
    const path = normalizeEditPath(pathname ?? "/");
    const session = new EditSession();
    const s = state.current;
    s.session = session;
    s.applied = undefined;
    const force = s.forceFetch;
    s.forceFetch = false;
    let cancelled = false;
    let reveal = () => {};

    // Hide before paint only on navigations where the list is already known,
    // never for live re-applies (generation > 0 keeps the page visible).
    const paths = editedPaths();
    if (!force && paths.value?.has(path)) reveal = hideMain();

    (async () => {
      const edited = force || (paths.value ?? (await paths.promise)).has(path);
      if (cancelled) return;
      if (!edited) {
        s.applied = null;
        return;
      }
      const { edits, hash } = await pageEdits(path);
      if (cancelled) return;
      if (edits.length === 0) {
        s.applied = hash;
        return;
      }
      const resolved = await waitForTargets(edits, () => cancelled);
      if (cancelled || !resolved) return;
      // Reveal and apply in the same task: no paint in between.
      reveal();
      session.apply(resolved);
      s.applied = hash;
    })()
      .catch((error) => {
        warn("could not apply edits", error);
        if (!cancelled) s.applied = null;
      })
      .finally(() => reveal());

    return () => {
      cancelled = true;
      reveal();
      session.revert();
      if (s.session === session) s.session = null;
    };
  }, [pathname, generation]);

  // Live updates from the ERP.
  useEffect(() => {
    if (!POLL_MS) return;
    const path = normalizeEditPath(pathname ?? "/");
    const s = state.current;
    let stopped = false;
    let inFlight = false;

    const refreshCreatedPage = (nextHash: string | null) => {
      s.refreshing = true;
      // Put the DOM back the way React rendered it before React reconciles.
      s.session?.revert();
      startTransition(() => router.refresh());
      const started = Date.now();
      const done = () => {
        observer.disconnect();
        clearInterval(timer);
        s.refreshing = false;
        s.forceFetch = true;
        setGeneration((g) => g + 1);
      };
      const check = () => {
        if (cmsPageHash() === nextHash || Date.now() - started > REFRESH_TIMEOUT_MS) done();
      };
      const observer = new MutationObserver(check);
      observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["data-cms-hash"] });
      const timer = setInterval(check, 500);
    };

    const check = async () => {
      if (stopped || inFlight || s.refreshing || document.visibilityState !== "visible") return;
      if (s.applied === undefined) return; // still applying
      inFlight = true;
      try {
        const domHash = cmsPageHash();
        const qs = new URLSearchParams({ path, ...(domHash ? { page: "1" } : {}) });
        const json = await getJson(`/api/cms-live?${qs}`);
        if (stopped || s.refreshing || s.applied === undefined) return;
        const pageHash = typeof json.page === "string" ? json.page : null;
        if (domHash && pageHash && pageHash !== domHash) {
          refreshCreatedPage(pageHash);
          return;
        }
        const editsHash = typeof json.edits === "string" ? json.edits : null;
        if (editsHash !== s.applied) {
          pathsCache = null; // list changed too
          s.forceFetch = editsHash !== null;
          setGeneration((g) => g + 1);
        }
      } catch (error) {
        warn("live update check failed", error);
      } finally {
        inFlight = false;
      }
    };

    const timer = setInterval(check, POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && check();
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      stopped = true;
      clearInterval(timer);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pathname, router]);

  return null;
}
