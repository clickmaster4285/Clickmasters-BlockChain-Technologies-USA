// components/cms/CmsGridSections.tsx
// List-style CMS sections (A4) in the site's card language (glow-card, amber
// accents, mono numbering): features, services, benefits, process, cards,
// bento, stats, logos, gallery, team, testimonials, timeline, pricing, posts.
// Each returns null when it has nothing to show, unless `required`.
import { icons, ArrowRight, Check, Hexagon, Quote } from "lucide-react";
import { CmsButton, CmsImg, CmsSection, SectionHeader, SmartLink, gridCols, settingStr, type Settings } from "./CmsSection";
import { items, pick, safeHref, safeImage, type Content } from "./cmsContent";

export type SectionProps = { c: Content; settings: Settings; id?: string; required?: boolean };

const header = (c: Content) => (
  <SectionHeader eyebrow={pick(c, "eyebrow")} heading={pick(c, "heading", "title")} description={pick(c, "description")} />
);

const num = (i: number) => String(i + 1).padStart(2, "0");

/** ERP icon: a lucide name ("shield-check", "Zap"), an emoji, or nothing. */
function ItemIcon({ icon, className = "h-5 w-5" }: { icon: string; className?: string }) {
  if (icon) {
    if (/^[a-z][a-z0-9-]*$/i.test(icon)) {
      const name = icon
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("") as keyof typeof icons;
      const Lucide = icons[name];
      if (Lucide) return <Lucide className={className} strokeWidth={1.5} />;
    }
    if ([...icon].length <= 4) return <span className="text-xl leading-none" aria-hidden>{icon}</span>;
  }
  return <Hexagon className={className} strokeWidth={1.5} />;
}

/* ------------------------- features / services / … ------------------------- */

export function CmsFeaturesSection({ c, settings, id, required, type }: SectionProps & { type: string }) {
  const list = items(c)
    .map((i) => ({
      icon: pick(i, "icon"),
      title: pick(i, "title", "name"),
      description: pick(i, "description"),
      image: safeImage(pick(i, "image")),
      url: safeHref(pick(i, "url", "link")),
      linkLabel: pick(i, "linkLabel"),
    }))
    .filter((i) => i.title);
  if (!list.length && !required) return null;

  const numbered = type === "process";
  const checks = type === "benefits";
  const cards = type === "cards";

  return (
    <CmsSection settings={settings} id={id}>
      {header(c)}
      <div className={`grid gap-6 ${gridCols(settings, list.length === 4 ? 4 : list.length === 2 ? 2 : 3)}`}>
        {list.map((item, i) => (
          <article key={i} className="group glow-card flex flex-col">
            {cards && item.image && (
              <CmsImg src={item.image} className="-mx-6 -mt-6 mb-5 aspect-[16/10] w-[calc(100%+3rem)] max-w-none object-cover" />
            )}
            <div className="relative flex flex-1 flex-col">
              <div className="mb-4 flex items-center justify-between gap-4">
                {numbered ? (
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-amber-border/40 bg-amber-glow font-mono text-sm font-semibold text-amber-base">
                    {num(i)}
                  </span>
                ) : checks ? (
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-border/40 bg-emerald-glow text-emerald-base">
                    <Check className="h-5 w-5" />
                  </span>
                ) : !cards ? (
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-amber-border/40 bg-amber-glow text-amber-base">
                    <ItemIcon icon={item.icon} />
                  </span>
                ) : null}
                {!cards && <span className="font-mono text-[11px] font-semibold text-text-muted">{num(i)}</span>}
              </div>
              {!cards && item.image && (
                <CmsImg src={item.image} className="mb-4 aspect-[16/10] w-full rounded-xl border border-border object-cover" />
              )}
              <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>}
              {item.url && (
                <SmartLink
                  href={item.url}
                  className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-amber-base transition-colors hover:text-amber-dim"
                >
                  {item.linkLabel || "Learn more"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </SmartLink>
              )}
            </div>
          </article>
        ))}
      </div>
    </CmsSection>
  );
}

/* ---------------------------------- bento --------------------------------- */

const SPANS: Record<string, string> = {
  "1x1": "",
  "2x1": "md:col-span-2",
  "1x2": "md:row-span-2",
  "2x2": "md:col-span-2 md:row-span-2",
  "3x1": "md:col-span-3",
};

