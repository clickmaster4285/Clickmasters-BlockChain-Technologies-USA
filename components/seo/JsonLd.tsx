type JsonLdData = Record<string, unknown> | null | undefined | false;

/**
 * Renders one or more schema.org objects as JSON-LD. Falsy entries are skipped,
 * so callers can pass optional schemas (e.g. an FAQPage that may be empty).
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(
    (item): item is Record<string, unknown> => Boolean(item),
  );

  return (
    <>
      {items.map((item, index) => (
        <script
          key={`${String(item["@type"])}-${index}`}
          type="application/ld+json"
          // Escape "<" so content can never close the script tag early.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}

export default JsonLd;
