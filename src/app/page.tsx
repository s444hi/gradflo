import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonial } from "@/components/Testimonial";
import { CTA } from "@/components/CTA";
import { AnimatedSection } from "@/components/AnimatedSection";


export default function Home() {
  return (
    <main className="min-h-screen relative text-foreground bg-white">
      <Hero />
      <div className="-mt-12 relative z-10 w-full">
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
      </div>

      <AnimatedSection>
        <Features />
      </AnimatedSection>

      <AnimatedSection>
        <Testimonial />
      </AnimatedSection>
      <CTA />
    </main>
  );
}