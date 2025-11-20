import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-blue-500 rounded-lg animate-spin-slow"></div>
        </div>
        {/* Text */}
        <p className="text-gray-600 font-sans text-lg">Getting everything ready...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
