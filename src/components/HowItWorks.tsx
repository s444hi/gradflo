"use client";
import { motion } from "framer-motion";

const steps = [
  {
    name: "Create Account",
    description: "Sign up in seconds.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    )
  },
  {
    name: "Input Data",
    description: "Major, goals, & history.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  },
  {
    name: "Your Roadmap",
    description: "Generated instant path.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    )
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto text-center mb-24 mt-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
          How it works
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          From confusion to clarity in three simple nodes.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 relative px-4">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-[40%] left-24 right-24 h-[2px] bg-blue-100 -z-10 transform -translate-y-1/2"></div>

        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center group relative">
            {/* Desktop Arrow */}
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute -right-[5.5rem] top-[40%] transform -translate-y-1/2 text-blue-200 z-0">
                <svg width="40" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            {/* Arrow for mobile/connecting logic */}
            {i < steps.length - 1 && (
              <div className="md:hidden h-12 w-[2px] bg-blue-100 my-4"></div>
            )}

            <div className="w-80 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-md relative z-10">
              <div className="w-16 h-16 bg-[var(--ios-blue)] rounded-full flex items-center justify-center shadow-lg mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.name}</h3>
              <p className="text-base text-gray-500 font-medium leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
