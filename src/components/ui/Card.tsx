import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass-panel rounded-2xl shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}
