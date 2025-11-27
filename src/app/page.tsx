import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonial } from "@/components/Testimonial";
import { CTA } from "@/components/CTA";
import { AnimatedSection } from "@/components/AnimatedSection";


export default function Home() {
  return (
    <main>
      <Hero />
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonial />
      </AnimatedSection>
      <CTA />
    </main>
  );
}