
import React from 'react';
import { Roadmap } from '@/lib/roadmaps';

interface RoadmapProps {
  roadmap: Roadmap;
}

const RoadmapDisplay: React.FC<RoadmapProps> = ({ roadmap }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">{roadmap.major}</h2>
      {roadmap.years.map((year) => (
        <div key={year.name} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">{year.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {year.semesters.map((semester) => (
              <div key={semester.name} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-bold mb-2">{semester.name}</h4>
                <p className="text-sm text-gray-500 mb-4">{semester.totalUnits}</p>
                <ul>
                  {semester.courses.map((course) => (
                    <li key={course.name} className="mb-2">
                      <span className="font-semibold">{course.name}</span> - <span>{course.units}</span>
                      {course.description && <p className="text-sm text-gray-600">{course.description}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapDisplay;
