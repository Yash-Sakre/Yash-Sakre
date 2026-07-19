"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/registry/code-block";

const PMS = [
  { id: "npm", label: "npm", run: "npx" },
  { id: "pnpm", label: "pnpm", run: "pnpm dlx" },
  { id: "yarn", label: "yarn", run: "yarn dlx" },
  { id: "bun", label: "bun", run: "bunx" },
] as const;

type Tab = "cli" | "manual";

/**
 * Install surface for one registry item: a "CLI" tab (package-manager switcher
 * that builds the `shadcn add <url>` command) and a "Manual" tab with the full,
 * syntax-highlighted source to copy-paste.
 */
export function InstallTabs({
  url,
  source,
  sourceHtml,
  filename,
}: {
  url: string;
  source: string;
  sourceHtml: string;
  filename: string;
}) {
  const [tab, setTab] = useState<Tab>("cli");
  const [pm, setPm] = useState<(typeof PMS)[number]["id"]>("npm");

  const run = PMS.find((p) => p.id === pm)!.run;
  const command = `${run} shadcn@latest add ${url}`;

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-border">
        {(["cli", "manual"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "-mb-px border-b-2 px-3 py-2 text-sm transition-colors focus-visible:outline-none",
              tab === t
                ? "border-foreground font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t === "cli" ? "CLI" : "Manual"}
          </button>
        ))}
      </div>

      {tab === "cli" ? (
        <div className="mt-3">
          <p className="mb-3 text-sm text-muted-foreground">Install the component using the CLI.</p>
          <div className="mb-2 flex items-center gap-1">
            {PMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPm(p.id)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs transition-colors focus-visible:outline-none",
                  pm === p.id
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
          <CodeBlock code={command} maxHeight={false} />
        </div>
      ) : (
        <div className="mt-3">
          <p className="mb-3 text-sm text-muted-foreground">
            Copy and paste the code into your project.
          </p>
          <CodeBlock code={source} html={sourceHtml} filename={filename} />
        </div>
      )}
    </div>
  );
}
