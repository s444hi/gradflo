import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonial } from "@/components/Testimonial";
import { CTA } from "@/components/CTA";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function Home() {
  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
      </div>
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection>
          <Testimonial />
        </AnimatedSection>
      </div>
      <AnimatedSection>
        <CTA />
      </AnimatedSection>
    </main>
  );
}