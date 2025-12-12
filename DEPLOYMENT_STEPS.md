# Deployment Guide: Awesome Portfolio

This guide outlines the final steps to deploy your Next.js portfolio to Vercel and configure Auth0 for production.

## 1. Vercel Environment Variables

When importing your project into Vercel, add the following environment variables. You can copy most of these from your local `.env` file, but **AUTH0_BASE_URL** must be updated for production.

| Variable Name | Value / Instructions |
| :--- | :--- |
| `AUTH0_SECRET` | A long, random string. You can generate one via terminal: `openssl rand -hex 32` |
| `AUTH0_BASE_URL` | **Production URL**: `https://<your-project-name>.vercel.app` (Do not use localhost) |
| `AUTH0_ISSUER_BASE_URL` | Your Auth0 Domain (e.g., `https://dev-xyz.us.auth0.com`) |
| `AUTH0_CLIENT_ID` | Your Auth0 Client ID |
| `AUTH0_CLIENT_SECRET` | Your Auth0 Client Secret |
| `NEON_DB_URL` | Your Neon Postgres connection string (e.g., `postgres://user:pass@ep-xyz.aws.neon.tech/neondb...`) |

> **Note:** Ensure `AUTH0_BASE_URL` does *not* have a trailing slash.

## 2. Auth0 Dashboard Configuration

You must tell Auth0 to trust your deployed Vercel domain.

1.  Log in to your [Auth0 Dashboard](https://manage.auth0.com/).
2.  Go to **Applications** > **Applications** > Select your App.
3.  Scroll down to the **Application URIs** section.
4.  Add your Vercel production URL (e.g., `https://awesome-portfolio-xyz.vercel.app`) to the following fields (comma-separated if localhost is already there):

    *   **Allowed Callback URLs**:
        ```
        https://<your-project-name>.vercel.app/api/auth/callback
        ```
    *   **Allowed Logout URLs**:
        ```
        https://<your-project-name>.vercel.app
        ```
    *   **Allowed Web Origins**:
        ```
        https://<your-project-name>.vercel.app
        ```
5.  Click **Save Changes** at the bottom.

## 3. Smoke Test Checklist

After deployment is successful, perform these quick checks to ensure everything is working:

- [ ] **Public Access**: Visit the homepage (`/`). It should load without error.
- [ ] **Authentication**: Click the "Login" button. You should be redirected to Auth0 and back successfully.
- [ ] **Protected Route**: Navigate to `/dashboard`. You should see your user profile data.
- [ ] **Database Connection**: On the dashboard, verify you can see the "Edit Hero" form (this fetches data from Neon).
- [ ] **Mutation**: Try changing the Hero "Title" or "Subtitle" and clicking Save.
- [ ] **Verification**: Go back to the homepage. The text changes should be reflected immediately.

## 4. Troubleshooting

*   **Build Fails on Vercel?** Check the "Build Logs" tab. Common issues include missing environment variables or linting errors.
*   **500 Error on Login?** Double-check `AUTH0_SECRET` and `AUTH0_BASE_URL` in Vercel settings.
*   **Callback mismatch error?** Ensure the URL in "Allowed Callback URLs" exactly matches your Vercel domain (https vs http, trailing slashes).