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

import ClientLayout from "./ClientLayout";

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}
