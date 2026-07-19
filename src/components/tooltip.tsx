"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type Side = "top" | "bottom" | "left" | "right";

/** Where the bubble sits relative to the anchor + its scale origin. */
const POS_CLASS: Record<Side, string> = {
  top: "bottom-full left-1/2 mb-2.5 origin-bottom",
  bottom: "top-full left-1/2 mt-2.5 origin-top",
  left: "right-full top-1/2 mr-2.5 origin-right",
  right: "left-full top-1/2 ml-2.5 origin-left",
};

/** The little diamond caret, centered on the edge facing the anchor. */
const ARROW_CLASS: Record<Side, string> = {
  top: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  left: "right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
  right: "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
};

/** Only the two caret faces pointing toward the anchor carry the border. */
const ARROW_BORDER: Record<Side, string> = {
  top: "border-b border-r",
  bottom: "border-t border-l",
  left: "border-t border-r",
  right: "border-b border-l",
};

/**
 * `base` is the constant translate that keeps the bubble centered on its cross
 * axis; `from` is the small offset it pops in from.
 */
const MOTION: Record<Side, { base: { x?: string; y?: string }; from: { x?: number; y?: number } }> = {
  top: { base: { x: "-50%" }, from: { y: 6 } },
  bottom: { base: { x: "-50%" }, from: { y: -6 } },
  left: { base: { y: "-50%" }, from: { x: 6 } },
  right: { base: { y: "-50%" }, from: { x: -6 } },
};

/**
 * Themed tooltip: a card-surfaced pill (matching the site's light/dark theme
 * and hairline border) that pops in with a soft scale + rise and a touch of
 * spring overshoot. Hover and keyboard-focus aware; collapses to a plain fade
 * when the user prefers reduced motion.
 */
export function Tooltip({
  content,
  side = "top",
  delay = 120,
  className,
  children,
}: {
  content: React.ReactNode;
  side?: Side;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function show() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  }

  function hide() {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  }

  const { base, from } = MOTION[side];
  const bx = base.x ?? 0;
  const by = base.y ?? 0;

  const shown = reduce
    ? { opacity: 1, x: bx, y: by }
    : { opacity: 1, scale: 1, x: bx, y: by };
  const hidden = reduce
    ? { opacity: 0, x: bx, y: by }
    : { opacity: 0, scale: 0.9, x: base.x ?? from.x ?? 0, y: base.y ?? from.y ?? 0 };

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onPointerDown={hide}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            aria-hidden
            initial={hidden}
            animate={shown}
            exit={hidden}
            transition={
              reduce
                ? { duration: 0.12 }
                : { type: "spring", stiffness: 400, damping: 22, mass: 0.7 }
            }
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-border bg-card px-2.5 py-1.5 text-sm font-medium leading-none text-foreground shadow-lg",
              POS_CLASS[side],
              className,
            )}
          >
            {content}
            <span
              aria-hidden
              className={cn(
                "absolute size-2.5 rotate-45 rounded-xs border-border bg-card",
                ARROW_CLASS[side],
                ARROW_BORDER[side],
              )}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
