import { HeroImage } from "./HeroImage";
import Link from "next/link";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="text-center py-16 sm:py-24">
      <h1 className="text-5xl sm:text-7xl font-bold text-foreground">
      Build your college roadmap in minutes, not semesters.
      </h1>
      <p className="mt-6 text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto">
      GradFlo builds a personalized roadmap for your degree, showing the best classes to take, 
      every prerequisite, and the fastest way to finish college on your terms.
      </p>

      <div className="flex justify-center gap-4 mt-8">
        <Link href="/dashboard">
          <Button>
            Create a new flowchart
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="secondary">
            Sign Up
          </Button>
        </Link>
      </div>
      <div className="mt-16 w-full flex justify-center">
        <div className="w-[1200px]">
          <HeroImage />
        </div>
      </div>
    </section>
  );
}