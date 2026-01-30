import React from 'react';
import { Button } from './ui/Button';

interface Course {
    id: string;
    name: string;
    units: string;
    description?: string;
    prerequisites: string[];
}

interface CourseModalProps {
    course: Course | null;
    isOpen: boolean;
    onClose: () => void;
    onToggleTaken: (courseId: string) => void;
    isTaken: boolean;
}

const CourseModal: React.FC<CourseModalProps> = ({ course, isOpen, onClose, onToggleTaken, isTaken }) => {
    if (!isOpen || !course) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--ios-blue)]">{course.id}</h3>
                        <h2 className="text-2xl font-bold leading-tight">{course.name}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex gap-4 text-sm text-[var(--ios-gray-1)]">
                        <span className="bg-[var(--ios-gray-6)] px-3 py-1 rounded-lg">{course.units}</span>
                        {course.prerequisites.length > 0 && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg">Prereqs: {course.prerequisites.join(", ")}</span>
                        )}
                    </div>
                    {course.description && (
                        <p className="text-[var(--foreground)] opacity-80 leading-relaxed">
                            {course.description}
                        </p>
                    )}
                    {!course.description && (
                        <p className="text-[var(--ios-gray-1)] italic">
                            No description available for this course.
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button
                        className={`w-full ${isTaken ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                        onClick={() => {
                            onToggleTaken(course.id);
                            onClose();
                        }}
                    >
                        {isTaken ? 'Mark as Not Taken' : 'Mark as Completed'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CourseModal;
