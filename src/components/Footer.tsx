import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-12 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/gradflologo1.png" alt="GradFlo Logo" width={40} height={40} />
            <p className="text-foreground/50">&copy; {new Date().getFullYear()} GradFlo. All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-foreground/50">
            <Link href="#" className="hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              About Us
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
