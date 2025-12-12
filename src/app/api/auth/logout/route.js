import { auth0 } from '@/lib/auth0';

export const GET = async (req) => {
  try {
    return await auth0.logout(req, {
      returnTo: '/'
    });
  } catch (error) {
    return new Response('Logout failed', { status: 500 });
  }
};