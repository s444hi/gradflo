const steps = [
  {
    name: "Create an account",
    description:
      "Sign up for a free account to get started. It only takes a minute.",
  },
  {
    name: "Input your information",
    description:
      "Tell us your major, the classes you've taken, and your graduation goals.",
  },
  {
    name: "Get your personalized roadmap",
    description:
      "We'll generate a personalized roadmap to help you graduate on time.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 sm:py-24 bg-[var(--light-purple)]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
          How it works
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-foreground/70">
          Getting started with GradFlo is easy.
        </p>
      </div>
      <div className="mt-16 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={step.name} className="bg-white p-8 rounded-2xl shadow-md">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full text-3xl font-bold text-white">
              {i + 1}
            </div>
            <h3 className="mt-6 text-2xl font-bold text-foreground">{step.name}</h3>
            <p className="mt-2 text-foreground/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
