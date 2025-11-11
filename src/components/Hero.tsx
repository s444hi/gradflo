import { HeroImage } from "./HeroImage";

export function Hero() {
  return (
    <section className="text-center py-20 sm:py-32">
      <h1 className="text-5xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
        The smartest, fastest way to build your college roadmap.
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
        GradFlo is an intelligent roadmap builder that helps you graduate on
        time and save money. We help you find the best classes to take,
        highlight prerequisites, and give you a personalized flowchart of your
        college career.
      </p>

      <div className="flex justify-center gap-4 mt-8">
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
          Get Started
        </button>
        <button className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
          Learn More
        </button>
      </div>
      <HeroImage />
    </section>
  );
}