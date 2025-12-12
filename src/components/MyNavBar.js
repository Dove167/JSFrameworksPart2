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
import { motion } from "framer-motion";

export default function MyNavBar() {
  const { user, isLoading } = useUser();

  // Animation variants for navigation items
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const linkHoverVariants = {
    hover: {
      y: -2,
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const authButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-gray-900/95 backdrop-blur-lg border-b border-gray-700/50 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 animated-gradient opacity-10" />
      
      <div className="relative container mx-auto px-4">
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex h-14 items-center space-x-4 lg:space-x-6">
            <NavigationMenuItem>
              <motion.div whileHover="hover" whileTap="tap" variants={linkHoverVariants}>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-800/80 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 border border-gray-600/50 hover:border-gray-500 text-gray-300 hover:shadow-lg"
                  >
                    {/* Animated hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.span
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                      className="relative z-10 text-gray-300 group-hover:text-white"
                    >
                      Home
                    </motion.span>
                  </Link>
                </NavigationMenuLink>
              </motion.div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <motion.div whileHover="hover" whileTap="tap" variants={linkHoverVariants}>
                <NavigationMenuLink asChild>
                  <Link
                    href="/projects"
                    className="group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-800/80 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 border border-gray-600/50 hover:border-gray-500 text-gray-300 hover:shadow-lg"
                  >
                    {/* Animated hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.span
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                      className="relative z-10 text-gray-300 group-hover:text-white"
                    >
                      Projects
                    </motion.span>
                  </Link>
                </NavigationMenuLink>
              </motion.div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <motion.div whileHover="hover" whileTap="tap" variants={linkHoverVariants}>
                <NavigationMenuLink asChild>
                  <Link
                    href="/resume"
                    className="group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-800/80 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 border border-gray-600/50 hover:border-gray-500 text-gray-300 hover:shadow-lg"
                  >
                    {/* Animated hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.span
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                      className="relative z-10 text-gray-300 group-hover:text-white"
                    >
                      Resume
                    </motion.span>
                  </Link>
                </NavigationMenuLink>
              </motion.div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <motion.div whileHover="hover" whileTap="tap" variants={linkHoverVariants}>
                <NavigationMenuLink asChild>
                  <Link
                    href="/contact"
                    className="group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-800/80 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 border border-gray-600/50 hover:border-gray-500 text-gray-300 hover:shadow-lg"
                  >
                    {/* Animated hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-md bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    
                    <motion.span
                      variants={navItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.4 }}
                      className="relative z-10 text-gray-300 group-hover:text-white"
                    >
                      Contact
                    </motion.span>
                  </Link>
                </NavigationMenuLink>
              </motion.div>
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem>
                <motion.div whileHover="hover" whileTap="tap" variants={linkHoverVariants}>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard"
                      className="group relative inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-800/80 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 border border-gray-600/50 hover:border-gray-500 text-gray-300 hover:shadow-lg"
                    >
                      {/* Animated hover background */}
                      <motion.div
                        className="absolute inset-0 rounded-md bg-gradient-to-r from-slate-600 to-slate-700 opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                      
                      <motion.span
                        variants={navItemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.5 }}
                        className="relative z-10 text-gray-300 group-hover:text-white"
                      >
                        Dashboard
                      </motion.span>
                    </Link>
                  </NavigationMenuLink>
                </motion.div>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="relative container mx-auto px-4 pb-2">
        <div className="flex justify-end">
          {!isLoading && (
            <motion.div
              variants={authButtonVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center space-x-2"
            >
              {user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 border border-gray-600/50"
                  >
                    <Profile />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <LogoutButton />
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-2 border border-gray-600/50"
                >
                  <LoginButton />
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
