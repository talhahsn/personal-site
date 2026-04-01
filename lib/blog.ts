export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calcReadTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200));
}

export function autoExcerpt(content: string, maxLen = 160) {
  return content
    .replace(/[#*`>\[\]!]/g, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, maxLen)
    .trimEnd();
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
