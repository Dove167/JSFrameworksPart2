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

export default function HeroEditorForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
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
    }
  };

  if (loading) return <p>Loading editor...</p>;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Edit Hero Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar</Label>
            <div className="flex items-center gap-4">
                {preview && (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border bg-muted">
                        <Image 
                            src={preview} 
                            alt="Avatar preview" 
                            fill 
                            className="object-cover"
                        />
                    </div>
                )}
                <Input 
                    id="avatar" 
                    type="file" 
                    accept="image/*" 
                    {...register("avatar")} 
                />
            </div>
            <p className="text-xs text-muted-foreground">Upload a new image to change the avatar.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input id="shortDescription" {...register("shortDescription", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="longDescription">Long Description</Label>
            <Textarea 
                id="longDescription" 
                rows={5}
                {...register("longDescription", { required: true })} 
            />
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}