"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { currentSourcePage, trackEvent } from "@/lib/analytics";
import { CmsHeaderLinks, CmsMobileLinks } from "@/components/cms/CmsNavigation";
import {
  primaryNav,
  type MenuLink,
  type MenuSection,
} from "@/components/landing/nav-config";

/** Pages whose header CTA is reported as a consulting CTA click. */
const CONSULTING_PAGES = new Set([
  "/service/blockchain-consulting",
  "/faqs/blockchain-development-consulting-enterprise",
]);

/**
 * The header CTA jumps to the on-page enquiry section only when the current
 * page actually has one (id="contact"); everywhere else it opens /contact.
 */
function useContactHref() {
  const pathname = usePathname();
  const [href, setHref] = useState("/contact");

  useEffect(() => {
    setHref(document.getElementById("contact") ? "#contact" : "/contact");
  }, [pathname]);

  const onCtaClick = () => {
    if (!CONSULTING_PAGES.has(pathname)) return;
    trackEvent("consulting_cta_click", {
      source_page: currentSourcePage(),
      cta_location: "header",
      destination_type:
        href === "#contact" ? "on_page_section" : "contact_page",
    });
  };

  // The consulting pages must not describe the enquiry as "free" (handoff §5).
  // Labels are the primary CTAs from the consulting handoff (section 5).
  const label =
    pathname === "/service/blockchain-consulting"
      ? "Request a Consulting Discussion"
      : pathname === "/faqs/blockchain-development-consulting-enterprise"
        ? "Discuss Your Blockchain Use Case"
        : "Book a Free Strategy Call";

  return { href, onCtaClick, label };
}

type ContactCta = ReturnType<typeof useContactHref>;

const HOVER_CLOSE_DELAY = 140;

const isCurrent = (pathname: string, href: string) =>
  !href.includes("#") && pathname === href;

