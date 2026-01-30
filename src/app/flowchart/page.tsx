"use client";
import React, { useState, useEffect } from 'react';
import { roadmaps } from '@/lib/roadmaps';
import RoadmapDisplay from '@/components/RoadmapDisplay';
import { useAuth } from '@/context/AuthContext';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const FlowchartPage = () => {
  const { user } = useAuth();
  const selectedMajor = user?.major || "Computer Science and Linguistics, BS";
  const selectedRoadmap = roadmaps.find(r => r.major === selectedMajor);
  const userName = user ? user.name.split(" ")[0] : "Student";
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Trigger fade-in after component mounts
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center bg-white p-4">
        <div className="w-full max-w-6xl mx-auto my-12 relative">
          <div className="absolute top-0 left-0">
            <Link href="/dashboard">
              <Button variant="secondary" className="shadow-sm border border-gray-200">
                ← Back to Dashboard
              </Button>
            </Link>
          </div>
          <h1
            className="text-center text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 transition-opacity duration-1000 ease-in pt-12"
            style={{ opacity: opacity }}
          >
            Welcome, {userName}.
            <br />
            <span className="text-[var(--ios-blue)]">Your future is in your hands.</span>
          </h1>
        </div>

        <div className="flex gap-4 justify-center mb-8 bg-[var(--ios-gray-6)] p-2 rounded-xl inline-block mx-auto">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white shadow-sm">
            <div className="w-3 h-3 rounded-full bg-[var(--ios-blue)] opacity-50"></div>
            <span className="text-sm font-medium">Major Req</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white shadow-sm">
            <div className="w-3 h-3 rounded-full bg-gray-400 opacity-20"></div>
            <span className="text-sm font-medium">Gen Ed / Sci</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white shadow-sm">
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-50"></div>
            <span className="text-sm font-medium">Completed</span>
          </div>
        </div>

        {selectedRoadmap ? (
          <div className="w-full flex justify-center">
            <RoadmapDisplay roadmap={selectedRoadmap} />
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-md p-8 text-center text-gray-500 max-w-4xl mx-auto">
            <p>Could not find a roadmap for the selected major.</p>
          </div>
        )}
      </div>

      <footer className="p-4 bg-gray-100 text-center text-sm text-gray-500">
        This is the bottom of the page.
      </footer>
    </div>
  );
};

export default FlowchartPage;