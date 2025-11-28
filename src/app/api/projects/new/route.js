import { auth0 } from "@/lib/auth0";
import { insertProject } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  img: z.string().url(),
  link: z.string().url(),
  keywords: z.array(z.string()).optional(),
});

export async function POST(request) {
  try {
    // Require authentication
    await auth0.requireSession();
    
    let data;
    const contentType = request.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      data = {
        title: formData.get("title"),
        description: formData.get("description"),
        img: formData.get("img"),
        link: formData.get("link"),
        keywords: formData.get("keywords")
      };
    }

    const validatedData = projectSchema.parse(data);
    
    // Parse keywords if they're a string
    if (typeof validatedData.keywords === "string") {
      validatedData.keywords = validatedData.keywords.split(',').map(k => k.trim()).filter(Boolean);
    }

    const project = await insertProject(validatedData);

    return NextResponse.json(
      { message: "Project created successfully", data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating project:', error);
    
    if (error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    return NextResponse.json(
      { message: error.message || "Invalid payload" },
      { status: 400 }
    );
  }
}