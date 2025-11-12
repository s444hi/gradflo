import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 border-b border-foreground/10 px-8">
      <Link href="/" className="text-2xl font-bold text-foreground">GradFlo</Link>
      <div className="hidden md:flex items-center gap-8 text-lg">
        <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">
          Features
        </Link>
        <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">
          Pricing
        </Link>
        <Link href="#" className="text-foreground/80 hover:text-primary transition-colors">
          About Us
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-foreground/80 hover:text-primary transition-colors">
          Log In
        </Link>
        <Link href="/signup" className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}