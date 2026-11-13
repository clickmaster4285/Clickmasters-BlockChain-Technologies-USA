// lib/cms/page-metadata.ts
// createMetadata + ERP edited-page SEO overlay, for server-side generateMetadata.
// Pages without published edits get exactly what createMetadata returns.
import type { Metadata } from "next";
import { createMetadata } from "@/config/metadata";
import { withEditedPageSeo } from "./erp-edits";

type Options = Parameters<typeof createMetadata>[0];

export async function createPageMetadata(options: Options): Promise<Metadata> {
  return withEditedPageSeo(options.path ?? "/", createMetadata(options));
}
