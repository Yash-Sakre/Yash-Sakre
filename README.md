# Yash Sakre — Portfolio

A minimal, fast, single-page portfolio built with a modern TypeScript-first stack.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** with OKLCH design tokens (red primary accent)
- **next-themes** — dark / light theme switcher (defaults to dark)
- **Motion** (`motion/react`) — subtle scroll reveals
- **lucide-react** — icons (brand icons are inline SVG in `src/components/icons.tsx`)
- shadcn-style UI primitives (`cva` + `tailwind-merge`)

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

Other scripts:

```bash
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # eslint
```

## Editing content

**All copy lives in one file: [`src/lib/data.ts`](src/lib/data.ts).**
Update your profile, experience, tech stack, projects, and links there — every
section reads from it. Nothing else needs to change for a content update.

- `profile` — name, role, tagline, summary, email, phone, location
- `socials` — GitHub / LinkedIn / email
- `experiences` — work history (Intozi) with per-role highlights
- `skillGroups` — tech stack, grouped
- `projects` — set `featured: true` on one to give it the large hero card
- `education` / `achievements`

## Structure

```
src/
├─ app/
│  ├─ layout.tsx        # fonts, metadata, ThemeProvider, Navbar + Footer shell
│  ├─ page.tsx          # assembles the sections
│  ├─ globals.css       # Tailwind v4 + design tokens (light/dark)
│  └─ icon.svg          # favicon
├─ components/
│  ├─ sections/         # hero, experience, tech-stack, projects, contact
│  ├─ ui/               # button, badge primitives
│  ├─ navbar.tsx · footer.tsx · theme-toggle.tsx · reveal.tsx · …
└─ lib/
   ├─ data.ts           # ← single source of truth for content
   └─ utils.ts          # cn() helper
```

## Customization notes

- **Primary color:** change `--primary` (and `--ring`) in `src/app/globals.css`.
- **Theme default:** `defaultTheme` in `src/app/layout.tsx`.
- **Metadata / OG:** update `metadataBase` in `src/app/layout.tsx` to your real
  domain once deployed.
- **Resume download:** drop `resume.pdf` into `public/` and wire a link in the
  hero or nav if you want a download button.

## Deploy

Deploys as static output anywhere; easiest on [Vercel](https://vercel.com/new).
