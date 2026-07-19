"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/tooltip";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount gate so the icon matches the resolved theme without a hydration
    // mismatch — the one intended post-mount render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <Tooltip
      side="bottom"
      content={mounted ? (isDark ? "Light mode" : "Dark mode") : "Toggle theme"}
    >
      <button
        type="button"
        aria-label="Toggle color theme"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={cn(
          "-m-1.5 grid place-items-center rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className,
        )}
      >
        {/* Render a neutral placeholder until mounted to avoid hydration mismatch. */}
        {mounted ? (
          isDark ? (
            <Sun className="size-[1.05rem]" />
          ) : (
            <Moon className="size-[1.05rem]" />
          )
        ) : (
          <span className="size-[1.05rem]" />
        )}
      </button>
    </Tooltip>
  );
}
