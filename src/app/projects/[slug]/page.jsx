import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createSlug } from "@/lib/utils";

async function getProjects() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await res.json();
  return data.projects || [];
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const projects = await getProjects();

  const project =
    projects.find(
      (p) => createSlug(p.title) === slug
    ) || null;

  if (!project) {
    notFound();
  }

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Detailed view loaded from
            {" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              /api/projects
            </code>
            .
          </p>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link href="/projects">Back to Projects</Link>
        </Button>
      </div>

      <Card className="flex flex-col gap-6 p-4 md:flex-row">
        <div className="relative h-56 w-full overflow-hidden rounded-md bg-slate-100 md:h-64 md:w-1/2">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-sm text-slate-800">
            {project.description}
          </p>

          {project.keywords?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.keywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="outline"
                  className="text-xs"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-auto flex gap-3">
            <Button asChild size="sm">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                View Live Project
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}