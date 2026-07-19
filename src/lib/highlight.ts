import { codeToHtml } from "shiki";

/**
 * Highlights code to dual-theme HTML at build time (server only). Emits both
 * light + dark token colors as CSS variables so `globals.css` can switch them
 * with the `.dark` class — no client JS. Used by the /components docs pages.
 */
export function highlight(code: string, lang = "tsx"): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
