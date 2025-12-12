import { auth0 } from '@/lib/auth0';

export const GET = async (req) => {
  try {
    return await auth0.login(req, {
      returnTo: '/dashboard'
    });
  } catch (error) {
    return new Response('Authentication failed', { status: 401 });
  }
};