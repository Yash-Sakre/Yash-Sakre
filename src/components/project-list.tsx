"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { Globe } from "lucide-react";

import type { Project } from "@/lib/data";
import { GithubIcon } from "@/components/icons";
import { Tooltip } from "@/components/tooltip";

const PREVIEW_W = 320;

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

export function ProjectList({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 350, damping: 32, mass: 0.6 };
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  function place(e: React.MouseEvent, instant = false) {
    const x = clamp(e.clientX, 8, window.innerWidth - PREVIEW_W - 16);
    const y = e.clientY;
    mx.set(x);
    my.set(y);
    if (instant) {
      sx.jump(x);
      sy.jump(y);
    }
  }

  const active = hovered === null ? null : projects[hovered];

  return (
    <div onMouseLeave={() => setHovered(null)}>
      <div className="border-t border-border">
        {projects.map((project, i) => {
          const primary = project.live ?? project.github;
          return (
            <div
              key={project.name}
              onMouseEnter={(e) => {
                setHovered(i);
                place(e, true);
              }}
              onMouseMove={(e) => place(e)}
              className="group relative flex items-start justify-between gap-6 border-b border-border py-5"
            >
              <div className="min-w-0">
                <div className="flex items-baseline gap-2.5">
                  <a
                    href={primary}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-base font-medium tracking-tight underline-offset-4 transition-transform duration-300 group-hover:translate-x-1 hover:underline"
                  >
                    {project.name}
                  </a>
                  <span className="eyebrow">{project.year}</span>
                </div>
                <p className="mt-2 max-w-full text-sm leading-relaxed text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                  {project.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 pt-1 text-muted-foreground">
                {project.github ? (
                  <Tooltip content="Source">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.name} source code`}
                      className="-m-1 rounded-md p-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <GithubIcon className="size-[1.05rem]" />
                    </a>
                  </Tooltip>
                ) : null}
                {project.live ? (
                  <Tooltip content="Live site">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.name} live site`}
                      className="-m-1 rounded-md p-1 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Globe className="size-[1.05rem]" />
                    </a>
                  </Tooltip>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cursor-following preview (desktop / fine pointers only) */}
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {active ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{ width: PREVIEW_W }}
              className="absolute left-6 -mt-24 origin-top-left overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20"
            >
              <div className="flex items-center gap-1.5 border-b border-border/70 bg-muted/50 px-3 py-2">
                <span className="size-1.5 rounded-full bg-border-strong" />
                <span className="size-1.5 rounded-full bg-border-strong" />
                <span className="size-1.5 rounded-full bg-border-strong" />
                {hostOf(active.live) ? (
                  <span className="ml-1.5 truncate font-mono text-[0.55rem] text-muted-foreground">
                    {hostOf(active.live)}
                  </span>
                ) : null}
              </div>
              {active.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={active.image}
                  alt=""
                  className="block aspect-[16/10] w-full object-cover object-top"
                />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-muted">
                  <span className="text-lg font-semibold tracking-tight">
                    {active.name}
                  </span>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
