"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

// Placeholder for when no avatar is set
const HERO_PLACEHOLDER_AVATAR = "https://placehold.co/400x400/png?text=Avatar";

// Animation variants for professional entrance effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.3,
    },
  },
};

export default function MyHeroSection() {
  const [hero, setHero] = useState({});

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch("/api/hero");
        if (res.ok) {
          const data = await res.json();
          setHero(data.data || {});
        }
      } catch (error) {
        console.error("Failed to fetch hero data", error);
      }
    }
    fetchHero();
  }, []);

  return (
    <div className="relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient-blue opacity-30" />
      <div className="absolute inset-0 animated-gradient-purple opacity-20" />
      
      <motion.section 
        className="relative py-12 md:py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <motion.div className="flex-1" variants={itemVariants}>
              <Card className="p-6 modern-card glow-blue hover-scale-color relative overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 animated-gradient opacity-5" />
                
                <CardHeader className="relative z-10">
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-2">
                      {hero.fullName || "Your Name"}
                    </CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.p 
                    className="text-lg text-gray-700 leading-relaxed font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {hero.longDescription || "Welcome to my portfolio! I am a passionate developer focused on creating amazing web experiences. This is a brief description about yourself and your skills. You can customize this text to tell your story."}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div 
              className="flex-1"
              variants={imageVariants}
            >
              <div className="relative w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl rainbow-border hover-scale-color">
                <motion.div
                  className="absolute inset-0 animated-gradient-blue opacity-20"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <Image
                  src={hero.avatar || HERO_PLACEHOLDER_AVATAR}
                  alt="Profile picture"
                  fill
                  className="object-cover relative z-10 hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                
                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-70"
                  animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-70"
                  animate={{ y: [0, 10, 0], rotate: [0, -180, -360] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}