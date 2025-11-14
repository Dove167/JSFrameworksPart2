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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <MyNavBar />
        </header>
        <main className="min-h-screen w-full">{children}</main>
      </body>
    </html>
  );
}
