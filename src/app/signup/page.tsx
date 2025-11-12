"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { undergraduateMajors, graduateMajors } from "@/lib/majors";
import Link from "next/link";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [year, setYear] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <Card>
        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold text-black text-center mb-4">Create an Account</h1>
            <p className="text-black/60 text-center mb-8">
              Already have an account?{" "}
              <Link href="/login" className="text-[var(--primary)] hover:opacity-90">
                Log in
              </Link>
            </p>
            <form>
              <Input id="email" type="email" label="Email" placeholder="you@example.com" />
              <Input id="college" type="text" label="College" value="San Jose State University" disabled />
              <Select id="year" label="Year" value={year} onChange={(e) => setYear(e.target.value)}>
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
            <h1 className="text-3xl font-bold text-black text-center mb-4">Tell us about yourself</h1>
             <p className="text-black/60 text-center mb-8">
              This will help us personalize your experience.
            </p>
            <form>
              <Select id="major" label="Major">
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
                <Button type="button" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit">Sign Up</Button>
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}
