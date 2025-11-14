import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default async function ProjectsPage() {
  const projects = await getProjects();

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
        <div className="mt-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/projects/new">+ New Project</Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => {
          const slug = createSlug(project.title);

          return (
            <Card
              key={slug}
              className="group flex h-full flex-col justify-between gap-4 overflow-hidden border border-slate-200 bg-white p-4 shadow-sm transition-transform hover:scale-105"
            >
              <div className="space-y-3">
                <div className="relative h-40 w-full overflow-hidden rounded-md bg-slate-100">
                  <Image
                    src={project.image}
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
                  <Link href={`/projects/${slug}`}>Details</Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}