// @ts-check
/**
 * Builds a shadcn-compatible component registry.
 *
 * Reads the component sources listed in REGISTRY and emits one
 * `public/r/<name>.json` per item (conforming to the shadcn registry-item
 * schema) plus a `public/r/registry.json` index. Consumers install with:
 *
 *   npx shadcn@latest add https://<BASE_URL>/r/<name>.json
 *
 * Re-run after editing any registered component: `npm run registry`.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Absolute origin + base path the install command + cross-item deps are built
 * from. Mirrors SITE_URL in `src/lib/site.ts` — this file is plain JS run by
 * node, so it cannot import the TS module. Update both together.
 */
export const BASE_URL = "https://yash-sakre.github.io/Yash-Sakre";

const OUT_DIR = join(ROOT, "public", "r");

/**
 * @typedef {Object} RegistryItem
 * @property {string} name
 * @property {"registry:ui"|"registry:component"|"registry:lib"} type
 * @property {string} title
 * @property {string} description
 * @property {string[]} dependencies       npm packages
 * @property {string[]} registryDependencies  other item names in this registry
 * @property {{src: string, target: string, type: string}[]} files
 */

/** The registry manifest — the single source of truth. @type {RegistryItem[]} */
export const REGISTRY = [
  {
    name: "utils",
    type: "registry:lib",
    title: "cn (utils)",
    description: "Class-name merge helper — clsx + tailwind-merge. Used by most components.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    files: [{ src: "src/lib/utils.ts", target: "lib/utils.ts", type: "registry:lib" }],
  },
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description: "Pill button with default, outline, secondary and ghost variants plus four sizes.",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ src: "src/components/ui/button.tsx", target: "components/ui/button.tsx", type: "registry:ui" }],
  },
  {
    name: "badge",
    type: "registry:ui",
    title: "Badge",
    description: "Small pill label with default, outline and primary variants.",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
    files: [{ src: "src/components/ui/badge.tsx", target: "components/ui/badge.tsx", type: "registry:ui" }],
  },
  {
    name: "tooltip",
    type: "registry:ui",
    title: "Tooltip",
    description: "Theme-aware tooltip that springs in with a soft pop; hover + keyboard + reduced-motion aware.",
    dependencies: ["motion"],
    registryDependencies: ["utils"],
    files: [{ src: "src/components/tooltip.tsx", target: "components/ui/tooltip.tsx", type: "registry:ui" }],
  },
  {
    name: "reveal",
    type: "registry:ui",
    title: "Reveal",
    description: "Fades and slides its children up the first time they scroll into view.",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [{ src: "src/components/reveal.tsx", target: "components/ui/reveal.tsx", type: "registry:ui" }],
  },
  {
    name: "hover-preview",
    type: "registry:ui",
    title: "Hover Preview",
    description: "Wrap any trigger to reveal a cursor-following image popover on hover — the thumbnail springs in inside a little browser frame and trails the pointer.",
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        src: "src/components/ui/hover-preview.tsx",
        target: "components/ui/hover-preview.tsx",
        type: "registry:ui",
      },
    ],
  },
];

/** @param {RegistryItem} item */
function toRegistryItem(item) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies.map((d) => `${BASE_URL}/r/${d}.json`),
    files: item.files.map((f) => ({
      path: f.target,
      type: f.type,
      target: f.target,
      content: readFileSync(join(ROOT, f.src), "utf8"),
    })),
  };
}

mkdirSync(OUT_DIR, { recursive: true });

const index = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "yash-sakre/ui",
  homepage: BASE_URL,
  baseUrl: BASE_URL,
  items: /** @type {any[]} */ ([]),
};

for (const item of REGISTRY) {
  writeFileSync(
    join(OUT_DIR, `${item.name}.json`),
    JSON.stringify(toRegistryItem(item), null, 2) + "\n",
  );
  index.items.push({
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    target: item.files[0].target,
  });
}

writeFileSync(join(OUT_DIR, "registry.json"), JSON.stringify(index, null, 2) + "\n");
console.log(`✓ registry: built ${REGISTRY.length} items → public/r/`);
