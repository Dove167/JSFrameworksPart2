"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyHeroSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                  Your Name
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Welcome to my portfolio! I am a passionate developer focused on creating
                  amazing web experiences. This is a brief description about yourself and
                  your skills. You can customize this text to tell your story.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <Image
              src="https://lipsum.app/300x300"
              alt="Profile picture"
              width={300}
              height={300}
              className="rounded-lg shadow-lg w-full max-w-sm mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}