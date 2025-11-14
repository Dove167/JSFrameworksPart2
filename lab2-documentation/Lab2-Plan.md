# Lab 2 Plan: Next.js Portfolio Projects Page & Dynamic Routing

Project: `awesome-portfolio`  
Mode: We pair on architecture first, then switch to Code mode to implement.  
Goal: Deliver `/projects`, `/projects/[slug]`, `/projects/new`, and API routes powered flow, with a sticky top navbar and working “New Project” form.

---

## 1. High-Level Flow

1. Centralize project data behind `/api/projects` + `/api/projects/new`.
2. Build `/projects` index page that fetches from API and renders cards.
3. Build `/projects/[slug]` dynamic route page using the same data source.
4. Build `/projects/new` as a client component form:
   - `react-hook-form` + `zod` + `shadcn/ui`
   - keywords as add/remove chips
   - POST to `/api/projects/new`.
5. Ensure layout/nav are global, sticky, and visually above content.
6. Run through a final test checklist and capture screenshots for submission.

---

## 2. Prerequisites (Confirm Before Coding)

- [ ] Next.js App Router, JS, Tailwind already set up (done in Lab 1).
- [ ] shadcn/ui installed (Button, Card, Form, Input, Badge, Skeleton).
- [ ] `MyNavBar`, `MyHeroSection`, and `project-preview-card` from Lab 1 exist.
- [ ] Dev server via `npm run dev` on `http://localhost:3000`.
- [ ] `.env.local` with:
  - `NEXT_PUBLIC_BASE_URL=http://localhost:3000`
- [ ] Packages installed:
  - `npm i react-hook-form @hookform/resolvers zod`

---

## 3. Layout & Navbar (Step 1)

Objective: Navbar appears on all pages, stays sticky, and sits above hover-scaling cards.

Tasks:
- [ ] Update [`src/app/layout.js`](src/app/layout.js) to:
  - Import `MyNavBar`.
  - Render:
    - `<MyNavBar />` above `{children}`.
  - Wrap content with a main container if needed.
- [ ] Add Tailwind classes to navbar:
  - `sticky top-0 z-50 bg-white` (or matching theme) to prevent overlap.
- [ ] Verify:
  - Navigating between pages keeps navbar visible.
  - Hovering cards never cover the navbar.

---

## 4. Projects API: GET /api/projects (Step 2)

Objective: Move project data into an App Router API route.

Tasks:
- [ ] Create folder & file:
  - [`src/app/api/projects/route.js`](src/app/api/projects/route.js)
- [ ] Implement:
  - `export async function GET() { ... }`
  - Return `Response.json({ projects })` where `projects` is an array:
    - `title`, `description`, `image`, `link`, `keywords`.
- [ ] Seed at least 3–5 sample projects.
- [ ] Test:
  - Visit `http://localhost:3000/api/projects` in the browser.
  - Confirm JSON shape: `{ "projects": [ ... ] }`.

---

## 5. Projects Index Page: /projects (Step 3)

Objective: Read from `/api/projects` and show grid of cards.

Tasks:
- [ ] Create:
  - [`src/app/projects/page.jsx`](src/app/projects/page.jsx)
- [ ] Import:
  - `Link` from `next/link`
  - `Image` from `next/image`
  - `Card` from `@/components/ui/card`
  - `Button` from `@/components/ui/button`
  - `createSlug` from `@/src/lib/utils` (once extracted)
- [ ] Implement `createSlug` (if not already):
  - Define in [`src/lib/utils.js`](src/lib/utils.js)
  - Reuse anywhere slug is needed.
- [ ] In `ProjectsPage`:
  - Use `fetch(\`\${process.env.NEXT_PUBLIC_BASE_URL}/api/projects\`, { cache: "no-store" })`
  - Parse `{ projects }`.
  - Map to cards in a responsive grid.
  - For each project:
    - Compute `slug = createSlug(p.title)`.
    - Show `title`, `description`, `image`, `keywords`.
    - Buttons:
      - Open external link.
      - Details → `/projects/${slug}`.
- [ ] Styling:
  - Use shadcn `Card`, Tailwind spacing, hover scale, etc.
- [ ] Verify:
  - `/projects` loads without console errors.
  - Cards display correctly on mobile and desktop.

---

## 6. Dynamic Detail Page: /projects/[slug] (Step 4)

Objective: Show a single project, matched by slug derived from title.

Tasks:
- [ ] Ensure `createSlug` is exported from [`src/lib/utils.js`](src/lib/utils.js).
- [ ] Create folder & file:
  - [`src/app/projects/[slug]/page.jsx`](src/app/projects/[slug]/page.jsx)
- [ ] In `ProjectDetailPage({ params })`:
  - Access `const { slug } = params;`
  - Fetch projects from `/api/projects` (same as index).
  - Find matching project:
    - `projects.find(p => createSlug(p.title) === slug)`
  - If not found:
    - Return a simple “Project not found” UI or throw `notFound()`.
  - If found:
    - Render:
      - Title
      - Description
      - Image
      - Keywords as `Badge` chips
      - Button linking to `project.link`
- [ ] Verify:
  - Clicking “Details” on `/projects` opens correct project.
  - Direct URL navigation `/projects/some-slug` works.

