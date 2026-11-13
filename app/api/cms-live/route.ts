// GET /api/cms-live?path=/a/b[&page=1]
// → { edits: string | null, page: string | null | undefined }
// Polled by components/cms/ErpPageEdits.tsx so ERP publishes show up in open
// tabs without a manual refresh. `edits` / `page` are content fingerprints.
//
// With page=1 (the tab is showing a created page) the fresh ERP snapshot is
// compared with the server's cached copy; when they differ the cache is
// expired so the browser's router.refresh() renders the new version. Only a
// real change on the ERP side can trigger that, so this can't be abused to
// flush the cache.
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { CMS_PAGE_TAG, getCmsPage, normalizeCmsSlug } from "@/lib/cms/cms";
import { EDITS_TAG, getEditedPage } from "@/lib/cms/erp-edits";
import { normalizeEditPath } from "@/lib/cms/erp-edits-shared";
import { coalesce } from "@/lib/cms/coalesce";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const path = normalizeEditPath(params.get("path") ?? "/");

  const editsPromise = coalesce(`live-edits:${path}`, async () => {
    const [fresh, cached] = await Promise.all([getEditedPage(path, { fresh: true }), getEditedPage(path)]);
    // Keep the server-rendered SEO of edited pages in step with the edits.
    if ((fresh?.hash ?? null) !== (cached?.hash ?? null)) revalidateTag(EDITS_TAG, { expire: 0 });
    return fresh;
  });
  const pagePromise =
    params.get("page") === "1"
      ? coalesce(`live-page:${path}`, async () => {
          const slug = normalizeCmsSlug(path);
          const [fresh, cached] = await Promise.all([getCmsPage(slug, { fresh: true }), getCmsPage(slug)]);
          if ((fresh?.hash ?? null) !== (cached?.hash ?? null)) {
            revalidateTag(CMS_PAGE_TAG, { expire: 0 });
          }
          return fresh;
        })
      : Promise.resolve(undefined);

  const [edits, page] = await Promise.all([editsPromise, pagePromise]);

  return NextResponse.json(
    { edits: edits?.hash ?? null, page: page === undefined ? undefined : (page?.hash ?? null) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
