/**
 * Single source of truth for where this site is served.
 *
 * GitHub Pages hosts the repo `Yash-Sakre` as a *project* site, so everything
 * lives under a `/Yash-Sakre` prefix rather than the domain root. Imported by
 * `next.config.ts` (as `basePath`) and by anything that builds a public URL.
 *
 * Keep `scripts/registry.mjs`'s BASE_URL in sync — it is plain JS run by node
 * and cannot import this module.
 */
export const BASE_PATH = "/Yash-Sakre";

/** Absolute origin + prefix, e.g. for `metadataBase` and registry install URLs. */
export const SITE_URL = `https://yash-sakre.github.io${BASE_PATH}`;

/**
 * Prefix a root-absolute path (route or `public/` asset) with the base path.
 *
 * `next/link` and `next/image` apply `basePath` on their own; a raw `<a href>`,
 * `<img src>`, `fetch`, or CSS `url()` does not, so those callers must go
 * through this or they resolve against the domain root and 404.
 */
export function withBasePath(path: string) {
  return `${BASE_PATH}${path}`;
}
