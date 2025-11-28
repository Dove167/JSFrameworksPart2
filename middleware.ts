import type { NextRequest } from "next/server";

// Basic middleware configuration
// Authentication protection will be handled by individual route handlers
export async function middleware(request: NextRequest) {
  // Pass through for now - Auth0 SDK handles auth in route handlers
  // Let the request continue normally
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};