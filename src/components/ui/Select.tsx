import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  children: React.ReactNode;
}

export function Select({ label, children, ...props }: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block text-black/80 text-sm font-bold mb-2" htmlFor={props.id}>
        {label}
      </label>
      <div className="relative">
        <select
          className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 bg-gray-200 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-800">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
