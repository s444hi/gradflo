export function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 border-b border-foreground/10 px-8">
      <div className="text-2xl font-bold text-foreground">GradFlo</div>
      <div className="hidden md:flex items-center gap-8 text-lg">
        <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
          Features
        </a>
        <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
          Pricing
        </a>
        <a href="#" className="text-foreground/80 hover:text-primary transition-colors">
          About Us
        </a>
      </div>
      <div>
        <button className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Sign Up
        </button>
      </div>
    </nav>
  );
}