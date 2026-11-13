// components/cms/CmsSectionRenderer.tsx
// Maps ERP / Nexus CMS section JSON (A3/A4) onto this site's own components.
// The CMS controls content and layout settings; the look always comes from
// the ClickMasters design system. Unknown section types are skipped silently,
// nothing from the CMS is injected as raw HTML, and nothing is executed.
import type { ReactNode } from "react";
import type { CmsPage, CmsSection } from "@/lib/cms/cms";
import CmsHeroSection from "./CmsHeroSection";
import {
  CmsBentoSection,
  CmsFeaturesSection,
  CmsGallerySection,
  CmsLogosSection,
  CmsPostsSection,
  CmsPricingSection,
  CmsStatsSection,
  CmsTeamSection,
  CmsTestimonialsSection,
  CmsTimelineSection,
  type CmsPostCard,
} from "./CmsGridSections";
import {
  CmsAuthorSection,
  CmsImageSection,
  CmsImageTextSection,
  CmsRichTextSection,
  CmsTextSection,
  CmsVideoSection,
} from "./CmsContentSections";
import { CmsContactSection, CmsCtaSection, CmsFaqSection, CmsNewsletterSection } from "./CmsActionSections";
import { button, items, pick, plainButton, safeHref, safeImage } from "./cmsContent";

// The site's own Navbar / Footer render around every created page instead.
const SITE_CHROME = new Set(["header", "navbar", "footer"]);
const GRID_TYPES = new Set(["features", "services", "benefits", "process", "cards"]);

function formatDate(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function postCards(section: CmsSection, page: CmsPage): CmsPostCard[] {
  const c = section.content;
  const type = pick(c, "pageType");
  const cards: CmsPostCard[] =
    c.mode === "manual"
      ? items(c).map((i) => ({
          title: pick(i, "title"),
          url: safeHref(pick(i, "url")),
          excerpt: pick(i, "description", "excerpt"),
          image: safeImage(pick(i, "image")),
        }))
      : page.posts
          .filter((p) => !type || !p.pageType || p.pageType === type)
          .filter((p) => p.url !== page.slug)
          .map((p) => ({
            title: p.title,
            url: safeHref(p.url),
            excerpt: p.excerpt,
            image: safeImage(p.image),
            date: formatDate(p.publishedAt),
          }));
  const limit = typeof c.limit === "number" ? Math.min(Math.max(Math.floor(c.limit), 1), 24) : 3;
  return cards.filter((p) => p.title && p.url).slice(0, limit);
}

function renderSection(section: CmsSection, page: CmsPage, id: string | undefined): ReactNode {
  const { content: c, settings, type } = section;
  const required = settings.required === true;
  const props = { c, settings, id, required };

  if (SITE_CHROME.has(type)) return null;
  if (GRID_TYPES.has(type)) return <CmsFeaturesSection {...props} type={type} />;

  switch (type) {
    case "hero": {
      const heading = pick(c, "heading", "title") || (required ? page.title : "");
      if (!heading) return null;
      return (
        <CmsHeroSection
          settings={settings}
          id={id}
          data={{
            eyebrow: pick(c, "eyebrow", "subtitle"),
            heading,
            description: pick(c, "description"),
            meta: pick(c, "meta"),
            image: safeImage(pick(c, "image", "backgroundImage")),
            primary: button(c, "primary") ?? plainButton(c),
            secondary: button(c, "secondary"),
            buttonStyle: pick(c, "buttonStyle"),
          }}
        />
      );
    }
    case "text":
      return <CmsTextSection {...props} />;
    case "richText":
    case "customContent":
      return <CmsRichTextSection {...props} field="bodyHtml" />;
    case "html":
      return <CmsRichTextSection {...props} field="code" />;
    case "image":
      return <CmsImageSection {...props} />;
    case "imageText":
      return <CmsImageTextSection {...props} />;
    case "video":
      return <CmsVideoSection {...props} />;
    case "bento":
      return <CmsBentoSection {...props} />;
    case "stats":
      return <CmsStatsSection {...props} />;
    case "logos":
      return <CmsLogosSection {...props} />;
    case "gallery":
      return <CmsGallerySection {...props} />;
    case "team":
      return <CmsTeamSection {...props} />;
    case "testimonials":
      return <CmsTestimonialsSection {...props} />;
    case "timeline":
      return <CmsTimelineSection {...props} />;
    case "pricing":
      return <CmsPricingSection {...props} />;
    case "blogPosts":
    case "relatedPosts":
      return <CmsPostsSection {...props} posts={postCards(section, page)} />;
    case "author":
      return <CmsAuthorSection {...props} />;
    case "faq":
      return <CmsFaqSection {...props} />;
    case "cta":
      return <CmsCtaSection {...props} />;
    case "contact":
      return <CmsContactSection {...props} />;
    case "newsletter":
      return <CmsNewsletterSection {...props} />;
    default:
      return null; // unknown type: skipped silently
  }
}

/** True when the first visible section is a hero (it handles the fixed navbar offset itself). */
export function startsWithHero(page: CmsPage) {
  const first = page.sections.find((s) => !SITE_CHROME.has(s.type));
  return first?.type === "hero";
}

export default function CmsSectionRenderer({ page }: { page: CmsPage }) {
  const seen = new Set<string>();
  return (
    <>
      {page.sections.map((section) => {
        // Anchor id per type ("#features", "#pricing") for the first of each, or settings.anchor.
        const anchor =
          typeof section.settings.anchor === "string" && /^[a-z][\w-]*$/i.test(section.settings.anchor)
            ? section.settings.anchor
            : seen.has(section.type)
              ? undefined
              : section.type;
        seen.add(section.type);
        const node = renderSection(section, page, anchor);
        return node ? (
          <div key={section.id} data-cms-section={section.type}>
            {node}
          </div>
        ) : null;
      })}
    </>
  );
}
