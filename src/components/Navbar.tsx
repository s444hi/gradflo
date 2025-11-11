export function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 border-b border-white/10">
      <div className="text-2xl font-bold text-white">GradFlo</div>
      <div className="hidden md:flex items-center gap-8 text-lg">
        <a href="#" className="text-white/80 hover:text-white transition-colors">
          Features
        </a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">
          Pricing
        </a>
        <a href="#" className="text-white/80 hover:text-white transition-colors">
          About Us
        </a>
      </div>
      <div>
        <button className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          Sign Up
        </button>
      </div>
    </nav>
  );
}