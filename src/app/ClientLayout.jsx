"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import MyNavBar from "@/components/MyNavBar";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/PageTransition";

export default function ClientLayout({ children }) {
  const { user, error, isLoading } = useUser();

  return (
    <Auth0Provider user={user}>
      <html lang="en" className="scroll-smooth">
        <body
          className={`antialiased`}
        >
          <header className="sticky top-0 z-50 bg-white shadow-sm">
            <MyNavBar />
          </header>
          <main className="min-h-screen w-full">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Toaster />
        </body>
      </html>
    </Auth0Provider>
  );
}