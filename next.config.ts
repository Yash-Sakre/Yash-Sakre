import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Fully static export -> `out/`, served by GitHub Pages as a user site at
   * https://yash-sakre.github.io. No basePath/assetPrefix: a user site lives
   * at the domain root, unlike a project site's `/repo` subpath.
   */
  output: "export",

  /** No image optimizer exists on a static host; `next/image` must pass through. */
  images: { unoptimized: true },
};

export default nextConfig;