---

## 7. New Project Form: /projects/new (Step 5)

Objective: Client-side form with validation + keyword chips that POSTs using FormData.

Tasks:
- [ ] Create:
  - [`src/app/projects/new/page.jsx`](src/app/projects/new/page.jsx)
- [ ] Mark as client component:
  - `"use client";`
- [ ] Import:
  - `useForm` from `react-hook-form`
  - `z` from `zod`
  - `zodResolver` from `@hookform/resolvers/zod`
  - `useState` from `react`
  - shadcn/ui: `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `Input`, `Button`, `Badge`
- [ ] Define `newProjectSchema`:
  - `title`: string, min length (e.g., 2)
  - `description`: non-empty string
  - `img` (or `image`): `z.string().url()`
  - `link`: `z.string().url()`
  - `keywords`: `z.array(z.string().min(1)).default([])`
- [ ] Setup `useForm` with:
  - `resolver: zodResolver(newProjectSchema)`
  - `defaultValues` with sample content.
- [ ] Keywords UI:
  - Local `draftKeyword` state.
  - Add on Enter or Add button.
  - Render keywords as removable `Badge` chips.
- [ ] `onSubmit(values)`:
  - Build `FormData`.
  - Append `title`, `description`, `img`/`image`, `link`.
  - Append `keywords`:
    - Either as JSON string or multiple entries; match what POST handler expects.
  - `fetch('/api/projects/new', { method: 'POST', body: formData })`
  - Handle success:
    - For now: console log, maybe reset or display a simple message.
- [ ] Verify:
  - Form shows client-side validation messages.
  - Keywords add/remove correctly.
  - No TypeScript issues (JS only).

---

## 8. POST /api/projects/new Endpoint (Step 6)

Objective: Receive form POST, parse FormData, log project.

Tasks:
- [ ] Create:
  - [`src/app/api/projects/new/route.js`](src/app/api/projects/new/route.js)
- [ ] Implement:
  ```js
  export async function POST(req) {
    try {
      const formData = await req.formData();
      const title = formData.get("title");
      const description = formData.get("description");
      const img = formData.get("img"); // or "image" – must match the form
      const link = formData.get("link");
      // keywords could be a JSON string or CSV; parse accordingly

      const rawKeywords = formData.get("keywords");
      const keywords = rawKeywords
        ? JSON.parse(rawKeywords)
        : [];

      // TODO: add Zod validation here (server-side) in future
      // TODO: persist to DB and revalidatePath("/projects") later

      console.log({ project: { title, description, img, link, keywords } });

      return Response.json(
        { ok: true, project: { title, description, img, link, keywords } },
        { status: 201 }
      );
    } catch (err) {
      console.error(err);
      return Response.json(
        { ok: false, error: "Invalid payload" },
        { status: 400 }
      );
    }
  }
  ```
- [ ] Verify:
  - Submit `/projects/new`.
  - Check terminal logs for project payload.
  - Confirm 201 response in Network tab.

---

## 9. Troubleshooting Notes

- Navbar behind cards:
  - Ensure navbar + wrapper use `z-50` and cards don’t exceed that z-index.
- 404 on `/projects/[slug]`:
  - Confirm slug logic identical in:
    - `/projects/page.jsx` and `[slug]/page.jsx`.
- Image issues:
  - Local: place under `/public/images/...` and reference `/images/...`
  - Remote: ensure allowed in `next.config.mjs` `images.domains`.
- Validation edge cases:
  - `z.string().url()` is valid; ignore old deprecation warnings.
- API not hit on submit:
  - Ensure form `onSubmit={form.handleSubmit(onSubmit)}`.
  - Ensure correct POST URL: `/api/projects/new`.
  - Check console/network for CORS or 4xx.

---

## 10. Final Test Checklist (Before Submission)

- [ ] Navbar:
  - Visible on all pages.
  - Sticky at top, never hidden behind content.
- [ ] `/api/projects`:
  - Returns expected JSON array.
- [ ] `/projects`:
  - Fetches from `/api/projects`.
  - Renders responsive grid of project cards.
  - “Details” buttons point to `/projects/[slug]`.
- [ ] `/projects/[slug]`:
  - Loads correct project based on slugified title.
  - Shows title, description, image, link, and keywords.
- [ ] `/projects/new`:
  - Renders with default values.
  - Keywords add/remove correctly (chips).
  - Client validation works.
  - Successful submit issues POST → `/api/projects/new`.
  - Server logs payload.
- [ ] Screenshots:
  - Full-page desktop views (home, projects, etc.).
  - Full-page mobile views.
- [ ] GitHub:
  - New repo for Lab 2.
  - All Lab 2 code committed and pushed.
  - Repo link ready for submission.

---

## 11. Implementation Order (Quick TODO View)

1. Layout & Navbar global + z-index.
2. GET `/api/projects`.
3. `/projects` index page.
4. `createSlug` utility extraction.
5. `/projects/[slug]` dynamic detail page.
6. `/projects/new` form (client, zod, RHF, shadcn).
7. POST `/api/projects/new` handler.
8. Full testing + screenshots + GitHub push.

Once this plan is executed, the portfolio will have a complete Lab 2 projects system wired through Next.js App Router APIs and ready for future DB integration.