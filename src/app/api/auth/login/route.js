import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    const response = await auth0.handleLogin();
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", process.env.AUTH0_BASE_URL));
  }
}