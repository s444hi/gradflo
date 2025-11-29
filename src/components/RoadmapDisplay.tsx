import React from 'react';
import { Roadmap } from '@/lib/roadmaps';
import { softPrerequisites } from '@/lib/softPrerequisites';

interface RoadmapProps {
  roadmap: Roadmap;
}

type Node = {
  id: string;
  code: string;
  title: string;
  credits: number;
  x: number;
  y: number;
  tone?: "major" | "ge" | "science";
};

type Edge = {
  from: string;
  to: string;
  bend?: number;
};

const RoadmapDisplay: React.FC<RoadmapProps> = ({ roadmap }) => {
  const allCourses = roadmap.years.flatMap(y => y.semesters.flatMap(s => s.courses));

  // Combine real and soft prerequisites
  const combinedPrerequisites: { from: string; to: string }[] = [];

  // Add real prerequisites
  allCourses.forEach(course => {
    course.prerequisites.forEach(prereqId => {
      combinedPrerequisites.push({ from: prereqId, to: course.id });
    });
  });

  // Add soft prerequisites, filtering out duplicates and ensuring courses exist
  softPrerequisites.forEach(softPrereq => {
    const fromCourseExists = allCourses.some(c => c.id === softPrereq.from);
    const toCourseExists = allCourses.some(c => c.id === softPrereq.to);
    const isDuplicate = combinedPrerequisites.some(
      p => p.from === softPrereq.from && p.to === softPrereq.to
    );

    if (fromCourseExists && toCourseExists && !isDuplicate) {
      combinedPrerequisites.push(softPrereq);
    }
  });

  // Build a graph representation for layout
  const nodesMap = new Map(allCourses.map(c => [c.id, { ...c, incomingEdges: new Set<string>(), outgoingEdges: new Set<string>(), level: -1 }]));

  combinedPrerequisites.forEach(({ from, to }) => {
    const fromNode = nodesMap.get(from);
    const toNode = nodesMap.get(to);
    if (fromNode && toNode) {
      fromNode.outgoingEdges.add(to);
      toNode.incomingEdges.add(from);
    }
  });

  // Topological sort and level assignment
  const levels: string[][] = [];
  let currentLevelNodes: string[] = allCourses
    .filter(c => nodesMap.get(c.id)?.incomingEdges.size === 0)
    .map(c => c.id);

  const visited = new Set<string>();

  while (currentLevelNodes.length > 0) {
    // Sort nodes within the level for consistent ordering
    currentLevelNodes.sort((a, b) => {
      const courseA = allCourses.find(c => c.id === a);
      const courseB = allCourses.find(c => c.id === b);
      if (!courseA || !courseB) return 0;

      // Sort by year, then semester, then original order
      const yearA = roadmap.years.findIndex(y => y.semesters.some(s => s.courses.some(c => c.id === a)));
      const yearB = roadmap.years.findIndex(y => y.semesters.some(s => s.courses.some(c => c.id === b)));
      if (yearA !== yearB) return yearA - yearB;

      const semA = roadmap.years.flatMap(y => y.semesters).findIndex(s => s.courses.some(c => c.id === a));
      const semB = roadmap.years.flatMap(y => y.semesters).findIndex(s => s.courses.some(c => c.id === b));
      if (semA !== semB) return semA - semB;

      return allCourses.indexOf(courseA) - allCourses.indexOf(courseB);
    });

    levels.push(currentLevelNodes);
    currentLevelNodes.forEach(nodeId => visited.add(nodeId));

    const nextLevelCandidates = new Set<string>();
    currentLevelNodes.forEach(nodeId => {
      const node = nodesMap.get(nodeId);
      if (node) {
        node.outgoingEdges.forEach(nextCourseId => {
          if (!visited.has(nextCourseId)) {
            const nextCourseNode = nodesMap.get(nextCourseId);
            if (nextCourseNode) {
              const allPrereqsVisited = Array.from(nextCourseNode.incomingEdges).every(prereqId => visited.has(prereqId));
              if (allPrereqsVisited) {
                nextLevelCandidates.add(nextCourseId);
              }
            }
          }
        });
      }
    });
    currentLevelNodes = Array.from(nextLevelCandidates);
  }

  // Assign levels to nodes
  levels.forEach((levelNodes, levelIndex) => {
    levelNodes.forEach(nodeId => {
      const node = nodesMap.get(nodeId);
      if (node) {
        node.level = levelIndex;
      }
    });
  });

  const CARD_W = 220;
  const CARD_H = 100;
  const LEVEL_GAP_Y = 150; // Vertical gap between levels
  const NODE_GAP_X = 250; // Horizontal gap between nodes in the same level
  const PADDING = 50;

  // Calculate positions
  const positionedNodes: Node[] = [];
  const maxLevelWidth = Math.max(...levels.map(level => level.length * NODE_GAP_X));

  levels.forEach((levelNodes, levelIndex) => {
    const levelWidth = levelNodes.length * NODE_GAP_X;
    const xOffset = (maxLevelWidth - levelWidth) / 2;

    levelNodes.forEach((nodeId, nodeIndex) => {
      const course = allCourses.find(c => c.id === nodeId);
      if (course) {
        positionedNodes.push({
          id: course.id,
          code: course.id.toUpperCase(),
          title: course.name,
          credits: parseInt(course.units),
          x: xOffset + nodeIndex * NODE_GAP_X + PADDING,
          y: levelIndex * (CARD_H + LEVEL_GAP_Y) + PADDING,
          tone: course.type === 'major' ? 'major' : course.type === 'ge' ? 'ge' : 'science',
        });
      }
    });
  });

  const nodes = positionedNodes;

  const edges: Edge[] = combinedPrerequisites.map(prereq => ({
    from: prereq.from,
    to: prereq.to,
    bend: Math.random() * 0.4 - 0.2,
  }));

  const getNode = (id: string) => {
    const n = nodes.find(n => n.id === id);
    if (!n) {
      console.warn(`Node with id ${id} not found for edge rendering.`);
      return { id, code: id, title: "Unknown", credits: 0, x: 0, y: 0 };
    }
    return n;
  };

  const anchorBottomCenter = (n: Node) => ({ x: n.x + CARD_W / 2, y: n.y + CARD_H });
  const anchorTopCenter = (n: Node) => ({ x: n.x + CARD_W / 2, y: n.y });

  function edgePath(e: Edge) {
    try {
      const from = getNode(e.from);
      const to = getNode(e.to);
      if (from.title === "Unknown" || to.title === "Unknown") return '';

      const p1 = anchorBottomCenter(from);
      const p2 = anchorTopCenter(to);
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const bend = (e.bend ?? 0) * 0.75;
      const c1 = { x: p1.x + dx * 0.25 + (dy * bend), y: p1.y + dy * 0.25 };
      const c2 = { x: p1.x + dx * 0.75 + (dy * bend), y: p1.y + dy * 0.75 };
      return `M ${p1.x},${p1.y} C ${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
    } catch (error) {
      console.error(error);
      return '';
    }
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

  const maxBounds = nodes.reduce((acc, node) => ({
    width: Math.max(acc.width, node.x + CARD_W),
    height: Math.max(acc.height, node.y + CARD_H)
  }), { width: 0, height: 0 });

  return (
    <div className="mt-8 w-full flex items-center justify-center overflow-auto">
      <div className="relative rounded-3xl p-4" style={{ width: maxBounds.width + PADDING * 2, height: maxBounds.height + PADDING * 2 }}>
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
              strokeWidth={2}
              markerEnd="url(#arrowHead)"
            />
          ))}
        </svg>

        {nodes.map((n) => (
          <div
            key={n.id}
            className={[
              "absolute rounded-xl border backdrop-blur-sm transition-all opacity-80",
              "hover:scale-[1.02]",
              toneClasses[n.tone ?? "ge"]
            ].join(" ")}
            style={{ left: n.x, top: n.y, width: CARD_W, height: CARD_H }}
          >
            <div className="flex h-full flex-col justify-between p-3">
              <div>
                <div className={["text-[10px] font-semibold tracking-wide", toneTextClasses[n.tone ?? "ge"]].join(" ")}>
                  {n.code}
                </div>
                <div className="mt-1 text-sm font-semibold leading-tight text-gray-950">
                  {n.title}
                </div>
              </div>
              <div className="text-xs text-zinc-600 dark:text-zinc-400">{n.credits} credits</div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/20 [mask-image:radial-gradient(60px_40px_at_0_0,black,transparent)]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapDisplay;