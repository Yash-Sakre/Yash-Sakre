import type { NextConfig } from "next";

import { BASE_PATH } from "./src/lib/site";

const nextConfig: NextConfig = {
  /**
   * Fully static export -> `out/`, published by GitHub Pages from the repo
   * `Yash-Sakre`. That is a project site, so it is served under
   * https://yash-sakre.github.io/Yash-Sakre rather than the domain root.
   */
  output: "export",

  /** Prefixes routes and `_next/*` assets. `assetPrefix` defaults to this. */
  basePath: BASE_PATH,

  /** No image optimizer exists on a static host; `next/image` must pass through. */
  images: { unoptimized: true },
};

export default nextConfig;
