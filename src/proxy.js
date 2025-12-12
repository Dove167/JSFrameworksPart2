import { auth0 } from "@/lib/auth0";

// Export as named function "proxy" (not default export)
export async function proxy(request) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/new',
    '/projects/:uuid/edit',
    '/api/projects/new',
    '/api/projects/:uuid',
  ],
};
