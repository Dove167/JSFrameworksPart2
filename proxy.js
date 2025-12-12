import { auth0 } from "./src/lib/auth0";
import { NextResponse } from "next/server";

export async function proxy(request) {
  console.log("🔍 Proxy intercepted:", request.url);
  
  // Get the Auth0 response first
  const authRes = await auth0.middleware(request);
  
  // Ensure your own middleware does not handle the `/auth` routes, auto-mounted and handled by the SDK
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  // Allow access to public routes without requiring a session
  if (request.nextUrl.pathname === "/") {
    return authRes;
  }

  // Define protected routes
  const protectedPaths = [
    '/dashboard',
    '/projects/new',
    '/projects/edit',
  ];
  
  // Check if current path is protected
  const isProtectedRoute = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );
  
  // Get session to check if user is authenticated
  const session = await auth0.getSession(request);
  
  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return authRes;
}

// CRITICAL: Use broad matcher to catch ALL routes including /auth/*
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};