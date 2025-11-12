import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <Card>
        <h1 className="text-3xl font-bold text-black text-center mb-4">Log In</h1>
        <p className="text-black/60 text-center mb-8">
          New to GradFlo?{" "}
          <Link href="/signup" className="text-[var(--primary)] hover:opacity-90">
            Sign up
          </Link>
        </p>
        <form>
          <Input id="email" type="email" label="Email" placeholder="you@example.com" />
          <Input id="password" type="password" label="Password" placeholder="••••••••" />
          <div className="mt-8">
            <Button type="submit">Log In</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
