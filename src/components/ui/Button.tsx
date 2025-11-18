import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export function Button({ children, variant = "primary", ...props }: ButtonProps) {
  const baseClasses = "font-bold py-3 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline transition-opacity";
  const primaryClasses = "bg-[var(--primary)] hover:opacity-90 text-white";
  const secondaryClasses = "bg-transparent border border-foreground/20 hover:bg-foreground/10 text-foreground";

  const classes = `${baseClasses} ${variant === "primary" ? primaryClasses : secondaryClasses}`;

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
