"use client";
import React, { useState, useEffect } from 'react';
import { roadmaps } from '@/lib/roadmaps';
import RoadmapDisplay from '@/components/RoadmapDisplay';

const FlowchartPage = () => {
  // Hardcoded major for now, this should be fetched based on the user's data
  const selectedMajor = "Computer Science and Linguistics, BS";
  const selectedRoadmap = roadmaps.find(r => r.major === selectedMajor);
  const userName = "Alex"; // Hardcoded user name
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Trigger fade-in after component mounts
    const timer = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col items-center bg-white p-4">
        <div className="w-full max-w-6xl mx-auto text-center my-12">
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 transition-opacity duration-1000 ease-in"
            style={{ opacity: opacity }}
          >
            Welcome, {userName}.
            <br />
            Your future is in your hands.
          </h1>
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