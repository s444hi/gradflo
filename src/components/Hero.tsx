import { HeroImage } from "./HeroImage";
import Link from "next/link";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-32 sm:pt-24 sm:pb-40 mesh-gradient">
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-[var(--ios-blue)]/10 text-[var(--ios-blue)] text-sm font-semibold tracking-wide">
          New: Interactive Roadmaps 2.0
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-8">
          Build your college roadmap <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ios-blue)] to-[var(--ios-purple)]">
            in minutes, not semesters.
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-[var(--ios-gray-1)] max-w-2xl mx-auto leading-relaxed">
          GradFlo builds a personalized roadmap for your degree, showing the best classes to take,
          every prerequisite, and the fastest way to finish college on your terms.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link href="/dashboard">
            <Button size="lg" className="rounded-full px-8 text-lg h-12 shadow-lg shadow-blue-500/20">
              Create a new flowchart
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary" size="lg" className="rounded-full px-8 text-lg h-12 bg-white/80 backdrop-blur-md border border-white/20">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-20 w-full flex justify-center relative z-10 px-4">
        <div className="w-full max-w-[1200px] rounded-2xl overflow-hidden shadow-2xl border border-white/40 ring-1 ring-black/5 bg-white/50 backdrop-blur-xl p-2">
          <div className="rounded-xl overflow-hidden bg-white">
            <HeroImage />
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl mix-blend-multiply" />
      </div>
    </section>
  );
}