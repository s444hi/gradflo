import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="bg-[var(--primary)] hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline transition-opacity"
      {...props}
    >
      {children}
    </button>
  );
}
