// app/[...slug]/page.tsx
// Catch-all for pages created in the ERP / Nexus CMS (A5). Precedence:
//   1. every code-owned route is more specific than this one, so it wins;
//   2. the CMS has a published page at this path → render it;
//   3. otherwise → the normal 404 (also when the ERP is unreachable).
import type { Metadata } from "next";
import CmsRoute, { cmsPath, cmsRouteMetadata } from "@/components/cms/CmsRoute";

// Rendered on first request, then cached; CMS data revalidates every 60s.
export const revalidate = 60;

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return cmsRouteMetadata(cmsPath((await params).slug));
}

export default async function CmsCatchAllPage({ params }: Props) {
  return <CmsRoute path={cmsPath((await params).slug)} />;
}
