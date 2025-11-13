"use client";

import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-24">
      <h1 className="text-4xl font-bold text-black text-center mb-8">
        Welcome to your Dashboard
      </h1>
      <Button>Create a new flowchart</Button>
    </div>
  );
}
