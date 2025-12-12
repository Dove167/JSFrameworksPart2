"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroEditorForm from '@/components/hero-editor-form';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardPage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [isLoading, user, router]);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
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

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  if (isLoading) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="loading"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"
              variants={spinnerVariants}
              animate="animate"
            />
            <motion.h2
              className="text-2xl font-semibold text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Loading Dashboard
            </motion.h2>
            <motion.p
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Please wait while we prepare your workspace...
            </motion.p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (error) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="error"
          className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100"
          variants={loadingVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="text-center space-y-4 p-8 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </motion.div>
            <motion.h2
              className="text-2xl font-semibold text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Error Loading Dashboard
            </motion.h2>
            <motion.p
              className="text-red-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {error.message}
            </motion.p>
            <motion.button
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              onClick={() => window.location.reload()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!user) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="dashboard"
        className="min-h-screen flex flex-col items-center gap-8 p-8 bg-gradient-to-br from-gray-50 to-blue-50"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="text-center space-y-4"
          variants={headerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Dashboard
          </motion.h1>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-xl text-gray-600">Welcome, {user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="w-full max-w-4xl"
          variants={contentVariants}
        >
          <HeroEditorForm />
        </motion.div>

        <motion.div
          className="mt-8"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <a 
            href="/api/auth/logout"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium relative overflow-hidden group"
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.svg
              className="w-5 h-5 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </motion.svg>
            <span className="relative z-10">Logout</span>
          </a>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
