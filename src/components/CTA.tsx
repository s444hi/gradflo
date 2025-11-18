import { Button } from "./ui/Button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 sm:py-32 text-center bg-[var(--light-purple)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
          Create your personalized roadmap today and take control of your
          college career.
        </p>
        <div className="mt-8">
          <Link href="/signup">
            <Button>
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
