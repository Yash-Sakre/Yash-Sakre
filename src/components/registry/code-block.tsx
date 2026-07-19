"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

function CopyButton({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(
        "grid size-7 place-items-center rounded-md border border-border bg-background/70 text-muted-foreground backdrop-blur transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      {copied ? <Check className="size-3.5 text-positive" /> : <Copy className="size-3.5" />}
    </button>
  );
}

/**
 * Code surface with copy-to-clipboard. Pass `html` (shiki output) to render
 * highlighted; otherwise falls back to plain monospace. `bare` drops the outer
 * card chrome (for embedding inside a panel that already has a border).
 */
export function CodeBlock({
  code,
  html,
  filename,
  bare = false,
  className,
  maxHeight = true,
}: {
  code: string;
  html?: string;
  filename?: string;
  bare?: boolean;
  className?: string;
  maxHeight?: boolean;
}) {
  const body = html ? (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <pre className="overflow-x-auto p-4 text-[0.8rem] leading-relaxed">
      <code className="font-mono">{code}</code>
    </pre>
  );

  const scroller = (
    <div className={cn("overflow-auto", maxHeight && "max-h-[26rem]")}>{body}</div>
  );

  if (bare) {
    return (
      <div className={cn("relative", className)}>
        <CopyButton code={code} className="absolute right-2 top-2 z-10" />
        {scroller}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-muted/40",
        className,
      )}
    >
      {filename ? (
        <div className="flex items-center justify-between border-b border-border py-2 pl-4 pr-2">
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
          <CopyButton code={code} />
        </div>
      ) : (
        <CopyButton code={code} className="absolute right-2 top-2 z-10" />
      )}
      {scroller}
    </div>
  );
}
