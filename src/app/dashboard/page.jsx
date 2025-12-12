"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroEditorForm from '@/components/hero-editor-form';

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen flex flex-col items-center gap-8 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {user.name}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
      
      <HeroEditorForm />

      <div className="mt-4">
        <a 
          href="/api/auth/logout"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 inline-block transition-colors"
        >
          Logout
        </a>
      </div>
    </section>
  );
}
