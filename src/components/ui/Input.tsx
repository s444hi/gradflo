import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-foreground/80 text-sm font-bold mb-2" htmlFor={props.id}>
        {label}
      </label>
      <input
        className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 bg-white text-foreground leading-tight focus:outline-none focus:shadow-outline"
        {...props}
      />
    </div>
  );
}
