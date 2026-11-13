// components/cms/CmsRoute.tsx
// Renders a page created in the ERP / Nexus CMS at a URL path (used by the
// root catch-all app/[...slug]). Same chrome as every other page: the site's
// Navbar, Footer and BackToTop around the CMS sections.
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import BackToTop from "@/components/ui/BackToTop";
import { buildCmsMetadata, getCmsPage, type CmsPage } from "@/lib/cms/cms";
import { withEditedPageSeo } from "@/lib/cms/erp-edits";
import CmsRichText from "./CmsRichText";
import CmsSectionRenderer, { startsWithHero } from "./CmsSectionRenderer";

/** "/a/b" from route segments (["a", "b"]). */
export function cmsPath(segments: string[]) {
  return `/${segments.join("/")}`;
}

/** Created-page SEO, with edited-page SEO on top when the page also has edits. */
export async function cmsRouteMetadata(path: string): Promise<Metadata> {
  const page = await getCmsPage(path);
  const metadata = buildCmsMetadata(page);
  return page ? withEditedPageSeo(path, metadata) : metadata;
}

// ERP brand colors are only applied when explicitly enabled: by default
// created pages use the site's own amber/emerald palette.
const USE_ERP_COLORS = process.env.CMS_USE_ERP_COLORS === "true";

function colorVars(page: CmsPage): CSSProperties | undefined {
  if (!USE_ERP_COLORS) return undefined;
  const { primary, secondary } = page.colors;
  const vars: Record<string, string> = {};
  if (primary) {
    Object.assign(vars, {
      "--amber-base": primary,
      "--amber-light": primary,
      "--primary": primary,
      "--ring": primary,
      "--cms-primary-via": primary,
      "--cms-primary-to": primary,
    });
  }
  if (secondary) Object.assign(vars, { "--emerald-base": secondary, "--secondary": secondary });
  return Object.keys(vars).length ? (vars as CSSProperties) : undefined;
}

/** customCode.css can't break out of its <style> element. */
function safeCss(css: string) {
  return css.replace(/<\/?(style|script)/gi, "").replace(/</g, "\\3C ");
}

export default async function CmsRoute({ path }: { path: string }) {
  const page = await getCmsPage(path);
  if (!page) notFound();
  const css = page.customCss.trim() ? safeCss(page.customCss) : "";

  return (
    <div className="min-h-screen bg-background text-foreground" style={colorVars(page)}>
      <Navbar />
      <main
        data-cms-page={page.slug}
        data-cms-hash={page.hash}
        className={`relative overflow-hidden ${startsWithHero(page) ? "" : "pt-24"}`}
      >
        {css && <style>{css}</style>}
        <CmsSectionRenderer page={page} />
        {/* customCode.html goes through the same allow-list as rich text; customCode.js is never executed. */}
        {page.customHtml.trim() && (
          <div className="site-container px-6 py-12">
            <CmsRichText html={page.customHtml} />
          </div>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
