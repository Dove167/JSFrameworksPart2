# Lab 1 Plan: Next.js Portfolio Setup & Homepage Foundation

**Project Name:** awesome-portfolio
**Base Color Palette:** slate (changed from fuchsia)
**Duration:** ~180 minutes  
**Goal:** Initialize a new Next.js app (JavaScript), add Tailwind CSS + shadcn/ui, set a global layout, and build a reusable NavBar plus a starter Hero/Projects preview area.

## What You'll Build
- New Next.js app using JavaScript (not TypeScript) with App Router and Tailwind CSS preconfigured.
- shadcn/ui installed with slate base color palette.
- Reusable NavBar component using shadcn's Navigation Menu with links: Home, Resume, Projects, Login.
- Modular page structure (components in src/).
- Google Fonts via Next.js font integration.
- Outcome: styled homepage with working navigation ready to expand.

## Prerequisites Checklist
- [x] Node.js installed (verify with `node -v`).
- [x] VS Code or another editor.
- [x] Note: Use `npm run dev` for development (NOT `npm start`).

## Step-by-Step Checklist

### Step 1: Create the Next.js App
- [x] Open Terminal in desired folder.
- [x] Run CLI: `npx create-next-app@latest`
- [x] Answer prompts:
  - Project name: awesome-portfolio
  - TypeScript? No
  - ESLint? Yes
  - React Compiler? Yes
  - Tailwind CSS? Yes
  - src/ directory? Yes
  - App Router? Yes
  - Turbopack? Yes
  - Customize import alias? No
- [x] Outcome: Project folder with `next.config.mjs`, `package.json`, `tailwind.config.js`, `src/`, `public/`, `.gitignore`, etc.

### Step 2: Run the Dev Server (fix gotcha)
- [x] cd into awesome-portfolio
- [x] Run `npm run dev`
- [x] Open http://localhost:3000 to see Next.js starter.
- [x] Gotcha: Avoid `npm start` (for production builds only).
- [x] Outcome: Live dev server running.

### Step 3: Install and Configure shadcn/ui
- [x] Run `npx shadcn@latest init`
- [x] Choose base color: slate
- [x] Add components: `npx shadcn@latest add navigation-menu card button skeleton` (typography not needed)
- [x] Outcome: shadcn/ui configured with global CSS, lib/components structure, components ready.

### Step 4: Global Layout & Fonts
- [x] Edit `src/app/layout.js`
- [x] Set metadata: title: "Awesome Portfolio", description
- [x] Integrate Google Fonts (Roboto Mono via `next/font/google`)
- [x] Ensure `<body>` wraps `{children}`
- [x] Outcome: Consistent root layout with fonts/metadata.

### Step 5: Build Reusable NavBar Component
- [x] Create `src/components/MyNavBar.js`
- [x] Use shadcn NavigationMenu + subcomponents
- [x] Add links: Home (/), Projects (/projects), Resume (/resume), Login (/login)
- [x] Make sticky: `sticky top-0`
- [x] Import and use in `src/app/page.js`
- [x] Gotchas: Use asChild for clickable links (Next.js Link or <a>)
- [x] Outcome: Sticky NavBar on homepage with working links.

### Step 6: Build Hero Component
- [x] Create `src/components/MyHeroSection.jsx`
- [x] Use shadcn Card, Next.js Image (`src="https://lipsum.app/300x300"`)
- [x] Add h1 (name), description, layout flex/grid
- [x] Optional: Typography/Google Fonts
- [x] Import and render in `src/app/page.js` below NavBar
- [x] Layout tips: flex flex-col, justify-start, items-stretch
- [x] Outcome: Responsive Hero with card, image, name/description.

### Step 7: Build Projects Preview Card Component
- [x] Create `src/components/project-preview-card.jsx`
- [x] Prop: count (default 3)
- [x] Hardcoded data: title, desc, img (https://placehold.co/300x200), link
- [x] Render with shadcn Card, Button, Skeleton
- [x] Responsive: grid/flex layout
- [x] Import and render `<ProjectPreviewCard count={3} />` in `src/app/page.js` below Hero
- [x] Outcome: Same-sized responsive project cards.

## Final Checklist (Before Submission)
- [x] Sticky Navigation Bar
- [x] Mandatory Links: Home, Projects, Login
- [x] Responsive Hero Section
- [x] Mandatory items: Card, Image, Your Name, Description
- [x] Responsive Project Preview Card
- [x] Mandatory Details: Customizable # of Projects, Same Sized Cards, Consistent Tailwind Styling
- [ ] Screenshots: Full page (mobile & desktop)
- [ ] GitHub: Commit/push to new repo, provide link

## Notes
- All styling: Tailwind CSS only.
- Components: Modularity in `src/components/`.
- Gotchas: Dev server (`npm run dev`), link clickability, image paths (`/public`), layout centering.
- Ready to expand: Dynamic content, auth, etc.

## Next Steps
Once plan is approved, switch to Code mode to implement.