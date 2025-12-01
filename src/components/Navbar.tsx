import Link from "next/link";
import Image from "next/image";
import ProfileDropdown from "./ui/ProfileDropdown";

export function Navbar() {
  // TODO: Add logic to conditionally render ProfileDropdown or Log In/Sign Up based on auth status
  const isLoggedIn = true;

  return (
    <nav className="flex w-full items-center justify-between py-2 border-b border-foreground/10 px-8">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground">
          <Image src="/gradflologo1.png" alt="GradFlo Logo" width={40} height={40} />
          <span>GradFlo</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-lg">
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
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <ProfileDropdown />
        ) : (
          <>
            <Link href="/login" className="text-foreground/80 hover:text-primary transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}