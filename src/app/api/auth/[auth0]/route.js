import { auth0 } from '@/lib/auth0';

export async function GET(request) {
  const url = new URL(request.url);
  const action = url.pathname.split('/').pop();
  
  if (action === 'login') {
    return auth0.handleLogin(request);
  } else if (action === 'logout') {
    return auth0.handleLogout(request);
  } else if (action === 'callback') {
    return auth0.handleCallback(request);
  } else if (action === 'me') {
    return auth0.handleProfile(request);
  }
  
  return new Response('Not found', { status: 404 });
}