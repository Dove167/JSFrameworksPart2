import { getProjectById } from "@/src/lib/db";
import { notFound } from "next/navigation";
import EditProjectForm from "@/src/components/EditProjectForm";

export default async function EditProjectPage({ params }) {
  const project = await getProjectById(params.uuid);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <EditProjectForm project={project} uuid={params.uuid} />
    </div>
  );
}