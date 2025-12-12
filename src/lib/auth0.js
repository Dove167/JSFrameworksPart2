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