"use client";

export default function LoginButton() {
  return (
    <a
      href="/api/auth/login"
      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
    >
      Log In
    </a>
  );
}