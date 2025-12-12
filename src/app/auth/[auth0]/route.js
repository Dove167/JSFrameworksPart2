// src/app/auth/[auth0]/route.js
import { handleAuth } from "@auth0/nextjs-auth0";

// This handles ALL authentication routes automatically
export const GET = handleAuth();