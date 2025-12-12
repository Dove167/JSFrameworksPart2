# Lab 5 Plan: Hero CRUD & Vercel Prep

This plan outlines the steps to make the Hero section of the portfolio dynamic, editable via a protected dashboard, and ready for deployment on Vercel.

## 🎯 Objectives
- **Persist Hero Data**: Store avatar and text content in Neon Postgres.
- **Authenticated CRUD**: Secure API endpoints for updating hero content.
- **Protected Dashboard**: UI for editing hero content, accessible only to logged-in users.
- **Dynamic Homepage**: Render hero content from the database on the server.
- **Vercel Readiness**: Configuration for seamless deployment.

## 🛠️ Implementation Steps

### 1. Dependencies & Setup
- **Install `image2uri`**: Required for converting uploaded images to Data URLs on the server.
  ```bash
  npm install image2uri
  ```

### 2. Database Layer (`src/lib/db.js`)
Extend the existing database helper library to handle the `hero` table.

- **Constants**:
  - `HERO_PLACEHOLDER_AVATAR`: Default base64 or URL for the avatar.
  - `defaultHeroContent`: Default text values.
- **Functions**:
  - `ensureHeroTable()`: Create the `hero` table if it doesn't exist.
    - Schema: `id (uuid)`, `avatar (text)`, `full_name (text)`, `short_description (text)`, `long_description (text)`, timestamps.
  - `getHero()`: Fetch the single hero record. Return defaults if none exists.
  - `upsertHero(updates)`: Merge incoming updates with existing data and save.

### 3. API Route (`src/app/api/hero/route.js`)
Create the API endpoints to handle data flow.

- **GET (Public)**:
  - Call `getHero()`.
  - Return JSON response with hero data.
- **PUT (Protected)**:
  - Wrap with `auth0.withApiAuthRequired`.
  - Parse `FormData`.
  - Convert `avatarFile` to Data URL using `image2uri`.
  - Validate data using `zod`.
  - Call `upsertHero(payload)`.
  - Return updated data.

### 4. Frontend Components

#### `src/components/hero-editor-form.jsx` (New)
A client-side form for editing hero details.
- **Features**:
  - Fetches current hero data on mount.
  - Uses `react-hook-form` for state management.
  - File input for avatar with immediate client-side preview.
  - Submits data to `/api/hero` via PUT.
  - Displays success/error toast notifications.

#### `src/app/dashboard/page.jsx` (Update)
The protected administration area.
- **Logic**:
  - Check for authentication using `useUser()` or server-side session check.
  - If authenticated: Render `<HeroEditorForm />`.
  - If guest: Show a login prompt/button.

#### `src/components/MyHeroSection.jsx` (Update)
The public-facing hero display.
- **Strategy**: React Server Component.
- **Logic**:
  - Import `getHero` from `@/lib/db`.
  - Fetch data directly during server rendering.
  - Pass data to UI elements.
  - Use `defaultHeroContent` as fallback.

### 5. Integration
- **`src/app/page.js`**:
  - Ensure the homepage revalidates correctly.
  - Add `export const revalidate = 0;` to force dynamic rendering (ensures DB updates show immediately).

### 6. Vercel Deployment Prep
Prepare the environment for production.

- **Environment Variables**:
  - `NEON_DB_URL`
  - `AUTH0_SECRET`
  - `AUTH0_BASE_URL` (Your Vercel domain)
  - `AUTH0_ISSUER_BASE_URL`
  - `AUTH0_CLIENT_ID`
  - `AUTH0_CLIENT_SECRET`
- **Auth0 Configuration**:
  - Add Vercel production URLs to "Allowed Callback URLs", "Allowed Logout URLs", and "Allowed Web Origins".

## 🧜‍♀️ Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant API as /api/hero
    participant DB as Neon Postgres
    participant Homepage

    User->>Dashboard: Access /dashboard
    alt Not Logged In
        Dashboard-->>User: Show Login Prompt
    else Logged In
        Dashboard->>API: GET /api/hero (fetch current)
        API->>DB: getHero()
        DB-->>API: Hero Data
        API-->>Dashboard: JSON Data
        Dashboard-->>User: Render HeroEditorForm

        User->>Dashboard: Upload Avatar & Edit Text
        Dashboard->>API: PUT /api/hero (FormData)
        Note over API: Verify Auth0 Session
        Note over API: Convert File -> DataURL
        API->>DB: upsertHero(updates)
        DB-->>API: Updated Row
        API-->>Dashboard: Success 200
    end

    User->>Homepage: Visit /
    Homepage->>DB: getHero() (Server-Side)
    DB-->>Homepage: Hero Data
    Homepage-->>User: Render Dynamic Hero