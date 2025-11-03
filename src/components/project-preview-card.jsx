"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayProjects.map((project, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Skeleton className="w-full h-full" />
                  <img
                    src={project.img}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoad={(e) => e.target.parentElement.children[0].style.display = 'none'}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.children[0].style.display = 'block';
                    }}
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6 flex flex-col">
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <p className="text-muted-foreground mb-4 flex-1">{project.desc}</p>
                <Button asChild className="w-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}