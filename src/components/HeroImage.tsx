
export function HeroImage() {
  const nodes = [
    { name: "CS 46A", x: 100, y: 20, color: "bg-blue-500" },
    { name: "MATH 42", x: 250, y: 20, color: "bg-green-500" },
    { name: "PHYS 50", x: 0, y: 120, color: "bg-purple-500" },
    { name: "ENGL 1A", x: 400, y: 120, color: "bg-yellow-500" },
    { name: "CS 46B", x: 100, y: 220, color: "bg-blue-500" },
    { name: "CS 146", x: 250, y: 220, color: "bg-red-500" },
  ];

  const edges = [
    { from: "CS 46A", to: "CS 46B" },
    { from: "MATH 42", to: "CS 146" },
    { from: "CS 46A", to: "CS 146" },
  ];

  const getNodePos = (name: string) => {
    const node = nodes.find((n) => n.name === name);
    return node ? { x: node.x + 50, y: node.y + 20 } : { x: 0, y: 0 };
  };

  return (
    <div className="mt-16">
      <div className="relative w-[500px] h-[300px] mx-auto">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "rgba(255,255,255,0.3)" }} />
              <stop offset="100%" style={{ stopColor: "rgba(255,255,255,0.1)" }} />
            </linearGradient>
          </defs>
          {edges.map((edge, i) => {
            const fromPos = getNodePos(edge.from);
            const toPos = getNodePos(edge.to);
            return (
              <line
                key={i}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="url(#edgeGradient)"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.name}
            className="absolute p-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{ left: node.x, top: node.y, transition: 'all 0.3s ease' }}
          >
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${node.color}`}></div>
              <span className="text-white font-semibold">{node.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
