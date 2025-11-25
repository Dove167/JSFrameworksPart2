import { fetchProjects } from "@/src/lib/db";

export async function GET() {
  try {
    const projects = await fetchProjects();
    return Response.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}