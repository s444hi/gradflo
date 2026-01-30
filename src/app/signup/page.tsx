"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { undergraduateMajors } from "@/lib/majors";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("Computer Science and Linguistics, BS"); // Default per requirements
  const [year, setYear] = useState("Year 1");

  const { signup, user, error, clearError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
    return () => clearError();
  }, [user, router]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !password) {
      alert("Please fill in required fields.");
      return;
    }
    await signup(email, password, name, major, year);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-[var(--ios-gray-1)]">Start planning your graduation today.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="name"
            type="text"
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="name@university.edu"
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--ios-gray-1)] ml-1">Major</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--ios-gray-6)] rounded-xl text-[17px] outline-none border-2 border-transparent focus:border-[var(--ios-blue)] focus:bg-white transition-all appearance-none"
            >
              {undergraduateMajors.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <Button type="submit" className="w-full mt-2" size="lg">Sign Up</Button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--ios-gray-1)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--ios-blue)] font-medium hover:underline">
            Log in
          </Link>
        </div>
      </Card>
    </div>
  );
}
