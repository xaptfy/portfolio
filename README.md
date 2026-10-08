# Arina Bykovskaia Portfolio

An interactive product design portfolio built with Next.js, React, Framer Motion, and a carefully tuned glassy desktop interface.

The site presents product design cases as a playful personal operating system: animated folders, hover previews, a desktop/list switcher, case galleries, motion assets, language switching, and a small arcade-style game.

## Highlights

- Animated 2x2 case folder grid with large hover previews.
- Liquid-glass visual system for cards, folders, buttons, and controls.
- Case pages with horizontal screenshot galleries, vertical layouts, and video support.
- Separate Concepts collection for exploratory screens and motion fragments.
- Intro roulette experience that sends visitors into a random case.
- RU/EN language toggle for the home UI.
- Responsive mobile layout with preserved content hierarchy.
- Tiny game route with Supabase-backed score support.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Supabase client
- Vercel Analytics

## Project Structure

```txt
src/app/page.tsx                 Home page, folder grid, desktop mode, intro flow
src/app/cases/[slug]/page.tsx    Dynamic case pages and case data
src/app/game/page.tsx            Portfolio mini-game
src/app/components/              Shared visual components
src/lib/supabase.ts              Supabase client setup
public/case-previews/            Folder preview artwork
public/concept/                  Concepts gallery assets
public/cases/                    Case study media
public/folders/                  Folder SVG layers
public/icons/                    Social/action icons
public/logo/                     Roulette and brand icons
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # Start local development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment

The app can run without Supabase for the core portfolio experience. Supabase is used by the game/score flow when the relevant environment variables are configured in `.env.local`.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Content Notes

Case metadata and galleries live in `src/app/cases/[slug]/page.tsx`.

Home folder previews are configured in `src/app/page.tsx`:

- `PREVIEW_ASSETS`
- `PREVIEW_LINKS`
- `PREVIEW_IMAGE_SIZES`
- `DESKTOP_CASES`

When adding new preview images, include their real dimensions in `PREVIEW_IMAGE_SIZES` so hover spacing stays accurate and previews do not overlap.

## Build Check

Before publishing changes:

```bash
npm run build
```

For stricter TypeScript validation:

```bash
npx tsc --noEmit
```

