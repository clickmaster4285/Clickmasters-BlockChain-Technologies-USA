// GET /api/erp-edits            → { paths: string[] }  (B1, paths with published edits)
// GET /api/erp-edits?path=/a/b  → { edits: ErpEdit[], hash: string | null }  (B2)
// Same-origin proxy for components/cms/ErpPageEdits.tsx. Always 200 with an
// empty result when the ERP is down, so the browser never sees an error.
import { NextResponse, type NextRequest } from "next/server";
import { getEditedPage, getEditedPaths } from "@/lib/cms/erp-edits";
import { normalizeEditPath } from "@/lib/cms/erp-edits-shared";
import { coalesce } from "@/lib/cms/coalesce";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("path");
  if (raw === null) {
    const paths = await coalesce("paths", () =>
      getEditedPaths({ fresh: true }),
    );
    return NextResponse.json({ paths }, { headers: NO_STORE });
  }
  const path = normalizeEditPath(raw);
  const page = await coalesce(`edits:${path}`, () =>
    getEditedPage(path, { fresh: true }),
  );
  return NextResponse.json(
    { edits: page?.edits ?? [], hash: page?.hash ?? null },
    { headers: NO_STORE },
  );
}
