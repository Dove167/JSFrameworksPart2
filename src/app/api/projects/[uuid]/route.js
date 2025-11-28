import { NextResponse } from "next/server";
import { z } from "zod";
import { auth0 } from "@/lib/auth0";
import { getProjectById, updateProject, deleteProject } from "@/lib/db";

const projectUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  img: z.string().url().optional(),
  link: z.string().url().optional(),
  keywords: z.array(z.string()).optional(),
});

// GET /api/projects/[uuid] - Get a specific project (public)
export async function GET(request, { params }) {
  try {
    const project = await getProjectById(params.uuid);
    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ data: project });
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ message: "Failed to fetch project" }, { status: 500 });
  }
}

// PUT /api/projects/[uuid] - Update a specific project (protected)
export async function PUT(request, { params }) {
  try {
    await auth0.requireSession();
    
    const body = await request.json();
    const validatedData = projectUpdateSchema.parse(body);
    
    // Parse keywords if they're a string
    if (typeof validatedData.keywords === "string") {
      validatedData.keywords = validatedData.keywords.split(',').map(k => k.trim()).filter(Boolean);
    }

    const updated = await updateProject(params.uuid, validatedData);
    if (!updated) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project updated", data: updated });
  } catch (error) {
    console.error('Error updating project:', error);
    
    if (error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    return NextResponse.json({ message: error.message || "Invalid payload" }, { status: 400 });
  }
}

// DELETE /api/projects/[uuid] - Delete a specific project (protected)
export async function DELETE(request, { params }) {
  try {
    await auth0.requireSession();
    
    const deleted = await deleteProject(params.uuid);
    if (!deleted) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error('Error deleting project:', error);
    
    if (error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    return NextResponse.json({ message: "Failed to delete project" }, { status: 500 });
  }
}