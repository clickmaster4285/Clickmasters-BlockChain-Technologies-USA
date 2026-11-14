// lib/cms/erp-edits-dom.ts
// Browser-side engine for ERP edited pages (B3/B4): resolves selectors and
// applies / reverts edits on the live DOM, in the ERP editor's exact order.
// No React here; components/cms/ErpPageEdits.tsx drives it.
import { isCopySelector, isSafeStyle, type ErpEdit } from "./erp-edits-shared";

const MAX_WAIT_FOR_DOM_MS = 1500;

const warn = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "production")
    console.warn("[erp-edits]", ...args);
};

/* ---------------------------- DOM helpers ---------------------------- */

type Styled = HTMLElement | SVGElement;

export function query(selector: string): Styled | null {
  try {
    const el = document.querySelector(selector);
    return el && "style" in el ? (el as Styled) : null;
  } catch {
    return null; // invalid selector
  }
}

export type Resolved = {
  edit: ErpEdit;
  el: Styled | null;
  target: Styled | null;
};

/** Pass 1: resolve every plain selector against the original DOM. Copy selectors stay null. */
export function resolvePlain(edits: ErpEdit[]): {
  resolved: Resolved[];
  missing: number;
} {
  let missing = 0;
  const resolved = edits.map((edit) => {
    const el = isCopySelector(edit.selector) ? null : query(edit.selector);
    const target =
      edit.type === "sectionMove" && !isCopySelector(edit.target)
        ? query(edit.target)
        : null;
    if (!el && !isCopySelector(edit.selector)) missing++;
    if (edit.type === "sectionMove" && !target && !isCopySelector(edit.target))
      missing++;
    return { edit, el, target };
  });
  return { resolved, missing };
}

/** Waits briefly until the route's content is in the DOM (all plain selectors match, or the deadline). */
export function waitForTargets(
  edits: ErpEdit[],
  isCancelled: () => boolean,
): Promise<Resolved[] | null> {
  return new Promise((resolve) => {
    let result = resolvePlain(edits);
    if (result.missing === 0) return resolve(result.resolved);
    let frame = 0;
    const finish = () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
      resolve(isCancelled() ? null : result.resolved);
    };
    const observer = new MutationObserver(() => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        result = resolvePlain(edits);
        if (result.missing === 0 || isCancelled()) finish();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    const timer = setTimeout(() => {
      if (result.missing)
        warn(`${result.missing} edit target(s) not found on this page`);
      finish();
    }, MAX_WAIT_FOR_DOM_MS);
  });
}

/* ---------------------------- apply / revert ---------------------------- */

export class EditSession {
  // First-seen value of every inline property we touched: [value, priority].
  private styles = new Map<Styled, Map<string, [string, string]>>();
  private undo: (() => void)[] = [];

  private setStyle(el: Styled, property: string, value: string) {
    let props = this.styles.get(el);
    if (!props) this.styles.set(el, (props = new Map()));
    if (!props.has(property)) {
      props.set(property, [
        el.style.getPropertyValue(property),
        el.style.getPropertyPriority(property),
      ]);
    }
    el.style.setProperty(property, value, "important");
  }

  private editElement(
    el: Styled,
    edit: Extract<ErpEdit, { type: "elementEdit" }>,
  ) {
    if (typeof edit.text === "string") {
      const nodes = Array.from(el.childNodes);
      this.undo.push(() => el.replaceChildren(...nodes));
      el.textContent = edit.text; // never innerHTML
    }
    for (const [property, value] of edit.styles) {
      if (!isSafeStyle(property, value)) continue;
      this.setStyle(el, property, value);
      // Theme rules on descendants would otherwise win for these two.
      if (property === "color" || property === "text-decoration") {
        el.querySelectorAll("*").forEach((child) => {
          if ("style" in child) this.setStyle(child as Styled, property, value);
        });
      }
    }
  }

  private move(el: Styled, target: Styled, position: "before" | "after") {
    const parent = el.parentNode;
    if (!parent || target === el || el.contains(target)) return;
    const next = el.nextSibling;
    this.undo.push(() => {
      try {
        if (next && next.parentNode === parent) parent.insertBefore(el, next);
        else parent.appendChild(el);
      } catch (error) {
        warn("could not restore moved section", error);
      }
    });
    if (position === "before") target.before(el);
    else target.after(el);
  }

  /** B4, in the ERP editor's order. */
  apply(resolved: Resolved[]) {
    const live = (el: Styled | null, selector: string) => {
      const node = el ?? (isCopySelector(selector) ? query(selector) : null);
      return node?.isConnected ? node : null;
    };

    // 1. Duplicates, in order (clones of the original, unedited elements).
    for (const { edit, el } of resolved) {
      if (edit.type !== "sectionDuplicate" || !/^[A-Za-z0-9-]+$/.test(edit.id))
        continue;
      const source = live(el, edit.selector);
      if (!source) continue;
      const clone = source.cloneNode(true) as Styled;
      clone.setAttribute("data-erp-clone", edit.id);
      source.after(clone);
      this.undo.push(() => clone.remove());
    }
    // 2. Pass 2 happens lazily in live(): copy selectors resolve now that copies exist.
    // 3. Element edits, in order (originals and copies).
    for (const { edit, el } of resolved) {
      if (edit.type !== "elementEdit") continue;
      const node = live(el, edit.selector);
      if (node) this.editElement(node, edit);
    }
    // 4. Moves and removals, in order.
    for (const { edit, el, target } of resolved) {
      if (edit.type === "sectionRemove") {
        const node = live(el, edit.selector);
        if (node) this.setStyle(node, "display", "none");
      } else if (edit.type === "sectionMove") {
        const node = live(el, edit.selector);
        const to = live(target, edit.target);
        if (node && to) this.move(node, to, edit.position);
      }
    }
  }

  revert() {
    // Reverse order: each change is undone against the DOM it saw.
    for (const step of this.undo.reverse()) step();
    this.styles.forEach((props, el) => {
      props.forEach(([value, priority], property) => {
        if (value) el.style.setProperty(property, value, priority);
        else el.style.removeProperty(property);
      });
      if (el.getAttribute("style") === "") el.removeAttribute("style");
    });
    this.undo = [];
    this.styles.clear();
  }
}
