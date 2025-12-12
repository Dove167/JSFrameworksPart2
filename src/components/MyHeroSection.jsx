import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHero } from "@/lib/db";

// Placeholder for when no avatar is set
const HERO_PLACEHOLDER_AVATAR = "https://placehold.co/400x400/png?text=Avatar";

export default async function MyHeroSection() {
  const hero = await getHero();

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight">
                  {hero.fullName || "Your Name"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {hero.longDescription || "Welcome to my portfolio! I am a passionate developer focused on creating amazing web experiences. This is a brief description about yourself and your skills. You can customize this text to tell your story."}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                src={hero.avatar || HERO_PLACEHOLDER_AVATAR}
                alt="Profile picture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}