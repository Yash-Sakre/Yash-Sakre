import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { highlight } from "@/lib/highlight";
import { CATALOG, GALLERY_ORDER, PREVIEWS } from "@/components/registry/catalog";
import { PreviewPanel } from "@/components/registry/preview-panel";
import { InstallTabs } from "@/components/registry/install-tabs";
import { CodeBlock } from "@/components/registry/code-block";

/** Fixed registry — only the known component routes exist. */
export const dynamicParams = false;

export function generateStaticParams() {
  return GALLERY_ORDER.map((name) => ({ name }));
}

type ItemJson = {
  title: string;
  description: string;
  dependencies: string[];
  files: { content: string; target: string }[];
};

function readItem(name: string): ItemJson | null {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), `public/r/${name}.json`), "utf8"));
  } catch {
    return null;
  }
}

const BASE_URL = (
  JSON.parse(readFileSync(join(process.cwd(), "public/r/registry.json"), "utf8")) as {
    baseUrl: string;
  }
).baseUrl;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const item = readItem(name);
  return item ? { title: item.title, description: item.description } : {};
}

function importPathOf(target: string) {
  return "@/" + target.replace(/\.tsx?$/, "");
}

export default async function ComponentDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const item = readItem(name);
  const entry = CATALOG[name];
  if (!item || !entry) notFound();

  const source = item.files[0]?.content ?? "";
  const target = item.files[0]?.target ?? "";
  const filename = target.split("/").pop() ?? `${name}.tsx`;
  const importSnippet = `import { ${entry.exportName} } from "${importPathOf(target)}";`;
  const usageSnippet = entry.usage;

  const [sourceHtml, importHtml, usageHtml] = await Promise.all([
    highlight(source, "tsx"),
    highlight(importSnippet, "tsx"),
    highlight(usageSnippet, "tsx"),
  ]);

  const url = `${BASE_URL}/r/${name}.json`;

  return (
    <section className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <Link
        href="/components"
        className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Back to Components
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{item.title}</h1>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      {item.dependencies.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {item.dependencies.map((d) => (
            <Badge key={d} variant="outline">
              {d}
            </Badge>
          ))}
        </div>
      ) : null}

      <div className="mt-10">
        <p className="eyebrow mb-3">Preview</p>
        <PreviewPanel preview={PREVIEWS[name] ?? null} code={source} html={sourceHtml} />
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-3">Installation</p>
        <InstallTabs url={url} source={source} sourceHtml={sourceHtml} filename={filename} />
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-3">Usage</p>
        <p className="mb-2 text-sm text-muted-foreground">Import the component:</p>
        <CodeBlock code={importSnippet} html={importHtml} maxHeight={false} />
        <p className="mb-2 mt-4 text-sm text-muted-foreground">Use it in your code:</p>
        <CodeBlock code={usageSnippet} html={usageHtml} maxHeight={false} />
      </div>

      {entry.props.length > 0 ? (
        <div className="mt-10">
          <p className="eyebrow mb-3">Props</p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-lg text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Property", "Type", "Default", "Description"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 font-mono text-xs font-normal uppercase tracking-wide text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entry.props.map((p) => (
                  <tr key={p.prop} className="border-b border-border align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[0.8rem] text-foreground">
                      {p.prop}
                    </td>
                    <td className="px-4 py-3 font-mono text-[0.8rem] text-highlight">{p.type}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[0.8rem] text-muted-foreground">
                      {p.default}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}