export function CmsBentoSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({ title: pick(i, "title"), description: pick(i, "description"), span: pick(i, "span"), image: safeImage(pick(i, "image")) }))
    .filter((i) => i.title);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id}>
      {header(c)}
      <div className="grid auto-rows-[minmax(11rem,auto)] grid-cols-1 gap-5 md:grid-cols-3">
        {list.map((item, i) => (
          <article key={i} className={`group glow-card flex flex-col justify-end ${SPANS[item.span] ?? ""}`}>
            {item.image && <CmsImg src={item.image} className="absolute inset-0 h-full w-full object-cover opacity-25" />}
            <div className="relative">
              <span className="font-mono text-[11px] font-semibold text-amber-base">{num(i)}</span>
              <h3 className="mt-2 text-xl font-semibold text-text-primary">{item.title}</h3>
              {item.description && <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>}
            </div>
          </article>
        ))}
      </div>
    </CmsSection>
  );
}

/* ---------------------------------- stats --------------------------------- */

export function CmsStatsSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({ value: pick(i, "value"), label: pick(i, "label") }))
    .filter((i) => i.value);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id} defaultPadding={[64, 96]}>
      {header(c)}
      <div className={`grid gap-px overflow-hidden rounded-2xl border border-border bg-border ${gridCols(settings, Math.min(list.length || 1, 4))}`}>
        {list.map((item, i) => (
          <div key={i} className="bg-bg-base p-8 text-center">
            <p className="font-display text-4xl font-bold tracking-tight text-amber-base md:text-5xl">{item.value}</p>
            {item.label && <p className="mt-2 text-sm text-text-secondary">{item.label}</p>}
          </div>
        ))}
      </div>
    </CmsSection>
  );
}

/* ---------------------------------- logos --------------------------------- */

export function CmsLogosSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({ image: safeImage(pick(i, "image", "logo")), name: pick(i, "name"), url: safeHref(pick(i, "url")) }))
    .filter((i) => i.image || i.name);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id} defaultPadding={[48, 64]}>
      {pick(c, "heading") && (
        <p className="mb-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">{pick(c, "heading")}</p>
      )}
      <div className="logo-cloud flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {list.map((item, i) => {
          const logo = item.image ? (
            <CmsImg src={item.image} alt={item.name} />
          ) : (
            <span className="font-display text-lg font-semibold text-text-muted">{item.name}</span>
          );
          return (
            <div key={i}>
              {item.url ? (
                <SmartLink href={item.url} className="contents">
                  {logo}
                </SmartLink>
              ) : (
                logo
              )}
            </div>
          );
        })}
      </div>
    </CmsSection>
  );
}

/* --------------------------------- gallery -------------------------------- */

export function CmsGallerySection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({ image: safeImage(pick(i, "image")), caption: pick(i, "caption", "alt") }))
    .filter((i) => i.image);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id}>
      {header(c)}
      <div className={`grid gap-5 ${gridCols(settings, 3)}`}>
        {list.map((item, i) => (
          <figure key={i} className="group overflow-hidden rounded-2xl border border-border bg-surface">
            <CmsImg
              src={item.image}
              alt={item.caption}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {item.caption && <figcaption className="px-4 py-3 text-sm text-text-secondary">{item.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </CmsSection>
  );
}

/* ---------------------------------- team ---------------------------------- */

export function CmsTeamSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({ name: pick(i, "name"), role: pick(i, "role"), image: safeImage(pick(i, "image")), bio: pick(i, "bio") }))
    .filter((i) => i.name);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id}>
      {header(c)}
      <div className={`grid gap-6 ${gridCols(settings, 4)}`}>
        {list.map((m, i) => (
          <article key={i} className="group glow-card text-center">
            <div className="relative">
              {m.image ? (
                <CmsImg src={m.image} alt={m.name} className="mx-auto h-24 w-24 rounded-full border-2 border-amber-border object-cover" />
              ) : (
                <span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-amber-glow font-display text-2xl font-bold text-amber-base">
                  {m.name.charAt(0)}
                </span>
              )}
              <h3 className="mt-4 text-lg font-semibold text-text-primary">{m.name}</h3>
              {m.role && <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-amber-base">{m.role}</p>}
              {m.bio && <p className="mt-3 text-sm leading-relaxed text-text-secondary">{m.bio}</p>}
            </div>
          </article>
        ))}
      </div>
    </CmsSection>
  );
}

/* ------------------------------- testimonials ------------------------------ */

