"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function Profile() {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading user profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        Error loading profile: {error.message}
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <img
        src={user.picture || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2363b3ed'/%3E%3Ctext x='20' y='26' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3E${user.name?.charAt(0) || 'U'}%3C/text%3E%3C/svg%3E`}
        alt={user.name || 'User profile'}
        className="w-10 h-10 rounded-full"
        onError={(e) => {
          const target = e.target;
          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2363b3ed'/%3E%3Ctext x='20' y='26' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3E${user.name?.charAt(0) || 'U'}%3C/text%3E%3C/svg%3E`;
        }}
      />
      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}