// lib/cms/coalesce.ts
// Tiny in-memory request coalescer for the browser-facing ERP proxies: every
// open tab polls for live updates, so identical ERP requests made within a
// few seconds share one upstream call instead of hitting the ERP each time.
const TTL_MS = 5000;
const MAX_ENTRIES = 500;
const entries = new Map<string, { at: number; promise: Promise<unknown> }>();

export function coalesce<T>(key: string, run: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const hit = entries.get(key);
  if (hit && now - hit.at < TTL_MS) return hit.promise as Promise<T>;
  if (entries.size >= MAX_ENTRIES) {
    for (const [k, v] of entries) if (now - v.at >= TTL_MS) entries.delete(k);
    if (entries.size >= MAX_ENTRIES) entries.clear();
  }
  const promise = run();
  entries.set(key, { at: now, promise });
  promise.catch(() => entries.delete(key));
  return promise;
}
