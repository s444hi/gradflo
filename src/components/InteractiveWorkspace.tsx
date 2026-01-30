"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface InteractiveWorkspaceProps {
  children: React.ReactNode;
  contentWidth: number;
  contentHeight: number;
}

const InteractiveWorkspace: React.FC<InteractiveWorkspaceProps> = ({ children, contentWidth, contentHeight }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const fitView = useCallback(() => {
    if (!containerRef.current || contentWidth === 0 || contentHeight === 0) {
      return;
    }

    const container = containerRef.current;
    const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();

    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;
    const newScale = Math.min(scaleX, scaleY) * 0.9; // 0.9 provides some padding

    const newX = (containerWidth - contentWidth * newScale) / 2;
    const newY = (containerHeight - contentHeight * newScale) / 2;

    setTransform({ x: newX, y: newY, scale: newScale });
  }, [contentWidth, contentHeight]);

  useEffect(() => {
    fitView();
  }, [fitView]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only pan on left click
    if (e.button !== 0) return;

    e.preventDefault();
    setIsPanning(true);
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };

    setTransform(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom if Ctrl or Command key is pressed
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const scaleAmount = -e.deltaY * 0.001;
      const newScale = Math.max(0.1, Math.min(3, transform.scale + scaleAmount));

      const rect = containerRef.current!.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
      const newY = mouseY - (mouseY - transform.y) * (newScale / transform.scale);

      setTransform({ x: newX, y: newY, scale: newScale });
    }
  };

  const zoom = (direction: 'in' | 'out') => {
    const scaleAmount = direction === 'in' ? 0.2 : -0.2;
    const newScale = Math.max(0.1, Math.min(3, transform.scale + scaleAmount));

    const rect = containerRef.current!.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const newX = centerX - (centerX - transform.x) * (newScale / transform.scale);
    const newY = centerY - (centerY - transform.y) * (newScale / transform.scale);

    setTransform({ x: newX, y: newY, scale: newScale });
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[70vh] bg-white rounded-3xl overflow-hidden relative cursor-grab border border-gray-100 shadow-sm"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Background Grid Pattern - Subtle */}
      <div className="absolute inset-0 z-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#E2E8F0 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>

      <div
        className="transform-origin-top-left relative z-10"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transition: isPanning ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {children}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-20">
        <div className="bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-gray-100 flex items-center gap-1">
          <button onClick={() => zoom('out')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Zoom Out">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </button>
          <div className="w-px h-4 bg-gray-200"></div>
          <button onClick={() => zoom('in')} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Zoom In">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <div className="w-px h-4 bg-gray-200"></div>
          <button onClick={fitView} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors" title="Fit to Screen">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 1v-4m0 0h-4m4 0l-5 5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tip Overlay */}
      <div className="absolute top-4 left-4 pointer-events-none z-0 opacity-60 hover:opacity-100 transition-opacity">
        <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">
          Hold Ctrl + Scroll to Zoom
        </p>
      </div>
    </div>
  );
};

export default InteractiveWorkspace;