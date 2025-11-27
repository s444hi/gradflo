
"use client";
import React, { useState } from 'react';
import ProfileDropdown from '@/components/ui/ProfileDropdown';
import { undergraduateMajors } from '@/lib/majors';
import { roadmaps } from '@/lib/roadmaps';
import RoadmapDisplay from '@/components/RoadmapDisplay';

const years = ["Freshman", "Sophomore", "Junior", "Senior"];

const FlowchartPage = () => {
  const [selectedMajor, setSelectedMajor] = useState<string | null>("Computer Science and Linguistics, BS");
  const [selectedYears, setSelectedYears] = useState<string[]>(["Freshman", "Sophomore"]);

  const selectedRoadmap = roadmaps.find(r => r.major === selectedMajor);

  const handleYearChange = (year: string) => {
    setSelectedYears(prev => 
      prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Create your flowchart</h1>
          <ProfileDropdown />
        </div>
        <div className="flex-1 bg-white">
          <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

              <div className="flex justify-center space-x-4 mb-8">
                {years.map(year => (
                  <label key={year} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedYears.includes(year)}
                      onChange={() => handleYearChange(year)}
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="font-semibold text-gray-700">{year}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedRoadmap ? (
              <RoadmapDisplay roadmap={selectedRoadmap} selectedYears={selectedYears} />
            ) : (
              <div className="bg-white rounded-md shadow-md p-8 text-center text-gray-500 max-w-4xl mx-auto">
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
