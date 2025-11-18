'use client'

import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProjectNotFound() {
  const params = useParams()
  const { slug } = params

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Project Not Found
          </CardTitle>
          <CardDescription className="text-base">
            {slug ? (
              <>
                Sorry, we couldn't find the project <span className="font-mono bg-gray-100 px-1 rounded">"{slug}"</span>. 
                This project may have been moved, deleted, or the URL might be incorrect.
              </>
            ) : (
              "Sorry, we couldn't find the project you're looking for. The project may have been moved, deleted, or you may have mistyped the URL."
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/projects">
                View all projects
              </Link>
            </Button>
          </div>
          <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/">
                Go back home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}