"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/registry/code-block";

type Tab = "preview" | "code";

/**
 * The component showcase panel: a "Preview" tab rendering the live component and
 * a "Code" tab with its highlighted source, plus an expand button that blows the
 * preview up to a full-screen modal.
 */
export function PreviewPanel({
  preview,
  code,
  html,
}: {
  preview: ReactNode;
  code: string;
  html: string;
}) {
  const [tab, setTab] = useState<Tab>("preview");
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [full]);

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-between border-b border-border pr-2">
        <div className="flex">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "-mb-px border-b-2 px-4 py-2.5 text-sm transition-colors focus-visible:outline-none",
                tab === t
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "preview" ? "Preview" : "Code"}
            </button>
          ))}
        </div>
        {tab === "preview" ? (
          <button
            type="button"
            onClick={() => setFull(true)}
            aria-label="Expand preview"
            className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Maximize2 className="size-4" />
          </button>
        ) : null}
      </div>

      {tab === "preview" ? (
        <div className="grid min-h-72 place-items-center bg-muted/20 p-8">{preview}</div>
      ) : (
        <CodeBlock code={code} html={html} bare />
      )}

      <AnimatePresence>
        {full ? (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFull(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative z-10 flex h-full max-h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-black/30"
            >
              <div className="flex items-center justify-end border-b border-border px-3 py-2">
                <button
                  type="button"
                  onClick={() => setFull(false)}
                  aria-label="Close"
                  className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="grid flex-1 place-items-center overflow-auto p-8">{preview}</div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
