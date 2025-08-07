import { getRequestHeader } from "h3";

export default defineEventHandler((event) => {
  const netlifyContext = (globalThis as any)?.Netlify?.context ?? null;

  const ipFromHeaders =
    getRequestHeader(event, "x-nf-client-connection-ip") ||
    (getRequestHeader(event, "x-forwarded-for") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)[0] ||
    null;

  return {
    isEdge: Boolean(netlifyContext),
    ip: netlifyContext?.ip ?? ipFromHeaders,
    geo: netlifyContext?.geo ?? null,
    // Helpful additional context when running on Netlify Edge
    site: netlifyContext?.site ?? null,
    server: netlifyContext?.server ?? null,
    requestId: netlifyContext?.requestId ?? null,
  };
});
