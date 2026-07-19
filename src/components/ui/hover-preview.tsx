"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

function hostOf(url?: string) {
  if (!url) return null;
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

/**
 * Wrap any trigger to reveal a cursor-following image popover on hover — the
 * thumbnail springs in inside a little browser frame and trails the pointer.
 * The popover is portaled to <body>, so it stays valid even inside a <p> and
 * never clips to an overflow-hidden ancestor. Desktop / fine-pointer only.
 */
export function HoverPreview({
  image,
  href,
  children,
  className,
  width = 320,
}: {
  image: string;
  href?: string;
  children: ReactNode;
  className?: string;
  width?: number;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Portal target (document.body) only exists on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 350, damping: 32, mass: 0.6 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  function place(e: React.MouseEvent, instant = false) {
    const x = clamp(e.clientX, 8, window.innerWidth - width - 16);
    const y = e.clientY;
    mx.set(x);
    my.set(y);
    if (instant) {
      sx.jump(x);
      sy.jump(y);
    }
  }

  const popover = (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            style={{ width }}
            className="absolute left-4 -mt-24 origin-top-left overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20"
          >
            <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/50 px-3 py-2">
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
              {hostOf(href) ? (
                <span className="ml-1.5 truncate font-mono text-[0.55rem] text-muted-foreground">
                  {hostOf(href)}
                </span>
              ) : null}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              className="block aspect-16/10 w-full object-cover object-top"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <>
      <span
        className={className}
        onMouseEnter={(e) => {
          setOpen(true);
          place(e, true);
        }}
        onMouseMove={(e) => place(e)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </span>
      {mounted ? createPortal(popover, document.body) : null}
    </>
  );
}
