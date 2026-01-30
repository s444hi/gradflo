import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[var(--ios-gray-1)] ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-[var(--ios-gray-6)] rounded-xl text-[17px] outline-none border-2 border-transparent focus:border-[var(--ios-blue)] focus:bg-white transition-all placeholder:text-[var(--ios-gray-2)] ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-[var(--ios-red)] ml-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
