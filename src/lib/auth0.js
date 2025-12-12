// src/lib/auth0.js
import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.APP_BASE_URL,
  secret: process.env.AUTH0_SECRET,
  routes: {
    login: "/auth/login",
    logout: "/auth/logout", 
    callback: "/auth/callback"
  },
  session: {
    cookie: {
      name: 'appSession',
      // CRITICAL: Cookie settings for Vercel
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true on Vercel
      domain: process.env.NODE_ENV === 'production' 
        ? '.vercel.app'  // Allow cookies across Vercel subdomains
        : undefined
    },
    // Increase rolling duration to prevent session expiry
    rolling: true,
    rollingDuration: 60 * 60 * 24 * 7, // 7 days
  }
});