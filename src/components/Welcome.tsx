"use client";

import { useEffect, useState } from "react";

interface WelcomeProps {
  name: string;
}

export default function Welcome({ name }: WelcomeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-foreground bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-background rounded-2xl p-8 text-center transform transition-transform duration-300 ${
          visible ? "scale-100" : "scale-90"
        }`}
      >
        <h1 className="text-4xl font-bold text-foreground">Welcome, {name}!</h1>
        <p className="text-foreground/60 mt-2">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
