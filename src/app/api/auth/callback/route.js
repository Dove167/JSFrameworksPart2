import { auth0 } from '@/lib/auth0';

export const GET = async (req) => {
  try {
    return await auth0.callback(req, {
      returnTo: '/dashboard'
    });
  } catch (error) {
    return new Response('Authentication callback failed', { status: 401 });
  }
};