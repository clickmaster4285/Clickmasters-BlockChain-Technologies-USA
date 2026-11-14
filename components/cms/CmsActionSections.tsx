// components/cms/CmsActionSections.tsx
// Conversion-style CMS sections (A4): cta, contact, newsletter, faq.
import { Mail, MapPin, Phone } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/schema-primitives";
import CmsFaqList from "./CmsFaqList";
import {
  ButtonRow,
  CmsButton,
  CmsImg,
  CmsSection,
  GradientHeading,
  SectionHeader,
  sectionBackground,
} from "./CmsSection";
import { button, items, pick, safeHref, safeImage } from "./cmsContent";
import type { SectionProps } from "./CmsGridSections";

/** Same look as the site's FinalCTA: amber gradient band, white type. */
export function CmsCtaSection({ c, settings, id, required }: SectionProps) {
  const heading = pick(c, "heading");
  if (!heading && !required) return null;
  const primary = button(c, "primary");
  return (
    <CmsSection
      settings={settings}
      id={id}
      defaultWidth="wide"
      background={sectionBackground(settings) || "cms-surface-primary"}
    >
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-15" />
      <div className="relative mx-auto max-w-3xl text-center">
        <GradientHeading
          text={heading}
          className="text-3xl font-bold tracking-tight text-text-primary md:text-5xl"
        />
        {pick(c, "description") && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {pick(c, "description")}
          </p>
        )}
        <ButtonRow
          primary={primary}
          secondary={button(c, "secondary")}
          shape={pick(c, "buttonStyle")}
          center
        />
      </div>
    </CmsSection>
  );
}

/** A form target we are willing to post to: site-relative or https. */
function formTarget(c: Record<string, unknown>) {
  const action = safeHref(pick(c, "formAction"));
  return action.startsWith("/") || /^https:\/\//i.test(action) ? action : "";
}

const INPUT =
  "w-full rounded-xl border border-border bg-bg-base px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:border-amber-base focus:outline-none";

export function CmsContactSection({ c, settings, id }: SectionProps) {
  const email = pick(c, "email");
  const phone = pick(c, "phone");
  const address = pick(c, "address");
  const image = safeImage(pick(c, "image"));
  const action = formTarget(c);
  const label = pick(c, "buttonLabel") || "Contact us";
  const rows = [
    email && {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    phone && {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/[^\d+]/g, "")}`,
    },
    address && { icon: MapPin, label: "Address", value: address },
  ].filter(Boolean) as {
    icon: typeof Mail;
    label: string;
    value: string;
    href?: string;
  }[];

  return (
    <CmsSection settings={settings} id={id} defaultWidth="wide">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <SectionHeader
            heading={pick(c, "heading") || "Get in touch"}
            description={pick(c, "description")}
            align="left"
            className="mb-8"
          />
          {rows.length > 0 && (
            <ul className="space-y-3">
              {rows.map((r) => (
                <li
                  key={r.label}
                  className="glow-card flex items-center gap-4 !p-4"
                >
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-glow text-amber-base">
                    <r.icon className="h-4 w-4" />
                  </span>
                  <span className="relative">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-text-muted">
                      {r.label}
                    </span>
                    {r.href ? (
                      <a
                        href={r.href}
                        className="break-all text-sm font-medium text-text-primary hover:text-amber-base"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <span className="whitespace-pre-line text-sm font-medium text-text-primary">
                        {r.value}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {!action && (
            <div className="mt-8">
              <CmsButton link={{ text: label, link: "/contact" }} />
            </div>
          )}
        </div>
        {action ? (
          <form
            action={action}
            method="post"
            className="glow-card space-y-4 md:!p-8"
          >
            <input
              name="name"
              required
              placeholder="Your name"
              className={`relative ${INPUT}`}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className={`relative ${INPUT}`}
            />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us about your project"
              className={`relative ${INPUT}`}
            />
            <button
              type="submit"
              className="cms-btn-primary relative inline-flex items-center gap-2 rounded-full bg-amber-base px-6 py-3 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5"
            >
              {label}
            </button>
          </form>
        ) : image ? (
          <CmsImg
            src={image}
            className="aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-soft"
          />
        ) : null}
      </div>
    </CmsSection>
  );
}

export function CmsNewsletterSection({
  c,
  settings,
  id,
  required,
}: SectionProps) {
  const action = formTarget(c);
  if (!action && !required) return null;
  return (
    <CmsSection
      settings={settings}
      id={id}
      defaultWidth="narrow"
      defaultPadding={[64, 80]}
    >
      <div className="glow-card text-center md:!p-10">
        <div className="relative">
          <SectionHeader
            heading={pick(c, "heading") || "Stay in the loop"}
            description={pick(c, "description")}
            className="mb-6"
          />
          {action ? (
            <form
              action={action}
              method="post"
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                aria-label="Email address"
                className={INPUT}
              />
              <button
                type="submit"
                className="cms-btn-primary shrink-0 rounded-full bg-amber-base px-6 py-3 text-sm font-semibold text-white shadow-glow"
              >
                {pick(c, "buttonLabel") || "Subscribe"}
              </button>
            </form>
          ) : (
            <CmsButton
              link={{
                text: pick(c, "buttonLabel") || "Contact us",
                link: "/contact",
              }}
            />
          )}
        </div>
      </div>
    </CmsSection>
  );
}

export function CmsFaqSection({ c, settings, id, required }: SectionProps) {
  const list = items(c)
    .map((i) => ({
      question: pick(i, "question", "q"),
      answer: pick(i, "answer", "a"),
    }))
    .filter((i) => i.question && i.answer);
  if (!list.length && !required) return null;
  return (
    <CmsSection
      settings={settings}
      id={id}
      defaultWidth="narrow"
      background={sectionBackground(settings) || "cms-surface-muted"}
    >
      <JsonLd data={faqPageSchema(list)} />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-30" />
      <SectionHeader
        eyebrow="FAQ"
        heading={pick(c, "heading") || "Frequently Asked Questions"}
        description={pick(c, "description")}
      />
      <div className="relative">
        <CmsFaqList items={list} />
      </div>
    </CmsSection>
  );
}
