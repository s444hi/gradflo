"use client";
import React, { useState } from 'react';
import ProfileDropdown from '@/components/ui/ProfileDropdown';
import { undergraduateMajors } from '@/lib/majors';
import { roadmaps } from '@/lib/roadmaps';
import RoadmapDisplay from '@/components/RoadmapDisplay';

const FlowchartPage = () => {
  const [selectedMajor, setSelectedMajor] = useState<string | null>("Computer Science and Linguistics, BS");

  const selectedRoadmap = roadmaps.find(r => r.major === selectedMajor);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create your flowchart</h1>
        <ProfileDropdown />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center bg-white p-4">
        <div className="w-full max-w-4xl mx-auto">
          <select
            onChange={(e) => setSelectedMajor(e.target.value)}
            value={selectedMajor || ''}
            className="w-full p-3 mb-8 border rounded-md shadow-sm"
          >
            <option value="" disabled>Select a major</option>
            {undergraduateMajors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        {selectedRoadmap ? (
          <div className="w-full flex justify-center">
            <RoadmapDisplay roadmap={selectedRoadmap} />
          </div>
        ) : (
          <div className="bg-white rounded-md shadow-md p-8 text-center text-gray-500 max-w-4xl mx-auto">
            <p>Please select a major to see the roadmap.</p>
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