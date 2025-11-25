"use client";

import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import Profile from "./auth/Profile";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function MyNavBar() {
  const { user, isLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex h-14 items-center space-x-4 lg:space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/projects"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Projects
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/resume"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Resume
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/contact"
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/dashboard"
                    className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                  >
                    Dashboard
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="container mx-auto px-4 pb-2">
        <div className="flex justify-end">
          {!isLoading && (
            user ? (
              <div className="flex items-center space-x-2">
                <Profile />
                <LogoutButton />
              </div>
            ) : (
              <LoginButton />
            )
          )}
        </div>
      </div>
    </header>
  );
}
