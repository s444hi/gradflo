import React from 'react';

interface ProgressRingProps {
    radius: number;
    stroke: number;
    progress: number;
    label?: string;
    subLabel?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ radius, stroke, progress, label, subLabel }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90 origin-center"
            >
                <circle
                    stroke="var(--ios-gray-5)"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="var(--ios-blue)"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                {label && <span className="text-3xl font-bold tracking-tight">{label}</span>}
                {subLabel && <span className="text-sm text-[var(--ios-gray-1)]">{subLabel}</span>}
            </div>
        </div>
    );
};
