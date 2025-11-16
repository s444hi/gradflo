"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/Loading";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/flowchart");
    }, 3000); 

    return () => clearTimeout(timer);
  }, [router]);

  return <Loading />;
}
