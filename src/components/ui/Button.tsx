import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none ios-active disabled:opacity-50 disabled:pointer-events-none rounded-xl";
    
    const variants = {
      primary: "bg-[var(--ios-blue)] text-white shadow-sm hover:opacity-90",
      secondary: "bg-[var(--ios-gray-5)] text-[var(--foreground)] hover:bg-[var(--ios-gray-4)]",
      ghost: "bg-transparent text-[var(--ios-blue)] hover:bg-[var(--ios-gray-6)]",
      destructive: "bg-[var(--ios-red)] text-white hover:opacity-90",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-11 px-5 text-[15px]",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
