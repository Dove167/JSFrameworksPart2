"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "Project One",
    desc: "A brief description of the first project showcasing key technologies and achievements.",
    img: "https://placehold.co/300x200",
    link: "#"
  },
  {
    title: "Project Two",
    desc: "An overview of the second project highlighting the main features and impact.",
    img: "https://placehold.co/300x200",
    link: "#"
  },
  {
    title: "Project Three",
    desc: "Details about the third project including technologies used and outcomes.",
    img: "https://placehold.co/300x200",
    link: "#"
  }
];

export default function ProjectPreviewCard({ count = 3 }) {
  const displayProjects = projects.slice(0, count);

  // Animation variants
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

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
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

  const skeletonVariants = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative">
      {/* Beautiful animated background */}
      <div className="absolute inset-0 animated-gradient-rainbow opacity-10" />
      <div className="absolute inset-0 animated-gradient-blue opacity-5" />
      
      <motion.section 
        className="relative py-12 md:py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient"
            variants={headerVariants}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <Card className="h-full flex flex-col overflow-hidden modern-card glow-blue hover-scale-color group relative">
                  {/* Animated background overlay */}
                  <motion.div
                    className="absolute inset-0 animated-gradient-blue opacity-0 group-hover:opacity-10"
                    transition={{ duration: 0.5 }}
                  />
                  
                  <CardHeader className="p-0 relative">
                    <div className="aspect-video relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-100 to-gray-200">
                      <AnimatePresence>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200"
                          variants={skeletonVariants}
                          initial="animate"
                          animate="animate"
                        />
                      </AnimatePresence>
                      <motion.img
                        src={project.img}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        variants={imageVariants}
                        onLoad={(e) => {
                          const target = e.target;
                          const skeleton = target.parentElement.querySelector('div');
                          if (skeleton) {
                            skeleton.style.display = 'none';
                          }
                        }}
                        onError={(e) => {
                          const target = e.target;
                          const skeleton = target.parentElement.querySelector('div');
                          if (skeleton) {
                            skeleton.style.display = 'block';
                          }
                          target.style.display = 'none';
                        }}
                      />
                      
                      {/* Floating project indicator */}
                      <motion.div
                        className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-80"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 flex flex-col relative">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <CardTitle className="mb-3 text-xl font-bold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                    </motion.div>
                    <motion.p 
                      className="text-gray-600 mb-6 flex-1 leading-relaxed font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {project.desc}
                    </motion.p>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="relative"
                    >
                      <Button asChild className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden group">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer">
                          {/* Animated background effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "0%" }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <motion.span className="relative z-10 flex items-center justify-center gap-2">
                            <motion.svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </motion.svg>
                            View Project
                          </motion.span>
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                  
                  {/* Decorative corner elements */}
                  <motion.div
                    className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-br-full opacity-60"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-br from-pink-400 to-red-500 rounded-tl-full opacity-60"
                    animate={{ rotate: [360, 180, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}