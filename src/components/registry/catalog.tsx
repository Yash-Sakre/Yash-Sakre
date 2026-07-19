import type { ReactNode } from "react";
import {
  MousePointerClick,
  Tag,
  MessageCircle,
  Sparkles,
  Images,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/tooltip";
import { Reveal } from "@/components/reveal";
import { HoverPreview } from "@/components/ui/hover-preview";

export type PropRow = { prop: string; type: string; default: string; description: string };

export type CatalogEntry = {
  icon: LucideIcon;
  /** Primary export used in the usage snippets. */
  exportName: string;
  /** JSX usage example (the `<Component ... />` line). */
  usage: string;
  props: PropRow[];
};

/** Gallery display order (also the routes we generate). Excludes the `cn` lib. */
export const GALLERY_ORDER = ["button", "badge", "tooltip", "reveal", "hover-preview"];

export const CATALOG: Record<string, CatalogEntry> = {
  button: {
    icon: MousePointerClick,
    exportName: "Button",
    usage: `<Button variant="default">Click me</Button>`,
    props: [
      { prop: "variant", type: `"default" | "outline" | "secondary" | "ghost"`, default: `"default"`, description: "Visual style." },
      { prop: "size", type: `"sm" | "default" | "lg" | "icon"`, default: `"default"`, description: "Height + horizontal padding." },
      { prop: "...props", type: "ButtonHTMLAttributes", default: "—", description: "All native <button> attributes." },
    ],
  },
  badge: {
    icon: Tag,
    exportName: "Badge",
    usage: `<Badge variant="primary">New</Badge>`,
    props: [
      { prop: "variant", type: `"default" | "outline" | "primary"`, default: `"default"`, description: "Visual style." },
      { prop: "size", type: `"sm" | "default"`, default: `"sm"`, description: "Padding + text size." },
      { prop: "...props", type: "HTMLAttributes<span>", default: "—", description: "All native <span> attributes." },
    ],
  },
  tooltip: {
    icon: MessageCircle,
    exportName: "Tooltip",
    usage: `<Tooltip content="Hey there">\n  <button>Hover me</button>\n</Tooltip>`,
    props: [
      { prop: "content", type: "ReactNode", default: "—", description: "What the tooltip shows." },
      { prop: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"top"`, description: "Placement relative to the trigger." },
      { prop: "delay", type: "number", default: "120", description: "Open delay in ms." },
      { prop: "children", type: "ReactNode", default: "—", description: "The trigger element." },
    ],
  },
  reveal: {
    icon: Sparkles,
    exportName: "Reveal",
    usage: `<Reveal delay={0.1}>\n  <p>I fade &amp; slide in on scroll.</p>\n</Reveal>`,
    props: [
      { prop: "delay", type: "number", default: "0", description: "Seconds to delay the fade-up." },
      { prop: "children", type: "ReactNode", default: "—", description: "Content to reveal." },
      { prop: "...props", type: "HTMLMotionProps<div>", default: "—", description: "Forwarded to the motion.div." },
    ],
  },
  "hover-preview": {
    icon: Images,
    exportName: "HoverPreview",
    usage: `<HoverPreview image="/atlas.png" href="https://atlas.dev">\n  Atlas\n</HoverPreview>`,
    props: [
      { prop: "image", type: "string", default: "—", description: "Image shown in the popover." },
      { prop: "href", type: "string", default: "—", description: "Optional — adds a URL bar to the frame." },
      { prop: "children", type: "ReactNode", default: "—", description: "The trigger element you hover." },
      { prop: "width", type: "number", default: "320", description: "Popover width in px." },
    ],
  },
};

/** Live example rendered in each card + the detail Preview tab. */
export const PREVIEWS: Record<string, ReactNode> = {
  button: (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  badge: (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="primary">Primary</Badge>
    </div>
  ),
  tooltip: (
    <Tooltip content="Hey there 👋">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
  reveal: (
    <Reveal className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
      I fade &amp; slide up on scroll.
    </Reveal>
  ),
  "hover-preview": (
    <p className="max-w-sm text-center text-[0.95rem] leading-loose text-muted-foreground">
      Hover{" "}
      <HoverPreview
        image="/thumbnails/atlas.png"
        href="https://yash-sakre.github.io/atlas/"
        className="cursor-default font-medium text-foreground underline decoration-dotted underline-offset-4"
      >
        Atlas
      </HoverPreview>
      ,{" "}
      <HoverPreview
        image="/thumbnails/formy.png"
        href="https://tessera-beige.vercel.app"
        className="cursor-default font-medium text-foreground underline decoration-dotted underline-offset-4"
      >
        Formy
      </HoverPreview>
      , or{" "}
      <HoverPreview
        image="/thumbnails/typearena.png"
        href="https://type-arena.vercel.app"
        className="cursor-default font-medium text-foreground underline decoration-dotted underline-offset-4"
      >
        brrt
      </HoverPreview>{" "}
      to preview each one.
    </p>
  ),
};
