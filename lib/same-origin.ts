/**
 * OWASP A01 — Broken Access Control
 * Enforce same-origin on all browser-facing API routes to prevent
 * cross-origin abuse (CSRF-style requests from other domains).
 *
 * - No Origin header in dev → allowed (curl / server-to-server testing)
 * - No Origin header in prod → rejected
 * - Origin present → must match host
 */
export function isSameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");

  if (!origin) {
    // Allow in development for local curl testing; block in production
    return process.env.NODE_ENV !== "production";
  }

  const host =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  const proto =
    req.headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return origin === `${proto}://${host}`;
}
