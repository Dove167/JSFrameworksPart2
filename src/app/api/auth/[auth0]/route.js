// This file is not needed in Auth0 v4 - the SDK auto-mounts handlers for /auth routes
// The middleware will handle authentication automatically
export async function GET() {
  return new Response('Auth routes are handled automatically by the Auth0 SDK', { status: 404 });
}