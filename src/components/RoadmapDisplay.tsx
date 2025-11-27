
import React from 'react';
import { Roadmap, Course } from '@/lib/roadmaps';

interface RoadmapProps {
  roadmap: Roadmap;
  selectedYears: string[];
}

const yearMap: { [key: string]: number } = {
  "Freshman": 1,
  "Sophomore": 2,
  "Junior": 3,
  "Senior": 4,
};

const RoadmapDisplay: React.FC<RoadmapProps> = ({ roadmap, selectedYears }) => {
  const selectedYearNumbers = selectedYears.map(y => yearMap[y]);
  const displayedYears = roadmap.years.filter(y => selectedYearNumbers.includes(parseInt(y.name.split(' ')[1])));

  const allCourses = roadmap.years.flatMap(y => y.semesters.flatMap(s => s.courses));
  const courseMap = new Map<string, Course>(allCourses.map(c => [c.id, c]));

  const displayedCourses = displayedYears.flatMap(y => y.semesters.flatMap(s => s.courses));

  return (
    <div className="relative w-full h-[1000px] bg-gray-50 p-8">
      {displayedCourses.map(course => (
        <div
          key={course.id}
          id={course.id}
          className="absolute bg-white p-4 rounded-lg shadow-md border border-gray-200 w-64"
          style={{ left: course.position.x, top: course.position.y }}
        >
          <h4 className="text-lg font-bold text-foreground">{course.name}</h4>
          <p className="text-sm text-foreground/70">{course.units}</p>
          {course.description && (
            <p className="text-xs text-foreground/60 mt-1">{course.description}</p>
          )}
        </div>
      ))}
      <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 0 }}>
        {allCourses.map(course => {
          return course.prerequisites.map(prereqId => {
            const prereqCourse = courseMap.get(prereqId);
            if (!prereqCourse) return null;

            const startX = prereqCourse.position.x + 256; // width of course box
            const startY = prereqCourse.position.y + 50; // middle of course box
            const endX = course.position.x;
            const endY = course.position.y + 50;

            return (
              <line
                key={`${prereqId}-${course.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#9CA3AF"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            );
          });
        })}
      </svg>
      <svg width="0" height="0">
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF" />
          </marker>
        </defs>
      </svg>
    </div>
  );
};

export default RoadmapDisplay;
