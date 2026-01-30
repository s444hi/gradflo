"use client";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "CS Major, Class of '25",
    text: "Saved me from taking a prerequisite sequence that I didn't actually need!",
    image: "/review1.png",
  },
  {
    name: "Sarah Chen",
    role: "Biology Major",
    text: "The roadmap visualization is exactly what I needed. My advisor was impressed.",
    image: "/review2.png",
  },
  {
    name: "Marcus Johnson",
    role: "Transfer Student",
    text: "Transferring credits was a nightmare until I plugged them into GradFlo.",
    image: "/review3.png",
  },
  {
    name: "Emily Davis",
    role: "Engineering",
    text: "Finally, a tool that actually understands the complexity of GE requirements.",
    image: "/review4.png",
  },
  {
    name: "Jordan Lee",
    role: "Psychology",
    text: "Super intuitive. I planned my whole 4 years in like 20 minutes.",
    image: "/review1.png"
  }
];

export function Testimonial() {
  return (
    <section className="py-32 overflow-hidden relative bg-white">
      <div className="max-w-4xl mx-auto text-center mb-20 px-4">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">Loved by Students</h2>
        <p className="mt-4 text-xl text-gray-600">Join thousands graduating on time.</p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full">
        {/* White fades restored */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="flex gap-8 animate-scroll-reverse whitespace-nowrap px-4 w-max hover:[animation-play-state:paused]">
          {/* Double list for infinite loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[450px] bg-white p-8 rounded-3xl shadow-[0_8px_30px_-5px_rgba(0,0,0,0.08)] border border-gray-100 flex-shrink-0 whitespace-normal transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-5 mb-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 leading-tight">{t.name}</h4>
                  <span className="text-sm text-[var(--ios-blue)] font-semibold tracking-wide">{t.role}</span>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed font-medium">"{t.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
