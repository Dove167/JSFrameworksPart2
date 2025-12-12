// Routes are handled by individual files in /login, /logout, /callback folders
export async function GET() {
  return new Response('Auth routes handled by individual files', { status: 200 });
}