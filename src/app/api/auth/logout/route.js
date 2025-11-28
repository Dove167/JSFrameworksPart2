// Auth0 v4 logout route
export async function GET() {
  const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL;
  const baseUrl = process.env.AUTH0_BASE_URL;
  
  // Clear cookies and redirect to logout
  const logoutUrl = `${auth0Domain}/v2/logout?` +
    `client_id=${process.env.AUTH0_CLIENT_ID}&` +
    `returnTo=${baseUrl}`;
    
  // Clear any session cookies
  const response = new Response(null, { status: 302 });
  response.headers.set('Location', logoutUrl);
  response.headers.set('Set-Cookie', 'appSession=; Path=/; HttpOnly; Max-Age=0');
  
  return response;
}