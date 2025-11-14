"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    // Fake login
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "test@example.com" && password === "password") {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-var(--navbar-height))]">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Logging in..." : "Login"}
          </Button>

          {status === "success" && (
            <p className="text-sm text-emerald-600 mt-2">
              Success! (This is a placeholder)
            </p>
          )}

          {status === "error" && (
            <p className="text-sm text-red-600 mt-2">
              Invalid credentials. Try test@example.com / password
            </p>
          )}
        </form>
      </Card>
    </div>
  );
}