import { HeroImage } from "./HeroImage";
import Link from "next/link";

export function Hero() {
  return (
    <section className="text-center py-20 sm:py-32">
      <h1 className="text-5xl sm:text-7xl font-bold text-foreground">
      Build your college roadmap in minutes, not semesters.
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
      GradFlo builds a personalized roadmap for your degree, showing the best classes to take, 
      every prerequisite, and the fastest way to finish college on your terms.
      </p>

      <div className="flex justify-center gap-4 mt-8">
        <Link href="/dashboard">
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
            Create a new flowchart
          </button>
        </Link>
        <Link href="/signup">
          <button className="border border-foreground/20 px-6 py-3 rounded-xl hover:bg-foreground/10 transition-colors">
            Sign Up
          </button>
        </Link>
      </div>
      <HeroImage />
    </section>
  );
}