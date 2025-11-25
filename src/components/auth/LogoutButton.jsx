"use client";

export default function LogoutButton() {
  return (
    <a
      href="/api/auth/logout"
      className="inline-flex items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
    >
      Log Out
    </a>
  );
}