export function CmsTestimonialsSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({ quote: pick(i, "quote", "text"), name: pick(i, "name"), role: pick(i, "role"), image: safeImage(pick(i, "image")) }))
    .filter((i) => i.quote);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id}>
      {header(c)}
      <div className={`grid gap-6 ${gridCols(settings, list.length === 2 ? 2 : 3)}`}>
        {list.map((t, i) => (
          <figure key={i} className="glow-card flex flex-col">
            <Quote className="h-7 w-7 text-amber-base/60" />
            <blockquote className="relative mt-4 flex-1 text-base leading-relaxed text-text-primary">“{t.quote}”</blockquote>
            {(t.name || t.role) && (
              <figcaption className="relative mt-6 flex items-center gap-3 border-t border-border pt-4">
                {t.image ? (
                  <CmsImg src={t.image} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-glow text-sm font-bold text-amber-base">
                    {(t.name || "?").charAt(0)}
                  </span>
                )}
                <span>
                  {t.name && <span className="block text-sm font-semibold text-text-primary">{t.name}</span>}
                  {t.role && <span className="block text-xs text-text-muted">{t.role}</span>}
                </span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </CmsSection>
  );
}

/* --------------------------------- timeline -------------------------------- */

export function CmsTimelineSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({ date: pick(i, "date"), title: pick(i, "title"), description: pick(i, "description") }))
    .filter((i) => i.title);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id} defaultWidth="narrow">
      {header(c)}
      <ol className="relative space-y-8 border-l border-amber-border pl-8">
        {list.map((item, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[2.4rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-bg-base bg-amber-base shadow-glow" />
            {item.date && <p className="font-mono text-[11px] uppercase tracking-widest text-amber-base">{item.date}</p>}
            <h3 className="mt-1 text-lg font-semibold text-text-primary">{item.title}</h3>
            {item.description && <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>}
          </li>
        ))}
      </ol>
    </CmsSection>
  );
}

/* --------------------------------- pricing --------------------------------- */

function features(v: unknown): string[] {
  if (Array.isArray(v)) return v.filter((f): f is string => typeof f === "string" && !!f.trim()).map((f) => f.trim());
  return typeof v === "string" ? v.split(/\r?\n/).map((f) => f.trim()).filter(Boolean) : [];
}

export function CmsPricingSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => {
      const text = pick(i, "buttonLabel");
      const link = safeHref(pick(i, "buttonUrl"));
      return {
        name: pick(i, "name", "title"),
        price: pick(i, "price"),
        period: pick(i, "period"),
        description: pick(i, "description"),
        features: features(i.features),
        cta: text && link ? { text, link } : undefined,
        featured: i.featured === true,
      };
    })
    .filter((i) => i.name);
  if (!list.length && !required) return null;
  return (
    <CmsSection settings={settings} id={id}>
      {header(c)}
      <div className={`grid items-stretch gap-6 ${gridCols(settings, Math.min(list.length || 1, 3))}`}>
        {list.map((plan, i) => (
          <article
            key={i}
            className={`glow-card flex flex-col ${plan.featured ? "border-amber-base/60 shadow-glow ring-1 ring-amber-base/30" : ""}`}
          >
            <div className="relative flex flex-1 flex-col">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-text-primary">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-full bg-amber-base px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-white">
                    Popular
                  </span>
                )}
              </div>
              {plan.price && (
                <p className="mt-4">
                  <span className="font-display text-4xl font-bold text-text-primary">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-sm text-text-muted">{plan.period}</span>}
                </p>
              )}
              {plan.description && <p className="mt-3 text-sm leading-relaxed text-text-secondary">{plan.description}</p>}
              {plan.features.length > 0 && (
                <ul className="mt-6 space-y-2.5 text-sm text-text-secondary">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-base" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {plan.cta && (
                <div className="mt-auto pt-8">
                  <CmsButton link={plan.cta} variant={plan.featured ? "primary" : "secondary"} />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </CmsSection>
  );
}

/* ---------------------------------- posts ---------------------------------- */

export type CmsPostCard = { title: string; url: string; excerpt: string; image: string; date?: string };

export function CmsPostsSection({ c, settings, id, posts }: SectionProps & { posts: CmsPostCard[] }) {
  if (!posts.length) return null;
  return (
    <CmsSection settings={settings} id={id}>
      {header(c)}
      <div className={`grid gap-6 ${gridCols(settings, 3)}`}>
        {posts.map((p, i) => (
          <SmartLink key={i} href={p.url} className="group glow-card flex flex-col !p-0">
            {p.image ? (
              <CmsImg src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover" />
            ) : (
              <div className="bg-hex aspect-[16/10] w-full bg-bg-elevated" />
            )}
            <div className="relative flex flex-1 flex-col p-6">
              {p.date && <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">{p.date}</p>}
              <h3 className="mt-2 text-lg font-semibold text-text-primary transition-colors group-hover:text-amber-base">{p.title}</h3>
              {p.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">{p.excerpt}</p>}
              <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-amber-base">
                Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </SmartLink>
        ))}
      </div>
    </CmsSection>
  );
}
