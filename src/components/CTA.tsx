import { Button } from "./ui/Button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 text-center overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--ios-gray-4)] to-transparent" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Ready to take control of your future?
        </h2>
        <p className="mt-6 text-lg sm:text-xl text-[var(--ios-gray-1)] max-w-2xl mx-auto">
          Join thousands of students who are graduating on time and with confidence using GradFlo.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-xl shadow-blue-500/25">
              Get Started for Free
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="lg" className="rounded-full px-8 h-12 text-lg">
              Log In
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
