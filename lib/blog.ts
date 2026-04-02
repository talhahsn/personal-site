export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calcReadTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export function autoExcerpt(content: string, maxLen = 220) {
  const plain = content
    .replace(/^#{1,6}\s+.*$/gm, "")   // remove heading lines entirely
    .replace(/!\[.*?\]\(.*?\)/g, "")  // remove image markdown
    .replace(/[*`>\[\]!]/g, "")
    .replace(/\n+/g, " ")
    .trim();

  if (plain.length <= maxLen) return plain;

  // Cut at last sentence boundary before maxLen
  const cut = plain.slice(0, maxLen);
  const lastPeriod = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return lastPeriod > 80 ? plain.slice(0, lastPeriod + 1) : cut.trimEnd() + "…";
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
