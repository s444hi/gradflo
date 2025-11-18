import Image from "next/image";

export function Testimonial() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <Image
          src="https://avatar.vercel.sh/johndoe"
          alt="John Doe"
          width={80}
          height={80}
          className="rounded-full mx-auto"
        />
        <div className="p-8 rounded-2xl">
          <p className="text-2xl sm:text-3xl font-medium text-foreground">
            "GradFlo helped me save a semester and graduate on time. I can't
            imagine planning my classes without it."
          </p>
          <p className="mt-6 text-lg text-foreground/70">
            - John Doe, SJSU Alumni
          </p>
        </div>
      </div>
    </section>
  );
}
