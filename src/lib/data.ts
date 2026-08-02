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
  location: "Gurugram, India",
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
      text: "I build fast, real-time interfaces for the web — WebSocket-driven orchestration dashboards, Electron clients decoding H.265 in the browser, and design systems other teams build on — and sweat the details people feel but rarely notice. Currently building with ",
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
  /** Doubles as the site meta description — keep it near 160–200 characters. */
  summary:
    "Frontend engineer at Intozi building real-time, media-heavy web apps — WebSocket orchestration dashboards, Electron clients with H.265 decoding and HLS at 100-stream scale, and design systems.",
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
    location: "Gurugram, India",
    type: "Full-time",
    summary:
      "Building real-time, media-heavy dashboards and desktop clients that power a computer-vision automation platform — orchestrating cameras, services, and workflows from a single interface.",
    tech: ["React", "TypeScript", "Electron", "Tailwind CSS", "Storybook", "Vite", "Node.js", "Docker", "Nginx"],
    highlights: [
      {
        title: "Real-time Automation Dashboard",
        description:
          "Built a node-based workflow orchestration dashboard in React Flow, backed by a WebSocket event layer streaming live execution state and camera switching — letting operators compose and run Docker-backed service pipelines visually, and cutting manual operational effort by 40%.",
        tags: ["React Flow", "WebSockets", "Docker"],
      },
      {
        title: "Cross-Platform Video Management System",
        description:
          "Building an Electron desktop client for video management with client-side H.265 (HEVC) decoding and HLS playback, sustaining 100 concurrent streams at under 2s time-to-first-frame.",
        tags: ["Electron", "H.265 / HEVC", "HLS"],
      },
      {
        title: "Recording & Streaming Pipeline",
        description:
          "Shipped recording management and playback over an NGINX VOD streaming backend, covering seek, scrubbing, and export across multi-camera deployments.",
        tags: ["NGINX VOD", "Playback", "Multi-camera"],
      },
      {
        title: "Build & Bundle Optimisation",
        description:
          "Cut initial bundle size by 80% via route-level code splitting and lazy loading, and migrated the codebase to Vite 8 (Rolldown) — reducing production build times ~7×, from ~70s to under 10s.",
        tags: ["Vite 8", "Rolldown", "Code splitting"],
      },
      {
        title: "Design System & Component Library",
        description:
          "Established a Storybook-based design system of 40+ components with shared design tokens, variants, and documentation — adopted across 3 applications and reducing new-feature UI build time by ~30%.",
        tags: ["Storybook", "Design System", "Components"],
      },
      {
        title: "Spatial Visualization Engine",
        description:
          "Designed an SVG-based spatial visualization engine to model layouts, live positioning, and camera movement within interactive 2D environments.",
        tags: ["SVG", "Canvas 2D", "Realtime"],
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
      "A static-analysis platform that maps a React codebase without executing it — auto-discovering components, hooks, utilities, stores, and routes across 1,300 files in 36 seconds. AST-based parsing builds dependency graphs and import relationships, surfacing circular dependencies and dead code in an interactive, searchable dashboard.",
    tech: ["TypeScript", "React", "Vite", "Node.js"],
    github: "https://github.com/Yash-Sakre/atlas",
    live: "https://yash-sakre.github.io/atlas/",
    image: "/thumbnails/atlas.png",
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
      "A high-performance typing trainer with real-time WPM/CPM, accuracy, and per-keystroke mistake tracking, holding sub-16ms keystroke-to-paint latency — one frame at 60fps — at 150+ WPM. Diff-based input evaluation and scoped re-renders repaint only the characters that changed, keeping the input path off the critical rendering path.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Yash-Sakre/brrt",
    live: "https://brrt-dun.vercel.app",
    image: "/thumbnails/brrt.png",
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
    detail:
      "Top team out of 1,000+ participants at a national-level hackathon organised by the Government of India.",
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