function Badge({ text }: { text: string }) {
  return (
    <span className="ml-2 inline-flex shrink-0 items-center rounded-full border border-amber-border bg-amber-glow px-1.5 py-px align-middle text-[10px] font-semibold uppercase tracking-[0.08em] text-amber-dim">
      {text}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop mega menu                                                          */
/* -------------------------------------------------------------------------- */

function MegaLink({ link, pathname }: { link: MenuLink; pathname: string }) {
  const Icon = link.icon;
  const current = isCurrent(pathname, link.href);
  return (
    <Link
      href={link.href}
      data-nav-link
      aria-current={current ? "page" : undefined}
      className="group/link flex items-start gap-3 rounded-2xl p-2.5 outline-none transition-colors duration-150 hover:bg-amber-glow focus-visible:bg-amber-glow focus-visible:ring-2 focus-visible:ring-amber-base/60 aria-[current=page]:bg-amber-glow"
    >
      {Icon && (
        <span
          aria-hidden="true"
          className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-border bg-bg-base text-amber-base transition-transform duration-200 group-hover/link:scale-105 group-focus-visible/link:scale-105"
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center text-sm font-semibold leading-5 text-text-primary transition-colors group-hover/link:text-amber-dim group-focus-visible/link:text-amber-dim">
          {link.label}
          {link.badge && <Badge text={link.badge} />}
        </span>
        {link.desc && (
          <span className="mt-0.5 block text-[13px] leading-5 text-text-secondary">
            {link.desc}
          </span>
        )}
      </span>
    </Link>
  );
}

function MegaPanel({
  section,
  pathname,
  cta,
}: {
  section: MenuSection;
  pathname: string;
  cta: ContactCta;
}) {
  const columns = section.groups.filter((g) => !g.compact);
  const chips = section.groups.filter((g) => g.compact);
  const colClass =
    columns.length >= 3
      ? "grid-cols-3"
      : columns.length === 2
        ? "grid-cols-2"
        : "grid-cols-1";

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-bg-base/[0.98] shadow-[0_24px_80px_-12px_rgba(15,23,42,0.22)] backdrop-blur-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-amber-base/70 to-transparent"
      />
      <div
        data-lenis-prevent
        className="grid max-h-[calc(100vh-7.5rem)] grid-cols-[280px_1fr] overflow-y-auto overscroll-contain 2xl:grid-cols-[300px_1fr]"
      >
        {/* Intro card */}
        <aside className="relative flex flex-col border-r border-border bg-bg-surface/70 p-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-amber-glow blur-3xl"
          />
          <p className="relative font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-amber-dim">
            {section.label}
          </p>
          <p className="relative mt-3 font-display text-lg font-semibold leading-snug text-text-primary">
            {section.summary}
          </p>
          {section.overview && (
            <Link
              href={section.overview.href}
              data-nav-link
              className="group/ov relative mt-4 inline-flex w-fit items-center gap-1.5 rounded-full text-sm font-semibold text-amber-dim outline-none hover:text-text-primary focus-visible:ring-2 focus-visible:ring-amber-base/60"
            >
              {section.overview.label}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover/ov:translate-x-0.5"
              />
            </Link>
          )}
          {section.note && (
            <p className="relative mt-4 rounded-xl border border-border bg-bg-base p-3 text-xs leading-5 text-text-secondary">
              {section.note}
            </p>
          )}
          <div className="relative mt-auto pt-6">
            <Link
              href={cta.href}
              data-nav-link
              onClick={cta.onCtaClick}
              className="flex items-center justify-between gap-2 rounded-2xl bg-text-primary px-4 py-3 text-sm font-semibold text-bg-base outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-amber-base focus-visible:ring-offset-2"
            >
              {cta.label}
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-amber-light"
              />
            </Link>
          </div>
        </aside>

        {/* Link columns */}
        <div className="p-5 2xl:p-6">
          <div className={`grid gap-x-4 gap-y-6 ${colClass}`}>
            {columns.map((group) => {
              const headingId = `nav-${section.id}-${group.heading
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`;
              return (
                <div key={group.heading}>
                  <p
                    id={headingId}
                    className="px-2.5 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary"
                  >
                    {group.heading}
                  </p>
                  <ul aria-labelledby={headingId} className="space-y-0.5">
                    {group.links.map((link) => (
                      <li key={`${link.label}-${link.href}`}>
                        <MegaLink link={link} pathname={pathname} />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {chips.map((group) => {
            const headingId = `nav-${section.id}-${group.heading
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <div
                key={group.heading}
                className="mt-5 flex flex-wrap items-center gap-2 border-t border-border px-2.5 pt-4"
              >
                <p
                  id={headingId}
                  className="mr-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary"
                >
                  {group.heading}
                </p>
                <ul
                  aria-labelledby={headingId}
                  className="flex flex-wrap gap-2"
                >
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        data-nav-link
                        aria-current={
                          isCurrent(pathname, link.href) ? "page" : undefined
                        }
                        className="inline-flex rounded-full border border-border bg-bg-base px-3 py-1.5 text-[13px] font-medium text-text-secondary outline-none transition-colors hover:border-amber-border hover:bg-amber-glow hover:text-amber-dim focus-visible:ring-2 focus-visible:ring-amber-base/60 aria-[current=page]:border-amber-border aria-[current=page]:text-amber-dim"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DesktopMenu({ pathname, cta }: { pathname: string; cta: ContactCta }) {
  const [openId, setOpenId] = useState<string | null>(null);
  // Panels are mounted on first hover/focus so their markup isn't shipped in
  // every page's HTML; once mounted they stay mounted.
  const [mounted, setMounted] = useState<Set<string>>(() => new Set());
  const rootRef = useRef<HTMLUListElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const focusFirstOnOpen = useRef(false);

  const mount = useCallback((id: string) => {
    setMounted((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const open = useCallback(
    (id: string) => {
      window.clearTimeout(closeTimer.current);
      mount(id);
      setOpenId(id);
    },
    [mount],
  );

  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpenId(null);
  }, []);

  const trigger = (id: string) =>
    document.getElementById(`nav-trigger-${id}`) as HTMLButtonElement | null;

  const panelLinks = (id: string) =>
    Array.from(
      document
        .getElementById(`nav-panel-${id}`)
        ?.querySelectorAll<HTMLAnchorElement>("a[data-nav-link]") ?? [],
    );

  // Close on navigation.
  useEffect(() => close(), [pathname, close]);

  // Close on outside click / tap.
  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openId, close]);

  // Move focus into a panel opened from the keyboard.
  useEffect(() => {
    if (!openId || !focusFirstOnOpen.current) return;
    focusFirstOnOpen.current = false;
    const raf = requestAnimationFrame(() => panelLinks(openId)[0]?.focus());
    return () => cancelAnimationFrame(raf);
  }, [openId]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const onTriggerKeyDown = (
    e: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const id = primaryNav[index].id;
    const move = (delta: number) => {
      const next =
        primaryNav[(index + delta + primaryNav.length) % primaryNav.length];
      trigger(next.id)?.focus();
      if (openId) open(next.id);
    };
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        focusFirstOnOpen.current = true;
        if (openId === id) panelLinks(id)[0]?.focus();
        else open(id);
        break;
      case "ArrowRight":
        e.preventDefault();
        move(1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        move(-1);
        break;
      case "Home":
        e.preventDefault();
        trigger(primaryNav[0].id)?.focus();
        break;
      case "End":
        e.preventDefault();
        trigger(primaryNav[primaryNav.length - 1].id)?.focus();
        break;
      case "Escape":
        if (openId) {
          e.preventDefault();
          close();
        }
        break;
    }
  };

  const onPanelKeyDown = (
    e: ReactKeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
    const links = panelLinks(id);
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    const focusAt = (n: number) =>
      links[(n + links.length) % links.length]?.focus();
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        trigger(id)?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        focusAt(i + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (i <= 0) trigger(id)?.focus();
        else focusAt(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusAt(0);
        break;
      case "End":
        e.preventDefault();
        focusAt(links.length - 1);
        break;
    }
  };

  return (
    <ul ref={rootRef} className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
      {primaryNav.map((section, index) => {
        const isOpen = openId === section.id;
        const isMounted = mounted.has(section.id);
        const panelId = `nav-panel-${section.id}`;
        return (
          <li
            key={section.id}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              open(section.id);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              cancelClose();
              closeTimer.current = window.setTimeout(close, HOVER_CLOSE_DELAY);
            }}
            onFocus={() => mount(section.id)}
            onBlur={(e) => {
              const next = e.relatedTarget as Node | null;
              if (next && !e.currentTarget.contains(next) && isOpen) close();
            }}
          >
            <button
              type="button"
              id={`nav-trigger-${section.id}`}
              aria-expanded={isOpen}
              aria-controls={isMounted ? panelId : undefined}
              onClick={() => (isOpen ? close() : open(section.id))}
              onKeyDown={(e) => onTriggerKeyDown(e, index)}
              className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-base/60 2xl:px-3 2xl:text-sm ${
                isOpen
                  ? "bg-amber-glow text-amber-dim"
                  : "text-text-secondary hover:bg-amber-glow hover:text-text-primary"
              }`}
            >
              {section.label}
              <ChevronDown
                aria-hidden="true"
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isMounted && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={`nav-trigger-${section.id}`}
                onKeyDown={(e) => onPanelKeyDown(e, section.id)}
                onPointerEnter={cancelClose}
                // Same-page hash links don't change the pathname; close explicitly.
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("a")) close();
                }}
                className={`absolute inset-x-0 top-full z-50 pt-3 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
                  isOpen
                    ? "visible translate-y-0 opacity-100"
                    : "pointer-events-none invisible -translate-y-1 opacity-0"
                }`}
              >
                <MegaPanel section={section} pathname={pathname} cta={cta} />
              </div>
            )}
          </li>
        );
      })}
      <CmsHeaderLinks />
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile accordion                                                           */
/* -------------------------------------------------------------------------- */

function MobileMenu({
  pathname,
  cta,
  onClose,
}: {
  pathname: string;
  cta: ContactCta;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      id="mobile-nav"
      data-lenis-prevent
      className="absolute inset-x-3 top-[calc(100%+0.75rem)] max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-bg-base shadow-[0_24px_60px_-12px_rgba(15,23,42,0.25)] sm:inset-x-6 xl:hidden"
    >
      <ul className="divide-y divide-border px-2 py-2">
        {primaryNav.map((section) => {
          const isOpen = expanded === section.id;
          const regionId = `mobile-nav-${section.id}`;
          const buttonId = `mobile-nav-trigger-${section.id}`;
          return (
            <li key={section.id}>
              <h2 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  onClick={() => setExpanded(isOpen ? null : section.id)}
                  className="flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-3.5 text-left text-base font-semibold text-text-primary outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-base/60 aria-expanded:text-amber-dim"
                >
                  {section.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 text-text-secondary transition-transform duration-200 motion-reduce:transition-none ${
                      isOpen ? "rotate-180 text-amber-dim" : ""
                    }`}
                  />
                </button>
              </h2>
              <div
                id={regionId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-3"
              >
                {section.note && (
                  <p className="mx-3 mb-3 rounded-xl border border-border bg-bg-surface p-3 text-xs leading-5 text-text-secondary">
                    {section.note}
                  </p>
                )}
                {section.groups.map((group) => (
                  <div key={group.heading} className="px-1 pt-2">
                    <p className="px-2 pb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-text-secondary">
                      {group.heading}
                    </p>
                    <ul
                      className={
                        group.compact
                          ? "flex flex-wrap gap-2 px-2 pb-1"
                          : "grid gap-0.5 sm:grid-cols-2"
                      }
                    >
                      {group.links.map((link) => {
                        const Icon = link.icon;
                        const current = isCurrent(pathname, link.href);
                        return (
                          <li key={`${link.label}-${link.href}`}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              aria-current={current ? "page" : undefined}
                              className={
                                group.compact
                                  ? "inline-flex rounded-full border border-border px-3 py-2 text-sm text-text-secondary outline-none active:bg-amber-glow focus-visible:ring-2 focus-visible:ring-amber-base/60"
                                  : "flex min-h-11 items-center gap-3 rounded-xl px-2 py-2 outline-none active:bg-amber-glow focus-visible:ring-2 focus-visible:ring-amber-base/60 aria-[current=page]:bg-amber-glow"
                              }
                            >
                              {Icon && !group.compact && (
                                <span
                                  aria-hidden="true"
                                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-amber-border text-amber-base"
                                >
                                  <Icon className="h-4 w-4" />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="flex flex-wrap items-center text-sm font-medium text-text-primary">
                                  {link.label}
                                  {link.badge && <Badge text={link.badge} />}
                                </span>
                                {link.desc && !group.compact && (
                                  <span className="block text-xs leading-5 text-text-secondary">
                                    {link.desc}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
                {section.overview && (
                  <Link
                    href={section.overview.href}
                    onClick={onClose}
                    className="mx-3 mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-dim outline-none focus-visible:ring-2 focus-visible:ring-amber-base/60"
                  >
                    {section.overview.label}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
        <CmsMobileLinks onNavigate={onClose} />
      </ul>

      <div className="sticky bottom-0 border-t border-border bg-bg-base/95 p-3 backdrop-blur">
        <Link
          href={cta.href}
          onClick={() => {
            cta.onCtaClick();
            onClose();
          }}
          className="flex items-center justify-center gap-2 rounded-full bg-amber-base px-4 py-3 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-base focus-visible:ring-offset-2"
        >
          {cta.label}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Header                                                                     */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contactCta = useContactHref();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => setMobileOpen(false), [pathname]);

  // Mobile menu: Escape closes, outside tap closes, page behind doesn't scroll.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMobileOpen(false);
    };
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-4 z-50 flex justify-center"
    >
      <nav
        aria-label="Primary"
        className={`relative flex w-[97vw] items-center justify-between gap-3 rounded-full border border-border px-3 py-2.5 backdrop-blur-xl transition-[background-color,box-shadow] duration-300 md:w-[90vw] xl:w-[96vw] 2xl:w-[90vw] ${
          scrolled || mobileOpen ? "bg-bg-base/80 shadow-soft" : "bg-bg-base/5"
        }`}
      >
        <Link
          href="/"
          aria-label="ClickMasters home"
          className="flex shrink-0 items-center rounded-full pl-2 outline-none focus-visible:ring-2 focus-visible:ring-amber-base/60"
        >
          <Image
            src="/media/logo.webp"
            alt="ClickMasters Logo"
            width={170}
            height={45}
            priority
            className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105 2xl:h-10"
          />
        </Link>

        <DesktopMenu pathname={pathname} cta={contactCta} />

        <div className="flex items-center gap-2">
          <Link
            href={contactCta.href}
            onClick={contactCta.onCtaClick}
            className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-amber-base px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(217,119,6,0.55)] outline-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-dim focus-visible:ring-2 focus-visible:ring-amber-base focus-visible:ring-offset-2 sm:inline-flex"
          >
            {contactCta.label}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="grid h-10 w-10 place-items-center rounded-full text-text-primary outline-none transition-colors hover:bg-amber-glow focus-visible:ring-2 focus-visible:ring-amber-base/60 xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileOpen && (
          <MobileMenu
            pathname={pathname}
            cta={contactCta}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </nav>
    </header>
  );
}
