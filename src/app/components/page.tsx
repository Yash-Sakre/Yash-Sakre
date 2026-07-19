import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { CATALOG, GALLERY_ORDER } from "@/components/registry/catalog";

export const metadata: Metadata = {
  title: "Components",
  description:
    "An open component registry — install the primitives behind this site with the shadcn CLI, or copy the source.",
};

type IndexItem = {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  target: string;
};

type RegistryIndex = { items: IndexItem[] };

const index: RegistryIndex = JSON.parse(
  readFileSync(join(process.cwd(), "public/r/registry.json"), "utf8"),
);

const byName = new Map(index.items.map((i) => [i.name, i]));
const items = GALLERY_ORDER.map((name) => byName.get(name)).filter(
  (i): i is IndexItem => Boolean(i),
);

const FEATURES = ["Copy & Paste", "Tailwind CSS v4", "Accessible"];

export default function ComponentsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Reveal>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Components</h1>
        <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
          A curated set of the components behind this site — packaged as a{" "}
          <a
            href="https://ui.shadcn.com/docs/cli"
            target="_blank"
            rel="noreferrer noopener"
            className="text-highlight underline-offset-4 hover:underline"
          >
            shadcn
          </a>{" "}
          registry. Built with performance and accessibility in mind. Copy, paste, and customize.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {FEATURES.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5">
              <CircleCheck className="size-4" />
              {f}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => {
          const Icon = CATALOG[item.name].icon;
          return (
            <Reveal key={item.name} delay={Math.min(i, 5) * 0.04}>
              <Link
                href={`/components/${item.name}`}
                className="group flex h-full gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-border-strong hover:shadow-lg hover:shadow-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors group-hover:text-foreground">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="font-medium tracking-tight">{item.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
