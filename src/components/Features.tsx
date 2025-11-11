const features = [
  {
    name: "Intelligent Roadmap Builder",
    description:
      "Our intelligent roadmap builder helps you create a personalized roadmap for your college career.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Save Money & Time",
    description:
      "We help you find the best classes to take so you can graduate on time and save money.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    name: "Prerequisite Highlighting",
    description:
      "We highlight prerequisites for each class so you never have to worry about wasting a semester.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h.01" />
        <path d="M12 14v-4" />
        <path d="M12 8h.01" />
        <path d="M12 4h.01" />
        <path d="M4 4h.01" />
        <path d="M20 4h.01" />
        <path d="M4 20h.01" />
        <path d="M20 20h.01" />
        <path d="M4 12h.01" />
        <path d="M20 12h.01" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-32 bg-light-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            All the features you need, none that you don't.
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-foreground/70">
            GradFlo is packed with features to help you succeed in college.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-foreground/5 p-8 rounded-2xl border border-foreground/10"
            >
              <div className="text-primary">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-bold text-foreground">
                {feature.name}
              </h3>
              <p className="mt-2 text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
