/**
 * Single source of truth for all portfolio content.
 * Edit the values here — every section reads from this file.
 */

export type BioSegment = { text: string; strong?: boolean };

export const profile = {
  name: "Yash Sakre",
  firstName: "Yash",
  role: "Frontend Software Engineer",
  company: "Intozi",
  location: "India",
  email: "yashsakre940@gmail.com",
  phone: "+91 9479182317",
  available: true,
  availableLabel: "Open to work",
  /** Monogram shown in the profile avatar. */
  initials: "YS",

  /**
   * Hero bio. `strong` segments render in the foreground color (everything
   * else is muted), so the eye lands on the tools.
   */
  bio: [
    {
      text: "I build fast, real-time interfaces for the web — from computer-vision automation dashboards to media-heavy, low-latency apps — and sweat the details people feel but rarely notice. Currently building with ",
    },
    { text: "React", strong: true },
    { text: ", " },
    { text: "Next.js", strong: true },
    { text: ", " },
    { text: "TypeScript", strong: true },
    { text: ", and " },
    { text: "Tailwind CSS", strong: true },
    { text: "." },
  ] satisfies BioSegment[],

  tagline: "Frontend engineer building fast, production-grade interfaces for real-time products.",
  summary:
    "Frontend engineer at Intozi specializing in real-time systems, rendering performance, and scalable UI — turning complex, data-dense workflows into fast, intuitive interfaces.",
} as const;

export const socials = {
  github: "https://github.com/Yash-Sakre",
  linkedin: "https://www.linkedin.com/in/yash-sakre/",
  email: `mailto:${profile.email}`,
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
] as const;

/** Section ids observed by the navbar scroll-spy, in document order. */
export const sectionIds = ["home", "experience", "work", "contact"] as const;

/** Ordered tech stack — keys map to colored logos in `brand-icons.tsx`. */
export const techStack = [
  "typescript",
  "javascript",
  "html5",
  "css3",
  "python",
  "react",
  "nextjs",
  "redux",
  "tailwindcss",
  "sass",
  "framermotion",
  "electron",
  "nodejs",
  "postgresql",
  "mongodb",
  "prisma",
  "git",
  "docker",
  "nginx",
  "vitejs",
  "storybook",
  "vercel",
] as const;

export type Highlight = {
  title: string;
  description: string;
  tags: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  location?: string;
  type?: string;
  summary: string;
  highlights: Highlight[];
  tech: string[];
};

export const experiences: Experience[] = [
  {
    company: "Intozi",
    role: "Software Developer, Frontend",
    period: "Jan 2025 — Present",
    current: true,
    location: "India",
    type: "Full-time",
    summary:
      "Building real-time, media-heavy dashboards and visualization tooling that power a computer-vision automation platform — orchestrating cameras, services, and workflows from a single interface.",
    tech: ["React", "TypeScript", "Electron", "Redux", "Tailwind CSS", "Storybook", "Vite", "Docker", "Nginx"],
    highlights: [
      {
        title: "Real-time Automation Dashboard",
        description:
          "Built a real-time dashboard with React Flow and WebSockets to orchestrate Docker-based services, camera switching, and workflow execution — reducing manual operational effort by nearly 40%.",
        tags: ["React Flow", "WebSockets", "Docker"],
      },
      {
        title: "Chunk-based Video Playback Pipeline",
        description:
          "Engineered a chunk-based playback pipeline for long-duration recordings, with optimized buffering, timeline synchronization, and smooth scrubbing even in low-bandwidth environments.",
        tags: ["Media", "Buffering", "Performance"],
      },
      {
        title: "Spatial Visualization Engine",
        description:
          "Designed an SVG-based spatial visualization engine to model layouts, live positioning, and camera movement within interactive 2D environments.",
        tags: ["SVG", "Canvas 2D", "Realtime"],
      },
      {
        title: "Cross-Platform Video Management System",
        description:
          "Building a cross-platform Electron desktop app for a video management system — with client-side H.265 (HEVC) decoding, HLS playback, and streaming recording served through an NGINX VOD backend.",
        tags: ["Electron", "H.265 / HLS", "NGINX VOD"],
      },
      {
        title: "Design System & Component Library",
        description:
          "Set up Storybook to build and document a reusable design system — standardizing UI primitives, tokens, and interaction states for consistent, faster development across the app.",
        tags: ["Storybook", "Design System", "Components"],
      },
    ],
  },
];

export type Project = {
  name: string;
  year: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  /** Screenshot shown in the hover preview; null → styled fallback. */
  image?: string;
};

export const projects: Project[] = [
  {
    name: "Atlas",
    year: "2025",
    tagline: "Map every reusable asset in your frontend codebase.",
    description:
      "A CLI and dashboard that scans any React, Next.js, or Vite + TypeScript project and auto-documents every reusable asset — components, hooks, utilities, contexts, stores, and routes — through AST-based semantic analysis, so teams stop rebuilding what already exists.",
    tech: ["TypeScript", "React", "Vite", "Node.js"],
    github: "https://github.com/Yash-Sakre/atlas",
    live: "https://yash-sakre.github.io/atlas/",
    image: "/thumbnails/atlas.png",
  },
  {
    name: "ChatPDF",
    year: "2024",
    tagline: "Talk to your documents.",
    description:
      "An AI platform that turns dense PDFs into conversations — chunking and embedding each document for LangChain-powered vector retrieval, then grounding every answer in the most relevant passages. Ships with auth and subscription billing.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/Yash-Sakre/chat-pdf",
  },
  {
    name: "Formy",
    year: "2024",
    tagline: "Drag-and-drop forms, done right.",
    description:
      "A drag-and-drop form builder with dynamic schema generation, conditional validation, and instantly shareable links — backed by a Prisma + PostgreSQL data model that handles storage, response tracking, and analytics.",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/Yash-Sakre/Formy",
    live: "https://tessera-beige.vercel.app",
    image: "/thumbnails/formy.png",
  },
  {
    name: "brrt",
    year: "2024",
    tagline: "Type fast, measured to the millisecond.",
    description:
      "A high-performance typing trainer with real-time WPM/CPM, accuracy, and per-keystroke mistake tracking. Diff-based input evaluation and tuned rendering keep feedback instant, even at top speed.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Yash-Sakre/TypeArena",
    live: "https://type-arena.vercel.app",
    image: "/thumbnails/typearena.png",
  },
];

export type Credential = {
  title: string;
  detail: string;
  meta: string;
};

export const education: Credential = {
  title: "B.Tech, Computer Science & Engineering",
  detail: "Bhilai Institute of Technology, Durg",
  meta: "2020 — 2024 · CGPA 9.08",
};

export const achievements: Credential[] = [
  {
    title: "Winner — Kavach 2023",
    detail: "Ranked among the top teams out of 1,000+ participants.",
    meta: "National Hackathon",
  },
  {
    title: "Finalist — Smart India Hackathon 2022",
    detail: "Selected for the DRDO problem statement.",
    meta: "SIH 2022",
  },
];

/** "Get in Touch" methods, in display order. */
export const contactMethods = [
  {
    key: "email",
    title: "Email me",
    subtitle: "Quick questions & work",
    href: socials.email,
    external: false,
  },
  {
    key: "linkedin",
    title: "Connect on LinkedIn",
    subtitle: "Let's network",
    href: socials.linkedin,
    external: true,
  },
  {
    key: "github",
    title: "Browse my code",
    subtitle: "Projects & open source",
    href: socials.github,
    external: true,
  },
] as const;

export const availability = {
  replies: "Replies within 24 hours",
  openTo: "Open to full-time & freelance",
} as const;
