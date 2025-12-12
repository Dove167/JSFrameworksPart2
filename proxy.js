// proxy.js (in ROOT directory)
import { auth0 } from "./src/lib/auth0";

export async function proxy(request) {
  console.log("🔍 Proxy intercepted:", request.url);
  return await auth0.middleware(request);
}

// CRITICAL: Use broad matcher to catch ALL routes including /auth/*
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};