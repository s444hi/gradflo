"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Handle login logic here
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-bold text-foreground text-center mb-4">Log In</h1>
        <p className="text-foreground/60 text-center mb-8">
          New to GradFlo?{" "}
          <Link href="/signup" className="text-[var(--primary)] hover:opacity-90">
            Sign up
          </Link>
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-8">
            <Button type="submit">Log In</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
