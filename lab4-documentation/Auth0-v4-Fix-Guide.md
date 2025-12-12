# Auth0 v4 Next.js App Router Authentication Fix

## Issue Summary
The "Callback URL mismatch" error occurs because the Auth0 dashboard callback URLs don't match the routes being used by the application.

## Solution Overview
For Auth0 SDK v4.13.1 with Next.js App Router, we need to configure the correct callback URLs and ensure the authentication flow works properly.

## Required Auth0 Dashboard Configuration

### 1. Configure Callback URLs
In your Auth0 Dashboard (https://manage.auth0.com/):

1. Go to **Applications** > **Your App**
2. Go to **Settings** tab
3. In **Application URIs** section, set:

**Allowed Callback URLs:**
```
http://localhost:3000/auth/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000
```

**Allowed Web Origins:**
```
http://localhost:3000
```

### 2. Application URLs Configuration
Make sure your Auth0 application has these settings:
- **Application Type**: Regular Web Application
- **Grant Types**: Authorization Code, Refresh Token

## Code Changes Made

### 1. Updated Auth0 Configuration (`src/lib/auth0.js`)
```javascript
import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.APP_BASE_URL || process.env.AUTH0_BASE_URL,
  secret: process.env.AUTH0_SECRET,
  routes: {
    login: "/auth/login",
    logout: "/auth/logout", 
    callback: "/auth/callback"
  },
  session: {
    cookie: {
      name: 'awesome_portfolio_session'
    }
  }
});
```

### 2. Updated Login Button (`src/components/auth/LoginButton.jsx`)
Changed from `/api/auth/login` to `/auth/login`

### 3. Updated Logout Button (`src/components/auth/LogoutButton.jsx`)
Changed from `/api/auth/logout` to `/auth/logout`

### 4. Enhanced Layout with Server-Side Session (`src/app/layout.js`)
Added server-side session passing to Auth0Provider for better hydration

### 5. Removed Dynamic Route Handler
The `/api/auth/[auth0]/route.js` is no longer needed as Auth0 v4 auto-mounts handlers

## Environment Variables Required
Ensure your `.env.local` has:
```env
AUTH0_DOMAIN=dev-hv661lylywsw5u2g.us.auth0.com
AUTH0_CLIENT_ID=wcuxoEvliq4nmrQYExmq4JXJy6p6W3eP
AUTH0_CLIENT_SECRET=7JLFAoET1hYHFq2zrPe50zIAQrgvOyAQYykrr2e9dT10l5TXevL4jl2SE9WdCM9w
AUTH0_SECRET=49e05ad9fec416f2f802e9a828276db13ebc0782971de6aa749e09e1071269ca
AUTH0_BASE_URL=http://localhost:3000
APP_BASE_URL=http://localhost:3000
```

## Testing Steps

1. **Configure Auth0 Dashboard** with the callback URLs above
2. **Create a test user** in Auth0 dashboard:
   - Go to User Management > Users
   - Create user with email: `test@example.com`
   - Password: `Test123456!`
3. **Start the development server**: `npm run dev`
4. **Test login**: Click the login button
5. **Verify authentication**: Should redirect to Auth0, then back to your app

## Key Changes Summary
- **Auth0 v4 Pattern**: Uses `/auth/*` routes instead of `/api/auth/*`
- **Auto-mounted Handlers**: Auth0 SDK handles auth routes automatically
- **Server-Side Session**: Layout passes session data to client for hydration
- **Middleware Protection**: All routes except `/auth/*` and public routes are protected

## Troubleshooting

### If still getting callback URL mismatch:
1. Double-check the callback URL in Auth0 dashboard is exactly: `http://localhost:3000/auth/callback`
2. Clear browser cache and cookies
3. Restart the development server
4. Ensure environment variables are loaded correctly

### If login doesn't redirect back:
1. Check the logout URL is set to: `http://localhost:3000`
2. Verify web origin includes: `http://localhost:3000`

The authentication should now work properly with the Auth0 SDK v4.13.1 pattern!