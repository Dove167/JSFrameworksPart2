"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const newProjectSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Your title is too short" })
    .max(200, { message: "Keep the title under 200 characters" }),
  description: z
    .string()
    .min(10, { message: "Description should be at least 10 characters" }),
  img: z.string().url({ message: "Provide a valid image URL" }),
  link: z.string().url({ message: "Provide a valid project URL" }),
  keywords: z.array(z.string().min(1)).default([]),
});

export default function NewProjectPage() {
  const [draftKeyword, setDraftKeyword] = useState("");
  const [submitState, setSubmitState] = useState({
    status: "idle",
    message: "",
  });

  const form = useForm({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      title: "Write your project title here...",
      description: "Write your project description here...",
      img: "https://placehold.co/300x200",
      link: "https://your-project-link.com",
      keywords: [],
    },
  });

  async function onSubmit(values) {
    try {
      setSubmitState({ status: "submitting", message: "" });

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("img", values.img);
      formData.append("link", values.link);
      formData.append("keywords", JSON.stringify(values.keywords ?? []));

      const res = await fetch("/api/projects/new", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      setSubmitState({
        status: "success",
        message: "Project submitted successfully. Check server logs.",
      });

      // Optional: reset but keep keywords empty for clarity
      form.reset({
        title: "",
        description: "",
        img: "",
        link: "",
        keywords: [],
      });
      setDraftKeyword("");
    } catch (err) {
      setSubmitState({
        status: "error",
        message:
          err instanceof Error
            ? err.message
            : "Unexpected error while submitting project",
      });
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          New Project
        </h1>
        <p className="text-sm text-muted-foreground">
          Use this form to define a new portfolio project. Data is
          validated on the client and sent as FormData to
          <code className="ml-1 rounded bg-muted px-1 py-0.5 text-xs">
            /api/projects/new
          </code>
          .
        </p>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border bg-white p-4 shadow-sm"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A title of your project"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the title of your project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="A brief description of your project"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A concise summary of what your project does and why it
                  matters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://your-image-link.com/image.png"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Public URL for a 300x200 (or similar) thumbnail.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://your-project-link.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Live demo, GitHub repo, or case study URL.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Keywords with chips */}
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => {
              const currentKeywords = field.value ?? [];

              const handleAddKeyword = () => {
                const value = draftKeyword.trim();
                if (!value || currentKeywords.includes(value)) return;

                const updated = [...currentKeywords, value];
                field.onChange(updated);
                setDraftKeyword("");
              };

              const handleRemoveKeyword = (keyword) => {
                const updated = currentKeywords.filter(
                  (k) => k !== keyword
                );
                field.onChange(updated);
              };

              const handleKeyDown = (event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddKeyword();
                }
              };

              return (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        value={draftKeyword}
                        onChange={(e) =>
                          setDraftKeyword(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Add a keyword and press Enter"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddKeyword}
                      >
                        Add
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Tag your project so it's easier to search and
                    filter later.
                  </FormDescription>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="flex items-center gap-1 bg-slate-700 text-slate-50"
                      >
                        {keyword}
                        <button
                          type="button"
                          className="ml-1 text-xs"
                          onClick={() =>
                            handleRemoveKeyword(keyword)
                          }
                          aria-label={`Remove ${keyword}`}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={submitState.status === "submitting"}
            >
              {submitState.status === "submitting"
                ? "Submitting..."
                : "Submit"}
            </Button>
            {submitState.status === "success" && (
              <p className="text-xs text-emerald-600">
                {submitState.message}
              </p>
            )}
            {submitState.status === "error" && (
              <p className="text-xs text-red-600">
                {submitState.message}
              </p>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}