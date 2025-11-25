"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        setProjects(data.projects || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <div className="flex justify-center">
          <div className="text-muted-foreground">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="text-sm text-muted-foreground">
          All projects are loaded from the App Router API at
          {" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            /api/projects
          </code>
          .
        </p>
        {user && (
          <div className="mt-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/projects/new">+ New Project</Link>
            </Button>
          </div>
        )}
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group flex h-full flex-col justify-between gap-4 overflow-hidden border border-slate-200 bg-white p-4 shadow-sm transition-transform hover:scale-105"
          >
            <div className="space-y-3">
              <div className="relative h-40 w-full overflow-hidden rounded-md bg-slate-100">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <h2 className="text-lg font-semibold">
                {project.title}
              </h2>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {project.description}
              </p>
              {project.keywords?.length ? (
                <div className="flex flex-wrap gap-1">
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
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Button
                asChild
                size="sm"
                variant="secondary"
                className="flex-1"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open
                </a>
              </Button>
              <Button
                asChild
                size="sm"
                className="flex-1"
              >
                <Link href={`/projects/${project.id}`}>Details</Link>
              </Button>
              {user && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                >
                  <Link href={`/projects/${project.id}/edit`}>Edit</Link>
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}