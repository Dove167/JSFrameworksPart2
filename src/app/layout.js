import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Awesome Portfolio",
  description: "A modern Next.js portfolio built with Tailwind CSS and shadcn/ui",
};

import MyNavBar from "@/components/MyNavBar";
import { Toaster } from "@/components/ui/sonner";
import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { auth0 } from "@/lib/auth0";

export default async function RootLayout({ children }) {
  const session = await auth0.getSession();

  return (
    <html lang="en">
      <Auth0Provider user={session?.user}>
        <body
          className={`${robotoMono.variable} antialiased`}
        >
          <header className="sticky top-0 z-50 bg-white shadow-sm">
            <MyNavBar />
          </header>
          <main className="min-h-screen w-full">{children}</main>
          <Toaster />
        </body>
      </Auth0Provider>
    </html>
  );
}
