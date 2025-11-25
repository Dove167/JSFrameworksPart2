"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditProjectForm({ project, uuid }) {
  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    img: project.img || "",
    link: project.link || "",
    keywords: project.keywords || [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/projects/${uuid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          keywords: Array.isArray(formData.keywords) 
            ? formData.keywords 
            : formData.keywords.split(',').map(k => k.trim())
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Project updated successfully!");
        setTimeout(() => {
          router.push(`/projects/${uuid}`);
        }, 1000);
      } else {
        setMessage(data.message || "Error updating project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      setMessage("Error updating project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/projects/${uuid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Project deleted successfully!");
        setTimeout(() => {
          router.push("/projects");
        }, 1000);
      } else {
        const data = await response.json();
        setMessage(data.message || "Error deleting project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setMessage("Error deleting project");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="img">Image URL</Label>
          <Input
            id="img"
            name="img"
            type="url"
            value={formData.img}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="link">Project Link</Label>
          <Input
            id="link"
            name="link"
            type="url"
            value={formData.link}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            name="keywords"
            type="text"
            value={Array.isArray(formData.keywords) 
              ? formData.keywords.join(', ') 
              : formData.keywords}
            onChange={handleChange}
            placeholder="React, JavaScript, Node.js (comma-separated)"
            className="mt-1"
          />
        </div>

        {message && (
          <div className={`p-3 rounded ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <div className="flex space-x-4">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? "Updating..." : "Update Project"}
          </Button>
          <Button 
            type="button" 
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex-1"
          >
            Delete Project
          </Button>
        </div>
      </form>
    </div>
  );
}