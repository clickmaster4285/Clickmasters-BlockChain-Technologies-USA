// components/cms/CmsContentSections.tsx
// Content-style CMS sections (A4): text, richText, customContent, html, image,
// imageText, video, author. Every (html) field goes through CmsRichText.
import CmsRichText from "./CmsRichText";
import {
  ButtonRow,
  CmsImg,
  CmsSection,
  Eyebrow,
  GradientHeading,
  SectionHeader,
  settingStr,
} from "./CmsSection";
import { button, pick, plainButton, safeImage } from "./cmsContent";
import type { SectionProps } from "./CmsGridSections";

const PROSE = "max-w-none";

export function CmsTextSection({ c, settings, id, required }: SectionProps) {
  const heading = pick(c, "heading");
  const body = pick(c, "body", "text", "description");
  if (!heading && !body && !required) return null;
  return (
    <CmsSection settings={settings} id={id} defaultWidth="narrow">
      <SectionHeader
        eyebrow={pick(c, "eyebrow")}
        heading={heading}
        align="left"
        className="mb-6"
      />
      {body.split(/\n{2,}/).map((para, i) => (
        <p
          key={i}
          className="mt-4 whitespace-pre-line text-base leading-relaxed text-text-secondary md:text-lg first:mt-0"
        >
          {para}
        </p>
      ))}
    </CmsSection>
  );
}

/** richText / customContent (bodyHtml) and html (code). */
export function CmsRichTextSection({
  c,
  settings,
  id,
  required,
  field,
}: SectionProps & { field: string }) {
  const html = pick(c, field);
  const heading = pick(c, "heading");
  if (!html && !heading && !required) return null;
  return (
    <CmsSection settings={settings} id={id} defaultWidth="narrow">
      <SectionHeader heading={heading} align="left" className="mb-6" />
      <CmsRichText html={html} className={PROSE} />
    </CmsSection>
  );
}

export function CmsImageSection({ c, settings, id, required }: SectionProps) {
  const image = safeImage(pick(c, "image"));
  if (!image && !required) return null;
  const caption = pick(c, "caption");
  return (
    <CmsSection settings={settings} id={id}>
      <SectionHeader heading={pick(c, "heading")} />
      {image && (
        <figure>
          <CmsImg
            src={image}
            alt={pick(c, "alt") || caption}
            className="w-full rounded-3xl border border-border object-cover shadow-soft"
          />
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-text-muted">
              {caption}
            </figcaption>
          )}
        </figure>
      )}
    </CmsSection>
  );
}

export function CmsImageTextSection({
  c,
  settings,
  id,
  required,
}: SectionProps) {
  const image = safeImage(pick(c, "image"));
  const bodyHtml = pick(c, "bodyHtml", "body");
  const heading = pick(c, "heading");
  if (!image && !bodyHtml && !heading && !required) return null;
  const imageLeft = settingStr(settings, "imagePosition") === "left";
  const eyebrow = pick(c, "eyebrow");
  return (
    <CmsSection settings={settings} id={id} defaultWidth="wide">
      <div
        className={`grid items-center gap-10 lg:gap-16 ${image ? "lg:grid-cols-2" : ""}`}
      >
        <div className={imageLeft ? "lg:order-2" : ""}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {heading && (
            <div className={eyebrow ? "mt-5" : ""}>
              <GradientHeading
                text={heading}
                className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl"
              />
            </div>
          )}
          {bodyHtml && (
            <CmsRichText
              html={bodyHtml}
              className={`${heading ? "mt-6" : ""} ${PROSE}`}
            />
          )}
          <ButtonRow
            primary={button(c, "primary") ?? plainButton(c)}
            secondary={button(c, "secondary")}
          />
        </div>
        {image && (
          <div className={`relative ${imageLeft ? "lg:order-1" : ""}`}>
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-10 blur-2xl" />
            <CmsImg
              src={image}
              alt={pick(c, "alt")}
              className="relative aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-soft"
            />
          </div>
        )}
      </div>
    </CmsSection>
  );
}

/**
 * Embed URL from a YouTube/Vimeo link. Only the parsed id is used, so a CMS
 * value can't point the iframe at an arbitrary site.
 */
export function videoEmbedUrl(url: string): string {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return "";
  }
  const host = u.hostname.replace(/^www\./, "");
  let id = "";
  if (host === "youtu.be") id = u.pathname.slice(1);
  else if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    id =
      u.searchParams.get("v") ??
      u.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1] ??
      "";
  }
  if (/^[\w-]{6,20}$/.test(id))
    return `https://www.youtube-nocookie.com/embed/${id}`;
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const vimeoId = u.pathname.match(/(\d{5,12})/)?.[1];
    if (vimeoId) return `https://player.vimeo.com/video/${vimeoId}`;
  }
  return "";
}

export function CmsVideoSection({ c, settings, id }: SectionProps) {
  const embedUrl = videoEmbedUrl(pick(c, "videoUrl", "url"));
  if (!embedUrl) return null;
  const heading = pick(c, "heading");
  return (
    <CmsSection settings={settings} id={id}>
      <SectionHeader heading={heading} description={pick(c, "description")} />
      <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-slate-900 shadow-soft">
        <iframe
          src={embedUrl}
          title={heading || "Video"}
          className="absolute inset-0 size-full"
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </CmsSection>
  );
}

export function CmsAuthorSection({ c, settings, id, required }: SectionProps) {
  const name = pick(c, "name");
  if (!name && !required) return null;
  const image = safeImage(pick(c, "image"));
  return (
    <CmsSection
      settings={settings}
      id={id}
      defaultWidth="narrow"
      defaultPadding={[48, 64]}
    >
      <div className="glow-card flex flex-col gap-6 sm:flex-row sm:items-start">
        {image ? (
          <CmsImg
            src={image}
            alt={name}
            className="relative h-20 w-20 shrink-0 rounded-full border-2 border-amber-border object-cover"
          />
        ) : (
          <span className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full bg-amber-glow font-display text-2xl font-bold text-amber-base">
            {name.charAt(0)}
          </span>
        )}
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-base">
            {pick(c, "heading") || "About the author"}
          </p>
          <p className="mt-2 text-xl font-semibold text-text-primary">{name}</p>
          {pick(c, "role") && (
            <p className="text-sm text-text-muted">{pick(c, "role")}</p>
          )}
          <CmsRichText
            html={pick(c, "bioHtml", "bio")}
            className="mt-3 [&_p]:text-base"
          />
        </div>
      </div>
    </CmsSection>
  );
}
