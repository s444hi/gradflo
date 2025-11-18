import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
      {children}
    </div>
  );
}
