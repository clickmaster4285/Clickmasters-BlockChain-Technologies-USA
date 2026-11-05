export function splitHeading(text: string, maxLength = 70) {
  const normalized = text.replace(/^H1:\s*/i, "").trim();

  if (normalized.length <= maxLength) {
    return { heading: normalized, continuation: "" };
  }

  const candidates = [
    normalized.lastIndexOf(" — ", maxLength),
    normalized.lastIndexOf(": ", maxLength),
    normalized.lastIndexOf(" | ", maxLength),
  ].filter((index) => index >= Math.floor(maxLength / 2));
  const splitAt =
    candidates.length > 0
      ? Math.max(...candidates)
      : normalized.lastIndexOf(" ", maxLength);
  const boundary = splitAt > 0 ? splitAt : maxLength;
  const heading = normalized.slice(0, boundary).trimEnd();
  const continuation = normalized
    .slice(boundary)
    .replace(/^(?:\s*[—|:]\s*)/, "")
    .trim();

  return { heading, continuation };
}
