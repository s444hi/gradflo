import React from "react";

export function HeroImage() {
  type Node = {
    id: string;
    code: string;
    title: string;
    credits: number;
    x: number;
    y: number;
    tone?: "major" | "ge" | "science";
  };

  const nodes: Node[] = [
    { id: "cs46a", code: "CS 46A", title: "Intro to Python", credits: 4, x: 80, y: 20, tone: "major" },
    { id: "math30", code: "MATH 30", title: "Calculus I", credits: 4, x: 430, y: 20, tone: "major" },
    { id: "math42", code: "MATH 42", title: "Discrete Math", credits: 3, x: 840, y: 30, tone: "major" },
    { id: "math31", code: "MATH 31", title: "Calculus II", credits: 4, x: 80, y: 320, tone: "major" },
    { id: "cs146", code: "CS 146", title: "Data Structures", credits: 3, x: 420, y: 420, tone: "major" },
    { id: "cs166", code: "CS 166", title: "Intro to AI", credits: 3, x: 780, y: 350, tone: "major" }
  ];

  type Edge = {
    from: string;
    to: string;
    bend?: number;
  };

  const edges: Edge[] = [
    { from: "cs46a", to: "cs146", bend: 0.2 },
    { from: "math30", to: "math31", bend: -0.2 },
    { from: "math30", to: "cs146", bend: -0.25 },
    { from: "math30", to: "cs166", bend: 0.7 },
    { from: "math42", to: "cs166", bend: 0.07 }
  ];

  const CARD_W = 280;
  const CARD_H = 120;

  const getNode = (id: string) => {
    const n = nodes.find(n => n.id === id);
    if (!n) throw new Error(`Unknown node id in edges: ${id}`);
    return n;
  };

  const anchorBottomCenter = (n: Node) => ({ x: n.x + CARD_W / 2, y: n.y + CARD_H });
  const anchorTopCenter = (n: Node) => ({ x: n.x + CARD_W / 2, y: n.y });

  function edgePath(e: Edge) {
    const from = getNode(e.from);
    const to = getNode(e.to);
    const p1 = anchorBottomCenter(from);
    const p2 = anchorTopCenter(to);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const bend = (e.bend ?? 0) * 0.75;
    const c1 = { x: p1.x + dx * 0.25 + (dy * bend), y: p1.y + dy * 0.25 };
    const c2 = { x: p1.x + dx * 0.75 + (dy * bend), y: p1.y + dy * 0.75 };
    return `M ${p1.x},${p1.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
  }

  const toneClasses: Record<NonNullable<Node["tone"]>, string> = {
    major: "bg-primary/10 border-primary/30 shadow-[0_8px_20px_-10px_rgba(71,28,225,0.15)] dark:bg-primary/5 dark:border-primary/30",
    ge: "bg-gray-50/40 border-gray-200/40 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.05)] dark:bg-gray-900/20 dark:border-gray-800/40",
    science: "bg-gray-50/40 border-gray-200/40 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.05)] dark:bg-gray-900/20 dark:border-gray-800/40"
  };

  const toneTextClasses: Record<NonNullable<Node["tone"]>, string> = {
    major: "text-primary dark:text-primary",
    ge: "text-gray-800/90 dark:text-gray-300/90",
    science: "text-gray-800/90 dark:text-gray-300/90"
  };

  return (
    <div className="mt-16 w-full">
      <div className="relative mx-auto h-[560px] w-full max-w-[1100px] rounded-3xl p-6">
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="edgeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(156, 163, 175, 0.5)" />
              <stop offset="100%" stopColor="rgba(209, 213, 219, 0.3)" />
            </linearGradient>
            <marker id="arrowHead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(156, 163, 175, 0.5)" />
            </marker>
          </defs>

          {edges.map((e, i) => (
            <path
              key={i}
              d={edgePath(e)}
              fill="none"
              stroke="url(#edgeGradient)"
              strokeWidth={3}
              markerEnd="url(#arrowHead)"
            />
          ))}
        </svg>

        {nodes.map((n) => (
          <div
            key={n.id}
            className={[
              "absolute w-[280px] h-[120px] rounded-2xl border backdrop-blur-sm transition-all opacity-80",
              "hover:scale-[1.02]",
              toneClasses[n.tone ?? "ge"]
            ].join(" ")}
            style={{ left: n.x, top: n.y }}
          >
            <div className="flex h-full flex-col justify-between p-5">
              <div>
                <div className={["text-[13px] font-semibold tracking-wide", toneTextClasses[n.tone ?? "ge"]].join(" ")}>
                  {n.code}
                </div>
                <div className="mt-1 text-[20px] font-semibold leading-6 text-gray-950">
                  {n.title}
                </div>
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">{n.credits} credits</div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/20 [mask-image:radial-gradient(80px_60px_at_0_0,black,transparent)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
