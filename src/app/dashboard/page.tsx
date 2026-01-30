"use client";

import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { roadmaps } from "@/lib/roadmaps";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const [credits, setCredits] = useState(0);
  const [totalCredits, setTotalCredits] = useState(120); // Default approx

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (user) {
      // Calculate progress
      const saved = localStorage.getItem(`gradflo_progress_${user.email}`);
      if (saved) {
        const takenIds: string[] = JSON.parse(saved);
        const roadmap = roadmaps.find(r => r.major === user.major) || roadmaps[0];

        const allCourses = roadmap.years.flatMap(y => y.semesters.flatMap(s => s.courses));
        const total = allCourses.length;
        const takenCount = takenIds.length;

        // Calculate real credits
        const takenCourses = allCourses.filter(c => takenIds.includes(c.id));
        const earnedCredits = takenCourses.reduce((acc, c) => acc + parseInt(c.units), 0);
        const totalC = allCourses.reduce((acc, c) => acc + parseInt(c.units), 0);

        setProgress(Math.round((takenCount / total) * 100));
        setCredits(earnedCredits);
        setTotalCredits(totalC);
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-[var(--ios-gray-1)] text-lg mt-1">
            {user.major} • {user.year}
          </p>
        </div>
        <Link href="/flowchart">
          <Button size="lg" className="shadow-lg shadow-blue-500/20">
            Open Roadmap
          </Button>
        </Link>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold">Degree Completion</h2>
            <p className="text-[var(--ios-gray-1)]">You're making great progress!</p>
            <div className="mt-8">
              <span className="text-4xl font-bold text-[var(--ios-blue)]">{progress}%</span>
            </div>
            <div className="w-full bg-[var(--ios-gray-6)] h-3 rounded-full overflow-hidden mt-2">
              <div
                className="bg-[var(--ios-blue)] h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </Card>

        <Card className="flex items-center justify-between p-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Credits Earned</h2>
            <p className="text-[var(--ios-gray-1)]">You have completed {credits} out of {totalCredits} required credits.</p>
          </div>
          <ProgressRing radius={60} stroke={8} progress={(credits / totalCredits) * 100} label={`${credits}`} subLabel="Credits" />
        </Card>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/flowchart" className="group">
          <Card className="h-full transition-all group-hover:scale-[1.02] cursor-pointer border-transparent group-hover:border-[var(--ios-blue)]">
            <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 text-2xl">
              🗺️
            </div>
            <h3 className="text-xl font-bold mb-2">View Roadmap</h3>
            <p className="text-[var(--ios-gray-1)]">Visualize your path to graduation and track your courses.</p>
          </Card>
        </Link>

        <div className="group">
          <Card className="h-full transition-all group-hover:scale-[1.02] cursor-pointer opacity-70">
            <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4 text-2xl">
              📝
            </div>
            <h3 className="text-xl font-bold mb-2">Course Planner</h3>
            <p className="text-[var(--ios-gray-1)]">Plan your upcoming semesters in detail. (Coming Soon)</p>
          </Card>
        </div>

        <div className="group">
          <Card className="h-full transition-all group-hover:scale-[1.02] cursor-pointer opacity-70">
            <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 text-2xl">
              🎓
            </div>
            <h3 className="text-xl font-bold mb-2">Grad Check</h3>
            <p className="text-[var(--ios-gray-1)]">Verify all requirements. (Coming Soon)</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
