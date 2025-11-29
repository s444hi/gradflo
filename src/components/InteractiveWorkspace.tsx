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
    e.preventDefault();
    const scaleAmount = -e.deltaY * 0.001;
    const newScale = Math.max(0.1, Math.min(3, transform.scale + scaleAmount));

    const rect = containerRef.current!.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - (mouseX - transform.x) * (newScale / transform.scale);
    const newY = mouseY - (mouseY - transform.y) * (newScale / transform.scale);
    
    setTransform({ x: newX, y: newY, scale: newScale });
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
      className="w-full h-[80vh] bg-gray-50 rounded-lg border border-gray-200 shadow-inner overflow-hidden relative cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        className="transform-origin-top-left"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transition: isPanning ? 'none' : 'transform 0.1s ease-out'
        }}
      >
        {children}
      </div>
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button onClick={() => zoom('in')} className="bg-white rounded-md p-2 shadow-md border border-gray-200 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button onClick={() => zoom('out')} className="bg-white rounded-md p-2 shadow-md border border-gray-200 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
        <button onClick={fitView} className="bg-white rounded-md p-2 shadow-md border border-gray-200 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 1v-4m0 0h-4m4 0l-5 5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default InteractiveWorkspace;