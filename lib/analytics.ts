/**
 * Thin analytics event helper.
 *
 * The site has no analytics installation of its own. Events are pushed to an
 * existing GTM `dataLayer` (or `gtag`) only when one is already present on the
 * page, so this never adds a second installation and never bypasses the
 * consent settings configured in that tag.
 *
 * Never pass personal data (name, email, phone, free-text project content)
 * as a parameter.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (command: "event", name: string, params?: EventParams) => void;
};

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;

  const w = window as AnalyticsWindow;

  try {
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...params });
    } else if (typeof w.gtag === "function") {
      w.gtag("event", name, params);
    }
  } catch {
    // Analytics must never break the page or the enquiry flow.
  }
}

/** Path only — never the query string, which could carry identifiers. */
export function currentSourcePage() {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}
