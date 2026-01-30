"use client";

import React, { useState, useEffect } from 'react';
import { Roadmap, Course } from '@/lib/roadmaps';
import { Button } from './ui/Button';

interface SemesterViewProps {
    roadmap: Roadmap;
}

export default function SemesterView({ roadmap }: SemesterViewProps) {
    const [selectedYearIndex, setSelectedYearIndex] = useState(0);
    const [selectedSemesterIndex, setSelectedSemesterIndex] = useState(0);

    // Determine current semester based on date
    useEffect(() => {
        const month = new Date().getMonth(); // 0-11
        // Fall: Aug (7) - Dec (11)
        // Spring: Jan (0) - May (4)
        // Summer/Other: Default to Fall?
        if (month >= 0 && month <= 4) {
            setSelectedSemesterIndex(1); // Spring
        } else {
            setSelectedSemesterIndex(0); // Fall
        }
    }, []);

    const currentYear = roadmap.years[selectedYearIndex];
    const currentSemester = currentYear?.semesters[selectedSemesterIndex];

    if (!currentYear || !currentSemester) return null;

    // Workload Calculation
    const totalDifficulty = currentSemester.courses.reduce((acc, c) => acc + (c.difficulty || 5), 0);
    const avgDifficulty = totalDifficulty / currentSemester.courses.length;
    let workloadStatus = "Balanced";
    let workloadColor = "text-green-600 bg-green-50 border-green-200";

    if (avgDifficulty > 7) {
        workloadStatus = "Heavy";
        workloadColor = "text-red-600 bg-red-50 border-red-200";
    } else if (avgDifficulty > 5) {
        workloadStatus = "Moderate";
        workloadColor = "text-yellow-600 bg-yellow-50 border-yellow-200";
    }

    // Pairing Suggestions
    const pairingSuggestions: string[] = [];
    currentSemester.courses.forEach(course => {
        if (course.pairsWith) {
            course.pairsWith.forEach(pairId => {
                const pair = currentSemester.courses.find(c => c.id === pairId);
                if (pair) {
                    pairingSuggestions.push(`${course.id} and ${pair.id} pair well together!`);
                }
            });
        }
    });

    return (
        <div className="w-full max-w-4xl mx-auto mb-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Semester View</h2>
                    <p className="text-gray-500 text-sm">Plan and balance your workload.</p>
                </div>

                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {roadmap.years.map((year, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedYearIndex(idx)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedYearIndex === idx
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {year.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-gray-50/50">
                <div className="flex gap-4 mb-6 justify-center">
                    {currentYear.semesters.map((sem, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedSemesterIndex(idx)}
                            className={`px-6 py-2 rounded-full border text-sm font-semibold transition-all ${selectedSemesterIndex === idx
                                    ? "bg-[var(--ios-blue)] text-white border-transparent shadow-md transform scale-105"
                                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {sem.name}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Course List */}
                    <div className="flex-1 space-y-3">
                        {currentSemester.courses.map(course => (
                            <div key={course.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${course.type === 'major' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {course.type || 'Elective'}
                                        </span>
                                        <h3 className="font-semibold text-gray-900">{course.id}</h3>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{course.name}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs font-medium bg-gray-50 px-2 py-1 rounded text-gray-500">{course.units}</span>
                                    {course.difficulty && (
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] text-gray-400">Diff:</span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <div key={i} className={`w-1.5 h-1.5 rounded-full mx-0.5 ${i < Math.round((course.difficulty || 0) / 2)
                                                            ? "bg-[var(--ios-blue)]"
                                                            : "bg-gray-200"
                                                        }`}></div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Insights Panel */}
                    <div className="md:w-80 space-y-4">
                        <div className={`p-5 rounded-xl border ${workloadColor}`}>
                            <h3 className="text-sm font-bold uppercase tracking-wide opacity-80 mb-1">Workload Analysis</h3>
                            <div className="text-2xl font-bold">{workloadStatus}</div>
                            <p className="text-xs opacity-80 mt-2">
                                Avg Difficulty: {avgDifficulty.toFixed(1)}/10
                                <br />
                                Total Units: {currentSemester.totalUnits}
                            </p>
                        </div>

                        {pairingSuggestions.length > 0 && (
                            <div className="bg-blue-50 border border-blue-200 p-5 rounded-xl">
                                <h3 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    Class Pairing Tips
                                </h3>
                                <ul className="space-y-2">
                                    {pairingSuggestions.map((tip, idx) => (
                                        <li key={idx} className="text-xs text-blue-700 bg-white/50 p-2 rounded">
                                            {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {pairingSuggestions.length === 0 && (
                            <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl text-center">
                                <p className="text-xs text-gray-500">No specific class pairings found for this semester.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
