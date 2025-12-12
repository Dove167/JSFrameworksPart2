"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroEditorForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Watch avatar file input for preview
  const avatarFile = watch("avatar");

  useEffect(() => {
    async function fetchHero() {
      try {
        const res = await fetch("/api/hero");
        if (res.ok) {
          const { data } = await res.json();
          if (data) {
            setValue("fullName", data.fullName);
            setValue("shortDescription", data.shortDescription);
            setValue("longDescription", data.longDescription);
            if (data.avatar) {
              setPreview(data.avatar);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch hero data", error);
        toast.error("Failed to load hero data");
      } finally {
        setLoading(false);
      }
    }
    fetchHero();
  }, [setValue]);

  // Handle file preview
  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const file = avatarFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [avatarFile]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("shortDescription", data.shortDescription);
    formData.append("longDescription", data.longDescription);
    
    // Only append avatar if a new file was selected
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        toast.success("Hero section updated!");
        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update");
      }
    } catch (error) {
      console.error("Update error", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const buttonVariants = {
    idle: {
      scale: 1,
      backgroundColor: "#3b82f6",
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#2563eb",
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
    loading: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.span className="ml-3 text-lg">Loading editor...</motion.span>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle className="text-2xl font-bold">Edit Hero Section</CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <motion.div 
              className="space-y-2"
              variants={formItemVariants}
            >
              <Label htmlFor="avatar" className="text-sm font-medium">
                Avatar
              </Label>
              <div className="flex items-center gap-4">
                <AnimatePresence>
                  {preview && (
                    <motion.div
                      className="relative w-24 h-24 rounded-full overflow-hidden border bg-muted"
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <Image 
                        src={preview} 
                        alt="Avatar preview" 
                        fill 
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  whileFocus="focus"
                  variants={inputVariants}
                  className="flex-1"
                >
                  <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/*" 
                    {...register("avatar")} 
                    className="transition-all duration-200"
                  />
                </motion.div>
              </div>
              <p className="text-xs text-muted-foreground">Upload a new image to change the avatar.</p>
            </motion.div>

            <motion.div className="space-y-2" variants={formItemVariants}>
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <motion.div whileFocus="focus" variants={inputVariants}>
                <Input 
                  id="fullName" 
                  {...register("fullName", { required: true })}
                  className="transition-all duration-200"
                />
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={formItemVariants}>
              <Label htmlFor="shortDescription" className="text-sm font-medium">
                Short Description
              </Label>
              <motion.div whileFocus="focus" variants={inputVariants}>
                <Input 
                  id="shortDescription" 
                  {...register("shortDescription", { required: true })}
                  className="transition-all duration-200"
                />
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={formItemVariants}>
              <Label htmlFor="longDescription" className="text-sm font-medium">
                Long Description
              </Label>
              <motion.div whileFocus="focus" variants={inputVariants}>
                <Textarea 
                  id="longDescription" 
                  rows={5}
                  {...register("longDescription", { required: true })}
                  className="transition-all duration-200 resize-none"
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="flex justify-end"
              variants={formItemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                animate={isSubmitting ? "loading" : "idle"}
              >
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="relative overflow-hidden px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all duration-200"
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Saving...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="submit"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Save Changes
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}