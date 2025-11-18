"use client";

import { useState, FormEvent, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { undergraduateMajors, graduateMajors } from "@/lib/majors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Welcome from "@/components/Welcome";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    if (!email || !year) {
      alert("Please fill in all fields.");
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!major || !name) {
      alert("Please fill in all fields.");
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 300);
  };

  useEffect(() => {
    if (step === 3) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }, [step, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {step === 3 ? (
        <Welcome name={name} />
      ) : (
        <Card>
          <div
            className={`transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {step === 1 && (
              <div>
                <h1 className="text-3xl font-bold text-foreground text-center mb-4">
                  Create an Account
                </h1>
                <p className="text-foreground/60 text-center mb-8">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[var(--primary)] hover:opacity-90">
                    Log in
                  </Link>
                </p>
                <form>
                  <Input
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    id="college"
                    type="text"
                    label="College"
                    value="San Jose State University"
                    disabled
                  />
                  <Select
                    id="year"
                    label="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Select your year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </Select>
                  <div className="mt-8">
                    <Button type="button" onClick={handleNext}>
                      Next
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div>
                <h1 className="text-3xl font-bold text-foreground text-center mb-4">
                  Tell us about yourself
                </h1>
                <p className="text-foreground/60 text-center mb-8">
                  This will help us personalize your experience.
                </p>
                <form onSubmit={handleSubmit}>
                  <Input
                    id="name"
                    type="text"
                    label="Name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Select
                    id="major"
                    label="Major"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                  >
                    <option value="">Select your major</option>
                    {year === "Graduate"
                      ? graduateMajors.map((major) => (
                          <option key={major} value={major}>
                            {major}
                          </option>
                        ))
                      : undergraduateMajors.map((major) => (
                          <option key={major} value={major}>
                            {major}
                          </option>
                        ))}
                  </Select>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <Button type="button" onClick={handleBack} variant="secondary">
                      Back
                    </Button>
                    <Button type="submit">Sign Up</Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
