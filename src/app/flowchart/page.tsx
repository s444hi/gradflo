
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create your flowchart</h1>
          <ProfileDropdown />
        </div>
        <div className="flex-1 p-8 bg-gray-200">
          <div className="w-full max-w-4xl mx-auto">
            <select
              onChange={(e) => setSelectedMajor(e.target.value)}
              value={selectedMajor || ''}
              className="w-full p-2 mb-8 border rounded-md"
            >
              <option value="" disabled>Select a major</option>
              {undergraduateMajors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>

            {selectedRoadmap ? (
              <RoadmapDisplay roadmap={selectedRoadmap} />
            ) : (
              <div className="bg-white rounded-md shadow-md p-8 text-center text-gray-500">
                <p>Please select a major to see the roadmap.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowchartPage;
